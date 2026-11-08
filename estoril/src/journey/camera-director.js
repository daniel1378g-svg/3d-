// Turns journey progress into the camera pose: evaluates the shot keys (camera-shots.js) with
// per-channel monotone Hermite curves, resolves car-relative keys against the car's current ground
// frame and the overhead key against the circuit, blends in the intro pose, adds a slow vertical
// bob, and frames the subject in the part of the screen the page leaves free.
//
// Interpolation. Every channel is a monotone cubic Hermite curve over the keys (PCHIP:
// util/math.js monotoneSlope + hermite): C1 (no velocity jumps at the keys) and monotone between
// keys (no overshoot, so the path between two keys that clear the scenery stays between them).
// PCHIP needs fixed key values: its tangents bend where a neighbouring secant changes sign, so keys
// that move (car-relative keys resolved against the moving car) would put kinks in the path. Each
// point (eye, target) is therefore two rigs with fixed keys (createRig): a world rig over the
// absolute keys and a car rig over the car-relative offsets, cross-faded by a PCHIP weight (0 at
// absolute keys, 1 at car-relative ones). Where the car moves smoothly, so does the camera.
//
// Framing. The page passes two areas of the viewport (setFraming in journey.js, from home.js):
//   panel   the free part of the screen while a stage panel is shown (right of the panel column on
//           desktop, the band between the top controls and the bottom sheet on phones),
//   open    the screen minus the fixed page UI (aerial shots, when no panel is shown).
// The framing channel (1 for 'panel' keys, 0 for 'open' keys) blends between them. The camera's
// principal point (where the target appears) is moved to the centre of the blended area with a
// view offset, and in car shots the vertical field of view is widened, only when needed, so the
// car's bounding box fits inside the area (a smooth maximum, so the FOV stays C1 where the fit
// takes over). The overhead key is solved for the actual aspect: fitCircuitShot() picks, among
// headings between "from the grandstand side" and "from the first corner", the camera that shows
// the whole circuit largest inside the open area.
//
// update() allocates nothing; the overhead shot is re-solved only when the aspect or the open area
// changes.
import { Vector3 } from 'three';
import { INTRO_CAMERA_FOV, INTRO_CAMERA_POSITION } from './camera-shots.js';
import { clamp, hermite, lerp, monotoneSlope } from './util/math.js';

const DEG = Math.PI / 180;
const UP = new Vector3(0, 1, 0);
/** The car's box must fit in this fraction of the framing area (a margin on every side). */
const CAR_FILL = 0.88;
/** Softness of the smooth maximum between the shot's FOV and the car fit, relative to tan(fov/2). */
const FIT_SOFTNESS = 0.06;
/** The car fit never widens the vertical FOV beyond 120° (tan 60°). */
const MAX_FIT_TAN = Math.tan(60 * DEG);
/** Sharpness of the soft maximum over the car's corners (overshoot ≤ ln 16 / this, i.e. 3.5 %). */
const FIT_LSE_SHARPNESS = 80;
/** Car-relative shots use the car's heading smoothed over a chord of ± this many metres of path. */
const HEADING_CHORD = 3;
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

/** Smooth maximum of a and b (≥ both, C∞): the softness k rounds the corner. */
const smoothMax = (a, b, k) => 0.5 * (a + b + Math.sqrt((a - b) * (a - b) + k * k));

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
 * The key values of one point of the shots (`pos` or `tgt`) as two rigs plus a weight, so that every
 * interpolated value is static and the plain PCHIP tangents are fixed (see the header):
 *   world  x, y, z per key: the key's world position (abs, or the overhead fit); a car-relative key
 *          holds the world value of the nearest absolute key before/after it in its run
 *   car    along, up, side per key: the key's car-relative offset; an absolute key holds the offset
 *          of the nearest car-relative key before/after it in its run
 *   weight 1 for car-relative keys, 0 for absolute ones
 * A run of one key between two keys of the other kind holds their time-weighted mix.
 */
function createRig(shots, key) {
  const count = shots.length;
  const times = shots.map((shot) => shot.u);
  const isRel = shots.map((shot) => !!shot[key].rel);
  const world = [new Float64Array(count), new Float64Array(count), new Float64Array(count)];
  const car = [new Float64Array(count), new Float64Array(count), new Float64Array(count)];
  const weight = new Float64Array(count).map((_, k) => (isRel[k] ? 1 : 0));
  const slopes = {
    world: world.map(() => new Float64Array(count)),
    car: car.map(() => new Float64Array(count)),
  };
  const weightSlopes = new Float64Array(count).map((_, k) => monotoneSlope(times, weight, k));

  /** For key k of kind `rel` (true/false): the index of the nearest key of the other kind before/after its run. */
  function holds(values, ownKind, valueOf) {
    for (let k = 0; k < count; k++) {
      if (isRel[k] === ownKind) {
        const v = valueOf(k);
        for (let a = 0; a < 3; a++) values[a][k] = v[a];
        continue;
      }
      let first = k;
      while (first > 0 && isRel[first - 1] !== ownKind) first--;
      let last = k;
      while (last < count - 1 && isRel[last + 1] !== ownKind) last++;
      const before = first > 0 ? first - 1 : -1;
      const after = last < count - 1 ? last + 1 : -1;
      const vb = before >= 0 ? valueOf(before) : null;
      const va = after >= 0 ? valueOf(after) : null;
      for (let a = 0; a < 3; a++) {
        let value;
        if (vb && va && first === last)
          value = vb[a] + ((va[a] - vb[a]) * (times[k] - times[before])) / (times[after] - times[before]);
        else if (vb && (k === first || !va)) value = vb[a];
        else if (va && (k === last || !vb)) value = va[a];
        else value = vb ? vb[a] : 0;
        values[a][k] = value;
      }
    }
  }

  return {
    world,
    car,
    weight,
    weightSlopes,
    slopes,
    /** Fills the rigs; `worldOf(k)` gives the world position of absolute key k (the fit may change). */
    build(worldOf) {
      holds(world, false, worldOf);
      holds(car, true, (k) => shots[k][key].rel);
      for (let a = 0; a < 3; a++)
        for (let k = 0; k < count; k++) {
          slopes.world[a][k] = monotoneSlope(times, world[a], k);
          slopes.car[a][k] = monotoneSlope(times, car[a], k);
        }
    },
  };
}

/**
 * `carFrame` is the car's ground frame ({ p: position, f: flat forward, r: right }, e.g.
 * createCameraFrame()), updated before the camera runs. Options: `circuit` the circuit's closed
 * centre line as [x, z] pairs (the overhead shot shows all of it, see circuitOutline); `carBox`
 * [[minX, minY, minZ], [maxX, maxY, maxZ]] in the car frame (+x forward, y up, +z right).
 * `position`/`target` hold the last applied camera pose (the shadow follow and the depth range read
 * them).
 */
function createCameraDirector(camera, shots, carFrame, { circuit = null, carBox = null } = {}) {
  const count = shots.length;
  const times = shots.map((shot) => shot.u);
  const outline = circuit ? circuitOutline(circuit) : null;
  const rigs = { pos: createRig(shots, 'pos'), tgt: createRig(shots, 'tgt') };
  // the scalar channels: fov, framing weight (1 panel, 0 open), subject weight (1 car, 0 aerial)
  const scalars = [
    shots.map((shot) => shot.fov),
    shots.map((shot) => (shot.frame === 'open' ? 0 : 1)),
    shots.map((shot) => (shot.aerial ? 0 : 1)),
  ].map((values) => ({ values, slopes: values.map((_, k) => monotoneSlope(times, values, k)) }));
  const position = new Vector3();
  const target = new Vector3();
  // scratch
  const intro = new Vector3(...INTRO_CAMERA_POSITION);
  const forward = new Vector3();
  const right = new Vector3();
  const upAxis = new Vector3();
  const corner = new Vector3();
  const needs = new Float64Array(16);
  const area = [0, 0, 0, 0];
  let overhead = null;
  let overheadAspect = NaN;
  const overheadArea = [NaN, NaN, NaN, NaN];
  let fitScaled = [0, 0, 0];

  /** World position of absolute (or overhead) key k of `key`: a new array (setup only). */
  function worldOf(k, key) {
    const shot = shots[k];
    const spec = shot[key];
    if (spec.abs) return spec.abs;
    // the overhead shot, the eye pulled back from its target by `scale`
    const t = overhead.tgt;
    if (key === 'tgt') return t;
    const scale = shot.scale || 1;
    fitScaled = overhead.pos.map((v, a) => t[a] + (v - t[a]) * scale);
    return fitScaled;
  }

  /** Re-solves the overhead shot (and the rigs) when the aspect or the open area changed. */
  function prepareOverhead(aspect, openArea) {
    if (
      aspect === overheadAspect &&
      openArea[0] === overheadArea[0] &&
      openArea[1] === overheadArea[1] &&
      openArea[2] === overheadArea[2] &&
      openArea[3] === overheadArea[3]
    )
      return;
    overheadAspect = aspect;
    for (let i = 0; i < 4; i++) overheadArea[i] = openArea[i];
    const fov = shots.find((shot) => shot.pos.fit)?.fov ?? 40;
    overhead = outline ? fitCircuitShot(outline, aspect, openArea, fov) : null;
    if (!overhead) overhead = { pos: [0, 700, 600], tgt: [0, 0, 0], heading: 0 };
    rigs.pos.build((k) => worldOf(k, 'pos'));
    rigs.tgt.build((k) => worldOf(k, 'tgt'));
  }

  /** Cubic Hermite of values/slopes (per key) on segment seg at progress u. */
  function curve(values, slopes, seg, u) {
    return hermite(times[seg], times[seg + 1], values[seg], values[seg + 1], slopes[seg], slopes[seg + 1], u);
  }

  /** Writes the point of `rig` at progress u on segment seg into `out`. */
  function evaluateRig(rig, seg, u, out) {
    const wx = curve(rig.world[0], rig.slopes.world[0], seg, u);
    const wy = curve(rig.world[1], rig.slopes.world[1], seg, u);
    const wz = curve(rig.world[2], rig.slopes.world[2], seg, u);
    const weight = clamp(curve(rig.weight, rig.weightSlopes, seg, u), 0, 1);
    if (weight === 0) return out.set(wx, wy, wz);
    const along = curve(rig.car[0], rig.slopes.car[0], seg, u);
    const up = curve(rig.car[1], rig.slopes.car[1], seg, u);
    const side = curve(rig.car[2], rig.slopes.car[2], seg, u);
    const cx = carFrame.p.x + carFrame.f.x * along + carFrame.r.x * side;
    const cy = carFrame.p.y + up;
    const cz = carFrame.p.z + carFrame.f.z * along + carFrame.r.z * side;
    return out.set(wx + (cx - wx) * weight, wy + (cy - wy) * weight, wz + (cz - wz) * weight);
  }

  /**
   * Writes the interpolated camera position/target for `progress`; returns the FOV (degrees).
   * The framing weight (1 panel … 0 open) is left in `evaluateShots.frame`, the car-subject weight
   * (1 car shot … 0 aerial) in `evaluateShots.car`. Call update() (or prepare the overhead shot)
   * first: the rigs are built for the current aspect.
   */
  function evaluateShots(progress, outPosition, outTarget) {
    if (!overhead) prepareOverhead(camera.aspect, DEFAULT_AREA);
    const u = clamp(progress, 0, 1);
    let seg = 0;
    while (seg < count - 2 && u > times[seg + 1]) seg++;
    evaluateRig(rigs.pos, seg, u, outPosition);
    evaluateRig(rigs.tgt, seg, u, outTarget);
    evaluateShots.frame = clamp(curve(scalars[1].values, scalars[1].slopes, seg, u), 0, 1);
    evaluateShots.car = clamp(curve(scalars[2].values, scalars[2].slopes, seg, u), 0, 1);
    return curve(scalars[0].values, scalars[0].slopes, seg, u);
  }
  evaluateShots.frame = 1;
  evaluateShots.car = 1;

  /**
   * tan(fov/2) that fits the car's box into the framing area around the principal point
   * (half-sizes halfX, halfY in NDC), for the camera at `position` looking at `target`.
   */
  function carFitTan(aspect, halfX, halfY) {
    forward.subVectors(target, position).normalize();
    right.crossVectors(forward, UP).normalize();
    upAxis.crossVectors(right, forward);
    const min = carBox[0];
    const max = carBox[1];
    // the largest of the 16 corner/axis requirements, as a soft maximum (log-sum-exp, at most
    // FIT_LSE_OVERSHOOT above the hard one) so the FOV stays smooth when the limiting corner changes
    let count = 0;
    for (let i = 0; i < 8; i++) {
      const bx = i & 1 ? max[0] : min[0];
      const by = i & 2 ? max[1] : min[1];
      const bz = i & 4 ? max[2] : min[2];
      corner
        .copy(carFrame.p)
        .addScaledVector(carFrame.f, bx)
        .addScaledVector(carFrame.r, bz)
        .addScaledVector(UP, by)
        .sub(position);
      const depth = corner.dot(forward);
      if (depth < 0.2) return 0; // the car is not in front of the camera: no fit
      needs[count++] = Math.abs(corner.dot(right)) / (depth * aspect * halfX * CAR_FILL);
      needs[count++] = Math.abs(corner.dot(upAxis)) / (depth * halfY * CAR_FILL);
    }
    let largest = 0;
    for (let i = 0; i < count; i++) largest = Math.max(largest, needs[i]);
    let sum = 0;
    for (let i = 0; i < count; i++) sum += Math.exp(FIT_LSE_SHARPNESS * (needs[i] / largest - 1));
    return largest * (1 + Math.log(sum) / FIT_LSE_SHARPNESS);
  }

  /**
   * Poses `camera` for this frame.
   *   introEase  eased intro amount 0..1 (1 = no intro blend)
   *   clock      seconds since start (drives the bob)
   *   debugCam   optional { pos, tgt, fov } override (api.debugCam)
   *   width, height        drawing buffer size in device pixels
   *   framing    { panel, open }: framing areas as [left, top, right, bottom] viewport fractions
   */
  function update({ progress, introEase, clock, debugCam, width, height, framing }) {
    const aspect = camera.aspect;
    const panelArea = (framing && framing.panel) || DEFAULT_AREA;
    const openArea = (framing && framing.open) || DEFAULT_AREA;
    prepareOverhead(aspect, openArea);
    let fov = evaluateShots(progress, position, target);
    let frame = evaluateShots.frame;
    let subject = evaluateShots.car;
    if (introEase < 1) {
      position.lerpVectors(intro, position, introEase);
      fov = lerp(INTRO_CAMERA_FOV, fov, introEase);
    }
    if (debugCam) {
      position.fromArray(debugCam.pos);
      target.fromArray(debugCam.tgt);
      fov = debugCam.fov || fov;
      frame = 0;
      subject = 0;
    }
    position.y += Math.sin(clock * 0.23) * 0.036; // slow handheld-like drift, ±3.6 cm vertically

    // framing area for this frame, its centre (the principal point) and half-size in NDC
    for (let i = 0; i < 4; i++) area[i] = lerp(openArea[i], panelArea[i], frame);
    const centreX = (area[0] + area[2]) / 2;
    const centreY = (area[1] + area[3]) / 2;
    let tanHalf = Math.tan((fov * DEG) / 2);
    if (carBox && subject > 0) {
      const need = carFitTan(aspect, area[2] - area[0], area[3] - area[1]);
      if (need > 0) {
        const fitted = -smoothMax(-MAX_FIT_TAN, -smoothMax(tanHalf, need, FIT_SOFTNESS * tanHalf), 0.1);
        tanHalf += subject * (fitted - tanHalf);
      }
    }
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
    /** The solved overhead shot ({ pos, tgt, heading }) for the last aspect. */
    get overhead() {
      return overhead;
    },
  };
}

export { circuitOutline, createCameraDirector, createCameraFrame, fitCircuitShot };
