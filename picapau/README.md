# Pica Pau · redesign proposal

A redesign of [picapau.ch](https://picapau.ch/), the Portuguese restaurant at Rue Hugo-de-Senger 3 in Geneva.
It's in five languages (Français by default, English, Português, Italiano, Deutsch), with a WebGL Douro
hero, a pinned scroll story, the full carte, booking by group size and live opening hours.

**This is a proposal.** The live site stays as it is. The logo, photos and texts belong to Pica Pau, so the
new site goes live only with the owner's OK. Until then every page carries the fixed band
"Proposta de design · não é o site oficial".

- Preview: https://claude.ai/artifact/XWHqssMVYff6nNG7aCy6Vx (anyone with the link can open it)
- Hand-off notes, decisions and open questions: [HANDOFF.md](HANDOFF.md)
- Screenshots: [docs/screenshots/](docs/screenshots/)

## Commands

```bash
npm install
npm run dev              # http://localhost:5173/fr/
npm run build            # static site in dist/: 15 prerendered pages, sitemap, robots, _redirects, 404
npm run preview          # serves dist/ on http://localhost:4173
npm run build:artifact   # the claude.ai preview (one page, hash routing) in artifact/
npm run count            # checks content/carte.json against the saved copy of the live carte
npm run extract          # re-reads content/raw/live.html into content/raw/live-data.json
npm run images           # photos, cut-outs, logo and favicons → public/ (Python + Pillow; rembg for --cutouts)
```

- `VITE_PROPOSAL=0 npm run build` removes the proposal band. Use it only once the owner has approved.
- `dist/` works on any static host. `_redirects` uses the Netlify / Cloudflare Pages format. Each page is
  written both as `/fr/carte/index.html` and `/fr/carte.html`, so either way of mapping URLs works.
- `?webgl=1` / `?webgl=0` forces the WebGL hero and the cork coaster on or off (by default software GPUs
  get the still frame).

## Where things are

| Path | What |
| --- | --- |
| `content/raw/` | The live page as captured on 29 Oct 2026 and the data read from it (texts in FR/PT/EN, carte, photo alts, JSON-LD). |
| `content/carte.json` | The carte: 6 sections, 50 dishes, prices, descriptions in five languages. Built by `scripts/build-carte.mjs` from the live data plus `content/carte-it-de.json`. |
| `media/source/` | The seven gallery photos and the logo, downloaded from picapau.ch at full size. |
| `media/cutouts/` | rembg cut-outs of photos 2, 4, 6 and 7. |
| `src/copy.ts` | Every interface text in five languages (FR/PT/EN taken from the live site, IT/DE translated). |
| `src/i18n.ts` | Languages, URL slugs, anchors, welcome words. |
| `src/home/` | The home sections (river story, classics, bands, carte teaser, reservation, gallery, plats du jour, infos). |
| `src/pages/` | Home, carte and privacy pages. |
| `src/three/` | The Douro shader (hero) and the cork coaster. |
| `src/lottie/` | Small Lottie icons built in code (woodpecker, pot, tram, sun, fish, wine, clock, phone). |
| `src/prerender.tsx`, `scripts/postbuild-routes.mjs` | Build-time prerender of every page and language, head tags, sitemap, redirects. |
| `scripts/build-artifact.mjs` | Packs the preview for claude.ai. |

## Stack

Vite 6, React 19, TypeScript, Tailwind CSS 4, Motion 12, GSAP 3 (ScrollTrigger), three.js, lottie-web
(light build), React Router 7. Fonts from Google Fonts: Barlow Condensed, Lato, Caveat.

The pages are prerendered at build time and React hydrates them, so their text is in the HTML for search
engines and for visitors without JavaScript. The exception is the lower half of the home page (from the logo
strip down), which mounts just after the first paint.
