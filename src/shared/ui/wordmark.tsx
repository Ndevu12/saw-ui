/**
 * The SAW wordmark, generated from THE canonical letter grid.
 *
 * These arrays are copied verbatim from the shipped CLI
 * (`src/stayawake/cli/_banner.py`, `_S` / `_A` / `_W`), which paints them in block
 * characters on every bare `saw`. Deriving the site mark from the same grid is the
 * point: the logo and the product are the same glyphs and must not drift — the app
 * icon and the CLI have already drifted once, in the `S`.
 */
import { cn } from '@/shared/lib/utils';

const S = [' █████', '██    ', ' ████ ', '    ██', '█████ '];
const A = ['  ███  ', ' █████ ', '██   ██', '███████', '██   ██'];
const W = ['██   ██', '██   ██', '██ █ ██', '███████', ' ██ ██ '];
const GAP = 2; // the CLI joins letters with two spaces; keep the same rhythm

const GRID = (() => {
  const cells: { x: number; y: number }[] = [];
  let offset = 0;
  for (const letter of [S, A, W]) {
    const width = Math.max(...letter.map((r) => r.length));
    letter.forEach((row, y) =>
      [...row].forEach((ch, x) => {
        if (ch === '█') cells.push({ x: offset + x, y });
      }),
    );
    offset += width + GAP;
  }
  return { cells, cols: offset - GAP, rows: S.length };
})();

export function Wordmark({
  height = 44,
  animate = false,
  className,
}: {
  height?: number;
  animate?: boolean;
  className?: string;
}) {
  const unit = height / GRID.rows;
  return (
    <svg
      className={cn('block text-mint', className)}
      width={GRID.cols * unit}
      height={height}
      viewBox={`0 0 ${GRID.cols} ${GRID.rows}`}
      role="img"
      aria-label="saw"
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
          className={animate ? 'mark-paint' : undefined}
          style={
            animate
              ? { animationDelay: `${c.y * 80 + c.x * 5}ms` }
              : undefined
          }
        />
      ))}
    </svg>
  );
}
