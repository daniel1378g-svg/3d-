// Traffic lights. Every signal stop line gets a pole with a three-lamp head on the right-hand
// kerb, wide approaches a second one on the left. Poles, dark lenses and the lit glow are three
// global instanced meshes that hold the heads of the loaded chunks; the glow is rewritten every
// frame from net.signalState so the lamps follow the simulation exactly.
import { CTRL, SIG } from '../../sim/roadnet.js';
import { CHUNKS, chunkCoord, setInstance, makeInstanced, commitInstances } from './util.js';

const RANGE = 250;                       // lamps are lit within this distance of the eye
const LIT = { red: 0xff2a14, amber: 0xffa214, green: 0x1dff84 };
const DARK = { red: 0x3a0c08, amber: 0x3a2606, green: 0x06301a };

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d'), grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)'); grad.addColorStop(0.24, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.42)'); grad.addColorStop(0.6, 'rgba(255,255,255,0.12)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export function createSignals({ net, models, scene }) {
  // ---- where the heads stand --------------------------------------------------------------------
  const heads = [];
  const p = {};
  for (const l of net.lines) {
    if (l.kind !== CTRL.SIGNAL) continue;
    const lanes = Math.max(1, net.lanes(l.e, l.dir)), lw = net.laneWidth(l.e);
    net.lanePos(l.e, l.dir, lanes - 1, l.s, p);
    const h = p.h, rx = Math.cos(h), rz = Math.sin(h), fx = Math.sin(h), fz = -Math.cos(h);
    const off = lw / 2 + 0.8;
    heads.push({ x: p.x + rx * off + fx * 0.5, z: p.z + rz * off + fz * 0.5, h, ctrl: l.ctrlId, phase: l.phase });
    if (lanes >= 3) {
      // Repeater on the far left kerb of the whole road (the left kerb itself on one-way roads).
      const left = (lanes - 0.5) * lw + (net.oneway(l.e) ? 0 : net.lanes(l.e, -l.dir) * lw) + 0.8;
      heads.push({ x: p.x - rx * left + fx * 0.5, z: p.z - rz * left + fz * 0.5, h, ctrl: l.ctrlId, phase: l.phase });
    }
  }
  const byChunk = new Map();
  heads.forEach((hd, i) => {
    const id = chunkCoord(hd.z) * CHUNKS + chunkCoord(hd.x);
    if (!byChunk.has(id)) byChunk.set(id, []);
    byChunk.get(id).push(i);
  });

  // ---- meshes -----------------------------------------------------------------------------------
  const L = models.SIGNAL_LAMPS, R = L.radius || 0.1;
  const lampKeys = ['red', 'amber', 'green'];
  const poleGeo = models.buildSignalGeometry();
  const poleMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const lensGeo = new THREE.CircleGeometry(R, 12).rotateY(Math.PI);
  const lensMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const glowGeo = new THREE.PlaneGeometry(1, 1).rotateY(Math.PI);
  const glowTex = glowTexture();
  const glowMat = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false });
  let cap = 64, poles, lenses, glow;
  const make = () => {
    poles = makeInstanced(poleGeo, poleMat, cap);
    lenses = makeInstanced(lensGeo, lensMat, cap * 3, { colour: true });
    glow = makeInstanced(glowGeo, glowMat, cap * 2, { colour: true });
    glow.renderOrder = 20;
    lenses.layers.set(1); glow.layers.set(1);                    // not drawn in the mirrors
    scene.add(poles, lenses, glow);
  };
  const drop = () => { for (const m of [poles, lenses, glow]) { scene.remove(m); m.dispose(); } };
  make();

  const col = new THREE.Color();
  const lit = {}, dark = {};
  for (const k of lampKeys) { lit[k] = col.setHex(LIT[k]).toArray(); dark[k] = col.setHex(DARK[k]).toArray(); }
  let active = [];

  // Lamp position in the world for a head whose front faces heading hm.
  const lampAt = (hd, key, forward, out) => {
    const hm = hd.h + Math.PI, c = Math.cos(hm), s = Math.sin(hm), l = L[key], lz = l[2] - forward;
    out.x = hd.x + l[0] * c - lz * s; out.y = l[1]; out.z = hd.z + l[0] * s + lz * c;
    return out;
  };

  function refill(chunkIds) {
    active = [];
    for (const id of chunkIds) { const list = byChunk.get(id); if (list) for (const i of list) active.push(heads[i]); }
    if (active.length > cap) { drop(); while (cap < active.length) cap *= 2; make(); }
    const q = {};
    active.forEach((hd, i) => {
      setInstance(poles.instanceMatrix.array, i, hd.x, 0, hd.z, hd.h + Math.PI);
      lampKeys.forEach((key, k) => {
        lampAt(hd, key, 0.012, q);
        setInstance(lenses.instanceMatrix.array, i * 3 + k, q.x, q.y, q.z, hd.h + Math.PI);
        lenses.instanceColor.array.set(dark[key], (i * 3 + k) * 3);
      });
    });
    commitInstances(poles, active.length);
    commitInstances(lenses, active.length * 3);
  }

  // Lit lamps for this instant. Far heads grow a little so the colour stays readable.
  function update(t, ex, ez) {
    let n = 0;
    const q = {}, M = glow.instanceMatrix.array, C = glow.instanceColor.array;
    for (const hd of active) {
      const d = Math.hypot(hd.x - ex, hd.z - ez);
      if (d > RANGE) continue;
      const st = net.signalState(hd.ctrl, hd.phase, t);
      const size = (R / 0.25) * 2 * Math.max(1, Math.min(2.4, d / 28));
      const add = (key) => {
        lampAt(hd, key, 0.03, q);
        setInstance(M, n, q.x, q.y, q.z, hd.h + Math.PI, size, size, 1);
        C.set(lit[key], n * 3);
        n++;
      };
      if (st === SIG.GREEN) add('green');
      else if (st === SIG.AMBER) add('amber');
      else { add('red'); if (st === SIG.RED_AMBER) add('amber'); }
    }
    commitInstances(glow, n);
  }

  function dispose() { drop(); poleGeo.dispose(); lensGeo.dispose(); glowGeo.dispose(); poleMat.dispose(); lensMat.dispose(); glowMat.dispose(); glowTex.dispose(); }
  return { refill, update, dispose, heads, get active() { return active; } };
}
