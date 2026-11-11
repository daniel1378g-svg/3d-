// Street furniture: trees and lamps from data/ground.pack plus sparse trees in woodland cells.
// The lists are worked out per chunk when it loads (kept off the carriageways); the meshes are
// global InstancedMeshes that are refilled with what lies near the eye, within a triangle budget.
import { CHUNK, CHUNKS, HALF, hash2, setInstance, makeInstanced, commitInstances, triangleCount } from './util.js';
import { headingOf } from '../../data/geo.js';

const WOOD_PER_MILLE = 26;               // share of 3 m woodland cells that get a tree

export function createProps({ net, ground, models, scene }) {
  const { buf, meta } = ground;
  const WOOD = meta.cover.indexOf('wood'), RES = meta.res, SIZE = meta.size, CELLS = CHUNK / RES;
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const treeGeo = [0, 1, 2].map((v) => models.buildTreeGeometry(v));
  const lampGeo = models.buildLampGeometry();
  const treeTris = Math.max(1, treeGeo.reduce((s, g) => s + triangleCount(g), 0) / 3), lampTris = Math.max(1, triangleCount(lampGeo));
  let treeCap = 512, lampCap = 256, trees, lamps;
  const makeTrees = () => { trees = treeGeo.map((g) => makeInstanced(g, mat, treeCap)); scene.add(...trees); };
  const makeLamps = () => { lamps = makeInstanced(lampGeo, mat, lampCap); lamps.layers.set(1); scene.add(lamps); };
  makeTrees(); makeLamps();

  // Move a point off the carriageway to the nearer kerb, or report that it has to go.
  const q = {};
  function offRoad(x, z, clear, out) {
    out.x = x; out.z = z;
    const hit = net.nearest(x, z, 16);
    if (hit) {
      const need = net.width[hit.e] / 2 + clear;
      if (Math.abs(hit.d) < need) {
        net.pos(hit.e, hit.s, q);
        const push = (need - Math.abs(hit.d)) * (hit.d < 0 ? -1 : 1);
        out.x += -q.dz * push; out.z += q.dx * push;
      }
    }
    return !net.onRoad(out.x, out.z, clear * 0.5);
  }

  // Trees: [x, z, scale, rotation, variant] * n. Lamps: [x, z, heading] * n.
  function chunkProps(cx, cz) {
    const id = cz * CHUNKS + cx, t = [], l = [], o = {};
    const tree = (x, z, big) => {
      const h = hash2(Math.round(x * 8), Math.round(z * 8));
      t.push(x, z, (0.8 + ((h >>> 4) % 1000) / 2000) * big, ((h >>> 14) % 628) / 100, h % 3);
    };
    for (let i = buf.treeStart[id]; i < buf.treeStart[id + 1]; i++) if (offRoad(buf.treeX[i] / 8, buf.treeZ[i] / 8, 1.3, o)) tree(o.x, o.z, 1);
    if (WOOD >= 0) {
      const c0 = cx * CELLS, r0 = cz * CELLS;
      for (let r = r0; r < r0 + CELLS; r++) for (let c = c0; c < c0 + CELLS; c++) {
        if (buf.cover[r * SIZE + c] !== WOOD) continue;
        const h = hash2(c, r);
        if (h % 1000 >= WOOD_PER_MILLE) continue;
        const x = -HALF + (c + ((h >>> 10) % 100) / 100) * RES, z = -HALF + (r + ((h >>> 17) % 100) / 100) * RES;
        if (!net.onRoad(x, z, 3)) tree(x, z, 1.25);
      }
    }
    for (let i = buf.lampStart[id]; i < buf.lampStart[id + 1]; i++) {
      if (!offRoad(buf.lampX[i] / 8, buf.lampZ[i] / 8, 0.8, o)) continue;
      const hit = net.nearest(o.x, o.z, 16);
      let h = (hash2(i, 5) % 628) / 100;
      if (hit) { net.pos(hit.e, hit.s, q); h = headingOf(q.x - o.x, q.z - o.z); }      // arm over the road
      l.push(o.x, o.z, h);
    }
    return { trees: Float32Array.from(t), lamps: Float32Array.from(l) };
  }

  // Fill the meshes with what lies within `radius` of the eye, nearest first when over budget.
  function refill(chunks, ex, ez, radius, triBudget) {
    const maxTrees = Math.max(60, Math.floor(triBudget / treeTris)), maxLamps = Math.max(40, Math.floor((triBudget * 0.25) / lampTris));
    const pick = (key, stride, max) => {
      let r = radius, total = 0;
      const hist = new Uint32Array(64);
      for (const ch of chunks) {
        const a = ch.props && ch.props[key];
        if (!a) continue;
        for (let i = 0; i < a.length; i += stride) { const d = Math.hypot(a[i] - ex, a[i + 1] - ez); if (d < radius) { hist[Math.floor((d / radius) * 64)]++; total++; } }
      }
      if (total > max) { let sum = 0, b = 0; while (b < 64 && sum + hist[b] <= max) sum += hist[b++]; r = (b / 64) * radius; }
      return r;
    };
    const rt = pick('trees', 5, maxTrees), rl = pick('lamps', 3, maxLamps);
    let need = 0, needL = 0;
    for (const ch of chunks) { if (ch.props) { need += ch.props.trees.length / 5; needL += ch.props.lamps.length / 3; } }
    if (Math.min(need, maxTrees) > treeCap) { for (const m of trees) { scene.remove(m); m.dispose(); } while (treeCap < Math.min(need, maxTrees)) treeCap *= 2; makeTrees(); }
    if (Math.min(needL, maxLamps) > lampCap) { scene.remove(lamps); lamps.dispose(); while (lampCap < Math.min(needL, maxLamps)) lampCap *= 2; makeLamps(); }
    const n = [0, 0, 0];
    let nl = 0;
    for (const ch of chunks) {
      if (!ch.props) continue;
      const a = ch.props.trees, b = ch.props.lamps;
      for (let i = 0; i < a.length; i += 5) {
        const v = a[i + 4];
        if (n[v] >= treeCap || Math.hypot(a[i] - ex, a[i + 1] - ez) >= rt) continue;
        setInstance(trees[v].instanceMatrix.array, n[v]++, a[i], 0, a[i + 1], a[i + 3], a[i + 2], a[i + 2], a[i + 2]);
      }
      for (let i = 0; i < b.length; i += 3) {
        if (nl >= lampCap || Math.hypot(b[i] - ex, b[i + 1] - ez) >= rl) continue;
        setInstance(lamps.instanceMatrix.array, nl++, b[i], 0, b[i + 1], b[i + 2]);
      }
    }
    trees.forEach((m, v) => commitInstances(m, n[v]));
    commitInstances(lamps, nl);
  }

  function dispose() {
    for (const m of [...trees, lamps]) { scene.remove(m); m.dispose(); }
    for (const g of [...treeGeo, lampGeo]) g.dispose();
    mat.dispose();
  }
  return { chunkProps, refill, dispose };
}
