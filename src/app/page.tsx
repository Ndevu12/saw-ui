import { SiteHeader } from '@/widgets/site-header/ui/site-header';
import { Hero } from '@/widgets/hero/ui/hero';
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

        <section className={`${SHELL} max-w-[1100px] py-28 lg:py-40`}>
          <div className="flex flex-col gap-7">
            <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">What it hunts</p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-ink-strong">
              Malware that spreads by being installed.
            </h2>
            <p className="max-w-[50ch] text-lg leading-relaxed text-ink-dim md:text-xl">
              It arrives inside a package you chose, runs before review, and uses whatever
              credentials it finds to publish itself into the next one.
            </p>
          </div>
        </section>

        <section className={`${SHELL} py-28 lg:py-40`}>
          <div className="mb-16 flex flex-col gap-5">
            <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">Four verbs</p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-ink-strong">
              Each one stands alone.
            </h2>
          </div>
          <div className="grid gap-14 md:grid-cols-2 lg:gap-x-24">
            {[
              ['saw scan', 'Hunts your repositories, lockfiles and installed dependencies. Never writes a file.'],
              ['saw fix', 'Recovers the clean version from your own git history, onto its own branch.'],
              ['saw guard', 'Gates CI, and proves the gate is actually required — not merely present.'],
              ['saw audit', 'Checks the machine itself: credentials, editors, what runs at start-up.'],
            ].map(([cmd, copy]) => (
              <div key={cmd} className="flex flex-col gap-3">
                <span className="font-mono text-lg text-mint">{cmd}</span>
                <p className="max-w-[42ch] text-base leading-relaxed text-ink-dim md:text-lg">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${SHELL} max-w-[1100px] py-28 lg:py-40`}>
          <div className="mb-14 flex flex-col gap-5">
            <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">The verdict</p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-ink-strong">
              One number is the whole answer.
            </h2>
            <p className="max-w-[50ch] text-lg leading-relaxed text-ink-dim md:text-xl">
              Every scan ends in a single exit code — so gating CI is one line, with nothing
              to configure and no way to configure it away.
            </p>
          </div>
          <dl className="flex flex-col">
            {[
              ['0', 'Clean, and fully scanned.', 'text-mint'],
              ['1', 'Infected. The build fails, and no flag makes it pass.', 'text-coral'],
              ['2', 'Could not be scanned — which is unknown, never clean.', 'text-amber'],
              ['3', 'Rotating credentials from this machine is unsafe right now.', 'text-coral'],
            ].map(([code, meaning, tone], i, all) => (
              <div
                key={code}
                className={`grid grid-cols-[3.5rem_1fr] items-baseline gap-8 border-t border-rule-soft py-8 ${
                  i === all.length - 1 ? 'border-b' : ''
                }`}
              >
                <dt className={`font-mono text-3xl font-semibold tabular-nums md:text-4xl ${tone}`}>{code}</dt>
                <dd className="text-base text-ink-dim md:text-lg">{meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

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
