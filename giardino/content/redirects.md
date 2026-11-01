# Redirects – every live address and where it goes

Every live slug is kept as a route or becomes a permanent (301) redirect. The source of truth is `src/routes.ts`:
- `SLUGS` holds the routes.
- `LEGACY_REDIRECTS` holds the path redirects.
- `LEGACY_FILES` holds the PDF query links.

The build writes them to `dist/_redirects` in Netlify / Cloudflare Pages format. The Node server (`server/static.ts`) reads the same file, so static hosting and the server behave the same. The live routes were captured on 2026-11-01; see `content/raw/live/index.json`, which records the status codes.

## Pages: same address on the new site

| Page | de | en | fr | it |
|---|---|---|---|---|
| Home | `/de` | `/en` | `/fr` | `/it` |
| Essen & Geniessen (menus) | `/de/essen-geniessen` | `/en/eat-enjoy` | `/fr/manger-et-savourer` | `/it/mangia-e-divertiti` |
| Kids | `/de/kids` | `/en/kids` | `/fr/enfants` | `/it/kids` |
| Gastgeber | `/de/gastgeber` | `/en/host` | `/fr/hotes` | `/it/la-casa` |
| Reservation | `/de/reservation` | `/en/bookings` | `/fr/reservation` | `/it/prenotazione` |
| Jobs | `/de/allgemein/jobs` | `/en/meta/jobs` | `/fr/meta/emplois` | `/it/meta/lavoro` |
| Anreise | `/de/allgemein/anreise` | `/en/meta/arrival` | `/fr/meta/arrivee` | `/it/meta/come-arrivare` |
| Rundgang | `/de/allgemein/rundgang` | `/en/meta/virtual-tour` | `/fr/meta/tour-virtuel` | `/it/meta/tour-virtuale` |
| Presse | `/de/allgemein/presse` | `/en/meta/press` | `/fr/meta/presse` | `/it/meta/stampa` |
| Kontakt | `/de/allgemein/kontakt` | `/en/meta/contact` | `/fr/meta/contact` | `/it/meta/contatto` |
| Partnerhotels | `/de/partnerhotels` | `/en/partner-hotels` | *(301, see below)* | *(301, see below)* |
| Impressum | `/de/impressum` | `/en/imprint` | *(301, see below)* | *(301, see below)* |
| Datenschutz | `/de/datenschutz` | new: `/en/privacy` | new: `/fr/protection-des-donnees` | new: `/it/protezione-dei-dati` |
| Impressionen | `/de/allgemein/impressionen` | new: `/en/meta/impressions` | new: `/fr/meta/impressions` | new: `/it/meta/impressioni` |
| Reservation status (new, personal, not indexed) | `/de/reservation/status` | `/en/bookings/status` | `/fr/reservation/statut` | `/it/prenotazione/stato` |

Trailing slashes are accepted on every route; the static build writes `<route>/index.html`.

## Permanent redirects (301)

| Old address | Live behaviour on 2026-11-01 | New target | Why |
|---|---|---|---|
| `/fr/empreinte` | 200 (page «Empreinte») | `/fr/mentions-legales` | «Empreinte» (footprint) is a literal mistranslation of «Impressum» |
| `/fr/hotel-partner` | 200 | `/fr/hotels-partenaires` | correct French |
| `/it/impronta` | 200 (page «Impress», English headings) | `/it/note-legali` | «Impronta» (footprint) is a mistranslation |
| `/it/partner-albergos` | 200 | `/it/alberghi-partner` | «Albergos» is not Italian |
| `/de/allgemein` | 301 → `/de` | `/de` | menu-group page of the old CMS |
| `/en/meta`, `/fr/meta`, `/it/meta` | 301 → `/en`, `/fr`, `/it` | same | same |
| `/de/home` | (not linked) | `/de` | defensive alias |
| `/de/allgemein/leukerbad-therme` | 301 → `http://www.leukerbad-therme.ch/` | `https://www.leukerbad.ch/therme` | the old target answers HTTP 400 (dead) |
| `/en/meta/leukerbad-therme` | 301 → `http://www.leukerbad-therme.ch/en/index.php` | `https://www.leukerbad.ch/therme` | same |
| `/fr/meta/leukerbad-therme` | 301 → `http://www.leukerbad-therme.ch/fr/index.php` | `https://www.leukerbad.ch/therme` | same |
| `/it/meta/leukerbad-therme` | 301 → `http://www.leukerbad-therme.ch/it/index.php` | `https://www.leukerbad.ch/therme` | same |
| `/` | 301 → `/de` | client-side: saved language (`localStorage`, set only by an explicit choice), else the browser language, else `/de`; without JavaScript a `<noscript>` refresh goes to `/de` | BRIEF §9 |

**Leukerbad Therme, check status.** On 2026-11-01 `http://www.leukerbad-therme.ch/` answered HTTP 400. The replacement `https://www.leukerbad.ch/therme` answered HTTP 200; one run of `scripts/check-links.mjs` timed out once and the retry succeeded. Details are in `content/raw/links.csv`.

## The four menu PDFs (query URLs)

The live site links its PDFs as query URLs on the bare domain:

| Link label | Live URL | Served file |
|---|---|---|
| Speisekarte-Menu.pdf | `https://pizzeriagiardino.ch?action=get_file&id=13&resource_link_id=124` | `Speisekarte-Menu.pdf` |
| Getraenkekarte.pdf | `…&resource_link_id=15a` | `Getraenkekarte.pdf` |
| Speisekarte Kids.pdf | `…&resource_link_id=158` | `Speisekarte_Kids.pdf` |
| Dessertkarte.PDF | `…&resource_link_id=159` | `Dessertkarte.PDF` |

**Proposal mode** (`VITE_PROPOSAL=1`, the default):
- The «Karte als PDF» links point at these live URLs.
- The PDFs are not rehosted in `dist/`. Local copies exist only under `content/raw/pdf/` as evidence.
- No redirect is needed, because the proposal does not run on the restaurant's domain.

**Launch mode** (`VITE_PROPOSAL=0`, for the owners on `pizzeriagiardino.ch`):
- The owners place their PDFs at `/menus/<file>.pdf` (the targets in `LEGACY_FILES`), so that old bookmarks and search results keep working.
- The old query URLs are redirected with query-matching rules. A static host cannot match a query string with a plain path rule, so these lines use Netlify's query syntax:

```
/  action=get_file  id=13  resource_link_id=124  /menus/Speisekarte-Menu.pdf  301
/  action=get_file  id=13  resource_link_id=15a  /menus/Getraenkekarte.pdf    301
/  action=get_file  id=13  resource_link_id=158  /menus/Speisekarte-Kids.pdf  301
/  action=get_file  id=13  resource_link_id=159  /menus/Dessertkarte.pdf      301
```

- **Node server.** `server/static.ts` reads the same lines. Rules with query conditions are applied before the page at `/` is served.
- **Other static hosts** (GitHub Pages, plain S3) cannot redirect by query string. There, `/` would load the home page and the client cannot know which PDF was meant. Use a host with query matching (Netlify, Cloudflare Pages) or the Node server, or keep the old CMS endpoint alive until search engines have picked up the new PDF addresses.

## Old addresses that are deliberately not redirected

| Address | What it was | Decision |
|---|---|---|
| `https://pizzeriagiardino.ch?id=36&mod_action=rss`, `?id=34&mod_action=rss` | RSS feeds of the old CMS (news portlets) | dropped; there is no news section. They fall through to the home page. |
| `/data/Ressources/*.jpg`, `/data/Cache/*`, `/addons/phpThump/phpThumb.php?src=…` | image files and thumbnails of the old CMS | not redirected; the photographs have new URLs under `/images/`. Add rules if external sites hotlink them. |
| `/data/Ressources/1756717407-giardino_video_full_length.mp4` | the 120-second film (183 MB) | not rehosted in `dist/` (BRIEF §15); see HANDOFF for the video decision |
| `/templates/pizzeriagiardino/img/*` | logo and badge images | not redirected |
