# Pizzeria Giardino – hand-off

**Preview:** https://claude.ai/artifact/Bw1RwMy4nsh7sNpENgTJnD (private; share it from the page's Share menu). Pages open
by their hash: `#de`, `#fr-carte`, `#en-visit-us`, `#it-galleria` … The preview always shows the permanent band
«Proposta de design · não é o site oficial» plus the same line in the page language, because it uses the restaurant's
real name, logo and photographs (repository CLAUDE.md). The production build in `dist/` has no band.

**Code:** this folder. How to run, build and edit: [README.md](README.md). Screenshots: `docs/screens/`.

## What is built

- 11 pages × 4 languages (DE / FR / EN / IT) with localized addresses: home, Menu, Families, Our Story, Visit Us,
  Gallery, Partner Hotels, Jobs, Press, Imprint, Privacy. Each is pre-rendered with its own title, description,
  canonical, hreflang, Open Graph and Restaurant JSON-LD. Every address of the current site has a 301 (`dist/_redirects`).
- The reference's signature pieces, with Giardino's content: the once-per-session intro (medallion → header, arch reveal);
  the language welcome wipe (olive panel from the right, medallion spring, WILLKOMMEN / BIENVENUE / WELCOME / BENVENUTI
  letter by letter, exit left) that keeps the same section at the same height on screen; the arch hero that grows into
  full-screen photographs with 01 / 02 / 03 chapters; the dark four-chapter food scene (Pizza, Pasta, Risotto, Desserts);
  the gold marquee; the tilted arch cards; editorials with clipped reveals, parallax, stamps and handwritten notes; the
  scroll-lit gold statement; the aerial map with four places and a spring pin; the three.js pizza; the hours dial
  (Restaurant / Kitchen / Both, live Leukerbad time, closures); the phone-first reservation drawer; the pinned
  horizontal gallery with lightbox; the reviews carousel; the contact bento; the large dark footer.
- Hours are computed in Europe/Zurich wall-clock time (correct across both daylight-saving changes and for visitors in
  any time zone). Date-specific closures live in `src/content/hours.ts` → `CLOSURES`; they override the week in the
  status, dial, drawer, footer and JSON-LD, and their notice disappears by itself after the last day. The autumn
  closure (1 Nov – 17 Dec 2026, reopening Friday 18 Dec) is in, re-checked on the live site on 1 November 2026.

## Content conflicts – please confirm with the owners

1. **Address.** The live Kontakt page (all four languages) says *Rathausstrasse 7*; the home page, the footer of every
   page, the Impressum and the Anreise page say *Thermenstrasse 9*, and Google lists Thermenstrasse 9. The site and every
   route link use **Thermenstrasse 9**. The aerial photographs show the restaurant between the Rathaus (town hall) and
   Hotel Heilquelle, whose address is also Thermenstrasse 9, which may explain why both appear.
2. **Phone during the company holidays.** The site publishes reservations by phone daily 10:00–23:00 without an
   exception. The drawer shows that line next to the closure notice; say if the line is not staffed during closures.
3. **Hot-meal hours.** The website says 11:30–15:00 and 17:00–21:30 (used here). The food menu PDF prints different
   times for the meat dishes (11:30–14:00 and 17:00–21:00, found in the earlier audit, `../giardino/content/menu-review.md`).
4. **Jobs.** The live Jobs page asks for service and kitchen staff "for the coming winter season". It is shown as
   published; confirm it is still open.
5. **Pirate ship.** German and French say it has been there since summer 2016; the Italian page still announces it in
   the future tense. The site uses the past tense in all languages.
6. **Photographs of children.** The three 2016 photos with identifiable children are left out until their consent is
   reconfirmed; the 2025 playground and playroom photos are used instead. The hosts' photo shows Pascal and Anja
   Loretan (identified from the Gastgeber page).
7. **Logo.** Only a 300 × 153 px PNG exists. It is used undistorted (original colours on light grounds, a light version
   on the dark-green medallions). A vector logo would make the medallions and the header sharper on large screens.
8. **Reviews.** The author of the 4/5 review is cropped out of the screenshot, so that review appears without a name. Statements about prices and vegan options are framed as guest opinions under the carousel.
9. **Vouchers in Italian.** felizzio's shop exists in German, English and French only; Italian pages link the English
   shop and say so.

## Integrations still to configure

1. **Contact form.** No backend is connected. The form validates (required: message, name, e-mail, consent) and then
   opens the visitor's e-mail program with the finished message to info@pizzeriagiardino.ch, saying clearly that it only
   arrives once they press Send; it never shows a false success. Set `VITE_FORM_ENDPOINT` (Formspree-compatible) at
   build time to post it instead; the success message then appears only after a 2xx answer.
2. **Hosting.** Deploy `dist/` to a static host; port `_redirects` if the host is not Netlify or Cloudflare Pages. Set
   `VITE_ORIGIN` if the site does not live at https://pizzeriagiardino.ch.
3. **Privacy and imprint.** The privacy page describes what this website itself does (no cookies, no analytics,
   self-hosted fonts, language choice in local storage, external links only on click) and links the restaurant's full
   statement; both texts need the owners' (and ideally a lawyer's) review before launch. The imprint names the
   restaurant and the photographer; add a web-design credit if wanted.
4. **Reservations stay by phone.** There is no online booking and nothing implies a confirmation. The drawer's party-size
   stepper is labelled as a planning aid for the call (nothing is booked or sent).

## Decisions

- **Stack.** React 19 + TypeScript on Vite 6 instead of Next.js (the brief allows an equivalent): it is the reference's
  own architecture, so the language wipe and the scroll scenes behave identically, and a prerender step gives every page
  and language its own static HTML with localized metadata and JSON-LD, which is what Next's static export would add.
  GSAP ScrollTrigger runs the scroll scenes, Motion the UI transitions, Radix Dialog the menu, drawer and lightbox.
- **"Read more on Google"** opens the restaurant's Google Maps listing by place ID (`ChIJA8Uhswkbj0cRjoi89632nEg`,
  "Restaurant Pizzeria Giardino, Thermenstrasse 9", verified in Google Maps on 1 November 2026; its coordinates match
  the restaurant's localsearch listing). No overall rating or review count is shown.
- **Reviews** keep their original English wording in every language (`lang="en"`); German, French and Italian
  translations open on request and are labelled as translations. Initials replace profile photos; no dates.
- **The 3D pizza** is a labelled illustration (rocket, cherry tomatoes, mozzarella, the Giardino logo printed on the plate
  rim). three.js loads only near the block, only with a real GPU and without reduced motion; it renders only while
  something moves and only on screen. Otherwise a still of the same pizza from above turns in steps (buttons and ← →).
- **Ingredient cutouts** were cut from the restaurant's own photographs (`scripts/cutouts.py`, rembg), not drawn.
- **The gold statement** starts each word at 25 % opacity, as briefed, and reaches full contrast at its reading
  position; the sentence is also the section's accessible name. Automated contrast checks exclude it for that reason;
  starting at about 50 % would pass them if preferred.
- **One palette.** The site keeps the brief's warm palette in every setting (no dark variant); body and every colour
  are set explicitly.

## Verification (2 November 2026)

- `npm test` – 8/8: Zurich wall clock across both daylight-saving changes, the closure and its boundaries, the
  Wednesday rest day, the kitchen break, an edited one-day closure, the rolling week, local time formats.
- `npm run check:i18n` – 327 texts complete in all four languages, no ß, typographic apostrophes, the six reviews word
  for word.
- `npm run qa` – 107/107 on the production build: all 44 pages load without console errors with the right `lang`,
  title and one `h1`; no serious or critical axe findings; no sideways scrolling at 390 / 768 / 1440 px; four
  language switches half-way down the home page (DE → FR → IT → EN) keep the section within half a pixel and update
  URL, `lang`, title and the stored preference; the current language does nothing; the intro plays once and Escape
  skips it; the mobile menu traps focus, locks the page and returns focus; the drawer's call link is
  `tel:+41275300584`; the closure notice matches today's date; the four menu PDFs are the live files in a new tab; the
  lightbox works with keys and returns focus; the skip link; contact validation and the honest hand-off; reduced motion.
- Re-checked live on 1 November 2026: hours, the autumn closure, the phone window, the three partner hotels and their
  sites, the four PDFs (HTTP 200, application/pdf), the felizzio vouchers (CHF 50 / 100 / 150 or free amount, valid two
  years), the Google listing.
