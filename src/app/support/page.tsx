import type { Metadata } from 'next';
import { SiteHeader } from '@/widgets/site-header/ui/site-header';
import { Wordmark } from '@/shared/ui/wordmark';
import { site, shell } from '@/shared/config/site';

export const metadata: Metadata = {
  title: 'Support saw',
  description:
    'Sponsor the hunt. saw is open source — support funds detection work, remediation and ' +
    'releases. One address starts the conversation, for sponsorship and commercial licensing alike.',
};

/* mailto, not a hosted form: the visitor's own mail client opens with nothing sent to us
   or anyone else until they choose to — the same "loads nothing, tells no one" posture
   as the rest of the site. */
const MAIL = `mailto:${site.email}?subject=${encodeURIComponent('Supporting saw')}`;

export default function Support() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main id="main" className="flex flex-1 items-center">
        <section className={`${shell} max-w-[1200px] py-24 lg:py-32`}>
          <div className="flex max-w-[56ch] flex-col gap-5">
            <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">
              Support
            </p>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-balance text-ink-strong md:text-5xl">
              Keep the sentinel hunting.
            </h1>
            <p className="text-lg leading-relaxed text-ink-dim md:text-xl">
              saw is open source — the scanner, the remediation, the CI gate, all of it. Support
              funds the hunt: new detections, sharper audits, and releases that ship signed and
              self-scanned. Tell us how you want to back the work, and we&apos;ll take it from
              there.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href={MAIL}
              className="rise inline-flex items-center rounded-xl bg-mint px-8 py-4 font-mono text-base font-semibold text-ground transition-opacity hover:opacity-90"
            >
              Email {site.email}
            </a>
            <p className="max-w-[36ch] text-base text-ink-faint">
              Opens your own mail client — nothing is sent anywhere until you press send.
            </p>
          </div>

          <p className="mt-14 max-w-[56ch] text-base leading-relaxed text-ink-faint">
            <span className="text-ink-dim">Running saw inside a commercial product?</span> The same
            address handles commercial licensing — saw is AGPL-3.0 with a commercial option.
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
