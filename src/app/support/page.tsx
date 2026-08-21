import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { SiteHeader } from '@/widgets/site-header/ui/site-header';
import { Wordmark } from '@/shared/ui/wordmark';
import { site, shell } from '@/shared/config/site';

export const metadata: Metadata = {
  title: 'Support saw',
  description:
    'saw is open source. Sponsorship funds the hunt — new detections, sharper audits, and ' +
    'releases that ship signed and self-scanned.',
};

/* mailto, not a hosted form: a form needs a backend or a third party, and either breaks
   the site's loads-nothing promise. The button says what it is; it never prints the address. */
const MAIL = `mailto:${site.email}?subject=${encodeURIComponent('Supporting saw')}`;

export default function Support() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main id="main" className="flex flex-1 items-center">
        <section className={`${shell} flex max-w-[1200px] flex-col items-center py-24 text-center lg:py-32`}>
          <p
            className="reveal font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm"
            style={{ '--reveal-delay': '40ms' } as React.CSSProperties}
          >
            Support the hunt
          </p>

          <h1
            className="reveal mt-6 max-w-[18ch] font-display text-4xl leading-tight font-bold tracking-tight text-balance text-ink-strong md:text-6xl"
            style={{ '--reveal-delay': '130ms' } as React.CSSProperties}
          >
            Keep the sentinel hunting.
          </h1>

          <p
            className="reveal mt-7 max-w-[48ch] text-lg leading-relaxed text-ink-dim md:text-xl"
            style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
          >
            saw is open source. Sponsorship funds what ships next —
          </p>

          <ul
            className="reveal mt-8 flex flex-col items-start gap-2.5 font-mono text-sm text-mint"
            style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
          >
            {['new detections', 'sharper host audits', 'releases signed and self-scanned'].map(
              (line) => (
                <li key={line} className="flex items-center gap-2.5">
                  <Check className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ),
            )}
          </ul>

          <a
            href={MAIL}
            className="reveal rise mt-12 inline-flex items-center rounded-xl bg-mint px-10 py-4 text-lg font-semibold text-ground transition-opacity hover:opacity-90"
            style={{ '--reveal-delay': '380ms' } as React.CSSProperties}
          >
            Support saw
          </a>

          <p
            className="reveal mt-14 max-w-[44ch] text-base text-ink-faint"
            style={{ '--reveal-delay': '460ms' } as React.CSSProperties}
          >
            Shipping saw inside a commercial product?{' '}
            <a href={MAIL} className="text-ink-dim underline underline-offset-4 transition-colors hover:text-ink-strong">
              Commercial licensing
            </a>{' '}
            starts the same conversation.
          </p>
        </section>
      </main>

      <footer className={`${shell} border-t border-rule py-14`}>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Wordmark height={30} />
            <p className="font-mono text-sm tracking-[0.2em] text-ink-faint uppercase">
              the sentinel saw the worm
            </p>
          </div>
          <a href="/" className="text-base text-ink-dim transition-colors hover:text-ink-strong">
            ← Back to saw
          </a>
        </div>
      </footer>
    </div>
  );
}
