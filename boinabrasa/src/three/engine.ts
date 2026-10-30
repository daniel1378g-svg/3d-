// The hero scene: picanha on a vertical churrasco skewer, grilled from raw, carved by a passador's knife; the slice
// peels away, falls in slow motion onto the plate, the camera circles the skewer and settles on the final shot.
//
//   phase 0  reveal     embers, the fire light comes up, the camera moves in            0.0 – 2.6 s
//   phase 1  grill      raw → grilled (shader), steam and smoke                          2.6 – 7.0 s
//   phase 2  knife      the knife comes in from the left and touches the meat            7.0 – 9.2 s
//   phase 3  cut        the edge goes down through the meat, sawing; the slice peels     9.2 – 12.2 s
//   phase 4  plate      the slice comes free and falls (slow motion)                    12.2 – 14.4 s
//   phase 5  final      the camera circles the skewer and settles; idle loop after      14.4 – 18.4 s
//
// The timeline only writes numbers into `S`; every frame turns `S` into transforms and uniforms. Seeking is
// therefore exact (dev page: ?t=11.5), and replay is a matter of resetting `S` while the cut face looks away.
import * as THREE from "three";
import { gsap } from "gsap";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { buildPiece, QUALITY_HIGH, QUALITY_LOW, type PieceInfo, type PieceSpec } from "./meatGeometry";
import { createMeatMaterial, type MeatUniforms } from "./meatMaterial";
import { createKnife, createPlate, createSkewer, BLADE_LENGTH } from "./props";
import { createBackground, createEmbers, createSmoke } from "./fx";
import { BULL_OUTLINE, BULL_W, BULL_H } from "@/brand/bull";

export const PHASE_STARTS = [0, 2.6, 7.0, 9.2, 12.2, 14.4];
export const SEQUENCE_END = 18.4;

export type EngineOptions = {
  canvas: HTMLCanvasElement;
  quality: "high" | "low";
  /** start at the final shot (returning visitor, reduced motion) */
  startAtEnd?: boolean;
  /** no automatic motion at all: renders on demand */
  still?: boolean;
  onPhase?: (phase: number) => void;
  onProgress?: (t: number) => void;
  onFirstFrame?: () => void;
  onSequenceEnd?: () => void;
};

type Piece = { group: THREE.Group; offset: THREE.Group; main: THREE.Mesh; uniforms: MeatUniforms; info: PieceInfo; spec: PieceSpec };

const PIECES: (Omit<PieceSpec, "theta0" | "theta1" | "cut"> & { y: number; rotY: number; tilt: number })[] = [
  { seed: 11, ro: 0.6, band: 0.592, depth: 0.48, fat: 0.11, y: 1.72, rotY: 1.25, tilt: 0.1 },
  { seed: 23, ro: 0.62, band: 0.612, depth: 0.48, fat: 0.115, y: 0.42, rotY: 0.36, tilt: -0.04 },
  { seed: 37, ro: 0.6, band: 0.592, depth: 0.47, fat: 0.105, y: -0.78, rotY: 1.95, tilt: 0.08 },
  { seed: 51, ro: 0.58, band: 0.572, depth: 0.46, fat: 0.1, y: -1.94, rotY: 1.1, tilt: -0.07 },
];
const HERO = 1;

/** Camera shots: position, target, vertical fov. */
type Shot = { p: [number, number, number]; t: [number, number, number]; fov: number };

export class PicanhaEngine {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
  private composer: EffectComposer | null = null;
  private bloom: UnrealBloomPass | null = null;
  private grade: ShaderPass | null = null;
  private timer = new THREE.Timer();
  private raf = 0;
  private running = false;
  private visible = true;
  private disposed = false;
  private low: boolean;
  private opts: EngineOptions;

  private skewerRoot = new THREE.Group();
  private pieces: Piece[] = [];
  private slice!: THREE.Mesh;
  private slicePivot = new THREE.Group();
  private sliceU!: MeatUniforms;
  private knife!: THREE.Group;
  private plate!: THREE.Mesh;
  private embers!: ReturnType<typeof createEmbers>;
  private smoke!: ReturnType<typeof createSmoke>;
  private bg!: ReturnType<typeof createBackground>;
  private keyLight!: THREE.SpotLight;
  private rimLight!: THREE.DirectionalLight;
  private fillLight!: THREE.DirectionalLight;
  private plateLight!: THREE.PointLight;
  private fireLight!: THREE.PointLight;
  private envMap: THREE.Texture | null = null;
  private neonMats: THREE.MeshBasicMaterial[] = [];
  private neonLight!: THREE.PointLight;

  /** everything the timeline animates */
  readonly S = {
    light: 0, embers: 0, cook: 0, smoke: 0,
    knife: 0, press: 0, cut: 0, exit: 0, fall: 0,
    cam: 0, spin: 0, replaySpin: 0, final: 0,
  };
  private tl: gsap.core.Timeline;
  private phase = -1;
  private flap = { a: 0, v: 0 };
  private pointer = new THREE.Vector2();
  private pointerS = new THREE.Vector2();
  private scroll = 0;
  private scrollS = 0;
  private shots: Shot[] = [];
  private dpr: number;
  private dprBase: number;
  private frameTimes: number[] = [];
  private hinge = new THREE.Vector3();
  private axisX = new THREE.Vector3();
  private axisN = new THREE.Vector3();
  private slicePivotLocal = new THREE.Vector3();
  private sliceStart = { pos: new THREE.Vector3(), quat: new THREE.Quaternion() };
  private sliceDetached = false;
  private plateSurfaceY = 0;
  private landing = new THREE.Vector3();

  constructor(opts: EngineOptions) {
    this.opts = opts;
    this.low = opts.quality === "low";
    const renderer = new THREE.WebGLRenderer({ canvas: opts.canvas, antialias: this.low, alpha: false, powerPreference: "high-performance", stencil: false });
    this.renderer = renderer;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !this.low;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    this.dprBase = Math.min(window.devicePixelRatio || 1, this.low ? 1.5 : 1.75);
    this.dpr = this.dprBase;
    renderer.setPixelRatio(this.dpr);
    this.timer.connect(document);

    this.build();
    this.tl = this.buildTimeline();
    if (opts.startAtEnd || opts.still) this.tl.seek(SEQUENCE_END, false);
  }

  // ------------------------------------------------------------------------------------------------------- build
  private build() {
    const { scene } = this;
    this.envMap = this.makeEnvironment();
    scene.environment = this.envMap;
    scene.environmentIntensity = 0.5;

    this.bg = createBackground();
    scene.add(this.bg.mesh);

    // lights: the grill below right (key), a warm rim from behind, a cool soft fill from the front left
    const key = new THREE.SpotLight("#ffd6b0", 0, 18, Math.PI / 5.5, 0.9, 1.3);
    key.position.set(4.8, 2.9, 1.0);
    key.target.position.set(-0.2, -0.3, 0);
    key.castShadow = !this.low;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0008;
    key.shadow.normalBias = 0.045;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 12;
    scene.add(key, key.target);
    this.keyLight = key;
    const rim = new THREE.DirectionalLight("#ffc48a", 0);
    rim.position.set(-3.0, 3.6, -4.2);
    scene.add(rim);
    this.rimLight = rim;
    const fire = new THREE.PointLight("#ff6a1c", 0, 9, 1.6);
    fire.position.set(0.6, -3.6, 1.6);
    scene.add(fire);
    this.fireLight = fire;
    const fill = new THREE.DirectionalLight("#b9c7e0", 0);
    fill.position.set(-4.0, 2.5, 6.0);
    scene.add(fill);
    this.fillLight = fill;
    const plateLight = new THREE.PointLight("#ffd2a8", 0, 4, 2);
    plateLight.position.set(-0.6, -1.6, 1.6);
    scene.add(plateLight);
    this.plateLight = plateLight;

    // skewer and pieces
    scene.add(this.skewerRoot);
    const skewer = createSkewer(this.envMap, 3.2, -2.75);
    this.skewerRoot.add(skewer.group);
    const q = this.low ? QUALITY_LOW : QUALITY_HIGH;
    PIECES.forEach((p, i) => {
      const spec: PieceSpec = {
        seed: p.seed, ro: p.ro, band: p.band, depth: p.depth, fat: p.fat,
        // closed fold: the two ends press into each other at the lower right, away from the camera
        closed: true,
        theta0: -0.95 + (i % 2) * 0.03, theta1: 5.62 - (i % 3) * 0.03,
        cut: i === HERO ? { z0: 0.168, xRef: -0.45, slope: 0.21 } : undefined,
      };
      const built = buildPiece(spec, i === HERO ? q : { ...q, stations: Math.round(q.stations * 0.8), ring: Math.round(q.ring * 0.85) });
      const { material, uniforms } = createMeatMaterial({ lowQuality: this.low, seed: p.seed * 0.137, skewerX: built.info.skewerX });
      const main = new THREE.Mesh(built.main, material);
      main.castShadow = main.receiveShadow = !this.low;
      if (!this.low) main.customDepthMaterial = this.depthMaterial(uniforms, false);
      const group = new THREE.Group();
      const offset = new THREE.Group();
      offset.position.x = -built.info.skewerX;
      offset.add(main);
      group.add(offset);
      group.position.y = p.y;
      group.rotation.set(p.tilt, p.rotY, p.tilt * 0.5);
      this.skewerRoot.add(group);
      this.pieces.push({ group, offset, main, uniforms, info: built.info, spec });
      if (i === HERO && built.slice) {
        const sm = createMeatMaterial({ slice: true, lowQuality: this.low, seed: p.seed * 0.137, skewerX: built.info.skewerX });
        this.slice = new THREE.Mesh(built.slice, sm.material);
        this.slice.castShadow = this.slice.receiveShadow = !this.low;
        if (!this.low) this.slice.customDepthMaterial = this.depthMaterial(sm.uniforms, true);
        this.sliceU = sm.uniforms;
        // the slice hangs in a pivot so it can tumble around its own middle when it falls
        const info = built.info;
        this.slicePivotLocal.set((info.cutLeft + info.cutRight) / 2, info.cutBottom - 0.05, info.planeZ((info.cutLeft + info.cutRight) / 2) + 0.03);
        this.slicePivot.position.copy(this.slicePivotLocal);
        this.slice.position.copy(this.slicePivotLocal).multiplyScalar(-1);
        this.slicePivot.add(this.slice);
        offset.add(this.slicePivot);
      }
    });

    // cut frame (piece-local): hinge axis along the plane, normal out of the meat
    const hero = this.pieces[HERO];
    const slope = hero.spec.cut!.slope;
    this.axisX.set(1, 0, slope).normalize();
    this.axisN.set(-slope, 0, 1).normalize();
    for (const u of [hero.uniforms, this.sliceU]) {
      u.uAxisX.value.copy(this.axisX);
      u.uAxisY.value.set(0, 1, 0);
      u.uAxisN.value.copy(this.axisN);
      u.uLiftTop.value = 0.34;
    }

    // knife (lives in the hero piece's frame so it follows the skewer)
    const knife = createKnife(this.envMap, this.low);
    this.knife = knife.group;
    this.knife.traverse((o) => { if ((o as THREE.Mesh).isMesh) { o.castShadow = !this.low; } });
    this.knife.visible = false;
    hero.offset.add(this.knife);

    // plate and table
    const plate = createPlate(this.envMap, this.low);
    this.plate = plate.plate;
    this.plate.position.set(-0.42, -3.02, 0.82);
    this.plate.receiveShadow = !this.low;
    scene.add(this.plate);
    this.plateSurfaceY = this.plate.position.y + plate.surfaceY;
    // a soft contact shadow: the plate rests on a dark table we do not see
    const sh = document.createElement("canvas");
    sh.width = sh.height = 128;
    const g = sh.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 10, 64, 64, 64);
    grad.addColorStop(0, "rgba(0,0,0,0.85)");
    grad.addColorStop(0.55, "rgba(0,0,0,0.45)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sh), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(this.plate.position.x, this.plate.position.y - 0.002, this.plate.position.z);
    this.scene.add(shadow);

    this.makeNeon();

    this.embers = createEmbers(this.low ? 150 : 420, this.dpr);
    scene.add(this.embers.points);
    this.smoke = createSmoke(this.low ? 5 : 11);
    scene.add(this.smoke.mesh);

    this.shots = this.makeShots();
    this.computeLanding();
    if (!this.low) this.setupPost();
  }

  /** The bull as a red neon sign on the back wall: a sharp tube texture and a soft halo, switched on at the end. */
  private makeNeon() {
    const draw = (blur: number, line: string) => {
      const size = 512;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const g = c.getContext("2d")!;
      const sc = (size * 0.74) / BULL_H;
      g.translate((size - BULL_W * sc) / 2, (size - BULL_H * sc) / 2);
      g.scale(sc, sc);
      const path = new Path2D(BULL_OUTLINE);
      g.fillStyle = line;
      if (blur) {
        g.shadowColor = line;
        for (const b of [blur, blur * 0.5]) { g.shadowBlur = b; g.fill(path); }
      } else g.fill(path);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };
    const group = new THREE.Group();
    const w = 2.6, h = (2.6 * BULL_H) / BULL_W;
    const halo = new THREE.MeshBasicMaterial({ map: draw(60, "#ff4030"), color: new THREE.Color("#ff2a1a").multiplyScalar(0.0), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const tube = new THREE.MeshBasicMaterial({ map: draw(0, "#ffffff"), color: new THREE.Color("#ff3528").multiplyScalar(0.0), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const haloMesh = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.35, h * 1.35), halo);
    const tubeMesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), tube);
    tubeMesh.position.z = 0.01;
    group.add(haloMesh, tubeMesh);
    group.position.set(0.55, 0.75, -4.8);
    group.rotation.y = -0.22;
    group.renderOrder = -5;
    this.scene.add(group);
    this.neonMats = [halo, tube];
    this.neonLight = new THREE.PointLight("#ff3a2a", 0, 10, 1.6);
    this.neonLight.position.set(1.4, 0.5, -3.2);
    this.scene.add(this.neonLight);
  }

  /** A small studio for reflections: dark room, a warm strip of fire below, a soft box above left, a warm wall behind. */
  private makeEnvironment() {
    const env = new THREE.Scene();
    const room = new THREE.Mesh(new THREE.BoxGeometry(20, 12, 20), new THREE.MeshBasicMaterial({ color: "#0a0706", side: THREE.BackSide }));
    env.add(room);
    const panel = (w: number, h: number, color: string, intensity: number, pos: [number, number, number], look: [number, number, number]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }));
      m.position.set(...pos);
      m.lookAt(...look);
      env.add(m);
    };
    panel(14, 2.2, "#ff7a35", 1.5, [3, -5.5, 2], [0, 0, 0]); // fire below
    panel(5, 3.4, "#fff0e2", 1.6, [4.5, 5, 5], [0, 0, 0]); // soft box (key side)
    panel(3, 5, "#ffe2c4", 2.2, [-6, 3, -3], [0, 0, 0]); // strip light behind left (rim)
    panel(9, 3.5, "#ff9a52", 0.5, [-2, 1, -9], [0, 0, 0]); // warm wall behind
    panel(3, 6, "#cfe0ff", 0.35, [-8, 2, 5], [0, 0, 0]); // cool kick front left
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const rt = pmrem.fromScene(env, 0.035);
    pmrem.dispose();
    env.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) { m.geometry.dispose(); (m.material as THREE.Material).dispose(); } });
    return rt.texture;
  }

  /** Shadow depth for the meat: the same shrink, seam and peel as the visible mesh, and no shadow from the slice margin. */
  private depthMaterial(u: MeatUniforms, slice: boolean) {
    const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, u);
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>
          attribute float aFat; attribute float aCut; ${slice ? "attribute float aThick; varying float vThickD;" : ""}
          uniform float uCook; uniform vec3 uHingeO, uAxisX, uAxisY, uAxisN; uniform float uBendR, uBendL, uBendOn, uLift, uLiftTop, uPress, uPressX;
          void peelD(inout vec3 p, float isSlice) {
            vec3 d = p - uHingeO; float h = dot(d, uAxisY); float off = dot(d, uAxisN); float al = dot(d, uAxisX);
            float seam = smoothstep(-0.006, 0.004, h) * (1.0 - smoothstep(uLiftTop - 0.03, uLiftTop, h));
            p += uAxisN * uLift * seam * (isSlice > 0.5 ? 1.0 : -aCut);
            if (isSlice < 0.5 || uBendOn < 0.001 || h <= 0.0) return;
            float R = uBendR; float ph = min(h, uBendL) / R * uBendOn; float rr = R - off;
            vec3 C = uHingeO + uAxisX * al + uAxisN * R;
            vec3 q = C - uAxisN * rr * cos(ph) + uAxisY * rr * sin(ph);
            q += (uAxisY * cos(ph) + uAxisN * sin(ph)) * max(0.0, h - uBendL);
            p = q + uAxisN * uLift * seam;
          }`)
        .replace("#include <begin_vertex>", `vec3 transformed = position * (1.0 - uCook * (0.03 + 0.045 * aFat));
          peelD(transformed, ${slice ? "1.0" : "0.0"});
          ${slice ? "vThickD = aThick;" : ""}`);
      if (slice) {
        shader.fragmentShader = shader.fragmentShader
          .replace("#include <common>", "#include <common>\nvarying float vThickD;")
          .replace("void main() {", "void main() {\n if (vThickD < 0.0012) discard;");
      }
    };
    m.customProgramCacheKey = () => "meatdepth" + (slice ? "s" : "m");
    return m;
  }

  private setupPost() {
    const size = this.renderer.getSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x * this.dpr, size.y * this.dpr, { type: THREE.HalfFloatType, samples: 4 });
    const composer = new EffectComposer(this.renderer, rt);
    composer.setPixelRatio(this.dpr);
    composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.18, 0.45, 1.1);
    composer.addPass(this.bloom);
    this.grade = new ShaderPass({
      uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uVignette: { value: 0.36 }, uGrain: { value: 0.035 } },
      vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse; uniform float uTime, uVignette, uGrain; varying vec2 vUv;
        float gh(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec4 c = texture2D(tDiffuse, vUv);
          vec2 q = vUv - 0.5;
          float v = smoothstep(0.85, 0.2, length(q * vec2(1.0, 1.2)));
          c.rgb *= mix(1.0 - uVignette, 1.0, v);
          // warm the shadows a touch, keep highlights neutral
          float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
          c.rgb = mix(c.rgb * vec3(1.06, 0.98, 0.9), c.rgb, smoothstep(0.0, 0.6, l));
          c.rgb += (gh(vUv * 913.0 + fract(uTime) * 41.0) - 0.5) * uGrain * (0.4 + l);
          gl_FragColor = c;
        }`,
    });
    composer.addPass(this.grade);
    composer.addPass(new OutputPass());
    this.composer = composer;
  }

  /** Where the slice lands on the plate (world). */
  private computeLanding() {
    this.landing.set(this.plate.position.x - 0.15, this.plateSurfaceY, this.plate.position.z - 0.1);
  }

  private makeShots(): Shot[] {
    const hero = this.pieces[HERO];
    const hy = hero.group.position.y;
    const wide = this.camera.aspect >= 1;
    if (wide) {
      return [
        { p: [0.4, 0.6, 12.5], t: [0.0, -0.2, 0], fov: 28 }, // 0 far, in the dark
        { p: [1.2, 0.5, 8.6], t: [0.0, -0.3, 0], fov: 28 }, // 1 reveal
        { p: [-1.6, 0.4, 7.4], t: [0.0, -0.1, 0], fov: 28 }, // 2 grill, from the other side
        { p: [-0.9, hy + 0.35, 4.2], t: [-0.4, hy + 0.05, 0.05], fov: 30 }, // 3 knife
        { p: [-0.55, hy + 0.15, 3.2], t: [-0.42, hy - 0.05, 0.1], fov: 31 }, // 4 cut, close
        { p: [-0.75, hy - 1.0, 3.9], t: [-0.4, -1.75, 0.35], fov: 31 }, // 5 following the fall
        { p: [1.1, -1.2, 5.2], t: [-0.35, -2.3, 0.6], fov: 31 }, // 6 plate
        { p: [2.25, -0.55, 7.1], t: [-1.05, -1.45, 0.25], fov: 31 }, // 7 final (skewer right, text left)
      ];
    }
    return [
      { p: [0.2, 0.8, 16], t: [0, -0.3, 0], fov: 36 },
      { p: [0.6, 0.6, 12.2], t: [0, -0.4, 0], fov: 36 },
      { p: [-1.1, 0.5, 10.4], t: [0, -0.3, 0], fov: 36 },
      { p: [-0.7, hy + 0.3, 5.6], t: [-0.35, hy - 0.05, 0.05], fov: 36 },
      { p: [-0.5, hy + 0.1, 4.4], t: [-0.4, hy - 0.15, 0.1], fov: 38 },
      { p: [-0.6, hy - 1.0, 5.4], t: [-0.4, -1.75, 0.35], fov: 38 },
      { p: [0.8, -0.7, 7.0], t: [-0.25, -1.8, 0.5], fov: 38 },
      { p: [0.9, -0.6, 12.4], t: [-0.15, -1.5, 0.1], fov: 36 },
    ];
  }

  // ---------------------------------------------------------------------------------------------------- timeline
  private buildTimeline() {
    const S = this.S;
    const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    const [, p1, p2, p3, p4, p5] = PHASE_STARTS;
    // 0 reveal
    tl.to(S, { light: 1, duration: 2.6, ease: "power2.inOut" }, 0);
    tl.to(S, { embers: 1, duration: 1.6, ease: "power1.out" }, 0.1);
    tl.to(S, { cam: 1, duration: 2.6, ease: "power2.out" }, 0);
    // 1 grill: the meat turns on the skewer while it cooks
    tl.to(S, { cook: 1, duration: 4.2, ease: "sine.inOut" }, p1);
    tl.to(S, { smoke: 1, duration: 1.8, ease: "sine.out" }, p1 + 0.2);
    tl.to(S, { smoke: 0.45, duration: 2.2, ease: "sine.inOut" }, p1 + 2.4);
    tl.to(S, { spin: 1, duration: 4.4, ease: "sine.inOut" }, p1);
    tl.to(S, { cam: 2, duration: 4.4, ease: "sine.inOut" }, p1);
    // 2 knife comes in
    tl.to(S, { cam: 3, duration: 2.0, ease: "power2.inOut" }, p2);
    tl.to(S, { knife: 1, duration: 1.8, ease: "power3.out" }, p2 + 0.15);
    tl.to(S, { press: 1, duration: 0.35, ease: "power2.in" }, p3 - 0.4);
    // 3 cut
    tl.to(S, { cam: 4, duration: 3.0, ease: "sine.inOut" }, p3);
    tl.to(S, { cut: 1, duration: 3.0, ease: "power1.inOut" }, p3);
    tl.to(S, { press: 0, duration: 0.4, ease: "power1.out" }, p3 + 0.1);
    // 4 the slice comes free and falls (slow motion is in the duration: ~0.22 s of real fall over 1.6 s)
    tl.to(S, { fall: 1, duration: 1.75, ease: "none" }, p4);
    tl.to(S, { exit: 1, duration: 1.4, ease: "power2.in" }, p4 + 0.25);
    tl.to(S, { cam: 5, duration: 1.0, ease: "sine.inOut" }, p4);
    tl.to(S, { cam: 6, duration: 1.3, ease: "sine.inOut" }, p4 + 1.0);
    // 5 orbit to the final shot
    tl.to(S, { cam: 7, duration: 3.6, ease: "power2.inOut" }, p5);
    tl.to(S, { final: 1, duration: 3.0, ease: "power1.inOut" }, p5 + 0.6);
    tl.to(S, { smoke: 0.3, duration: 2.0 }, p5);
    tl.call(() => this.opts.onSequenceEnd?.(), undefined, SEQUENCE_END);
    tl.set({}, {}, SEQUENCE_END + 0.01);
    return tl;
  }

  // ---------------------------------------------------------------------------------------------------- per frame
  private apply(dt: number, time: number) {
    const S = this.S;
    const hero = this.pieces[HERO];
    const info = hero.info;

    // light and atmosphere
    const flick = 1 + 0.07 * Math.sin(time * 7.3) * Math.sin(time * 3.1 + 1.7) + 0.04 * Math.sin(time * 17.0);
    this.keyLight.intensity = 85 * S.light * (1 - 0.25 * this.scrollS);
    this.rimLight.intensity = 3.2 * S.light;
    this.fillLight.intensity = 0.22 * S.light;
    this.fireLight.intensity = 22 * S.light * flick * (0.55 + 0.45 * (1 - S.final * 0.5));
    this.plateLight.intensity = 1.6 * S.light * (0.3 + 0.7 * Math.min(1, S.fall * 1.5 + S.final));
    this.scene.environmentIntensity = 0.5 * S.light;
    this.bg.uniforms.uLight.value = 0.25 + 0.75 * S.light;
    this.bg.uniforms.uTime.value = time;
    this.embers.uniforms.uTime.value = time;
    this.embers.uniforms.uAmount.value = S.embers;
    this.smoke.uniforms.uTime.value = time;
    this.smoke.uniforms.uAmount.value = S.smoke;
    // the neon sign switches on during the final orbit: two short blinks, then steady with a faint hum
    const f = S.final;
    const blink = f <= 0 ? 0 : f < 0.12 ? (f > 0.05 && f < 0.08 ? 1 : 0.15) : f < 0.2 ? (f > 0.15 ? 1 : 0.2) : 1;
    const neon = blink * (0.96 + 0.04 * Math.sin(time * 23.0)) * (f > 0 ? 1 : 0);
    if (this.neonMats.length) {
      this.neonMats[0].color.setRGB(1.0, 0.16, 0.1).multiplyScalar(0.9 * neon);
      this.neonMats[1].color.setRGB(1.0, 0.24, 0.17).multiplyScalar(3.2 * neon);
    }
    this.neonLight.intensity = 6 * neon;
    // key light follows the pointer a little (the fire seems to move with you)
    this.keyLight.position.set(4.8 + this.pointerS.x * 0.5, 2.9 + this.pointerS.y * 0.4, 1.0 + this.pointerS.x * 0.6);

    for (const p of this.pieces) {
      p.uniforms.uCook.value = S.cook;
      p.uniforms.uTime.value = time;
    }
    this.sliceU.uCook.value = S.cook;
    this.sliceU.uTime.value = time;

    // skewer turn: a slow quarter turn while it grills, idle sway at the end, the replay spin
    const idle = S.final * Math.sin(time * 0.35) * 0.09;
    this.skewerRoot.rotation.y = 0.6 * (1 - S.spin) + idle + S.replaySpin * Math.PI * 2 + this.scrollS * 0.35;

    // knife: comes in along the plane from the left, edge first touches the top of the cut, then goes down sawing
    const top = info.cutTop + 0.004;
    const bottom = info.cutBottom - 0.02;
    const edgeY = THREE.MathUtils.lerp(top + 0.035, top, Math.min(1, S.knife * 1.0)) - 0.012 * S.press + (bottom - top) * S.cut - S.exit * 0.6;
    const cx = (info.cutLeft + info.cutRight) / 2;
    const along = cx * Math.hypot(1, hero.spec.cut!.slope);
    const saw = Math.sin(S.cut * Math.PI * 4) * 0.13 * Math.sin(Math.min(1, S.cut) * Math.PI);
    const enter = (1 - S.knife) * -4.8 - S.exit * 3.2;
    const sAlong = along - BLADE_LENGTH * 0.52 + saw + enter;
    this.knife.visible = S.knife > 0.001 && S.exit < 0.999;
    const kx = this.axisX.x * sAlong;
    const kz = info.planeZ(kx) + 0.0;
    this.knife.position.set(kx, edgeY, kz);
    this.knife.rotation.set(0, -Math.atan(hero.spec.cut!.slope), (1 - S.knife) * -0.16 + S.exit * -0.25);

    // hinge follows the edge while cutting; the flap swings on a damped spring
    const hingeY = THREE.MathUtils.clamp(edgeY, info.cutBottom - 0.06, info.cutTop + 0.02);
    this.hinge.set(cx, hingeY, info.planeZ(cx));
    const free = Math.max(0, info.cutTop - hingeY);
    const target = S.cut > 0 ? THREE.MathUtils.degToRad(168) * THREE.MathUtils.smoothstep(free, 0.015, 0.4) : 0;
    if (dt > 0 && dt < 0.1) {
      const k = 38, c = 7.5;
      this.flap.v += (k * (target - this.flap.a) - c * this.flap.v) * dt;
      this.flap.a += this.flap.v * dt;
    } else this.flap.a = target;
    const R = 0.105;
    const bend = Math.max(0, this.flap.a);
    for (const u of [hero.uniforms, this.sliceU]) {
      u.uHingeO.value.copy(this.hinge);
      u.uBendR.value = R;
      u.uBendL.value = Math.max(0.0001, R * bend);
      u.uBendOn.value = S.cut > 0 ? 1 : 0;
      u.uLift.value = S.knife > 0.99 && S.exit < 0.5 ? 0.0125 : 0;
      u.uPress.value = 0.014 * S.press;
      u.uPressX.value = cx;
    }

    // fall: detach at the bottom, tumble pink side up onto the plate, settle
    this.updateFall(S.fall);
  }

  private updateFall(f: number) {
    const hero = this.pieces[HERO];
    if (f <= 0) {
      if (this.sliceDetached) {
        // back on the skewer (replay or seeking backwards)
        hero.offset.add(this.slicePivot);
        this.slicePivot.position.copy(this.slicePivotLocal);
        this.slicePivot.quaternion.identity();
        this.sliceDetached = false;
      }
      return;
    }
    if (!this.sliceDetached) {
      this.slicePivot.position.copy(this.slicePivotLocal);
      this.slicePivot.quaternion.identity();
      hero.offset.updateMatrixWorld(true);
      this.scene.attach(this.slicePivot);
      this.sliceStart.pos.copy(this.slicePivot.position);
      this.sliceStart.quat.copy(this.slicePivot.quaternion);
      this.sliceDetached = true;
    }
    // gravity from rest: position ∝ t², contact at f = 0.78, then a small settle
    const contact = 0.78;
    const fall = Math.min(1, f / contact);
    const drop = fall * fall;
    const start = this.sliceStart.pos;
    const end = this.landing;
    const p = this.slicePivot.position;
    p.x = THREE.MathUtils.lerp(start.x, end.x, THREE.MathUtils.smoothstep(fall, 0, 1));
    p.z = THREE.MathUtils.lerp(start.z, end.z + 0.05, Math.sin(fall * Math.PI * 0.5));
    p.y = THREE.MathUtils.lerp(start.y, end.y + 0.11, drop);
    const settle = f > contact ? (f - contact) / (1 - contact) : 0;
    p.y += Math.sin(settle * Math.PI) * 0.035 * (1 - settle);
    // tumble: from hanging (flap folded towards the camera) to lying flat, pink side up
    const tumble = THREE.MathUtils.smoothstep(fall, 0.05, 1) * 0.92 + settle * 0.08;
    // + about X: the crust side turns down, the pink cut side up, the slice's top end towards the camera
    const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), tumble * 1.5);
    const qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), tumble * 0.35);
    this.slicePivot.quaternion.copy(this.sliceStart.quat).premultiply(qx).premultiply(qy);
    // the folded slice relaxes as it lands
    this.flap.a = THREE.MathUtils.degToRad(THREE.MathUtils.lerp(168, 32, THREE.MathUtils.smoothstep(f, 0.55, 1)));
    this.flap.v = 0;
    const R = 0.105;
    for (const u of [this.sliceU]) u.uBendL.value = R * this.flap.a;
  }

  /** dev: fixed camera "px,py,pz,tx,ty,tz,fov" */
  debugCam: number[] | null = null;
  private updateCamera(dt: number) {
    const S = this.S;
    if (this.debugCam) {
      const [px, py, pz, tx, ty, tz, fov] = this.debugCam;
      this.camera.position.set(px, py, pz);
      this.camera.fov = fov ?? 30;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(tx, ty, tz);
      return;
    }
    const i = Math.min(this.shots.length - 2, Math.floor(S.cam));
    const f = S.cam - i;
    const a = this.shots[i];
    const b = this.shots[i + 1];
    const lerp3 = (x: number[], y: number[], t: number) => x.map((v, k) => v + (y[k] - v) * t);
    const pos = lerp3(a.p, b.p, f);
    const tgt = lerp3(a.t, b.t, f);
    const fov = a.fov + (b.fov - a.fov) * f;
    // pointer parallax and scroll dolly (springy)
    const k = 1 - Math.exp(-dt * 3.2);
    this.pointerS.lerp(this.pointer, isFinite(k) ? k : 1);
    this.scrollS += (this.scroll - this.scrollS) * (isFinite(k) ? Math.min(1, k * 1.6) : 1);
    const px = this.pointerS.x * 0.55 * (0.35 + 0.65 * S.final);
    const py = this.pointerS.y * 0.3 * (0.35 + 0.65 * S.final);
    this.camera.position.set(pos[0] + px, pos[1] + py + this.scrollS * 1.1, pos[2] + this.scrollS * 2.2);
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(tgt[0] + px * 0.25, tgt[1] + py * 0.2 + this.scrollS * 0.4, tgt[2]);
    this.bg.uniforms.uShift.value.set(-this.pointerS.x * 0.012, -this.pointerS.y * 0.008);
  }

  private frame = (now: number) => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.frame);
    this.timer.update(now);
    const dt = Math.min(0.1, this.timer.getDelta());
    if (!this.visible) return;
    if (this.running && !this.opts.still) this.tl.time(Math.min(SEQUENCE_END + 0.01, this.tl.time() + dt));
    this.step(dt, this.timer.getElapsed());
    this.measure(dt);
  };

  private step(dt: number, time: number) {
    const t = this.tl.time();
    let ph = 0;
    for (let i = 0; i < PHASE_STARTS.length; i++) if (t >= PHASE_STARTS[i]) ph = i;
    if (ph !== this.phase) { this.phase = ph; this.opts.onPhase?.(ph); }
    this.opts.onProgress?.(t / SEQUENCE_END);
    this.apply(dt, time);
    this.updateCamera(dt);
    this.render(time);
  }

  private firstFrame = false;
  private render(time: number) {
    if (this.composer) {
      if (this.grade) this.grade.uniforms.uTime.value = time;
      this.composer.render();
    } else this.renderer.render(this.scene, this.camera);
    if (!this.firstFrame) { this.firstFrame = true; this.opts.onFirstFrame?.(); }
  }

  /** Adaptive resolution: step the pixel ratio down when frames are slow, back up when there is room. */
  private measure(dt: number) {
    this.frameTimes.push(dt);
    if (this.frameTimes.length < 50) return;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    this.frameTimes.length = 0;
    let next = this.dpr;
    if (avg > 1 / 42 && this.dpr > 0.75) next = Math.max(0.75, this.dpr - 0.25);
    else if (avg < 1 / 58 && this.dpr < this.dprBase) next = Math.min(this.dprBase, this.dpr + 0.25);
    if (next !== this.dpr) { this.dpr = next; this.resize(); }
  }

  // --------------------------------------------------------------------------------------------------- public API
  private lastW = 0;
  private lastH = 0;
  resize(w = this.lastW, h = this.lastH) {
    if (!w || !h) return;
    const wasWide = this.camera.aspect >= 1;
    this.lastW = w; this.lastH = h;
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if ((this.camera.aspect >= 1) !== wasWide || !this.shots.length) this.shots = this.makeShots();
    this.bg.uniforms.uAspect.value = w / h;
    this.embers.uniforms.uPixel.value = this.dpr;
    this.embers.uniforms.uScale.value = h;
    if (this.composer) {
      this.composer.setPixelRatio(this.dpr);
      this.composer.setSize(w, h);
      this.bloom?.resolution.set(w / 2, h / 2);
    }
    if (this.opts.still) this.step(0, 0);
  }

  start() {
    if (this.running) return;
    this.running = true;
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.frame);
  }
  /** Stops the clock (pause button): the frame loop keeps the idle motion off too. */
  pause() { this.running = false; }
  get paused() { return !this.running; }
  setVisible(v: boolean) { this.visible = v; }
  setPointer(x: number, y: number) { this.pointer.set(x, y); }
  setScroll(p: number) { this.scroll = p; }
  seek(t: number) {
    this.tl.time(t, false);
    this.flap.v = 0;
    this.step(0, t);
  }
  get time() { return this.tl.time(); }
  skipToEnd() { this.seek(SEQUENCE_END); }
  /** Renders one frame now (still mode). */
  renderOnce() { this.step(0, 0); }

  /** "Noch eine Scheibe": the passador turns the skewer; the cut is restored while it faces away; carve again. */
  replay() {
    const S = this.S;
    const t0 = PHASE_STARTS[2];
    gsap.killTweensOf(S, "replaySpin");
    const restore = () => {
      // jump the timeline back to before the knife; keep the cooked meat and the light
      this.tl.time(t0 - 0.01, false);
      S.fall = 0; S.cut = 0; S.knife = 0; S.exit = 0; S.press = 0; S.final = 0;
      this.updateFall(0);
    };
    this.running = false;
    gsap.fromTo(S, { replaySpin: 0 }, {
      replaySpin: 1,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (S.replaySpin > 0.5 && S.fall > 0) restore();
        this.step(1 / 60, this.timer.getElapsed());
      },
      onComplete: () => { S.replaySpin = 0; this.running = true; },
    });
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.tl.kill();
    gsap.killTweensOf(this.S);
    this.timer.dispose();
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mats = (Array.isArray(m.material) ? m.material : m.material ? [m.material] : []) as THREE.Material[];
      mats.forEach((x) => x.dispose());
    });
    this.envMap?.dispose();
    this.composer?.dispose();
    this.renderer.dispose();
  }
}
