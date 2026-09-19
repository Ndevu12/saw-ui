import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

/* A dashed stroke on this path (pathLength + a stretched viewBox) breaks
   the curve into fragments. Paint it as one stroke. */
const stroke =
  'fill-none stroke-mint/45 [stroke-linecap:round] [stroke-linejoin:round]';

const PAGE = { left: 32, right: 68 } as const;
const RAIL = 22;

/**
 * A vertical beat: the action sits on the path. Copy lives on the same
 * side the line curves to — left of a left node, right of a right node.
 * The title shares a 3.5rem row with the node; the rest hangs under it.
 */
export function FlowBeat({
  side,
  n,
  tone,
  first = false,
  last = false,
  title,
  children,
}: {
  side: 'left' | 'right';
  n: string;
  tone: 'ground' | 'surface';
  first?: boolean;
  last?: boolean;
  title: ReactNode;
  children: ReactNode;
}) {
  const left = side === 'left';
  return (
    <div>
      <div className="flex items-start gap-5 lg:hidden">
        <FlowNode n={n} tone={tone} />
        <div className="min-w-0">
          <div className="flex min-h-14 items-center">{title}</div>
          <div className="mt-1">{children}</div>
        </div>
      </div>
      <div
        className={cn(
          'hidden lg:grid lg:grid-rows-[3.5rem_auto] lg:gap-x-10',
          left
            ? 'lg:grid-cols-[minmax(0,calc(32%-4.25rem))_3.5rem_minmax(0,1fr)]'
            : 'lg:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,calc(32%-4.25rem))]',
        )}
      >
        <div
          className={cn(
            'flex items-center',
            left ? 'col-start-1 justify-end text-right' : 'col-start-3',
          )}
        >
          {title}
        </div>
        <div className="relative col-start-2 row-span-2 flex flex-col items-center">
          <span
            aria-hidden
            className={cn(
              'absolute left-1/2 w-0.5 -translate-x-px bg-mint/45',
              first && last && 'hidden',
              first && !last && 'top-7 bottom-0',
              !first && last && 'top-0 h-7',
              !first && !last && 'inset-y-0',
            )}
          />
          <FlowNode n={n} tone={tone} />
        </div>
        <div
          className={cn(
            left ? 'col-start-1 flex justify-end text-right' : 'col-start-3',
          )}
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * The stroke between two beats. It is never a straight drop — it curves
 * toward the side the next action lives on.
 */
export function FlowBend({
  from,
  to,
}: {
  from: 'left' | 'right';
  to: 'left' | 'right';
}) {
  const bulge = to === 'right' ? 78 : 8;
  return (
    <div aria-hidden>
      <svg
        viewBox="0 0 100 96"
        preserveAspectRatio="none"
        className="h-24 w-32 lg:hidden"
      >
        <path
          className={stroke}
          d={`M ${RAIL} 0 C ${RAIL} 28, ${bulge} 40, ${bulge} 48 C ${bulge} 56, ${RAIL} 68, ${RAIL} 96`}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        viewBox="0 0 100 128"
        preserveAspectRatio="none"
        className="hidden h-32 w-full lg:block"
      >
        <path
          className={stroke}
          d={`M ${PAGE[from]} 0 C ${PAGE[from] - (from === 'left' ? 8 : -8)} 48, ${PAGE[to] + (to === 'left' ? -8 : 8)} 52, ${PAGE[to]} 128`}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
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
        'relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-mint/40 font-display text-base font-bold text-mint',
        tone === 'surface' ? 'bg-surface' : 'bg-ground',
      )}
    >
      {n}
    </span>
  );
}
