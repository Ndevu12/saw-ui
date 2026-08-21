import { Wordmark } from '@/shared/ui/wordmark';
import { ExtLink } from '@/shared/ui/ext-link';
import { shell, site } from '@/shared/config/site';

/**
 * Sticky across the whole page: the outer bar is a direct child of the page column
 * (see the page layouts), so it sticks to the top through every section. It is
 * translucent + blurred so content reads as it scrolls beneath, with a hairline to
 * seat it. The inner div keeps the content on the shared measure.
 *
 * The logo links home and "Install" jumps to the install section — both absolute
 * (`/`, `/#install`) so they also work from the shared /support page. Internal
 * routes are plain anchors, per the codebase convention.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule-soft bg-ground/80 backdrop-blur-md">
      <div className={`${shell} flex flex-wrap items-center justify-between gap-6 py-8`}>
        <a
          href="/"
          aria-label="saw — home"
          className="rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
        >
          <Wordmark height={38} animate />
        </a>
        <nav className="flex flex-wrap items-center gap-x-9 gap-y-3 text-lg">
          <a href="/#install" className="text-ink-dim transition-colors hover:text-ink-strong">Install</a>
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
      </div>
    </header>
  );
}
