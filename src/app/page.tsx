import { SiteHeader } from '@/widgets/site-header/ui/site-header';
import { Hero } from '@/widgets/hero/ui/hero';
import { Threat } from '@/widgets/threat/ui/threat';
import { Mitigation } from '@/widgets/mitigation/ui/mitigation';
import { Verdict } from '@/widgets/verdict/ui/verdict';
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

        <section className={`${SHELL} max-w-[1100px] py-28 lg:py-40`}>
          <div className="flex flex-col items-start gap-8">
            <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-ink-strong">
              Start with one command.
            </h2>
            <InstallLine command="pip install stayawakebot" />
            <div className="flex flex-wrap gap-3">
              {['macOS', 'Linux', 'Python 3.11+', 'Docker', `v${version}`].map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-rule px-4 py-1.5 font-mono text-sm text-ink-dim"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </section>
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
      </footer>
    </>
  );
}
