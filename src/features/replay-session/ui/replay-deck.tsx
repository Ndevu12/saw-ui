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

/** One clip = a session plus its pre-computed layout and timeline. */
const CLIPS = ORDER.map((id) => BY_ID[id])
  .filter(Boolean)
  .map((sc) => {
    const { lines, total } = layout(sc);
    const typeMs = Math.max(650, sc.command.length * 60);
    const gapMs = 480; // the beat after Enter
    const revealMs = Math.min(Math.max(1200, lines.length * 90), 2800);
    const holdMs = 2800; // sit on the result
    return { sc, lines, total, typeMs, gapMs, revealMs, holdMs, dur: typeMs + gapMs + revealMs + holdMs };
  });

const VERDICT_WORD: Record<number, string> = {
  0: 'clean',
  1: 'infected',
  2: 'could not be scanned',
  3: 'rotation unsafe',
};

export function ReplayDeck() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0); // command chars shown
  const [revealed, setRevealed] = useState(0); // output chars shown
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const bodyEl = useRef<HTMLPreElement | null>(null);

  const clip = CLIPS[idx];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const u = () => setMotionOK(!mq.matches);
    u();
    mq.addEventListener('change', u);
    return () => mq.removeEventListener('change', u);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => setInView(e[0]?.isIntersecting ?? false),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The driver. rAF paints the typing and the reveal; a pair of timeouts guarantee the
  // clip is fully shown for its hold and then hands off — so the story advances even if
  // the frame loop is throttled to nothing.
  useEffect(() => {
    const cmd = clip.sc.command.length;
    if (!motionOK) {
      setTyped(cmd);
      setRevealed(clip.total);
      return;
    }
    if (!inView) return;

    setTyped(0);
    setRevealed(0);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      if (t < clip.typeMs) {
        setTyped(Math.floor(cmd * (t / clip.typeMs)));
        setRevealed(0);
      } else if (t < clip.typeMs + clip.gapMs) {
        setTyped(cmd);
        setRevealed(0);
      } else if (t < clip.typeMs + clip.gapMs + clip.revealMs) {
        const p = (t - clip.typeMs - clip.gapMs) / clip.revealMs;
        setTyped(cmd);
        setRevealed(Math.floor(clip.total * (1 - Math.pow(1 - p, 1.8))));
      }
      if (t < clip.typeMs + clip.gapMs + clip.revealMs) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const showAll = setTimeout(() => {
      setTyped(cmd);
      setRevealed(clip.total);
    }, clip.typeMs + clip.gapMs + clip.revealMs);
    const advance = setTimeout(() => setIdx((i) => (i + 1) % CLIPS.length), clip.dur + 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(showAll);
      clearTimeout(advance);
    };
  }, [idx, inView, motionOK, clip]);

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
  const outStarted = typed >= cmd.length;
  const done = revealed >= clip.total;
  const cursorAfterCommand = !outStarted || revealed === 0;
  const tone = clip.sc.exitCode === 0 ? 'ok' : clip.sc.exitCode === 1 ? 'bad' : 'warn';

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
    <div ref={root} className="term-surface min-w-0 overflow-hidden rounded-2xl border border-[#1e2a36] shadow-[0_40px_90px_-45px_rgba(128,225,171,0.22)]">
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
        <pre ref={bodyEl} className="m-0 min-h-[22em] overflow-x-auto px-6 py-7 font-mono text-[0.9rem] leading-[1.7] sm:text-[0.95rem] lg:text-base">
          <span className="tline">
            <span className="text-[#7ee7b0]">$ </span>
            <span className="text-[#f0f6fc]">{cmd.slice(0, typed)}</span>
            {cursorAfterCommand ? (
              <span className="inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-[#7ee7b0]" aria-hidden="true" />
            ) : null}
            {'\n'}
          </span>
          {outStarted ? rendered : null}
        </pre>
      </div>

      {/* Result + which session is playing (indicator, not a control). */}
      <div className="flex flex-wrap items-center gap-4 border-t border-[#1e2a36] px-6 py-4 font-mono text-sm">
        {done && clip.sc.isVerdict ? (
          <span className="inline-flex items-baseline gap-3">
            <span
              className={cn(
                'rounded-md px-3 py-0.5 text-xl font-semibold tabular-nums text-[#090e14]',
                tone === 'ok' && 'bg-[#7ee7b0]',
                tone === 'bad' && 'bg-[#f2736b]',
                tone === 'warn' && 'bg-[#e3b44f]',
              )}
            >
              {clip.sc.exitCode}
            </span>
            <span className="text-[#7a8594]">exit — {VERDICT_WORD[clip.sc.exitCode] ?? 'unknown'}</span>
          </span>
        ) : (
          <span className="text-[#58606e]">{clip.sc.command}</span>
        )}

        <span className="ml-auto flex items-center gap-4">
          {done ? <span className="tabular-nums text-[#58606e]">{clip.sc.duration.toFixed(2)}s</span> : null}
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
        </span>
      </div>
    </div>
  );
}
