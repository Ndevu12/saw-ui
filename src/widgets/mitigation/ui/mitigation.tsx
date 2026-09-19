import { FlowBeat, FlowBend } from '@/shared/ui/flow-line';
import { Section, SectionIntro } from '@/shared/ui/section';
import { cn } from '@/shared/lib/utils';

/**
 * How saw meets the attack, as jobs a decision-maker can name. Command
 * names live on the docs site. Outcome-level only — no detection mechanism.
 */
const PHASES: {
  n: string;
  name: string;
  meaning: string;
  jobs: { title: string; blurb: string; main?: boolean }[];
}[] = [
  {
    n: '01',
    name: 'Find',
    meaning: 'Find it in the project, on this computer, and when new work arrives.',
    jobs: [
      {
        title: 'Check the project',
        blurb:
          'Your project, the packages it uses, and the packages already on this computer. Then you see what it found.',
      },
      {
        title: 'Check what just arrived',
        blurb: 'When you download or update the project, what just arrived is checked before you run it.',
      },
      {
        title: 'Check this computer',
        blurb: 'Saved passwords, editor settings, and programs that start when the computer starts.',
      },
    ],
  },
  {
    n: '02',
    name: 'Fix',
    meaning: 'Prepare a repair you review and accept.',
    jobs: [
      {
        title: 'Prepare the repair',
        blurb: 'A change from the last safe version you already had. You review it and accept it.',
      },
    ],
  },
  {
    n: '03',
    name: 'Prevent',
    meaning: 'Lock down this computer, and check new code before it becomes official.',
    jobs: [
      {
        title: 'Lock down this computer',
        main: true,
        blurb: 'The controls go on this computer.',
      },
      {
        title: 'Check new code',
        blurb: 'New work must pass the check before it becomes official.',
      },
    ],
  },
];

export function Mitigation() {
  return (
    <Section>
      <SectionIntro
        title="The attack has stages."
        turn="The response does too."
        lead="saw checks your project, this computer, and new code before it is accepted — so infected work does not become official until you approve the repair."
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
                  {phase.jobs.map((job) => (
                    <div key={job.title} className="flex flex-col gap-2">
                      <span
                        className={cn(
                          'text-ink-strong',
                          job.main
                            ? 'text-lg font-semibold md:text-xl'
                            : 'text-base font-semibold',
                        )}
                      >
                        {job.title}
                      </span>
                      <p className="max-w-[46ch] text-sm leading-relaxed text-ink-dim">{job.blurb}</p>
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
