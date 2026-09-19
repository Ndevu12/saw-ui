import { SiteHeader } from '@/widgets/site-header/ui/site-header';
import { Hero } from '@/widgets/hero/ui/hero';
import { Threat } from '@/widgets/threat/ui/threat';
import { Mitigation } from '@/widgets/mitigation/ui/mitigation';
import { Promises } from '@/widgets/promises/ui/promises';
import { InstallSection } from '@/widgets/install/ui/install-section';
import { Wordmark } from '@/shared/ui/wordmark';
import { publishedVersion } from '@/shared/lib/version';
import { ExtLink } from '@/shared/ui/ext-link';
import { shell, site } from '@/shared/config/site';

export default async function Home() {
  const version = await publishedVersion();

  return (
    /* One page-spanning column so the sticky header sticks through every section, not
       just the first screen — a sticky element only sticks within its own parent. */
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main id="main" className="header-offset">
        <Hero />
        <Threat />
        <Mitigation />
        <Promises />
        <InstallSection version={version} />
      </main>

      <footer className={`${shell} border-t border-rule py-20`}>
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex flex-col gap-3">
            <a
              href="/"
              aria-label="saw — home"
              className="w-fit rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
            >
              <Wordmark height={30} />
            </a>
            <p className="font-mono text-sm tracking-[0.2em] text-ink-faint uppercase">
              the sentinel saw the worm
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-base">
            {[
              ['Documentation', `${site.docs}/latest/`],
              ['Trust model', `${site.docs}/latest/explanation/trust-model/`],
              ['Security', `${site.repo}/blob/main/SECURITY.md`],
              ['PyPI', site.pypi],
              ['GitHub', site.repo],
            ].map(([label, href]) => (
              <ExtLink key={label} href={href} className="text-ink-dim transition-colors hover:text-ink-strong">
                {label}
              </ExtLink>
            ))}
            {/* Internal route — a plain anchor, not ExtLink, so it stays in this tab. */}
            <a href="/support" className="text-ink-dim transition-colors hover:text-ink-strong">
              Support
            </a>
          </div>
        </div>

        <p className="mt-16 max-w-[52ch] text-lg text-ink-faint">
          <span className="text-ink-dim">
            This page sets no cookies, runs no analytics, and loads nothing from anyone else.
          </span>{' '}
          Open your network tab — a tool that keeps your code off the network should be sold
          from a page that does the same.
        </p>

        <p className="mt-10 max-w-[60ch] text-sm text-ink-faint">
          Dual-licensed{' '}
          <ExtLink href={`${site.repo}/blob/main/LICENSE`} className="text-ink-dim hover:text-ink-strong">
            AGPL-3.0-or-later
          </ExtLink>
          , or{' '}
          <ExtLink href={`${site.repo}/blob/main/COMMERCIAL-LICENSE.md`} className="text-ink-dim hover:text-ink-strong">
            commercially
          </ExtLink>{' '}
          for proprietary use —{' '}
          <a href={`mailto:${site.email}`} className="text-ink-dim hover:text-ink-strong">
            contact us
          </a>
          .
        </p>

        <p className="mt-6 font-mono text-sm text-ink-faint">
          © 2026 Jean Paul Elisa NIYOKWIZERWA
        </p>
      </footer>
    </div>
  );
}
