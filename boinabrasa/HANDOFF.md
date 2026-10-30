# Boinabrasa · hand-off

**Preview:** https://claude.ai/artifact/94YKFc5f13SzEBt6CiLJAw (private; share it from the page's Share menu).
In the preview, pages open by name at the end of the address: `#de`, `#pt-precos`, `#en-book-a-table`,
`#fr-histoires-picanha`, `#zh`…

This is a design proposal. The live site at boinabrasa.ch was not touched. The logo, photos and texts belong to
Boinabrasa GmbH, so the new site can only go live with the owners' agreement. Until then every page shows the fixed
band "Proposta de design · não é o site oficial", and the footer says the same in the page's language.

## What is built

**Home**, in this order: first-visit intro → 3D hero → facts band → »Boi na brasa!« (about) → how the rodízio works →
meat explorer → prices → reservation → groups & company events → catering → gift vouchers → Google reviews →
gallery → opening hours & directions → FAQ → contact → footer.

**Pages** (all five languages): Unsere Spiesse, Preise & Karte (prices, the whole drinks/apéro/dessert card from
the PDF, allergens, group packages, FAQ), Tisch reservieren, Anfrage für Gruppen (the live form's three steps),
Catering, Gutscheine, Über uns, Über Churrasco, Wissen & Genuss (the six articles), Kontakt, Impressum,
Datenschutzerklärung, AGB, Dolcebrigadeiro, and the Chinese page (中文) as on the live site.

### The 3D hero (src/three)

A vertical skewer with four pieces of picanha, folded into the C shape the restaurant uses (see its own clip), fat
cap on the outside. The sequence (≈18 s, once per session, skippable, pausable):

| Phase | Time | What happens |
|---|---|---|
| Glut | 0–2.6 s | darkness, embers rise, the fire light comes up, the camera moves in |
| Grill | 2.6–7 s | raw → grey → Maillard brown → crust, fat white → gold; edges first, irregular; the meat shrinks a little, steam |
| Messer | 7–9.2 s | the knife comes in from the left along the cut plane and presses into the meat |
| Schnitt | 9.2–12.2 s | the edge goes down, sawing; the seam opens around the blade, the slice peels and hangs, pink side out |
| Teller | 12.2–14.4 s | the slice comes free and falls in slow motion, turns pink side up, lands on the plate |
| Boinabrasa | 14.4–18.4 s | the camera circles to the final shot; the bull switches on as a red neon sign behind the skewer; the headline rises |

Then it idles (slow sway, pointer moves camera and key light, scroll pulls the camera back). "Noch eine Scheibe"
turns the skewer once; while the cut faces away the slice is put back, and the carving plays again.

How it is made: each piece is a rounded cross-section swept along an arc, deformed by smooth noise. The carved
piece is built twice from the same surface function: the main body (with the pink face already under the slice)
and the slice (its top the original crust, its bottom the cut plane, its margin discarded so it ends in a knife
edge). The meat shader (MeshPhysicalMaterial + GLSL) computes colour, roughness, juice clear coat, relief, salt,
pepper and the doneness gradient of the cut face from distances stored per vertex. The peel is a vertex-shader
bend around the knife edge, driven by a damped spring; the fall is a rigid transform with gravity timing.
Embers, smoke, the bokeh background, the plate, the knife (30 cm blade with a real bevel, white handle) and the
neon sign are all generated in code. Post-processing on desktop: bloom, vignette, warm grade, grain.

Phones and weak devices get a lighter path (fewer vertices and particles, no shadows, no bloom, cheaper noise),
the pixel ratio adapts to the measured frame time, rendering stops when the hero is off screen, reduced motion
shows one still frame, and without WebGL a still rendered from the scene (`public/poster/`) takes its place.

**What a dedicated 3D asset would improve.** Close up, the procedural meat reads as very good CG, not as a
photograph: the fold is more regular than real picanha, the crust relief is noise rather than seared fibre, the
raw stage looks waxy. A scanned or sculpted picanha (GLB with baked albedo/normal/roughness for raw and grilled
states, plus a sculpted slice) would close that gap; the engine already separates geometry, materials and the
timeline, so such an asset can replace `meatGeometry.ts` while keeping the cut, peel and fall logic.

### Reservation

Party size, date and time, with the table illustration morphing with the party size (1–2 small table, 3–4 round,
5–6 large round, 7–10 long, 11–12 banquet, 13+ two long tables; chairs and place settings spring into place). It is
an illustration, not a table assignment. **Nothing is booked on this site.** "Weiter zum Reservierungssystem" opens
the restaurant's own system (VikRestaurants on dielsdorf.boinabrasa.ch) at its search step with people, date and
time filled in:
`https://www.dielsdorf.boinabrasa.ch/de/?option=com_vikrestaurants&view=search&date=12.11.2026&hourmin=19:0&people=4`
— checked on 30.10.2026: the system answers "Ein Tisch für 4 Person(en) wurde gefunden! Wählen Sie einen Raum".
Only that system knows availability and confirms. The booking system exists in German and English only; the other
languages hand off to English. 1 person: the online form starts at 2, so the site offers the phone. From 12: the
group request (both offered for exactly 12). The calendar greys out Monday–Wednesday (opening hours), past days,
days beyond the system's 120-day window and the closing days the system itself announces (1–3 January 2027).
The New Year's Eve offer (CHF 190.–) is copied from the booking site and links to its own date.

### Content

Captured on 30.10.2026 from boinabrasa.ch (all pages in German and English), the booking site, the voucher shop
and the catering site (captures in `content/raw/live/*.txt`). German texts are verbatim; the menu card was
transcribed from the PDF (75 items, 15 sections). Photos: all photos of the live site, the voucher motifs of the
shop and the restaurant's catering photos (59 images, WebP), plus the restaurant's own clip (webclip.mp4) in the
rodízio story. Alt texts were written for every photo in five languages.

### Languages

German (de-CH) is the source. English, Brazilian Portuguese, Swiss French and Swiss Italian were translated for this
proposal (516 interface strings, 9 long texts, the menu), each by a separate pass with a checker: the dictionaries
are typed against the German one (a missing key fails the build), `npm run check` compares every article block,
list, image, placeholder and number. Result: 0 errors, 0 warnings. Legal texts are not machine-translated: German
and the live site's own English versions, with a note in the other languages. The language switch plays the
transition (the bull leaves the header, its silhouette fills the screen, "Willkommen / Welcome / Bem-vindos /
Bienvenue / Benvenuti", the curtain wipes away) and keeps the scroll position and the reservation being built.

## Checks

- **TypeScript:** `tsc --noEmit` clean.
- **Accessibility:** axe-core (WCAG 2.1 A/AA) on 9 pages across the five languages: 0 violations after fixes (calendar
  semantics, contrast of dimmed text). Keyboard: skip link first; menu and booking sheet move focus in, trap it,
  close on Escape and return focus; calendar, meat list and gallery work with arrow keys. Reduced motion: no
  intro animation, no 3D motion (still frame), no smooth scroll, crossfades instead of slides. Touch targets 44 px
  on touch screens.
- **Layout:** all 15 pages in all five languages plus sample articles (81 pages) at 390 px: no horizontal scroll, an
  h1 on every page, no runtime errors. The home page was also reviewed at 1440 and 1280 px; the header fits at 390 px.
- **Language switch:** DE → PT on the home page: address `/pt/`, `lang="pt-BR"`, title and content in Portuguese,
  section top 114 px before → 115 px after.
- **Hand-off URL:** produced by the UI and opened on the live booking system (see above).
- **3D performance:** this container has no GPU; in its software renderer (SwiftShader) the desktop path runs at
  2.7 fps and the phone path at 5.2 fps, with the adaptive pixel ratio stepping down as designed. These numbers say
  nothing about real devices: **frame rates on real phones and laptops still have to be measured** (Chrome DevTools
  performance panel, Safari on an iPhone). Lighthouse was not run.

## Decisions

- **Google reviews:** no review text is shown. Google Maps' review panel could not be read from here (and getting
  around its bot check is not acceptable); third-party aggregators could not be verified as current, local.ch has
  no reviews. The section links to the restaurant's reviews on Google (read and write). The carousel (swipe,
  arrows, stars, Google attribution) is built and fills itself from `content/reviews.json` once real reviews are
  copied there with the owners' agreement, or loaded through the Google Places API (which requires its attribution).
- **No dish photos invented:** the meat explorer shows the site's photos where it has them (picanha, maminha,
  costela, linguiça) and an illustrated card for the other six cuts.
- **Forms:** contact and group request validate in five languages. Without a form service they compose an e-mail
  to info@boinabrasa.ch (site) or show the finished message to copy (preview, where mailto links are unreliable).
  The live group form shows a calendar of likely availability from its booking system; that data is not
  reachable here, so the new form shows none and says only the restaurant's confirmation counts.
- **Vouchers:** the motif and amount picker previews the card; buying happens in the official shop, where motif and
  amount are chosen again (the shop takes no parameters).
- **Catering:** the live site's text, plus the catering site's claim (30–500 people), three steps and hotline,
  with a link to churrascocatering.ch. The client logos on that site were not used.
- **Opening hours** follow the live site. Arrival times offered: Thu–Sat 18:00–20:30, Sunday 12:30–15:00 and
  18:00–20:30, in 15-minute steps ("Letzte reservierbare Ankunft").
- **SEO:** each page and language is prerendered with its own title, description, canonical, hreflang, Open Graph;
  the home pages carry Restaurant JSON-LD (address, geo from the site's own map link, hours, phone, prices, menu,
  booking). German titles and descriptions are the live site's (two typos fixed). `dist/_redirects` maps the old
  Joomla addresses (including the blog and the English pages) to the new ones with 301s.
- **Fonts** come from Google Fonts (Archivo, Fraunces); for the real site they should be self-hosted (privacy, speed).
- **Analytics and cookies:** none on the new site; the privacy statement copied from the live site still mentions
  Google Analytics and has to be rewritten before launch.

## Open questions for the owners

1. May the site go live with these texts, photos and logo? Is there a **vector logo** (SVG/AI/PDF)? The bull used in
   the transitions is traced from the 146 px PNG.
2. **Reviews:** copy a selection of Google reviews (with permission) or connect the Places API?
3. **Times:** the booking system's own settings offer Sunday lunch until 14:00 and evenings until 20:00–20:30; the
   site says Sunday lunch until 15:00. Which is right? local.ch lists Wednesday as open and Sunday until 16:30: update?
4. **Gaucho article:** "Churrasco gibt es streng genommen auch in Brasilien" — the context suggests Argentina (all
   three translators flagged it). The translations follow the German as written.
5. **Photos:** some photos look like stock (caipirinha, feijoada, the Brazilian dishes table, raw maminha and picanha
   on slate). Are they licensed for the new site? Are there photos of the other cuts (alcatra, presunto, costelinha,
   coxa, coração, grilled pineapple, grill cheese)?
6. **Forms:** which service should receive contact and group requests (Formspree, the host, bexio)?
7. **Translations:** English, Portuguese, French and Italian need a native review before launch.
8. **Booking parameters:** the hand-off relies on the system's search URL (`view=search&date&hourmin&people`); if the
   system is updated, this should be checked again.

## Skills used

`threejs-shaders`, `threejs-react-three-fiber` (decided against R3F: one imperative timeline with its own frame
loop, adaptive resolution and no per-frame React work), `gsap-scrolltrigger`, `animate` and `emil-design-eng`
(curves, durations, transform/opacity only, reduced motion, press feedback), `mobile-native` (dvh/svh, tap
highlight, 16 px inputs, touch-action, safe areas), `artifact-design` (preview contract), `accessibility-review`
(the audit above).
