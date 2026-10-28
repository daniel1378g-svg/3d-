# The Choucas Connection · redesign proposal

**Preview:** https://claude.ai/artifact/8VkQXJfNsNHiUkpCFM53pV
(shared as "anyone with the link"; every republish reaches open viewers at once)

This is a proposal. The live site at choucas.ch was not touched. The logo, photos and texts belong to The Choucas Connection, so the new site goes live only with the owner's OK. Until then every page carries the fixed band "Proposta de design · não é o site oficial" (the repository's rule in CLAUDE.md). `VITE_PROPOSAL=0` removes it.

## Round 2: editorial redesign, fluid hero, sharper photos

Two briefs were combined: "more fluid, more alive, sharper photos" and "premium Alpine Mediterranean redesign". Where they pulled in different directions, the second one won: one clear hero instead of a crowded one, restrained effects, nothing overlapping.

**Look.** Warm ivory and cream sections alternate with charcoal and espresso. The logo orange is the accent and warm gold carries the calls to action. Each place keeps one quiet colour of its own: oven red, ember and sand, sky blue. Headings are lighter (semibold instead of extrabold), hairlines are cream, and corners and shadows are restrained. The proposal band is now neutral grey in a monospace face, so it reads as a notice and not as part of the brand.

**Header.**
- Desktop: logo, then Pizzeria · Steakhouse · Choucalino® · Speisekarte · Anreise, then the language pill and a gold "Tisch reservieren" button. The language pill and its dropdown are as before.
- Phone and tablet: logo, language pill and "Menü". The overlay puts its links low on the screen, within reach of a thumb.
- The header is 64 px on phones and shrinks on scroll. A thin gold line under it shows how far down the page you are.

**Hero (home).**
- An editorial split. The text has its own column: the location, "Pizza | Parrilla" (letters lift slightly near a mouse), the three places in one line, "Tisch reservieren", "Restaurants entdecken" (scrolls to the places), and links to the three places.
- Beside the text, the signature scene sits in a framed panel. On phones the panel follows the text.
- The floating circular dish photos are gone.

**Hero scene (`src/components/hero/engine.ts`).** Rebuilt as a multi-pass WebGL scene in one context:
- **Fluid simulation (192 px).** Advection, vorticity confinement and 14 pressure iterations. The pointer and touch inject velocity along the drag, a tap sends a radial burst, and small idle drafts keep the air moving. An "offset" field (the air's displacement, carried by the flow and relaxing back to rest) pushes the flames, smoke, sparks and flour.
- **Oven side.** A brick facade with an arch of radial voussoirs, a hearth slab, two logs with ember cracks, and domain-warped flames that roll along the dome. The flame colour follows a blackbody-style ramp; white appears only in the tiny cores. Thin smoke rises above the mouth and flour dust catches the firelight. The oven scales with the panel's proportions instead of being cropped.
- **Grill side.**
  - Rounded coals in perspective, each with its own slowly pulsing heat. Cool coals are charcoal dusted with grey ash, and heat glows up through the gaps.
  - The grate is round bars with ember light from below and warm glints from above.
  - Behind them, a velvet wall (the old Kino Rex) and the chasing marquee bulbs.
  - Sparks are GPU particles with drift, short motion streaks and fade-out.
- **Post-processing.** Bloom kept low, heat haze above both fires and along the seam, a vignette, film grain, ACES tone mapping and sRGB output.
- **Divider.**
  - Dragging it makes the handle (the logo's hexagon, now cropped cleanly) lean and spring back, and letting go glides on a little.
  - The keyboard works as before: ← → move it, Home/End jump.
- **Performance and fallbacks.**
  - The scene renders at 60 % of the screen resolution, with the DPR cap at 1.5.
  - It steps down on slow devices: lower resolution, then no bloom, then a still frame.
  - It pauses off screen and in hidden tabs. The pause button and reduced motion show a still frame.
  - Software GL keeps the CSS fallback.
- `dev/hero-test.html` renders the scene alone, on software GL too.

**Home below the hero.**
- The three places are now three different sections:
  - Pizzeria on ivory.
  - Oasis on espresso, with the Gaucho story link.
  - Choucalino® on light sky blue with round shapes, its logo, a tilted second photo and four verified family highlights.
- Each section has its live hours, "Zur …", the venue's menu (where there is one) and "Reservieren".
- After the places come Awards (a compact row), the gallery, a reservation and take-away band on cream, and contact.
- The Gaucho and Kinder-Grill teasers were folded into the Oasis and Choucalino sections.

**Venue pages.** Same editorial hero as the home page: ivory, a short eyebrow, a big title, the lead, "Tisch reservieren" with the live badge, and a parallax photo.

**Photos.**
- Every photo now goes through `<SmartImage>`. A 24 px blurred placeholder holds the space, the browser picks from an AVIF/WebP srcset, and once the photo is decoded and on screen it slides in: a clip-path wipe while it eases from 1.08 to 1. Reduced motion gets a crossfade.
- Loading starts 500 px before the screen. The browser's own lazy loading treats clipped images as hidden.
- The light-follow effect sits on the big photos.

**Interactions.**
- **Gallery carousel:** drag with inertia, a rubber band at both ends, the middle photo active and the others dimmed, and ← → between photos.
- **Lightbox:** slides in the direction of travel and follows a swipe (it springs back if the swipe is too short).
- **Speisekarte:**
  - A dish photo follows the mouse on desktop.
  - Prices flip when a dish opens.
  - Section titles are natural in each language. The PDF headings stay in `menu.json` as `printed`.
- **Logo strip:** hovering a word slows the strip and lights the word in its venue colour.
- **Page changes:** a 0.4 s wipe in the colour of the page you are going to.
- **Headings:** they rise word by word.
- **Coloured bands:** they wipe in once.
- "Bilder vom Oasis Steakhouse" opens the gallery on the Oasis tab.

### Photo sizes, before and after

| | Before | After |
|---|---|---|
| Files per photo | one WebP (≤ 1600 px) and a 480 px copy | AVIF and WebP at 480, 960 and full width (≤ 1600 px), plus a 24 px placeholder |
| Upscaling | none | none: nothing is wider than its source |
| Largest sources | 1280 px wide (dish and room shots), ParilladaWeb 1200 × 1600 | unchanged: the gallery files on choucas.ch are already the largest originals |
| Total | 3.3 MB | 6.7 MB on the site (both formats), 5.4 MB in the preview (WebP only) |

**No photo was AI-upscaled.** That step was optional. It would send the restaurant's photos to an outside service, which needs the owner's OK, and it can only invent detail, not recover it. The real fix is larger originals from the owner.

The restaurant's Flickr account (linked from choucas.ch) lists about 20 photos from 2017. They look like new shots rather than larger copies of the gallery, and Flickr rate-limited the download (HTTP 429). They are left for the owner to decide.

### Lighthouse (mobile, production build, local server)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 88 (FCP 2.0 s, LCP 3.7 s, TBT 70 ms, CLS 0.004) | 100 | 100 | 100 |
| Speisekarte | 94 (FCP 2.2 s, LCP 2.7 s, TBT 40 ms, CLS 0.003) | 100 | 100 | 100 |

What got it there:
- The home page renders only the hero and the strip at first. Everything below is its own chunk, loaded right after.
- The hero lead is visible from the first frame.
- Local fallback fonts are sized to Bricolage Grotesque (89.4 %), so text no longer re-wraps when the web fonts arrive. Layout shift on the Speisekarte went from 0.23 to 0.003.
- Lighthouse runs on software GL, so it measures the CSS fallback of the hero. On a real GPU, three.js loads after first paint.

### Checks in round 2
- No horizontal scroll at 375 px on all 7 German pages, plus pages in French, Italian, English and Portuguese.
- No console errors.
- Keyboard: the divider (← → Home), gallery tabs (← →), carousel (← →, Enter opens the lightbox, ← → inside it, Esc closes and returns focus), the booking drawer (Esc), the menu filter (← →) and dish rows (Enter), and the Menü overlay (focus moves in, Esc returns it to the button).
- Language switching from the pill (mouse and keyboard) and the footer still keeps the page, the URL, `<html lang>` and the saved choice.
- The hero scene was checked only on software GL, in `dev/hero-test.html` at desktop and phone panel sizes. **I could not look at it on a real GPU.** Frame rate on a mid-range phone is not measured.

### Dropped in round 2, and why
- **Shared-element morph** from a place's photo into its page hero. It would run under the coloured page wipe and the scroll reset, so you would barely see it, and the brief asked for restraint.
- **Flickable floating dishes in the hero:** removed, because the brief said the circles crowded the hero.
- **AI upscaling:** see above.
- **New dotLottie icons:** still not drawn. The existing icons play on hover only; the one that looped on the Choucalino page now plays on hover too.

## Run and publish

```bash
npm install
npm run dev              # http://localhost:5173/de/
npm run build            # static site in dist/: 35 pages (7 pages × 5 languages), sitemap, robots, _redirects
npm run build:artifact   # the claude.ai preview, in artifact/
npm run count            # menu sections and dishes
npm run images           # rebuilds public/images (AVIF + WebP, 3 widths, placeholders) and public/brand
```

- `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx` connects the contact form (Formspree-compatible JSON POST). Without it the form is in **test mode**: it validates name, email and message, sends nothing, and says so on screen. No form service is connected yet, because it needs the owner's receiving address.
- `dist/` works on any static host. `_redirects` uses the Netlify format.
- `dev/hero-test.html?split=0.5` renders the hero shader alone (also on software GL), for tuning.

## What is in it (round 1; see round 2 above for what changed)

**Every page (round 1, header since changed, see above):** sticky header that shrinks on scroll. The logo is on the left. On the right are the language pill (`DE ⌄`) and then the black "Menü" button. The pill opens the snow-coloured card below it, right-aligned. Each row shows the code, the native name, and a dot on the current language. Enter, Space and ↑ ↓ work, Esc closes the card and returns focus to the pill. "Menü" opens a full-screen overlay with Pizzeria · Steakhouse · Choucalino® · Speisekarte · Anreise · Bilder, plus Reservieren and Anrufen. Pages change with a 0.4 s black wipe.

**Welcome slide:** every language change slides a snow panel over the screen. The logo slides in from the left, the welcome word rises letter by letter, then the panel slides away to reveal the same page in the new language. That takes about 1.7 s, and click, tap or Esc skips it. The first visit of a session plays a 1.1 s version in the current language. With reduced motion both are fades. The footer has the same list of languages as a row.

**Home:**
1. The **Pizza | Parrilla** hero (WebGL, one shader). The oven side has flickering flames, brick courses and drifting flour dust. The grill side has embers, a grate, rising sparks and a chasing row of Kino Rex marquee bulbs.
   - The pointer fans the flames and stirs the embers, and a tap sends a burst.
   - The divider is dragged by the logo's hexagon on a snow disc. It is a slider: ← → move it, Home/End jump.
   - Each side's name links to its page.
   - A pause button stops the scene. The scene loads after first paint, pauses off screen, caps DPR at 1.5, and falls back to a CSS gradient on software GL. With reduced motion it is a still frame.
2. The logo strip. It speeds up and reverses with the scroll direction, and has a pause button.
3. The three places as 3D tilt cards with glare. Each has a live badge in Swiss time, such as "Offen · warme Küche bis 23.00" or "Geschlossen · öffnet um 11.00".
4. Gaucho Steak teaser.
5. Choucalino® Kinder-Grill teaser.
6. Awards: Swiss Gastro, TripAdvisor and "Familien Willkommen".
7. **Bilder** (`#bilder`): nine gallery tabs, a swipeable or draggable carousel with captions, a grid toggle, and a lightbox (← →, Esc, swipe).
8. Reservieren / Speisekarte / Take-Away as magnetic buttons, with the take-away line and flyer.
9. Contact and hours, with the map loading only on click, and the form.

**Pizzeria:** welcome text, Pizza Geissupür, "Kinder backen Pizza" with the leukerbad.ch link, the pizzeria part of the menu, hours and Take-Away.

**Steakhouse:** welcome text (Kino Rex, 2007) with the LaReunion logo, and the full Gaucho Steak story as a scroll scene where the words light up as you scroll (GSAP ScrollTrigger). Also Chef Parillada Argentina and Mexican BBQ Ribs, the grill part of the menu, and hours.

**Choucalino®:** the Kid's Club text, the indoor playground (with the list from page 286), the Kinder-Grill, the family service list (page 285), links to the live family, playground, press, friends and colouring-book pages, and hours.

**Speisekarte:** intro line, Alle / Pizza / Grill toggle with layout animation, sticky section tabs that follow the scroll, instant search (accent-insensitive, in the current language and German), every dish and price. Tapping a dish expands its sizes, side options or photo. Also the two featured dishes and the PDF and Yoordi links.

**Anreise:** the reservation intro, address, phone, email, booking, hours per place, map on click, contact form.

**Booking drawer:** "Reservieren" opens the restaurant's own resmio booking system (`app.resmio.com/choucas-connection/widget`, the one embedded on page 691) in an animated drawer. It loads only when the drawer opens. Focus stays in the drawer and Esc closes it. The claude.ai viewer cannot embed other sites, so in the preview the drawer shows the intro and a "new tab" link instead.

**SEO:** each page and language has its own title, meta description, canonical URL, `hreflang` links (x-default → /de/) and `<html lang>` (de-CH, fr-CH, it-CH, en, pt-PT). Each also carries `Restaurant` JSON-LD (address, phone, email, cuisine, hours, menu, reservations, Facebook and Instagram) in the static HTML. The build also writes a sitemap.

## Checks

| Check | Result |
|---|---|
| Menu | **7 sections, 32 dishes** (`npm run count`). Starters 5 · Beilagen 4 · Le pizze classiche 11 · Pasta 4 · Risotto 4 · Chef special 1 · Oasis signature 3. Filter: Pizza 28, Grill 13. |
| Photos | 40 gallery photos and 7 page photos, each with a description in 5 languages |
| 375 px | no horizontal scroll on all 7 pages (checked in German, plus pages in French, Italian, English and Portuguese) |
| Console | no errors in the production build or the preview build |
| Languages | switching from the pill (mouse and keyboard) and from the footer keeps the page, updates the URL, `<html lang>` and the saved choice. `/` picks saved language, then browser language, then German. |
| Hero shader | compiles and renders (checked in `dev/hero-test.html` with software GL). The site itself skips WebGL on software GL, so the headless screenshots show the CSS fallback. |
| Lighthouse | round 1: not run. Round 2: see above |

## Dropped against the clock, and why

- **Lottie icons:** first on the drop list. I reused six small animated icons drawn as Lottie JSON for the previous project (flame, grill, clock, phone, pin, calendar), recoloured and played with lottie-web on hover. The pizza slice, steak, slide and take-away box were not drawn, and there are no dotLottie files.
- **21st.dev / motionsites.ai:** not consulted. The tilt cards, magnetic buttons, marquee, animated tabs and text reveals are written directly with Motion. There is no shadcn/ui, only Tailwind and custom components.
- **Lighthouse:** not run. The main script is large (≈ 500 kB, 166 kB gzipped, mostly React, Motion and all five languages of text). Splitting the copy per language is the first thing to try if Performance is under 85.
- **Gallery link:** "Bilder vom Oasis Steakhouse" opened the gallery on its first tab (fixed in round 2).

## Decisions I made

- **Hours:** the home page figures per place (Pizzeria 11.00–23.00, Oasis 11.00–22.00, Choucalino® 10.00–23.00, every day). The JSON-LD says 11:00–23:00 daily. Every hours block says the times are still to be confirmed.
- **Address:** Dorfstrasse 9, 3954 Leukerbad (from the Impressum), used everywhere.
- **Prices:** written "CHF 24.50" in every language (the PDF prints "Fr. 24.50", and "CHF" only for the grill platter). Dishes with sizes show every size and price (Tataki, Spare'Ribs, Parillada, Wings).
- **Menu text:** German and French descriptions are the PDF's own, word for word. Italian, English and Portuguese are new. Where the PDF has only a French subtitle (soup, salads, sides), the German name stands alone. "Pimp my pizza: mit Rucola-Salat CHF 2.50" is a note on the pizza section.
- **Venues:** pizza, pasta and risotto are tagged pizzeria. Chef special and Oasis signature are tagged oasis. Starters and sides are tagged both. The Oasis Steakhouse Burger is in Oasis signature, and the PDF's "tipp" is kept as a badge.
- **Mexican BBQ Ribs** is on the live Speisekarte page but has no price there, and the PDF lists "Smoked Pirat Jack Spare'Ribs" instead. I show it as a featured dish without a price, with a note.
- **Verbatim copy:** I only added missing spaces ("Zuchetti, frischem"). "kreieren.Auf Anfrage!" became the text plus an "Auf Anfrage!" badge. "Lecker – da freut sich die Heidi!" uses an en dash. Typos such as "Dankeviel mals", "liebervoller" and "änderungen" are kept as written.
- **Take-Away:** the button calls the restaurant. The flyer says to order Gilji's Take-Away by QR code (Yoordi), but the site does not say how pizzas are ordered.
- **Kinder-Grill "mehr":** the home teaser goes to the Choucalino® page. That page links the live news item (id 34).
- **Gallery:** 40 of the 49 photos. Skipped: six near-duplicate award-night crowd shots (dsc01691, dsc01694, dsc01699, dsc01700, dsc01716, dsc01724) and three building-site shots (pict0007, pict0017, pict0027). "vor 30 Jahren" is empty on the live site ("Wie sah es vor 30 Jahren bei uns aus. In Bearbeitung"), so the tab shows that line.
- **Photos:** the live images are small (largest 1280 px, most 300–800 px). They are served as WebP with a small copy for thumbnails.
- **Brand colour:** the logo's orange `#EE7A00` is the house accent. A darker `#9A4A00` is used for orange text on snow (5.7:1). Beak yellow carries the calls to action, oven red the Pizzeria, ember and sand the Oasis, sky blue only the Kid's Club.
- **Logo:** on dark backgrounds it sits on a snow badge. The hero handle and favicons use the orange hexagon cut from the same PNG.
- **Map:** a Google Maps embed loads only after the click. The preview links out instead.
- **Live-site errors:** its language links point both English and Italian to page 687. The redirects below send 687 to /en/.

## Not carried over (legacy CMS features)

Umfrage, E-Card / "Choucalino® Postkarte versenden", "Seite weiterempfehlen", Newsletter, Extranet, Forum, News, Shop (Oasis Chimichurri Sauce, Best of Swiss Gastro Book), Veranstaltungen. The footer links the live Jobbörse, Rezept des Monats, Choucalino® Online-Malbuch, Presse and Freunde pages. The old sidebar teasers (Tagesmenu Pizzeria, WM 2010 StreetViewing, Tischzauberei, Hörbi's Zaubershow, "Schauen Sie unseren Film an") are left out. YouTube and Flickr are in the footer.

## Open questions for the owner

1. Which opening hours are right: the home page (Pizzeria 11–23, Oasis 11–22, Kid's Club 10–23), the venue pages (Montag–Sonntag 11.00–23.00) or the Anreise page (So–Sa 11.00–22.00)? Is there a seasonal closing?
2. Is Dorfstrasse 9 the restaurant's address, or only the Impressum's?
3. Is the PDF menu current, or the Yoordi menu? Are the prices the same? What does Mexican BBQ Ribs cost, and is it still on the menu?
4. "35 jähriges Bestehen": which year should the site count from?
5. How do guests order take-away: by phone, or the Yoordi QR code from the Gilji's flyer?
6. Should the awards (Swiss Gastro 2012, TripAdvisor Excellence, "Familien Willkommen" 2009) still be shown?
7. Should Umfrage, E-Card, Newsletter and Extranet come back?
8. Is there a vector (SVG) logo? Are there larger originals of the gallery photos (most are 300–800 px)? May the 2017 Flickr photos or Instagram photos be used?
9. Should the copyright line move on from 2010?
10. Who proofreads the French, Italian, English and Portuguese texts?
11. Is "Kinder backen Pizza" on request (Pizzeria page) or weekly (family service page)?

## Redirects for launch (`dist/_redirects`)

| Old | New |
|---|---|
| `/` | /de/ (the app then uses the saved or browser language) |
| `index.php?page=281` | /de/pizzeria |
| `page=280` | /de/steakhouse |
| `page=302` | /de/steakhouse#gaucho |
| `page=282` | /de/choucalino |
| `page=293` | /de/speisekarte |
| `page=284` | /de/anreise |
| `page=296` | /de/pizzeria |
| `page=691` | /de/anreise |
| `page=686` | /fr/ |
| `page=687` | /en/ |
| `section=gallery` | /de/#bilder |
| `section=imprint` | /de/impressum |

## Translations

All French, Italian, English and Portuguese texts are new, apart from three. The reservation intro's English and French are the restaurant's own. The menu's French descriptions are the PDF's own. The welcome lines are from the brief. Everything else needs a native-speaker check before launch. Portuguese is European Portuguese ("ementa"). German keeps Swiss spelling ("ss", never "ß").
