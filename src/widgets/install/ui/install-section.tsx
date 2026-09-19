import { InstallLine } from '@/features/copy-command/ui/install-line';
import { site } from '@/shared/config/site';
import { Section, SectionIntro } from '@/shared/ui/section';

/**
 * One pip line is the download. Docker and CI sit under it, where they
 * were — the other ways to run it, not a second row of buttons.
 */
const CHANNELS: { label: string; desc: string; cmd: string }[] = [
  {
    label: 'Docker',
    desc: 'Scan a project folder from the published image.',
    cmd: 'docker run --rm -v "$PWD:/repo:ro" ghcr.io/ndevu12/stayawakebot saw scan /repo',
  },
  {
    label: 'In CI',
    desc: 'Add the automatic check so new code is reviewed before it becomes official.',
    cmd: 'saw guard setup --pr',
  },
];

export function InstallSection({ version }: { version: string }) {
  return (
    <Section id="install">
      <SectionIntro
        title="Get saw."
        lead="One line installs it."
      >
        <InstallLine command={site.install} />
        <div className="mt-6 flex flex-wrap gap-2.5">
          {['macOS', 'Linux', 'Windows', `v${version}`].map((r) => (
            <span
              key={r}
              className="rounded-full border border-rule px-4 py-1.5 font-mono text-sm text-ink-dim"
            >
              {r}
            </span>
          ))}
        </div>
      </SectionIntro>

      <div className="border-t border-rule pt-14">
        <p className="mb-10 font-mono text-xs tracking-[0.24em] text-ink-faint uppercase sm:text-sm">
          Other ways to run it
        </p>
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-2">
          {CHANNELS.map((ch) => (
            <div key={ch.label} className="rise flex min-w-0 flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-base text-mint">{ch.label}</span>
                <p className="max-w-[48ch] text-sm leading-relaxed text-ink-dim md:text-base">
                  {ch.desc}
                </p>
              </div>
              <InstallLine command={ch.cmd} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
