# Reference: the published build of 23 October 2026

The 3D journey was only available as a compiled bundle (`js/chunks/journey-ITBCT37D.js`, three.js r170
plus the app code, minified). `tools/recon/` recovers readable source from it:

1. `analyze.mjs` lists the three.js identifiers the app part uses.
2. `reconstruct.mjs` rewrites the app part to import from npm `three@0.170.0` (scope-aware renames).
3. `split.mjs` names every top-level unit and splits the file into `src/journey/*` modules.

The recovered modules render pixel-identically to this bundle (max channel difference 0 at eight
journey positions, 1440×900, SwiftShader). `scripts/serve.mjs --reference` serves the site with these
scripts swapped back in, so "before" captures can be made at any time.

`img/` holds the original fallback posters.
