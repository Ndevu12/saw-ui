import { FlowBeat, FlowBend } from '@/shared/ui/flow-line';
import { Section, SectionIntro } from '@/shared/ui/section';
import { cn } from '@/shared/lib/utils';

/**
 * The counterpart to the attack lifecycle: how saw meets the worm at every angle,
 * organised by the three phases the hero promises — Detect · Remediate · Prevent.
 * Detect covers the code (scan) and the machine (audit); Remediate cleans on a PR
 * (fix); Prevent hardens this host (harden) and gates the merge (guard). Copy
 * stays outcome-level — no detection mechanism, per the disclosure rules.
 */
const PHASES: {
  n: string;
  name: string;
  meaning: string;
  verbs: { cmd: string; blurb: string; main?: boolean }[];
}[] = [
  {
    n: '01',
    name: 'Detect',
    meaning: 'Find it wherever it landed — in the code, and on the machine.',
    verbs: [
      { cmd: 'saw scan', blurb: 'Repositories, lockfiles and installed packages. Read-only, always — its exit code is the verdict.' },
      { cmd: 'saw audit', blurb: 'The machine itself: cached credentials, editor settings, and what runs at start-up.' },
    ],
  },
  {
    n: '02',
    name: 'Remediate',
    meaning: 'Clean it on your terms, never behind your back.',
    verbs: [
      { cmd: 'saw fix', blurb: 'Recovers the real previous version from your git history onto a pull request. It never rewrites history, and nothing lands without your merge.' },
    ],
  },
  {
    n: '03',
    name: 'Prevent',
    meaning: 'Shut the door it came through.',
    verbs: [
      {
        cmd: 'saw harden',
        main: true,
        blurb: 'This machine. Puts the host controls in place, and only reports a write as done after it is read back.',
      },
      {
        cmd: 'saw guard',
        blurb: 'Installs the CI gate and proves branch protection actually requires it — so an infected change cannot merge in the first place.',
      },
    ],
  },
];

export function Mitigation() {
  return (
    <Section>
      <SectionIntro
        title="The attack has stages. So does the answer."
        lead="Every place the worm touches, saw meets it — in your code, on your machine, and at the gate before an infected change can merge."
      />

      <ol>
        {PHASES.map((phase, i) => {
          const side = i % 2 === 0 ? 'left' : 'right';
          const prev = i % 2 === 0 ? 'right' : 'left';
          return (
            <li key={phase.name}>
              {i > 0 ? <FlowBend from={prev} to={side} /> : null}
              <FlowBeat
                side={side}
                n={phase.n}
                tone="ground"
                first={i === 0}
                last={i === PHASES.length - 1}
                title={
                  <h3 className="font-display text-3xl font-bold tracking-tight text-ink-strong md:text-4xl">
                    {phase.name}
                  </h3>
                }
              >
                <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-ink-dim md:text-xl">
                  {phase.meaning}
                </p>
                <div className="mt-6 grid gap-6">
                  {phase.verbs.map((verb) => (
                    <div key={verb.cmd} className="flex flex-col gap-2">
                      <span
                        className={cn(
                          'font-mono text-mint',
                          verb.main ? 'text-lg font-semibold md:text-xl' : 'text-base',
                        )}
                      >
                        {verb.cmd}
                      </span>
                      <p className="max-w-[46ch] text-sm leading-relaxed text-ink-dim">{verb.blurb}</p>
                    </div>
                  ))}
                </div>
              </FlowBeat>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
