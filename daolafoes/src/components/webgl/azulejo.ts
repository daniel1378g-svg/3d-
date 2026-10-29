// Scene A: an azulejo field in glazed ceramic, always in motion. A full-screen shader draws a grid of tiles in
// the brand's brown on cream with an orange glaze; a slow wave of light travels across them, the tiles breathe,
// and the pointer presses a ripple into the glaze. Loops (period 24 s), pauses off screen, adaptive quality
// (DPR 0.5–1.5, frame skipping) and never stops on its own.
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer } from "three";

const VERT = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`;
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPress;
uniform vec3 uBrown; uniform vec3 uCream; uniform vec3 uOrange; uniform vec3 uDark;
#define TAU 6.28318530718
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float sdStar(vec2 p, float r1, float r2){
  float a = atan(p.y, p.x); float seg = TAU / 8.0;
  float f = mod(a, seg) - seg * 0.5; float rr = mix(r1, r2, smoothstep(0.0, 1.0, abs(f) / (seg * 0.5)));
  return length(p) - rr;
}
void main(){
  vec2 px = vUv * uRes;
  float tile = min(uRes.x, uRes.y) / 6.5;
  // the pointer's ripple: a ring that expands and fades
  vec2 d = px - uPointer;
  float dist = length(d) / tile;
  float ring = sin(dist * 3.0 - uTime * 4.0) * exp(-dist * 0.55) * uPress;
  px += normalize(d + 1e-3) * ring * tile * 0.12;
  // the slow wave of light (loops with uTime in [0, 24))
  float wave = 0.5 + 0.5 * sin((px.x * 0.6 + px.y * 0.35) / tile - uTime * TAU / 24.0 * 3.0);
  vec2 cell = floor(px / tile);
  vec2 uv = fract(px / tile) - 0.5;
  float h = hash(cell);
  // the tiles breathe (each with its own phase), the pointer presses them in
  float breathe = 0.5 + 0.5 * sin(uTime * TAU / 24.0 * 2.0 + h * TAU);
  uv *= 1.0 + 0.04 * breathe - 0.08 * ring;
  // the glazed edge
  float edge = max(abs(uv.x), abs(uv.y));
  float grout = smoothstep(0.47, 0.5, edge);
  float bevel = smoothstep(0.38, 0.47, edge) * 0.35;
  // the motif: an eight-point star with a centre dot, corner quarter-circles
  float star = sdStar(uv, 0.30, 0.13);
  float dot_ = length(uv) - 0.07;
  float corner = min(min(length(uv - vec2(0.5)), length(uv + vec2(0.5))), min(length(uv - vec2(0.5, -0.5)), length(uv - vec2(-0.5, 0.5)))) - 0.14;
  float aa = 1.5 / tile;
  float inkStar = 1.0 - smoothstep(0.0, aa * 2.0, star);
  float inkDot = 1.0 - smoothstep(0.0, aa * 2.0, dot_);
  float inkCorner = 1.0 - smoothstep(0.0, aa * 2.0, corner);
  vec3 base = mix(uCream, uCream * 0.93, bevel);
  vec3 ink = mix(uBrown, uOrange, step(0.72, h) * 0.9);
  vec3 col = base;
  col = mix(col, ink, inkStar);
  col = mix(col, uCream, inkDot * inkStar);
  col = mix(col, mix(uOrange, uBrown, step(0.5, h)), inkCorner);
  col = mix(col, uDark * 0.9, grout);
  // the glaze highlight travelling across
  float gl = pow(wave, 6.0) * (1.0 - grout) * 0.35;
  col += gl * vec3(1.0, 0.9, 0.8);
  col += ring * 0.25;
  // the field sits in the brown's shadow so the hero text stays readable; the left half (the text) darker
  float vig = smoothstep(1.25, 0.25, length(vUv - 0.5) * 1.3);
  float side = smoothstep(0.15, 0.7, vUv.x);
  col = mix(uDark, col, (0.22 + 0.3 * vig) * (0.55 + 0.45 * side));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export type Azulejo = { setPaused: (v: boolean) => void; dispose: () => void };

export function createAzulejo(canvas: HTMLCanvasElement, host: HTMLElement, opts: { onFirstFrame?: () => void } = {}): Azulejo {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uRes: { value: new Vector2(1, 1) },
    uTime: { value: 0 },
    uPointer: { value: new Vector2(-9999, -9999) },
    uPress: { value: 0 },
    uBrown: { value: [0.0812, 0.0356, 0.0205] },
    uCream: { value: [0.98, 0.95, 0.93] },
    uOrange: { value: [0.745, 0.0595, 0.0015] },
    uDark: { value: [0.0242, 0.0097, 0.0056] },
  };
  const mat = new ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG });
  scene.add(new Mesh(new PlaneGeometry(2, 2), mat));

  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let every = 1;
  let frame = 0;
  let paused = false;
  let visible = true;
  let raf = 0;
  let last = performance.now();
  let t = 0;
  const target = new Vector2(-9999, -9999);
  let press = 0;
  // adaptive quality: average the frame time over 45 frames after a warm-up; lower DPR, then skip frames
  const times: number[] = [];
  let warm = 0;
  const measure = (ms: number) => {
    if (warm++ < 60) return;
    times.push(ms);
    if (times.length < 45) return;
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    times.length = 0;
    if (avg > 22 && dpr > 0.5) {
      dpr = Math.max(0.5, dpr - 0.25);
      resize();
    } else if (avg > 22 && every < 2) every = 2;
    else if (avg < 10 && every > 1) every = 1;
  };
  const resize = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * dpr, h * dpr);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.02 });
  io.observe(host);
  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    target.set((e.clientX - r.left) * dpr, (r.height - (e.clientY - r.top)) * dpr);
    press = 1;
  };
  const onLeave = () => (press = 0);
  host.addEventListener("pointermove", onPointer, { passive: true });
  host.addEventListener("pointerdown", onPointer, { passive: true });
  host.addEventListener("pointerleave", onLeave);
  let first = true;
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (paused || !visible || document.hidden) return;
    if (++frame % every) return;
    t = (t + dt * every) % 24;
    uniforms.uTime.value = t;
    uniforms.uPointer.value.lerp(target, 0.18);
    uniforms.uPress.value += (press - uniforms.uPress.value) * 0.08;
    const s = performance.now();
    renderer.render(scene, camera);
    measure(performance.now() - s);
    if (first) {
      first = false;
      opts.onFirstFrame?.();
    }
  };
  raf = requestAnimationFrame(loop);
  return {
    setPaused: (v) => (paused = v),
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerdown", onPointer);
      host.removeEventListener("pointerleave", onLeave);
      mat.dispose();
      renderer.dispose();
    },
  };
}
