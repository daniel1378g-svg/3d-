// The road network at run time: geometry queries, lanes, controls, signals and priority.
// Built from data/graph.pack (see tools/steps/10-graph.mjs). No DOM, no three.js.
import { headingOf, angDiff, HALF } from '../data/geo.js';

export const CTRL = { NONE: 0, EQUAL: 1, PRIORITY: 2, GIVE_WAY: 3, STOP: 4, SIGNAL: 5, ROUNDABOUT: 6, EXIT: 7 };
export const FLAG = { ONEWAY: 1, ROUNDABOUT: 2, BRIDGE: 4, TUNNEL: 8, LINK: 16, LIMITED: 32, NARROW: 64, ZONE: 128 };
export const SIG = { RED: 0, RED_AMBER: 1, GREEN: 2, AMBER: 3 };
const AMBER = 3, ALL_RED = 2, RED_AMBER = 2;
const CELL = 60;

// How strongly an arrival may insist on going first. Equal numbers settle it by position.
const STRENGTH = [3, 2, 3, 1, 1, 3, 3, 0];   // indexed by CTRL

export class RoadNet {
  constructor({ meta, buf }) {
    this.meta = meta;
    const N = buf.nodeX.length, E = buf.edgeA.length, P = buf.ptX.length;
    this.N = N; this.E = E;
    this.nodeX = new Float32Array(N); this.nodeZ = new Float32Array(N);
    for (let i = 0; i < N; i++) { this.nodeX[i] = buf.nodeX[i] / 8; this.nodeZ[i] = buf.nodeZ[i] / 8; }
    this.ptX = new Float32Array(P); this.ptZ = new Float32Array(P); this.ptS = new Float32Array(P);
    for (let i = 0; i < P; i++) { this.ptX[i] = buf.ptX[i] / 8; this.ptZ[i] = buf.ptZ[i] / 8; }
    this.edgeA = buf.edgeA; this.edgeB = buf.edgeB; this.edgePt = buf.edgePt;
    this.rank = buf.edgeRank; this.flags = buf.edgeFlags; this.lanesF = buf.edgeLanesF; this.lanesB = buf.edgeLanesB;
    this.speedKmh = buf.edgeSpeed; this.nameIdx = buf.edgeName; this.surface = buf.edgeSurface; this.layer = buf.edgeLayer;
    this.living = buf.edgeLiving; this.ctrl = buf.ctrl;
    this.width = new Float32Array(E); this.len = new Float32Array(E);
    this.trim = new Float32Array(E * 2); this.lineD = new Float32Array(E * 2);
    for (let e = 0; e < E; e++) {
      this.width[e] = buf.edgeWidth[e] / 10;
      let s = 0;
      const p0 = this.edgePt[e], p1 = this.edgePt[e + 1];
      this.ptS[p0] = 0;
      for (let p = p0 + 1; p < p1; p++) { s += Math.hypot(this.ptX[p] - this.ptX[p - 1], this.ptZ[p] - this.ptZ[p - 1]); this.ptS[p] = s; }
      this.len[e] = s;
      for (const end of [0, 1]) { this.trim[e * 2 + end] = buf.trim[e * 2 + end] / 10; this.lineD[e * 2 + end] = buf.lineD[e * 2 + end] / 10; }
    }
    // Arms around each node, sorted clockwise by the heading that leaves the node.
    this.arms = Array.from({ length: N }, () => []);
    for (let e = 0; e < E; e++) {
      this.arms[this.edgeA[e]].push({ e, end: 0, h: this._outHeading(e, 0) });
      this.arms[this.edgeB[e]].push({ e, end: 1, h: this._outHeading(e, 1) });
    }
    for (const a of this.arms) a.sort((p, q) => p.h - q.h);

    // Stop and give-way lines per edge and direction, in travel order.
    this.lines = [];
    this._lines = new Map();
    for (let i = 0; i < buf.lineEdge.length; i++) {
      const l = { id: i, e: buf.lineEdge[i], s: buf.lineS[i], dir: buf.lineDir[i], kind: buf.lineKind[i], ctrlId: buf.lineCtrl[i], phase: buf.linePhase[i], node: buf.lineNode[i] };
      this.lines.push(l);
      const key = l.e * 2 + (l.dir > 0 ? 1 : 0);
      if (!this._lines.has(key)) this._lines.set(key, []);
      this._lines.get(key).push(l);
    }
    for (const [key, arr] of this._lines) arr.sort((p, q) => (key & 1 ? p.s - q.s : q.s - p.s));
    this.crossings = [];
    this._cross = new Map();
    for (let i = 0; i < buf.crossEdge.length; i++) {
      const c = { id: i, e: buf.crossEdge[i], s: buf.crossS[i], signal: buf.crossSignal[i] === 1, ctrlId: buf.crossCtrl[i], phase: buf.crossPhase[i] };
      const p = this.pos(c.e, c.s);
      c.x = p.x; c.z = p.z; c.h = headingOf(p.dx, p.dz);
      this.crossings.push(c);
      if (!this._cross.has(c.e)) this._cross.set(c.e, []);
      this._cross.get(c.e).push(c);
    }
    this.controllers = meta.controllers;
    this.signs = { x: buf.signX, z: buf.signZ, h: buf.signH, code: buf.signCode, level: buf.signLevel, codes: meta.signCodes };
    this.rails = meta.rails.map(([e, s]) => ({ e, s }));
    this.bumps = meta.bumps.map(([e, s]) => ({ e, s }));
    this._railOn = new Map();
    for (const r of this.rails) { if (!this._railOn.has(r.e)) this._railOn.set(r.e, []); this._railOn.get(r.e).push(r); }
    this._restrict = new Map();
    for (const [from, node, to, only] of meta.restrictions) {
      const key = `${from}:${node}`;
      if (!this._restrict.has(key)) this._restrict.set(key, { no: new Set(), only: new Set() });
      this._restrict.get(key)[only ? 'only' : 'no'].add(to);
    }
    this.turnLanes = meta.turns;
    this.places = meta.places;
    this.tram = {
      pt: buf.tramPt, x: Float32Array.from(buf.tramX, (v) => v / 8), z: Float32Array.from(buf.tramZ, (v) => v / 8),
      a: buf.tramA, b: buf.tramB, stops: meta.tramEdgeStops, stopList: meta.tramStops,
    };
    this.rail = { pt: buf.railPt, x: Float32Array.from(buf.railX, (v) => v / 8), z: Float32Array.from(buf.railZ, (v) => v / 8) };
    this._buildGrid();
    this._conflict = new Map();
  }

  // ---- basic attributes -------------------------------------------------------------------------
  name(e) { return this.meta.names[this.nameIdx[e]]; }
  oneway(e) { return (this.flags[e] & FLAG.ONEWAY) !== 0; }
  roundabout(e) { return (this.flags[e] & FLAG.ROUNDABOUT) !== 0; }
  speed(e) { return this.speedKmh[e] / 3.6; }
  lanes(e, dir) { return dir > 0 ? this.lanesF[e] : this.lanesB[e]; }
  laneWidth(e) { return this.width[e] / Math.max(1, this.lanesF[e] + this.lanesB[e]); }
  nodeOf(e, end) { return end ? this.edgeB[e] : this.edgeA[e]; }
  canArrive(e, end) { return !this.oneway(e) || end === 1; }
  canLeave(e, end) { return !this.oneway(e) || end === 0; }
  isJunction(n) { return this.arms[n].length >= 3; }
  ctrlAt(e, end) { return this.ctrl[e * 2 + end]; }

  // ---- geometry ---------------------------------------------------------------------------------
  // Point on the centre line at distance s from node a. dx, dz = unit tangent in a -> b direction.
  pos(e, s, out = {}) {
    const p0 = this.edgePt[e], p1 = this.edgePt[e + 1] - 1;
    const S = this.ptS;
    if (s <= 0) s = 0; else if (s > S[p1]) s = S[p1];
    let lo = p0, hi = p1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (S[mid] <= s) lo = mid; else hi = mid; }
    const seg = S[hi] - S[lo] || 1, f = (s - S[lo]) / seg;
    const ax = this.ptX[lo], az = this.ptZ[lo], bx = this.ptX[hi], bz = this.ptZ[hi];
    out.x = ax + (bx - ax) * f; out.z = az + (bz - az) * f;
    out.dx = (bx - ax) / seg; out.dz = (bz - az) / seg;
    return out;
  }
  // Offset of a lane centre to the right of the a -> b centre line. Lane 0 is the leftmost lane
  // of its direction (next to the oncoming traffic), as in OSM turn:lanes.
  laneOffset(e, dir, lane) {
    const lw = this.laneWidth(e), W = this.width[e], divider = -W / 2 + this.lanesB[e] * lw;
    return dir > 0 ? divider + (lane + 0.5) * lw : divider - (lane + 0.5) * lw;
  }
  // Lane centre at s (still measured from node a), with the heading of travel.
  lanePos(e, dir, lane, s, out = {}) {
    this.pos(e, s, out);
    const off = this.laneOffset(e, dir, lane);
    out.x += -out.dz * off; out.z += out.dx * off;
    out.h = headingOf(out.dx * dir, out.dz * dir);
    return out;
  }
  _outHeading(e, end) {
    const d = Math.min(8, this.len[e] / 2);
    const p = this.pos(e, end ? this.len[e] : 0), q = this.pos(e, end ? this.len[e] - d : d);
    return headingOf(q.x - p.x, q.z - p.z);
  }
  _buildGrid() {
    const n = Math.ceil((2 * (HALF + 120)) / CELL);
    this._gn = n;
    const cells = new Map();
    const idx = (v) => Math.max(0, Math.min(n - 1, Math.floor((v + HALF + 120) / CELL)));
    for (let e = 0; e < this.E; e++) {
      const pad = this.width[e] / 2 + 2;
      for (let p = this.edgePt[e]; p < this.edgePt[e + 1] - 1; p++) {
        const x0 = idx(Math.min(this.ptX[p], this.ptX[p + 1]) - pad), x1 = idx(Math.max(this.ptX[p], this.ptX[p + 1]) + pad);
        const z0 = idx(Math.min(this.ptZ[p], this.ptZ[p + 1]) - pad), z1 = idx(Math.max(this.ptZ[p], this.ptZ[p + 1]) + pad);
        for (let gz = z0; gz <= z1; gz++) for (let gx = x0; gx <= x1; gx++) {
          const key = gz * n + gx;
          let arr = cells.get(key);
          if (!arr) cells.set(key, (arr = []));
          arr.push(e, p);
        }
      }
    }
    this._cells = cells;
    this._idx = idx;
  }
  // Nearest point on any edge. Returns { e, s, d, dist } with d = signed offset to the right of
  // a -> b, or null when nothing lies within maxD. `filter(e)` can exclude edges.
  nearest(x, z, maxD = 40, filter = null) {
    const n = this._gn, gx = this._idx(x), gz = this._idx(z);
    const r = Math.max(1, Math.ceil(maxD / CELL));
    let best = null, bestD = maxD;
    for (let cz = Math.max(0, gz - r); cz <= Math.min(n - 1, gz + r); cz++) for (let cx = Math.max(0, gx - r); cx <= Math.min(n - 1, gx + r); cx++) {
      const arr = this._cells.get(cz * n + cx);
      if (!arr) continue;
      for (let i = 0; i < arr.length; i += 2) {
        const e = arr[i], p = arr[i + 1];
        if (filter && !filter(e)) continue;
        const ax = this.ptX[p], az = this.ptZ[p], bx = this.ptX[p + 1], bz = this.ptZ[p + 1];
        const vx = bx - ax, vz = bz - az, L2 = vx * vx + vz * vz || 1;
        let f = ((x - ax) * vx + (z - az) * vz) / L2;
        f = f < 0 ? 0 : f > 1 ? 1 : f;
        const px = ax + vx * f, pz = az + vz * f, d = Math.hypot(x - px, z - pz);
        if (d < bestD) {
          bestD = d;
          const L = Math.sqrt(L2);
          best = best || {};
          best.e = e; best.s = this.ptS[p] + f * L; best.dist = d;
          best.d = ((x - ax) * -vz + (z - az) * vx) / L;        // + = right of a -> b
        }
      }
    }
    return best;
  }
  // Every edge with a point within maxD, closest point per edge: [{ e, s, d, dist }].
  candidates(x, z, maxD = 20) {
    const n = this._gn, gx = this._idx(x), gz = this._idx(z);
    const found = new Map();
    for (let cz = Math.max(0, gz - 1); cz <= Math.min(n - 1, gz + 1); cz++) for (let cx = Math.max(0, gx - 1); cx <= Math.min(n - 1, gx + 1); cx++) {
      const arr = this._cells.get(cz * n + cx);
      if (!arr) continue;
      for (let i = 0; i < arr.length; i += 2) {
        const e = arr[i], p = arr[i + 1];
        const ax = this.ptX[p], az = this.ptZ[p], bx = this.ptX[p + 1], bz = this.ptZ[p + 1];
        const vx = bx - ax, vz = bz - az, L2 = vx * vx + vz * vz || 1;
        let f = ((x - ax) * vx + (z - az) * vz) / L2;
        f = f < 0 ? 0 : f > 1 ? 1 : f;
        const dist = Math.hypot(x - (ax + vx * f), z - (az + vz * f));
        if (dist > maxD) continue;
        const prev = found.get(e);
        if (prev && prev.dist <= dist) continue;
        const L = Math.sqrt(L2);
        found.set(e, { e, s: this.ptS[p] + f * L, dist, d: ((x - ax) * -vz + (z - az) * vx) / L, dx: vx / L, dz: vz / L });
      }
    }
    return [...found.values()];
  }
  // Is the point on a carriageway? Returns the nearest edge hit with `inJunction`, or null.
  onRoad(x, z, margin = 0) {
    const n = this._gn, gx = this._idx(x), gz = this._idx(z);
    let best = null, bestSlack = -Infinity;
    for (let cz = Math.max(0, gz - 1); cz <= Math.min(n - 1, gz + 1); cz++) for (let cx = Math.max(0, gx - 1); cx <= Math.min(n - 1, gx + 1); cx++) {
      const arr = this._cells.get(cz * n + cx);
      if (!arr) continue;
      for (let i = 0; i < arr.length; i += 2) {
        const e = arr[i], p = arr[i + 1];
        const ax = this.ptX[p], az = this.ptZ[p], bx = this.ptX[p + 1], bz = this.ptZ[p + 1];
        const vx = bx - ax, vz = bz - az, L2 = vx * vx + vz * vz || 1;
        let f = ((x - ax) * vx + (z - az) * vz) / L2;
        f = f < 0 ? 0 : f > 1 ? 1 : f;
        const d = Math.hypot(x - (ax + vx * f), z - (az + vz * f));
        const slack = this.width[e] / 2 + margin - d;
        if (slack > bestSlack) { bestSlack = slack; best = { e, s: this.ptS[p] + f * Math.sqrt(L2), slack }; }
      }
    }
    if (!best) return null;
    // Junction mouths are wider than the ribbons: accept anything inside the trim circle.
    const e = best.e;
    let inJunction = false;
    for (const end of [0, 1]) {
      const node = this.nodeOf(e, end);
      if (this.arms[node].length < 3) continue;
      const r = this.junctionRadius(node);
      if (Math.hypot(x - this.nodeX[node], z - this.nodeZ[node]) <= r + margin) { inJunction = true; best.node = node; }
    }
    if (bestSlack < 0 && !inJunction) return null;
    best.inJunction = inJunction;
    return best;
  }
  junctionRadius(node) {
    let r = 0;
    for (const a of this.arms[node]) r = Math.max(r, this.trim[a.e * 2 + a.end]);
    return r;
  }

  // ---- travel -----------------------------------------------------------------------------------
  linesOn(e, dir) { return this._lines.get(e * 2 + (dir > 0 ? 1 : 0)) || EMPTY; }
  crossingsOn(e) { return this._cross.get(e) || EMPTY; }
  railsOn(e) { return this._railOn.get(e) || EMPTY; }

  // Ways out of the node reached by travelling `dir` along e. Each: { e, dir, end, turn, angle, allowed }.
  turnsFrom(e, dir) {
    const key = e * 2 + (dir > 0 ? 1 : 0);
    if (!this._turns) this._turns = new Map();
    let out = this._turns.get(key);
    if (out) return out;
    out = [];
    const end = dir > 0 ? 1 : 0, node = this.nodeOf(e, end);
    const arms = this.arms[node];
    const inArm = arms.find((a) => a.e === e && a.end === end);
    const hIn = inArm.h + Math.PI;                               // heading of travel into the node
    const rule = this._restrict.get(`${e}:${node}`);
    for (const a of arms) {
      if (a === inArm && arms.length > 1) continue;              // no U-turns except at dead ends
      if (!this.canLeave(a.e, a.end)) continue;
      const angle = angDiff(a.h, hIn);                           // + = to the right
      const abs = Math.abs(angle);
      const turn = abs > 2.6 ? 'uturn' : abs < 0.5 ? 'straight' : angle > 0 ? 'right' : 'left';
      let allowed = true;
      if (rule) { if (rule.no.has(a.e)) allowed = false; if (rule.only.size && !rule.only.has(a.e)) allowed = false; }
      out.push({ e: a.e, dir: a.end ? -1 : 1, end: a.end, turn, angle, allowed, node });
    }
    // With several "straight" candidates keep the straightest as straight and label the rest.
    const straights = out.filter((o) => o.turn === 'straight');
    if (straights.length > 1) {
      straights.sort((p, q) => Math.abs(p.angle) - Math.abs(q.angle));
      for (const o of straights.slice(1)) o.turn = o.angle > 0 ? 'right' : 'left';
    }
    this._turns.set(key, out);
    return out;
  }

  // ---- signals ----------------------------------------------------------------------------------
  signalState(ctrlId, phase, t) {
    const c = this.controllers[ctrlId];
    if (!c) return SIG.GREEN;
    const g0 = c.green[0], g1 = c.green[1], T = g0 + g1 + 2 * (AMBER + ALL_RED);
    const tau = (((t + c.offset) % T) + T) % T;
    const start = phase === 0 ? 0 : g0 + AMBER + ALL_RED;
    const g = phase === 0 ? g0 : g1;
    const rel = (((tau - start) % T) + T) % T;
    if (rel < g) return SIG.GREEN;
    if (rel < g + AMBER) return SIG.AMBER;
    if (rel >= T - RED_AMBER) return SIG.RED_AMBER;
    return SIG.RED;
  }
  // Seconds until this phase turns green (0 when green now).
  timeToGreen(ctrlId, phase, t) {
    const c = this.controllers[ctrlId];
    if (!c) return 0;
    const g0 = c.green[0], g1 = c.green[1], T = g0 + g1 + 2 * (AMBER + ALL_RED);
    const tau = (((t + c.offset) % T) + T) % T;
    const start = phase === 0 ? 0 : g0 + AMBER + ALL_RED, g = phase === 0 ? g0 : g1;
    const rel = (((tau - start) % T) + T) % T;
    return rel < g ? 0 : T - rel;
  }
  // May pedestrians walk across the road guarded by this phase? They walk while it is red and
  // the other phase is green.
  pedWalk(ctrlId, phase, t) {
    return this.signalState(ctrlId, phase, t) === SIG.RED && this.signalState(ctrlId, 1 - phase, t) === SIG.GREEN;
  }

  // ---- priority ---------------------------------------------------------------------------------
  // Movement = { e, end, out } : arrives at the node along edge e (at its `end`), leaves by edge `out`.
  // Does A have to give way to B at their shared node? (Only meaningful if their paths conflict.)
  mustYield(A, B, t = 0) {
    const ca = this.ctrl[A.e * 2 + A.end], cb = this.ctrl[B.e * 2 + B.end];
    if (ca === CTRL.SIGNAL) { const l = this._signalLine(A); if (l && this.signalState(l.ctrlId, l.phase, t) !== SIG.GREEN) return true; }
    if (cb === CTRL.SIGNAL) { const l = this._signalLine(B); if (l && this.signalState(l.ctrlId, l.phase, t) === SIG.RED) return false; }
    const sa = STRENGTH[ca], sb = STRENGTH[cb];
    if (sa !== sb) return sa < sb;
    const node = this.nodeOf(A.e, A.end), arms = this.arms[node];
    const armA = arms.find((a) => a.e === A.e && a.end === A.end), armB = arms.find((a) => a.e === B.e && a.end === B.end);
    if (!armA || !armB) return false;
    const travel = armA.h + Math.PI;
    const rho = angDiff(armB.h, travel);                         // where B comes from, relative to A's travel
    const turnA = this._turnOf(A), turnB = this._turnOf(B);
    if (Math.abs(rho) <= 0.6) {                                  // oncoming
      if (turnA === 'left' && turnB !== 'left') return true;     // § 21: turning left gives way to oncoming
      if (turnA === 'uturn') return true;
      return false;
    }
    return rho > 0;                                              // from the right: give way
  }
  _turnOf(M) {
    const dir = M.end ? 1 : -1;
    const t = this.turnsFrom(M.e, dir).find((o) => o.e === M.out);
    return t ? t.turn : 'straight';
  }
  _signalLine(M) {
    const ls = this.linesOn(M.e, M.end ? 1 : -1);
    for (let i = ls.length - 1; i >= 0; i--) if (ls[i].kind === CTRL.SIGNAL) return ls[i];
    // The line can sit on an earlier edge of the approach; look one edge back.
    const node = this.nodeOf(M.e, M.end ? 0 : 1), arms = this.arms[node];
    if (arms.length === 2) {
      const prev = arms.find((a) => a.e !== M.e);
      if (prev) { const pl = this.linesOn(prev.e, prev.end ? 1 : -1); for (let i = pl.length - 1; i >= 0; i--) if (pl[i].kind === CTRL.SIGNAL) return pl[i]; }
    }
    return null;
  }
  // Path of a movement through its junction: quadratic curve from the entry lane to the exit lane.
  connector(M, laneIn = -1, laneOut = -1) {
    const dirIn = M.end ? 1 : -1, outEnd = this.edgeA[M.out] === this.nodeOf(M.e, M.end) && !(M.out === M.e && M.end === 0) ? 0 : 1;
    const dirOut = outEnd ? -1 : 1;
    const li = laneIn < 0 ? this.lanes(M.e, dirIn) - 1 : laneIn, lo = laneOut < 0 ? Math.max(0, this.lanes(M.out, dirOut) - 1) : laneOut;
    const ti = this.trim[M.e * 2 + M.end], to = this.trim[M.out * 2 + outEnd];
    const p0 = this.lanePos(M.e, dirIn, li, M.end ? this.len[M.e] - ti : ti);
    const p2 = this.lanePos(M.out, dirOut, lo, outEnd ? this.len[M.out] - to : to);
    // Control point: where the two lane lines meet; fall back to the midpoint for near-parallel lines.
    const d0x = Math.sin(p0.h), d0z = -Math.cos(p0.h), d2x = Math.sin(p2.h), d2z = -Math.cos(p2.h);
    const det = d0x * -d2z - d0z * -d2x;
    let cx = (p0.x + p2.x) / 2, cz = (p0.z + p2.z) / 2;
    if (Math.abs(det) > 0.2) {
      const u = ((p2.x - p0.x) * -d2z - (p2.z - p0.z) * -d2x) / det;
      const reach = Math.hypot(p2.x - p0.x, p2.z - p0.z);
      if (u > 0 && u < reach * 1.5) { cx = p0.x + d0x * u; cz = p0.z + d0z * u; }
    }
    return { x0: p0.x, z0: p0.z, cx, cz, x1: p2.x, z1: p2.z, h0: p0.h, h1: p2.h, dirOut, outEnd, laneOut: lo };
  }
  // Do two movements through the same node cross or merge?
  conflict(A, B) {
    if (A.e === B.e && A.end === B.end) return false;
    if (A.out === B.out) return true;
    const key = `${A.e}:${A.end}:${A.out}|${B.e}:${B.end}:${B.out}`;
    let v = this._conflict.get(key);
    if (v !== undefined) return v;
    const ca = this.connector(A), cb = this.connector(B);
    v = false;
    for (let i = 0; i <= 8 && !v; i++) {
      const t = i / 8, u = 1 - t;
      const ax = u * u * ca.x0 + 2 * u * t * ca.cx + t * t * ca.x1, az = u * u * ca.z0 + 2 * u * t * ca.cz + t * t * ca.z1;
      for (let j = 0; j <= 8; j++) {
        const s = j / 8, w = 1 - s;
        const bx = w * w * cb.x0 + 2 * w * s * cb.cx + s * s * cb.x1, bz = w * w * cb.z0 + 2 * w * s * cb.cz + s * s * cb.z1;
        if (Math.hypot(ax - bx, az - bz) < 2.4) { v = true; break; }
      }
    }
    this._conflict.set(key, v);
    return v;
  }
}

const EMPTY = Object.freeze([]);
