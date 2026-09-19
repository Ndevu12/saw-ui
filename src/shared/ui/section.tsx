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
 * Section opening: one type block, not a split. The title is a short rag;
 * an optional second beat sits under it; the lead hangs beneath as a dek.
 * Children sit under the pair at full measure.
 */
export function SectionIntro({
  eyebrow,
  title,
  turn,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  turn?: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-16 lg:mb-24">
      {eyebrow ? (
        <p className="mb-5 font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-[20ch] font-display text-4xl leading-[1.05] font-bold tracking-tight text-ink-strong md:text-5xl 2xl:text-6xl">
        {title}
        {turn ? (
          <span className="mt-2 block text-[0.82em] font-semibold tracking-tight text-ink md:mt-3">
            {turn}
          </span>
        ) : null}
      </h2>
      <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-ink-dim md:mt-10 md:text-xl lg:ml-[min(16rem,26%)]">
        <span aria-hidden className="mb-5 block h-px w-14 bg-mint/55" />
        {lead}
      </p>
      {children ? <div className="mt-10">{children}</div> : null}
    </header>
  );
}
