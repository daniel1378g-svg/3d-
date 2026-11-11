// Solid things the car can hit: building footprints from data/buildings.pack, looked up by chunk.
import { HALF, CHUNK, CHUNKS } from '../data/geo.js';

export function createStatics({ buf }) {
  const cache = new Map();
  function chunk(id) {
    let c = cache.get(id);
    if (c) return c;
    c = [];
    for (let b = buf.chunkStart[id]; b < buf.chunkStart[id + 1]; b++) {
      if (buf.flags[b] & 2) continue;                              // a road runs through it: not an obstacle
      const p0 = buf.start[b], p1 = buf.start[b + 1];
      let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
      const ring = new Float32Array((p1 - p0) * 2);
      for (let p = p0; p < p1; p++) {
        const x = buf.x[p] / 8, z = buf.z[p] / 8;
        ring[(p - p0) * 2] = x; ring[(p - p0) * 2 + 1] = z;
        if (x < minX) minX = x; if (x > maxX) maxX = x; if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
      }
      c.push({ ring, minX, maxX, minZ, maxZ });
    }
    if (cache.size > 64) cache.delete(cache.keys().next().value);
    cache.set(id, c);
    return c;
  }
  function inside(ring, x, z) {
    let hit = false;
    for (let i = 0, j = ring.length - 2; i < ring.length; j = i, i += 2) {
      const zi = ring[i + 1], zj = ring[j + 1];
      if ((zi > z) !== (zj > z) && x < ring[i] + ((z - zi) / (zj - zi)) * (ring[j] - ring[i])) hit = !hit;
    }
    return hit;
  }
  // Is the point inside a building? Buildings are filed under the chunk of their centre, so the
  // neighbouring chunks are checked too.
  function hitsBuilding(x, z) {
    const cx = Math.floor((x + HALF) / CHUNK), cz = Math.floor((z + HALF) / CHUNK);
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const gx = cx + dx, gz = cz + dz;
      if (gx < 0 || gz < 0 || gx >= CHUNKS || gz >= CHUNKS) continue;
      for (const b of chunk(gz * CHUNKS + gx)) {
        if (x < b.minX || x > b.maxX || z < b.minZ || z > b.maxZ) continue;
        if (inside(b.ring, x, z)) return true;
      }
    }
    return false;
  }
  return { hitsBuilding };
}
