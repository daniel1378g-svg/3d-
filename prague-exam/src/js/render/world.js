// The world renderer: sky, light and fog, the chunked static city (streets, buildings, signs),
// street furniture, traffic lights, everything that moves, and the mirrors.
//
//   const world = await createWorld({ canvas, net, packs: { buildings, ground }, quality, onProgress });
//   await world.prewarm(x, z);
//   world.render(frame);          // every animation frame, see the frame shape below
//
// onProgress(fraction 0..1, stage) is called with stage 'assets' while createWorld paints the
// textures and with stage 'chunks' while prewarm builds the city round the start point.
//
// frame = { t, eye: { x, y, z, heading, yaw, pitch }, mirrors: [{ x, y, w, h, yaw, fov }],
//           cars: { n, x, z, heading, variant, colour, state }, trams: { n, x, z, heading },
//           peds: { n, x, z, heading, phase } }
// eye.pitch is positive upwards. mirror.fov is the horizontal field of view in radians.
// Uses the global THREE (0.159).
import { createSurfaceTextures, createFacadeAtlas, SIGNS, createSignAtlas, models, createStreets } from './world/deps.js';
import { CHUNK, CHUNKS, chunkCoord, chunkX0, chunkZ0 } from './world/util.js';
import { createBuildings } from './world/buildings.js';
import { createSigns } from './world/signs.js';
import { createSignals } from './world/signals.js';
import { createProps } from './world/props.js';
import { createActors } from './world/actors.js';
import { createMirrors } from './world/mirrors.js';

// Fog ends inside the loaded square (radius * 240 m at the least), so chunks appear unseen.
const QUALITY = {
  low: { pixelRatio: 1, radius: 1, fogNear: 60, fogFar: 232, mirrorEvery: 3, propTris: 30000 },
  medium: { pixelRatio: 1.5, radius: 2, fogNear: 130, fogFar: 468, mirrorEvery: 2, propTris: 60000 },
  high: { pixelRatio: 2, radius: 3, fogNear: 200, fogFar: 700, mirrorEvery: 1, propTris: 110000 },
};
const HORIZON = 0xd3dce2, ZENITH = 0x93adc6;
const BUILD_BUDGET = 6;                  // ms of chunk building per frame, at the very most
const PARTS = 3;                         // streets, buildings, signs + furniture
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

// Bright overcast sky: a gradient that is exactly the fog colour at and below the horizon, with
// a faint cloud pattern higher up. Drawn at the far plane after everything opaque.
function createSky() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#808080'; g.fillRect(0, 0, 128, 128);
  let seed = 7;
  const rnd = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < 46; i++) {
    const x = rnd() * 128, y = rnd() * 128, r = 10 + rnd() * 26, v = rnd() < 0.5 ? 255 : 0, a = 0.1 + rnd() * 0.16;
    for (const ox of [-128, 0, 128]) for (const oy of [-128, 0, 128]) {
      const grad = g.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r);
      grad.addColorStop(0, `rgba(${v},${v},${v},${a})`); grad.addColorStop(1, `rgba(${v},${v},${v},0)`);
      g.fillStyle = grad; g.fillRect(x + ox - r, y + oy - r, 2 * r, 2 * r);
    }
  }
  const clouds = new THREE.CanvasTexture(c);
  clouds.wrapS = clouds.wrapT = THREE.RepeatWrapping;
  const material = new THREE.ShaderMaterial({
    uniforms: { horizon: { value: new THREE.Color(HORIZON) }, zenith: { value: new THREE.Color(ZENITH) }, clouds: { value: clouds } },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = position;
        vec4 p = projectionMatrix * vec4( mat3( viewMatrix ) * position, 1.0 );
        gl_Position = p.xyww;
      }`,
    fragmentShader: `
      uniform vec3 horizon; uniform vec3 zenith; uniform sampler2D clouds;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize( vDir );
        float h = max( d.y, 0.0 );
        vec3 col = mix( horizon, zenith, smoothstep( 0.14, 0.85, h ) );
        vec2 uv = d.xz / ( d.y + 0.3 );
        float c = texture2D( clouds, uv * 0.21 ).r + 0.5 * texture2D( clouds, uv * 0.57 + 0.37 ).r;
        col += ( c - 0.75 ) * 0.34 * smoothstep( 0.1, 0.42, h );
        gl_FragColor = vec4( col, 1.0 );
        #include <colorspace_fragment>
      }`,
    side: THREE.BackSide, depthWrite: false, fog: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 12), material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 1000;
  mesh.matrixAutoUpdate = false;
  return { mesh, dispose: () => { mesh.geometry.dispose(); material.dispose(); clouds.dispose(); } };
}

export async function createWorld({ canvas, net, packs, quality = 'medium', onProgress } = {}) {
  const report = (p, stage) => { if (onProgress) { try { onProgress(p, stage); } catch (err) { console.error(err); } } };
  let Q = QUALITY[quality] || QUALITY.medium;

  // ---- renderer, light and air ------------------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: (window.devicePixelRatio || 1) < 2, powerPreference: 'high-performance', alpha: false, stencil: false });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.info.autoReset = false;       // one frame = main view + mirrors + overlay
  const scene = new THREE.Scene();
  scene.matrixWorldAutoUpdate = true;
  scene.fog = new THREE.Fog(HORIZON, Q.fogNear, Q.fogFar);
  const camera = new THREE.PerspectiveCamera(62, 16 / 9, 0.15, Q.fogFar + 30);
  camera.rotation.order = 'YXZ';
  camera.layers.enable(1);               // layer 1 = detail that the mirrors leave out
  const hemi = new THREE.HemisphereLight(0xe9f0f7, 0x8f897e, 2.5);
  const sun = new THREE.DirectionalLight(0xfff2dc, 1.7);
  sun.position.set(-0.5, 0.82, 0.38);    // high in the south-west
  const sky = createSky();
  scene.add(hemi, sun, sky.mesh);

  let lost = false, zero = true, disposed = false, lastW = -1, lastH = -1, frameNo = 0;
  let lastStats = { calls: 0, triangles: 0, chunks: 0 };
  const errors = new Set();

  function resize() {
    if (disposed) return;
    const w = canvas.clientWidth | 0, h = canvas.clientHeight | 0;
    zero = w < 2 || h < 2;
    if (zero) return;
    const pr = Math.min(window.devicePixelRatio || 1, Q.pixelRatio);
    if (pr !== renderer.getPixelRatio()) { renderer.setPixelRatio(pr); lastW = -1; }
    if (w !== lastW || h !== lastH) { renderer.setSize(w, h, false); lastW = w; lastH = h; }
    const aspect = w / h;
    camera.aspect = aspect;
    // 62° in landscape. A canvas taller than wide keeps that angle across, up to a limit.
    camera.fov = aspect >= 1 ? 62 : Math.min(92, (2 * Math.atan(Math.tan((31 * Math.PI) / 180) / aspect) * 180) / Math.PI);
    camera.far = Q.fogFar + 30;
    camera.updateProjectionMatrix();
  }
  resize();

  // ---- assets -----------------------------------------------------------------------------------
  report(0, 'assets'); await tick();
  const anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const surfaces = createSurfaceTextures();
  report(0.3, 'assets'); await tick();
  const facade = createFacadeAtlas();
  report(0.5, 'assets'); await tick();
  const signAtlas = createSignAtlas();
  report(0.65, 'assets'); await tick();
  const streets = await createStreets({ net, ground: packs.ground, surfaces, signAtlas, anisotropy });
  if (streets.ground) scene.add(streets.ground);
  report(0.85, 'assets'); await tick();
  const buildings = createBuildings({ pack: packs.buildings, atlas: facade, anisotropy });
  const signs = createSigns({ net, SIGNS, atlas: signAtlas, anisotropy });
  const signals = createSignals({ net, models, scene });
  const props = createProps({ net, ground: packs.ground, models, scene });
  const actors = createActors({ models, scene });
  const mirrors = createMirrors({ renderer, scene, canvas });
  report(1, 'assets');

  // ---- chunks -----------------------------------------------------------------------------------
  const chunks = new Map();              // id -> { id, cx, cz, group, stage, streets, walls, roofs, signs, props }
  let centreKey = -1, centreX = 0, centreZ = 0, version = 0, seenVersion = -1, propX = 1e9, propZ = 1e9;

  function drop(ch) {
    scene.remove(ch.group);
    if (ch.streets) { try { streets.disposeChunk(ch.streets); } catch (err) { console.error(err); } }
    for (const m of [ch.walls, ch.roofs, ch.signs]) if (m) m.geometry.dispose();
    chunks.delete(ch.id);
    version++;
  }
  function retarget(x, z) {
    const cx0 = chunkCoord(x), cz0 = chunkCoord(z), r = Q.radius, key = (cz0 * CHUNKS + cx0) * 8 + r;
    if (key === centreKey) return;
    centreKey = key; centreX = cx0; centreZ = cz0;
    for (const ch of [...chunks.values()]) if (Math.max(Math.abs(ch.cx - cx0), Math.abs(ch.cz - cz0)) > r + 1) drop(ch);
    for (let cz = Math.max(0, cz0 - r); cz <= Math.min(CHUNKS - 1, cz0 + r); cz++) for (let cx = Math.max(0, cx0 - r); cx <= Math.min(CHUNKS - 1, cx0 + r); cx++) {
      const id = cz * CHUNKS + cx;
      if (chunks.has(id)) continue;
      const group = new THREE.Group();
      group.matrixAutoUpdate = false;
      scene.add(group);
      chunks.set(id, { id, cx, cz, group, stage: 0, streets: null, walls: null, roofs: null, signs: null, props: null });
    }
  }
  const wanted = (ch) => Math.max(Math.abs(ch.cx - centreX), Math.abs(ch.cz - centreZ)) <= Q.radius;
  function pendingParts() { let n = 0; for (const ch of chunks.values()) if (wanted(ch)) n += PARTS - ch.stage; return n; }
  // Build the next part of the nearest unfinished chunk. False when there is nothing to do.
  function buildNext(x, z) {
    let best = null, bestD = Infinity;
    for (const ch of chunks.values()) {
      if (ch.stage >= PARTS || !wanted(ch)) continue;
      const d = Math.hypot(chunkX0(ch.cx) + CHUNK / 2 - x, chunkZ0(ch.cz) + CHUNK / 2 - z);
      if (d < bestD) { bestD = d; best = ch; }
    }
    if (!best) return false;
    const ch = best, stage = ch.stage++;
    try {
      if (stage === 0) {
        ch.streets = streets.buildChunk(ch.cx, ch.cz);
        if (ch.streets) ch.group.add(ch.streets);
      } else if (stage === 1) {
        const b = buildings.build(ch.id);
        ch.walls = b.walls; ch.roofs = b.roofs;
        if (b.walls) ch.group.add(b.walls);
        if (b.roofs) ch.group.add(b.roofs);
      } else {
        ch.signs = signs.build(ch.id);
        if (ch.signs) { ch.signs.layers.set(1); ch.group.add(ch.signs); }
        ch.props = props.chunkProps(ch.cx, ch.cz);
        version++;
      }
    } catch (err) { complain(err); }
    return true;
  }
  function refillProps(x, z) {
    const done = [];
    for (const ch of chunks.values()) if (ch.stage >= PARTS) done.push(ch);
    if (seenVersion !== version) signals.refill(done.map((ch) => ch.id));
    props.refill(done, x, z, Q.fogFar, Q.propTris);
    seenVersion = version; propX = x; propZ = z;
  }
  function complain(err) {
    const key = String(err && err.message);
    if (errors.has(key)) return;
    errors.add(key);
    console.error('world:', err);
  }

  async function prewarm(x, z) {
    if (disposed) return;
    retarget(x, z);
    const total = Math.max(1, pendingParts());
    let done = 0, t0 = performance.now();
    report(0, 'chunks');
    while (buildNext(x, z)) {
      done++;
      if (performance.now() - t0 > 14) { report(Math.min(0.98, done / total), 'chunks'); await tick(); t0 = performance.now(); if (disposed) return; }
    }
    refillProps(x, z);
    // Compile the shaders and upload the big textures now rather than in the first frames.
    try {
      camera.position.set(x, 1.2, z);
      camera.updateMatrixWorld();
      for (const tex of [facade.texture, signAtlas.texture, ...Object.values(surfaces || {})]) if (tex && tex.isTexture) renderer.initTexture(tex);
      if (!lost && !zero) renderer.compile(scene, camera);
    } catch (err) { complain(err); }
    report(1, 'chunks');
  }

  // ---- frame ------------------------------------------------------------------------------------
  function render(frame) {
    if (disposed || lost || !frame || !frame.eye) return;
    try {
      if (canvas.clientWidth !== lastW || canvas.clientHeight !== lastH) resize();
      if (zero) return;
      frameNo++;
      renderer.info.reset();
      const eye = frame.eye, t = frame.t || 0;
      camera.position.set(eye.x, eye.y, eye.z);
      camera.rotation.set(eye.pitch || 0, -(eye.heading + (eye.yaw || 0)), 0);

      retarget(eye.x, eye.z);
      const t0 = performance.now();
      // One chunk part per frame; a few more only when they were nearly free (empty chunks).
      while (buildNext(eye.x, eye.z) && performance.now() - t0 < BUILD_BUDGET * 0.3);
      if (seenVersion !== version || Math.hypot(eye.x - propX, eye.z - propZ) > 30) refillProps(eye.x, eye.z);

      signals.update(t, eye.x, eye.z);
      actors.update(frame);
      mirrors.update(frame, frameNo, Q.mirrorEvery, scene.fog);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
      mirrors.draw();

      let ready = 0;
      for (const ch of chunks.values()) if (ch.stage >= PARTS) ready++;
      lastStats = { calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, chunks: ready, pending: pendingParts(), geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures };
    } catch (err) { complain(err); }
  }

  function setQuality(q) {
    if (!QUALITY[q] || disposed) return;
    Q = QUALITY[q];
    scene.fog.near = Q.fogNear; scene.fog.far = Q.fogFar;
    centreKey = -1; propX = 1e9; lastW = -1;
    mirrors.invalidate();
    resize();
  }

  // ---- context loss -----------------------------------------------------------------------------
  // three.js restores its own state; the chunk meshes gave up their arrays after the upload, so
  // they are thrown away and built again round the eye over the next frames.
  const onLost = (e) => {
    e.preventDefault();
    lost = true;
    for (const ch of [...chunks.values()]) drop(ch);            // now, while deleting is a silent no-op
  };
  const onRestored = () => {
    lost = false;
    centreKey = -1; lastW = -1; propX = 1e9;
    mirrors.invalidate();
    resize();
  };
  canvas.addEventListener('webglcontextlost', onLost, false);
  canvas.addEventListener('webglcontextrestored', onRestored, false);

  function dispose() {
    if (disposed) return;
    disposed = true;
    canvas.removeEventListener('webglcontextlost', onLost, false);
    canvas.removeEventListener('webglcontextrestored', onRestored, false);
    for (const ch of [...chunks.values()]) drop(ch);
    for (const part of [buildings, signs, signals, props, actors, mirrors, sky]) { try { part.dispose(); } catch (err) { console.error(err); } }
    if (streets.dispose) streets.dispose();
    renderer.dispose();
  }

  return { setQuality, resize, prewarm, render, stats: () => lastStats, dispose, debug: { renderer, scene, camera, chunks } };
}
