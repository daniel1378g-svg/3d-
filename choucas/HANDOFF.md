# The Choucas Connection · redesign proposal

**Preview:** https://claude.ai/artifact/8VkQXJfNsNHiUkpCFM53pV
(private: it opens for you only until you share it from the page's Share menu)

This is a proposal. The live site at choucas.ch was not touched. The logo, photos and texts belong to The Choucas Connection, so the new site goes live only with the owner's OK. Until then every page carries the fixed band "Proposta de design · não é o site oficial" (the repository's rule in CLAUDE.md). `VITE_PROPOSAL=0` removes it.

## Run and publish

```bash
npm install
npm run dev              # http://localhost:5173/de/
npm run build            # static site in dist/: 35 pages (7 pages × 5 languages), sitemap, robots, _redirects
npm run build:artifact   # the claude.ai preview, in artifact/
npm run count            # menu sections and dishes
npm run images           # rebuilds public/images and public/brand from media/original
```

- `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx` connects the contact form (Formspree-compatible JSON POST). Without it the form is in **test mode**: it validates name, email and message, sends nothing, and says so on screen. No form service is connected yet, because it needs the owner's receiving address.
- `dist/` works on any static host. `_redirects` uses the Netlify format.
- `dev/hero-test.html?split=0.5` renders the hero shader alone (also on software GL), for tuning.

## What is in it

**Every page:** sticky header that shrinks on scroll. The logo is on the left. On the right are the language pill (`DE ⌄`) and then the black "Menü" button. The pill opens the snow-coloured card below it, right-aligned. Each row shows the code, the native name, and a dot on the current language. Enter, Space and ↑ ↓ work, Esc closes the card and returns focus to the pill. "Menü" opens a full-screen overlay with Pizzeria · Steakhouse · Choucalino® · Speisekarte · Anreise · Bilder, plus Reservieren and Anrufen. Pages change with a 0.4 s black wipe.

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
| Lighthouse | **not run** |

## Dropped against the clock, and why

- **Lottie icons:** first on the drop list. I reused six small animated icons drawn as Lottie JSON for the previous project (flame, grill, clock, phone, pin, calendar), recoloured and played with lottie-web on hover. The pizza slice, steak, slide and take-away box were not drawn, and there are no dotLottie files.
- **21st.dev / motionsites.ai:** not consulted. The tilt cards, magnetic buttons, marquee, animated tabs and text reveals are written directly with Motion. There is no shadcn/ui, only Tailwind and custom components.
- **Lighthouse:** not run. The main script is large (≈ 500 kB, 166 kB gzipped, mostly React, Motion and all five languages of text). Splitting the copy per language is the first thing to try if Performance is under 85.
- **Gallery link:** "Bilder vom Oasis Steakhouse" goes to the home gallery, which opens on the first tab, not on the Oasis tab.

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
8. Is there a vector (SVG) logo? Are there larger or newer photos? May Instagram photos be used?
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
