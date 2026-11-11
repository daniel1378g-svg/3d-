// Standalone viewer for the procedural assets: sign atlas, surface textures, facade atlas, models.
// Served by `node tools/serve.mjs` at /dev/gallery.html. Uses the global THREE like the game does.
import { SIGNS, createSignAtlas } from '../src/js/render/assets/signs.js';
import { createSurfaceTextures, createFacadeAtlas } from '../src/js/render/assets/textures.js';
import * as models from '../src/js/render/assets/models.js';

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

// ---------------------------------------------------------------------------------------------
// Facades
// ---------------------------------------------------------------------------------------------

function facades() {
  const t0 = performance.now();
  const atlas = createFacadeAtlas();
  const ms = Math.round(performance.now() - t0);
  const names = Object.keys(atlas.styles), img = atlas.texture.image;
  const s = section(`Facade atlas · ${names.length} styles · ${img.width} × ${img.height} px · built in ${ms} ms`,
    'Test walls: six bays wide, ground floor plus four upper floors, one quad strip per floor with u = distance / (4 × bay). Each wall is multiplied by a building colour through vertex colours.');
  const cols = 4, cw = 292, ch = 300, gap = 4, rows = Math.ceil(names.length / cols);
  const W = cols * cw + (cols - 1) * gap, H = rows * ch + (rows - 1) * gap;
  const renderer = makeRenderer(W, H);
  renderer.setScissorTest(true);
  atlas.texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const mat = new THREE.MeshBasicMaterial({ map: atlas.texture, vertexColors: true });
  const tints = { tenement: 0xe3c98a, panel: 0xd9e2c8, modern: 0xf2f2f2, office: 0xd8cdb8, industrial: 0xc9d3da, house: 0xf0dcc0, garage: 0xd6d0c4, civic: 0xe6d6a8 };
  const v = view(s, renderer.domElement);
  names.forEach((name, i) => {
    const st = atlas.styles[name], bays = 6, floors = 5, width = bays * st.bay, height = floors * st.floor;
    const pos = [], uv = [], colr = [], c = new THREE.Color(tints[name] || 0xffffff);
    for (let f = 0; f < floors; f++) {
      const [v0, v1] = f === 0 ? st.ground : st.upper, y0 = f * st.floor, y1 = y0 + st.floor, u1 = width / (4 * st.bay);
      pos.push(0, y0, 0, width, y0, 0, width, y1, 0, 0, y0, 0, width, y1, 0, 0, y1, 0);
      uv.push(0, v0, u1, v0, u1, v1, 0, v0, u1, v1, 0, v1);
      for (let k = 0; k < 6; k++) colr.push(c.r, c.g, c.b);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colr, 3));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa9c6e2);
    scene.add(new THREE.Mesh(geo, mat));
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 60), new THREE.MeshBasicMaterial({ color: 0x55585c }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(width / 2, 0, 30);
    scene.add(ground);
    const camera = new THREE.PerspectiveCamera(38, cw / ch, 0.1, 500);
    const dist = Math.max(width / (2 * Math.tan(19 * Math.PI / 180) * (cw / ch)), height / (2 * Math.tan(19 * Math.PI / 180))) * 1.04;
    camera.position.set(width / 2 - dist * 0.12, 1.6, dist);
    camera.lookAt(width / 2, height / 2, 0);
    const col = i % cols, row = Math.floor(i / cols), x = col * (cw + gap), y = H - (row + 1) * ch - row * gap;
    renderer.setViewport(x, y, cw, ch);
    renderer.setScissor(x, y, cw, ch);
    renderer.render(scene, camera);
    tag(v, `${name} · bay ${st.bay} m · floor ${st.floor} m`, x + 6, row * (ch + gap) + 6);
  });

  // Street-level look at the two most detailed styles.
  const s2 = section('Facades from the street', 'Camera at 1.2 m, 9 m from the wall.');
  const W2 = 1180, H2 = 380, r2 = makeRenderer(W2, H2);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa9c6e2);
  let x0 = 0;
  for (const name of names) {
    const st = atlas.styles[name], width = 8 * st.bay, floors = name === 'garage' ? 1 : name === 'house' ? 2 : 4;
    const pos = [], uv = [], colr = [], c = new THREE.Color(tints[name]);
    for (let f = 0; f < floors; f++) {
      const [v0, v1] = f === 0 ? st.ground : st.upper, y0 = f * st.floor, y1 = y0 + st.floor, u1 = 2;
      pos.push(x0, y0, 0, x0 + width, y0, 0, x0 + width, y1, 0, x0, y0, 0, x0 + width, y1, 0, x0, y1, 0);
      uv.push(0, v0, u1, v0, u1, v1, 0, v0, u1, v1, 0, v1);
      for (let k = 0; k < 6; k++) colr.push(c.r, c.g, c.b);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colr, 3));
    scene.add(new THREE.Mesh(geo, mat));
    x0 += width;
  }
  const road = new THREE.Mesh(new THREE.PlaneGeometry(600, 40), new THREE.MeshBasicMaterial({ color: 0x55585c }));
  road.rotation.x = -Math.PI / 2;
  road.position.set(x0 / 2, 0, 20);
  scene.add(road);
  const cam = new THREE.PerspectiveCamera(62, W2 / H2, 0.1, 600);
  cam.position.set(6, 1.2, 9);
  cam.lookAt(24, 4.5, 0);
  view(s2, r2.domElement);
  r2.render(scene, cam);
}

// ---------------------------------------------------------------------------------------------
// Models
// ---------------------------------------------------------------------------------------------

function modelsSection() {
  const list = [
    ['car hatch', models.buildCarGeometry('hatch'), 0xb5202a], ['car sedan', models.buildCarGeometry('sedan'), 0x2c4f8c],
    ['car estate', models.buildCarGeometry('estate'), 0xc9ccd0], ['car suv', models.buildCarGeometry('suv'), 0x3a3d42],
    ['car van', models.buildCarGeometry('van'), 0xffffff],
    ['tram', models.buildTramGeometry()], ['bus', models.buildBusGeometry()],
    ['pedestrian 0', models.buildPedestrianGeometry(0), 0x3f7a4a], ['pedestrian 1', models.buildPedestrianGeometry(1), 0xb9892f],
    ['tree 0', models.buildTreeGeometry(0)], ['tree 1', models.buildTreeGeometry(1)], ['tree 2', models.buildTreeGeometry(2)],
    ['lamp', models.buildLampGeometry()], ['signal', models.buildSignalGeometry()], ['pole 2.5', models.buildPoleGeometry(2.5)],
    ['bollard', models.buildBollardGeometry()], ['shelter', models.buildShelterGeometry()],
  ];
  const info = {};
  for (const [name, geo] of list) info[name] = geo.getAttribute('position').count / 3;
  window.__galleryInfo = info;

  const s = section('Models', 'Lambert shading with vertex colours; cars and pedestrians tinted through the material colour, as instanceColor would. The yellow bar on the ground marks the front (-Z). With faces=1, back faces are magenta: any magenta on the outside of a model is an inside-out face.');
  const table = document.createElement('table');
  table.innerHTML = `<tr>${list.map(([n]) => `<th>${n}</th>`).join('')}</tr><tr>${list.map(([n]) => `<td>${info[n]}</td>`).join('')}</tr>`;
  const still = params.has('still'), showFaces = params.has('faces');
  let angle = (Number(params.get('angle')) || 0) * Math.PI / 180;

  const makeView = (title, items, W, H, camPos, camTarget, spacing) => {
    const renderer = makeRenderer(W, H);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa9c6e2);
    scene.add(new THREE.HemisphereLight(0xdfeaff, 0x6b6f66, 1.5));
    const sun = new THREE.DirectionalLight(0xfff4e0, 2.2);
    sun.position.set(-6, 12, -8);
    scene.add(sun);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshLambertMaterial({ color: 0x5d6064 }));
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    const pivots = [];
    let x = 0;
    for (const [name, geo, tint] of items) {
      geo.computeBoundingBox();
      const bb = geo.boundingBox, w = Math.max(bb.max.x - bb.min.x, (bb.max.z - bb.min.z) * 0.9);
      x += w / 2;
      const pivot = new THREE.Group();
      pivot.position.set(x, 0, 0);
      pivot.add(new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true, color: tint === undefined ? 0xffffff : tint })));
      if (showFaces) pivot.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.BackSide })));
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.8), new THREE.MeshBasicMaterial({ color: 0xffd400 }));
      bar.position.set(0, 0.01, bb.min.z - 0.6);
      pivot.add(bar);
      scene.add(pivot);
      pivots.push(pivot);
      x += w / 2 + spacing;
    }
    const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 500);
    camera.position.set(x / 2 + camPos[0], camPos[1], camPos[2]);
    camera.lookAt(x / 2 + camTarget[0], camTarget[1], camTarget[2]);
    const h = document.createElement('p');
    h.textContent = title;
    s.appendChild(h);
    view(s, renderer.domElement);
    return () => {
      for (const p of pivots) p.rotation.y = angle;
      renderer.render(scene, camera);
    };
  };
  const draws = [
    makeView('Cars (5 m and 12 m away, driver eye height)', list.slice(0, 5), 1180, 300, [-2, 1.25, -11], [0, 0.7, 0], 1.6),
    makeView('Tram and bus', list.slice(5, 7), 1180, 330, [-6, 3.2, -30], [0, 1.6, 0], 5),
    makeView('People and street furniture', [...list.slice(7, 9), ...list.slice(12)], 1180, 340, [-1.5, 1.6, -14], [0, 2.2, 0], 1.2),
    makeView('Trees and lamp', [...list.slice(9, 12), list[12]], 1180, 400, [-4, 1.6, -38], [0, 7, 0], 3),
  ];
  s.appendChild(table);
  const frame = () => {
    for (const d of draws) d();
    if (!still) {
      angle += 0.008;
      requestAnimationFrame(frame);
    }
  };
  frame();
}

if (!only || only === 'signs') signs();
if (!only || only === 'surfaces') surfaces();
if (!only || only === 'facades') facades();
if (!only || only === 'models') modelsSection();
document.body.dataset.ready = '1';
