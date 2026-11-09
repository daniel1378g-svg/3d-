# Circuito Estoril — redesign proposal (PT/EN) with a 3D scroll journey

Static site in `site/` (Portuguese at the root, English under `site/en/`). The home page carries a
five-stage scroll journey — arrival, pit lane, on track, paddock, golden hour — rendered with three.js.

This is a design proposal, not the official website; every page carries a permanent notice saying so.

## Develop

```bash
npm install
npm run build            # src/ → site/assets/js (home.js + chunks/journey-[hash].js + chunks/bench-[hash].js + events.js)
npm run serve            # http://127.0.0.1:8080
```

The build outputs are committed with the site, `site/assets/js/events.js` included: the events index,
the event pages and the category pages load it (`src/events-page.js`) to keep their lists right after
the day their HTML was rendered for. `site/assets/js/site.js` is hand-written, not built.

Useful query parameters on the home page: `?3d=force` (skip the device check), `?3d=off` (static
fallback), `?q=low|mid|high`, `?capture=1` (exposes `window.__cap(t)` for deterministic stills),
`?bench=1` (plays a scripted scroll through the five stages and shows frame times, the quality tier, the
pixel ratio and the resolution steps: for measuring on real devices; its code is a chunk of its own that
is never fetched without the flag). On the home page and the events pages, `?today=YYYY-MM-DD` shows the
event lists as on that day (Lisbon).

Checks: `node scripts/test-events.mjs` (the static event lists), and against a served build
`node scripts/test-site.mjs --base http://127.0.0.1:8080/` (events at later dates, keyboard, reduced
motion, the no-3D fallback, contrast and phone layouts).

Performance (`docs/performance.md`: the declared devices, their budgets and the measurements), against a
served build: `node scripts/bench.mjs --base …` (draw calls, triangles, programs, GPU memory, JS time and
garbage per frame, load bytes and phases, per device profile, with the budget checks),
`node scripts/test-leaks.mjs --base …` (repeat visits, scroll and stage jumps, resizes, hidden/visible
cycles: GL objects, heap, render loops and listeners stay constant) and
`node scripts/make-posters.mjs --base …` (renders the fallback posters `site/assets/img/stage-*.webp`
from the journey).

## Layout

```
site/                 the published static site (pages, CSS, media, fallback posters)
src/home.js           journey controller: scroll → progress, panels, stage buttons, quality, fallback
src/events.js         date-driven event lists (home page, and the events pages via src/events-page.js)
src/journey/          the 3D scene (see the header comment of each module)
scripts/              build, static server, deterministic captures
reference/            the published build of 23 Oct 2026 (before/after comparisons)
tools/recon/          how the source was recovered from the published bundle
```
