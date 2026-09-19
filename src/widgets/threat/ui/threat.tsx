import { RotateCcw } from 'lucide-react';
import { FlowFold, FlowJog, FlowNode, FlowRun } from '@/shared/ui/flow-line';
import { Section, SectionIntro } from '@/shared/ui/section';
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

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function rowsOf<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

function Stage({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center text-center">
      <div className="relative flex h-14 w-full items-center justify-center">
        <FlowNode n={n} tone="surface" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink-strong">
        {title}
      </h3>
      <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-ink-dim md:text-base">{desc}</p>
    </div>
  );
}

function FlowRow({
  steps,
  start,
  cols,
}: {
  steps: [string, string][];
  start: number;
  cols: 2 | 3;
}) {
  return (
    <div className="relative flex">
      <FlowRun cols={cols} />
      {steps.map(([title, desc], i) => (
        <Stage key={title} n={pad(start + i + 1)} title={title} desc={desc} />
      ))}
    </div>
  );
}

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

      {/* One visible path per breakpoint. The hidden copies are display:none, so
          assistive tech only sees the active one. */}
      <div className="flex flex-col items-center sm:hidden">
        {STAGES.map(([title, desc], i) => (
          <div key={title} className="flex w-full flex-col items-center">
            {i > 0 ? <FlowJog toward={i % 2 === 1 ? 'right' : 'left'} /> : null}
            <Stage n={pad(i + 1)} title={title} desc={desc} />
          </div>
        ))}
      </div>

      <div className="hidden flex-col sm:flex lg:hidden">
        {rowsOf(STAGES, 2).map((row, r) => (
          <div key={row[0][0]}>
            {r > 0 ? <FlowFold cols={2} /> : null}
            <FlowRow steps={row} start={r * 2} cols={2} />
          </div>
        ))}
      </div>

      <div className="hidden flex-col lg:flex">
        {rowsOf(STAGES, 3).map((row, r) => (
          <div key={row[0][0]}>
            {r > 0 ? <FlowFold cols={3} /> : null}
            <FlowRow steps={row} start={r * 3} cols={3} />
          </div>
        ))}
      </div>

      <p className="mt-14 flex items-center gap-4 font-mono text-sm text-mint">
        <span aria-hidden className="h-px flex-1 bg-mint/30" />
        <RotateCcw className="size-4 shrink-0" aria-hidden="true" />
        every package it poisons becomes the launchpad for the next
        <span aria-hidden className="hidden h-px flex-1 bg-mint/30 sm:block" />
      </p>

      <p className="mt-14 max-w-[68ch] border-t border-rule-soft pt-8 text-xl leading-relaxed text-ink md:text-2xl">
        <Saw /> hunts it across every surface it can land on — your repositories, lockfiles,
        installed packages, and your machine&apos;s own start-up surface.
      </p>
    </Section>
  );
}
