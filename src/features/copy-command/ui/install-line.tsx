'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

/**
 * The primary call to action is a command, not a form.
 *
 * The smallest possible first act, and a provably harmless one — which is why the copy
 * beside it says a scan never writes a file. There is no email capture anywhere on this
 * site, and the page ends on this same line.
 */
export function InstallLine({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be refused; the text is selectable either way.
    }
  }, [command]);

  return (
    <div
      className={cn(
        'group flex w-full max-w-xl items-stretch overflow-hidden rounded-xl',
        'border border-rule bg-surface',
        className,
      )}
    >
      <code className="flex-1 overflow-x-auto whitespace-nowrap px-6 py-5 font-mono text-lg text-ink-strong sm:text-xl">
        <span className="select-none text-ink-faint">$ </span>
        {command}
      </code>
      <Button
        type="button"
        variant="ghost"
        onClick={copy}
        aria-label={`Copy: ${command}`}
        className="h-auto rounded-none border-l border-rule px-6 text-ink-dim hover:bg-mint/10 hover:text-mint"
      >
        {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
        <span className="sr-only sm:not-sr-only sm:ml-1 sm:font-mono sm:text-xs sm:tracking-widest sm:uppercase">
          {copied ? 'Copied' : 'Copy'}
        </span>
      </Button>
    </div>
  );
}
