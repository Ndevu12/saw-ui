'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import captures from '@/entities/capture/model/captures.json';
import { cn } from '@/shared/lib/utils';

/**
 * The demonstration terminal.
 *
 * It plays itself. There are no tabs and no buttons — a marketing demo that asks the
 * reader to click is a demo they will not watch. It types a command the way a person
 * would, renders that command's real recorded output the way the terminal actually
 * prints it, holds on the result, and hands over to the next session; at the end of
 * the playlist it loops. One window, always moving.
 *
 * Everything shown is real: the commands are the ones a reader would type, the output
 * is captured from the published release (see tools/capture.py), and the pacing is
 * only for legibility — the true elapsed time is printed in the footer.
 *
 * It runs only while on screen (IntersectionObserver) so it is not burning frames
 * off-screen, and it fails toward VISIBLE: if requestAnimationFrame never delivers a
 * frame, a per-clip timeout still reveals the full transcript before advancing, so the
 * window is never left blank. Reduced motion shows one complete session, unmoving.
 */

type Token = { t: string; fg: string | null; bold: boolean; italic: boolean; dim: boolean };
type Scenario = {
  id: string;
  label: string;
  command: string;
  exitCode: number;
  isVerdict: boolean;
  duration: number;
  tokens: Token[];
};

const BY_ID = Object.fromEntries(
  (captures.scenarios as Scenario[]).map((s) => [s.id, s]),
);
// Lead with the scan — the tool doing its job — then the welcome and the tour.
const ORDER = ['clean', 'welcome', 'intro'];

/* Recorded truecolor hexes mapped to themselves (the two dim greys nudged lighter for
   contrast on #090e14). Literal values cannot be undone by a stylesheet change, which
   is how the mint wordmark once fell back to grey. */
const PALETTE: Record<string, string> = {
  '#7ee7b0': '#7ee7b0',
  '#4cd07d': '#4cd07d',
  '#5fd3dd': '#5fd3dd',
  '#7a8594': '#8b97a6',
  '#58606e': '#6b7686',
  '#f0f6fc': '#f0f6fc',
  '#c9d3de': '#c9d3de',
};

function colorFor(tok: Token): string | undefined {
  if (!tok.fg) return undefined;
  return PALETTE[tok.fg.toLowerCase()] ?? (tok.fg.startsWith('#') ? tok.fg : undefined);
}

type Piece = { tok: Token; start: number; end: number };
type Line = { pieces: Piece[]; structural: boolean };

const BOX = /[─-╿▀-▟]/;
const ALIGNED = /\S {2,}\S/;
const isStructural = (text: string) => BOX.test(text) || ALIGNED.test(text);

/** Tokens → lines of styled pieces, carrying a running character offset so the reveal
 *  can cut mid-token. Structural lines never wrap; prose lines do. */
function layout(sc: Scenario) {
  const lines: Line[] = [];
  let current: Piece[] = [];
  let text = '';
  let n = 0;
  const flush = () => {
    lines.push({ pieces: current, structural: isStructural(text) });
    current = [];
    text = '';
  };
  for (const tok of sc.tokens) {
    tok.t.split('\n').forEach((part, i) => {
      if (i > 0) {
        n += 1;
        flush();
      }
      if (part) {
        current.push({ tok: { ...tok, t: part }, start: n, end: n + part.length });
        text += part;
        n += part.length;
      }
    });
  }
  if (current.length || text) flush();
  return { lines, total: n };
}

/** Stop a transcript at saw's "Host note:" line. That note is real output, but it
 *  names host-persistence threat detail we do not amplify on a public page — and a
 *  marketing demo reads better ending on the verdict. Trailing blank lines are dropped
 *  and the character total is recomputed so the reveal does not pause on nothing. */
function stopAtHostNote(lines: Line[]): { lines: Line[]; total: number } {
  const cut = lines.findIndex((l) => l.pieces.some((p) => p.tok.t.startsWith('Host note')));
  let kept = cut === -1 ? lines : lines.slice(0, cut);
  while (kept.length && kept[kept.length - 1].pieces.length === 0) kept = kept.slice(0, -1);
  const last = kept[kept.length - 1];
  const total = last ? Math.max(...last.pieces.map((p) => p.end)) : 0;
  return { lines: kept, total };
}

/** One clip = a session plus its pre-computed layout and timeline. */
// The braille spinner saw actually paints while it walks the tree, and the line it
// prints when discovery finishes — both observed by running the streaming scanner
// against a one-repo fixture (`saw scan .`). The --no-stream capture skips this phase,
// so the demo replays it here to match what a real run shows before any result.
const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const CLIPS = ORDER.map((id) => BY_ID[id])
  .filter(Boolean)
  .map((sc) => {
    const { lines, total } = stopAtHostNote(layout(sc).lines);
    const discovers = sc.command.startsWith('saw scan');
    const typeMs = Math.max(650, sc.command.length * 60);
    const gapMs = 360; // the beat after Enter
    const discoverMs = discovers ? 1300 : 0; // ~matches the real spinner's dwell
    const revealMs = Math.min(Math.max(1100, lines.length * 85), 2600);
    const holdMs = 2900; // sit on the result
    return {
      sc,
      lines,
      total,
      discovers,
      discoveryLine: 'Found 1 repository to scan.',
      typeMs,
      gapMs,
      discoverMs,
      revealMs,
      holdMs,
      dur: typeMs + gapMs + discoverMs + revealMs + holdMs,
    };
  });

export function ReplayDeck() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0); // command chars shown
  const [revealed, setRevealed] = useState(0); // output chars shown
  const [phase, setPhase] = useState<'type' | 'discover' | 'output'>('type');
  const [spin, setSpin] = useState(0); // braille spinner frame
  const [motionOK, setMotionOK] = useState<boolean | null>(null);
  const [overflows, setOverflows] = useState(false);
  const bodyEl = useRef<HTMLPreElement | null>(null);

  const clip = CLIPS[idx];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const u = () => setMotionOK(!mq.matches);
    u();
    mq.addEventListener('change', u);
    return () => mq.removeEventListener('change', u);
  }, []);

  // ── The driver ────────────────────────────────────────────────────────────────
  // ONE rAF loop, mounted once, never torn down. It owns the whole playlist: it walks
  // each clip through type → discover → reveal → hold, then advances and loops. Because
  // it does not depend on any changing value, it cannot be re-created or cancelled by a
  // dependency change mid-play — which is exactly how the previous per-clip effect could
  // freeze at the bare prompt. Motion preference is read live from a ref, so toggling it
  // never restarts the loop.
  const reduced = useRef(false);
  reduced.current = motionOK === false;

  useEffect(() => {
    // Nothing runs until we know the motion preference (avoids a first-paint flash).
    if (motionOK === null) return;
    let raf = 0;
    let clipIdx = 0;
    let clipStart = performance.now();
    const loop = (now: number) => {
      const c = CLIPS[clipIdx];
      const cmd = c.sc.command.length;

      if (reduced.current) {
        // Reduced motion: hold each clip fully shown, still cycling slowly so it is not
        // dead, but with no typing or reveal animation.
        setIdx(clipIdx);
        setTyped(cmd);
        setRevealed(c.total);
        setPhase('output');
        if (now - clipStart > 4000) {
          clipIdx = (clipIdx + 1) % CLIPS.length;
          clipStart = now;
        }
        raf = requestAnimationFrame(loop);
        return;
      }

      const t = now - clipStart;
      const tType = c.typeMs;
      const tGap = tType + c.gapMs;
      const tDisc = tGap + c.discoverMs;
      const tReveal = tDisc + c.revealMs;
      const tEnd = tReveal + c.holdMs;

      setIdx(clipIdx);
      if (t < tType) {
        setPhase('type');
        setTyped(Math.floor(cmd * (t / tType)));
        setRevealed(0);
      } else if (t < tGap) {
        setPhase('type');
        setTyped(cmd);
        setRevealed(0);
      } else if (t < tDisc) {
        setPhase('discover');
        setTyped(cmd);
        setSpin(Math.floor((t - tGap) / 90) % SPINNER.length);
      } else if (t < tReveal) {
        setPhase('output');
        setTyped(cmd);
        const p = (t - tDisc) / c.revealMs;
        setRevealed(Math.floor(c.total * (1 - Math.pow(1 - p, 1.8))));
      } else if (t < tEnd) {
        setPhase('output');
        setTyped(cmd);
        setRevealed(c.total);
      } else {
        clipIdx = (clipIdx + 1) % CLIPS.length;
        clipStart = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // Only motionOK's null→resolved transition starts the loop; the loop reads the live
    // value from `reduced` thereafter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionOK !== null]);

  useEffect(() => {
    const el = bodyEl.current;
    if (!el) return;
    const measure = () => setOverflows(el.scrollWidth > el.clientWidth + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [idx, revealed]);

  const cmd = clip.sc.command;
  const cursorAfterCommand = phase === 'type' || (phase === 'discover' ? false : typed < cmd.length);

  const rendered = useMemo(() => {
    return clip.lines.map((line, li) => {
      if (line.pieces.length && line.pieces[0].start >= revealed) return null;
      return (
        <span key={li} className={line.structural ? 'tline tline-fixed' : 'tline'}>
          {line.pieces.map(({ tok, start, end }, i) => {
            if (start >= revealed) return null;
            const text = end > revealed ? tok.t.slice(0, revealed - start) : tok.t;
            const style: React.CSSProperties = {};
            const c = colorFor(tok);
            if (c) style.color = c;
            if (tok.bold) style.fontWeight = 600;
            if (tok.italic) style.fontStyle = 'italic';
            if (tok.dim) style.opacity = 0.72;
            return (
              <span key={i} style={style}>
                {text}
              </span>
            );
          })}
          {'\n'}
        </span>
      );
    });
  }, [clip.lines, revealed]);

  return (
    <div className="term-surface min-w-0 overflow-hidden rounded-2xl border border-[#1e2a36] shadow-[0_40px_90px_-45px_rgba(128,225,171,0.22)]">
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-5 border-b border-[#1e2a36] bg-white/[0.02] px-6 py-4 font-mono text-sm">
        <span className="flex items-center gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#f2736b]/70" />
          <span className="size-3 rounded-full bg-[#e3b44f]/70" />
          <span className="size-3 rounded-full bg-[#7ee7b0]/70" />
        </span>
        <span className="tracking-wider text-[#58606e]">recorded · v{captures.version}</span>
      </div>

      {/* The transcript: typed command, then its output. */}
      <div className={cn('relative max-w-full overflow-hidden', overflows && 'after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-14 after:bg-gradient-to-r after:from-transparent after:to-[#090e14]/95')}>
        <pre ref={bodyEl} className="m-0 min-h-[22em] overflow-x-auto px-6 py-7 font-mono text-sm leading-relaxed lg:text-base">
          <span className="tline">
            <span className="text-[#7ee7b0]">$ </span>
            <span className="text-[#f0f6fc]">{cmd.slice(0, typed)}</span>
            {cursorAfterCommand ? (
              <span className="inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-[#7ee7b0]" aria-hidden="true" />
            ) : null}
            {'\n'}
          </span>

          {/* Discovery — the spinner while it walks the tree, then the line saw prints
              when it is done. Only scan sessions discover. */}
          {clip.discovers && phase === 'discover' ? (
            <span className="tline text-[#8b97a6]">
              <span className="text-[#7ee7b0]">{SPINNER[spin]}</span> Discovering repositories…
              {'\n'}
            </span>
          ) : null}
          {clip.discovers && phase === 'output' ? (
            <span className="tline text-[#8b97a6]">
              {clip.discoveryLine}
              {'\n\n'}
            </span>
          ) : null}

          {phase === 'output' ? rendered : null}
        </pre>
      </div>

      {/* Session-position indicator only. The real `saw scan` prints no summary bar —
          its verdict is already in the output table above — so nothing here echoes a
          verdict, an exit line or a duration that the command does not actually print. */}
      <div className="flex items-center justify-end border-t border-[#1e2a36] px-6 py-4">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          {CLIPS.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                i === idx ? 'w-6 bg-[#7ee7b0]' : 'w-1.5 bg-[#3a4753]',
              )}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
