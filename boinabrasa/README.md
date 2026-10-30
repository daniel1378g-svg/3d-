# Boinabrasa · redesign proposal

An unofficial redesign of [boinabrasa.ch](https://www.boinabrasa.ch/ch/), the Brazilian churrascaria in Dielsdorf,
built as a working site in five languages around one 3D sequence: picanha on a vertical skewer, grilled from raw,
carved by a passador's knife; the slice falls in slow motion onto the plate.

Every page carries the permanent band "Proposta de design · não é o site oficial". See `HANDOFF.md` for the
decisions, sources, checks and open questions.

## Run

```bash
npm install
npm run dev              # http://127.0.0.1:5230/de/   (dev/picanha.html?t=11.5 renders one moment of the 3D scene)
npm run build            # dist/: 105 prerendered pages (5 languages), sitemap, robots, _redirects
npm run build:artifact   # artifact/: the claude.ai preview (one script, relative assets, #de-preise style routes)
npm run check            # translations vs. the German source (articles, menu); dictionaries are type-checked by tsc
npm run images           # media/originals → public/images (WebP 480/960/1600 + blurred placeholders) and the clip
```

Environment: `VITE_FORM_ENDPOINT` (Formspree-compatible) makes the contact and group forms send; without it they
compose an e-mail (site) or show the finished message to copy (preview). `VITE_PROPOSAL=0` removes the band, only
once the owners approve.

## Stack

React 19, Vite 6, TypeScript, Tailwind 4, Motion 12, GSAP 3 (ScrollTrigger), Lenis, three.js 0.186 (no model files:
every mesh and texture is generated in code). Fonts: Archivo (variable width) and Fraunces from Google Fonts.

## Structure

```
src/three/             the hero scene: engine (timeline, camera, lights, post), meatGeometry, meatMaterial (GLSL),
                       props (knife, skewer, plate), fx (embers, smoke, background), glsl (noise)
src/i18n/              index (languages, slugs, loaders), de.ts (source) + en/pt/fr/it (typed as Dict)
src/content/           facts (prices, hours, phone, booking URLs…), meats, alts (photo descriptions ×5), articles loader
content/               articles.<lang>.json, menu.json (+ i18n/menu.<lang>.json), legal.json, reviews.json, raw captures
src/components/        header, menu, intro, language transition, booking sheet, reservation (+ table illustration),
                       home/ sections, page hero, menu card…
src/pages/             one file per page
scripts/               extract_articles.py, build_articles_de.py, prepare_images.py, check-i18n.mjs,
                       postbuild-routes.mjs, build-artifact.mjs
```
