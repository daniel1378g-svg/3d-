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
speed, ×2 for a 4-core laptop.

| Profile | Viewport | DPR | Tier | Drawing buffer | CPU | Stands for |
| --- | --- | --- | --- | --- | --- | --- |
| desktop-high | 1440×900 | 1 | high | 1440×900 (1.3 MP) | ×1 | desktop or Windows laptop at 100 %, > 4 cores, > 4 GB |
| desktop-high-2x | 1440×900 | 2 | high | 2880×1800 (5.2 MP) | ×1 | Retina laptop (MacBook class), > 4 cores, > 4 GB |
| laptop-mid | 1280×800 | 2 | mid | 2240×1400 (3.1 MP) | ×2 | 4-core or 4 GB laptop / Chromebook, integrated GPU |
| phone-mid | 390×844 | 3 | mid | 683×1477 (1.0 MP) | ×4 | any current phone (coarse pointer → mid) |
| phone-low | 360×740 | 2 | low | 360×740 (0.27 MP) | ×4 | phone with ≤ 2 GB or ≤ 2 cores |

## Budgets

| Budget | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low | Why |
| --- | --- | --- | --- | --- | --- | --- |
| draw calls per frame, all passes, heaviest moment | 1000 | 1000 | 800 | 600 | 450 | the CPU cost of a frame grows with draws (≈ 10–20 µs each in three.js and the driver; 4× on phones) |
| triangles per frame, all passes | 3.0 M | 3.0 M | 2.0 M | 1.5 M | 0.8 M | vertex throughput of the class at 60 fps with headroom |
| shader programs | 64 | 64 | 56 | 56 | 48 | compile time at load and program memory |
| programs compiled after `warmup()` | 0 | 0 | 0 | 0 | 0 | each is a synchronous compile, a visible hitch |
| texture + render-target memory | 320 MB | 512 MB | 128 MB | 128 MB | 64 MB | integrated GPUs and phones share system memory; iOS kills tabs well below 1 GB |
| drawing buffer | 1.5 MP | 5.2 MP | 3.2 MP | 1.1 MP | 0.3 MP | the tier's pixel-ratio cap at the profile's viewport |
| JS time per frame, p95, with the profile's CPU slowdown | 8 ms | 8 ms | 12 ms | 16 ms | 16 ms | leaves the rest of a 16.7 ms frame to the browser and the GPU |
| garbage per frame | 256 KB | 256 KB | 256 KB | 256 KB | 256 KB | ≈ 15 MB/s at 60 fps: a young-generation GC (~1 ms) about once a second |
| JS heap retained after 600 frames (after a forced GC) | 256 KB | 256 KB | 256 KB | 256 KB | 256 KB | no growth while the page runs |
| scene ready (end of `warmup()`) since navigation | 8 s | 8 s | 10 s | 12 s | 12 s | SwiftShader compiles shaders on the CPU: an upper bound |
| first load, 3D path (gzip) | 2.2 MB | 2.2 MB | 2.2 MB | 2.2 MB | 2.2 MB | ~2 s on a 10 Mbit/s mobile link; the stills show meanwhile |
| first load, stills path (gzip) | 1.0 MB | 1.0 MB | 1.0 MB | 1.0 MB | 1.0 MB | what Save-Data and reduced-motion visitors get |
| live WebGL contexts | 1 | 1 | 1 | 1 | 1 | the device check's probe context is released at once |

## Results

`node scripts/bench.mjs --base http://127.0.0.1:<port>/` (600-frame sweeps), on the build before this
work (commit c82378b) and after it. **Bold** is after.

| Profile | draw calls (max) | triangles (max) | programs | compiled after warmup | texture + targets | JS ms/frame p50 / p95 | garbage / frame | heap retained, 600 frames |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| desktop-high | 753 → **751** | 1.89 M → **1.89 M** | 63 → **48** | 1 → **0** | 272 → **267 MB** | 3.3 / 4.7 → **2.8 / 5.3** | 399 → **170 KB** | 21 → **29 KB** |
| desktop-high-2x | 753 → **751** | 1.89 M → **1.89 M** | 63 → **48** | 1 → **0** | 524 → **504 MB** | 2.8 / 4.3 → **2.7 / 5.0** | 397 → **170 KB** | 19 → **12 KB** |
| laptop-mid | 753 → **751** | 1.31 M → **1.31 M** | 51 → **45** | 0 → **0** | 77 → **77 MB** | 6.7 / 11.4 → **6.0 / 10.7** | 328 → **160 KB** | 7 → **12 KB** |
| phone-mid | 753 → **751** | 1.31 M → **1.31 M** | 51 → **45** | 0 → **0** | 77 → **77 MB** | 13.1 / 23.7 → **10.2 / 20.4** | 283 → **128 KB** | 9 → **16 KB** |
| phone-low | 552 → **550** | 0.76 M → **0.76 M** | 42 → **41** | 0 → **0** | 44 → **44 MB** | 8.0 / 17.4 → **7.8 / 15.2** | 215 → **118 KB** | -13 → **11 KB** |

Budget check (after), value against the budget above: ✓ met, ✗ not met.

| | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low |
| --- | --- | --- | --- | --- | --- |
| draw calls | 751 ✓ | 751 ✓ | 751 ✓ | 751 **✗** | 550 **✗** |
| triangles | 1.89 M ✓ | 1.89 M ✓ | 1.31 M ✓ | 1.31 M ✓ | 0.76 M ✓ |
| programs | 48 ✓ | 48 ✓ | 45 ✓ | 45 ✓ | 41 ✓ |
| compiled after warmup | 0 ✓ | 0 ✓ | 0 ✓ | 0 ✓ | 0 ✓ |
| texture + targets | 267 MB ✓ | 504 MB ✓ | 77 MB ✓ | 77 MB ✓ | 44 MB ✓ |
| drawing buffer | 1.3 MP ✓ | 5.18 MP ✓ | 3.14 MP ✓ | 1.01 MP ✓ | 0.27 MP ✓ |
| JS p95 | 5.3 ms ✓ | 5 ms ✓ | 10.7 ms ✓ | 20.4 ms **✗** | 15.2 ms ✓ |
| garbage / frame | 170 KB ✓ | 170 KB ✓ | 160 KB ✓ | 128 KB ✓ | 118 KB ✓ |
| heap retained | 29 KB ✓ | 12 KB ✓ | 12 KB ✓ | 16 KB ✓ | 11 KB ✓ |
| ready (warm) | 6027 ms ✓ | 3799 ms ✓ | 5524 ms ✓ | 6731 ms ✓ | 6477 ms ✓ |
| first load 3D (gzip) | 2026 KB ✓ | 2026 KB ✓ | 2026 KB ✓ | 1973 KB ✓ | 1973 KB ✓ |
| first load stills (gzip) | 887 KB ✓ | 887 KB ✓ | 887 KB ✓ | 833 KB ✓ | 833 KB ✓ |
| live WebGL contexts | 1 (of 2 created) ✓ | 1 (of 2 created) ✓ | 1 (of 2 created) ✓ | 1 (of 2 created) ✓ | 1 (of 2 created) ✓ |

### Draw calls and triangles per moment (after)

Each cell: calls (of which shadow pass) · triangles (of which shadow pass), every pass of one frame.

| Moment | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low |
| --- | --- | --- | --- | --- | --- |
| arrival (t = 0.04) | 542 (19) · 1.72 M (0.32 M) | 542 (19) · 1.72 M (0.32 M) | 540 (19) · 1.20 M (0.23 M) | 370 (19) · 1.16 M (0.23 M) | 367 (0) · 0.69 M (0.00 M) |
| pit lane (t = 0.26) | 537 (162) · 1.69 M (0.42 M) | 537 (162) · 1.69 M (0.42 M) | 541 (161) · 1.27 M (0.37 M) | 327 (140) · 1.17 M (0.35 M) | 271 (0) · 0.65 M (0.00 M) |
| aerial (t = 0.375) | 751 (203) · 1.61 M (0.37 M) | 751 (203) · 1.61 M (0.37 M) | 751 (203) · 1.31 M (0.37 M) | 751 (203) · 1.31 M (0.37 M) | 550 (0) · 0.76 M (0.00 M) |
| on track (t = 0.49) | 547 (18) · 1.89 M (0.35 M) | 547 (18) · 1.89 M (0.35 M) | 217 (18) · 1.07 M (0.24 M) | 180 (18) · 1.07 M (0.24 M) | 163 (0) · 0.56 M (0.00 M) |
| paddock (t = 0.73) | 438 (155) · 1.63 M (0.40 M) | 438 (155) · 1.63 M (0.40 M) | 434 (154) · 1.17 M (0.33 M) | 326 (145) · 1.13 M (0.34 M) | 184 (0) · 0.61 M (0.00 M) |
| golden hour (t = 0.95) | 246 (115) · 1.53 M (0.37 M) | 246 (115) · 1.53 M (0.37 M) | 240 (118) · 1.06 M (0.30 M) | 216 (114) · 1.05 M (0.30 M) | 100 (0) · 0.54 M (0.00 M) |

### JS time per frame by stage (after), ms p50 / p95

| Stage | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low |
| --- | --- | --- | --- | --- | --- |
| arrival | 2.9 / 4.7 | 2.9 / 3.9 | 6.8 / 9.8 | 11.0 / 15.7 | 9.7 / 14.8 |
| pit lane | 4.3 / 6.9 | 2.9 / 3.8 | 6.5 / 10.4 | 12.7 / 23.7 | 7.9 / 13.1 |
| aerial | 3.8 / 6.3 | 3.2 / 7.2 | 9.0 / 12.9 | 13.1 / 33.5 | 11.5 / 18.5 |
| on track | 2.8 / 4.2 | 3.3 / 5.4 | 6.1 / 11.6 | 8.6 / 14.5 | 6.1 / 16.4 |
| paddock | 2.5 / 3.8 | 2.5 / 4.5 | 5.7 / 6.9 | 9.2 / 12.7 | 7.5 / 12.0 |
| golden hour | 2.0 / 3.0 | 2.4 / 2.6 | 3.6 / 5.9 | 9.8 / 20.6 | 4.7 / 11.3 |

The p95 values on the phone profiles move by several milliseconds from run to run: the ×4 slowdown
multiplies this shared host's scheduling noise too. The p50 is the steadier figure.

### GPU memory (after)

Largest allocations on desktop-high-2x (the canvas itself, 5.2 MP with 4× MSAA, ≈ 200 MB more, is not
counted):

| Bytes | What |
| --- | --- |
| 158 MB | blur target, colour, 2880×1800 half float, 4× MSAA |
| 79 MB | blur target, depth, 4× MSAA |
| 64 MB + 64 MB | shadow map 4096², RGBA-packed depth + its depth buffer |
| 40 MB + 20 MB | blur target resolved colour and depth texture |
| 21 MB | car base colour 2048² with mips |
| 12 MB | environment map (PMREM 256: output + ping-pong) |

On desktop-high (1×) the blur targets are a quarter of that: 267 MB in all, 128 MB of it the shadow
map. On the mid profiles: 77 MB (shadow map 2048²: 32 MB, car textures 32 MB); on phone-low 44 MB.

### Load (after)

| | desktop-high | desktop-high-2x | laptop-mid | phone-mid | phone-low |
| --- | --- | --- | --- | --- | --- |
| journey chunk loaded (ms) | 466 | 424 | 640 | 870 | 794 |
| track + car metadata (ms) | 593 | 568 | 771 | 986 | 913 |
| world built (ms) | 1478 | 1518 | 2296 | 3029 | 2465 |
| car loaded (ms) | 3284 | 2515 | 3289 | 3487 | 2875 |
| scene created (ms) | 3731 | 2896 | 4094 | 4862 | 4277 |
| shaders compiled, positions pre-rendered (ms) | 6027 | 3799 | 5524 | 6731 | 6477 |
| first frame shown (ms) | 6052 | 3828 | 5542 | 6753 | 6500 |
| world build (ms, data → world) | 885 | 950 | 1525 | 2043 | 1552 |
| 3D path, gzip (raw) | 2026 KB (2884 KB) | 2026 KB (2884 KB) | 2026 KB (2884 KB) | 1973 KB (2832 KB) | 1973 KB (2832 KB) |
| stills path, gzip | 887 KB | 887 KB | 887 KB | 833 KB | 833 KB |

Times are milliseconds since navigation start, from the page's performance marks, with the profile's
CPU slowdown, against a local server, and with SwiftShader compiling the shaders on the CPU (the gap
between "scene created" and "shaders compiled"): upper bounds. The profiles after the first one run in
the same browser and reuse Chromium's shader cache, which is why desktop-high-2x is ready sooner.

By kind (desktop, gzip): html 17 KB, css 13 KB, images 784 KB, js 219 KB, fonts 251 KB, data 6 KB,
models 736 KB. The car is 1.2 MB of it (its geometry, 735 KB, is "models"; its textures, 450 KB, are
among the images). The stills path: html 17 KB, css 13 KB, images 595 KB, js 11 KB, fonts 251 KB
(images: the five posters plus the news thumbnails Chrome fetches ahead of the scroll).

## What changed, and why

All of these keep the frame identical: `renderAt` stills at t = 0.04, 0.26, 0.375, 0.49, 0.73 and
0.95 (q=high, 960×600) hash to the same bytes before and after.

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
   the same to the bit: ~2 KB per frame are left. The opaque sort returns signs only (`drawOrder`), which saves the ~7 KB per
   frame three.js's own comparator allocated.

Of the 170 KB per frame that remain on high, ~150 KB is three.js r170's own per-draw bookkeeping:
`setValueM4` and the other uniform setters copy each changed matrix into a cache array of boxed
numbers (~55 KB), the uniform uploads and `projectObject` (~40 KB), plus the environment probe's PMREM
re-capture each time the solar hour moves by 0.2 h (~16 KB per frame averaged over a scroll through
the day). The journey's own modules allocate ~10 KB per frame (three.js curve sampling for the car
path, the LOD refill when the camera has moved 6 m, small heap numbers). Measured with the sampling
heap profiler on an unminified build, collected objects included.

## Gradual quality changes

`src/home.js` lowers and raises the render scale (`journey.setResScale`, the drawing buffer =
CSS size × min(DPR, cap) × scale) in steps, never in jumps:

- frame times are collected in batches of 30 frames (a preallocated buffer, sorted in place);
- a batch median above 21.5 ms lowers the scale by 0.05; a median below 16.5 ms in two batches in a
  row raises it by 0.05; medians in between change nothing (hysteresis);
- after a change the next 700 ms are ignored (800 ms after a resize, 1.5 s after the loop starts);
- the scale never goes below an effective pixel ratio of 0.75, and never rises above a ceiling that
  drops whenever a step up had to be undone within 3 s, so it cannot oscillate;
- a steady cadence slower than 30 ms (a display or a browser capping the refresh rate) is left alone.

Seen in the in-page bench, headless at ~27 fps (draws skipped): five steps of 0.05 from 1.0 to the
floor of 0.75, about one per second, and none back up.

## Shadow resolution per tier

The shadow box follows the view (`lighting.js createShadowFollow`): 140 m across for the ground-level
shots, up to 2.2 km for the aerial, so the map size sets the sharpness of the close-ups. On high the
4096² map gives 3.4 cm texels at the car (the contact shadow under the sills and tyres), at 128 MB
with its depth buffer; it falls back to 2048² when the GPU cannot do 8192² textures, a sign of an
older or mobile GPU. Mid uses 2048² (6.8 cm texels, 32 MB): phones show the car at a third of the
desktop's pixel size, so the texels stay below a pixel. Low has no shadow map (the car keeps its baked
ground occlusion). The aerial's 2.2 km box gives 0.5 m (high) or 1.1 m (mid) texels, enough for
buildings and trees seen from 300–600 m.

## Leaks and stability

`node scripts/test-leaks.mjs --base http://127.0.0.1:<port>/` (live page, q=high, 1280×800, GL
objects counted at the GL entry points):

| Check | Before | After |
| --- | --- | --- |
| home → events → home ×8: JS heap after GC, slope per visit | −2 KB | 2 KB |
| 18 WebGL contexts created over 9 visits: released, no "too many contexts" warning | ok | ok |
| every home visit holds the same GL objects | ok | ok |
| 300 scroll steps + 30 stage jumps, twice: GL objects unchanged after the first pass | **fail** (VAOs 965 → 1063, programs 62 → 63) | ok |
| 20 resizes back to the first size: same GL objects and bytes | ok | ok |
| one render loop while running; none while hidden or scrolled away; one after 20 stop/start cycles | ok | ok |
| listeners on window, document, journey, canvas unchanged | ok | ok |
| JS heap after GC over the whole session | +159 KB | +139 KB |
| page errors, console errors or warnings | none | none |

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
`?3d=off` page at each stage).

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
  ones. Without the canvas's own buffers.
- **CPU**: `performance.now()` around `renderAt(t, { dt: 1/60 })` over a sweep of 600 frames through
  the whole journey, after an untimed sweep there and back (JIT, LOD sets).
- **Allocations**: CDP `HeapProfiler.startSampling` with objects collected by minor and major GCs
  included, over the same sweep; retention: `Runtime.getHeapUsage` after two forced GCs before and
  after it.
- **Load**: Playwright response bodies until the scene is ready, gzip estimated with zlib level 9 for
  text (images and fonts as they are); load phases from performance marks (`ce:3d-start`, `ce:chunk`,
  `ce:data`, `ce:world`, `ce:car`, `ce:created`, `ce:warm`, `ce:shown`) set by `src/home.js` and
  `src/journey/journey.js`.
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
the JSON (also `window.__benchResult`).

## Not met, and what would fix it

- **Draw calls on phones** (phone-mid 751 > 600, phone-low 550 > 450, both at the aerial). The aerial
  sees the whole circuit, so every mesh is drawn: 284 of the 548 scene draws are the 22 people and
  paddock cars (~13 meshes each), 156 are unmerged world parts, and the shadow pass adds 203. The
  tiers thin the vegetation but not these. Merging each person's and paddock car's static parts into
  one mesh per material, batching the remaining world boxes with `world/batch.js`, and skipping
  shadow casters below a texel of the aerial's 2.2 km box would bring the aerial near 300 draws; each
  changes how the scene is built (and the depth range's index), so it is left for a dedicated change
  with its own captures.
- **JS time on phone-mid** (p95 20.4 ms at ×4, 23.7 before; p50 10.2 ms, 13.1 before). The same draws are most of it: three.js's
  per-draw work (`renderBufferDirect`, uniform uploads, `projectObject`) is ~80 % of a frame's CPU
  time. On real phones the adaptive resolution does not help here (it saves GPU time, not CPU time),
  so the draw-call work above is the fix.
- **Garbage per frame** is within budget but not zero: what remains is inside three.js r170 (see
  above) and would need a three.js upgrade or patch.
- **Blur targets at DPR 2**: ~300 MB on desktop-high-2x, allocated on the first lap and kept. Within the
  budget; releasing them after the lap would trade memory for an allocation hitch on re-entry.
