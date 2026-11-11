// Helpers shared by the data steps: projected rings from OSM ways and multipolygon relations.
import { toXZ, HALF, CHUNK, CHUNKS } from '../../src/js/data/geo.js';

export function makeProjector(raw) {
  const cache = new Map();
  return (id) => {
    let p = cache.get(id);
    if (p === undefined) {
      const n = raw.nodes[id];
      p = n ? toXZ(n[0], n[1]) : null;
      cache.set(id, p);
    }
    return p;
  };
}

// Calls fn(ring, tags, id) for every closed outline carrying tags that `want(tags)` accepts:
// closed ways, and the outer rings of multipolygon relations (member ways are joined end to end).
// ring = [[x, z], ...] without the repeated closing point.
export function forEachArea(raw, want, fn) {
  const xz = makeProjector(raw);
  const wayById = new Map();
  for (const w of raw.ways) wayById.set(w[0], w);
  const ringOf = (refs) => {
    const pts = [];
    for (const id of refs) { const p = xz(id); if (!p) return null; pts.push(p); }
    if (pts.length > 1 && pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) pts.pop();
    return pts.length >= 3 ? pts : null;
  };
  const inRelation = new Set();
  for (const [rid, members, t] of raw.rels) {
    if (t.type !== 'multipolygon' || !want(t)) continue;
    const parts = [];
    for (const [type, ref, role] of members) {
      if (type !== 'w' || role === 'inner') continue;
      const w = wayById.get(ref);
      if (w) { parts.push(w[1].slice()); inRelation.add(ref); }
    }
    // Join open parts into rings by matching end nodes.
    while (parts.length) {
      let ring = parts.pop();
      let grew = true;
      while (ring[0] !== ring[ring.length - 1] && grew) {
        grew = false;
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i], tail = ring[ring.length - 1];
          if (p[0] === tail) { ring = ring.concat(p.slice(1)); } else if (p[p.length - 1] === tail) { ring = ring.concat(p.slice(0, -1).reverse()); } else continue;
          parts.splice(i, 1); grew = true; break;
        }
      }
      if (ring[0] !== ring[ring.length - 1]) continue;           // could not close (cut by the area edge)
      const pts = ringOf(ring);
      if (pts) fn(pts, t, `r${rid}`);
    }
  }
  for (const [wid, refs, t] of raw.ways) {
    if (!want(t) || refs.length < 4 || refs[0] !== refs[refs.length - 1]) continue;
    const pts = ringOf(refs);
    if (pts) fn(pts, t, `w${wid}`);
  }
}

export function ringArea(r) {                                    // signed, + = clockwise on screen (x right, z down)
  let a = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += (r[j][0] - r[i][0]) * (r[j][1] + r[i][1]);
  return a / 2;
}
export function centroid(r) {
  let x = 0, z = 0;
  for (const p of r) { x += p[0]; z += p[1]; }
  return [x / r.length, z / r.length];
}
// Drop points that add nothing: duplicates and points on a straight line.
export function simplifyRing(r, tol = 0.25) {
  const out = [];
  const n = r.length;
  for (let i = 0; i < n; i++) {
    const a = out.length ? out[out.length - 1] : r[(i + n - 1) % n], b = r[i], c = r[(i + 1) % n];
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 0.3) continue;
    const cross = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
    const base = Math.hypot(c[0] - a[0], c[1] - a[1]) || 1;
    if (cross / base < tol) continue;
    out.push(b);
  }
  return out.length >= 3 ? out : r;
}
export function chunkId(x, z) {
  const cx = Math.min(CHUNKS - 1, Math.max(0, Math.floor((x + HALF) / CHUNK)));
  const cz = Math.min(CHUNKS - 1, Math.max(0, Math.floor((z + HALF) / CHUNK)));
  return cz * CHUNKS + cx;
}
export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
