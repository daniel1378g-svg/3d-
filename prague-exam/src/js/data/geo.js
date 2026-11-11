// Shared geography: the game area, the map projection and the chunk grid.
// Used by the data tools (Node) and by the game (browser). No dependencies.
//
// World frame: metres. +x = east, +y = up, +z = south (so north is -z, as in three.js maps).
// Heading h is measured clockwise from north: forward = (sin h, 0, -cos h).
//   h = 0 north, h = PI/2 east, h = PI south, h = -PI/2 west.  three.js: object.rotation.y = -h.

export const ORIGIN = { lat: 50.1028, lon: 14.4945 };            // tram stop Arena Libeň jih
export const BBOX = { w: 14.4440, s: 50.0705, e: 14.5450, n: 50.1352 };
export const HALF = 3600;                                        // playable area: x, z in [-HALF, HALF]
export const CHUNK = 240;                                        // metres; 30 x 30 chunks
export const CHUNKS = (2 * HALF) / CHUNK;

const R = 6378137;
const D = Math.PI / 180;
const COS = Math.cos(ORIGIN.lat * D);

export function toXZ(lon, lat) {
  return [R * (lon - ORIGIN.lon) * D * COS, -R * (lat - ORIGIN.lat) * D];
}
export function toLonLat(x, z) {
  return [ORIGIN.lon + x / (R * D * COS), ORIGIN.lat - z / (R * D)];
}
export function inArea(x, z, margin = 0) {
  return x >= -HALF - margin && x <= HALF + margin && z >= -HALF - margin && z <= HALF + margin;
}
export function chunkOf(x, z) {
  const cx = Math.min(CHUNKS - 1, Math.max(0, Math.floor((x + HALF) / CHUNK)));
  const cz = Math.min(CHUNKS - 1, Math.max(0, Math.floor((z + HALF) / CHUNK)));
  return { cx, cz, id: cz * CHUNKS + cx };
}
export function chunkBounds(cx, cz) {
  const x0 = -HALF + cx * CHUNK;
  const z0 = -HALF + cz * CHUNK;
  return { x0, z0, x1: x0 + CHUNK, z1: z0 + CHUNK };
}

// Heading helpers.
export const forward = (h) => [Math.sin(h), -Math.cos(h)];       // [dx, dz]
export const headingOf = (dx, dz) => Math.atan2(dx, -dz);
export function angDiff(a, b) {                                  // signed a - b in (-PI, PI]
  let d = (a - b) % (2 * Math.PI);
  if (d > Math.PI) d -= 2 * Math.PI;
  if (d <= -Math.PI) d += 2 * Math.PI;
  return d;
}
