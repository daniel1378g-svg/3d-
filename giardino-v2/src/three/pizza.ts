// A pizza on a plate, drawn in three.js (an illustration: rocket, cherry tomatoes and mozzarella, like the Giardino
// pizza in the photographs). Drag sideways to spin it; it carries on with inertia and slows down. The plate tilts a
// little towards a mouse pointer, a tomato lifts when the pointer is over it (raycasting), and ← → give it a turn.
// It renders only while something moves, only while it is on screen, and only while the tab is visible.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

type Options = { onFirstFrame: () => void; logo: string; autoSpin: boolean; poster?: boolean };
export type PizzaEngine = { nudge: (direction: number) => void; dispose: () => void };

// ------------------------------------------------------------------ deterministic noise for the textures and shapes
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
/** Smooth periodic noise on a circle: a few sines with random phases. */
function ringNoise(seed: number, octaves = 4) {
  const r = rng(seed);
  const parts = Array.from({ length: octaves }, (_, i) => ({ f: 2 + i * 3 + Math.floor(r() * 3), p: r() * Math.PI * 2, a: 1 / (i + 1.2) }));
  const sum = parts.reduce((n, x) => n + x.a, 0);
  return (t: number) => parts.reduce((n, x) => n + Math.sin(t * x.f + x.p) * x.a, 0) / sum;
}

// ------------------------------------------------------------------ canvas textures
function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!] as const;
}
function tex(c: HTMLCanvasElement, color = true) {
  const t = new THREE.CanvasTexture(c);
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Tomato sauce, melted mozzarella, oil and a few oregano flecks, seen from above; plus its height map. */
function topTextures() {
  const S = 1024;
  const [c, g] = canvas(S, S);
  const [b, h] = canvas(S, S);
  const r = rng(11);
  const cx = S / 2;
  // dough under the sauce
  g.fillStyle = "#e3b877";
  g.fillRect(0, 0, S, S);
  h.fillStyle = "#555";
  h.fillRect(0, 0, S, S);
  // the sauce, with a slightly uneven edge
  const edge = ringNoise(3);
  g.beginPath();
  for (let i = 0; i <= 180; i++) {
    const a = (i / 180) * Math.PI * 2;
    const rad = S * 0.47 * (1 + edge(a) * 0.025);
    g.lineTo(cx + Math.cos(a) * rad, cx + Math.sin(a) * rad);
  }
  g.closePath();
  const sauce = g.createRadialGradient(cx, cx, 40, cx, cx, S * 0.48);
  sauce.addColorStop(0, "#a8361f");
  sauce.addColorStop(0.8, "#9e321c");
  sauce.addColorStop(1, "#93301b");
  g.fillStyle = sauce;
  g.fill();
  // sauce variation
  for (let i = 0; i < 260; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * S * 0.44;
    const x = cx + Math.cos(a) * d;
    const y = cx + Math.sin(a) * d;
    const rad = 6 + r() * 26;
    const grd = g.createRadialGradient(x, y, 0, x, y, rad);
    const dark = r() < 0.5;
    grd.addColorStop(0, dark ? "rgba(110,20,10,0.35)" : "rgba(214,80,40,0.3)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd;
    g.beginPath();
    g.arc(x, y, rad, 0, Math.PI * 2);
    g.fill();
  }
  // mozzarella: soft, irregular pools with a golden edge and a few browned spots
  const blob = (x: number, y: number, rad: number, seed: number) => {
    const n = ringNoise(seed, 3);
    const path = new Path2D();
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      const rr = rad * (1 + n(a) * 0.32);
      path.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    }
    path.closePath();
    g.save();
    g.shadowColor = "rgba(233,180,90,0.9)";
    g.shadowBlur = rad * 0.35;
    const grd = g.createRadialGradient(x - rad * 0.2, y - rad * 0.2, rad * 0.1, x, y, rad * 1.2);
    grd.addColorStop(0, "#fffaf0");
    grd.addColorStop(0.65, "#f7ecd4");
    grd.addColorStop(1, "#ecd29b");
    g.fillStyle = grd;
    g.fill(path);
    g.restore();
    h.save();
    h.filter = `blur(${Math.round(rad * 0.18)}px)`;
    h.fillStyle = "#d8d8d8";
    h.fill(path);
    h.restore();
    for (let k = 0; k < 3; k++) {
      const bx = x + (r() - 0.5) * rad;
      const by = y + (r() - 0.5) * rad;
      const br = rad * (0.08 + r() * 0.12);
      const bg = g.createRadialGradient(bx, by, 0, bx, by, br);
      bg.addColorStop(0, "rgba(176,110,40,0.55)");
      bg.addColorStop(1, "rgba(176,110,40,0)");
      g.fillStyle = bg;
      g.beginPath();
      g.arc(bx, by, br, 0, Math.PI * 2);
      g.fill();
    }
  };
  for (let i = 0; i < 24; i++) {
    const a = r() * Math.PI * 2;
    const d = (0.05 + Math.sqrt(r()) * 0.86) * S * 0.41;
    blob(cx + Math.cos(a) * d, cx + Math.sin(a) * d, S * (0.045 + r() * 0.05), 100 + i);
  }
  // olive oil glints and oregano
  for (let i = 0; i < 120; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * S * 0.45;
    g.fillStyle = r() < 0.6 ? `rgba(240,160,40,${0.25 + r() * 0.3})` : `rgba(40,60,20,${0.5 + r() * 0.4})`;
    g.beginPath();
    g.ellipse(cx + Math.cos(a) * d, cx + Math.sin(a) * d, 1.5 + r() * 3, 1 + r() * 2, r() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  return { map: tex(c), bump: tex(b, false) };
}

/** The crust: golden dough with darker blisters ("leopard spots") on its top and outer side. Around the tube v = φ/2π
 *  (0 = outer equator, 0.25 = top, 0.5 = inner side, 0.75 = underneath) and, with flipY, canvas row y = (1 − v) · 256:
 *  the baked top and outside are rows 150–256 and 0–24; the inside and underside stay paler. */
function crustTexture() {
  const [c, g] = canvas(2048, 256);
  const r = rng(29);
  const grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, "#c58b47"); // outer side
  grd.addColorStop(0.25, "#e4bd80"); // underneath
  grd.addColorStop(0.5, "#e9c387"); // inner side, facing the sauce
  grd.addColorStop(0.72, "#d69e57");
  grd.addColorStop(0.8, "#cd8f45"); // top: the most baked
  grd.addColorStop(1, "#c58b47");
  g.fillStyle = grd;
  g.fillRect(0, 0, 2048, 256);
  const spot = (x: number, y: number, rad: number, alpha: number) => {
    const sp = g.createRadialGradient(x, y, 0, x, y, rad);
    sp.addColorStop(0, `rgba(${55 + r() * 30},${28 + r() * 18},${12 + r() * 10},${alpha})`);
    sp.addColorStop(1, "rgba(80,40,15,0)");
    g.fillStyle = sp;
    g.beginPath();
    g.arc(x, y, rad, 0, Math.PI * 2);
    g.fill();
  };
  for (let i = 0; i < 1100; i++) {
    const y = r() < 0.85 ? 150 + r() * 106 : r() * 24;
    spot(r() * 2048, y, 2 + r() * (r() < 0.1 ? 16 : 6), 0.45 + r() * 0.45);
  }
  // a few faint marks on the inner side
  for (let i = 0; i < 160; i++) spot(r() * 2048, 70 + r() * 70, 1.5 + r() * 3, 0.2 + r() * 0.2);
  // flour on the underside
  for (let i = 0; i < 500; i++) {
    g.fillStyle = `rgba(250,240,220,${r() * 0.35})`;
    g.fillRect(r() * 2048, 30 + r() * 60, 2, 2);
  }
  const t = tex(c);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

/** The cut face of a cherry tomato. */
function tomatoFace() {
  const [c, g] = canvas(256, 256);
  g.fillStyle = "#c63a22";
  g.beginPath();
  g.arc(128, 128, 126, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#e0654a";
  g.beginPath();
  g.arc(128, 128, 104, 0, Math.PI * 2);
  g.fill();
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2 + 0.4;
    g.save();
    g.translate(128 + Math.cos(a) * 52, 128 + Math.sin(a) * 52);
    g.rotate(a);
    g.fillStyle = "#f1a27a";
    g.beginPath();
    g.ellipse(0, 0, 36, 26, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#f7dca6";
    for (let s = 0; s < 4; s++) {
      g.beginPath();
      g.ellipse(-16 + s * 11, 0, 4, 6, 0.4, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();
  }
  g.fillStyle = "#f6cfa1";
  g.beginPath();
  g.arc(128, 128, 18, 0, Math.PI * 2);
  g.fill();
  return tex(c);
}

/** The plate's glaze: white, an olive line where the rim begins, and the Giardino logo printed twice on the rim.
 *  LatheGeometry gives every profile point the same share of v (canvas top = last point, flipY), so the rim slope
 *  between profile points 2 and 4 is the band v 1/6–1/3, i.e. canvas rows 341–427. That band is ~260 px per scene
 *  unit tall but ~370 px per unit around the circumference, so the logo is drawn 0.36 × its width tall to keep its
 *  true proportions on the plate. */
function plateTexture(logo: HTMLImageElement | null) {
  const [c, g] = canvas(4096, 512);
  g.fillStyle = "#f7f4ec";
  g.fillRect(0, 0, 4096, 512);
  g.fillStyle = "#6e6140";
  g.fillRect(0, 425, 4096, 6);
  g.fillStyle = "#a9ad81";
  g.fillRect(0, 298, 4096, 3);
  if (logo) {
    const w = 210;
    const hgt = w * 0.36 * (logo.height / logo.width) / 0.51;
    for (const u of [0.25, 0.75]) g.drawImage(logo, u * 4096 - w / 2, 384 - hgt / 2, w, hgt);
  }
  const t = tex(c);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

// ------------------------------------------------------------------ geometry
/** The puffy rim: a torus around the pizza whose thickness and height vary around the circle. */
function crustGeometry(R: number, tube: number, seed: number) {
  const nA = ringNoise(seed, 5);
  const nB = ringNoise(seed + 7, 4);
  const seg = 180;
  const ring = 28;
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= seg; i++) {
    const t = (i / seg) * Math.PI * 2;
    const puff = 1 + nA(t) * 0.22;
    const rc = R + nB(t) * 0.025;
    for (let j = 0; j <= ring; j++) {
      const p = (j / ring) * Math.PI * 2;
      const rx = tube * 1.15 * puff;
      const ry = tube * 1.05 * puff;
      const d = rc + Math.cos(p) * rx;
      let y = Math.sin(p) * ry + ry * 0.5;
      y = Math.max(y, 0.004); // flat underneath
      pos.push(Math.cos(t) * d, y, Math.sin(t) * d);
      uv.push(i / seg, j / ring);
    }
  }
  for (let i = 0; i < seg; i++)
    for (let j = 0; j < ring; j++) {
      const a = i * (ring + 1) + j;
      const b = (i + 1) * (ring + 1) + j;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/** A rocket leaf: long, with rounded alternating lobes, lying almost flat and slightly cupped. Base at the origin,
 *  pointing along +X in the XZ plane. */
function leafGeometry(len: number, width: number, lobes: number, seed: number) {
  const r = rng(seed);
  const side = (sign: number) => {
    const pts: [number, number][] = [];
    for (let i = 1; i <= lobes * 2; i++) {
      const t = i / (lobes * 2 + 1);
      const env = Math.sin(Math.PI * Math.pow(t, 0.8)) * width;
      const out = i % 2 === 1;
      pts.push([t * len, sign * env * (out ? 0.95 + r() * 0.2 : 0.45 + r() * 0.12)]);
    }
    return pts;
  };
  const left = side(1);
  const right = side(-1).reverse();
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  // rounded lobes: curve through each outer point, using the inner points as anchors
  const path = [...left, [len, 0] as [number, number], ...right, [0, 0] as [number, number]];
  for (let i = 0; i < path.length; i++) {
    const [x, y] = path[i];
    const [px, py] = i ? path[i - 1] : [0, 0];
    s.quadraticCurveTo(px + (x - px) * 0.15, py + (y - py) * 0.85, x, y);
  }
  const geo = new THREE.ShapeGeometry(s, 4);
  geo.rotateX(-Math.PI / 2);
  const p = geo.attributes.position as THREE.BufferAttribute;
  const curl = 0.25 + r() * 0.3;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    p.setY(i, curl * x * x * 0.22 + z * z * 1.6 * curl);
  }
  geo.computeVertexNormals();
  return geo;
}

// ------------------------------------------------------------------ the scene
export function createPizza(canvasEl: HTMLCanvasElement, options: Options): PizzaEngine {
  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true, powerPreference: "low-power", preserveDrawingBuffer: !!options.poster });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envTex = pmrem.fromScene(room, 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.55;
  room.traverse((o) => {
    const mesh = o as THREE.Mesh;
    mesh.geometry?.dispose();
    (mesh.material as THREE.Material | undefined)?.dispose?.();
  });
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  const ELEV = THREE.MathUtils.degToRad(options.poster ? 89 : 36);

  const key = new THREE.DirectionalLight(0xfff0dc, 2.3);
  key.position.set(-3, 6, 3.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -2.6;
  key.shadow.camera.right = 2.6;
  key.shadow.camera.top = 2.6;
  key.shadow.camera.bottom = -2.6;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 16;
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.02;
  scene.add(key, new THREE.HemisphereLight(0xfff6e8, 0x3a3020, 0.7));
  const rim = new THREE.DirectionalLight(0xffd59a, 0.9);
  rim.position.set(4, 2, -4);
  scene.add(rim);

  const tilt = new THREE.Group();
  const dish = new THREE.Group();
  tilt.add(dish);
  scene.add(tilt);
  const disposables: { dispose: () => void }[] = [];
  const keep = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  // the plate: a lathe profile, glazed
  const profile = [
    [0, 0.0],
    [1.62, 0.0],
    [1.74, 0.012],
    [1.86, 0.055],
    [1.98, 0.105],
    [2.06, 0.125],
    [2.1, 0.118],
    [2.09, 0.096],
    [2.0, 0.07],
    [1.8, 0.025],
    [1.4, -0.02],
    [1.3, -0.045],
    [0.0, -0.045],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const plateGeo = keep(new THREE.LatheGeometry(profile, 128));
  const plateMat = keep(new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.12 }));
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.receiveShadow = true;
  dish.add(plate);
  const logoImg = new Image();
  logoImg.decoding = "async";
  logoImg.onload = () => {
    plateMat.map = keep(plateTexture(logoImg));
    plateMat.needsUpdate = true;
    wake();
  };
  logoImg.src = options.logo;
  plateMat.map = keep(plateTexture(null));

  // contact shadow under the plate
  const [sc, sg] = canvas(256, 256);
  const sgrd = sg.createRadialGradient(128, 128, 30, 128, 128, 128);
  sgrd.addColorStop(0, "rgba(0,0,0,0.55)");
  sgrd.addColorStop(0.6, "rgba(0,0,0,0.22)");
  sgrd.addColorStop(1, "rgba(0,0,0,0)");
  sg.fillStyle = sgrd;
  sg.fillRect(0, 0, 256, 256);
  const shadowTex = keep(tex(sc, false));
  const shadowGeo = keep(new THREE.PlaneGeometry(5.2, 5.2));
  const shadowMat = keep(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  const contact = new THREE.Mesh(shadowGeo, shadowMat);
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = -0.05;
  scene.add(contact);

  // the pizza
  const R = 1.5;
  const pizza = new THREE.Group();
  pizza.position.y = 0.004;
  dish.add(pizza);
  const doughMat = keep(new THREE.MeshStandardMaterial({ color: 0xe0b170, roughness: 0.85 }));
  const bodyGeo = keep(new THREE.CylinderGeometry(R + 0.06, R + 0.03, 0.05, 128));
  const body = new THREE.Mesh(bodyGeo, doughMat);
  body.position.y = 0.025;
  body.castShadow = true;
  pizza.add(body);
  const { map: topMap, bump: topBump } = topTextures();
  keep(topMap);
  keep(topBump);
  const topGeo = keep(new THREE.CircleGeometry(R + 0.02, 160, 0, Math.PI * 2));
  topGeo.rotateX(-Math.PI / 2);
  const topMat = keep(new THREE.MeshStandardMaterial({ map: topMap, bumpMap: topBump, bumpScale: 2.2, roughness: 0.55, metalness: 0 }));
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = 0.052;
  top.receiveShadow = true;
  pizza.add(top);
  const crustMap = keep(crustTexture());
  const crustGeo = keep(crustGeometry(R + 0.02, 0.13, 5));
  const crustMat = keep(new THREE.MeshStandardMaterial({ map: crustMap, roughness: 0.78 }));
  const crust = new THREE.Mesh(crustGeo, crustMat);
  crust.position.y = 0.02;
  crust.castShadow = true;
  crust.receiveShadow = true;
  pizza.add(crust);

  // cherry tomatoes: halves, some with the glossy skin up, some showing the cut
  const r = rng(73);
  const skin = keep(new THREE.MeshPhysicalMaterial({ color: 0xc8301b, roughness: 0.26, clearcoat: 0.7, clearcoatRoughness: 0.18 }));
  const faceMat = keep(new THREE.MeshStandardMaterial({ map: keep(tomatoFace()), roughness: 0.42 }));
  const domeGeo = keep(new THREE.SphereGeometry(0.13, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2));
  const faceGeo = keep(new THREE.CircleGeometry(0.13, 28));
  const tomatoes: THREE.Group[] = [];
  const tomatoMeshes: THREE.Mesh[] = [];
  for (let i = 0; i < 11; i++) {
    const g = new THREE.Group();
    const dome = new THREE.Mesh(domeGeo, skin);
    dome.scale.y = 0.75;
    dome.castShadow = true;
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.rotation.x = Math.PI / 2; // faces down under the dome
    g.add(dome, face);
    const cutUp = i % 2 === 0;
    if (cutUp) g.rotation.x = Math.PI; // show the cut face
    const a = (i / 11) * Math.PI * 2 + r() * 0.4;
    const d = 0.5 + r() * 0.72;
    g.position.set(Math.cos(a) * d, cutUp ? 0.085 : 0.058, Math.sin(a) * d);
    g.rotation.y = r() * Math.PI * 2;
    g.userData = { baseY: g.position.y, lift: 0, liftTarget: 0 };
    pizza.add(g);
    tomatoes.push(g);
    tomatoMeshes.push(dome, face);
    dome.userData.tomato = g;
    face.userData.tomato = g;
  }

  // rocket: three leaf shapes, instanced, heaped in the middle
  const leafMat = keep(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.48, side: THREE.DoubleSide }));
  const leafColor = new THREE.Color();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const COUNT = 17;
  for (let k = 0; k < 3; k++) {
    const geo = keep(leafGeometry(0.5 + k * 0.07, 0.085 + k * 0.012, 3 + k, 200 + k));
    const inst = new THREE.InstancedMesh(geo, leafMat, COUNT);
    inst.castShadow = true;
    inst.receiveShadow = true;
    for (let i = 0; i < COUNT; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.pow(r(), 0.7) * 0.95;
      const heap = 0.07 + (1 - d / 0.95) * 0.1 * r() + r() * 0.025;
      e.set((r() - 0.5) * 0.36, r() * Math.PI * 2, (r() - 0.5) * 0.3);
      q.setFromEuler(e);
      const s = 0.8 + r() * 0.45;
      m.compose(new THREE.Vector3(Math.cos(a) * d, heap, Math.sin(a) * d), q, new THREE.Vector3(s, s, s));
      inst.setMatrixAt(i, m);
      leafColor.setHSL(0.25 + r() * 0.035, 0.42 + r() * 0.16, 0.17 + r() * 0.09, THREE.SRGBColorSpace);
      inst.setColorAt(i, leafColor);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    pizza.add(inst);
  }

  // ------------------------------------------------------------------ framing
  const resize = () => {
    const { width, height } = canvasEl.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const dist = Math.max(2.25 / (t * camera.aspect), (options.poster ? 2.25 : 1.6) / t) * 1.04;
    camera.position.set(0, Math.sin(ELEV) * dist, Math.cos(ELEV) * dist);
    camera.lookAt(0, options.poster ? 0 : 0.12, 0);
    camera.updateProjectionMatrix();
    draw();
  };

  // ------------------------------------------------------------------ motion
  let angle = options.poster ? 0 : -0.5;
  let velocity = options.autoSpin ? 2.6 : 0;
  let tiltX = 0;
  let tiltZ = 0;
  let tiltXT = 0;
  let tiltZT = 0;
  let dragging = false;
  let lastX = 0;
  let lastT = 0;
  let first = true;
  let settled = false;

  function draw() {
    dish.rotation.y = angle;
    tilt.rotation.x = tiltX;
    tilt.rotation.z = tiltZ;
    renderer.render(scene, camera);
    if (first) {
      first = false;
      options.onFirstFrame();
    }
  }

  const timer = new THREE.Timer();
  timer.connect(document);
  function frame() {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    if (!dragging) {
      velocity *= Math.exp(-dt * 1.5); // friction
      angle += velocity * dt;
    }
    const k = Math.min(1, dt * 7);
    tiltX += (tiltXT - tiltX) * k;
    tiltZ += (tiltZT - tiltZ) * k;
    let lifting = false;
    for (const t of tomatoes) {
      const u = t.userData as { baseY: number; lift: number; liftTarget: number };
      u.lift += (u.liftTarget - u.lift) * Math.min(1, dt * 12);
      t.position.y = u.baseY + u.lift;
      if (Math.abs(u.liftTarget - u.lift) > 0.0005) lifting = true;
    }
    draw();
    settled = !dragging && !lifting && Math.abs(velocity) < 0.003 && Math.abs(tiltXT - tiltX) < 0.0005 && Math.abs(tiltZT - tiltZ) < 0.0005;
    if (settled) sync();
  }

  let running = false;
  let onScreen = false;
  function sync() {
    const should = onScreen && document.visibilityState === "visible" && !settled;
    if (should !== running) {
      running = should;
      if (should) timer.reset();
      renderer.setAnimationLoop(should ? frame : null);
    }
  }
  function wake() {
    settled = false;
    sync();
    if (!running) draw(); // off screen: keep the still up to date for when it comes back
  }

  const io = new IntersectionObserver(([en]) => {
    onScreen = en.isIntersecting;
    sync();
  });
  io.observe(canvasEl);
  const ro = new ResizeObserver(resize);
  ro.observe(canvasEl);

  // ------------------------------------------------------------------ input
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered: THREE.Group | null = null;
  const setHover = (g: THREE.Group | null) => {
    if (g === hovered) return;
    if (hovered) hovered.userData.liftTarget = 0;
    hovered = g;
    if (hovered) hovered.userData.liftTarget = 0.06;
    wake();
  };
  const onDown = (ev: PointerEvent) => {
    dragging = true;
    canvasEl.setPointerCapture(ev.pointerId);
    lastX = ev.clientX;
    lastT = performance.now();
    velocity = 0;
    setHover(null);
    wake();
  };
  const onMove = (ev: PointerEvent) => {
    const rect = canvasEl.getBoundingClientRect();
    if (ev.pointerType === "mouse") {
      // subtle tilt towards the pointer
      const nx = (ev.clientX - rect.left) / rect.width - 0.5;
      const ny = (ev.clientY - rect.top) / rect.height - 0.5;
      tiltZT = -nx * 0.12;
      tiltXT = ny * 0.1;
      if (!dragging) {
        pointer.set(nx * 2, -ny * 2);
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(tomatoMeshes, false)[0];
        setHover((hit?.object.userData.tomato as THREE.Group | undefined) ?? null);
      }
      wake();
    }
    if (!dragging) return;
    const now = performance.now();
    const d = ((ev.clientX - lastX) / rect.width) * Math.PI * 1.6;
    angle += d;
    velocity = d / Math.max(0.008, (now - lastT) / 1000);
    lastX = ev.clientX;
    lastT = now;
    wake();
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    velocity = THREE.MathUtils.clamp(velocity, -16, 16);
    wake();
  };
  const onLeave = () => {
    tiltXT = 0;
    tiltZT = 0;
    setHover(null);
    wake();
  };
  canvasEl.addEventListener("pointerdown", onDown);
  canvasEl.addEventListener("pointermove", onMove);
  canvasEl.addEventListener("pointerup", onUp);
  canvasEl.addEventListener("pointercancel", onUp);
  canvasEl.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", sync);
  resize();

  return {
    nudge(direction: number) {
      velocity += direction * 5.5;
      wake();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvasEl.removeEventListener("pointerdown", onDown);
      canvasEl.removeEventListener("pointermove", onMove);
      canvasEl.removeEventListener("pointerup", onUp);
      canvasEl.removeEventListener("pointercancel", onUp);
      canvasEl.removeEventListener("pointerleave", onLeave);
      timer.dispose();
      scene.traverse((o) => {
        if ((o as THREE.InstancedMesh).isInstancedMesh) (o as THREE.InstancedMesh).dispose();
      });
      for (const d of disposables) d.dispose();
      envTex.dispose();
      renderer.dispose();
    },
  };
}
