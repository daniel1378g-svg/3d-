// Test page for the world renderer: loads the map, calls createWorld, and drives a camera with a
// simple stand-in for the traffic simulation so that every part of the frame is exercised.
import { loadSection } from '../src/js/data/pack.js';
import { RoadNet } from '../src/js/sim/roadnet.js';
import { createWorld } from '../src/js/render/world.js';

const P = new URLSearchParams(location.search);
const num = (k, d) => (P.has(k) && Number.isFinite(Number(P.get(k))) ? Number(P.get(k)) : d);
const hud = document.getElementById('hud'), errBox = document.getElementById('err');
window.__errors = [];
const fail = (e) => { window.__errors.push(String(e && e.stack || e)); errBox.textContent = window.__errors.join('\n'); };
window.addEventListener('error', (e) => fail(e.error || e.message));
window.addEventListener('unhandledrejection', (e) => fail(e.reason));

const canvas = document.getElementById('view');
const [graph, buildings, ground] = await Promise.all(['graph', 'buildings', 'ground'].map((n) => loadSection(n, { base: '/data/' })));
const net = new RoadNet(graph);
const eye = { x: num('x', 0), y: num('y', 1.2), z: num('z', 0), heading: num('h', 1.75), yaw: 0, pitch: num('pitch', 0) };
if (P.has('place')) {
  const pl = net.places.find((p) => p.id === P.get('place')) || net.places[0];
  const p = net.lanePos(pl.edge, pl.dir, net.lanes(pl.edge, pl.dir) - 1, pl.s);
  eye.x = p.x; eye.z = p.z; eye.heading = num('h', p.h);
}
let quality = P.get('q') || 'medium';
const world = await createWorld({ canvas, net, packs: { buildings, ground }, quality, onProgress: (p, stage) => { hud.textContent = `${stage} ${(p * 100).toFixed(0)}%`; } });
world.resize();
await world.prewarm(eye.x, eye.z);

// ---- stand-in traffic ---------------------------------------------------------------------------
const CARS = 64, TRAMS = 12, PEDS = 48;
const frame = {
  t: num('t', 0), eye, mirrors: [],
  cars: { n: 0, x: new Float32Array(CARS), z: new Float32Array(CARS), heading: new Float32Array(CARS), variant: new Uint8Array(CARS), colour: new Uint32Array(CARS), state: new Uint8Array(CARS) },
  trams: { n: 0, x: new Float32Array(TRAMS), z: new Float32Array(TRAMS), heading: new Float32Array(TRAMS) },
  peds: { n: 0, x: new Float32Array(PEDS), z: new Float32Array(PEDS), heading: new Float32Array(PEDS), phase: new Float32Array(PEDS) },
  player: { visible: false },
};
const PAINT = [0xc8ccd0, 0x1d1f22, 0x7b1e22, 0x24406e, 0xe9e9e4, 0x5a6066, 0x2f5a3c, 0xb9a26a];
let lanes = [], tramLine = null, laneAt = { x: 1e9, z: 1e9 };
function pickLanes() {
  laneAt = { x: eye.x, z: eye.z };
  lanes = [];
  for (let e = 0; e < net.E && lanes.length < 40; e++) {
    if (net.len[e] < 30) continue;
    const m = net.pos(e, net.len[e] / 2);
    if (Math.hypot(m.x - eye.x, m.z - eye.z) > 170) continue;
    for (const dir of [1, -1]) for (let l = 0; l < net.lanes(e, dir); l++) lanes.push({ e, dir, l });
  }
  // The tram polyline that passes nearest to the eye.
  let best = 60;
  tramLine = null;
  for (let i = 0; i < net.tram.pt.length - 1; i++) for (let p = net.tram.pt[i]; p < net.tram.pt[i + 1]; p++) {
    const d = Math.hypot(net.tram.x[p] - eye.x, net.tram.z[p] - eye.z);
    if (d < best) { best = d; tramLine = { p0: net.tram.pt[i], p1: net.tram.pt[i + 1] }; }
  }
  if (tramLine) {
    tramLine.s = [0];
    for (let p = tramLine.p0 + 1; p < tramLine.p1; p++) tramLine.s.push(tramLine.s[tramLine.s.length - 1] + Math.hypot(net.tram.x[p] - net.tram.x[p - 1], net.tram.z[p] - net.tram.z[p - 1]));
  }
}
function traffic(t) {
  if (Math.hypot(eye.x - laneAt.x, eye.z - laneAt.z) > 80) pickLanes();
  const C = frame.cars, T = frame.trams, D = frame.peds, o = {};
  C.n = 0; T.n = 0; D.n = 0;
  if (P.get('traffic') === '0') return;
  lanes.forEach((ln, i) => {
    if (C.n >= CARS) return;
    const len = net.len[ln.e], speed = 6 + (i % 5), s0 = ((i * 37.7) % len + t * speed) % len, s = ln.dir > 0 ? s0 : len - s0;
    net.lanePos(ln.e, ln.dir, ln.l, s, o);
    const k = C.n++;
    C.x[k] = o.x; C.z[k] = o.z; C.heading[k] = o.h; C.variant[k] = i % 6 === 5 && i % 4 ? 0 : i % 6; C.colour[k] = PAINT[i % PAINT.length];
    C.state[k] = 8 | (i % 4 === 0 ? 1 : 0) | (i % 5 === 1 ? 2 : 0) | (i % 5 === 3 ? 4 : 0);
    // A pedestrian on the pavement beside every second lane.
    if (i % 2 === 0 && D.n < PEDS) {
      const sp = (s0 * 0.37 + t * 1.3 + i * 11) % len, side = net.width[ln.e] / 2 + 2;
      net.pos(ln.e, sp, o);
      const j = D.n++;
      D.x[j] = o.x - o.dz * side * ln.dir; D.z[j] = o.z + o.dx * side * ln.dir; D.heading[j] = Math.atan2(o.dx, -o.dz); D.phase[j] = (t * 1.6 + i * 0.3) % 1;
    }
  });
  if (tramLine) {
    const total = tramLine.s[tramLine.s.length - 1];
    for (let b = 0; b < 2 && total > 40; b++) {
      const s = ((t * 9) % (total - 32)) + b * 15.2;
      let k = 1;
      while (k < tramLine.s.length - 1 && tramLine.s[k] < s) k++;
      const p = tramLine.p0 + k, f = (s - tramLine.s[k - 1]) / (tramLine.s[k] - tramLine.s[k - 1] || 1);
      const dx = net.tram.x[p] - net.tram.x[p - 1], dz = net.tram.z[p] - net.tram.z[p - 1];
      T.x[b] = net.tram.x[p - 1] + dx * f; T.z[b] = net.tram.z[p - 1] + dz * f; T.heading[b] = Math.atan2(-dx, dz); T.n = b + 1;
    }
  }
}
function mirrorRects() {
  const w = canvas.clientWidth, s = Math.min(1, w / 900);
  return [
    { x: w / 2 - 150 * s, y: 10, w: 300 * s, h: 78 * s, yaw: Math.PI, fov: 0.75 },
    { x: 12, y: 110 * s + 20, w: 150 * s, h: 96 * s, yaw: Math.PI + 0.35, fov: 0.6 },
    { x: w - 12 - 150 * s, y: 110 * s + 20, w: 150 * s, h: 96 * s, yaw: Math.PI - 0.35, fov: 0.6 },
  ];
}
let mirrorsOn = P.get('mirrors') === '1';

// ---- loop ---------------------------------------------------------------------------------------
const keys = new Set();
addEventListener('keydown', (e) => {
  keys.add(e.key.toLowerCase());
  if (e.key === 'm') mirrorsOn = !mirrorsOn;
  if ('123'.includes(e.key)) { quality = ['low', 'medium', 'high'][Number(e.key) - 1]; world.setQuality(quality); }
});
addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
addEventListener('resize', () => world.resize());
const frozen = P.get('freeze') === '1';
let last = performance.now(), ms = 16;
function step(dt) {
  if (!frozen) frame.t += dt;
  const v = (keys.has('shift') ? 60 : 14) * dt, turn = 1.4 * dt;
  if (keys.has('arrowleft') || keys.has('a')) eye.heading -= turn;
  if (keys.has('arrowright') || keys.has('d')) eye.heading += turn;
  const f = (keys.has('arrowup') || keys.has('w') ? 1 : 0) - (keys.has('arrowdown') || keys.has('s') ? 1 : 0);
  eye.x += Math.sin(eye.heading) * v * f; eye.z -= Math.cos(eye.heading) * v * f;
  eye.y = Math.max(0.5, eye.y + ((keys.has('q') ? 1 : 0) - (keys.has('e') ? 1 : 0)) * 20 * dt);
  traffic(frame.t);
  frame.mirrors = mirrorsOn ? mirrorRects() : [];
}
function loop(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  step(dt);
  const t0 = performance.now();
  world.render(frame);
  ms += (performance.now() - t0 - ms) * 0.1;
  const s = world.stats();
  if (P.get('hud') !== '0') hud.textContent = `${quality}  x ${eye.x.toFixed(0)} z ${eye.z.toFixed(0)} h ${eye.heading.toFixed(2)}  t ${frame.t.toFixed(1)}\ncalls ${s.calls}  tris ${s.triangles}  chunks ${s.chunks} (+${s.pending || 0})  cpu ${ms.toFixed(1)} ms`;
  else hud.style.display = 'none';
  requestAnimationFrame(loop);
}
// Hooks for the screenshot script.
window.__world = world; window.__frame = frame; window.__net = net;
window.__set = async (o) => { Object.assign(eye, o.eye || {}); if (o.q) { quality = o.q; world.setQuality(o.q); } if (o.t !== undefined) frame.t = o.t; if (o.mirrors !== undefined) mirrorsOn = o.mirrors; await world.prewarm(eye.x, eye.z); step(0); world.render(frame); world.render(frame); return world.stats(); };
window.__bench = (n = 60) => { const t0 = performance.now(); for (let i = 0; i < n; i++) { step(1 / 60); world.render(frame); } world.debug.renderer.getContext().finish(); return (performance.now() - t0) / n; };
requestAnimationFrame(loop);
window.__ready = true;
