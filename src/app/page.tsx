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
        <Wordmark height={34} animate />
        <nav>
          <a href={DOCS}>Docs</a>
          <a href={`${REPO}/issues`}>Report</a>
          <a href={REPO}>GitHub</a>
        </nav>
      </header>

      <main id="main">
        {/* ── Hero. The thesis is the verdict: one integer, and a demonstration of it
             arriving. Not a paragraph about capability. ───────────────────────────── */}
        <section className="wrap hero">
          <div className="hero-grid">
            <div>
              <h1>The exit code is the verdict.</h1>
              <p className="lede">
                <strong>saw</strong> hunts self-propagating supply-chain malware where it lands —
                in your repositories, your lockfiles, your installed dependencies and your
                machine&apos;s start-up surface. It remediates through a pull request and gates CI,
                so an infected change cannot merge.
              </p>

              <InstallLine command="pip install stayawakebot" />

              <p className="hero-note">
                Offline by default — no network, no configuration, no credential.{' '}
                <strong>
                  A scan never modifies a file, anywhere, under any flag.
                </strong>
              </p>
            </div>

            <ReplayDeck />
          </div>
        </section>

        {/* ── The four codes. Fluency: the whole contract in four characters. ─────── */}
        <section className="wrap section">
          <div className="stack" style={{ marginBottom: 28 }}>
            <p className="eyebrow">The whole contract</p>
            <h2>Four integers, and nothing to configure.</h2>
            <p className="lede">
              There is no <code>--fail</code> flag, nothing to parse and no threshold to tune. A CI
              gate is one line, and there is no way to accidentally configure it away.
            </p>
          </div>
          <div className="codes">
            <div className="code code-0"><b>0</b><span>Clean, and fully scanned.</span></div>
            <div className="code code-1"><b>1</b><span>Infected. At least one confirmed finding.</span></div>
            <div className="code code-2"><b>2</b><span>Could not be scanned. Unknown, not clean.</span></div>
            <div className="code code-3"><b>3</b><span>Rotating credentials from this host is unsafe.</span></div>
          </div>
        </section>

        {/* ── The threat, as a class. No campaign is ever named here. ─────────────── */}
        <section className="wrap section narrow">
          <div className="stack">
            <p className="eyebrow">What it hunts</p>
            <h2>Code you asked for, running before you read it.</h2>
            <p className="lede">
              Self-propagating packages arrive through an ordinary install. They take the
              credentials of whoever is logged in, and use them to publish themselves onward —
              so every newly infected package becomes the launchpad for the next.
            </p>
            <p className="lede">
              Propagation moves faster than review. By the time a wave has been classified
              somewhere else, the package is already in your lockfile and its install script has
              already run. That is the moment <strong>saw</strong> is built for: not the registry,
              but the disk it already reached.
            </p>
          </div>
        </section>

        {/* ── Verbs. One sentence, one command, each standing alone. ──────────────── */}
        <section className="wrap section">
          <div className="stack" style={{ marginBottom: 28 }}>
            <p className="eyebrow">Four verbs</p>
            <h2>Each one stands alone.</h2>
          </div>
          <div className="verbs">
            <div className="verb">
              <span className="verb-cmd">saw scan</span>
              <p>
                Hunts repositories, lockfiles and installed dependency trees. Read-only, always —
                remediation lives in a different command so nobody can trip into it.
              </p>
              <span className="verb-tag">read-only</span>
            </div>
            <div className="verb">
              <span className="verb-cmd">saw fix</span>
              <p>
                Prepares the cleanup on its own branch and stops. A cleaned file is recovered from
                git history — the real previous content — or quarantined whole, so a fix cannot
                corrupt working code.
              </p>
              <span className="verb-tag">writes one branch · --pr to publish</span>
            </div>
            <div className="verb">
              <span className="verb-cmd">saw guard</span>
              <p>
                Installs the CI gate, pins every action by commit SHA, and verifies branch
                protection actually <em>requires</em> the check — because a gate that is not
                required is decoration.
              </p>
              <span className="verb-tag">one repo, or a whole organisation</span>
            </div>
            <div className="verb">
              <span className="verb-cmd">saw audit</span>
              <p>
                Looks at the machine rather than the code: cached credentials, editor settings and
                the start-up surface. It reports and leaves the host alone.
              </p>
              <span className="verb-tag">read-only</span>
            </div>
          </div>
        </section>

        {/* ── The contracts. These are enforced by the code, not claimed by the page. */}
        <section className="wrap section">
          <div className="stack" style={{ marginBottom: 30 }}>
            <p className="eyebrow">What it promises</p>
            <h2>Boundaries narrow enough to trust it on anything.</h2>
            <p className="lede">
              A security tool that damages a working repository gets uninstalled. So the limits are
              deliberate, and they hold under every flag.
            </p>
          </div>
          <div className="promises">
            <div className="promise">
              <h3>A target that cannot be scanned is never clean</h3>
              <p>
                Silence has two causes — there was nothing to find, or nothing was looked at — and
                only one of them is good news. Where saw cannot tell them apart, it says so and
                exits non-zero rather than returning the comfortable answer.
              </p>
            </div>
            <div className="promise">
              <h3>The allowlist is yours, never the target&apos;s</h3>
              <p>
                Suppressions come from one config you choose. saw never takes suppression input
                from the repository it is scanning, so a repository cannot ship an allowlist that
                excuses its own payload.
              </p>
            </div>
            <div className="promise">
              <h3>Nothing lands without a human merge</h3>
              <p>
                On an infected verdict the gate opens the fix as a pull request and stays red until
                you merge it. Remediation opens the fix; it never makes the check pass.
              </p>
            </div>
            <div className="promise">
              <h3>Reports never carry a payload</h3>
              <p>
                Full evidence stays on your terminal. Anything written to disk carries a
                fingerprint instead, and alerts carry no evidence at all — so a security report can
                never re-distribute live malware.
              </p>
            </div>
            <div className="promise">
              <h3>A verdict says only what it covers</h3>
              <p>
                A repository verdict is about the repository. A host verdict is about the host.
                Neither speaks for the other, and saw will not let one imply the other.
              </p>
            </div>
            <div className="promise">
              <h3>How detection decides is not published</h3>
              <p>
                The signals, the thresholds and the corroboration are deliberately undocumented,
                because published detection mechanics are an evasion aid. The promises on this page
                are the contract; the internals are not part of it.
              </p>
            </div>
          </div>
        </section>

        {/* ── Agency at the low point. Order is the information here. ─────────────── */}
        <section className="wrap section narrow">
          <div className="stack" style={{ marginBottom: 26 }}>
            <p className="eyebrow">If it is already bad</p>
            <h2>Rotate last, not first.</h2>
            <p className="lede">
              The worst moment of an incident is not fear, it is not knowing what to do first.
              When <code>saw audit</code> reports that rotation is unsafe, this is the order — and
              the last step is last for a reason.
            </p>
          </div>
          <ol className="runbook">
            <li>
              <span className="step">01</span>
              <div><b>Isolate</b><p>Take the machine off the network.</p></div>
            </li>
            <li>
              <span className="step">02</span>
              <div><b>Neutralise</b><p>Deal with what the report names.</p></div>
            </li>
            <li>
              <span className="step">03</span>
              <div><b>Rebuild</b><p>If you cannot account for it. A host is never auto-cleaned — deleting a persistence entry destroys the evidence and rarely removes the cause.</p></div>
            </li>
            <li>
              <span className="step">04</span>
              <div><b>Rotate — from a machine you trust</b><p>Not this one. Rotating a credential on a compromised host hands the new one straight to whatever is running there.</p></div>
            </li>
          </ol>
        </section>

        {/* ── Report path. Discovery becomes participation, not disappointment. ──── */}
        <section className="wrap section narrow">
          <div className="report">
            <p className="eyebrow">Tell us</p>
            <h2>Found a false positive? Found something we missed?</h2>
            <p className="lede">
              Both are worth the same to us, and both go straight to the maintainer. A report that
              sharpens a detector is the most useful thing anyone sends.
            </p>
            <div className="report-links">
              <a className="btn btn-primary" href={`${REPO}/issues/new?template=false_positive.yml`}>
                Report a false positive
              </a>
              <a className="btn" href={`${REPO}/issues/new?template=bug_report.yml`}>Report a bug</a>
              <a className="btn" href={`${REPO}/issues/new?template=feature_request.yml`}>Request something</a>
            </div>
          </div>
        </section>

        {/* ── Install. Requirements as a fact of installation, never a caveat. ────── */}
        <section className="wrap section narrow">
          <div className="stack">
            <p className="eyebrow">Install</p>
            <h2>One line, and the first run needs nothing else.</h2>
            <InstallLine command="pip install stayawakebot" />
            <div className="reqs" style={{ marginTop: 4 }}>
              <span className="req">macOS</span>
              <span className="req">Linux</span>
              <span className="req">Python 3.11+</span>
              <span className="req">Docker image</span>
              <span className="req">v{version}</span>
            </div>
            <p className="lede" style={{ marginTop: 10 }}>
              Prefer not to install a Python toolchain at all? The published image scans a mounted
              repository and ships SLSA provenance and an SBOM. See the{' '}
              <a href={`${DOCS}/latest/tutorial/first-scan/`}>first scan</a> guide.
            </p>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <div className="foot-grid">
          <div className="stack-tight">
            <Wordmark height={26} />
            <p className="eyebrow" style={{ marginTop: 8 }}>the sentinel saw the worm</p>
          </div>
          <div className="foot-links">
            <a href={DOCS}>Documentation</a>
            <a href={`${REPO}/blob/main/docs/explanation/trust-model.md`}>Trust model</a>
            <a href={`${REPO}/blob/main/SECURITY.md`}>Security policy</a>
            <a href={`${REPO}/blob/main/CHANGELOG.md`}>Changelog</a>
            <a href="https://pypi.org/project/stayawakebot/">PyPI</a>
            <a href={REPO}>GitHub</a>
          </div>
        </div>

        <InstallLine command="pip install stayawakebot" />

        <p className="foot-note">
          <strong>This page sets no cookies, runs no analytics, and loads nothing from anyone
          else.</strong>{' '}
          Fonts and every other asset are served from this domain. Open your network tab — a tool
          that promises to keep your code off the network should be sold from a page that does the
          same.
        </p>
        <p className="foot-note" style={{ marginTop: 12 }}>
          Dual-licensed <a href={`${REPO}/blob/main/LICENSE`}>AGPL-3.0-or-later</a>, or{' '}
          <a href={`${REPO}/blob/main/COMMERCIAL-LICENSE.md`}>commercially</a> for proprietary use
          without the source-disclosure obligation — <a href="mailto:saw@ndevuspace.com">saw@ndevuspace.com</a>.
        </p>
      </footer>
    </>
  );
}
