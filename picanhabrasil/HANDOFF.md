# Picanha Brasil · hand-off

**Preview:** https://claude.ai/artifact/61Cwyb4YYVB17bMgEFwZ6Q (private; share it from the page's Share menu). Pages open by
name after `#`: `#de`, `#en-menu`, `#pt-reservar`, `#fr-commander`, `#it-note-legali`.

An **unofficial design proposal** for Picanha Brasil, Mattengasse 9, 8005 Zürich. The live site
(picanha-brasil.ch) was not touched. Every page carries the fixed band "Proposta de design · não é o site oficial",
plus the notice in the page's language (band on wide screens, menu, footer). The demo is `noindex`, has no sitemap and
emits no Restaurant structured data until an authorised launch (`VITE_PROPOSAL=0`).

## What is built

**Home**, in order:

- first-visit intro (1.6 s measured, skippable, once per session, none with reduced motion)
- ember hero
- facts band
- about (published facts only)
- the "Prato" plate story and plate picker
- menu teaser (5 categories)
- reservation
- pick-up & delivery with postcode check
- groups (by phone)
- Google reviews
- gallery
- opening hours & directions
- FAQ
- contact
- footer

**Pages** in all five languages (de-CH default, en, pt-BR, fr-CH, it-CH), each with its own URL:

| Page | URLs |
|---|---|
| Full menu | `/de/karte`, `/en/menu`, `/pt/cardapio`, `/fr/carte`, `/it/menu` |
| Reservation | `/de/reservieren`, `/en/book-a-table`, … |
| Ordering & delivery | `/de/bestellen`, `/en/order`, … |
| Imprint & privacy | `/de/impressum`, `/en/imprint`, … |

### Signature interactions

- **Ember hero** (`src/components/home/emberField.ts`, `Hero.tsx`):
  - **Rendering:** one fragment shader on one full-screen triangle, plain WebGL 2, no library. Warped Voronoi coals with glowing cracks of varying width, smoke, heat haze, two layers of sparks.
  - **Interaction:**
    - The pointer is a heat source and the sparks lean towards it.
    - A click or tap sends a heat pulse.
    - With nobody pointing, the heat wanders on its own.
    - The site's food cut-outs float with pointer parallax; tapping one tosses it.
  - **Cost control:**
    - Rendered at 60 % of CSS pixels (38 % on phones / ≤ 4 cores), lowered further when frames run long.
    - Stops off screen and in hidden tabs.
    - Pause button.
  - **Fallbacks:** reduced motion shows one still frame with nothing floating; without WebGL, a painted gradient. Title and buttons never wait for the graphics.
- **Language switch** (`LanguageTransition.tsx`):
  - **Sequence:** the badge flies from the header to the centre, the flag rhombus swells into a green curtain, "Willkommen / Bem-vindos / …", then the curtain wipes away.
  - **Timing:** cover 0.5 s + reveal 0.45 s.
  - **What it keeps:** route, scroll position (anchored to the section in the upper third of the screen), the chosen dish/side and the reservation being built.
  - **Repeated switches:** a switch requested during another replaces its target instead of stacking.
- **Prato** (`Prato.tsx`, `PlateArt.tsx`):
  - **On scroll:** an overhead SVG plate fills step by step (main, rice, beans, fries or cassava).
  - **As a picker:**
    - choose one of the 9 real mains, the published portion (only Picanha and Carne Seca have 150 g / 200 g) and the published side variant
    - Feijoada shows its own four published variants
    - the price comes from the menu data
  - **Labelling:** marked "Illustration – kein Foto"; it works fully without animation.
- **Reservation table** (`TableViz.tsx`): the table morphs with the party size (1–2, 3–4, 5–6, 7–10, 11+). It is labelled as an illustration, not an assigned table.

## Sources (checked 30.10.2026)

| What | Where | Evidence in repo |
|---|---|---|
| Page, logo, banner, address, phone, e-mail | https://picanha-brasil.ch (rendered in Chromium) | `content/raw/picanha-brasil.ch.html` |
| Menu: 5 categories, 54 dishes, 89 prices | data loaded by `<food-shop shopid="58JN5J">` from `data.bigbites.ch/restaurant/58JN5J/foods` | `content/raw/foods.json` → `content/menu.json` (`scripts/build_menu.py`, integer centimes) |
| Hours (= kitchen hours), delivery zones and fees, payment, pick-up/delivery | `data.bigbites.ch/restaurant/58JN5J` | `content/raw/58JN5J.json` → `src/content/facts.ts` |
| Reservation notes (30-minute hold, CHF 5.00 fee) | `customerSettings.reservationNote`, shown in `<reservation-shop>` | `content/raw/customerSettings.json`; exact wording in `facts.ts` (`RESERVATION_NOTE_DE`) |
| Reservation form fields | the rendered widget (first name, last name, phone, e-mail, number of people, free date-time, comments) | `content/raw/widgets.txt` |
| Google rating 4.5, "women-led" attribute | Google Maps place card (limited view, no review texts) | read on 30.10.2026 |
| Reviews (3) | supplied by the client on 30.10.2026 | `content/reviews.json`, verbatim |
| Secondary site | https://restaurantepicanhabrasil.com | `content/raw/rpb_*.txt` |

Research was read-only: no reservation, order or message was submitted.

## Asset inventory

| Asset | Source | Used in |
|---|---|---|
| Logo (badge "Picanha Brasil · Restaurante") | picanha-brasil.ch (`58JN5J-logo.png`) | header, intro, language switch, about, footer, favicons |
| Banner "brasilianisch" (Brazilian dishes, top view) | picanha-brasil.ch (category banner of the platform) | menu/order/reservation page heroes, gallery |
| Cut-outs: picanha, coxinha, pudim, bier, getraenke | picanha-brasil.ch (ordering widget category images) | hero (4), menu teaser and menu page (5), groups, gallery |
| bigbites logo | platform | not used (platform branding, not restaurant content) |
| 4 photos from the secondary site (facade, birthday table, picanha plate, feijoada) | restaurantepicanhabrasil.com | **not used**; kept in `media/needs-owner-confirmation/` until the owners confirm they are theirs |

Images are WebP derivatives (`scripts/prepare_images.py`); the originals stay in `media/originals/`. The banner and
cut-outs are generic platform images, not photos of this restaurant's food. The drinks cut-out shows third-party
brands (Coca-Cola, Fanta, Sprite) as on the original site.

## Decisions

- **Reservation:**
  - The official widget can't be pre-filled (a web component with no URL parameters), so the page collects only preferences (people, date, time) and hands off to `picanha-brasil.ch/#reservation` with a copyable summary and the phone number.
  - No personal data is asked for.
  - Times offered are every 30 minutes inside the published hours, as a preference. No booking window, no maximum party size and no last-seating rule are published, so none are applied.
  - The page never says a reservation is confirmed.
- **Fee:** the policy is shown next to the button, with the total for the party ("For 4 guests: CHF 20.–, requested via TWINT after booking…"). The exact German wording is in a disclosure in the other languages.
- **Ordering:**
  - The zones are listed exactly as published.
  - The postcode check answers only from that list. 8005 Zürich, the restaurant's own postcode, is not in it, so the check says delivery is not confirmed and offers pick-up and the phone.
  - All orders hand off to `picanha-brasil.ch/#order`.
- **Reviews:**
  - The three supplied reviews are shown word for word in English, the language they were given in.
  - The interface around them is translated.
  - Name, rating, relative date ("2 years ago", as Google showed it), Local Guide line, meal and sub-scores are as supplied.
  - There is no auto-rotation, and links go to the reviews on Google.
- **Legal:**
  - The official site's imprint belongs to its platform (bigbites.ch, c/o Logmin GmbH), so it is linked and attributed rather than copied.
  - No company name is shown: none is published on the restaurant's site. Directories list "PICANHA BRASIL GmbH", but this could not be confirmed.
  - The demo operator's identity was not supplied.
- **Not built:** rodízio, catering, vouchers, events beyond "call us". The official site offers none of them.
- **Dietary labels:** none (none are published). The "what is there without meat" FAQ was removed for the same reason.
- **Stack:** this Vite + React 19 + TypeScript + Tailwind 4 setup, Motion 12, GSAP 3 (ScrollTrigger), Lenis. No three.js, no Lottie (no designer animation files; the player would add weight for nothing).
- **Fonts:** Archivo and Fraunces come from Google Fonts. Self-host them for a real launch.

## Discrepancies and open questions for the owners

1. **Two websites, two price lists.**
   - restaurantepicanhabrasil.com shows higher prices (Picanha small CHF 34 vs 30, starter Picanha CHF 32 vs 28, Coxinha CHF 6 vs 4) and a different booking system (resmio).
   - This proposal uses only picanha-brasil.ch and says so next to the prices.
   - Which list is current, and are the online-ordering prices different from dine-in?
2. **Fee wording.** "eine Aufwandsgebühr von CHF 5.00 pro Person … wird von der Schlussrechnung abgezogen und bleibt in jedem Fall geschuldet" reads as a per-person charge requested for every booking, credited against the bill, and kept if the guest doesn't come. It is translated that way, with the original wording available. Please confirm.
3. **Feijoada.**
   - The menu note says mains come "with rice, beans and fries or cassava".
   - The Feijoada entry instead lists four variants: with rice / fried banana / collard greens / vinaigrette salad.
   - The proposal shows the four variants as published. Is one of them chosen, or are they all included?
4. **Delivery to 8005.** The restaurant's own postcode is not in the delivery list. Intentional?
5. **Reviews.**
   - The three supplied reviews could not be cross-checked on Google from here: Google shows automated browsers a limited view.
   - Please confirm the source and permission, ideally with the review links.
   - The secondary site's testimonials ("Mariana S.", …) and its "4.8 from 540 reviews" were not used: they could not be verified, and Google showed 4.5.
6. **Photos.** May the four photos from the secondary site be used? Are there genuine photos of the dishes?
7. **Legal entity and demo operator** for an imprint, if the proposal is published.
8. **Translations** need a native review (notes from the translation pass: Swiss French typography, "NPA", Italian "Lei", cut names such as "Aiguillette de rumsteck").

## Checks (30.10.2026, this container: Chromium headless, SwiftShader, no GPU)

| Check | Result |
|---|---|
| `tsc --noEmit` | passed |
| `npm run check` (all dictionaries vs German: keys, array lengths, placeholders; menu: every localized field, prices as positive integer centimes) | 0 errors |
| `npm test` (node:test; Zürich time incl. summer/winter and the DST switch on 29.03.2026, split hours, time preferences, centimes and fee totals, menu counts and variants, delivery matching, translation keys, routes) | 9/9 passed |
| 25 pages × 360 px and 390 px: no horizontal overflow, one h1, no console errors | passed |
| Home (fr) at 768, 1024, 1440 px: no overflow | passed |
| Intro ≤ 2 s (measured 1.6 s), released scroll, once per session; none with reduced motion | passed |
| No WebGL: gradient fallback, title and buttons present, no errors | passed |
| Language switch DE→PT: URL, `lang`, chosen dish and side kept, section position kept (±40 px); rapid EN→FR settles on FR, overlay released | passed |
| Menu search hit and empty state; published prices on the menu page | passed |
| Delivery check 8050 → CHF 17; 8005 → "not confirmed" | passed |
| Reservation hand-off disabled until date and time; link to picanha-brasil.ch/#reservation; CHF 5 × 4 = CHF 20; original wording present | passed |
| Keyboard: first Tab reaches the skip link | passed |
| axe-core WCAG 2.0/2.1/2.2 A/AA on 6 pages in 5 languages | 0 violations |
| Frame rate in the software renderer: 1440 px, hero on screen | 49 fps (adaptive resolution stepped down) |
| Frame rate in the software renderer: 390 px, 4× CPU throttle | 56 fps |
| Frame rate after scrolling away | 60 fps (hero stopped) |
| LCP (lab) | 0.83 s desktop, 0.79 s phone |
| CLS (lab) | 0.029 desktop, 0 phone |

Not run:

- real phones and laptops (frame rates there still have to be measured)
- Lighthouse
- field data
- screen-reader walkthrough

## Skills used

| Skill | How it was used |
|---|---|
| `animation-performance` | transform/opacity only, pointer motion written to `style.transform` (no React state per frame), loops stopped off screen, no `transition: all` |
| `gsap-performance` | stagger instead of separate tweens, ScrollTriggers killed on cleanup |
| `threejs-shaders` | GLSL conventions for the ember shader; plain WebGL 2 instead of three.js |
| `artifact-design` | the claude.ai preview |
| `21st-ui` | read; its MCP server is not connected in this session, so the catalog could not be searched |
| `lottie-animations` | read and decided against (see Decisions) |

`threejs-animation` and `threejs-interaction` were not loaded, as the site has no three.js scene.
