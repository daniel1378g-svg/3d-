// The hero car's choreography and kinematics.
//
// Where the car is: journey progress → arc length (metres) along the car's driving line
// (car-path.js) through a monotone Hermite curve over a few keys, so the car rolls between the
// stage stops and never runs backwards on its own (scrolling back does run it backwards).
//
// How it moves (createCarMotion, once per rendered frame):
//   wheels    roll by exactly distance / tyre radius (car.pose → car/wheel.js), so they never drift
//             and turn backwards when the scroll goes back;
//   speed     the frame's distance step / dt, clamped, through a frame-rate independent exponential
//             filter and a slew limit (4 g): a teleport (jump(), renderAt(t, {dt: 0}), warmup) is
//             never seen as speed;
//   steering  −atan(wheelbase × path curvature) a little ahead in the direction of travel (the
//             bicycle model: the same angle forwards and backwards), on a critically damped spring;
//             a rotation about +y, so a right-hand bend (κ > 0, towards +z) turns the wheels right;
//   body      pitch from longitudinal and roll from lateral acceleration (v² κ), a little heave
//             from load and road texture: critically damped springs integrated exactly for the
//             frame's dt, with clamped inputs and outputs, so very fast scrolling cannot flip or
//             spike the body, and it settles when the car stops. The pose that is shown is then
//             scaled back, if needed, so that no low point of the body (car.lowPoints: splitter,
//             sills) comes closer than MIN_CLEARANCE to the road.
// The pose is a function of the distance sequence alone (no wall-clock wobble), so the same scroll
// positions and frame times give the same pose; any dt ≤ REST_DT (renderAt(t, {dt: 0})) gives the
// car at rest at that position. World XZ plane, y up; the car model faces its local +X.
import { Vector3 } from 'three';
import { arcLengthNear } from './car-path.js';
import { clamp, hermite, lerp, monotoneSlope } from './util/math.js';

const UP = new Vector3(0, 1, 0);

/** The intro starts the car this many metres before the arrival stop. */
const INTRO_RUN_IN = 120;

/** Chord length (metres) of the three-point curvature estimate. */
const CURVATURE_STEP = 2.5;
/** Half the distance (metres) between the two points of the central-difference tangent. */
const TANGENT_STEP = 0.05;

/** Wheelbase (metres, hero-car.json axles at x = ±1.2815) and the steering limit (radians). */
const WHEELBASE = 2.563;
const MAX_STEER = 0.5;
/** Steering looks this far ahead of the car along its direction of travel: metres + seconds × speed. */
const STEER_LOOKAHEAD = 1.2;
const STEER_LOOKAHEAD_TIME = 0.25;

/** Speed filter rate (1/s) and the speed the dynamics ever see (m/s, ≈ 300 km/h). */
const SPEED_RATE = 6;
const MAX_SPEED = 85;
/** The filtered speed changes by at most this much per second (m/s², ≈ 4 g), whatever the scroll does. */
const SPEED_SLEW = 40;
/** Accelerations the body reacts to are clamped to these (m/s²). */
const MAX_LONGITUDINAL = 12;
const MAX_LATERAL = 15;

/**
 * Body response: radians per m/s² and the clamps (radians / metres). A stiffly sprung GT car: about
 * 0.7° of pitch and 1.1° of roll per g, at most 0.9° and 1.6°, and a few millimetres of squat.
 */
const PITCH_PER_ACCEL = 0.0012; // nose up under acceleration, down under braking
const ROLL_PER_ACCEL = 0.0019; // leans out of the turn
const MAX_PITCH = 0.016;
const MAX_ROLL = 0.028;
const HEAVE_PER_ACCEL = 0.0004; // squats a little under load
const ROAD_HEAVE = 0.0015; // road texture amplitude at speed (metres)
const ROAD_WAVELENGTH = 7.3; // metres
const MAX_SQUAT = 0.006;
const MAX_LIFT = 0.003;
/**
 * The shown pose keeps every low point of the body at least this far above the road (metres; the
 * splitter clears it by 72.7 mm at rest). The limit is linear in pitch/roll/heave (small angles),
 * so it keeps SAFETY in reserve for the second-order terms.
 */
const MIN_CLEARANCE = 0.02;
const CLEARANCE_SAFETY = 0.001;

/** Natural frequencies (rad/s) of the critically damped springs. */
const STEER_OMEGA = 9;
const PITCH_OMEGA = 7;
const ROLL_OMEGA = 6;
const HEAVE_OMEGA = 12;

/** A frame this short (seconds) is a still: the car is shown at rest. */
const REST_DT = 1e-3;

/** Unused (kept from the published build): the progress range of the on-track stage. */
const ON_TRACK_RANGE = [0.425, 0.56];

/**
 * Arc lengths (metres along the car path) of the places the choreography refers to.
 * `track` is the circuit centreline from track.json ([x, z] pairs).
 */
function computeLandmarks(path, track) {
  return {
    intro: 0, // unused
    arrival: arcLengthNear(path, 330, 206), // stage 1 stop on the main straight
    pitBox: arcLengthNear(path, -60, 189.2), // stage 2: in front of the open pit box
    pitExit: arcLengthNear(path, -392, 201.2), // unused
    lapStart: arcLengthNear(path, track[6][0], track[6][1]), // stage 3 starts out on the circuit
    lapEnd: arcLengthNear(path, track[96][0], track[96][1]),
    paddock: arcLengthNear(path, -8, 124.5), // stage 4 stop
    goldenHour: arcLengthNear(path, 18, 192.6), // stage 5 stop
  };
}

/** [progress, distance] keys of the car along its path. Near-duplicate keys = a slow creep at a stop. */
function carScheduleKeys(at) {
  return [
    [0, at.arrival],
    [0.085, at.arrival + 4],
    [0.2, at.pitBox],
    [0.315, at.pitBox + 0.3],
    [0.34, at.pitBox + 40], // leaves the pit box while the camera goes aerial
    [0.425, at.lapStart],
    [0.56, at.lapEnd],
    [0.665, at.paddock],
    [0.79, at.paddock + 1.5],
    [0.885, at.goldenHour],
    [1, at.goldenHour + 3],
  ];
}

/** Returns progress → distance along the car path (monotone cubic Hermite through `keys`). */
function createCarSchedule(keys) {
  const times = keys.map((key) => key[0]);
  const distances = keys.map((key) => key[1]);
  const slopes = keys.map((key, i) => monotoneSlope(times, distances, i));
  return (progress) => {
    const u = clamp(progress, 0, 1);
    let seg = 0;
    while (seg < keys.length - 2 && u > times[seg + 1]) seg++;
    return hermite(
      times[seg],
      times[seg + 1],
      distances[seg],
      distances[seg + 1],
      slopes[seg],
      slopes[seg + 1],
      u,
    );
  };
}

/** During the intro the car runs in from INTRO_RUN_IN metres before the arrival stop (ease-out cubic). */
function introRunIn(distance, intro, at) {
  return lerp(at.arrival - INTRO_RUN_IN, distance, 1 - Math.pow(1 - clamp(intro, 0, 1), 3));
}

/**
 * Point/tangent/curvature lookups by distance on the car path, without allocations. `sample()`
 * writes into one shared object ({ p, t }) that the next call overwrites: copy what you need.
 */
function createPathSampler(path) {
  const length = path.getLength();
  const shared = { p: new Vector3(), t: new Vector3() };
  const a = new Vector3();
  const b = new Vector3();
  const c = new Vector3();
  const pointAt = (distance, target) => path.getPointAt(clamp(distance / length, 0, 1), target);
  /** Unit tangent at `distance` (central difference of two points TANGENT_STEP either side). */
  function tangentAt(distance, target) {
    const d = clamp(distance, TANGENT_STEP, length - TANGENT_STEP);
    pointAt(d - TANGENT_STEP, a);
    pointAt(d + TANGENT_STEP, target);
    return target.sub(a).normalize();
  }
  function sample(distance) {
    pointAt(distance, shared.p);
    tangentAt(distance, shared.t);
    return shared;
  }
  /**
   * Signed curvature (radians of heading per metre, heading = atan2(z, x); > 0 turns towards +z,
   * i.e. right for a car driving along the path) from three points CURVATURE_STEP apart.
   */
  function curvatureAt(distance) {
    const d = clamp(distance, CURVATURE_STEP, length - CURVATURE_STEP);
    pointAt(d - CURVATURE_STEP, a);
    pointAt(d, b);
    pointAt(d + CURVATURE_STEP, c);
    const headingIn = Math.atan2(b.z - a.z, b.x - a.x);
    const headingOut = Math.atan2(c.z - b.z, c.x - b.x);
    const turn = Math.atan2(Math.sin(headingOut - headingIn), Math.cos(headingOut - headingIn));
    return turn / CURVATURE_STEP;
  }
  return { length, sample, curvatureAt };
}

/** Frame-rate independent exponential approach of `current` towards `target` at `rate` per second. */
const approach = (current, target, rate, dt) => current + (target - current) * (1 - Math.exp(-dt * rate));

/**
 * One exact step of a critically damped spring (x'' = ω² (target − x) − 2ω x') over dt with the
 * target held constant: frame-rate independent, never overshoots a step change. Mutates `s`
 * ({ x, v }) and returns s.x.
 */
function springStep(s, target, omega, dt) {
  const y = s.x - target;
  const k = s.v + omega * y;
  const e = Math.exp(-omega * dt);
  s.x = target + (y + k * dt) * e;
  s.v = (s.v - omega * k * dt) * e;
  return s.x;
}

/**
 * Steering angle the path asks for at `distance`, looking ahead in the direction of travel: radians
 * about +y (the car's up axis), so positive turns the wheels left (+x towards -z). A bend towards +z
 * (κ > 0, a right-hand bend) asks for a negative angle.
 */
function steerTarget(sampler, distance, speed) {
  const direction = speed < 0 ? -1 : 1;
  const ahead = STEER_LOOKAHEAD + STEER_LOOKAHEAD_TIME * Math.abs(speed);
  return clamp(
    -Math.atan(WHEELBASE * sampler.curvatureAt(distance + direction * ahead)),
    -MAX_STEER,
    MAX_STEER,
  );
}

/**
 * How much of a body pose can be shown: 1, or the largest factor k < 1 for which pitch, roll and
 * heave all scaled by k keep every low point at least MIN_CLEARANCE above the road. In the car frame
 * (chassis rotation (roll, 0, pitch), Euler XYZ) a body point (x, y, z) moves up by
 * x·pitch − z·roll + heave to first order.
 *
 * @param {Float64Array|number[]|null} points low points as x, clearance at rest (m), z triples
 */
function clearanceScale(points, pitch, roll, heave) {
  if (!points) return 1;
  let k = 1;
  for (let i = 0; i < points.length; i += 3) {
    const drop = -(points[i] * pitch - points[i + 2] * roll + heave);
    if (drop <= 0) continue;
    const room = points[i + 1] - MIN_CLEARANCE - CLEARANCE_SAFETY;
    k = Math.min(k, room > 0 ? room / drop : 0);
  }
  return k;
}

/**
 * The car's motion state, advanced once per frame by update(distance, dt).
 *
 * journey.js reads/writes lastDistance, wheelDistance, speed and prevSpeed: assigning lastDistance
 * from outside (jump(), renderAt(t, {dt: 0}), the end of warmup()) is a teleport, so the next update
 * puts the car at rest there instead of reading the jump as speed. `frame` is the car's ground frame
 * (p: position, f: flat forward, r: right) that car-relative camera shots and the shadow follow read.
 *
 * @param {{ root: import('three').Object3D, pose: Function, lowPoints?: Float64Array }} car buildHeroCar()
 *   result; lowPoints (x, clearance above the road at rest, z triples, metres) enable the clearance limit
 * @param {ReturnType<typeof createPathSampler>} sampler
 * @param {number} startDistance metres along the path
 * @param {object} [options]
 * @param {(distance: number) => number} [options.roadHeight] height of the road surface under the car
 *   (car/road-height.js), passed on to car.pose() as `road`
 */
function createCarMotion(car, sampler, startDistance, { roadHeight = null } = {}) {
  let lastDistance = startDistance;
  let teleported = true;
  let speed = 0;
  let prevSpeed = 0;
  let speedOverride = false; // speed assigned from outside since the last update (renderAt's `speed`)
  const steer = { x: 0, v: 0 };
  const pitch = { x: 0, v: 0 };
  const roll = { x: 0, v: 0 };
  const heave = { x: 0, v: 0 };
  // the body's low points (x, clearance at rest, z), if the car provides them
  const lowPoints = car.lowPoints || null;
  // what is shown: the springs' pose after the clearance limit (it is also car.pose()'s argument)
  const pose = { dist: 0, steer: 0, pitch: 0, roll: 0, heave: 0, speed: 0, road: undefined };
  const frame = { p: new Vector3(), f: new Vector3(), r: new Vector3() };

  function settle(distance) {
    if (!speedOverride) speed = 0;
    prevSpeed = speed;
    steer.x = steerTarget(sampler, distance, 0);
    steer.v = pitch.x = pitch.v = roll.x = roll.v = heave.x = heave.v = 0;
  }

  const motion = {
    get lastDistance() {
      return lastDistance;
    },
    /** Setting it from outside teleports the car there (at rest from the next update). */
    set lastDistance(value) {
      lastDistance = value;
      teleported = true;
    },
    wheelDistance: startDistance, // distance that drives the wheel spin (m): the path distance itself
    /** Filtered signed speed along the path (m/s, clamped to ±MAX_SPEED). */
    get speed() {
      return speed;
    },
    /** Assigning it (renderAt's `speed`) holds that speed through a still, e.g. for the wheel blur. */
    set speed(value) {
      speed = value;
      speedOverride = true;
    },
    /** Last frame's speed. */
    get prevSpeed() {
      return prevSpeed;
    },
    set prevSpeed(value) {
      prevSpeed = value;
    },
    accel: 0, // longitudinal acceleration the body reacts to (m/s²)
    lateral: 0, // lateral acceleration v²κ the body reacts to (m/s²)
    /** Front-wheel steer angle about +y (radians, > 0 turns left). */
    get steer() {
      return pose.steer;
    },
    /** Body pitch about +z (radians, > 0 nose up), as shown. */
    get pitch() {
      return pose.pitch;
    },
    /** Body roll about +x (radians, > 0 lowers the right side), as shown. */
    get roll() {
      return pose.roll;
    },
    /** Body heave (metres), as shown. */
    get heave() {
      return pose.heave;
    },
    frame,
    /**
     * @param {number} distance metres along the path this frame
     * @param {number} dt seconds since the last frame
     */
    update(distance, dt) {
      const step = distance - lastDistance;
      lastDistance = distance;
      if (teleported || !(dt > REST_DT)) {
        teleported = false;
        settle(distance);
        motion.accel = motion.lateral = 0;
      } else {
        const rawSpeed = clamp(step / dt, -MAX_SPEED, MAX_SPEED);
        prevSpeed = speed;
        speed = clamp(
          approach(speed, rawSpeed, SPEED_RATE, dt),
          speed - SPEED_SLEW * dt,
          speed + SPEED_SLEW * dt,
        );
        motion.accel = clamp((speed - prevSpeed) / dt, -MAX_LONGITUDINAL, MAX_LONGITUDINAL);
        motion.lateral = clamp(speed * speed * sampler.curvatureAt(distance), -MAX_LATERAL, MAX_LATERAL);
        springStep(steer, steerTarget(sampler, distance, speed), STEER_OMEGA, dt);
        // κ > 0 turns right (+z): the body leans out of the turn, to the left (roll < 0)
        springStep(roll, clamp(-ROLL_PER_ACCEL * motion.lateral, -MAX_ROLL, MAX_ROLL), ROLL_OMEGA, dt);
        springStep(pitch, clamp(PITCH_PER_ACCEL * motion.accel, -MAX_PITCH, MAX_PITCH), PITCH_OMEGA, dt);
        const load = Math.abs(motion.accel) + Math.abs(motion.lateral);
        const road =
          ROAD_HEAVE *
          Math.sin((distance / ROAD_WAVELENGTH) * Math.PI * 2) *
          Math.min(1, Math.abs(speed) / 20);
        springStep(heave, clamp(road - HEAVE_PER_ACCEL * load, -MAX_SQUAT, MAX_LIFT), HEAVE_OMEGA, dt);
        // the springs' own transients stay inside the limits too
        steer.x = clamp(steer.x, -MAX_STEER, MAX_STEER);
        roll.x = clamp(roll.x, -MAX_ROLL, MAX_ROLL);
        pitch.x = clamp(pitch.x, -MAX_PITCH, MAX_PITCH);
        heave.x = clamp(heave.x, -MAX_SQUAT, MAX_LIFT);
      }
      speedOverride = false;
      motion.wheelDistance = distance;

      const at = sampler.sample(distance);
      frame.p.copy(at.p);
      frame.f.copy(at.t).setY(0).normalize();
      frame.r.crossVectors(frame.f, UP).normalize();
      car.root.position.copy(at.p);
      car.root.rotation.y = Math.atan2(-at.t.z, at.t.x); // turns local +X onto the tangent
      // a continuous scale of the spring state, so the shown pose never jumps
      const k = clearanceScale(lowPoints, pitch.x, roll.x, heave.x);
      pose.dist = distance;
      pose.steer = steer.x;
      pose.pitch = pitch.x * k;
      pose.roll = roll.x * k;
      pose.heave = heave.x * k;
      pose.speed = Math.abs(speed);
      if (roadHeight) pose.road = roadHeight(distance);
      car.pose(pose);
    },
  };
  return motion;
}

export {
  MIN_CLEARANCE,
  ON_TRACK_RANGE,
  carScheduleKeys,
  clearanceScale,
  computeLandmarks,
  createCarMotion,
  createCarSchedule,
  createPathSampler,
  introRunIn,
  springStep,
};
