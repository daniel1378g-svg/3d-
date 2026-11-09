# Environment realism: before and after

Before: the base build of this phase (geometry and hero-car work merged, commit `ec5cf43`). After: this branch,
including the fixes made after review (see [Review fixes](#review-fixes)). Same frames, same capture procedure
(`scripts/capture.mjs`, 1440×900 unless noted, `q=high`, SwiftShader). Each sheet shows before on the left and after
on the right; some add a 1:1 detail crop underneath. "Builder" in the tables is the first pass (commit `c283211`).

## Sheets

Journey, UI hidden: [0.05](journey-0.050.jpg) · [0.2](journey-0.200.jpg) · [0.3](journey-0.300.jpg) ·
[0.375](journey-0.375.jpg) · [0.5](journey-0.500.jpg) · [0.7](journey-0.700.jpg) · [0.95](journey-0.950.jpg)

Journey, UI shown: [0.05](ui-0.050.jpg) · [0.2](ui-0.200.jpg) · [0.3](ui-0.300.jpg) · [0.375](ui-0.375.jpg) ·
[0.5](ui-0.500.jpg) · [0.7](ui-0.700.jpg) · [0.95](ui-0.950.jpg)

Phone 390×844: [0.375](phone-0.375.jpg) · [0.7](phone-0.700.jpg)

Fixed cameras (t = 0.05 light): [kerb and gravel at 1.5 m](cam-kerb.jpg) · [wide low view over asphalt and
grass](cam-wide.jpg) · [high view over a tree cluster](cam-veghigh.jpg) · [pit garages and tower](cam-pits.jpg) ·
[tower and pit roof from above](cam-tower.jpg) · [grandstand](cam-stand.jpg) · [paddock](cam-paddock.jpg)

Review fixes (t = 0.26 crew, t = 0.7 light otherwise): [front jack](cam-crew-jack.jpg) ·
[tyre carrier](cam-crew-tyre.jpg) · [grass tufts at 0.6 m](cam-tufts-low.jpg) · [trees from 45 m, LOD
band](cam-trees-high.jpg) · [trees at eye height](cam-trees-near.jpg) · [gravel at T1 from 1.5 m](cam-gravel-t1.jpg) ·
[run-off and gravel spill](cam-runoff-spill.jpg) · [Armco end with terminal](cam-armco.jpg) ·
[Armco round a bend](cam-armco-bend.jpg) · [paddock bays](cam-bays.jpg)

## What changed

| area | before | after |
|---|---|---|
| ground and track | three canvas tiles on fixed UV grids (grass 9 m, asphalt 12 m along v, gravel 10 m) | world-space shading from one noise image and one detail image at several scales, no tile grid, contrast-preserving blends and 0.15–2 m layers that keep the grain at a distance; palette of references §4.3–4.4; worn paint, faded kerbs, rubber in braking zones, gravel spilled only beside the traps |
| vegetation | 3 blob shapes, even scatter, ~2.7 M triangles, no LOD; tufts on the gravel (O3) | 7 Mediterranean species, every foliage clump on bark; a 15–40 m belt with bays and gaps, woods and clearings, open infield; near/far models switched per tree with hysteresis (a short dissolve while moving, none at rest); tufts kept off every surface, lit alike from both sides, fading by distance, alpha-to-coverage |
| buildings and barriers | one mesh per box (pits 181, grandstand 71, gantry 25) | merged per material (62 / 9 / 3); piers, blue doors, canopy, tower storeys and cladding, seat rows with aisles, space-frame roof, cranked debris fence, 2.9 km of Armco round the corner furniture with terminals, teal tyre stacks, paddock equipment |
| people | 15 meshes each; visor at the back, brim to the right, armL on the right; 3 crew popping in | 3 meshes each, correct left/right; 8 crew in working poses (arm IK: the jack man on the T-bar of a trolley jack, the tyre carrier holding a tyre on its tread), standing on the surface under them, dithered fade in and out; 4 visitors |

## Review fixes

| issue | cause | fix | measured |
|---|---|---|---|
| jack handle upside down, off the hands and the jack; jack box in the splitter | a fixed cylinder turned −1.05 rad | two-bone arm IK; a trolley jack 0.10 m ahead of the nose, handle from its socket to a T-bar under both hands | hands on the bar 0.000 m, socket 0.010 m from the trolley |
| tyre carrier holds a solid disc at chest height, forearm inside it | a 12-sided cylinder at the hand | a lathe tyre on a rim, upright at the hips, hands on the tread at 10 and 2 o'clock | hands 0.035 m outside the tread |
| half of every tuft 2.4× darker | up normals with DoubleSide: three.js flips the normal on back faces | the tuft shader keeps the up normal on both faces | back-face-only pixels 39/49/22 → 99/108/78 (front faces 96/105/76) |
| eucalyptus clumps float | 10 clumps at random places, 3 fixed branches | nine limbs, each ending in a clump with a smaller one along it; far model from the same clumps | floating clumps (eucalyptus / holm oak / maritime pine) 10/10, 8/8, 2/8 → 0 |
| LOD checkerboard in still frames | near and far drawn through a distance-driven dither across the whole 105–140 m band | a level per tree, switched with hysteresis, dissolving over 0.45 s only while the camera moves; settled at rest and on a snap | 0 half-faded trees after a snap on every tier |
| close-range gravel and asphalt detail lost | blends of independent detail samples averaged the contrast away; nothing between the pebbles and 10 m | blends renormalised around the channel means; a coarser detail scale and 0.15–2 m layers (stone clusters, patching, hollows, ripples, tussocks) | table below |
| Armco ~0.6 km in short rails ending in grass | runs blocked 30–35 m around every corner and gravel interval | the rail goes round the traps (2.5 m beyond their edge), ends at walls, flares gradually, terminals at open ends | 633 m in 7 runs → 2,919 m in 12 runs, 10 terminals |
| world build 2–4× slower, 'low' not cheap | placement and indexing did not scale with the tier; JS arrays and per-vertex objects | candidate grid and canopy map scale with the tier, 256 px detail image on 'low', two-pass typed occupancy, faster noise rows, lighter Armco indices | table below |
| crew and visitors sunk 2–4 cm | placed at y = 0 | stand on LAYERS.pitLane / LAYERS.paddock / the garage floor | feet within 0.0 mm of the surface (ray down onto the world) |
| paddock lines 3 mm from the asphalt and the car decal | box tops at 0.023 m; aprons overlapping the paddock 1–2 mm apart | a blended decal 5 mm above the asphalt drawn before the car's contact decal; asphalt pieces edge to edge in one layer | lines at 0.025 m; 7 pieces, no overlap |
| run-off spill reads as a dither band | thresholded white noise over 40 % of every run-off strip | a gravel mask gates it to run-off beside a trap; the gravel's own pebbles in a wandering 0.25–1.1 m strip | high-pass of the strip 4.12 → 6.19 |
| belt a uniform band, trees in the infield, eucalyptus 10 % | belt score 28–110 m; infield allowed; uncalibrated weights | belt 15–40 m deep from a wandering 25–37 m edge with bays and gaps; no infield trees; calibrated shares | infield trees 24 → 0; eucalyptus 9.8 → 21.8 % |
| small runtime allocations, unshared resources | `addUpdateRange` per refill, one decal plane per person, two chest materials | reused update ranges, one shared decal, `materials.toolChest` | — |

Surface grain (high-pass luminance deviation, L − Gaussian r = 4, same crops of the 1440×900 captures):

| surface | base | builder | after |
|---|---|---|---|
| asphalt near field, t = 0.05 | 1.04 | 0.94 | 1.22 |
| pit-lane asphalt, t = 0.2 | 2.03 | 1.51 | 1.76 |
| paddock asphalt, t = 0.7 | 1.41 | 0.89 | 1.33 |
| pit lane, t = 0.95 | 1.11 | 0.79 | 1.11 |
| gravel at T1 from 1.5 m (crops clear of the base's tufts) | 4.34 / 4.43 | — | 4.92 / 4.77 |

## Cost

`tools/env/probe.mjs`: `renderer.info` draw calls and triangles summed over every render call of the frame (shadow
passes included), the camera of the journey.

| quality | t | draw calls base → builder → after | triangles base → builder → after |
|---|---|---|---|
| high | 0.05 | 102 → 121 → 124 | 5.24 → 1.45 → 1.55 M |
| high | 0.2 | 723 → 547 → 546 | 5.44 → 1.66 → 1.66 M |
| high | 0.375 | 780 → 568 → 568 | 5.42 → 1.23 → 1.43 M |
| high | 0.5 | 730 → 554 → 556 | 5.50 → 1.88 → 1.91 M |
| high | 0.7 | 535 → 395 → 396 | 5.44 → 1.41 → 1.61 M |
| high | 0.95 | 394 → 221 → 223 | 5.27 → 1.43 → 1.47 M |
| mid | 0.05 | 98 → 117 → 118 | 3.26 → 0.91 → 1.04 M |
| mid | 0.2 | 722 → 543 → 542 | 3.46 → 1.21 → 1.23 M |
| mid | 0.375 | 783 → 571 → 571 | 3.45 → 0.98 → 1.13 M |
| mid | 0.5 | 714 → 538 → 540 | 3.42 → 1.25 → 1.22 M |
| mid | 0.7 | 535 → 391 → 390 | 3.46 → 1.00 → 1.15 M |
| mid | 0.95 | 390 → 217 → 215 | 3.29 → 0.94 → 1.01 M |
| low | 0.05 | 51 → 60 → 64 | 1.05 → 0.44 → 0.54 M |
| low | 0.2 | 442 → 403 → 403 | 1.19 → 0.62 → 0.71 M |
| low | 0.375 | 752 → 548 → 548 | 1.25 → 0.68 → 0.76 M |
| low | 0.5 | 702 → 521 → 521 | 1.22 → 0.68 → 0.73 M |
| low | 0.7 | 233 → 219 → 219 | 1.12 → 0.53 → 0.61 M |
| low | 0.95 | 150 → 121 → 122 | 1.06 → 0.47 → 0.55 M |

Every frame stays 39–73 % below the base in triangles and, except the 0.05 close-up (the near tree sets and their
shadows), 6–45 % below it in draw calls. After review the triangles rose by up to 0.2 M (the eucalyptus near and far
models carry their limbs and more clumps; 4.6× the Armco) and the draw calls by at most 4.

Texture memory (estimate of every texture bound to a scene material or shader uniform, format-aware, mipmaps
included; most of it is the hero car's), base → builder → after: high 44.05 → 43.02 → 43.16 MB, mid 42.55 → 41.52 →
41.35 MB, low 42.21 → 41.19 → 39.80 MB. The three canvas surface tiles (3.1 MB) became a 512 px detail image (256 px
on 'low') and a 256 px noise image; new are the canopy occlusion map (R8, 0.7 MB on high, 0.4 MB on mid, 0.2 MB on
low), the run-off gravel mask (R8, 0.15 MB), the lap texture (8 KB) and small seat, fence and W-beam textures.

World build in Node (`tools/env/build-time.mjs`: cold, each tree built in a fresh process, 6 interleaved rounds,
minimum; host load 0.6–1.4):

| quality | base | builder | after |
|---|---|---|---|
| high | 270 ms | 731 ms | 661 ms |
| mid | 301 ms | 708 ms | 670 ms |
| low | 250 ms | 606 ms | 503 ms |

Per phase (`tools/env/world-stats.mjs`, builder → after, high / mid / low): occupancy 133 / 108 / 87 → 73 / 58 / 46
ms, trees 85 / 66 / 60 → 92 / 60 / 34 ms, scrub 58 / 39 / 43 → 34 / 28 / 18 ms. `depthRange.build()` 78 / 52 / 25
ms. Per frame the vegetation refills its near sets after 6 m of camera travel and steps the levels of the near set;
no updater allocates.

## Checks

- `node scripts/test-environment.mjs` (high, mid, low; exits non-zero on failure):
  - every tree, scrub, pampas clump and tuft clears the track asphalt, kerbs, run-off, gravel, walls, pit lane,
    paddock, roads and buildings by more than its footprint (smallest margins on high: tufts 0.40–0.69 m, scrub
    0.54 m from a wall, trees 1.59 m from a wall and ≥ 28 m from the asphalt); no tree inside the loop;
  - species within 5 points of their reference shares (high: stone pine 34.1 %, eucalyptus 21.8 %, holm oak
    24.9 %, maritime pine 15.2 %, cypress 4.1 %); budgets per tier (high 5,200 trees / 3,804 scrub / 60 pampas /
    9,000 tufts; mid 0.6×; low 0.35×); finite transforms;
  - every foliage clump of every near model on bark; LOD bounds; after a snap no tree half-faded; on a 600 m walk
    far beyond fadeEnd and near before fadeStart − 6 m at every frame, settled within 0.45 s of stopping;
  - people left/right, visor and brim forward in all 11 poses; held props on the hands; everyone standing on the
    surface under them; the jack ahead of the car's nose; gradual fades;
  - paddock asphalt pieces without overlap, bay lines a decal 5 mm above them, drawn before the car's decal;
  - at least 2,500 m of Armco (2,919 m), ≥ 9.00 m from the asphalt, 3.44 m from gravel, 1.24 m from walls.
- `node scripts/measure-clearance.mjs`: near < clearance in 421 of 421 frames, no eye inside geometry.
- `test-geometry`, `test-car-motion`, `test-events` pass. No console errors or warnings in any capture.
- Repetition (`tools/env/repetition.py`, top-down 80 m over the infield): luminance autocorrelation at the old
  9 m grass period 0.68 → 0.27 (first pass).
- Shimmer after a 1 cm camera move (`tools/env/flicker.mjs`, first pass), kerb view at 1.5 m: 5,871 → 5,018 px
  (t = 0.05), 4,553 → 4,066 px (t = 0.5).

## Known limits

- The world build is still 2–2.5× the base (about 0.4 s more on high, 0.25 s on low, cold in Node): mostly the exact
  placement against the occupancy index and the noise and detail images. It runs before the first frame because
  `depthRange.build()` indexes the vegetation with the rest of the world.
- Eucalyptus is 21.8 % of the trees (reference 25 %): its stands follow a large noise field.
- The front jack waits just ahead of the nose rather than lifting the car (the car's motion owns its height).
- Grass albedo is the reference colour × 1.9, to keep the previous display brightness under the current lights.
