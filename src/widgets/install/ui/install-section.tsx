import { InstallLine } from '@/features/copy-command/ui/install-line';
import { shell, site } from '@/shared/config/site';

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
    <section id="install" className={`${shell} header-offset max-w-[1040px] py-24 lg:py-36`}>
      <div className="flex flex-col items-start gap-6">
        <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">Install</p>
        <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-ink-strong">
          Start with one command.
        </h2>
        <p className="max-w-[48ch] text-lg leading-relaxed text-ink-dim md:text-xl">
          Offline and accurate with zero flags — install it, and the first scan needs nothing else.
        </p>
        <InstallLine command={site.install} />
        <div className="flex flex-wrap gap-2.5">
          {['Python 3.11+', 'macOS', 'Linux', 'Windows', `v${version}`].map((r) => (
            <span
              key={r}
              className="rounded-full border border-rule px-4 py-1.5 font-mono text-sm text-ink-dim"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-rule pt-14">
        <p className="mb-10 font-mono text-xs tracking-[0.24em] text-ink-faint uppercase sm:text-sm">
          Other ways to run it
        </p>
        <div className="flex flex-col gap-12">
          {CHANNELS.map((ch) => (
            <div key={ch.label} className="rise flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-base text-mint">{ch.label}</span>
                <p className="max-w-[56ch] text-sm leading-relaxed text-ink-dim md:text-base">
                  {ch.desc}
                </p>
              </div>
              <InstallLine command={ch.cmd} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
