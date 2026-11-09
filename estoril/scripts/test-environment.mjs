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
//               width for tufts); trees also stay TRACK_CLEARANCE.tree from the track asphalt, and
//               none stands inside the circuit loop (the infield stays open). Minimum distances
//               are reported.
//   species     the tree species' shares are within SHARE_TOLERANCE of the reference (TREE_SPECIES)
//   budgets     instance counts are within the quality's budget (vegetation.js BUDGET × density)
//   transforms  every InstancedMesh matrix in the world (vegetation, props, the near sets after a
//               camera update) is finite with a positive determinant; colours are finite
//   lod         every species' far geometry bounding box contains its near geometry (the depth
//               range indexes the far instances), and the near set refills without exceeding its
//               capacity at a few camera positions; levels (instanced-lod.js): after a snap every
//               tree is fully near or fully far (no stippled band in a still frame), a tree beyond
//               fadeEnd is far and one before fadeStart - 6 m near at every frame of a camera walk,
//               and the transitions settle within TRANSITION seconds once the camera stops
//   models      (tree-models.js) every foliage clump of every near model hangs on bark (contains
//               a point of a trunk or branch, or overlaps a clump that does) or rests on the ground
//   people      (people.js) in every pose: the visor and the cap brim are in front of the head
//               (+x, the person's forward), armL hangs on the person's left (-z) and armR on the
//               right (+z), the feet stay within 3 cm of the ground, the held props touch the hands
//               (jack T-bar and socket, tyre tread); the crew and visitors fade (their group's
//               uniform follows progress) instead of popping
//   standing    (high world) every crew member and visitor stands on the surface under them (a
//               ray down onto the world's flat opaque meshes), lowest point within 1.5 cm of it;
//               the jack's trolley stays ahead of the hero car's nose
//   paddock     the paddock asphalt pieces do not overlap in plan; the bay lines are a blended
//               decal without depth writes, MIN_LAYER_GAP above the asphalt, drawn before the hero
//               car's contact decal (renderOrder 0 < 1) and not above it
//   armco       at least ARMCO_MIN_LENGTH of rail; every rail vertex keeps its distance from the
//               track asphalt (ARMCO_OFFSET - 0.5 m), the gravel and the walls
import { readFileSync } from 'node:fs';
import { Box3, Matrix4, Raycaster, Vector3 } from 'three';

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
const { BUDGET, LOD_FADE, TRACK_CLEARANCE, TREE_SPECIES } =
  await import('../src/journey/world/vegetation.js');
const { BUILDERS, attachedClumps, buildSpeciesGeometry } = await import('../src/journey/env/tree-models.js');
const { TRANSITION } = await import('../src/journey/env/instanced-lod.js');
const { LAYERS, MIN_LAYER_GAP } = await import('../src/journey/world/layers.js');
const { buildCarPath } = await import('../src/journey/car-path.js');
const { computeLandmarks, createPathSampler } = await import('../src/journey/car-motion.js');
const { JACK } = await import('../src/journey/people.js');
const { createPlanIndex } = await import('../src/journey/world/plan-index.js');
const { POSES, buildPerson } = await import('../src/journey/people.js');
const { createPitCrew, placePaddockVisitors, updatePaddockVisitors, updatePitCrew } =
  await import('../src/journey/crew-staging.js');

const root = new URL('..', import.meta.url).pathname;
const trackPoints = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;
const DENSITY = { high: 1, mid: 0.6, low: 0.35 };
/** Largest difference (fraction) between a species' share of the trees and its reference share. */
const SHARE_TOLERANCE = 0.05;
/** Least total Armco length, metres; the Armco's distance from the asphalt edge (barriers.js). */
const ARMCO_MIN_LENGTH = 2500;
const ARMCO_OFFSET = 9;
/** The hero car's nose: metres ahead of its centre (site/assets/models/hero-car.json bounds). */
const CAR_NOSE = JSON.parse(
  readFileSync(new URL('../site/assets/models/hero-car.json', import.meta.url), 'utf8'),
).bounds[1][0];

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
const worldRows = {};

// --- models --------------------------------------------------------------------------------------
const modelRows = {};
for (const name of Object.keys(BUILDERS)) {
  const { attached, total, floating } = attachedClumps(buildSpeciesGeometry(name).parts);
  modelRows[name] = `${attached}/${total} clumps on bark`;
  check(!floating.length, `model ${name}: foliage clumps ${floating.join(', ')} float off the bark`);
}

/** Surface height under (x, z): a ray down onto the flat, opaque, non-instanced meshes of `root`. */
function surfaceUnder(root, x, z) {
  const candidates = [];
  root.traverse((node) => {
    if (!node.isMesh || node.isInstancedMesh) return;
    const m = [].concat(node.material)[0];
    if (m.transparent || !m.depthWrite) return;
    const box = new Box3().setFromObject(node);
    if (box.max.y - box.min.y < 0.3 && box.max.y < 0.5) candidates.push(node);
  });
  const ray = new Raycaster(new Vector3(x, 1, z), new Vector3(0, -1, 0), 0, 2);
  const hit = ray.intersectObjects(candidates, false)[0];
  return hit ? hit.point.y : NaN;
}

/** Checks on the finished high-quality world: people standing, paddock layers, Armco. */
function worldChecks(world, indices) {
  const root = world.root;
  root.updateMatrixWorld(true);
  // people on their surfaces (the real car path, landmarks and open garage)
  const path = buildCarPath(trackPoints);
  const sampler = createPathSampler(path);
  const landmarks = computeLandmarks(path, trackPoints);
  const crew = createPitCrew();
  updatePitCrew(crew, 0.26, 0, sampler, landmarks.pitBox, root.userData.openBox);
  const visitors = placePaddockVisitors({ add() {} });
  let worst = 0;
  for (const person of [...crew.members, ...visitors.map(([p]) => p)]) {
    person.updateMatrixWorld(true);
    const surface = surfaceUnder(root, person.position.x, person.position.z);
    const lowest = new Box3().setFromObject(person).min.y;
    worst = Math.max(worst, Math.abs(person.position.y - surface));
    check(
      Math.abs(person.position.y - surface) < 0.003 && lowest > surface - 0.015 && lowest < surface + 0.02,
      `person at (${fmt(person.position.x)}, ${fmt(person.position.z)}) stands at ${person.position.y} m, lowest point ${fmt(lowest)} m, on a surface at ${fmt(surface)} m`,
    );
  }
  worldRows.standing = `feet within ${(1000 * worst).toFixed(1)} mm of the surface`;
  // the jack's car-side end stays ahead of the car's nose
  const at = sampler.sample(landmarks.pitBox);
  const forward = new Vector3(at.t.x, 0, at.t.z).normalize();
  const jackMan = crew.byName.jack;
  const tip = new Vector3(JACK.x1, 0, 0).applyMatrix4(jackMan.matrixWorld);
  const ahead = tip.sub(at.p).dot(forward) - CAR_NOSE;
  worldRows.jack = `trolley ${fmt(ahead)} m ahead of the nose`;
  check(ahead >= 0.05, `jack trolley ${fmt(ahead)} m ahead of the car's nose (needs 0.05 m)`);

  // paddock layers
  const pieces = [];
  let lines = null;
  root.traverse((node) => {
    if (node.name === 'paddock-bay-lines') lines = node;
    if (!node.isMesh || node.isInstancedMesh || node.material !== world.materials.pitAsphalt) return;
    // a merged mesh (util/static-merge.js) is checked piece by piece: each part's own box and matrices
    const boxes = node.userData.indexParts
      ? node.userData.indexParts.map((part) => {
          const world = node.matrixWorld.clone();
          for (const link of part.chain) world.multiply(link);
          return part.box.clone().applyMatrix4(world);
        })
      : [new Box3().setFromObject(node)];
    for (const box of boxes)
      if (box.max.y - box.min.y < 0.001 && Math.abs(box.min.y - LAYERS.paddock) < 0.0005) pieces.push(box);
  });
  let overlaps = 0;
  for (let a = 0; a < pieces.length; a++)
    for (let b = a + 1; b < pieces.length; b++) {
      const w = Math.min(pieces[a].max.x, pieces[b].max.x) - Math.max(pieces[a].min.x, pieces[b].min.x);
      const d = Math.min(pieces[a].max.z, pieces[b].max.z) - Math.max(pieces[a].min.z, pieces[b].min.z);
      if (w > 0.01 && d > 0.01) overlaps++;
    }
  check(
    pieces.length >= 5 && overlaps === 0,
    `paddock: ${overlaps} overlapping asphalt pieces (of ${pieces.length})`,
  );
  check(
    lines && lines.material.transparent && !lines.material.depthWrite && lines.renderOrder < 1,
    'paddock: the bay lines are not a blended decal without depth writes drawn before renderOrder 1',
  );
  const lineY = lines
    ? lines.geometry.attributes.position.getY(0) +
      new Vector3().setFromMatrixPosition((lines.getMatrixAt(0, matrix), matrix)).y
    : NaN;
  check(
    lineY - LAYERS.paddock >= MIN_LAYER_GAP - 1e-6,
    `paddock: bay lines ${fmt(lineY)} m, only ${fmt(lineY - LAYERS.paddock)} m above the asphalt`,
  );
  check(lineY <= LAYERS.paddock + 0.006 + 1e-6, `paddock: bay lines above the hero car's contact decal`);
  worldRows.paddock = `${pieces.length} asphalt pieces, no overlap; lines at ${lineY} m`;

  // Armco
  const rails = root.children.find((o) => o.name === 'armco');
  const position = rails.geometry.attributes.position;
  let length = 0;
  let near = { track: Infinity, gravel: Infinity, wall: Infinity };
  for (let k = 0; k < position.count; k += 2) {
    const x = position.getX(k);
    const z = position.getZ(k);
    // two rails per run; consecutive samples are ~1 m apart (a longer step jumps to the next rail)
    const step = k >= 2 ? Math.hypot(x - position.getX(k - 2), z - position.getZ(k - 2)) : Infinity;
    if (step < 3) length += step / 2;
    for (const kind of ['track', 'gravel', 'wall'])
      near[kind] = Math.min(near[kind], indices[kind].distance(x, z, 12));
  }
  const total = Math.round(length);
  worldRows.armco = `${total} m of rail; nearest: asphalt ${fmt(near.track)} m, gravel ${fmt(near.gravel)} m, wall ${fmt(near.wall)} m`;
  check(total >= ARMCO_MIN_LENGTH, `armco: only ${total} m of rail`);
  check(near.track >= ARMCO_OFFSET - 0.5, `armco: a rail ${fmt(near.track)} m from the track asphalt`);
  check(near.gravel >= 2, `armco: a rail ${fmt(near.gravel)} m from gravel`);
  check(near.wall >= 1, `armco: a rail ${fmt(near.wall)} m from a wall`);
}

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
  let infieldTrees = 0;
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
        if (inLoop(line, x, z)) infieldTrees++;
        const d = indices.track.distance(x, z, TRACK_CLEARANCE.tree + 1);
        minTreeTrack = Math.min(minTreeTrack, d);
        if (d < TRACK_CLEARANCE.tree - 1e-6) trackTooClose++;
      }
    }
  check(trackTooClose === 0, `${quality}: ${trackTooClose} trees closer to the track asphalt than required`);
  check(
    infieldTrees === 0,
    `${quality}: ${infieldTrees} trees in the infield (it stays open, references 4.2)`,
  );

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

  // --- species shares ---------------------------------------------------------------------------
  const shares = {};
  for (const { name, share } of TREE_SPECIES) {
    const n = species.find((s) => s.name === name)?.data.count || 0;
    shares[name] = n / trees;
    check(
      Math.abs(n / trees - share) <= SHARE_TOLERANCE,
      `${quality}: ${name} is ${fmt(100 * (n / trees))} % of the trees (reference ${100 * share} %)`,
    );
  }

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

  // levels: a snap leaves no tree half-faded; a camera walk keeps the distance bounds; the
  // transitions settle within TRANSITION seconds once the camera stops
  {
    const [fadeStart, fadeEnd] = LOD_FADE[quality];
    const camera = { position: new Vector3() };
    const distanceOf = (data, i, p) => Math.hypot(data.x[i] - p.x, data.y[i] - p.y, data.z[i] - p.z);
    const levelsOk = (label, snapped) => {
      for (const { name, lod, data } of species) {
        const inNear = new Set();
        for (let i = 0; i < data.count; i++) {
          const l = lod.level[i];
          const d = distanceOf(data, i, camera.position);
          if (!(l >= 0 && l <= 1)) return check(false, `${quality}: ${name} level ${l} at ${label}`);
          if (snapped && l !== 0 && l !== 1)
            return check(false, `${quality}: ${name} half-faded (${fmt(l)}) after a snap at ${label}`);
          if (d >= fadeEnd && l !== 1)
            return check(false, `${quality}: ${name} at ${fmt(d)} m is not far (${fmt(l)}) at ${label}`);
          if (d < fadeStart - 6 && l !== 0)
            return check(false, `${quality}: ${name} at ${fmt(d)} m is not near (${fmt(l)}) at ${label}`);
          if (l < 1) inNear.add(i);
        }
      }
      return true;
    };
    camera.position.set(300, 1.7, 225);
    world.update(0, 0, camera, true);
    levelsOk('a snap', true);
    // walk 600 m along +x at 30 m/s, 60 frames a second
    let partial = 0;
    for (let frame = 0; frame < 1200; frame++) {
      camera.position.x = 300 - frame * 0.5;
      world.update(frame / 60, 1 / 60, camera, false);
      if (frame % 60 === 0) levelsOk(`walk frame ${frame}`, false);
      for (const { lod, data } of species)
        for (let i = 0; i < data.count; i++) if (lod.level[i] > 0 && lod.level[i] < 1) partial++;
    }
    for (let frame = 0; frame < Math.ceil(TRANSITION * 60) + 1; frame++)
      world.update(20 + frame / 60, 1 / 60, camera, false);
    levelsOk('rest after the walk', true);
    check(partial > 0, `${quality}: no tree ever dissolved between levels during the walk`);
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

  if (quality === 'high') worldChecks(world, indices);
  summary.push({ quality, buildMs, budgets, minimum, minTreeTrack, instances, nearMax, shares });
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
      for (const { name, points, gap } of person.userData.props) {
        const d = new Vector3(...points[0]).distanceTo(new Vector3(...points[1]));
        check(d <= gap, `${label}: ${name} ${fmt(d)} m apart (at most ${gap})`);
      }
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
  console.log(
    '  tree species: ' +
      Object.entries(s.shares)
        .map(([k, v]) => `${k} ${(100 * v).toFixed(1)} %`)
        .join(', '),
  );
}
console.log('models:', JSON.stringify(modelRows));
for (const [k, v] of Object.entries(worldRows)) console.log(`${k}: ${v}`);
console.log('people (cap): brim ahead of the head centre, shoulder z, lowest point (m)');
console.table(peopleRows);
if (failures.length) {
  console.log(`FAILED (${failures.length}):\n` + [...new Set(failures)].slice(0, 40).join('\n'));
  process.exit(1);
}
console.log('OK: all environment checks passed');
