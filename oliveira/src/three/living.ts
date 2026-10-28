// Living photos: one shared WebGL renderer (the site's second and last context) draws every visible food
// photo with depth parallax, rising steam, a sliding glisten and, on the grill, heat shimmer. Each frame is
// rendered into a corner of the shared canvas and copied into the photo's own 2D canvas, so the page's
// stacking (labels, captions, overlays) stays exactly as in the DOM.
import * as THREE from "three";
import { asset } from "@/lib/utils";
import { tilt } from "@/lib/tilt";

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const FRAG = /* glsl */ `
uniform sampler2D uPhoto;
uniform sampler2D uDepth;   // Depth Anything map, white = near
uniform sampler2D uMasks;   // R = where steam may rise, G = what glistens
uniform vec2  uPointer;     // -1..1, spring-smoothed pointer or device tilt
uniform vec2  uLight;       // highlight position in uv; trails the pointer
uniform vec2  uCover;       // object-fit: cover, as a uv scale
uniform float uTime;
uniform float uParallax;
uniform float uSteam;
uniform float uGloss;
uniform float uShimmer;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 base = (vUv - 0.5) * uCover + 0.5;
  vec2 uv = (base - 0.5) / 1.04 + 0.5;               // 4 % overscan hides the edges when shifting
  vec4 m = texture2D(uMasks, base);   // textures load with flipY, so v = 1 is the image's top
  float depth = texture2D(uDepth, uv).r;
  uv += uPointer * (depth - 0.5) * uParallax;         // near moves more than far

  // heat shimmer: a faint refraction above the hot food
  float heat = uShimmer * m.r;
  uv.x += sin(uv.y * 46.0 + uTime * 3.1) * 0.0016 * heat + (noise(uv * 18.0 + vec2(0.0, -uTime * 1.2)) - 0.5) * 0.002 * heat;

  vec3 col = texture2D(uPhoto, uv).rgb;

  // steam: two layers of rising, curling noise, only where the mask allows
  vec2 p = vec2(base.x * 3.0, base.y * 2.0 - uTime * 0.07);
  float s = fbm(p + 1.5 * fbm(p * 1.3 + vec2(0.0, -uTime * 0.04)));
  s = smoothstep(0.52, 0.85, s) * m.r * uSteam;
  col = mix(col, vec3(0.97), s * 0.22);

  // glisten: a soft highlight that slides over wet, bright surfaces as the light moves
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  float g = pow(max(0.0, 1.0 - distance(base, uLight) * 2.2), 5.0) * m.g * smoothstep(0.35, 0.9, luma);
  col += g * 0.16 * uGloss;

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

type Entry = {
  name: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  host: HTMLElement;
  visible: boolean;
  ready: boolean;
  drawn: boolean;
  textures?: { photo: THREE.Texture; depth: THREE.Texture; masks: THREE.Texture; aspect: number };
  pointer: THREE.Vector2;
  light: THREE.Vector2;
  shimmer: number;
  onFirstFrame: () => void;
};

const DPR = () => Math.min(window.devicePixelRatio || 1, 1.5);
const loader = new THREE.TextureLoader();
const load = (url: string, srgb: boolean) =>
  new Promise<THREE.Texture>((resolve, reject) =>
    loader.load(
      url,
      (t) => {
        t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        t.minFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
        t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
        resolve(t);
      },
      undefined,
      reject,
    ),
  );

class LivingRenderer {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera = new THREE.Camera();
  material: THREE.ShaderMaterial;
  entries = new Set<Entry>();
  io: IntersectionObserver;
  pointer = { x: 0, y: 0, has: false };
  raf = 0;
  start = performance.now();
  paused = false;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "low-power", preserveDrawingBuffer: false });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(1024, 1024, false);
    this.renderer.setScissorTest(true);
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uPhoto: { value: null },
        uDepth: { value: null },
        uMasks: { value: null },
        uPointer: { value: new THREE.Vector2() },
        uLight: { value: new THREE.Vector2(0.5, 0.4) },
        uCover: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uParallax: { value: 0.024 },
        uSteam: { value: 1 },
        uGloss: { value: 1 },
        uShimmer: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material));
    this.io = new IntersectionObserver(
      (list) => {
        for (const e of list) {
          const entry = [...this.entries].find((x) => x.host === e.target);
          if (!entry) continue;
          entry.visible = e.isIntersecting;
          if (entry.visible && !entry.textures) this.prepare(entry);
        }
      },
      { rootMargin: "120px" },
    );
    window.addEventListener("pointermove", (e) => {
      this.pointer.x = e.clientX;
      this.pointer.y = e.clientY;
      this.pointer.has = true;
    }, { passive: true });
    document.addEventListener("visibilitychange", () => (document.hidden ? this.stop() : this.loop()));
    this.renderer.domElement.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.stop();
    });
  }

  async prepare(entry: Entry) {
    const [photo, depth, masks] = await Promise.all([
      load(asset(`images/${entry.name}-960.webp`), true).catch(() => load(asset(`images/${entry.name}-800.webp`), true)).catch(() => null),
      load(asset(`depth/${entry.name}.webp`), false),
      load(asset(`masks/${entry.name}.webp`), false),
    ]).catch(() => [null, null, null] as const);
    if (!photo || !depth || !masks) return;
    const img = photo.image as HTMLImageElement;
    entry.textures = { photo, depth, masks, aspect: img.width / img.height };
    entry.ready = true;
    this.loop();
  }

  add(entry: Entry) {
    this.entries.add(entry);
    this.io.observe(entry.host);
    this.loop();
  }
  remove(entry: Entry) {
    this.io.unobserve(entry.host);
    this.entries.delete(entry);
    entry.textures?.photo.dispose();
    entry.textures?.depth.dispose();
    entry.textures?.masks.dispose();
  }

  loop = () => {
    if (this.raf || this.paused || document.hidden) return;
    const tick = () => {
      this.raf = 0;
      let any = false;
      for (const e of this.entries) {
        if (e.visible && e.ready) {
          this.draw(e);
          any = true;
        }
      }
      if (any || [...this.entries].some((e) => e.visible && !e.ready)) this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  };
  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  draw(e: Entry) {
    const t = e.textures!;
    const rect = e.host.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    // Same scale on both sides, so the canvas keeps the box's shape; the shared buffer is 1024 px.
    const k = Math.min(DPR(), 1024 / Math.max(rect.width, rect.height));
    const w = Math.round(rect.width * k);
    const h = Math.round(rect.height * k);
    if (e.canvas.width !== w || e.canvas.height !== h) {
      e.canvas.width = w;
      e.canvas.height = h;
    }
    // Pointer relative to the photo when it's over it, else to the screen centre, then tilt if granted.
    let tx = 0, ty = 0;
    if (tilt.has) {
      tx = tilt.x;
      ty = tilt.y;
    } else if (this.pointer.has) {
      const over = this.pointer.x >= rect.left && this.pointer.x <= rect.right && this.pointer.y >= rect.top && this.pointer.y <= rect.bottom;
      const cx = over ? rect.left + rect.width / 2 : innerWidth / 2;
      const cy = over ? rect.top + rect.height / 2 : innerHeight / 2;
      const sx = over ? rect.width / 2 : innerWidth / 2;
      const sy = over ? rect.height / 2 : innerHeight / 2;
      tx = Math.max(-1, Math.min(1, (this.pointer.x - cx) / sx)) * (over ? 1 : 0.4);
      ty = Math.max(-1, Math.min(1, (this.pointer.y - cy) / sy)) * (over ? 1 : 0.4);
    }
    // Spring-ish smoothing (critically damped lerp per frame).
    e.pointer.x += (tx - e.pointer.x) * 0.08;
    e.pointer.y += (ty - e.pointer.y) * 0.08;
    e.light.x += (0.5 + e.pointer.x * 0.35 - e.light.x) * 0.05;
    e.light.y += (0.45 + e.pointer.y * 0.3 - e.light.y) * 0.05;

    const u = this.material.uniforms;
    u.uPhoto.value = t.photo;
    u.uDepth.value = t.depth;
    u.uMasks.value = t.masks;
    u.uPointer.value.set(-e.pointer.x, e.pointer.y);
    u.uLight.value.set(e.light.x, 1 - e.light.y);
    const box = rect.width / rect.height;
    u.uCover.value.set(box > t.aspect ? 1 : box / t.aspect, box > t.aspect ? t.aspect / box : 1);
    u.uTime.value = (performance.now() - this.start) / 1000;
    u.uShimmer.value = e.shimmer;

    const H = this.renderer.domElement.height;
    this.renderer.setViewport(0, H - h, w, h);
    this.renderer.setScissor(0, H - h, w, h);
    this.renderer.render(this.scene, this.camera);
    e.ctx.drawImage(this.renderer.domElement, 0, 0, w, h, 0, 0, w, h);
    if (!e.drawn) {
      e.drawn = true;
      e.onFirstFrame();
    }
  }
}

let shared: LivingRenderer | null = null;
let failed = false;

export function livingEnabled() {
  return !failed;
}

/** Registers a photo; returns a cleanup. Returns null when WebGL can't start (the <img> stays). */
export function attachLiving(host: HTMLElement, canvas: HTMLCanvasElement, name: string, shimmer: boolean, onFirstFrame: () => void) {
  if (failed) return null;
  try {
    shared ??= new LivingRenderer();
  } catch {
    failed = true;
    return null;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const entry: Entry = { name, canvas, ctx, host, visible: false, ready: false, drawn: false, pointer: new THREE.Vector2(), light: new THREE.Vector2(0.5, 0.45), shimmer: shimmer ? 1 : 0, onFirstFrame };
  shared.add(entry);
  return () => shared?.remove(entry);
}

export function pauseLiving(paused: boolean) {
  if (!shared) return;
  shared.paused = paused;
  if (paused) shared.stop();
  else shared.loop();
}

