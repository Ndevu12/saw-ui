import { ReplayDeck } from '@/components/ReplayDeck';
import { Wordmark } from '@/components/Wordmark';
import { InstallLine } from '@/components/InstallLine';
import { publishedVersion } from '@/lib/version';

const REPO = 'https://github.com/Ndevu12/stayAwakeBot';
const DOCS = 'https://saw-docs.ndevuspace.com';

export default async function Home() {
  const version = await publishedVersion();

  return (
    <>
      <header className="wrap masthead">
        <Wordmark height={36} animate />
        <nav>
          <a href={DOCS}>Docs</a>
          <a href={`${REPO}/issues`}>Report</a>
          <a href={REPO}>GitHub</a>
        </nav>
      </header>

      <main id="main">
        {/* ── The hook. One idea, one thing to do.
             The exit codes are NOT here: to a first-time reader four bare integers
             mean nothing, and they are the payoff of the demonstration below, not
             its opening line. ──────────────────────────────────────────────────── */}
        <section className="wrap hero">
          <p className="eyebrow">The sentinel saw the worm</p>

          <h1>It ran before you read it.</h1>

          <p className="lede">
            A package you asked for can execute the moment it installs — take your
            credentials, and publish itself onward as you. <strong>saw</strong> hunts what
            already landed.
          </p>

          <div className="hero-cta">
            <InstallLine command="pip install stayawakebot" />
            <p className="creed">
              <b>zero code runs at install</b>
              <span className="dot">·</span>
              <b>offline</b>
              <span className="dot">·</span>
              <b>persists nothing</b>
            </p>
          </div>
        </section>

        {/* ── The demonstration, on a stage of its own. Watching a verdict arrive is
             evidence; reading that it detects things is a claim. ────────────────── */}
        <section className="wrap stage">
          <div className="stage-head">
            <h2>Watch it happen.</h2>
            <p className="said">
              Real recorded sessions, not a mock-up. Pick one.
            </p>
          </div>
          <ReplayDeck />
        </section>

        {/* ── What it hunts. The class, never a named campaign. ─────────────────── */}
        <section className="wrap section narrow">
          <div className="stack">
            <p className="eyebrow">What it hunts</p>
            <h2>Malware that spreads by being installed.</h2>
            <p className="lede">
              It arrives inside a package you chose, runs before review, and uses whatever
              credentials it finds to publish itself into the next one.
            </p>
            <p className="said">
              Propagation outruns review. By the time a wave is understood, it is already in
              your lockfile — which is the moment saw is built for.
            </p>
          </div>
        </section>

        {/* ── Verbs. ───────────────────────────────────────────────────────────── */}
        <section className="wrap section">
          <div className="stack" style={{ marginBottom: 64 }}>
            <p className="eyebrow">Four verbs</p>
            <h2>Each one stands alone.</h2>
          </div>
          <div className="verbs">
            <div className="verb">
              <span className="verb-cmd">saw scan</span>
              <p>Hunts your repositories, lockfiles and installed dependencies. Never writes a file.</p>
            </div>
            <div className="verb">
              <span className="verb-cmd">saw fix</span>
              <p>Recovers the clean version from your own git history, onto its own branch.</p>
            </div>
            <div className="verb">
              <span className="verb-cmd">saw guard</span>
              <p>Gates CI, and proves the gate is actually required — not merely present.</p>
            </div>
            <div className="verb">
              <span className="verb-cmd">saw audit</span>
              <p>Checks the machine itself: credentials, editors, what runs at start-up.</p>
            </div>
          </div>
        </section>

        {/* ── NOW the exit codes make sense — after the reader has seen a scan. ─── */}
        <section className="wrap section narrow">
          <div className="stack" style={{ marginBottom: 50 }}>
            <p className="eyebrow">The verdict</p>
            <h2>One number is the whole answer.</h2>
            <p className="lede">
              Every scan ends in a single exit code. That is the entire contract — so gating
              CI is one line, with nothing to configure and no way to configure it away.
            </p>
          </div>
          <div className="codes">
            <div className="code code-0"><b>0</b><span>Clean, and fully scanned.</span></div>
            <div className="code code-1"><b>1</b><span>Infected. The build fails, and no flag makes it pass.</span></div>
            <div className="code code-2"><b>2</b><span>Could not be scanned — which is unknown, never clean.</span></div>
            <div className="code code-3"><b>3</b><span>Rotating credentials from this machine is unsafe right now.</span></div>
          </div>
        </section>

        {/* ── Promises. Four, one line each. ───────────────────────────────────── */}
        <section className="wrap section">
          <div className="stack" style={{ marginBottom: 64 }}>
            <p className="eyebrow">What it promises</p>
            <h2>Narrow enough to trust on anything.</h2>
          </div>
          <div className="promises">
            <div className="promise">
              <h3>Nothing leaves your machine</h3>
              <p>No network, no configuration, no credential. One opt-in flag is the only exception.</p>
            </div>
            <div className="promise">
              <h3>Silence is never mistaken for safety</h3>
              <p>Anything saw could not scan comes back as unknown, not as clean.</p>
            </div>
            <div className="promise">
              <h3>Your allowlist, never the target&apos;s</h3>
              <p>A repository cannot ship a config that excuses its own payload.</p>
            </div>
            <div className="promise">
              <h3>Nothing lands without your merge</h3>
              <p>Remediation opens a pull request. It never makes the check pass.</p>
            </div>
          </div>
        </section>

        {/* ── Agency at the low point. Order is the information. ────────────────── */}
        <section className="wrap section narrow">
          <div className="stack" style={{ marginBottom: 50 }}>
            <p className="eyebrow">If it is already bad</p>
            <h2>Rotate last, not first.</h2>
            <p className="lede">
              The worst part of an incident is not knowing what to do first. This is the
              order, and the last step is last for a reason.
            </p>
          </div>
          <ol className="runbook">
            <li><span className="step">01</span><div><b>Isolate</b><p>Take the machine off the network.</p></div></li>
            <li><span className="step">02</span><div><b>Neutralise</b><p>Deal with what the report names.</p></div></li>
            <li><span className="step">03</span><div><b>Rebuild</b><p>If you cannot account for it. A host is never auto-cleaned.</p></div></li>
            <li><span className="step">04</span><div><b>Rotate</b><p>From a machine you trust. Rotating on a compromised host hands over the new credential too.</p></div></li>
          </ol>
        </section>

        {/* ── Report path, then the command. The page ends the way the tool begins. */}
        <section className="wrap section narrow">
          <div className="stack">
            <p className="eyebrow">Tell us</p>
            <h2>Found a false positive? Found something we missed?</h2>
            <p className="lede">
              Both are worth the same, and both reach the maintainer directly.
            </p>
            <div className="btn-row">
              <a className="btn btn-primary" href={`${REPO}/issues/new?template=false_positive.yml`}>
                Report a false positive
              </a>
              <a className="btn" href={`${REPO}/issues/new?template=bug_report.yml`}>Report a bug</a>
            </div>
          </div>
        </section>

        <section className="wrap section narrow">
          <div className="stack">
            <h2>Start with one command.</h2>
            <InstallLine command="pip install stayawakebot" />
            <div className="reqs">
              <span className="req">macOS</span>
              <span className="req">Linux</span>
              <span className="req">Python 3.11+</span>
              <span className="req">Docker</span>
              <span className="req">v{version}</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <div className="foot-grid">
          <Wordmark height={28} />
          <div className="foot-links">
            <a href={DOCS}>Documentation</a>
            <a href={`${REPO}/blob/main/docs/explanation/trust-model.md`}>Trust model</a>
            <a href={`${REPO}/blob/main/SECURITY.md`}>Security</a>
            <a href="https://pypi.org/project/stayawakebot/">PyPI</a>
            <a href={REPO}>GitHub</a>
          </div>
        </div>

        <p className="foot-note" style={{ marginTop: 56 }}>
          <strong>This page sets no cookies, runs no analytics, and loads nothing from anyone
          else.</strong>{' '}
          Open your network tab — a tool that keeps your code off the network should be sold
          from a page that does the same.
        </p>
        <p className="foot-note" style={{ marginTop: 18 }}>
          Dual-licensed <a href={`${REPO}/blob/main/LICENSE`}>AGPL-3.0-or-later</a>, or{' '}
          <a href={`${REPO}/blob/main/COMMERCIAL-LICENSE.md`}>commercially</a> —{' '}
          <a href="mailto:saw@ndevuspace.com">saw@ndevuspace.com</a>.
        </p>
      </footer>
    </>
  );
}
