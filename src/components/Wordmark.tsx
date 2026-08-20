/**
 * The SAW wordmark, generated from THE canonical letter grid.
 *
 * These three arrays are copied verbatim from the shipped CLI
 * (`src/stayawake/cli/_banner.py`, `_S` / `_A` / `_W`), which paints them in block
 * characters on every bare `saw`. Deriving the site mark from the same grid is the
 * point: the logo and the product are the same glyphs, so they must not be allowed to
 * drift — the app icon and the CLI have already drifted once, in the `S`.
 *
 * If the CLI's grid ever changes, change it here in the same pass.
 */

const S = [' █████', '██    ', ' ████ ', '    ██', '█████ '];
const A = ['  ███  ', ' █████ ', '██   ██', '███████', '██   ██'];
const W = ['██   ██', '██   ██', '██ █ ██', '███████', ' ██ ██ '];

const GAP = 2; // the CLI joins letters with two spaces; keep the same rhythm

type Cell = { x: number; y: number };

function cells(): { cells: Cell[]; cols: number; rows: number } {
  const letters = [S, A, W];
  const out: Cell[] = [];
  let offset = 0;
  for (const letter of letters) {
    const width = Math.max(...letter.map((r) => r.length));
    letter.forEach((row, y) => {
      [...row].forEach((ch, x) => {
        if (ch === '█') out.push({ x: offset + x, y });
      });
    });
    offset += width + GAP;
  }
  return { cells: out, cols: offset - GAP, rows: letters[0].length };
}

const GRID = cells();

export function Wordmark({
  height = 44,
  animate = false,
  title = 'saw',
}: {
  height?: number;
  animate?: boolean;
  title?: string;
}) {
  const unit = height / GRID.rows;
  return (
    <svg
      className={animate ? 'wordmark wordmark-paint' : 'wordmark'}
      width={GRID.cols * unit}
      height={height}
      viewBox={`0 0 ${GRID.cols} ${GRID.rows}`}
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
    >
      {GRID.cells.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x}
          y={c.y}
          width={1}
          height={1}
          fill="currentColor"
          /* Row-by-row reveal: one orchestrated moment on load, never repeated, and
             disabled outright under prefers-reduced-motion (see globals.css). */
          style={animate ? { animationDelay: `${c.y * 90 + c.x * 6}ms` } : undefined}
        />
      ))}
    </svg>
  );
}

/** The 16px problem: three bitmap letters are illegible at favicon size, so the tile
 *  falls back to the S alone — same grid, same ground, still recognisably the mark. */
export function Monogram({ size = 32 }: { size?: number }) {
  const rows = S.length;
  const cols = Math.max(...S.map((r) => r.length));
  return (
    <svg
      width={size}
      height={size}
      viewBox={`-1 -1 ${cols + 2} ${rows + 2}`}
      role="img"
      aria-label="saw"
      shapeRendering="crispEdges"
    >
      <rect x={-1} y={-1} width={cols + 2} height={rows + 2} rx={1.4} fill="#090e14" />
      {S.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === '█' ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#80e1ab" /> : null,
        ),
      )}
    </svg>
  );
}
