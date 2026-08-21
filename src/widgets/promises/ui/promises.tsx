import { Check } from 'lucide-react';
import { shell } from '@/shared/config/site';

/**
 * What it promises — the load-bearing contracts, stated carefully: what saw is
 * allowed to change and what it will not touch. These are obligations the code
 * enforces, not features. Outcome-level only, per the disclosure rules.
 */
const CONTRACTS: [string, string][] = [
  [
    'Read-only means read-only',
    'saw scan never modifies a file, under any flag. Remediation lives in a separate command, so no one can trip into it.',
  ],
  [
    "A target it can't scan is never clean",
    "Silence has two causes and only one is good news. Where saw can't be sure, it says so and exits non-zero — never the comfortable answer.",
  ],
  [
    "Your allowlist, never the target's",
    "Suppressions come from one config you choose. A repository can't ship an allowlist that excuses its own payload.",
  ],
  [
    'Nothing lands without your merge',
    'On an infected verdict the gate opens the fix as a pull request and stays red until you merge it. Remediation opens the fix; it never makes the check pass.',
  ],
];

export function Promises() {
  return (
    <section className={`${shell} max-w-[1100px] py-24 lg:py-36`}>
      <div className="mb-14 flex max-w-[54ch] flex-col gap-5">
        <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">
          What it promises
        </p>
        <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-balance text-ink-strong">
          Narrow enough to trust on anything.
        </h2>
        <p className="text-lg leading-relaxed text-ink-dim md:text-xl">
          A security tool that damages a working repository gets uninstalled — so the boundaries
          are deliberate, and they hold under every flag.
        </p>
      </div>

      <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
        {CONTRACTS.map(([title, desc]) => (
          <div key={title} className="rise flex gap-4">
            <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-mint/40 text-mint">
              <Check className="size-3.5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink-strong">
                {title}
              </h3>
              <p className="max-w-[44ch] text-base leading-relaxed text-ink-dim">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
