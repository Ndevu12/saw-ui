import { ArrowDown } from 'lucide-react';
import { InstallLine } from '@/features/copy-command/ui/install-line';
import { shell, site } from '@/shared/config/site';

/**
 * The first screen.
 *
 * COPY RULE: say what the tool does, in words a stranger already knows. An earlier
 * headline read "It ran before you read it." — evocative, but "it" referred to
 * nothing the reader had been told about yet, and the sentence was about the THREAT
 * rather than the product. A hero answers two questions before anything else: what
 * does this do, and why this one. Headline states the job; subhead states the
 * mechanism and the wedge; then the command; then the objection answered before it
 * is raised.
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
          Open-source supply-chain scanner
        </p>

        <h1
          className="reveal mt-8 font-display text-[clamp(3rem,7.2vw,7rem)] leading-[0.95] font-bold tracking-[-0.03em] text-balance text-ink-strong"
          style={{ '--reveal-delay': '130ms' } as React.CSSProperties}
        >
          Find malware in your dependencies.
        </h1>

        <p
          className="reveal mt-10 max-w-[52ch] text-2xl leading-[1.45] text-ink-dim sm:text-[1.75rem]"
          style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
        >
          <span className="text-ink-strong">saw</span> scans your repositories, lockfiles
          and installed packages, opens the fix as a pull request, and stops the infected
          change from merging.{' '}
          <span className="text-ink">It runs entirely on your machine.</span>
        </p>

        <div
          className="reveal mt-14 flex flex-col gap-7"
          style={{ '--reveal-delay': '310ms' } as React.CSSProperties}
        >
          <InstallLine command={site.install} />
          <p className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-base text-mint sm:text-lg">
            <span>no network</span>
            <span className="text-rule" aria-hidden="true">·</span>
            <span>no account</span>
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
