// Small shared helpers for the world renderer: hashing, colour conversion, growable buffers.
import { CHUNK, CHUNKS, HALF } from '../../data/geo.js';

export { CHUNK, CHUNKS, HALF };

// Integer hash of two numbers -> uint32. Used wherever something has to look random but be the
// same on every device and every run (tree variants, roof colours, scattered woodland).
export function hash2(a, b) {
  let h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}
export const hash01 = (a, b) => hash2(a, b) / 4294967296;

// sRGB byte -> linear float. three.js treats vertex colours as linear, the data is sRGB.
export const LIN = new Float32Array(256);
for (let i = 0; i < 256; i++) {
  const c = i / 255;
  LIN[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
// 0xRRGGBB (sRGB) -> [r, g, b] linear.
export function linHex(hex) {
  return [LIN[(hex >> 16) & 255], LIN[(hex >> 8) & 255], LIN[hex & 255]];
}
// Linear float -> byte for normalized Uint8 colour attributes.
export const toByte = (v) => (v <= 0 ? 0 : v >= 1 ? 255 : Math.round(v * 255));

export const chunkId = (cx, cz) => cz * CHUNKS + cx;
export const chunkX0 = (cx) => -HALF + cx * CHUNK;
export const chunkZ0 = (cz) => -HALF + cz * CHUNK;
export function chunkCoord(v) {
  const c = Math.floor((v + HALF) / CHUNK);
  return c < 0 ? 0 : c >= CHUNKS ? CHUNKS - 1 : c;
}

// Free the JavaScript copy of a vertex buffer once it is on the GPU. Chunk meshes are rebuilt
// from the map data after a context loss, so nothing needs the arrays again.
function dropArray() { this.array = null; }
export function releaseAfterUpload(geometry) {
  for (const name in geometry.attributes) geometry.attributes[name].onUpload(dropArray);
  if (geometry.index) geometry.index.onUpload(dropArray);
  return geometry;
}

// Write an instance matrix: rotation about +y by heading h (clockwise from north), scale and
// translation. Column 0 is the object's right, column 2 its back (models face -z).
export function setInstance(arr, i, x, y, z, h, sx = 1, sy = 1, sz = 1) {
  const c = Math.cos(h), s = Math.sin(h), o = i * 16;
  arr[o] = c * sx; arr[o + 1] = 0; arr[o + 2] = s * sx; arr[o + 3] = 0;
  arr[o + 4] = 0; arr[o + 5] = sy; arr[o + 6] = 0; arr[o + 7] = 0;
  arr[o + 8] = -s * sz; arr[o + 9] = 0; arr[o + 10] = c * sz; arr[o + 11] = 0;
  arr[o + 12] = x; arr[o + 13] = y; arr[o + 14] = z; arr[o + 15] = 1;
}

// An InstancedMesh that is refilled by hand and never frustum-culled as a whole (its instances
// are spread around the eye). `capacity` can grow: the caller asks with ensure().
export function makeInstanced(geometry, material, capacity, { colour = false } = {}) {
  const mesh = new THREE.InstancedMesh(geometry, material, capacity);
  mesh.count = 0;
  mesh.visible = false;
  mesh.frustumCulled = false;
  mesh.matrixAutoUpdate = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  if (colour) {
    mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3).fill(1), 3);
    mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
  }
  return mesh;
}
export function commitInstances(mesh, count) {
  mesh.count = count;
  mesh.visible = count > 0;
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
}

export function triangleCount(geometry) {
  if (!geometry) return 0;
  if (geometry.index) return geometry.index.count / 3;
  return geometry.attributes.position ? geometry.attributes.position.count / 3 : 0;
}
