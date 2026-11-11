// Simulation checks that run without a browser: the road data loads, traffic behaves, and the
// examiner passes a careful driver and fails a careless one.
import test from 'node:test';
import assert from 'node:assert/strict';
import { runExam, world } from '../dev/bot.mjs';
import { createTraffic } from '../src/js/sim/traffic.js';
import { createVehicle } from '../src/js/sim/vehicle.js';
import { createLocator } from '../src/js/sim/locate.js';
import { CTRL, SIG } from '../src/js/sim/roadnet.js';

const { net } = world();

test('road network has the expected shape', () => {
  assert.ok(net.E > 10000 && net.N > 8000);
  assert.ok(net.places.length >= 10);
  assert.ok(net.controllers.length > 100);
  assert.ok(net.lines.some((l) => l.kind === CTRL.SIGNAL) && net.lines.some((l) => l.kind === CTRL.STOP));
});

test('a signal phase cycles red, red+amber, green, amber and the two phases never show green together', () => {
  const seen = new Set();
  for (let t = 0; t < 200; t += 0.5) {
    const a = net.signalState(0, 0, t), b = net.signalState(0, 1, t);
    seen.add(a);
    assert.ok(!(a === SIG.GREEN && b === SIG.GREEN), `both green at ${t}`);
    assert.ok(!(a === SIG.GREEN && b === SIG.AMBER) && !(a === SIG.AMBER && b === SIG.GREEN), `green against amber at ${t}`);
  }
  assert.equal(seen.size, 4);
});

test('priority: a give-way arm yields to the main road, and a left turn yields to oncoming traffic', () => {
  let checked = 0;
  for (let n = 0; n < net.N && checked < 50; n++) {
    const arms = net.arms[n];
    if (arms.length !== 4) continue;
    const minor = arms.find((a) => net.ctrl[a.e * 2 + a.end] === CTRL.GIVE_WAY && net.canArrive(a.e, a.end));
    const main = arms.filter((a) => net.ctrl[a.e * 2 + a.end] === CTRL.PRIORITY && net.canArrive(a.e, a.end));
    if (!minor || main.length !== 2) continue;
    const outOf = (arm) => arms.find((a) => a !== arm && net.canLeave(a.e, a.end));
    const A = { e: minor.e, end: minor.end, out: outOf(minor).e }, B = { e: main[0].e, end: main[0].end, out: main[1].e };
    assert.equal(net.mustYield(A, B, 0), true);
    assert.equal(net.mustYield(B, A, 0), false);
    // Two main-road vehicles facing each other: the one turning left gives way.
    const left = net.turnsFrom(main[0].e, main[0].end ? 1 : -1).find((o) => o.turn === 'left');
    const straight = net.turnsFrom(main[1].e, main[1].end ? 1 : -1).find((o) => o.turn === 'straight');
    const facing = Math.abs(Math.atan2(Math.sin(main[0].h - main[1].h - Math.PI), Math.cos(main[0].h - main[1].h - Math.PI))) < 0.4;
    if (left && straight && facing) {
      const L = { e: main[0].e, end: main[0].end, out: left.e }, S = { e: main[1].e, end: main[1].end, out: straight.e };
      assert.equal(net.mustYield(L, S, 0), true);
      assert.equal(net.mustYield(S, L, 0), false);
    }
    checked++;
  }
  assert.ok(checked > 10);
});

test('traffic keeps moving and stays finite', () => {
  const place = net.places[0], p = net.lanePos(place.edge, 1, 0, place.s);
  const car = createVehicle({ x: p.x + 60, z: p.z + 3, heading: p.h });
  const locator = createLocator(net);
  locator.update(car);
  const traffic = createTraffic({ net, seed: 7, density: 'busy' });
  let moving = 0, samples = 0;
  for (let i = 0; i < 60 * 120; i++) {
    traffic.step(1 / 60, i / 60, car, locator.loc);
    if (i % 60 === 0) for (const c of traffic.cars) { samples++; if (c.v > 1) moving++; assert.ok(Number.isFinite(c.x) && Number.isFinite(c.z)); }
  }
  assert.ok(traffic.cars.length > 10);
  assert.ok(moving / samples > 0.6, `only ${(100 * moving / samples).toFixed(0)}% of cars moving`);
});

test('a careful driver passes the exam', () => {
  const { result } = runExam({ placeId: 'z-elivske-ho', seed: 1, minutes: 8 });
  assert.ok(result, 'the exam finished');
  assert.equal(result.passed, true, result.reason ? `${result.reason.code} ${result.reason.note}` : '');
  assert.ok(result.stats.distance > 1500);
});

test('a driver who speeds is failed for speeding, with the place and the limit', () => {
  const { result } = runExam({ placeId: 'z-elivske-ho', seed: 1, minutes: 8, rules: { speed: 22 } });
  assert.equal(result.passed, false);
  assert.equal(result.reason.code, 'SPEEDING_MAJOR');
  assert.ok(result.reason.street.length > 0 && result.reason.limit >= 20);
});
