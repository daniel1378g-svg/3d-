// Test page for render/streets.js: a free camera over the street surfaces.
//
//   /dev/streets.html?x=0&z=0&h=90&y=1.2&pitch=-4      camera position, heading (degrees, clockwise
//                                                       from north), eye height and pitch
//   ?edge=973&s=29&dir=1                                look along an edge from the driver's seat
//   ?place=palmovka                                     one of the start places in the graph
//   ?top=150                                            straight down from that height
// Keys: W A S D move, Q E turn, R F up and down, arrows look, T top view, G driver height.
// window.__dev = { goto, along, top, info } for scripts; window.__ready is set after the first frame.
import { loadSection } from '../src/js/data/pack.js';
import { RoadNet } from '../src/js/sim/roadnet.js';
import { chunkOf, CHUNKS } from '../src/js/data/geo.js';
import { createStreets } from '../src/js/render/streets.js';
import { createSurfaceTextures } from '../src/js/render/assets/textures.js';
import { createSignAtlas } from '../src/js/render/assets/signs.js';

const hud = document.getElementById('hud'), err = document.getElementById('err');
addEventListener('error', (e) => { err.textContent += `${e.message}\n`; });
addEventListener('unhandledrejection', (e) => { err.textContent += `${e.reason && e.reason.stack || e.reason}\n`; });

const q = new URLSearchParams(location.search);
const num = (k, d) => (q.has(k) ? Number(q.get(k)) : d);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const SKY = 0xa9c0d6;
scene.background = new THREE.Color(SKY);
scene.fog = new THREE.Fog(SKY, 120, 900);
scene.add(new THREE.HemisphereLight(0xdfe9f5, 0x7a7466, 1.15));
const sun = new THREE.DirectionalLight(0xfff2dc, 1.7);
sun.position.set(-0.45, 0.8, 0.35);
scene.add(sun);
const camera = new THREE.PerspectiveCamera(62, 1, 0.2, 2500);
camera.rotation.order = 'YXZ';

const [graph, groundPack] = await Promise.all([loadSection('graph', { base: '/data/' }), loadSection('ground', { base: '/data/' })]);
const net = new RoadNet(graph);
let t0 = performance.now();
const streets = createStreets({ net, ground: groundPack, surfaces: createSurfaceTextures(), signAtlas: createSignAtlas(), anisotropy: Math.min(8, renderer.capabilities.getMaxAnisotropy()) });
const createMs = performance.now() - t0;
scene.add(streets.ground);

const cam = { x: num('x', 0), z: num('z', 0), y: num('y', 1.2), h: (num('h', 90) * Math.PI) / 180, pitch: (num('pitch', -3) * Math.PI) / 180 };
const R = num('r', 2);                                            // chunks each way: 2 -> 5 x 5 block
const live = new Map();
let lastBuild = 0, worstBuild = 0;
function refresh() {
  const c = chunkOf(cam.x, cam.z), want = new Set();
  for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
    const cx = c.cx + dx, cz = c.cz + dz;
    if (cx < 0 || cz < 0 || cx >= CHUNKS || cz >= CHUNKS) continue;
    want.add(cz * CHUNKS + cx);
  }
  for (const [id, g] of live) if (!want.has(id)) { scene.remove(g); streets.disposeChunk(g); live.delete(id); }
  for (const id of want) {
    if (live.has(id)) continue;
    const t = performance.now();
    const g = streets.buildChunk(id % CHUNKS, Math.floor(id / CHUNKS));
    lastBuild = performance.now() - t;
    worstBuild = Math.max(worstBuild, lastBuild);
    scene.add(g);
    live.set(id, g);
  }
}
function goto(x, z, hDeg, y, pitchDeg) {
  cam.x = x; cam.z = z;
  if (hDeg !== undefined) cam.h = (hDeg * Math.PI) / 180;
  if (y !== undefined) cam.y = y;
  if (pitchDeg !== undefined) cam.pitch = (pitchDeg * Math.PI) / 180;
}
// Driver's eye on an edge: in the right-hand lane, looking along the direction of travel.
function along(e, s, dir = 1, y = 1.2) {
  const lane = Math.max(0, net.lanes(e, dir) - 1), p = net.lanePos(e, net.lanes(e, dir) ? dir : -dir, lane, s);
  cam.x = p.x; cam.z = p.z; cam.h = p.h; cam.y = y; cam.pitch = -0.05;
  return p;
}
function top(height = 150) { cam.y = height; cam.pitch = -Math.PI / 2; cam.h = 0; }
if (q.has('place')) { const p = net.places.find((v) => v.id === q.get('place')); if (p) along(p.edge, p.s, p.dir); }
if (q.has('edge')) along(num('edge', 0), num('s', 10), num('dir', 1), num('y', 1.2));
if (q.has('top')) top(num('top', 150));

const keys = new Set();
addEventListener('keydown', (e) => { if (e.target.tagName !== 'INPUT') keys.add(e.code); if (e.code === 'KeyT') top(); if (e.code === 'KeyG') { cam.y = 1.2; cam.pitch = -0.05; } });
addEventListener('keyup', (e) => keys.delete(e.code));
document.getElementById('go').onclick = () => { const v = document.getElementById('where').value.split(/[ ,]+/).map(Number); if (v.length >= 2) goto(v[0], v[1], v[2]); };
document.getElementById('top').onclick = () => top();
document.getElementById('eye').onclick = () => { cam.y = 1.2; cam.pitch = -0.05; };
let drag = null;
renderer.domElement.addEventListener('pointerdown', (e) => { drag = [e.clientX, e.clientY]; });
addEventListener('pointerup', () => { drag = null; });
addEventListener('pointermove', (e) => {
  if (!drag) return;
  cam.h += (e.clientX - drag[0]) * 0.004; cam.pitch = Math.max(-1.57, Math.min(1.2, cam.pitch - (e.clientY - drag[1]) * 0.004));
  drag = [e.clientX, e.clientY];
});

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  const v = (keys.has('ShiftLeft') ? 60 : 12) * dt * Math.max(1, cam.y / 10), sh = Math.sin(cam.h), ch = Math.cos(cam.h);
  if (keys.has('KeyW')) { cam.x += sh * v; cam.z -= ch * v; }
  if (keys.has('KeyS')) { cam.x -= sh * v; cam.z += ch * v; }
  if (keys.has('KeyA')) { cam.x -= ch * v; cam.z -= sh * v; }
  if (keys.has('KeyD')) { cam.x += ch * v; cam.z += sh * v; }
  if (keys.has('KeyQ') || keys.has('ArrowLeft')) cam.h -= dt * 1.2;
  if (keys.has('KeyE') || keys.has('ArrowRight')) cam.h += dt * 1.2;
  if (keys.has('ArrowUp')) cam.pitch = Math.min(1.2, cam.pitch + dt);
  if (keys.has('ArrowDown')) cam.pitch = Math.max(-1.57, cam.pitch - dt);
  if (keys.has('KeyR')) cam.y += v;
  if (keys.has('KeyF')) cam.y = Math.max(0.3, cam.y - v);
  refresh();
  const w = innerWidth, h = innerHeight;
  if (renderer.domElement.width !== Math.floor(w * renderer.getPixelRatio()) || renderer.domElement.height !== Math.floor(h * renderer.getPixelRatio())) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  camera.position.set(cam.x, cam.y, cam.z);
  camera.rotation.set(cam.pitch, -cam.h, 0);
  renderer.render(scene, camera);
  const i = renderer.info.render, near = net.nearest(cam.x, cam.z, 40);
  hud.textContent = `x ${cam.x.toFixed(1)}  z ${cam.z.toFixed(1)}  y ${cam.y.toFixed(1)}  h ${((cam.h * 180) / Math.PI).toFixed(0)}°\n`
    + `calls ${i.calls}  tris ${i.triangles}  chunks ${live.size}\ncreate ${createMs.toFixed(0)} ms  build last ${lastBuild.toFixed(1)} worst ${worstBuild.toFixed(1)} ms\n`
    + (near ? `edge ${near.e} s ${near.s.toFixed(0)} ${net.name(near.e)} rank ${net.rank[near.e]}` : '');
  window.__ready = true;
  requestAnimationFrame(frame);
}
window.__dev = { goto, along, top, net, cam, scene, renderer, streets, info: () => ({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, createMs, worstBuild, chunks: live.size, perChunk: [...live.values()].map((g) => g.children.length) }) };
if (q.has('hud') && q.get('hud') === '0') { hud.style.display = 'none'; document.getElementById('bar').style.display = 'none'; }
requestAnimationFrame(frame);
