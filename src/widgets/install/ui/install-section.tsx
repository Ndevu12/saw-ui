import { site } from '@/shared/config/site';
import { ExtLink } from '@/shared/ui/ext-link';
import { Section, SectionIntro } from '@/shared/ui/section';

/**
 * How a decision-maker gets saw. The steps themselves live on the docs
 * site. This page only points the way.
 */
const PATHS: { label: string; href: string }[] = [
  { label: 'Documentation', href: `${site.docs}/latest/` },
  { label: 'PyPI', href: site.pypi },
  { label: 'GitHub', href: site.repo },
];

export function InstallSection() {
  return (
    <Section id="install">
      <SectionIntro
        title="Get saw."
        lead="The documentation has the steps for your computer, for a container, and for the automatic check on new code."
      >
        <div className="flex flex-wrap gap-3">
          {PATHS.map((path, i) =>
            i === 0 ? (
              <ExtLink
                key={path.label}
                href={path.href}
                className="inline-flex items-center rounded-xl bg-mint px-8 py-3.5 text-base font-semibold text-ground transition-opacity hover:opacity-90"
              >
                {path.label}
              </ExtLink>
            ) : (
              <ExtLink
                key={path.label}
                href={path.href}
                className="inline-flex items-center rounded-xl border border-rule px-8 py-3.5 text-base font-semibold text-ink-strong transition-colors hover:border-mint hover:text-mint"
              >
                {path.label}
              </ExtLink>
            ),
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {['macOS', 'Linux', 'Windows'].map((r) => (
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
