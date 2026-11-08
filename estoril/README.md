# Circuito Estoril — redesign proposal (PT/EN) with a 3D scroll journey

Static site in `site/` (Portuguese at the root, English under `site/en/`). The home page carries a
five-stage scroll journey — arrival, pit lane, on track, paddock, golden hour — rendered with three.js.

This is a design proposal, not the official website; every page carries a permanent notice saying so.

## Develop

```bash
npm install
npm run build            # src/ → site/assets/js (home.js + chunks/journey-[hash].js)
npm run serve            # http://127.0.0.1:8080
```

Useful query parameters on the home page: `?3d=force` (skip the device check), `?3d=off` (static
fallback), `?q=low|mid|high`, `?capture=1` (exposes `window.__cap(t)` for deterministic stills).

## Layout

```
site/                 the published static site (pages, CSS, media, fallback posters)
src/home.js           journey controller: scroll → progress, panels, stage buttons, quality, fallback
src/journey/          the 3D scene (see the header comment of each module)
scripts/              build, static server, deterministic captures
reference/            the published build of 23 Oct 2026 (before/after comparisons)
tools/recon/          how the source was recovered from the published bundle
```
