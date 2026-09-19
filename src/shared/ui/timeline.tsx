import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

export type TimelineStep = {
  marker: string;
  title: string;
  body: ReactNode;
};

/**
 * Numbered spine. `stack` keeps every step on the left (a path). `zigzag`
 * alternates left/right around a centre spine from the `lg` breakpoint up, and
 * collapses to the same left spine below that.
 */
export function Timeline({
  steps,
  layout = 'stack',
  pulse = false,
  tone = 'ground',
  after,
}: {
  steps: TimelineStep[];
  layout?: 'stack' | 'zigzag';
  pulse?: boolean;
  tone?: 'ground' | 'surface';
  after?: { marker: ReactNode; body: ReactNode };
}) {
  const zigzag = layout === 'zigzag';
  const large = layout === 'stack';
  const nodeBg = tone === 'surface' ? 'bg-surface' : 'bg-ground';

  return (
    <ol
      className={cn(
        'relative',
        large ? '[--node:3.5rem]' : '[--node:2.75rem]',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-[calc(var(--node)/2)] bottom-[calc(var(--node)/2)] w-px -translate-x-1/2 bg-rule',
          zigzag
            ? 'left-[calc(var(--node)/2)] lg:left-1/2'
            : 'left-[calc(var(--node)/2)]',
        )}
      />
      {steps.map((step, i) => (
        <TimelineRow
          key={step.title}
          step={step}
          index={i}
          zigzag={zigzag}
          large={large}
          pulse={pulse}
          nodeBg={nodeBg}
        />
      ))}
      {after ? (
        <li
          className={cn(
            'rise relative mt-12 grid items-start gap-x-6 lg:mt-16',
            'grid-cols-[var(--node)_minmax(0,1fr)]',
            zigzag && 'lg:grid-cols-[minmax(0,1fr)_var(--node)_minmax(0,1fr)] lg:gap-x-12',
          )}
        >
          <span
            className={cn(
              'relative z-10 col-start-1 row-start-1 flex size-[var(--node)] items-center justify-center rounded-full border border-mint/40 text-mint',
              nodeBg,
              zigzag && 'lg:col-start-2',
            )}
          >
            {after.marker}
          </span>
          <div
            className={cn(
              'col-start-2 row-start-1 self-center',
              zigzag && 'lg:col-start-3',
            )}
          >
            {after.body}
          </div>
        </li>
      ) : null}
    </ol>
  );
}

function TimelineRow({
  step,
  index,
  zigzag,
  large,
  pulse,
  nodeBg,
}: {
  step: TimelineStep;
  index: number;
  zigzag: boolean;
  large: boolean;
  pulse: boolean;
  nodeBg: string;
}) {
  const placeRight = zigzag && index % 2 === 1;

  return (
    <li
      className={cn(
        'rise relative grid items-start gap-x-6',
        'grid-cols-[var(--node)_minmax(0,1fr)]',
        zigzag && 'lg:grid-cols-[minmax(0,1fr)_var(--node)_minmax(0,1fr)] lg:gap-x-12',
        index > 0 && (large ? 'mt-16 lg:mt-20' : 'mt-12 lg:mt-16'),
      )}
    >
      <span
        className={cn(
          'relative z-10 col-start-1 row-start-1 flex size-[var(--node)] shrink-0 items-center justify-center rounded-full border border-rule font-mono text-sm text-mint',
          nodeBg,
          zigzag && 'lg:col-start-2',
          pulse && 'signal-dot',
        )}
        style={pulse ? { animationDelay: `${index * 0.45}s` } : undefined}
      >
        {step.marker}
      </span>
      <div
        className={cn(
          'col-start-2 row-start-1 flex flex-col gap-3',
          zigzag && placeRight && 'lg:col-start-3',
          zigzag && !placeRight && 'lg:col-start-1 lg:items-end lg:text-right',
        )}
      >
        <h3
          className={cn(
            'font-display tracking-tight text-ink-strong',
            large ? 'text-2xl font-bold' : 'text-lg font-semibold',
          )}
        >
          {step.title}
        </h3>
        {step.body}
      </div>
    </li>
  );
}
