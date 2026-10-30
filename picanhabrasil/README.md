# Picanha Brasil · redesign proposal

An unofficial redesign of [picanha-brasil.ch](https://picanha-brasil.ch), the Brazilian restaurant at Mattengasse 9,
8005 Zürich, built as a working site in five languages around an interactive ember hero, oversized type and the
restaurant's own food cut-outs. Reservations and orders hand off to the restaurant's official systems.

Every page carries the band "Proposta de design · não é o site oficial" and the notice in its own language; the build
is `noindex`. See `HANDOFF.md` for sources, asset inventory, decisions, checks and open questions.

## Run

```bash
npm install
npm run dev              # http://127.0.0.1:5240/de/
npm run build            # dist/: 25 prerendered pages (5 languages × 5 pages), noindex, robots disallow
npm test                 # node:test: Zürich hours and DST, prices/fees in centimes, menu, delivery, i18n keys, routes
npm run check            # translations vs. German + menu localization completeness
npm run build:artifact   # artifact/: the claude.ai preview (one script, relative assets, #de-karte style routes)
npm run menu             # content/raw/foods.json → content/menu.json
npm run images           # media/originals → public/images (WebP) + src/data/images.json + logo/favicons
```

Node 20+ and Python 3 with Pillow (for `images`). `VITE_PROPOSAL=0` removes the band and turns on indexing, the
sitemap and Restaurant JSON-LD — only for an authorised launch.

## Structure

```
src/components/home/   Hero + emberField (WebGL 2 shader), Prato + PlateArt, MenuTeaser, Order, Reviews, …
src/components/        Header, MenuOverlay, Intro, LanguageTransition, BookingSheet, reservation/ (form + TableViz)
src/content/           facts.ts (hours, zones, fees, policies), menu.ts (typed menu helpers), alts.ts
src/i18n/              de.ts (source) + en/pt/fr/it (typed as Dict), routes and slugs
src/pages/             Home, Karte, Reservieren, Bestellen, Legal
content/               menu.json (centimes, 5 languages), reviews.json (verbatim), raw/ (captured source data)
media/                 originals/ (from picanha-brasil.ch), needs-owner-confirmation/ (secondary site, unused)
tests/                 *.test.ts (run by scripts/run-tests.mjs)
```
