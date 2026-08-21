import { SiteHeader } from '@/widgets/site-header/ui/site-header';
import { Hero } from '@/widgets/hero/ui/hero';
import { Threat } from '@/widgets/threat/ui/threat';
import { Mitigation } from '@/widgets/mitigation/ui/mitigation';
import { Verdict } from '@/widgets/verdict/ui/verdict';
import { Promises } from '@/widgets/promises/ui/promises';
import { InstallSection } from '@/widgets/install/ui/install-section';
import { Wordmark } from '@/shared/ui/wordmark';
import { InstallLine } from '@/features/copy-command/ui/install-line';
import { publishedVersion } from '@/shared/lib/version';
import { ExtLink } from '@/shared/ui/ext-link';

const REPO = 'https://github.com/Ndevu12/stayAwakeBot';
const DOCS = 'https://saw-docs.ndevuspace.com';

/* One shared measure. The page uses the WIDTH it has rather than pinching content
   into a narrow column with the viewport left empty on either side. */
const SHELL = 'mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-16';

export default async function Home() {
  const version = await publishedVersion();

  return (
    <>
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <Hero />
      </div>

      <main id="main">
        {/* ── The demonstration. Sections below the hero are converted but NOT yet
             individually designed — they are being taken one at a time. ────────── */}

        <Threat />

        <Mitigation />

        <Verdict />

        <Promises />

        <InstallSection version={version} />
      </main>

      <footer className={`${SHELL} border-t border-rule py-20`}>
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex flex-col gap-3">
            <Wordmark height={30} />
            <p className="font-mono text-sm tracking-[0.2em] text-ink-faint uppercase">
              the sentinel saw the worm
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-base">
            {[
              ['Documentation', `${DOCS}/latest/`],
              ['Trust model', `${DOCS}/latest/explanation/trust-model/`],
              ['Security', `${REPO}/blob/main/SECURITY.md`],
              ['PyPI', 'https://pypi.org/project/stayawakebot/'],
              ['GitHub', REPO],
            ].map(([label, href]) => (
              <ExtLink key={label} href={href} className="text-ink-dim transition-colors hover:text-ink-strong">
                {label}
              </ExtLink>
            ))}
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
          <ExtLink href={`${REPO}/blob/main/LICENSE`} className="text-ink-dim hover:text-ink-strong">
            AGPL-3.0-or-later
          </ExtLink>
          , or{' '}
          <ExtLink href={`${REPO}/blob/main/COMMERCIAL-LICENSE.md`} className="text-ink-dim hover:text-ink-strong">
            commercially
          </ExtLink>{' '}
          for proprietary use —{' '}
          <a href="mailto:saw@ndevuspace.com" className="text-ink-dim hover:text-ink-strong">
            contact us
          </a>
          .
        </p>

        <p className="mt-6 font-mono text-sm text-ink-faint">
          © 2026 Jean Paul Elisa NIYOKWIZERWA
        </p>
      </footer>
    </>
  );
}
