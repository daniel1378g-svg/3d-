// Converts the source GLB models into the compact packs the site loads.
//
//   node tools/prepare-models.mjs [m4] [s1000]
//
// Sources (not committed, see README): dev/raw/m4.glb, dev/raw/s1000.glb
// Output: public/models/<name>.json  =  { meta, data }   where data = base64(gzip(GLB))
//
// What it does: bakes the node hierarchy (and the motorcycle's skin) into a few merged meshes, rotates and scales
// the vehicle to real size in the site's coordinate system (+X front, +Y up, +Z right, origin on the ground at
// mid-wheelbase), keeps the doors as separate groups with their hinge position, converts textures to WebP,
// quantizes vertex data. The pack is a normal GLB inside, so three's GLTFLoader reads it. No Draco/Meshopt
// compression is used because the hosted preview cannot run WebAssembly decoders; gzip is inflated natively.
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { clearNodeTransform, dedup, join, prune, quantize, simplify, textureCompress, weld } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';
import { gzipSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join as pathJoin } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const outDir = pathJoin(root, 'public/models');
mkdirSync(outDir, { recursive: true });
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
await MeshoptSimplifier.ready;

// ---- small column-major mat4 helpers -------------------------------------------------------------------------
const mul = (a, b) => {
  const o = new Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return o;
};
const point = (m, p) => [m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]];
const rotY = (a) => { const c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; };
const translate = (x, y, z) => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
const scale = (s) => [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1];
const IDENTITY = scale(1);

/** Top-level ancestor name of a node (the child of the model's root container). */
function topName(node, depthNames) {
  let n = node, chain = [];
  while (n && n.propertyType === 'Node') { chain.push(n.getName()); n = n.getParentNode(); }
  // chain = [self, ..., container nodes]; pick the last one that is not a container
  for (let i = chain.length - 1; i >= 0; i--) if (!depthNames.includes(chain[i])) return chain[i];
  return chain[0];
}

function bounds(doc, filter = () => true) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity], v = [0, 0, 0];
  for (const node of doc.getRoot().listNodes()) {
    const mesh = node.getMesh();
    if (!mesh || !filter(node)) continue;
    const m = node.getWorldMatrix();
    for (const prim of mesh.listPrimitives()) {
      const pos = prim.getAttribute('POSITION');
      for (let i = 0; i < pos.getCount(); i++) {
        const p = point(m, pos.getElement(i, v));
        for (let k = 0; k < 3; k++) { if (p[k] < min[k]) min[k] = p[k]; if (p[k] > max[k]) max[k] = p[k]; }
      }
    }
  }
  return { min, max };
}

function triangles(doc) {
  let t = 0;
  for (const mesh of doc.getRoot().listMeshes()) for (const p of mesh.listPrimitives()) t += (p.getIndices() ? p.getIndices().getCount() : p.getAttribute('POSITION').getCount()) / 3;
  return Math.round(t);
}

/** Move every mesh node under named group nodes at the scene root, with its world transform baked into the vertices. */
function regroup(doc, groupOf, normalise) {
  const scene = doc.getRoot().listScenes()[0];
  const groups = new Map();
  const meshNodes = doc.getRoot().listNodes().filter((n) => n.getMesh());
  const worlds = new Map(meshNodes.map((n) => [n, n.getWorldMatrix()]));
  const oldRoots = scene.listChildren();
  for (const node of meshNodes) {
    const name = groupOf(node);
    if (name === null) { node.setMesh(null); continue; }
    if (!groups.has(name)) { const g = doc.createNode(name); scene.addChild(g); groups.set(name, g); }
    const copy = doc.createNode(node.getName()).setMesh(node.getMesh().clone()).setMatrix(mul(normalise, worlds.get(node)));
    for (const p of copy.getMesh().listPrimitives()) for (const a of ['JOINTS_0', 'WEIGHTS_0', 'TANGENT', 'COLOR_0']) p.setAttribute(a, null);
    groups.get(name).addChild(copy);
    node.setMesh(null);
  }
  for (const r of oldRoots) r.dispose();
  for (const g of groups.values()) for (const child of g.listChildren()) clearNodeTransform(child);
  return groups;
}

/** Replace skinned vertex data by its posed positions in world space. */
function bakeSkins(doc) {
  const v = [0, 0, 0], j = [0, 0, 0, 0], w = [0, 0, 0, 0], ibm = new Array(16);
  let baked = 0;
  for (const node of doc.getRoot().listNodes()) {
    const skin = node.getSkin(), mesh = node.getMesh();
    if (!skin || !mesh) continue;
    const joints = skin.listJoints(), inverse = skin.getInverseBindMatrices();
    const mats = joints.map((joint, i) => mul(joint.getWorldMatrix(), inverse ? inverse.getElement(i, ibm).slice() : IDENTITY));
    const fresh = mesh.clone();
    for (const prim of fresh.listPrimitives()) {
      const pos = prim.getAttribute('POSITION').clone(), nor = prim.getAttribute('NORMAL')?.clone();
      const J = prim.getAttribute('JOINTS_0'), W = prim.getAttribute('WEIGHTS_0');
      if (!J || !W) continue;
      const P = new Float32Array(pos.getCount() * 3), N = nor ? new Float32Array(pos.getCount() * 3) : null;
      for (let i = 0; i < pos.getCount(); i++) {
        J.getElement(i, j); W.getElement(i, w);
        const m = new Array(16).fill(0);
        let sum = 0;
        for (let k = 0; k < 4; k++) { if (w[k] <= 0) continue; sum += w[k]; const jm = mats[j[k]]; for (let e = 0; e < 16; e++) m[e] += jm[e] * w[k]; }
        if (sum > 0 && Math.abs(sum - 1) > 1e-4) for (let e = 0; e < 16; e++) m[e] /= sum;
        if (sum === 0) for (let e = 0; e < 16; e++) m[e] = IDENTITY[e];
        const p = point(m, pos.getElement(i, v));
        P.set(p, i * 3);
        if (N) {
          nor.getElement(i, v);
          const n = [m[0] * v[0] + m[4] * v[1] + m[8] * v[2], m[1] * v[0] + m[5] * v[1] + m[9] * v[2], m[2] * v[0] + m[6] * v[1] + m[10] * v[2]];
          const l = Math.hypot(...n) || 1;
          N.set([n[0] / l, n[1] / l, n[2] / l], i * 3);
        }
      }
      prim.setAttribute('POSITION', pos.setArray(P).setNormalized(false));
      if (N) prim.setAttribute('NORMAL', nor.setArray(N).setNormalized(false));
      prim.setAttribute('JOINTS_0', null).setAttribute('WEIGHTS_0', null);
    }
    // The posed vertices are already in world space: park the mesh on a fresh root-level node.
    const holder = doc.createNode(node.getName()).setMesh(fresh);
    doc.getRoot().listScenes()[0].addChild(holder);
    node.setMesh(null).setSkin(null);
    baked++;
  }
  for (const skin of doc.getRoot().listSkins()) skin.dispose();
  return baked;
}

async function finish(doc, name, meta, { simplifyRatio = 1, simplifyError = 0.0006, textureSize = 1024 } = {}) {
  for (const a of doc.getRoot().listAnimations()) a.dispose();
  await doc.transform(dedup(), prune(), weld());
  if (simplifyRatio < 1) await doc.transform(simplify({ simplifier: MeshoptSimplifier, ratio: simplifyRatio, error: simplifyError }));
  await doc.transform(
    join({ keepNamed: false }),
    textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [textureSize, textureSize], quality: 82 }),
    prune(),
    quantize({ quantizePosition: 14, quantizeNormal: 10, quantizeTexcoord: 12 }),
  );
  meta.triangles = triangles(doc);
  meta.materials = doc.getRoot().listMaterials().map((m) => m.getName());
  const glb = Buffer.from(await io.writeBinary(doc));
  const gz = gzipSync(glb, { level: 9 });
  writeFileSync(pathJoin(outDir, `${name}.json`), JSON.stringify({ meta, data: gz.toString('base64') }));
  console.log(`${name}: ${meta.triangles} triangles, ${doc.getRoot().listMeshes().length} meshes, ${meta.materials.length} materials, ${doc.getRoot().listTextures().length} textures · GLB ${(glb.length / 1e6).toFixed(2)} MB → gzip ${(gz.length / 1e6).toFixed(2)} MB → pack ${(gz.length * 4 / 3 / 1e6).toFixed(2)} MB`);
  console.log('  meta', JSON.stringify(meta));
}

// ---- BMW M4 Competition (G82) --------------------------------------------------------------------------------
async function m4() {
  const doc = await io.read(pathJoin(root, 'dev/raw/m4.glb'));
  const extras = doc.getRoot().getAsset().extras || {};
  const containers = ['Sketchfab_model', '3e4b27ffbea1449eab3ddd5f52827874.fbx', 'Object_2', 'RootNode'];
  const byName = (n) => doc.getRoot().listNodes().find((x) => x.getName() === n);
  const worldPos = (n) => point(byName(n).getWorldMatrix(), [0, 0, 0]);

  // Source frame: +Y up, +Z front, +X = the car's left. Target: +X front, +Z right.
  const R = rotY(Math.PI / 2);
  const top = (node) => topName(node, containers);
  const isDoor = (node) => /^(Driver|Passenger)_Door$/.test(top(node));
  const b0 = bounds(doc, (n) => !isDoor(n) || true);
  const rb = [point(R, b0.min), point(R, b0.max)];
  const length = Math.abs(rb[1][0] - rb[0][0]);
  const s = 4.794 / length;                                            // real overall length of the G82 M4, metres
  const axle = (names) => names.map((n) => point(R, worldPos(n))[0]).reduce((a, b) => a + b, 0) / names.length;
  const frontX = axle(['Rim', 'Rim002']), rearX = axle(['Rim001', 'Rim003']);
  const midX = (frontX + rearX) / 2;
  const centreZ = (point(R, worldPos('Rim'))[2] + point(R, worldPos('Rim002'))[2]) / 2;
  const N = mul(scale(s), mul(translate(-midX, -b0.min[1], -centreZ), R));

  const meta = {
    name: 'BMW M4 Competition (G82)',
    credit: { title: extras.title, author: extras.author, license: extras.license, source: extras.source },
    wheelbase: +((frontX - rearX) * s).toFixed(4),
    axleFrontX: +((frontX - midX) * s).toFixed(4), axleRearX: +((rearX - midX) * s).toFixed(4),
    doorLeftPivot: point(N, worldPos('Driver_Door')).map((v) => +v.toFixed(4)),
    doorRightPivot: point(N, worldPos('Passenger_Door')).map((v) => +v.toFixed(4)),
    steeringWheel: point(N, worldPos('Steering Wheel')).map((v) => +v.toFixed(4)),
    interiorMirror: point(N, worldPos('interior_mirror')).map((v) => +v.toFixed(4)),
  };

  regroup(doc, (node) => {
    const t = top(node);
    if (t === 'Plate' || t === 'platebolts') return null;              // foreign number plate
    if (t === 'Driver_Door') return 'door_L';
    if (t === 'Passenger_Door') return 'door_R';
    if (t === 'InteriorAlcntr') return 'headliner';
    return 'static';
  }, N);
  const b1 = bounds(doc);
  meta.size = b1.max.map((v, i) => +(v - b1.min[i]).toFixed(3));
  meta.min = b1.min.map((v) => +v.toFixed(3));
  meta.max = b1.max.map((v) => +v.toFixed(3));
  await finish(doc, 'm4', meta, { textureSize: 1024 });
}

// ---- BMW S 1000 RR -------------------------------------------------------------------------------------------
async function s1000() {
  const doc = await io.read(pathJoin(root, 'dev/raw/s1000.glb'));
  const extras = doc.getRoot().getAsset().extras || {};
  const byName = (n) => doc.getRoot().listNodes().find((x) => x.getName() === n);
  const jointPos = (n) => point(byName(n).getWorldMatrix(), [0, 0, 0]);
  const front = jointPos('wheel_lf_23'), rear = jointPos('wheel_lr_29');
  const baked = bakeSkins(doc);

  // Source frame: +Y up, front = -Z, +X = the bike's right. Target: +X front, +Z right.
  const R = rotY(-Math.PI / 2);
  const b0 = bounds(doc);
  const rb = [point(R, b0.min), point(R, b0.max)];
  const length = Math.abs(rb[1][0] - rb[0][0]);
  const s = 2.073 / length;                                            // real overall length of the S 1000 RR, metres
  const fx = point(R, front)[0], rx = point(R, rear)[0];
  const midX = (fx + rx) / 2;
  const N = mul(scale(s), mul(translate(-midX, -b0.min[1], 0), R));
  const meta = {
    name: 'BMW S 1000 RR',
    credit: { title: extras.title, author: extras.author, license: extras.license, source: extras.source },
    bakedSkinnedMeshes: baked,
    wheelbase: +((fx - rx) * s).toFixed(4), axleFrontX: +((fx - midX) * s).toFixed(4), axleRearX: +((rx - midX) * s).toFixed(4),
  };
  regroup(doc, () => 'static', N);
  const b1 = bounds(doc);
  meta.size = b1.max.map((v, i) => +(v - b1.min[i]).toFixed(3));
  meta.min = b1.min.map((v) => +v.toFixed(3));
  meta.max = b1.max.map((v) => +v.toFixed(3));
  await finish(doc, 's1000', meta, { simplifyRatio: 0.62, simplifyError: 0.0004, textureSize: 512 });
}

const which = process.argv.slice(2);
if (!which.length || which.includes('m4')) await m4();
if (!which.length || which.includes('s1000')) await s1000();
