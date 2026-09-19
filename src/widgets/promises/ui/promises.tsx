import { Check } from 'lucide-react';
import { Section, SectionIntro } from '@/shared/ui/section';

/**
 * The work, named as jobs. Not a list of things saw refuses. Outcome-level
 * only. Commands live on the docs site.
 */
const POINTS: [string, string][] = [
  [
    'Finding it is one step. Repairing it is another.',
    'One step reports what it found. The next prepares a change you review before it is accepted.',
  ],
  [
    'The check covers the project and this computer.',
    'Your project, the packages it uses, the packages already on the computer, and what starts when the computer starts.',
  ],
  [
    'New copies of the project are checked as they arrive.',
    'When you download or update the project, what just arrived is checked before you run it.',
  ],
  [
    'This computer is locked down. New code is checked before it becomes official.',
    'The computer first. Then the check on new code.',
  ],
];

export function Promises() {
  return (
    <Section band="surface">
      <SectionIntro
        eyebrow="What it does"
        title="Find it. Repair it. Lock the computer. Check new code."
        lead="Four jobs. That is the product."
      />

      <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
        {POINTS.map(([title, desc]) => (
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
    </Section>
  );
}
