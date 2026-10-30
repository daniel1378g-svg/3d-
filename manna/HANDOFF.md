# Manna Açaí · hand-off

An **unofficial design proposal** for Manna Açaí (Açaíteria Manna), Archhöfe City Mall, Archplatz 2, 8400 Winterthur.
The live site (manna-acai.ch) was not touched. Every page carries the fixed band "Proposta de design · não é o site
oficial" plus the notice in the page's language (band on wide screens, menu, footer, imprint). The demo is `noindex`,
has no sitemap and emits no structured data until an authorised launch (`VITE_PROPOSAL=0`).

**Private preview:** https://claude.ai/artifact/RtnChtMMvsAmFmeraopZdQ (claude.ai artifact, only visible to its owner
until shared; routes there use hashes such as `#de-angebot`).

## What is built

**Home**, in order:

- first-visit intro (≤ 2 s, skippable, once per session, none with reduced motion)
- açaí hero
- facts band
- product explorer
- the cup story
- Bubble Waffeln & Frappés
- about Manna
- gallery
- visit (location and contact)
- FAQ
- footer

On phones a small "So findest du uns" pill appears once the hero is passed and hides while the visit section is on
screen.

**Pages** in all five languages (de-CH default, en, pt-BR, fr-CH, it-CH), each with its own URL:

| Page | URLs |
|---|---|
| The whole range | `/de/angebot`, `/en/our-range`, `/pt/nossos-produtos`, `/fr/notre-offre`, `/it/la-nostra-offerta` |
| Imprint & privacy | `/de/impressum`, `/en/imprint`, `/pt/impressum`, `/fr/mentions-legales`, `/it/note-legali` |

`/` opens the visitor's saved language, else the browser's if it is one of the five, else German. Home sections have stable anchors (`#entdecken`, `#becher`, `#waffeln`, `#ueber`, `#galerie`, `#besuch`, `#faq`).

### Signature interactions

- **Açaí hero** (`src/components/home/acaiField.ts`, `Hero.tsx`):
  - **Rendering:** one fragment shader on one full-screen triangle, plain WebGL 2. The surface is a height field of slowly flowing, domain-warped noise, lit like a creamy sorbet. Colours run deep açaí → plum → berry, with thin lilac cream streaks.
  - **Interaction:**
    - The pointer stirs a swirl into it, trailing like a spoon through something thick.
    - A click or tap sends a soft ripple ring.
    - With nobody pointing, the swirl wanders.
    - Four of Manna's own product photos float above with pointer parallax; tapping one makes it hop. On phones a single cup sits beside the title, so it never covers text whatever the screen height, and the hero grows rather than pushing the copy under the header.
  - **Cost control:**
    - Rendered at 55 % of CSS pixels (40 % on phones / ≤ 4 cores), lowered further when frames run long.
    - Stops off screen and in hidden tabs.
    - Visible pause button.
  - **Fallbacks:** reduced motion shows one still frame and the photos stay put; without WebGL, a painted gradient. Title and buttons are HTML and never wait.
- **Intro** (`Intro.tsx`): a lilac swirl draws itself around the intact logo on a cream disc, berries settle, and a round "berry" window opens from the centre onto the page.
- **Language switch** (`LanguageTransition.tsx`):
  - **Sequence:** three berries (lilac, berry, plum) burst out of the language button until the plum one covers the screen. The language changes beneath it. The logo, intact on a cream disc, and "Willkommen / Bem-vindos / …" appear. The berry then shrinks away to the opposite corner.
  - **Timing:** about 0.8 s (0.38 s cover, 0.46 s reveal; 0.90–0.94 s measured end to end, from the click until the overlay is gone, in headless Chromium with software rendering); the dictionaries are fetched when the language menu opens.
  - **What it keeps:** route, section position and the chosen product.
  - **Repeated switches:** a switch requested during another replaces its target instead of stacking.
- **Cup story** (`CupStory.tsx`, `CupArt.tsx`):
  - **Mode:** *illustrated discovery*.
  - **What it shows:** a clear cup in three-quarter view fills in four steps (açaí, fruit, extras, your cup). It advances as the section scrolls in, with no pinning, and can be stepped through with buttons; the step list is the text equivalent.
  - **Labelling:** "Illustration – kein Foto und keine Bestellung". It never offers a combination, price or order.
  - **Clip:** Manna's own footage of a cup being layered at the counter runs beside it (muted, plays only while visible, pause button).
- **Product explorer** (`Explorer.tsx`): four category tabs (arrow keys), the products of each, and a stage that crossfades through the product's own photos. Products without a photo get a typographic card that says so.
- **Gallery** (`Gallery.tsx`): 36 public images in five kinds with filter chips; "all" starts with 12 and a "show all" button (focus moves to the first new image); lightbox with arrow keys, Escape and focus return.

## Sources (checked 30.10.2026)

| What | Where | Evidence in repo |
|---|---|---|
| Home text, gallery captions, promo | https://manna-acai.ch/ (rendered in Chromium, desktop and 390 px) | `content/raw/home.txt` |
| Product range (11 entries) | https://manna-acai.ch/?page_id=108 | `content/raw/range.txt` → `src/content/products.ts` |
| About, açaí berry | https://manna-acai.ch/?page_id=150 | `content/raw/about.txt` |
| Location, contact, imprint, WhatsApp QR | https://manna-acai.ch/?page_id=135 | `content/raw/contact.txt` |
| Same phone and e-mail; links to `instagram.com/acaiteriamanna` and `facebook.com/acaiteriamanna` | https://archhoefe.ch/geschaefte/manna-acaiteria/ | `content/raw/archhoefe-manna.html` |
| WhatsApp link | the contact page's QR decodes to `https://wa.me/message/JHYNT2V7GVYUI1`; WhatsApp answers "Link no longer valid" | `src/content/facts.ts` |
| Images and clips (52) | all `<img>` and media on the four pages, full-size originals | `content/assets.json` |

Research was read-only: no message, order or contact was sent. Instagram and Facebook show login walls to scripts,
so the profiles' content was not read. Their addresses are confirmed by two independent pages: Manna's own site
and the mall's directory.

## Asset inventory (`content/assets.json`)

Every original has an id, its source URL, the site's own caption, a category, its use here and whether it is public.

| Category | Count | Use |
|---|---|---|
| product (current range) | 17 | hero, explorer, cup story, gallery |
| product-historical (homepage gallery items the range page doesn't list) | 8 | gallery and the "Aus der Galerie" block on the range page, marked "not confirmed as current" |
| shop / location (kiosk, mall) | 3 | visit section, gallery |
| promo (Bubble Waffle, Mango Kokos Bowl) and brand (header graphic) | 3 | waffles showcase, gallery, range page header |
| supplier and stock (studio cups, granola bag, açaí berries) | 5 | about (labelled) and gallery |
| logo (transparent "Manna açaiteria" artwork) | 1 | header, intro, language switch, cup illustration, footer, favicons; never distorted |
| clips (sugarcane press, cup being layered) | 2 | about, cup story |
| **not public** | 13 | see below |

Not shown in the demo, but kept and listed:

- 9 photos of identifiable people, several of them children. Republishing them needs the owners' confirmation that consent covers it.
- the second logo file and the small logo (duplicates)
- a stock PNG from a clip-art site
- the WhatsApp QR (its link is dead)

Images are WebP at 480/960/1600 px with blurred placeholders and explicit sizes; clips are 640 px MP4 and WebM with
posters. The cup clip is trimmed to its first 14 s. The 236 MB of originals are not in git: `npm run fetch` downloads
them again.

## Decisions

- **No prices, sizes, topping lists, hours, delivery, ordering, reservations or rating.** None of these is published by Manna. The range page says prices and sizes are in the shop, and the visit section says no hours are published and offers the phone.
- **Opening hours:** the Archhöfe page links only to the mall's *general* hours (Mon–Fri 09:00–20:00, Sat 09:00–18:00). Those are not shown as Manna's.
- **Cup:** illustrated discovery mode, because no verified options exist. The verified-configurator mode would need sizes, options, limits and prices from the owners.
- **Wording:**
  - Close to Manna's own text.
  - The health and superlative claims are dropped: "Das beste Açaí in der Schweiz", "gesunde Extras", "gesunde Erfrischung", "Superbeere", "als erste in die Schweiz", "Nur im Manna".
  - "Dein Açaí. Deine Art." is proposed campaign copy.
  - The waffle slogan "Ein Biss und du verliebst dich!" is Manna's own and is quoted.
  - The waffle examples (fruit, ice cream, chocolate toppings) are quoted as examples, not as options.
- **Names:**
  - Product names stay as published in every language: "Açaí im Becher", "Suco de pulpa de fruta", "Mixsaft", …
  - One obvious typo is corrected: the range page's "Caldo do Cana" is shown as "Caldo de Cana", with the published spelling noted on the card. Search finds both.
- **Contact:**
  - `tel:+41763107195` and a working `mailto:info@manna-acai.ch`; the live page's e-mail link uses the broken href "Email: info@manna-acai.ch".
  - Directions use a Google Maps search for the shop's address.
- **Imprint:**
  - Shown exactly as Manna publishes it: Manna, Inhaberin da Cunha Buchheim, Buechwiesenstrasse 4, 8544 Attikon, CHE-331.826.888, Filiale Archplatz 2, 8400 Winterthur.
  - It is labelled as Manna's, with the business address distinguished from the shop.
  - The demo operator is not supplied, and nothing of WordPress is carried over.
- **Reviews:** none were supplied, so there is no carousel and no rating.
- **Stack:** the Vite + React 19 + TypeScript + Tailwind 4 setup of the previous proposals, Motion 12, GSAP 3 (ScrollTrigger), Lenis. No three.js (one shader is enough), no Lottie.
- **Fonts:** Bricolage Grotesque (display and body) and Fraunces italic (accent), from Google Fonts. Self-host them for a launch.
- **Translations** (`src/i18n/en|pt|fr|it.ts`, each marked for native review):
  - Product names stay in Portuguese or as published. Where the German uses «Açaí im Becher» as a description, it is translated ("açaí in a cup", "açaí no copo", …); where it is quoted as a name, it stays, with a short gloss.
  - Proposed claim: "Your açaí. Your way." / "Seu açaí. Do seu jeito." / "Ton açaí. À ta façon." / "Il tuo açaí. A modo tuo."
  - The German slogan on the waffle artwork is described by meaning in the image text of the other languages.
  - Portuguese uses "cardápio" for the range and "Informações legais" for the imprint; French and Italian use «…» and Swiss conventions (no-break spaces in French).

## Open questions for the owners

1. Opening hours of the shop (and whether they differ from the mall's).
2. Prices, cup sizes, fruit and extras (with included vs. extra), waffle fillings – for a verified configurator.
3. Consent for the 9 photos with people, especially the children.
4. Which homepage-gallery items (Pão de Queijo, Coxinha, Brigadeiro de Açaí, cakes, Açaí Mousse, Granola) are still sold.
5. A working WhatsApp link, if WhatsApp should be offered.
6. A vector or high-resolution logo master; the transparent PNG is 3000 × 2601.
7. Whether "Caldo de Cana" may be spelled that way (the range page says "Caldo do Cana").
8. Native review of the four translations.

## Deployment readiness

The build is a static site: `dist/` holds 15 prerendered HTML pages (one per language and page), hashed assets,
images and clips, and needs no server code. Any static host works if it serves `/<lang>/<slug>/index.html` for
`/<lang>/<slug>` and falls back to `/de/` for `/`.

It is **not ready to go live as Manna's site** until:

1. The owners authorise it. Then build with `VITE_PROPOSAL=0`, which removes the band and the proposal notices, allows
   indexing, writes the sitemap and turns on the prepared structured data.
2. The open questions above are answered, at least the opening hours and the photo consent.
3. The imprint and privacy text are reviewed by the owners: the privacy note describes this demo (no cookies, no
   analytics, no forms; Google Fonts; language and intro choice kept in the browser).
4. The fonts are self-hosted, so no request goes to Google.
5. Redirects are set from the old WordPress addresses (`/?page_id=108` → `/de/angebot`, `/?page_id=135` →
   `/de/impressum` and the visit section, `/?page_id=150` → `/de/#ueber`).
6. The translations have had a native review.

## Checks (30.10.2026)

All checks ran against the production build (`npm run preview`) in this container's headless Chromium. It has no GPU, so WebGL runs on SwiftShader (software).

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npm test`: product data and categories, no price/size/topping fields, search (accents, "caldo do cana"), public assets, contact links, translation keys and placeholders, routes | 7 / 7 pass |
| `npm run check`: translations against German, alt text for every public image | 0 errors |
| `npm run qa` (`scripts/browser-check.cjs`) | 45 / 45 pass |

What `npm run qa` covers:

- **Pages:** all 15 pages at 360 and 390 px with touch: no horizontal overflow, one `h1`, correct `lang`, `noindex`, the proposal band, every image loads, no console errors, no 4xx. Home (fr) and the range (pt) at 768, 1024 and 1440 px: no overflow, no errors.
- **Intro:** gone 1.7–1.8 s after it appears, Escape skips it in about 0.5 s, once per session, no scroll lock left behind.
- **Reduced motion:** no intro, no pause control, a still hero, the cup story shows the finished cup, the clips don't autoplay.
- **Hero:** the pause button stops the surface; the mouse wheel and touch (`touch-action: pan-y`) still scroll the page; without WebGL the painted gradient, title and actions appear with no errors.
- **Language switch:**
  - DE → PT keeps the mapped URL, the Bubble Waffeln tab with Frappés selected, the section position (114 → 114 px) and focus (back on the language button).
  - It takes 0.92 s from the click until the overlay is gone.
  - EN → FR → IT clicked in quick succession settles on Italian with the overlay released.
  - On the range page the slug maps (`/it/la-nostra-offerta` → `/de/angebot`).
- **Range page:** 11 products and no prices. Search ignores accents and case ("cupuacu"), finds the published spelling "Caldo do Cana", and the empty state names the query. A category chip scrolls to its section.
- **Cup story:** step buttons, next, `aria-current`; scrolling does not override a step chosen by hand; no price, cart or order.
- **Keyboard:** the first Tab reaches the skip link; arrow keys move selection and focus in the explorer tabs; gallery "show all", filter and lightbox (arrows, Escape, focus returned).
- **Links:** tel, mailto, Instagram and Facebook present; no WhatsApp; no order or reservation control; directions go to the shop's address; external links use `noopener`.
- **Clips:** load, play muted while on screen, pause off screen.
- **axe-core 4.10, WCAG 2.2 AA**, after scrolling each page through: `/de/`, `/en/our-range` and `/it/note-legali` at 1280 px, `/pt/`, `/fr/notre-offre` and `/de/impressum` at 390 px: 0 violations. The first run found lilac kickers on plum at 4.19 : 1; they are now pale lilac at about 8 : 1.

Performance (`npm run perf`, same browser, local server). Software WebGL makes the frame rates pessimistic for real GPUs; the local server makes load times optimistic.

| | 1440 × 900 | 390 × 844, 3× DPR, CPU throttled 4× |
|---|---|---|
| Frame rate with the hero on screen | 41–42 fps | 51–55 fps |
| Shader canvas | 369 × 224 (adaptive scaling stepped down from 55 % under software rendering) | 156 × 327 (40 %) |
| Frame rate scrolled away (shader stopped) | 60.5 fps | 60.5 fps |
| LCP, before any scroll | 650–860 ms | 600–660 ms |
| CLS | 0.009–0.016 | 0.017–0.018 |
| Transfer for the first view | 757 KB: JS 199, images 268, fonts 276 | 684 KB: JS 199, images 196, fonts 276 |

The main script is 594 KB (197 KB gzip): React, Motion, GSAP, Lenis and the app; the pages and the four other dictionaries are split off. The fonts are the largest part of the first view.

**Not run:**

- Real phones and tablets, Safari/WebKit and Firefox; only Chromium is installed here.
- A real GPU.
- Lighthouse, a screen-reader pass (VoiceOver, NVDA) and network throttling.
- A native-speaker review of the four translations.

## Skills and references used

- **`animate`:** the decision order for every motion. Concretely: ease-out for entrances (`cubic-bezier(0.23, 1, 0.32, 1)`), the language berries now ease-out so the click answers at once, springs with bounce ≤ 0.3 for the cup fruit, reduced-motion variants shipped with each animation.
- **`animation-performance`, `gsap-performance`:** transform and opacity only; the hero's rAF loop writes `style.transform` directly with no React state per frame; one scrubbed ScrollTrigger, no pinning; loops stop off screen.
- **`threejs-shaders`:** its GLSL conventions (uniforms, fbm, normals from finite differences) applied to a plain WebGL 2 shader.
- **Read but not applicable:** `threejs-fundamentals`, `threejs-animation`, `threejs-interaction`. There is no 3D scene, so three.js is not used.
- **`deep-research`:** not used. The sources are few and direct (four Manna pages, the Archhöfe directory, the WhatsApp link), so they were checked one by one.
- **`figma-use`, `figma-use-motion`, `figma-use-slides`:** not used. The Figma connector needs authorisation in this session and no Figma file was supplied.
- **HOY reference:** the video supplied earlier in this session (frames reviewed for type scale, colour blocking, pills and floating products). Nothing of it is reproduced, and it is not in the repo.
