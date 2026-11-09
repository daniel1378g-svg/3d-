// Turns journey progress into the camera pose: evaluates the shot keys (camera-shots.js) with
// per-channel monotone Hermite curves, resolves car-relative keys against the car's ground frame and
// the overhead key against the circuit, blends in the intro pose, adds a slow vertical bob, and
// frames the subject in the part of the screen the page leaves free.
//
// Interpolation. Every channel is a monotone cubic Hermite curve over the keys (PCHIP:
// util/math.js monotoneSlope + hermite): C1 (no velocity jumps at the keys) and monotone between
// keys (no overshoot, so the path between two keys that clear the scenery stays between them).
// PCHIP needs fixed key values: its tangents bend where a neighbouring secant changes sign, so keys
// that move (car-relative keys resolved against the moving car) would put kinks in the path. Each
// point (eye, target) is therefore two rigs with fixed keys (createRig): a world rig and a car rig
// (offsets along the car's forward, up and right), cross-faded by a PCHIP weight (0 at absolute
// keys, 1 at car-relative ones). Both rigs hold every key, resolved once per layout with the car
// where it is at that key's progress (`frameAt`): an absolute key's car-relative offset, a
// car-relative key's world position. So the rigs agree at every key and their tangents come from
// the real neighbouring positions: the camera keeps moving through a key where the shot changes
// kind (it used to hold a neighbour's value there, which stopped the drone mid-dive at 0.407).
// Where the car moves smoothly, so does the camera.
//
// Field of view. The keys' FOVs are vertical FOVs for the reference aspect (1440×900, 16:10).
// A narrower screen keeps the reference's horizontal FOV, widening the vertical one, softly capped
// at MAX_VERTICAL_FOV (viewportTan): 34° → 40° at 4:3, 34–44° → 59–60° on a 390×844 phone. The
// value is fixed per layout, so the FOV never pumps.
//
// Framing. The page passes two areas of the viewport and its panel timing (setFraming in
// journey.js, from home.js):
//   panel   the free part of the screen while a stage panel is shown (right of the panel column and
//           left of the stage buttons on desktop, the band between the top controls and the bottom
//           sheet on phones),
//   open    the screen minus the fixed page UI (aerial shots, when no panel is shown),
//   windows the progress windows in which each panel is fully shown, and `fade`, the progress over
//           which it fades in before and out after its window (home.js PANEL_WINDOWS, PANEL_FADE).
// The framing weight (0 open … 1 panel) follows the panels' own opacity (panelWeight: it reaches 1
// when a fading panel is a quarter visible), so the car moves out from under a panel as the panel
// appears and comes back only once it has gone. The camera's principal point (where the target
// appears) is moved to the centre of the blended area with a view offset.
//
// Car fit. At each car-shot key the eye is pulled back horizontally from the target (a dolly, at
// most MAX_DOLLY, stopped DOLLY_CLEARANCE short of the scenery: `clearanceAt`) until the car (a
// car-shaped hull in its bounding box, carOutline) fits in that key's framing area at the key's
// FOV, so the lens stays as designed and the car keeps the size the screen allows; where a wall
// stops the dolly, that key's lens widens instead (a fixed value for the layout). Between keys,
// where the interpolated eye can come closer, the FOV may widen by at most FIT_EXTRA_FOV degrees,
// following a profile solved with the layout (sampled every 0.001 of progress, spread by a running
// maximum and smoothed), so the widening is gradual and never pumps. The overhead key is solved for
// the actual aspect: fitCircuitShot() picks, among headings between "from the grandstand side" and
// "from the first corner", the camera that shows the whole circuit largest inside the open area.
//
// update() allocates nothing; the layout (overhead shot, dollies, rigs) is re-solved only when the
// aspect or the framing areas change.
import { Vector3 } from 'three';
import { INTRO_CAMERA_FOV, INTRO_CAMERA_POSITION, PANEL_FADE, PANEL_WINDOWS } from './camera-shots.js';
import { clamp, hermite, lerp, monotoneSlope, smoothstep } from './util/math.js';

const DEG = Math.PI / 180;
const UP = new Vector3(0, 1, 0);
/** The car's hull must fit in this fraction of the framing area (a margin on every side). */
const CAR_FILL = 0.88;
/** The keys' FOVs are vertical FOVs at this aspect (1440×900)… */
const REFERENCE_ASPECT = 1.6;
/** …narrower screens keep its horizontal FOV, with the vertical FOV softly capped at this (degrees). */
const MAX_VERTICAL_FOV = 60;
/** Between keys the car fit may widen the FOV by at most this many degrees. */
const FIT_EXTRA_FOV = 6;
/** Sharpness of the soft maximum over the car's hull points (overshoot ≤ ln 20 / this, i.e. 3.7 %). */
const FIT_LSE_SHARPNESS = 80;
/**
 * The dolly that fits the car at a key pulls the eye back by at most MAX_DOLLY, or MAX_CHASE_DOLLY
 * for a car-relative eye (the chase: the eye then rides that far from the car around the circuit,
 * where the scenery beside the track changes), rising DOLLY_RISE metres per metre…
 */
const MAX_DOLLY = 4;
const MAX_CHASE_DOLLY = 2;
const DOLLY_RISE = 0.04;
/**
 * Between keys the dolly aims DOLLY_MARGIN beyond the fit (it is an estimate: size ∝ 1 / distance)
 * and backs the eye away by at most MAX_FIT_DOLLY of its distance (smoothly saturated).
 */
const DOLLY_MARGIN = 1.04;
const MAX_FIT_DOLLY = 0.75;
/**
 * …stops where the eye would come closer than DOLLY_CLEARANCE metres to the scenery (checked in
 * steps of at least DOLLY_STEP metres), and if that is too soon, swings around the target by up to
 * ORBIT_ANGLES degrees to find room.
 */
const DOLLY_STEP = 0.1;
const DOLLY_CLEARANCE = 0.8;
/**
 * Positions of the car at which a car-relative key's eye is checked for clearance (its stretch), and
 * the extra margin (metres) kept there: between them, and between keys, the eye is interpolated.
 */
const RIDE_SAMPLES = 17;
const RIDE_MARGIN = 1;
/** Dolly passes per car key: each but the last re-aims the key at the middle of the car (centreOnCar). */
const CENTRE_PASSES = 3;
const ORBIT_ANGLES = [0, 8, -8, 16, -16, 24, -24, 32, -32, 40, -40];
/** A key's lens widens for the car up to this vertical FOV (tan of half of it, 80°). */
const MAX_KEY_TAN = Math.tan((40 * Math.PI) / 180);
/**
 * The car-fit profile: samples over the journey, the running-maximum reach and the Gaussian σ (in
 * samples: 0.006 and 0.004 of progress).
 */
const PROFILE_SAMPLES = 1001;
const PROFILE_SPREAD = 6;
const PROFILE_SMOOTH = 4;
const PROFILE_TIMES = Float64Array.from({ length: PROFILE_SAMPLES }, (_, i) => i / (PROFILE_SAMPLES - 1));
/** Car-relative shots use the car's heading smoothed over a chord of ± this many metres of path. */
const HEADING_CHORD = 10;
/** Overhead shot: camera pitch below the horizon and the headings tried (degrees). */
const OVERHEAD_PITCH = 52;
const OVERHEAD_HEADINGS = [-90, 0]; // camera on the −x side (first corner) … on the +z side (grandstand)
const OVERHEAD_HEADING_STEP = 5;
/** The circuit (centre line ± this many metres) must fit in this fraction of the open area. */
const CIRCUIT_MARGIN = 14;
const CIRCUIT_FILL = 0.94;
/** Default framing areas (fractions of the viewport: left, top, right, bottom). */
const DEFAULT_AREA = [0.04, 0.06, 0.96, 0.94];

/**
 * tan(vertical FOV / 2) on a viewport of `aspect` for a key FOV of `fovDeg` degrees (see the
 * header): the reference aspect's horizontal FOV, softly capped at MAX_VERTICAL_FOV, never narrower
 * than the key.
 */
function viewportTan(fovDeg, aspect) {
  const tan = Math.tan((fovDeg * DEG) / 2);
  const cap = Math.tan((MAX_VERTICAL_FOV * DEG) / 2);
  const wanted = (tan * REFERENCE_ASPECT) / Math.min(REFERENCE_ASPECT, aspect);
  return Math.max(tan, wanted / Math.pow(1 + Math.pow(wanted / cap, 4), 0.25));
}

/**
 * Framing weight at progress `t` (0 open … 1 panel): the largest panel opacity (1 inside a window,
 * falling to 0 over `fade` before and after it, the last panel never fading out, as home.js does),
 * reaching 1 at a quarter of the opacity, through a smoothstep so it is C1.
 */
function panelWeight(t, windows, fade) {
  let opacity = 0;
  for (let i = 0; i < windows.length; i++) {
    const from = windows[i][0];
    const to = windows[i][1];
    let o = 1;
    if (t < from) o = 1 - (from - t) / fade;
    else if (t > to && i < windows.length - 1) o = 1 - (t - to) / fade;
    if (o > opacity) opacity = o;
  }
  return smoothstep(clamp(4 * opacity, 0, 1));
}

/**
 * Ground points the overhead shot must show: every point of the closed centre line `track`
 * ([x, z] pairs) moved CIRCUIT_MARGIN metres to either side (the asphalt, kerbs and the red line),
 * as a flat [x, z, …] array.
 */
function circuitOutline(track) {
  const count = track.length;
  const out = new Float64Array(count * 4);
  for (let i = 0; i < count; i++) {
    const [x0, z0] = track[(i - 1 + count) % count];
    const [x1, z1] = track[(i + 1) % count];
    const length = Math.hypot(x1 - x0, z1 - z0) || 1;
    const nx = -(z1 - z0) / length;
    const nz = (x1 - x0) / length;
    const [x, z] = track[i];
    out[4 * i] = x + nx * CIRCUIT_MARGIN;
    out[4 * i + 1] = z + nz * CIRCUIT_MARGIN;
    out[4 * i + 2] = x - nx * CIRCUIT_MARGIN;
    out[4 * i + 3] = z - nz * CIRCUIT_MARGIN;
  }
  return out;
}

/**
 * Points of a car-shaped hull inside the car's bounding box `box` ([[minX, minY, minZ], [maxX, maxY,
 * maxZ]], +x forward), as fractions of the box: the full-width floor, the rear wing at full height
 * and width, the nose at 45 % of the height, the top of the windscreen. The box's empty front-top
 * corners would otherwise make the fit, and the car on screen, needlessly small in three-quarter
 * views from the front. Flat [x, y, z, …] in the car frame.
 */
const CAR_HULL = [
  [0, 0, 0],
  [0, 0, 1],
  [1, 0, 0],
  [1, 0, 1],
  [0, 1, 0],
  [0, 1, 1],
  [1, 0.45, 0.04],
  [1, 0.45, 0.96],
  [0.6, 0.93, 0.18],
  [0.6, 0.93, 0.82],
];
function carOutline(box) {
  const [min, max] = box;
  return CAR_HULL.flatMap(([fx, fy, fz]) => [
    min[0] + fx * (max[0] - min[0]),
    min[1] + fy * (max[1] - min[1]),
    min[2] + fz * (max[2] - min[2]),
  ]);
}

/**
 * The overhead shot that shows every point of `points` (flat [x, z, …] ground points, y = 0)
 * inside `area` ([left, top, right, bottom] viewport fractions) for a camera of vertical FOV
 * `fovDeg` and `aspect`, pitched OVERHEAD_PITCH below the horizon, whose principal point is drawn
 * at the area's centre. Each heading is solved exactly (the smallest distance at which the points
 * fit, by bisection on the linear fit conditions); the heading with the smallest distance wins.
 * Returns { pos: [x, y, z], tgt: [x, y, z], heading }.
 */
function fitCircuitShot(points, aspect, area, fovDeg) {
  const tanY = Math.tan((fovDeg * DEG) / 2);
  const tanX = tanY * aspect;
  // the area relative to its centre, in NDC (x right, y up), shrunk by CIRCUIT_FILL
  const halfX = (area[2] - area[0]) * CIRCUIT_FILL;
  const halfY = (area[3] - area[1]) * CIRCUIT_FILL;
  let cx = 0;
  let cz = 0;
  const count = points.length / 2;
  for (let i = 0; i < count; i++) {
    cx += points[2 * i];
    cz += points[2 * i + 1];
  }
  cx /= count;
  cz /= count;
  const pitch = OVERHEAD_PITCH * DEG;
  let best = null;
  for (
    let heading = OVERHEAD_HEADINGS[0];
    heading <= OVERHEAD_HEADINGS[1];
    heading += OVERHEAD_HEADING_STEP
  ) {
    const h = heading * DEG;
    // forward (towards the scene), right, up
    const fx = -Math.sin(h) * Math.cos(pitch);
    const fy = -Math.sin(pitch);
    const fz = -Math.cos(h) * Math.cos(pitch);
    const rx = -fz / Math.hypot(fx, fz);
    const rz = fx / Math.hypot(fx, fz);
    const ux = -(rz * fy);
    const uy = rz * fx - rx * fz;
    const uz = rx * fy;
    // eye = centre + a·right + b·up − D·forward; for a point q (relative to the centre):
    // x = q·r − a, y = q·u − b, depth z = q·f + D, and it fits when |x| ≤ halfX·tanX·z, |y| ≤ halfY·tanY·z
    const feasible = (D, out) => {
      let aLow = -Infinity;
      let aHigh = Infinity;
      let bLow = -Infinity;
      let bHigh = Infinity;
      for (let i = 0; i < count; i++) {
        const qx = points[2 * i] - cx;
        const qz = points[2 * i + 1] - cz;
        const z = qx * fx + qz * fz + D;
        if (z <= 1) return false;
        const qr = qx * rx + qz * rz;
        const qu = qx * ux + qz * uz;
        const wx = halfX * tanX * z;
        const wy = halfY * tanY * z;
        aLow = Math.max(aLow, qr - wx);
        aHigh = Math.min(aHigh, qr + wx);
        bLow = Math.max(bLow, qu - wy);
        bHigh = Math.min(bHigh, qu + wy);
      }
      if (aLow > aHigh || bLow > bHigh) return false;
      if (out) {
        out.a = (aLow + aHigh) / 2;
        out.b = (bLow + bHigh) / 2;
      }
      return true;
    };
    let low = 10;
    let high = 2e4;
    if (!feasible(high)) continue;
    for (let k = 0; k < 48; k++) {
      const mid = (low + high) / 2;
      if (feasible(mid)) high = mid;
      else low = mid;
    }
    if (best && high >= best.distance) continue;
    const offset = { a: 0, b: 0 };
    feasible(high, offset);
    const ex = cx + offset.a * rx + offset.b * ux - high * fx;
    const ey = offset.b * uy - high * fy;
    const ez = cz + offset.a * rz + offset.b * uz - high * fz;
    // look along forward to the ground
    const t = -ey / fy;
    best = { distance: high, heading, pos: [ex, ey, ez], tgt: [ex + t * fx, 0, ez + t * fz] };
  }
  return best;
}

/**
 * The car's ground frame for car-relative shots ({ p, f, r }: position, flat forward, right), from
 * the path sampler (car-motion.js) at the car's distance: the car's own position, and its heading
 * as the direction of a ±HEADING_CHORD m chord of the path. The path's tangent turns in kinks at the
 * curve's knots; the chord's direction is C1 in distance, so a camera offset sideways from the car
 * moves smoothly. update(distance) allocates nothing.
 */
function createCameraFrame(sampler) {
  const frame = { p: new Vector3(), f: new Vector3(1, 0, 0), r: new Vector3(0, 0, 1) };
  const behind = new Vector3();
  frame.update = (distance) => {
    behind.copy(sampler.sample(distance - HEADING_CHORD).p);
    frame.f
      .copy(sampler.sample(distance + HEADING_CHORD).p)
      .sub(behind)
      .setY(0)
      .normalize();
    frame.p.copy(sampler.sample(distance).p);
    frame.r.set(-frame.f.z, 0, frame.f.x);
    return frame;
  };
  return frame;
}

/**
 * One point of the shots (eye or target) as two rigs with fixed key values plus a weight (see the
 * header):
 *   world  x, y, z per key: the key's world position
 *   car    along, up, side per key: the same position relative to the car where it is at that key
 *   weight 1 for car-relative keys, 0 for absolute ones
 * build() takes the resolved keys (world positions and car offsets, [x, y, z] per key) and
 * recomputes the PCHIP tangents.
 */
function createRig(times, isRel) {
  const count = times.length;
  const world = [new Float64Array(count), new Float64Array(count), new Float64Array(count)];
  const car = [new Float64Array(count), new Float64Array(count), new Float64Array(count)];
  const weight = Float64Array.from(isRel, (rel) => (rel ? 1 : 0));
  const slopes = {
    world: world.map(() => new Float64Array(count)),
    car: car.map(() => new Float64Array(count)),
  };
  const weightSlopes = Float64Array.from(weight, (_, k) => monotoneSlope(times, weight, k));
  return {
    world,
    car,
    weight,
    weightSlopes,
    slopes,
    build(worldKeys, carKeys) {
      for (let a = 0; a < 3; a++) {
        for (let k = 0; k < count; k++) {
          world[a][k] = worldKeys[k][a];
          car[a][k] = carKeys[k][a];
        }
        for (let k = 0; k < count; k++) {
          slopes.world[a][k] = monotoneSlope(times, world[a], k);
          slopes.car[a][k] = monotoneSlope(times, car[a], k);
        }
      }
    },
  };
}

/**
 * `carFrame` is the car's ground frame ({ p: position, f: flat forward, r: right }, e.g.
 * createCameraFrame()), updated before the camera runs. Options: `circuit` the circuit's closed
 * centre line as [x, z] pairs (the overhead shot shows all of it, see circuitOutline); `carBox`
 * [[minX, minY, minZ], [maxX, maxY, maxZ]] in the car frame (+x forward, y up, +z right);
 * `frameAt(progress)` the car's ground frame where the car is at that journey progress (a frame
 * object it may reuse; without it the current `carFrame` stands in) and `clearanceAt(eye, look)`
 * the distance from `eye` to the nearest scenery (depth-range.js; without it the dolly is not
 * limited): both are used when the layout is solved, not per frame. `position`/`target` hold the
 * last applied camera pose (the shadow follow and the depth range read them).
 */
function createCameraDirector(
  camera,
  shots,
  carFrame,
  { circuit = null, carBox = null, frameAt = null, clearanceAt = null } = {},
) {
  const count = shots.length;
  const times = shots.map((shot) => shot.u);
  const outline = circuit ? circuitOutline(circuit) : null;
  const rigs = {
    pos: createRig(
      times,
      shots.map((shot) => !!shot.pos.rel),
    ),
    tgt: createRig(
      times,
      shots.map((shot) => !!shot.tgt.rel),
    ),
  };
  // the scalar channels: tan(fov/2) for this viewport (filled per layout), subject weight (1 car, 0 aerial)
  const fovChannel = { values: new Float64Array(count), slopes: new Float64Array(count) };
  const subjectValues = shots.map((shot) => (shot.aerial ? 0 : 1));
  const subjectChannel = {
    values: subjectValues,
    slopes: subjectValues.map((_, k) => monotoneSlope(times, subjectValues, k)),
  };
  const position = new Vector3();
  const target = new Vector3();
  // scratch
  const intro = new Vector3(...INTRO_CAMERA_POSITION);
  const forward = new Vector3();
  const right = new Vector3();
  const upAxis = new Vector3();
  const corner = new Vector3();
  const carHull = carBox ? carOutline(carBox) : null;
  const needs = new Float64Array(carHull ? (2 * carHull.length) / 3 : 0);
  const area = [0, 0, 0, 0];
  // the layout the rigs were solved for
  let overhead = null;
  let introTan = Math.tan((INTRO_CAMERA_FOV * DEG) / 2);
  const solved = {
    aspect: NaN,
    panel: [NaN, NaN, NaN, NaN],
    open: [NaN, NaN, NaN, NaN],
    windows: null,
    fade: NaN,
  };
  const dollies = new Float64Array(count).fill(1);
  // per key, for the last layout (tests): the dolly the car needed, the FOV, the resolved eye/target
  const keyInfo = shots.map(() => ({ wanted: 1, angle: 0, fov: 0, eye: null, look: null }));
  const newProfile = () => ({
    values: new Float64Array(PROFILE_SAMPLES),
    slopes: new Float64Array(PROFILE_SAMPLES),
  });
  const fitProfiles = { widen: newProfile(), back: newProfile() };
  const profileScratch = new Float64Array(PROFILE_SAMPLES);
  const gaussScratch = new Float64Array(PROFILE_SAMPLES);
  const scratchEye = new Vector3();
  const rideEye = new Vector3();
  const rideLook = new Vector3();
  const newFrame = () => ({ p: new Vector3(), f: new Vector3(), r: new Vector3() });
  const keyCarFrame = newFrame();
  const rideFrames = Array.from({ length: RIDE_SAMPLES }, newFrame);
  const copyFrame = (from, to) => {
    to.p.copy(from.p);
    to.f.copy(from.f);
    to.r.copy(from.r);
    return to;
  };

  /**
   * tan(fov/2) that fits the car's hull, in the ground frame `frame`, into the framing area around
   * the principal point (half-sizes halfX, halfY in NDC) for an eye at `eye` looking at `look`; 0
   * when part of the car is not in front of the eye.
   */
  function carFitTan(frame, eye, look, aspect, halfX, halfY) {
    forward.subVectors(look, eye).normalize();
    right.crossVectors(forward, UP).normalize();
    upAxis.crossVectors(right, forward);
    // the largest of the requirements of the hull's points (x and y each), as a soft maximum
    // (log-sum-exp) so the FOV stays smooth when the limiting point changes
    let n = 0;
    for (let i = 0; i < carHull.length; i += 3) {
      corner
        .copy(frame.p)
        .addScaledVector(frame.f, carHull[i])
        .addScaledVector(UP, carHull[i + 1])
        .addScaledVector(frame.r, carHull[i + 2])
        .sub(eye);
      const depth = corner.dot(forward);
      if (depth < 0.2) return 0;
      needs[n++] = Math.abs(corner.dot(right)) / (depth * aspect * halfX * CAR_FILL);
      needs[n++] = Math.abs(corner.dot(upAxis)) / (depth * halfY * CAR_FILL);
    }
    let largest = 0;
    for (let i = 0; i < n; i++) largest = Math.max(largest, needs[i]);
    let sum = 0;
    for (let i = 0; i < n; i++) sum += Math.exp(FIT_LSE_SHARPNESS * (needs[i] / largest - 1));
    return largest * (1 + Math.log(sum) / FIT_LSE_SHARPNESS);
  }

  /**
   * Moves `look` so that the middle of the car's outline (at `frame`) on screen falls on the
   * principal point, for an eye at `eye`: the outline's extent across and up the view, in tan units,
   * and the target shifted by the middle of it at the target's distance.
   */
  function centreOnCar(frame, eye, look) {
    forward.subVectors(look, eye);
    const distance = forward.length();
    forward.divideScalar(distance);
    right.crossVectors(forward, UP).normalize();
    upAxis.crossVectors(right, forward);
    let x0 = Infinity;
    let x1 = -Infinity;
    let y0 = Infinity;
    let y1 = -Infinity;
    for (let i = 0; i < carHull.length; i += 3) {
      corner
        .copy(frame.p)
        .addScaledVector(frame.f, carHull[i])
        .addScaledVector(UP, carHull[i + 1])
        .addScaledVector(frame.r, carHull[i + 2])
        .sub(eye);
      const depth = corner.dot(forward);
      if (depth < 0.2) return;
      const x = corner.dot(right) / depth;
      const y = corner.dot(upAxis) / depth;
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    look.addScaledVector(right, cx * distance).addScaledVector(upAxis, cy * distance);
  }

  /** World position of key spec `spec` (abs, rel or the overhead fit) with the car at `frame`. */
  function resolveKey(spec, k, which, frame) {
    if (spec.abs) return spec.abs.slice();
    if (spec.rel) {
      const [along, up, side] = spec.rel;
      return [
        frame.p.x + frame.f.x * along + frame.r.x * side,
        frame.p.y + up,
        frame.p.z + frame.f.z * along + frame.r.z * side,
      ];
    }
    // the overhead shot, the eye pulled back from its target by `scale`
    const t = overhead.tgt;
    if (which === 'tgt') return t.slice();
    const scale = shots[k].scale || 1;
    return overhead.pos.map((v, a) => t[a] + (v - t[a]) * scale);
  }

  /** The car-relative offset (along, up, side) of world point `w` with the car at `frame`. */
  function toCar(w, frame) {
    const dx = w[0] - frame.p.x;
    const dz = w[2] - frame.p.z;
    return [dx * frame.f.x + dz * frame.f.z, w[1] - frame.p.y, dx * frame.r.x + dz * frame.r.z];
  }

  /**
   * Where the eye of a car key goes for the car to fit (see the header): the horizontal dolly
   * (1 … MAX_DOLLY) away from the target `look` that fits the car at `frame` into `keyArea` with
   * tan(fov/2) = `tan`, along the key's own direction or, if scenery stops it there, swung around the
   * target by the smallest of ORBIT_ANGLES that lets it (the eye's path must stay DOLLY_CLEARANCE
   * from the scenery, or as far as the key's eye already is). Writes the eye into `out`; returns the
   * dolly and leaves the swing (degrees) and the dolly the car needed in dollyFor.angle/.wanted.
   */
  function dollyFor(frame, eye, look, tan, aspect, keyArea, maxDolly, ride, out) {
    const halfX = keyArea[2] - keyArea[0];
    const halfY = keyArea[3] - keyArea[1];
    // clearance of an eye position: for a car-relative eye also where it rides with the car (`ride`:
    // the car's frames over the stretch of the journey this key holds)
    const clearOf = (point) => {
      let c = clearanceAt(point, look);
      if (!ride) return c;
      const ax = point.x - frame.p.x;
      const az = point.z - frame.p.z;
      const along = ax * frame.f.x + az * frame.f.z;
      const side = ax * frame.r.x + az * frame.r.z;
      const up = point.y - frame.p.y;
      const lx = look.x - frame.p.x;
      const lz = look.z - frame.p.z;
      const lookAlong = lx * frame.f.x + lz * frame.f.z;
      const lookSide = lx * frame.r.x + lz * frame.r.z;
      for (const f of ride) {
        rideEye.set(f.p.x + f.f.x * along + f.r.x * side, f.p.y + up, f.p.z + f.f.z * along + f.r.z * side);
        rideLook.set(
          f.p.x + f.f.x * lookAlong + f.r.x * lookSide,
          f.p.y + look.y - frame.p.y,
          f.p.z + f.f.z * lookAlong + f.r.z * lookSide,
        );
        c = Math.min(c, clearanceAt(rideEye, rideLook) - RIDE_MARGIN);
      }
      return c;
    };
    const dx = eye.x - look.x;
    const dz = eye.z - look.z;
    const radius = Math.hypot(dx, dz);
    // the eye rises a little as it backs away (DOLLY_RISE per metre), clear of gentle slopes
    const heightAt = (scale) => eye.y + (scale - 1) * radius * DOLLY_RISE;
    const floor = clearanceAt ? Math.min(DOLLY_CLEARANCE, clearOf(eye)) : 0;
    let best = null;
    for (const angle of clearanceAt ? ORBIT_ANGLES : [0]) {
      const c = Math.cos(angle * DEG);
      const s = Math.sin(angle * DEG);
      const ux = (dx * c - dz * s) / radius; // unit direction from the target to the swung eye
      const uz = (dx * s + dz * c) / radius;
      // the dolly the car needs from this side (the car's size on screen ∝ 1 / distance)
      let wanted = 1;
      for (let i = 0; i < 12; i++) {
        scratchEye.set(look.x + ux * radius * wanted, heightAt(wanted), look.z + uz * radius * wanted);
        const need = carFitTan(frame, scratchEye, look, aspect, halfX, halfY);
        if (!(need > 0)) break;
        const next = clamp(wanted * (need / tan), 1, maxDolly);
        const done = Math.abs(next - wanted) < 1e-4 * wanted;
        wanted = next;
        if (done) break;
      }
      // how far the eye gets before the scenery stops it: sphere tracing along the path (each
      // step is the clearance in hand minus the floor, so no point of the path comes closer)
      let scale = 1;
      if (clearanceAt) {
        scratchEye.set(look.x + ux * radius, eye.y, look.z + uz * radius);
        if (angle !== 0 && clearOf(scratchEye) < floor) continue;
        while (scale < wanted) {
          scratchEye.set(look.x + ux * radius * scale, heightAt(scale), look.z + uz * radius * scale);
          const room = clearOf(scratchEye) - floor;
          if (room < 0) {
            scale = Math.max(1, scale - DOLLY_STEP / radius);
            break;
          }
          scale = Math.min(wanted, scale + Math.max(DOLLY_STEP, room) / radius);
        }
      } else scale = wanted;
      const shortfall = wanted / scale; // what is left for the lens
      if (!best || shortfall < best.shortfall - 1e-6) best = { angle, scale, wanted, shortfall, ux, uz };
      if (shortfall <= 1 + 1e-6) break;
    }
    out.set(
      look.x + best.ux * radius * best.scale,
      heightAt(best.scale),
      look.z + best.uz * radius * best.scale,
    );
    dollyFor.angle = best.angle;
    dollyFor.wanted = best.wanted;
    return best.scale;
  }

  /**
   * Solves the layout for this aspect and these framing areas and panel windows (setup, on a resize
   * or a new layout): the overhead shot; per key the dolly and the FOV (the key's FOV for this
   * viewport, widened where the dolly was stopped short); the rigs; and the car-fit profile.
   */
  function prepareLayout(aspect, panelArea, openArea, windows, fade) {
    if (
      aspect === solved.aspect &&
      windows === solved.windows &&
      fade === solved.fade &&
      panelArea.every((v, i) => v === solved.panel[i]) &&
      openArea.every((v, i) => v === solved.open[i])
    )
      return;
    solved.aspect = aspect;
    solved.windows = windows;
    solved.fade = fade;
    for (let i = 0; i < 4; i++) {
      solved.panel[i] = panelArea[i];
      solved.open[i] = openArea[i];
    }
    introTan = viewportTan(INTRO_CAMERA_FOV, aspect);
    const overheadKey = shots.find((shot) => shot.pos.fit);
    const overheadFov = overheadKey ? (2 * Math.atan(viewportTan(overheadKey.fov, aspect))) / DEG : 40;
    overhead = outline ? fitCircuitShot(outline, aspect, openArea, overheadFov) : null;
    if (!overhead) overhead = { pos: [0, 700, 600], tgt: [0, 0, 0], heading: 0 };

    // the keys: dolly, FOV, both rigs
    const worldKeys = { pos: [], tgt: [] };
    const carKeys = { pos: [], tgt: [] };
    const eye = new Vector3();
    const look = new Vector3();
    const keyArea = [0, 0, 0, 0];
    for (let k = 0; k < count; k++) {
      const frame = copyFrame(frameAt ? frameAt(times[k]) : carFrame, keyCarFrame);
      const eyeKey = resolveKey(shots[k].pos, k, 'pos', frame);
      const lookKey = resolveKey(shots[k].tgt, k, 'tgt', frame);
      let tan = viewportTan(shots[k].fov, aspect);
      dollies[k] = 1;
      keyInfo[k].wanted = 1;
      keyInfo[k].angle = 0;
      if (carHull && !shots[k].aerial) {
        const weight = panelWeight(times[k], windows, fade);
        for (let i = 0; i < 4; i++) keyArea[i] = lerp(openArea[i], panelArea[i], weight);
        eye.fromArray(eyeKey);
        look.fromArray(lookKey);
        const chase = !!shots[k].pos.rel;
        // a car-relative eye rides with the car over the half-way points to the neighbouring keys
        let ride = null;
        if (chase && frameAt && clearanceAt) {
          const from = k > 0 ? (times[k - 1] + times[k]) / 2 : times[k];
          const to = k < count - 1 ? (times[k] + times[k + 1]) / 2 : times[k];
          ride = rideFrames.map((rideFrame, j) =>
            copyFrame(frameAt(from + ((to - from) * j) / (rideFrames.length - 1)), rideFrame),
          );
        }
        const maxDolly = chase ? MAX_CHASE_DOLLY : MAX_DOLLY;
        // dolly, then aim at the middle of the car's outline on screen (the authored target is a
        // point on the car, whose nearer end looks bigger), and dolly again from there
        for (let pass = 0; pass < CENTRE_PASSES; pass++) {
          eye.fromArray(eyeKey);
          dollies[k] = dollyFor(frame, eye, look, tan, aspect, keyArea, maxDolly, ride, eye);
          if (pass < CENTRE_PASSES - 1) centreOnCar(frame, eye, look);
        }
        keyInfo[k].wanted = dollyFor.wanted;
        keyInfo[k].angle = dollyFor.angle;
        eyeKey[0] = eye.x;
        eyeKey[1] = eye.y;
        eyeKey[2] = eye.z;
        lookKey[0] = look.x;
        lookKey[1] = look.y;
        lookKey[2] = look.z;
        // what the dolly could not do, the key's lens does
        const need = carFitTan(frame, eye, look, aspect, keyArea[2] - keyArea[0], keyArea[3] - keyArea[1]);
        tan = Math.min(MAX_KEY_TAN, Math.max(tan, need));
      }
      fovChannel.values[k] = tan;
      keyInfo[k].fov = (2 * Math.atan(tan)) / DEG;
      keyInfo[k].eye = eyeKey;
      keyInfo[k].look = lookKey;
      worldKeys.pos.push(eyeKey);
      worldKeys.tgt.push(lookKey);
      carKeys.pos.push(toCar(eyeKey, frame));
      carKeys.tgt.push(toCar(lookKey, frame));
    }
    for (let k = 0; k < count; k++) fovChannel.slopes[k] = monotoneSlope(times, fovChannel.values, k);
    rigs.pos.build(worldKeys.pos, carKeys.pos);
    rigs.tgt.build(worldKeys.tgt, carKeys.tgt);

    // the car-fit profiles: how much the car needs beyond the keys between them, sampled along the
    // journey with the car where it is at each sample: first the lens, by up to FIT_EXTRA_FOV, then
    // for the rest the eye backs away from the target (a dolly). Each is spread forwards and back (a
    // running maximum) and smoothed, so the move starts before it is needed and never pumps.
    const widen = fitProfiles.widen.values;
    const back = fitProfiles.back.values;
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      const u = i / (PROFILE_SAMPLES - 1);
      widen[i] = back[i] = 0;
      if (!carHull) continue;
      const seg = segmentOf(u);
      const subject = clamp(curve(subjectChannel.values, subjectChannel.slopes, seg, u), 0, 1);
      if (subject <= 0) continue;
      const frame = frameAt ? frameAt(u) : carFrame;
      evaluateRig(rigs.pos, seg, u, eye, frame);
      evaluateRig(rigs.tgt, seg, u, look, frame);
      const tan = curve(fovChannel.values, fovChannel.slopes, seg, u);
      const weight = panelWeight(u, windows, fade);
      for (let a = 0; a < 4; a++) keyArea[a] = lerp(openArea[a], panelArea[a], weight);
      const need = carFitTan(frame, eye, look, aspect, keyArea[2] - keyArea[0], keyArea[3] - keyArea[1]);
      const ratio = need / tan;
      const lens = Math.min(Math.max(0, ratio - 1), widestTan(tan) / tan - 1);
      widen[i] = subject * lens;
      back[i] = subject * Math.max(0, (DOLLY_MARGIN * ratio) / (1 + lens) - 1);
    }
    smoothProfile(fitProfiles.widen);
    smoothProfile(fitProfiles.back);
    if (clearanceAt) limitDolly(fitProfiles.back, windows, fade);
  }

  /**
   * Keeps the between-keys dolly `profile` clear of the scenery: where the dollied eye would come
   * closer than DOLLY_CLEARANCE (or than the undollied eye already is), the most it can back away
   * (bisection); that limit is spread as a running minimum over the smoothing's reach, the profile
   * clamped to it and smoothed again, so the result stays under the limit everywhere.
   */
  function limitDolly(profile, windows, fade) {
    const { values, slopes } = profile;
    const limit = profileScratch;
    const eye = scratchEye;
    let limited = false;
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      limit[i] = Infinity;
      const back = values[i];
      if (!(back > 1e-4)) continue;
      const u = i / (PROFILE_SAMPLES - 1);
      const seg = segmentOf(u);
      const frame = frameAt ? frameAt(u) : carFrame;
      evaluateRig(rigs.pos, seg, u, eye, frame);
      evaluateRig(rigs.tgt, seg, u, rideLook, frame);
      const radius = Math.hypot(eye.x - rideLook.x, eye.z - rideLook.z);
      const floor = Math.min(DOLLY_CLEARANCE, clearanceAt(eye, rideLook));
      const at = (b) =>
        rideEye.set(
          rideLook.x + (eye.x - rideLook.x) * (1 + b),
          eye.y + b * radius * DOLLY_RISE,
          rideLook.z + (eye.z - rideLook.z) * (1 + b),
        );
      if (clearanceAt(at(back), rideLook) >= floor) continue;
      let low = 0;
      let high = back;
      for (let k = 0; k < 8; k++) {
        const mid = (low + high) / 2;
        if (clearanceAt(at(mid), rideLook) >= floor) low = mid;
        else high = mid;
      }
      limit[i] = low;
      limited = true;
    }
    if (!limited) return;
    const reach = PROFILE_SPREAD + Math.ceil(3 * PROFILE_SMOOTH);
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      let m = Infinity;
      const last = Math.min(PROFILE_SAMPLES - 1, i + reach);
      for (let j = Math.max(0, i - reach); j <= last; j++) m = Math.min(m, limit[j]);
      slopes[i] = Math.min(values[i], m); // slopes as scratch: the clamped profile
    }
    values.set(slopes);
    gaussian(values);
    for (let i = 0; i < PROFILE_SAMPLES; i++) slopes[i] = monotoneSlope(PROFILE_TIMES, values, i);
  }

  /** Spreads (running maximum) and smooths (Gaussian) a profile in place, then sets its tangents. */
  function smoothProfile(profile) {
    const { values, slopes } = profile;
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      let m = 0;
      const last = Math.min(PROFILE_SAMPLES - 1, i + PROFILE_SPREAD);
      for (let j = Math.max(0, i - PROFILE_SPREAD); j <= last; j++) m = Math.max(m, values[j]);
      profileScratch[i] = m;
    }
    values.set(profileScratch);
    gaussian(values);
    // monotone tangents: the curve stays between the samples, never below 0
    for (let i = 0; i < PROFILE_SAMPLES; i++) slopes[i] = monotoneSlope(PROFILE_TIMES, values, i);
  }

  /** Gaussian smoothing in place, σ = PROFILE_SMOOTH samples (truncated at 3σ, renormalised at the ends). */
  function gaussian(values) {
    const reach = Math.ceil(3 * PROFILE_SMOOTH);
    gaussScratch.set(values);
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      let sum = 0;
      let wsum = 0;
      const last = Math.min(PROFILE_SAMPLES - 1, i + reach);
      for (let j = Math.max(0, i - reach); j <= last; j++) {
        const w = Math.exp(-0.5 * ((j - i) / PROFILE_SMOOTH) ** 2);
        sum += gaussScratch[j] * w;
        wsum += w;
      }
      values[i] = sum / wsum;
    }
  }

  /** A profile at progress u (C1 Hermite between the samples). */
  function profileAt(profile, progress) {
    const u = clamp(progress, 0, 1);
    const i = Math.min(PROFILE_SAMPLES - 2, Math.floor(u * (PROFILE_SAMPLES - 1)));
    const step = 1 / (PROFILE_SAMPLES - 1);
    const { values, slopes } = profile;
    return hermite(i * step, (i + 1) * step, values[i], values[i + 1], slopes[i], slopes[i + 1], u);
  }

  /** tan(fov/2) widened by FIT_EXTRA_FOV degrees. */
  function widestTan(tan) {
    return Math.tan(Math.atan(tan) + (FIT_EXTRA_FOV * DEG) / 2);
  }

  /** The key segment that holds progress u (clamped to 0..1). */
  function segmentOf(progress) {
    const u = clamp(progress, 0, 1);
    let seg = 0;
    while (seg < count - 2 && u > times[seg + 1]) seg++;
    return seg;
  }

  /** Cubic Hermite of values/slopes (per key) on segment seg at progress u. */
  function curve(values, slopes, seg, u) {
    return hermite(times[seg], times[seg + 1], values[seg], values[seg + 1], slopes[seg], slopes[seg + 1], u);
  }

  /** Writes the point of `rig` at progress u on segment seg, with the car at `frame`, into `out`. */
  function evaluateRig(rig, seg, u, out, frame) {
    const wx = curve(rig.world[0], rig.slopes.world[0], seg, u);
    const wy = curve(rig.world[1], rig.slopes.world[1], seg, u);
    const wz = curve(rig.world[2], rig.slopes.world[2], seg, u);
    const weight = clamp(curve(rig.weight, rig.weightSlopes, seg, u), 0, 1);
    if (weight === 0) return out.set(wx, wy, wz);
    const along = curve(rig.car[0], rig.slopes.car[0], seg, u);
    const up = curve(rig.car[1], rig.slopes.car[1], seg, u);
    const side = curve(rig.car[2], rig.slopes.car[2], seg, u);
    const cx = frame.p.x + frame.f.x * along + frame.r.x * side;
    const cy = frame.p.y + up;
    const cz = frame.p.z + frame.f.z * along + frame.r.z * side;
    return out.set(wx + (cx - wx) * weight, wy + (cy - wy) * weight, wz + (cz - wz) * weight);
  }

  /**
   * Writes the interpolated camera position/target for `progress`; returns the vertical FOV
   * (degrees) of the keys for this viewport, before the car fit. The car-subject weight (1 car shot …
   * 0 aerial) is left in `evaluateShots.car`. Call update() first: the rigs are solved for the
   * current layout (a default one is solved if there is none yet).
   */
  function evaluateShots(progress, outPosition, outTarget) {
    if (!overhead) prepareLayout(camera.aspect, DEFAULT_AREA, DEFAULT_AREA, PANEL_WINDOWS, PANEL_FADE);
    const u = clamp(progress, 0, 1);
    const seg = segmentOf(u);
    evaluateRig(rigs.pos, seg, u, outPosition, carFrame);
    evaluateRig(rigs.tgt, seg, u, outTarget, carFrame);
    evaluateShots.car = clamp(curve(subjectChannel.values, subjectChannel.slopes, seg, u), 0, 1);
    return (2 * Math.atan(curve(fovChannel.values, fovChannel.slopes, seg, u))) / DEG;
  }
  evaluateShots.car = 1;

  /**
   * Poses `camera` for this frame.
   *   introEase  eased intro amount 0..1 (1 = no intro blend)
   *   clock      seconds since start (drives the bob)
   *   debugCam   optional { pos, tgt, fov } override (api.debugCam)
   *   width, height        drawing buffer size in device pixels
   *   framing    { panel, open, windows, fade }: framing areas as [left, top, right, bottom]
   *              viewport fractions, and the panels' progress windows and fade length
   */
  function update({ progress, introEase, clock, debugCam, width, height, framing }) {
    const aspect = camera.aspect;
    const panelArea = (framing && framing.panel) || DEFAULT_AREA;
    const openArea = (framing && framing.open) || DEFAULT_AREA;
    const windows = (framing && framing.windows) || PANEL_WINDOWS;
    const fade = (framing && framing.fade) || PANEL_FADE;
    prepareLayout(aspect, panelArea, openArea, windows, fade);
    let tanHalf = Math.tan((evaluateShots(progress, position, target) * DEG) / 2);
    let mix = panelWeight(progress, windows, fade);
    // the car fit between keys (the smoothed profiles): the eye backs away from the target, by at
    // most MAX_FIT_DOLLY (a smooth saturation)…
    const back = carHull
      ? MAX_FIT_DOLLY * -Math.expm1(-profileAt(fitProfiles.back, progress) / MAX_FIT_DOLLY)
      : 0;
    if (back > 0) {
      const radius = Math.hypot(position.x - target.x, position.z - target.z);
      position.x = target.x + (position.x - target.x) * (1 + back);
      position.z = target.z + (position.z - target.z) * (1 + back);
      position.y += back * radius * DOLLY_RISE;
    }
    // …and the lens widens, saturating smoothly at FIT_EXTRA_FOV
    if (carHull) {
      const room = widestTan(tanHalf) - tanHalf;
      tanHalf += room * -Math.expm1(-(profileAt(fitProfiles.widen, progress) * tanHalf) / room);
    }
    if (introEase < 1) {
      position.lerpVectors(intro, position, introEase);
      tanHalf = lerp(introTan, tanHalf, introEase);
    }
    if (debugCam) {
      position.fromArray(debugCam.pos);
      target.fromArray(debugCam.tgt);
      tanHalf = Math.tan(((debugCam.fov || 40) * DEG) / 2);
      mix = 0;
    }
    position.y += Math.sin(clock * 0.23) * 0.036; // slow handheld-like drift, ±3.6 cm vertically

    // framing area for this frame, its centre (the principal point) and half-size in NDC
    for (let i = 0; i < 4; i++) area[i] = lerp(openArea[i], panelArea[i], mix);
    const centreX = (area[0] + area[2]) / 2;
    const centreY = (area[1] + area[3]) / 2;
    camera.position.copy(position);
    camera.lookAt(target);
    camera.fov = (2 * Math.atan(tanHalf)) / DEG;
    // the principal point at the area's centre: the image moves by (centre - 0.5) of the viewport
    const offsetX = centreX - 0.5;
    const offsetY = centreY - 0.5;
    if (Math.abs(offsetX) > 1e-6 || Math.abs(offsetY) > 1e-6)
      camera.setViewOffset(width, height, -offsetX * width, -offsetY * height, width, height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }

  return {
    position,
    target,
    evaluateShots,
    update,
    /** The solved overhead shot ({ pos, tgt, heading }) for the last layout. */
    get overhead() {
      return overhead;
    },
    /** The dolly applied at each key for the last layout (1 = as authored). */
    dollies,
    /** Per key for the last layout: the dolly the car needed, the FOV, the resolved eye and target. */
    keyInfo,
    /** The car-fit profiles at progress u for the last layout: lens widening and dolly (ratios). */
    fitAt: (u) => ({ widen: profileAt(fitProfiles.widen, u), back: profileAt(fitProfiles.back, u) }),
  };
}

export {
  carOutline,
  circuitOutline,
  createCameraDirector,
  createCameraFrame,
  fitCircuitShot,
  panelWeight,
  viewportTan,
};
