// Standalone viewer for the procedural assets: sign atlas, surface textures, facade atlas, models.
// Served by `node tools/serve.mjs` at /dev/gallery.html. Uses the global THREE like the game does.
import { SIGNS, createSignAtlas } from '../src/js/render/assets/signs.js';
import { createSurfaceTextures, createFacadeAtlas } from '../src/js/render/assets/textures.js';

const params = new URLSearchParams(location.search);
const only = params.get('only');
const main = document.getElementById('main');
const logEl = document.getElementById('log');
window.addEventListener('error', (e) => { logEl.textContent += `${e.message}\n`; });

function section(title, note) {
  const s = document.createElement('section');
  s.innerHTML = `<h2>${title}</h2>${note ? `<p>${note}</p>` : ''}`;
  main.appendChild(s);
  return s;
}

function view(parent, canvas) {
  const v = document.createElement('div');
  v.className = 'view';
  v.appendChild(canvas);
  parent.appendChild(v);
  return v;
}

function tag(viewEl, text, x, y) {
  const t = document.createElement('div');
  t.className = 'tag';
  t.textContent = text;
  t.style.left = `${x}px`;
  t.style.top = `${y}px`;
  viewEl.appendChild(t);
}

function makeRenderer(width, height) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height);
  return renderer;
}

// ---------------------------------------------------------------------------------------------
// Signs
// ---------------------------------------------------------------------------------------------

function signs() {
  const atlas = createSignAtlas();
  const img = atlas.texture.image;
  const codes = Object.keys(SIGNS);

  const s = section(`Sign atlas · ${codes.length} codes · ${img.width} × ${img.height} px`,
    'Every code cut out of the atlas through uv(code), drawn at one scale (140 px per metre) on road grey and sky blue.');
  const pxPerM = 150, pad = 14, labelH = 16, cols = 1180;
  const sheet = document.createElement('canvas');
  let x = pad, y = pad, rowH = 0;
  const placed = [];
  for (const code of codes) {
    const d = SIGNS[code];
    const scale = d.shape === 'marking' ? pxPerM * 0.42 : pxPerM;
    const w = Math.round(d.w * scale), h = Math.round(d.h * scale);
    const cw = Math.max(w, 64);
    if (x + cw + pad > cols) { x = pad; y += rowH + labelH + pad; rowH = 0; }
    placed.push({ code, x: x + (cw - w) / 2, y, w, h, cx: x, cw });
    x += cw + pad;
    rowH = Math.max(rowH, h);
  }
  sheet.width = cols;
  sheet.height = y + rowH + labelH + pad;
  const g = sheet.getContext('2d');
  g.fillStyle = '#5b6066';
  g.fillRect(0, 0, sheet.width, sheet.height);
  g.font = '11px system-ui, sans-serif';
  g.textAlign = 'center';
  for (const p of placed) {
    const [u0, v0, u1, v1] = atlas.uv(p.code);
    const marking = SIGNS[p.code].shape === 'marking';
    g.fillStyle = marking ? '#3c3f44' : '#8fb4d8';
    g.fillRect(p.cx - 3, p.y - 3, p.cw + 6, p.h + 6);
    g.drawImage(img, u0 * img.width, (1 - v1) * img.height, (u1 - u0) * img.width, (v1 - v0) * img.height, p.x, p.y, p.w, p.h);
    g.fillStyle = '#fff';
    g.fillText(p.code, p.cx + p.cw / 2, p.y + p.h + 14);
  }
  view(s, sheet);

  const s2 = section('Atlas as stored', 'Transparent background; cells keep a 2 px gutter.');
  const raw = document.createElement('canvas');
  raw.width = img.width / 2;
  raw.height = img.height / 2;
  raw.className = 'checker';
  raw.getContext('2d').drawImage(img, 0, 0, raw.width, raw.height);
  view(s2, raw);

  // In the scene: textured quads on posts, 6 to 60 m away, to judge legibility through the mipmaps.
  const s3 = section('Signs in a scene', 'Quads sized from SIGNS, mapped with uv(code), alphaTest 0.5, seen from the driver\'s seat (1.2 m). Rows at 8, 16, 30 and 55 m.');
  const W = 1180, H = 420;
  const renderer = makeRenderer(W, H);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9ec1e4);
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 500);
  camera.position.set(0, 1.2, 0);
  camera.lookAt(0, 2.0, -30);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({ color: 0x4a4d52 }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  atlas.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const mat = new THREE.MeshBasicMaterial({ map: atlas.texture, alphaTest: 0.5, side: THREE.DoubleSide });
  const postMat = new THREE.MeshBasicMaterial({ color: 0x8a8f94 });
  const upright = codes.filter((c) => SIGNS[c].shape !== 'marking');
  const flat = codes.filter((c) => SIGNS[c].shape === 'marking');
  const rows = [8, 16, 30, 55];
  let i = 0;
  rows.forEach((dist, r) => {
    const count = [8, 12, 16, 20][r], spread = dist * 0.82;
    for (let k = 0; k < count; k++, i++) {
      const code = upright[i % upright.length], d = SIGNS[code];
      const geo = new THREE.PlaneGeometry(d.w, d.h);
      const [u0, v0, u1, v1] = atlas.uv(code);
      geo.setAttribute('uv', new THREE.Float32BufferAttribute([u0, v1, u1, v1, u0, v0, u1, v0], 2));
      const m = new THREE.Mesh(geo, mat);
      const px = (k / (count - 1) - 0.5) * spread;
      m.position.set(px, 2.2 + d.h / 2 + r * 0.35, -dist);
      scene.add(m);
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.2 + r * 0.35, 0.06), postMat);
      post.position.set(px, (2.2 + r * 0.35) / 2, -dist - 0.04);
      scene.add(post);
    }
  });
  const markMat = new THREE.MeshBasicMaterial({ map: atlas.texture, transparent: true, depthWrite: false });
  flat.forEach((code, k) => {
    const d = SIGNS[code];
    const geo = new THREE.PlaneGeometry(d.w, d.h);
    const [u0, v0, u1, v1] = atlas.uv(code);
    geo.setAttribute('uv', new THREE.Float32BufferAttribute([u0, v1, u1, v1, u0, v0, u1, v0], 2));
    const m = new THREE.Mesh(geo, markMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set((k - (flat.length - 1) / 2) * 1.5, 0.01, -7 - d.h / 2);
    scene.add(m);
  });
  view(s3, renderer.domElement);
  renderer.render(scene, camera);
}

// ---------------------------------------------------------------------------------------------
// Surfaces
// ---------------------------------------------------------------------------------------------

function surfaces() {
  const t0 = performance.now();
  const tex = createSurfaceTextures();
  const ms = Math.round(performance.now() - t0);
  const names = Object.keys(tex);

  const s = section(`Surfaces · ${names.length} textures · built in ${ms} ms`,
    'Each texture tiled on a 300 m ground plane (repeat = size / userData.metres), camera 1.2 m above it.');
  const cols = 3, cw = 390, ch = 250, gap = 5, rows = Math.ceil(names.length / cols);
  const W = cols * cw + (cols - 1) * gap, H = rows * ch + (rows - 1) * gap;
  const renderer = makeRenderer(W, H);
  renderer.setScissorTest(true);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa9c6e2);
  const camera = new THREE.PerspectiveCamera(60, cw / ch, 0.1, 800);
  camera.position.set(0, 1.2, 0);
  camera.lookAt(0, 0.2, -10);
  const mat = new THREE.MeshBasicMaterial();
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), mat);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);
  // A car-sized box for scale, 8 m ahead.
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.45, 4.4), new THREE.MeshBasicMaterial({ color: 0x8c2f2f }));
  box.position.set(2.6, 0.725, -10);
  scene.add(box);
  const v = view(s, renderer.domElement);
  const uvAttr = plane.geometry.getAttribute('uv');
  const baseUv = uvAttr.array.slice();
  names.forEach((name, i) => {
    const t = tex[name], col = i % cols, row = Math.floor(i / cols);
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const rep = 300 / t.userData.metres;
    for (let k = 0; k < baseUv.length; k++) uvAttr.array[k] = baseUv[k] * rep;
    uvAttr.needsUpdate = true;
    mat.map = t;
    mat.needsUpdate = true;
    const x = col * (cw + gap), y = H - (row + 1) * ch - row * gap;
    renderer.setViewport(x, y, cw, ch);
    renderer.setScissor(x, y, cw, ch);
    renderer.render(scene, camera);
    tag(v, `${name} · ${t.image.width} px = ${t.userData.metres} m`, x + 6, row * (ch + gap) + 6);
  });

  const s2 = section('Surfaces, flat', 'Three by two tiles of each texture at half size: seams would show as a grid.');
  const fw = 384, fh = 256, fcols = 3;
  const flat = document.createElement('canvas');
  flat.width = fcols * fw + (fcols - 1) * gap;
  flat.height = Math.ceil(names.length / fcols) * (fh + gap);
  const g = flat.getContext('2d');
  const v2 = view(s2, flat);
  names.forEach((name, i) => {
    const img = tex[name].image, x = (i % fcols) * (fw + gap), y = Math.floor(i / fcols) * (fh + gap);
    const size = 128;
    g.save();
    g.beginPath();
    g.rect(x, y, fw, fh);
    g.clip();
    for (let ty = 0; ty < fh; ty += size) for (let tx = 0; tx < fw; tx += size) g.drawImage(img, x + tx, y + ty, size, size);
    g.restore();
    tag(v2, name, x + 6, y + 6);
  });
  return tex;
}

if (!only || only === 'signs') signs();
if (!only || only === 'surfaces') surfaces();
document.body.dataset.ready = '1';
