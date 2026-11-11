// Step 10: the road network and its traffic rules  ->  data/graph.pack
//
// Reads the OSM extract and writes everything the simulation needs to drive and to judge driving:
// edges with lanes, widths and speed limits; who has priority at every junction (from mapped
// signs and signals where OSM has them, inferred from road classes where it does not); traffic
// light controllers and their phases; pedestrian and rail crossings; turn restrictions; the sign
// list; the tram network; and the named start places.
//
// The layout of the pack is documented at the bottom of this file (see `meta.doc`), and
// src/js/sim/roadnet.js is the reader.
import { readRaw, writeSection } from '../lib/packio.mjs';
import { toXZ, HALF, headingOf, angDiff } from '../../src/js/data/geo.js';

// ---- constants shared with roadnet.js (keep in sync) -------------------------------------------
export const CTRL = { NONE: 0, EQUAL: 1, PRIORITY: 2, GIVE_WAY: 3, STOP: 4, SIGNAL: 5, ROUNDABOUT: 6, EXIT: 7 };
export const FLAG = { ONEWAY: 1, ROUNDABOUT: 2, BRIDGE: 4, TUNNEL: 8, LINK: 16, LIMITED: 32, NARROW: 64, ZONE: 128 };
const RANK = { motorway: 6, trunk: 6, primary: 5, secondary: 4, tertiary: 3, unclassified: 2, residential: 2, living_street: 1, service: 0 };
const SURFACE = { asphalt: 0, sett: 1, cobblestone: 1, 'cobblestone:flattened': 1, paving_stones: 2, concrete: 3, 'concrete:plates': 3 };
const NO_ACCESS = new Set(['no', 'private', 'permit', 'delivery', 'customers', 'agricultural', 'forestry', 'emergency', 'psv', 'customers;delivery', 'unknown', 'military']);
const NO_SERVICE = new Set(['driveway', 'parking_aisle', 'drive-through', 'emergency_access', 'spur', 'yard', 'crossover']);
const LIM = HALF + 60;                       // keep a little beyond the playable square

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };

function drivable(t) {
  let hw = t.highway;
  if (!hw || t.area === 'yes') return null;
  let link = false;
  if (hw.endsWith('_link')) { link = true; hw = hw.slice(0, -5); }
  if (!(hw in RANK)) return null;
  const acc = t.motor_vehicle || t.motorcar || t.vehicle || t.access;
  if (acc && NO_ACCESS.has(acc)) return null;
  if (hw === 'service' && NO_SERVICE.has(t.service)) return null;
  return { hw, link, rank: RANK[hw] };
}

function turnMask(str) {
  if (!str) return null;
  return str.split('|').map((lane) => {
    let m = 0;
    for (const p of lane.split(';')) {
      if (p === 'left' || p === 'slight_left' || p === 'sharp_left') m |= 1;
      else if (p === 'through' || p.startsWith('merge')) m |= 2;
      else if (p === 'right' || p === 'slight_right' || p === 'sharp_right') m |= 4;
      else if (p === 'reverse') m |= 8;
    }
    return m;
  });
}

function wayAttrs(t, d) {
  const acc = t.motor_vehicle || t.vehicle || t.access;
  const roundabout = t.junction === 'roundabout' || t.junction === 'circular';
  const reverse = t.oneway === '-1';
  const oneway = reverse || t.oneway === 'yes' || t.oneway === '1' || t.oneway === 'true' || roundabout || d.hw === 'motorway';
  const lanes = Math.round(num(t.lanes));
  let lf = Math.round(num(t['lanes:forward']));
  let lb = Math.round(num(t['lanes:backward']));
  let narrow = false;
  if (oneway) { lf = lanes || lf || 1; lb = 0; }
  else if (!lf && !lb) {
    if (lanes >= 2) { lb = Math.floor(lanes / 2); lf = lanes - lb; } else { lf = 1; lb = 1; narrow = lanes === 1; }
  } else {
    const total = lanes || 2;
    if (!lf) lf = Math.max(1, total - lb);
    if (!lb) lb = Math.max(1, total - lf);
  }
  lf = Math.min(4, lf); lb = Math.min(4, lb);
  if (reverse) [lf, lb] = [lf, 0];
  const lw = d.rank >= 4 ? 3.25 : d.rank === 3 ? 3.1 : d.rank === 0 ? 2.6 : 2.9;
  let width = (lf + lb) * lw;
  if (oneway && lf === 1) width = d.rank === 0 ? 3.4 : 3.8;
  if (narrow) width = 4.6;
  const tagged = num(t.width);
  if (tagged >= 3 && tagged >= (lf + lb) * 2.5 && tagged <= (lf + lb) * 4.6) width = tagged;

  let speed = num(t.maxspeed);
  const zone = /zone:?30|CZ:30/.test(`${t['maxspeed:type'] || ''} ${t['source:maxspeed'] || ''} ${t['zone:maxspeed'] || ''}`) || t['zone:maxspeed'] === '30';
  if (!speed) {
    if (d.hw === 'living_street') speed = 20;
    else if (zone) speed = 30;
    else if (d.hw === 'motorway' || d.hw === 'trunk') speed = 80;
    else if (d.hw === 'service') speed = 30;
    else speed = 50;
  }
  speed = Math.max(10, Math.min(130, speed));

  let flags = 0;
  if (oneway) flags |= FLAG.ONEWAY;
  if (roundabout) flags |= FLAG.ROUNDABOUT;
  if (t.bridge && t.bridge !== 'no') flags |= FLAG.BRIDGE;
  if (t.tunnel && t.tunnel !== 'no') flags |= FLAG.TUNNEL;
  if (d.link) flags |= FLAG.LINK;
  if (acc === 'destination') flags |= FLAG.LIMITED;
  if (narrow) flags |= FLAG.NARROW;
  if (zone && speed === 30) flags |= FLAG.ZONE;

  let turnF = turnMask(t['turn:lanes:forward'] || (oneway ? t['turn:lanes'] : null));
  let turnB = turnMask(t['turn:lanes:backward']);
  if (turnF && turnF.length !== lf) turnF = null;
  if (turnB && turnB.length !== lb) turnB = null;
  return {
    hw: d.hw, rank: d.rank, living: d.hw === 'living_street', oneway, reverse, lf, lb, lw: width / Math.max(1, lf + lb), width, speed, flags,
    name: t.name || '', surface: SURFACE[t.surface] || 0, layer: Math.round(num(t.layer)), turnF, turnB,
  };
}

// Position and tangent at distance s along a polyline with cumulative lengths.
function along(pts, cum, s) {
  s = Math.max(0, Math.min(cum[cum.length - 1], s));
  let i = 1;
  while (i < cum.length - 1 && cum[i] < s) i++;
  const a = pts[i - 1], b = pts[i];
  const seg = cum[i] - cum[i - 1] || 1;
  const f = (s - cum[i - 1]) / seg;
  return { x: a[0] + (b[0] - a[0]) * f, z: a[1] + (b[1] - a[1]) * f, dx: (b[0] - a[0]) / seg, dz: (b[1] - a[1]) / seg };
}

export default async function run() {
  const raw = readRaw();
  const P = new Map();
  const xz = (id) => {
    let p = P.get(id);
    if (p === undefined) {
      const n = raw.nodes[id];
      p = n ? toXZ(n[0], n[1]) : null;
      P.set(id, p);
    }
    return p;
  };
  const tagsOf = (id) => (raw.nodes[id] && raw.nodes[id][2]) || null;
  const inside = (p) => Math.abs(p[0]) <= LIM && Math.abs(p[1]) <= LIM;

  // ---- 1. drivable ways -> runs of nodes inside the area ---------------------------------------
  const runs = [];
  const wayRuns = new Map();                                     // OSM way id -> runs (for restrictions)
  for (const [wid, refs, t] of raw.ways) {
    const d = drivable(t);
    if (!d) continue;
    const A = wayAttrs(t, d);
    let cur = [];
    const flush = () => {
      if (cur.length >= 2) {
        const r = { wid, ids: A.reverse ? cur.slice().reverse() : cur, A, reversed: A.reverse };
        runs.push(r);
        if (!wayRuns.has(wid)) wayRuns.set(wid, []);
        wayRuns.get(wid).push(r);
      }
      cur = [];
    };
    for (const id of refs) { const p = xz(id); if (p && inside(p)) cur.push(id); else flush(); }
    flush();
  }
  const use = new Map();
  for (const r of runs) r.ids.forEach((id, i) => use.set(id, (use.get(id) || 0) + (i === 0 || i === r.ids.length - 1 ? 2 : 1)));

  // ---- 2. nodes and edges -----------------------------------------------------------------------
  const nodeIndex = new Map();
  const nodes = [];                                              // { x, z, osm, arms: [] }
  const nodeOf = (id) => {
    let i = nodeIndex.get(id);
    if (i === undefined) { const p = xz(id); i = nodes.length; nodes.push({ x: p[0], z: p[1], osm: id, arms: [] }); nodeIndex.set(id, i); }
    return i;
  };
  const edges = [];
  const usedCrossing = new Set();
  for (const r of runs) {
    let start = 0;
    r.edges = [];
    for (let i = 1; i < r.ids.length; i++) {
      if (use.get(r.ids[i]) < 2 && i !== r.ids.length - 1) continue;
      const ids = r.ids.slice(start, i + 1);
      start = i;
      const pts = [], keep = [];
      for (const id of ids) {
        const p = xz(id);
        if (pts.length && dist(pts[pts.length - 1], p) < 0.05) continue;
        pts.push(p); keep.push(id);
      }
      if (pts.length < 2) continue;
      const cum = [0];
      for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + dist(pts[k - 1], pts[k]));
      const len = cum[cum.length - 1];
      if (len < 0.5) continue;
      const e = { id: edges.length, a: nodeOf(ids[0]), b: nodeOf(ids[ids.length - 1]), pts, cum, len, A: r.A, wid: r.wid, feats: [] };
      // Mapped features on the way's interior nodes.
      for (let k = 0; k < keep.length; k++) {
        const t = tagsOf(keep[k]);
        if (!t) continue;
        const interior = k > 0 && k < keep.length - 1;
        let dir = 0;
        const dtag = t['traffic_signals:direction'] || t.direction;
        if (dtag === 'forward') dir = r.reversed ? -1 : 1;
        else if (dtag === 'backward') dir = r.reversed ? 1 : -1;
        else if (dtag === 'both') dir = 2;
        if (r.A.oneway && dir !== 2) dir = 1;
        const f = (kind, extra = {}) => e.feats.push({ kind, s: cum[k], dir, osm: keep[k], ...extra });
        if (interior && (t.highway === 'give_way' || t.highway === 'stop')) f(t.highway);
        if (interior && t.highway === 'traffic_signals') f('signal', { ped: !!t.crossing });
        if ((t.highway === 'crossing' || t.railway === 'crossing') && !usedCrossing.has(keep[k])) {
          const c = t.crossing || '';
          if (!['unmarked', 'informal', 'no'].includes(c)) {
            usedCrossing.add(keep[k]);
            f('crossing', { signal: c === 'traffic_signals' || t['crossing:signals'] === 'yes' });
          }
        }
        if (t.railway === 'level_crossing' && !usedCrossing.has(`r${keep[k]}`)) { usedCrossing.add(`r${keep[k]}`); f('rail'); }
        if (interior && t.traffic_calming && ['bump', 'hump', 'table', 'cushion'].includes(t.traffic_calming)) f('bump');
      }
      edges.push(e);
      r.edges.push(e);
      nodes[e.a].arms.push({ e: e.id, end: 0 });
      nodes[e.b].arms.push({ e: e.id, end: 1 });
    }
  }
  const E = edges.length;
  const oneway = (e) => e.A.oneway;
  const canArrive = (e, end) => !oneway(e) || end === 1;        // traffic can reach this end's node along e
  const canLeave = (e, end) => !oneway(e) || end === 0;         // traffic can leave this end's node along e
  const endNode = (e, end) => (end ? e.b : e.a);
  // Heading of travel when leaving the node at `end` along the edge.
  const outHeading = (e, end) => {
    const d = Math.min(8, e.len / 2);
    const p0 = along(e.pts, e.cum, end ? e.len : 0);
    const p1 = along(e.pts, e.cum, end ? e.len - d : d);
    return headingOf(p1.x - p0.x, p1.z - p0.z);
  };
  for (const n of nodes) {
    for (const arm of n.arms) arm.h = outHeading(edges[arm.e], arm.end);
    n.arms.sort((p, q) => p.h - q.h);
  }

  // ---- 3. junction trims: where each arm clears its neighbours ----------------------------------
  const trim = new Float32Array(E * 2);
  for (const n of nodes) {
    const k = n.arms.length;
    if (k < 3) continue;
    for (let i = 0; i < k; i++) {
      const arm = n.arms[i], e = edges[arm.e], w = e.A.width / 2;
      let t = w * 0.6;
      for (const j of [(i + 1) % k, (i + k - 1) % k]) {
        const o = n.arms[j], wo = edges[o.e].A.width / 2;
        const phi = Math.abs(angDiff(arm.h, o.h));
        if (phi < 0.12) continue;                                // parallel arms never clear; ignore
        const need = phi > Math.PI - 0.12 ? 0 : (wo + w * Math.cos(phi)) / Math.sin(phi);
        t = Math.max(t, need);
      }
      trim[arm.e * 2 + arm.end] = Math.max(1.5, Math.min(t + 0.5, 22, e.len * 0.45));
    }
  }

  // Follow the road onward from an edge end through plain two-arm nodes. Calls visit(e, end, d)
  // for each edge end reached (d = metres from the start), stops at a real junction or at maxD.
  // Returns the junction node reached, or -1.
  function walkOnward(e, end, d0, maxD, visit) {
    let d = d0;
    for (let guard = 0; guard < 12; guard++) {
      if (visit) visit(e, end, d);
      const n = nodes[endNode(e, end)];
      if (n.arms.length >= 3) return endNode(e, end);
      if (n.arms.length !== 2) return -1;
      const next = n.arms.find((a) => !(a.e === e.id && a.end === end));
      const ne = edges[next.e];
      if (!canLeave(ne, next.end)) return -1;
      d += ne.len;
      if (d > maxD) return -1;
      e = ne; end = next.end ? 0 : 1;
    }
    return -1;
  }

  // ---- 4. controls --------------------------------------------------------------------------------
  const ctrl = new Uint8Array(E * 2);                            // rule for traffic arriving at edge end
  const explicit = new Uint8Array(E * 2);                        // 1 where a mapped sign/signal decided it
  const lineD = new Float32Array(E * 2);                         // stop/give-way line: metres before the node
  const lines = [];                                              // { e, dir, s, kind, ctrlId, phase, node }
  const sigItems = [];                                           // for clustering: { x, z, line|null, node }

  const addSignalLine = (e, dir, s, viaNode) => {
    const line = { e: e.id, dir, s, kind: CTRL.SIGNAL, ctrlId: -1, phase: 0, node: -1 };
    const end = dir > 0 ? 1 : 0;
    const d0 = dir > 0 ? e.len - s : s;
    line.node = walkOnward(e, end, d0, 70, (we, wend) => {
      ctrl[we.id * 2 + wend] = CTRL.SIGNAL; explicit[we.id * 2 + wend] = 1;
      if (we === e) lineD[we.id * 2 + wend] = d0;
    });
    lines.push(line);
    const p = along(e.pts, e.cum, s);
    sigItems.push({ x: p.x, z: p.z, line, node: viaNode });
    return line;
  };
  const signalised = new Set();                                  // `${edge}:${dir}` that already have a line
  // 4a. signals mapped on the approach (the usual way in Prague)
  for (const e of edges) {
    for (const f of e.feats) {
      if (f.kind !== 'signal') continue;
      let dirs = [];
      if (f.dir === 1 || f.dir === -1) dirs = [f.dir];
      else if (f.dir === 2 || f.ped) dirs = oneway(e) ? [1] : [1, -1];
      else {
        for (const dir of oneway(e) ? [1] : [1, -1]) {
          const d0 = dir > 0 ? e.len - f.s : f.s;
          if (d0 <= 70 && walkOnward(e, dir > 0 ? 1 : 0, d0, 70) >= 0) dirs.push(dir);
        }
        if (!dirs.length) dirs = oneway(e) ? [1] : [1, -1];
      }
      for (const dir of dirs) {
        if (dir < 0 && oneway(e)) continue;
        addSignalLine(e, dir, f.s, -1);
        signalised.add(`${e.id}:${dir}`);
      }
    }
  }
  // 4b. signals mapped on the junction node itself
  nodes.forEach((n, ni) => {
    const t = tagsOf(n.osm);
    if (!t || t.highway !== 'traffic_signals') return;
    let any = false;
    for (const arm of n.arms) {
      const e = edges[arm.e];
      if (!canArrive(e, arm.end)) continue;
      const dir = arm.end ? 1 : -1;
      if (n.arms.length < 3) {
        // A split point on a road: only an approach if a junction follows closely.
        const next = n.arms.find((a) => a !== arm);
        if (!next || !canLeave(edges[next.e], next.end)) continue;
        if (walkOnward(edges[next.e], next.end ? 0 : 1, edges[next.e].len, 70) < 0 && !t.crossing) continue;
      }
      if (signalised.has(`${e.id}:${dir}`)) continue;
      const d = Math.min(e.len * 0.45, Math.max(trim[arm.e * 2 + arm.end], 2));
      const line = addSignalLine(e, dir, arm.end ? e.len - d : d, ni);
      if (n.arms.length >= 3) line.node = ni;
      ctrl[e.id * 2 + arm.end] = CTRL.SIGNAL; explicit[e.id * 2 + arm.end] = 1; lineD[e.id * 2 + arm.end] = d;
      signalised.add(`${e.id}:${dir}`);
      any = true;
    }
    if (any) sigItems.push({ x: n.x, z: n.z, line: null, node: ni });
  });
  // 4c. controllers: signals within 45 m of each other work together
  const parent = sigItems.map((_, i) => i);
  const find = (i) => { while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; } return i; };
  {
    const cell = 45, grid = new Map();
    sigItems.forEach((it, i) => {
      const gx = Math.floor(it.x / cell), gz = Math.floor(it.z / cell);
      for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
        for (const j of grid.get(`${gx + dx},${gz + dz}`) || []) {
          if (Math.hypot(it.x - sigItems[j].x, it.z - sigItems[j].z) <= cell) parent[find(i)] = find(j);
        }
      }
      const key = `${gx},${gz}`;
      if (!grid.has(key)) grid.set(key, []);
      grid.get(key).push(i);
    });
  }
  const controllers = [];                                        // { x, z, phases, green: [..], offset }
  {
    const groups = new Map();
    sigItems.forEach((it, i) => { const r = find(i); if (!groups.has(r)) groups.set(r, []); groups.get(r).push(it); });
    for (const items of groups.values()) {
      const id = controllers.length;
      const ls = items.filter((it) => it.line).map((it) => it.line);
      if (!ls.length) continue;
      let axis = 0, best = -1;
      const heads = ls.map((l) => {
        const e = edges[l.e], p = along(e.pts, e.cum, l.s);
        const h = headingOf(p.dx * l.dir, p.dz * l.dir);
        if (e.A.rank + e.A.lf * 0.1 > best) { best = e.A.rank + e.A.lf * 0.1; axis = h; }
        return h;
      });
      let two = false;
      ls.forEach((l, i) => {
        let d = Math.abs(angDiff(heads[i], axis));
        if (d > Math.PI / 2) d = Math.PI - d;
        l.phase = d < Math.PI / 4 ? 0 : 1;
        if (l.phase) two = true;
        l.ctrlId = id;
      });
      const cx = items.reduce((s, it) => s + it.x, 0) / items.length;
      const cz = items.reduce((s, it) => s + it.z, 0) / items.length;
      // Two-phase junction, or a pedestrian signal where phase 1 is the walk phase.
      const green = two ? [best >= 4 ? 26 : 20, 16] : [34, 10];
      controllers.push({ x: Math.round(cx * 10) / 10, z: Math.round(cz * 10) / 10, phases: 2, ped: !two, green, offset: (id * 7919) % 53 });
    }
  }

  // 4d. mapped give-way and stop signs
  for (const e of edges) {
    for (const f of e.feats) {
      if (f.kind !== 'give_way' && f.kind !== 'stop') continue;
      let dir = f.dir === 1 || f.dir === -1 ? f.dir : 0;
      if (!dir) dir = oneway(e) ? 1 : (e.len - f.s <= f.s ? 1 : -1);
      if (dir < 0 && oneway(e)) continue;
      const end = dir > 0 ? 1 : 0, d0 = dir > 0 ? e.len - f.s : f.s;
      const kind = f.kind === 'stop' ? CTRL.STOP : CTRL.GIVE_WAY;
      walkOnward(e, end, d0, 60, (we, wend, d) => {
        const k = we.id * 2 + wend;
        if (ctrl[k] === CTRL.SIGNAL) return;
        if (nodes[endNode(we, wend)].arms.length >= 3) { ctrl[k] = kind; explicit[k] = 1; lineD[k] = we === e ? Math.min(d0, 12) : 0; }
      });
    }
  }

  // 4e. everything else: roundabouts, service exits, main/minor by road class, or right-hand rule
  const collinear = (a, b) => Math.PI - Math.abs(angDiff(a.h, b.h));           // 0 = perfectly straight through
  let nEqual = 0, nMain = 0;
  for (const n of nodes) {
    if (n.arms.length < 3) continue;
    const arms = n.arms.map((arm) => ({ ...arm, edge: edges[arm.e], k: arm.e * 2 + arm.end }));
    const inc = arms.filter((a) => canArrive(a.edge, a.end));
    const set = (a, c) => { if (!explicit[a.k]) ctrl[a.k] = c; };
    if (arms.some((a) => a.edge.A.flags & FLAG.ROUNDABOUT)) {
      for (const a of inc) set(a, a.edge.A.flags & FLAG.ROUNDABOUT ? CTRL.ROUNDABOUT : CTRL.GIVE_WAY);
      continue;
    }
    const rk = (a) => a.edge.A.rank - (a.edge.A.flags & FLAG.LINK ? 0.5 : 0);
    const real = arms.filter((a) => rk(a) >= 2);
    const minor = arms.filter((a) => rk(a) < 2);
    // Service roads and living streets always give way when they meet a real road (§ 23).
    if (real.length >= 1 && minor.length) for (const a of minor) if (canArrive(a.edge, a.end)) set(a, CTRL.EXIT);
    const pool = real.length ? real : arms;
    const hasSign = inc.some((a) => explicit[a.k] && (ctrl[a.k] === CTRL.GIVE_WAY || ctrl[a.k] === CTRL.STOP));
    const hasSignal = inc.some((a) => ctrl[a.k] === CTRL.SIGNAL);
    if (hasSign || hasSignal) {
      // A mapped sign or signal settles it: every other real arm is on the main road.
      for (const a of pool) if (canArrive(a.edge, a.end)) set(a, hasSign ? CTRL.PRIORITY : CTRL.NONE);
      if (hasSign) nMain++;
      continue;
    }
    if (pool.length < 3) { for (const a of pool) if (canArrive(a.edge, a.end)) set(a, real.length ? CTRL.NONE : CTRL.EQUAL); continue; }
    // The through road: the straightest pair, preferring the same street name and higher class.
    let pair = null, bestScore = Infinity;
    for (let i = 0; i < pool.length; i++) for (let j = i + 1; j < pool.length; j++) {
      const a = pool[i], b = pool[j];
      const score = collinear(a, b) - (a.edge.A.name && a.edge.A.name === b.edge.A.name ? 0.5 : 0) - 0.4 * (rk(a) + rk(b));
      if (score < bestScore) { bestScore = score; pair = [a, b]; }
    }
    const maxR = Math.max(...pool.map(rk));
    const others = pool.filter((a) => a !== pair[0] && a !== pair[1]);
    const pairMin = Math.min(rk(pair[0]), rk(pair[1]));
    const otherMax = Math.max(...others.map(rk));
    let mainMinor = false;
    if (maxR >= 3) mainMinor = true;                             // a classified road is signed as the main road
    else if (pairMin > otherMax) mainMinor = true;
    else if (pair[0].edge.A.speed >= 50 && pair[1].edge.A.speed >= 50 && others.every((a) => a.edge.A.speed <= 30)
      && pair[0].edge.A.name && pair[0].edge.A.name === pair[1].edge.A.name) mainMinor = true;
    if (mainMinor) {
      nMain++;
      for (const a of pool) if (canArrive(a.edge, a.end)) set(a, a === pair[0] || a === pair[1] ? CTRL.PRIORITY : CTRL.GIVE_WAY);
    } else {
      nEqual++;
      for (const a of pool) if (canArrive(a.edge, a.end)) set(a, CTRL.EQUAL);
    }
  }
  // Lines for every controlled arrival that is not a signal (signals already have theirs).
  for (const e of edges) for (const end of [0, 1]) {
    const k = e.id * 2 + end, c = ctrl[k];
    if (!c || c === CTRL.SIGNAL || c === CTRL.PRIORITY || c === CTRL.ROUNDABOUT || !canArrive(e, end)) continue;
    if (nodes[endNode(e, end)].arms.length < 3) continue;
    const d = Math.min(e.len * 0.45, Math.max(trim[k] + 0.3, lineD[k] || 0));
    lineD[k] = d;
    lines.push({ e: e.id, dir: end ? 1 : -1, s: end ? e.len - d : d, kind: c, ctrlId: -1, phase: 0, node: endNode(e, end) });
  }
  for (const e of edges) for (const end of [0, 1]) if (!lineD[e.id * 2 + end]) lineD[e.id * 2 + end] = trim[e.id * 2 + end];

  // ---- 5. crossings, rail crossings, bumps ------------------------------------------------------
  const crossings = [], rails = [], bumps = [];
  for (const e of edges) {
    for (const f of e.feats) {
      if (f.kind === 'crossing') {
        const p = along(e.pts, e.cum, f.s);
        let ctrlId = -1, phase = 0;
        if (f.signal) {
          // The controller whose line on this edge guards the crossing, else the nearest one.
          let bestD = 45;
          for (const l of lines) {
            if (l.kind !== CTRL.SIGNAL || l.ctrlId < 0) continue;
            const le = edges[l.e], lp = along(le.pts, le.cum, l.s);
            const d = Math.hypot(lp.x - p.x, lp.z - p.z) + (l.e === e.id ? 0 : 12);
            if (d < bestD) { bestD = d; ctrlId = l.ctrlId; phase = l.phase; }
          }
        }
        crossings.push({ e: e.id, s: f.s, signal: ctrlId >= 0 ? 1 : 0, ctrlId, phase });
      } else if (f.kind === 'rail') rails.push({ e: e.id, s: f.s });
      else if (f.kind === 'bump') bumps.push({ e: e.id, s: f.s });
    }
  }

  // ---- 6. turn restrictions ----------------------------------------------------------------------
  const restrictions = [];                                       // [fromEdge, node, toEdge, only(0|1)]
  const edgeOfWayAt = (wid, node) => {
    for (const r of wayRuns.get(wid) || []) for (const e of r.edges) if (e.a === node || e.b === node) return e;
    return null;
  };
  for (const [, members, t] of raw.rels) {
    if (t.type !== 'restriction' || !t.restriction) continue;
    const from = members.find((m) => m[2] === 'from' && m[0] === 'w');
    const to = members.find((m) => m[2] === 'to' && m[0] === 'w');
    const via = members.find((m) => m[2] === 'via' && m[0] === 'n');
    if (!from || !to || !via || !nodeIndex.has(via[1])) continue;
    const node = nodeIndex.get(via[1]);
    const fe = edgeOfWayAt(from[1], node), te = edgeOfWayAt(to[1], node);
    if (!fe || !te) continue;
    const kind = t.restriction;
    restrictions.push([fe.id, node, te.id, kind.startsWith('only_') ? 1 : 0, kind]);
  }

  // ---- 7. signs -----------------------------------------------------------------------------------
  const signs = [];                                              // { x, z, h, code, level }
  const signKey = new Set();
  const placeSign = (code, e, s, dir, { side = 1, level = 0, extra = 0 } = {}) => {
    s = Math.max(0.5, Math.min(e.len - 0.5, s));
    const p = along(e.pts, e.cum, s);
    const tx = p.dx * dir, tz = p.dz * dir;                      // direction of travel
    const off = (e.A.width / 2 + 1.1 + extra) * side;            // to the driver's right
    const x = p.x + -tz * off, z = p.z + tx * off;
    const key = `${code}:${Math.round(x / 3)}:${Math.round(z / 3)}`;
    if (signKey.has(key)) return;
    signKey.add(key);
    signs.push({ x, z, h: headingOf(tx, tz), code, level });
  };
  const speedCode = (v) => ([20, 30, 40, 50, 60, 70, 80].includes(v) ? `B20a_${v}` : null);
  for (const n of nodes) {
    if (n.arms.length < 3) continue;
    const arms = n.arms.map((arm) => ({ ...arm, edge: edges[arm.e], k: arm.e * 2 + arm.end }));
    const hasYield = arms.some((a) => (ctrl[a.k] === CTRL.GIVE_WAY || ctrl[a.k] === CTRL.STOP) && a.edge.A.rank >= 2 && a.edge.len > 12);
    for (const a of arms) {
      const e = a.edge, dirIn = a.end ? 1 : -1, c = ctrl[a.k];
      const sAt = (d) => (a.end ? e.len - d : d);
      if (canArrive(e, a.end) && e.len > 12) {
        const d = lineD[a.k] + 1.5;
        const round = arms.some((o) => o.edge.A.flags & FLAG.ROUNDABOUT);
        if (c === CTRL.GIVE_WAY) { placeSign('P4', e, sAt(d), dirIn, { level: round ? 1 : 0 }); if (round) placeSign('C1', e, sAt(d), dirIn); }
        else if (c === CTRL.STOP) placeSign('P6', e, sAt(d), dirIn);
        else if (c === CTRL.PRIORITY && hasYield && e.len > 40) placeSign('P2', e, sAt(lineD[a.k] + 20), dirIn);
      }
      // One-way streets: no-entry at the far end, one-way plate at the start.
      if (oneway(e) && e.A.rank <= 3 && !(e.A.flags & (FLAG.ROUNDABOUT | FLAG.LINK)) && e.len > 20) {
        if (a.end === 1) placeSign('B2', e, e.len - trim[a.k] - 1, -1, { side: -1 });
        else placeSign('IP4b', e, trim[a.k] + 6, 1);
      }
      // Speed limit where it changes on leaving the junction.
      if (canLeave(e, a.end) && e.len > 25 && e.A.rank >= 1) {
        const v = e.A.speed;
        const from = arms.filter((o) => o !== a && canArrive(o.edge, o.end) && o.edge.A.rank >= 1);
        const differs = from.filter((o) => o.edge.A.speed !== v);
        if (differs.length) {
          const prev = differs[0].edge.A;
          let code = null;
          if (e.A.living) code = 'IZ5a';
          else if (v === 30 && e.A.flags & FLAG.ZONE) code = 'IZ8a_30';
          else if (v === 50 && prev.living) code = 'IZ5b';
          else if (v === 50 && prev.flags & FLAG.ZONE) code = 'IZ8b_30';
          else code = speedCode(v);
          const sOut = a.end ? e.len - trim[a.k] - 9 : trim[a.k] + 9;
          if (code) placeSign(code, e, sOut, a.end ? -1 : 1);
        }
      }
    }
  }
  for (const c of crossings) {
    const e = edges[c.e];
    if (c.signal || e.A.rank < 2) continue;
    placeSign('IP6', e, c.s - 1.5, 1);
    if (!oneway(e)) placeSign('IP6', e, c.s + 1.5, -1);
  }
  for (const r of rails) {
    const e = edges[r.e];
    placeSign('A32a', e, r.s - 5, 1);
    if (!oneway(e)) placeSign('A32a', e, r.s + 5, -1);
  }
  for (const b of bumps) {
    const e = edges[b.e];
    if (e.A.rank < 2) continue;
    placeSign('A7b', e, b.s - 12, 1);
    if (!oneway(e)) placeSign('A7b', e, b.s + 12, -1);
  }
  const RSIGN = { no_left_turn: 'B24b', no_right_turn: 'B24a', only_straight_on: 'C2a', only_right_turn: 'C2b', only_left_turn: 'C2c' };
  for (const [fe, node, , , kind] of restrictions) {
    const code = RSIGN[kind];
    if (!code) continue;
    const e = edges[fe], end = e.b === node ? 1 : 0;
    if (!canArrive(e, end) || e.len < 12) continue;
    const d = lineD[fe * 2 + end] + 4;
    placeSign(code, e, end ? e.len - d : d, end ? 1 : -1, { level: 1 });
  }

  // ---- 8. trams and railways ----------------------------------------------------------------------
  const tramEdges = [], tramStops = [], railLines = [];
  {
    const tuse = new Map(), truns = [];
    for (const [, refs, t] of raw.ways) {
      if (t.railway === 'rail' && !(t.tunnel && t.tunnel !== 'no') && t.service !== 'siding' && t.service !== 'yard') {
        let cur = [];
        const flush = () => { if (cur.length >= 2) railLines.push(cur); cur = []; };
        for (const id of refs) { const p = xz(id); if (p && inside(p)) cur.push(p); else flush(); }
        flush();
      }
      if (t.railway !== 'tram' || t.service === 'yard' || (t.tunnel && t.tunnel !== 'no')) continue;
      let cur = [];
      const flush = () => { if (cur.length >= 2) truns.push(cur); cur = []; };
      for (const id of refs) { const p = xz(id); if (p && inside(p)) cur.push(id); else flush(); }
      flush();
    }
    for (const ids of truns) ids.forEach((id, i) => tuse.set(id, (tuse.get(id) || 0) + (i === 0 || i === ids.length - 1 ? 2 : 1)));
    // Join runs that simply continue each other so trams travel over long edges.
    const tnode = new Map();
    const tn = (id) => { if (!tnode.has(id)) tnode.set(id, tnode.size); return tnode.get(id); };
    for (const ids of truns) {
      let start = 0;
      for (let i = 1; i < ids.length; i++) {
        if (tuse.get(ids[i]) < 3 && i !== ids.length - 1) continue;      // split only at switches and ends
        const part = ids.slice(start, i + 1);
        start = i;
        const pts = part.map(xz);
        let len = 0;
        const stops = [];
        for (let k = 1; k < pts.length; k++) {
          len += dist(pts[k - 1], pts[k]);
          const t = tagsOf(part[k]);
          if (t && (t.railway === 'tram_stop' || (t.public_transport === 'stop_position' && t.tram === 'yes'))) stops.push({ s: len, name: t.name || '' });
        }
        if (len < 1) continue;
        tramEdges.push({ a: tn(part[0]), b: tn(part[part.length - 1]), pts, len, stops });
      }
    }
    for (const te of tramEdges) for (const st of te.stops) {
      let acc = 0, pos = te.pts[0];
      for (let k = 1; k < te.pts.length; k++) {
        const seg = dist(te.pts[k - 1], te.pts[k]);
        if (acc + seg >= st.s) { const f = (st.s - acc) / (seg || 1); pos = [te.pts[k - 1][0] + (te.pts[k][0] - te.pts[k - 1][0]) * f, te.pts[k - 1][1] + (te.pts[k][1] - te.pts[k - 1][1]) * f]; break; }
        acc += seg;
      }
      tramStops.push({ name: st.name, x: Math.round(pos[0] * 10) / 10, z: Math.round(pos[1] * 10) / 10 });
    }
  }

  // ---- 9. start places ----------------------------------------------------------------------------
  const places = [];
  {
    const want = ['Arena Libeň jih', 'Palmovka', 'Vysočanská', 'Prosek', 'Střížkov', 'Ládví', 'Letňany', 'Hloubětín', 'Ohrada', 'Biskupcova', 'Nádraží Libeň', 'Bulovka', 'Krejcárek', 'Kobylisy', 'Harfa', 'Spojovací', 'Vozovna Žižkov', 'Flora', 'Želivského', 'Invalidovna', 'Českomoravská', 'Kolbenova'];
    const named = new Map();
    for (const id in raw.nodes) {
      const t = raw.nodes[id][2];
      if (!t || !t.name || !want.includes(t.name)) continue;
      if (!(t.railway === 'tram_stop' || t.railway === 'station' || t.station === 'subway' || t.public_transport || t.highway === 'bus_stop')) continue;
      const p = xz(id);
      if (!p || Math.abs(p[0]) > HALF - 350 || Math.abs(p[1]) > HALF - 350) continue;
      if (!named.has(t.name)) named.set(t.name, p);
    }
    for (const name of want) {
      const p = named.get(name);
      if (!p) continue;
      let best = null, bestD = 320;
      for (const e of edges) {
        const A = e.A;
        if (A.rank < 2 || A.rank > 3 || A.oneway || e.len < 70 || A.speed > 50 || A.flags & (FLAG.LIMITED | FLAG.BRIDGE | FLAG.TUNNEL | FLAG.NARROW)) continue;
        if (e.feats.length) continue;
        const m = along(e.pts, e.cum, e.len * 0.4);
        const d = Math.hypot(m.x - p[0], m.z - p[1]);
        if (d < bestD) { bestD = d; best = e; }
      }
      if (best) places.push({ id: name.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-'), name, note: best.A.name, edge: best.id, s: Math.round(best.len * 0.35), dir: 1 });
    }
  }

  // ---- 10. pack -----------------------------------------------------------------------------------
  const N = nodes.length;
  const q = (v) => Math.max(-32767, Math.min(32767, Math.round(v * 8)));  // 12.5 cm grid
  const nameList = [''], nameIdx = new Map([['', 0]]);
  const nameOf = (s) => { if (!nameIdx.has(s)) { nameIdx.set(s, nameList.length); nameList.push(s); } return nameIdx.get(s); };
  let nPts = 0;
  for (const e of edges) nPts += e.pts.length;
  const buf = {
    nodeX: new Int16Array(N), nodeZ: new Int16Array(N),
    edgeA: new Uint32Array(E), edgeB: new Uint32Array(E), edgePt: new Uint32Array(E + 1),
    ptX: new Int16Array(nPts), ptZ: new Int16Array(nPts),
    edgeRank: new Uint8Array(E), edgeFlags: new Uint8Array(E), edgeLanesF: new Uint8Array(E), edgeLanesB: new Uint8Array(E),
    edgeWidth: new Uint8Array(E), edgeSpeed: new Uint8Array(E), edgeName: new Uint16Array(E), edgeSurface: new Uint8Array(E),
    edgeLayer: new Int8Array(E), edgeLiving: new Uint8Array(E),
    ctrl, trim: new Uint8Array(E * 2), lineD: new Uint8Array(E * 2),
  };
  nodes.forEach((n, i) => { buf.nodeX[i] = q(n.x); buf.nodeZ[i] = q(n.z); });
  let pi = 0;
  const turns = {};
  for (const e of edges) {
    const i = e.id, A = e.A;
    buf.edgeA[i] = e.a; buf.edgeB[i] = e.b; buf.edgePt[i] = pi;
    for (const p of e.pts) { buf.ptX[pi] = q(p[0]); buf.ptZ[pi] = q(p[1]); pi++; }
    buf.edgeRank[i] = A.rank; buf.edgeFlags[i] = A.flags; buf.edgeLanesF[i] = A.lf; buf.edgeLanesB[i] = A.lb;
    buf.edgeWidth[i] = Math.min(255, Math.round(A.width * 10)); buf.edgeSpeed[i] = A.speed; buf.edgeName[i] = nameOf(A.name);
    buf.edgeSurface[i] = A.surface; buf.edgeLayer[i] = A.layer; buf.edgeLiving[i] = A.living ? 1 : 0;
    for (const end of [0, 1]) {
      buf.trim[i * 2 + end] = Math.min(255, Math.round(trim[i * 2 + end] * 10));
      buf.lineD[i * 2 + end] = Math.min(255, Math.round(lineD[i * 2 + end] * 10));
    }
    if (A.turnF || A.turnB) turns[i] = [A.turnF, A.turnB];
  }
  buf.edgePt[E] = pi;
  const L = lines.length;
  Object.assign(buf, {
    lineEdge: new Uint32Array(L), lineS: new Float32Array(L), lineDir: new Int8Array(L), lineKind: new Uint8Array(L),
    lineCtrl: new Int16Array(L), linePhase: new Uint8Array(L), lineNode: new Int32Array(L),
  });
  lines.forEach((l, i) => {
    buf.lineEdge[i] = l.e; buf.lineS[i] = l.s; buf.lineDir[i] = l.dir; buf.lineKind[i] = l.kind;
    buf.lineCtrl[i] = l.ctrlId; buf.linePhase[i] = l.phase; buf.lineNode[i] = l.node;
  });
  const C = crossings.length;
  Object.assign(buf, { crossEdge: new Uint32Array(C), crossS: new Float32Array(C), crossSignal: new Uint8Array(C), crossCtrl: new Int16Array(C), crossPhase: new Uint8Array(C) });
  crossings.forEach((c, i) => { buf.crossEdge[i] = c.e; buf.crossS[i] = c.s; buf.crossSignal[i] = c.signal; buf.crossCtrl[i] = c.ctrlId; buf.crossPhase[i] = c.phase; });
  const codes = [...new Set(signs.map((s) => s.code))].sort();
  const S = signs.length;
  Object.assign(buf, { signX: new Float32Array(S), signZ: new Float32Array(S), signH: new Float32Array(S), signCode: new Uint8Array(S), signLevel: new Uint8Array(S) });
  signs.forEach((s, i) => { buf.signX[i] = s.x; buf.signZ[i] = s.z; buf.signH[i] = s.h; buf.signCode[i] = codes.indexOf(s.code); buf.signLevel[i] = s.level; });
  // Trams and rail lines as flat polylines.
  const flat = (polys) => {
    const start = new Uint32Array(polys.length + 1);
    let n = 0;
    polys.forEach((p, i) => { start[i] = n; n += p.length; });
    start[polys.length] = n;
    const X = new Int16Array(n), Z = new Int16Array(n);
    let k = 0;
    for (const p of polys) for (const v of p) { X[k] = q(v[0]); Z[k] = q(v[1]); k++; }
    return { start, X, Z };
  };
  const tf = flat(tramEdges.map((t) => t.pts)), rf = flat(railLines);
  Object.assign(buf, {
    tramPt: tf.start, tramX: tf.X, tramZ: tf.Z, tramA: Uint32Array.from(tramEdges.map((t) => t.a)), tramB: Uint32Array.from(tramEdges.map((t) => t.b)),
    railPt: rf.start, railX: rf.X, railZ: rf.Z,
  });

  const count = (c) => ctrl.reduce((s, v) => s + (v === c ? 1 : 0), 0);
  const meta = {
    doc: 'Coordinates in *X/*Z Int16 buffers are metres * 8. See src/js/sim/roadnet.js for the reader.',
    names: nameList, signCodes: codes, controllers, turns,
    restrictions: restrictions.map((r) => r.slice(0, 4)),
    rails: rails.map((r) => [r.e, Math.round(r.s * 10) / 10]),
    bumps: bumps.map((b) => [b.e, Math.round(b.s * 10) / 10]),
    tramStops, tramEdgeStops: tramEdges.map((t) => t.stops.map((s) => Math.round(s.s))),
    places,
    stats: {
      nodes: N, edges: E, points: nPts, junctions: nodes.filter((n) => n.arms.length >= 3).length,
      km: Math.round(edges.reduce((s, e) => s + e.len, 0) / 1000),
      controllers: controllers.length, signalLines: lines.filter((l) => l.kind === CTRL.SIGNAL).length,
      giveWay: count(CTRL.GIVE_WAY), stop: count(CTRL.STOP), priority: count(CTRL.PRIORITY), equal: count(CTRL.EQUAL), exit: count(CTRL.EXIT), roundabout: count(CTRL.ROUNDABOUT),
      junctionsMainMinor: nMain, junctionsRightHand: nEqual,
      crossings: C, signalCrossings: crossings.filter((c) => c.signal).length, railCrossings: rails.length,
      restrictions: restrictions.length, signs: S, tramEdges: tramEdges.length, tramStops: tramStops.length, railLines: railLines.length,
    },
  };
  console.log(meta.stats);
  console.log('  signs by code:', codes.map((c) => `${c}:${signs.filter((s) => s.code === c).length}`).join(' '));
  console.log('  places:', places.map((p) => `${p.name} (${p.note})`).join(', '));
  writeSection('graph', meta, buf);
}
