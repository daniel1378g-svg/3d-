// Measures, along the whole journey, how close the camera gets to the scene and checks that the
// near plane (src/journey/depth-range.js) always stays in front of everything.
//
// node scripts/measure-clearance.mjs [--base http://127.0.0.1:8080/] [--step 0.0025] [--out file.json]
//
// For every journey position t = 0..1 (step --step) and for the intro fly-in (t = 0, intro 0..0.95)
// the page's own frame code runs with drawing disabled (renderer.render is a no-op), so the camera,
// the car and the near/far planes are exactly those of a real frame. Then, in world space:
//   car     distance from the eye to the car's exact bounding box (all its meshes),
//   world   distance to every other mesh: triangles for meshes wider than 60 m (terrain, hills,
//           track strips), the world bounding box of smaller meshes, the box of every instance of
//           an InstancedMesh (trees, tufts, posts); all lower bounds of the true distance,
//   sprites view depth of every sprite whose quad overlaps the view frustum (clouds).
// A frame passes when near < min(car, world, sprites). Prints a summary and exits non-zero on a
// failure.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const base = arg('base', 'http://127.0.0.1:8080/');
const step = +arg('step', '0.0025');
const out = arg('out', '');

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const messages = [];
page.on('pageerror', (e) => messages.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') messages.push(m.type() + ': ' + m.text());
});
await page.goto(`${base}index.html?capture=1&3d=force&q=high`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__cap === 'function' && window.__journey, null, {
  timeout: 300000,
});

const result = await page.evaluate((step) => {
  const J = window.__journey;
  const { renderer, scene, camera } = J;
  const carRoot = J.car.root;
  const Vector3 = camera.position.constructor;
  const Matrix4 = camera.matrixWorld.constructor;
  const render = renderer.render;
  renderer.render = () => {};
  scene.updateMatrixWorld(true);

  // --- scene inventory -------------------------------------------------------------------------
  const isSky = (o) =>
    o.isMesh && o.geometry.type === 'SphereGeometry' && o.geometry.parameters.radius > 1000;
  const inCar = (o) => {
    for (let p = o; p; p = p.parent) if (p === carRoot) return true;
    return false;
  };
  const small = []; // meshes: AABB per sample
  const instanced = []; // [name, minX, minY, minZ, maxX, maxY, maxZ] per instance (static)
  const triangles = []; // flat world-space triangles of large meshes, 9 floats each, plus mesh index
  const triNames = [];
  const triMeshes = [];
  const shown = (o) => {
    for (let p = o; p; p = p.parent) if (!p.visible) return false;
    return true;
  };
  const sprites = [];
  const v = new Vector3();
  const m = new Matrix4();
  scene.traverse((o) => {
    if (isSky(o) || inCar(o)) return;
    if (o.isSprite) return void sprites.push(o);
    if (!o.isMesh) return;
    const g = o.geometry;
    if (!g.boundingBox) g.computeBoundingBox();
    const name = o.name || o.parent?.name || g.type;
    if (o.isInstancedMesh) {
      const box = g.boundingBox.clone();
      for (let i = 0; i < o.count; i++) {
        o.getMatrixAt(i, m);
        m.premultiply(o.matrixWorld);
        box.copy(g.boundingBox).applyMatrix4(m);
        instanced.push([
          name + ' (instance)',
          box.min.x,
          box.min.y,
          box.min.z,
          box.max.x,
          box.max.y,
          box.max.z,
        ]);
      }
      return;
    }
    const box = g.boundingBox.clone().applyMatrix4(o.matrixWorld);
    if (box.max.x - box.min.x > 60 || box.max.z - box.min.z > 60) {
      const pos = g.attributes.position;
      const idx = g.index;
      const n = idx ? idx.count : pos.count;
      triNames.push(name);
      triMeshes.push(o);
      for (let i = 0; i + 2 < n; i += 3)
        for (let k = 0; k < 3; k++) {
          v.fromBufferAttribute(pos, idx ? idx.getX(i + k) : i + k).applyMatrix4(o.matrixWorld);
          triangles.push(v.x, v.y, v.z);
          if (k === 2) triangles.push(triNames.length - 1);
        }
    } else small.push(o);
  });
  const T = Float64Array.from(triangles);
  const triCount = T.length / 10;
  // per-triangle AABB for pruning
  const TB = new Float64Array(triCount * 6);
  for (let t = 0; t < triCount; t++) {
    const o = t * 10;
    TB[t * 6] = Math.min(T[o], T[o + 3], T[o + 6]);
    TB[t * 6 + 1] = Math.min(T[o + 1], T[o + 4], T[o + 7]);
    TB[t * 6 + 2] = Math.min(T[o + 2], T[o + 5], T[o + 8]);
    TB[t * 6 + 3] = Math.max(T[o], T[o + 3], T[o + 6]);
    TB[t * 6 + 4] = Math.max(T[o + 1], T[o + 4], T[o + 7]);
    TB[t * 6 + 5] = Math.max(T[o + 2], T[o + 5], T[o + 8]);
  }
  const boxDist = (p, x0, y0, z0, x1, y1, z1) => {
    const dx = Math.max(0, x0 - p.x, p.x - x1);
    const dy = Math.max(0, y0 - p.y, p.y - y1);
    const dz = Math.max(0, z0 - p.z, p.z - z1);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };
  // closest point on a triangle (Ericson, Real-Time Collision Detection 5.1.5)
  const triDist = (p, o) => {
    const ax = T[o],
      ay = T[o + 1],
      az = T[o + 2],
      bx = T[o + 3],
      by = T[o + 4],
      bz = T[o + 5];
    const cx = T[o + 6],
      cy = T[o + 7],
      cz = T[o + 8];
    const abx = bx - ax,
      aby = by - ay,
      abz = bz - az,
      acx = cx - ax,
      acy = cy - ay,
      acz = cz - az;
    const apx = p.x - ax,
      apy = p.y - ay,
      apz = p.z - az;
    const d1 = abx * apx + aby * apy + abz * apz,
      d2 = acx * apx + acy * apy + acz * apz;
    const at = (x, y, z) => Math.hypot(p.x - x, p.y - y, p.z - z);
    if (d1 <= 0 && d2 <= 0) return at(ax, ay, az);
    const bpx = p.x - bx,
      bpy = p.y - by,
      bpz = p.z - bz;
    const d3 = abx * bpx + aby * bpy + abz * bpz,
      d4 = acx * bpx + acy * bpy + acz * bpz;
    if (d3 >= 0 && d4 <= d3) return at(bx, by, bz);
    const vc = d1 * d4 - d3 * d2;
    if (vc <= 0 && d1 >= 0 && d3 <= 0) {
      const w = d1 / (d1 - d3);
      return at(ax + w * abx, ay + w * aby, az + w * abz);
    }
    const cpx = p.x - cx,
      cpy = p.y - cy,
      cpz = p.z - cz;
    const d5 = abx * cpx + aby * cpy + abz * cpz,
      d6 = acx * cpx + acy * cpy + acz * cpz;
    if (d6 >= 0 && d5 <= d6) return at(cx, cy, cz);
    const vb = d5 * d2 - d1 * d6;
    if (vb <= 0 && d2 >= 0 && d6 <= 0) {
      const w = d2 / (d2 - d6);
      return at(ax + w * acx, ay + w * acy, az + w * acz);
    }
    const va = d3 * d6 - d5 * d4;
    if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
      const w = (d4 - d3) / (d4 - d3 + (d5 - d6));
      return at(bx + w * (cx - bx), by + w * (cy - by), bz + w * (cz - bz));
    }
    const denom = 1 / (va + vb + vc);
    const vv = vb * denom,
      ww = vc * denom;
    return at(ax + abx * vv + acx * ww, ay + aby * vv + acy * ww, az + abz * vv + acz * ww);
  };

  // --- sweep -----------------------------------------------------------------------------------
  const samples = [];
  for (let i = 0; i <= Math.round(1 / step); i++) samples.push({ t: +(i * step).toFixed(6), intro: 1 });
  for (let k = 0; k < 20; k++) samples.push({ t: 0, intro: k * 0.05 });
  const rows = [];
  const forward = new Vector3();
  for (const s of samples) {
    J.renderAt(s.t, { intro: s.intro });
    scene.updateMatrixWorld(true);
    const eye = camera.position;
    camera.getWorldDirection(forward);
    // car: exact bounding box of all car meshes in their current pose
    let car = Infinity;
    carRoot.traverse((o) => {
      if (!o.isMesh || !o.visible) return;
      const g = o.geometry;
      if (!g.boundingBox) g.computeBoundingBox();
      const b = g.boundingBox.clone().applyMatrix4(o.matrixWorld);
      car = Math.min(car, boxDist(eye, b.min.x, b.min.y, b.min.z, b.max.x, b.max.y, b.max.z));
    });
    let world = Infinity;
    let what = '';
    const meshShown = triMeshes.map(shown);
    for (const o of small) {
      if (!shown(o)) continue;
      const b = o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);
      const d = boxDist(eye, b.min.x, b.min.y, b.min.z, b.max.x, b.max.y, b.max.z);
      if (d < world) {
        world = d;
        what = o.name || o.parent?.name || o.geometry.type;
      }
    }
    for (const r of instanced) {
      const d = boxDist(eye, r[1], r[2], r[3], r[4], r[5], r[6]);
      if (d < world) {
        world = d;
        what = r[0];
      }
    }
    for (let t = 0; t < triCount; t++) {
      const q = t * 6;
      if (!meshShown[T[t * 10 + 9]]) continue;
      if (boxDist(eye, TB[q], TB[q + 1], TB[q + 2], TB[q + 3], TB[q + 4], TB[q + 5]) >= world) continue;
      const d = triDist(eye, t * 10);
      if (d < world) {
        world = d;
        what = triNames[T[t * 10 + 9]] + ' (triangles)';
      }
    }
    // sprites: camera-facing quads at the view depth of their centre; they count only when the
    // quad overlaps the view frustum (projected through this frame's projection matrix)
    let sprite = Infinity;
    const view = camera.matrixWorldInverse;
    const proj = camera.projectionMatrix.elements;
    for (const o of sprites) {
      if (!shown(o)) continue;
      const c = v.setFromMatrixPosition(o.matrixWorld).applyMatrix4(view);
      const depth = -c.z;
      if (!(depth > 0)) continue;
      const e = o.matrixWorld.elements;
      const hx = 0.5 * Math.hypot(e[0], e[1], e[2]);
      const hy = 0.5 * Math.hypot(e[4], e[5], e[6]);
      // NDC extent of the quad: x' = (P00 x + P02 z) / -z, y' = (P11 y + P12 z) / -z
      const x0 = (proj[0] * (c.x - hx) + proj[8] * c.z) / depth;
      const x1 = (proj[0] * (c.x + hx) + proj[8] * c.z) / depth;
      const y0 = (proj[5] * (c.y - hy) + proj[9] * c.z) / depth;
      const y1 = (proj[5] * (c.y + hy) + proj[9] * c.z) / depth;
      if (x1 < -1 || x0 > 1 || y1 < -1 || y0 > 1) continue;
      sprite = Math.min(sprite, depth);
    }
    const clearance = Math.min(car, world, sprite);
    rows.push({
      t: s.t,
      intro: s.intro,
      eye: [eye.x, eye.y, eye.z].map((x) => +x.toFixed(2)),
      near: +camera.near.toFixed(4),
      far: +camera.far.toFixed(1),
      car: +car.toFixed(3),
      world: +world.toFixed(3),
      sprite: +sprite.toFixed(1),
      nearest: clearance === car ? 'car' : clearance === sprite ? 'sprite' : what,
      ratio: +(clearance / camera.near).toFixed(3),
    });
  }
  renderer.render = render;
  return {
    rows,
    counts: {
      small: small.length,
      instances: instanced.length,
      triangles: triCount,
      sprites: sprites.length,
    },
  };
}, step);

const rows = result.rows;
const fails = rows.filter((r) => !(r.near < Math.min(r.car, r.world, r.sprite)));
const worst = [...rows].sort((a, b) => a.ratio - b.ratio).slice(0, 8);
const minCar = rows.reduce((a, r) => (r.car < a.car ? r : a));
const minWorld = rows.reduce((a, r) => (r.world < a.world ? r : a));
const maxNear = rows.reduce((a, r) => (r.near > a.near ? r : a));
console.log('scene:', JSON.stringify(result.counts), 'samples:', rows.length);
console.log('closest car approach   ', JSON.stringify(minCar));
console.log('closest world approach ', JSON.stringify(minWorld));
console.log('largest near plane     ', JSON.stringify(maxNear));
console.log('lowest clearance / near ratios:');
for (const r of worst) console.log('  ', JSON.stringify(r));
for (const t of [0.05, 0.12, 0.345, 0.365, 0.375, 0.385, 0.4, 0.5, 0.95])
  console.log('  at', JSON.stringify(rows.find((r) => r.intro === 1 && Math.abs(r.t - t) < 1e-9) || {}));
if (out) writeFileSync(out, JSON.stringify(rows, null, 1));
console.log(
  fails.length
    ? `FAIL: near plane clips geometry in ${fails.length} frames`
    : 'OK: near < clearance in every frame',
);
console.log('PAGE MESSAGES:' + (messages.length ? '\n' + [...new Set(messages)].join('\n') : ' none'));
await browser.close();
process.exit(fails.length ? 1 : 0);
