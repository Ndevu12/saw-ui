import { ArrowDown } from 'lucide-react';
import { InstallLine } from '@/features/copy-command/ui/install-line';
import { shell, site } from '@/shared/config/site';

/**
 * The first screen.
 *
 * COPY RULES, both learned by getting them wrong.
 *
 * 1. NEVER NARROW THE TOOL. A previous headline read "Find malware in your
 *    dependencies." saw does not scan dependencies — it hunts across repositories,
 *    lockfiles, installed packages AND the machine's own start-up surface, then
 *    remediates through a pull request and gates CI. Describing a third of the
 *    product as if it were the whole of it undersells it and misleads the reader.
 *
 * 2. NEVER CLAIM PAST THE CONTRACT. "It runs entirely offline" shipped briefly and
 *    was false: the same sentence says it opens pull requests and gates CI, which
 *    need the network. The docs' actual promise is scoped — a default `saw scan`
 *    needs no network, no configuration and no credential; only `-x` leaves the
 *    sandbox. The offline claim belongs to the HUNT, and the copy must carry that
 *    scope. Overclaiming is the one thing this audience never forgives.
 *
 * 3. Clear is not the same as generic. An earlier headline ("It ran before you read
 *    it.") was clever but referred to nothing the reader knew yet; the correction to
 *    it then stripped out the product's own voice as well. The tool's own words —
 *    hunt, supply-chain, the three verbs — are precise, and precision is the point.
 *    Jargon is only a problem when it stands between the reader and the meaning.
 *
 * The exit codes are deliberately NOT here — four bare integers mean nothing to a
 * first-time reader, and they are the payoff of watching a scan, not the opening.
 *
 * RENDERING RULE: this is a SERVER component and the entrance is CSS. It previously
 * used motion with `initial={{ opacity: 0 }}`, which put opacity:0 into the static
 * HTML — so the hero was invisible until hydration, and stayed invisible if that
 * never happened. Above-the-fold content never waits on JavaScript to be seen.
 */
export function Hero() {
  return (
    <section className={`${shell} flex flex-1 flex-col justify-center py-16 lg:py-20`}>
      <div className="flex flex-col">
        <p
          className="reveal font-mono text-sm tracking-[0.24em] text-mint uppercase sm:text-base"
          style={{ '--reveal-delay': '40ms' } as React.CSSProperties}
        >
          Detect · Remediate · Prevent
        </p>

        <h1
          className="reveal mt-8 font-display text-[clamp(2.85rem,6.6vw,6.4rem)] leading-[0.96] font-bold tracking-[-0.03em] text-balance text-ink-strong"
          style={{ '--reveal-delay': '130ms' } as React.CSSProperties}
        >
          Hunt supply-chain malware where it lands.
        </h1>

        <p
          className="reveal mt-10 max-w-[54ch] text-2xl leading-[1.45] text-ink-dim sm:text-[1.75rem]"
          style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
        >
          <span className="text-ink-strong">saw</span> searches your repositories,
          lockfiles, installed packages and your machine&apos;s own start-up surface — then
          opens the fix as a pull request and gates CI, so an infected change cannot merge.{' '}
          <span className="text-ink">The hunt happens offline, on your machine alone.</span>
        </p>

        <div
          className="reveal mt-14 flex flex-col gap-7"
          style={{ '--reveal-delay': '310ms' } as React.CSSProperties}
        >
          <InstallLine command={site.install} />
          <p className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-base text-mint sm:text-lg">
            <span>zero code runs at install</span>
            <span className="text-rule" aria-hidden="true">·</span>
            <span>a scan needs no network, no account</span>
            <span className="text-rule" aria-hidden="true">·</span>
            <span>a scan never changes a file</span>
          </p>
        </div>

        <a
          href="#watch"
          className="reveal mt-20 inline-flex w-fit items-center gap-2.5 text-lg text-ink-faint transition-colors hover:text-mint"
          style={{ '--reveal-delay': '400ms' } as React.CSSProperties}
        >
          Watch it work
          <ArrowDown className="size-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
