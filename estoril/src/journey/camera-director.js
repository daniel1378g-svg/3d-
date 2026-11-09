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
// most MAX_DOLLY, the least that fits, found by bisection; stopped DOLLY_CLEARANCE short of the
// scenery: `clearanceAt`) until the car (a car-shaped hull in its bounding box, carOutline) fits in
// CAR_FILL of that key's framing area at the key's FOV, so the lens stays as designed and the car
// keeps the size the screen allows; where a wall stops the dolly, that key's lens widens instead (a
// fixed value for the layout). Between keys the interpolated target can drift off the car (where
// the shot changes from car-relative to absolute it follows neither exactly) and the interpolated
// eye can come closer, so three profiles, solved with the layout, keep the car's outline inside the
// framing area. update() applies them in this order (poseAt):
//   dolly  the eye backs away from the target, by at most MAX_FIT_DOLLY of its distance, kept clear
//          of the scenery (limitDolly);
//   aim    the target moves a share of the way to the middle of the car's outline seen from that
//          eye (soft extents, measured at the pose itself), never past the middle: the share that
//          brings the outline inside CAR_FILL of the area (all of it where the outline is wider
//          than that). The soft extents lie a few % outside the hard ones and CAR_FILL leaves 6 %
//          of the area on each side, so the aim works wherever the car comes near the area's edge,
//          not only where it would leave it (gently: in the panel holds it turns the view by < 1°);
//   lens   the FOV widens by up to FIT_EXTRA_FOV degrees, and by up to FIT_FALLBACK_FOV more where
//          the dolly cannot back the eye away far enough (about the principal point: the aim holds).
// The solve asks the aim first, then the lens (up to FIT_EXTRA_FOV), and the dolly for what is left
// of the car's size; where the scenery or MAX_FIT_DOLLY holds the dolly back, the lens takes the
// rest, enough for the car to fill FALLBACK_FILL of the area, as a key's lens does where a wall
// stops its dolly. The profiles are sampled every 0.001 of progress with the car where it is at each
// sample, in FIT_PASSES passes and then LENS_PASSES lens passes: each poses the camera exactly as
// update() will with the profiles solved so far and adds what is still missing, so the smoothing's
// losses and the estimates (size ∝ 1 / distance) are made up. Each profile is spread by a running
// maximum and smoothed, so it starts before it is needed, is C1 and never pumps. The needs are
// measured where the car is the whole subject, and update() applies each profile times the car's
// share of the subject (fitFade, C1): the fit fades out as the drone climbs away from the car and
// back in as it dives to it, so the aerial keeps its authored framing. The overhead key is solved
// for the actual aspect: fitCircuitShot() picks, among headings between "from the grandstand side"
// and "from the first corner", the camera that shows the whole circuit largest inside the open area.
//
// update() allocates nothing; the layout (overhead shot, dollies, rigs, car-fit profiles) is
// re-solved only when the aspect or the framing areas change.
import { Vector3 } from 'three';
import { INTRO_CAMERA_FOV, INTRO_CAMERA_POSITION, PANEL_FADE, PANEL_WINDOWS } from './camera-shots.js';
import { clamp, hermite, lerp, monotoneSlope, smoothstep } from './util/math.js';

const DEG = Math.PI / 180;
const UP = new Vector3(0, 1, 0);
/**
 * The car's hull must fit in this fraction of the framing area (a margin on every side); where the
 * eye cannot back away (FIT_FALLBACK_FOV) the lens keeps it inside FALLBACK_FILL of the area.
 */
const CAR_FILL = 0.88;
const FALLBACK_FILL = 0.96;
/** The keys' FOVs are vertical FOVs at this aspect (1440×900)… */
const REFERENCE_ASPECT = 1.6;
/** …narrower screens keep its horizontal FOV, with the vertical FOV softly capped at this (degrees). */
const MAX_VERTICAL_FOV = 60;
/**
 * Between keys the car fit widens the FOV by up to FIT_EXTRA_FOV degrees before it backs the eye
 * away, and by up to FIT_FALLBACK_FOV more where the eye cannot back away far enough (the scenery
 * stops it, or MAX_FIT_DOLLY): at most FIT_EXTRA_FOV + FIT_FALLBACK_FOV in all.
 */
const FIT_EXTRA_FOV = 6;
const FIT_FALLBACK_FOV = 4;
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
/** …solved to this relative precision. */
const DOLLY_PRECISION = 1e-4;
/**
 * Between keys the dolly aims DOLLY_MARGIN beyond the fit (it is an estimate: size ∝ 1 / distance)
 * and backs the eye away by at most MAX_FIT_DOLLY of its distance; the car-fit profiles are solved
 * in FIT_PASSES passes (see the header).
 */
const DOLLY_MARGIN = 1.04;
const MAX_FIT_DOLLY = 0.75;
const FIT_PASSES = 3;
/** Passes that give the lens what the dolly and the smoothing left (see solveFit). */
const LENS_PASSES = 3;
/** Rounds of dents that keep the between-keys dolly under the scenery's limits (limitDolly). */
const LIMIT_DENTS = 6;
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
/** The smoothing's weights (offsets 0 … SMOOTH_REACH samples, truncated at 3σ). */
const SMOOTH_REACH = Math.ceil(3 * PROFILE_SMOOTH);
const SMOOTH_WEIGHTS = Float64Array.from({ length: SMOOTH_REACH + 1 }, (_, j) =>
  Math.exp(-0.5 * (j / PROFILE_SMOOTH) ** 2),
);
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
 * How much of the between-keys car fit applies at car-subject weight `subject` (1 in car shots … 0
 * in the aerial, C1): as much as the car is the subject, so the fit fades out with the car as the
 * drone climbs away and in as it dives back to the car, at the pace of the authored keys.
 */
function fitFade(subject) {
  return subject;
}

/** Whether two framing areas ([left, top, right, bottom]) are the same. */
function sameArea(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * The shift that brings the extent [low, high] inside ±half: none when it is already inside, the
 * least that puts it inside otherwise, and its middle when it is wider than the room (continuous in
 * every input; it never moves the extent's middle past 0).
 */
function shiftInto(low, high, half) {
  if (high - low >= 2 * half) return (low + high) / 2;
  return Math.min(Math.max(0, high - half), low + half);
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
  // the car-fit profiles (see the header): each the smoothed samples and their tangents, solved from
  // the raw needs (`raw`; `spread` keeps the running maximum of the lens and dolly needs)
  const newProfile = () => ({
    values: new Float64Array(PROFILE_SAMPLES),
    slopes: new Float64Array(PROFILE_SAMPLES),
    raw: new Float64Array(PROFILE_SAMPLES),
    spread: new Float64Array(PROFILE_SAMPLES),
  });
  const fitProfiles = {
    aim: newProfile(), // aim: fraction of the way from the keys' target to the middle of the car
    widen: newProfile(), // lens: half of the extra vertical FOV (radians)
    back: newProfile(), // dolly: ratio of the eye's horizontal distance from the target
  };
  const allProfiles = [fitProfiles.aim, fitProfiles.widen, fitProfiles.back];
  /**
   * What poseAt() leaves: the keys' tan(fov/2), the car-subject weight, the share of the fit that
   * applies (fitFade), and the dolly, aim and lens applied.
   */
  const fitState = { keyTan: 0, subject: 0, fade: 0, aim: 0, widen: 0, back: 0 };
  // the fit's fade at each profile sample (the subject weight does not depend on the layout)
  const fitFades = Float64Array.from(PROFILE_TIMES, (u) =>
    fitFade(clamp(curve(subjectChannel.values, subjectChannel.slopes, segmentOf(u), u), 0, 1)),
  );
  const extent = { x0: 0, y0: 0, x1: 0, y1: 0, distance: 0 };
  const fitArea = [0, 0, 0, 0];
  const centring = new Vector3();
  const profileScratch = new Float64Array(PROFILE_SAMPLES);
  const limitScratch = new Float64Array(PROFILE_SAMPLES);
  // what limitDolly() learnt per sample for this layout (the eye's path there is fixed): the
  // clearance floor and the largest dolly known clear and the smallest known blocked
  const dollyRoom = {
    floor: new Float64Array(PROFILE_SAMPLES),
    clearTo: new Float64Array(PROFILE_SAMPLES),
    blockedFrom: new Float64Array(PROFILE_SAMPLES),
  };
  const gaussScratch = new Float64Array(PROFILE_SAMPLES);
  const scratchEye = new Vector3();
  const rideEye = new Vector3();
  const rideLook = new Vector3();
  const fitEye = new Vector3();
  const fitLook = new Vector3();
  const probeEye = new Vector3();
  const newFrame = () => ({ p: new Vector3(), f: new Vector3(), r: new Vector3() });
  const keyCarFrame = newFrame();
  const rideFrames = Array.from({ length: RIDE_SAMPLES }, newFrame);
  const copyFrame = (from, to) => {
    to.p.copy(from.p);
    to.f.copy(from.f);
    to.r.copy(from.r);
    return to;
  };
  // the car's frame at each profile sample (frameAt: the same for every layout, so taken once; the
  // fit's passes and the dolly's limits read it some 6000 times per layout)
  const sampleFrames = frameAt ? new Float64Array(9 * PROFILE_SAMPLES) : null;
  let sampleFramesTaken = false;
  const sampleFrame = newFrame();
  /** The car's ground frame at profile sample i (a shared object, valid until the next call). */
  function frameAtSample(i) {
    if (!sampleFrames) return carFrame;
    if (!sampleFramesTaken) {
      for (let k = 0; k < PROFILE_SAMPLES; k++) {
        const frame = frameAt(PROFILE_TIMES[k]);
        frame.p.toArray(sampleFrames, 9 * k);
        frame.f.toArray(sampleFrames, 9 * k + 3);
        frame.r.toArray(sampleFrames, 9 * k + 6);
      }
      sampleFramesTaken = true;
    }
    sampleFrame.p.fromArray(sampleFrames, 9 * i);
    sampleFrame.f.fromArray(sampleFrames, 9 * i + 3);
    sampleFrame.r.fromArray(sampleFrames, 9 * i + 6);
    return sampleFrame;
  }

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
   * The car's outline (its hull at `frame`) on screen for an eye at `eye` looking at `look`: its
   * extent across and up the view in tan units, relative to the view axis (which the principal point
   * draws at the framing area's centre), and the target's distance, into `extent`; the view's axes
   * are left in forward/right/upAxis. False when part of the car is not in front of the eye.
   */
  function outlineExtent(frame, eye, look) {
    forward.subVectors(look, eye);
    const distance = forward.length();
    forward.divideScalar(distance);
    right.crossVectors(forward, UP).normalize();
    upAxis.crossVectors(right, forward);
    extent.x0 = extent.y0 = Infinity;
    extent.x1 = extent.y1 = -Infinity;
    extent.distance = distance;
    for (let i = 0; i < carHull.length; i += 3) {
      corner
        .copy(frame.p)
        .addScaledVector(frame.f, carHull[i])
        .addScaledVector(UP, carHull[i + 1])
        .addScaledVector(frame.r, carHull[i + 2])
        .sub(eye);
      const depth = corner.dot(forward);
      if (depth < 0.2) return false;
      const x = corner.dot(right) / depth;
      const y = corner.dot(upAxis) / depth;
      extent.x0 = Math.min(extent.x0, x);
      extent.x1 = Math.max(extent.x1, x);
      extent.y0 = Math.min(extent.y0, y);
      extent.y1 = Math.max(extent.y1, y);
    }
    return true;
  }

  /**
   * The car's outline at `frame` for an eye at `eye` looking at `look` as soft extents: as
   * outlineExtent(), but in units of `unitX`, `unitY` (tan units across and up the view) and as soft
   * minima and maxima over the hull's points (log-sum-exp, FIT_LSE_SHARPNESS: they move smoothly
   * when the outermost point changes, a few % outside the hard ones). Also writes into `centring`
   * the target's displacement that puts the outline's middle on the view axis. False when part of
   * the car is not in front of the eye.
   */
  function softExtent(frame, eye, look, unitX, unitY) {
    forward.subVectors(look, eye);
    const distance = forward.length();
    forward.divideScalar(distance);
    right.crossVectors(forward, UP).normalize();
    upAxis.crossVectors(right, forward);
    let n = 0;
    let x1 = -Infinity;
    let x0 = Infinity;
    let y1 = -Infinity;
    let y0 = Infinity;
    for (let i = 0; i < carHull.length; i += 3) {
      corner
        .copy(frame.p)
        .addScaledVector(frame.f, carHull[i])
        .addScaledVector(UP, carHull[i + 1])
        .addScaledVector(frame.r, carHull[i + 2])
        .sub(eye);
      const depth = corner.dot(forward);
      if (depth < 0.2) return false;
      const x = corner.dot(right) / (depth * unitX);
      const y = corner.dot(upAxis) / (depth * unitY);
      needs[n++] = x;
      needs[n++] = y;
      x1 = Math.max(x1, x);
      x0 = Math.min(x0, x);
      y1 = Math.max(y1, y);
      y0 = Math.min(y0, y);
    }
    // log-sum-exp around the hard extremes (which only keep it in range: the result is smooth)
    let sx1 = 0;
    let sx0 = 0;
    let sy1 = 0;
    let sy0 = 0;
    for (let i = 0; i < n; i += 2) {
      sx1 += Math.exp(FIT_LSE_SHARPNESS * (needs[i] - x1));
      sx0 += Math.exp(FIT_LSE_SHARPNESS * (x0 - needs[i]));
      sy1 += Math.exp(FIT_LSE_SHARPNESS * (needs[i + 1] - y1));
      sy0 += Math.exp(FIT_LSE_SHARPNESS * (y0 - needs[i + 1]));
    }
    extent.x1 = x1 + Math.log(sx1) / FIT_LSE_SHARPNESS;
    extent.x0 = x0 - Math.log(sx0) / FIT_LSE_SHARPNESS;
    extent.y1 = y1 + Math.log(sy1) / FIT_LSE_SHARPNESS;
    extent.y0 = y0 - Math.log(sy0) / FIT_LSE_SHARPNESS;
    extent.distance = distance;
    const cx = ((extent.x0 + extent.x1) / 2) * unitX * distance;
    const cy = ((extent.y0 + extent.y1) / 2) * unitY * distance;
    centring.copy(right).multiplyScalar(cx).addScaledVector(upAxis, cy);
    return true;
  }

  /**
   * Moves `look` so that the middle of the car's outline (at `frame`) on screen falls on the
   * principal point, for an eye at `eye`: the target shifted by the middle of the outline's extent
   * at the target's distance.
   */
  function centreOnCar(frame, eye, look) {
    if (!outlineExtent(frame, eye, look)) return;
    const d = extent.distance;
    look
      .addScaledVector(right, ((extent.x0 + extent.x1) / 2) * d)
      .addScaledVector(upAxis, ((extent.y0 + extent.y1) / 2) * d);
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
      // the dolly the car needs from this side: the least that fits it, by bisection (its size on
      // screen falls as the eye backs away; a fixed-point step, size ∝ 1 / distance, oscillates
      // where the car's near end is close to the eye and stopped unconverged, the car not fitting)
      const fitsAt = (scale) => {
        scratchEye.set(look.x + ux * radius * scale, heightAt(scale), look.z + uz * radius * scale);
        const need = carFitTan(frame, scratchEye, look, aspect, halfX, halfY);
        return need > 0 && need <= tan;
      };
      let wanted = 1;
      scratchEye.set(look.x + ux * radius, heightAt(1), look.z + uz * radius);
      if (carFitTan(frame, scratchEye, look, aspect, halfX, halfY) > tan) {
        let low = 1;
        wanted = maxDolly;
        if (fitsAt(maxDolly))
          while (wanted - low > DOLLY_PRECISION * low) {
            const mid = (low + wanted) / 2;
            if (fitsAt(mid)) wanted = mid;
            else low = mid;
          }
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
   * viewport, widened where the dolly was stopped short); the rigs; and the car-fit profiles. The
   * check for an unchanged layout runs every frame and allocates nothing.
   */
  function prepareLayout(aspect, panelArea, openArea, windows, fade) {
    if (
      aspect === solved.aspect &&
      windows === solved.windows &&
      fade === solved.fade &&
      sameArea(panelArea, solved.panel) &&
      sameArea(openArea, solved.open)
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
    solveFit(aspect, panelArea, openArea, windows, fade);
  }

  /**
   * The between-keys car-fit profiles for this layout (see the header). Each of FIT_PASSES passes
   * poses the camera at every sample as update() will, with the profiles solved so far (poseAt), and
   * adds to the raw needs what the car still lacks there: the aim that brings its outline inside the
   * framing area (CAR_FILL of it, as at the keys), then, for the outline so aimed, the lens (up to
   * FIT_EXTRA_FOV) and the dolly for what is left of its size (up to MAX_FIT_DOLLY). The needs only
   * grow from pass to pass and are measured where the car is the whole subject: in the climb and the
   * dive the keys turn away from the car on purpose, and the fit fades out there (fitFade). After
   * each pass every profile is smoothed again from its raw needs and the dolly kept clear of the
   * scenery. Then LENS_PASSES passes give the lens what is still missing: the share the dolly could
   * not take (the scenery stopped it, or MAX_FIT_DOLLY), up to FIT_EXTRA_FOV + FIT_FALLBACK_FOV and
   * enough for the car to fill FALLBACK_FILL of the area, and what the smoothing lost. Each adds the
   * missing angle to the lens's raw need, so the smoothing's loss shrinks pass by pass; the lens does
   * not move the eye, so these passes need no clearance probes.
   */
  function solveFit(aspect, panelArea, openArea, windows, panelFade) {
    for (const profile of allProfiles) {
      profile.values.fill(0);
      profile.slopes.fill(0);
      profile.raw.fill(0);
    }
    dollyRoom.floor.fill(NaN);
    dollyRoom.clearTo.fill(0);
    dollyRoom.blockedFrom.fill(Infinity);
    if (!carHull) return;
    const maxLens = (FIT_EXTRA_FOV * DEG) / 2;
    const maxFallback = ((FIT_EXTRA_FOV + FIT_FALLBACK_FOV) * DEG) / 2;
    const aimNeed = fitProfiles.aim.raw;
    const lensNeed = fitProfiles.widen.raw;
    const lensValues = fitProfiles.widen.values;
    const dollyNeed = fitProfiles.back.raw;
    for (let pass = 0; pass < FIT_PASSES + LENS_PASSES; pass++) {
      const lensOnly = pass >= FIT_PASSES;
      for (let i = 0; i < PROFILE_SAMPLES; i++) {
        const u = PROFILE_TIMES[i];
        const frame = frameAtSample(i);
        const tan = poseAt(u, frame, fitEye, fitLook);
        // the needs where the car is the whole subject (the fit's spread and smoothing carry them
        // a little way into the climb and the dive, where the fade takes them out)
        if (fitState.subject < 1) continue;
        const weight = panelWeight(u, windows, panelFade);
        for (let a = 0; a < 4; a++) fitArea[a] = lerp(openArea[a], panelArea[a], weight);
        const halfX = fitArea[2] - fitArea[0];
        const halfY = fitArea[3] - fitArea[1];
        const keyTan = fitState.keyTan;
        const keyAngle = Math.atan(keyTan);
        if (lensOnly) {
          // the lens's missing angle, added to its raw need: up to FIT_EXTRA_FOV for the car to fill
          // CAR_FILL of the area, up to FIT_EXTRA_FOV + FIT_FALLBACK_FOV for FALLBACK_FILL
          const need = Math.atan(carFitTan(frame, fitEye, fitLook, aspect, halfX, halfY)) - keyAngle;
          const fallback = Math.atan(Math.tan(keyAngle + need) * (CAR_FILL / FALLBACK_FILL)) - keyAngle;
          const missing = Math.max(Math.min(need, maxLens), fallback) - lensValues[i];
          if (missing > 0) lensNeed[i] = Math.min(maxFallback, lensNeed[i] + missing);
          continue;
        }
        if (!softExtent(frame, fitEye, fitLook, halfX * aspect * keyTan, halfY * keyTan)) continue;
        // the aim: the share of the rest of the way to the middle of the outline that brings it
        // inside the area (CAR_FILL of it at this FOV), on top of the share already applied
        const half = (CAR_FILL * tan) / keyTan;
        const midX = (extent.x0 + extent.x1) / 2;
        const midY = (extent.y0 + extent.y1) / 2;
        const aimShare = clamp(
          Math.max(
            Math.abs(midX) > 1e-9 ? shiftInto(extent.x0, extent.x1, half) / midX : 0,
            Math.abs(midY) > 1e-9 ? shiftInto(extent.y0, extent.y1, half) / midY : 0,
          ),
          0,
          1,
        );
        aimNeed[i] = Math.max(aimNeed[i], fitState.aim + aimShare * (1 - fitState.aim));
        fitLook.addScaledVector(centring, aimShare);
        // the size, for the outline so aimed: the lens first, then the dolly
        const need = carFitTan(frame, fitEye, fitLook, aspect, halfX, halfY);
        if (!(need > tan)) continue;
        const lens = Math.min(maxLens, Math.atan(need) - keyAngle);
        lensNeed[i] = Math.max(lensNeed[i], lens);
        const rest = need / Math.tan(keyAngle + lens);
        if (rest > 1) {
          const back = Math.min(MAX_FIT_DOLLY, (1 + fitState.back) * rest * DOLLY_MARGIN - 1);
          dollyNeed[i] = Math.max(dollyNeed[i], back);
        }
      }
      smoothProfile(fitProfiles.widen);
      if (lensOnly) continue;
      smoothProfile(fitProfiles.aim);
      smoothProfile(fitProfiles.back);
      if (clearanceAt) limitDolly(fitProfiles.back);
    }
  }

  /**
   * The keys' pose at progress u with the car at `frame`: the eye into `eye`, the target into
   * `look`. Returns the keys' tan(fov/2) and leaves it and the car-subject weight in fitState.
   */
  function keysAt(progress, frame, eye, look) {
    const u = clamp(progress, 0, 1);
    const seg = segmentOf(u);
    evaluateRig(rigs.pos, seg, u, eye, frame);
    evaluateRig(rigs.tgt, seg, u, look, frame);
    fitState.keyTan = curve(fovChannel.values, fovChannel.slopes, seg, u);
    fitState.subject = clamp(curve(subjectChannel.values, subjectChannel.slopes, seg, u), 0, 1);
    return fitState.keyTan;
  }

  /**
   * The camera pose at progress u with the car at `frame`, as update() draws it before the intro
   * blend and the bob: the keys, then the car fit, each profile times the fit's fade (fitFade: none
   * in the aerial): the dolly (the eye backs away from the keys' target), the aim (the target moves
   * the aim's share of the way to the middle of the car's outline seen from that eye, soft extents,
   * so the share never takes it past the middle) and the lens (which scales the image about the
   * principal point, so it keeps the aim). Writes `eye` and `look`; returns tan(fov/2) and leaves the
   * keys' tan, the subject weight, the fade and the dolly, aim and lens applied in fitState.
   */
  function poseAt(progress, frame, eye, look) {
    const keyTan = keysAt(progress, frame, eye, look);
    fitState.back = fitState.aim = fitState.widen = 0;
    const share = carHull ? fitFade(fitState.subject) : 0;
    fitState.fade = share;
    if (share <= 0) return keyTan;
    const u = clamp(progress, 0, 1);
    const back = share * profileAt(fitProfiles.back, u);
    if (back > 0) dollyEye(eye, look, back);
    fitState.back = back;
    const aim = share * profileAt(fitProfiles.aim, u);
    if (aim > 0) {
      // the outline's soft extents in units of the framing area's half-size at the keys' FOV
      const weight = panelWeight(u, solved.windows, solved.fade);
      const { open, panel } = solved;
      const halfX = lerp(open[2], panel[2], weight) - lerp(open[0], panel[0], weight);
      const halfY = lerp(open[3], panel[3], weight) - lerp(open[1], panel[1], weight);
      if (softExtent(frame, eye, look, halfX * solved.aspect * keyTan, halfY * keyTan)) {
        look.addScaledVector(centring, aim);
        fitState.aim = aim;
      }
    }
    const widen = share * profileAt(fitProfiles.widen, u);
    fitState.widen = widen;
    return widen > 0 ? Math.tan(Math.atan(keyTan) + widen) : keyTan;
  }

  /** Backs `eye` away from `look` horizontally by `back` of its distance, rising DOLLY_RISE per metre. */
  function dollyEye(eye, look, back) {
    const radius = Math.hypot(eye.x - look.x, eye.z - look.z);
    eye.x = look.x + (eye.x - look.x) * (1 + back);
    eye.z = look.z + (eye.z - look.z) * (1 + back);
    eye.y += back * radius * DOLLY_RISE;
    return eye;
  }

  /**
   * Keeps the between-keys dolly `profile` clear of the scenery: where the dollied eye (the profile
   * times the fit's fade, as poseAt applies it) would come closer than DOLLY_CLEARANCE (or than the
   * undollied eye already is), the most it can back away (bisection, remembered for the layout's
   * later passes: dollyRoom). The profile is then smoothed again from its spread needs held under a
   * ceiling, dented wherever the smoothed profile would still rise above a limit: a Gaussian-shaped
   * dent (the smoothing's own shape) as deep as lowers the smoothed value there by the excess, the
   * least change that does (minimum norm), sample by sample, for LIMIT_DENTS rounds; what is left
   * (where a dent reached 0) is taken by scaling that sample's window down to the limit, which is
   * exact. The result is under every limit and nowhere above the unlimited profile (the smoothing is
   * monotone and the ceiling only comes down), so the eye never comes closer than allowed. A limit
   * of 0 (the eye already at the pit wall's cap, at the lift-off) holds the dolly near 0 for the
   * smoothing's whole reach around it: there the lens takes over (solveFit's lens passes).
   */
  function limitDolly(profile) {
    const { values, slopes, spread } = profile;
    const limit = limitScratch;
    const { floor, clearTo, blockedFrom } = dollyRoom;
    let limited = false;
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      limit[i] = Infinity;
      // the dolly applied there (the profile times the fit's fade; dollyRoom holds applied dollies)
      const share = fitFades[i];
      const back = values[i] * share;
      if (!(back > 1e-4) || back <= clearTo[i]) continue;
      const u = PROFILE_TIMES[i];
      keysAt(u, frameAtSample(i), fitEye, fitLook);
      if (Number.isNaN(floor[i])) floor[i] = Math.min(DOLLY_CLEARANCE, clearanceAt(fitEye, fitLook));
      const clearAt = (b) => clearanceAt(dollyEye(probeEye.copy(fitEye), fitLook, b), fitLook) >= floor[i];
      if (back < blockedFrom[i]) {
        if (clearAt(back)) {
          clearTo[i] = back;
          continue;
        }
        blockedFrom[i] = back;
      }
      // bisection between what is known to be clear and blocked, to back / 256
      while (blockedFrom[i] - clearTo[i] > back / 256) {
        const mid = (clearTo[i] + blockedFrom[i]) / 2;
        if (clearAt(mid)) clearTo[i] = mid;
        else blockedFrom[i] = mid;
      }
      limit[i] = Math.min(back, clearTo[i]) / share;
      limited = true;
    }
    if (!limited) return;
    // the ceiling, dented sample by sample (each limit sees the dents made before it)
    const ceiling = profileScratch;
    ceiling.fill(Infinity);
    for (let round = 0; round <= LIMIT_DENTS; round++) {
      let over = false;
      for (let i = 0; i < PROFILE_SAMPLES; i++) {
        if (limit[i] === Infinity) continue;
        // the smoothed value at i under the ceiling, as gaussian() will compute it
        const first = Math.max(0, i - SMOOTH_REACH);
        const last = Math.min(PROFILE_SAMPLES - 1, i + SMOOTH_REACH);
        let sum = 0;
        let wsum = 0;
        let w2sum = 0;
        for (let j = first; j <= last; j++) {
          const w = SMOOTH_WEIGHTS[Math.abs(j - i)];
          sum += w * Math.min(spread[j], ceiling[j]);
          wsum += w;
          w2sum += w * w;
        }
        const value = sum / wsum;
        if (!(value > limit[i] + 1e-9)) continue;
        over = true;
        if (round < LIMIT_DENTS) {
          const depth = ((value - limit[i]) * wsum) / w2sum;
          for (let j = first; j <= last; j++)
            ceiling[j] = Math.max(
              0,
              Math.min(spread[j], ceiling[j]) - depth * SMOOTH_WEIGHTS[Math.abs(j - i)],
            );
        } else {
          // what the dents could not take (where they reached 0): the window scaled to the limit
          const scale = limit[i] / value;
          for (let j = first; j <= last; j++) ceiling[j] = Math.min(spread[j], ceiling[j]) * scale;
        }
      }
      if (!over) break;
    }
    for (let i = 0; i < PROFILE_SAMPLES; i++) values[i] = Math.min(spread[i], ceiling[i]);
    gaussian(values);
    for (let i = 0; i < PROFILE_SAMPLES; i++) slopes[i] = monotoneSlope(PROFILE_TIMES, values, i);
  }

  /**
   * A profile's samples from its raw needs: spread (a running maximum, kept in `spread`), then
   * smoothed (Gaussian), with monotone tangents (the curve stays between the samples: never below 0,
   * never above the largest need).
   */
  function smoothProfile(profile) {
    const { values, slopes, raw, spread } = profile;
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      let m = 0;
      const last = Math.min(PROFILE_SAMPLES - 1, i + PROFILE_SPREAD);
      for (let j = Math.max(0, i - PROFILE_SPREAD); j <= last; j++) m = Math.max(m, raw[j]);
      spread[i] = m;
    }
    values.set(spread);
    gaussian(values);
    for (let i = 0; i < PROFILE_SAMPLES; i++) slopes[i] = monotoneSlope(PROFILE_TIMES, values, i);
  }

  /** Gaussian smoothing in place, σ = PROFILE_SMOOTH samples (truncated at 3σ, renormalised at the ends). */
  function gaussian(values) {
    gaussScratch.set(values);
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      let sum = 0;
      let wsum = 0;
      const last = Math.min(PROFILE_SAMPLES - 1, i + SMOOTH_REACH);
      for (let j = Math.max(0, i - SMOOTH_REACH); j <= last; j++) {
        const w = SMOOTH_WEIGHTS[Math.abs(j - i)];
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
    // the keys with the between-keys car fit (aim, dolly, lens), as the layout's profiles were solved
    let tanHalf = poseAt(progress, carFrame, position, target);
    evaluateShots.car = fitState.subject;
    let mix = panelWeight(progress, windows, fade);
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
    /**
     * The car fit applied at progress u for the last layout (tests): `fade` the share of it that
     * applies (fitFade), `aim` the share of the way from the keys' target to the middle of the car,
     * `widen` the extra vertical FOV (degrees), `back` the dolly (ratio of the eye's distance).
     */
    fitAt(progress) {
      const u = clamp(progress, 0, 1);
      const fade = fitFade(clamp(curve(subjectChannel.values, subjectChannel.slopes, segmentOf(u), u), 0, 1));
      return {
        fade,
        aim: fade * profileAt(fitProfiles.aim, u),
        widen: (2 * fade * profileAt(fitProfiles.widen, u)) / DEG,
        back: fade * profileAt(fitProfiles.back, u),
      };
    },
  };
}

export {
  carOutline,
  circuitOutline,
  createCameraDirector,
  createCameraFrame,
  FIT_EXTRA_FOV,
  FIT_FALLBACK_FOV,
  fitCircuitShot,
  panelWeight,
  viewportTan,
};
