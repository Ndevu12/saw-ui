import { InstallLine } from '@/features/copy-command/ui/install-line';
import { site } from '@/shared/config/site';
import { Section, SectionIntro } from '@/shared/ui/section';

/**
 * Get it, however you run things. The primary path is one pip command; the rest are
 * the real distribution channels — the published Docker image, from source, and the
 * pinned CI action. saw is a Python 3.11+ package, so it runs on macOS, Linux and
 * Windows alike.
 */
const CHANNELS: { label: string; desc: string; cmd: string }[] = [
  {
    label: 'Docker',
    desc: 'No Python toolchain needed — scan a mounted repository from the published image.',
    cmd: 'docker run --rm -v "$PWD:/repo:ro" ghcr.io/ndevu12/stayawakebot saw scan /repo',
  },
  {
    label: 'From source',
    desc: 'The latest build, straight from main.',
    cmd: 'pip install "stayawakebot @ git+https://github.com/Ndevu12/stayAwakeBot@main"',
  },
  {
    label: 'In CI',
    desc: 'Gate every merge with the SHA-pinned Strix action — one command writes and pins the workflow.',
    cmd: 'saw guard setup --pr',
  },
];

export function InstallSection({ version }: { version: string }) {
  return (
    <Section id="install">
      <SectionIntro
        eyebrow="Install"
        title="Start with one command."
        lead="Offline and accurate with zero flags — install it, and the first scan needs nothing else."
      >
        <InstallLine command={site.install} />
        <div className="mt-6 flex flex-wrap gap-2.5">
          {['Python 3.11+', 'macOS', 'Linux', 'Windows', `v${version}`].map((r) => (
            <span
              key={r}
              className="rounded-full border border-rule px-4 py-1.5 font-mono text-sm text-ink-dim"
            >
              {r}
            </span>
          ))}
        </div>
      </SectionIntro>

      <div className="mt-16 border-t border-rule pt-14">
        <p className="mb-10 font-mono text-xs tracking-[0.24em] text-ink-faint uppercase sm:text-sm">
          Other ways to run it
        </p>
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-3">
          {CHANNELS.map((ch) => (
            <div key={ch.label} className="rise flex min-w-0 flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-base text-mint">{ch.label}</span>
                <p className="text-sm leading-relaxed text-ink-dim md:text-base">{ch.desc}</p>
              </div>
              <InstallLine command={ch.cmd} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
