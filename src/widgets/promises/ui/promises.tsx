import { Check } from 'lucide-react';
import { Section, SectionIntro } from '@/shared/ui/section';

/**
 * The work, named. Not a list of things saw refuses — the four facts the
 * commands are. Outcome-level only, per the disclosure rules.
 */
const POINTS: [string, string][] = [
  [
    'scan reads. fix writes.',
    'The hunt is one command. The clean is another, and it opens a pull request.',
  ],
  [
    'The hunt is the tree and the host.',
    'Repositories, lockfiles, installed packages, and the machine\'s start-up surface.',
  ],
  [
    'Git events are scanned as they land.',
    'A clone, a pull, a branch switch or a rebase — what just landed is scanned before you run it.',
  ],
  [
    'The host is hardened. The merge is gated.',
    'saw harden on this machine. saw guard on the pull request.',
  ],
];

export function Promises() {
  return (
    <Section band="surface">
      <SectionIntro
        eyebrow="What the commands do"
        title="The hunt, the clean, the host, the gate."
        lead="Four commands. One job."
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
