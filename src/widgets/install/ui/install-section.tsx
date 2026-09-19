import { site } from '@/shared/config/site';
import { ExtLink } from '@/shared/ui/ext-link';
import { Section, SectionIntro } from '@/shared/ui/section';

/**
 * How a decision-maker gets saw. The steps live on the docs site. This
 * section is the path, not a command list.
 */
const PATHS: { label: string; href: string; primary?: boolean }[] = [
  { label: 'Documentation', href: `${site.docs}/latest/`, primary: true },
  { label: 'PyPI', href: site.pypi },
  { label: 'GitHub', href: site.repo },
];

const PLATFORMS = ['macOS', 'Linux', 'Windows'] as const;

export function InstallSection({ version }: { version: string }) {
  return (
    <Section id="install">
      <SectionIntro
        title="Get saw."
        lead="The documentation has the steps for your computer, for a container, and for the automatic check on new code."
      >
        <div className="flex flex-wrap gap-3">
          {PATHS.map((path) => (
            <ExtLink
              key={path.label}
              href={path.href}
              className={
                path.primary
                  ? 'inline-flex items-center rounded-xl bg-mint px-8 py-3.5 text-base font-semibold text-ground transition-opacity hover:opacity-90'
                  : 'inline-flex items-center rounded-xl border border-rule px-8 py-3.5 text-base font-semibold text-ink-strong transition-colors hover:border-mint hover:text-mint'
              }
            >
              {path.label}
            </ExtLink>
          ))}
        </div>
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
