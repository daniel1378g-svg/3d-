# Pica Pau · hand-off

**Preview:** https://claude.ai/artifact/XWHqssMVYff6nNG7aCy6Vx
Anyone with the link can open it. Sharing is set from the page's Share menu.

The live site at picapau.ch was not touched. The logo, photos and texts belong to Pica Pau, so the new site
goes live only with the owner's OK. Every page shows the fixed band "Proposta de design · não é o site oficial"
until then (`VITE_PROPOSAL=0` removes it at build time).

## Screenshots

All in [`docs/screenshots/`](docs/screenshots/), French, taken from the production build:

| File | What |
| --- | --- |
| `S-home-1440-a.jpg`, `S-home-1440-b.jpg` | Contact sheets: every home section at 1440 px |
| `S-home-390.jpg` | Every home section at 390 px |
| `S-carte-1440.jpg`, `S-carte-390.jpg` | The carte page, top to bottom, at 1440 and 390 px |
| `home-1440-01-hero.jpg` … `home-1440-16-footer.jpg` | Home sections one by one: hero, river story (2), the four classics (2), logo strip, carte teaser, statement, réservation, L'Âme du Portugal, galerie (2), plats du jour, infos (2), footer |
| `home-390-*.jpg` | The same 16 at 390 px |
| `carte-1440-0…5.jpg`, `carte-390-0…5.jpg` | The carte page in six steps |
| `ui-1440-drawer.jpg`, `ui-390-drawer.jpg` | The booking drawer |
| `ui-1440-languages.jpg`, `ui-390-languages.jpg`, `ui-390-menu.jpg` | Language menu and phone menu |

## The carte

`content/carte.json` holds the whole carte. `npm run count` compares it with the saved copy of the live page:

| Section | Live | New site |
| --- | ---: | ---: |
| Entrées | 9 | 9 |
| Viandes | 10 | 10 |
| Poissons | 10 | 10 |
| Menu enfant | 4 | 4 |
| Desserts | 9 | 9 |
| Sur commande | 8 | 8 |
| **Total** | **50** | **50** |

Every name, price and FR/PT/EN description matches the live carte. Italian and German are complete.

**Cut-outs** (background removed with rembg, `media/cutouts/`): photo 2 Polvo à Lagareiro, photo 4 Pica Pau & Companhia,
photo 6 Bacalhau à Braga, photo 7 the salgados board. They fly across the carte sections and the home page.
Photos 1, 3 and 5 stay whole, because the dish doesn't separate cleanly from the table.

**Couldn't read:** nothing. Every text, price, photo and link on the live site was readable.

## Dropped from the live site

- **The embedded Google map.** The live page loads it straight away, which sends every visitor to Google. The
  Infos block now has the address and three buttons (Google Maps, Apple Plans, Waze) with the same links as
  the live map chooser. A map that loads only on tap can come back if the owner wants one.
- **The live fonts** (Libre Baskerville, Manrope). The brief's Barlow Condensed, Lato and Caveat replace them.
- **"À table."** (title of the live menu window) and **"↔ Glissez pour changer de page"**: the carte is now a
  page of its own called "La carte", with a section bar and search instead of pages to swipe.
- **Two section labels from the live menu data**, "Enfant" and "Plats sur commande". The site uses the live
  tab names "Menu enfant" and "Sur commande" everywhere instead.
- **The one-line kitchen summary** ("Service cuisine de 12h00 à 14h00 … (dernière commande à 13h30 et 21h30)").
  The same hours appear in its two-line form, which the live site also has.

The long hero text of the live site is still there, split into the three river-story captions. Nothing else
was cut.

## Decisions I made on my own

**Addresses and languages**
- One URL per page and language: `/fr/`, `/fr/carte`, `/fr/confidentialite`; `/en/`, `/en/menu`, `/en/privacy`;
  `/pt/`, `/pt/ementa`, `/pt/privacidade`; `/it/`, `/it/menu`, `/it/privacy`; `/de/`, `/de/speisekarte`, `/de/datenschutz`.
- `/` sends visitors to the language they chose before, else their browser's language, else French.
- The language menu is in the header of every page. Each switch plays the welcome slide
  (Bienvenue / Welcome / Bem-vindos / Benvenuti / Willkommen) and keeps the visitor at the same place on the page.
- German is written for Switzerland (`de-CH`, "ss", no "ß"). Portuguese is European Portuguese (`pt-PT`).

**Motion**
- The intro (logo flies into the header, the hero arch opens) plays once per browser session, on the home page
  only. It has a skip button and never plays with reduced motion.
- The hero shows the Douro at dusk with the Ribeira and the Dom Luís I bridge, drawn by a WebGL shader; the
  pointer leaves ripples on the water. The restaurant has no photo of Porto, and the brief allows only its own
  photos, so the scene is drawn rather than photographed. Phones with a weak GPU, reduced motion and
  browsers without WebGL get a still frame of the same scene.
- The words of the statement band light up as you scroll. Until lit, they are dimmed on purpose.
- The cork coaster in "L'Âme du Portugal" is a 3D disc with the logo burnt in. Drag or flick it to spin it;
  the arrow keys work too. Without WebGL it is a flat drawing.
- Small animated icons (woodpecker, pot, tram, sun, fish, wine, clock, phone) are Lottie files drawn in code
  and played with lottie-web on hover, tap or focus. I didn't use dotLottie: its player fetches a WASM file,
  which the claude.ai preview blocks.
- With reduced motion, every pinned scene becomes a plain stacked layout with the same content.

**Content**
- The four classics are Francesinha, Carne de Porco à Alentejana, Bacalhau (à Braga and à Lagareiro on one
  card) and Polvo à Lagareiro, with the live names, descriptions and prices. The first two have no photo, so
  each gets a drawing and a labelled slot ("Photo : Francesinha") waiting for one.
- The three river-story captions are the three badges of the live hero.
- Photos are named after their dish (`polvo-a-lagareiro`, `bacalhau-a-braga` …), see the list under open questions.
- Photo alt texts come from the live site in FR/PT/EN; I translated them to Italian and German.
- The open/closed badge uses Geneva time and the live hours (kitchen until 14:00 and 22:00, last order 13:30
  and 21:30). It doesn't know holidays or exceptional closures.
- The "Terrasse ouverte" badge shows from March to October, as the live text says.
- The euro helper converts a bill in CHF at the live rate (1 € = 0.90 CHF) and says the result is indicative.

**Booking**
- "Combien êtes-vous ?" goes from 1 to 16. One to four people get the TheFork widget the live site uses
  (same widget ID). Five to eight get the phone number. Nine and more get the live "exception · call us" text.
- TheFork, like the Facebook feed, loads only after a click, so no third-party site sees a visitor who
  doesn't use it. In the claude.ai preview both open in a new tab, because the preview can't embed other sites.

**Build**
- Every page and language is prerendered to static HTML with its own title, description, canonical, hreflang
  links and Open Graph tags; the home pages carry the Restaurant JSON-LD with the whole menu. React hydrates
  the HTML on load. The home page's lower sections (from the logo strip down) mount just after the first paint,
  to keep the phone score high, so they aren't in its static HTML.
- The Open Graph image is a screenshot of the new hero.
- The fonts load from Google Fonts. Before launch, self-hosting them would keep visitors' IP addresses away
  from Google (Swiss nLPD and GDPR).

## Old addresses → new ones

The live site is one page. Its sections are anchors on `/`, and its languages switch inside the page with no
address of their own. The anchor part never reaches the server, so the first two rows are handled in the browser.

| Old address | New address | How |
| --- | --- | --- |
| `https://picapau.ch/` | `/fr/` (or the visitor's saved or browser language: `/en/`, `/pt/`, `/it/`, `/de/`) | In the browser. Without JavaScript: `/fr/` |
| `/#accueil`, `/#carte`, `/#reservation`, `/#galerie`, `/#infos`, `/#facebook-latest` | `/<language>/#accueil` … `/<language>/#facebook-latest` (same section of the new home page) | In the browser |
| `/index.html` | `/fr/` | 301 in `_redirects` |
| `/carte` | `/fr/carte` | 301 in `_redirects` (in case anyone typed it) |
| `/menu` | `/en/menu` | 301 in `_redirects` (same) |
| The live privacy text (opened from the footer) | `/fr/confidentialite`, `/en/privacy`, `/pt/privacidade`, `/it/privacy`, `/de/datenschutz` | New pages |
| Any other path | `404.html` (the French home page), which then opens the home page in the visitor's language | Host's 404 |

## Open questions for the owner

1. **Approval.** May the new site go live, and on which host? Until you say yes it stays a preview.
2. **Photos of the classics.** Can you send photos of the Francesinha and the Carne de Porco à Alentejana?
   Photos of the dining room and the terrace would help too: the gallery has dishes only.
3. **Which dish is in which photo?** I read them like this, please correct:
   1 Gambas ao alho · 2 Polvo à Lagareiro · 3 grilled fish with gambas and fries · 4 Pica Pau & Companhia ·
   5 octopus with potatoes · 6 Bacalhau à Braga · 7 salgados and presunto board.
   The live alt texts of photos 3 ("Poisson grillé et chips maison") and 6 ("Filets de dorade et gambas grillés")
   look swapped.
4. **Cut-outs.** Are you happy to see your dishes cut out of their photos and floating across the page?
5. **Booking.** Should one to four people keep booking through TheFork, with this widget?
6. **Euro rate.** Is 1 € = 0.90 CHF still the rate you apply?
7. **Payments.** The French list includes "Carte de débit", the Portuguese and English lists don't. The French
   list also says "Cash" where another live label says "Espèces". Which is right?
8. **Closures.** Do you want a way to show holidays and exceptional closures? The open/closed badge only knows
   the weekly hours.
9. **Logo.** Do you have the logo as a vector file (SVG, AI or PDF)? The site uses the PNG from the live site.
10. **Instagram.** May the site show your latest Instagram posts? It only links to the account for now.
11. **History.** Is there a founding year or a short story you'd like on the site? I didn't invent one.

## Before launch: native-speaker check

The Italian and German texts are my translations, and so are the new interface texts in English and
Portuguese (button labels, "Combien êtes-vous ?" and the booking steps, the search, the euro helper, the
open/closed badge, the welcome slide, the menu and accessibility labels). French, and the English and Portuguese
texts taken from the live site, are unchanged. A native speaker of each language should read the new texts
before launch: `src/copy.ts` (interface), `content/carte-it-de.json` (carte), `src/content/photos.ts` (alt texts).

## Checks

**Lighthouse 13.6, mobile, production build** (`npm run preview`):

| Page | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/fr/` | 97 | 97 | 100 | 100 |
| `/en/` | 98 | 97 | 100 | 100 |
| `/it/` | 92 | 97 | 100 | 100 |
| `/fr/carte` | 93 | 100 | 100 | 100 |
| `/pt/ementa` | 98 | 100 | 100 | 100 |
| `/de/speisekarte` | 92 | 100 | 100 | 100 |
| `/fr/confidentialite` | 98 | 100 | 100 | 100 |
| `/de/datenschutz` | 99 | 100 | 100 | 100 |

The 97 on the home pages comes from one audit: colour contrast on the statement band's words before they
light up (see decisions). Once lit, they pass.

**Also checked**
- No horizontal scroll at 375, 390, 768, 1280 and 1920 px, on every page.
- No console errors or warnings on any page, in the production build and in the preview.
- Reduced motion: no intro, static versions of every pinned scene, the marquee starts paused.
- Keyboard: skip link first, visible focus everywhere, the drawer, menu and lightbox keep focus inside and
  return it on Esc, the party stepper and the coaster work with the arrow keys.
- Language switch: address, title, `<html lang>` and scroll position update correctly.
- Old `/#reservation` style links land on the right section.
- Without JavaScript, the carte and privacy pages show their full content. The home page shows the hero,
  the story, the four classics and the footer (address, hours, phone); its lower sections need JavaScript.

## Tools I couldn't use

- The 21st.dev component server wasn't connected in this session (no API key), so the components are written
  by hand in the project's own style.
- The `/design-taste-frontend` skill wasn't available in this session.
