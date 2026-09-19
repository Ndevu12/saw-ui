import { Section, SectionIntro } from '@/shared/ui/section';
import { Timeline } from '@/shared/ui/timeline';

/**
 * The counterpart to the attack lifecycle: how saw meets the worm at every angle,
 * organised by the three phases the hero promises — Detect · Remediate · Prevent.
 * Each phase carries a meaning, not just a command, and the four verbs map onto it:
 * Detect covers the code (scan) and the machine (audit); Remediate cleans on a PR
 * (fix); Prevent gates the door (guard). Copy stays outcome-level — no detection
 * mechanism, per the disclosure rules.
 */
const PHASES: {
  n: string;
  name: string;
  meaning: string;
  verbs: [string, string][];
}[] = [
  {
    n: '01',
    name: 'Detect',
    meaning: 'Find it wherever it landed — in the code, and on the machine.',
    verbs: [
      ['saw scan', 'Repositories, lockfiles and installed packages. Read-only, always — its exit code is the verdict.'],
      ['saw audit', 'The machine itself: cached credentials, editor settings, and what runs at start-up.'],
    ],
  },
  {
    n: '02',
    name: 'Remediate',
    meaning: 'Clean it on your terms, never behind your back.',
    verbs: [
      ['saw fix', 'Recovers the real previous version from your git history onto a pull request. It never rewrites history, and nothing lands without your merge.'],
    ],
  },
  {
    n: '03',
    name: 'Prevent',
    meaning: 'Shut the door it came through.',
    verbs: [
      ['saw guard', 'Installs the CI gate and proves branch protection actually requires it — so an infected change cannot merge in the first place.'],
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

      <Timeline
        steps={PHASES.map((phase) => ({
          marker: phase.n,
          title: phase.name,
          body: (
            <>
              <p className="max-w-[42ch] text-base leading-relaxed text-ink-dim">{phase.meaning}</p>
              <div className="mt-6 flex flex-col gap-6">
                {phase.verbs.map(([cmd, desc]) => (
                  <div key={cmd} className="flex flex-col gap-2">
                    <span className="font-mono text-base text-mint">{cmd}</span>
                    <p className="max-w-[46ch] text-sm leading-relaxed text-ink-dim">{desc}</p>
                  </div>
                ))}
              </div>
            </>
          ),
        }))}
      />
    </Section>
  );
}
