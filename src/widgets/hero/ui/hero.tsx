'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { InstallLine } from '@/features/copy-command/ui/install-line';
import { shell, site } from '@/shared/config/site';

/**
 * The first screen.
 *
 * COPY RULE, learned the hard way: say what the tool does, in words a stranger
 * already knows. An earlier headline read "It ran before you read it." — evocative,
 * but "it" referred to nothing the reader had been told about yet, and the sentence
 * was about the THREAT rather than the product. A hero has to answer two questions
 * before anything else: what does this do, and why this one.
 *
 * So: headline states the job. Subhead states the mechanism and the wedge. Then the
 * command, then the objection answered before it is raised. No jargon, no worm
 * metaphor, no cleverness standing between the reader and the product.
 *
 * The exit codes are deliberately NOT here — four bare integers mean nothing to a
 * first-time reader, and they are the payoff of watching a scan, not the opening.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function Hero() {
  // Motion's own hook, rather than a hand-rolled media query listener. When the
  // reader has asked for less motion, everything renders in its final position.
  const still = useReducedMotion();
  const v = still ? undefined : rise;

  return (
    <section className={`${shell} flex flex-1 flex-col justify-center py-16 lg:py-20`}>
      <motion.div
        variants={still ? undefined : container}
        initial={still ? undefined : 'hidden'}
        animate={still ? undefined : 'show'}
        className="flex flex-col"
      >
        <motion.p
          variants={v}
          className="font-mono text-sm tracking-[0.24em] text-mint uppercase sm:text-base"
        >
          Open-source supply-chain scanner
        </motion.p>

        <motion.h1
          variants={v}
          className="mt-8 font-display text-[clamp(3rem,7.2vw,7rem)] leading-[0.95] font-bold tracking-[-0.03em] text-balance text-ink-strong"
        >
          Find malware in your dependencies.
        </motion.h1>

        <motion.p
          variants={v}
          className="mt-10 max-w-[52ch] text-2xl leading-[1.45] text-ink-dim sm:text-[1.75rem]"
        >
          <span className="text-ink-strong">saw</span> scans your repositories, lockfiles
          and installed packages, opens the fix as a pull request, and stops the infected
          change from merging.{' '}
          <span className="text-ink">It runs entirely on your machine.</span>
        </motion.p>

        <motion.div variants={v} className="mt-14 flex flex-col gap-7">
          <InstallLine command={site.install} />
          <p className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-base text-mint sm:text-lg">
            <span>no network</span>
            <span className="text-rule" aria-hidden="true">·</span>
            <span>no account</span>
            <span className="text-rule" aria-hidden="true">·</span>
            <span>a scan never changes a file</span>
          </p>
        </motion.div>

        <motion.a
          variants={v}
          href="#watch"
          className="mt-20 inline-flex w-fit items-center gap-2.5 text-lg text-ink-faint transition-colors hover:text-mint"
        >
          Watch it work
          <ArrowDown className="size-5" aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
