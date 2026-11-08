// Environment checks, built in Node with the real modules and three.js (no browser).
//
// node scripts/test-environment.mjs        prints a summary, exits non-zero on any failure
//
// Checks, per quality ('high', 'mid', 'low'):
//   placement   no tree, scrub, pampas clump or grass tuft stands on the track asphalt, kerbs,
//               painted run-off, gravel, barrier walls, the pit lane, the paddock, roads or a
//               building: the exact plan distance from every instance to every such surface (an
//               index built here from the world's meshes, independent of env/occupancy.js) is at
//               least the instance's footprint (crown radius for trees and scrub, half the card
//               width for tufts); trees also stay TRACK_CLEARANCE.tree from the track asphalt
//               (TRACK_CLEARANCE.infieldTree inside the loop). Minimum distances are reported.
//   budgets     instance counts are within the quality's budget (vegetation.js BUDGET × density)
//   transforms  every InstancedMesh matrix in the world (vegetation, props, the near sets after a
//               camera update) is finite with a positive determinant; colours are finite
//   lod         every species' far geometry bounding box contains its near geometry (the depth
//               range indexes the far instances), and the near set refills without exceeding its
//               capacity at a few camera positions
//   people      (people.js) in every pose: the visor and the cap brim are in front of the head
//               (+x, the person's forward), armL hangs on the person's left (-z) and armR on the
//               right (+z), the feet stay within 3 cm of the ground; the crew and visitors fade
//               (their group's uniform follows progress) instead of popping
import { readFileSync } from 'node:fs';
import { Box3, Matrix4, Vector3 } from 'three';

// --- minimal DOM for the canvas textures ---------------------------------------------------------
const context2d = new Proxy(
  {},
  {
    get: (target, key) =>
      key in target ? target[key] : () => ({ addColorStop() {}, data: new Uint8ClampedArray(4) }),
    set: (target, key, value) => ((target[key] = value), true),
  },
);
globalThis.document ??= { createElement: () => ({ width: 0, height: 0, getContext: () => context2d }) };

const { buildWorld } = await import('../src/journey/world/index.js');
const { BUDGET, TRACK_CLEARANCE } = await import('../src/journey/world/vegetation.js');
const { createPlanIndex } = await import('../src/journey/world/plan-index.js');
const { POSES, buildPerson } = await import('../src/journey/people.js');
const { createPitCrew, placePaddockVisitors, updatePaddockVisitors, updatePitCrew } =
  await import('../src/journey/crew-staging.js');

const root = new URL('..', import.meta.url).pathname;
const trackPoints = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;
const DENSITY = { high: 1, mid: 0.6, low: 0.35 };

const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
  return ok;
};
const fmt = (v) => (Number.isFinite(v) ? v.toFixed(2) : String(v));

/**
 * Plan index per surface class, from the world's meshes (built independently of the placement code):
 * track (track asphalt), kerb, runoff, gravel, wall (barrier walls), paved (pit lane, paddock, roads),
 * building (everything else standing on the ground except vegetation, terrain and decals).
 */
function surfaceIndex(world) {
  const m = world.materials;
  const classOf = (material) =>
    material === m.asphalt
      ? 'track'
      : material === m.kerb
        ? 'kerb'
        : material === m.runoff
          ? 'runoff'
          : material === m.gravel
            ? 'gravel'
            : material === m.barrier
              ? 'wall'
              : material === m.pitAsphalt
                ? 'paved'
                : 'building';
  const indices = {};
  const box = new Box3();
  const matrix = new Matrix4();
  const v = new Vector3();
  const vegetation = new Set(world.vegetation.species.flatMap(({ lod }) => [lod.far, lod.near]));
  vegetation.add(world.vegetation.tufts.mesh);
  const skip = (node) =>
    node.name === 'ground' || node.name === 'hills' || node.name === 'clouds' || vegetation.has(node);
  world.root.updateMatrixWorld(true);
  const visit = (node) => {
    if (skip(node)) return;
    if (node.isMesh) {
      const material = [].concat(node.material)[0];
      const decal =
        (material.transparent && !material.depthWrite) || material === m.line || material === m.rubber;
      if (!decal) {
        const kind = classOf(material);
        const index = (indices[kind] ||= createPlanIndex());
        const geometry = node.geometry;
        if (!geometry.boundingBox) geometry.computeBoundingBox();
        const rect = (b) => {
          index.addTriangle(b.min.x, b.min.z, b.max.x, b.min.z, b.max.x, b.max.z);
          index.addTriangle(b.min.x, b.min.z, b.max.x, b.max.z, b.min.x, b.max.z);
        };
        if (node.isInstancedMesh)
          for (let i = 0; i < node.count; i++) {
            node.getMatrixAt(i, matrix);
            rect(box.copy(geometry.boundingBox).applyMatrix4(matrix.premultiply(node.matrixWorld)));
          }
        else {
          box.copy(geometry.boundingBox).applyMatrix4(node.matrixWorld);
          if (box.max.x - box.min.x > 60 || box.max.z - box.min.z > 60) {
            const position = geometry.attributes.position;
            const idx = geometry.index;
            const n = idx ? idx.count : position.count;
            const p = [];
            for (let k = 0; k < n - (n % 3); k++) {
              v.fromBufferAttribute(position, idx ? idx.getX(k) : k).applyMatrix4(node.matrixWorld);
              p.push(v.x, v.z);
              if (p.length === 6) {
                index.addTriangle(...p);
                p.length = 0;
              }
            }
          } else rect(box);
        }
      }
    }
    for (const child of node.children) visit(child);
  };
  visit(world.root);
  return indices;
}

/** Point-in-polygon (crossing number) for the closed centre line. */
function inLoop(line, x, z) {
  let inside = false;
  for (let i = 0, j = line.count - 1; i < line.count; j = i++)
    if (
      line.z[i] > z !== line.z[j] > z &&
      x < ((line.x[j] - line.x[i]) * (z - line.z[i])) / (line.z[j] - line.z[i]) + line.x[i]
    )
      inside = !inside;
  return inside;
}

const matrix = new Matrix4();
const position = new Vector3();
const summary = [];

for (const quality of ['high', 'mid', 'low']) {
  const t0 = performance.now();
  const world = buildWorld(trackPoints, { quality });
  const buildMs = performance.now() - t0;
  const { species, tufts } = world.vegetation;
  const line = world.root.userData.trackModel.line;
  const indices = surfaceIndex(world);
  const density = DENSITY[quality];

  // --- placement -----------------------------------------------------------------------------
  const minimum = {}; // `${group}:${class}` → smallest (distance − footprint)
  const groups = [
    ...species.map(({ name, data, radius }) => ({
      group: name === 'scrub' || name === 'pampas' ? name : 'trees',
      data,
      footprint: (i) => radius * data.scale[i],
      tree: name !== 'scrub' && name !== 'pampas',
    })),
    { group: 'tufts', data: tufts.data, footprint: (i) => 0.5 * tufts.data.scale[i], tree: false },
  ];
  let trackTooClose = 0;
  let minTreeTrack = Infinity;
  for (const { group, data, footprint, tree } of groups)
    for (let i = 0; i < data.count; i++) {
      const x = data.x[i];
      const z = data.z[i];
      const reach = footprint(i) + 40;
      for (const [kind, index] of Object.entries(indices)) {
        const d = index.distance(x, z, reach) - footprint(i);
        const key = `${group}:${kind}`;
        if (!(key in minimum) || d < minimum[key]) minimum[key] = d;
        check(
          d >= 0,
          `${quality}: ${group} instance at (${fmt(x)}, ${fmt(z)}) overlaps ${kind} by ${fmt(-d)} m`,
        );
      }
      if (tree) {
        const required = inLoop(line, x, z) ? TRACK_CLEARANCE.infieldTree : TRACK_CLEARANCE.tree;
        const d = indices.track.distance(x, z, required + 1);
        minTreeTrack = Math.min(minTreeTrack, d);
        if (d < required - 1e-6) trackTooClose++;
      }
    }
  check(trackTooClose === 0, `${quality}: ${trackTooClose} trees closer to the track asphalt than required`);

  // --- budgets --------------------------------------------------------------------------------
  const count = (filter) => species.filter(filter).reduce((s, { data }) => s + data.count, 0);
  const trees = count(({ name }) => name !== 'scrub' && name !== 'pampas');
  const scrub = count(({ name }) => name === 'scrub');
  const pampas = count(({ name }) => name === 'pampas');
  const budgets = {
    trees: [trees, Math.round(BUDGET.trees * density)],
    scrub: [scrub, Math.round(BUDGET.scrub * density)],
    pampas: [pampas, Math.round(BUDGET.pampas * density)],
    tufts: [tufts.data.count, Math.round(BUDGET.tufts * density)],
  };
  for (const [name, [n, cap]] of Object.entries(budgets))
    check(n <= cap, `${quality}: ${name} ${n} > budget ${cap}`);

  // --- lod and near sets ------------------------------------------------------------------------
  for (const { name, lod } of species) {
    const near =
      lod.near.geometry.boundingBox ||
      (lod.near.geometry.computeBoundingBox(), lod.near.geometry.boundingBox);
    check(
      lod.far.geometry.boundingBox.containsBox(near),
      `${quality}: ${name} far bounding box does not contain the near model`,
    );
  }
  let nearMax = 0;
  for (const [x, y, z] of [
    [320, 1, 211],
    [-64, 1.5, 197],
    [-513, 1.6, 16],
    [280, 2, 100],
    [40, 620, 560],
  ]) {
    world.update(0, 0, { position: new Vector3(x, y, z) });
    for (const { name, lod } of species) {
      nearMax = Math.max(nearMax, lod.near.count);
      check(lod.near.count <= lod.near.instanceMatrix.count, `${quality}: ${name} near set overflows`);
    }
  }

  // --- transforms -----------------------------------------------------------------------------
  let instances = 0;
  let bad = 0;
  world.root.traverse((node) => {
    if (!node.isInstancedMesh) return;
    for (let i = 0; i < node.count; i++) {
      node.getMatrixAt(i, matrix);
      instances++;
      const finite = matrix.elements.every(Number.isFinite) && matrix.determinant() > 0;
      position.setFromMatrixPosition(matrix);
      if (!finite) bad++;
    }
    if (node.instanceColor)
      for (let i = 0; i < node.count * 3; i++) if (!Number.isFinite(node.instanceColor.array[i])) bad++;
  });
  check(bad === 0, `${quality}: ${bad} non-finite or degenerate instance transforms/colours`);

  summary.push({ quality, buildMs, budgets, minimum, minTreeTrack, instances, nearMax });
}

// --- people ------------------------------------------------------------------------------------
const peopleRows = [];
{
  const at = (object) => new Vector3().setFromMatrixPosition(object.matrixWorld);
  for (const pose of Object.keys(POSES))
    for (const head of ['hair', 'cap', 'helmet', 'headset']) {
      const person = buildPerson({ pose, head });
      person.updateMatrixWorld(true);
      const { head: headPivot, armL, armR, visor, brim } = person.userData;
      const label = `people ${pose}/${head}`;
      const h = at(headPivot);
      if (head === 'helmet')
        check(visor && at(visor).x > h.x + 0.05, `${label}: visor not in front of the head`);
      if (head === 'cap' || head === 'headset')
        check(brim && at(brim).x > h.x + 0.04, `${label}: brim not forward`);
      check(at(armL).z < -0.1, `${label}: armL not on the left (-z)`);
      check(at(armR).z > 0.1, `${label}: armR not on the right (+z)`);
      const box = new Box3().setFromObject(person);
      check(Math.abs(box.min.y) < 0.03, `${label}: lowest point ${fmt(box.min.y)} m off the ground`);
      if (head === 'cap')
        peopleRows.push({
          pose,
          visorOrBrimAhead: fmt((brim ? at(brim).x : NaN) - h.x),
          armL: fmt(at(armL).z),
          armR: fmt(at(armR).z),
          lowest: fmt(box.min.y),
        });
    }
  // fades: the crew's uniform follows progress (0 far from the pit stop, 1 at it, partial between)
  const crew = createPitCrew();
  const sampler = { sample: () => ({ p: new Vector3(-60, 0, 189), t: new Vector3(-1, 0, 0) }) };
  const fadeAt = (p) => {
    updatePitCrew(crew, p, 0, sampler, 0, { x: -60, z: 185.5 });
    return crew.materials.fade.value;
  };
  check(fadeAt(0.26) === 1 && fadeAt(0.5) === 0, 'crew: not fully shown at 0.26 / hidden at 0.5');
  const mid = fadeAt(0.165);
  check(mid > 0.05 && mid < 0.95, `crew: no gradual fade (presence ${fmt(mid)} at 0.165)`);
  const scene = { add() {} };
  const visitors = placePaddockVisitors(scene);
  updatePaddockVisitors(visitors, 0.62, 0);
  const v = visitors[0][0].userData.materials.fade.value;
  check(v > 0.05 && v < 0.95, `visitors: no gradual fade (presence ${fmt(v)} at 0.62)`);
}

for (const s of summary) {
  console.log(
    `${s.quality}: built in ${s.buildMs.toFixed(0)} ms; ${s.instances} instances; largest near set ${s.nearMax}; trees ≥ ${fmt(s.minTreeTrack)} m from the track asphalt`,
  );
  console.log(
    '  budgets ' +
      Object.entries(s.budgets)
        .map(([k, [n, cap]]) => `${k} ${n}/${cap}`)
        .join(', '),
  );
  const rows = {};
  for (const [key, d] of Object.entries(s.minimum)) {
    const [group, kind] = key.split(':');
    (rows[group] ||= {})[kind] = fmt(d);
  }
  console.log('  smallest clearance (distance − footprint, m):');
  console.table(rows);
}
console.log('people (cap): brim ahead of the head centre, shoulder z, lowest point (m)');
console.table(peopleRows);
if (failures.length) {
  console.log(`FAILED (${failures.length}):\n` + [...new Set(failures)].slice(0, 40).join('\n'));
  process.exit(1);
}
console.log('OK: all environment checks passed');
