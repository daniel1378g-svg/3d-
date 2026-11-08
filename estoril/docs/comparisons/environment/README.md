# Environment realism: before and after

Before: the base build of this phase (geometry and hero-car work merged, commit `ec5cf43`). After: this branch.
Same frames, same capture procedure (`scripts/capture.mjs`, 1440×900 unless noted, `q=high`, SwiftShader).
Each sheet shows before on the left and after on the right; some add a 1:1 detail crop underneath.

## Sheets

Journey, UI hidden: [0.05](journey-0.050.jpg) · [0.2](journey-0.200.jpg) · [0.3](journey-0.300.jpg) ·
[0.375](journey-0.375.jpg) · [0.5](journey-0.500.jpg) · [0.7](journey-0.700.jpg) · [0.95](journey-0.950.jpg)

Journey, UI shown: [0.05](ui-0.050.jpg) · [0.2](ui-0.200.jpg) · [0.3](ui-0.300.jpg) · [0.375](ui-0.375.jpg) ·
[0.5](ui-0.500.jpg) · [0.7](ui-0.700.jpg) · [0.95](ui-0.950.jpg)

Phone 390×844: [0.375](phone-0.375.jpg) · [0.7](phone-0.700.jpg)

Fixed cameras (t = 0.05 light): [kerb and gravel at 1.5 m](cam-kerb.jpg) · [wide low view over asphalt and
grass](cam-wide.jpg) · [high view over a tree cluster](cam-veghigh.jpg) · [pit garages and tower](cam-pits.jpg) ·
[tower and pit roof from above](cam-tower.jpg) · [grandstand](cam-stand.jpg) · [paddock](cam-paddock.jpg)

## What changed

| area | before | after |
|---|---|---|
| ground and track | three canvas tiles on fixed UV grids (grass 9 m, asphalt 12 m along v, gravel 10 m) | world-space shading from one noise image and one detail image at several scales, no tile grid; palette of references §4.3–4.4; worn paint, faded kerbs, rubber in braking zones, gravel spill |
| vegetation | 3 blob shapes, even scatter, ~2.7 M triangles, no LOD; tufts on the gravel (O3) | 7 Mediterranean species in woods, belts and clearings; near/far models with a dithered cross-fade; tufts kept off every surface, fading by distance, alpha-to-coverage |
| buildings | one mesh per box (pits 181, grandstand 71, gantry 25) | merged per material (62 / 9 / 3); piers, blue doors, canopy, tower storeys and cladding, seat rows with aisles, space-frame roof, cranked debris fence, Armco, teal tyre stacks, paddock equipment |
| people | 15 meshes each; visor at the back, brim to the right, armL on the right; 3 crew popping in | 3 meshes each, correct left/right; 8 crew in working poses, dithered fade in and out; 4 visitors |

## Cost

`tools/env/probe.mjs`: `renderer.info` draw calls and triangles summed over every render call of the frame (shadow
passes included), the camera of the journey.

| quality | t | draw calls | triangles |
|---|---|---|---|
| high | 0.05 | 102 → 121 | 5.24 → 1.45 M |
| high | 0.2 | 723 → 547 | 5.44 → 1.66 M |
| high | 0.375 | 780 → 568 | 5.42 → 1.23 M |
| high | 0.5 | 730 → 554 | 5.50 → 1.88 M |
| high | 0.7 | 535 → 395 | 5.44 → 1.41 M |
| high | 0.95 | 394 → 221 | 5.27 → 1.43 M |
| mid | 0.05 | 98 → 117 | 3.26 → 0.91 M |
| mid | 0.375 | 783 → 571 | 3.45 → 0.98 M |
| mid | 0.5 | 714 → 538 | 3.42 → 1.25 M |
| mid | 0.7 | 535 → 391 | 3.46 → 1.00 M |
| mid | 0.95 | 390 → 217 | 3.29 → 0.94 M |
| low | 0.05 | 51 → 60 | 1.05 → 0.44 M |
| low | 0.375 | 752 → 548 | 1.25 → 0.68 M |
| low | 0.5 | 702 → 521 | 1.22 → 0.68 M |
| low | 0.7 | 233 → 219 | 1.12 → 0.53 M |
| low | 0.95 | 150 → 121 | 1.06 → 0.47 M |

The 0.05 frame gains ~20 draws (the near tree sets and their shadows); every other frame loses 30–45 %.

Texture memory (estimate of every texture bound to a scene material or shader uniform, format-aware, mipmaps
included; most of it is the hero car's): high 44.05 → 43.02 MB, mid 42.55 → 41.52 MB, low 42.21 → 41.19 MB. The
three canvas surface tiles (3.1 MB) became a 512 px detail image and a 256 px noise image (1.75 MB); new are the
canopy occlusion map (R8, 0.7 MB), the lap texture (8 KB) and small seat, fence and W-beam textures.

World build in Node (cold, `tools/env/world-stats.mjs`): high 318 → ~700 ms, mid 189 → ~444 ms, low 147 → ~409 ms
(occupancy ~115 ms, tree placement ~85 ms, scrub and tufts ~90 ms, LOD meshes and the canopy map ~50 ms, detail
and noise images ~80 ms). `depthRange.build()` 77–84 → 63–77 ms on high. Per frame the vegetation only refills its
near sets after 6 m of camera travel; no updater allocates.

## Checks

- `node scripts/test-environment.mjs`: every tree, scrub, pampas clump and tuft clears the track asphalt, kerbs,
  run-off, gravel, walls, pit lane, paddock, roads and buildings by more than its footprint (smallest margins on
  high: tufts 0.40–0.69 m, scrub 0.54 m from a wall, trees 1.2 m from a wall and ≥ 27.5 m from the asphalt);
  budgets per tier (high 5,200 trees / 3,811 scrub / 60 pampas / 9,000 tufts; mid 0.6×; low 0.35×); finite
  transforms; LOD bounds; people left/right and feet on the ground in all 11 poses; gradual fades.
- `node scripts/measure-clearance.mjs`: near < clearance in 421 of 421 frames, no eye inside geometry.
- `test-geometry`, `test-car-motion`, `test-events` pass. No console errors or warnings in any capture.
- Repetition (`tools/env/repetition.py`, top-down 80 m over the infield): luminance autocorrelation at the old
  9 m grass period 0.68 → 0.27.
- Shimmer after a 1 cm camera move (`tools/env/flicker.mjs`), kerb view at 1.5 m: 5,871 → 5,018 px (t = 0.05),
  4,553 → 4,066 px (t = 0.5). In the low wide view the changed pixels are edges of tufts 2–8 m away and of
  trees 20–60 m away, which genuinely move 0.6–3 px, not alpha-test aliasing.

## Known limits

- The eucalyptus share is ~10 % of the trees (reference 25 %): it follows a large noise "stand" field and loses
  places to the pines in the belts.
- The world build is ~380 ms slower on high (cold), mostly the exact placement checks.
- Grass albedo is the reference colour × 1.9, to keep the previous display brightness under the current lights.
