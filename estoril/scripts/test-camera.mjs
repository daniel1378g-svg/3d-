// Camera path checks, in Node with the real modules: the world (world/index.js), the car's path and
// schedule (car-path.js, car-motion.js), the shot keys and the director (camera-shots.js,
// camera-director.js), the clearance index of the depth range (depth-range.js).
//
// node scripts/test-camera.mjs [--step 0.001] [--verbose] [--dump out.json]     exit code 1 on failure
//
// For every journey position t = 0..1 (step 0.001) and every viewport (1440×900 desktop, 390×844
// phone portrait, 1024×768 tablet), the car is placed as journey.js places it (at rest: the pose of
// renderAt) and the camera is posed by the director with the framing areas home.js passes for that
// layout (FRAMING below). Checks:
//   clearance   the eye stays at least WORLD_CLEARANCE from the static scene (the depth range's
//               grid: triangles of large meshes, boxes of buildings, instances and sprites) and at
//               least CAR_CLEARANCE from the car's box
//   continuity  eye, target and FOV are C1 in t: no jumps and no kinks. The second difference over
//               ±h is compared with the one over ±h/2: a C1 curve's shrinks 4× (O(h²)), a kink's
//               only 2× and a jump's not at all. Flagged when it shrinks less than 3× and is above
//               KINK_FLOOR + KINK_REL × the first difference (a velocity change of more than 5 %),
//               then examined at finer steps (refineKink). Kinks where the car's own path has one
//               (car-path.js: its arc-length table and joins) are counted as `inherited`, not failed.
//   car framing during the panel windows (home.js PANEL_WINDOWS) the car's projected box is fully
//               on screen and overlaps the panel's box by at most PANEL_OVERLAP of its area; in the
//               other car shots it is fully on screen
//   overhead    between the two overhead keys (the top of the aerial, while the red line closes the
//               lap) the whole circuit, centre line ± 7 m, is on screen inside the open framing area
//               (clear of the page header and ticker)
import { readFileSync, writeFileSync } from 'node:fs';
import { PerspectiveCamera, Scene, Vector3 } from 'three';

// --- minimal DOM for the canvas textures built by the world modules ------------------------------
const context2d = new Proxy(
  {},
  {
    get: (target, key) =>
      key in target ? target[key] : () => ({ addColorStop() {}, data: new Uint8ClampedArray(4) }),
    set: (target, key, value) => ((target[key] = value), true),
  },
);
globalThis.document ??= { createElement: () => ({ width: 0, height: 0, getContext: () => context2d }) };

const { buildWorld } = await import('../src/journey/world/index.js');
const { buildCarPath } = await import('../src/journey/car-path.js');
const { carScheduleKeys, computeLandmarks, createCarMotion, createCarSchedule, createPathSampler } =
  await import('../src/journey/car-motion.js');
const { CAMERA_SHOTS } = await import('../src/journey/camera-shots.js');
const { createCameraDirector, createCameraFrame } = await import('../src/journey/camera-director.js');
const { createDepthRange } = await import('../src/journey/depth-range.js');
const { createSkyDome, createSkyMaterial } = await import('../src/journey/sky.js');

const arg = (key, fallback) => {
  const i = process.argv.indexOf('--' + key);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const STEP = +arg('step', '0.001');
const VERBOSE = process.argv.includes('--verbose');
const DUMP = arg('dump', '');

/** Minimum distance (metres) from the eye to the static scene and to the car's box. */
const WORLD_CLEARANCE = 0.5;
const CAR_CLEARANCE = 1.2;
/**
 * Second differences below KINK_FLOOR (metres, degrees) plus KINK_REL of the step's first
 * difference are not examined: a velocity change of less than KINK_REL between two samples is
 * invisible (the car path's arc-length table alone makes ripples of about 1 %).
 */
const KINK_FLOOR = 2e-4;
const KINK_REL = 0.05;
/** A second difference that shrinks less than this when h halves is a kink or a jump. */
const KINK_RATIO = 3;
/** The car's box may overlap the panel's box by this fraction of its own area. */
const PANEL_OVERLAP = 0.02;
/** Panel windows (home.js PANEL_WINDOWS): the panel is fully shown inside them. */
const PANEL_WINDOWS = [
  [0, 0.085],
  [0.2, 0.315],
  [0.425, 0.56],
  [0.665, 0.79],
  [0.885, 1],
];
/**
 * Viewports, in CSS pixels, with the boxes of the page layout (site.css, measured in the page at
 * these sizes) and the framing areas home.js updateFraming() derives from them:
 *   panels   box of the panel of each stage [left, top, right, bottom]
 *   panel    free area with a panel shown; open: free area without one
 */
const VIEWPORTS = [
  {
    name: '1440x900',
    width: 1440,
    height: 900,
    panels: [
      [56, 215, 696, 750],
      [56, 137, 616, 797],
      [56, 137, 616, 797],
      [56, 137, 616, 797],
      [56, 137, 616, 568],
    ],
    panel: [720, 54, 1416, 816],
    open: [24, 54, 1416, 816],
  },
  {
    name: '390x844',
    width: 390,
    height: 844,
    panels: [
      [16, 404, 374, 770],
      [12, 301, 378, 774],
      [12, 301, 378, 774],
      [12, 301, 378, 774],
      [12, 301, 378, 774],
    ],
    panel: [8, 193, 382, 291],
    open: [8, 193, 382, 780],
  },
  {
    name: '1024x768',
    width: 1024,
    height: 768,
    panels: [
      [41, 240, 681, 656],
      [41, 122, 601, 680],
      [41, 122, 601, 649],
      [41, 122, 601, 680],
      [41, 122, 601, 523],
    ],
    panel: [705, 54, 1000, 684],
    open: [24, 54, 1000, 684],
  },
];

const root = new URL('..', import.meta.url).pathname;
const track = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;
const carMeta = JSON.parse(readFileSync(root + 'site/assets/models/hero-car.json', 'utf8'));
const carBox = carMeta.bounds;

// --- the scene and the car, as journey.js builds them ---------------------------------------------
const scene = new Scene();
const sky = createSkyDome(createSkyMaterial());
scene.add(sky);
const world = buildWorld(track, { quality: 'high' });
scene.add(world.root);
scene.updateMatrixWorld(true);
const camera = new PerspectiveCamera(36, 1, 0.3, 9e3);
const depthRange = createDepthRange(camera);
depthRange.build(scene, { sky, movers: [] });

const path = buildCarPath(track);
const sampler = createPathSampler(path);
const landmarks = computeLandmarks(path, track);
const distanceAt = createCarSchedule(carScheduleKeys(landmarks));
const carStub = { root: { position: new Vector3(), rotation: { y: 0 } }, pose() {} };
const carMotion = createCarMotion(carStub, sampler, landmarks.arrival);
const cameraFrame = createCameraFrame(sampler);
const director = createCameraDirector(camera, CAMERA_SHOTS, cameraFrame, { circuit: track, carBox });
const overheadKeys = CAMERA_SHOTS.filter((shot) => shot.pos.fit).map((shot) => shot.u);

/** Poses the car and the camera at progress t for viewport v (at rest, as renderAt does). */
function pose(t, v) {
  carMotion.lastDistance = distanceAt(t); // a teleport: the car at rest there
  carMotion.update(distanceAt(t), 0);
  cameraFrame.update(distanceAt(t));
  director.update({
    progress: t,
    introEase: 1,
    clock: 0,
    debugCam: null,
    width: v.width,
    height: v.height,
    framing: { panel: v.panelFractions, open: v.openFractions },
  });
  camera.updateMatrixWorld();
}

const scratch = new Vector3();
/** Screen position (CSS px) of world point p under the posed camera, or null behind it. */
function project(p, v) {
  scratch.copy(p).applyMatrix4(camera.matrixWorldInverse);
  if (scratch.z > -0.05) return null;
  scratch.applyMatrix4(camera.projectionMatrix);
  return [(scratch.x * 0.5 + 0.5) * v.width, (0.5 - scratch.y * 0.5) * v.height];
}

/** The car's 8 box corners in world space. */
function carCorners() {
  const { p, f, r } = carMotion.frame;
  const out = [];
  for (let i = 0; i < 8; i++) {
    const bx = i & 1 ? carBox[1][0] : carBox[0][0];
    const by = i & 2 ? carBox[1][1] : carBox[0][1];
    const bz = i & 4 ? carBox[1][2] : carBox[0][2];
    out.push(
      new Vector3()
        .copy(p)
        .addScaledVector(f, bx)
        .addScaledVector(r, bz)
        .setY(p.y + by),
    );
  }
  return out;
}

/** Distance from `eye` to the car's oriented box. */
function carDistance(eye) {
  const { p, f, r } = carMotion.frame;
  const d = scratch.subVectors(eye, p);
  const x = d.x * f.x + d.z * f.z;
  const z = d.x * r.x + d.z * r.z;
  const y = d.y;
  const dx = Math.max(carBox[0][0] - x, 0, x - carBox[1][0]);
  const dy = Math.max(carBox[0][1] - y, 0, y - carBox[1][1]);
  const dz = Math.max(carBox[0][2] - z, 0, z - carBox[1][2]);
  return Math.hypot(dx, dy, dz);
}

const CHANNEL_NAMES = ['eye.x', 'eye.y', 'eye.z', 'tgt.x', 'tgt.y', 'tgt.z', 'fov'];

/**
 * A sample that looked like a kink at step h is examined at finer steps (h/8 … h/512) around it: a
 * smooth curve that was only under-sampled (a fast bend) becomes C1-like (ratio → 4), a real kink
 * keeps a ratio near 2 and a velocity change that does not shrink with the step. Returns the kink
 * ({ t, h, ratio, change }) or null.
 */
function refineKink(state, c, t0, h0) {
  let centre = t0;
  let span = h0;
  for (let level = 0; level < 3; level++) {
    const h = span / 8;
    let worst = null;
    for (let k = -8; k <= 8; k++) {
      const t = centre + k * h;
      if (t - h < 0 || t + h > 1) continue;
      const a = state(t - h)[c];
      const b = state(t)[c];
      const d = state(t + h)[c];
      const am = state(t - h / 2)[c];
      const dm = state(t + h / 2)[c];
      const d2 = Math.abs(d - 2 * b + a);
      const d1 = Math.max(Math.abs(d - b), Math.abs(b - a));
      const ratio = d2 / Math.max(Math.abs(dm - 2 * b + am), 1e-12);
      const change = d2 / Math.max(d1, 1e-12);
      if (
        d2 > KINK_FLOOR * (h / h0) + KINK_REL * d1 &&
        ratio < KINK_RATIO &&
        (!worst || change > worst.change)
      )
        worst = { t, h, ratio, change };
    }
    if (!worst) return null;
    centre = worst.t;
    span = h;
    if (level === 2) return worst;
  }
  return null;
}

const panelStage = (t) => PANEL_WINDOWS.findIndex(([a, b]) => t >= a - 1e-9 && t <= b + 1e-9);
const failures = [];
const fail = (message) => {
  failures.push(message);
  if (VERBOSE) console.log('FAIL', message);
};
const report = {};

for (const v of VIEWPORTS) {
  camera.aspect = v.width / v.height;
  v.panelFractions = [
    v.panel[0] / v.width,
    v.panel[1] / v.height,
    v.panel[2] / v.width,
    v.panel[3] / v.height,
  ];
  v.openFractions = [v.open[0] / v.width, v.open[1] / v.height, v.open[2] / v.width, v.open[3] / v.height];
  const rows = [];
  const samples = Math.round(1 / STEP);
  // channels: eye xyz, target xyz, fov at t - h, t - h/2, t, t + h/2, t + h
  // camera channels, then the car's (its position and its smoothed heading × 10 m)
  const state = (t) => {
    pose(Math.min(1, Math.max(0, t)), v);
    const { p, f } = cameraFrame;
    return [
      ...director.position.toArray(),
      ...director.target.toArray(),
      camera.fov,
      p.x,
      p.z,
      10 * f.x,
      10 * f.z,
    ];
  };
  // a camera kink where the car's own path has one is the car's motion, not the camera's
  const carKinkNear = (t, h) => [7, 8, 9, 10].some((c) => refineKink(state, c, t, h));
  let minWorld = { d: Infinity };
  let minCar = { d: Infinity };
  let worstKink = { ratio: Infinity };
  let worstFrame = { margin: Infinity };
  let worstOverlap = { overlap: 0, t: '-' };
  let worstOverhead = { margin: Infinity };
  const counts = { clearance: 0, kinks: 0, framing: 0, overhead: 0, inherited: 0 };
  for (let i = 0; i <= samples; i++) {
    const t = +(i * STEP).toFixed(6);
    const h = STEP;
    const sMinus = i > 0 ? state(t - h) : null;
    const sHalfMinus = i > 0 ? state(t - h / 2) : null;
    const sHalfPlus = i < samples ? state(t + h / 2) : null;
    const sPlus = i < samples ? state(t + h) : null;
    const s = state(t);
    const subject = director.evaluateShots.car;

    // clearance
    depthRange.update(director.position, director.target);
    const world = depthRange.clearance;
    const car = carDistance(director.position);
    if (world < minWorld.d) minWorld = { d: world, t };
    if (car < minCar.d) minCar = { d: car, t };
    if (world < WORLD_CLEARANCE || car < CAR_CLEARANCE) {
      counts.clearance++;
      fail(`${v.name} t=${t}: clearance world ${world.toFixed(3)} m, car ${car.toFixed(3)} m`);
    }

    // continuity (C1): second differences over h and h/2, refined where they look like a kink
    if (sMinus && sPlus) {
      for (let c = 0; c < 7; c++) {
        const d2 = Math.abs(sPlus[c] - 2 * s[c] + sMinus[c]);
        const d2half = Math.abs(sHalfPlus[c] - 2 * s[c] + sHalfMinus[c]);
        const d1 = Math.max(Math.abs(sPlus[c] - s[c]), Math.abs(s[c] - sMinus[c]));
        if (d2 < KINK_FLOOR + KINK_REL * d1 || d2 / Math.max(d2half, 1e-12) >= KINK_RATIO) continue;
        const kink = refineKink(state, c, t, h);
        if (kink && carKinkNear(kink.t, h)) {
          counts.inherited++;
          if (VERBOSE)
            console.log(`${v.name} t=${kink.t.toFixed(5)}: ${CHANNEL_NAMES[c]} kink follows the car path's`);
          continue;
        }
        if (kink && kink.ratio < worstKink.ratio) worstKink = { ...kink, channel: CHANNEL_NAMES[c] };
        if (kink) {
          counts.kinks++;
          fail(
            `${v.name} t=${kink.t.toFixed(5)}: ${CHANNEL_NAMES[c]} not C1 (velocity changes by ` +
              `${(100 * kink.change).toFixed(0)} % within ${kink.h.toExponential(1)} of progress)`,
          );
        }
      }
    }

    // the car in frame during car shots
    if (subject > 0.999) {
      const pts = carCorners().map((p) => project(p, v));
      if (pts.some((p) => !p)) {
        counts.framing++;
        fail(`${v.name} t=${t}: the car is behind the camera`);
      } else {
        const x0 = Math.min(...pts.map((p) => p[0]));
        const x1 = Math.max(...pts.map((p) => p[0]));
        const y0 = Math.min(...pts.map((p) => p[1]));
        const y1 = Math.max(...pts.map((p) => p[1]));
        const onScreen = Math.min(x0, y0, v.width - x1, v.height - y1);
        const stage = panelStage(t);
        let overlap = 0;
        if (stage >= 0) {
          const [px0, py0, px1, py1] = v.panels[stage];
          const ox = Math.max(0, Math.min(x1, px1) - Math.max(x0, px0));
          const oy = Math.max(0, Math.min(y1, py1) - Math.max(y0, py0));
          overlap = (ox * oy) / Math.max(1, (x1 - x0) * (y1 - y0));
        }
        if (onScreen < worstFrame.margin)
          worstFrame = { margin: +onScreen.toFixed(1), t, box: [x0, y0, x1, y1].map(Math.round) };
        if (overlap > worstOverlap.overlap) worstOverlap = { overlap: +overlap.toFixed(4), t };
        if (onScreen < 0 || overlap > PANEL_OVERLAP) {
          counts.framing++;
          fail(
            `${v.name} t=${t}: car box ${[x0, y0, x1, y1].map(Math.round)} ` +
              (onScreen < 0 ? 'leaves the screen' : `overlaps the panel by ${(overlap * 100).toFixed(1)} %`),
          );
        }
      }
    }

    // the whole circuit at the top of the aerial
    if (t >= overheadKeys[0] - 1e-9 && t <= overheadKeys[overheadKeys.length - 1] + 1e-9) {
      let margin = Infinity;
      for (const [x, z] of track)
        for (const side of [-7, 7]) {
          const p = project(new Vector3(x, 0, z + side), v);
          if (!p) {
            margin = -Infinity;
            break;
          }
          margin = Math.min(margin, p[0] - v.open[0], p[1] - v.open[1], v.open[2] - p[0], v.open[3] - p[1]);
        }
      if (margin < worstOverhead.margin) worstOverhead = { margin: +margin.toFixed(1), t };
      if (margin < 0) {
        counts.overhead++;
        fail(`${v.name} t=${t}: part of the circuit is outside the open area (${margin.toFixed(1)} px)`);
      }
    }
    rows.push({ t, eye: s.slice(0, 3), tgt: s.slice(3, 6), fov: s[6], subject, world, car });
  }
  report[v.name] = rows;
  console.log(
    `${v.name}: closest scene ${minWorld.d.toFixed(2)} m at t=${minWorld.t}, closest car ` +
      `${minCar.d.toFixed(2)} m at t=${minCar.t}; lowest h/(h/2) curvature ratio ` +
      `${worstKink.ratio === Infinity ? '-' : worstKink.ratio.toFixed(2)} (${worstKink.channel ?? '-'} at t=${worstKink.t ?? '-'}); ` +
      `car on screen by at least ${worstFrame.margin} px (t=${worstFrame.t}), panel overlap at most ` +
      `${(100 * worstOverlap.overlap).toFixed(1)} % (t=${worstOverlap.t}); overhead margin ${worstOverhead.margin} px at t=${worstOverhead.t} ` +
      `(heading ${director.overhead.heading}°); failures ${JSON.stringify(counts)}`,
  );
}

if (DUMP) writeFileSync(DUMP, JSON.stringify(report));
if (failures.length) {
  if (!VERBOSE) for (const message of failures.slice(0, 40)) console.log('FAIL', message);
  if (!VERBOSE && failures.length > 40) console.log(`… and ${failures.length - 40} more`);
  console.log(`FAIL: ${failures.length} camera checks failed`);
  process.exit(1);
}
console.log('OK: all camera checks passed');
