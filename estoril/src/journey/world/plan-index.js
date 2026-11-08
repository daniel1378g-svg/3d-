// Plan-view (XZ) spatial index for build-time clearance queries: triangles, segments and discs in a
// grid of CELL-metre cells. track-surfaces.js uses it to decide where a barrier wall may stand
// (away from other parts of the track, from gravel traps and from other walls). Not used per frame.

/** Grid cell size, metres. */
const CELL = 8;
const TRIANGLE = 0;
const DISC = 1;

/** Distance from (px, pz) to the segment (ax, az)–(bx, bz). */
function segmentDistance(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const lengthSq = dx * dx + dz * dz;
  const t = lengthSq > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / lengthSq)) : 0;
  return Math.hypot(px - ax - t * dx, pz - az - t * dz);
}

/** Distance from (px, pz) to a triangle (0 inside); a segment is a triangle with c = b. */
function triangleDistance(px, pz, ax, az, bx, bz, cx, cz) {
  const area = (bx - ax) * (cz - az) - (cx - ax) * (bz - az);
  if (Math.abs(area) > 1e-12) {
    const s = Math.sign(area);
    const e0 = ((bx - ax) * (pz - az) - (px - ax) * (bz - az)) * s;
    const e1 = ((cx - bx) * (pz - bz) - (px - bx) * (cz - bz)) * s;
    const e2 = ((ax - cx) * (pz - cz) - (px - cx) * (az - cz)) * s;
    if (e0 >= 0 && e1 >= 0 && e2 >= 0) return 0;
  }
  return Math.min(
    segmentDistance(px, pz, ax, az, bx, bz),
    segmentDistance(px, pz, bx, bz, cx, cz),
    segmentDistance(px, pz, cx, cz, ax, az),
  );
}

function createPlanIndex() {
  const cells = new Map();
  const kinds = [];
  const data = []; // per item 6 numbers: triangle ax, az, bx, bz, cx, cz; disc x, z, radius, 0, 0, 0
  const keyOf = (cx, cz) => (cx + 32768) * 65536 + (cz + 32768);

  function insert(kind, values, x0, z0, x1, z1) {
    const id = kinds.length;
    kinds.push(kind);
    data.push(...values);
    for (let cx = Math.floor(x0 / CELL); cx <= Math.floor(x1 / CELL); cx++)
      for (let cz = Math.floor(z0 / CELL); cz <= Math.floor(z1 / CELL); cz++) {
        const key = keyOf(cx, cz);
        let list = cells.get(key);
        if (!list) cells.set(key, (list = []));
        list.push(id);
      }
  }

  return {
    get size() {
      return kinds.length;
    },
    addTriangle(ax, az, bx, bz, cx, cz) {
      insert(
        TRIANGLE,
        [ax, az, bx, bz, cx, cz],
        Math.min(ax, bx, cx),
        Math.min(az, bz, cz),
        Math.max(ax, bx, cx),
        Math.max(az, bz, cz),
      );
    },
    addSegment(ax, az, bx, bz) {
      this.addTriangle(ax, az, bx, bz, bx, bz);
    },
    /** A disc of `radius` around (x, z); its distance is negative inside. */
    addDisc(x, z, radius) {
      insert(DISC, [x, z, radius, 0, 0, 0], x - radius, z - radius, x + radius, z + radius);
    },
    /**
     * Smallest distance from (px, pz) to any item whose bounding box lies within `reach`, or
     * Infinity if there is none (items farther than `reach` may be missed).
     */
    distance(px, pz, reach) {
      let best = Infinity;
      const seen = new Set();
      for (let cx = Math.floor((px - reach) / CELL); cx <= Math.floor((px + reach) / CELL); cx++)
        for (let cz = Math.floor((pz - reach) / CELL); cz <= Math.floor((pz + reach) / CELL); cz++) {
          const list = cells.get(keyOf(cx, cz));
          if (!list) continue;
          for (const id of list) {
            if (seen.has(id)) continue;
            seen.add(id);
            const o = id * 6;
            const d =
              kinds[id] === DISC
                ? Math.hypot(px - data[o], pz - data[o + 1]) - data[o + 2]
                : triangleDistance(
                    px,
                    pz,
                    data[o],
                    data[o + 1],
                    data[o + 2],
                    data[o + 3],
                    data[o + 4],
                    data[o + 5],
                  );
            if (d < best) best = d;
          }
        }
      return best;
    },
  };
}

export { createPlanIndex, segmentDistance };
