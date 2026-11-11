// Parked cars from data/parking.pack (may be absent). Near the eye they are the full car models,
// further out one cheap box per car (36 triangles, same paint, dark glass band), beyond that
// nothing. All instanced; the lists are refilled as the eye moves and when cars are removed.
import { LIN, setInstance, makeInstanced, commitInstances } from './util.js';
import { boxes } from './fallbacks.js';

const KINDS = ['hatch', 'sedan', 'estate', 'suv', 'van'];
const NEAR = 90, FAR = 260, SHADOW = 150;
const NEAR_MAX = 36, FAR_MAX = 448, SHADOW_MAX = 224;
const LIFT = 0.06;                       // they stand half on the kerb

export function createParking({ pack, models, scene, shadowTexture }) {
  if (!pack || !pack.buf || !pack.buf.start) return { refill() {}, dispose() {}, count: () => 0 };
  const { buf } = pack;
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const geo = KINDS.map((k) => models.buildCarGeometry(k));
  const dims = geo.map((g) => { g.computeBoundingBox(); const b = g.boundingBox; return { w: b.max.x - b.min.x, h: b.max.y, l: b.max.z - b.min.z, zc: (b.max.z + b.min.z) / 2 }; });
  const near = geo.map((g) => makeInstanced(g, mat, NEAR_MAX, { colour: true }));
  // Unit car: 1 wide, 1 high, 1 long, front towards -z. Body and roof take the paint, the band between is glass.
  const boxGeo = boxes([[1, 0.5, 1, 0, 0.1, 0, 0xffffff], [0.88, 0.3, 0.56, 0, 0.6, 0.08, 0x1b2228], [0.9, 0.06, 0.58, 0, 0.9, 0.08, 0xffffff]]);
  const far = makeInstanced(boxGeo, mat, FAR_MAX, { colour: true });
  const shadowGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTexture, color: 0x000000, transparent: true, opacity: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 });
  const shadows = makeInstanced(shadowGeo, shadowMat, SHADOW_MAX);
  shadows.renderOrder = 5;
  shadows.layers.set(1);                 // not in the mirrors
  scene.add(...near, far, shadows);

  let idx = new Uint32Array(1024), dist = new Float32Array(1024), order = new Uint32Array(1024), shown = 0;

  function refill(chunkIds, ex, ez) {
    let n = 0;
    for (const id of chunkIds) {
      for (let i = buf.start[id]; i < buf.start[id + 1]; i++) {
        if (buf.kind[i] >= KINDS.length) continue;               // 255 = removed
        const d = Math.hypot(buf.x[i] / 8 - ex, buf.z[i] / 8 - ez);
        if (d >= FAR) continue;
        if (n === idx.length) { const a = new Uint32Array(n * 2), b = new Float32Array(n * 2); a.set(idx); b.set(dist); idx = a; dist = b; order = new Uint32Array(n * 2); }
        idx[n] = i; dist[n] = d; n++;
      }
    }
    const ord = order.subarray(0, n);
    for (let k = 0; k < n; k++) ord[k] = k;
    ord.sort((a, b) => dist[a] - dist[b]);
    const counts = [0, 0, 0, 0, 0];
    let nNear = 0, nFar = 0, nShadow = 0;
    for (let k = 0; k < n; k++) {
      const i = idx[ord[k]], d = dist[ord[k]], kind = buf.kind[i], dm = dims[kind];
      const x = buf.x[i] / 8, z = buf.z[i] / 8, h = buf.h[i] / 10000, c = Math.cos(h), s = Math.sin(h);
      const r = LIN[buf.colour[i * 3]], g = LIN[buf.colour[i * 3 + 1]], b = LIN[buf.colour[i * 3 + 2]];
      if (d < NEAR && nNear < NEAR_MAX) {
        const m = near[kind], q = counts[kind]++;
        setInstance(m.instanceMatrix.array, q, x, LIFT, z, h);
        const C = m.instanceColor.array; C[q * 3] = r; C[q * 3 + 1] = g; C[q * 3 + 2] = b;
        nNear++;
      } else if (nFar < FAR_MAX) {
        setInstance(far.instanceMatrix.array, nFar, x - dm.zc * s, LIFT, z + dm.zc * c, h, dm.w, dm.h, dm.l);
        const C = far.instanceColor.array; C[nFar * 3] = r; C[nFar * 3 + 1] = g; C[nFar * 3 + 2] = b;
        nFar++;
      }
      if (d < SHADOW && nShadow < SHADOW_MAX) setInstance(shadows.instanceMatrix.array, nShadow++, x - dm.zc * s, LIFT + 0.02, z + dm.zc * c, h, dm.w * 1.45, 1, dm.l * 1.22);
    }
    near.forEach((m, kind) => commitInstances(m, counts[kind]));
    commitInstances(far, nFar);
    commitInstances(shadows, nShadow);
    shown = nNear + nFar;
  }

  function dispose() {
    for (const m of [...near, far, shadows]) { scene.remove(m); m.dispose(); }
    for (const g of [...geo, boxGeo, shadowGeo]) g.dispose();
    mat.dispose(); shadowMat.dispose();
  }
  return { refill, dispose, count: () => shown };
}
