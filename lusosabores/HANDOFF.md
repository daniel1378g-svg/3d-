# Luso Sabores · redesign proposal

**Preview:** https://claude.ai/artifact/9suNjTiJerzc19itZgGQZv (private until you share it from the page's Share menu)

This is a proposal. The live site at luso-sabores.ch was not touched. The logo, photos and texts belong to Luso Sabores, so the new site goes live only with the owner's OK. Until then every page shows the permanent band "Proposta de design · não é o site oficial".

In the preview, pages open from the end of the address: `#fr`, `#fr-menu`, `#de-speisekarte`, `#pt-privacidade`, `#en-gallery`… With nothing, it opens in the browser's language (French by default).

## Run and publish

```bash
npm install
npm run dev              # http://127.0.0.1:5180/fr/
npm run build            # static site in dist/ (30 pages, sitemap, robots, _redirects)
npm run build:artifact   # the claude.ai preview, in artifact/
npm run count            # checks content/menu.json against the saved live menu page
npm run images           # regenerates public/ from media/
```

- Stack: React 19, Vite 6, TypeScript, Tailwind 4, Motion 12, GSAP ScrollTrigger, three.js, lottie-web, Radix (dialog, tabs). Built on the same architecture as the Le Portugais proposal in this repo.
- `VITE_PROPOSAL=0` removes the proposal band. Use it only once the owner approves.
- `dist/` works on any static host. Every address has its own HTML with title, description, canonical, `hreflang` and the Restaurant JSON-LD. `_redirects` uses the Netlify / Cloudflare Pages format.

## Screenshots

`docs/screenshots/1440/` and `docs/screenshots/390/`: every home section (the hero, the story at four moments, the four from the grill at three), the menu page (hero and four groups), the language menu, the booking drawer and (390) the mobile menu. `docs/colours-old-site-vs-tokens.png`: the old site next to the swatches.

## Colours

Measured on 29 Oct 2026 at 1440 px on `/`, `/menu`, `/services` and `/contact` with the brief's console script, and in the logo (`LOGO-LUSO-SABORES.png`) with the brief's Python script.

**Live site, by role:** header background `#F5EFEF` · nav links `#931A25` · header phone `#433C3C` · main button ("Découvrir notre menu") `#E97171` with white text · "Laissez-nous un avis" button `#FFCB8E` with black text · headings `#931A25` · body text `#433C3C` · light text on photos `#FFFBE8` · tiles and bands `#931A25` · footer bar `#E97171`, footer phones `#931A25`. Other colours seen: `#464E4C`, `#999999`, `#DDDDDD` (borders), `#003AFA`/`#0095F6` (the cookie banner and the Instagram widget, not the site's own).

**Logo:** `#310B0A` (outline), `#FCCD82` (apricot), `#A1001F` (red), `#FFF8B8` (pale yellow), `#968338` (olive), `#A20920` (red).

| Token | Value | Taken from |
|---|---|---|
| `--marca` | `#931A25` | the site's nav links, headings and bands (the logo's red `#A1001F` agrees) |
| `--marca-escura` | `#310B0A` | the logo's outline: the site has no dark band |
| `--destaque` | `#FFCB8E` | the site's review button (the logo's `#FCCD82`) |
| `--acento` | `#E36C6C` | the site's main button `#E97171`, **darkened for contrast** (see below) |
| `--acento-escuro` | `#6B2B2C` | `--acento` darkened in OKLCH (L 0.38) |
| `--fundo` | `#F5EFEF` | the site's header and section background |
| `--branco` | `#FFFBE8` | the site's light text colour |
| `--tinta` | `#433C3C` | the site's body text |
| `--suave` | `#F6C2BF` | a light tint of `--marca` (OKLCH L 0.86) |
| `--linha` | `#6E6767` | a mid tone of `--tinta` (OKLCH L 0.52) |

No hue was added: green and olive from the logo are not used, since the site doesn't use them.

**Change for contrast:** `--acento` `#E97171` → `#E36C6C` (OKLCH lightness 0.690 → 0.674), so `--branco` display type on it reaches 3:1 (it was 2.86:1). Body text on `--acento` sections uses `--marca-escura`.

**Contrast (WCAG 2.x):**

| Pair | Ratio | Use |
|---|---|---|
| `--branco` on `--marca-escura` | 17.09:1 | any text |
| `--branco` on `--marca` | 8.37:1 | any text |
| `--destaque` on `--marca` | 5.87:1 | any text |
| `--suave` on `--marca` | 5.54:1 | any text |
| `--branco` on `--acento` | 3.05:1 | display ≥ 24 px only ("LE MENU", "SERVICES") |
| `--acento-escuro` on `--destaque` | 7.07:1 | any text |
| `--destaque` on `--marca-escura` | 11.99:1 | any text |
| `--acento` on `--fundo` | 2.79:1 | **never** |
| `--linha` on `--fundo` | 4.86:1 | any text |
| `--destaque` on `--acento` | 2.14:1 | **never** (`--branco` or `--marca-escura` there) |
| `--marca-escura` on `--acento` | 5.60:1 | any text (body text on the acento sections) |
| `--tinta` on `--fundo` | 9.47:1 | any text |
| `--tinta` on `--destaque` | 7.27:1 | any text (buttons) |
| `--marca` on `--fundo` | 7.65:1 | any text |
| `--branco` on `--acento-escuro` | 10.07:1 | any text |

## Time log (clock from the file timestamps)

| Phase | Clock | What happened |
|---|---|---|
| 1. Content | 17:17–17:28 | Live pages rendered in Chromium; texts, links, 39 image files and the colours extracted; photos looked at; `content/menu.json` |
| 2. System | 17:24–17:37 | Tokens measured and computed (done during phase 1), HOY! studied through its artifact and the Le Portugais code built to that bar, i18n, verbatim texts and privacy statement, illustrations, Lottie icons |
| 3–6. Pages, languages, motion, interaction | 17:37–17:58 | Built together, since the forked architecture already carries the five languages, the welcome slide and the scroll scenes: hero and story, the grill scene, all home sections, the five other pages, the ember shader, the plate, the week wheel, the 48-hour planner |
| First preview | ~17:59 | Published |
| 7. Checks | 17:59–18:10 | Language switch, intro, drawer, search, every page in two widths, reduced motion, forced WebGL, Lighthouse, fixes, screenshots |
| Hand-off and final deploy | 18:10–18:25 | Width fixes at 375 px, this file, version 2 of the preview, commit |

Nothing from the cut list was dropped. The phases did not follow the brief's order: languages and motion went in with the sections.

## Checks (production build)

- **Counts** (`npm run count`): 35 tiles in the live order with the names exactly as written; 34 different names; 35 photos; 0 prices. Groups: Grelhados 10, Bacalhau 3, Pratos 14, Marisco 3, Petiscos 4, Especialidades 1.
- **Lighthouse, mobile** (Chromium without GPU, simulated throttling; ±3 between runs):

  | Page | Performance | Accessibility | Best practices | SEO |
  |---|---|---|---|---|
  | /fr/ | 85 | 100 | 100 | 100 |
  | /en/menu | 81 | 100 | 100 | 100 |
  | /it/servizi | 90 | 99 | 100 | 100 |
  | /de/kontakt | 96 | 99 | 100 | 100 |
  | /pt/galeria | 77 | 100 | 100 | 100 |

  What holds the menu and gallery pages under 85: the pages are drawn in the browser, so the large hero photo (menu) and the first photos (gallery) wait for the main script (148 KB compressed: React, Motion and the five languages' texts). The next step would be to pre-render each page's HTML at build time. The embers, three.js, GSAP and Lottie load after the first paint.
- Widths 375, 390, 768, 1280, 1440 and 1920: no horizontal scroll, measured while scrolling every page type (home, menu, services, gallery, contact, privacy) in several languages. At 375 px no heading line is clipped by its reveal mask, including RESERVIEREN, SPEISEKARTE, VISITAR-NOS and PRIVATIZZAZIONE.
- Keyboard: the first Tab reaches "Aller au contenu"; the language menu opens with Enter, moves with ↑ ↓ and closes with Esc, returning focus; the drawer, the lightbox and the mobile menu return focus; the stepper takes ← →; the planner calendar takes the arrow keys; the week wheel's days are buttons in reading order with ← →; the plate takes ← →; the menu search and pills, the gallery and the Itinéraire tabs work by keyboard.
- Reduced motion: no intro, no pinning (0 pin spacers), the still embers, the story as captions beside the still, the four dishes as four cards, fades for the welcome slide.
- No console errors on any page, in both widths, with reduced motion, and with WebGL forced (`?gl=1`).

## Decisions I made

- **Menu groups** (the live menu has none): Grelhados, Bacalhau, Pratos, Marisco, Petiscos and Especialidades, as in the brief; Portuguese label, the visitor's language below.
- **The 48-hour rule:** order two days before the visit (calendar days, Gland time), by phone, during that day's opening hours. The planner shows those hours. Days less than two days away are off; "Soir" is off on Sunday and Monday. The planner offers every dish, since the site doesn't say which are specialities; it opens on "Especialidades".
- **Privatisation threshold:** 15 guests and more show the "Privatisation pour évènements" lines (`PRIVATE_FROM` in `src/components/PartySize.tsx`).
- **Reviews:** the three quotes stay in French, as written; outside French a tap flips the card to a translation marked "Translation". No other reviews, ratings or counts; no review markup in the JSON-LD.
- **Yelp:** the link without the Yelp API tracking parameters: `https://de.yelp.ch/biz/restaurant-lusosabores-gland`.
- **goo.gl:** tested on 29 Oct 2026, it still opens "Restaurant LUSOSabores" on Google Maps, so the "Plan" link keeps it. It should be swapped for the full Google Maps link before Google retires short links.
- **ZIP.ch credit:** "Site internet par ZIP.ch" is left out of the footer. The privacy statement's own last line, "Copyright © 2023 - ZIP.ch SA", is part of the statement and stays.
- **The hero headline** is the menu page's own line, "Le Portugal dans vos assiettes !", split in two; the site's H1 sits above it as the page's `h1`.
- **The statement band** lights its words from `#A26650` to `--acento-escuro` instead of from 25 % opacity: 25 % failed contrast (1.49:1); `#A26650` is the palest tone that keeps 3:1.
- **The week wheel** has "Tout / Midi / Soir" (the brief's Midi / Soir toggle, plus a way back to both).
- **Plat du jour photo:** the live block's photo is an Unsplash stock photo, so the arch holds an illustrated francesinha and a labelled slot "Photo : Plat du jour".
- **Time format:** 9h00 in French and Portuguese, 9:00 in English, Italian and German.
- **Type scale minimums:** mega 50 px and xxl 42 px instead of 64 and 52 px (the maximums are unchanged), so the longest single words in German, Italian and Portuguese fit at 375 px. The services title uses a 36 px minimum for "PRIVATIZZAZIONE".
- **Itinéraire:** each tab's button reads "Ouvrir l'itinéraire"; the app is named by the tab (and spoken to screen readers).
- **Translations** are careful machine translations (pt-PT, de-CH with "ss"). They need a native-speaker check.
- **Tools:** `/design-taste-frontend` is not installed in this session. 21st.dev's server was not used; the components follow the shadcn style on Radix. The animated icons are hand-written Lottie JSON played by lottie-web: the dotLottie player needs WebAssembly, which the claude.ai preview blocks.

## Photos

- **36 restaurant photos used** (every one at least in the gallery): the 35 menu tiles and the "Privatisation pour évènements" photo. Served as WebP (1200 px and 640 px). Each has alt text in five languages, written after looking at it.
- **Not used (not the restaurant's):** 7 Unsplash stock photos the old site uses as backgrounds (the home hero, the "Plat du jour" photo, the MENU / SERVICES / CONTACT tiles, "Photo ouverture 7/7", the contact page background) and `27303.jpg`, a red maze pattern behind the contact block. `transparent-1069w.png` ignored. The Instagram feed on the home page (6 posts) is a live widget; its photos were not copied, the Instagram link stays.
- **Labels that don't match the photo:**
  - Tile 15 "Costoletas porco c/cebolada" shows an octopus and white-bean stew (file `feijao_polvo.jpg`). Tile 10 is the real Costoletas photo.
  - Tile 13 "Especialidades" shows one plate: a breaded cut with a fried egg, chips and grelos.
  - Tile 34 "Secretos de porco preto c/arroz feijão" has an empty alt on the live site.
- **Cut-outs** (rembg, from the restaurant's own photos only): picanha, frango (Frango churrasco, the butterflied chicken), frango-prato (Frango de churrasco), bacalhau (Bacalhau a lagareiro), salmão (Salmão grelhado). Gambas, Grelhada mista and Francesinha didn't cut cleanly and were dropped.
- The originals are in `media/originals/`; the logo exists only as a 600 × 420 PNG.

## What I found on the live site

- **Sitemap:** `/`, `/menu`, `/services`, `/contact`. Not in it: `/home` (the header logo's link, same content as `/`) and `/privacy` (the footer's "Protection des données").
- **Texts as read** match the brief. The live "Qui sommes-nous ?" paragraphs, the plat du jour lines, the menu intro, the services texts, the hours and the "Pour réserver…" line are verbatim. The privacy statement is copied in full; its cookie section is **not empty**: it lists the old platform's cookies (Duda, Termly, Elfsight, Snowplow), copied as they are. Its "Ouvrir les préférences de cookies" button belongs to the old cookie banner and is left out.
- The new site sets no cookies (it remembers the language and the intro in the browser's own storage) and loads the map, Facebook and Instagram only on tap.
- Nothing on the live site was unreadable.
- The live pages embed a Mapbox access token in their page code (the map widget of the old builder). GitHub's secret scanning classes it as a Mapbox secret token, so the saved HTML copies of the live pages were left out of the repo (`content/raw/` keeps the texts, links, images list and colours as `.txt` and `.json`, with the token removed). The owner may want to ask ZIP.ch whether that token should be rotated.

## Open questions for the owner

- **Hours:** still Monday and Sunday 9h00–14h00; Tuesday to Saturday 9h00–14h00 and 17h00–22h00? Closures on public holidays?
- **Phones:** is the 022 the booking number and the 079 a second line?
- **E-mail and form:** is there an e-mail address? Is a contact form wanted? (There is none because the live site gives no e-mail; one can be added once there is an address.)
- **Plat du jour:** price? 2 or 3 plates, lunch only or dinner too? Could they be published each week?
- **Specialities:** which dishes are prepared on request 48 hours ahead, and which are always available?
- **Menu:** prices and descriptions? Are the groups right? Is "Costoletas" two photos of one dish (tile 15 shows octopus and beans)? Are "Frango churrasco" and "Frango de churrasco" the same dish?
- **Spelling:** keep the live spelling ("Bacalhau a braz", "Costoletas", "Chourição", "Rissois", "arroz feijão", "diners d'entreprise") or standard Portuguese and French?
- **Events:** from how many guests does privatisation make sense (the site uses 15)? Which catering formulas exist?
- **Reviews:** keep the three, or add newer ones with the authors' consent?
- **Colours:** do the measured colours look right, including `#E97171` → `#E36C6C`?
- **Photos:** newer or larger photos? Photos of the room, the terrace or the team? May dishes be cut out?
- **Logo:** is there a vector (SVG) version?
- **Privacy:** who reviews the statement for the new site? Its cookie table describes the old platform.
- **Proofreading:** who checks the English, Portuguese, Italian and German texts?
- **Credit:** keep a "Site internet par ZIP.ch" credit, or credit nobody?
- **Old addresses:** redirect them as below?

## Redirects (301, for when the new site replaces the old one)

Already in `dist/_redirects`, with and without the trailing slash.

| Old address | New address |
|---|---|
| / | /fr/ (or the saved / browser language) |
| /home | /fr/ |
| /menu | /fr/menu |
| /services | /fr/services |
| /contact | /fr/contact |
| /privacy | /fr/protection-des-donnees |

## Translation review

French is the live site's. English, Portuguese, Italian and German, including the privacy statement (where the French version stays the reference and the translated pages say so), were written for this proposal and need a native-speaker check before launch.
