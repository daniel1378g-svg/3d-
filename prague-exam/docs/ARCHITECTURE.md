# Prague Exam Drive: architecture

A first-person mock of the Czech practical driving exam (category B) on the real streets of
north-east Prague, about 7 × 7 km around the tram stop Arena Libeň jih. It runs in a phone browser
and is published as a claude.ai Artifact. The player sits in the driver's seat, an examiner gives
directions, traffic follows the rules, and at the end a result sheet says pass or fail, why, where,
and which rule applied.

## Hard constraints

- **Phone first.** iPhone Safari inside the Claude app is the main target. Portrait and landscape
  both work. Touch controls; keyboard on desktop. No device-motion APIs (the viewer blocks them).
- **Artifact viewer.** The published page is `dist/artifact/index.html`: page content only, no
  `<!doctype>`, `<html>`, `<head>` or `<body>` tags. The only external request allowed is the
  three.js script from cdnjs (and Google Fonts stylesheets). Everything else is bundled.
  `alert/confirm/prompt` do nothing. Audio starts only after a tap. Size the app with
  `height: 100%` on `html` and `body`, never `100vh`. Keep `env(safe-area-inset-*)` clear.
  `localStorage` may throw: wrap every access in try/catch.
- **Performance budget (phone):** under 150 draw calls and 300k triangles in view, pixel ratio
  capped at 2, no real-time shadows. Merge static geometry per chunk, instance repeated props.
- **Deterministic simulation.** Everything in `src/js/sim/` is plain JavaScript with no DOM and no
  three.js, runs in Node for tests, and takes randomness only from `sim/rng.js`.

## Conventions

- ES modules, 2-space indent, semicolons, single quotes. Comments explain why, in plain English.
- Units: metres, seconds, radians, m/s. km/h only in data tags and on screen.
- World frame (see `src/js/data/geo.js`): `+x` east, `+y` up, `+z` south. Heading `h` is clockwise
  from north, forward = `(sin h, 0, -cos h)`; in three.js `object.rotation.y = -h`.
- Area: `x, z ∈ [-3600, 3600]`, origin at the tram stop. Chunks are 240 m squares, 30 × 30.
- `src/js/render/**` and `src/js/ui/**` may use the DOM. Render code uses the **global `THREE`**
  (three.js 0.159 UMD from cdnjs, loaded by a classic script before the bundle). Do not
  `import 'three'`.
- Right-hand traffic, left-hand-drive car.

## Layout

```
prague-exam/
  tools/extract.py          Prague PBF -> .cache/raw.json (OSM nodes, ways, relations in the area)
  tools/build-data.mjs      runs tools/steps/NN-*.mjs -> data/<section>.pack
  tools/build.mjs           esbuild bundle + pages -> dist/site, dist/artifact
  tools/serve.mjs           static server: / -> dist/site, /dev /src /data -> source folders
  data/*.pack               generated map sections (committed)
  src/page.html             body markup of the game page
  src/css/game.css          all styles
  src/js/main.js            boot, game loop, state machine
  src/js/data/              geo.js (projection, chunks), pack.js (section container)
  src/js/sim/               rng.js, roadnet.js, vehicle.js, traffic.js, exam.js, lawbook.js
  src/js/render/            world chunks, vehicles, mirror; assets/ = procedural textures, signs, models
  src/js/ui/                input.js, hud.js, screens.js
  dev/                      standalone test pages (served at /dev/)
  test/                     node --test
```

Commands (run inside `prague-exam/`): `npm run data`, `npm run build`, `npm run serve`, `npm test`.

## Game states

`loading → menu → predrive → driving → result`, plus `paused` over `driving`.

- **menu**: mode (exam or free drive), start place, exam length (10, 20 or 30 minutes), traffic
  density, settings.
- **predrive**: the car is parked at the kerb with the engine off. The examiner asks the player to
  get ready. Seat belt, lights (dipped beam is mandatory at all times in Czechia), engine, gear,
  handbrake, indicator, look over the shoulder, pull away.
- **driving**: examiner instructions, traffic, fault detection.
- **result**: pass or fail sheet.

## Shared shapes

```js
// Player car (sim/vehicle.js)
car = { x, y, z, heading, pitch, roll,
        speed,            // m/s, negative when reversing
        steer,            // front wheel angle, rad, + = right
        throttle, brake,  // 0..1 as applied
        gear,             // 'P' | 'R' | 'N' | 'D'
        engineOn, handbrake, belt,
        indicator,        // 'off' | 'left' | 'right' | 'hazard'
        lights,           // 'off' | 'dipped'
        rpm, length: 4.4, width: 1.8, wheelbase: 2.6 }

// Input (ui/input.js): createInput(rootElement, settings) ->
input = { state: { steer,      // -1 (full left) .. 1 (full right)
                   throttle,   // 0..1
                   brake,      // 0..1
                   lookYaw,    // -1 (left shoulder) .. 1 (right shoulder), 0 = ahead
                   lookPitch },// -1 .. 1
          takeActions() }      // -> string[] of one-shot actions since the last call:
// 'indicatorLeft' 'indicatorRight' 'hazard' 'gearP' 'gearR' 'gearN' 'gearD' 'handbrake'
// 'engine' 'lights' 'belt' 'horn' 'pause'

// One fault (sim/exam.js), also the fail reason
fault = { code,                 // key into sim/lawbook.js
          severity,             // 'minor' | 'serious'
          t,                    // seconds since the exam started
          x, z, street,         // where
          speed, limit,         // km/h at that moment, when relevant
          note }                // optional extra detail, e.g. "62 km/h in a 50 zone"

// Result (sim/exam.js)
result = { passed, mode: 'exam',
           reason,              // the fault that ended the exam, or null
           faults,              // every fault in order
           stats: { duration, distance, avgSpeed, maxSpeed, junctions, stopsAtSigns, minor, serious },
           path,                // Float32Array [x0, z0, x1, z1, ...] of the driven line
           seed, startId }
```

## Fault codes

Serious faults end the exam at once, as when the instructor has to step in. Minor faults are
logged; the exam is failed when they reach the limit set in `lawbook.js`.

Serious: `RED_LIGHT`, `STOP_SIGN`, `NO_YIELD_SIGN`, `NO_YIELD_RIGHT`, `NO_YIELD_LEFT_TURN`,
`NO_YIELD_ROUNDABOUT`, `NO_YIELD_TRAM`, `NO_YIELD_PULL_OUT`, `PEDESTRIAN_CROSSING`,
`SPEEDING_MAJOR`, `WRONG_WAY`, `TURN_RESTRICTION`, `ONCOMING_LANE`, `OFF_ROAD`,
`COLLISION_VEHICLE`, `COLLISION_PEDESTRIAN`, `COLLISION_OBJECT`, `RAIL_CROSSING`.

Minor: `SPEEDING_MINOR`, `TOO_SLOW`, `HESITATION`, `NO_SIGNAL_TURN`, `LATE_SIGNAL`,
`SIGNAL_LEFT_ON`, `NO_SIGNAL_PULL_OUT`, `NO_SIGNAL_PULL_OVER`, `NO_SIGNAL_ROUNDABOUT_EXIT`,
`NO_SIGNAL_LANE_CHANGE`, `NO_OBSERVATION`, `WRONG_LANE`, `LANE_POSITION`, `STOP_LINE_OVERRUN`,
`BLOCKED_CROSSING`, `HARSH_BRAKING`, `NO_BELT`, `NO_LIGHTS`, `HANDBRAKE_ON`,
`IGNORED_INSTRUCTION`, `PARKING`.

## Working rules for everyone on this code

- Stay inside the files you were given. If another module needs a change, say so in your report.
- Do not run git commands that change anything (no commit, push, checkout, stash, reset).
- Do not edit `package.json` by hand for dependencies: use `npm install --save-dev <pkg>` inside
  `prague-exam/` and mention it in your report.
- Test what you build. Chromium and Playwright are installed (`require('playwright')` works from
  any directory, `chromium.launch()` needs no options). Do not run `playwright install`.
- The map data is © OpenStreetMap contributors (ODbL). Keep that credit visible in the game.
