import { Wordmark } from '@/shared/ui/wordmark';
import { ExtLink } from '@/shared/ui/ext-link';
import { shell, site } from '@/shared/config/site';

export function SiteHeader() {
  return (
    <header className={`${shell} flex flex-wrap items-center justify-between gap-6 py-8`}>
      <Wordmark height={38} animate />
      <nav className="flex flex-wrap items-center gap-x-9 gap-y-3 text-lg">
        <ExtLink href={site.docs} className="text-ink-dim transition-colors hover:text-ink-strong">Docs</ExtLink>
        <ExtLink href={`${site.repo}/issues`} className="text-ink-dim transition-colors hover:text-ink-strong">Report</ExtLink>
        <ExtLink href={site.repo} className="text-ink-dim transition-colors hover:text-ink-strong">GitHub</ExtLink>
      </nav>
    </header>
  );
}
