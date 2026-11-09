// Exports the 3D scene of the home page as a binary glTF (.glb): the circuit (terrain, track and
// run-off, kerbs and lines, pits, grandstand, paddock, barriers, trees, people and paddock cars) and
// the hero car, as the page builds them, in metres with +Y up (glTF's own convention).
//
// node scripts/export-glb.mjs [--base http://127.0.0.1:8080/] [--out exports/estoril-circuit.glb]
//   [--t 0.05] [--q high] [--res 8192] [--no-vegetation] [--no-people]
//
// The page is loaded through its capture hook (?capture=1&3d=force) and the car is placed where the
// journey shows it at progress --t (0.05: the arrival, on the pit straight). The exporter is
// three.js's own GLTFExporter (the version the page pins), bundled here with esbuild and run in the
// page on the live scene objects. What does not carry over to glTF, and how it is handled:
//  - the sky dome, the clouds (sprites), the aerial track highlight, the sun and the sky light are
//    left out: viewers bring their own sky and lighting (the garage's lamp stays);
//  - the ground and track surfaces (grass, asphalt, pit asphalt, rubber, lines, kerbs, run-off, gravel)
//    are coloured by shader patches from world-space noise (env/shading.js), which glTF cannot carry.
//    Their colours are baked: the page renders those surfaces straight down with an orthographic
//    camera under a uniform white ambient light of intensity π, with no fog, environment or tone
//    mapping, which gives each pixel its albedo (three's Lambert term is albedo / π), in tiles of
//    TILE px; the circuit area at up to --res px (default 8192, about 0.17 m per pixel) and the whole
//    ground at 2048 px (about 3 m per pixel). The surfaces then export with that image as their base
//    colour, mapped by their world X/Z. The painted lines and the rubber are overlays on the asphalt
//    (polygon offset, which glTF has not got): they are in the baked image, so their own meshes are
//    left out rather than drawn coplanar;
//  - the other shader patches (the leaf breakup, the grass sway, the dithered tree LOD, the car's
//    contact shadow) are page-only; those materials export with their base colour, roughness,
//    metalness, textures and vertex colours, and the contact-shadow quad is left out;
//  - trees: the page draws a coarse model for every tree and a detailed one for those near the
//    camera; the export keeps the coarse level for every tree (the one the aerial shots show), as GPU
//    instances (EXT_mesh_gpu_instancing, as all repeated parts are), so each model is stored once;
//  - per-instance shader attributes (the LOD level, leaf flags) are dropped: they are not geometry.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const { build } = require('esbuild');

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const flag = (k) => process.argv.includes('--' + k);
const root = new URL('..', import.meta.url).pathname;
const base = arg('base', 'http://127.0.0.1:8080/');
const out = arg('out', root + 'exports/estoril-circuit.glb');
const t = Number(arg('t', '0.05'));
const q = arg('q', 'high');
const keepVegetation = !flag('no-vegetation');
const keepPeople = !flag('no-people');
const nearRes = Number(arg('res', '8192'));

// three's GLTFExporter as one script that puts it on window (it reads the page's objects through their
// isX flags; the scene root is made from the exporter's own copy, which it recognises by instanceof)
const bundle = await build({
  stdin: {
    contents:
      "import * as THREE from 'three'; import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'; window.__GLTFExporter = GLTFExporter; window.__THREE = THREE;",
    resolveDir: root,
  },
  bundle: true,
  format: 'iife',
  minify: true,
  write: false,
  logLevel: 'warning',
});

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const messages = [];
page.on('pageerror', (e) => messages.push('pageerror: ' + e));
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') messages.push(m.type() + ': ' + m.text());
});
await page.goto(`${base}index.html?capture=1&3d=force&q=${q}`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__cap === 'function' && window.__journey, null, {
  timeout: 300000,
});
await page.evaluate((at) => window.__cap(at, 0), t);
await page.addScriptTag({ content: bundle.outputFiles[0].text });

// --- bake the surface colours -------------------------------------------------------------------
const baked = await page.evaluate(
  async ({ nearRes, TILE }) => {
    const T = window.__THREE;
    const { scene, world, renderer } = window.__journey;
    const m = world.materials;
    const SURFACES = [m.ground, m.asphalt, m.pitAsphalt, m.rubber, m.line, m.kerb, m.runoff, m.gravel];
    const OVERLAYS = [m.rubber, m.line];
    const surfaces = [];
    scene.traverse((n) => {
      if (n.isMesh && !n.isInstancedMesh && SURFACES.includes(n.material)) surfaces.push(n);
    });

    // the circuit area: everything but the open ground, plus a margin; the whole ground for the rest
    const box = (meshes) => {
      const b = new T.Box3();
      for (const mesh of meshes) b.union(new T.Box3().setFromObject(mesh));
      return b;
    };
    const near = box(surfaces.filter((n) => n.material !== m.ground));
    const far = box(surfaces.filter((n) => n.material === m.ground));
    const MARGIN = 40;
    const region = (b, margin, maxPx) => {
      const x0 = Math.floor(b.min.x - margin);
      const z0 = Math.floor(b.min.z - margin);
      const w = Math.ceil(b.max.x + margin) - x0;
      const d = Math.ceil(b.max.z + margin) - z0;
      const mpp = Math.max(w, d) / maxPx; // metres per pixel, the same on both axes
      const px = [Math.ceil(w / mpp), Math.ceil(d / mpp)];
      return { x0, z0, mpp, px, w: px[0] * mpp, d: px[1] * mpp };
    };
    const regions = { near: region(near, MARGIN, nearRes), far: region(far, 0, 2048) };

    // only the surfaces, under a white ambient light of intensity π: each pixel is the albedo
    const hidden = [];
    scene.traverse((n) => {
      if (
        (n.isMesh || n.isSprite || n.isPoints || n.isLine || n.isLight) &&
        !surfaces.includes(n) &&
        n.visible
      ) {
        n.visible = false;
        hidden.push(n);
      }
    });
    const ambient = new T.AmbientLight(0xffffff, Math.PI);
    scene.add(ambient);
    const saved = {
      fog: scene.fog,
      environment: scene.environment,
      background: scene.background,
      toneMapping: renderer.toneMapping,
      size: renderer.getSize(new T.Vector2()),
      ratio: renderer.getPixelRatio(),
      envMaps: SURFACES.map((mat) => mat && mat.envMap),
    };
    scene.fog = null;
    scene.environment = null;
    scene.background = null;
    for (const mat of SURFACES) if (mat) mat.envMap = null;
    renderer.toneMapping = T.NoToneMapping;
    renderer.setRenderTarget(null);
    renderer.setPixelRatio(1);
    renderer.setSize(TILE, TILE, false);
    renderer.setClearColor(0x000000, 1);

    const bake = (r) => {
      const canvas = document.createElement('canvas');
      [canvas.width, canvas.height] = r.px;
      const ctx = canvas.getContext('2d');
      const camera = new T.OrthographicCamera();
      const size = TILE * r.mpp;
      for (let ty = 0; ty * TILE < r.px[1]; ty++)
        for (let tx = 0; tx * TILE < r.px[0]; tx++) {
          const cx = r.x0 + (tx + 0.5) * size;
          const cz = r.z0 + (ty + 0.5) * size;
          Object.assign(camera, {
            left: -size / 2,
            right: size / 2,
            top: size / 2,
            bottom: -size / 2,
            near: 1,
            far: 3000,
          });
          camera.updateProjectionMatrix();
          // looking straight down with -Z up on screen: image columns run along +X, rows along +Z
          camera.position.set(cx, 1000, cz);
          camera.up.set(0, 0, -1);
          camera.lookAt(cx, 0, cz);
          camera.updateMatrixWorld();
          renderer.clear();
          renderer.render(scene, camera);
          ctx.drawImage(renderer.domElement, tx * TILE, ty * TILE);
        }
      const texture = new T.CanvasTexture(canvas);
      texture.flipY = false; // uv (0, 0) is the image's top left, as in glTF
      texture.colorSpace = T.SRGBColorSpace;
      texture.userData.mimeType = 'image/jpeg';
      return texture;
    };
    const textures = { near: bake(regions.near), far: bake(regions.far) };
    textures.near.name = 'circuit-surfaces';
    textures.far.name = 'ground';

    // put the page back as it was for the export
    scene.remove(ambient);
    for (const n of hidden) n.visible = true;
    scene.fog = saved.fog;
    scene.environment = saved.environment;
    scene.background = saved.background;
    SURFACES.forEach((mat, i) => mat && (mat.envMap = saved.envMaps[i]));
    renderer.toneMapping = saved.toneMapping;
    renderer.setPixelRatio(saved.ratio);
    renderer.setSize(saved.size.x, saved.size.y, false);

    // the surfaces take the baked image, mapped by world X/Z, in place of their shader patches
    const materials = new Map();
    const bakedMaterial = (original, key) => {
      const id = original.uuid + key;
      if (!materials.has(id))
        materials.set(
          id,
          new T.MeshStandardMaterial({
            name: (original.name || 'surface') + (key === 'far' ? '-ground' : ''),
            map: textures[key],
            roughness: original.roughness,
            metalness: original.metalness,
            side: original.side,
          }),
        );
      return materials.get(id);
    };
    const uvFor = (geometry, matrix, r) => {
      const position = geometry.attributes.position;
      const uv = new Float32Array(position.count * 2);
      const v = new T.Vector3();
      for (let i = 0; i < position.count; i++) {
        v.fromBufferAttribute(position, i).applyMatrix4(matrix);
        uv[i * 2] = (v.x - r.x0) / r.w;
        uv[i * 2 + 1] = (v.z - r.z0) / r.d;
      }
      return new T.BufferAttribute(uv, 2);
    };
    const inside = (r, x, z) => x >= r.x0 && x <= r.x0 + r.w && z >= r.z0 && z <= r.z0 + r.d;
    const stats = { surfaces: surfaces.length, overlays: 0, ground: [0, 0] };
    for (const mesh of surfaces) {
      if (OVERLAYS.includes(mesh.material)) {
        mesh.visible = false;
        stats.overlays++;
        continue;
      }
      mesh.updateWorldMatrix(true, false);
      const source = mesh.geometry;
      const make = (key, index) => {
        const geometry = new T.BufferGeometry();
        geometry.setAttribute('position', source.attributes.position);
        if (source.attributes.normal) geometry.setAttribute('normal', source.attributes.normal);
        geometry.setAttribute('uv', uvFor(source, mesh.matrixWorld, regions[key]));
        if (index) geometry.setIndex(index);
        else if (source.index) geometry.setIndex(source.index);
        return geometry;
      };
      if (mesh.material !== m.ground) {
        mesh.geometry = make('near');
        mesh.material = bakedMaterial(mesh.material, 'near');
        continue;
      }
      // the ground: its triangles inside the circuit area take the fine image, the rest the coarse one
      const position = source.attributes.position;
      const count = source.index ? source.index.count : position.count;
      const at = (i) => (source.index ? source.index.getX(i) : i);
      const v = new T.Vector3();
      const lists = { near: [], far: [] };
      for (let i = 0; i < count; i += 3) {
        let all = true;
        for (let k = 0; k < 3; k++) {
          v.fromBufferAttribute(position, at(i + k)).applyMatrix4(mesh.matrixWorld);
          if (!inside(regions.near, v.x, v.z)) all = false;
        }
        lists[all ? 'near' : 'far'].push(at(i), at(i + 1), at(i + 2));
      }
      const groundMaterial = mesh.material;
      for (const key of ['near', 'far']) {
        if (!lists[key].length) continue;
        const part = new mesh.constructor(make(key, lists[key]), bakedMaterial(groundMaterial, key));
        part.name = key === 'near' ? 'ground-circuit' : 'ground-surroundings';
        part.matrix.copy(mesh.matrix);
        part.matrixAutoUpdate = false;
        part.receiveShadow = mesh.receiveShadow;
        mesh.parent.add(part);
        stats.ground[key === 'near' ? 0 : 1] = lists[key].length / 3;
      }
      mesh.visible = false;
    }
    return { regions, ...stats };
  },
  { nearRes, TILE: 2048 },
);
console.log(
  `baked: circuit area ${baked.regions.near.px.join('x')} px at ${(baked.regions.near.mpp * 100).toFixed(1)} cm/px` +
    ` from (${baked.regions.near.x0}, ${baked.regions.near.z0}) over ${baked.regions.near.w.toFixed(0)} x ${baked.regions.near.d.toFixed(0)} m;` +
    ` ground ${baked.regions.far.px.join('x')} px at ${baked.regions.far.mpp.toFixed(2)} m/px;` +
    ` ${baked.surfaces} surface meshes, ${baked.overlays} overlays left out, ground triangles ${baked.ground.join(' fine / ')} coarse`,
);

const report = await page.evaluate(
  async ({ keepVegetation, keepPeople }) => {
    const { scene, world, car } = window.__journey;
    const stats = { left: [], dropped: [], instanced: 0, instances: 0 };
    const KEEP_ATTRIBUTES = new Set(['position', 'normal', 'uv', 'uv1', 'color', 'tangent']);

    // what to export: the world (minus the clouds), the hero car, and the paddock cars, crew and
    // visitors the page adds to the scene; not the sky dome, lights, probes or the track highlight
    const parts = [world.root, car.root];
    // the pit crew (posed figures with a base yaw), the paddock visitors (figures in groups) and the
    // parked paddock cars are groups the page adds to the scene itself
    const count = { crew: 0, visitor: 0, 'paddock-car': 0 };
    if (keepPeople)
      for (const node of scene.children) {
        if (!node.isGroup || node === world.root || node === car.root) continue;
        const kind =
          node.userData.baseYaw !== undefined ? 'crew' : node.userData.hip ? 'visitor' : 'paddock-car';
        node.name = node.name || `${kind}-${++count[kind]}`;
        parts.push(node);
      }
    for (const node of scene.children)
      if (!parts.includes(node)) stats.left.push(node.type + ' ' + node.name);

    // the car's contact shadow is a shader-shaded quad (black once exported); viewers cast their own
    car.root.traverse((node) => {
      if (node.name === 'ground-occlusion') node.visible = false;
    });
    world.root.traverse((node) => {
      if (node.name === 'clouds') node.visible = false;
      if (node.isSprite) node.visible = false;
    });
    world.root.traverse((node) => {
      if (!node.isInstancedMesh) return;
      const name = node.name || '';
      const vegetation = /-(near|far)$/.test(name) || name === 'grass-tufts';
      if (vegetation && !keepVegetation) node.visible = false;
      // the near level holds only the trees near the camera: the far level has every tree
      if (/-near$/.test(name)) node.visible = false;
    });

    for (const part of parts)
      part.traverse((node) => {
        if (!node.isMesh || !node.geometry) return;
        const geometry = node.geometry;
        for (const key of Object.keys(geometry.attributes))
          if (!KEEP_ATTRIBUTES.has(key) || geometry.attributes[key].isInstancedBufferAttribute) {
            geometry.deleteAttribute(key);
            if (!stats.dropped.includes(key)) stats.dropped.push(key);
          }
        if (node.isInstancedMesh && node.visible) {
          stats.instanced++;
          stats.instances += node.count;
        }
        // the dithered LOD keeps a tree's far level at full coverage once its level is 1; in the
        // export the far level is the only one, so show it fully
        if (node.isInstancedMesh && /-far$/.test(node.name || '')) node.material.transparent = false;
      });

    // readable node names in the file (Blender's outliner, viewers' scene trees): unnamed meshes take
    // their material's name, then their parent's
    for (const part of parts)
      part.traverse((node) => {
        if (node.name || !node.isMesh) return;
        const material = Array.isArray(node.material) ? node.material[0] : node.material;
        const parent = node.parent && node.parent.name;
        node.name =
          (material && material.name) || (parent ? `${parent}-${node.parent.children.indexOf(node)}` : '');
      });

    // one scene root, named, holding the parts (their matrices are relative to an identity parent)
    const circuit = new window.__THREE.Scene();
    circuit.name = 'Circuito Estoril';
    for (const part of parts) circuit.add(part);

    const exporter = new window.__GLTFExporter();
    const glb = await exporter.parseAsync(circuit, { binary: true, onlyVisible: true, maxTextureSize: 8192 });
    window.__glb = new Uint8Array(glb);
    let triangles = 0;
    let meshes = 0;
    for (const part of parts)
      part.traverse((node) => {
        let visible = true;
        for (let n = node; n; n = n.parent) if (!n.visible) visible = false;
        if (!node.isMesh || !visible) return;
        meshes++;
        const g = node.geometry;
        const k = (g.index ? g.index.count : g.attributes.position.count) / 3;
        triangles += node.isInstancedMesh ? k * node.count : k;
      });
    return { bytes: window.__glb.length, meshes, triangles: Math.round(triangles), ...stats };
  },
  { keepVegetation, keepPeople },
);

// fetch the file in 4 MB pieces (base64)
const chunks = [];
for (let at = 0; at < report.bytes; at += 4 << 20)
  chunks.push(
    Buffer.from(
      await page.evaluate(
        ([from, to]) => {
          let s = '';
          const bytes = window.__glb.subarray(from, to);
          for (let i = 0; i < bytes.length; i += 0x8000)
            s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
          return btoa(s);
        },
        [at, Math.min(report.bytes, at + (4 << 20))],
      ),
      'base64',
    ),
  );
await browser.close();
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, Buffer.concat(chunks));
console.log(
  `${out}: ${(report.bytes / 1048576).toFixed(1)} MB, ${report.meshes} meshes, ${report.triangles.toLocaleString('en')} triangles drawn` +
    ` (${report.instanced} instanced meshes, ${report.instances.toLocaleString('en')} instances)`,
);
console.log('left out:', report.left.join(', ') || '-');
console.log('attributes dropped:', report.dropped.join(', ') || '-');
const notes = messages.filter((m) => !/GPU stall due to ReadPixels/.test(m));
if (notes.length) console.log('page messages:\n  ' + [...new Set(notes)].join('\n  '));
