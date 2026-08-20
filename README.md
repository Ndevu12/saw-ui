# saw-ui

The marketing site for **[`saw`](https://github.com/Ndevu12/stayAwakeBot)** — an offline-first
supply-chain worm scanner and sentinel. Deployed to <https://saw.ndevuspace.com>; the versioned
documentation lives separately at <https://saw-docs.ndevuspace.com>.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into out/
npm run capture      # re-record the terminal sessions (needs python3)
```

## What this site is, and what it refuses to be

Three decisions govern every file here, and each is a thing a marketing site would normally do that
this one does not.

**It loads nothing from anyone else.** No analytics, no tag manager, no font CDN, no embeds, no
cookies and therefore no consent banner. Fonts are bundled via `@fontsource` and served from this
domain, and `vercel.json` ships a Content-Security-Policy with `connect-src 'none'` so the page
*cannot* phone home even if a future dependency tries. A tool whose promise is that your code never
leaves your machine should be sold from a page that behaves the same way — and a reader can verify
it in one glance at the network tab.

**The terminal is real.** Every frame in the replay deck is a recorded `saw` session, produced by
`tools/capture.py` against the published PyPI release. There is no server-side sandbox — executing a
scanner on demand from a public page would contradict everything above and bolt a live execution
surface onto a security brand — and there is no fake shell, because a canned answer to an unscripted
command is a lie about the product. The visitor chooses which session to watch, never what to type.
Full detail in [`docs/CAPTURES.md`](docs/CAPTURES.md).

**It publishes no detection mechanism.** No signals, thresholds or per-finding detail, and no
fixture that is known to trip the confirmed tier — a public sample like that is a detection oracle.
The disclosure rules in [`docs/CAPTURES.md`](docs/CAPTURES.md) bind copy and captures alike.

## Layout

| Path | What lives there |
| --- | --- |
| `src/app/page.tsx` | The page. All copy is here. |
| `src/app/globals.css` | Design tokens, type scale, layout primitives. |
| `src/app/site.css` | Component styles. |
| `src/components/ReplayDeck.tsx` | The recorded-terminal player. |
| `src/components/Wordmark.tsx` | The mark, generated from the CLI's own letter grid. |
| `src/lib/version.ts` | Resolves the published version at build time from PyPI. |
| `src/data/captures.json` | Generated. Never edit by hand. |
| `tools/capture.py` | Records the sessions. |

### The wordmark is generated, not drawn

`Wordmark.tsx` holds the same `_S` / `_A` / `_W` letter grids the CLI paints on every bare `saw`, so
the logo and the product are literally the same glyphs. If that grid ever changes in the CLI, change
it here in the same pass — the app icon and the CLI have already drifted apart once, in the `S`.

### The palette is sampled, not chosen

`#80E1AB` is the mark's mint and `#090E14` its ground, both taken from the shipped app icon;
`#335A44` and `#467C5E` are the hue-preserving darkenings that clear WCAG AA on white. The same
values are already documented in the tool's own `docs/assets/extra.css` — this is one system, not a
second one.

## Licence

The site content is (c) Jean Paul Elisa NIYOKWIZERWA. `saw` itself is dual-licensed
AGPL-3.0-or-later or commercial — see the
[tool repository](https://github.com/Ndevu12/stayAwakeBot).
