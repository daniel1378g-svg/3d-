# Content inventory – pizzeriagiardino.ch → new site

Every page, paragraph, photograph, embed, file and link of the live site is listed below, with where it goes in the new site.

**Sources**
- Captures of all live routes (2026-11-01): `content/raw/live/<lang>/<slug>.{html,txt}`; index with status codes: `content/raw/live/index.json`.
- Link check: `content/raw/links.csv`.
- Photographs: `content/assets.json`.
- Menus: `content/menu.json` and `content/menu-review.md`.

German is the master text. The English, French and Italian pages are translations of the same paragraphs and follow the German destinations; where they differ in substance, `content/i18n/divergence-report.md` records it.

**Legend**

| Status | Meaning |
|---|---|
| **kept** | the text or element is on the new site, verbatim or with spelling fixes only |
| **merged** | it was combined with other material or split across sections; the wording is preserved |
| **replaced** | the same function, delivered differently (e.g. computed hours instead of a widget) |
| **dropped** | removed, with the reason given |

Translation keys refer to `src/i18n/de.ts`, data to `src/content/*.ts` and `shared/schedule.ts`.

## 1. Pages

| Live page | de | en | fr | it | New site | Status |
|---|---|---|---|---|---|---|
| Home | /de | /en | /fr | /it | same paths; home journey (hero, story, kitchen, menu teaser, hosts, family, film, gallery, reservation, visit, labels) | kept |
| Essen & Geniessen | /de/essen-geniessen | /en/eat-enjoy | /fr/manger-et-savourer | /it/mangia-e-divertiti | same paths; all four menus as searchable HTML with tabs (food, drinks, desserts, kids) | kept |
| Kids | /de/kids | /en/kids | /fr/enfants | /it/kids | same paths; copy, playroom, pirate ship, the kids menu | kept |
| Gastgeber | /de/gastgeber | /en/host | /fr/hotes | /it/la-casa | same paths | kept |
| Reservation | /de/reservation | /en/bookings | /fr/reservation | /it/prenotazione | same paths; phone text plus the reservation request flow (proposal mode: e-mail/phone hand-off; launch mode: server with staff review) | kept |
| Partnerhotels | /de/partnerhotels | /en/partner-hotels | /fr/hotel-partner | /it/partner-albergos | same paths for de/en; fr → /fr/hotels-partenaires, it → /it/alberghi-partner (301) | kept |
| Impressum | /de/impressum | /en/imprint | /fr/empreinte | /it/impronta | same paths for de/en; fr → /fr/mentions-legales, it → /it/note-legali (301). Proposal-mode content per BRIEF §12 | kept |
| Datenschutz | /de/datenschutz | – | – | – | four locales: /de/datenschutz, /en/privacy, /fr/protection-des-donnees, /it/protezione-dei-dati; new text that describes only the new build | replaced |
| Jobs | /de/allgemein/jobs | /en/meta/jobs | /fr/meta/emplois | /it/meta/lavoro | same paths | kept |
| Anreise | /de/allgemein/anreise | /en/meta/arrival | /fr/meta/arrivee | /it/meta/come-arrivare | same paths; address, hours, click-to-load map, route links | kept |
| Rundgang | /de/allgemein/rundgang | /en/meta/virtual-tour | /fr/meta/tour-virtuel | /it/meta/tour-virtuale | same paths; Matterport behind a click-to-load facade | kept |
| Impressionen | /de/allgemein/impressionen | – | – | – | four locales: /de/allgemein/impressionen, /en/meta/impressions, /fr/meta/impressions, /it/meta/impressioni; all 48 photographs plus the film | kept |
| Presse | /de/allgemein/presse | /en/meta/press | /fr/meta/presse | /it/meta/stampa | same paths; both press items in every locale | kept |
| Kontakt | /de/allgemein/kontakt | /en/meta/contact | /fr/meta/contact | /it/meta/contatto | same paths; same form fields | kept |
| Leukerbad Therme (menu item) | /de/allgemein/leukerbad-therme | /en/meta/… | /fr/meta/… | /it/meta/… | 301 → https://www.leukerbad.ch/therme (the live target leukerbad-therme.ch answers HTTP 400) | replaced |
| Menu-group parents | /de/allgemein | /en/meta | /fr/meta | /it/meta | 301 → language home (as today) | kept |
| Bare domain | / |  |  |  | remembered language, else browser language, else /de (live: 301 → /de) | kept |
| (new) Reservation status | – | – | – | – | /de/reservation/status, /en/bookings/status, /fr/reservation/statut, /it/prenotazione/stato (personal, noindex) | new |

**Count**
- **Live:** 14 content routes in 52 live pages (12 routes in 4 locales, 2 in German only), 4 «Leukerbad Therme» redirect pages, 4 menu-group parents and the bare domain; 59 addresses captured in total.
- **New site:** all 14 content routes are preserved, and the 2 German-only pages now exist in all four locales. Together with the new status page that makes **15 routes × 4 locales = 60 pages**.

## 2. Paragraphs (German master)

### Site-wide (every page)

| # | Element | Live text (DE) | New site | Status |
|---|---|---|---|---|
| S1 | Title tag | «Pizzeria Giardino Leukerbad \| Pizza, Pasta, Penne, Risotto, Restaurant, Essen, Familien, Kinder, Glutenfreie Pizzeria, Glutenfreie Pizzeria im Wallis \| Leukerbad \| <page H1>» – German on every locale | per-locale titles of 60 characters or fewer (`meta.titles.*`); no keyword list; no gluten-free claim (no source supports it) | replaced |
| S2 | Meta description | «Treten Sie ein und erleben Sie ein Stück Italien inmitten unserem prächtigen Bergpanorama. Im Sommer sind wir der Treffpunk für alle. Wir bieten eine gemütliche, sonnenverwöhnte Terrasse an, von welcher Sie freie Sicht auf die Gemmi und Torrent haben.» – the same on every page and locale | `meta.descriptions.home` (grammar fixed); «Im Sommer … Treffpunkt für alle» → `home.story.chapters.1.body`; per-page descriptions for the other pages | merged |
| S3 | Sidebar: location | «Im Zentrum von Leukerbad» / «Sie finden uns an der Thermenstrasse 9 in Leukerbad. Zum Lageplan» | `home.visit.title`, `home.visit.body`, Anreise page; «Zum Lageplan» → link to the Anreise page and map | kept |
| S4 | Sidebar: reservation teaser | «Tischreservation» / «Reservieren Sie sich jetzt einen Tisch in der Pizzeria Giardino.» | persistent reservation action (header button on desktop, fixed bottom bar on mobile) and the home section `home.reserve.*` | replaced |
| S5 | Sidebar: opening hours | «Unsere Öffnungszeiten», localsearch widget (daily 11:00–23:00), «Mittwoch Ruhetag», «Spezielle Öffnungszeiten», «Warme Küche von 11:30 bis 15:00 Uhr und 17:00 bis 21:30 Uhr.» | hours list and computed open/closed status from `shared/schedule.ts` (`hours.*`, `status.*`); no third-party widget | replaced |
| S6 | Sidebar: closure | «BETRIEBSFERIEN HERBST» / «Wir haben vom 01. November 2026 bis am 17. Dezember 2026 Betriebsferien und freuen uns Sie am Freitag den 18. Dezember 2026 wieder zu begrüßen» | `hours.closureText` (Swiss spelling) and a closure notice shown while the closure lasts; reservation calendar blocks the dates | kept |
| S7 | Header: language links | «Deutsch Français English Italiano» | globe selector, top right on every viewport, same four languages and order | replaced |
| S8 | Header: navigation | Essen & Geniessen · Kids · Gastgeber · Reservation · Partnerhotels · Datenschutz · Impressum · Allgemein (Home, Jobs, Anreise, Rundgang, Impressionen, Leukerbad Therme, Presse, Kontakt) | main navigation and footer; every target kept, «Allgemein/Meta» group label removed, Leukerbad Therme → leukerbad.ch/therme | kept |
| S9 | Header: badges | Tripadvisor «Ruhmeshalle» image, «Best of Swiss Gastro – Activity» image, «Gutscheine» link | «Labels & Partner» strip (image + link only) and the voucher link (felizzio) | merged |
| S10 | Footer: address block | «Pizzeria Giardino · Pascal & Anja Loretan · Thermenstrasse 9 · 3954 Leukerbad · Tel. +41 (0)27 530 05 84 · info@pizzeriagiardino.ch» | footer contact block (`RESTAURANT`) | kept |
| S11 | Footer: copyright and agency | «© 2026 \| webdesign, webentwicklung und hosting powered by indual \| Datenschutz \| Impressum» | legal links kept. Proposal mode shows «Designvorschlag – nicht die offizielle Website» instead of the © line. The indual credit is omitted (BRIEF §12). | merged |
| S12 | Footer: badges | Wellness Destination, WIR, Food for Family, TripAdvisor, Zöliakie, Google+, Google, Baby Friendly, Facebook, Foursquare | «Labels & Partner» strip with 10 labels (incl. the two header badges); Google+ and food4family.ch dropped (service closed, domain gone) | merged |

### Home – `/de`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P1 | H1 «Giardino - die aparte Pizzeria in Leukerbad» | `home.story.title` | kept |
| P2 | «Bella Italia im Herzen des Bäderdorfs. Die Pizzeria Giardino, umrahmt von einer imposanten Bergkulisse, ist ein Erlebnis für Freunde der italienischen Küche. Und für Familien mit Kindern gar ein echter Geheimtipp. Allein schon des Innen- und Aussenspielplatzes wegen.» | split: hero headline (`home.hero.title1–3`), `home.story.lead`, `home.hero.outro`, `footer.claim`, `home.story.chapters.2.body` (families) | merged |
| P3 | «Stylische Eleganz spielt raffiniert mit dem heimeligen Touch von Holz und gibt dem Giardino mit viel Liebe zum Detail seinen einzigartigen Charakter.» | `home.story.chapters.0.body` | kept |
| P4 | «Die sonnenverwöhnte Terrasse mit freier Sicht auf die Gemmi und Torrent macht den italienischen Traum perfekt.» | `home.story.chapters.1.body` (plus «Im Sommer ist sie der Treffpunkt für alle» from the meta description); `home.hero.lead` | kept |
| P5 | Photo slider (11 photographs) | hero, story frames, kitchen journey and gallery (see §3) | merged |
| P6 | Self-hosted film, 120 s, 2560×1440, 183 MB | film band with the poster frame; the player opens only on request. In proposal mode it streams the original from pizzeriagiardino.ch after an explicit click (not rehosted). No autoplay. | replaced |

### Essen & Geniessen – `/de/essen-geniessen`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P7 | H1 «Kulinarische Gaumenfreuden» | `menu.title` | kept |
| P8 | «Marktfrisch, authentisch, genussvoll. Darauf achten wir nicht nur bei der Zubereitung, sondern bereits beim Einkauf. Mit Leidenschaft und Kreativität zaubern wir italienische und traditionelle Köstlichkeiten auf den Tisch. Unsere vielfältige Auswahl sowie die spezielle Kinderspeisekarte lassen grosse und kleine Gourmetherzen höherschlagen.» | `home.kitchen.title` + `home.kitchen.body`; first sentence also opens `menu.lead` | merged |
| P9 | «Wer hohe Qualität in gelebtem Ambiente schätzt, ist im Giardino in Leukerbad am richtigen Ort.» | not on the new site | dropped (gap: no reason beyond editing; suggest restoring it in `menu.lead` or the kitchen section) |
| P10 | «Vorzügliche Walliser Weine aus der Region und auserlesene italienische Tropfen, die wir auch glasweise anbieten, runden das Genussbouquet ab.» | `home.kitchen.facts.2.body` | kept |
| P11 | «Als 100-Prozent-WIR-Betrieb akzeptieren wir auch gerne WIR-Geld.» | `home.kitchen.wir`, `home.services.wir.body` | kept |
| P12 | Four PDF links (Getraenkekarte.pdf, Speisekarte-Menu.pdf, Speisekarte Kids.pdf, Dessertkarte.PDF) | menus transcribed to HTML (235 entries); «Karte als PDF» links to the live PDF URLs as a secondary action | replaced |
| P13 | 9 photographs | kitchen journey, menu-teaser peek photos, gallery (see §3) | kept |

### Kids – `/de/kids`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P14 | H1 «Ein Restaurant ohne Kinderlachen ist nur ein Lokal ...» | `kids.title`, `home.family.title` | kept |
| P15 | «Das Giardino in Leukerbad aber ist ein Paradies für Kinder. Ihr seid bei uns die Grössten. Auf unserer extra kinderfreundlichen Speisekarte findet ihr verschiedene leckere Sachen.» | `kids.p1` | kept |
| P16 | «Aber das ist längst noch nicht alles. Damit ihr nicht stundenlang am Tisch sitzen müsst, haben wir für euch ein Spielzimmer zum Austoben eingerichtet. Und im Sommer dürft ihr euch auf dem grossen Aussenspielplatz tummeln.» | `kids.p2` | kept |
| P17 | «Pst! Wir verraten euch auch noch ein Geheimnis: Seid Sommer 2016 steht dort ein riesiges Piratenschiff, das ihr erobern könnt.» | `kids.secret` («Seit»), `home.family.body` | kept |
| P18 | 11 photographs + Thermi «Family Destination» graphic | playroom, pirate ship and 2016 archive grids; graphic beside `kids.familyDestination` | kept |

### Gastgeber – `/de/gastgeber`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P19 | H1 «Gast sein ist gut - sich zu Hause fühlen noch besser!» | `hostsPage.title`, `home.hosts.title` | kept |
| P20 | «Wir, Pascal und Anja Loretan, setzen die gelebte und geliebte Gastgebertradition … seit 2012 in zweiter Generation fort. … Janis und Niklas … ersten Gehversuche im Service gemacht.» | `hostsPage.p1` | kept |
| P21 | «Wenn unsere Gäste glücklich und zufrieden sind, sind wir es auch!» Diese Philosophie … Zwei unserer Service-Feen und Küchen-Kobolde … | quote → `hostsPage.quote` / `home.hosts.quote` (pull quote); rest → `hostsPage.p2` | merged |
| P22 | «Unsere Gastgeberherzen schlagen im Takt. Dürfen wir Sie davon überzeugen?» | `hostsPage.p3` | kept |
| P23 | «Wir freuen uns auf Ihren Besuch!» | `hostsPage.p4` | kept |
| P24 | Signature «Pascal und Anja Loretan & Team» | `hostsPage.signature`, `home.hosts.signature` | kept |
| P25 | 3 photographs | page head, portrait, door lettering (see §3) | kept |

### Reservation – `/de/reservation`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P26 | H1 «Tischreservation» | `reserve.title` «Tisch reservieren» | replaced |
| P27 | «Gerne stehen wir Ihnen jeweils von 10 bis 23 Uhr unter der Telefonnummer +41 27 530 05 84 zur Verfügung.» | `reserve.phoneBody`, always visible beside the request flow | kept |
| P28 | 2 photographs | interior-stone on the page; entrance-bar in the gallery | kept |

### Partnerhotels – `/de/partnerhotels`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P29 | Hotel Heilquelle – Thermenstrasse 9, 3954 Leukerbad, +41 27 470 22 22, info@heilquelle.ch, www.heilquelle.ch | `HOTELS[0]` | kept |
| P30 | Hotel Paradis – Kunibergstrasse 14, 3954 Leukerbad, +41 27 470 12 33, info@hotel-paradis.ch, www.hotel-paradis.ch | `HOTELS[1]` | kept |
| P31 | Hotel Viktoria – Pfolongstutz 2, CH-3954 Leukerbad, Tel. +41 (0)27 470 16 12, Fax +41 (0)27 470 36 12, hotel@viktoria-leukerbad.ch, https://viktoria-leukerbad.ch | `HOTELS[2]` (fax kept) | kept |

### Impressum – `/de/impressum`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P32 | «Verantwortlich für die Inhalte» + Pizzeria Giardino, Pascal & Anja Loretan, Thermenstrasse 9, 3954 Leukerbad, Tel., E-Mail | proposal mode: «Angaben des Restaurants» plus links to the official Impressum and Datenschutz; launch mode: «Verantwortlich für die Inhalte» (draft for review) | kept |
| P33 | «Webdesign, Webentwicklung und Hosting – indual GmbH, Grundbielstrasse 1, 3902 Brig-Glis – Professionelles Responsive Webdesign aus dem Wallis» | omitted: the agency did not make the new site (BRIEF §12) | dropped |
| P34 | «Fotografie – Christian Pfammatter, 3930 Visp» | `imprint.photography` (+ «laut Impressum der bisherigen Website») and gallery credit | kept |

### Datenschutz – `/de/datenschutz` (German only)

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P35 | «Datenschutzerklärung und Einwilligung (DSGVO)» – 142 lines of agency boilerplate: analytics, cookies, Google, Facebook, Pinterest, Instagram, Twitter, TrustYou, privacy-shield links; indual GmbH named as the responsible body | not copied: it describes tools the new site does not use (BRIEF §2, §12). Replaced by `privacy.proposalSections` (proposal mode: no cookies, no analytics, no server forms, self-hosted fonts, local storage only) and `privacy.sections` (launch draft: form endpoint, hosting logs, retention), in four languages | replaced |

### Jobs – `/de/allgemein/jobs`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P36 | «Zur Unterstützung unseres Teams suchen wir eine kompetente und belastbare Servicemitarbeiterin sowie eine Küchenhilfe oder einen Hilfskoch: www.hoteljob-schweiz.de» | `JOBS.roles` + `jobsPage.listing` link | kept |
| P37 | «Senden Sie Ihre Bewerbung an: info@pizzeriagiardino.ch» | `jobsPage.apply` + e-mail link | kept |
| P38 | «powered by Hoteljob-Schweiz / Pizzeria Giardino Leukerbad» (embedded job widget) | link to the listing on hoteljob-schweiz.de (no third-party widget) | replaced |

### Anreise – `/de/allgemein/anreise`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P39 | Address block (Pascal & Anja Loretan, Thermenstrasse 9, 3954 Leukerbad, Tel., E-Mail) | Anreise page contact block | kept |
| P40 | Google Maps JavaScript embed (marker 46.3793496, 7.6269692, marker text «Rathausstrasse 7»; exposed API key) | click-to-load OpenStreetMap, plus links to Google Maps and Apple Maps (Thermenstrasse 9); the key is not reused | replaced |

### Rundgang – `/de/allgemein/rundgang`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P41 | Matterport iframe (m=W51AKaLxmne) | two-click facade, then the same Matterport tour in the locale's language | replaced |
| P42 | «Größere Kartenansicht» link | `tourPage.open` «Grössere Ansicht in neuem Tab» | kept |

### Impressionen – `/de/allgemein/impressionen`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P43 | 24 photographs (with duplicates) | gallery of all 48 photographs with filters and a lightbox, plus the film band and a tour teaser | merged |

### Presse – `/de/allgemein/presse`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P44 | «Besuch von rro.ch in der Pizzeria Giardino» + «zum Video» (YouTube) | `PRESS[0]` + YouTube behind a click-to-load facade (youtube-nocookie) | kept |
| P45 | «Kinderfreundliche Restaurants» (C&A) + quote «Sonnenterrasse und Kinderparadies zu gleich – …» (2 paragraphs) | `PRESS[1]` title and quote («zugleich»), in all four locales | kept |
| P46 | «Mehr lesen» link to the C&A article | dropped: the article was taken down and the address now lands on a general shop page; `pressPage.unavailable` | dropped |

### Kontakt – `/de/allgemein/kontakt`

| # | Live (DE) | New site | Status |
|---|---|---|---|
| P47 | Address block with «Rathausstrasse 7» | Thermenstrasse 9 (as footer, Impressum and localsearch); the discrepancy is an open question | replaced |
| P48 | Contact form: Ihre Nachricht*, Vorname / Name*, Adresse, PLZ / Ort, Telefon, E-Mail*, «Ich habe die Datenschutzerklärung gelesen und akzeptiert.»* | same fields (`contactPage.*`); proposal mode prepares an e-mail (nothing is sent by the site); launch mode posts to the server | kept |

**Paragraphs and blocks:** 60 units (12 site-wide, 48 page-level).

| Status | Units |
|---|---|
| kept | 36 |
| merged | 9 |
| replaced | 12 |
| dropped | 3 |

**Dropped units:** the agency credit in the Impressum, the C&A «Mehr lesen» link, and one sentence on the menu page («Wer hohe Qualität in gelebtem Ambiente schätzt, ist im Giardino in Leukerbad am richtigen Ort.»). That sentence has no reason to stay out and is flagged for restoring.

The Datenschutz boilerplate counts as one replaced unit, although it has 142 lines.

## 3. Photographs (48) and the Thermi graphic

The originals are in `media/originals/` (gitignored; re-downloaded by `npm run fetch`), with checksums in `content/raw/originals.sha256`.

Four live uploads are byte-identical duplicates and appear once:
- 1474899873-5DSR6219 = door-lettering
- 1474898038-5DSR6265-HDR = terrace-view
- 1750943528 = ship-cliffs
- 1750944045 = hosts

| # | id | Original | Year | Pixels | Live page(s) | New site | Consent |
|---|---|---|---|---|---|---|---|
| 1 | `interior-bar` | `1355477987-_J7A0250_1_2_3_4_5_fused.jpg` | 2012 | 1600×1066 | de/allgemein/impressionen | gallery (all photographs, with lightbox), home: GalleryTeaser, tour |  |
| 2 | `interior-room` | `1355478039-_J7A0132_3_4_5_7_8_9_fused.jpg` | 2012 | 1600×1066 | de/allgemein/impressionen | gallery (all photographs, with lightbox), jobs |  |
| 3 | `entrance-bar` | `1355506397-_J7A0168_69_70_71_72_73_74_fused.jpg` | 2012 | 1600×1066 | de/reservation, en/bookings, fr/reservation, it/prenotazione | gallery (all photographs, with lightbox) |  |
| 4 | `interior-stone` | `1355506659-_J7A0256_57_58_59_60_fused.jpg` | 2012 | 1600×1066 | de/reservation, en/bookings, fr/reservation, it/prenotazione, de/allgemein/impressionen | gallery (all photographs, with lightbox), reserve |  |
| 5 | `detail-bottle-light` | `_src29f786f67147c22604…355416127.jpeg` | 2012 | 3200×2400 | site background (de, en, fr, it) | gallery (all photographs, with lightbox), home: Carta, home: Story |  |
| 6 | `detail-mini-bottles` | `_srcc4a4a0297bcc29a9ad…355416005.jpeg` | 2012 | 3200×2400 | site background (de, en, fr, it) | gallery (all photographs, with lightbox), home: GalleryTeaser |  |
| 7 | `family-destination` | `1450684058-family.png` | 2015 | 800×802 | de/kids, en/kids, fr/enfants, it/kids | home: Family, kids |  |
| 8 | `terrace-flowers` | `1474895677-5DSR6281.jpg` | 2016 | 1600×825 | de, en, fr, it | gallery (all photographs, with lightbox), home: GalleryTeaser | consent to confirm with owners |
| 9 | `terrace-view` | `1474895684-5DSR6265-HDR.jpg` | 2016 | 1600×825 | de, en, fr, it, de/allgemein/impressionen | JSON-LD image (launch mode), gallery (all photographs, with lightbox), home: Story | consent to confirm with owners |
| 10 | `door-hours` | `1474895692-5DSR6223.jpg` | 2016 | 1600×893 | de, en, fr, it | 404, gallery (all photographs, with lightbox), home: GalleryTeaser |  |
| 11 | `entrance-terrace` | `1474895697-5DSR6211.jpg` | 2016 | 1600×893 | de, en, fr, it, de/gastgeber, en/host, fr/hotes, it/la-casa | gallery (all photographs, with lightbox), hosts |  |
| 12 | `pirate-masts` | `1474898022-5DSR6307.jpg` | 2016 | 1600×815 | de/allgemein/impressionen | gallery (all photographs, with lightbox), kids: pirate ship |  |
| 13 | `door-lettering` | `1474898047-5DSR6219.jpg` | 2016 | 1600×893 | de/gastgeber, en/host, fr/hotes, it/la-casa, de/allgemein/impressionen | gallery (all photographs, with lightbox), hosts |  |
| 14 | `terrace-roof` | `1474898052-5DSR6200.jpg` | 2016 | 1600×893 | de/allgemein/impressionen | gallery (all photographs, with lightbox) |  |
| 15 | `terrace-blooms` | `1474898055-5DSR6195.jpg` | 2016 | 1600×893 | de/allgemein/impressionen | gallery (all photographs, with lightbox) |  |
| 16 | `toy-cars` | `1474898106-5DSR5947.jpg` | 2016 | 1600×1066 | de/allgemein/impressionen | gallery (all photographs, with lightbox), kids: playroom |  |
| 17 | `pirate-kids` | `1474898970-5DSR6139.jpg` | 2016 | 1600×943 | de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), kids: 2016 archive | consent to confirm with owners |
| 18 | `pirate-climb` | `1474898973-5DSR6113.jpg` | 2016 | 1600×988 | de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), kids: 2016 archive | consent to confirm with owners |
| 19 | `pirate-slide` | `1474898981-5DSR6101.jpg` | 2016 | 1600×988 | de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), kids: 2016 archive | consent to confirm with owners |
| 20 | `ship-mountains` | `1750941286-2025-06-20_giardino-8940_2048px.jpg` | 2025 | 6720×4480 | de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), kids: pirate ship |  |
| 21 | `ship-slide` | `1750941305-2025-06-20_giardino-8933_2048px.jpg` | 2025 | 6720×4480 | de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), kids: pirate ship |  |
| 22 | `ship-cliffs` | `1750941318-2025-06-20_giardino-8931_2048px.jpg` | 2025 | 6720×4480 | de/kids, en/kids, fr/enfants, it/kids, de/allgemein/impressionen | gallery (all photographs, with lightbox), home: Family, home: Story, kids, kids: pirate ship, og:image |  |
| 23 | `ship-above` | `1750941350-2025-06-20_…591_2048px.jpg` | 2025 | 6720×4480 | de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), kids: pirate ship |  |
| 24 | `playroom-football` | `1750941424-2025-06-20_giardino-8895_2048px.jpg` | 2025 | 6720×4480 | de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), kids: playroom |  |
| 25 | `playroom-climber` | `1750941448-2025-06-20_giardino-8920_2048px.jpg` | 2025 | 6720×4480 | de, en, fr, it, de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), home: Carta, home: Family, kids: playroom |  |
| 26 | `playroom-mural` | `1750941455-2025-06-20_giardino-8921_2048px.jpg` | 2025 | 6720×4480 | de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), kids: playroom |  |
| 27 | `playroom-ride-on` | `1750941506-2025-06-20_giardino-8899_2048px.jpg` | 2025 | 6720×4480 | de, en, fr, it, de/kids, en/kids, fr/enfants, it/kids | gallery (all photographs, with lightbox), home: Family, kids: playroom |  |
| 28 | `dish-chicken-risotto` | `1750941770-2025-06-20_…347_2048px.jpg` | 2025 | 6720×4480 | de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey) |  |
| 29 | `dish-spaghetti-bacon` | `1750941771-2025-06-20_…361_2048px.jpg` | 2025 | 6720×4480 | de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |
| 30 | `dessert-coupe` | `1750941788-2025-06-20_…645_2048px.jpg` | 2025 | 6720×4480 | de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey) |  |
| 31 | `dessert-panna-cotta` | `1750941788-2025-06-20_…649_2048px.jpg` | 2025 | 6720×4480 | de, en, fr, it, de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |
| 32 | `pizza-egg` | `1750941839-2025-06-20_…539_2048px.jpg` | 2025 | 5742×3828 | de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |
| 33 | `starter-salmon` | `1750942100-2025-06-20_…456_2048px.jpg` | 2025 | 6720×4480 | de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey) |  |
| 34 | `dish-prawns` | `1750942250-2025-06-20_…412_2048px.jpg` | 2025 | 6720×4480 | de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey) |  |
| 35 | `dish-pesto` | `1750942299-2025-06-20_…377_2048px.jpg` | 2025 | 6720×4480 | de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |
| 36 | `pizza-ham-rocket` | `1750942387-2025-06-20_…531_2048px.jpg` | 2025 | 6720×4480 | de/essen-geniessen, en/eat-enjoy, fr/manger-et-savourer, it/mangia-e-divertiti | gallery (all photographs, with lightbox), home: GalleryTeaser, home: Kitchen (dish journey) |  |
| 37 | `aerial-village` | `1750943367-2025-06-20_…--4_2048px.jpg` | 2025 | 5272×3948 | de, en, fr, it, de/allgemein/impressionen | gallery (all photographs, with lightbox), home: Hero, visit |  |
| 38 | `aerial-front` | `1750943391-2025-06-20_…-22_2048px.jpg` | 2025 | 4024×3016 | de/allgemein/impressionen | gallery (all photographs, with lightbox), home: GalleryTeaser, visit |  |
| 39 | `ship-portrait` | `1750943490-2025-06-20_…600_2048px.jpg` | 2025 | 4480×6720 | de/allgemein/impressionen | gallery (all photographs, with lightbox), kids: pirate ship |  |
| 40 | `playroom-slide` | `1750943509-2025-06-20_giardino-8900_2048px.jpg` | 2025 | 6720×4480 | de/allgemein/impressionen | gallery (all photographs, with lightbox), kids: playroom |  |
| 41 | `hosts` | `1750943766-2025-06-20_giardino-8915_2048px.jpg` | 2025 | 5945×3963 | de, en, fr, it, de/gastgeber, en/host, fr/hotes, it/la-casa, de/allgemein/impressionen | gallery (all photographs, with lightbox), home: Hosts, hosts, press | consent to confirm with owners |
| 42 | `pizza-rocket` | `1750943817-2025-06-20_…355_2048px.jpg` | 2025 | 6720×4480 | de, en, fr, it, de/allgemein/impressionen | JSON-LD image (launch mode), gallery (all photographs, with lightbox), home: Carta, home: Kitchen (dish journey), og:image |  |
| 43 | `detail-spaghetti` | `1750943817-2025-06-20_…370_2048px.jpg` | 2025 | 3677×5515 | de/allgemein/impressionen | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |
| 44 | `dish-schnitzel` | `1750943817-2025-06-20_…379_2048px.jpg` | 2025 | 4480×6720 | de/allgemein/impressionen | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |
| 45 | `dish-lasagne` | `1750943817-2025-06-20_…445_2048px.jpg` | 2025 | 6720×4480 | de/allgemein/impressionen | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |
| 46 | `dish-penne` | `1750943818-2025-06-20_…406_2048px.jpg` | 2025 | 6720×4480 | de/allgemein/impressionen | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |
| 47 | `garden-view` | `1750943878-2025-06-20_…618_2048px.jpg` | 2025 | 6452×4301 | de, en, fr, it, de/allgemein/impressionen | JSON-LD image (launch mode), gallery (all photographs, with lightbox), home: GalleryTeaser, og:image, visit |  |
| 48 | `aerial-terrace` | `1750943915-2025-06-20_…--5_2048px.jpg` | 2025 | 5272×3948 | de/allgemein/impressionen | gallery (all photographs, with lightbox), home: VisitSection |  |
| 49 | `dish-penne-chili` | `1750943969-2025-06-20_…568_2048px.jpg` | 2025 | 4301×6452 | de/allgemein/impressionen | gallery (all photographs, with lightbox), home: Kitchen (dish journey) |  |

**Photographs placed: 48/48**, all of them in the gallery and 45 also elsewhere. The Thermi graphic is on the Kids page and in the home family section. 6 photographs show identifiable people and carry «consent to confirm with owners»; three of them show children.

## 4. Embeds, widgets and scripts

| Live | Where | New site | Status |
|---|---|---|---|
| Self-hosted film `data/Ressources/1756717407-giardino_video_full_length.mp4` (120 s, 2560×1440, 183 MB) | Home | poster band + player on request; proposal mode streams the original after an explicit click (not rehosted); no autoplay | replaced |
| Photo sliders (bxSlider, slick) | Home, Essen & Geniessen, Kids, Gastgeber, Reservation | editorial layouts and a gallery with a lightbox; horizontal tracks with buttons and touch | replaced |
| localsearch widgets `api.myls.ch/js/business-hours.js`, `holidays-hours.js` (entity 2312) | sidebar of the DE pages | hours computed from `shared/schedule.ts` (no third-party request) | replaced |
| Google Maps JavaScript API with an exposed key | Anreise | click-to-load OpenStreetMap + Google/Apple Maps links; key not reused | replaced |
| Matterport iframe `my.matterport.com/show/?m=W51AKaLxmne` | Rundgang | two-click facade (loads only after a click) | replaced |
| YouTube link `watch?v=ml0f9Xh8waU` | Presse | youtube-nocookie player behind a facade | replaced |
| hoteljob-schweiz job widget (`jobanzeige_extern.php?uid=4037`, iframe) | Jobs (EN/FR/IT) | plain link to the listing | replaced |
| CMS contact form (POST) | Kontakt | same fields; proposal: e-mail hand-off; launch: own server endpoint | replaced |
| fusedeck tracking (loaded before consent) and the CMS cookie banner | every page | none: no analytics, no cookies | dropped |
| RSS feeds `?id=36&mod_action=rss`, `?id=34&mod_action=rss` | linked from the CMS | no news section | dropped |

## 5. Files

| File | New site | Status |
|---|---|---|
| Speisekarte-Menu.pdf (6 pp., 10.3 MB, scans) | HTML menu (51 dishes); PDF linked at its live URL; local copy only in `content/raw/pdf/` | replaced |
| Getraenkekarte.pdf (6 pp., 10.3 MB, scans) | HTML drinks menu (106 lines); PDF linked at its live URL | replaced |
| Speisekarte_Kids.pdf (2 pp., 2.4 MB) | HTML kids menu (8 dishes, 9 ice items, 13 flavours); PDF linked | replaced |
| Dessertkarte.PDF (2 pp., 2.8 MB) | HTML dessert menu (27 coupes and desserts, 8 novelties, 13 flavours); PDF linked | replaced |
| `templates/pizzeriagiardino/img/logo.png` (300×153) and the white variant | header and footer logo (transparent WebP/PNG derived from the original; no redrawing) | kept |
| favicon.ico | favicons and app icons derived from the logo | kept |
| Badge images (Tripadvisor Ruhmeshalle, Best of Swiss Gastro, Wellness Destination, WIR, Zöliakie, Baby Friendly, Tripadvisor, Google, Facebook, Foursquare) | `public/brand/labels/*.webp`, «Labels & Partner» strip | kept |
| Badges for Google+ and Food for Family | – | dropped |
| Two full-screen background photos (`data/Cache`, 3200×2400) | detail-bottle-light, detail-mini-bottles (see §3) | kept |

## 6. External links

The link check covers 61 URLs (GET, redirects followed, 10 s timeout, one retry). The results are in `content/raw/links.csv`.

| URL | Found on | Check | New site |
|---|---|---|---|
| http://instagram.com/about/legal/privacy/ | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| http://optout.networkadvertising.org/ | de/datenschutz | redirect-generic (200) | dropped: privacy boilerplate |
| http://www.aboutads.info/choices | de/datenschutz | unverifiable (429) | dropped: privacy boilerplate |
| http://www.bestofswissgastro.ch/guide/pizzeria-giardino/ | live: all 50 pages (header/footer) / src:src/content/restaurant.ts | unverifiable (503) | kept: Labels strip |
| http://www.c-and-a.com/ch/de/shop/familienfreundliche-restaurants | de/allgemein_presse | redirect-generic (200) | dropped: article taken down |
| http://www.christianpfammatter.ch | de/impressum en/imprint fr/empreinte it/impronta / src:src/content/restaurant.ts | ok (200) | kept: photography credit |
| http://www.hoteljob-schweiz.de | en/meta_jobs fr/meta_emplois it/meta_lavoro | ok (200) | merged: one listing link replaces the widget and the home link |
| http://www.hoteljob-schweiz.de/jobanzeige_extern.php?uid=4037 | en/meta_jobs (iframe) fr/meta_emplois (iframe) it/meta_lavoro (iframe) | ok (200) | merged: one listing link replaces the widget and the home link |
| http://www.indual.ch | de/impressum en/imprint fr/empreinte it/impronta | ok (200) | dropped: agency credit omitted (BRIEF §12) |
| http://www.tripadvisor.de/Restaurant_Review-g198859-d3640075-Reviews-Pizzeria… | live: all 50 pages (header/footer) | unverifiable (403) | merged: replaced by the .ch listing of the same restaurant |
| http://www.wir.ch | de/essen-geniessen | ok (200) | kept: Labels strip + WIR note |
| http://www.wir.ch/ | live: all 50 pages (header/footer) | ok (200) | kept: Labels strip + WIR note |
| http://www.wir.ch/en/ | en/eat-enjoy | dead (404) | replaced: dead; all locales link https://www.wir.ch/ |
| http://www.wir.ch/fr/ | fr/manger-et-savourer | ok (200) | merged: all locales link https://www.wir.ch/ |
| http://www.wir.ch/it/ | it/mangia-e-divertiti | ok (200) | merged: all locales link https://www.wir.ch/ |
| http://www.youronlinechoices.com/uk/your-ad-choices/ | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| http://www.zoeliakie.ch/ | live: all 50 pages (header/footer) | ok (200) | kept: Labels strip (gluten: «ask the team») |
| https://about.pinterest.com/de/privacy-policy | de/datenschutz | dead (404) | dropped: privacy boilerplate |
| https://foursquare.com/v/pizzeria-giardino/4e457acfd4c065cb6b922e71/ | live: all 50 pages (header/footer) / src:src/content/restaurant.ts | ok (200) | kept: Labels strip |
| https://g.co/kgs/BCibBDs | live: all 50 pages (header/footer) / src:src/content/restaurant.ts | ok (200) | kept: Labels strip (Google) |
| https://hoteljob-schweiz.de/pizzeria-giardino-leukerbad-jobs-4037.htm | de/allgemein_jobs / src:src/content/restaurant.ts | ok (200) | kept: Jobs listing |
| https://maps.apple.com/?q=Pizzeria%20Giardino&address=Thermenstrasse%209%2C%2… | src:src/content/restaurant.ts | ok (200) | new: directions |
| https://my.matterport.com/show/?m=W51AKaLxmne | de/allgemein_rundgang de/allgemein_rundgang (iframe) / src:src/content/restaurant.ts | ok via oEmbed (page HTTP 403) | kept: Rundgang (facade) |
| https://my.matterport.com/show/?m=W51AKaLxmne&lang=en | en/meta_virtual-tour en/meta_virtual-tour (iframe) / src:src/content/restaurant.ts | ok via oEmbed (page HTTP 403) | kept: Rundgang (facade) |
| https://my.matterport.com/show/?m=W51AKaLxmne&lang=fr | fr/meta_tour-virtuel fr/meta_tour-virtuel (iframe) / src:src/content/restaurant.ts | ok via oEmbed (page HTTP 403) | kept: Rundgang (facade) |
| https://my.matterport.com/show/?m=W51AKaLxmne&lang=it | it/meta_tour-virtuale it/meta_tour-virtuale (iframe) / src:src/content/restaurant.ts | ok via oEmbed (page HTTP 403) | kept: Rundgang (facade) |
| https://plus.google.com/+PizzeriaGiardinoLeukerbad/ | live: all 50 pages (header/footer) | redirect-generic (200) | dropped: service closed |
| https://privacy.fusedeck.net/de/CRIkzvXsvg | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://social.babyfreundlich.ch/ort/leukerbad/pizzeria-giardino/ | live: all 50 pages (header/footer) / src:src/content/restaurant.ts | ok (200) | kept: Labels strip |
| https://support.google.com/analytics/answer/6004245?hl=de | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://tools.google.com/dlpage/gaoptout?hl=de | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://tripadvisor.mediaroom.com/CHDE-privacy-policy | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://twitter.com/de/privacy | de/datenschutz | redirect-generic (200) | dropped: privacy boilerplate |
| https://twitter.com/personalization | de/datenschutz | redirect-generic (200) | dropped: privacy boilerplate |
| https://viktoria-leukerbad.ch | de/partnerhotels en/partner-hotels fr/hotel-partner it/partner-albergos / src:src/conte… | ok (200) | kept: Partnerhotels |
| https://www.dodeley.com/impressum?language=de | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://www.facebook.com/business/help/651294705016616 | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://www.facebook.com/pages/Pizzeria-Giardino/140821139297172/ | live: all 50 pages (header/footer) / src:src/content/restaurant.ts | unverifiable (login wall) | kept: Labels strip |
| https://www.facebook.com/policy.php | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://www.facebook.com/settings?tab=ads | de/datenschutz | unverifiable (login wall) | dropped: privacy boilerplate |
| https://www.felizzio.com/de/pizzeriagiardino/shop | de/allgemein_anreise de/allgemein_impressionen de/allgemein_jobs de/allgemein_kontakt d… | ok (200) | kept: voucher links in every locale |
| https://www.felizzio.com/en/pizzeriagiardino/shop | en/bookings en/eat-enjoy en/home en/host en/imprint en/kids en/meta_arrival en/meta_con… | ok (200) | kept: voucher links in every locale |
| https://www.felizzio.com/fr/pizzeriagiardino/shop | fr/empreinte fr/enfants fr/home fr/hotel-partner fr/hotes fr/manger-et-savourer fr/meta… | ok (200) | kept: voucher links in every locale |
| https://www.felizzio.com/it/pizzeriagiardino/shop | src:src/content/restaurant.ts | ok (200) | new: Italian voucher shop (the live IT pages link the English shop) |
| https://www.food4family.ch/restaurantsuche/wallis/giardino/ | live: all 50 pages (header/footer) | dead | dropped: domain gone |
| https://www.google.com/maps/search/?api=1&query=Pizzeria%20Giardino%2C%20Ther… | src:src/content/restaurant.ts | ok (200) | new: directions |
| https://www.google.de/intl/de/policies/privacy | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://www.google.de/intl/de/policies/privacy/ | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://www.heilquelle.ch | de/partnerhotels en/partner-hotels fr/hotel-partner it/partner-albergos / src:src/conte… | ok (200) | kept: Partnerhotels |
| https://www.hotel-paradis.ch | de/partnerhotels en/partner-hotels fr/hotel-partner it/partner-albergos / src:src/conte… | ok (200) | kept: Partnerhotels |
| https://www.indual.ch | live: all 50 pages (header/footer) | ok (200) | dropped: agency credit omitted (BRIEF §12) |
| https://www.indual.ch/webseiten/professionelles-webdesign-aus-dem-wallis | de/impressum en/imprint fr/empreinte it/impronta | ok (200) | dropped: agency credit omitted (BRIEF §12) |
| https://www.leukerbad.ch/therme | src:src/content/restaurant.ts src:src/routes.ts | ok (200) | new: replaces the dead leukerbad-therme.ch link |
| https://www.myswitzerland.com/de-ch/wellness-destinaton-quality.html | live: all 50 pages (header/footer) / src:src/content/restaurant.ts | ok (200) | kept: Labels strip (Wellness Destination) |
| https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active) | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active | de/datenschutz | ok (200) | dropped: privacy boilerplate |
| https://www.tripadvisor.ch/Restaurant_Review-g198859-d3640075-Reviews-Pizzeri… | live: all 50 pages (header/footer) / src:src/content/restaurant.ts | unverifiable (403) | kept: Labels strip (Ruhmeshalle badge + Tripadvisor) |
| https://www.trustyou.com/wp-content/uploads/2018/05/2017-01-19-TY-Privacy-Pol… | de/datenschutz | dead (404) | dropped: privacy boilerplate |
| https://www.wir.ch/ | src:src/content/restaurant.ts src:src/home/Sections.tsx | ok (200) | kept: Labels strip + WIR note |
| https://www.youtube.com/watch?v=ml0f9Xh8waU | de/allgemein_presse en/meta_press fr/meta_presse it/meta_stampa / src:src/content/resta… | ok via oEmbed (page HTTP 429) | kept: Presse (facade) |
| https://www.zoeliakie.ch/ | src:src/content/restaurant.ts | ok (200) | kept: Labels strip (gluten: «ask the team») |

**Check results**

| Result | URLs |
|---|---|
| ok | 46 |
| redirect-generic | 5 |
| dead | 4 |
| unverifiable | 6 |

**Destinations**

| Destination | URLs |
|---|---|
| kept | 25 |
| merged | 5 |
| replaced | 1 |
| new | 4 |
| dropped | 26 |

Most dropped links are the privacy-policy boilerplate.

## 7. Counts for the verification report

```
Content: pages preserved 15/15 routes × 4 locales (14/14 live content routes kept; 2 German-only pages added in en/fr/it; 1 new status route); photographs placed 48/48; paragraphs kept/merged/dropped 36/9/3 (+12 replaced by an equivalent function) – see docs/content-inventory.md
Links: external 61 checked, 46 ok, 26 dropped, 6 unverifiable, 4 dead, 5 redirect to a generic page (content/raw/links.csv)
```
