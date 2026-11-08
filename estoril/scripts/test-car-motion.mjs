// Checks the hero car's kinematics (src/journey/car-motion.js) on the real car path and schedule.
// node scripts/test-car-motion.mjs        (exit code 1 on any failure)
//
// Scroll scripts drive the page's progress spring (progress.js) like journey.js does, at random
// frame times of 8–50 ms, and every frame's pose is checked: continuity (no jumps beyond the limits
// below), bounded roll/pitch/heave/steer, wheels at exactly distance / radius, settling when
// stopped, mirrored dynamics in reverse, teleports (jump / renderAt dt 0) without speed, and the
// same pose at 30 and 120 frames per second.
import { readFileSync } from 'node:fs';
import { buildCarPath } from '../src/journey/car-path.js';
import {
  carScheduleKeys,
  computeLandmarks,
  createCarMotion,
  createCarSchedule,
  createPathSampler,
} from '../src/journey/car-motion.js';
import { createProgress } from '../src/journey/progress.js';
import { rollAngle } from '../src/journey/car/wheel.js';
import { Vector3 } from 'three';

const root = new URL('..', import.meta.url).pathname;
const track = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;
const layout = JSON.parse(readFileSync(root + 'site/assets/models/hero-car.json', 'utf8'));
const path = buildCarPath(track);
const sampler = createPathSampler(path);
const landmarks = computeLandmarks(path, track);
const distanceAt = createCarSchedule(carScheduleKeys(landmarks));

// limits (the module's clamps, plus a hair for float noise) and per-frame continuity thresholds
const LIMIT = { roll: 0.045 + 1e-9, pitch: 0.03 + 1e-9, heave: 0.012 + 1e-9, steer: 0.5 + 1e-9 };
const MAX_STEP = { roll: 0.012, pitch: 0.012, heave: 0.004, steer: 0.1, speed: 2.5 };

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
    last: null,
    pose(state) {
      this.last = { ...state };
    },
  };
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
      dist: car.last.dist,
    });
  }
  return { frames, motion, car, progress };
}

/** Bounds, continuity and the wheel contract over a recorded run. */
function checkRun(name, frames) {
  const worst = { roll: 0, pitch: 0, heave: 0, steer: 0 };
  const jump = { roll: 0, pitch: 0, heave: 0, steer: 0, speed: 0 };
  let wheelsExact = true;
  for (let i = 0; i < frames.length; i++) {
    const f = frames[i];
    for (const k of Object.keys(worst)) worst[k] = Math.max(worst[k], Math.abs(f[k]));
    if (i) for (const k of Object.keys(jump)) jump[k] = Math.max(jump[k], Math.abs(f[k] - frames[i - 1][k]));
    if (f.dist !== f.distance) wheelsExact = false;
  }
  const bounded = Object.keys(worst).every((k) => worst[k] <= LIMIT[k]);
  check(
    `${name}: roll/pitch/heave/steer within limits`,
    bounded,
    Object.entries(worst)
      .map(([k, v]) => `${k} ${v.toFixed(4)}`)
      .join(', '),
  );
  const continuous = Object.keys(jump).every((k) => jump[k] <= MAX_STEP[k]);
  check(
    `${name}: continuous (max change per frame)`,
    continuous,
    Object.entries(jump)
      .map(([k, v]) => `${k} ${v.toFixed(4)}`)
      .join(', '),
  );
  check(`${name}: wheels driven by the exact path distance`, wheelsExact);
  return { worst, jump };
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
const pitchWhile = (frames) => frames.find((f) => f.t > 0.8).pitch;
check(
  'reverse: pitch mirrors (accelerating forwards lifts the nose, backwards dips it)',
  pitchWhile(forward) > 0.002 && pitchWhile(backward) < -0.002,
  `forward ${pitchWhile(forward).toFixed(4)}, backward ${pitchWhile(backward).toFixed(4)}`,
);

// 5. Wheels: angle = distance / r for both radii, and back to the start after going there and back
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
