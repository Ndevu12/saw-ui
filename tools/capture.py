#!/usr/bin/env python3
"""Record real `saw` sessions into the JSON the site's replay deck plays back.

Nothing in `src/data/captures.json` is written by hand. This script installs the
CURRENT PUBLISHED release from PyPI, builds throwaway fixture repositories inside an
isolated HOME, drives `saw` through a real pty (so it renders exactly as it does in a
terminal, colour and all), and records each chunk with the wall-clock offset it arrived
at — so the replay can honour real pacing instead of inventing it.

    python3 tools/capture.py            # capture into src/data/captures.json
    python3 tools/capture.py --check    # re-capture and diff, do not write

The infected scenario is opt-in and needs a local fixture this repository does not
carry — see the note above `make_repo`, and `docs/CAPTURES.md`.

Why an isolated HOME: `saw` abbreviates paths against $HOME, so a fixture at
$HOME/dev/acme-web renders as `~/dev/acme-web` with no post-editing. The transcript
stays byte-real; we choose the path rather than rewriting the output. It also keeps the
run away from the operator's real git and saw configuration.

DISCLOSURE: every frame this produces ships on the public website. Scenarios are
summary-level on purpose — per-finding detail names what a detector keys on, and that is
never published. Read `docs/CAPTURES.md` before adding a scenario.
"""
from __future__ import annotations

import argparse
import fcntl
import json
import os
import pty
import re
import shutil
import struct
import subprocess
import sys
import termios
import time
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "src" / "data" / "captures.json"
WORK = REPO / ".capture-work"

# 100 columns is the widest a desktop reader sees without horizontal scroll at our type
# size. `saw` does not reflow to terminal width (measured: identical transcript at 100,
# 64 and 44), so this is a recording choice, not a responsive one — the page wraps prose
# lines and scrolls structural ones instead. See docs/CAPTURES.md.
COLS, ROWS = 100, 48

# ── the ANSI SGR subset `saw` actually emits ────────────────────────────────────────
# It paints with truecolor / 256 / 16 depending on terminal support; we force truecolor
# so one parser covers every frame.
_SGR = re.compile(r"\x1b\[([0-9;]*)m")
_OSC = re.compile(r"\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)")
_CSI_OTHER = re.compile(r"\x1b\[[0-9;?]*[A-Za-z]")


def _blank() -> dict:
    return {"fg": None, "bold": False, "italic": False, "dim": False}


def _apply(state: dict, params: str) -> dict:
    """Fold one SGR parameter string into a style state."""
    state = dict(state)
    codes = [int(p) if p else 0 for p in (params or "0").split(";")]
    i = 0
    while i < len(codes):
        c = codes[i]
        if c == 0:
            state = _blank()
        elif c == 1:
            state["bold"] = True
        elif c == 2:
            state["dim"] = True
        elif c == 3:
            state["italic"] = True
        elif c == 22:
            state["bold"] = state["dim"] = False
        elif c == 23:
            state["italic"] = False
        elif c == 39:
            state["fg"] = None
        elif 30 <= c <= 37:
            state["fg"] = f"ansi{c - 30}"
        elif 90 <= c <= 97:
            state["fg"] = f"ansi{c - 90 + 8}"
        elif c == 38 and i + 1 < len(codes):
            if codes[i + 1] == 2 and i + 4 < len(codes):
                state["fg"] = "#%02x%02x%02x" % tuple(codes[i + 2 : i + 5])
                i += 4
            elif codes[i + 1] == 5 and i + 2 < len(codes):
                state["fg"] = f"x{codes[i + 2]}"
                i += 2
        i += 1
    return state


def tokenize(raw: str) -> list[dict]:
    """ANSI text -> [{t: text, fg, bold, italic, dim}] with styles already resolved."""
    raw = _OSC.sub("", raw).replace("\r\n", "\n").replace("\r", "")
    out: list[dict] = []
    state = _blank()
    pos = 0
    for m in _SGR.finditer(raw):
        if m.start() > pos:
            out.append({"t": raw[pos : m.start()], **state})
        state = _apply(state, m.group(1))
        pos = m.end()
    if pos < len(raw):
        out.append({"t": raw[pos:], **state})
    # Strip any residual non-colour escape sequence rather than shipping it as text.
    for tok in out:
        tok["t"] = _CSI_OTHER.sub("", tok["t"])
    return [t for t in out if t["t"]]


def run_pty(argv: list[str], cwd: Path, env: dict) -> tuple[list[tuple[float, str]], int]:
    """Run argv on a real pty; return timed output chunks and the exit status."""
    pid, fd = pty.fork()
    if pid == 0:
        os.chdir(cwd)
        os.environ.clear()
        os.environ.update(env)
        try:
            os.execv(argv[0], argv)
        finally:
            os._exit(127)
    fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack("HHHH", ROWS, COLS, 0, 0))
    chunks: list[tuple[float, str]] = []
    t0 = time.monotonic()
    try:
        while True:
            data = os.read(fd, 65536)
            if not data:
                break
            chunks.append((round(time.monotonic() - t0, 3), data.decode("utf-8", "replace")))
    except OSError:
        pass  # EIO is how a pty reports the child closed it
    finally:
        os.close(fd)
    _, status = os.waitpid(pid, 0)
    return chunks, os.waitstatus_to_exitcode(status)


# ── fixtures ────────────────────────────────────────────────────────────────────────
# Purpose-built, minimal and obviously synthetic. A clean fixture discloses nothing —
# it is an ordinary front-end package — so it lives here. The infected one does not;
# see the note below it.

CLEAN_FILES = {
    "package.json": json.dumps(
        {
            "name": "acme-web",
            "version": "2.4.0",
            "private": True,
            "scripts": {"build": "vite build", "test": "vitest run"},
            "dependencies": {"react": "19.0.0", "react-dom": "19.0.0"},
        },
        indent=2,
    )
    + "\n",
    "src/index.js": "export function mount(el) {\n  el.textContent = 'acme';\n}\n",
    "README.md": "# acme-web\n\nStorefront.\n",
}

# There is deliberately NO infected fixture in this repository.
#
# This repo is public. A sample known to trip saw's confirmed tier, published here,
# is a detection ORACLE: mutate a line, re-run saw, and you have binary-searched the
# boundary. That is the evasion aid the trust model exists to withhold, and shipping
# one would leak more than any site frame is worth.
#
# So the infected scenario is opt-in, from a fixture the operator keeps locally and
# never commits, and it is written only after a human has read the transcript:
#
#     python3 tools/capture.py --infected-fixture ~/some/local/repo    # prints it
#     python3 tools/capture.py --infected-fixture ~/some/local/repo --approve-infected
#
# Without those flags the scenario is simply absent and the deck does not offer it.
# Fail closed: the default cannot leak, and the leak requires a deliberate act.


def make_repo(root: Path, files: dict[str, str], env: dict) -> None:
    root.mkdir(parents=True, exist_ok=True)
    for rel, body in files.items():
        p = root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(body)
    git = dict(env, GIT_AUTHOR_NAME="acme", GIT_AUTHOR_EMAIL="dev@acme.invalid",
               GIT_COMMITTER_NAME="acme", GIT_COMMITTER_EMAIL="dev@acme.invalid")
    for cmd in (["git", "init", "-q", "-b", "main"],
                ["git", "add", "-A"],
                ["git", "-c", "commit.gpgsign=false", "commit", "-q", "-m", "acme-web"]):
        subprocess.run(cmd, cwd=root, env=git, check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


# ── scenarios ───────────────────────────────────────────────────────────────────────
# `saw audit` is deliberately absent: it reports on the HOST it runs on, so a capture
# taken here would carry this machine's credential and start-up surface onto a public
# page. It needs a clean-room host. See docs/CAPTURES.md.

SCENARIOS = [
    {
        "id": "welcome",
        "label": "Meet it",
        "blurb": "What you get for typing four letters.",
        "command": "saw",
        "argv": [],
        "fixture": "clean",
    },
    {
        "id": "clean",
        "label": "A clean repository",
        "blurb": "Nothing found, and it says so without overclaiming.",
        "command": "saw scan .",
        "argv": ["scan", ".", "--no-stream"],
        "fixture": "clean",
    },
    {
        "id": "intro",
        "label": "The tour",
        "blurb": "The whole tool, in a screen.",
        "command": "saw intro",
        "argv": ["intro"],
        "fixture": "clean",
    },
]


def capture(saw: Path, infected: Path | None = None) -> dict:
    if WORK.exists():
        shutil.rmtree(WORK)
    home = WORK / "home"
    (home / "dev").mkdir(parents=True)

    env = {
        "HOME": str(home),
        "PATH": os.environ.get("PATH", "/usr/bin:/bin"),
        "TERM": "xterm-256color",
        "COLORTERM": "truecolor",
        "CLICOLOR_FORCE": "1",
        "LANG": "en_US.UTF-8",
        "LC_ALL": "en_US.UTF-8",
        # Keep the run inside the fixture: no report bundle, no hook, no external tools.
        "SAW_HOOK_DISABLED": "1",
        "GIT_CONFIG_GLOBAL": str(home / ".gitconfig"),
        "GIT_CONFIG_SYSTEM": "/dev/null",
    }

    # Masters live OUTSIDE $HOME so they are never a scan target themselves; each
    # scenario copies the one it needs into $HOME/dev/acme-web. Both the clean and the
    # infected run therefore render as `~/dev/acme-web` — the same project on a
    # different day — without a byte of the transcript being rewritten afterwards.
    fixtures = {"clean": WORK / "fixtures" / "clean"}
    make_repo(fixtures["clean"], CLEAN_FILES, env)

    scenarios = list(SCENARIOS)
    if infected:
        # Copied, never referenced in place, so the operator's fixture is not mutated.
        fixtures["infected"] = WORK / "fixtures" / "infected"
        shutil.copytree(infected, fixtures["infected"], symlinks=True)
        scenarios.insert(2, {
            "id": "infected",
            "label": "An infected repository",
            "blurb": "One confirmed finding is enough to fail a build.",
            "command": "saw scan .",
            "argv": ["scan", ".", "--no-stream"],
            "fixture": "infected",
        })

    version = subprocess.run([str(saw), "--version"], env=env, capture_output=True,
                             text=True).stdout.split()[2]

    out = []
    for sc in scenarios:
        target = home / "dev" / "acme-web"
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(fixtures[sc["fixture"]], target, symlinks=True)

        chunks, code = run_pty([str(saw)] + sc["argv"], target, env)
        raw = "".join(c[1] for c in chunks)
        # Tokenize the WHOLE stream, never per chunk. A pty read can split an escape
        # sequence down the middle, and SGR state carries across reads — tokenizing
        # each chunk separately leaked a raw `[38;2;...m` into the transcript as
        # literal text and reset every colour at each read boundary.
        tokens = tokenize(raw)
        out.append({
            "id": sc["id"],
            # Only `saw scan` returns a verdict; `saw` and `saw intro` exit 0 because
            # they printed a screen. Rendering that as a verdict would be the page
            # overclaiming in the one place it must not.
            "isVerdict": sc["argv"][:1] == ["scan"],
            "label": sc["label"],
            "blurb": sc["blurb"],
            "command": sc["command"],
            "exitCode": code,
            "duration": round(chunks[-1][0], 3) if chunks else 0.0,
            "tokens": tokens,
            "plain": _SGR.sub("", _OSC.sub("", raw)).replace("\r\n", "\n").replace("\r", ""),
        })
        print(f"  {sc['id']:<10} exit {code}  {out[-1]['duration']:>6.2f}s  "
              f"{len(out[-1]['plain'].splitlines()):>3} lines", file=sys.stderr)

    shutil.rmtree(WORK, ignore_errors=True)
    return {"tool": "stayawakebot", "version": version, "columns": COLS, "scenarios": out}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--saw", help="path to a saw executable (default: build a venv from PyPI)")
    ap.add_argument("--check", action="store_true", help="re-capture and diff; do not write")
    ap.add_argument("--infected-fixture", metavar="PATH",
                    help="a local git repo saw reports as infected. NEVER commit it here.")
    ap.add_argument("--approve-infected", action="store_true",
                    help="write the infected scenario. Requires having read the transcript "
                         "printed by a prior run without this flag.")
    args = ap.parse_args()

    infected = Path(args.infected_fixture).expanduser().resolve() if args.infected_fixture else None
    if infected and not (infected / ".git").is_dir():
        print(f"not a git repository: {infected}", file=sys.stderr)
        return 2

    if args.saw:
        saw = Path(args.saw).resolve()
    else:
        venv = WORK.parent / ".capture-venv"
        if not (venv / "bin" / "saw").exists():
            print("installing stayawakebot from PyPI…", file=sys.stderr)
            subprocess.run([sys.executable, "-m", "venv", str(venv)], check=True)
            subprocess.run([str(venv / "bin" / "pip"), "install", "-q", "--upgrade",
                            "pip", "stayawakebot"], check=True)
        saw = venv / "bin" / "saw"

    data = capture(saw, infected)
    inf = next((s for s in data["scenarios"] if s["id"] == "infected"), None)
    if inf and not args.approve_infected:
        print("\n" + "=" * 72, file=sys.stderr)
        print("INFECTED TRANSCRIPT — read every line before this ships publicly.", file=sys.stderr)
        print("Per-finding detail names what a detector keys on and must NOT be", file=sys.stderr)
        print("published; a summary-level verdict is fine. Re-run with", file=sys.stderr)
        print("--approve-infected once you have read it.", file=sys.stderr)
        print("=" * 72, file=sys.stderr)
        print(inf["plain"], file=sys.stderr)
        print("=" * 72, file=sys.stderr)
        data["scenarios"] = [s for s in data["scenarios"] if s["id"] != "infected"]
        print("NOT WRITING the infected scenario.", file=sys.stderr)

    rendered = json.dumps(data, indent=2, ensure_ascii=False) + "\n"

    if args.check:
        current = OUT.read_text() if OUT.exists() else ""
        if current == rendered:
            print("captures.json is current", file=sys.stderr)
            return 0
        print("captures.json is STALE — run tools/capture.py", file=sys.stderr)
        return 1

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(rendered)
    print(f"wrote {OUT.relative_to(REPO)}  ({len(rendered):,} bytes, "
          f"{data['tool']} {data['version']})", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
