# Translation divergence report

**Scope.** The live site's English, French and Italian texts (pizzeriagiardino.ch, captured 2026-11-01 in `content/raw/live/<lang>/*.txt`), compared with the German master text. Where a translation differs from the German on a fact or adds a claim, the German wins and the row is listed here (BRIEF §4). Source lapses come next: mojibake, misspellings, wrong-language headings and machine-translated slugs. The last part lists the points in the new site's own dictionaries (`src/i18n/*.ts`) that still need a reviewer; they are also marked `needs-review` in `content/i18n/<lang>.json`.

**Type key**
- **fact**: a factual statement differs.
- **claim**: a quality claim is added that is not in the German.
- **lapse**: a language or encoding error with no change in meaning.
- **open**: the German source itself is unresolved.

## A. Facts and claims: live translations against the German master

| # | Page · locale | Live text | German master | Type | New site |
|---|---|---|---|---|---|
| 1 | Home · FR | «La Pizzeria Giardino … est une **expérience unique** pour les amoureux de la cuisine italienne» | «ist **ein Erlebnis** für Freunde der italienischen Küche» | claim | Reused in `home.hero.outro`. Marked needs-review (see C1). |
| 2 | Home · IT | «è **il posto ideale** per gli amanti della cucina italiana» | «ist ein Erlebnis …» | claim | Reused in `home.hero.outro`. Marked needs-review (see C2). |
| 3 | Home · FR | «**Rien qu’à la vue** des aires de jeux intérieure et extérieure» (just from seeing the play areas) | «allein schon des Innen- und Aussenspielplatzes **wegen**» (for the play areas alone) | fact | Corrected: «ne serait-ce que pour ses aires de jeux intérieure et extérieure». |
| 4 | Home · EN | «Bella Italia in the heart of **Bäderdorfs**» (treated as a place name) | «im Herzen des Bäderdorfs» (the spa village) | fact | «in the heart of the spa village». |
| 5 | Home · IT | «nel cuore di **Bäderdorf**» | same | fact | «nel cuore del villaggio termale». |
| 6 | Home · IT | H1 «la pizzeria **del buon gusto**» (of good taste) | «die **aparte** Pizzeria» (distinctive) | claim (mild) | Kept as the restaurant's own Italian line (`home.story.title`). Flagged for the owners in C3. |
| 7 | Essen & Geniessen · EN | «We ensure that we use **the best quality** …» | «Darauf achten wir …» (fresh, authentic, enjoyable – no «best») | claim | «We care about this not only in the kitchen but from the moment we shop». |
| 8 | Essen & Geniessen · FR | «Les **fameux** vins de la région du Valais et les **grands crus** italiens» | «Vorzügliche Walliser Weine … und auserlesene italienische Tropfen» | claim | «D’excellents vins valaisans … et une sélection de vins italiens». |
| 9 | Essen & Geniessen · FR | «dans une ambiance **dynamique**» | «in gelebtem Ambiente» | fact (mood) | Not reused. |
| 10 | Essen & Geniessen · IT | «prelibatezze **tradizionali della cucina italiana**» (merges two things) | «italienische und traditionelle Köstlichkeiten» | fact | «prelibatezze italiane e tradizionali». |
| 11 | Essen & Geniessen · IT | «accettiamo anche pagamenti con **carta WIR**» (WIR card) | «WIR-**Geld**» (WIR money) | fact | «pagamenti in franchi WIR». |
| 12 | Kids · IT | «estate 2016 **ci sarà** un’enorme nave pirata» (future tense: the ship is still to come) | «Seit Sommer 2016 **steht dort** ein riesiges Piratenschiff» | fact | «dall’estate 2016 c’è un’enorme nave dei pirati». |
| 13 | Kids · IT | H1 «… **non ha vita**» (has no life) | «… ist nur ein Lokal» (is just a place to eat) | fact (wording) | New Italian H1 follows the German. |
| 14 | Gastgeber · IT | «**I nostri due** camerieri e addetti alla cucina» (implies a staff of two) | «**Zwei unserer** Service-Feen und Küchen-Kobolde» (two of our …) | fact | «Due delle nostre fate del servizio e dei nostri folletti della cucina». |
| 15 | Reservation · IT | «potete chiamarci **ogni giorno** dalle 10:00 alle 23:00» | «jeweils von 10 bis 23 Uhr» – no «every day»; Wednesday is Ruhetag | fact | `reserve.phoneBody` dropped «ogni giorno». The new meta and teaser texts reintroduce «daily» in all four languages (see C4). |
| 16 | Jobs · EN | «… **for the coming winter season** …» | no season given | fact | Not reused; roles only. |
| 17 | Jobs · FR | «… ou **apprenti(e) de cuisine**» (kitchen apprentice) | «eine Küchenhilfe oder einen Hilfskoch» | fact | «un·e aide de cuisine ou aide-cuisinier·ère». |
| 18 | Jobs · FR | «une **serveurse** compétente» | – | lapse | «une serveuse compétente et motivée». |
| 19 | Jobs · IT | «un **cameriere (f)**» (masculine noun marked female) | «eine Servicemitarbeiterin» | lapse | «una cameriera». |
| 20 | Presse · EN, FR, IT | only the rro.ch video; the C&A article is missing | DE has the C&A article and quote | fact (missing) | All four locales show both entries; the quote is translated and marked as a quotation. The article link was dropped because it now redirects to a general page. |
| 21 | Kontakt · all four | address «**Rathausstrasse 7**» (also the Anreise map marker) | footer, Impressum and localsearch: «Thermenstrasse 9» | open | The new site uses Thermenstrasse 9 everywhere. The discrepancy is an open question in HANDOFF and in `content/facts.json`. |
| 22 | Kontakt · EN | form label «**Name / Last name**» | «Vorname / Name» (first name / last name) | lapse | New label follows the German. |
| 23 | Sidebar · EN, FR, IT | static hours text: «Open from 11:00am to 11:00pm / Closed on wednesday», «De 11:00h à 23:00h / Jour de repos, le mercredi», «Siamo aperti dalle 11:00 alle 23:00 / chiusi il mercoledi» | DE: localsearch widget, same hours | none (consistent) | All locales render hours from `shared/schedule.ts`. |
| 24 | Sidebar · FR | «Vous nous trouverez **au** Thermenstrasse 9» | – | lapse | «à la Thermenstrasse 9». |

## B. Source lapses (encoding, spelling, wrong language)

| # | Where | Lapse | New site |
|---|---|---|---|
| 25 | every EN, FR and IT page | `<title>` starts with the German keyword list «Pizza, Pasta, Penne, Risotto, Restaurant, Essen, Familien, Kinder, Glutenfreie Pizzeria, Glutenfreie Pizzeria im Wallis» | per-locale titles of 60 characters or fewer, no keyword list, no gluten-free claim |
| 26 | every page in every locale | German meta description, with the typo «Treffpunk» (Treffpunkt) | per-locale descriptions (`meta.descriptions.*`) |
| 27 | Kids · EN | mojibake in title and H1: «children???s laughter» | correct apostrophes (UTF-8 throughout) |
| 28 | Kids · FR | mojibake in title and H1: «rires d???enfants n???est rien d???autre qu???un local ???» | same |
| 29 | Hôtes · FR | mojibake in title and H1: «??tre reçu comme un hôte, c???est bien …» | «Être reçu en hôte, c’est bien …» |
| 30 | Kids · DE | «**Seid** Sommer 2016» | «Seit Sommer 2016» |
| 31 | Closure notice · DE | «… wieder zu begrü**ß**en» (also missing the comma) | Swiss spelling «begrüssen», rendered from `hours.closureText` |
| 32 | Rundgang · DE | «Grö**ß**ere Kartenansicht» | not needed: the Matterport tour sits behind a click-to-load facade |
| 33 | Closure notice · FR | «**ENTREPRISE VACANCES AUTOMNE**» (word-for-word translation), «01. Novembre», «Decembre» without accent, «le Vendredi le 18. Decembre» | label «Vacances annuelles», closure title «Vacances d’automne», Intl-formatted dates («1 novembre 2026») |
| 34 | Closure notice · EN | «COMPANY HOLIDAYS AUTUMN», «November 01, 2026 to December 17th, 2026» | label «Seasonal closure», closure title «Autumn break», «1 November 2026» |
| 35 | Sidebar · IT | «mercoledi», «venerdi» (missing accents) | «mercoledì», «venerdì» |
| 36 | Impressum · FR | page and menu named «**Empreinte**» (footprint, a literal translation of «Impressum»); slug `/fr/empreinte` | «Mentions légales», `/fr/mentions-legales` (301 from the old slug) |
| 37 | Impressum · IT | page and menu named «**Impronta**» (footprint); H1 «Impress»; **English** headings «Responsible for the content», «Web design, web development and hosting», «Photography» | «Note legali», `/it/note-legali` (301), Italian headings |
| 38 | Navigation · IT | «**Partner Albergos**» (invented plural); slug `/it/partner-albergos` | «Alberghi partner», `/it/alberghi-partner` (301) |
| 39 | Navigation · FR | «**Hôtel Partner**»; slug `/fr/hotel-partner` | «Hôtels partenaires», `/fr/hotels-partenaires` (301) |
| 40 | Navigation · EN, FR, IT | the CMS group name is exposed: «Meta Home», «Meta Accueil»; `/…/meta` redirects home | no «Meta» label; `/en|fr|it/meta` 301 to the home page |
| 41 | Navigation · IT | «Mangia e divertiti» (eat and have fun) for «Essen & Geniessen» | slug kept (`/it/mangia-e-divertiti`, a live URL); visible label «Menù» |
| 42 | Sidebar · EN | «In the **center** of Leukerbad» (US spelling; BRIEF asks for British-neutral English) | «centre» |
| 43 | Datenschutz · DE only | agency boilerplate: it describes tools the site does not use, names indual GmbH (Sebastiansplatz 4, 3900 Brig) as the responsible body, and contradicts the Impressum (indual GmbH, Grundbielstrasse 1, 3902 Brig-Glis) | not copied; the new privacy page describes only what the new build does, in four languages |
| 44 | Datenschutz, Impressionen · DE only | no EN, FR or IT version | both exist in all four locales |
| 45 | Presse · DE | C&A quote «Sonnenterrasse und Kinderparadies **zu gleich**» | «zugleich» |
| 46 | Jobs · DE only | «powered by Hoteljob-Schweiz / Pizzeria Giardino Leukerbad» | the hoteljob-schweiz link appears in all locales |

## C. Points in the new dictionaries that still need a reviewer

These are marked `status: "needs-review"` in `content/i18n/<lang>.json` (curated list: `content/i18n/needs-review.json`).

| # | Key · locale | Issue | Suggestion |
|---|---|---|---|
| C1 | `home.hero.outro` · fr | «une expérience **unique**» adds a superlative (row 1) | «… est une expérience pour les amoureux de la cuisine italienne» |
| C2 | `home.hero.outro` · it | «il posto **ideale**» (row 2) | «… è un’esperienza per gli amanti della cucina italiana» |
| C3 | `home.story.title` · it | «la pizzeria **del buon gusto**» is not «aparte» (row 6) | owners to decide; e.g. «la pizzeria speciale di Leukerbad» |
| C4 | `meta.descriptions.reserve`, `home.reserve.body` · de, en, fr, it; `reserve.phoneBody` · en, fr | «**täglich** / daily / tous les jours / ogni giorno» von 10 bis 23 Uhr: the source says «jeweils von 10 bis 23 Uhr», and Wednesday is Ruhetag | drop «täglich» and its equivalents unless the owners confirm that the phone is answered on Wednesdays and during closures (the DE string is master text, so it needs a source edit) |
| C5 | any unit whose German numbers are missing from the translation | flagged automatically by `export-content.mjs` (numbers other than :00 minutes) | none at the last export. During the review the check caught `privacy.sections.3.p.0` and `.4.p.0`, whose retention periods (30 and 90 days) were missing in en, fr and it; the German was changed since, and the four languages now agree. |

| C6 | `hours.closureText` · fr, it | Intl dates give «du 1 novembre 2026 … le vendredi, 18 décembre 2026» and «dal 1 novembre 2026». French and Italian typography would use «1er novembre», «vendredi 18 décembre» (no comma) and «1° novembre». | typographic only; adjust the formatter or the template |

**Row count:** 46 rows in A and B. That is 45 divergences (A: 23 facts, claims and wording lapses; B: 22 source lapses) plus one consistency check (row 23). Section C adds 6 review points.
