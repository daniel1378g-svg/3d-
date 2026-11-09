// Camera path checks, in Node with the real modules: the world (world/index.js), the car's path and
// schedule (car-path.js, car-motion.js), the shot keys and the director (camera-shots.js,
// camera-director.js), the clearance index of the depth range (depth-range.js).
//
// node scripts/test-camera.mjs [--step 0.001] [--verbose] [--dump out.json]     exit code 1 on failure
//
// For every journey position t = 0..1 (step 0.001) and every layout in scripts/camera-viewports.json
// (desktops, phones and tablets, portrait and landscape), the car, the pit crew and the paddock
// visitors are placed as journey.js places them (at rest: the pose of renderAt) and the camera is
// posed by the director with the framing areas home.js passes for that layout (VIEWPORTS below;
// test-loop.mjs checks them against the live page and --update-viewports measures them). Checks:
//   clearance   the eye stays at least WORLD_CLEARANCE from the scene (the depth range's grid:
//               triangles of large meshes, boxes of buildings, instances and sprites, plus the crew,
//               the visitors and the paddock cars) and at least CAR_CLEARANCE from the car's box
//   continuity  eye, target and FOV are C1 in t: no jumps and no kinks. The second difference over
//               ±h is compared with the one over ±h/2: a C1 curve's shrinks 4× (O(h²)), a kink's
//               only 2× and a jump's not at all. Flagged when it shrinks less than 3× and is above
//               KINK_FLOOR + KINK_REL × the first difference (a velocity change of more than 5 %),
//               then examined at finer steps (refineKink). Kinks where the car's own path has one
//               (car-path.js: its arc-length table and joins) are counted as `inherited`, not failed.
//   FOV         stays below the viewport's maxFov (VIEWPORTS, one rule for every layout, test-loop.mjs
//               layoutEntry: the widest key for that aspect, 50° on desktop, 51° at 4:3 and 60° on
//               the phone, or the widest car-shot key widened by the whole between-keys car fit,
//               FIT_EXTRA_FOV + FIT_FALLBACK_FOV, plus 2° for the key solve), and its second
//               difference per step stays below FOV_D2 (no zoom pumping: the old fit swung it by
//               35–40° within 0.01–0.02 of progress, up to 120° on the phone)
//   car framing in every car shot the car's projected outline (a car-shaped hull in its bounding box,
//               camera-director.js carOutline) is fully on screen and inside the framing area the
//               director frames it in (the panel and open areas blended by camera-director.js
//               panelWeight), overlaps the stage buttons and the skip link (where the layout keeps the
//               framing areas clear of them: `nav`, `skip`) by at most PANEL_OVERLAP of its
//               area, and overlaps each panel's box by at most PANEL_OVERLAP while the panel is fully
//               shown, FADING_OVERLAP once weighted by the panel's opacity while it fades (home.js: 1
//               in its window, fading over PANEL_FADE before and after it); a layout whose page
//               layout makes that impossible says so explicitly (`allow` in VIEWPORTS)
//   drone shots while the car is less than AERIAL_SUBJECT of the subject (the climb, the aerial and
//               the dive), the car fit leaves the authored shot nearly alone: the view within
//               AERIAL_TURN of the keys' alone, the eye within AERIAL_EYE, the FOV within AERIAL_FOV
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
const { CAMERA_SHOTS, PANEL_FADE, PANEL_WINDOWS } = await import('../src/journey/camera-shots.js');
const { carOutline, createCameraDirector, createCameraFrame, panelWeight, viewportTan } =
  await import('../src/journey/camera-director.js');
const { createPitCrew, placePaddockCars, placePaddockVisitors, updatePaddockVisitors, updatePitCrew } =
  await import('../src/journey/crew-staging.js');
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
/**
 * The car's box may overlap the stage buttons, the skip link or a fully shown panel's box by
 * PANEL_OVERLAP of its area; a fading panel's box by FADING_OVERLAP once weighted by the panel's
 * opacity: the car glides between the free band and the middle of the screen while a panel fades, and
 * may cross a panel's edge while that panel is faint (all of the car under a panel at 20 %, which
 * darkens it by 15 %, or half of it at 40 %). The old framing left it under panels at 33–80 % (desktop) and 60 % (phone).
 */
const PANEL_OVERLAP = 0.02;
const FADING_OVERLAP = 0.2;
/** Largest second difference of the FOV (degrees) between samples STEP apart. */
const FOV_D2 = 0.25;
/**
 * While the car is less than AERIAL_SUBJECT of the subject (the drone's climb and dive, and the
 * aerial), the car fit may turn the authored view (the keys alone, director.evaluateShots) by at
 * most AERIAL_TURN degrees, move its eye by at most AERIAL_EYE metres and widen it by at most
 * AERIAL_FOV degrees: the climb tilts towards the circuit as authored (a fit that spilled into it
 * kept looking down at the pit roof, 15° off the keys at subject 0.4).
 */
const AERIAL_SUBJECT = 0.5;
const AERIAL_TURN = 5;
const AERIAL_EYE = 2;
const AERIAL_FOV = 1;
/**
 * Viewports (scripts/camera-viewports.json), in CSS pixels, with the boxes of the page layout
 * (site.css, measured in the page at these sizes) and the framing areas home.js updateFraming()
 * derives from them (framing.js); test-loop.mjs checks them against the live page:
 *   maxFov     widest vertical FOV allowed (degrees)
 *   panels     box of the panel of each stage [left, top, right, bottom]
 *   buttons    box of the stage buttons
 *   nav        the stage buttons' box: the car must keep clear of it (framing.js keeps both framing
 *              areas clear of the buttons: beside them on desktop, below or left of them on phones),
 *              or null where the layout lets car shots pass under them (set by hand: at 4:3 the column
 *              between the panels and the buttons is too narrow for the car)
 *   skip       the skip link's box, the same way (null at 4:3, where car shots pass under it too)
 *   panel      free area with a panel shown; open: free area without one
 *   allow      optional, for a layout whose page layout cannot keep the car clear (the reason in
 *              `why`, printed with the result): `panelOverlap`, the fraction of the car's box that may
 *              be under a panel (shown or fading, × its opacity), `areaPx`, how far (CSS px) its
 *              outline may leave the framing area, and `aerialEye`, how far (metres) the car fit may
 *              move the eye of a drone shot off its keys. Without it the defaults above hold
 */
const VIEWPORTS = JSON.parse(readFileSync(new URL('camera-viewports.json', import.meta.url), 'utf8'));

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
const openBox = world.root.userData.openBox;
const crew = createPitCrew();
scene.add(...crew.members);
placePaddockCars(scene);
const visitors = placePaddockVisitors(scene);
scene.updateMatrixWorld(true);
const camera = new PerspectiveCamera(36, 1, 0.3, 9e3);
const depthRange = createDepthRange(camera);
const movers = [...crew.members, ...visitors.map(([person]) => person)];
depthRange.build(scene, { sky, movers });
/** Clearance from the static scenery (movers hidden), as journey.js gives the director. */
function staticClearance(eye, look) {
  const shown = movers.map((mover) => mover.visible);
  for (const mover of movers) mover.visible = false;
  depthRange.update(eye, look);
  movers.forEach((mover, i) => (mover.visible = shown[i]));
  return depthRange.clearance;
}

const path = buildCarPath(track);
const sampler = createPathSampler(path);
const landmarks = computeLandmarks(path, track);
const distanceAt = createCarSchedule(carScheduleKeys(landmarks));
const carStub = { root: { position: new Vector3(), rotation: { y: 0 } }, pose() {} };
const carMotion = createCarMotion(carStub, sampler, landmarks.arrival);
const cameraFrame = createCameraFrame(sampler);
const keyFrame = createCameraFrame(sampler);
const director = createCameraDirector(camera, CAMERA_SHOTS, cameraFrame, {
  circuit: track,
  carBox,
  frameAt: (at) => keyFrame.update(distanceAt(at)),
  clearanceAt: staticClearance,
});
const overheadKeys = CAMERA_SHOTS.filter((shot) => shot.pos.fit).map((shot) => shot.u);

/** Poses the car and the camera at progress t for viewport v (at rest, as renderAt does). */
function pose(t, v) {
  carMotion.lastDistance = distanceAt(t); // a teleport: the car at rest there
  carMotion.update(distanceAt(t), 0);
  cameraFrame.update(distanceAt(t));
  updatePitCrew(crew, t, 0, sampler, landmarks.pitBox, openBox);
  updatePaddockVisitors(visitors, t, 0);
  director.update({
    progress: t,
    introEase: 1,
    clock: 0,
    debugCam: null,
    width: v.width,
    height: v.height,
    framing: { panel: v.panelFractions, open: v.openFractions, windows: PANEL_WINDOWS, fade: PANEL_FADE },
  });
  camera.updateMatrixWorld();
}

const scratch = new Vector3();
const keyEye = new Vector3();
const keyLook = new Vector3();
const poseEye = new Vector3();
const poseLook = new Vector3();
/** Screen position (CSS px) of world point p under the posed camera, or null behind it. */
function project(p, v) {
  scratch.copy(p).applyMatrix4(camera.matrixWorldInverse);
  if (scratch.z > -0.05) return null;
  scratch.applyMatrix4(camera.projectionMatrix);
  return [(scratch.x * 0.5 + 0.5) * v.width, (0.5 - scratch.y * 0.5) * v.height];
}

/**
 * The car's silhouette points in world space: the car-shaped hull the director fits (carOutline:
 * the floor, the rear wing, the nose, the windscreen top) in the car's actual pose.
 */
const carHull = carOutline(carBox);
function carCorners() {
  const { p, f, r } = carMotion.frame;
  const out = [];
  for (let i = 0; i < carHull.length; i += 3)
    out.push(
      new Vector3()
        .copy(p)
        .addScaledVector(f, carHull[i])
        .addScaledVector(r, carHull[i + 2])
        .setY(p.y + carHull[i + 1]),
    );
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

/** Panel opacity of `stage` at progress t, as home.js panelOpacity(). */
function panelOpacity(stage, t) {
  const [from, to] = PANEL_WINDOWS[stage];
  if (t < from) return Math.min(1, Math.max(0, 1 - (from - t) / PANEL_FADE));
  if (t > to && stage < PANEL_WINDOWS.length - 1) return Math.min(1, Math.max(0, 1 - (t - to) / PANEL_FADE));
  return 1;
}
/** Fraction of box a's area inside box b ([x0, y0, x1, y1]). */
function overlapOf(a, b) {
  const ox = Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0]));
  const oy = Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
  return (ox * oy) / Math.max(1, (a[2] - a[0]) * (a[3] - a[1]));
}
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
  let worstArea = { margin: Infinity, t: '-' };
  const allow = v.allow || {};
  const areaSlack = allow.areaPx || 0;
  const overlapAllowed = allow.panelOverlap || 0;
  const eyeAllowed = allow.aerialEye || 0;
  let worstOverlap = { overlap: 0, t: '-' };
  let worstOverhead = { margin: Infinity };
  const worstAerial = { turn: 0, eye: 0, fov: 0 };
  let worstNav = { overlap: 0, t: '-' };
  let worstSkip = { overlap: 0, t: '-' };
  let worstFovD2 = { d2: 0, t: '-' };
  let widest = { fov: 0, t: '-' };
  const keyFovs = CAMERA_SHOTS.map(
    (shot) => (2 * Math.atan(viewportTan(shot.fov, camera.aspect)) * 180) / Math.PI,
  );
  const maxFov = v.maxFov;
  const counts = { clearance: 0, kinks: 0, framing: 0, overhead: 0, inherited: 0, fov: 0, aerial: 0 };
  let carWidths = [];
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
      const fit = director.fitAt(t);
      fail(
        `${v.name} t=${t}: clearance world ${world.toFixed(3)} m, car ${car.toFixed(3)} m (eye ` +
          `${director.position.toArray().map((x) => x.toFixed(1))}, fit dolly ${fit.back.toFixed(3)})`,
      );
    }

    // the FOV: within the viewport's range, no pumping
    if (s[6] > widest.fov) widest = { fov: +s[6].toFixed(2), t };
    if (s[6] > maxFov) {
      counts.fov++;
      fail(`${v.name} t=${t}: FOV ${s[6].toFixed(1)}° is wider than ${maxFov.toFixed(1)}°`);
    }
    if (sMinus && sPlus) {
      const d2 = Math.abs(sPlus[6] - 2 * s[6] + sMinus[6]);
      if (d2 > worstFovD2.d2) worstFovD2 = { d2: +d2.toFixed(4), t };
      if (d2 > FOV_D2) {
        counts.fov++;
        fail(`${v.name} t=${t}: the FOV's second difference is ${d2.toFixed(3)}° (zoom pumping)`);
      }
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
        const box = [x0, y0, x1, y1];
        // the framing area the director fits the car in at t
        const w = panelWeight(t, PANEL_WINDOWS, PANEL_FADE);
        const area = v.open.map((o, a) => o + (v.panel[a] - o) * w);
        const inArea = Math.min(x0 - area[0], y0 - area[1], area[2] - x1, area[3] - y1);
        if (inArea < worstArea.margin) worstArea = { margin: +inArea.toFixed(1), t };
        // each panel's overlap weighted by its opacity, the stage buttons' and the skip link's
        let overlap = 0;
        let stage = -1;
        let excess = 0;
        for (let k = 0; k < PANEL_WINDOWS.length; k++) {
          const opacity = panelOpacity(k, t);
          const weighted = overlapOf(box, v.panels[k]) * opacity;
          const allowed = Math.max(overlapAllowed, opacity > 0.999 ? PANEL_OVERLAP : FADING_OVERLAP);
          if (weighted > overlap) {
            overlap = weighted;
            stage = k;
          }
          excess = Math.max(excess, weighted - allowed);
        }
        const nav = v.nav ? overlapOf(box, v.nav) : 0;
        const skip = v.skip ? overlapOf(box, v.skip) : 0;
        carWidths.push(x1 - x0);
        if (onScreen < worstFrame.margin)
          worstFrame = { margin: +onScreen.toFixed(1), t, box: box.map(Math.round) };
        if (overlap > worstOverlap.overlap) worstOverlap = { overlap: +overlap.toFixed(4), t };
        if (nav > worstNav.overlap) worstNav = { overlap: +nav.toFixed(4), t };
        if (skip > worstSkip.overlap) worstSkip = { overlap: +skip.toFixed(4), t };
        if (onScreen < 0 || inArea < -areaSlack || excess > 0 || Math.max(nav, skip) > PANEL_OVERLAP) {
          counts.framing++;
          fail(
            `${v.name} t=${t}: car box ${box.map(Math.round)} ` +
              (onScreen < 0
                ? 'leaves the screen'
                : inArea < -areaSlack
                  ? `leaves the framing area ${area.map(Math.round)} by ${(-inArea).toFixed(1)} px`
                  : excess > 0
                    ? `overlaps panel ${stage} by ${(overlap * 100).toFixed(1)} % (× its opacity)`
                    : nav > PANEL_OVERLAP
                      ? `overlaps the stage buttons by ${(nav * 100).toFixed(1)} %`
                      : `overlaps the skip link by ${(skip * 100).toFixed(1)} %`),
          );
        }
      }
    }

    // the drone's shots as authored: the pose at t (s: the continuity check may have posed the
    // camera and the car's frame elsewhere since) against the keys' alone
    if (subject < AERIAL_SUBJECT) {
      cameraFrame.update(distanceAt(t));
      const keyFov = director.evaluateShots(t, keyEye, keyLook);
      poseEye.fromArray(s, 0);
      const turn = (keyLook.sub(keyEye).angleTo(poseLook.fromArray(s, 3).sub(poseEye)) * 180) / Math.PI;
      const eye = keyEye.distanceTo(poseEye);
      const fov = Math.abs(s[6] - keyFov);
      worstAerial.turn = Math.max(worstAerial.turn, +turn.toFixed(2));
      worstAerial.eye = Math.max(worstAerial.eye, +eye.toFixed(2));
      worstAerial.fov = Math.max(worstAerial.fov, +fov.toFixed(2));
      if (turn > AERIAL_TURN || eye > Math.max(AERIAL_EYE, eyeAllowed) || fov > AERIAL_FOV) {
        counts.aerial++;
        fail(
          `${v.name} t=${t}: the car fit moves the drone's shot (subject ${subject.toFixed(2)}): view turned ` +
            `${turn.toFixed(1)}°, eye ${eye.toFixed(2)} m, FOV ${fov.toFixed(2)}° off the keys`,
        );
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
  if (VERBOSE)
    director.keyInfo.forEach((key, k) =>
      console.log(
        `${v.name} key ${CAMERA_SHOTS[k].u}: dolly ${director.dollies[k].toFixed(2)} of ${key.wanted.toFixed(2)} ` +
          `(swung ${key.angle}°), ` +
          `FOV ${key.fov.toFixed(1)}°, eye ${key.eye.map((x) => x.toFixed(1))}, target ${key.look.map((x) => x.toFixed(1))}`,
      ),
    );
  carWidths.sort((a, b) => a - b);
  const widthAt = (q) => Math.round(carWidths[Math.floor(q * (carWidths.length - 1))]);
  console.log(
    `${v.name}: closest scene ${minWorld.d.toFixed(2)} m at t=${minWorld.t}, closest car ` +
      `${minCar.d.toFixed(2)} m at t=${minCar.t}; lowest h/(h/2) curvature ratio ` +
      `${worstKink.ratio === Infinity ? '-' : worstKink.ratio.toFixed(2)} (${worstKink.channel ?? '-'} at t=${worstKink.t ?? '-'}); ` +
      `FOV ${Math.min(...keyFovs).toFixed(1)}–${widest.fov}° (t=${widest.t}, limit ${maxFov.toFixed(1)}), largest second ` +
      `difference ${worstFovD2.d2}° (t=${worstFovD2.t}); car on screen by at least ${worstFrame.margin} px ` +
      `(t=${worstFrame.t}), inside the framing area by at least ${worstArea.margin} px (t=${worstArea.t}` +
      `${areaSlack ? `, ${areaSlack} px allowed` : ''}), width ${widthAt(0.1)}/${widthAt(0.5)}/${widthAt(0.9)} px ` +
      `(p10/50/90), panel overlap × opacity ` +
      `at most ${(100 * worstOverlap.overlap).toFixed(1)} % (t=${worstOverlap.t}), stage buttons ` +
      `${(100 * worstNav.overlap).toFixed(1)} % (t=${worstNav.t}), skip link ` +
      `${(100 * worstSkip.overlap).toFixed(1)} % (t=${worstSkip.t}); overhead margin ${worstOverhead.margin} px at ` +
      `t=${worstOverhead.t} (heading ${director.overhead.heading}°, eye height ${director.overhead.pos[1].toFixed(0)} m); ` +
      `drone shots (subject < ${AERIAL_SUBJECT}) off the keys by at most ${worstAerial.turn}°, ` +
      `${worstAerial.eye} m, FOV ${worstAerial.fov}°; ` +
      `dollies ${[...director.dollies].map((d) => d.toFixed(2)).join(' ')}; failures ${JSON.stringify(counts)}` +
      (v.allow
        ? `; allowed by the layout: ${[
            overlapAllowed ? `panel overlap ${100 * overlapAllowed} %` : '',
            areaSlack ? `${areaSlack} px out of the framing area` : '',
            eyeAllowed ? `a drone shot's eye ${eyeAllowed} m off its keys` : '',
          ]
            .filter(Boolean)
            .join(', ')} (${v.allow.why})`
        : ''),
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
