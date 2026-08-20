# saw-ui

Marketing site for **[saw](https://github.com/Ndevu12/stayAwakeBot)** — an offline-first
supply-chain worm scanner and sentinel. Live at **[saw.ndevuspace.com](https://saw.ndevuspace.com)**.

Built with Next.js (static export), Tailwind CSS v4 and shadcn/ui; deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

The hero terminal replays real recorded `saw` sessions. To re-record them (needs Python 3):

```bash
npm run capture
```

## Structure

Organised by [Feature-Sliced Design](https://feature-sliced.design):

| Path | Contents |
| --- | --- |
| `src/app` | Route, layout, global styles and theme tokens |
| `src/widgets` | Page sections — header, hero, footer |
| `src/features` | The replay terminal and the copy-command control |
| `src/entities` | The recorded terminal sessions (`captures.json`) |
| `src/shared` | UI primitives, config and helpers |
| `tools/capture.py` | Records the terminal sessions |

## Notes

- **No third-party requests.** Fonts are self-hosted and `vercel.json` sets a strict CSP
  (`connect-src 'none'`), so the page loads nothing from anyone else.
- **Real terminal.** Every replay frame is a recorded `saw` run, never a mock-up — see
  [`docs/CAPTURES.md`](docs/CAPTURES.md).
- **Generated wordmark.** The mark is built from the CLI's own letter grid; keep it in sync if the
  CLI's grid changes.

## License

Site content © Jean Paul Elisa NIYOKWIZERWA. `saw` itself is dual-licensed AGPL-3.0-or-later or
commercial — see the [tool repository](https://github.com/Ndevu12/stayAwakeBot).
