import { cn } from '@/shared/lib/utils';

const stroke =
  'flow-draw fill-none stroke-mint/45 [stroke-linecap:round] [stroke-linejoin:round]';

/**
 * Horizontal run through a row of nodes. Centres sit at 1/2N, 3/2N, … of the row.
 */
export function FlowRun({ cols }: { cols: 2 | 3 }) {
  const d = cols === 3 ? 'M 16.667 28 H 83.333' : 'M 25 28 H 75';
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 56"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full"
    >
      <path pathLength="1" className={stroke} d={d} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * The fold between two runs: down, across, down. That Z is the flow.
 */
export function FlowFold({ cols }: { cols: 2 | 3 }) {
  const from = cols === 3 ? 83.333 : 75;
  const to = cols === 3 ? 16.667 : 25;
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 64"
      preserveAspectRatio="none"
      className="h-16 w-full"
    >
      <path
        pathLength="1"
        className={stroke}
        d={`M ${from} 0 V 32 H ${to} V 64`}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * One-column jog: the line steps sideways then returns, so a stack still reads as a path.
 */
export function FlowJog({ toward }: { toward: 'left' | 'right' }) {
  const x = toward === 'left' ? 22 : 78;
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 64"
      preserveAspectRatio="none"
      className="h-16 w-full max-w-[11rem]"
    >
      <path
        pathLength="1"
        className={stroke}
        d={`M 50 0 V 16 H ${x} V 48 H 50 V 64`}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Full-measure zag between two left-sitting nodes. `left-7` is the centre of
 * the 3.5rem node, so the stroke actually meets it.
 */
export function FlowZag() {
  return (
    <div aria-hidden className="relative h-24 w-full">
      <span className="absolute top-0 left-7 h-1/3 w-0.5 bg-mint/45" />
      <span className="absolute top-1/3 right-7 left-7 h-0.5 bg-mint/45" />
      <span className="absolute top-1/3 right-7 h-1/3 w-0.5 bg-mint/45" />
      <span className="absolute top-2/3 right-7 left-7 h-0.5 bg-mint/45" />
      <span className="absolute top-2/3 bottom-0 left-7 w-0.5 bg-mint/45" />
    </div>
  );
}

export function FlowNode({
  n,
  tone,
}: {
  n: string;
  tone: 'ground' | 'surface';
}) {
  return (
    <span
      className={cn(
        'relative z-10 flex size-14 items-center justify-center rounded-full border border-mint/40 font-display text-base font-bold text-mint',
        tone === 'surface' ? 'bg-surface' : 'bg-ground',
      )}
    >
      {n}
    </span>
  );
}
