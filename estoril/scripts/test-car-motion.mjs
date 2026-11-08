// Checks the hero car's kinematics (src/journey/car-motion.js) on the real car path and schedule.
// node scripts/test-car-motion.mjs        (exit code 1 on any failure)
//
// Scroll scripts drive the page's progress spring (progress.js) like journey.js does, at random
// frame times of 8–50 ms, and every frame's pose is checked: continuity (no jumps beyond the limits
// below), bounded roll/pitch/heave/steer, ground clearance of the body's low points (exact rotation),
// the wheels rolling exactly distance / radius through their instance matrices (car/wheel.js), front
// wheels steering into the bend, settling when stopped, mirrored dynamics in reverse, teleports
// (jump / renderAt dt 0) without speed, and the same pose at 30 and 120 frames per second.
import { readFileSync } from 'node:fs';
import { buildCarPath } from '../src/journey/car-path.js';
import {
  MIN_CLEARANCE,
  carScheduleKeys,
  computeLandmarks,
  createCarMotion,
  createCarSchedule,
  createPathSampler,
} from '../src/journey/car-motion.js';
import { createProgress } from '../src/journey/progress.js';
import { clearancePoints } from '../src/journey/car/hero-car.js';
import { REFERENCE_RADIUS, rollAngle, wheelSet, wheelTransforms } from '../src/journey/car/wheel.js';
import { Matrix4, Vector3 } from 'three';

const root = new URL('..', import.meta.url).pathname;
const track = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;
const layout = JSON.parse(readFileSync(root + 'site/assets/models/hero-car.json', 'utf8'));
const bodyDesc = JSON.parse(readFileSync(root + 'site/assets/models/' + layout.body, 'utf8'));
const path = buildCarPath(track);
const sampler = createPathSampler(path);
const landmarks = computeLandmarks(path, track);
const distanceAt = createCarSchedule(carScheduleKeys(landmarks));
const lowPoints = clearancePoints(bodyDesc.lowPoints); // x, clearance at rest, z
const wheels = wheelSet(layout, 0.86, 0);

// limits (the module's clamps, plus a hair for float noise) and per-frame continuity thresholds
const LIMIT = { roll: 0.028 + 1e-9, pitch: 0.016 + 1e-9, heave: 0.006 + 1e-9, steer: 0.5 + 1e-9 };
const MAX_STEP = { roll: 0.006, pitch: 0.006, heave: 0.003, steer: 0.02, speed: 2.5 };
/**
 * The car's heading follows the path: per frame it may turn by at most this much per metre driven
 * (the tightest bend of the car path, in the paddock, is 0.445 rad/m), plus 0.01 rad.
 */
const MAX_TURN_PER_METRE = 0.5;
/** The body may come this close to the road (metres): MIN_CLEARANCE less 0.5 mm of rounding. */
const CLEARANCE = MIN_CLEARANCE - 0.0005;

let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? `  (${detail})` : ''}`);
};

/** Deterministic random frame times in [8, 50] ms. */
function frameTimes(seed) {
  let s = seed >>> 0;
  return () => 0.008 + 0.042 * ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** A car stand-in that records what car-motion poses (hero-car's pose() receives the same object). */
function mockCar() {
  return {
    root: { position: new Vector3(), rotation: { y: 0 } },
    lowPoints,
    last: null,
    pose(state) {
      this.last = { ...state };
    },
  };
}

/**
 * Lowest clearance (metres) of the body's low points under a pose, with the exact rotation hero-car.js
 * applies (chassis.rotation.set(roll, 0, pitch), Euler XYZ, about the chassis origin, plus heave).
 */
function clearance({ pitch, roll, heave }) {
  let min = Infinity;
  const raw = bodyDesc.lowPoints;
  for (let i = 0; i < raw.length; i++) {
    const [x, y, z] = raw[i];
    const rest = lowPoints[i * 3 + 1]; // clearance at rest = y + (ride height - road height)
    const yRotated = (x * Math.sin(pitch) + y * Math.cos(pitch)) * Math.cos(roll) - z * Math.sin(roll);
    min = Math.min(min, rest + (yRotated - y) + heave);
  }
  return min;
}

/** Wraps an angle difference to (-π, π]. */
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

// wheel instance matrices (car/wheel.js wheelTransforms) and the angle they show
const rolledM = new Matrix4();
const steeredM = new Matrix4();
const top = new Vector3();
/**
 * Where the top of each tyre is (car frame) after `dist` metres with `steer`: [{ x, y, z, angle }],
 * angle = how far the tyre has turned forwards (radians, the top point's angle from +y towards the
 * wheel's heading).
 */
function tyreTops(dist, steer) {
  return wheels.map((w) => {
    wheelTransforms(w, dist, steer, rolledM, steeredM);
    top.set(0, REFERENCE_RADIUS, 0).applyMatrix4(rolledM).sub(w.centre);
    const heading = w.front ? steer : 0; // about +y: forward is (cos, 0, -sin)
    const along = top.x * Math.cos(heading) - top.z * Math.sin(heading);
    return { x: top.x, y: top.y, z: top.z, along, angle: Math.atan2(along, top.y) };
  });
}

/**
 * Runs a scroll script: target(t) is the page's scroll target (progress 0..1) at time t; the
 * progress spring and the schedule turn it into a distance, as in journey.js renderFrame().
 * Returns the per-frame record.
 */
function run({ target, duration, dt, startProgress, motion: given, car: givenCar, progress: givenProgress }) {
  const car = givenCar || mockCar();
  const progress = givenProgress || createProgress();
  if (!givenProgress) {
    progress.finishIntro();
    progress.value = progress.target = startProgress ?? target(0);
  }
  const motion = given || createCarMotion(car, sampler, distanceAt(progress.value));
  const frames = [];
  for (let t = 0; t < duration;) {
    const step = typeof dt === 'function' ? dt() : dt;
    t += step;
    progress.target = target(Math.min(t, duration));
    progress.advance(step);
    const distance = distanceAt(progress.value);
    motion.update(distance, step);
    frames.push({
      t,
      dt: step,
      distance,
      speed: motion.speed,
      steer: motion.steer,
      roll: motion.roll,
      pitch: motion.pitch,
      heave: motion.heave,
      yaw: car.root.rotation.y,
      dist: car.last.dist,
    });
  }
  return { frames, motion, car, progress };
}

/** Bounds, continuity, ground clearance and the wheel contract over a recorded run. */
function checkRun(name, frames) {
  const worst = { roll: 0, pitch: 0, heave: 0, steer: 0 };
  const jump = { roll: 0, pitch: 0, heave: 0, steer: 0, speed: 0 };
  let headingJump = 0; // worst |heading change| beyond what the distance step allows (radians)
  let minClearance = Infinity;
  let slip = 0; // worst |tyre turn − distance / r| between frames, through the instance matrices
  let prevTops = null;
  for (let i = 0; i < frames.length; i++) {
    const f = frames[i];
    for (const k of Object.keys(worst)) worst[k] = Math.max(worst[k], Math.abs(f[k]));
    if (i) {
      for (const k of Object.keys(jump)) jump[k] = Math.max(jump[k], Math.abs(f[k] - frames[i - 1][k]));
      const allowed = MAX_TURN_PER_METRE * Math.abs(f.distance - frames[i - 1].distance) + 0.01;
      headingJump = Math.max(headingJump, Math.abs(wrap(f.yaw - frames[i - 1].yaw)) - allowed);
    }
    minClearance = Math.min(minClearance, clearance(f));
    const tops = tyreTops(f.dist, f.steer);
    if (prevTops) {
      const step = f.dist - frames[i - 1].dist;
      tops.forEach(
        (tyre, w) =>
          (slip = Math.max(slip, Math.abs(wrap(tyre.angle - prevTops[w].angle - step / wheels[w].r)))),
      );
    }
    prevTops = tops;
  }
  const bounded = Object.keys(worst).every((k) => worst[k] <= LIMIT[k]);
  check(
    `${name}: roll/pitch/heave/steer within limits`,
    bounded,
    Object.entries(worst)
      .map(([k, v]) => `${k} ${v.toFixed(4)}`)
      .join(', '),
  );
  const continuous = Object.keys(jump).every((k) => jump[k] <= MAX_STEP[k]) && headingJump <= 0;
  check(
    `${name}: continuous (max change per frame; heading follows the distance step)`,
    continuous,
    Object.entries(jump)
      .map(([k, v]) => `${k} ${v.toFixed(4)}`)
      .join(', ') + `, heading excess ${Math.max(0, headingJump).toFixed(4)}`,
  );
  check(
    `${name}: body clears the road by at least ${(CLEARANCE * 1000).toFixed(1)} mm`,
    minClearance >= CLEARANCE,
    `min ${(minClearance * 1000).toFixed(1)} mm (${(clearance({ pitch: 0, roll: 0, heave: 0 }) * 1000).toFixed(1)} at rest)`,
  );
  check(
    `${name}: tyres turn by exactly the distance step / r (instance matrices)`,
    slip < 1e-6,
    `worst slip ${slip.toExponential(1)} rad`,
  );
  return { worst, jump, minClearance };
}

const r = { F: layout.FL.r, R: layout.RL.r };
const ease = (a, b, t0, t1) => (t) => a + (b - a) * Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));

// 1. Slow lap section (on track, 0.43 → 0.55 over 40 s), random frame times
const slow = run({ target: ease(0.43, 0.55, 0.5, 40.5), duration: 42, dt: frameTimes(1) });
checkRun('slow scroll', slow.frames);
const maxSlowSpeed = Math.max(...slow.frames.map((f) => Math.abs(f.speed)));
check(
  'slow scroll: realistic speeds',
  maxSlowSpeed > 5 && maxSlowSpeed < 85,
  `max ${maxSlowSpeed.toFixed(1)} m/s`,
);

// 2. Very fast scroll (the whole lap in 0.8 s, then a flick back): clamped, nothing flips
const fast = run({
  target: (t) =>
    t < 0.8 ? 0.43 + (0.12 * t) / 0.8 : t < 1.6 ? 0.55 : t < 2 ? 0.55 - (0.1 * (t - 1.6)) / 0.4 : 0.45,
  duration: 5,
  dt: frameTimes(2),
});
checkRun('fast scroll', fast.frames);
check(
  'fast scroll: speed clamped',
  fast.frames.every((f) => Math.abs(f.speed) <= 85),
  `max ${Math.max(...fast.frames.map((f) => Math.abs(f.speed))).toFixed(1)} m/s`,
);

// 3. Stopped: after a fast run the body settles back to rest
const stop = run({ target: ease(0.43, 0.47, 0, 1), duration: 6, dt: frameTimes(3) });
checkRun('stop', stop.frames);
const end = stop.frames[stop.frames.length - 1];
check(
  'stop: body settles',
  Math.abs(end.roll) < 1e-4 &&
    Math.abs(end.pitch) < 1e-4 &&
    Math.abs(end.heave) < 1e-4 &&
    Math.abs(end.speed) < 0.01,
  `roll ${end.roll.toExponential(1)}, pitch ${end.pitch.toExponential(1)}, heave ${end.heave.toExponential(1)}, speed ${end.speed.toExponential(1)}`,
);

// 4. Reverse: the same corner forwards and backwards at the same speed
function constantSpeed(fromDistance, toDistance, speed, seed) {
  const car = mockCar();
  const motion = createCarMotion(car, sampler, fromDistance);
  const next = frameTimes(seed);
  const frames = [];
  let d = fromDistance;
  const sign = Math.sign(toDistance - fromDistance);
  for (let t = 0; sign * (toDistance - d) > 0;) {
    const dt = next();
    t += dt;
    const v = speed * Math.min(1, t / 2); // 2 s ramp
    d += sign * v * dt;
    motion.update(d, dt);
    frames.push({
      t,
      distance: d,
      speed: motion.speed,
      steer: motion.steer,
      roll: motion.roll,
      pitch: motion.pitch,
      heave: motion.heave,
      yaw: car.root.rotation.y,
      dist: car.last.dist,
    });
  }
  return frames;
}
// find the tightest corner of the lap section
let apex = landmarks.lapStart;
for (let d = landmarks.lapStart; d < landmarks.lapEnd; d += 2)
  if (Math.abs(sampler.curvatureAt(d)) > Math.abs(sampler.curvatureAt(apex))) apex = d;
const forward = constantSpeed(apex - 120, apex + 60, 18, 4);
const backward = constantSpeed(apex + 120, apex - 60, 18, 5);
checkRun('reverse', backward);
const nearApex = (frames) =>
  frames.reduce((a, b) => (Math.abs(b.distance - apex) < Math.abs(a.distance - apex) ? b : a));
const fa = nearApex(forward);
const ba = nearApex(backward);
check(
  'reverse: speed negative, body leans out of the same corner the same way',
  ba.speed < -17 && Math.sign(ba.roll) === Math.sign(fa.roll) && Math.abs(ba.roll - fa.roll) < 0.006,
  `kappa ${sampler.curvatureAt(apex).toFixed(3)}/m, roll forward ${fa.roll.toFixed(4)} reverse ${ba.roll.toFixed(4)}`,
);
check(
  'reverse: same steering direction for the same corner (bicycle model)',
  Math.sign(ba.steer) === Math.sign(fa.steer) && Math.abs(ba.steer - fa.steer) < 0.12,
  `steer forward ${fa.steer.toFixed(3)} reverse ${ba.steer.toFixed(3)}`,
);
// the front wheels point into the bend: the steer angle (about +y) has the sign of the change of the
// car's heading (root rotation.y, also about +y) a few metres ahead
const yawAt = (d) => {
  const t = sampler.sample(d).t;
  return Math.atan2(-t.z, t.x);
};
const yawAhead = (d) => wrap(yawAt(d + 4) - yawAt(d));
check(
  'steering: front wheels turn into the bend (sign of steer = sign of the heading change ahead)',
  Math.sign(fa.steer) === Math.sign(yawAhead(apex)) && Math.abs(fa.steer) > 0.05,
  `apex ${apex.toFixed(1)} m, kappa ${sampler.curvatureAt(apex).toFixed(4)}/m, heading change over 4 m ${yawAhead(apex).toFixed(3)} rad, steer ${fa.steer.toFixed(3)} rad`,
);
{
  // over the whole lap at 25 m/s: wherever the car is turning noticeably, the wheels turn the same way
  const lap = constantSpeed(landmarks.lapStart, landmarks.lapEnd, 25, 9);
  let turning = 0;
  let agree = 0;
  for (let i = 1; i < lap.length; i++) {
    const rate = wrap(lap[i].yaw - lap[i - 1].yaw) / (lap[i].distance - lap[i - 1].distance); // rad/m
    if (Math.abs(rate) < 0.01 || Math.abs(lap[i].steer) < 0.01) continue;
    turning++;
    if (Math.sign(lap[i].steer) === Math.sign(rate)) agree++;
  }
  check(
    'steering: the same direction as the turn over the lap',
    turning > 50 && agree / turning > 0.97,
    `${agree} of ${turning} turning frames agree`,
  );
  checkRun('lap at 25 m/s', lap);
}
const pitchWhile = (frames) => frames.find((f) => f.t > 0.8).pitch;
check(
  'reverse: pitch mirrors (accelerating forwards lifts the nose, backwards dips it)',
  pitchWhile(forward) > 0.002 && pitchWhile(backward) < -0.002,
  `forward ${pitchWhile(forward).toFixed(4)}, backward ${pitchWhile(backward).toFixed(4)}`,
);

// 5. Wheels: angle = distance / r for both radii, and back to the start after going there and back
{
  // through the instance matrices: each tyre's top moves forwards (along its own heading, steered or
  // not) by r·sin(d / r) after d metres, the bottom backwards (no slip against the road)
  let worst = 0;
  for (const d of [0.01, 0.37, -0.25, 1234.567, -987.65]) {
    for (const steer of [0, 0.3, -0.3]) {
      tyreTops(d, steer).forEach((tyre, w) => {
        const r = wheels[w].r;
        worst = Math.max(
          worst,
          Math.abs(tyre.along - r * Math.sin(d / r)),
          Math.abs(tyre.y - r * Math.cos(d / r)),
          Math.abs(wrap(tyre.angle - d / r)),
        );
      });
    }
  }
  check(
    'wheels: every tyre (left and right, steered) rolls forwards by distance / r',
    worst < 1e-9,
    `worst ${worst.toExponential(1)}`,
  );
}
const there = run({ target: ease(0.43, 0.5, 0, 3), duration: 4, dt: frameTimes(6) });
const back = run({
  target: ease(0.5, 0.43, 0, 3),
  duration: 6,
  dt: frameTimes(7),
  motion: there.motion,
  car: there.car,
  progress: there.progress,
});
const startDist = distanceAt(0.43); // where the car stood before the first frame
const endDist = back.frames[back.frames.length - 1].dist;
const travelled = Math.max(...there.frames.map((f) => f.dist)) - startDist;
const turned = (d0, d1, radius) => rollAngle(d1, radius, false) - rollAngle(d0, radius, false);
check(
  'wheels: angle = distance / r (front 0.40656, rear 0.41361), signed, no drift there and back',
  rollAngle(1, r.F, false) === -1 / r.F &&
    rollAngle(1, r.R, true) === 1 / r.R &&
    Math.abs(turned(startDist, startDist + travelled, r.F) + travelled / r.F) < 1e-9 &&
    Math.abs(turned(startDist, endDist, r.R) + (endDist - startDist) / r.R) < 1e-9 &&
    Math.abs(endDist - startDist) < 1e-3,
  `${travelled.toFixed(1)} m there: front ${(travelled / r.F).toFixed(2)} rad, rear ${(travelled / r.R).toFixed(2)} rad; back at ${(endDist - startDist).toExponential(1)} m from the start`,
);

// 5b. Scroll gestures that drive the body hardest: the whole journey in 20 s and in 6 s, a flick on
// the lap and back, and the lap in 4 s (each frame is checked for bounds, continuity and clearance)
{
  const full20 = run({ target: ease(0, 1, 0.5, 20.5), startProgress: 0, duration: 23, dt: frameTimes(10) });
  checkRun('full scroll in 20 s', full20.frames);
  const full6 = run({ target: ease(0, 1, 0.5, 6.5), startProgress: 0, duration: 9, dt: frameTimes(11) });
  checkRun('full scroll in 6 s', full6.frames);
  const flick = run({
    target: (t) => (t < 0.3 ? 0.43 + (0.07 * t) / 0.3 : t < 0.6 ? 0.5 - (0.07 * (t - 0.3)) / 0.3 : 0.43),
    startProgress: 0.43,
    duration: 4,
    dt: frameTimes(12),
  });
  checkRun('flick 0.43 → 0.5 → 0.43', flick.frames);
  const lap4 = run({
    target: ease(0.425, 0.56, 0.2, 4.2),
    startProgress: 0.425,
    duration: 6,
    dt: frameTimes(13),
  });
  checkRun('lap in 4 s', lap4.frames);
}

// 6. Jump: a teleport mid-run is not speed, and the next frames stay calm
{
  const car = mockCar();
  const motion = createCarMotion(car, sampler, distanceAt(0.43));
  const progress = createProgress();
  progress.finishIntro();
  progress.value = progress.target = 0.43;
  const pre = run({ target: ease(0.43, 0.5, 0, 2), duration: 2, dt: 1 / 60, motion, car, progress });
  // home.js / stage buttons: scene.jump(0.7) → journey.js sets lastDistance and progress
  progress.target = progress.value = 0.7;
  progress.velocity = 0;
  motion.lastDistance = distanceAt(0.7);
  const after = run({ target: () => 0.7, duration: 1, dt: frameTimes(8), motion, car, progress });
  const peak = Math.max(...after.frames.map((f) => Math.abs(f.speed)));
  check(
    'jump: no speed spike after a teleport',
    Math.abs(after.frames[0].speed) === 0 && peak < 0.5,
    `speed before ${pre.frames[pre.frames.length - 1].speed.toFixed(1)} m/s, after ${after.frames[0].speed}, peak ${peak.toFixed(3)}`,
  );
  checkRun('after jump', after.frames);
}

// 7. renderAt(t, { dt: 0 }): the car at rest, whatever happened before
{
  const a = mockCar();
  const b = mockCar();
  const ma = createCarMotion(a, sampler, distanceAt(0.2));
  const mb = createCarMotion(b, sampler, distanceAt(0.5));
  run({ target: ease(0.43, 0.55, 0, 3), duration: 3, dt: 1 / 60, motion: ma, car: a });
  const d = distanceAt(0.5);
  ma.lastDistance = d; // what renderAt does for dt 0
  ma.update(d, 0);
  mb.update(d, 0);
  const same = JSON.stringify(a.last) === JSON.stringify(b.last);
  check(
    'renderAt dt 0: at rest and independent of history',
    same && a.last.roll === 0 && a.last.pitch === 0 && a.last.heave === 0 && a.last.speed === 0,
    JSON.stringify(a.last),
  );
}

// 8. Frame-rate independence: the same scroll at 30 and 120 fps
{
  const script = (t) => (t < 1 ? 0.43 : t < 5 ? 0.43 + (0.05 * (t - 1)) / 4 : 0.48);
  const at30 = run({ target: script, duration: 6, dt: 1 / 30 });
  const at120 = run({ target: script, duration: 6, dt: 1 / 120 });
  const worst = { speed: 0, steer: 0, roll: 0, pitch: 0, heave: 0, distance: 0 };
  for (const f of at30.frames) {
    const g = at120.frames.reduce((p, q) => (Math.abs(q.t - f.t) < Math.abs(p.t - f.t) ? q : p));
    if (Math.abs(g.t - f.t) > 1e-6) continue;
    for (const k of Object.keys(worst)) worst[k] = Math.max(worst[k], Math.abs(f[k] - g[k]));
  }
  check(
    '30 vs 120 fps: same pose within tolerance',
    worst.steer < 0.01 &&
      worst.roll < 0.003 &&
      worst.pitch < 0.003 &&
      worst.heave < 0.0015 &&
      worst.speed < 1.5,
    Object.entries(worst)
      .map(([k, v]) => `${k} ${v.toFixed(4)}`)
      .join(', '),
  );
}

console.log(failures ? `\n${failures} check(s) failed` : '\nall car-motion checks passed');
process.exit(failures ? 1 : 0);
