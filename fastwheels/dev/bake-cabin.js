// Dev-time measurement of the M4 cabin: where the ambient light lines sit on the real trim and where the
// fibre-optic stars sit on the real headliner. Runs in the model test page (ray casts against the loaded model);
// tools/bake-cabin.mjs stores the result in src/three/cabin-data.js so the site never has to ray cast.
//
// Car coordinates: +X front, +Y up, +Z right (passenger side on this left-hand-drive car).
import * as THREE from 'three';

const ray = new THREE.Raycaster();
const O = new THREE.Vector3(), D = new THREE.Vector3();

function cast(target, o, d, far = 3) {
  ray.set(O.fromArray(o), D.fromArray(d).normalize());
  ray.far = far;
  for (const h of ray.intersectObject(target, true)) {
    const m = h.object.material;
    if (!h.object.visible || (m.transparent && m.opacity < 0.9)) continue;
    const n = h.face.normal.clone().transformDirection(h.object.matrixWorld);
    if (n.dot(ray.ray.direction) > 0) n.negate();
    return { p: h.point.clone(), n, mat: m.name, group: groupOf(h.object) };
  }
  return null;
}
function groupOf(o) { for (let p = o; p; p = p.parent) if (/^(door_L|door_R|headliner|static)$/.test(p.name)) return p.name; return ''; }

/** Sweep a line of rays; returns the longest unbroken run of accepted hits, lifted 3 mm off the surface. */
function sweep(target, { from, to, dir, steps = 60, lift = 0.003, accept = () => true, far = 2 }) {
  const runs = [[]];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const o = typeof from === 'function' ? from(t) : from.map((v, k) => v + (to[k] - v) * t);
    const h = cast(target, o, typeof dir === 'function' ? dir(t) : dir, far);
    if (h && accept(h, t)) runs[runs.length - 1].push({ p: h.p.addScaledVector(h.n, lift), n: h.n });
    else if (runs[runs.length - 1].length) runs.push([]);
  }
  const best = runs.sort((a, b) => b.length - a.length)[0];
  // Light smoothing: the trim is faceted, an installed light guide is not.
  for (let pass = 0; pass < 2; pass++) for (let i = 1; i < best.length - 1; i++) {
    best[i].p.lerp(best[i - 1].p.clone().add(best[i + 1].p).multiplyScalar(0.5), 0.5);
    best[i].n.add(best[i - 1].n).add(best[i + 1].n).normalize();
  }
  return best;
}

const flat = (run) => run.flatMap(({ p, n }) => [+p.x.toFixed(4), +p.y.toFixed(4), +p.z.toFixed(4), +n.x.toFixed(3), +n.y.toFixed(3), +n.z.toFixed(3)]);

export function computeCabinData(car) {
  car.setDoorOpen(0);
  car.group.updateMatrixWorld(true);
  const g = car.group;
  const strips = [];
  const add = (id, zone, attach, order, run) => { if (run.length > 3) strips.push({ id, zone, attach, order, pts: flat(run) }); };

  // Dashboard: a line under the trim band, from the driver's vent to the passenger door.
  const dashY = (z) => 0.806 + 0.004 * Math.cos(z * 2.2);
  add('dash', 'dash', 'body', [0.0, 0.34], sweep(g, { from: (t) => { const z = -0.72 + 1.44 * t; return [-0.1, dashY(z), z]; }, dir: [1, 0, 0], steps: 110, accept: (h) => h.p.x > 0.4 && h.group === 'static', far: 1.2 }));
  // Doors: a contour line under the upper pad, sweeping down a little towards the rear.
  const doorY = (t) => 0.868 - 0.05 * t * t;
  for (const [side, name] of [[1, 'door_R'], [-1, 'door_L']]) {
    add(name, 'door', name, [0.3, 0.64], sweep(g, { from: (t) => [0.5 - 1.02 * t, doorY(t), 0.25 * side], dir: [0, 0, side], steps: 80, accept: (h) => h.group === name && Math.abs(h.p.z) > 0.6, far: 1 }));
    // A second, short accent in the door pocket.
    add(name + '_pocket', 'door', name, [0.42, 0.66], sweep(g, { from: (t) => [0.34 - 0.6 * t, 0.37, 0.25 * side], dir: [0, 0, side], steps: 40, accept: (h) => h.group === name && Math.abs(h.p.z) > 0.6, far: 1 }));
  }
  // Centre console: a line low on each flank, facing the footwells.
  for (const side of [1, -1]) {
    add('console_' + (side > 0 ? 'R' : 'L'), 'console', 'body', [0.6, 0.86], sweep(g, { from: (t) => [0.42 - 0.62 * t, 0.47 - 0.05 * t, 0.36 * side], dir: [0, 0, -side], steps: 50, accept: (h) => Math.abs(h.p.z) < 0.24 && h.group === 'static', far: 0.5 }));
  }

  // Starlight headliner: fibre ends scattered over the real headliner fabric.
  const stars = [];
  let seed = 20241;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const cell = 0.04;
  for (let x = -1.3; x <= 0.2; x += cell) for (let z = -0.6; z <= 0.6; z += cell) {
    if (rnd() < 0.2) continue;                                        // irregular, like hand-set fibres
    const px = x + (rnd() - 0.5) * cell * 1.5, pz = z + (rnd() - 0.5) * cell * 1.5;
    const h = cast(g, [px, 1.14, pz], [0, 1, 0], 0.5);
    if (!h || h.group !== 'headliner' || h.n.y > -0.55) continue;
    h.p.addScaledVector(h.n, 0.004);
    stars.push(+h.p.x.toFixed(4), +h.p.y.toFixed(4), +h.p.z.toFixed(4));
  }

  // Reference points for lights and camera work.
  const probe = (o, d, far) => { const h = cast(g, o, d, far); return h ? h.p.toArray().map((v) => +v.toFixed(3)) : null; };
  const anchors = {
    dashFace: probe([-0.1, 0.8, 0.45], [1, 0, 0], 1.2),
    screen: probe([-0.1, 0.9, 0], [1, 0, 0], 1.2),
    doorR: probe([0, 0.8, 0.25], [0, 0, 1], 1),
    doorL: probe([0, 0.8, -0.25], [0, 0, -1], 1),
    footwellR: probe([0.55, 0.6, 0.42], [0, -1, 0], 1),
    footwellL: probe([0.55, 0.6, -0.42], [0, -1, 0], 1),
    consoleTop: probe([0.05, 1.0, 0], [0, -1, 0], 1),
    headliner: probe([-0.5, 1.14, 0], [0, 1, 0], 0.5),
  };
  return { strips, stars, anchors };
}
