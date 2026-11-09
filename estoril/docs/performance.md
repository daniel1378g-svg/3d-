# Performance: declared devices, budgets and measurements

This page declares the devices the 3D journey is built for, the budget each one gets, and what the
build measures against them. The numbers come from `scripts/bench.mjs` (headless Chromium against a
served build), the leak and stability checks from `scripts/test-leaks.mjs`, and frame times on real
hardware from the page's own bench mode, `index.html?bench=1`.

**Read the numbers with this caveat.** Headless Chromium on this host renders WebGL with
SwiftShader, a CPU rasteriser: about 1–3 s per frame for this scene, which says nothing about any
GPU. So the bench measures what does not depend on the GPU: draw calls, triangles, shader programs,
GPU memory as allocated, drawing-buffer size, bytes downloaded, JavaScript time and allocations per
frame (with the GL draw calls skipped, see [Method](#method)), heap retention and WebGL contexts.
Shader compile and load times are SwiftShader's (CPU-bound) and are upper bounds, not device times.
**GPU frame times have to be measured on the devices**: that is what `?bench=1` is for.

## How the site picks a quality tier

`src/home.js` (`detectQuality`) decides once per page load:

| Outcome | When |
| --- | --- |
| stills (posters, no 3D) | `?3d=off`, `prefers-reduced-motion`, Save-Data, no WebGL 2 (or only with a major performance caveat), a software renderer (SwiftShader, llvmpipe), a lost context, a failed load |
| `low` | `navigator.deviceMemory` ≤ 2 GB or ≤ 2 logical cores |
| `mid` | a coarse pointer (phones, tablets), ≤ 4 GB, ≤ 4 cores, or a screen whose short side is < 700 px |
| `high` | everything else |

`?3d=force&q=low|mid|high` skips the check (tests, benchmarks).

What each tier sets:

| | high | mid | low |
| --- | --- | --- | --- |
| pixel ratio cap (`renderer.js maxPixelRatioFor`) | 2 | 1.75 | 1 |
| antialias (MSAA on the canvas) | yes | yes | no |
| shadow map (PCF soft, fitted to the view, `lighting.js`) | 4096² if `MAX_TEXTURE_SIZE` ≥ 8192, else 2048² | 2048² | none |
| motion blur on the lap (`motion-blur.js`) | yes | no | no |
| environment cube (`sky.js`) | 256² | 128² | 128² |
| anisotropy | 16× | 8× | 2× |
| vegetation, grass tufts, clouds (`world/context.js densityFor`) | 1 | 0.6 | 0.35 |
| world detail texture | 512² | 512² | 256² |
| car body | clear-coat material | clear-coat material | standard material |

## Declared device profiles

Each profile is a class of device and the tier the site gives it (`scripts/perf-probe.mjs
PROFILES`). The CPU slowdown is applied with CDP `Emulation.setCPUThrottlingRate` to this host's
cores (cloud vCPUs, roughly a current laptop core): ×4 for phones as a mid-range phone's JavaScript
speed, ×2 for a 4-core laptop. The memory column is what the GPU budget below is derived from.

| Profile | Viewport | DPR | Tier | Drawing buffer | CPU | Memory | Stands for |
| --- | --- | --- | --- | --- | --- | --- | --- |
| desktop-high | 1440×900 | 1 | high | 1440×900 (1.3 MP) | ×1 | 8 GB | desktop or Windows laptop at 100 %, > 4 cores, > 4 GB |
| desktop-high-2x | 1440×900 | 2 | high | 2880×1800 (5.2 MP) | ×1 | 8 GB, unified | Retina laptop (MacBook class), > 4 cores, > 4 GB |
| laptop-mid | 1280×800 | 2 | mid | 2240×1400 (3.1 MP) | ×2 | 4 GB, shared | 4-core or 4 GB laptop / Chromebook, integrated GPU |
| phone-mid | 390×844 | 3 | mid | 683×1477 (1.0 MP) | ×4 | 4 GB, shared | any current phone (coarse pointer → mid) |
| phone-low | 360×740 | 2 | low | 360×740 (0.27 MP) | ×4 | 2 GB, shared | phone with ≤ 2 GB or ≤ 2 cores |

## Budgets

Each budget follows from the device class, not from a measurement:

| Budget | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low | Why |
| --- | --- | --- | --- | --- | --- | --- |
| draw calls per frame, all passes, heaviest moment | 1000 | 1000 | 800 | 600 | 450 | the CPU cost of a frame grows with draws (≈ 10–20 µs each in three.js and the driver; 4× on phones) |
| triangles per frame, all passes | 3.0 M | 3.0 M | 2.0 M | 1.5 M | 0.8 M | ≈ 180, 120, 90 and 50 M triangles/s at 60 fps for desktop, integrated laptop, mid and low phone GPUs |
| shader programs | 64 | 64 | 56 | 56 | 48 | compile time at load and program memory |
| programs compiled after `warmup()` | 0 | 0 | 0 | 0 | 0 | each is a synchronous compile, a visible hitch |
| GPU memory: textures, render targets and the canvas | 512 MB | 512 MB | 256 MB | 256 MB | 128 MB | 1/16 of the class's memory (8, 8, 4, 4, 2 GB): integrated GPUs and phones take it from the system's memory, which the OS, the browser and the other tabs share; iOS ends a tab's process well below 1 GB in all |
| drawing buffer | 1.5 MP | 5.2 MP | 3.2 MP | 1.1 MP | 0.3 MP | the tier's pixel-ratio cap at the profile's viewport |
| JS time per frame, p95, with the profile's CPU slowdown | 8 ms | 8 ms | 12 ms | 16 ms | 16 ms | leaves the rest of a 16.7 ms frame to the browser and the GPU |
| garbage per frame | 256 KB | 256 KB | 256 KB | 256 KB | 256 KB | ≈ 15 MB/s at 60 fps: a young-generation GC (~1 ms) about once a second |
| JS heap retained after 600 frames (after a forced GC) | 256 KB | 256 KB | 256 KB | 256 KB | 256 KB | no growth while the page runs |
| scene ready (end of `warmup()`) since navigation, cold shader cache | 8 s | 8 s | 10 s | 12 s | 12 s | SwiftShader compiles shaders on the CPU: an upper bound |
| first load, 3D path (gzip) | 2.2 MB | 2.2 MB | 2.2 MB | 2.2 MB | 2.2 MB | ~2 s on a 10 Mbit/s mobile link; the stills show meanwhile |
| first load, stills path (gzip) | 1.0 MB | 1.0 MB | 1.0 MB | 1.0 MB | 1.0 MB | what Save-Data and reduced-motion visitors get |
| live WebGL contexts | 1 | 1 | 1 | 1 | 1 | the device check's probe context is released at once |

The GPU memory budget used to cover textures and render targets only (the canvas left out) and sat
just above the measurement on desktop-high-2x (504 MB against 512 MB). It now counts everything the
page holds on the GPU, the canvas included, against 1/16 of the device's memory.

## Results

`node scripts/bench.mjs --base http://127.0.0.1:<port>/` (600-frame sweeps; every profile in a browser
of its own), on the previous build (commit 0cf17f1) and on this one, both on this host in the same
session. **Bold** is now.

| Profile | draw calls (max) | triangles (max) | programs | compiled after warmup | GPU memory, canvas included | JS ms/frame p50 / p95 | garbage / frame | heap retained, 600 frames |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| desktop-high | 751 → **383** | 1.89 M → **1.90 M** | 48 → **48** | 0 → **0** | 316 → **288 MB** | 2.9 / 4.5 → **2.0 / 2.9** | 170 → **127 KB** | 32 → **31 KB** |
| desktop-high-2x | 751 → **383** | 1.89 M → **1.90 M** | 48 → **48** | 0 → **0** | 702 → **588 MB** | 2.9 / 4.0 → **1.9 / 2.9** | 177 → **133 KB** | 33 → **33 KB** |
| laptop-mid | 751 → **383** | 1.31 M → **1.31 M** | 45 → **45** | 0 → **0** | 197 → **197 MB** | 5.9 / 8.5 → **4.5 / 7.5** | 160 → **119 KB** | 13 → **−6 KB** |
| phone-mid | 751 → **383** | 1.31 M → **1.31 M** | 45 → **45** | 0 → **0** | 116 → **116 MB** | 10.2 / 20.8 → **8.1 / 13.1** | 129 → **105 KB** | 15 → **14 KB** |
| phone-low | 550 → **263** | 0.76 M → **0.76 M** | 41 → **41** | 0 → **0** | 47 → **47 MB** | 7.3 / 14.3 → **4.9 / 8.9** | 118 → **97 KB** | 12 → **14 KB** |

Budget check (now), value against the budget above: ✓ met, ✗ not met.

| | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low |
| --- | --- | --- | --- | --- | --- |
| draw calls | 383 ✓ | 383 ✓ | 383 ✓ | 383 ✓ | 263 ✓ |
| triangles | 1.90 M ✓ | 1.90 M ✓ | 1.31 M ✓ | 1.31 M ✓ | 0.76 M ✓ |
| programs | 48 ✓ | 48 ✓ | 45 ✓ | 45 ✓ | 41 ✓ |
| compiled after warmup | 0 ✓ | 0 ✓ | 0 ✓ | 0 ✓ | 0 ✓ |
| GPU memory, canvas included | 288 MB ✓ | 588 MB **✗** | 197 MB ✓ | 116 MB ✓ | 47 MB ✓ |
| drawing buffer | 1.3 MP ✓ | 5.18 MP ✓ | 3.14 MP ✓ | 1.01 MP ✓ | 0.27 MP ✓ |
| JS p95 | 2.9 ms ✓ | 2.9 ms ✓ | 7.5 ms ✓ | 13.1 ms ✓ | 8.9 ms ✓ |
| garbage / frame | 127 KB ✓ | 133 KB ✓ | 119 KB ✓ | 105 KB ✓ | 97 KB ✓ |
| heap retained | 31 KB ✓ | 33 KB ✓ | −6 KB ✓ | 14 KB ✓ | 14 KB ✓ |
| ready (cold) | 6092 ms ✓ | 6329 ms ✓ | 6469 ms ✓ | 7451 ms ✓ | 6922 ms ✓ |
| first load 3D (gzip) | 2027 KB ✓ | 2027 KB ✓ | 2027 KB ✓ | 1975 KB ✓ | 1975 KB ✓ |
| first load stills (gzip) | 887 KB ✓ | 887 KB ✓ | 887 KB ✓ | 833 KB ✓ | 833 KB ✓ |
| live WebGL contexts | 1 (of 2 created) ✓ | 1 (of 2 created) ✓ | 1 (of 2 created) ✓ | 1 (of 2 created) ✓ | 1 (of 2 created) ✓ |

**The high tier does not meet the declared GPU memory budget on a Retina laptop**: 588 MB against
512 MB (see [GPU memory](#gpu-memory) for what it is made of and [Not met](#not-met-and-what-would-fix-it)).
Every other budget is met on every profile; the previous build failed four (phone-mid draw calls and
JS p95, phone-low draw calls, and desktop-high-2x memory at 702 MB once the canvas is counted).

### Draw calls and triangles per moment (now)

Each cell: calls (of which shadow pass) · triangles (of which shadow pass), every pass of one frame.

| Moment | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low |
| --- | --- | --- | --- | --- | --- |
| arrival (t = 0.04) | 266 (18) · 1.73 M (0.33 M) | 266 (18) · 1.73 M (0.33 M) | 264 (18) · 1.21 M (0.24 M) | 206 (18) · 1.18 M (0.24 M) | 184 (0) · 0.70 M (0.00 M) |
| pit lane (t = 0.26) | 333 (114) · 1.73 M (0.43 M) | 333 (114) · 1.73 M (0.43 M) | 336 (114) · 1.30 M (0.38 M) | 252 (104) · 1.20 M (0.36 M) | 176 (0) · 0.68 M (0.00 M) |
| aerial (t = 0.375) | 383 (122) · 1.61 M (0.37 M) | 383 (122) · 1.61 M (0.37 M) | 383 (122) · 1.31 M (0.37 M) | 383 (122) · 1.31 M (0.37 M) | 263 (0) · 0.76 M (0.00 M) |
| on track (t = 0.49) | 277 (15) · 1.90 M (0.36 M) | 277 (15) · 1.90 M (0.36 M) | 153 (15) · 1.10 M (0.25 M) | 134 (15) · 1.11 M (0.25 M) | 118 (0) · 0.59 M (0.00 M) |
| paddock (t = 0.73) | 286 (109) · 1.67 M (0.41 M) | 286 (109) · 1.67 M (0.41 M) | 280 (106) · 1.21 M (0.35 M) | 249 (104) · 1.18 M (0.35 M) | 146 (0) · 0.64 M (0.00 M) |
| golden hour (t = 0.95) | 207 (86) · 1.57 M (0.39 M) | 207 (86) · 1.57 M (0.39 M) | 200 (88) · 1.10 M (0.32 M) | 190 (86) · 1.10 M (0.31 M) | 102 (0) · 0.58 M (0.00 M) |

Before, the same cells were 542/537/751/547/438/246 calls on desktop-high and 367/271/550/163/184/100 on
phone-low. The merged world strips (painted lines, kerbs, run-off) are culled as a whole, so the
ground-level moments draw up to 0.05 M more triangles than before; the heaviest moment for triangles
(the lap on high, the aerial elsewhere) is within 1 % of before.

### JS time per frame by stage (now), ms p50 / p95

| Stage | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low |
| --- | --- | --- | --- | --- | --- |
| arrival | 2.1 / 3.7 | 2.1 / 3.1 | 5.3 / 8.5 | 8.7 / 14.6 | 5.0 / 6.6 |
| pit lane | 2.1 / 2.7 | 1.9 / 2.4 | 5.1 / 7.3 | 9.4 / 11.8 | 5.1 / 7.5 |
| aerial | 2.3 / 3.0 | 2.4 / 3.7 | 4.6 / 7.3 | 8.9 / 15.0 | 4.5 / 8.5 |
| on track | 2.1 / 3.0 | 2.0 / 2.7 | 4.4 / 7.7 | 5.8 / 11.0 | 5.3 / 10.4 |
| paddock | 1.7 / 2.2 | 1.9 / 2.4 | 4.2 / 5.6 | 8.6 / 13.0 | 5.0 / 7.6 |
| golden hour | 1.4 / 1.8 | 1.6 / 1.9 | 3.3 / 3.7 | 7.2 / 14.1 | 4.1 / 6.1 |

The aerial on phone-mid was 15.8 / 34.9 ms before (751 draws). The p95 values on the phone profiles
move by a few milliseconds from run to run: the ×4 slowdown multiplies this shared host's scheduling
noise too. The p50 is the steadier figure.

### GPU memory

What the page holds on the GPU on desktop-high-2x, 588 MB in all (702 MB before):

| Bytes | What |
| --- | --- |
| 198 MB | the canvas (an estimate, see [Method](#method)): back and front colour buffers 2 × 20 MB, 4× MSAA colour 79 MB and depth 79 MB |
| 79 MB + 79 MB | blur target, 4× MSAA colour (RGBA8; 158 MB as RGBA16F before) and depth, 2880×1800 |
| 20 MB + 20 MB | blur target resolved colour (40 MB before) and depth texture |
| 5 MB | car mask, one 8-bit channel (20 MB as RGBA8 before) |
| 64 MB + 64 MB | shadow map 4096², RGBA-packed depth + its depth buffer |
| 21 MB | car base colour 2048² with mips |
| 12 MB | environment map (PMREM 256: output + ping-pong) |

On desktop-high (1×) the canvas and the blur targets are a quarter of that: 288 MB in all (316 MB
before), 128 MB of it the shadow map. On the mid profiles: 77 MB of textures and targets (shadow map
2048²: 32 MB, car textures 32 MB) plus the canvas (120 MB at 3.1 MP on laptop-mid, 38 MB on phone-mid);
on phone-low 47 MB.

### Load (now)

| | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low |
| --- | --- | --- | --- | --- | --- |
| journey chunk loaded (ms) | 415 | 431 | 596 | 884 | 841 |
| track + car metadata (ms) | 452 | 473 | 699 | 1178 | 972 |
| world built (ms) | 1242 | 1171 | 2205 | 3380 | 2484 |
| car loaded (ms) | 2303 | 2378 | 3244 | 3614 | 3455 |
| scene created (ms) | 2886 | 2921 | 4191 | 5278 | 5146 |
| shaders compiled, positions pre-rendered (ms) | 6092 | 6329 | 6469 | 7451 | 6922 |
| first frame shown (ms) | 6119 | 6358 | 6488 | 7468 | 6941 |
| world build (ms, data → world) | 790 | 698 | 1506 | 2202 | 1512 |
| 3D path, gzip (raw) | 2027 KB (2889 KB) | 2027 KB (2889 KB) | 2027 KB (2889 KB) | 1975 KB (2837 KB) | 1975 KB (2837 KB) |
| stills path, gzip | 887 KB | 887 KB | 887 KB | 833 KB | 833 KB |

Times are milliseconds since navigation start, from the page's performance marks, with the profile's
CPU slowdown, against a local server, and with SwiftShader compiling the shaders on the CPU (the gap
between "scene created" and "shaders compiled"): upper bounds. Every profile runs in a browser of its
own, so each one compiles its shaders from scratch: the previous table reused the first profile's
shader cache in the others (desktop-high-2x was "ready" in 3.8 s instead of ~6 s). Merging the static
meshes (below) adds about 15–30 ms to the world build on this host without slowdown (Node, the fastest
of six builds: 353 → 367 ms on high, 365 → 397 ms on mid), within the run-to-run noise of the table.

By kind (desktop, gzip): html 17 KB, css 13 KB, images 784 KB, js 220 KB, fonts 251 KB, data 6 KB,
models 736 KB. The car is 1.2 MB of it (its geometry, 735 KB, is "models"; its textures, 450 KB, are
among the images). The stills path: html 17 KB, css 13 KB, images 595 KB, js 11 KB, fonts 251 KB
(images: the five posters plus the news thumbnails Chrome fetches ahead of the scroll).

## What changed, and why

Commit c82378b → 0cf17f1 (items 1–4) kept every frame identical: `renderAt` stills at t = 0.04, 0.26,
0.375, 0.49, 0.73 and 0.95 (q=high, 960×600) hash to the same bytes. Items 5–7 (this change) keep the
frame to within float rounding: of 18 stills and a lap sequence (q=high 960×600 at nine positions, mid
390×844 at six, low 360×740 at three), 15 are byte-identical, 2 differ in 3 and 7 pixels on silhouette
edges (the control tower's trim), and the two frames drawn through the blur pass (the still at
t = 0.49 and the lap sequence) differ by one level in 9 % and 16 % of their channel values (item 6).

1. **No shader program lookups per frame** (`src/journey/program-variants.js`, `motion-blur.js
   addLightsToMask`, the fence's `forceSinglePass` in `world/main-straight.js`). three.js keeps one
   current program per material and rebuilds the program parameters and cache key whenever a draw
   does not fit it. Before: 31 lookups per frame at the arrival and 114 on the lap, from three causes:
   six world materials shared by instanced and plain meshes (and one shared shadow depth material for
   all casters); the car-mask pass of the motion blur, which hid the lights and changed the light
   setup twice a frame; and the transparent double-sided fence, which three.js draws in two passes
   with `needsUpdate` each time. After: 0 (2 on the lap, inside the mask pass's override material).
   The shared depth material also compiled view-dependent variants: one program was compiled on the
   lap (t ≈ 0.43–0.445), after warmup, and each new variant added vertex array objects (the leak test saw
   the old build grow from 965 to 1063 VAOs and 62 to 63 programs during a scroll session). Programs:
   63 → 48 on high, 51 → 45 on mid, 42 → 41 on low. Garbage on desktop-high: 399 → 201 KB per frame
   from this change alone (170 KB with 3 and 4 below).
2. **The mask target has no depth buffer** (`motion-blur.js`): a flat white union of the car's
   fragments needs no depth test. −5 MB at 1440×900, −20 MB at 2880×1800.
3. **Static world matrices** (`world/index.js freezeStaticMatrices`): nothing in the world moves after
   the build but the clouds, so three.js no longer recomposes ~260 object matrices every frame
   (3.4 → 2.8 ms per frame in a mid-tier sweep on this host, draws skipped).
4. **An allocation-free clearance search** (`depth-range.js`): the triangle distance took 12 doubles
   and returned one through calls V8 does not inline, so each triangle tested allocated heap numbers
   (~26 KB per frame over the journey, ~40 KB near the pit building); it now passes arrays and an
   index, and uses V8's own hypot algorithm without the builtin's argument array (bit-identical to
   `Math.hypot` in Chromium on 3 million random and all special-value triples), so the near plane is
   the same to the bit: ~2 KB per frame are left. The opaque sort returns signs only (`drawOrder`),
   which saves the ~7 KB per frame three.js's own comparator allocated.
5. **Static meshes merged into one draw per material** (`src/journey/util/static-merge.js`, used by
   `vehicles.js`, `world/index.js`; `people.js`). The phones were over their draw budgets at the
   aerial, which sees every mesh: each of the ten parked cars was 25–27 meshes (body, roof, glass,
   arch liners, and per wheel a tyre, a rim and a hub, lamps, bezels, bumpers, wing parts), 135 world
   parts (33 painted lines, 16 kerb and 16 run-off strips, 11 gravel traps, 11 barrier walls and 48
   steel, roof and pit-equipment parts) were meshes of their own, and every crew member's head was
   a separate mesh, also for the five whose head never turns. Meshes under a parent that draw alike
   (material, shadow flags, render order, layers, culling, vertex attributes; opaque, unnamed, not
   instanced, not mirrored) are now merged once into one mesh per kind: a car when it is built (9–11
   meshes, its contact decal included; its matrices are frozen once it is parked), the world at the
   end of its build (13 meshes for the 135 parts; after the vegetation is placed around the separate
   parts); a person's head is baked into the body unless `moving` lists it. Each part keeps its own
   vertices (transformed by its matrix, float32), material, shadow flags and draw order. The depth
   range indexes every merged part exactly as it indexed the separate mesh (`userData.indexParts`:
   its own box and chain of local matrices, multiplied in three.js's order; a part wider than 60 m by
   its triangles, merged only when it is already in the world's frame): the clearance at 95,376 eye
   points (high, mid and low worlds) is bit-identical to before, so the near plane and the camera's
   clearance solve are unchanged (`measure-clearance.mjs` 421/421, `test-camera.mjs` passes). Draw
   calls at the aerial: 751 → 383 on high and mid, 550 → 263 on low; shadow pass 203 → 122;
   geometries 555 → 266; phone-mid JS p95 20.8 → 13.1 ms.
6. **The blur target in 8 bits per channel, the car mask in one channel** (`motion-blur.js`). The
   target holds the frame as the canvas would show it (tone-mapped, display-encoded), which the canvas
   itself stores in 8 bits per channel, but it was RGBA16F: twice the bytes for the same values. It is
   now RGBA8 (`internalFormat`, keeping the sRGB colour space for the output encoding: three's default
   8-bit sRGB format would encode a second time) and the mask is R8. −114 MB on desktop-high-2x
   (multisampled colour 158 → 79 MB, resolved colour 40 → 20 MB, mask 20 → 5 MB), −29 MB on
   desktop-high. The blur pass at zero velocity now returns the direct frame exactly (`test-loop.mjs`:
   mean difference 0.107 → 0.000, largest 2 → 0 levels): the multisampled samples are stored and
   resolved like the canvas's. Frames through the pass differ from before by one level in 9–16 % of
   their channel values (the half-float values were rounded once, at the end), never visibly.
7. **The resolution governor counts every frame** (`src/home.js`): it ignored frames of 100 ms or
   more (the frame time is clamped to 0.1 s for the animation, and a clamped frame never counted), and
   it took any steady cadence slower than 30 ms for a capped refresh rate, so a device below 10 fps
   never lowered its resolution. It now governs on the unclamped interval (a second or more is a
   pause, not a frame) and treats only a steady 30–50 ms cadence as a capped refresh rate. Headless
   at q=low, 390×844, ~2 fps: 0 steps before, 1.00 → 0.90 now within the in-page bench's 73 frames.

### Garbage per frame

What the 600-frame `renderAt` sweep measures (the table above): 97–133 KB per frame. The live page
(its own rAF loop, q=high 1440×900, draws skipped; CDP sampling heap profiler with collected objects
included), before → now:

| Where | first 600 frames there (V8 still optimising that view's code) | 600 more frames at rest |
| --- | --- | --- |
| pit lane, t = 0.26 | 324 → 264 KB | 181 → 122 KB |
| on the lap, t = 0.5 (blur on) | 209 → 133 KB | 204 → 128 KB |

So the first ten seconds after the page first reaches a stage can exceed the 256 KB budget a little
(264 KB at the pit lane, transient, once per page); in steady state it is about half the budget.
Almost all of what remains is inside three.js r170: its uniform setters (`setValueM4`,
`setValueV3f`, `setValueM3`) compare and copy each value through two shared helpers
(`arraysEqual`, `copyArray`) that see every kind of array (plain arrays of numbers, Float32Arrays,
small-integer arrays), so their element reads cannot stay monomorphic and box every double they read;
`projectObject` and the render-list sort add the rest. Fewer draws mean fewer uploads, hence the
drop. Replacing the caches from outside three.js with Float64Arrays made it worse (153 → 216 KB per
frame in a sweep: the helpers became more polymorphic still), so it was not kept. Removing the rest
needs per-setter copies inside three.js; `node_modules` is shared and three.js is pinned, so that
would be a patch carried with the dependency, left for a three.js upgrade. The journey's own modules
allocate ~10 KB per frame (curve sampling for the car path, the LOD refill when the camera has moved
6 m, small heap numbers).

## Gradual quality changes

`src/home.js` lowers and raises the render scale (`journey.setResScale`, the drawing buffer =
CSS size × min(DPR, cap) × scale) in steps, never in jumps:

- frame times (the real rAF interval; an interval of a second or more is a pause and is skipped) are
  collected in batches of 30 frames (a preallocated buffer, sorted in place);
- a batch median above 21.5 ms lowers the scale by 0.05; a median below 16.5 ms in two batches in a
  row raises it by 0.05; medians in between change nothing (hysteresis); the scale stays on the grid
  of 0.05 steps (k / 20), so steps down and up never drift;
- after a change the next 700 ms are ignored (800 ms after a resize, 1.5 s after the loop starts or
  the page becomes visible);
- the scale never goes below an effective pixel ratio of 0.75, and never rises above a ceiling that
  drops whenever a step up had to be undone within 3 s, so it cannot oscillate;
- a steady 30–50 ms cadence (a display or a browser capping the refresh rate at 20–33 Hz) is left
  alone; slower than that is too slow whatever its rhythm.

Seen in the in-page bench, headless: at ~27 fps (q=high, draws skipped) five steps of 0.05 from 1.0
to the floor of 0.75, about one per second, and none back up; at ~2 fps (q=low, 390×844, SwiftShader
drawing) one step per 30-frame batch, 1.00 → 0.90 in the bench's 73 frames.

## Shadow resolution per tier

The shadow box follows the view (`lighting.js createShadowFollow`): 140 m across for the ground-level
shots, 1.7–1.9 km for the aerial, so the map size sets the sharpness of the close-ups. Measured at
the car (texel size against the drawing-buffer pixels per metre at the car's distance):

| | map | texel at the car | pixels per texel, ground-level stages | aerial |
| --- | --- | --- | --- | --- |
| desktop-high | 4096² | 3.4 cm | 2.7–3.8 | 0.6 |
| desktop-high-2x | 4096² | 3.4 cm | 5.4–7.7 | 1.1 |
| laptop-mid | 2048² | 6.8 cm | 7.2–10.2 | 1.7 |
| phone-mid | 2048² | 6.8 cm | 5.4–8.3 | 0.9 |
| phone-low | none | – | – | – |

So the contact shadows are crisp only on desktop-high (about 3 px per texel); on a Retina laptop and
on the mid tier one texel spans 5–10 px and PCF filtering turns the car's contact shadow into a soft
band a few centimetres wide, which reads as a soft contact shadow, not as stair-stepping. That is the
price of the mid tier's 2048² map (32 MB with its depth buffer): 4096² would add 96 MB, which takes
laptop-mid from 197 to ~293 MB against its 256 MB budget. On high the 4096² map (128 MB) falls back to
2048² when the GPU cannot do 8192² textures, a sign of an older or mobile GPU. Low has no shadow map
(the car keeps its baked ground occlusion). The aerial's box gives 0.5 m (high) or 0.8–0.9 m (mid)
texels, under 2 px each: enough for buildings and trees seen from 300–600 m.

## Leaks and stability

`node scripts/test-leaks.mjs --base http://127.0.0.1:<port>/` (live page, q=high, 1280×800, GL
objects counted at the GL entry points):

| Check | c82378b | 0cf17f1 | now |
| --- | --- | --- | --- |
| home → events → home ×8: JS heap after GC, slope per visit | −2 KB | 2 KB | −5 KB |
| 18 WebGL contexts created over 9 visits: released, no "too many contexts" warning | ok | ok | ok |
| every home visit holds the same GL objects | ok | ok | ok (404 VAOs, 1124 buffers, 48 programs) |
| 300 scroll steps + 30 stage jumps, twice: GL objects unchanged after the first pass | **fail** (VAOs 965 → 1063, programs 62 → 63) | ok | ok |
| 20 resizes at the top of the journey, back to the first size: same GL objects and bytes | ok | ok | ok |
| 20 resizes on the lap (t = 0.5, blur on): the blur targets follow the drawing buffer at every size, then the same GL objects and bytes | – | – | ok (20 of 20 sizes) |
| one render loop while running; none while hidden or scrolled away; one after 20 stop/start cycles | ok | ok | ok |
| listeners on window, document, journey, canvas unchanged | ok | ok | ok |
| JS heap after GC over the whole session | +159 KB | +139 KB | +183 KB |
| page errors, console errors or warnings | none | none | none |

The resize check used to run only at the top of the journey, where no render target depends on the
viewport; the blur targets are resized only while the blur renders, so it now also runs on the lap
and checks that the blur's multisampled colour buffer has the drawing buffer's size at each of the
20 sizes. The heap slopes (−5 to +13 KB per visit over 8 visits, in two runs of this build) are
within this host's GC noise.

The back/forward cache could not be exercised here: headless Chromium under automation restores no
page from it ("masked"), the stills page included, even with the cache switch and `no-store` header
removed. On a restore the page gets `visibilitychange` (visible), which restarts the loop through the
same path as the hidden/visible cycles above.

## Fallback posters

`site/assets/img/stage-1..5.webp` (1600×900) and `stage-1..5-p.webp` (900×1600) are rendered from the
final journey by `node scripts/make-posters.mjs --base http://127.0.0.1:<port>/`: each stage's moment
(t = 0.04, 0.26, 0.49, 0.73, 0.95) as a deterministic still at q=high, with the framing the live page
uses at that size (landscape at a 1600×900 viewport, portrait at 450×800 × 2 with the phone's bottom
sheet), read from the canvas before the page's panel shade and encoded by Chromium's WebP encoder at
quality 0.75 (55–89 KB each; the originals were 30–66 KB and showed far less). Sheets:
`docs/comparisons/posters/posters-before-after.jpg` and `fallback-3d-off-1440x900-390x844.jpg` (the
`?3d=off` page at each stage). The changes since leave these stills as they were (above: at those
moments the stills are byte-identical, differ in a few edge pixels, or, on the lap, by one level in a
tenth of the channel values), so the posters stand.

## Method

- **Draws skipped for CPU and allocation figures.** `scripts/perf-probe.mjs` (an init script) can turn
  `drawArrays`/`drawElements[Instanced]`/`drawRangeElements`/`blitFramebuffer` into no-ops. Everything
  else still reaches the GPU process (state, uniforms, buffer and texture uploads, shader compiles), and
  three.js counts its draws before issuing them, so the JavaScript side of a frame is unchanged while
  SwiftShader has nothing to rasterise. The time to issue the draw calls themselves (a few µs each) is
  not in the CPU figures.
- **Draw calls and triangles**: `renderer.info` with `autoReset` off, around one `renderAt(t, { dt })`
  frame, the shadow pass counted separately by wrapping `shadowMap.render`.
- **GPU memory**: bytes of every live texture level and renderbuffer as allocated (`texImage*`,
  `texStorage*`, `renderbufferStorage[Multisample]`, a third more for generated mips), minus deleted
  ones, plus the canvas's own buffers, which WebGL does not expose: estimated from the drawing-buffer
  size, the context's `antialias`, `depth` and `stencil` attributes and its sample count (read when the
  context is created) as a desktop GPU holds them: the browser's back and front colour buffers
  (RGBA8), and with antialias a multisampled colour and depth buffer of that many samples (else one
  depth buffer). A tile-based GPU (phones, Apple silicon) may keep the multisample storage on chip and
  then needs less; the figure is an upper bound there.
- **CPU**: `performance.now()` around `renderAt(t, { dt: 1/60 })` over a sweep of 600 frames through
  the whole journey, after an untimed sweep there and back (JIT, LOD sets).
- **Allocations**: CDP `HeapProfiler.startSampling` with objects collected by minor and major GCs
  included, over the same sweep; retention: `Runtime.getHeapUsage` after two forced GCs before and
  after it.
- **Load**: Playwright response bodies until the scene is ready, gzip estimated with zlib level 9 for
  text (images and fonts as they are); load phases from performance marks (`ce:3d-start`, `ce:chunk`,
  `ce:data`, `ce:world`, `ce:car`, `ce:created`, `ce:warm`, `ce:shown`) set by `src/home.js` and
  `src/journey/journey.js`; each profile in a fresh browser (no shader cache from another profile).
- **Late compiles**: `renderer.info.programs` watched over a sweep on a page that only `warmup()`
  has rendered.

## Measuring on a real device

Open `index.html?bench=1` (add `&3d=force&q=mid` to try another tier). Once the scene is ready the
page loads `src/bench.js` (its own 5 KB chunk; without the flag it is never requested) and plays a
33-second scripted scroll through the five stages at the device's frame rate, through the live path
(scroll → spring → render → adaptive resolution). It then shows the GPU name, the tier, the device
pixel ratio and the ratio used, the resolution scale (start, lowest, end, steps), the drawing buffer,
frame-time p50/p95/p99/worst overall and per stage, dropped frames (intervals over 1.5 refresh
periods), draw calls and triangles per stage, programs, and the load phases; "Copy results" gives
the JSON (also `window.__benchResult`). The per-stage table fits a 360 px phone (its type is 10–12 px
by the viewport's width; it wrapped every row at 390 px before).

## Not met, and what would fix it

- **GPU memory on a Retina laptop** (desktop-high-2x): 588 MB against 512 MB. At a pixel ratio of 2
  the high tier holds two 4× multisampled colour-and-depth sets of 5.2 MP: the canvas's (~158 MB, idle
  on the lap, where the frame is drawn into the blur target) and the blur target's (158 MB, allocated
  on the first lap and kept), plus the 128 MB shadow map. Look-neutral savings are taken (above: the
  blur target in 8 bits, the 1-channel mask, no mask depth buffer); what is left would need one of:
  drawing every high-tier frame through the multisampled target with a canvas created without MSAA
  (one set instead of two, −136 MB by the estimate; an extra full-screen copy per frame, and on GPUs
  that keep the canvas's MSAA on chip it would cost memory instead of saving it), or 2× MSAA for the
  blur target at a pixel ratio of 2 (−79 MB: 509 MB; slightly softer edges on the lap). Neither is
  done: the first can only be judged on the devices (`?bench=1` and the browser's task manager on a
  MacBook), the second changes the look. On Apple silicon, where Chrome may keep the canvas's
  multisample buffers on chip, the same page would hold ~430 MB, within the budget.
- **Garbage per frame** is within budget in steady state but not zero, and just over it for the first
  ten seconds at a new stage (above): what remains is inside three.js r170 and needs a three.js
  upgrade or patch.
- **Blur targets at DPR 2**: ~200 MB on desktop-high-2x, allocated on the first lap and kept (see the
  first item). Releasing them after the lap would not lower the peak, which is on the lap, and would
  add an allocation hitch on re-entry.
