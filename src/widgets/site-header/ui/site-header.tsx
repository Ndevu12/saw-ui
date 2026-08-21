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
        {/* Sponsorship, not contact — a different action from "Talk to us", so both stand.
            Quiet like the nav links; the accent stays on the one pill. Internal route. */}
        <a href="/support" className="text-ink-dim transition-colors hover:text-ink-strong">
          Support
        </a>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center rounded-full border border-mint/60 px-4 py-1.5 text-base text-mint transition-colors hover:border-mint hover:bg-mint hover:text-ground"
        >
          Talk to us
        </a>
      </nav>
    </header>
  );
}
