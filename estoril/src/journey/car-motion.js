// The hero car's choreography and kinematics.
//
// Where the car is: journey progress → arc length (metres) along the car's driving line
// (car-path.js) through a monotone Hermite curve over a few keys, so the car rolls between the
// stage stops and never runs backwards on its own.
// How it moves: speed is the smoothed rate of change of that distance; steering, body roll, pitch
// and heave come from speed, path curvature and acceleration; wheel spin comes from the distance
// travelled (car.pose). World XZ plane, y up; the car model faces its local +X.
import { Vector3 } from 'three';
import { arcLengthNear } from './car-path.js';
import { clamp, hermite, lerp, monotoneSlope } from './util/math.js';

const UP = new Vector3(0, 1, 0);

/** The intro starts the car this many metres before the arrival stop. */
const INTRO_RUN_IN = 120;

/** Half the window (metres along the path) over which curvature is measured. */
const CURVATURE_HALF_WINDOW = 2.5;

/** Wheelbase (metres) that turns curvature into an Ackermann steering angle, and its exaggeration. */
const WHEELBASE = 2.56;
const STEER_GAIN = 1.6;
const MAX_STEER = 0.5; // radians

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
 * Point/tangent lookups by distance on the car path. `sample()` writes into one shared object
 * ({ p, t }) that the next call overwrites: copy what you need to keep.
 */
function createPathSampler(path) {
  const length = path.getLength();
  const shared = { p: new Vector3(), t: new Vector3() };
  function sample(distance) {
    const u = clamp(distance / length, 0, 1);
    path.getPointAt(u, shared.p);
    path.getTangentAt(u, shared.t);
    return shared;
  }
  /** Signed curvature (radians of heading per metre) around `distance`; heading = atan2(z, x). */
  function curvatureAt(distance) {
    const before = sample(Math.max(0, distance - CURVATURE_HALF_WINDOW)).t.clone();
    const after = sample(Math.min(length, distance + CURVATURE_HALF_WINDOW)).t.clone();
    const headingBefore = Math.atan2(before.z, before.x);
    const headingAfter = Math.atan2(after.z, after.x);
    const turn = Math.atan2(Math.sin(headingAfter - headingBefore), Math.cos(headingAfter - headingBefore));
    return turn / (2 * CURVATURE_HALF_WINDOW);
  }
  return { length, sample, curvatureAt };
}

/** Frame-rate independent exponential approach of `current` towards `target` at `rate` per second. */
const approach = (current, target, rate, dt) => current + (target - current) * (1 - Math.exp(-dt * rate));

/**
 * The car's motion state, advanced once per frame by update(distance, dt, clock).
 * journey.js saves/restores or resets lastDistance, wheelDistance, speed and prevSpeed.
 * `frame` is the car's ground frame (p: position, f: flat forward, r: right) that car-relative
 * camera shots and the shadow follow read.
 */
function createCarMotion(car, sampler, startDistance) {
  const motion = {
    lastDistance: startDistance, // distance rendered last frame (m)
    wheelDistance: 0, // accumulated distance that drives wheel spin (m)
    speed: 0, // smoothed signed speed along the path (m/s)
    prevSpeed: 0, // last frame's `speed`, for longitudinal acceleration
    steer: 0, // front wheel steering angle (rad)
    roll: 0, // body roll (rad), from lateral acceleration
    pitch: 0, // body pitch (rad), from longitudinal acceleration
    heave: 0, // body bounce (m)
    frame: { p: new Vector3(), f: new Vector3(), r: new Vector3() },
    update(distance, dt, clock) {
      const step = distance - motion.lastDistance;
      motion.lastDistance = distance;
      motion.wheelDistance += step;
      const rawSpeed = step / Math.max(dt, 0.001);
      motion.speed = approach(motion.speed, rawSpeed, 5, dt);
      const accel = (motion.speed - motion.prevSpeed) / Math.max(dt, 0.001); // m/s²
      motion.prevSpeed = motion.speed;

      const at = sampler.sample(distance);
      const position = at.p.clone();
      const tangent = at.t.clone();
      const heading = Math.atan2(-tangent.z, tangent.x); // rotation.y that turns local +X onto the tangent
      const curvature = sampler.curvatureAt(distance);
      // Ackermann angle for this curvature, exaggerated, mirrored when rolling backwards
      const steerTarget = clamp(
        Math.atan(WHEELBASE * curvature) * Math.sign(motion.speed || 1) * STEER_GAIN,
        -MAX_STEER,
        MAX_STEER,
      );
      motion.steer = approach(motion.steer, steerTarget, 8, dt);
      const lateralAccel = clamp(motion.speed * motion.speed * curvature, -14, 14); // v²κ, m/s²
      motion.roll = approach(motion.roll, clamp(-lateralAccel * 0.0045, -0.045, 0.045), 6, dt);
      motion.pitch = approach(motion.pitch, clamp(-accel * 0.0016, -0.03, 0.03), 5, dt);
      // road buzz that grows with speed, plus a slow idle sway
      motion.heave =
        Math.sin(clock * 13) * 0.0025 * clamp(Math.abs(motion.speed) / 30, 0, 1) +
        Math.sin(clock * 2.1) * 0.0015;

      car.root.position.copy(position);
      car.root.rotation.y = heading;
      car.pose({
        dist: motion.wheelDistance,
        steer: motion.steer,
        roll: motion.roll,
        pitch: motion.pitch,
        heave: motion.heave,
        speed: Math.abs(motion.speed),
      });

      const frame = motion.frame;
      frame.p.copy(position);
      frame.f.copy(tangent).setY(0).normalize();
      frame.r.crossVectors(frame.f, UP).normalize();
    },
  };
  return motion;
}

export {
  ON_TRACK_RANGE,
  carScheduleKeys,
  computeLandmarks,
  createCarMotion,
  createCarSchedule,
  createPathSampler,
  introRunIn,
};
