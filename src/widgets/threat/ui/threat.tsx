import { RotateCcw } from 'lucide-react';
import { FlowBeat, FlowBend } from '@/shared/ui/flow-line';
import { Section, SectionIntro } from '@/shared/ui/section';
import { Saw } from '@/shared/ui/saw';

/**
 * The attack, taught as a lifecycle. Generic stages only — never a named
 * campaign, an indicator, or how saw finds it.
 */
const STAGES: [string, string][] = [
  ['Arrives', 'hidden inside software you chose to install'],
  ['Runs', 'the moment it installs, with your access, before anyone checks it'],
  ['Steals', 'passwords, keys, and access to the accounts you can reach'],
  ['Stays', 'remains on the computer after you restart it'],
  ['Calls home', 'sends a message to a computer the attacker controls'],
  ['Spreads', 'puts itself into the next package — then it starts again'],
];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function Threat() {
  return (
    <Section band="surface">
      <SectionIntro
        title="Harmful software runs with your access."
        turn="Then it uses that access to spread."
        lead="It arrives inside software you chose to install, runs with your accounts, and uses them to hide itself in the next package someone else will install."
      />

      <ol>
        {STAGES.map(([title, desc], i) => {
          const side = i % 2 === 0 ? 'left' : 'right';
          const prev = i % 2 === 0 ? 'right' : 'left';
          return (
            <li key={title}>
              {i > 0 ? <FlowBend from={prev} to={side} /> : null}
              <FlowBeat
                side={side}
                n={pad(i + 1)}
                tone="surface"
                first={i === 0}
                last={i === STAGES.length - 1}
                title={
                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink-strong">
                    {title}
                  </h3>
                }
              >
                <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-ink-dim md:text-base">
                  {desc}
                </p>
              </FlowBeat>
            </li>
          );
        })}
      </ol>

      <p className="mt-14 flex items-center gap-4 font-mono text-sm text-mint">
        <span aria-hidden className="h-px flex-1 bg-mint/30" />
        <RotateCcw className="size-4 shrink-0" aria-hidden="true" />
        every package it infects becomes the next one someone installs
        <span aria-hidden className="hidden h-px flex-1 bg-mint/30 sm:block" />
      </p>

      <p className="mt-14 max-w-[68ch] border-t border-rule-soft pt-8 text-xl leading-relaxed text-ink md:text-2xl">
        <Saw /> looks for it in your project, in the packages that project uses, in packages
        already on this computer, and in what starts when the computer starts.
      </p>
    </Section>
  );
}
