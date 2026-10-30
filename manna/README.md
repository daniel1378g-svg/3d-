# Manna Açaí · redesign proposal

An unofficial redesign of [manna-acai.ch](https://manna-acai.ch/), the açaíteria in the Archhöfe City Mall in
Winterthur, built as a working site in five languages around a living açaí surface, oversized type and Manna's own
product photography.

Every page carries the band "Proposta de design · não é o site oficial" and the notice in its own language; the build
is `noindex`. See `HANDOFF.md` for sources, the asset inventory, decisions, checks and open questions.

## Run

```bash
npm install
npm run dev              # http://127.0.0.1:5250/de/
npm run build            # dist/: 15 prerendered pages (5 languages × 3 pages), noindex, robots disallow
npm test                 # node:test: product data and search, contact links, translation keys and placeholders, routes
npm run check            # translations vs. German + an alt text for every public image
npm run preview          # serves dist/ at http://127.0.0.1:4250/de/
npm run qa               # browser checks against the preview (45 checks; needs Playwright + Chromium)
npm run perf             # home page frame rate, canvas resolution, LCP and CLS against the preview
npm run build:artifact   # artifact/: the claude.ai preview (one script, relative assets, #de-angebot style routes)
npm run fetch            # downloads the full-size originals listed in content/assets.json into media/ (not in git)
npm run images           # media/originals → public/images (WebP), public/video (MP4/WebM + poster), logo, favicons
```

Node 20+; Python 3 with Pillow and ffmpeg for `images`. `VITE_PROPOSAL=0` removes the band and turns on indexing and
the prepared structured data — only for an authorised launch.

## Structure

```
src/components/home/   Hero + acaiField (WebGL 2 shader), Explorer, CupStory + CupArt, Waffles, About, Gallery, Visit, Faq
src/components/        Header, MenuOverlay, Intro, LanguageTransition, Footer, Img, PageHero
src/content/           facts.ts (shop, contact, imprint, socials), products.ts (the range, as published)
src/i18n/              de.ts (source) + en/pt/fr/it (typed as Dict), routes and slugs
src/pages/             Home, Angebot (the whole range), Legal
content/               assets.json (every original image: source, caption, category, use, public), raw/ (captures)
tests/                 *.test.ts (run by scripts/run-tests.mjs)
```
