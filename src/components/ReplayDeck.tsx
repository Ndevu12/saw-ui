'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import captures from '@/data/captures.json';

/**
 * The replay deck: real recorded `saw` sessions, played back.
 *
 * Three things it is deliberately NOT:
 *  - not a server-side sandbox. Executing a scanner on demand from a public page would
 *    contradict the one thing this site promises out loud (nothing leaves your machine)
 *    and would bolt a live execution surface onto a security brand.
 *  - not a fake shell. Nothing here responds to typed input, because a canned response
 *    to an unscripted command is a lie about the product.
 *  - not an animation of invented output. Every token comes from tools/capture.py.
 *
 * The visitor chooses the SESSION, never the command. That is real agency with no
 * backend and no deception.
 *
 * Accessibility: the full transcript is in the DOM as selectable text from first paint.
 * The animation only masks what has not been "typed" yet, so with JavaScript disabled,
 * with a screen reader, or under prefers-reduced-motion, the reader gets the complete
 * final transcript immediately. It is never an image and never a video.
 */

type Token = { t: string; fg: string | null; bold: boolean; italic: boolean; dim: boolean };
type Scenario = {
  id: string;
  label: string;
  blurb: string;
  command: string;
  exitCode: number;
  isVerdict: boolean;
  duration: number;
  tokens: Token[];
  plain: string;
};

const SCENARIOS = captures.scenarios as Scenario[];

/* The recorded palette is truecolor hex from the CLI. Two of its colours are the brand
   mint and near-white; the rest map to a muted terminal set. Mapping rather than using
   the raw hex keeps the terminal legible against our ground and lets the mint stay the
   one saturated thing on screen. */
const PALETTE: Record<string, string> = {
  '#7ee7b0': 'var(--t-mint)',
  '#4cd07d': 'var(--t-green)',
  '#5fd3dd': 'var(--t-cyan)',
  '#7a8594': 'var(--t-dim)',
  '#58606e': 'var(--t-faint)',
  '#f0f6fc': 'var(--t-white)',
  '#c9d3de': 'var(--t-fg)',
};

function colorFor(tok: Token): string | undefined {
  if (!tok.fg) return undefined;
  const mapped = PALETTE[tok.fg.toLowerCase()];
  if (mapped) return mapped;
  if (tok.fg.startsWith('#')) return tok.fg;
  return undefined;
}

type Piece = { tok: Token; start: number; end: number };
type Line = { pieces: Piece[]; structural: boolean };

/* A terminal line is one of two things, and they must render differently.
   STRUCTURAL — a table row, a rule, an aligned column set — carries meaning in its
   horizontal position, so it must never wrap; it scrolls instead. PROSE wraps, which
   is exactly what a real terminal does with a long line at a narrow width.
   `saw` does not reflow to terminal width (measured: identical transcript at 100, 64
   and 44 columns), so this classification is how the page stays faithful rather than
   a styling convenience. */
const BOX = /[\u2500-\u257f\u2580-\u259f]/;
const ALIGNED = /\S {2,}\S/;

function isStructural(text: string): boolean {
  return BOX.test(text) || ALIGNED.test(text);
}

/** Split a scenario into lines of styled pieces, carrying a running character offset
 *  so the reveal can cut mid-token without rebuilding the tree. */
function layout(sc: Scenario) {
  const lines: Line[] = [];
  let current: Piece[] = [];
  let text = '';
  let n = 0;

  const flushLine = () => {
    lines.push({ pieces: current, structural: isStructural(text) });
    current = [];
    text = '';
  };

  for (const tok of sc.tokens) {
    const parts = tok.t.split('\n');
    parts.forEach((part, i) => {
      if (i > 0) {
        n += 1; // the newline itself
        flushLine();
      }
      if (part) {
        current.push({ tok: { ...tok, t: part }, start: n, end: n + part.length });
        text += part;
        n += part.length;
      }
    });
  }
  if (current.length || text) flushLine();
  return { lines, total: n };
}

export function ReplayDeck() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(Number.POSITIVE_INFINITY);
  const [playing, setPlaying] = useState(false);
  const [motionOK, setMotionOK] = useState(false);
  const body = useRef<HTMLPreElement | null>(null);
  const [overflows, setOverflows] = useState(false);
  const raf = useRef<number | null>(null);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAt = useRef(0);

  const scenario = SCENARIOS[active];
  const { lines, total } = useMemo(() => layout(scenario), [scenario]);

  // Only ever animate once we know the reader wants motion. Until then — and that
  // includes the entire server-rendered pass — everything is revealed.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotionOK(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    if (failsafe.current !== null) clearTimeout(failsafe.current);
    raf.current = null;
    failsafe.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (!motionOK) return;
    stop();
    setRevealed(0);
    setPlaying(true);
    startedAt.current = performance.now();

    // Pace by the RECORDED duration, so the replay never implies a speed the tool does
    // not have. Very short runs are stretched to a readable floor and very long ones
    // capped, but only within a range that keeps the claim honest — the true elapsed
    // time is printed next to the deck either way.
    const seconds = Math.min(Math.max(scenario.duration, 1.6), 6);
    const step = (now: number) => {
      const progress = (now - startedAt.current) / (seconds * 1000);
      if (progress >= 1) {
        setRevealed(Number.POSITIVE_INFINITY);
        setPlaying(false);
        raf.current = null;
        return;
      }
      // Ease out: output arrives in a rush and settles, which is how a scan reads.
      setRevealed(Math.floor(total * (1 - Math.pow(1 - progress, 1.8))));
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);

    // Fail toward VISIBLE. If requestAnimationFrame never fires — a headless or
    // background tab, a machine with no display link, a browser that throttles the
    // frame loop to nothing — the reveal would otherwise sit at zero and the reader
    // would stare at an empty terminal. This guarantees the transcript appears whether
    // or not it was ever animated. (Found while screenshotting: headless macOS fails
    // CVDisplayLinkCreateWithCGDisplay and never delivers a frame callback.)
    failsafe.current = setTimeout(() => {
      setRevealed(Number.POSITIVE_INFINITY);
      setPlaying(false);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
    }, seconds * 1000 + 750);
  }, [motionOK, scenario.duration, stop, total]);

  // Autoplay the first scenario once motion is known to be welcome, and replay whenever
  // the reader picks a different session.
  useEffect(() => {
    if (motionOK) play();
    else setRevealed(Number.POSITIVE_INFINITY);
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, motionOK]);

  useEffect(() => () => stop(), [stop]);

  // The right-edge fade signals "there is more to the right". It must only appear when
  // that is actually true — a permanent fade would be the page implying something the
  // layout does not contain, which is the one habit this site does not get to have.
  useEffect(() => {
    const el = body.current;
    if (!el) return;
    const measure = () => setOverflows(el.scrollWidth > el.clientWidth + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scenario, revealed]);

  const done = revealed >= total;
  const verdictTone = scenario.exitCode === 0 ? 'ok' : scenario.exitCode === 1 ? 'bad' : 'warn';
  const VERDICT_WORD: Record<number, string> = {
    0: 'clean',
    1: 'infected',
    2: 'could not be scanned',
    3: 'rotation unsafe',
  };

  return (
    <div className="deck">
      <div className="deck-tabs" role="tablist" aria-label="Recorded sessions">
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.id}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="deck-panel"
            className={i === active ? 'deck-tab is-on' : 'deck-tab'}
            onClick={() => setActive(i)}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className="term" id="deck-panel" role="tabpanel" aria-live="off">
        <div className="term-bar">
          <span className="term-cmd">
            <span className="term-prompt">$</span> {scenario.command}
          </span>
          <span className="term-meta">
            recorded · v{captures.version}
          </span>
        </div>

        <div className={overflows ? 'term-wrap is-clipped' : 'term-wrap'}>
        <pre className="term-body" tabIndex={0} ref={body}>
          {lines.map((line, li) => {
            if (!done && line.pieces.length && line.pieces[0].start >= revealed) return null;
            return (
              <span key={li} className={line.structural ? 'tline tline-fixed' : 'tline'}>
                {line.pieces.map(({ tok, start, end }, i) => {
                  if (!done && start >= revealed) return null;
                  const text = !done && end > revealed ? tok.t.slice(0, revealed - start) : tok.t;
                  const style: React.CSSProperties = {};
                  const c = colorFor(tok);
                  if (c) style.color = c;
                  if (tok.bold) style.fontWeight = 600;
                  if (tok.italic) style.fontStyle = 'italic';
                  if (tok.dim) style.opacity = 0.72;
                  return <span key={i} style={style}>{text}</span>;
                })}
                {'\n'}
              </span>
            );
          })}
          {playing ? <span className="term-caret" aria-hidden="true" /> : null}
        </pre>
        </div>

        <div className="term-foot">
          {scenario.isVerdict ? (
            <span className={`verdict verdict-${verdictTone}`}>
              <span className="verdict-num">{scenario.exitCode}</span>
              <span className="verdict-word">
                exit — {VERDICT_WORD[scenario.exitCode] ?? 'unknown'}
              </span>
            </span>
          ) : (
            <span className="verdict-word">no verdict — this command reports nothing</span>
          )}
          <span className="term-time">{scenario.duration.toFixed(2)}s</span>
          {motionOK ? (
            <button type="button" className="term-btn" onClick={playing ? stop : play}>
              {playing ? 'Skip' : 'Replay'}
            </button>
          ) : null}
        </div>
      </div>

      <p className="deck-blurb">{scenario.blurb}</p>
    </div>
  );
}
