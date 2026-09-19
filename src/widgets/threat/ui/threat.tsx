import { RotateCcw } from 'lucide-react';
import { Section, SectionIntro } from '@/shared/ui/section';
import { Timeline } from '@/shared/ui/timeline';
import { Saw } from '@/shared/ui/saw';

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
    <Section band="surface">
      <SectionIntro
        title="A modern supply-chain attack runs as you. Then it spreads as you."
        lead={
          <>
            A supply-chain worm doesn&apos;t break in. It arrives inside code you asked for, runs
            with your own hands, and turns your machine and your credentials against whoever
            installs the package it poisons next.
          </>
        }
      />

      <Timeline
        layout="zigzag"
        pulse
        tone="surface"
        steps={STAGES.map(([title, desc], i) => ({
          marker: String(i + 1),
          title,
          body: <p className="max-w-[26ch] text-sm leading-relaxed text-ink-dim">{desc}</p>,
        }))}
        after={{
          marker: <RotateCcw className="size-4" aria-hidden="true" />,
          body: (
            <p className="font-mono text-sm text-mint">
              every package it poisons becomes the launchpad for the next
            </p>
          ),
        }}
      />

      <p className="mt-14 max-w-[68ch] border-t border-rule-soft pt-8 text-xl leading-relaxed text-ink md:text-2xl">
        <Saw /> hunts it across every surface it can land on — your repositories, lockfiles,
        installed packages, and your machine&apos;s own start-up surface.
      </p>
    </Section>
  );
}
