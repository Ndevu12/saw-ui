import { ReplayDeck } from '@/features/replay-session/ui/replay-deck';
import { shell } from '@/shared/config/site';

/**
 * The demonstration section.
 *
 * The LAYOUT — a sticky left column beside the terminal on its own inset stage — is
 * kept as is; it works. The only thing that was wrong here was the COPY: an earlier
 * version headed it "Real sessions. Recorded, not mocked." and spent two paragraphs
 * insisting the output was genuine, arguing with a doubt no one raised. Present, do
 * not defend. The heading states the action; one line says what you are looking at;
 * the terminal proves it without a caption telling you to believe it.
 */
export function Demo() {
  return (
    <section id="watch" className="border-t border-rule-soft">
      <div className={`${shell} py-24 lg:py-36`}>
        <div className="grid gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-x-20">
          {/* Left: pinned while the session plays. */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-16 lg:self-start">
            <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">See it run</p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-balance text-ink-strong">
              Watch it in action.
            </h2>
            <p className="max-w-[42ch] text-base leading-relaxed text-ink-dim md:text-lg">
              Real commands, real output, captured from the published release. It plays on its own.
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
