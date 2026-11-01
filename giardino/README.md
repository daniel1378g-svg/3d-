# Pizzeria Giardino, Leukerbad – website proposal

An unofficial, unsolicited design proposal for [pizzeriagiardino.ch](https://pizzeriagiardino.ch): the restaurant's
own texts, photographs, logo and menus rebuilt as a four-language site (Deutsch, English, Français, Italiano) with a
cinematic home page, an olive branch in 3D, the full menus as searchable HTML and a truthful table-request flow.
Every page carries the band **«Proposta de design · não é o site oficial»** and is `noindex`.

- Preview: https://claude.ai/artifact/S27Pa8RS1tAp26DFqGvcyt (private until shared)
- Hand-off, decisions, open questions and the verification report: [HANDOFF.md](HANDOFF.md)
- The brief this follows: [BRIEF.md](BRIEF.md), reconciled with the original request (see HANDOFF → Decisions)

## Run it

Node 22.13 or newer (the server uses the built-in `node:sqlite`), Python 3 with Pillow for the asset scripts.

```sh
npm ci
npm run dev            # http://127.0.0.1:5340 – the site (Vite); /api is proxied to the server
npm run dev:server     # http://127.0.0.1:4340 – the reservation server, only needed for launch-mode work

npm run build          # proposal build: dist/ (60 pre-rendered pages + 404) and dist-server/server.mjs
npm start              # serves dist/ on http://127.0.0.1:4340 (security headers, redirects, gzip)
npm test               # 53 tests: hours and slots, validation, the API and staff review, menus, routes, i18n
npm run check          # dictionaries complete in 4 languages (+ Swiss/fr-CH rules); every menu line vs. the PDFs
npm run qa             # browser QA of dist/: axe, German leaks, requests, cookies, language switch, keyboard,
                       # no-JS, fallbacks; screenshots → content/qa/ (run after `npm run build`)
LIGHTHOUSE=… npm run perf   # Lighthouse on /de, /de/essen-geniessen, /de/reservation over HTTP/2 (local
                            # self-signed TLS) → content/qa/perf-*.json; PERF_METHOD=devtools, PERF_PROTOCOL=h1
npm run build:artifact # the claude.ai preview → artifact/ (index.html, app.js, files.json)
```

### Proposal mode and launch mode

| | Proposal (default) | Launch (`npm run build:launch`, i.e. `VITE_PROPOSAL=0`) |
|---|---|---|
| Band «Proposta de design…» | on every page | off |
| Indexing | `noindex`, robots.txt disallows all, no sitemap, no canonical/hreflang, no JSON-LD | canonical, reciprocal hreflang + x-default, sitemap.xml, Restaurant + Menu JSON-LD (verified facts only) |
| Reservation request | nothing leaves the browser: «Per E-Mail senden» opens the visitor's e-mail program with the finished request to info@pizzeriagiardino.ch, plus the phone number and a copyable summary | stored on the restaurant's own server (`server/`); the guest sees «Anfrage erhalten – wartet auf Bestätigung» until the team confirms or declines it in the staff view |
| Contact form | mailto hand-off | stored, visible in the staff view |
| Menu PDFs, film | linked on pizzeriagiardino.ch (not rehosted) | the owners' own copies under `/menus/` and `/video/` (copied from `content/raw/pdf/` and `media/video/`) |
| Impressum / Datenschutz | name the proposal's operator (placeholder «[Betreiber der Vorschau]»), restaurant only as «Angaben des Restaurants» | drafts for the restaurant, marked for legal review |

### The reservation server (launch mode)

`node --disable-warning=ExperimentalWarning dist-server/server.mjs` serves `dist/` and the API on one port:

- `POST /api/reservations` (JSON, or the no-JavaScript form), `GET /api/reservations/:ref?token=…`,
  `POST /api/reservations/:ref/cancel`, `POST /api/messages`, `GET /api/health`
- `/staff` – the team's dashboard (HTTP Basic auth): pending requests first, confirm / decline / cancel with an
  optional note to the guest, contact messages. Only this view can set a request to «confirmed».
- Storage: SQLite in `DATA_DIR` (default `./data`). Name, phone, e-mail and notes are blanked 30 days after the
  reservation date (`RETENTION_DAYS`), messages are deleted after 90 days.
- Settings (environment): `PORT` (4340), `HOST`, `DATA_DIR`, `DIST_DIR`, `TLS_CERT` + `TLS_KEY` (PEM files: HTTPS
  with HTTP/2 served by Node itself, HTTP/1.1 kept for old clients), `STAFF_USER` (giardino), `STAFF_PASSWORD`
  (the staff view stays closed while unset), `STAFF_TOKEN` (optional JSON API), `NOTIFY_WEBHOOK_URL` (optional ping
  without personal data on every new request), `PUBLIC_ORIGIN`, `TRUST_PROXY`, `SECRET` (generated into
  `DATA_DIR/secret` if unset).

Serve it over HTTPS with HTTP/2 – behind a reverse proxy or the host's TLS, or with `TLS_CERT`/`TLS_KEY` directly. One
multiplexed connection matters on slow mobile networks: Lighthouse's simulated LCP on the home page is about a second
better over HTTP/2 than over HTTP/1.1 (content/qa/perf-*.json). Rate limits, CSRF protection for the staff view and a
strict Content-Security-Policy are built in.

## Where to edit

| What | File |
|---|---|
| Opening hours, Wednesday rest day, seasonal closures, request-form rules (15-min steps, party size) | `shared/schedule.ts` (used by the site and the server) |
| Menus: items, prices (CHF), sizes, printed markers, footnotes, open review points | `src/content/menu.ts` → `npm run check`, `npm run export` |
| Address, phone, e-mail, vouchers, hotels, press, labels, jobs | `src/content/restaurant.ts` |
| All texts, four languages | `src/i18n/de.ts` (source), `en.ts`, `fr.ts`, `it.ts` → `npm run check` |
| Photographs: alt texts, credits, consent notes | `content/assets.json` (`scripts/write_assets.py`), files via `npm run fetch && npm run images` |
| Routes and redirects of the old addresses | `src/routes.ts` (`SLUGS`, `LEGACY_REDIRECTS`, `LEGACY_FILES`) |
| Colours, type, motion | `src/styles/index.css` (tokens at the top) |
| The 3D olive branch / its poster | `src/three/olive.ts`, `npm run poster` |

Generated, do not edit by hand: `content/menu.json`, `content/hours.json`, `content/facts.json`,
`content/i18n/*.json` (`npm run export`), `src/data/images.json` (`npm run images`), `src/data/photos.json`
(`node scripts/slim-assets.mjs`, part of the build).

## Layout

```
src/            the site: pages, home sections, components, reservation flow, i18n, content data, styles, 3D
shared/         hours/closures/slots and request validation, shared by the site and the server
server/         the launch-mode server (no npm dependencies)
scripts/        build (prerender, artifact, server), checks, QA, Lighthouse, asset pipelines, link check, exports
tests/          node:test suites (bundled by scripts/run-tests.mjs)
content/        evidence and data: live captures, PDFs, OCR, link check, exports, review notes, QA screenshots
docs/           content-inventory.md – every page, paragraph, photo, embed and link of the old site → new site
public/         fonts, images (AVIF + WebP), brand assets, labels, posters
media/          originals and encodes (not in git: `npm run fetch`, `npm run video`)
```
