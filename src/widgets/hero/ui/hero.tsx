import { Check } from 'lucide-react';
import { InstallLine } from '@/features/copy-command/ui/install-line';
import { ReplayDeck } from '@/features/replay-session/ui/replay-deck';
import { shell, site } from '@/shared/config/site';
import { Saw } from '@/shared/ui/saw';

/**
 * The first screen. This site translates the product for a decision-maker.
 * The one action is the install line. The terminal is the play — mount
 * it, do not edit the deck.
 *
 * Never narrow the tool: it looks in the project, in the packages that
 * project uses, in packages already on this computer, and on the computer
 * itself. Never claim past the contract. Never defend ("needs no network").
 * Name the work.
 *
 * This is a server component. The entrance is CSS. Above-the-fold content
 * never waits on JavaScript to be seen.
 */
export function Hero() {
  return (
    <section className={`${shell} fill-under-header flex flex-col justify-center py-16 lg:py-20`}>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col">
          <p
            className="reveal font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm"
            style={{ '--reveal-delay': '40ms' } as React.CSSProperties}
          >
            Find · Fix · Prevent
          </p>

          <h1
            className="reveal mt-6 font-display text-4xl leading-tight lg:text-5xl font-bold tracking-tight text-ink-strong"
            style={{ '--reveal-delay': '130ms' } as React.CSSProperties}
          >
            <Saw accent /> finds harmful code hidden in software you installed —{' '}
            <span className="block">in your project, and on this computer.</span>
          </h1>

          <div
            className="reveal mt-9 flex flex-col gap-4"
            style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
          >
            <InstallLine command={site.install} />
            <ul className="flex flex-col gap-2 font-mono text-xs text-mint sm:text-sm">
              {[
                'Your project, the packages it uses, and this computer',
                'The repair is a change you review before it is accepted',
                'This computer is locked down. New code is checked before it becomes official.',
              ].map((line) => (
                <li key={line} className="flex items-center gap-2.5">
                  <Check className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="reveal min-w-0"
          style={{ '--reveal-delay': '320ms' } as React.CSSProperties}
        >
          <ReplayDeck />
        </div>
      </div>
    </section>
  );
}
