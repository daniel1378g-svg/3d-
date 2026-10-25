import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gunzipSync } from 'three/addons/libs/fflate.module.js';
import { createGlassMaterial, createBrassMaterial, kelvinToColor } from './materials.js';
import { makeLightPattern, drawLightPattern } from './mosaic.js';
import { FINISHES, PALETTES } from '../config.js';
import { ROOM } from './room.js';

const base = import.meta.env.BASE_URL;
const SCALE = 1.15; // model units → metres (globe Ø ≈ 16 cm, overall height ≈ 94 cm)
const MAX_GLOBES = 7;
const deg = (d) => (d * Math.PI) / 180;

// ── Model delivery ───────────────────────────────────────────────
// 1. models/chandelier.glb: Meshopt-compressed, smallest, but its decoder needs WebAssembly.
// 2. models/chandelier-q.glb.gz: quantized and gzipped; inflates in plain JavaScript, so it also
//    works where a Content-Security-Policy blocks WebAssembly or data: URLs (embedded viewers).
// A page can name its own source with <meta name="nur:model" content="…"> (.glb, .gz or a
// .json file holding {"data": base64}).
async function fetchBytes(url, onProgress) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const total = Number(res.headers.get('content-length')) || 0;
  if (!res.body || !total) {
    const b = new Uint8Array(await res.arrayBuffer());
    onProgress?.(1);
    return b;
  }
  const reader = res.body.getReader();
  const chunks = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    got += value.length;
    onProgress?.(Math.min(1, got / total));
  }
  const out = new Uint8Array(got);
  let o = 0;
  for (const c of chunks) { out.set(c, o); o += c.length; }
  return out;
}

function fromBase64(s) {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function loadGLTF(url, onProgress) {
  let bytes = await fetchBytes(url, onProgress);
  if (/\.json($|\?)/.test(url)) bytes = fromBase64(JSON.parse(new TextDecoder().decode(bytes)).data);
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) bytes = gunzipSync(bytes); // some hosts already inflate .gz
  const jsonLength = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(12, true);
  const header = new TextDecoder().decode(bytes.subarray(20, 20 + jsonLength));
  const loader = new GLTFLoader();
  if (header.includes('EXT_meshopt_compression')) {
    const { MeshoptDecoder } = await import('three/addons/libs/meshopt_decoder.module.js');
    await MeshoptDecoder.ready; // rejects when WebAssembly is blocked → next source
    loader.setMeshoptDecoder(MeshoptDecoder);
  }
  const buffer = bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength ? bytes.buffer : bytes.slice().buffer;
  return new Promise((resolve, reject) => loader.parse(buffer, '', resolve, reject));
}

async function loadChandelierModel(onProgress) {
  const own = document.querySelector('meta[name="nur:model"]')?.content;
  const sources = own ? [own] : [`${base}models/chandelier.glb`, `${base}models/chandelier-q.glb.gz`];
  let lastError;
  for (const src of sources) {
    try {
      return await loadGLTF(src, onProgress);
    } catch (err) {
      lastError = err;
      console.warn(`Chandelier model: ${src} could not be used, trying the next source.`, err);
    }
  }
  throw lastError;
}

// Arrangements in model space. `a` follows atan2(z, x) around the chandelier axis (90° faces
// the viewer); `links` lowers a pendant by that many chain links (even counts keep the
// alternating link orientation intact).
const ARRANGEMENTS = {
  3: { center: false, radial: 0, outer: [{ a: 90, links: 0 }, { a: -30, links: 4 }, { a: -150, links: 2 }] },
  5: { center: true, radial: 0, outer: [{ a: 101, links: 0 }, { a: -70, links: 0 }, { a: -172, links: 4 }, { a: 15, links: 4 }] },
  7: { center: true, radial: 0.012, outer: [{ a: 90, links: 0 }, { a: 150, links: 10 }, { a: 210, links: 0 }, { a: 270, links: 10 }, { a: 330, links: 0 }, { a: 30, links: 10 }] },
};

export class Chandelier {
  constructor(scene, { quality }) {
    this.scene = scene;
    this.quality = quality;
    this.root = new THREE.Group(); // user rotation (yaw) happens here
    this.root.name = 'chandelier';
    scene.add(this.root);
    this.model = new THREE.Group(); // model space → room space
    this.root.add(this.model);
    this.pendants = []; // everything currently in the scene (including ones retracting)
    this.active = []; // the arrangement being shown
    this.globes = []; // active pendants in left → right order
    this.palette = 'iznik';
    this.finish = 'antique';
    this.count = 5;
    this.lights = [];
    this.bulbColor = new THREE.Color();
    this.tint = new THREE.Color(1, 1, 1);
    this.mixAnimating = false;
  }

  // Load the GLB and rebuild it into pendants that can be re-arranged.
  async load(onProgress) {
    const gltf = await loadChandelierModel(onProgress);
    const src = gltf.scene;
    src.updateMatrixWorld(true);

    const info = [];
    src.traverse((o) => {
      if (!o.isMesh) return;
      const box = new THREE.Box3().setFromObject(o);
      info.push({ mesh: o, box, c: box.getCenter(new THREE.Vector3()), glass: /mosaic/i.test(o.material.name) });
    });
    // bake every mesh into model space, then detach it from the loader's hierarchy
    for (const i of info) {
      i.mesh.matrixWorld.decompose(i.mesh.position, i.mesh.quaternion, i.mesh.scale);
      i.mesh.removeFromParent();
      i.mesh.geometry.computeBoundingSphere();
    }

    const tallest = info.reduce((a, b) => (a.box.max.y - a.box.min.y > b.box.max.y - b.box.min.y ? a : b));
    const crown = info.find((i) => i.mesh.name.startsWith('Object117')) || tallest;
    this.axis = new THREE.Vector3(crown.c.x, 0, crown.c.z);
    this.top = crown.box.max.y; // the canopy touches the ceiling
    this.crownBottom = crown.box.min.y;

    this.model.scale.setScalar(SCALE);
    this.model.position.set(-this.axis.x * SCALE, ROOM.ceiling - this.top * SCALE, -this.axis.z * SCALE);

    const tl = new THREE.TextureLoader();
    const detail = tl.load(`${base}textures/brass-detail.jpg`);
    detail.colorSpace = THREE.SRGBColorSpace;
    const rough = tl.load(`${base}textures/brass-rough.jpg`);
    for (const t of [detail, rough]) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2); t.anisotropy = 8; }
    this.brass = createBrassMaterial({ detail, rough });

    // a pendant = a glass globe plus every part hanging on the same vertical line
    const used = new Set([crown]);
    const groups = info.filter((i) => i.glass).map((g) => {
      const parts = info.filter((i) => !i.glass && i !== crown && Math.hypot(i.c.x - g.c.x, i.c.z - g.c.z) < 0.03);
      parts.forEach((p) => used.add(p));
      used.add(g);
      const r = Math.hypot(g.c.x - this.axis.x, g.c.z - this.axis.z);
      return { globe: g, parts, r, angle: Math.atan2(g.c.z - this.axis.z, g.c.x - this.axis.x) };
    });

    for (const i of [crown, ...info.filter((x) => !used.has(x))]) {
      i.mesh.material = this.brass;
      i.mesh.castShadow = true;
      this.model.add(i.mesh);
    }

    const center = groups.reduce((a, b) => (a.r < b.r ? a : b));
    const outer = groups.filter((g) => g !== center);
    this.template = this.buildTemplate(outer.reduce((a, b) => (a.globe.c.y > b.globe.c.y ? a : b)));
    this.centerPendant = this.buildCenter(center);

    // A faint light inside each globe warms the brass at the openings (high tier only).
    // A fixed count avoids shader recompiles when the arrangement changes.
    const inner = 0; // set to MAX_GLOBES for warm light on the brass at the globe openings
    for (let i = 0; i < inner; i++) {
      const l = new THREE.PointLight(0xffb36b, 0, 0, 2);
      this.scene.add(l);
      this.lights.push(l);
    }
    // The room is lit by three lights just outside the fixture, so no brass part sits
    // inside a light's near field (which would read as neon rings).
    this.fill = [];
    for (let i = 0; i < 3; i++) {
      const l = new THREE.PointLight(0xffb36b, 0, 0, 2);
      this.scene.add(l);
      this.fill.push(l);
    }

    // light thrown through the glass onto the ceiling and the back wall
    const res = this.quality.tier === 'high' ? 512 : 256;
    this.patternCeil = makeLightPattern(this.palette, res);
    this.patternWall = makeLightPattern(this.palette, res);
    // the wall pattern is redrawn from this source, turned with the chandelier
    this.wallSource = document.createElement('canvas');
    this.wallSource.width = this.wallSource.height = res;
    drawLightPattern(this.wallSource, this.palette);
    this.wallAngle = 0;
    this.wallDrawn = 0;
    const crownY = ROOM.ceiling - (this.top - this.crownBottom) * SCALE;
    // Light through the glass paints the ceiling: an additive projection that turns with the
    // chandelier. Unlike a spotlight it can't overexpose the brass just above the globes.
    this.ceilGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 3.6),
      new THREE.MeshBasicMaterial({ map: this.patternCeil, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: 0x000000 }),
    );
    this.ceilGlow.rotation.x = Math.PI / 2;
    this.ceilGlow.position.set(0, ROOM.ceiling - 0.004, 0);
    this.ceilGlow.renderOrder = 1;
    this.root.add(this.ceilGlow);
    this.wallSpot = new THREE.SpotLight(0xffb36b, 0, 0, 0.7, 1, 2);
    this.wallSpot.position.set(0, crownY - 0.3, -0.32); // behind the globes, so its cone never touches them
    this.wallSpot.target.position.set(-0.4, 1.7, ROOM.back);
    this.wallSpot.map = this.patternWall;
    this.scene.add(this.wallSpot, this.wallSpot.target);
    this.crownY = crownY;
    this.center = new THREE.Vector3(0, ROOM.ceiling - (this.top - (this.top + this.minY(info)) / 2) * SCALE, 0);
    return this;
  }

  minY(info) {
    return Math.min(...info.map((i) => i.box.min.y));
  }

  // Called once the mosaic textures exist.
  setup(mosaic, { palette, finish, globes }) {
    this.mosaic = mosaic;
    this.palette = palette;
    this.setFinish(finish, { animate: false });
    this.setCount(globes, { animate: false });
    this.setPalette(palette, { animate: false });
  }

  buildTemplate(g) {
    const small = (p) => p.box.max.x - p.box.min.x < 0.016 && p.box.max.y - p.box.min.y < 0.016 && p.box.max.z - p.box.min.z < 0.016;
    const links = g.parts.filter(small).sort((a, b) => b.c.y - a.c.y);
    const pitch = links.length > 1 ? (links[0].c.y - links[links.length - 1].c.y) / (links.length - 1) : 0.0105;
    return {
      angle: g.angle,
      r: g.r,
      pitch,
      attachY: links.length ? links[0].box.max.y : g.globe.box.max.y + 0.1,
      globe: g.globe.mesh,
      parts: g.parts.map((p) => p.mesh),
      linkA: links[0]?.mesh,
      linkB: links[1]?.mesh,
      linkAY: links[0]?.c.y,
      linkBY: links[1]?.c.y,
    };
  }

  buildCenter(g) {
    const links = g.parts.filter((p) => p.box.max.y - p.box.min.y < 0.016);
    const attachY = links.length ? Math.max(...links.map((l) => l.box.max.y)) : g.globe.box.max.y + 0.4;
    const arm = new THREE.Group();
    arm.position.set(this.axis.x, 0, this.axis.z);
    const swing = new THREE.Group();
    swing.position.set(0, attachY, 0);
    const content = new THREE.Group();
    content.position.set(-this.axis.x, -attachY, -this.axis.z);
    arm.add(swing);
    swing.add(content);
    for (const p of g.parts) {
      p.mesh.material = this.brass;
      p.mesh.castShadow = true;
      content.add(p.mesh);
    }
    const glass = g.globe.mesh;
    glass.castShadow = true;
    content.add(glass);
    return { arm, swing, glass, outward: new THREE.Vector3(1, 0, 0), r: 0, a: null, center: true, tilt: 0, tiltV: 0, lag: 0, lagV: 0, scale: 1, glowLevel: 1 };
  }

  makeOuter(spec, radial) {
    const t = this.template;
    const a = deg(spec.a);
    const arm = new THREE.Group();
    arm.position.set(this.axis.x, 0, this.axis.z);
    arm.rotation.y = t.angle - a; // rotating about +Y moves atan2(z, x) by −rotation
    const r = t.r + radial;
    const swing = new THREE.Group();
    swing.position.set(Math.cos(t.angle) * r, t.attachY, Math.sin(t.angle) * r);
    const content = new THREE.Group();
    content.position.set(-(this.axis.x + Math.cos(t.angle) * t.r), -t.attachY, -(this.axis.z + Math.sin(t.angle) * t.r));
    arm.add(swing);
    swing.add(content);
    const drop = spec.links * t.pitch;
    const body = new THREE.Group();
    body.position.y = -drop;
    content.add(body);
    for (const p of t.parts) {
      const m = p.clone();
      m.material = this.brass;
      m.castShadow = true;
      body.add(m);
    }
    // extra links fill the gap between the crown and the lowered pendant
    for (let i = 0; i < spec.links && t.linkA && t.linkB; i++) {
      const even = i % 2 === 0;
      const m = (even ? t.linkA : t.linkB).clone();
      m.material = this.brass;
      m.castShadow = true;
      m.position.y += t.linkAY - i * t.pitch - (even ? t.linkAY : t.linkBY);
      content.add(m);
    }
    const glass = t.globe.clone();
    glass.castShadow = true;
    body.add(glass);
    return { arm, swing, glass, outward: new THREE.Vector3(Math.cos(t.angle), 0, Math.sin(t.angle)), r: r * SCALE, a, center: false, tilt: 0, tiltV: 0, lag: 0, lagV: 0, scale: 1, glowLevel: 1 };
  }

  setCount(n, { animate = true } = {}) {
    const arr = ARRANGEMENTS[n];
    if (!arr) return;
    this.count = n;
    const old = this.pendants;
    const next = [];
    if (arr.center) next.push(this.centerPendant);
    for (const spec of arr.outer) next.push(this.makeOuter(spec, arr.radial));

    for (const p of old) {
      if (next.includes(p)) continue;
      p.leaving = true;
      p.targetScale = 0.001;
      if (!animate) this.removePendant(p);
    }
    for (const p of next) {
      p.leaving = false;
      p.targetScale = 1;
      if (!p.arm.parent) this.model.add(p.arm);
      if (!old.includes(p)) {
        p.scale = animate ? 0.001 : 1;
        p.swing.scale.setScalar(p.scale);
        p.glowLevel = 1;
      }
      if (!p.glass.material.userData.uniforms) {
        p.glass.material = createGlassMaterial({ color: this.mosaic.color(this.palette), normal: this.mosaic.normal, aux: this.mosaic.aux });
      }
      p.glass.userData.pendant = p;
    }
    this.pendants = animate ? [...next, ...old.filter((p) => !next.includes(p))] : next;
    this.active = next;

    // left → right as seen from the front; the centre globe sits in the middle of the order
    const outerSorted = next.filter((p) => !p.center).sort((x, y) => Math.cos(x.a) - Math.cos(y.a));
    const ordered = [...outerSorted];
    if (arr.center) ordered.splice(Math.floor(ordered.length / 2), 0, this.centerPendant);
    this.globes = ordered;
    this.onGlobesChanged?.(ordered.length);
  }

  removePendant(p) {
    p.arm.removeFromParent();
    if (!p.center) p.glass.material.dispose();
  }

  setGlobeLevels(levels) {
    this.globes.forEach((p, i) => { p.glowLevel = levels[i] ?? 1; });
  }

  setPalette(key, { animate = true } = {}) {
    if (!PALETTES[key] || !this.mosaic) return;
    const prevKey = this.palette;
    this.palette = key;
    const next = this.mosaic.color(key);
    const prev = this.mosaic.color(prevKey);
    const now = performance.now() / 1000;
    const mats = new Set(this.pendants.map((p) => p.glass.material));
    if (this.centerPendant.glass.material.userData.uniforms) mats.add(this.centerPendant.glass.material);
    let i = 0;
    for (const mat of mats) {
      const u = mat.userData.uniforms;
      if (!u) continue;
      u.uMapPrev.value = animate && prevKey !== key ? prev : next;
      mat.map = next;
      u.uMix.value = animate ? 0 : 1;
      mat.userData.mixDelay = animate ? i * 0.08 : 0;
      mat.userData.mixStart = now;
      i++;
    }
    this.mixAnimating = animate;

    // light leaving the globes takes on some of the glass colour
    const pal = PALETTES[key];
    const acc = new THREE.Color(0, 0, 0);
    for (const hex of pal.slots.slice(1)) acc.add(new THREE.Color(hex));
    acc.multiplyScalar(1 / (pal.slots.length - 1));
    this.tint.setRGB(1, 1, 1).lerp(acc, 0.3);
    this.tint.multiplyScalar(1 / Math.max(this.tint.r, this.tint.g, this.tint.b));
    drawLightPattern(this.patternCeil.image, key);
    drawLightPattern(this.wallSource, key);
    this.drawWall(this.wallAngle);
    this.patternCeil.needsUpdate = true;
    this.patternWall.needsUpdate = true;
    this.mosaic.trim([key, prevKey]);
  }

  setFinish(key, { animate = true } = {}) {
    const f = FINISHES[key];
    if (!f) return;
    this.finish = key;
    this.finishTarget = { color: new THREE.Color(f.color), rough: f.rough, clearcoat: key === 'polished' ? 0.6 : 0 };
    if (!animate) {
      this.brass.color.copy(this.finishTarget.color);
      this.brass.roughness = f.rough;
      this.brass.clearcoat = this.finishTarget.clearcoat;
    }
  }

  // Turning the chandelier turns the light it throws onto the back wall
  drawWall(angle) {
    const c = this.patternWall.image;
    const ctx = c.getContext('2d');
    const w = c.width;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, w);
    ctx.translate(w / 2, w / 2);
    ctx.rotate(angle);
    ctx.drawImage(this.wallSource, -w / 2, -w / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.patternWall.needsUpdate = true;
    this.wallAngle = angle;
    this.wallDrawn = performance.now();
  }

  globeWorld(p, target = new THREE.Vector3()) {
    return p.glass.localToWorld(target.copy(p.glass.geometry.boundingSphere.center));
  }

  update(dt, { brightness, yawVel, yawAcc, hoverMesh, reduced }) {
    this.root.updateMatrixWorld(true);
    if (this.finishTarget) {
      const k = reduced ? 1 : 1 - Math.exp(-dt * 5);
      this.brass.color.lerp(this.finishTarget.color, k);
      this.brass.roughness += (this.finishTarget.rough - this.brass.roughness) * k;
      this.brass.clearcoat += (this.finishTarget.clearcoat - this.brass.clearcoat) * k;
    }
    if (this.mixAnimating) {
      const now = performance.now() / 1000;
      let busy = false;
      for (const p of this.pendants) {
        const u = p.glass.material.userData.uniforms;
        if (!u) continue;
        const md = p.glass.material.userData;
        const t = reduced ? 1 : (now - md.mixStart - (md.mixDelay || 0)) / 1.3;
        u.uMix.value = Math.min(1, Math.max(0, t));
        if (t < 1) busy = true;
        else u.uMapPrev.value = p.glass.material.map; // release the previous palette
      }
      this.mixAnimating = busy;
    }

    // a dimmed filament burns warmer
    kelvinToColor(1900 + 850 * Math.pow(brightness, 0.6), this.bulbColor);
    const glassGlow = 1.05 * Math.pow(brightness, 1.1);
    const lightPower = 0.035 * brightness;
    // the eye white-balances to the bulb, so the glass reads closer to its true colour
    _c1.copy(this.bulbColor).lerp(_white, 0.55);

    const alive = [];
    let li = 0;
    let levelSum = 0;
    for (const p of this.pendants) {
      const target = p.targetScale ?? 1;
      if (reduced) p.scale = target;
      else p.scale += (target - p.scale) * (1 - Math.exp(-dt * (target > p.scale ? 4.5 : 9)));
      p.swing.scale.setScalar(Math.max(0.001, p.scale));
      if (p.leaving && p.scale < 0.012) { this.removePendant(p); continue; }
      alive.push(p);

      if (!p.center && !reduced) {
        // spinning swings the globes outward; changes in speed make them trail
        const tiltTarget = Math.min(0.3, Math.atan((yawVel * yawVel * p.r) / 9.81) * 1.6);
        p.tiltV += ((tiltTarget - p.tilt) * 46 - p.tiltV * 3.2) * dt;
        p.tilt += p.tiltV * dt;
        const lagTarget = THREE.MathUtils.clamp(yawAcc * 0.01, -0.16, 0.16);
        p.lagV += ((lagTarget - p.lag) * 46 - p.lagV * 3.2) * dt;
        p.lag += p.lagV * dt;
        _q1.setFromAxisAngle(_v1.set(p.outward.z, 0, -p.outward.x), -p.tilt);
        _q2.setFromAxisAngle(_v2.copy(p.outward), p.lag);
        p.swing.quaternion.copy(_q1).multiply(_q2);
      } else {
        p.swing.quaternion.identity();
      }

      const u = p.glass.material.userData.uniforms;
      const lvl = (p.glowLevel ?? 1) * Math.min(1, p.scale);
      if (!p.leaving) levelSum += lvl;
      if (u) {
        u.uGlow.value = glassGlow * lvl;
        u.uBulb.value.copy(_c1);
        const hv = hoverMesh === p.glass ? 1 : 0;
        u.uHover.value += (hv - u.uHover.value) * (reduced ? 1 : 1 - Math.exp(-dt * 10));
      }
      if (!p.leaving && li < this.lights.length) {
        const l = this.lights[li++];
        this.globeWorld(p, l.position);
        l.color.copy(this.bulbColor).multiply(this.tint);
        l.intensity = lightPower * lvl;
      }
    }
    this.pendants = alive;
    for (; li < this.lights.length; li++) this.lights[li].intensity = 0;

    const total = levelSum / 5; // relative to the five-globe original
    const fy = this.center.y - 0.12;
    this.fill.forEach((l, i) => {
      const a = (i / this.fill.length) * Math.PI * 2 + 0.6;
      l.position.set(Math.cos(a) * 0.5, fy, Math.sin(a) * 0.5);
      l.color.copy(this.bulbColor).multiply(this.tint);
      l.intensity = 0.42 * brightness * total;
    });
    this.ceilGlow.material.color.copy(this.bulbColor).multiplyScalar(0.42 * brightness * total);
    this.wallSpot.color.copy(this.bulbColor);
    this.wallSpot.intensity = 20 * brightness * total;
    const yaw = this.root.rotation.y;
    if (Math.abs(yaw - this.wallAngle) > 0.012 && performance.now() - this.wallDrawn > 66 && brightness > 0.01) this.drawWall(yaw);
  }

  pickables() {
    return this.active.map((p) => p.glass);
  }
}

const _q1 = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _c1 = new THREE.Color();
const _white = new THREE.Color(1, 1, 1);
