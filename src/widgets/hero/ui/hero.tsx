import { Check } from 'lucide-react';
import { InstallLine } from '@/features/copy-command/ui/install-line';
import { ReplayDeck } from '@/features/replay-session/ui/replay-deck';
import { shell, site } from '@/shared/config/site';
import { Saw } from '@/shared/ui/saw';

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
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Left: the pitch — headline and the one action, kept tight. */}
        <div className="flex flex-col">
          <p
            className="reveal font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm"
            style={{ '--reveal-delay': '40ms' } as React.CSSProperties}
          >
            Detect · Remediate · Prevent
          </p>

          <h1
            className="reveal mt-6 font-display text-4xl leading-tight lg:text-5xl font-bold tracking-tight text-ink-strong"
            style={{ '--reveal-delay': '130ms' } as React.CSSProperties}
          >
            <Saw accent /> hunts supply-chain malware{' '}
            <span className="block">where it lands.</span>
          </h1>

          <div
            className="reveal mt-9 flex flex-col gap-4"
            style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
          >
            <InstallLine command={site.install} />
            <ul className="flex flex-col gap-2 font-mono text-xs text-mint sm:text-sm">
              {[
                'zero code runs at install',
                'a scan needs no network, no account',
                'a scan never changes a file',
              ].map((line) => (
                <li key={line} className="flex items-center gap-2.5">
                  <Check className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: the tool running — the live terminal, played automatically. */}
        <div
          className="reveal min-w-0"
          style={{ '--reveal-delay': '320ms' } as React.CSSProperties}
        >
          <ReplayDeck />
        </div>
      </div>

    </section>
  );
}
