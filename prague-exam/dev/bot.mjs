// A careful test driver. It follows the examiner's plan and obeys the rules through the same
// controls a player has, so a full exam can be run headless:
//
//   node dev/bot.mjs [placeId] [seed] [minutes] [density]
//
// A clean run should pass. Faults it collects point either at a bug in the examiner (a rule
// judged wrongly) or at a weakness of the bot; the log says where each happened.
import { readSection } from '../tools/lib/packio.mjs';
import { RoadNet, CTRL, SIG } from '../src/js/sim/roadnet.js';
import { createTraffic } from '../src/js/sim/traffic.js';
import { createVehicle, stepVehicle, applyAction } from '../src/js/sim/vehicle.js';
import { createLocator } from '../src/js/sim/locate.js';
import { createStatics } from '../src/js/sim/statics.js';
import { createExam } from '../src/js/sim/exam.js';
import { MINOR_LIMIT, LAWBOOK } from '../src/js/sim/lawbook.js';
import { headingOf, angDiff } from '../src/js/data/geo.js';

let net = null, statics = null;
export function world() {
  if (!net) { net = new RoadNet(readSection('graph')); statics = createStatics(readSection('buildings')); }
  return { net, statics };
}

export function runExam({ placeId = null, seed = 1, minutes = 10, density = 'normal', log = false, rules = {}, trace = null } = {}) {
  world();
  const traffic = createTraffic({ net, seed, density });
  const severities = Object.fromEntries(Object.entries(LAWBOOK).map(([k, v]) => [k, v.severity]));
  const exam = createExam({ net, statics, traffic, seed, mode: 'exam', duration: minutes * 60, placeId, minorLimit: MINOR_LIMIT, severities });
  const car = createVehicle(exam.start);
  const locator = createLocator(net), loc = locator.loc;
  const input = { steer: 0, throttle: 0, brake: 0, lookYaw: 0, lookPitch: 0 };
  exam.__traffic = traffic; exam.__loc = loc;
  const AP = traffic.AP();
  const dt = 1 / 60;
  let t = 0, stopped = new Set(), stopT = 0, laneWant = -1, laneSince = 0, readyAt = 1.2, moveOffAt = -1;
  const set = (name, on) => { if (on) applyAction(car, name); };

  const laneFor = (step, next) => {
    const n = Math.max(1, net.lanes(step.e, step.dir));
    if (n === 1) return 0;
    const turn = next ? next.turn : 'straight';
    const masks = net.turnLanes[step.e] ? net.turnLanes[step.e][step.dir > 0 ? 0 : 1] : null;
    if (masks) { const bit = turn === 'left' ? 1 : turn === 'right' ? 4 : 2; const ok = []; masks.forEach((m, i) => { if (!m || m & bit) ok.push(i); }); if (ok.length) return turn === 'left' ? ok[0] : ok[ok.length - 1]; }
    return turn === 'left' ? 0 : n - 1;
  };

  // Points ahead along the planned lane centres, 2 m apart.
  function pathAhead(reach, lane0, kerb) {
    const pts = [], full = exam.plan;
    // Inside a junction the car may already be on the next edge of the plan.
    const k = Math.max(0, full.findIndex((p) => p.e === loc.e && p.dir === loc.dir));
    const P = full.slice(k);
    let left = reach, lane = lane0;
    const q = {};
    for (let i = 0; i < P.length && left > 0; i++) {
      const st = P[i], end = st.dir > 0 ? 1 : 0, node = net.nodeOf(st.e, end), next = P[i + 1];
      const junction = net.isJunction(node) && next;
      const s0 = i === 0 && st.e === loc.e ? loc.s : (st.dir > 0 ? (net.isJunction(net.nodeOf(st.e, 0)) ? net.trim[st.e * 2] : 0) : net.len[st.e] - (net.isJunction(net.nodeOf(st.e, 1)) ? net.trim[st.e * 2 + 1] : 0));
      const s1 = st.dir > 0 ? net.len[st.e] - (junction ? net.trim[st.e * 2 + 1] : 0) : (junction ? net.trim[st.e * 2] : 0);
      const span = (s1 - s0) * st.dir;
      for (let d = i === 0 ? 2 : 0; d <= span && left > 0; d += 2, left -= 2) {
        net.lanePos(st.e, st.dir, lane, s0 + d * st.dir, q);
        if (kerb && i === 0) { const p = net.pos(st.e, s0 + d * st.dir); const off = (net.width[st.e] / 2 - 1.2) * st.dir; pts.push({ x: p.x - p.dz * off, z: p.z + p.dx * off }); } else pts.push({ x: q.x, z: q.z });
      }
      if (!next) break;
      const nOut = Math.max(1, net.lanes(next.e, next.dir));
      const laneOut = next.turn === 'left' ? 0 : next.turn === 'right' ? nOut - 1 : Math.min(nOut - 1, Math.max(0, nOut - (net.lanes(st.e, st.dir) - lane)));
      if (junction) {
        const k = net.connector({ e: st.e, end, out: next.e }, lane, laneOut);
        for (let j = 1; j <= 8 && left > 0; j++) { const u = j / 8, w = 1 - u; pts.push({ x: w * w * k.x0 + 2 * w * u * k.cx + u * u * k.x1, z: w * w * k.z0 + 2 * w * u * k.cz + u * u * k.z1 }); left -= 1.5; }
      }
      lane = junction ? laneOut : Math.min(nOut - 1, lane);
    }
    return pts;
  }

  function control() {
    input.throttle = 0; input.brake = 0; input.lookYaw = 0;
    const v = car.speed, key = exam.instruction ? exam.instruction.key : '';
    // Getting ready and pulling away from the kerb.
    if (exam.state === 'predrive' || key === 'continue') {
      if (moveOffAt < 0) moveOffAt = t + readyAt;
      if (!car.belt) applyAction(car, 'belt');
      if (!car.engineOn) applyAction(car, 'engine');
      if (car.lights === 'off') applyAction(car, 'lights');
      if (car.gear !== 'D') applyAction(car, 'gearD');
      if (car.handbrake) applyAction(car, 'handbrake');
      if (car.indicator !== 'left') applyAction(car, 'indicatorLeft');
      input.lookYaw = -1;
      let clear = t > moveOffAt;
      const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
      for (const c of [...traffic.cars, ...traffic.trams]) { const rx = c.x - car.x, rz = c.z - car.z, f = rx * fx + rz * fz, l = rx * -fz + rz * fx; if (f < 4 && f > -70 && l < 1 && l > -6 && Math.abs(angDiff(c.h, car.heading)) < 0.7 && c.v > 1) clear = false; }
      if (!clear) { input.brake = 0.6; input.steer = 0; return; }
    } else moveOffAt = -1;
    const P = exam.plan;
    if (!P.length) { if (exam.state === 'predrive') { input.throttle = 0.4; input.steer = 0; } else input.brake = 0.5; return; }
    const here = P[0], next = P[1];
    if (!next && loc.rem < 30) { input.brake = 0.6; return; }             // dead end: the bot cannot turn round
    const kerb = key === 'pullOver' || key === 'finish';

    // Lane and indicators.
    const want = laneFor(here, next);
    let lane = Math.min(loc.lanes - 1, loc.lane);
    let wantInd = 'off';
    if (loc.lanes > 1 && want !== loc.lane && loc.junction < 0) {
      wantInd = want > loc.lane ? 'right' : 'left';
      if (laneWant !== want) { laneWant = want; laneSince = t; }
      if (t - laneSince > 1.3) lane = want;
    } else { laneWant = -1; lane = loc.junction < 0 ? loc.lane : want; }
    const node = loc.node, isJ = net.isJunction(node) && next;
    const dEntry = loc.rem - net.trim[loc.e * 2 + loc.end] - car.length / 2;
    if (isJ && loc.junction < 0) {
      const roundOut = net.roundabout(here.e) && !net.roundabout(next.e);
      const roundIn = !net.roundabout(here.e) && net.roundabout(next.e);
      const sameRoad = Math.abs(next.angle) < 0.85 && net.name(here.e) && net.name(here.e) === net.name(next.e) && net.turnsFrom(here.e, here.dir).filter((o) => net.rank[o.e] >= 2).length === 1;
      if (roundOut && dEntry < 14) wantInd = 'right';
      else if (!roundIn && !net.roundabout(here.e) && !sameRoad && (next.turn === 'left' || next.turn === 'right') && dEntry < 45) wantInd = next.turn;
    }
    if (kerb) wantInd = 'right';
    if (loc.junction >= 0) wantInd = car.indicator;                       // leave it to self-cancel
    if (wantInd !== car.indicator && car.indicator !== 'hazard') {
      if (wantInd === 'left') applyAction(car, 'indicatorLeft'); else if (wantInd === 'right') applyAction(car, 'indicatorRight');
      else if (car.indicator === 'left') applyAction(car, 'indicatorLeft'); else if (car.indicator === 'right') applyAction(car, 'indicatorRight');
    }

    // Steering: pure pursuit.
    const pts = pathAhead(26, lane, kerb);
    const Ld = Math.max(3.2, Math.min(14, 2.4 + Math.abs(v) * 0.85));
    let tgt = pts[pts.length - 1] || { x: car.x + Math.sin(car.heading) * 5, z: car.z - Math.cos(car.heading) * 5 };
    for (const p of pts) if (Math.hypot(p.x - car.x, p.z - car.z) >= Ld) { tgt = p; break; }
    const alpha = angDiff(headingOf(tgt.x - car.x, tgt.z - car.z), car.heading);
    const delta = Math.atan((2 * car.wheelbase * Math.sin(alpha)) / Math.max(2, Math.hypot(tgt.x - car.x, tgt.z - car.z)));
    const lim = Math.min(0.6, Math.atan((5.2 * car.wheelbase) / Math.max(1, v * v)));
    input.steer = Math.max(-1, Math.min(1, delta / lim));

    // Speed.
    const plan = (d, vEnd = 0, b = 2.2) => Math.sqrt(vEnd * vEnd + 2 * b * Math.max(0, d));
    let target = Math.max(3, (net.speedKmh[loc.e] - 5) / 3.6);
    if (pts.length > 6) {                                                  // bends ahead
      const h0 = headingOf(pts[2].x - pts[0].x, pts[2].z - pts[0].z), h1 = headingOf(pts[pts.length - 1].x - pts[pts.length - 3].x, pts[pts.length - 1].z - pts[pts.length - 3].z);
      const bend = Math.abs(angDiff(h1, h0));
      if (bend > 0.35) target = Math.min(target, Math.max(4, 11 - bend * 5));
    }
    if (isJ && loc.junction < 0) {
      const c = net.ctrl[loc.e * 2 + loc.end];
      if (next.turn !== 'straight') target = Math.min(target, plan(dEntry, next.turn === 'right' ? 3.0 : 3.8, 1.8));
      if (c === CTRL.EQUAL) target = Math.min(target, plan(dEntry, 5));
      if (c === CTRL.GIVE_WAY || c === CTRL.EXIT) target = Math.min(target, plan(dEntry, 3.5));
    }
    if (loc.junction >= 0) target = Math.min(target, next && next.turn !== 'straight' ? (next.turn === 'right' ? 3.2 : 4.0) : target);
    if (next) target = Math.min(target, plan(loc.rem, Math.max(3, (net.speedKmh[next.e] - 5) / 3.6), 1.5));
    for (const r of net.railsOn(loc.e)) { const d = (loc.dir > 0 ? r.s - loc.s : loc.s - r.s); if (d > -3 && d < 60) target = Math.min(target, plan(d - 6, 7.5)); }
    let stopD = Infinity;
    const front = car.length / 2;
    const linesAhead = net.linesOn(loc.e, loc.dir).map((l) => ({ l, d: (loc.dir > 0 ? l.s - loc.s : loc.s - l.s) - front }));
    if (next && loc.rem < 70) for (const l of net.linesOn(next.e, next.dir)) linesAhead.push({ l, d: loc.rem + (next.dir > 0 ? l.s : net.len[next.e] - l.s) - front });
    for (const { l, d } of linesAhead) {
      if (d < -0.5 || d > 90) continue;
      if (l.kind === CTRL.SIGNAL) {
        const st = net.signalState(l.ctrlId, l.phase, t);
        if (st === SIG.GREEN) continue;
        if (st === SIG.AMBER && d < v * 0.9 + (v * v) / (2 * 3.8)) continue;
        stopD = Math.min(stopD, d - 1);
      } else if (l.kind === CTRL.STOP && !stopped.has(l.id)) {
        stopD = Math.min(stopD, d - 0.8);
        if (v < 0.1 && d < 3) { stopT += dt; if (stopT > 0.7) { stopped.add(l.id); stopT = 0; } }
      }
    }
    if (isJ && loc.junction < 0 && dEntry < 40 && !rules.ignorePriority) {
      const M = { e: loc.e, end: loc.end, out: next.e };
      const dLine = loc.rem - Math.max(net.trim[loc.e * 2 + loc.end], net.lineD[loc.e * 2 + loc.end]) - front;
      for (const c of traffic.cars) {
        if (Math.abs(c.x - car.x) > 90 || Math.abs(c.z - car.z) > 90) continue;
        traffic.approach(c, node, null, AP);
        if (!AP.n || AP.t > 5.5 || AP.stopped) continue;
        if (net.conflict(M, AP.M[0]) && (AP.t === 0 || net.mustYield(M, AP.M[0], t))) { stopD = Math.min(stopD, dLine - 0.6); break; }
      }
      for (const tr of traffic.trams) if (Math.hypot(tr.x - net.nodeX[node], tr.z - net.nodeZ[node]) < 45 && tr.v > 0.5) stopD = Math.min(stopD, dLine - 0.6);
    }
    const crossAhead = net.crossingsOn(loc.e).map((x) => ({ x, d: (loc.dir > 0 ? x.s - loc.s : loc.s - x.s) - front }));
    if (next && loc.rem < 45) for (const x of net.crossingsOn(next.e)) crossAhead.push({ x, d: loc.rem + (next.dir > 0 ? x.s : net.len[next.e] - x.s) - front });
    if (!rules.ignorePedestrians) for (const { x, d } of crossAhead) {
      if (d < 0 || d > 55) continue;
      for (const p of traffic.peds) if (p.c === x.id && (p.state === 'cross' || (p.state === 'wait' && !x.signal) || (p.state === 'approach' && !x.signal && p.q > -p.kerb - 2.5))) stopD = Math.min(stopD, d - 3);
    }
    const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
    const lead = (m, len, wid) => { const rx = m.x - car.x, rz = m.z - car.z, f = rx * fx + rz * fz, l = Math.abs(rx * -fz + rz * fx); const rel = Math.abs(angDiff(m.h, car.heading)); const half = Math.max(wid / 2, (len / 2) * Math.abs(Math.sin(rel))); if (f < 1 || f > 60 || l > 1.2 + half) return; if (rel > 2.2 && l > 1.0) return; const gap = f - front - len / 2; target = Math.min(target, gap < 3.5 ? 0 : plan(gap - 3.5, rel < 0.9 ? m.v * 0.9 : 0)); };
    for (const c of traffic.cars) lead(c, c.len, c.wid);
    for (const tr of traffic.trams) for (const b of tr.bodies) lead(b, b.len, b.wid);
    for (const p of traffic.peds) if (p.state === 'cross') lead({ x: p.x, z: p.z, h: car.heading + Math.PI / 2, v: 0 }, 1, 1);
    if (kerb) { const offR = loc.dir > 0 ? loc.d : -loc.d; const gap = net.width[loc.e] / 2 - offR - car.width / 2; target = Math.min(target, gap < 0.55 ? 0 : 3); }
    if (stopD < Infinity) target = Math.min(target, stopD < 0.3 ? 0 : plan(stopD));
    if (rules.speed) target = Math.max(target, rules.speed);

    const err = target - v;
    if (target < 0.2 && v < 0.6) input.brake = 0.6;
    else if (err > 0.25) input.throttle = Math.min(0.8, 0.2 + err * 0.22);
    else if (err < -0.25) input.brake = Math.min(0.72, 0.1 - err * 0.22);
  }

  for (let i = 0; i < (minutes * 60 + 240) * 60; i++) {
    locator.update(car);
    control();
    stepVehicle(car, input, dt);
    locator.update(car);
    traffic.step(dt, t, car, loc);
    exam.step(dt, t, car, loc, input);
    for (const f of exam.takeFaults()) if (log) console.log(`  ${String(f.t).padStart(4)} s  ${f.severity.padEnd(7)} ${f.code.padEnd(24)} ${f.street} ${f.note}  [x ${f.x.toFixed(0)} z ${f.z.toFixed(0)} ${f.speed} km/h, edge ${loc.e}, node ${loc.node}]`);
    if (trace) trace({ t, car, loc, exam, input, i });
    if (exam.result) break;
    t += dt;
  }
  return { result: exam.result, exam, car };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [placeId, seed, minutes, density] = process.argv.slice(2);
  const t0 = performance.now();
  const { result, exam } = runExam({ placeId: placeId || null, seed: Number(seed) || 1, minutes: Number(minutes) || 10, density: density || 'normal', log: true });
  if (!result) console.log('no result: the exam never finished', exam.state, exam.info);
  else console.log(`${result.passed ? 'PASSED' : `FAILED: ${result.reason.code} ${result.reason.note}`}  ${result.stats.distance} m in ${result.stats.duration} s, avg ${result.stats.avgSpeed} km/h, junctions ${result.stats.junctions}, minor ${result.stats.minor}  (${(performance.now() - t0).toFixed(0)} ms)`);
}
