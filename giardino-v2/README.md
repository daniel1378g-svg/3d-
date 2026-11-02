# Pizzeria Giardino, Leukerbad – website

A four-language website (Deutsch, Français, English, Italiano) for Pizzeria Giardino, Thermenstrasse 9, 3954 Leukerbad,
built on the editorial design of the Restaurant Oceano proposal in this repository (`../oceano`, preview
https://claude.ai/artifact/AjJtg6aSX23Rx7VLEbKHzz) and filled with Giardino's own photographs, logo, texts, hours and
menus. The earlier, differently designed Giardino proposal in `../giardino` is untouched; its verified content captures
were reused here.

Hand-off, content conflicts and open integrations: [HANDOFF.md](HANDOFF.md).

## Run it

Node 20.19 or newer.

```sh
npm ci
npm run dev             # http://127.0.0.1:5310/de/
npm run build           # dist/: 44 pre-rendered pages (11 × 4 languages), 404, sitemap.xml, robots.txt, _redirects
npm run preview         # serves dist/ on http://127.0.0.1:4310
npm test                # opening-hours logic: Zurich time, both DST changes, closures, rest day, kitchen breaks
npm run check:i18n      # every text in all four languages, Swiss "ss", the six reviews word for word
npm run qa              # browser QA of dist/ (107 checks, see below) – run after `npm run build`
npm run build:artifact  # the claude.ai preview → artifact/ (with the permanent proposal band)
```

Settings (environment, at build time):

| Variable | Effect |
|---|---|
| `VITE_FORM_ENDPOINT` | Formspree-compatible endpoint for the contact form. Without it the form validates, then hands the finished message to the visitor's own e-mail program and says so – it never claims to have sent anything. |
| `VITE_ORIGIN` | Public origin for canonical links, hreflang, the sitemap and JSON-LD (default `https://pizzeriagiardino.ch`). |
| `VITE_PROPOSAL=1` | Shows the «Proposta de design · não é o site oficial» band in a normal build (always on in the preview build). |

Deploy `dist/` to any static host. `_redirects` (Netlify / Cloudflare Pages format) sends every address of the current
site to its new page with a 301; on another host, translate it into that host's rules.

## Where to edit

| What | File |
|---|---|
| Opening hours, Wednesday rest day, kitchen hours, **date-specific closures** (they override the week everywhere and their notice disappears after the last day) | `src/content/hours.ts` → `CLOSURES` |
| Address, phone, e-mail, map links, menus (PDF links, pages, sizes), vouchers, tour, partner hotels | `src/content/business.ts` |
| All texts (four languages, `l(de, fr, en, it)`) | `src/i18n.ts` (interface), `src/content/copy.ts` (sections), `src/content/pages.ts` (inner pages) |
| Google reviews (original wording + labelled translations) | `src/content/reviews.ts` |
| Page titles, descriptions, JSON-LD | `src/seo.ts` |
| Photographs (alt texts in four languages, categories) | `src/content/photos.json` – written by `npm run assets` from `../giardino/content/assets.json` |
| Colours, type scale, buttons, textures | `src/styles.css` (tokens at the top) |
| The 3D pizza | `src/three/pizza.ts` (`dev/pizza.html` renders it alone; `?poster=1` from above for the still) |

## Structure

```
src/
  App.tsx              shell: language switch with scroll anchoring, first-visit intro, page transitions
  main.tsx             router (paths; in the preview build a "#de-speisekarte" hash), fonts, styles
  i18n.ts  seo.ts      languages, localized slugs, interface words; head tags and Restaurant JSON-LD
  components/          header, language menu, mobile menu, welcome wipe, reservation drawer, hours dial, lightbox …
  sections/            hero + story, food chapters, marquee, cards, editorials, map, hours, menus, gallery, reviews, contact
  pages/               home and the ten inner pages
  three/pizza.ts       the three.js pizza (lazy, GPU only, paused off screen)
  content/             business facts, hours, copy, reviews, photos
public/                images (AVIF + WebP), brand (logo variants, favicons, pizza still), cutouts
scripts/               prerender, artifact build, QA, i18n check, tests runner, asset and cutout scripts
tests/                 node:test suites
docs/screens/          screenshots of the main moments
```

Stack: React 19, TypeScript, Vite 6, Tailwind 4, Motion 12 (UI transitions), GSAP ScrollTrigger (scroll scenes),
Radix Dialog (menu, drawer, lightbox), three.js r187 (the pizza). Fonts are self-hosted (Barlow Condensed, Lato, Caveat).
