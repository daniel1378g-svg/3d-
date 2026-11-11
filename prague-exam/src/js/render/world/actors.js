// Everything that moves: cars and buses, trams and pedestrians, read straight from the frame's
// typed arrays into InstancedMeshes. Lamps (brake, tail, head, indicators) are small unlit quads
// in one extra instanced mesh, contact shadows a soft dark quad under each vehicle.
import { setInstance, makeInstanced, commitInstances } from './util.js';

export const VARIANTS = ['hatch', 'sedan', 'estate', 'suv', 'van', 'bus'];
const MAX_CARS = 64, MAX_TRAMS = 12, MAX_PEDS = 48;
const COL = { brake: 0xff1c10, tail: 0x8a0f08, head: 0xfff6dc, amber: 0xffa000 };

// Where the lamps sit, measured from the model itself so that any car shape works: the body's
// half width near each end at lamp height, and how far the surface reaches there.
function lampSpots(geo) {
  geo.computeBoundingBox();
  const bb = geo.boundingBox, P = geo.attributes.position, H = bb.max.y;
  const yTail = Math.min(0.62 * H, 1.05), yHead = Math.min(0.48 * H, 0.85);
  const scan = (y, rear) => {
    let hw = 0;
    for (let i = 0; i < P.count; i++) {
      const z = P.getZ(i);
      if (Math.abs(P.getY(i) - y) < 0.22 && (rear ? z > bb.max.z - 0.9 : z < bb.min.z + 0.9)) hw = Math.max(hw, Math.abs(P.getX(i)));
    }
    if (!hw) hw = Math.max(bb.max.x, -bb.min.x);
    const x = Math.max(0.3, hw - 0.24);
    let zs = rear ? -Infinity : Infinity;
    for (let i = 0; i < P.count; i++) {
      if (Math.abs(P.getY(i) - y) < 0.3 && Math.abs(Math.abs(P.getX(i)) - x) < 0.35) zs = rear ? Math.max(zs, P.getZ(i)) : Math.min(zs, P.getZ(i));
    }
    if (!Number.isFinite(zs)) zs = rear ? bb.max.z : bb.min.z;
    return { x, y, z: zs + (rear ? 0.02 : -0.02) };
  };
  return { tail: scan(yTail, true), head: scan(yHead, false), w: bb.max.x - bb.min.x, l: bb.max.z - bb.min.z, zc: (bb.max.z + bb.min.z) / 2 };
}

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 128;
  const g = c.getContext('2d');
  // A black block with a wide blur round it (shadowBlur also works in Safari, canvas filters do not).
  g.fillStyle = '#000'; g.shadowColor = '#000'; g.shadowBlur = 12;
  g.fillRect(16, 18, 32, 92);
  return new THREE.CanvasTexture(c);
}

export function createActors({ models, scene }) {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const carGeo = VARIANTS.map((v) => (v === 'bus' ? models.buildBusGeometry() : models.buildCarGeometry(v)));
  const spots = carGeo.map(lampSpots);
  const cars = carGeo.map((g) => makeInstanced(g, mat, MAX_CARS, { colour: true }));
  const tramGeo = models.buildTramGeometry(), tramSpot = lampSpots(tramGeo);
  const trams = makeInstanced(tramGeo, mat, MAX_TRAMS);
  const pedGeo = [models.buildPedestrianGeometry(0), models.buildPedestrianGeometry(1)];
  const peds = pedGeo.map((g) => makeInstanced(g, mat, MAX_PEDS));
  const lampGeo = new THREE.PlaneGeometry(1, 1);
  const lampMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false });
  const lamps = makeInstanced(lampGeo, lampMat, MAX_CARS * 8, { colour: true });
  const shadowGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  const shadowTex = shadowTexture();
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, color: 0x000000, transparent: true, opacity: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 });
  const shadows = makeInstanced(shadowGeo, shadowMat, MAX_CARS + MAX_TRAMS + MAX_PEDS);
  shadows.renderOrder = 5;
  scene.add(...cars, trams, ...peds, lamps, shadows);

  const tmp = new THREE.Color(), lampCol = {};
  for (const k in COL) lampCol[k] = tmp.setHex(COL[k]).toArray();
  const counts = new Int32Array(VARIANTS.length);

  function update(frame) {
    const C = frame.cars, T = frame.trams, P = frame.peds, t = frame.t || 0;
    const blink = (t * 1.5) % 1 < 0.5;
    let nl = 0, ns = 0;
    const LM = lamps.instanceMatrix.array, LC = lamps.instanceColor.array, SM = shadows.instanceMatrix.array;
    counts.fill(0);
    const nc = C ? Math.min(C.n | 0, C.x.length) : 0;
    for (let i = 0; i < nc; i++) {
      const v = C.variant[i] < VARIANTS.length ? C.variant[i] : 0, k = counts[v];
      if (k >= MAX_CARS) continue;
      const x = C.x[i], z = C.z[i], h = C.heading[i], c = Math.cos(h), s = Math.sin(h);
      counts[v] = k + 1;
      setInstance(cars[v].instanceMatrix.array, k, x, 0, z, h);
      tmp.setHex(C.colour[i]).toArray(cars[v].instanceColor.array, k * 3);
      const sp = spots[v], st = C.state[i];
      const lamp = (p, side, dx, w, hgt, col) => {
        if (nl >= MAX_CARS * 8) return;
        const lx = (p.x + dx) * side, lz = p.z;
        setInstance(LM, nl, x + lx * c - lz * s, p.y, z + lx * s + lz * c, h, w, hgt, 1);
        LC.set(col, nl * 3);
        nl++;
      };
      if (st & 1) { lamp(sp.tail, 1, 0, 0.3, 0.14, lampCol.brake); lamp(sp.tail, -1, 0, 0.3, 0.14, lampCol.brake); }
      else if (st & 8) { lamp(sp.tail, 1, 0, 0.26, 0.1, lampCol.tail); lamp(sp.tail, -1, 0, 0.26, 0.1, lampCol.tail); }
      if (st & 8) { lamp(sp.head, 1, 0, 0.26, 0.13, lampCol.head); lamp(sp.head, -1, 0, 0.26, 0.13, lampCol.head); }
      if (blink && st & 6) {
        if (st & 2) { lamp(sp.tail, -1, 0.17, 0.12, 0.12, lampCol.amber); lamp(sp.head, -1, 0.17, 0.12, 0.12, lampCol.amber); }
        if (st & 4) { lamp(sp.tail, 1, 0.17, 0.12, 0.12, lampCol.amber); lamp(sp.head, 1, 0.17, 0.12, 0.12, lampCol.amber); }
      }
      setInstance(SM, ns++, x - sp.zc * s, 0.05, z + sp.zc * c, h, sp.w * 1.45, 1, sp.l * 1.22);
    }
    cars.forEach((m, v) => commitInstances(m, counts[v]));
    const nt = T ? Math.min(T.n | 0, MAX_TRAMS, T.x.length) : 0;
    for (let i = 0; i < nt; i++) {
      setInstance(trams.instanceMatrix.array, i, T.x[i], 0, T.z[i], T.heading[i]);
      setInstance(SM, ns++, T.x[i], 0.05, T.z[i], T.heading[i], tramSpot.w * 1.4, 1, tramSpot.l * 1.1);
    }
    commitInstances(trams, nt);
    const np = P ? Math.min(P.n | 0, P.x.length) : 0;
    let n0 = 0, n1 = 0;
    for (let i = 0; i < np; i++) {
      const ph = P.phase ? P.phase[i] : 0, pose = ((ph * 2) | 0) & 1, bob = 0.035 * Math.abs(Math.sin(ph * 2 * Math.PI));
      if (pose ? n1 >= MAX_PEDS : n0 >= MAX_PEDS) continue;
      setInstance(peds[pose].instanceMatrix.array, pose ? n1++ : n0++, P.x[i], bob, P.z[i], P.heading[i]);
      if (ns < MAX_CARS + MAX_TRAMS + MAX_PEDS) setInstance(SM, ns++, P.x[i], 0.05, P.z[i], P.heading[i], 0.9, 1, 0.8);
    }
    commitInstances(peds[0], n0); commitInstances(peds[1], n1);
    commitInstances(lamps, nl);
    commitInstances(shadows, ns);
  }

  function dispose() {
    for (const m of [...cars, trams, ...peds, lamps, shadows]) { scene.remove(m); m.dispose(); }
    for (const g of [...carGeo, tramGeo, ...pedGeo, lampGeo, shadowGeo]) g.dispose();
    mat.dispose(); lampMat.dispose(); shadowMat.dispose(); shadowTex.dispose();
  }
  return { update, dispose };
}
