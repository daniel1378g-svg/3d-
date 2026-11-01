# Pizzeria Giardino – hand-off

All phases of BRIEF.md are done (audit, data, static site, art direction and motion, 3D, hand-off); nothing was cut.
Where BRIEF.md and the original chat request disagreed, the owner of this work chose **"chat request + hybrid"**:
the chat request wins on conflicts, everything else in BRIEF.md is adopted (details under Decisions, D1).

## Preview URL

https://claude.ai/artifact/S27Pa8RS1tAp26DFqGvcyt – the claude.ai preview (proposal mode, permanent band «Proposta de
design · não é o site oficial», 3D shown as its poster). It is private until it is shared from its Share menu.
Built with `npm run build:artifact` → `artifact/`.

## What is built

**The site** (`src/`, Vite 6 + React 19 + TypeScript, pre-rendered to static HTML for every route and language):

- 15 routes × 4 languages (de-CH source, en, fr-CH, it-CH): home, Essen & Geniessen (food, drinks, desserts, kids),
  Kids, Gastgeber, Reservation (+ request status), Impressionen, Anreise, Kontakt, Partnerhotels, Jobs, Presse,
  Rundgang, Impressum, Datenschutz. The two German-only pages of the current site now exist in all four languages.
  Every old address is a route or a 301 (`content/redirects.md`).
- **Art direction:** ivory, olive (the logo's `#29381b` / `#a9ad81`), charcoal, brass, terracotta for the
  reservation action only. Cormorant Garamond and Manrope are self-hosted in 3 files, 218 KB. The restaurant's own
  48 photographs are served as AVIF + WebP, with one shared gentle grade.
- **Cinematic home:**
  - «La finestra»: the aerial photograph seen through an arched window that opens on scroll (desktop with a fine
    pointer).
  - The 3D olive branch in three.js, labelled «Illustration», with a poster fallback on mobile, without WebGL, with
    reduced motion and in the preview.
  - A scroll story with masked photographs, the kitchen and wine facts, the menu index, the hosts' quote lit word by
    word, the film (a poster, played only on request), a gallery teaser, the reservation flow, the visit section and
    the services.
- **The signature language switch (620 ms, measured):**
  - The logo glides across the header while a horizontal reveal brings in the header in the new language. The logo
    then settles exactly in place.
  - Page, section, scroll position, menu tab, search and filters, and the reservation draft are kept. Back and
    forward return to the previous language.
  - The globe sits top right on every viewport and lists Deutsch / English / Français / Italiano as real
    `<a hreflang lang>` links, so it works without JavaScript too.
  - With reduced motion it is a 150 ms crossfade.
- **Menus as HTML:**
  - Every line of the 4 PDFs (235 entries, 16 pages), with prices as «CHF 12.90».
  - A sticky category rail, search that ignores accents and apostrophes, and filters over printed markers only.
  - Size-matrix rows, footnotes as printed, and `?m=`, `?q=`, `?tag=`, `?category=` and `#item` deep links.
  - The PDFs remain a secondary link.
- **Reservation request:**
  - Steps: date → party size → time → seating wish → contact → review, with a persistent summary.
  - Closed dates are blocked: Wednesdays and 01.11.–17.12.2026; the first free date is Friday 18.12.2026. Times are
    15-minute steps inside the warm-kitchen hours, in Europe/Zurich time.
  - There is no floor plan and no availability display. Without JavaScript a plain form does the same job.
- **Proposal mode** (the default):
  - Nothing leaves the browser. «Per E-Mail senden» opens the visitor's e-mail program with the finished request to
    info@pizzeriagiardino.ch, next to the phone number and a copyable summary.
  - State shown: «Anfrage vorbereitet – bitte per E-Mail oder Telefon senden; eine Reservation gilt erst nach
    Bestätigung durch das Giardino».
  - The site is noindex, has no SEO tags, sets no cookies and makes no third-party requests.
- **Launch mode** (`npm run build:launch`):
  - Requests are stored on the restaurant's own server. The guest sees «Anfrage erhalten – wartet auf Bestätigung»
    with a reference and a status link.
  - The team confirms or declines in `/staff` (optionally with a note to the guest). Only then does the status page
    say «Bestätigt». This is verified end to end by `scripts/e2e-launch.cjs`.
  - Launch mode also enables canonical, hreflang, the sitemap and Restaurant/Menu JSON-LD built from verified facts.

**The server** (`server/`, Node 22, no npm dependencies):
- **Storage:** SQLite (`node:sqlite`), with requests deduplicated by idempotency key.
- **Staff view:** Basic auth, CSRF protection and an audit log of every state change.
- **Privacy:**
  - Personal data is blanked 30 days after the reservation date, and messages are deleted after 90 days.
  - Rate limits apply.
  - The optional webhook carries no personal data.
- **Serving:** strict CSP with hashes of the inline scripts, legacy and PDF-query redirects, and static `dist/`
  with gzip and caching.

**External integration dependencies (the genuine ones):**
1. **Hosting for launch:**
   - Node ≥ 22.13 behind HTTPS (reverse proxy or the host's TLS), and a persistent volume for `DATA_DIR`.
   - `STAFF_PASSWORD` must be set.
   - DNS for pizzeriagiardino.ch must point to the new host.
   - Alternative: a static host for `dist/` plus an API host for `/api` (`VITE_API_BASE`).
2. **Notifications:**
   - The server does not send e-mail.
   - The team sees new requests in `/staff`. `NOTIFY_WEBHOOK_URL` can ping an automation service (Make, Zapier, n8n,
     a Slack or Teams webhook, or the provider's mail relay); the ping carries no personal data.
   - The team answers guests by phone or e-mail themselves.
3. **Third-party content, loaded only after a click:**
   - OpenStreetMap (map), YouTube (the rro.ch video) and Matterport (the virtual tour).
   - Gift vouchers stay with felizzio (`/{lang}/pizzeriagiardino/shop`).
   - The labels link to Tripadvisor, Best of Swiss Gastro, Wellness Destination (Switzerland Tourism), WIR,
     IG Zöliakie, BABYfreundlich, Google, Facebook and Foursquare.
4. **The owners' own files for launch:**
   - The four menu PDFs, copied from `content/raw/pdf/`.
   - The film re-encoded at 720p (`npm run video` from the original in `media/originals/`).
5. **Legal:**
   - The Impressum needs the preview operator's name (placeholder «[Betreiber der Vorschau]», D20).
   - The launch drafts of Impressum and Datenschutz need a lawyer's review.

## Sources

| What | Where | Evidence file |
|---|---|---|
| All page texts, 4 languages (DE = master) | pizzeriagiardino.ch, every route × locale, 01.11.2026 | `content/raw/live/<lang>/<slug>.{html,txt}`, `content/raw/live/index.json`, `content/sources/site-text.json`, `content/sources/crawl.json` |
| Opening hours, Wednesday rest day, kitchen hours, autumn closure 01.11.–17.12.2026 | website portlets (all locales), entrance-door photo, localsearch/myls widget | `content/sources/myls/`, `content/hours.json`, `shared/schedule.ts` |
| Menus (food, drinks, kids, desserts) | the 4 PDFs linked on the site (`?action=get_file&id=13&resource_link_id=124/15a/158/159`) | `content/raw/pdf/*.pdf`, OCR and text layers in `content/sources/ocr/`, `content/menu.json`, `content/menu-review.md`, `scripts/check-menu.mjs` (235/235) |
| Photographs (48 + the Thermi graphic) and the logo | `templates/…/img/logo.png`, `data/Ressources/…` originals | `content/assets.json`, `content/raw/originals.sha256`, `content/sources/asset-manifest.json` |
| Badges / labels | the site's template folder, header and footer | `public/brand/labels/`, `media/labels/` |
| Facts (address, phone, e-mail, hosts, WIR, vouchers, hotels, press, jobs, tour) | Home, Kontakt, Impressum, Partnerhotels, Presse, Jobs, Rundgang pages; felizzio shop | `content/facts.json`, `src/content/restaurant.ts` |
| Link status | GET check of every external href, 01.11.2026 | `content/raw/links.csv` |
| Translations vs. the German source | live EN/FR/IT pages | `content/i18n/divergence-report.md`, `content/i18n/{de,en,fr,it}.json` (status per unit) |
| Content destinations | every live page, paragraph, photo, embed, file and link | `docs/content-inventory.md` |

## Asset inventory

All 48 photographs appear on the site (every one in the Impressionen gallery, 45 also elsewhere), plus the «Family
Destination / Thermi» graphic on the Kids page. Rights: © Pizzeria Giardino, published on pizzeriagiardino.ch, used
only for this proposal. The Impressum credits Christian Pfammatter, Visp, for photography. The 2012 and 2016 sets are
attributed to him; the 2025 photo and drone set and the film carry no credit. ⚠ marks photos with identifiable
people (3 show children): consent to confirm with the owners before launch. Full records, including sources and
checksums: `content/assets.json`.

| # | Photo (id) | Year | Original px | Shown on (new site) | Credit | Consent |
|---|---|---|---|---|---|---|
| 1 | `interior-bar` | 2012 | 1600×1066 | gallery (all photographs, with lightbox), home: GalleryTeaser, tour | Christian Pfammatter, Visp |  |
| 2 | `interior-room` | 2012 | 1600×1066 | gallery (all photographs, with lightbox), jobs | Christian Pfammatter, Visp |  |
| 3 | `entrance-bar` | 2012 | 1600×1066 | gallery (all photographs, with lightbox) | Christian Pfammatter, Visp |  |
| 4 | `interior-stone` | 2012 | 1600×1066 | gallery (all photographs, with lightbox), reserve | Christian Pfammatter, Visp |  |
| 5 | `detail-bottle-light` | 2012 | 3200×2400 | gallery (all photographs, with lightbox), home: Carta, home: Story | Christian Pfammatter, Visp |  |
| 6 | `detail-mini-bottles` | 2012 | 3200×2400 | gallery (all photographs, with lightbox), home: GalleryTeaser | Christian Pfammatter, Visp |  |
| 7 | `family-destination` | 2015 | 800×802 | home: Family, kids | uncredited |  |
| 8 | `terrace-flowers` | 2016 | 1600×825 | gallery (all photographs, with lightbox), home: GalleryTeaser | Christian Pfammatter, Visp | ⚠ consent to confirm with owners |
| 9 | `terrace-view` | 2016 | 1600×825 | JSON-LD image (launch mode), gallery (all photographs, with lightbox), home: Story | Christian Pfammatter, Visp | ⚠ consent to confirm with owners |
| 10 | `door-hours` | 2016 | 1600×893 | 404, gallery (all photographs, with lightbox), home: GalleryTeaser | Christian Pfammatter, Visp |  |
| 11 | `entrance-terrace` | 2016 | 1600×893 | gallery (all photographs, with lightbox), hosts | Christian Pfammatter, Visp |  |
| 12 | `pirate-masts` | 2016 | 1600×815 | gallery (all photographs, with lightbox), kids: pirate ship | Christian Pfammatter, Visp |  |
| 13 | `door-lettering` | 2016 | 1600×893 | gallery (all photographs, with lightbox), hosts | Christian Pfammatter, Visp |  |
| 14 | `terrace-roof` | 2016 | 1600×893 | gallery (all photographs, with lightbox) | Christian Pfammatter, Visp |  |
| 15 | `terrace-blooms` | 2016 | 1600×893 | gallery (all photographs, with lightbox) | Christian Pfammatter, Visp |  |
| 16 | `toy-cars` | 2016 | 1600×1066 | gallery (all photographs, with lightbox), kids: playroom | Christian Pfammatter, Visp |  |
| 17 | `pirate-kids` | 2016 | 1600×943 | gallery (all photographs, with lightbox), kids: 2016 archive | Christian Pfammatter, Visp | ⚠ consent to confirm with owners |
| 18 | `pirate-climb` | 2016 | 1600×988 | gallery (all photographs, with lightbox), kids: 2016 archive | Christian Pfammatter, Visp | ⚠ consent to confirm with owners |
| 19 | `pirate-slide` | 2016 | 1600×988 | gallery (all photographs, with lightbox), kids: 2016 archive | Christian Pfammatter, Visp | ⚠ consent to confirm with owners |
| 20 | `ship-mountains` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), kids: pirate ship | uncredited |  |
| 21 | `ship-slide` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), kids: pirate ship | uncredited |  |
| 22 | `ship-cliffs` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Family, home: Story, kids, kids: pirate ship, og:image | uncredited |  |
| 23 | `ship-above` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), kids: pirate ship | uncredited |  |
| 24 | `playroom-football` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), kids: playroom | uncredited |  |
| 25 | `playroom-climber` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Carta, home: Family, kids: playroom | uncredited |  |
| 26 | `playroom-mural` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), kids: playroom | uncredited |  |
| 27 | `playroom-ride-on` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Family, kids: playroom | uncredited |  |
| 28 | `dish-chicken-risotto` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey) | uncredited |  |
| 29 | `dish-spaghetti-bacon` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |
| 30 | `dessert-coupe` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey) | uncredited |  |
| 31 | `dessert-panna-cotta` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |
| 32 | `pizza-egg` | 2025 | 5742×3828 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |
| 33 | `starter-salmon` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey) | uncredited |  |
| 34 | `dish-prawns` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey) | uncredited |  |
| 35 | `dish-pesto` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |
| 36 | `pizza-ham-rocket` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: GalleryTeaser, home: Kitchen (dish journey) | uncredited |  |
| 37 | `aerial-village` | 2025 | 5272×3948 | gallery (all photographs, with lightbox), home: Hero, visit | uncredited |  |
| 38 | `aerial-front` | 2025 | 4024×3016 | gallery (all photographs, with lightbox), home: GalleryTeaser, visit | uncredited |  |
| 39 | `ship-portrait` | 2025 | 4480×6720 | gallery (all photographs, with lightbox), kids: pirate ship | uncredited |  |
| 40 | `playroom-slide` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), kids: playroom | uncredited |  |
| 41 | `hosts` | 2025 | 5945×3963 | gallery (all photographs, with lightbox), home: Hosts, hosts, press | uncredited | ⚠ consent to confirm with owners |
| 42 | `pizza-rocket` | 2025 | 6720×4480 | JSON-LD image (launch mode), gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey), og:image | uncredited |  |
| 43 | `detail-spaghetti` | 2025 | 3677×5515 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |
| 44 | `dish-schnitzel` | 2025 | 4480×6720 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |
| 45 | `dish-lasagne` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |
| 46 | `dish-penne` | 2025 | 6720×4480 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |
| 47 | `garden-view` | 2025 | 6452×4301 | JSON-LD image (launch mode), gallery (all photographs, with lightbox), home: GalleryTeaser, og:image, visit | uncredited |  |
| 48 | `aerial-terrace` | 2025 | 5272×3948 | gallery (all photographs, with lightbox), home: VisitSection | uncredited |  |
| 49 | `dish-penne-chili` | 2025 | 4301×6452 | gallery (all photographs, with lightbox), home: Kitchen (dish journey) | uncredited |  |

## Decisions

D1. **BRIEF.md vs. the chat request.** BRIEF.md was added to the branch during the build. The owner chose the chat
request where the two conflict, BRIEF.md everywhere else:

| Kept from the chat request | BRIEF.md instead |
|---|---|
| A real request workflow with storage and staff review, showing «Bestätigt» once the team has confirmed | Never render "confirmed"; a grep over `dist/` fails on it |
| Flow date → party → time → **seating wish** → contact → review | Three screens, no seating step |
| Client-side navigation after hydration, so the 620 ms logo switch can keep page, section and form state | No SPA router; a multi-page build with View Transitions |
| Richer scroll choreography (hero window, story, quote, film letterbox) | At most three set-pieces on the home page |

Consequences:
- The words «Bestätigt / confirmed / confirmée / confermata» are in the bundle, but they appear only on the
  launch-mode status page after a staff confirmation. The proposal build never renders them; QA checks the flow.
- The seating step offers only places that are published: inside, the sun terrace, near the playroom. It is labelled
  as a wish without guarantee.
- Page navigations are a 250 ms crossfade (View Transitions where supported), within BRIEF's 300 ms.

D2. **Proposal transport.** In proposal mode no guest request can reach a server nobody reads. It is a mailto
hand-off plus the phone and a copyable summary. The server is used in launch mode only.

D3. **Hours.** The website is the master: open 11:00–23:00, Wednesday closed, warm kitchen 11:30–15:00 and
17:00–21:30. The food PDF's meat-course hours (11.30–14.00 / 17.00–21.00) are not shown. This is logged in
menu-review.md and listed under Open questions.

D4. **Address.** Thermenstrasse 9 (footer, Impressum, localsearch). The Kontakt page and the Maps pin say
«Rathausstrasse 7»; this is unresolved and listed under Open questions.

D5. **Price format.** «CHF 12.90» in all four languages: decimal point, two decimals, narrow no-break space, one
formatter (`fmtChf`). This matches the printed menus. FR does not use a decimal comma.

D6. **Request times.** 15-minute steps inside the warm-kitchen hours. The last start time offered is 15 minutes
before the kitchen closes (14:45, 21:15). No last-seating rule is published, and the team confirms every request
anyway.

D7. **Party size.** 1–12 online; larger groups are sent to the phone. No cap is published, so this is an assumption.

D8. **Short notice.** For a same-day time less than 2 hours ahead, the form shows a hint to phone instead. It is a
hint, not a block.

D9. **No health data.** The wishes are high chair, stroller and celebration only (no allergy or wheelchair boxes).
The notes field says «Bitte keine Gesundheitsangaben; Allergien besprechen wir gerne persönlich». E-mail is optional
and the phone is required.

D10. **PDFs and film are linked, not rehosted.** In proposal mode they are linked on pizzeriagiardino.ch. The film
plays from the live site only after a second click, with its size stated (183 MB). In launch mode the owners' copies
are served from `/menus/` and `/video/`.

D11. **Unclear menu lines.** The printed figures are shown verbatim and flagged (`review: true`, menu-review.md),
instead of BRIEF's «Preis siehe Karte»: nothing is guessed, and nothing printed is hidden. 8 lines are flagged.

D12. **Menu markers.** Only printed markers are shown: «Hausgemacht» where printed, origin (CH/AUS), Dyhrberg fish,
VEGAN on three sorbets (dessert menu only; the kids leaflet doesn't print it), and «Mocca – enthält Haselnuss».
- No derived spicy or hazelnut markers.
- No dietary filters; the filters are «Hausgemacht», «Fleisch aus der Schweiz» and «Fisch von Dyhrberg».
- Gluten-free appears only as the IG Zöliakie label plus «fragen Sie unser Team».

D13. **Badges.** A «Labels & Partner» strip with image and link only, and no prose about awards.
- Dropped: Google+ (closed) and food4family.ch (no DNS). The Family Destination badge is commented out on the live
  site and is not shown.
- Kept although unverifiable: Best of Swiss Gastro (503), Tripadvisor (403 to bots), Facebook (login wall).

D14. **Swiss conventions.**
- German: «Reservation», ss, «guillemets».
- fr-CH: no space before ; ! ?, «» without inner spaces, «1er novembre».
- it-CH: «1° novembre».
- Prices are the same in all languages.

D15. **Fonts.** Cormorant Garamond and Manrope, from BRIEF's shortlist, replace the Bodoni Moda and Instrument Sans
of the first draft.
- 3 WOFF2 files with latin + latin-ext, 218 KB, and metric-matched fallbacks.
- Manrope is preloaded. Cormorant is preloaded with low priority so it doesn't compete with the LCP photograph.

D16. **3D budget.**
- The live scene loads only after `load` + idle, and only with WebGL 2, ≥ 4 cores, ≥ 4 GB device memory, no data
  saver, a fine pointer and a width of at least 1081 px.
- It renders at 1×, dropping to 0.5× when frames exceed 24 ms. Pointer parallax is at most 6° and scroll rotation
  at most 30°.
- It is labelled «Illustration», and the poster is the default everywhere else.

D17. **Motion on touch screens and with reduced motion.** Nothing is pinned or scrubbed on touch screens, and
GSAP/ScrollTrigger isn't even loaded there; it is only fetched for the language switch. Story chapters show their
own photographs. With reduced motion there is no intro, no reveals, no pins and the 3D is replaced by its poster.

D18. **Content never waits for JavaScript.**
- The intro is pure CSS from the first frame: at most 1.2 s, once per session.
- Scroll reveals start only once the app runs, and anything already on screen stays as it is.
- The app script starts after the first frame. Hydration is split into Suspense units (TBT/INP).
- Sections far below the fold use `content-visibility: auto`.

D19. **The header** shrinks from 88 to 64 px over the first 80 px using transforms only. After the hero it takes the
deep olive surface, and the logo then sits on its own ivory arch: it is never recoloured. On mobile a fixed bottom
bar keeps «Tisch reservieren» and the phone visible.

D20. **Legal.** In proposal mode the Impressum names the preview's operator as **«[Betreiber der Vorschau]» – to be
filled in**. It links the official Impressum and Datenschutz and shows the restaurant only as «Angaben des
Restaurants», with no indual credit and no «© Pizzeria Giardino». The Datenschutz is literally true for the proposal
build. Launch mode contains drafts for the restaurant, marked for legal review.

D21. **Restored and corrected wording.**
- Restored the dropped sentence «Wer hohe Qualität in gelebtem Ambiente schätzt…».
- Phone hours read «jeweils 10–23 Uhr», not «täglich», because Wednesday is closed.
- Removed added claims from FR/IT («expérience unique», «il posto ideale»).
- The divergence report lists every live-translation issue.

D22. **Images.**
- AVIF + WebP at 480/960/1440/2400, never wider than the source.
- The hero is capped at 1600 w on first paint, with AVIF searched to ≤ 180 KB (and ≤ 80 KB at 960 w for phones).
- On large screens the 2400 w version is fetched after idle.
- The badge images, logo and branch poster are AVIF too.

D23. **Not committed:**
- the full-size originals (`media/originals/`, 242 MB; `npm run fetch`, checksums in `content/raw/originals.sha256`)
- the 300-dpi PDF renders (≈ 106 MB; `bash scripts/render-pdfs.sh`)
- the film encodes (`npm run video`)
- `dist/` and `artifact/`, which are build outputs, as in the other projects of this repository

## Open questions for the owners

1. **Address:** Thermenstrasse 9 or Rathausstrasse 7 (Kontakt page, Maps pin)?
2. **Meat dishes:** are they still served only 11.30–14.00 and 17.00–21.00, as the food menu prints? Should that be
   shown?
3. **Unclear menu lines:**
   - Gemischter Salat vom Büffet 12.00 / 21.50: which sizes?
   - Hugo Sprizz / Grapefr'izz: is 11.50 the price of each?
   - Sirup Kids 1.00 / 3.00: please confirm.
   - Kaffee GIARDINO and Alpen Glüh: descriptions?
   - Ice Tee and Rivella: other sizes?
4. **Vegan:** are the kids-menu sorbets also vegan?
5. **Gluten-free:** which dishes can be served gluten-free, and is the IG Zöliakie certification from 2014 still
   valid?
6. **Online request form:** is a cap of 12 people and the last start time 15 minutes before the kitchen closes right?
   Who answers requests, and how fast?
7. **Consent:** the 6 photos with identifiable people (3 with children); see the asset inventory.
8. **Photographer credit:** who shot the 2025 photo and drone set and the film? Should they be credited?
9. **Labels:** are Best of Swiss Gastro, Wellness Destination and the 2014 IG Zöliakie logo still current? Should the
   «Family Destination» badge (commented out on the live site) return?
10. **Jobs:** is the hoteljob-schweiz.de listing still open?
11. **Launch:** hosting, the domain, `STAFF_PASSWORD`, the notification channel, and a lawyer for the Impressum and
    Datenschutz drafts.

## Verification report

```
Content: pages preserved 15/15 routes × 4 locales (14/14 live content routes, the 2 German-only pages now in all 4 languages, 1 new status route); photographs placed 48/48; paragraphs kept/merged/dropped 36/9/3 (+12 replaced by an equivalent feature) (see docs/content-inventory.md)
Menus: PDF pages imported 16/16; items 51 food / 106 drinks / 8 kids dishes + 9 ice items + 13 flavours / 27 dessert; spot-check list 18/18 exact; unresolved 8 lines, shown as printed and flagged (content/menu-review.md); machine check 235/235 entries against OCR/text layer (npm run check)
Languages: i18n keys de/en/fr/it 519/519/519/519 (0 missing, check-i18n 0 errors); runtime scan for German on en/fr/it pages: 0 hits (45 pages); divergence rows 46 (content/i18n/divergence-report.md)
Language switch: 560–640 ms measured 628 ms (logo flight 618 ms); CLS during switch 0.00 (0.002 including the input window); state preserved (route, category, search, reservation) ✔; reduced-motion crossfade ✔ (139 ms, no logo flight)
Reservation: closed-date blocking (Wed + 01.11–17.12.2026) ✔ (first free date 2026-12-18); "confirmed" grep over dist: by decision D1 the word exists for the launch-mode status page – never rendered in proposal mode (QA flow check: 0 hits); mailto/tel fallback ✔; launch workflow pending → staff confirm → «Bestätigt» ✔ (scripts/e2e-launch.cjs)
Hours: closure notice shown today ✔ (every page, also without JavaScript); status line computed in Europe/Zurich ✔ (tests/schedule.test.ts)
Proposal framing: band on every page + artifact ✔; noindex ✔ (prerender guard); third-party requests: 0; cookies: 0
Performance (conditions: Lighthouse 13.6, Playwright Chromium 1243 headless without GPU (3D measured as its poster), mobile emulation 412×823 @1.75x, 4× CPU slowdown, Slow 4G; median of 3; dist/ served by server/):
  Lighthouse default (simulated throttling, Lantern): /de LCP 3.53 s ✘, CLS 0.00 ✔, TBT 143 ms ✔; /de/essen-geniessen LCP 0.90 s ✔, CLS 0.00 ✔, TBT 71 ms ✔; /de/reservation LCP 3.16 s ✘, CLS 0.00 ✔, TBT 77 ms ✔
  applied throttling (devtools method, same 4× CPU / Slow 4G): /de LCP 2.46 s ✔, CLS 0.00 ✔, TBT 270 ms ✘; /de/essen-geniessen LCP 1.90 s ✔, CLS 0.00 ✔, TBT 185 ms ✔; /de/reservation LCP 2.13 s ✔, CLS 0.00 ✔, TBT 135 ms ✔
  why the two differ: Lantern treats every request and CPU task that preceded the paint in its unthrottled localhost trace (both fonts, the app script) as dependencies of the LCP photograph; under real throttling the photograph paints before the app script even starts (it is injected after the first frame). The remaining levers are fewer font bytes (BRIEF fixes latin + latin-ext in ≤ 4 files) or a smaller hero; TBT 270 ms under applied throttling on /de is the hydration of the long home page (split into Suspense units)
  first-route JS on /de: 123 KB gz before hydration (index + Home + Img + Flow + Film chunks); GSAP 46 KB gz only on desktops with a fine pointer, after idle; 3D chunk 136 KB gz (desktop only, after load + idle)
Accessibility: axe critical/serious 0 on 60 routes (WCAG 2.0/2.1/2.2 A+AA rules, all other impacts 0); Lighthouse accessibility 100 on the 3 measured routes; keyboard pass ✔; focus visible ✔
Links: external 61 checked, 46 ok, 26 dropped (Google+, food4family.ch, the C&A article, the indual agency links and the old privacy-boilerplate links), 6 unverifiable (Best of Swiss Gastro 503, Tripadvisor ×2 403, Facebook ×2 login wall, aboutads 429), 4 dead (food4family.ch, wir.ch/en/, 2 boilerplate links) – content/raw/links.csv
Screenshots: 360×800, 768×1024, 1440×900 for every route per locale in content/qa/ ✔ (180 files)
Tests: npm test 53/53 pass; npm run check: i18n 0 errors, menus 235/235
```

## Not run

- **Real devices:** not tested on physical phones, tablets, Safari or Firefox. All browser QA ran in Playwright
  Chromium, plus one emulated touch tablet; the language-switch animation also has no fallback test on Safari.
- **Live 3D render:**
  - It was not measured on a GPU. Headless Chromium uses SwiftShader, so the live scene's frame time on real
    hardware is untested; the adaptive resolution is the safeguard.
  - Lighthouse measured the poster path.
- **Field data (CrUX/INP):** none exists for an unpublished site. TBT is the lab proxy.
- **E-mail delivery of the mailto hand-off:** depends on the visitor's mail program and was not executed. The link and
  its prefilled text were checked.
- **Staff notifications:** not exercised against a real webhook service; the server's own tests cover the payload.
- **Accessibility:** no screen-reader walk-through with NVDA, JAWS or VoiceOver. axe and the keyboard checks ran.
- **Load:** no load test of the server.
- **Link check:** only Tripadvisor, Facebook and Best of Swiss Gastro remain unverified; they block bots or were down
  on the audit day.
