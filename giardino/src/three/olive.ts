// The signature 3D object: an olive branch after the engraving of the restaurant's original template (and the
// watermark of its printed menus) – a curved stem, lanceolate leaves with dark waxy tops and silvery undersides, and
// two hanging clusters of olives, lit like a late afternoon in the Valais. It is clearly an illustration: no food, no
// interior, nothing that could pass for a photograph of the restaurant.
//
// Everything is procedural (no model download): ~6k leaf vertices, 9 olives, one shadow map. A seeded random keeps the
// live scene identical to the pre-rendered poster (public/brand/olive-branch.webp), so the switch is invisible.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type OliveOptions = { dpr: number; quality: "high" | "low"; transparent?: boolean };
export type Olive = {
  setPointer: (x: number, y: number) => void;
  setScroll: (p: number, velocity?: number) => void;
  resize: (w: number, h: number) => void;
  start: () => void;
  stop: () => void;
  renderAt: (time: number) => void;
  dispose: () => void;
  onFirstFrame: (cb: () => void) => void;
};

// deterministic random
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Leaf surface: narrow lanceolate outline, V-fold along the midrib, curling back towards the tip. */
function leafGeometry(L: number, W: number, curl: number, fold: number, twist: number) {
  const U = 18;
  const V = 6;
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= U; i++) {
    const u = i / U;
    const shape = Math.pow(Math.sin(Math.PI * Math.pow(u, 0.82)), 0.85) * (0.25 + 0.75 * Math.min(1, u * 5));
    for (let j = 0; j <= V; j++) {
      const v = (j / V) * 2 - 1;
      const half = (W / 2) * shape;
      let x = v * half;
      const y = u * L;
      // olive leaves are convex on top: the margins curl under (towards -Z)
      let z = -curl * u * u * L - fold * Math.abs(v) * half;
      // a slight twist along the length
      const a = twist * u;
      const xr = x * Math.cos(a) - z * Math.sin(a);
      const zr = x * Math.sin(a) + z * Math.cos(a);
      x = xr;
      z = zr;
      pos.push(x, y, z);
      uv.push(v * 0.5 + 0.5, u);
    }
  }
  for (let i = 0; i < U; i++) {
    for (let j = 0; j < V; j++) {
      const a = i * (V + 1) + j;
      const b = a + V + 1;
      // counter-clockwise seen from +Z: the leaf's top (front face) looks towards +Z
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Veins and a little mottling, drawn once: used as colour detail and as a bump map. */
function leafTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 512;
  const x = c.getContext("2d")!;
  const g = x.createLinearGradient(0, 512, 0, 0);
  g.addColorStop(0, "#d8d8d8");
  g.addColorStop(0.6, "#ececec");
  g.addColorStop(1, "#f6f6f6");
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 512);
  // mottling
  const r = mulberry32(7);
  for (let i = 0; i < 900; i++) {
    x.fillStyle = `rgba(0,0,0,${0.02 + r() * 0.03})`;
    x.fillRect(r() * 128, r() * 512, 1 + r() * 2, 1 + r() * 3);
  }
  // lateral veins
  x.strokeStyle = "rgba(255,255,255,0.35)";
  x.lineWidth = 1.2;
  for (let i = 1; i < 14; i++) {
    const y = 512 - i * 34;
    x.beginPath();
    x.moveTo(64, y);
    x.quadraticCurveTo(84, y - 18, 124, y - 46);
    x.moveTo(64, y);
    x.quadraticCurveTo(44, y - 18, 4, y - 46);
    x.stroke();
  }
  // midrib
  x.strokeStyle = "rgba(255,255,255,0.85)";
  x.lineWidth = 3;
  x.beginPath();
  x.moveTo(64, 512);
  x.lineTo(64, 0);
  x.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function leafMaterial(tex: THREE.Texture) {
  const m = new THREE.MeshPhysicalMaterial({ map: tex, bumpMap: tex, bumpScale: 0.9, side: THREE.DoubleSide, roughness: 0.5, metalness: 0, sheen: 0.6, sheenColor: new THREE.Color("#dfe6cf"), sheenRoughness: 0.6, envMapIntensity: 0.35 });
  const top = new THREE.Color("#2f3e1b");
  const under = new THREE.Color("#9ea68a");
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTop = { value: top };
    shader.uniforms.uUnder = { value: under };
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uTop;\nuniform vec3 uUnder;")
      .replace("#include <map_fragment>", "#include <map_fragment>\n\tdiffuseColor.rgb *= gl_FrontFacing ? uTop : uUnder;")
      .replace("#include <roughnessmap_fragment>", "#include <roughnessmap_fragment>\n\troughnessFactor = gl_FrontFacing ? 0.34 : 0.8;");
  };
  return m;
}

/** A tube whose radius tapers along the curve. */
function taperedTube(curve: THREE.Curve<THREE.Vector3>, r0: number, r1: number, segments = 64, radial = 10) {
  const frames = curve.computeFrenetFrames(segments, false);
  const pos: number[] = [];
  const nor: number[] = [];
  const idx: number[] = [];
  const p = new THREE.Vector3();
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    curve.getPointAt(t, p);
    const r = r0 + (r1 - r0) * Math.pow(t, 0.8);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const nx = Math.cos(a) * N.x + Math.sin(a) * B.x;
      const ny = Math.cos(a) * N.y + Math.sin(a) * B.y;
      const nz = Math.cos(a) * N.z + Math.sin(a) * B.z;
      pos.push(p.x + r * nx, p.y + r * ny, p.z + r * nz);
      nor.push(nx, ny, nz);
    }
  }
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j;
      const b = a + radial + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  g.setIndex(idx);
  return g;
}

type Leaf = { pivot: THREE.Object3D; base: THREE.Euler; phase: number; amp: number };

export function createOlive(canvas: HTMLCanvasElement, opts: OliveOptions): Olive {
  const rand = mulberry32(2012);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: opts.quality === "high" ? "high-performance" : "low-power" });
  renderer.setPixelRatio(opts.dpr);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(28, 1.25, 0.1, 50);
  camera.position.set(0, 0.15, 8.2);
  camera.lookAt(0, 0, 0);

  // light: warm low sun from the upper left, cool sky, a back light that makes the leaf edges glow
  scene.add(new THREE.HemisphereLight("#fff3df", "#4c5a2f", 0.55));
  const key = new THREE.DirectionalLight("#ffd9a6", 3.4);
  key.position.set(-2.6, 4.6, 4.4);
  key.castShadow = true;
  key.shadow.mapSize.set(opts.quality === "high" ? 1536 : 768, opts.quality === "high" ? 1536 : 768);
  key.shadow.camera.left = -4.5;
  key.shadow.camera.right = 4.5;
  key.shadow.camera.top = 3.5;
  key.shadow.camera.bottom = -3.5;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 16;
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.025;
  key.shadow.radius = 9;
  key.shadow.blurSamples = 16;
  scene.add(key);
  const rim = new THREE.DirectionalLight("#fff1dc", 1.5);
  rim.position.set(3.5, 2.2, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight("#d5e2ff", 0.32);
  fill.position.set(4, -1.5, 3);
  scene.add(fill);

  // a transparent plane behind the branch only catches its shadow, as if on the page itself
  const catcher = new THREE.Mesh(new THREE.PlaneGeometry(16, 12), new THREE.ShadowMaterial({ opacity: 0.11, color: new THREE.Color("#2b2414") }));
  catcher.position.set(0.4, -0.3, -0.85);
  catcher.receiveShadow = true;
  scene.add(catcher);

  const branch = new THREE.Group();
  scene.add(branch);

  // main stem: enters top right, sweeps down to the left (as in the engraving)
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.7, 1.55, -0.3),
    new THREE.Vector3(1.85, 1.28, 0.02),
    new THREE.Vector3(1.0, 0.78, 0.2),
    new THREE.Vector3(0.15, 0.5, 0.16),
    new THREE.Vector3(-0.75, 0.42, -0.02),
    new THREE.Vector3(-1.6, 0.16, -0.18),
    new THREE.Vector3(-2.25, -0.32, -0.34),
  ]);
  const bark = new THREE.MeshPhysicalMaterial({ color: "#5d5440", roughness: 0.82, metalness: 0, envMapIntensity: 0.3 });
  const stem = new THREE.Mesh(taperedTube(stemCurve, 0.058, 0.012, 110, 12), bark);
  stem.castShadow = true;
  branch.add(stem);

  const tex = leafTexture();
  const leafMat = leafMaterial(tex);
  const leaves: Leaf[] = [];
  const tmp = new THREE.Vector3();
  const tan = new THREE.Vector3();

  const VIEW = new THREE.Vector3(-0.25, 0.55, 1).normalize();
  function addLeaf(at: THREE.Vector3, dir: THREE.Vector3, L: number, flip: boolean, roll: number) {
    const pivot = new THREE.Object3D();
    pivot.position.copy(at);
    const y = dir.clone().normalize();
    // face normal: towards the light/viewer, made perpendicular to the leaf axis; some leaves turn their underside
    const z = VIEW.clone().sub(y.clone().multiplyScalar(VIEW.dot(y))).normalize();
    if (flip) z.multiplyScalar(-1);
    const x = new THREE.Vector3().crossVectors(y, z).normalize();
    pivot.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z));
    pivot.rotateY(roll);
    const geo = leafGeometry(L, L * (0.17 + rand() * 0.05), 0.16 + rand() * 0.2, 0.36 + rand() * 0.22, (rand() - 0.5) * 0.8);
    const mesh = new THREE.Mesh(geo, leafMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.y = 0.03;
    pivot.add(mesh);
    branch.add(pivot);
    leaves.push({ pivot, base: pivot.rotation.clone(), phase: rand() * Math.PI * 2, amp: 0.025 + rand() * 0.045 });
  }

  function leavesAlong(curve: THREE.Curve<THREE.Vector3>, count: number, from: number, to: number, size: number) {
    for (let i = 0; i < count; i++) {
      const t = from + ((i + 0.5) / count) * (to - from) + (rand() - 0.5) * 0.015;
      curve.getPointAt(t, tmp);
      curve.getTangentAt(t, tan);
      const side = i % 2 === 0 ? 1 : -1;
      const out = new THREE.Vector3(-tan.y, tan.x, 0).normalize().multiplyScalar(side);
      // leaves point forward along the branch (towards its tip) and outwards, the lower ones droop
      const dir = tan.clone().multiplyScalar(-(0.65 + rand() * 0.3)).add(out.multiplyScalar(0.7 + rand() * 0.25)).add(new THREE.Vector3(0, side < 0 ? -0.25 : 0.05, (rand() - 0.4) * 0.5));
      const L = size * (0.82 + rand() * 0.36) * (1 - t * 0.18);
      addLeaf(tmp.clone(), dir, L, rand() < 0.28, (rand() - 0.5) * 0.5);
    }
  }
  leavesAlong(stemCurve, 26, 0.04, 0.97, 1.0);

  // a side twig hanging down to the right, with its own leaves (depth and a second silhouette)
  stemCurve.getPointAt(0.42, tmp);
  const sideCurve = new THREE.CatmullRomCurve3([tmp.clone(), tmp.clone().add(new THREE.Vector3(0.35, -0.35, 0.18)), tmp.clone().add(new THREE.Vector3(0.95, -0.82, 0.3)), tmp.clone().add(new THREE.Vector3(1.55, -1.05, 0.22))]);
  const side = new THREE.Mesh(taperedTube(sideCurve, 0.026, 0.008, 50, 8), bark);
  side.castShadow = true;
  branch.add(side);
  leavesAlong(sideCurve, 9, 0.12, 0.98, 0.82);
  // terminal leaves
  for (const [curve, L] of [[stemCurve, 0.85], [sideCurve, 0.7]] as const) {
    curve.getPointAt(1, tmp);
    curve.getTangentAt(1, tan);
    addLeaf(tmp.clone(), tan.clone(), L, false, 0.2);
    addLeaf(tmp.clone(), tan.clone().add(new THREE.Vector3(0.15, -0.5, 0.1)), L * 0.85, true, -0.3);
  }

  // olives: two hanging clusters on short twigs
  const ripe = new THREE.MeshPhysicalMaterial({ color: "#2c1b2b", roughness: 0.26, clearcoat: 0.85, clearcoatRoughness: 0.22, sheen: 0.25, sheenColor: new THREE.Color("#7a5a74"), envMapIntensity: 0.9 });
  const turning = new THREE.MeshPhysicalMaterial({ color: "#5b3449", roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.25, envMapIntensity: 0.85 });
  const green = new THREE.MeshPhysicalMaterial({ color: "#5f6a2a", roughness: 0.34, clearcoat: 0.6, clearcoatRoughness: 0.3, envMapIntensity: 0.75 });
  const oliveGeo = new THREE.SphereGeometry(1, 40, 28);
  const twigMat = bark;

  function cluster(t: number, count: number, mats: THREE.Material[]) {
    stemCurve.getPointAt(t, tmp);
    const origin = tmp.clone();
    const end = origin.clone().add(new THREE.Vector3(-0.08 + rand() * 0.12, -0.38, 0.12 + rand() * 0.08));
    const twig = new THREE.CatmullRomCurve3([origin, origin.clone().lerp(end, 0.5).add(new THREE.Vector3(0.04, 0.02, 0.04)), end]);
    const tw = new THREE.Mesh(taperedTube(twig, 0.016, 0.008, 24, 8), twigMat);
    tw.castShadow = true;
    branch.add(tw);
    for (let k = 0; k < count; k++) {
      const a = (k / count) * Math.PI * 2 + rand() * 0.5;
      const stalkEnd = end.clone().add(new THREE.Vector3(Math.cos(a) * 0.17, -0.1 - rand() * 0.14, Math.sin(a) * 0.15 + 0.05));
      const stalk = new THREE.Mesh(taperedTube(new THREE.LineCurve3(end, stalkEnd), 0.007, 0.005, 6, 6), twigMat);
      branch.add(stalk);
      const olive = new THREE.Mesh(oliveGeo, mats[k % mats.length]);
      const s = 0.112 + rand() * 0.02;
      olive.scale.set(s, s * 1.38, s * 0.98);
      olive.position.copy(stalkEnd).add(new THREE.Vector3(0, -s * 1.25, 0));
      olive.rotation.set((rand() - 0.5) * 0.5, rand() * Math.PI, (rand() - 0.5) * 0.6 + Math.cos(a) * 0.35);
      olive.castShadow = true;
      olive.receiveShadow = true;
      branch.add(olive);
    }
  }
  cluster(0.3, 4, [ripe, ripe, turning, ripe]);
  cluster(0.68, 5, [green, ripe, green, turning, green]);

  branch.rotation.set(0.12, -0.32, 0.04);
  branch.position.set(0.05, 0.1, 0);

  // ---- motion --------------------------------------------------------------------------------------------------
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scroll = 0;
  let gust = 0;
  let raf = 0;
  let running = false;
  let first: (() => void) | null = null;
  let last = 0;
  let time = 0;
  // adaptive resolution: when frames take longer than 24 ms on average, render fewer pixels (down to 0.5×)
  let dpr = opts.dpr;
  let slow = 0;
  let size = { w: 1, h: 1 };

  function pose(t: number) {
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    gust *= 0.96;
    const sway = Math.sin(t * 0.55) * 0.025 + Math.sin(t * 0.21) * 0.015;
    // pointer parallax ≤ 6° (0.1 rad), scroll-linked rotation ≤ 30° (BRIEF §7)
    branch.rotation.y = -0.32 + pointer.x * 0.1 + scroll * 0.35;
    branch.rotation.x = 0.12 + pointer.y * 0.1 - scroll * 0.18;
    branch.rotation.z = 0.04 + sway + scroll * 0.22;
    branch.position.y = 0.1 + Math.sin(t * 0.7) * 0.035 + scroll * 1.1;
    branch.position.x = 0.05 + scroll * 0.6;
    for (const l of leaves) {
      const w = Math.sin(t * (1.3 + l.amp * 6) + l.phase) * (l.amp + gust * 0.08);
      l.pivot.rotation.set(l.base.x + w * 0.6, l.base.y + w * 0.35, l.base.z + w);
    }
  }
  function frame() {
    if (!running) return;
    const now = performance.now();
    const dt = now - last;
    time += Math.min(dt / 1000, 0.05);
    last = now;
    slow = dt > 24 && dt < 250 ? slow + 1 : Math.max(0, slow - 1);
    if (slow > 45 && dpr > 0.5) {
      dpr = Math.max(0.5, dpr - 0.15);
      slow = 0;
      renderer.setPixelRatio(dpr);
      renderer.setSize(size.w, size.h, false);
    }
    pose(time);
    renderer.render(scene, camera);
    if (first) {
      const f = first;
      first = null;
      f();
    }
    raf = requestAnimationFrame(frame);
  }

  return {
    setPointer(x, y) {
      pointer.tx = Math.max(-1, Math.min(1, x));
      pointer.ty = Math.max(-1, Math.min(1, y));
    },
    setScroll(p, velocity = 0) {
      scroll = Math.max(0, Math.min(1, p));
      gust = Math.min(1, gust + Math.abs(velocity) * 0.002);
    },
    resize(w, h) {
      size = { w, h };
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    renderAt(t) {
      // deterministic pose for the poster
      for (let i = 0; i < 4; i++) pose(t);
      renderer.render(scene, camera);
    },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
      });
      [leafMat, bark, ripe, turning, green].forEach((m) => m.dispose());
      tex.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
    onFirstFrame(cb) {
      first = cb;
    },
  };
}

export function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}
