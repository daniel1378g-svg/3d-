// The hero: lunch under an olive tree. A procedural tree (no model to license) with a gnarled trunk, three
// levels of branches and instanced olive leaves that are dark on top and silver underneath. Leaves sway on
// their own phase; gusts (the pointer, the Wind button, now and then the breeze) send a wave through the
// canopy that flips them round their midrib, so a silver ripple runs through the tree. The sun stands where
// it really stands over Winterthur, and the leaves' shadows (a depth material with the same sway) fall on
// the linen tablecloth. Tap an olive and it drops, bounces and rolls away.
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { sunAt, type Phase } from "./sun";

type Options = { mobile: boolean; date: Date; onReady: () => void; onOlive?: () => void; onGust?: (strength: number) => void };

const TABLE_Y = 0.75;
const GUSTS = 4;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A tube whose radius narrows from r0 to r1 and, on the trunk, bulges in lobes like old olive wood. */
function taperedTube(curve: THREE.Curve<THREE.Vector3>, r0: number, r1: number, gnarl: number, seed: number, tubular = 12, radial = 9) {
  const frames = curve.computeFrenetFrames(tubular, false);
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const p = new THREE.Vector3();
  for (let i = 0; i <= tubular; i++) {
    const t = i / tubular;
    curve.getPointAt(t, p);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const lobe = 1 + gnarl * (0.55 * Math.sin(a * 3 + t * 9 + seed) + 0.35 * Math.sin(a * 5 - t * 13 + seed * 2.1));
      const r = (r0 + (r1 - r0) * Math.pow(t, 0.8)) * lobe;
      pos.push(p.x + r * (Math.cos(a) * N.x + Math.sin(a) * B.x), p.y + r * (Math.cos(a) * N.y + Math.sin(a) * B.y), p.z + r * (Math.cos(a) * N.z + Math.sin(a) * B.z));
      uv.push(j / radial, t * curve.getLength() * 0.8);
    }
  }
  for (let i = 0; i < tubular; i++)
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j;
      const b = (i + 1) * (radial + 1) + j;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** A lanceolate olive leaf along +x (the midrib), folded slightly into a V and curving down at the tip. */
function leafGeometry(L: number, W: number) {
  const seg = 7;
  const pos: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= seg; i++) {
    const x = (i / seg) * L;
    const t = i / seg;
    const half = (W / 2) * Math.sin(Math.PI * Math.pow(t, 0.75)) * (1 - 0.15 * t);
    const droop = -0.12 * L * t * t;
    pos.push(x, -half, droop + half * 0.32, x, 0, droop, x, half, droop + half * 0.32);
  }
  for (let i = 0; i < seg; i++) {
    const a = i * 3;
    const b = (i + 1) * 3;
    idx.push(a, b, a + 1, b, b + 1, a + 1, a + 1, b + 1, a + 2, b + 1, b + 2, a + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function canvasTexture(w: number, h: number, paint: (ctx: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  paint(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

// The sway and flip shared by the leaves' colour material and their shadow (depth) material.
const LEAF_COMMON = /* glsl */ `
uniform float uTime;
uniform vec4 uGusts[${GUSTS}];
uniform float uGustStr[${GUSTS}];
attribute float aPhase;
float leafTheta(vec3 wp) {
  float sway = 0.2 * sin(uTime * 1.6 + aPhase * 6.2831) + 0.13 * sin(uTime * 0.55 + wp.x * 0.6 + wp.z * 0.4);
  float flip = 0.0;
  for (int i = 0; i < ${GUSTS}; i++) {
    float age = uTime - uGusts[i].w;
    if (age < 0.0 || age > 3.5) continue;
    float d = length(wp - uGusts[i].xyz);
    float x = (age * 3.4 - d) / 0.85;
    float wave = exp(-x * x) + (x > 0.0 ? -0.3 * sin(x * 2.4) * exp(-x * 0.9) : 0.0);
    flip += uGustStr[i] * wave * exp(-age * 0.55);
  }
  return sway + clamp(flip, -0.5, 1.0) * 2.8;
}
`;
const LEAF_ROTATE = /* glsl */ `
transformed = vec3(transformed.x, lc * transformed.y - ls * transformed.z, ls * transformed.y + lc * transformed.z);
vec3 swayW = vec3(sin(uTime * 0.9 + leafBase.y * 0.5 + leafBase.x * 0.2), 0.0, cos(uTime * 0.7 + leafBase.x * 0.4)) * 0.03 * max(0.0, leafBase.y - 2.2);
transformed += transpose(mat3(instanceMatrix)) * swayW / dot(instanceMatrix[0].xyz, instanceMatrix[0].xyz);
`;
const LEAF_THETA = /* glsl */ `
vec3 leafBase = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
float leafAngle = leafTheta(leafBase);
float lc = cos(leafAngle), ls = sin(leafAngle);
`;

export type HeroScene = {
  phase: Phase;
  start(): void;
  stop(): void;
  renderOnce(): void;
  resize(): void;
  gustAt(clientX: number, clientY: number, strength: number): void;
  windButton(): void;
  tap(clientX: number, clientY: number): boolean;
  look(nx: number, ny: number): void;
  dispose(): void;
};

export function createHero(canvas: HTMLCanvasElement, opts: Options): HeroScene {
  const rnd = mulberry32(1989);
  const { mobile } = opts;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 160);
  const sun = sunAt(opts.date);
  const phase = sun.phase;

  // ---------------------------------------------------------------- light and sky
  const PALETTE = {
    day: { zenith: "#93b8db", horizon: "#f1e8d6", sun: "#fff2dd", sunI: 2.5, sky: "#dde8f1", ground: "#cdb995", hemiI: 0.85, exposure: 0.95 },
    golden: { zenith: "#6f8fbd", horizon: "#f5bf86", sun: "#ffb46b", sunI: 4.2, sky: "#f0cfae", ground: "#a7896a", hemiI: 0.6, exposure: 1.05 },
    night: { zenith: "#0a1120", horizon: "#25304a", sun: "#000000", sunI: 0, sky: "#2a3550", ground: "#3b2a20", hemiI: 0.42, exposure: 1.15 },
  }[phase];
  renderer.toneMappingExposure = PALETTE.exposure;
  const sunDir = new THREE.Vector3(...sun.dir).normalize();
  if (phase === "golden" && sunDir.y < 0.16) {
    // Late light: keep it low, but high enough to throw long streaks across the cloth.
    sunDir.y = 0.16;
    sunDir.normalize();
  }

  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uZenith: { value: new THREE.Color(PALETTE.zenith) },
      uHorizon: { value: new THREE.Color(PALETTE.horizon) },
      uSunDir: { value: sunDir },
      uSunColor: { value: new THREE.Color(PALETTE.sun) },
      uSun: { value: phase === "night" ? 0 : 1 },
    },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 uZenith, uHorizon, uSunColor, uSunDir; uniform float uSun; varying vec3 vDir;
      void main(){
        float h = clamp(vDir.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.55));
        float s = max(dot(normalize(vDir), uSunDir), 0.0);
        col += uSunColor * (pow(s, 48.0) * 0.6 + pow(s, 6.0) * 0.12) * uSun;
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(90, 32, 16), skyMat);
  scene.add(sky);
  scene.fog = new THREE.Fog(new THREE.Color(PALETTE.horizon), 9, 46);

  const hemi = new THREE.HemisphereLight(PALETTE.sky, PALETTE.ground, PALETTE.hemiI);
  scene.add(hemi);
  const sunLight = new THREE.DirectionalLight(PALETTE.sun, PALETTE.sunI);
  const target = new THREE.Vector3(0.4, TABLE_Y, 0.5);
  sunLight.position.copy(target).addScaledVector(sunDir, 22);
  sunLight.target.position.copy(target);
  sunLight.castShadow = phase !== "night";
  sunLight.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  const sc = sunLight.shadow.camera;
  sc.left = -10;
  sc.right = 10;
  sc.top = 10;
  sc.bottom = -10;
  sc.near = 2;
  sc.far = 60;
  sunLight.shadow.bias = -0.0004;
  sunLight.shadow.normalBias = 0.03;
  scene.add(sunLight, sunLight.target);
  if (phase === "night") {
    // A lantern hangs from a branch over the table; a second, low warm light picks out the canopy.
    const lantern = new THREE.SpotLight("#ffbf80", 46, 14, 1.0, 0.9, 1.3);
    lantern.position.set(-0.4, 2.45, 1.4);
    lantern.target.position.set(0, TABLE_Y, 1.6);
    lantern.castShadow = true;
    lantern.shadow.mapSize.set(1024, 1024);
    lantern.shadow.bias = -0.0006;
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshBasicMaterial({ color: "#ffd9a8" }));
    bulb.position.copy(lantern.position);
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6), new THREE.MeshBasicMaterial({ color: "#1a1410" }));
    cord.position.set(-0.4, 2.78, 1.4);
    const up = new THREE.SpotLight("#ffa65c", 18, 20, 0.8, 0.8, 1.4);
    up.position.set(-4.5, 1.4, 3.6);
    up.target.position.set(0.6, 3.0, 0);
    scene.add(lantern, lantern.target, bulb, cord, up, up.target);
  }

  // ---------------------------------------------------------------- table and terrace
  const weave = canvasTexture(256, 256, (ctx) => {
    ctx.fillStyle = "#f3ede1";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 256; i += 2) {
      ctx.fillStyle = `rgba(120,100,80,${0.025 + rnd() * 0.035})`;
      ctx.fillRect(0, i, 256, 1);
      ctx.fillStyle = `rgba(120,100,80,${0.02 + rnd() * 0.03})`;
      ctx.fillRect(i, 0, 1, 256);
    }
  });
  weave.repeat.set(3.2, 11.5);
  const TABLE_W = 3.2;
  const TABLE_Z0 = -3.6;
  const TABLE_Z1 = 8.5;
  const cloth = new THREE.Mesh(
    new THREE.PlaneGeometry(TABLE_W, TABLE_Z1 - TABLE_Z0),
    new THREE.MeshStandardMaterial({ color: "#f6f1e7", map: weave, roughness: 0.96, metalness: 0, emissive: phase === "night" ? new THREE.Color("#4a3220") : new THREE.Color("#000000"), emissiveIntensity: phase === "night" ? 0.35 : 0 }),
  );
  cloth.rotation.x = -Math.PI / 2;
  cloth.position.set(0, TABLE_Y, (TABLE_Z0 + TABLE_Z1) / 2);
  cloth.receiveShadow = true;
  scene.add(cloth);
  // The cloth hangs down the sides and the far end, a hand's width short of the paving.
  const drapeMat = new THREE.MeshStandardMaterial({ color: "#ece4d4", map: weave, roughness: 1, side: THREE.DoubleSide });
  const hang = TABLE_Y - 0.22;
  for (const side of [-1, 1]) {
    const d = new THREE.Mesh(new THREE.PlaneGeometry(TABLE_Z1 - TABLE_Z0, hang), drapeMat);
    d.rotation.y = Math.PI / 2;
    d.position.set((side * TABLE_W) / 2, TABLE_Y - hang / 2, (TABLE_Z0 + TABLE_Z1) / 2);
    d.receiveShadow = true;
    scene.add(d);
  }
  const endDrape = new THREE.Mesh(new THREE.PlaneGeometry(TABLE_W, hang), drapeMat);
  endDrape.position.set(0, TABLE_Y - hang / 2, TABLE_Z0);
  endDrape.receiveShadow = true;
  scene.add(endDrape);
  // Warm stone paving around the table.
  const paving = canvasTexture(512, 512, (ctx) => {
    ctx.fillStyle = "#b3a58c";
    ctx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 64) {
      const off = (y / 64) % 2 ? 48 : 0;
      for (let x = -off; x < 512; x += 96 + Math.floor(rnd() * 3) * 16) {
        ctx.fillStyle = `hsl(${30 + rnd() * 8}, ${14 + rnd() * 8}%, ${70 + rnd() * 7}%)`;
        ctx.fillRect(x + 2, y + 2, 92, 60);
      }
    }
  });
  paving.repeat.set(26, 26);
  const terrace = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 160),
    new THREE.MeshStandardMaterial({ color: phase === "night" ? "#7a7068" : "#ffffff", map: paving, roughness: 0.95 }),
  );
  terrace.rotation.x = -Math.PI / 2;
  terrace.position.set(0, 0, -30);
  terrace.receiveShadow = true;
  scene.add(terrace);
  // White plates down the table, catching the dappled light.
  const plateGeo = new THREE.LatheGeometry(
    [[0, 0], [0.085, 0], [0.1, 0.004], [0.112, 0.012], [0.13, 0.016], [0.142, 0.02], [0.145, 0.018], [0.133, 0.013], [0.11, 0.009], [0.09, 0.006], [0, 0.006]].map(([x, y]) => new THREE.Vector2(x, y)),
    40,
  );
  const plateMat = new THREE.MeshStandardMaterial({ color: "#fbfaf6", roughness: 0.18, metalness: 0 });
  for (const [x, z] of [[0.82, 3.3], [-0.82, 3.3], [0.82, 1.0], [-0.82, 1.0], [0.82, -1.3], [-0.82, -1.3]]) {
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.scale.setScalar(1.55);
    plate.position.set(x, TABLE_Y + 0.001, z);
    plate.castShadow = true;
    plate.receiveShadow = true;
    scene.add(plate);
  }

  // ---------------------------------------------------------------- the tree
  const canopyC = new THREE.Vector3(0.0, 3.05, 0.4);
  const canopyR = new THREE.Vector3(5.8, 0.85, 3.0);
  const inCanopy = () => {
    for (;;) {
      const v = new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1);
      if (v.lengthSq() <= 1) return v.multiply(canopyR).add(canopyC);
    }
  };
  const attract = Array.from({ length: 70 }, inCanopy);
  const woods: THREE.BufferGeometry[] = [];
  const tips: { p: THREE.Vector3; r: number }[] = [];
  let seed = 0;
  function grow(start: THREE.Vector3, dir: THREE.Vector3, length: number, radius: number, depth: number, gnarl: number) {
    const goal = attract[Math.floor(rnd() * attract.length)];
    const pts = [start.clone()];
    const d = dir.clone().normalize();
    const p = start.clone();
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      const pull = goal.clone().sub(p).normalize().multiplyScalar(depth >= 3 ? 0.18 : 0.42);
      d.add(new THREE.Vector3((rnd() - 0.5) * 0.55, (rnd() - 0.5) * 0.3, (rnd() - 0.5) * 0.55)).add(pull).normalize();
      p.addScaledVector(d, length / steps);
      pts.push(p.clone());
    }
    const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
    const r1 = radius * 0.6;
    woods.push(taperedTube(curve, radius, r1, gnarl, seed++, depth >= 3 ? 14 : 8, depth >= 3 ? 12 : 6));
    if (depth === 0) {
      tips.push({ p: p.clone(), r: 0.55 });
      return;
    }
    const kids = depth >= 3 ? 3 : 2 + (rnd() < 0.55 ? 1 : 0);
    for (let k = 0; k < kids; k++) {
      const t = k === 0 ? 1 : 0.45 + rnd() * 0.5;
      const at = curve.getPointAt(t);
      const nd = d.clone().add(new THREE.Vector3((rnd() - 0.5) * 1.5, 0.25 + rnd() * 0.45, (rnd() - 0.5) * 1.5)).normalize();
      grow(at, nd, length * (0.68 + rnd() * 0.12), r1 * (0.75 + rnd() * 0.2), depth - 1, gnarl * 0.35);
    }
    if (depth <= 2) tips.push({ p: curve.getPointAt(0.7), r: 0.42 });
  }
  // The trunk leans in from the right, behind the table, twisting as old olive trunks do.
  const trunkBase = new THREE.Vector3(3.9, -0.1, -4.4);
  const trunkCurve = new THREE.CatmullRomCurve3([trunkBase, new THREE.Vector3(3.7, 0.9, -3.9), new THREE.Vector3(3.1, 1.8, -3.0), new THREE.Vector3(2.5, 2.55, -2.0)], false, "centripetal");
  woods.push(taperedTube(trunkCurve, 0.6, 0.4, 0.22, 7, 18, 16));
  const top = trunkCurve.getPointAt(1);
  grow(top, new THREE.Vector3(-1, 0.45, 0.6), 2.3, 0.33, 4, 0.12);
  grow(top, new THREE.Vector3(-0.3, 0.5, 1), 2.1, 0.3, 4, 0.1);
  grow(top, new THREE.Vector3(0.6, 0.6, 0.7), 1.7, 0.26, 3, 0.1);
  grow(trunkCurve.getPointAt(0.75), new THREE.Vector3(-1, 0.35, 0.4), 2.2, 0.24, 3, 0.1);
  for (let i = 0; i < 60; i++) tips.push({ p: inCanopy(), r: 0.5 }); // clumps on twigs hidden by leaves

  const bark = canvasTexture(256, 512, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, "#5d524a");
    g.addColorStop(0.5, "#776a5e");
    g.addColorStop(1, "#5a4f47");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 512);
    for (let i = 0; i < 900; i++) {
      const x = rnd() * 256;
      const y = rnd() * 512;
      ctx.strokeStyle = rnd() < 0.5 ? `rgba(40,32,28,${0.25 + rnd() * 0.35})` : `rgba(170,158,140,${0.15 + rnd() * 0.25})`;
      ctx.lineWidth = 0.6 + rnd() * 2.2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + (rnd() - 0.5) * 10, y + 20, x + (rnd() - 0.5) * 14, y + 40, x + (rnd() - 0.5) * 8, y + 30 + rnd() * 60);
      ctx.stroke();
    }
  });
  bark.repeat.set(1, 1);
  const woodGeo = mergeGeometries(woods)!;
  const wood = new THREE.Mesh(woodGeo, new THREE.MeshStandardMaterial({ color: "#ffffff", map: bark, roughness: 0.92, metalness: 0 }));
  wood.castShadow = true;
  wood.receiveShadow = true;
  scene.add(wood);

  // Inside every clump, a dark lumpy volume: it gives the canopy its depth and fills the shadow, so the
  // instanced leaves on the surface read as foliage rather than loose leaves.
  const vols: THREE.BufferGeometry[] = [];
  for (const tip of tips) {
    const g = new THREE.IcosahedronGeometry(tip.r * (mobile ? 0.24 : 0.3) * (1 + rnd() * 0.3), 2);
    const pa = g.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pa.count; i++) {
      const k = 0.78 + rnd() * 0.4;
      pa.setXYZ(i, pa.getX(i) * k, pa.getY(i) * k * 0.8, pa.getZ(i) * k);
    }
    g.translate(tip.p.x, tip.p.y, tip.p.z);
    g.deleteAttribute("uv");
    vols.push(g);
  }
  const volGeo = mergeGeometries(vols)!;
  volGeo.computeVertexNormals();
  const foliage = new THREE.Mesh(volGeo, new THREE.MeshStandardMaterial({ color: "#36421f", roughness: 0.95, metalness: 0 }));
  foliage.castShadow = true;
  scene.add(foliage);

  // ---------------------------------------------------------------- leaves
  const LEAVES = mobile ? 6200 : 11000;
  const L = mobile ? 0.21 : 0.17;
  const leafGeo = leafGeometry(L, L * 0.2);
  const phases = new Float32Array(LEAVES);
  const uniforms = {
    uTime: { value: 0 },
    uGusts: { value: Array.from({ length: GUSTS }, () => new THREE.Vector4(0, 0, 0, -99)) },
    uGustStr: { value: new Array(GUSTS).fill(0) as number[] },
    uTop: { value: new THREE.Color("#4c5a2c") },
    uUnder: { value: new THREE.Color("#b6bea7") },
  };
  const leafMat = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.58, metalness: 0, side: THREE.DoubleSide });
  leafMat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = LEAF_COMMON + shader.vertexShader
      .replace("#include <beginnormal_vertex>", `#include <beginnormal_vertex>\n${LEAF_THETA}\nobjectNormal = vec3(objectNormal.x, lc * objectNormal.y - ls * objectNormal.z, ls * objectNormal.y + lc * objectNormal.z);`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>\n${LEAF_ROTATE}`);
    shader.fragmentShader = "uniform vec3 uTop;\nuniform vec3 uUnder;\n" + shader.fragmentShader.replace(
      "#include <color_fragment>",
      "#include <color_fragment>\ndiffuseColor.rgb *= gl_FrontFacing ? uTop : uUnder;",
    );
  };
  const depthMat = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, side: THREE.DoubleSide });
  depthMat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = LEAF_COMMON + shader.vertexShader.replace("#include <begin_vertex>", `#include <begin_vertex>\n${LEAF_THETA}\n${LEAF_ROTATE}`);
  };
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, LEAVES);
  leaves.customDepthMaterial = depthMat;
  leaves.castShadow = true;
  leaves.receiveShadow = !mobile;
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const tint = new THREE.Color();
  const toward = new THREE.Vector3(0, 0.55, 0.9).normalize();
  for (let i = 0; i < LEAVES; i++) {
    const tip = tips[i % tips.length];
    // Clumpy foliage: most leaves near a clump's shell, some inside.
    const dir = new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize();
    const dist = tip.r * Math.pow(rnd(), 0.45);
    const pos = tip.p.clone().addScaledVector(dir, dist).add(new THREE.Vector3(0, -0.05, 0));
    // Midrib points outward-ish; the leaf's face turns mostly towards the sky and the table.
    const mid = dir.clone().add(new THREE.Vector3((rnd() - 0.5) * 1.2, 0.1 + (rnd() - 0.5) * 0.9, (rnd() - 0.5) * 1.2)).normalize();
    const face = toward.clone().add(new THREE.Vector3((rnd() - 0.5) * 1.6, (rnd() - 0.5) * 1.2, (rnd() - 0.5) * 1.6)).normalize();
    const side = new THREE.Vector3().crossVectors(face, mid).normalize();
    const normal = new THREE.Vector3().crossVectors(mid, side).normalize();
    const basis = new THREE.Matrix4().makeBasis(mid, side, normal);
    q.setFromRotationMatrix(basis);
    const sc2 = 0.75 + rnd() * 0.5;
    s.set(sc2, sc2, sc2);
    m4.compose(pos, q, s);
    leaves.setMatrixAt(i, m4);
    phases[i] = rnd();
    const b = 0.78 + rnd() * 0.5;
    tint.setRGB(b * (0.93 + rnd() * 0.12), b * (0.98 + rnd() * 0.1), b * (0.86 + rnd() * 0.14));
    leaves.setColorAt(i, tint);
  }
  leafGeo.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phases, 1));
  leaves.instanceMatrix.needsUpdate = true;
  if (leaves.instanceColor) leaves.instanceColor.needsUpdate = true;
  scene.add(leaves);

  // A few leaves have already fallen on the cloth.
  const FALLEN = mobile ? 14 : 28;
  const fallen = new THREE.InstancedMesh(leafGeometry(L, L * 0.2), new THREE.MeshStandardMaterial({ color: "#7d8556", roughness: 0.7, side: THREE.DoubleSide }), FALLEN);
  for (let i = 0; i < FALLEN; i++) {
    const pos = new THREE.Vector3((rnd() - 0.5) * (TABLE_W - 0.4), TABLE_Y + 0.004, TABLE_Z0 + 0.5 + rnd() * 9);
    q.setFromEuler(new THREE.Euler(-Math.PI / 2 + (rnd() - 0.5) * 0.2, 0, rnd() * Math.PI * 2));
    const k = 0.8 + rnd() * 0.4;
    m4.compose(pos, q, s.set(k, k, k));
    fallen.setMatrixAt(i, m4);
    fallen.setColorAt(i, tint.setRGB(0.8 + rnd() * 0.4, 0.85 + rnd() * 0.3, 0.6 + rnd() * 0.3));
  }
  fallen.receiveShadow = true;
  fallen.castShadow = true;
  scene.add(fallen);

  // ---------------------------------------------------------------- olives
  const OLIVES = mobile ? 26 : 54;
  const oliveGeo = new THREE.SphereGeometry(1, 14, 10);
  const olives = new THREE.InstancedMesh(oliveGeo, new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.28, metalness: 0 }), OLIVES);
  olives.castShadow = true;
  type Olive = { home: THREE.Vector3; pos: THREE.Vector3; vel: THREE.Vector3; rot: THREE.Euler; state: "hang" | "fall" | "roll" | "gone"; bounces: number; r: number };
  const oliveState: Olive[] = [];
  const oliveTint = [new THREE.Color("#6f7b2c"), new THREE.Color("#5b5a26"), new THREE.Color("#4a2d34"), new THREE.Color("#2c1a24")];
  for (let i = 0; i < OLIVES; i++) {
    const tip = tips[Math.floor(rnd() * tips.length)];
    const home = tip.p.clone().add(new THREE.Vector3((rnd() - 0.5) * 0.6, -tip.r * (0.55 + rnd() * 0.35), (rnd() - 0.5) * 0.6));
    const r = (mobile ? 0.055 : 0.042) * (0.85 + rnd() * 0.3);
    oliveState.push({ home, pos: home.clone(), vel: new THREE.Vector3(), rot: new THREE.Euler(rnd(), rnd(), rnd()), state: "hang", bounces: 0, r });
    olives.setColorAt(i, oliveTint[Math.floor(rnd() * oliveTint.length)]);
  }
  if (olives.instanceColor) olives.instanceColor.needsUpdate = true;
  scene.add(olives);
  const placeOlives = (t: number) => {
    oliveState.forEach((o, i) => {
      if (o.state === "hang") o.pos.copy(o.home).add(new THREE.Vector3(Math.sin(t * 1.3 + i) * 0.012, 0, Math.cos(t * 1.1 + i) * 0.012));
      const scale = o.state === "gone" ? 0 : 1;
      m4.compose(o.pos, q.setFromEuler(o.rot), s.set(o.r * scale, o.r * 1.3 * scale, o.r * scale));
      olives.setMatrixAt(i, m4);
    });
    olives.instanceMatrix.needsUpdate = true;
  };
  placeOlives(0);

  // ---------------------------------------------------------------- camera, gusts, loop
  const look = { x: 0, y: 0, tx: 0, ty: 0 };
  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Portrait screens see more height so the canopy and the cloth both stay in frame.
    camera.fov = camera.aspect < 0.8 ? 62 : camera.aspect < 1.2 ? 50 : 40;
    camera.updateProjectionMatrix();
  };
  resize();

  let gustSlot = 0;
  const clock = new THREE.Clock();
  let elapsed = 0;
  const addGust = (origin: THREE.Vector3, strength: number) => {
    uniforms.uGusts.value[gustSlot].set(origin.x, origin.y, origin.z, elapsed);
    uniforms.uGustStr.value[gustSlot] = strength;
    gustSlot = (gustSlot + 1) % GUSTS;
    opts.onGust?.(strength);
  };
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const toNdc = (clientX: number, clientY: number) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    return r;
  };
  const gustAt = (clientX: number, clientY: number, strength: number) => {
    toNdc(clientX, clientY);
    ray.setFromCamera(ndc, camera);
    const pt = new THREE.Vector3();
    ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.5), pt);
    if (!Number.isFinite(pt.x)) return;
    pt.y = Math.max(pt.y, 2.6);
    addGust(pt, strength);
  };

  const tmp = new THREE.Vector3();
  const tap = (clientX: number, clientY: number) => {
    const r = toNdc(clientX, clientY);
    let best = -1;
    let bestD = mobile ? 30 : 22;
    oliveState.forEach((o, i) => {
      if (o.state !== "hang") return;
      tmp.copy(o.pos).project(camera);
      const dx = ((tmp.x + 1) / 2) * r.width - (clientX - r.left);
      const dy = ((1 - tmp.y) / 2) * r.height - (clientY - r.top);
      const d = Math.hypot(dx, dy);
      if (d < bestD && tmp.z < 1) {
        best = i;
        bestD = d;
      }
    });
    if (best < 0) return false;
    const o = oliveState[best];
    o.state = "fall";
    o.vel.set((rnd() - 0.5) * 0.4, 0, (rnd() - 0.2) * 0.6);
    opts.onOlive?.();
    if (!running) loopOnce();
    return true;
  };

  const stepOlives = (dt: number) => {
    for (const o of oliveState) {
      if (o.state === "fall") {
        o.vel.y -= 9.8 * dt;
        o.pos.addScaledVector(o.vel, dt);
        if (o.pos.y <= TABLE_Y + o.r && o.pos.z > -4) {
          o.pos.y = TABLE_Y + o.r;
          o.bounces++;
          o.vel.y = -o.vel.y * 0.38;
          o.vel.x *= 0.8;
          if (o.bounces >= 2 || Math.abs(o.vel.y) < 0.35) {
            o.state = "roll";
            o.vel.y = 0;
            o.vel.x = (o.pos.x < 0 ? -1 : 1) * (0.7 + rnd() * 0.5);
            o.vel.z = 0.35 + rnd() * 0.3;
          }
        }
        if (o.pos.y < -2) o.state = "gone";
      } else if (o.state === "roll") {
        o.pos.addScaledVector(o.vel, dt);
        o.vel.multiplyScalar(Math.pow(0.86, dt));
        o.rot.z -= (o.vel.x / o.r) * dt;
        o.rot.x += (o.vel.z / o.r) * dt;
        if (Math.abs(o.pos.x) > 9 || o.pos.z > 9) o.state = "gone";
      }
    }
  };

  let running = false;
  let raf = 0;
  let nextBreeze = 4 + rnd() * 5;
  const frame = () => {
    const dt = Math.min(clock.getDelta(), 1 / 20);
    elapsed += dt;
    uniforms.uTime.value = elapsed;
    if (elapsed > nextBreeze) {
      // Now and then a breeze crosses the tree from the west or the east.
      const fromLeft = rnd() < 0.5;
      addGust(new THREE.Vector3(fromLeft ? -7 : 8, 3.8 + rnd(), -0.5 + rnd() * 2), 0.32 + rnd() * 0.18);
      nextBreeze = elapsed + 6 + rnd() * 7;
    }
    look.x += (look.tx - look.x) * Math.min(1, dt * 3);
    look.y += (look.ty - look.y) * Math.min(1, dt * 3);
    const breath = Math.sin(elapsed * 0.21);
    // Seated at the table: looking down the cloth, the canopy hanging into the top of the frame.
    camera.position.set(Math.sin(elapsed * 0.13) * 0.09 + look.x * 0.25, 2.05 + breath * 0.03 - look.y * 0.08, 6.6);
    const lookAt = new THREE.Vector3(look.x * 0.45, 0.9 + (camera.aspect < 0.8 ? 0.55 : 0) - look.y * 0.25, 0);
    camera.lookAt(lookAt);
    stepOlives(dt);
    placeOlives(elapsed);
    renderer.render(scene, camera);
  };
  const loop = () => {
    frame();
    raf = requestAnimationFrame(loop);
  };
  let burstUntil = 0;
  const loopOnce = (seconds = 4) => {
    // Paused, but a gust was sent or an olive tapped: play it out, then stop again.
    const already = burstUntil > performance.now();
    burstUntil = Math.max(burstUntil, performance.now() + seconds * 1000);
    if (already) return;
    clock.getDelta();
    const tick = () => {
      if (running) return;
      frame();
      if (performance.now() < burstUntil || oliveState.some((o) => o.state === "fall" || o.state === "roll")) requestAnimationFrame(tick);
      else burstUntil = 0;
    };
    requestAnimationFrame(tick);
  };

  // First frame, then tell the page the canvas can replace the poster.
  frame();
  requestAnimationFrame(() => opts.onReady());

  return {
    phase,
    start() {
      if (running) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    renderOnce: frame,
    resize() {
      resize();
      if (!running) frame();
    },
    gustAt,
    windButton() {
      addGust(new THREE.Vector3(-7.5, 4, 0.2), 1);
      if (!running) loopOnce(4);
    },
    tap,
    look(nx: number, ny: number) {
      look.tx = nx;
      look.ty = ny;
    },
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose?.();
      });
      weave.dispose();
      bark.dispose();
      renderer.dispose();
    },
  };
}
