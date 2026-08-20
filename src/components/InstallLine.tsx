'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The primary call to action is a command, not a button.
 *
 * The smallest possible first act, and a provably harmless one — which is why the copy
 * beside it says a scan never writes a file. There is no email capture anywhere on this
 * site, and the page ends on this same line rather than on a form.
 */
export function InstallLine({ command }: { command: string }) {
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
      // Clipboard access can be refused; the text is selectable either way, so there is
      // nothing to recover from and nothing worth alarming anyone about.
    }
  }, [command]);

  return (
    <div className="install">
      <code>
        <span className="sigil">$ </span>
        {command}
      </code>
      <button type="button" className="install-copy" onClick={copy} aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
