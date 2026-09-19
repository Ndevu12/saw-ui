import type { ReactNode } from 'react';
import { shell } from '@/shared/config/site';
import { cn } from '@/shared/lib/utils';

/**
 * Full-bleed frame for a homepage band. The background rides the viewport;
 * the inner measure is the shared shell.
 */
export function Section({
  id,
  band = 'ground',
  children,
}: {
  id?: string;
  band?: 'ground' | 'surface';
  children: ReactNode;
}) {
  const frame = cn(id && 'header-offset', band === 'surface' && 'bg-surface');

  return (
    <section id={id} className={frame || undefined}>
      <div className={`${shell} py-24 lg:py-36`}>{children}</div>
    </section>
  );
}

/**
 * Shared section opening: optional eyebrow, title, lead. Measure is 52ch so
 * every below-hero intro reads at the same width.
 */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-16 lg:mb-20">
      <div className="flex max-w-[52ch] flex-col gap-5">
        {eyebrow ? (
          <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-balance text-ink-strong">
          {title}
        </h2>
        <p className="text-lg leading-relaxed text-ink-dim md:text-xl">{lead}</p>
      </div>
      {children ? <div className="mt-8">{children}</div> : null}
    </header>
  );
}
