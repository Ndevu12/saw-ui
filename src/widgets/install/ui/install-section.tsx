import { InstallLine } from '@/features/copy-command/ui/install-line';
import { site } from '@/shared/config/site';
import { Section, SectionIntro } from '@/shared/ui/section';

/**
 * One line installs it. Other runtimes live in the docs, linked from
 * the header and the footer — not as a second row of buttons here.
 */
const PLATFORMS = ['macOS', 'Linux', 'Windows'] as const;

export function InstallSection({ version }: { version: string }) {
  return (
    <Section id="install">
      <SectionIntro
        title="Get saw."
        lead="One line installs it. The documentation has the rest — a container, and the automatic check on new code."
      >
        <InstallLine command={site.install} />
        <div className="mt-6 flex flex-wrap gap-2.5">
          {[...PLATFORMS, `v${version}`].map((r) => (
            <span
              key={r}
              className="rounded-full border border-rule px-4 py-1.5 font-mono text-sm text-ink-dim"
            >
              {r}
            </span>
          ))}
        </div>
      </SectionIntro>
    </Section>
  );
}
