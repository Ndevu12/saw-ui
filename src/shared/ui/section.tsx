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
 * Section opening: display title on the left, lead on the right from `lg` up,
 * stacked below that. Optional children sit under the pair at full measure.
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
    <header className="mb-16 lg:mb-24">
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="flex flex-col gap-5">
          {eyebrow ? (
            <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance text-ink-strong md:text-5xl 2xl:text-6xl">
            {title}
          </h2>
        </div>
        <p className="max-w-[44ch] text-lg leading-relaxed text-ink-dim md:text-xl lg:border-l lg:border-mint/30 lg:pl-10">
          {lead}
        </p>
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </header>
  );
}
