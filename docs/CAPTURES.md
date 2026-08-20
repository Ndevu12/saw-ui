# Terminal captures

The replay deck on the home page plays **real recorded `saw` sessions**. Nothing in
`src/data/captures.json` is written, edited or touched up by hand — it is produced entirely by
`tools/capture.py`, and the right way to change what the deck shows is to change that script and
re-run it.

```bash
npm run capture         # re-record into src/data/captures.json
npm run capture:check   # re-record and diff; non-zero if the committed file is stale
```

The first run builds a virtualenv and installs **`stayawakebot` from PyPI** — the published
release, not this machine's checkout. That is deliberate: the page shows exactly what a reader gets
from the install line printed above the capture, and re-recording re-tests that instruction.

## Why the paths look the way they do

`saw` abbreviates paths against `$HOME`, so the script runs everything inside an isolated home and
puts the fixture at `$HOME/dev/acme-web`. The transcript then reads `~/dev/acme-web` on its own,
with no post-processing. **We choose the path rather than rewriting the output**, so the recorded
bytes stay the bytes `saw` actually emitted. The isolated home also keeps the run away from the
operator's real git and `saw` configuration.

## Rules for every frame

Every frame lands on a public marketing page. Before a scenario is added or re-recorded, read the
transcript against these:

1. **No detection mechanism.** No signal names, no thresholds, no corroboration logic, and no
   per-finding detail — a finding line names what a detector keys on. Verdicts are summary-level.
2. **No indicators.** No endpoints, hostnames, wallet identities, keys, staging paths or campaign
   path literals, in any frame.
3. **No named campaign.** No worm name, wave, date, package name or count, anywhere on the site.
4. **No real code and no real host.** Fixtures only. Never a capture of a scan over a real
   repository, and never one that shows a real machine's paths or credentials.
5. **The version is never hand-typed.** It is read from the capture and cross-checked against PyPI
   at build time (`src/lib/version.ts`).

## Why there is no infected fixture in this repository

This repository is public.

A sample known to trip `saw`'s confirmed tier, published here, is a **detection oracle**: mutate a
line, re-run `saw`, and you have binary-searched the boundary. That is precisely the evasion aid the
tool's trust model exists to withhold, and no marketing frame is worth it.

So the infected scenario is opt-in, from a fixture kept locally and never committed, and it is
written only after a human has read the transcript:

```bash
python3 tools/capture.py --infected-fixture ~/path/to/local/repo     # prints it, writes nothing
python3 tools/capture.py --infected-fixture ~/path/to/local/repo --approve-infected
```

Without those flags the scenario is simply absent and the deck does not offer it. The default
cannot leak; leaking requires a deliberate act.

`fixtures-local/` is gitignored for exactly this purpose.

## Why there is no `saw audit` scenario

`saw audit` reports on the **host it runs on**. A capture taken on a developer machine would carry
that machine's credential surface and start-up entries onto a public page. It needs a clean-room
host, and until there is one the scenario stays out.

## A recording constraint worth knowing

`saw scan --no-stream` does **not** reflow to terminal width. Driven through a real pty at 100, 64
and 44 columns it emits an identical transcript; the host-note line is 216 characters at every
width. So a narrow recording for phones is not available, and the page does not pretend otherwise:
the deck classifies each line and renders **structural** lines (table rows, rules, aligned columns)
without wrapping inside a scroll region, while **prose** lines soft-wrap — which is what a real
terminal does with a long line at a narrow width.

## Two things the capture script gets right that are easy to get wrong

- **Tokenize the whole stream, never per pty read.** A read can split an escape sequence down the
  middle, and colour state carries across reads. Tokenizing each chunk separately leaked a raw
  `[38;2;…m` into the page as literal text and reset every colour at each boundary.
- **Only `saw scan` returns a verdict.** `saw` and `saw intro` exit `0` because they printed a
  screen, which is not a statement about anything. The deck renders a verdict chip only when
  `isVerdict` is set, and says so plainly otherwise.
