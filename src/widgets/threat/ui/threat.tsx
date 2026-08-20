import { RotateCcw } from 'lucide-react';
import { shell } from '@/shared/config/site';

/**
 * "What it hunts" — the supply-chain attack, taught as a lifecycle.
 *
 * No eyebrow label and no jargon headline: this is the emotional beat, so it opens
 * on a quiet hook. The six stages describe the threat as GENERIC classes only —
 * persistence, a beacon to attacker-controlled infrastructure, republication — never
 * a named campaign, an indicator, or anything about how saw detects it. The point is
 * to inform the reader what a supply-chain worm actually does, end to end, and that it
 * does not stop at spreading: it settles on the host and calls home.
 */
const STAGES: [string, string][] = [
  ['Arrives', 'hidden inside a package you chose to install'],
  ['Runs', 'the moment it installs — as you, before anyone reviews it'],
  ['Harvests', 'the tokens, keys and secrets your account can reach'],
  ['Settles', 'quietly persists on the machine, so a reboot never clears it'],
  ['Beacons', 'phones home to a server the attacker controls'],
  ['Spreads', 'republishes itself into the next package — then it begins again'],
];

export function Threat() {
  return (
    <section className={`${shell} py-24 lg:py-36`}>
      <div className="flex max-w-[52ch] flex-col gap-6">
        <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-balance text-ink-strong">
          A modern supply-chain attack runs as you. Then it spreads as you.
        </h2>
        <p className="text-lg leading-relaxed text-ink-dim md:text-xl">
          A supply-chain worm doesn&apos;t break in. It arrives inside code you asked for, runs
          with your own hands, and turns your machine and your credentials against whoever
          installs the package it poisons next.
        </p>
      </div>

      {/* The lifecycle. A mint signal travels through the stages in sequence and loops,
          because the last stage is the first stage for the next victim. */}
      <ol className="relative mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6">
        {/* the connector line behind the row on wide screens */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[22px] right-6 left-6 hidden h-px bg-rule-soft lg:block"
        />
        {STAGES.map(([title, desc], i) => (
          <li key={title} className="relative flex flex-col gap-3">
            <span
              className="signal-dot flex size-11 items-center justify-center rounded-full border border-rule bg-surface font-mono text-sm text-mint"
              style={{ animationDelay: `${i * 0.45}s` }}
            >
              {i + 1}
            </span>
            <h3 className="font-display text-lg font-semibold tracking-tight text-ink-strong">
              {title}
            </h3>
            <p className="max-w-[26ch] text-sm leading-relaxed text-ink-dim">{desc}</p>
          </li>
        ))}
      </ol>

      <p className="mt-12 flex items-center gap-3 font-mono text-sm text-mint">
        <RotateCcw className="size-4 shrink-0" aria-hidden="true" />
        every package it poisons becomes the launchpad for the next
      </p>

      <p className="mt-14 max-w-[68ch] border-t border-rule-soft pt-8 text-xl leading-relaxed text-ink md:text-2xl">
        <span className="text-ink-strong">saw</span> hunts it across every surface it can land
        on — your repositories, lockfiles, installed packages, and your machine&apos;s own
        start-up surface.
      </p>
    </section>
  );
}
