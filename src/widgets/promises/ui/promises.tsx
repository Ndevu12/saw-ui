import { Check } from 'lucide-react';
import { Section, SectionIntro } from '@/shared/ui/section';

/**
 * What saw guarantees — the load-bearing contracts, stated carefully: what saw
 * is allowed to change and what it will not touch. These are obligations the
 * code enforces, not features. Outcome-level only, per the disclosure rules.
 */
const CONTRACTS: [string, string][] = [
  [
    'scan reads. fix writes.',
    'The hunt is one command. The clean is another, and it opens a pull request.',
  ],
  [
    'An incomplete hunt is named.',
    'Where a target could not be fully scanned, the report says so.',
  ],
  [
    'The allowlist is the config you pass.',
    'Suppressions come from that one file, on that run.',
  ],
  [
    'You merge the fix.',
    'On an infected verdict the gate opens a pull request. The clean lands when you merge it.',
  ],
];

export function Promises() {
  return (
    <Section band="surface">
      <SectionIntro
        eyebrow="What saw guarantees"
        title="The contracts the commands keep."
        lead="saw holds every one of these under every flag."
      />

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
    </Section>
  );
}
