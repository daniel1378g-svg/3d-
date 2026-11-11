// Other road users around the player: cars, trams and pedestrians.
//
// Cars follow lanes on the road network, keep their distance, obey signals and signs and give way
// by the same priority function the examiner uses to judge the player (RoadNet.mustYield). Only
// the surroundings of the player are simulated: vehicles appear a couple of hundred metres away
// and are removed when left behind.
import { CTRL, SIG, FLAG } from './roadnet.js';
import { makeRng } from './rng.js';
import { headingOf, angDiff, HALF } from '../data/geo.js';

const DENSITY = { light: { cars: 9, trams: 2, peds: 5 }, normal: { cars: 16, trams: 3, peds: 9 }, busy: { cars: 26, trams: 4, peds: 14 } };
const SIM_R = 300, SPAWN_MIN = 150, SPAWN_MAX = 250;
const COMFORT = 2.4;                    // m/s^2 braking the drivers plan with
const GAP = 4.2;                        // seconds of clear road a driver wants before pulling out
const COLOURS = [0xd8d8d8, 0xf2f2f0, 0x202226, 0x8a8f96, 0x2b3a55, 0x7a1f1f, 0xb8b0a0, 0x35506b, 0x4b5a3c, 0xc23b22, 0x1f4e8c, 0x6e6e72, 0xe0c040];
const TRAM_LEN = 15.2, TRAM_GAP = 0.6, TRAM_V = 11;

export function createTraffic({ net, seed = 1, density = 'normal' }) {
  const rng = makeRng(seed).fork('traffic');
  const want = DENSITY[density] || DENSITY.normal;
  const cars = [], trams = [], peds = [];
  let nextId = 1;
  const P = {}, Q = {};                                           // scratch

  // ---------------------------------------------------------------------------------- tram tracks
  const T = net.tram, nT = T.a.length;
  const tramS = new Float32Array(T.x.length), tramLen = new Float32Array(nT);
  const tramNext = new Map();
  for (let i = 0; i < nT; i++) {
    let s = 0;
    for (let p = T.pt[i] + 1; p < T.pt[i + 1]; p++) { s += Math.hypot(T.x[p] - T.x[p - 1], T.z[p] - T.z[p - 1]); tramS[p] = s; }
    tramLen[i] = s;
    if (!tramNext.has(T.a[i])) tramNext.set(T.a[i], []);
    tramNext.get(T.a[i]).push(i);
  }
  function tramPos(i, s, out) {
    const p0 = T.pt[i], p1 = T.pt[i + 1] - 1;
    s = Math.max(0, Math.min(tramLen[i], s));
    let lo = p0, hi = p1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (tramS[m] <= s) lo = m; else hi = m; }
    const seg = tramS[hi] - tramS[lo] || 1, f = (s - tramS[lo]) / seg;
    out.x = T.x[lo] + (T.x[hi] - T.x[lo]) * f; out.z = T.z[lo] + (T.z[hi] - T.z[lo]) * f;
    out.h = headingOf(T.x[hi] - T.x[lo], T.z[hi] - T.z[lo]);
    return out;
  }
  // Where trams must wait for the road signals: the point where a track enters a controller's area.
  const tramLines = Array.from({ length: nT }, () => []);
  {
    const heads = net.controllers.map(() => [[], []]);
    for (const l of net.lines) if (l.kind === CTRL.SIGNAL && l.ctrlId >= 0) { const p = net.pos(l.e, l.s); heads[l.ctrlId][l.phase].push(headingOf(p.dx * l.dir, p.dz * l.dir)); }
    const cell = 80, grid = new Map();
    net.controllers.forEach((c, id) => { const k = `${Math.floor(c.x / cell)},${Math.floor(c.z / cell)}`; if (!grid.has(k)) grid.set(k, []); grid.get(k).push(id); });
    for (let i = 0; i < nT; i++) {
      const seen = new Set();
      for (let p = T.pt[i]; p < T.pt[i + 1]; p++) {
        const gx = Math.floor(T.x[p] / cell), gz = Math.floor(T.z[p] / cell);
        for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) for (const id of grid.get(`${gx + dx},${gz + dz}`) || []) {
          if (seen.has(id)) continue;
          const c = net.controllers[id];
          if (c.ped || Math.hypot(T.x[p] - c.x, T.z[p] - c.z) > 32) continue;
          seen.add(id);
          const h = p + 1 < T.pt[i + 1] ? headingOf(T.x[p + 1] - T.x[p], T.z[p + 1] - T.z[p]) : 0;
          const par = (list) => list.reduce((m, hh) => { let d = Math.abs(angDiff(h, hh)); if (d > Math.PI / 2) d = Math.PI - d; return Math.min(m, d); }, 9);
          tramLines[i].push({ s: Math.max(0, tramS[p] - 2), ctrlId: id, phase: par(heads[id][0]) <= par(heads[id][1]) ? 0 : 1 });
        }
      }
    }
  }

  // ------------------------------------------------------------------------------------ helpers
  const laneOff = (c) => net.laneOffset(c.e, c.dir, 0) + (net.laneOffset(c.e, c.dir, 1) - net.laneOffset(c.e, c.dir, 0)) * c.laneF;
  function place(c) {
    if (c.junc) {
      const j = c.junc, k = j.conn, u = Math.min(1, j.u), w = 1 - u;
      c.x = w * w * k.x0 + 2 * w * u * k.cx + u * u * k.x1;
      c.z = w * w * k.z0 + 2 * w * u * k.cz + u * u * k.z1;
      const dx = 2 * w * (k.cx - k.x0) + 2 * u * (k.x1 - k.cx), dz = 2 * w * (k.cz - k.z0) + 2 * u * (k.z1 - k.cz);
      if (Math.abs(dx) + Math.abs(dz) > 1e-4) c.h = headingOf(dx, dz);
    } else {
      net.pos(c.e, c.s, P);
      const off = laneOff(c);
      c.x = P.x - P.dz * off; c.z = P.z + P.dx * off;
      c.h = headingOf(P.dx * c.dir, P.dz * c.dir);
    }
  }
  const rem = (c) => (c.dir > 0 ? net.len[c.e] - c.s : c.s);
  const endOf = (c) => (c.dir > 0 ? 1 : 0);

  function chooseLane(c) {
    const n = Math.max(1, net.lanes(c.e, c.dir));
    if (n === 1) return 0;
    const turn = c.next ? c.next.turn : 'straight';
    const masks = net.turnLanes[c.e] ? net.turnLanes[c.e][c.dir > 0 ? 0 : 1] : null;
    if (masks) {
      const bit = turn === 'left' ? 1 : turn === 'right' ? 4 : 2;
      const ok = [];
      masks.forEach((m, i) => { if (!m || m & bit) ok.push(i); });
      if (ok.length) return turn === 'left' ? ok[0] : ok[ok.length - 1];
    }
    return turn === 'left' ? 0 : n - 1;
  }
  function pickNext(c) {
    const opts = net.turnsFrom(c.e, c.dir).filter((o) => o.allowed && o.turn !== 'uturn' && Math.abs(net.nodeX[net.nodeOf(o.e, o.end ? 0 : 1)]) < HALF + 40);
    if (!opts.length) { c.next = null; return; }
    // Prefer ways that lead somewhere, so cars do not drive into dead ends and vanish in view.
    const through = opts.filter((o) => net.turnsFrom(o.e, o.dir).some((n) => n.allowed && n.turn !== 'uturn'));
    if (through.length) opts.length = 0, opts.push(...through);
    let total = 0;
    const w = opts.map((o) => {
      let v = Math.pow(net.rank[o.e] + 0.4, 1.6) * (o.turn === 'straight' ? 2.4 : 1);
      if (net.rank[o.e] === 0) v *= 0.05;
      if (net.flags[o.e] & FLAG.LIMITED) v *= 0.05;
      total += v;
      return v;
    });
    let r = rng.next() * total, i = 0;
    while (i < opts.length - 1 && (r -= w[i]) > 0) i++;
    c.next = opts[i];
  }
  function enterEdge(c, e, dir, s, lane) {
    c.e = e; c.dir = dir; c.s = s; c.junc = null; c.stopT = 0; c.stopDone = false; c.waitT = 0;
    pickNext(c);
    c.M = c.next ? { e, end: dir > 0 ? 1 : 0, out: c.next.e } : null;
    c.lane = chooseLane(c);
    c.laneF = Math.min(Math.max(0, net.lanes(e, dir) - 1), lane);
    c.ind = 0;
  }

  // Everything that moves, for neighbour checks: cars, tram bodies and the player.
  const movers = [];
  function collectMovers(player) {
    movers.length = 0;
    for (const c of cars) movers.push(c);
    for (const t of trams) for (const b of t.bodies) movers.push(b);
    if (player) movers.push(player);
  }
  // Distance to the nearest thing in the way straight ahead. Returns { gap, v } of the blocker.
  function ahead(self, x, z, h, len, reach, halfWidth, out) {
    const fx = Math.sin(h), fz = -Math.cos(h);
    out.gap = Infinity; out.v = 0; out.who = null;
    for (const m of movers) {
      if (m === self || m.owner === self) continue;
      const rx = m.x - x, rz = m.z - z;
      const f = rx * fx + rz * fz;
      if (f < 0.5 || f > reach + 12) continue;
      const l = Math.abs(rx * -fz + rz * fx);
      const mLen = m.len || m.length || 4.4, mWid = m.wid || m.width || 1.8;
      const rel = Math.abs(angDiff(m.h !== undefined ? m.h : m.heading, h));
      const mv = m.v !== undefined ? m.v : m.speed;
      const along = rel < 0.9;                                    // roughly my direction
      // Oncoming traffic in the next lane is not in the way; a crossing or stopped vehicle is.
      if (!along && rel > 2.2 && l > 1.1) continue;
      const half = along ? mWid / 2 : Math.max(mWid / 2, (mLen / 2) * Math.abs(Math.sin(rel)));
      if (l > halfWidth + half + 0.25) continue;
      const g = f - len / 2 - (along ? mLen / 2 : Math.max(mWid / 2, (mLen / 2) * Math.abs(Math.cos(rel))));
      if (g < out.gap) { out.gap = g; out.v = along ? Math.max(0, mv * Math.cos(rel)) : 0; out.who = m; }
    }
    for (const p of peds) {
      if (p.state !== 'cross') continue;
      const rx = p.x - x, rz = p.z - z, f = rx * fx + rz * fz;
      if (f < 0.5 || f > reach) continue;
      if (Math.abs(rx * -fz + rz * fx) > halfWidth + 0.9) continue;
      const g = f - len / 2 - 0.8;
      if (g < out.gap) { out.gap = g; out.v = 0; out.who = p; }
    }
    return out;
  }

  // ------------------------------------------------------------------------- priority at junctions
  // Movements another road user may make at `node`, with the time until it reaches the junction.
  function approach(m, node, playerLoc, out) {
    out.n = 0;
    if (m.isPlayer) {
      const L = playerLoc;
      if (!L || L.e < 0) return out;
      let e, end, t;
      if (L.junction === node && L.entry) { e = L.entry.e; end = L.entry.end; t = 0; }
      else if (L.junction < 0 && L.node === node) {
        e = L.e; end = L.end;
        const d = L.rem - net.trim[e * 2 + end] - m.length / 2;
        if (d > 70) return out;
        t = Math.max(0, d) / Math.max(m.speed, 1.5);
        out.stopped = m.speed < 0.4 && d < 6;
      } else return out;
      const turns = net.turnsFrom(e, end ? 1 : -1);
      const wantTurn = m.indicator === 'left' ? 'left' : m.indicator === 'right' ? 'right' : 'straight';
      let list = turns.filter((o) => o.turn === wantTurn);
      if (!list.length) list = turns;
      for (const o of list) out.M[out.n++] = { e, end, out: o.e };
      out.t = t;
      return out;
    }
    if (m.junc) { if (m.junc.node !== node) return out; out.M[out.n++] = m.junc.M; out.t = 0; out.stopped = false; return out; }
    if (!m.next || !m.M || net.nodeOf(m.e, endOf(m)) !== node) return out;
    const d = rem(m) - net.trim[m.e * 2 + endOf(m)] - m.len / 2;
    if (d > 70) return out;
    out.M[out.n++] = m.M;
    out.t = Math.max(0, d) / Math.max(m.v, 1.5);
    out.stopped = m.v < 0.4;
    return out;
  }
  const AP = { n: 0, M: [], t: 0, stopped: false };
  // Must this car wait at its line? Returns the road user it waits for, or null.
  function mustWait(c, t, player, playerLoc) {
    const node = net.nodeOf(c.e, endOf(c));
    const patient = c.waitT < 6 + (c.id % 5);
    for (const m of movers) {
      if (m === c || m.owner) continue;
      if (Math.abs(m.x - c.x) > 90 || Math.abs(m.z - c.z) > 90) continue;
      approach(m, node, playerLoc, AP);
      if (!AP.n) continue;
      const inside = AP.t === 0 && !AP.stopped;
      if (!inside && AP.t > GAP) continue;
      if (!inside && AP.stopped && !patient) continue;            // do not wait for ever on someone standing still
      for (let i = 0; i < AP.n; i++) {
        const MB = AP.M[i];
        if (!net.conflict(c.M, MB)) continue;
        if (inside || net.mustYield(c.M, MB, t)) return m;
      }
    }
    return null;
  }

  // --------------------------------------------------------------------------------------- cars
  function spawnCar(player, near) {
    const ang = rng.range(0, Math.PI * 2), r = near ? rng.range(45, SPAWN_MAX) : rng.range(SPAWN_MIN, SPAWN_MAX);
    const x = player.x + Math.sin(ang) * r, z = player.z - Math.cos(ang) * r;
    const hit = net.nearest(x, z, 70, (e) => net.rank[e] >= 2 && !(net.flags[e] & (FLAG.LIMITED | FLAG.ROUNDABOUT)) && net.len[e] > 40);
    if (!hit) return false;
    const e = hit.e;
    const dir = net.oneway(e) ? 1 : rng.chance(0.5) ? 1 : -1;
    const s = Math.max(12, Math.min(net.len[e] - 12, hit.s));
    const c = { id: nextId++, len: 4.3, wid: 1.8, v: 0, a: 0, x: 0, z: 0, h: 0, variant: rng.int(5), colour: rng.pick(COLOURS), vmax: rng.range(0.86, 1.0), brake: false, ind: 0, blockedT: 0, laneF: 0, lane: 0 };
    if (c.variant === 4) { c.len = 5.2; c.wid = 2.0; }
    enterEdge(c, e, dir, s, 0);
    c.laneF = c.lane;
    place(c);
    if (Math.hypot(c.x - player.x, c.z - player.z) < (near ? 40 : SPAWN_MIN - 10)) return false;
    for (const o of cars) if (Math.hypot(o.x - c.x, o.z - c.z) < 22) return false;
    c.v = net.speed(e) * 0.7;
    cars.push(c);
    return true;
  }

  const A = {};
  function stepCar(c, dt, t, player, playerLoc) {
    const e = c.e, end = endOf(c), node = net.nodeOf(e, end);
    let target = c.junc ? c.junc.vmax : net.speed(e) * c.vmax;
    const plan = (d, vEnd) => Math.sqrt(vEnd * vEnd + 2 * COMFORT * Math.max(0, d));
    let hold = false;
    c.why = '';
    const cap = (v, why) => { if (v < target) { target = v; c.why = why; } };

    if (!c.junc) {
      c.M = c.next ? { e, end, out: c.next.e } : null;
      const r = rem(c), trim = net.trim[e * 2 + end], isJ = net.isJunction(node);
      const front = r - c.len / 2;
      // Lines on this edge: signals anywhere along it, and the junction's own line.
      for (const l of net.linesOn(e, c.dir)) {
        const d = (c.dir > 0 ? l.s - c.s : c.s - l.s) - c.len / 2;
        if (d < -1.5 || d > 70) continue;
        if (l.kind === CTRL.SIGNAL) {
          const st = net.signalState(l.ctrlId, l.phase, t);
          if (st === SIG.GREEN) continue;
          if (st === SIG.AMBER && d < (c.v * c.v) / (2 * 3.2)) continue;   // too late to stop
          cap(d < 0.6 ? 0 : plan(d - 0.6, 0), 'signal');
          if (d < 4) hold = true;
        }
      }
      if (isJ && c.next) {
        const ctrl = net.ctrl[e * 2 + end];
        const dLine = front - Math.max(trim, net.lineD[e * 2 + end]);
        const turning = c.next.turn !== 'straight';
        const vThrough = turning ? (c.next.turn === 'right' ? 5.0 : 6.0) : net.roundabout(c.next.e) ? 6.5 : Infinity;
        if (vThrough < Infinity) target = Math.min(target, plan(front - trim, vThrough));
        if (ctrl === CTRL.EQUAL) target = Math.min(target, plan(dLine, 6.5));
        if (ctrl === CTRL.GIVE_WAY || ctrl === CTRL.EXIT) target = Math.min(target, plan(dLine, 4.5));
        if (ctrl === CTRL.STOP && !c.stopDone) {
          cap(dLine < 0.5 ? 0 : plan(dLine - 0.5, 0), 'stop');
          if (c.v < 0.2 && dLine < 2.5) { c.stopT += dt; if (c.stopT > 1.0) c.stopDone = true; }
          hold = true;
        }
        if (dLine < 38 && dLine > -trim) {
          const blocker = mustWait(c, t, player, playerLoc);
          if (blocker) { cap(dLine < 0.5 ? 0 : plan(dLine - 0.5, 0), 'yield'); if (dLine < 3) hold = true; c.waitingFor = blocker; } else c.waitingFor = null;
        }
        // Do not enter a junction whose exit is jammed.
        if (dLine < 6 && dLine > -1) {
          const k = net.connector(c.M, c.lane);
          for (const o of cars) if (o !== c && !o.junc && o.e === c.next.e && o.dir === c.next.dir && o.v < 0.8 && Math.hypot(o.x - k.x1, o.z - k.z1) < 7.5) { cap(0, 'jam'); hold = true; }
        }
        if (c.next.turn === 'left') c.ind = r < 45 ? -1 : c.ind; else if (c.next.turn === 'right') c.ind = r < 45 ? 1 : c.ind;
      } else if (!c.next && r < 30) {
        cap(plan(r - 4, 0), 'deadend');                           // dead end: stop and get removed
        if (c.v < 0.5 && r < 8) { c.dead = true; return; }
      }
      // Pedestrian crossings on this edge.
      for (const x of net.crossingsOn(e)) {
        const d = (c.dir > 0 ? x.s - c.s : c.s - x.s) - c.len / 2;
        if (d < 0 || d > 45) continue;
        for (const p of peds) {
          if (p.c !== x.id) continue;
          if (p.state === 'cross' || (p.state === 'wait' && !x.signal && d - 2.5 > (c.v * c.v) / (2 * 3.2))) cap(d < 2.6 ? 0 : plan(d - 2.6, 0), 'ped');
        }
      }
      // Drift to the wanted lane.
      if (c.laneF !== c.lane) { const step = 0.45 * dt * (c.v > 1 ? 1 : 0); c.laneF += Math.max(-step, Math.min(step, c.lane - c.laneF)); if (Math.abs(c.lane - c.laneF) > 0.2 && c.ind === 0) c.ind = c.lane > c.laneF ? 1 : -1; }
    }

    // Keep clear of whatever is ahead.
    ahead(c, c.x, c.z, c.h, c.len, 10 + c.v * 3.2, c.wid / 2, A);
    if (A.gap < Infinity) {
      const safe = A.gap < 2.2 ? 0 : Math.sqrt(2 * COMFORT * (A.gap - 2.2)) + A.v * 0.92;
      cap(safe, A.who && A.who.isTram ? 'tram' : A.who && A.who.isPlayer ? 'player' : A.who && A.who.state ? 'pedAhead' : 'gap');
      if (A.who && A.who.isPlayer && A.gap < 9) c.behindPlayer = true;
    }

    const dv = target - c.v;
    c.a = dv > 0 ? Math.min(2.1, dv / 0.9) : Math.max(-7.5, dv / 0.3);
    c.v = Math.max(0, c.v + c.a * dt);
    c.brake = c.a < -0.7 || (c.v < 0.2 && target < 0.2);
    if (c.v < 0.3) { c.waitT += dt; c.blockedT += dt; } else { c.waitT = 0; c.blockedT = 0; }

    // Advance.
    let d = c.v * dt;
    if (c.junc) {
      c.junc.u += d / c.junc.L;
      if (c.junc.u >= 1) {
        const k = c.junc.conn, out = c.junc.M.out;
        const s0 = k.outEnd ? net.len[out] - net.trim[out * 2 + k.outEnd] : net.trim[out * 2 + k.outEnd];
        enterEdge(c, out, k.dirOut, s0, k.laneOut);
      }
    } else {
      c.s += d * c.dir;
      const r = rem(c), isJ = net.isJunction(node);
      const trim = isJ ? net.trim[e * 2 + end] : 0;
      if (r <= trim) {
        if (!c.next) { c.dead = true; return; }
        if (isJ && !hold) {
          const M = { e, end, out: c.next.e };
          const lane = Math.round(c.laneF);
          const nOut = Math.max(1, net.lanes(c.next.e, c.next.dir));
          const laneOut = c.next.turn === 'left' ? 0 : c.next.turn === 'right' ? nOut - 1 : Math.min(nOut - 1, Math.max(0, nOut - (net.lanes(e, c.dir) - lane)));
          const conn = net.connector(M, lane, laneOut);
          let L = 0, px = conn.x0, pz = conn.z0;
          for (let i = 1; i <= 8; i++) { const u = i / 8, w = 1 - u; const x = w * w * conn.x0 + 2 * w * u * conn.cx + u * u * conn.x1, z = w * w * conn.z0 + 2 * w * u * conn.cz + u * u * conn.z1; L += Math.hypot(x - px, z - pz); px = x; pz = z; }
          const turn = c.next.turn;
          c.junc = { node, M, conn, u: 0, L: Math.max(1, L), turn, vmax: turn === 'straight' ? net.speed(c.next.e) * c.vmax : turn === 'right' ? 5.2 : 6.2 };
        } else if (isJ) { c.s = c.dir > 0 ? net.len[e] - trim : trim; c.v = 0; }
        else enterEdge(c, c.next.e, c.next.dir, c.next.dir > 0 ? 0 : net.len[c.next.e], Math.round(c.laneF));
      }
    }
    place(c);
  }

  // -------------------------------------------------------------------------------------- trams
  function spawnTram(player, near) {
    if (!nT) return false;
    for (let tries = 0; tries < 12; tries++) {
      const i = rng.int(nT);
      if (tramLen[i] < 40) continue;
      const s = rng.range(20, tramLen[i] - 5);
      tramPos(i, s, P);
      const d = Math.hypot(P.x - player.x, P.z - player.z);
      if (d > 340 || d < (near ? 60 : 190)) continue;
      if (trams.some((o) => Math.hypot(o.x - P.x, o.z - P.z) < 110)) continue;
      const tram = { id: nextId++, edge: i, prev: -1, s, v: TRAM_V * 0.6, x: P.x, z: P.z, h: P.h, dwell: 0, stopKey: '', brakeForPlayer: 0, bodies: [] };
      for (let b = 0; b < 2; b++) tram.bodies.push({ owner: tram, isTram: true, x: P.x, z: P.z, h: P.h, v: 0, len: TRAM_LEN, wid: 2.5 });
      placeTram(tram);
      trams.push(tram);
      return true;
    }
    return false;
  }
  function tramAt(tram, back, out) {
    const s = tram.s - back;
    if (s >= 0 || tram.prev < 0) return tramPos(tram.edge, s, out);
    return tramPos(tram.prev, tramLen[tram.prev] + s, out);
  }
  function placeTram(tram) {
    tramAt(tram, 0, P); tram.x = P.x; tram.z = P.z; tram.h = P.h;
    tram.bodies.forEach((b, i) => {
      const off = i * (TRAM_LEN + TRAM_GAP);
      tramAt(tram, off + 1.5, P); tramAt(tram, off + TRAM_LEN - 1.5, Q);
      b.x = (P.x + Q.x) / 2; b.z = (P.z + Q.z) / 2; b.h = headingOf(P.x - Q.x, P.z - Q.z); b.v = tram.v;
    });
  }
  function stepTram(tram, dt, t, player) {
    let target = TRAM_V;
    const i = tram.edge;
    for (const st of T.stops[i] || []) {
      const d = st - tram.s, key = `${i}:${st}`;
      if (d < -1 || d > 60 || tram.stopKey === key) continue;
      target = Math.min(target, Math.sqrt(2 * 1.1 * Math.max(0, d)));
      if (d < 0.8 && tram.v < 0.3) { tram.dwell += dt; if (tram.dwell > 9) { tram.stopKey = key; tram.dwell = 0; } }
    }
    for (const l of tramLines[i]) {
      const d = l.s - tram.s;
      if (d < -1 || d > 60) continue;
      const st = net.signalState(l.ctrlId, l.phase, t);
      if (st === SIG.GREEN || (st === SIG.AMBER && d < tram.v * tram.v / 2.4)) continue;
      target = Math.min(target, Math.sqrt(2 * 1.2 * Math.max(0, d - 1)));
    }
    ahead(tram, tram.x, tram.z, tram.h, 0, 14 + tram.v * 3.5, 1.3, A);
    tram.brakeForPlayer = 0;
    if (A.gap < Infinity) {
      const safe = A.gap < 3 ? 0 : Math.sqrt(2 * 1.3 * (A.gap - 3)) + A.v * 0.9;
      if (safe < tram.v && A.who && A.who.isPlayer) tram.brakeForPlayer = (tram.v * tram.v - safe * safe) / (2 * Math.max(0.5, A.gap));   // deceleration the tram needs
      target = Math.min(target, safe);
    }
    const dv = target - tram.v;
    tram.v = Math.max(0, tram.v + (dv > 0 ? Math.min(1.0, dv) : Math.max(-3.2, dv / 0.3)) * dt);
    tram.s += tram.v * dt;
    if (tram.s >= tramLen[i]) {
      const opts = tramNext.get(T.b[i]);
      if (!opts || !opts.length) { tram.dead = true; return; }
      tram.s -= tramLen[i]; tram.prev = i; tram.edge = opts[rng.int(opts.length)];
    }
    placeTram(tram);
  }

  // -------------------------------------------------------------------------------- pedestrians
  function spawnPed(player, near) {
    const list = net.crossings;
    if (!list.length) return false;
    for (let tries = 0; tries < 10; tries++) {
      const ang = rng.range(0, Math.PI * 2), r = near ? rng.range(30, 150) : rng.range(50, 170);
      const hit = net.nearest(player.x + Math.sin(ang) * r, player.z - Math.cos(ang) * r, 45, (e) => net.crossingsOn(e).length > 0 && net.rank[e] >= 1);
      if (!hit) continue;
      const xs = net.crossingsOn(hit.e);
      const x = xs[rng.int(xs.length)];
      if (peds.some((p) => p.c === x.id)) continue;
      if (Math.hypot(x.x - player.x, x.z - player.z) < 28) continue;
      const kerb = net.width[x.e] / 2 + 0.7;
      peds.push({ id: nextId++, c: x.id, cross: x, side: rng.chance(0.5) ? 1 : -1, q: -(kerb + rng.range(3, 9)), kerb, speed: rng.range(1.15, 1.5), state: 'approach', waited: 0, x: 0, z: 0, h: 0, phase: rng.next(), arrivedD: Infinity });
      return true;
    }
    return false;
  }
  // Is it safe for a pedestrian to step onto this zebra crossing?
  function crossingClear(x, player) {
    const dx = Math.sin(x.h), dz = -Math.cos(x.h);
    for (const m of movers) {
      if (m.owner) continue;
      const rx = m.x - x.x, rz = m.z - x.z;
      const alongRoad = rx * dx + rz * dz, side = Math.abs(rx * -dz + rz * dx);
      if (side > net.width[x.e] / 2 + 1.5 || Math.abs(alongRoad) > 50) continue;
      const mh = m.h !== undefined ? m.h : m.heading, mv = m.v !== undefined ? m.v : m.speed;
      const vAlong = (Math.sin(mh) * dx + -Math.cos(mh) * dz) * mv;       // + = moving along +dir
      const closing = alongRoad < 0 ? vAlong : -vAlong;
      const dist = Math.abs(alongRoad) - 2.5;
      if (dist < 0) return false;                                          // a vehicle is on the crossing
      if (closing < 0.5) continue;                                         // standing or moving away
      if (dist < closing * 4 + 6) return false;
    }
    return true;
  }
  function stepPed(p, dt, t, player) {
    const x = p.cross;
    const rxv = Math.cos(x.h), rzv = Math.sin(x.h);                        // unit vector to the right of the road direction
    if (p.state === 'approach') {
      p.q += p.speed * dt;
      if (p.q >= -p.kerb) { p.q = -p.kerb; p.state = 'wait'; p.waited = 0; }
    } else if (p.state === 'wait') {
      p.waited += dt;
      const go = x.signal ? net.pedWalk(x.ctrlId, x.phase, t) && crossingClear(x, player) : p.waited > 0.5 && crossingClear(x, player);
      if (go) p.state = 'cross';
      else if (p.waited > 40) p.dead = true;
    } else {
      p.q += p.speed * dt;
      if (p.state === 'cross' && p.q > p.kerb) p.state = 'leave';
      if (p.q > p.kerb + 7) p.dead = true;
    }
    const lat = p.q * p.side;
    p.x = x.x + rxv * lat; p.z = x.z + rzv * lat;
    p.h = x.h + (p.side > 0 ? Math.PI / 2 : -Math.PI / 2);
    if (p.state !== 'wait') p.phase = (p.phase + dt * 1.8) % 1;
  }

  // --------------------------------------------------------------------------------------- step
  let primed = false;
  function step(dt, t, player, playerLoc) {
    player.isPlayer = true;
    if (!primed) {
      primed = true;
      for (let i = 0; i < 200 && cars.length < want.cars; i++) spawnCar(player, true);
      for (let i = 0; i < 20 && trams.length < want.trams; i++) spawnTram(player, true);
      for (let i = 0; i < 40 && peds.length < want.peds; i++) spawnPed(player, true);
    }
    if (cars.length < want.cars && rng.chance(dt * 1.5)) spawnCar(player, false);
    if (trams.length < want.trams && rng.chance(dt * 0.4)) spawnTram(player, false);
    if (peds.length < want.peds && rng.chance(dt * 0.6)) spawnPed(player, false);
    collectMovers(player);
    for (const c of cars) { c.behindPlayer = false; stepCar(c, dt, t, player, playerLoc); if (Math.hypot(c.x - player.x, c.z - player.z) > SIM_R + 30 || c.blockedT > 45) c.dead = true; }
    for (const tr of trams) { stepTram(tr, dt, t, player); if (Math.hypot(tr.x - player.x, tr.z - player.z) > SIM_R + 120) tr.dead = true; }
    for (const p of peds) { stepPed(p, dt, t, player); if (Math.hypot(p.x - player.x, p.z - player.z) > SIM_R - 60) p.dead = true; }
    for (const list of [cars, trams, peds]) for (let i = list.length - 1; i >= 0; i--) if (list[i].dead) list.splice(i, 1);
  }

  // Copies positions into the renderer's frame arrays.
  function fill(frame) {
    const C = frame.cars, Tm = frame.trams, Pd = frame.peds;
    let n = 0;
    for (const c of cars) {
      if (n >= C.x.length) break;
      C.x[n] = c.x; C.z[n] = c.z; C.heading[n] = c.h; C.variant[n] = c.variant; C.colour[n] = c.colour;
      C.state[n] = (c.brake ? 1 : 0) | (c.ind < 0 ? 2 : 0) | (c.ind > 0 ? 4 : 0) | 8;
      n++;
    }
    C.n = n; n = 0;
    for (const tr of trams) for (const b of tr.bodies) { if (n >= Tm.x.length) break; Tm.x[n] = b.x; Tm.z[n] = b.z; Tm.heading[n] = b.h; n++; }
    Tm.n = n; n = 0;
    for (const p of peds) { if (n >= Pd.x.length) break; Pd.x[n] = p.x; Pd.z[n] = p.z; Pd.heading[n] = p.h; Pd.phase[n] = p.phase; n++; }
    Pd.n = n;
  }

  return { cars, trams, peds, step, fill, approach, crossingClear, AP: () => ({ n: 0, M: [], t: 0, stopped: false }) };
}
