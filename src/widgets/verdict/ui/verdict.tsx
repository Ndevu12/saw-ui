import { shell } from '@/shared/config/site';

/**
 * The verdict: saw's exit code IS the answer. Four states, colour-coded by severity
 * (semantic colour, separate from the mint accent) so the reader can tell at a glance
 * which one needs attention. The point of the section is the contract — one integer,
 * nothing to configure — so it closes on the CI-gate payoff.
 */
const CODES: { code: string; word: string; meaning: string; tone: 'ok' | 'bad' | 'warn' }[] = [
  { code: '0', word: 'clean', meaning: 'Nothing found, and the target was fully scanned.', tone: 'ok' },
  { code: '1', word: 'infected', meaning: 'At least one confirmed finding. The build fails — and no flag makes it pass.', tone: 'bad' },
  { code: '2', word: 'could not scan', meaning: "A target saw couldn't fully read. Unknown — never quietly clean.", tone: 'warn' },
  { code: '3', word: 'rotation unsafe', meaning: 'From a host audit: rotating a credential from this machine is unsafe right now.', tone: 'bad' },
];

const NUM: Record<string, string> = { ok: 'text-mint', bad: 'text-coral', warn: 'text-amber' };
const BAR: Record<string, string> = { ok: 'bg-mint', bad: 'bg-coral', warn: 'bg-amber' };

export function Verdict() {
  return (
    <section className={`${shell} max-w-[1200px] py-24 lg:py-36`}>
      <div className="mb-14 flex max-w-[52ch] flex-col gap-5">
        <p className="font-mono text-xs tracking-[0.24em] text-mint uppercase sm:text-sm">The verdict</p>
        <h2 className="font-display text-3xl leading-tight md:text-4xl 2xl:text-5xl font-bold tracking-tight text-balance text-ink-strong">
          One number is the whole answer.
        </h2>
        <p className="text-lg leading-relaxed text-ink-dim md:text-xl">
          Every scan ends in a single exit code. That is the entire contract — so gating CI is one
          line, with nothing to configure and no way to configure it away.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CODES.map(({ code, word, meaning, tone }) => (
          <div
            key={code}
            className="rise flex flex-col overflow-hidden rounded-2xl border border-rule bg-surface/40"
          >
            <span className={`h-1 w-full ${BAR[tone]}`} aria-hidden="true" />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <span className={`font-mono text-5xl font-semibold tabular-nums ${NUM[tone]}`}>{code}</span>
              <span className={`font-mono text-xs tracking-[0.18em] uppercase ${NUM[tone]}`}>{word}</span>
              <p className="mt-1 text-sm leading-relaxed text-ink-dim">{meaning}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-[64ch] font-mono text-sm text-ink-faint">
        no <span className="text-mint">--fail</span> flag, nothing to parse — the exit code is the
        gate, and a gate is one line you cannot misconfigure.
      </p>
    </section>
  );
}
