import { shell } from '@/shared/config/site';

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
    <section className={`${shell} py-24 lg:py-36`}>
      <div className="mb-16 flex max-w-[54ch] flex-col gap-5 lg:mb-20">
        <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">
          Detect · Remediate · Prevent
        </p>
        <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-balance text-ink-strong">
          The attack has stages. So does the answer.
        </h2>
        <p className="text-lg leading-relaxed text-ink-dim md:text-xl">
          Every place the worm touches, saw meets it — in your code, on your machine, and at the
          gate before an infected change can merge.
        </p>
      </div>

      <div className="grid gap-y-14 lg:grid-cols-3 lg:gap-x-16">
        {PHASES.map((phase) => (
          <div key={phase.name} className="rise flex flex-col gap-8 border-t border-rule pt-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm text-mint">{phase.n}</span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink-strong">
                {phase.name}
              </h3>
              <p className="max-w-[34ch] text-base leading-relaxed text-ink-dim">{phase.meaning}</p>
            </div>

            <div className="flex flex-col gap-6">
              {phase.verbs.map(([cmd, desc]) => (
                <div key={cmd} className="flex flex-col gap-2">
                  <span className="font-mono text-base text-mint">{cmd}</span>
                  <p className="max-w-[38ch] text-sm leading-relaxed text-ink-dim">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
