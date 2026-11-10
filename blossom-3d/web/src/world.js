// Loads the baked model and turns it into a three.js scene:
//  - merged static meshes get their lightmap atlas,
//  - repeated props become InstancedMesh with a per-instance lightmap rectangle,
//  - door leaves stay individual so they can swing,
//  - every room gets a box-projected reflection probe captured from the lightmapped scene itself.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Reflector } from 'three/addons/objects/Reflector.js';

const LUMA = 'vec3(0.2126, 0.7152, 0.0722)';

async function fetchBytes(url, onProgress, weight = 1) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  const total = +res.headers.get('content-length') || 0;
  if (!res.body || !total) { const b = await res.arrayBuffer(); onProgress?.(weight); return b; }
  const reader = res.body.getReader();
  const chunks = []; let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value); got += value.length;
    onProgress?.(weight * Math.min(1, got / total));
  }
  const out = new Uint8Array(got); let o = 0;
  for (const c of chunks) { out.set(c, o); o += c.length; }
  return out.buffer;
}

async function gunzip(buf) {
  const ds = new DecompressionStream('gzip');
  const stream = new Blob([buf]).stream().pipeThrough(ds);
  return await new Response(stream).arrayBuffer();
}

function b64ToBytes(b64) {
  const bin = atob(b64); const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// The model is either one .glb, or (Artifact preview, which serves no binary files) gzip + base64 in JSON parts.
async function loadModelBytes(base, manifest, onProgress) {
  const m = manifest.model;
  if (m.file) return fetchBytes(base + m.file, onProgress);
  const parts = [];
  let done = 0;
  for (const f of m.parts) {
    const txt = await (await fetch(base + f)).text();
    parts.push(b64ToBytes(JSON.parse(txt).d));
    done++; onProgress?.(done / m.parts.length);
  }
  const total = parts.reduce((s, p) => s + p.length, 0);
  const all = new Uint8Array(total); let o = 0;
  for (const p of parts) { all.set(p, o); o += p.length; }
  return m.gzip ? gunzip(all.buffer) : all.buffer;
}

// lightmaps: decoded off the main thread; phones get them at half size (a 4096 px atlas is 64 MB of GPU memory)
async function loadLightmap(url, maxSize) {
  const blob = await (await fetch(url)).blob();
  let bmp;
  try {
    const probe = await createImageBitmap(blob);
    if (probe.width > maxSize) { bmp = await createImageBitmap(blob, { resizeWidth: maxSize, resizeHeight: maxSize, resizeQuality: 'high' }); probe.close(); } else bmp = probe;
  } catch {
    return new Promise((resolve, reject) => new THREE.TextureLoader().load(url, resolve, undefined, reject));
  }
  const t = new THREE.Texture(bmp); t.needsUpdate = true;
  return t;
}

// ---------------------------------------------------------------------------------------------- materials
function patchLit(mat, { instanced, probe }) {
  // lightmapped PBR: no diffuse from the environment (the lightmap already has it), reflections scaled by the
  // local baked light level, reflection vector parallax-corrected to the room box, optional per-instance lightmap rect.
  mat.defines = { ...(mat.defines || {}), LM_SCENE: 1 };
  if (instanced) mat.defines.LM_INSTANCED = 1;
  const u = mat.userData.u = {
    envBoxMin: { value: probe ? probe.min : new THREE.Vector3(-1e3, -1e3, -1e3) },
    envBoxMax: { value: probe ? probe.max : new THREE.Vector3(1e3, 1e3, 1e3) },
    envProbePos: { value: probe ? probe.pos : new THREE.Vector3() },
    envGain: { value: probe ? probe.gain : 1.2 },
  };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWorldPosBox;\n#ifdef LM_INSTANCED\nattribute vec4 lmST;\n#endif')
      .replace('#include <uv_vertex>', '#include <uv_vertex>\n#if defined(LM_INSTANCED) && defined(USE_LIGHTMAP)\n vLightMapUv = uv1 * lmST.xy + lmST.zw;\n#endif')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\n#ifdef USE_ENVMAP\n vWorldPosBox = worldPosition.xyz;\n#endif');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWorldPosBox;\nuniform vec3 envBoxMin;\nuniform vec3 envBoxMax;\nuniform vec3 envProbePos;\nuniform float envGain;')
      .replace('#include <envmap_physical_pars_fragment>', THREE.ShaderChunk.envmap_physical_pars_fragment.replace(
        'reflectVec = inverseTransformDirection( reflectVec, viewMatrix );',
        `reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
        {
          vec3 rbmax = ( envBoxMax - vWorldPosBox ) / reflectVec;
          vec3 rbmin = ( envBoxMin - vWorldPosBox ) / reflectVec;
          vec3 rb = mix( rbmin, rbmax, vec3( greaterThan( reflectVec, vec3( 0.0 ) ) ) );
          float fa = min( min( rb.x, rb.y ), rb.z );
          if ( fa > 0.0 && fa < 200.0 ) reflectVec = normalize( vWorldPosBox + reflectVec * fa - envProbePos );
        }`))
      .replace('#include <lights_fragment_maps>', `#include <lights_fragment_maps>
        #if defined( USE_LIGHTMAP ) && defined( USE_ENVMAP )
          iblIrradiance = vec3( 0.0 );
          float lmLum = dot( lightMapIrradiance, ${LUMA} ) * RECIPROCAL_PI;
          radiance *= clamp( lmLum * envGain, 0.06, 3.0 );
        #endif`);
  };
  mat.customProgramCacheKey = () => 'lit' + (instanced ? 'I' : 'S');
  return mat;
}

export async function loadWorld({ base = 'assets/', renderer, onProgress = () => {}, quality, lightmapSize, textureSize }) {
  const prog = { m: 0, t: 0 };
  const report = () => onProgress(prog.m * 0.8 + prog.t * 0.2);
  const [sceneData, manifest] = await Promise.all([
    fetch(base + 'scene.json').then((r) => r.json()),
    fetch(base + 'manifest.json').then((r) => (r.ok ? r.json() : { model: { file: 'model.glb' } })).catch(() => ({ model: { file: 'model.glb' } })),
  ]);
  const lmFiles = sceneData.lightmaps.files;
  let tdone = 0;
  const lmMax = Math.min(renderer.capabilities.maxTextureSize, lightmapSize || 4096);
  const lmPromise = Promise.all(lmFiles.map((f) => loadLightmap(base + f, lmMax).then((t) => { tdone++; prog.t = tdone / lmFiles.length; report(); return t; })));
  const bytes = await loadModelBytes(base, manifest, (p) => { prog.m = p; report(); });
  const gltf = await new Promise((resolve, reject) => new GLTFLoader().parse(bytes, base, resolve, reject));
  const lms = await lmPromise;
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  for (const t of lms) {
    t.flipY = false; t.colorSpace = THREE.SRGBColorSpace; t.channel = 1;
    t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter;
    t.needsUpdate = true;
  }
  const LM_INT = sceneData.lightmaps.range * Math.PI;
  // phones: surface textures at 512 px are plenty and save a lot of GPU memory
  if (textureSize) {
    const seen = new Set(); const jobs = [];
    gltf.scene.traverse((o) => {
      if (!o.isMesh) return;
      for (const key of ['map', 'normalMap', 'roughnessMap']) {
        const t = o.material[key];
        if (!t || seen.has(t) || !t.image || t.image.width <= textureSize || /signs/.test(t.name + (t.image.src || ''))) continue;
        seen.add(t);
        if (t.image.width > 1100) continue;         // the sign atlas
        jobs.push(createImageBitmap(t.image, { resizeWidth: textureSize, resizeHeight: Math.round(textureSize * t.image.height / t.image.width), resizeQuality: 'high' })
          .then((bmp) => { t.image.close?.(); t.image = bmp; t.needsUpdate = true; }).catch(() => {}));
      }
    });
    await Promise.all(jobs);
  }

  const scene = new THREE.Scene();
  const root = new THREE.Group(); root.name = 'world'; scene.add(root);
  gltf.scene.updateMatrixWorld(true);

  // ---- probes: one per top-level room, box = the room's bounding rectangle
  const probes = new Map();
  for (const r of sceneData.rooms) {
    if (r.parent || r.closed) continue;
    let x0 = 1e9, z0 = 1e9, x1 = -1e9, z1 = -1e9, big = null, bigA = 0;
    for (const q of r.rects) {
      x0 = Math.min(x0, q[0]); z0 = Math.min(z0, q[1]); x1 = Math.max(x1, q[2]); z1 = Math.max(z1, q[3]);
      const a = (q[2] - q[0]) * (q[3] - q[1]); if (a > bigA) { bigA = a; big = q; }
    }
    probes.set(r.id, {
      id: r.id, min: new THREE.Vector3(x0, 0, z0), max: new THREE.Vector3(x1, r.ceil, z1),
      pos: new THREE.Vector3((big[0] + big[2]) / 2, Math.min(1.5, r.ceil * 0.55), (big[1] + big[3]) / 2), gain: 1.2, env: null,
    });
  }
  const outdoorProbe = { id: 'EXT', min: new THREE.Vector3(-500, -1, -500), max: new THREE.Vector3(500, 300, 500), pos: new THREE.Vector3(-6, 1.6, -5), gain: 0.5, env: null };

  // ---- derived materials, cached per (source material, atlas, instanced, room)
  const cache = new Map();
  const lit = [];             // materials that take an environment map, for probe assignment
  const special = { glass: [], mirror: [], hideable: [] };
  function derive(src, lmi, instanced, room) {
    const key = `${src.name}|${lmi}|${instanced ? 1 : 0}|${room}`;
    let m = cache.get(key);
    if (m) return m;
    const n = src.name;
    if (n.startsWith('led_')) {
      m = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 2.05, 1.8), name: n });
    } else if (n === 'glass') {
      m = new THREE.MeshStandardMaterial({ name: n, color: 0xdfeceb, transparent: true, opacity: 0.16, roughness: 0.04, metalness: 0.0, side: THREE.DoubleSide, depthWrite: false });
      m.userData.room = room; m.userData.glass = true; lit.push(m);
    } else if (n === 'sign_green') {
      m = new THREE.MeshBasicMaterial({ color: src.color.clone().multiplyScalar(1.3), map: src.map, name: n });
    } else {
      m = src.clone(); m.name = n;
      m.lightMap = lms[lmi]; m.lightMapIntensity = LM_INT;
      if (m.map) { m.map.anisotropy = Math.min(8, maxAniso); }
      m.userData.room = room;
      patchLit(m, { instanced, probe: probes.get(room) || outdoorProbe });
      lit.push(m);
    }
    cache.set(key, m);
    return m;
  }

  // ---- walk the glTF nodes
  const doors = new Map();          // id -> [{obj, type, open, base}]
  const groups = new Map();         // instancing buckets
  const statics = [];
  const meshesOf = (o) => { const out = []; o.traverse((c) => { if (c.isMesh) out.push(c); }); return out; };
  for (const node of [...gltf.scene.children]) {
    const ud = node.userData || {};
    const room = ud.room || 'EXT';
    if (ud.door) {
      // dynamic: bake the lightmap rectangle into a private copy of uv1
      const st = ud.lmst;
      for (const mesh of meshesOf(node)) {
        const g = mesh.geometry.clone();
        const uv1 = g.attributes.uv1;
        if (uv1 && st) for (let i = 0; i < uv1.count; i++) uv1.setXY(i, uv1.getX(i) * st[0] + st[2], uv1.getY(i) * st[1] + st[3]);
        mesh.geometry = g;
        mesh.material = derive(mesh.material, ud.lmi ?? 1, false, room);
      }
      root.add(node);
      const list = doors.get(ud.door_id) || []; doors.set(ud.door_id, list);
      list.push({ obj: node, type: ud.door, open: ud.door === 'swing' ? THREE.MathUtils.degToRad(ud.door_open) : ud.door_slide, rot0: node.rotation.y, pos0: node.position.clone(), t: 0 });
    } else if (ud.lmst) {
      for (const mesh of meshesOf(node)) {
        const key = `${mesh.geometry.uuid}|${mesh.material.name}|${ud.lmi}|${room}`;
        let b = groups.get(key);
        if (!b) groups.set(key, b = { geometry: mesh.geometry, material: mesh.material, lmi: ud.lmi, room, kind: ud.kind, items: [] });
        b.items.push({ matrix: mesh.matrixWorld.clone(), st: ud.lmst });
      }
    } else {
      for (const mesh of meshesOf(node)) {
        mesh.material = derive(mesh.material, ud.lmi ?? 0, false, room);
        mesh.userData.room = room;
        statics.push(mesh);
      }
      root.add(node);
    }
  }
  for (const b of groups.values()) {
    const im = new THREE.InstancedMesh(b.geometry, derive(b.material, b.lmi, true, b.room), b.items.length);
    const st = new Float32Array(b.items.length * 4);
    b.items.forEach((it, i) => { im.setMatrixAt(i, it.matrix); st.set(it.st, i * 4); });
    im.geometry = b.geometry.clone();
    im.geometry.setAttribute('lmST', new THREE.InstancedBufferAttribute(st, 4));
    im.instanceMatrix.needsUpdate = true;
    im.computeBoundingSphere(); im.computeBoundingBox();
    im.userData.room = b.room; im.userData.kind = b.kind;
    root.add(im);
  }

  // large wall mirrors get a true planar reflection while the visitor is in that room
  const mirrors = [];
  if (quality !== 'low') {
    for (const mesh of statics) {
      if (mesh.material.name !== 'mirror') continue;
      const g = mesh.geometry; g.computeBoundingBox();
      const bb = g.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
      const size = bb.getSize(new THREE.Vector3());
      const n = new THREE.Vector3().fromBufferAttribute(g.attributes.normal, 0).transformDirection(mesh.matrixWorld).normalize();
      const w = Math.abs(n.x) > 0.5 ? size.z : size.x, h = size.y;
      if (w * h < 1.5) continue;
      const refl = new Reflector(new THREE.PlaneGeometry(w, h), { textureWidth: 1024, textureHeight: Math.max(128, Math.round(1024 * h / w)), clipBias: 0.003, color: 0xd9dfdd });
      refl.position.copy(bb.getCenter(new THREE.Vector3())).addScaledVector(n, 0.003);
      refl.lookAt(refl.position.clone().add(n));
      refl.visible = false; refl.userData.room = mesh.userData.room;
      root.add(refl); mirrors.push({ refl, fallback: mesh, room: mesh.userData.room });
    }
  }

  // things to hide in the overview ("dollhouse") mode
  const hideInOverview = [];
  root.traverse((o) => {
    if (!o.isMesh) return;
    const n = o.material.name || '';
    if (n.startsWith('ceil') || n.startsWith('led_') || n === 'roof' || n === 'exist_wall' || o.userData.room === 'ROOF' || o.userData.kind === 'light') hideInOverview.push(o);
    if (n === 'glass') o.renderOrder = 5;
  });

  // ---- reflection probes
  const pmrem = new THREE.PMREMGenerator(renderer);
  const probeSize = quality === 'low' ? 64 : 128;
  async function captureProbes(step) {
    const rt = new THREE.WebGLCubeRenderTarget(probeSize, { type: THREE.HalfFloatType, generateMipmaps: false });
    const cam = new THREE.CubeCamera(0.08, 120, rt);
    const prevTM = renderer.toneMapping; renderer.toneMapping = THREE.NoToneMapping;
    const list = [...probes.values(), outdoorProbe];
    for (const m of mirrors) m.refl.visible = false;
    let i = 0;
    for (const p of list) {
      cam.position.copy(p.pos); cam.updateMatrixWorld(true);
      cam.update(renderer, scene);
      const prev = p.env;
      p.env = pmrem.fromCubemap(rt.texture).texture;
      prev?.dispose();
      for (const m of lit) if ((probes.get(m.userData.room) || outdoorProbe) === p) { m.envMap = p.env; m.envMapIntensity = m.userData.glass ? 1.6 : 1.0; m.needsUpdate = true; }
      i++;
      if (step) await step(i / list.length);
    }
    renderer.toneMapping = prevTM;
    rt.dispose();
  }

  return { scene, root, sceneData, doors, probes, captureProbes, hideInOverview, lit, lms, mirrors };
}
