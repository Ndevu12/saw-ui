// Runs before `next build`. Resolves the published version from PyPI once and writes it
// to public/version.json, so the built site serves its own deployed version at
// /version.json. The refresh-version workflow reads that to decide whether a release has
// happened since the last deploy — without a paid deploy hook and without a full rebuild
// on every check. Falls back to the capture-recorded version if PyPI is unreachable, so
// the build never fails and never invents a number.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const captures = JSON.parse(
  readFileSync(join(root, 'src/entities/capture/model/captures.json'), 'utf8'),
);
const recorded = captures.version;

let version = recorded;
try {
  const res = await fetch('https://pypi.org/pypi/stayawakebot/json', { cache: 'no-store' });
  if (!res.ok) throw new Error(`PyPI responded ${res.status}`);
  const data = await res.json();
  version = data?.info?.version || recorded;
} catch (err) {
  console.warn(`[version] PyPI unreachable (${err.message}); using recorded ${recorded}`);
}

mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(join(root, 'public/version.json'), `${JSON.stringify({ version, recorded })}\n`);
console.log(`[version] public/version.json → ${version}`);
