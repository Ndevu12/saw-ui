import captures from '@/entities/capture/model/captures.json';

/**
 * The published version, resolved at BUILD time — never typed by hand.
 *
 * A hand-written version number on the site goes stale silently at the next
 * release, and the page then lies about the thing it is selling. The package itself
 * derives its version from the git tag for the same reason, so the site derives its
 * from the registry.
 *
 * If PyPI is unreachable the build does not fail and does not invent a number: it
 * falls back to the version the terminal captures were actually recorded with, which
 * is a real fact about what is on the page rather than a guess, and warns loudly so a
 * stale build is visible in the log rather than silent.
 */
export async function publishedVersion(): Promise<string> {
  const recorded = captures.version;
  try {
    // Resolved ONCE, at build. `no-store` would mark the route dynamic and static
    // export refuses that, so the default cache is the correct setting here — a new
    // build is exactly when we want to re-ask. Never at runtime: the page ships with
    // connect-src 'none', so a client-side fetch would be blocked by design.
    const res = await fetch('https://pypi.org/pypi/stayawakebot/json', {
      cache: 'force-cache',
    });
    if (!res.ok) throw new Error(`PyPI responded ${res.status}`);
    const data = (await res.json()) as { info?: { version?: string } };
    const version = data.info?.version;
    if (!version) throw new Error('PyPI response carried no version');
    if (version !== recorded) {
      console.warn(
        `[saw-ui] PyPI is at ${version} but the terminal captures were recorded with ` +
          `${recorded}. Re-run \`npm run capture\` so the page and the release agree.`,
      );
    }
    return version;
  } catch (err) {
    console.warn(
      `[saw-ui] Could not reach PyPI (${(err as Error).message}). Falling back to the ` +
        `capture-recorded version ${recorded}. This build may be stale.`,
    );
    return recorded;
  }
}
