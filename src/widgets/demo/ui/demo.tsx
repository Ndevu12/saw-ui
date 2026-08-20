import { ReplayDeck } from '@/features/replay-session/ui/replay-deck';
import { shell } from '@/shared/config/site';

/**
 * The demonstration section.
 *
 * Its job is one psychological move: a demonstration is read as evidence, where a
 * description is read as a claim. So the framing states plainly that these are the
 * real tool's real output — recorded from the published release, chosen by the
 * reader — because "not a mock-up" is the whole reason this converts. The terminal
 * gets a stage (a bordered, inset panel on a slightly raised ground) instead of
 * floating on the page.
 */
export function Demo() {
  return (
    <section id="watch" className="border-t border-rule-soft">
      <div className={`${shell} py-24 lg:py-36`}>
        <div className="grid gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-x-20">
          {/* Left: why you are looking at this. */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-16 lg:self-start">
            <p className="font-mono text-sm tracking-[0.24em] text-mint uppercase">See it run</p>
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.4rem)] leading-[1.04] font-bold tracking-tight text-balance text-ink-strong">
              Real sessions. Recorded, not mocked.
            </h2>
            <p className="max-w-[42ch] text-xl leading-[1.5] text-ink-dim">
              Every frame is the published release running against a sample project — the
              same bytes your own terminal would print. Nothing here is a screenshot or a
              staged demo.
            </p>
            <p className="max-w-[42ch] text-lg leading-[1.5] text-ink-faint">
              Pick a session and watch it play.
            </p>
          </div>

          {/* Right: the terminal, on its own inset stage. */}
          <div className="rounded-[20px] border border-rule bg-surface/40 p-3 sm:p-5">
            <ReplayDeck />
          </div>
        </div>
      </div>
    </section>
  );
}
