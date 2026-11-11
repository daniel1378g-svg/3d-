// The examiner: plans the route, gives directions, watches the driving and writes the result.
//
// Serious faults end the exam at once, as when the instructor has to step in. Minor faults are
// logged and fail the exam when they reach the limit. In free-drive mode nothing ends the drive.
import { CTRL, SIG, FLAG } from './roadnet.js';
import { makeRng } from './rng.js';
import { footprint } from './vehicle.js';
import { headingOf, angDiff, HALF } from '../data/geo.js';

const KMH = 3.6;
const COOLDOWN = { SPEEDING_MINOR: 25, TOO_SLOW: 60, HESITATION: 40, LANE_POSITION: 30, NO_SIGNAL_LANE_CHANGE: 15, BLOCKED_CROSSING: 30, HARSH_BRAKING: 20, SIGNAL_LEFT_ON: 60, HANDBRAKE_ON: 60, STOP_LINE_OVERRUN: 10 };

export function createExam({ net, statics, traffic, seed = 1, mode = 'exam', duration = 1200, placeId = null, minorLimit = 6, severities = {} }) {
  const rng = makeRng(seed).fork('exam');
  const place = net.places.find((p) => p.id === placeId) || net.places[0];
  const serious = (code) => (severities[code] || DEFAULT_SEVERITY[code] || 'minor') === 'serious';

  // ---- start pose: parked at the right-hand kerb -------------------------------------------------
  const start = { x: 0, z: 0, heading: 0 };
  function setStart() {
    // The mapped place may sit in a dead-end pocket: start on the nearest street that leads on.
    let e = place.edge, dir = place.dir, s = place.s;
    if (!roomy(e, dir)) {
      if (!net.oneway(e) && roomy(e, -dir)) dir = -dir;
      else {
        const p0 = net.pos(place.edge, place.s);
        let bestD = 900;
        for (let c = 0; c < net.E; c++) {
          if (net.rank[c] < 2 || net.rank[c] > 3 || net.oneway(c) || net.len[c] < 70 || net.speedKmh[c] > 50 || net.flags[c] & (FLAG.LIMITED | FLAG.BRIDGE | FLAG.TUNNEL | FLAG.NARROW)) continue;
          const m = net.pos(c, net.len[c] * 0.35), d = Math.hypot(m.x - p0.x, m.z - p0.z);
          if (d >= bestD) continue;
          const cd = roomy(c, 1) ? 1 : roomy(c, -1) ? -1 : 0;
          if (cd) { bestD = d; e = c; dir = cd; s = net.len[c] * (cd > 0 ? 0.35 : 0.65); }
        }
      }
    }
    const p = net.pos(e, s);
    const off = net.width[e] / 2 - 0.9 - 0.35;                          // car's right side 35 cm from the kerb
    start.x = p.x - p.dz * off * dir; start.z = p.z + p.dx * off * dir; start.heading = headingOf(p.dx * dir, p.dz * dir);
  }

  const ex = {
    mode, seed, place, start, state: 'predrive', t: 0, elapsed: 0,
    faults: [], fresh: [], result: null,
    instruction: null, checklist: [],
    info: { limit: 50, street: '', minor: 0, minorLimit, elapsed: 0, remaining: duration, mode },
    plan: [],
  };
  const path = [];
  const stats = { distance: 0, maxSpeed: 0, junctions: 0, stopsAtSigns: 0 };
  const last = {};                                                     // last time each fault code fired
  let car = null, loc = null;

  // ---- faults -------------------------------------------------------------------------------------
  function fault(code, note = '') {
    if (ex.state === 'done') return;
    const cd = COOLDOWN[code];
    if (cd && last[code] !== undefined && ex.t - last[code] < cd) return;
    last[code] = ex.t;
    const f = {
      code, severity: serious(code) ? 'serious' : 'minor', t: Math.round(ex.elapsed), x: car.x, z: car.z,
      street: loc && loc.e >= 0 ? net.name(loc.e) || 'unnamed road' : '', speed: Math.round(Math.abs(car.speed) * KMH), limit: ex.info.limit, note,
    };
    ex.faults.push(f); ex.fresh.push(f);
    if (f.severity === 'minor') ex.info.minor++;
    if (mode !== 'exam') return;
    if (f.severity === 'serious') finish(f);
    else if (ex.info.minor >= minorLimit) finish({ ...f, code: 'TOO_MANY_MINOR', severity: 'serious', note: `${ex.info.minor} minor faults` });
  }
  function finish(reason) {
    if (ex.state === 'done') return;
    ex.state = 'done';
    const minor = ex.faults.filter((f) => f.severity === 'minor').length;
    ex.result = {
      passed: !reason, mode, reason: reason || null, faults: ex.faults.slice(),
      stats: { duration: Math.round(ex.elapsed), distance: Math.round(stats.distance), avgSpeed: ex.elapsed > 1 ? Math.round((stats.distance / ex.elapsed) * KMH) : 0, maxSpeed: Math.round(stats.maxSpeed * KMH), junctions: stats.junctions, stopsAtSigns: stats.stopsAtSigns, minor, serious: ex.faults.length - minor },
      path: Float32Array.from(path), seed, startId: place.id,
    };
    ex.instruction = { key: reason ? (reason.code.startsWith('COLLISION') || reason.code.startsWith('NO_YIELD') || reason.code === 'RED_LIGHT' ? 'intervention' : 'failed') : 'passed', icon: 'stop', distance: null };
  }
  ex.end = () => finish(null);                                         // free drive: stop and show the sheet

  // ---- route planning -----------------------------------------------------------------------------
  const visited = new Map();
  const leadsOn = (e, dir, depth) => {
    if (depth === 0) return true;
    return net.turnsFrom(e, dir).some((o) => usable(o, false) && leadsOn(o.e, o.dir, depth - 1));
  };
  function basic(o) {
    if (!o.allowed || o.turn === 'uturn') return false;
    const r = net.rank[o.e], fl = net.flags[o.e];
    if (r < 2 || r > 5 || fl & FLAG.LIMITED) return false;
    const far = net.nodeOf(o.e, o.dir > 0 ? 1 : 0);
    return Math.abs(net.nodeX[far]) <= HALF - 260 && Math.abs(net.nodeZ[far]) <= HALF - 260;
  }
  // Does this road lead into the wider network, or into a pocket with no way on? Counts the
  // stretches of road reachable from it; small numbers mean a dead-end pocket.
  const roomMemo = new Map();
  function roomy(e, dir) {
    const key = e * 2 + (dir > 0 ? 1 : 0);
    let v = roomMemo.get(key);
    if (v !== undefined) return v;
    const seen = new Set([key]), queue = [[e, dir]];
    while (queue.length && seen.size < 40) {
      const [ce, cd] = queue.shift();
      for (const o of net.turnsFrom(ce, cd)) {
        if (!basic(o)) continue;
        const k = o.e * 2 + (o.dir > 0 ? 1 : 0);
        if (!seen.has(k)) { seen.add(k); queue.push([o.e, o.dir]); }
      }
    }
    v = seen.size >= 40;
    roomMemo.set(key, v);
    return v;
  }
  function usable(o, deep = true) {
    return basic(o) && (!deep || roomy(o.e, o.dir));
  }
  function choose(step) {
    // Prefer roads that lead on for a while; in a pocket of the map take what there is.
    const all = net.turnsFrom(step.e, step.dir);
    let opts = all.filter((o) => usable(o));
    if (!opts.length) opts = all.filter((o) => usable(o, false) && leadsOn(o.e, o.dir, 1));
    if (!opts.length) opts = all.filter((o) => o.allowed && o.turn !== 'uturn' && net.rank[o.e] >= 1 && net.rank[o.e] <= 5);
    if (!opts.length) return null;
    if (opts.length === 1) return opts[0];
    const end = net.nodeOf(step.e, step.dir > 0 ? 1 : 0);
    const home = Math.hypot(net.nodeX[end] - start.x, net.nodeZ[end] - start.z);
    const toHome = headingOf(start.x - net.nodeX[end], start.z - net.nodeZ[end]);
    let total = 0;
    const w = opts.map((o) => {
      let v = o.turn === 'straight' ? 1.0 : 0.6;
      const arm = net.arms[end].find((a) => a.e === o.e && a.end === o.end);
      if (home > 1400 && arm) v *= 1 + 0.9 * Math.cos(angDiff(arm.h, toHome));
      v *= 1 / (1 + 2.5 * (visited.get(o.e) || 0));
      if (net.len[o.e] < 30 && o.turn !== 'straight') v *= 0.5;        // avoid weaving through junction internals
      total += v;
      return v;
    });
    let r = rng.next() * total, i = 0;
    while (i < opts.length - 1 && (r -= w[i]) > 0) i++;
    return opts[i];
  }
  function extendPlan() {
    let ahead = 0;
    for (let i = 1; i < ex.plan.length; i++) ahead += net.len[ex.plan[i].e];
    while (ahead < 420 && ex.plan.length < 16) {
      const o = choose(ex.plan[ex.plan.length - 1]);
      if (!o) break;
      ex.plan.push({ e: o.e, dir: o.dir, turn: o.turn, node: o.node, angle: o.angle });
      visited.set(o.e, (visited.get(o.e) || 0) + 1);
      ahead += net.len[o.e];
    }
  }
  function replan() {
    ex.plan = [{ e: loc.e, dir: loc.dir, turn: 'straight', node: -1, angle: 0 }];
    manoeuvre = null;
    extendPlan();
  }

  setStart();

  // The next thing worth announcing on the plan: a group of turns close together counts as one.
  let manoeuvre = null;                                                // { first, lastIdx, node, icon, key, exitNode }
  function findManoeuvre() {
    const P = ex.plan;
    for (let i = 1; i < P.length; i++) {
      const prev = P[i - 1], st = P[i];
      const intoRound = net.roundabout(st.e) && !net.roundabout(prev.e);
      const decision = net.turnsFrom(prev.e, prev.dir).filter((o) => o.allowed && o.turn !== 'uturn' && net.rank[o.e] >= 2).length > 1;
      if (!decision) continue;
      if (st.turn === 'straight' && !intoRound) {
        // Straight on at a real junction: no words, but remember it so a wrong turn is noticed.
        if (i === 1) return { first: 1, lastIdx: 1, node: st.node, icon: 'straight', key: 'straight', silent: true };
        continue;
      }
      let j = i;
      if (intoRound) {
        let exits = 0;
        while (j + 1 < P.length && net.roundabout(P[j].e)) {
          const node = net.nodeOf(P[j].e, P[j].dir > 0 ? 1 : 0);
          if (net.arms[node].some((a) => !net.roundabout(a.e) && net.canLeave(a.e, a.end))) exits++;
          j++;
        }
        if (net.roundabout(P[j].e)) return null;                       // exit not planned yet
        const n = Math.max(1, Math.min(4, exits));
        return { first: i, lastIdx: j, node: st.node, icon: 'roundabout', key: `roundaboutExit${n}` };
      }
      while (j + 1 < P.length && net.len[P[j].e] < 28 && P[j + 1].turn !== 'straight') j++;
      const a = net.pos(prev.e, prev.dir > 0 ? net.len[prev.e] : 0), b = net.pos(P[j].e, P[j].dir > 0 ? Math.min(net.len[P[j].e], 12) : Math.max(0, net.len[P[j].e] - 12));
      const delta = angDiff(headingOf(b.dx * P[j].dir, b.dz * P[j].dir), headingOf(a.dx * prev.dir, a.dz * prev.dir));
      if (Math.abs(delta) < 0.5) continue;
      const icon = Math.abs(delta) > 2.5 ? 'uturn' : delta > 0 ? 'right' : 'left';
      const lights = net.ctrl[prev.e * 2 + (prev.dir > 0 ? 1 : 0)] === CTRL.SIGNAL;
      const key = icon === 'uturn' ? 'uturn' : icon === 'left' ? (lights ? 'turnLeftAtLights' : 'turnLeft') : (lights ? 'turnRightAtLights' : 'turnRight');
      return { first: i, lastIdx: j, node: st.node, icon, key };
    }
    return null;
  }
  function distanceTo(idx) {
    let d = ex.plan[0].e === loc.e ? loc.rem : 0;
    for (let i = 1; i < idx; i++) d += net.len[ex.plan[i].e];
    return d;
  }

  // ---- per-step watchers --------------------------------------------------------------------------
  const ind = { side: 'off', since: 0, odo: 0, lastLeft: -99, lastRight: -99 };
  let lookLeftAt = -99, lookRightAt = -99;
  let moving = false, parkedSince = 0, pullOutPending = true;
  let overT = 0, bigOverT = 0, slowT = 0, wrongWayD = 0, oncomingT = 0, offT = 0, idleT = 0, handT = 0, limitGrace = 0, lastLimit = 50;
  let entry = null;                                                    // snapshot taken when a junction is entered
  let prevFront = null, prevEdge = -1, prevDir = 1;
  let amber = null, redPending = null, stopWatch = null;
  let laneTrack = { e: -1, dir: 0, lane: 0, t: 0 };
  let task = null, taskDone = false, finishing = false;
  const AP = traffic.AP();
  const fp = new Float32Array(8);
  const pedSeen = new Map();

  function approachingBehind() {
    // A vehicle coming up from behind in the lane the car is about to pull into.
    const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
    for (const c of traffic.cars) {
      const rx = c.x - car.x, rz = c.z - car.z, f = rx * fx + rz * fz, l = rx * -fz + rz * fx;
      if (f > -2 || f < -45 || l > 0.5 || l < -4.5) continue;
      if (Math.abs(angDiff(c.h, car.heading)) > 0.6) continue;
      if (c.v > 2 && -f / c.v < 3.2) return c;
    }
    for (const tr of traffic.trams) {
      const rx = tr.x - car.x, rz = tr.z - car.z, f = rx * fx + rz * fz, l = rx * -fz + rz * fx;
      if (f < -2 && f > -50 && l < 0.5 && l > -5 && Math.abs(angDiff(tr.h, car.heading)) < 0.6 && tr.v > 2 && -f / tr.v < 3.5) return tr;
    }
    return null;
  }
  function somethingAhead(reach) {
    const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
    const check = (x, z, w) => { const rx = x - car.x, rz = z - car.z, f = rx * fx + rz * fz; return f > 1 && f < reach && Math.abs(rx * -fz + rz * fx) < w; };
    for (const c of traffic.cars) if (check(c.x, c.z, 2.6)) return true;
    for (const tr of traffic.trams) for (const b of tr.bodies) if (check(b.x, b.z, 3.2)) return true;
    for (const p of traffic.peds) if (p.state !== 'leave' && check(p.x, p.z, 5)) return true;
    return false;
  }
  function redAhead(reach) {
    for (const l of net.linesOn(loc.e, loc.dir)) {
      const d = (loc.dir > 0 ? l.s - loc.s : loc.s - l.s) - car.length / 2;
      if (d < -2 || d > reach) continue;
      if (l.kind === CTRL.SIGNAL && net.signalState(l.ctrlId, l.phase, ex.t) !== SIG.GREEN) return true;
    }
    return false;
  }
  function overlapsRect(c, len, wid, h) {
    // Separating-axis test between the player's footprint and another rectangle.
    const ax = [Math.sin(car.heading), -Math.cos(car.heading), Math.sin(h), -Math.cos(h)];
    const dx = c.x - car.x, dz = c.z - car.z;
    for (let i = 0; i < 4; i += 2) {
      for (const [ux, uz] of [[ax[i], ax[i + 1]], [-ax[i + 1], ax[i]]]) {
        const proj = (hd, L, Wd) => { const fx = Math.sin(hd), fz = -Math.cos(hd); return Math.abs(fx * ux + fz * uz) * L / 2 + Math.abs(-fz * ux + fx * uz) * Wd / 2; };
        if (Math.abs(dx * ux + dz * uz) > proj(car.heading, car.length, car.width) + proj(h, len, wid)) return false;
      }
    }
    return true;
  }

  function checkStartOff() {
    // Called once each time the car pulls away from the kerb.
    if (!car.belt) fault('NO_BELT');
    if (car.lights === 'off') fault('NO_LIGHTS');
    if (!(ind.side === 'left' || ex.t - ind.lastLeft < 2.5)) fault('NO_SIGNAL_PULL_OUT');
    if (ex.t - lookLeftAt > 6) fault('NO_OBSERVATION');
    const b = approachingBehind();
    if (b) fault('NO_YIELD_PULL_OUT');
  }

  function judgeParking(what) {
    const offR = loc.dir > 0 ? loc.d : -loc.d;
    const gap = net.width[loc.e] / 2 - offR - car.width / 2;
    const p = net.pos(loc.e, loc.s);
    const skew = Math.abs(angDiff(car.heading, headingOf(p.dx * loc.dir, p.dz * loc.dir)));
    if (!(ind.side === 'right' || ex.t - ind.lastRight < 6)) fault('NO_SIGNAL_PULL_OVER');
    let note = '';
    if (gap > 0.7) note = `${gap.toFixed(1)} m from the kerb`;
    else if (skew > 0.2) note = 'not parallel to the kerb';
    for (const x of net.crossingsOn(loc.e)) if (Math.abs(x.s - loc.s) < 5 + car.length / 2) note = 'within 5 m of a pedestrian crossing';
    if (net.isJunction(loc.node) && loc.rem - net.trim[loc.e * 2 + loc.end] < 5 + car.length / 2) note = 'within 5 m of a junction';
    if (note) fault('PARKING', note);
  }

  // ---- main step ----------------------------------------------------------------------------------
  function step(dt, t, theCar, theLoc, input) {
    car = theCar; loc = theLoc;
    ex.t = t;
    if (ex.state === 'done' || loc.e < 0) return;
    const v = car.speed, av = Math.abs(v), kmh = av * KMH;

    // Indicator and observation history.
    if (car.indicator !== ind.side) { ind.side = car.indicator; ind.since = t; ind.odo = car.odometer; }
    if (car.indicator === 'left') ind.lastLeft = t;
    if (car.indicator === 'right') ind.lastRight = t;
    if (input && input.lookYaw < -0.5) lookLeftAt = t;
    if (input && input.lookYaw > 0.5) lookRightAt = t;

    ex.checklist = [
      { id: 'belt', done: car.belt }, { id: 'engine', done: car.engineOn }, { id: 'lights', done: car.lights !== 'off' },
      { id: 'gear', done: car.gear === 'D' }, { id: 'handbrake', done: !car.handbrake },
      { id: 'signal', done: car.indicator === 'left' }, { id: 'observe', done: t - lookLeftAt < 6 },
    ];

    if (ex.state === 'predrive') {
      ex.instruction = { key: 'intro', icon: 'start', distance: null };
      if (av > 0.8) { ex.state = 'driving'; checkStartOff(); pullOutPending = false; replan(); }
      else return;
    }
    ex.elapsed += dt;
    stats.distance += av * dt;
    if (av > stats.maxSpeed) stats.maxSpeed = av;
    if (!path.length || Math.hypot(car.x - path[path.length - 2], car.z - path[path.length - 1]) > 6) path.push(car.x, car.z);
    ex.info.street = net.name(loc.e) || '';
    ex.info.elapsed = ex.elapsed;
    ex.info.remaining = mode === 'exam' ? Math.max(0, duration - ex.elapsed) : null;

    // Pulling away again after a stop at the kerb.
    if (pullOutPending && av > 0.8) { checkStartOff(); pullOutPending = false; }

    // ---- speed ----
    if (loc.junction < 0) {
      const lim = net.speedKmh[loc.e];
      if (lim < lastLimit) limitGrace = 3.5;
      lastLimit = lim; ex.info.limit = lim;
    }
    limitGrace = Math.max(0, limitGrace - dt);
    const lim = ex.info.limit;
    if (limitGrace <= 0 && kmh > lim + 11) { bigOverT += dt; if (bigOverT > 1.6) { fault('SPEEDING_MAJOR', `${Math.round(kmh)} km/h in a ${lim} zone`); bigOverT = 0; } } else bigOverT = 0;
    if (limitGrace <= 0 && kmh > lim + 5) { overT += dt; if (overT > 3) { fault('SPEEDING_MINOR', `${Math.round(kmh)} km/h in a ${lim} zone`); overT = 0; } } else overT = 0;
    if (mode === 'exam' && ex.state === 'driving' && !task && net.rank[loc.e] >= 2 && lim >= 50 && kmh < lim * 0.5 && kmh > 3 && loc.junction < 0 && loc.rem > 70 && !somethingAhead(45) && !redAhead(70)) {
      slowT += dt; if (slowT > 12) { fault('TOO_SLOW', `${Math.round(kmh)} km/h in a ${lim} zone with a clear road`); slowT = 0; }
    } else slowT = Math.max(0, slowT - dt * 2);

    // ---- position on the road ----
    if (loc.wrongWay && loc.junction < 0 && av > 0.5) { wrongWayD += av * dt; if (wrongWayD > 8) fault('WRONG_WAY'); } else wrongWayD = 0;
    footprint(car, fp);
    // Kerbs: a wheel just over the edge is a minor fault, the car up on the pavement is serious.
    // The margins allow for the map's road widths being approximate.
    let off = false, kerb = false, hitWall = false;
    for (let i = 0; i < 8; i += 2) {
      if (!net.onRoad(fp[i], fp[i + 1], 0.35)) { kerb = true; if (!net.onRoad(fp[i], fp[i + 1], 1.3)) off = true; }
      if (statics && statics.hitsBuilding(fp[i], fp[i + 1])) hitWall = true;
    }
    if (hitWall) fault('COLLISION_OBJECT');
    if (off && av > 0.3) { offT += dt; if (offT > 0.5) fault('OFF_ROAD'); } else offT = 0;
    if (kerb && !off && av > 0.3) { kerbT += dt; if (kerbT > 0.6) { fault('LANE_POSITION', 'a wheel over the kerb'); kerbT = 0; } } else kerbT = 0;
    const twoWay = !net.oneway(loc.e) && !(net.flags[loc.e] & FLAG.NARROW) && net.rank[loc.e] >= 2;
    if (twoWay && loc.junction < 0 && loc.oncoming > 0.9 && av > 2 && loc.rem > net.trim[loc.e * 2 + loc.end] + 6) {
      oncomingT += dt;
      const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
      let facing = false, passing = false;
      for (const c of traffic.cars) {
        const rx = c.x - car.x, rz = c.z - car.z, f = rx * fx + rz * fz, l = Math.abs(rx * -fz + rz * fx);
        if (f > 0 && f < 55 && l < 2 && Math.abs(angDiff(c.h, car.heading)) > 2.4) facing = true;
        if (f > -6 && f < 30 && c.v < 1) passing = true;                // going round something that is standing
      }
      if (facing && oncomingT > 0.7) fault('ONCOMING_LANE');
      else if (!passing && oncomingT > 9) fault('ONCOMING_LANE');
      else if (!passing && oncomingT > 4) fault('LANE_POSITION', 'driving left of the centre line');
    } else oncomingT = 0;

    // ---- collisions ----
    for (const c of traffic.cars) {
      if (Math.abs(c.x - car.x) > 8 || Math.abs(c.z - car.z) > 8) continue;
      if (!overlapsRect(c, c.len, c.wid, c.h)) continue;
      const behind = (c.x - car.x) * Math.sin(car.heading) + (c.z - car.z) * -Math.cos(car.heading) < -1.6;
      if (behind && v >= -0.2) continue;                                // run into from behind: not the candidate's fault
      fault('COLLISION_VEHICLE');
    }
    for (const tr of traffic.trams) {
      const fwd = (tr.x - car.x) * Math.sin(car.heading) + (tr.z - car.z) * -Math.cos(car.heading);
      const sameWay = Math.abs(angDiff(tr.h, car.heading)) < 0.5;
      // Cutting in front of a tram or crossing its path so that it has to brake hard.
      const cutIn = tr.brakeForPlayer > 2.2 && av > 0.5 && (!sameWay || (tr.seenPlayer || 0) < 1.5);
      if (cutIn) fault('NO_YIELD_TRAM');
      for (const b of tr.bodies) {
        if (Math.abs(b.x - car.x) > 14 || Math.abs(b.z - car.z) > 14 || !overlapsRect(b, b.len, b.wid, b.h)) continue;
        if (sameWay && fwd < -1.5 && v >= -0.2) continue;               // run into from behind by the tram
        fault('NO_YIELD_TRAM', 'collision with a tram');
      }
    }
    for (const p of traffic.peds) {
      const rx = p.x - car.x, rz = p.z - car.z;
      if (Math.abs(rx) > 6 || Math.abs(rz) > 6) continue;
      const f = rx * Math.sin(car.heading) + rz * -Math.cos(car.heading), l = rx * Math.cos(car.heading) + rz * Math.sin(car.heading);
      if (Math.abs(f) < car.length / 2 + 0.35 && Math.abs(l) < car.width / 2 + 0.35 && av > 0.3) fault('COLLISION_PEDESTRIAN');
    }

    // ---- lines, crossings and rails passed on this edge ----
    const front = loc.s + loc.dir * (car.length / 2);
    const sameEdge = prevEdge === loc.e && prevDir === loc.dir && prevFront !== null;
    const passed = (s) => sameEdge && (loc.dir > 0 ? prevFront < s && front >= s : prevFront > s && front <= s);
    const lines = net.linesOn(loc.e, loc.dir);
    for (const l of lines) {
      const d = (loc.dir > 0 ? l.s - front : front - l.s);              // metres from the front bumper to the line
      if (l.kind === CTRL.SIGNAL) {
        const st = net.signalState(l.ctrlId, l.phase, t);
        if (d > 0 && d < 80) {
          if (st === SIG.AMBER) { if (!amber || amber.id !== l.id) amber = { id: l.id, canStop: d > av * 1.0 + (av * av) / (2 * 3.6) }; }
          else if (amber && amber.id === l.id && st !== SIG.AMBER) amber = st === SIG.GREEN ? null : amber;
        }
        if (passed(l.s) && v > 0.3) {
          if (st === SIG.RED || st === SIG.RED_AMBER) redPending = { id: l.id, s: l.s, e: loc.e };
          else if (st === SIG.AMBER && amber && amber.id === l.id && amber.canStop) fault('RED_LIGHT', 'the light was amber and there was room to stop');
        }
      } else if (l.kind === CTRL.STOP) {
        if (d < 9 && d > -1) { if (!stopWatch || stopWatch.id !== l.id) stopWatch = { id: l.id, min: av }; else stopWatch.min = Math.min(stopWatch.min, av); }
        if (stopWatch && stopWatch.id === l.id && d < -1.2) { if (stopWatch.min > 0.35) fault('STOP_SIGN', `slowest speed ${Math.round(stopWatch.min * KMH)} km/h`); else stats.stopsAtSigns++; stopWatch = null; }
      }
    }
    if (redPending) {
      const beyond = redPending.e === loc.e ? (loc.dir > 0 ? front - redPending.s : redPending.s - front) : 99;
      if (beyond > 2.6) { fault('RED_LIGHT'); redPending = null; }
      else if (av < 0.2) { fault('STOP_LINE_OVERRUN', `${beyond.toFixed(1)} m past the stop line`); redPending = null; }
    }
    for (const x of net.crossingsOn(loc.e)) {
      const d = loc.dir > 0 ? x.s - front : front - x.s;
      if (d > 60 || d < -8) continue;
      for (const p of traffic.peds) {
        if (p.c !== x.id) continue;
        if (p.state === 'wait' && !x.signal && !pedSeen.has(p.id) && d > 0) pedSeen.set(p.id, { canStop: d - 2 > av * 1.0 + (av * av) / (2 * 3.4) });
        if (passed(x.s) && av > 1.2) {
          if (p.state === 'cross' && Math.abs(p.q) < p.kerb) fault('PEDESTRIAN_CROSSING', 'a pedestrian was on the crossing');
          else if (p.state === 'wait' && !x.signal && p.waited > 0.8 && pedSeen.get(p.id) && pedSeen.get(p.id).canStop) fault('PEDESTRIAN_CROSSING', 'a pedestrian was waiting to cross');
        }
      }
      if (av < 0.2 && Math.abs(loc.s - x.s) < 2.4 && loc.junction < 0) { idleCross += dt; if (idleCross > 3) { fault('BLOCKED_CROSSING'); idleCross = 0; } }
    }
    if (av > 0.5) idleCross = 0;
    for (const r of net.railsOn(loc.e)) if (passed(r.s) && kmh > 35) fault('RAIL_CROSSING', `${Math.round(kmh)} km/h over the crossing`);
    prevFront = front; prevEdge = loc.e; prevDir = loc.dir;

    // ---- junctions ----
    if (loc.entered) {
      const J = loc.entered;
      const threats = [];
      for (const c of traffic.cars) {
        if (Math.abs(c.x - car.x) > 80 || Math.abs(c.z - car.z) > 80) continue;
        traffic.approach(c, J.node, null, AP);
        if (!AP.n || AP.stopped) continue;
        if (AP.t > 3.2) continue;
        if (AP.t > 0 && c.v < 2) continue;
        threats.push({ M: AP.M[0], t: AP.t });
      }
      const masks = net.turnLanes[J.e] ? net.turnLanes[J.e][J.end ? 0 : 1] : null;
      entry = { node: J.node, e: J.e, end: J.end, t, threats, ind: car.indicator, indSince: ind.since, indOdo: ind.odo, odo: car.odometer, mask: masks ? masks[Math.min(masks.length - 1, loc.lane)] : 0, ctrl: net.ctrl[J.e * 2 + J.end] };
      if (entry.ctrl === CTRL.STOP && stopWatch === null && av > 0.6) { /* line already judged above */ }
    }
    if (loc.exited && entry && entry.node === loc.exited.node) {
      const X = loc.exited, M = { e: X.e, end: X.end, out: X.out };
      stats.junctions++;
      const turns = net.turnsFrom(X.e, X.end ? 1 : -1);
      const mv = turns.find((o) => o.e === X.out);
      if (X.out !== X.e && mv) {
        if (!mv.allowed) fault('TURN_RESTRICTION');
        // Priority.
        for (const th of entry.threats) {
          if (!net.conflict(M, th.M) || !net.mustYield(M, th.M, entry.t)) continue;
          const c = entry.ctrl;
          const round = net.roundabout(X.out) && !net.roundabout(X.e);
          let code = 'NO_YIELD_SIGN';
          if (round) code = 'NO_YIELD_ROUNDABOUT';
          else if (c === CTRL.GIVE_WAY || c === CTRL.STOP || c === CTRL.EXIT) code = 'NO_YIELD_SIGN';
          else if (mv.turn === 'left' && net.mustYield(M, th.M, entry.t) && isOncoming(M, th.M)) code = 'NO_YIELD_LEFT_TURN';
          else if (c === CTRL.EQUAL) code = 'NO_YIELD_RIGHT';
          else code = 'NO_YIELD_LEFT_TURN';
          fault(code);
          break;
        }
        // Indicators.
        const roundOut = net.roundabout(X.e) && !net.roundabout(X.out);
        const roundIn = !net.roundabout(X.e) && net.roundabout(X.out);
        const within = net.roundabout(X.e) && net.roundabout(X.out);
        const sameRoad = mv.turn !== 'straight' && Math.abs(mv.angle) < 0.85 && net.name(X.e) && net.name(X.e) === net.name(X.out) && turns.filter((o) => net.rank[o.e] >= 2).length === 1;
        if (roundOut) { if (!(entry.ind === 'right' || car.indicator === 'right' || t - ind.lastRight < 3)) fault('NO_SIGNAL_ROUNDABOUT_EXIT'); }
        else if (!roundIn && !within && !sameRoad && net.len[X.e] > 18 && (mv.turn === 'left' || mv.turn === 'right')) {
          const lastOn = mv.turn === 'left' ? ind.lastLeft : ind.lastRight;
          if (entry.ind !== mv.turn && !(lastOn > entry.t - 0.3)) fault('NO_SIGNAL_TURN', `turning ${mv.turn}`);
          else if (entry.ind === mv.turn && net.len[X.e] > 35 && entry.t - entry.indSince < 1.2 && entry.odo - entry.indOdo < 10) fault('LATE_SIGNAL');
        }
        if (entry.mask) {
          const bit = mv.turn === 'left' ? 1 : mv.turn === 'right' ? 4 : 2;
          if (!(entry.mask & bit)) fault('WRONG_LANE', `went ${mv.turn} from a lane marked for another direction`);
        }
        // Did the candidate go where the examiner asked?
        const P = ex.plan;
        if (mode === 'exam' && P.length > 1 && P[0].e === X.e) {
          if (P[1].e === X.out) { P.shift(); if (manoeuvre) { manoeuvre.first--; manoeuvre.lastIdx--; if (manoeuvre.lastIdx < 1) manoeuvre = null; } }
          else {
            const options = turns.filter((o) => usable(o, false)).length;
            if (options > 1 && !task) fault('IGNORED_INSTRUCTION', manoeuvre && !manoeuvre.silent ? '' : 'no turn was asked for');
            replan();
          }
        }
      }
      entry = null;
    }
    // Keep the plan in step with the car outside junctions too.
    if (ex.state !== 'predrive' && loc.junction < 0) {
      const P = ex.plan;
      if (!P.length || P[0].e !== loc.e || P[0].dir !== loc.dir) {
        if (P.length > 1 && P[1].e === loc.e && P[1].dir === loc.dir) { P.shift(); if (manoeuvre) { manoeuvre.first--; manoeuvre.lastIdx--; if (manoeuvre.lastIdx < 1) manoeuvre = null; } }
        else replan();
      }
      extendPlan();
    }

    // ---- lane changes and forgotten indicators ----
    if (loc.junction < 0 && loc.lanes >= 2 && laneTrack.e === loc.e && laneTrack.dir === loc.dir) {
      if (loc.lane !== laneTrack.lane) {
        laneTrack.t += dt;
        if (laneTrack.t > 0.7) {
          const right = loc.lane > laneTrack.lane;
          const lastOn = right ? ind.lastRight : ind.lastLeft;
          if (t - lastOn > 2.5) fault('NO_SIGNAL_LANE_CHANGE');
          laneTrack.lane = loc.lane; laneTrack.t = 0;
        }
      } else laneTrack.t = 0;
    } else laneTrack = { e: loc.e, dir: loc.dir, lane: loc.lane, t: 0 };
    if ((car.indicator === 'left' || car.indicator === 'right') && t - ind.since > 20 && car.odometer - ind.odo > 220 && loc.junction < 0) fault('SIGNAL_LEFT_ON');
    if (car.handbrake && av > 2) { handT += dt; if (handT > 2.5) { fault('HANDBRAKE_ON'); handT = 0; } } else handT = 0;
    if (car.accel < -7.2 && av > 5 && !somethingAhead(30) && !redAhead(35)) fault('HARSH_BRAKING');

    // ---- standing still for no reason ----
    if (mode === 'exam' && ex.state === 'driving' && !task && av < 0.2 && car.engineOn) {
      let reason = somethingAhead(16) || redAhead(14);
      if (!reason && loc.junction < 0 && net.isJunction(loc.node) && loc.rem < 40) {
        for (const c of traffic.cars) { traffic.approach(c, loc.node, null, AP); if (AP.n && AP.t < 6 && !AP.stopped) { reason = true; break; } }
        for (const tr of traffic.trams) if (Math.hypot(tr.x - car.x, tr.z - car.z) < 45 && tr.v > 1) reason = true;
      }
      if (reason) idleT = 0; else { idleT += dt; if (idleT > 8) { fault('HESITATION'); idleT = 0; } }
    } else idleT = 0;

    if (mode !== 'exam') { ex.instruction = null; return; }

    // ---- tasks: pull over mid-way, and the final stop ----
    const calm = () => loc.junction < 0 && net.rank[loc.e] >= 2 && net.rank[loc.e] <= 3 && net.speedKmh[loc.e] <= 50 && !(net.flags[loc.e] & (FLAG.ROUNDABOUT | FLAG.LINK | FLAG.BRIDGE | FLAG.TUNNEL | FLAG.NARROW)) && loc.rem > 95 && !manoeuvreSoon();
    if (!task && !taskDone && duration >= 480 && ex.elapsed > duration * 0.45 && calm()) task = { kind: 'pullOver', since: ex.elapsed, odo: car.odometer, stoppedT: 0 };
    if (!task && !finishing && ex.elapsed >= duration && calm()) { task = { kind: 'finish', since: ex.elapsed, odo: car.odometer, stoppedT: 0 }; finishing = true; }
    if (!task && ex.elapsed >= duration + 90) { finish(null); return; }   // nowhere calm to stop: end the drive here
    if (task) {
      if (task.kind === 'pullOver' || task.kind === 'finish') {
        ex.instruction = { key: task.kind === 'finish' ? 'finish' : 'pullOver', icon: 'park', distance: null };
        if (av < 0.15) { task.stoppedT += dt; } else task.stoppedT = 0;
        if (task.stoppedT > 1.6 && !somethingAhead(8) && !redAhead(10)) {
          judgeParking();
          if (ex.state === 'done') return;
          if (task.kind === 'finish') { finish(null); return; }
          task = { kind: 'moveOff', since: ex.elapsed }; taskDone = true; pullOutPending = true;
        } else if (car.odometer - task.odo > 320 || ex.elapsed - task.since > 60) {
          fault('IGNORED_INSTRUCTION', 'did not stop at the kerb when asked');
          if (task && task.kind === 'finish') { finish(null); return; }
          task = null; taskDone = true;
        }
      } else if (task.kind === 'moveOff') {
        ex.instruction = { key: 'continue', icon: 'start', distance: null };
        if (av > 2.5) task = null;
      }
      return;
    }

    // ---- directions ----
    if (!manoeuvre) manoeuvre = findManoeuvre();
    if (ex.plan.length === 1 && loc.rem < 90 && !net.turnsFrom(loc.e, loc.dir).some((o) => o.allowed && o.turn !== 'uturn' && net.rank[o.e] >= 1)) {
      ex.instruction = { key: 'uturn', icon: 'uturn', distance: null };   // dead end ahead
    } else if (manoeuvre) {
      const d = distanceTo(manoeuvre.first);
      if (manoeuvre.silent) ex.instruction = d < 70 ? { key: 'straight', icon: 'straight', distance: Math.round(d / 10) * 10, quiet: true } : null;
      else if (d < Math.max(120, av * 9) || manoeuvre.said) { manoeuvre.said = true; ex.instruction = { key: manoeuvre.key, icon: manoeuvre.icon, distance: Math.max(0, Math.round(d / 10) * 10) }; }
      else ex.instruction = null;
      if (manoeuvre.silent && d > 70) manoeuvre = null;                 // look again next step: a turn may be nearer on a longer plan
    } else ex.instruction = null;
  }
  let idleCross = 0, kerbT = 0;
  function manoeuvreSoon() { return manoeuvre && !manoeuvre.silent && distanceTo(manoeuvre.first) < 220; }
  function isOncoming(A, B) {
    const arms = net.arms[net.nodeOf(A.e, A.end)];
    const a = arms.find((x) => x.e === A.e && x.end === A.end), b = arms.find((x) => x.e === B.e && x.end === B.end);
    return a && b && Math.abs(angDiff(b.h, a.h + Math.PI)) <= 0.6;
  }

  ex.step = step;
  ex.takeFaults = () => { const f = ex.fresh; ex.fresh = []; return f; };
  return ex;
}

// Used when the law book does not say otherwise.
export const DEFAULT_SEVERITY = Object.fromEntries([
  ...['RED_LIGHT', 'STOP_SIGN', 'NO_YIELD_SIGN', 'NO_YIELD_RIGHT', 'NO_YIELD_LEFT_TURN', 'NO_YIELD_ROUNDABOUT', 'NO_YIELD_TRAM', 'NO_YIELD_PULL_OUT', 'PEDESTRIAN_CROSSING', 'SPEEDING_MAJOR', 'WRONG_WAY', 'TURN_RESTRICTION', 'ONCOMING_LANE', 'OFF_ROAD', 'COLLISION_VEHICLE', 'COLLISION_PEDESTRIAN', 'COLLISION_OBJECT', 'RAIL_CROSSING', 'TOO_MANY_MINOR'].map((c) => [c, 'serious']),
]);
