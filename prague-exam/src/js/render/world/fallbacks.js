// FALLBACKS. Plain stand-ins for modules that other people own, used only while the real file is
// missing or unfinished (see world/deps.js for which ones are switched in). They follow the same
// APIs so that the world renderer and the game run end to end; they are not meant to look good.
import { LIN, CHUNK, CHUNKS, HALF, chunkCoord } from './util.js';

// ---- facade atlas: used when createFacadeAtlas() returns nothing --------------------------------
export function fallbackFacadeAtlas() {
  const names = ['tenement', 'panel', 'modern', 'office', 'industrial', 'house', 'garage', 'civic'];
  const W = 512, ROW = 64, H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const g = canvas.getContext('2d');
  g.fillStyle = '#f4f2ee'; g.fillRect(0, 0, W, H);
  const styles = {};
  names.forEach((name, i) => {
    const bay = W / 4, yg = i * 2 * ROW, yu = yg + ROW;
    const glass = name === 'modern' || name === 'office' ? '#5f7f95' : '#46525c';
    for (let b = 0; b < 4; b++) {
      const x = b * bay;
      g.fillStyle = '#d9d5cc'; g.fillRect(x, yg + ROW - 8, bay, 8);                     // plinth
      if (name === 'garage' || name === 'industrial') { g.fillStyle = '#8a8d90'; g.fillRect(x + bay * 0.15, yg + 14, bay * 0.7, ROW - 14); }
      else if (b === 1) { g.fillStyle = '#5a4636'; g.fillRect(x + bay * 0.32, yg + 16, bay * 0.36, ROW - 16); }   // door
      else { g.fillStyle = glass; g.fillRect(x + bay * 0.2, yg + 14, bay * 0.6, ROW - 30); }
      if (name !== 'garage') {
        g.fillStyle = '#fbfaf7'; g.fillRect(x + bay * 0.24, yu + 12, bay * 0.52, ROW - 26);
        g.fillStyle = glass; g.fillRect(x + bay * 0.28, yu + 15, bay * 0.44, ROW - 32);
      }
    }
    g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(0, yu, W, 2);
    const v = (y) => 1 - y / H, e = 0.5 / H;
    styles[name] = { ground: [v(yg + ROW) + e, v(yg) - e], upper: [v(yu + ROW) + e, v(yu) - e], bay: name === 'panel' ? 3.6 : 3.1, floor: name === 'tenement' ? 3.4 : 3 };
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return { texture, styles };
}

// ---- models: boxes with vertex colours, origin on the ground, front towards -z --------------------
export function boxes(list) {
  const pos = [], nrm = [], col = [];
  const F = [[1, 0, 0, 0, 0, -1, 0, 1, 0], [-1, 0, 0, 0, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 0, 0, 0, -1], [0, -1, 0, 1, 0, 0, 0, 0, 1], [0, 0, 1, 1, 0, 0, 0, 1, 0], [0, 0, -1, -1, 0, 0, 0, 1, 0]];
  for (const [w, h, d, x, y, z, hex] of list) {
    const c = [LIN[(hex >> 16) & 255], LIN[(hex >> 8) & 255], LIN[hex & 255]], s = [w / 2, h / 2, d / 2], o = [x, y + h / 2, z];
    for (const [nx, ny, nz, ux, uy, uz, vx, vy, vz] of F) {
      const P = (a, b) => [o[0] + (nx + ux * a + vx * b) * s[0], o[1] + (ny + uy * a + vy * b) * s[1], o[2] + (nz + uz * a + vz * b) * s[2]];
      for (const [a, b] of [[-1, -1], [1, -1], [1, 1], [-1, -1], [1, 1], [-1, 1]]) { pos.push(...P(a, b)); nrm.push(nx, ny, nz); col.push(...c); }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return g;
}
const wheels = (hw, zf, zr) => [[0.22, 0.62, 0.62, hw, 0, zf, 0x1c1c1e], [0.22, 0.62, 0.62, -hw, 0, zf, 0x1c1c1e], [0.22, 0.62, 0.62, hw, 0, zr, 0x1c1c1e], [0.22, 0.62, 0.62, -hw, 0, zr, 0x1c1c1e]];
const CARS = {
  hatch: [[1.74, 0.62, 4.0, 0, 0.28, 0, 0xffffff], [1.6, 0.56, 2.3, 0, 0.9, 0.35, 0x28323a], ...wheels(0.8, -1.25, 1.25)],
  sedan: [[1.8, 0.6, 4.6, 0, 0.28, 0, 0xffffff], [1.62, 0.54, 2.1, 0, 0.88, 0.2, 0x28323a], ...wheels(0.82, -1.45, 1.4)],
  estate: [[1.8, 0.62, 4.7, 0, 0.28, 0, 0xffffff], [1.64, 0.56, 3.0, 0, 0.9, 0.65, 0x28323a], ...wheels(0.82, -1.45, 1.45)],
  suv: [[1.9, 0.78, 4.6, 0, 0.34, 0, 0xffffff], [1.74, 0.6, 2.8, 0, 1.12, 0.5, 0x28323a], ...wheels(0.86, -1.4, 1.4)],
  van: [[1.96, 1.5, 5.2, 0, 0.36, 0.2, 0xffffff], [1.9, 0.7, 0.5, 0, 1.1, -2.2, 0x28323a], ...wheels(0.9, -1.6, 1.7)],
};
export const fallbackModels = {
  buildCarGeometry: (variant) => boxes(CARS[variant] || CARS.hatch),
  buildBusGeometry: () => boxes([[2.5, 2.6, 12, 0, 0.35, 0, 0xffffff], [2.52, 0.9, 11.4, 0, 1.5, 0, 0x26303a], ...wheels(1.1, -3.6, 3.4)]),
  buildTramGeometry: () => boxes([[2.4, 1.2, 14.6, 0, 0.3, 0, 0xb3202a], [2.42, 0.95, 14.2, 0, 1.5, 0, 0x26303a], [2.4, 0.6, 14.6, 0, 2.45, 0, 0xe8e2d0], [0.1, 0.5, 2.0, 0, 3.05, 0, 0x303030]]),
  buildPedestrianGeometry: (pose) => boxes([[0.2, 0.85, 0.2, -0.1, 0, pose ? 0.12 : -0.12, 0x2a3a55], [0.2, 0.85, 0.2, 0.1, 0, pose ? -0.12 : 0.12, 0x2a3a55], [0.46, 0.62, 0.26, 0, 0.85, 0, 0x7a3b32], [0.22, 0.24, 0.22, 0, 1.5, 0, 0xd9a987]]),
  buildTreeGeometry: (v) => boxes([[0.35, 2.6, 0.35, 0, 0, 0, 0x4a3b2c], [4 + v * 0.6, 3.2, 4 + v * 0.6, 0, 2.4, 0, [0x4f7a3a, 0x5d8440, 0x466b38][v % 3]], [2.6, 1.6, 2.6, 0, 5.4, 0, [0x5a8742, 0x6a9048, 0x4e773e][v % 3]]]),
  buildLampGeometry: () => boxes([[0.14, 8, 0.14, 0, 0, 0, 0x6f7377], [0.1, 0.1, 1.6, 0, 7.9, -0.8, 0x6f7377], [0.3, 0.12, 0.6, 0, 7.82, -1.6, 0xdadad2]]),
  buildSignalGeometry: () => boxes([[0.14, 3.4, 0.14, 0, 0, 0, 0x5b5f63], [0.36, 1.05, 0.3, 0, 2.3, -0.2, 0x1b1c1e]]),
  SIGNAL_LAMPS: { red: [0, 3.15, -0.35], amber: [0, 2.83, -0.35], green: [0, 2.51, -0.35], radius: 0.11 },
  buildPoleGeometry: (height) => boxes([[0.07, height, 0.07, 0, 0, 0, 0x8a8e91]]),
  buildShelterGeometry: () => boxes([[4.2, 0.12, 1.6, 0, 2.4, 0, 0x4a4f55], [4.2, 2.2, 0.08, 0, 0.2, 0.75, 0x9fb4c0], [0.1, 2.4, 0.1, -2, 0, -0.7, 0x4a4f55], [0.1, 2.4, 0.1, 2, 0, -0.7, 0x4a4f55]]),
};

// ---- streets: plain grey ribbons on a flat ground plane -----------------------------------------
// FALLBACK for src/js/render/streets.js. Same API: { ground, buildChunk(cx, cz), disposeChunk(group) }.
export function createFallbackStreets({ net }) {
  const groundMat = new THREE.MeshLambertMaterial({ color: 0x8f9a83 });
  const roadMat = new THREE.MeshLambertMaterial({ color: 0x55585c });
  // Subdivided and well below the ribbons: depth across one enormous triangle is not exact enough.
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(2 * HALF + 2400, 2 * HALF + 2400, 48, 48).rotateX(-Math.PI / 2), groundMat);
  ground.position.y = -0.1;
  const byChunk = new Map();
  for (let e = 0; e < net.E; e++) {
    const m = net.pos(e, net.len[e] / 2), id = chunkCoord(m.z) * CHUNKS + chunkCoord(m.x);
    if (!byChunk.has(id)) byChunk.set(id, []);
    byChunk.get(id).push(e);
  }
  function buildChunk(cx, cz) {
    const group = new THREE.Group();
    const pos = [];
    for (const e of byChunk.get(cz * CHUNKS + cx) || []) {
      const hw = net.width[e] / 2;
      for (let p = net.edgePt[e]; p < net.edgePt[e + 1] - 1; p++) {
        const ax = net.ptX[p], az = net.ptZ[p], bx = net.ptX[p + 1], bz = net.ptZ[p + 1], L = Math.hypot(bx - ax, bz - az) || 1;
        const nx = (-(bz - az) / L) * hw, nz = ((bx - ax) / L) * hw;
        pos.push(ax - nx, 0.02, az - nz, ax + nx, 0.02, az + nz, bx + nx, 0.02, bz + nz, ax - nx, 0.02, az - nz, bx + nx, 0.02, bz + nz, bx - nx, 0.02, bz - nz);
      }
    }
    if (pos.length) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(new Float32Array(pos.length).map((v, i) => (i % 3 === 1 ? 1 : 0)), 3));
      const mesh = new THREE.Mesh(g, roadMat);
      mesh.material.side = THREE.DoubleSide;
      group.add(mesh);
    }
    return group;
  }
  function disposeChunk(group) { group.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); }
  return { ground, buildChunk, disposeChunk, CHUNK };
}
