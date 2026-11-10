import * as THREE from 'three';
import './styles.css';
import { loadWorld } from './world.js';
import { Player, Collider } from './player.js';
import { Minimap } from './minimap.js';
import { Tour } from './tour.js';
import { STR, ROOM_EN, NOTE_EN, pickLang } from './i18n.js';

const $ = (id) => document.getElementById(id);
const app = $('app'), canvas = $('view');
const params = new URLSearchParams(location.search);
let lang = pickLang();
const t = (k) => (STR[lang] && STR[lang][k]) || STR.pt[k] || k;

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $('optLang').value = lang;
}
applyLang();

function fail(msg) {
  const el = $('loadText'); el.textContent = msg; el.classList.add('error'); $('bar').parentElement.hidden = true;
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false, preserveDrawingBuffer: params.has('shot') });
} catch (e) { fail(t('noWebgl')); throw e; }
const touchDevice = matchMedia('(pointer: coarse)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const state = {
  mode: 'walk', running: false, quality: 'auto', scale: 1, room: null, hintT: 0,
  maxDpr: Math.min(window.devicePixelRatio || 1, touchDevice ? 1.6 : 2),
};
try { const q = localStorage.getItem('rb3d.quality'); if (q) state.quality = q; } catch { /* optional */ }
$('optQuality').value = state.quality;
renderer.outputColorSpace = THREE.SRGBColorSpace;
const TM = { agx: THREE.AgXToneMapping, aces: THREE.ACESFilmicToneMapping, neutral: THREE.NeutralToneMapping, linear: THREE.LinearToneMapping };
renderer.toneMapping = TM[params.get('tm')] ?? THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = +(params.get('exp') || 1.05);

const camera = new THREE.PerspectiveCamera(touchDevice ? 72 : 66, 1, 0.06, 400);
camera.rotation.order = 'YXZ';

function skyTexture() {
  const c = document.createElement('canvas'); c.width = 8; c.height = 256;
  const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0.0, '#5e8fd0'); gr.addColorStop(0.32, '#9dbfe6'); gr.addColorStop(0.495, '#e6eef4');
  gr.addColorStop(0.505, '#c9c6bd'); gr.addColorStop(1.0, '#8f8c84');
  g.fillStyle = gr; g.fillRect(0, 0, 8, 256);
  const tex = new THREE.CanvasTexture(c); tex.mapping = THREE.EquirectangularReflectionMapping; tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// a ring of trees far outside, painted once on a canvas: gives the windows and the entrance something to look at
function treeLine() {
  const W = 2048, H = 256;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const tones = [[52, 76, 50], [66, 94, 58], [84, 110, 66]];
  for (let layer = 0; layer < 3; layer++) {
    for (let x = 0; x < W; x += 16 + rnd() * 34) {
      const h = 84 + rnd() * 120 - layer * 30, w = 50 + rnd() * 64, k = 0.82 + rnd() * 0.36, t = tones[layer];
      g.fillStyle = `rgb(${(t[0] * k) | 0},${(t[1] * k) | 0},${(t[2] * k) | 0})`;
      const blobs = []; for (let i = 0; i < 6; i++) blobs.push([(rnd() - 0.5) * w * 0.7, h * 0.4 + rnd() * h * 0.55, w * (0.28 + rnd() * 0.26), h * (0.2 + rnd() * 0.2)]);
      for (const dx of [-W, 0, W]) {      // drawn three times so the strip tiles
        for (const b of blobs) { g.beginPath(); g.ellipse(x + dx + b[0], H - b[1], b[2], b[3], 0, 0, Math.PI * 2); g.fill(); }
        g.fillRect(x + dx - w * 0.5, H - h * 0.42, w, h * 0.42);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.RepeatWrapping; tex.repeat.x = 4; tex.anisotropy = 4;
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(78, 78, 13, 72, 1, true), new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.5, side: THREE.BackSide, color: new THREE.Color(1.5, 1.5, 1.45) }));
  mesh.position.set(0, 6.4, 0); mesh.name = 'treeline';
  return mesh;
}

function resize() {
  const w = app.clientWidth, h = app.clientHeight;
  if (!w || !h) return;
  const low = state.quality === 'low';
  const dpr = (low ? Math.min(1, state.maxDpr) : state.maxDpr) * state.scale;
  renderer.setPixelRatio(dpr); renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = (touchDevice ? 72 : 66) * (w < h ? 1.12 : 1);
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(app);

// ------------------------------------------------------------------------------------------------ overview orbit
class Orbit {
  constructor(cam, dom) {
    this.cam = cam; this.dom = dom; this.enabled = false;
    this.target = new THREE.Vector3(0.3, 0, 0.3); this.dist = 46; this.az = 0.5; this.pol = 0.82;
    this.pts = new Map(); this.moved = 0; this.onTap = null; this.auto = true;
    dom.addEventListener('pointerdown', (e) => { if (!this.enabled) return; this.pts.set(e.pointerId, { x: e.clientX, y: e.clientY, b: e.button }); this.moved = 0; this.t0 = performance.now(); this.auto = false; });
    dom.addEventListener('pointermove', (e) => {
      if (!this.enabled || !this.pts.has(e.pointerId)) return;
      const p = this.pts.get(e.pointerId); const dx = e.clientX - p.x, dy = e.clientY - p.y;
      if (this.pts.size === 1) {
        this.moved += Math.abs(dx) + Math.abs(dy);
        if (p.b === 2 || e.shiftKey) this.pan(dx, dy);
        else { this.az -= dx * 0.006; this.pol = Math.max(0.12, Math.min(1.45, this.pol - dy * 0.005)); }
      } else if (this.pts.size === 2) {
        const [a, b] = [...this.pts.values()]; const d0 = Math.hypot(a.x - b.x, a.y - b.y);
        p.x = e.clientX; p.y = e.clientY;
        const d1 = Math.hypot(a.x - b.x, a.y - b.y);
        if (d0 > 0) this.dist = Math.max(6, Math.min(90, this.dist * d0 / d1));
        this.pan(dx / 2, dy / 2); this.moved += 10;
      }
      p.x = e.clientX; p.y = e.clientY;
    });
    const up = (e) => {
      if (!this.pts.has(e.pointerId)) return;
      this.pts.delete(e.pointerId);
      if (this.enabled && this.moved < 6 && performance.now() - this.t0 < 450 && e.type === 'pointerup') this.onTap?.(e.clientX, e.clientY);
    };
    dom.addEventListener('pointerup', up); dom.addEventListener('pointercancel', up);
    dom.addEventListener('wheel', (e) => { if (!this.enabled) return; e.preventDefault(); this.dist = Math.max(6, Math.min(90, this.dist * Math.exp(e.deltaY * 0.0012))); this.auto = false; }, { passive: false });
  }
  pan(dx, dy) {
    const k = this.dist * 0.0016; const s = Math.sin(this.az), c = Math.cos(this.az);
    this.target.x += (-dx * c - dy * s) * k; this.target.z += (dx * s - dy * c) * k;
    this.target.x = Math.max(-24, Math.min(24, this.target.x)); this.target.z = Math.max(-15, Math.min(15, this.target.z));
  }
  update(dt) {
    if (this.auto) this.az += dt * 0.045;
    const sp = Math.sin(this.pol), cp = Math.cos(this.pol);
    this.cam.position.set(this.target.x + Math.sin(this.az) * sp * this.dist, this.target.y + cp * this.dist, this.target.z + Math.cos(this.az) * sp * this.dist);
    this.cam.rotation.order = 'YXZ'; this.cam.lookAt(this.target);
  }
}

// ------------------------------------------------------------------------------------------------ boot
let world, player, collider, minimap, tour, orbit;
const clock = new THREE.Clock();

function roomAt(x, z) {
  for (const r of world.sceneData.rooms) {
    if (r.closed) continue;
    for (const q of r.rects) if (x >= q[0] - 0.08 && x <= q[2] + 0.08 && z >= q[1] - 0.08 && z <= q[3] + 0.08) return r.parent || r.id;
  }
  return 'EXT';
}
const roomById = (id) => world.sceneData.rooms.find((r) => r.id === id);
function roomLabel(id) {
  const r = roomById(id);
  const name = r ? r.name : t('exterior');
  const bits = [];
  if (lang === 'en' && ROOM_EN[id] && id !== 'EXT') bits.push(ROOM_EN[id]);
  if (r && r.area) bits.push(lang === 'en' ? r.area.replace(',', '.') : r.area);
  if (r && r.note) bits.push(lang === 'en' ? (NOTE_EN[r.note] || r.note) : r.note);
  return { name: id === 'EXT' ? t('exterior') : name, meta: bits.join(' · ') };
}
function showRoom(id, force) {
  if (id === state.room && !force) return;
  state.room = id; const l = roomLabel(id);
  $('roomName').textContent = l.name; $('roomMeta').textContent = l.meta;
  document.querySelectorAll('#roomList li').forEach((li) => li.classList.toggle('here', li.dataset.id === id));
}

function buildRoomList() {
  const ul = $('roomList'); ul.textContent = '';
  const order = ['REF', 'LIMPOS', 'SUJOS', 'TRAY', 'DESC', 'LIMPEZA', 'VEST', 'CORR', 'CIRC', 'BALF', 'BALM', 'TRF', 'TRM', 'ANTE', 'ISMC', 'TEC', 'EXT'];
  for (const id of order) {
    if (!world.sceneData.views[id]) continue;
    const l = roomLabel(id); const r = roomById(id);
    const li = document.createElement('li'); li.dataset.id = id;
    const b = document.createElement('button'); b.type = 'button';
    const n = document.createElement('span'); n.className = 'n'; n.textContent = l.name;
    const a = document.createElement('span'); a.className = 'a'; a.textContent = r && r.area ? (lang === 'en' ? r.area.replace(',', '.') : r.area) : '';
    b.append(n, a);
    const gloss = [lang === 'en' ? ROOM_EN[id] : null, r && r.note ? (lang === 'en' ? NOTE_EN[r.note] || r.note : r.note) : null].filter(Boolean).join(' · ');
    if (gloss && id !== 'EXT') { const g = document.createElement('span'); g.className = 'g'; g.textContent = gloss; b.append(g); }
    b.addEventListener('click', () => { goTo(id); togglePanel('rooms', false); });
    li.append(b); ul.append(li);
  }
  showRoom(state.room, true);
}

function setMode(mode) {
  state.mode = mode; app.dataset.mode = mode;
  const ov = mode === 'overview';
  for (const o of world.hideInOverview) o.visible = !ov;
  player.enabled = !ov; orbit.enabled = ov;
  $('btnOverview').setAttribute('aria-pressed', String(ov));
  $('btnOverview').querySelector('span').textContent = ov ? t('walk') : t('overview');
  $('mapBox').hidden = false;
  if (ov) { tour.stop(); camera.near = 0.5; camera.far = 600; hint(t('hintOverview')); } else { camera.near = 0.06; camera.far = 400; player.apply(); }
  camera.updateProjectionMatrix();
}

function goTo(id) {
  const v = world.sceneData.views[id]; if (!v) return;
  tour.stop();
  if (state.mode !== 'walk') setMode('walk');
  player.set(v[0], v[1], v[2], -3);
}

function hint(text, secs = 7) {
  const el = $('hint'); el.textContent = text; el.hidden = false; state.hintT = secs;
}
let capT = 0;
function caption(id) {
  const l = roomLabel(id); const el = $('caption');
  el.textContent = l.name; if (l.meta) { const s = document.createElement('small'); s.textContent = l.meta; el.append(s); }
  el.hidden = false; capT = 4.5;
}

function togglePanel(which, force) {
  for (const id of ['rooms', 'menu']) {
    const el = $(id), btn = $(id === 'rooms' ? 'btnRooms' : 'btnMenu');
    const show = id === which ? (force ?? el.hidden) : false;
    el.hidden = !show; btn.setAttribute('aria-expanded', String(show));
    if (show) { $('hint').hidden = true; state.hintT = 0; }
  }
}

function startTour() {
  if (state.mode !== 'walk') setMode('walk');
  togglePanel(null);
  tour.start(true);
  $('btnTour').classList.add('on'); $('btnTour').querySelector('span').textContent = t('tourStop');
}

async function boot() {
  resize();
  try {
    world = await loadWorld({
      renderer, quality: state.quality, lightmapSize: (touchDevice || state.quality === 'low') ? 2048 : 4096, textureSize: (touchDevice || state.quality === 'low') ? 512 : 0,
      onProgress: (p) => { $('bar').style.width = Math.round(p * 92) + '%'; },
    });
  } catch (e) { console.error(e); fail(t('failed')); return; }
  const { scene, sceneData } = world;
  scene.background = skyTexture();
  const trees = treeLine(); scene.add(trees); world.hideInOverview.push(trees);
  collider = new Collider(sceneData);
  player = new Player(camera, canvas, collider, sceneData);
  player.noBob = reducedMotion;
  orbit = new Orbit(camera, canvas);
  tour = new Tour(player, sceneData);
  minimap = new Minimap($('map'), sceneData, { onPick: (x, z) => { tour.stop(); if (state.mode !== 'walk') setMode('walk'); const [fx, fz] = collider.snapFree(x, z); player.set(fx, fz, THREE.MathUtils.radToDeg(player.yaw)); } });
  $('north').querySelector('svg').style.transform = `rotate(${-(sceneData.north || 0)}deg)`;
  const sc = minimap.s / (minimap.cv.width / minimap.cv.clientWidth || 1);
  document.querySelector('.scale i').style.width = Math.max(8, 5 * sc) + 'px';

  player.onUserInput = () => { if (tour.active) tour.stop(); if (state.hintT > 1.5) state.hintT = 1.5; };
  player.onJoy = (j, on) => { const el = $('joy'); el.hidden = !on; if (on) { el.style.left = j.ox + 'px'; el.style.top = j.oy + 'px'; el.firstElementChild.style.transform = `translate(${j.x * 34}px, ${j.y * 34}px)`; } };
  player.onLock = (locked) => { if (locked) hint(t('hintLock'), 4); };
  tour.onStop = () => { $('btnTour').classList.remove('on'); $('btnTour').querySelector('span').textContent = t('tour'); };
  tour.onCaption = (st) => caption(st.room);
  orbit.onTap = (cx, cy) => {
    const rect = canvas.getBoundingClientRect();
    const ray = new THREE.Raycaster(); ray.setFromCamera(new THREE.Vector2(((cx - rect.left) / rect.width) * 2 - 1, -((cy - rect.top) / rect.height) * 2 + 1), camera);
    const o = ray.ray.origin, d = ray.ray.direction; if (d.y > -0.01) return;
    const k = -o.y / d.y; const x = o.x + d.x * k, z = o.z + d.z * k;
    if (roomAt(x, z) === 'EXT') return;
    const yaw = THREE.MathUtils.radToDeg(orbit.az + Math.PI);
    setMode('walk'); const [fx, fz] = collider.snapFree(x, z); player.set(fx, fz, yaw, -4);
  };

  // first frame + reflection probes
  const v = sceneData.views[params.get('at') || 'CIRC'] || [0, 0, 0];
  player.set(v[0], v[1], params.has('yaw') ? +params.get('yaw') : v[2], params.has('pitch') ? +params.get('pitch') : -2);
  $('loadText').textContent = t('preparing');
  renderer.compile(scene, camera);
  await world.captureProbes((p) => new Promise((res) => { $('bar').style.width = Math.round(92 + p * 8) + '%'; requestAnimationFrame(res); }));
  // a second pass picks up the reflections of the first one in glossy floors
  if (state.quality !== 'low') await world.captureProbes();
  buildRoomList();
  setMode('overview'); orbit.auto = !reducedMotion;
  app.dataset.state = 'ready';
  $('loadText').textContent = t('ready'); $('btnEnter').disabled = false; $('btnEnterTour').disabled = false;
  window.__viewer = { world, player, state, renderer, camera, goTo, setMode, startTour, tour };
  if (params.has('shot') || params.has('auto')) enter(params.get('tour') === '1');
  renderer.setAnimationLoop(frame);
}

function enter(withTour) {
  app.dataset.state = 'run'; state.running = true;
  setMode(params.get('mode') === 'overview' ? 'overview' : 'walk');
  const v = world.sceneData.views[params.get('at') || 'CIRC'];
  player.set(v[0], v[1], params.has('yaw') ? +params.get('yaw') : v[2], params.has('pitch') ? +params.get('pitch') : -2);
  if (params.has('x')) player.set(+params.get('x'), +params.get('z'), +(params.get('yaw') || 0), +(params.get('pitch') || 0));
  if (withTour) startTour(); else if (state.mode === 'walk') hint(touchDevice ? t('hintTouch') : t('hintDesktop'), 9);
  canvas.focus({ preventScroll: true });
}

let fpsEma = 16, fpsT = 0;
function frame() {
  const dt = Math.min(0.05, clock.getDelta());
  if (state.mode === 'overview') orbit.update(dt);
  else { if (tour.active) tour.update(dt); else player.update(dt); }
  // doors
  const px = player.pos.x, pz = player.pos.y;
  for (const d of world.sceneData.doors) {
    const leaves = world.doors.get(d.id); if (!leaves) continue;
    const dist = Math.hypot(px - d.c[0], pz - d.c[1]);
    d.want = state.mode === 'walk' && state.running ? (dist < 2.0 ? 1 : dist > 2.7 ? 0 : d.want || 0) : 0;
    for (const l of leaves) {
      if (Math.abs(l.t - d.want) < 1e-4) continue;
      l.t += (d.want - l.t) * (1 - Math.exp(-dt * 5.5)); if (Math.abs(l.t - d.want) < 0.002) l.t = d.want;
      const e = l.t * l.t * (3 - 2 * l.t);
      if (!l.q0) { l.q0 = l.obj.quaternion.clone(); l.ax = new THREE.Vector3(1, 0, 0).applyQuaternion(l.q0); }
      if (l.type === 'swing') l.obj.quaternion.copy(l.q0).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), l.open * e));
      else l.obj.position.copy(l.pos0).addScaledVector(l.ax, l.open * e);
    }
  }
  if (state.mode === 'walk') { showRoom(roomAt(px, pz)); }
  for (const m of world.mirrors) { const on = state.mode === 'walk' && state.room === m.room && state.quality !== 'low'; m.refl.visible = on; m.fallback.visible = !on; }
  renderer.render(world.scene, camera);
  if (state.mode === 'walk') minimap.draw(px, pz, player.yaw, state.room); else minimap.draw(orbit.target.x, orbit.target.z, orbit.az + Math.PI, null);
  if (state.hintT > 0) { state.hintT -= dt; if (state.hintT <= 0) $('hint').hidden = true; }
  if (capT > 0) { capT -= dt; if (capT <= 0) $('caption').hidden = true; }
  // keep the frame rate up by trading resolution
  fpsEma += (dt * 1000 - fpsEma) * 0.05; fpsT += dt;
  if (fpsT > 1.6 && state.quality === 'auto' && state.running) {
    fpsT = 0;
    if (fpsEma > 30 && state.scale > 0.55) { state.scale = Math.max(0.55, state.scale - 0.12); resize(); } else if (fpsEma < 13 && state.scale < 1) { state.scale = Math.min(1, state.scale + 0.08); resize(); }
  }
}

// ------------------------------------------------------------------------------------------------ interface
$('btnEnter').addEventListener('click', () => enter(false));
$('btnEnterTour').addEventListener('click', () => enter(true));
$('btnTour').addEventListener('click', () => { if (tour.active) tour.stop(); else startTour(); });
$('btnOverview').addEventListener('click', () => { togglePanel(null); if (state.mode === 'overview') { setMode('walk'); } else { orbit.auto = false; orbit.target.set(player.pos.x * 0.5, 0, player.pos.y * 0.5); setMode('overview'); } });
$('btnRooms').addEventListener('click', () => togglePanel('rooms'));
$('btnMenu').addEventListener('click', () => togglePanel('menu'));
$('btnMapSize').addEventListener('click', () => { $('mapBox').classList.toggle('big'); setTimeout(() => minimap.resize(), 280); });
$('btnLock').addEventListener('click', () => { togglePanel(null); if (state.mode !== 'walk') setMode('walk'); player.requestLock(); });
$('btnFull').addEventListener('click', () => { togglePanel(null); try { (document.fullscreenElement ? document.exitFullscreen() : app.requestFullscreen())?.catch?.(() => {}); } catch { /* optional */ } });
$('optSpeed').addEventListener('input', (e) => { player.speed = +e.target.value; });
$('optQuality').addEventListener('change', (e) => { state.quality = e.target.value; state.scale = 1; try { localStorage.setItem('rb3d.quality', state.quality); } catch { /* optional */ } resize(); });
$('optLang').addEventListener('change', (e) => {
  lang = e.target.value; try { localStorage.setItem('rb3d.lang', lang); } catch { /* optional */ }
  applyLang(); if (world) { buildRoomList(); $('btnOverview').querySelector('span').textContent = state.mode === 'overview' ? t('walk') : t('overview'); if (tour.active) $('btnTour').querySelector('span').textContent = t('tourStop'); }
});
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') togglePanel(null);
  if (!state.running || /INPUT|SELECT/.test(e.target.tagName)) return;
  if (e.key === 'm' || e.key === 'M') $('btnOverview').click();
  if (e.key === 't' || e.key === 'T') $('btnTour').click();
});
canvas.addEventListener('pointerdown', () => togglePanel(null));
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => minimap?.redraw());
new MutationObserver(() => minimap?.redraw()).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
addEventListener('resize', () => minimap?.resize());

boot();
