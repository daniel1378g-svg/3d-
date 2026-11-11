// Where the player's car is on the road network: which edge, which way, which lane, and whether
// it is inside a junction. The traffic and the examiner both read this once per step.
import { angDiff, headingOf } from '../data/geo.js';

export function createLocator(net) {
  const loc = {
    e: -1, dir: 1, s: 0, d: 0, lane: 0, lanes: 1,
    offRoad: false, wrongWay: false, oncoming: 0,   // oncoming = metres past the centre line
    node: -1, end: 1, rem: 0,                       // the node ahead, the edge end facing it, metres to it
    junction: -1,                                   // node id while inside a junction, else -1
    entry: null,                                    // { e, end } the arm used to enter that junction
    exited: null,                                   // set for one step when a junction is left: { node, e, end, out }
    entered: null,                                  // set for one step when a junction is entered: { node, e, end }
    changedEdge: false,
  };

  function pick(car, onlyNode) {
    const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
    let best = null, bestScore = Infinity;
    for (const c of net.candidates(car.x, car.z, 22)) {
      if (onlyNode >= 0 && net.edgeA[c.e] !== onlyNode && net.edgeB[c.e] !== onlyNode) continue;
      const over = Math.max(0, c.dist - net.width[c.e] / 2);
      const align = Math.abs(fx * c.dx + fz * c.dz);
      let score = over * 2 + c.dist * 0.4 + (1 - align) * 7;
      if (c.e === loc.e) score -= 1.6;                          // stay on the current edge when in doubt
      if (net.rank[c.e] === 0) score += 0.8;
      if (score < bestScore) { bestScore = score; best = c; }
    }
    return best;
  }

  function update(car) {
    loc.exited = null; loc.entered = null; loc.changedEdge = false;
    let c = pick(car, loc.junction);
    if (!c) c = pick(car, -1);
    if (!c) { loc.offRoad = true; return loc; }
    if (c.e !== loc.e) loc.changedEdge = true;
    const e = c.e, fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
    const dir = fx * c.dx + fz * c.dz >= 0 ? 1 : -1;
    loc.e = e; loc.s = c.s; loc.d = c.d; loc.dir = dir;
    const W = net.width[e], lw = net.laneWidth(e), divider = -W / 2 + net.lanesB[e] * lw;
    const n = Math.max(1, net.lanes(e, dir) || net.lanes(e, -dir));
    const off = dir > 0 ? c.d - divider : divider - c.d;        // metres right of the centre line, as travelled
    const raw = Math.max(0, Math.min(n - 1, Math.floor(off / lw)));
    // Hysteresis: the lane only changes once the car's centre is clearly inside the new lane.
    if (loc.changedEdge || loc.lanes !== n || Math.abs(raw - loc.lane) > 1) loc.lane = raw;
    else if (raw !== loc.lane && Math.abs(off - (loc.lane + 0.5) * lw) > lw * 0.5 + 0.45) loc.lane = raw;
    loc.lanes = n;
    loc.oncoming = net.oneway(e) ? 0 : Math.max(0, -off);
    loc.wrongWay = net.oneway(e) && dir < 0;
    loc.end = dir > 0 ? 1 : 0;
    loc.node = net.nodeOf(e, loc.end);
    loc.rem = dir > 0 ? net.len[e] - c.s : c.s;
    const road = net.onRoad(car.x, car.z, 0.5);
    loc.offRoad = !road;

    // Junction tracking.
    if (loc.junction < 0) {
      if (net.isJunction(loc.node) && loc.rem <= net.trim[e * 2 + loc.end] + car.length / 2) {
        loc.junction = loc.node; loc.entry = { e, end: loc.end };
        loc.entered = { node: loc.node, e, end: loc.end };
      }
    } else {
      const J = loc.junction;
      const endAtJ = net.edgeA[e] === J ? 0 : net.edgeB[e] === J ? 1 : -1;
      const far = Math.hypot(car.x - net.nodeX[J], car.z - net.nodeZ[J]);
      if (endAtJ < 0) {
        if (far > net.junctionRadius(J) + 12) { loc.exited = { node: J, e: loc.entry.e, end: loc.entry.end, out: e }; loc.junction = -1; loc.entry = null; }
      } else {
        const away = endAtJ === 0 ? c.s : net.len[e] - c.s;       // metres from the junction node along this edge
        const leaving = (endAtJ === 0 ? dir > 0 : dir < 0);
        if (leaving && away > net.trim[e * 2 + endAtJ] + car.length / 2 - 0.5) {
          loc.exited = { node: J, e: loc.entry.e, end: loc.entry.end, out: e };
          loc.junction = -1; loc.entry = null;
        } else if (!leaving && e === loc.entry.e && away > net.trim[e * 2 + endAtJ] + car.length / 2 + 3) {
          loc.junction = -1; loc.entry = null;                  // backed out again
        }
      }
    }
    return loc;
  }

  function reset() { loc.e = -1; loc.junction = -1; loc.entry = null; loc.exited = null; loc.entered = null; }
  // Heading of travel along the current edge.
  function roadHeading() { const p = net.pos(loc.e, loc.s); return headingOf(p.dx * loc.dir, p.dz * loc.dir); }
  return { loc, update, reset, roadHeading, angDiff };
}
