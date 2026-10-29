// "Douro at dusk": one full-screen fragment shader. A dusk sky over the Ribeira, the town's lit windows,
// the Dom Luís I bridge in silhouette, and dark water carrying long, warm, broken reflections that move
// slowly. The pointer (or a finger) drops ripples that bend the reflections. Procedural, no textures.
import * as THREE from "three";

const RIPPLES = 10;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uScroll;
  uniform float uFocus;
  uniform vec4 uRipples[${RIPPLES}];
  varying vec2 vUv;

  const float H = 0.5;          // horizon, in screen height units from the bottom

  float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  // ---- the view above the water: x in aspect units around the centre, y from the bottom ----
  vec3 skyColor(vec2 p) {
    float t = clamp((p.y - H) / (1.0 - H), 0.0, 1.0);
    vec3 low = vec3(0.98, 0.58, 0.27);
    vec3 mid = vec3(0.56, 0.24, 0.30);
    vec3 top = vec3(0.07, 0.09, 0.24);
    vec3 col = mix(low, mid, smoothstep(0.0, 0.32, t));
    col = mix(col, top, smoothstep(0.22, 0.95, t));
    float glow = exp(-length((p - vec2(0.42, H + 0.03)) * vec2(1.0, 2.6)) * 3.2);
    col += vec3(1.0, 0.62, 0.28) * glow * 0.55;
    float c = fbm(vec2(p.x * 1.4 + uTime * 0.008, p.y * 7.0));
    col = mix(col, col * 0.72 + vec3(0.18, 0.07, 0.10), smoothstep(0.52, 0.82, c) * (1.0 - t) * 0.55);
    float star = step(0.9975, hash(floor(p * vec2(220.0, 220.0)))) * smoothstep(0.55, 1.0, t);
    col += star * (0.5 + 0.5 * sin(uTime * 2.0 + p.x * 40.0)) * 0.6;
    return col;
  }

  // The Ribeira: a low hillside of narrow houses climbing from the quay, lit window by window.
  float hill(float x) {
    return H + 0.03 + 0.12 * smoothstep(-1.5, 0.35, -abs(x + 0.35)) + 0.05 * smoothstep(0.2, 1.4, x) + 0.02 * noise(vec2(x * 2.4, 2.0));
  }
  float roofs(float x) {
    float b = floor(x * 46.0);
    return hill(x) + 0.006 + hash(vec2(b, 7.0)) * 0.022;
  }
  vec3 facade(float x) {
    float k = hash(vec2(floor(x * 46.0), 13.0));
    vec3 tint = k < 0.33 ? vec3(0.55, 0.38, 0.20) : k < 0.66 ? vec3(0.22, 0.30, 0.52) : vec3(0.52, 0.20, 0.18);
    return tint;
  }
  // 1.0 inside a lit window, with a slow flicker
  float windowLight(vec2 p) {
    vec2 g = vec2(p.x * 170.0, (p.y - H) * 210.0);
    vec2 cell = floor(g);
    vec2 f = fract(g);
    float lit = step(0.8, hash(cell + 3.7));
    float flick = 0.7 + 0.3 * sin(uTime * (0.5 + hash(cell) * 1.2) + hash(cell) * 6.28);
    float shape = step(0.3, f.x) * step(f.x, 0.7) * step(0.25, f.y) * step(f.y, 0.75);
    return lit * flick * shape;
  }
  /** How much window light the hillside throws down onto the water at this x. */
  float column(float x) {
    float s = 0.0;
    for (int i = 0; i < 7; i++) {
      float y = H + 0.012 + float(i) * 0.016;
      s += windowLight(vec2(x, y)) * step(y, roofs(x) - 0.004);
    }
    return s / 3.0;
  }

  // Ponte Dom Luís I: one wide iron arch, the upper deck on top, the lower deck near the water.
  float bridgeMask(vec2 p, out float lamp) {
    lamp = 0.0;
    float c = -0.06, w = 0.62, top = H + 0.33;
    float dx = (p.x - c) / w;
    float archY = H + 0.005 + (top - H - 0.012) * (1.0 - dx * dx);
    float slope = abs(-2.0 * dx / w * (top - H));
    float archD = abs(p.y - archY) / sqrt(1.0 + slope * slope);
    float m = 0.0;
    m = max(m, (1.0 - smoothstep(0.004, 0.0065, archD)) * step(abs(dx), 1.0));
    float deckY = top + 0.012;
    m = max(m, step(abs(p.y - deckY), 0.008) * step(abs(p.x - c), w + 0.18));
    m = max(m, step(abs(p.y - (H + 0.045)), 0.005) * step(abs(p.x - c), w * 0.93));
    // hangers between the arch and the upper deck
    float post = abs(fract((p.x - c) * 16.0) - 0.5);
    m = max(m, step(post, 0.04) * step(archY, p.y) * step(p.y, deckY) * step(abs(dx), 1.0));
    // pillars at both ends
    m = max(m, step(abs(abs(p.x - c) - (w + 0.02)), 0.022) * step(p.y, deckY) * step(H, p.y));
    // lamps along the upper deck
    float lx = fract((p.x - c) * 9.0) - 0.5;
    lamp = exp(-(lx * lx * 900.0 + pow((p.y - deckY - 0.016) * 160.0, 2.0))) * step(abs(p.x - c), w + 0.16);
    return m;
  }

  vec3 view(vec2 p, float lights) {
    vec3 col = skyColor(p);
    float lamp;
    float r = roofs(p.x);
    if (p.y < r) {
      float depth = clamp((r - p.y) / 0.2, 0.0, 1.0);
      col = mix(vec3(0.12, 0.08, 0.13) + facade(p.x) * 0.12, vec3(0.045, 0.045, 0.08), depth);
      col += vec3(1.0, 0.72, 0.34) * windowLight(p) * lights;
    }
    float b = bridgeMask(p, lamp);
    col = mix(col, vec3(0.035, 0.035, 0.06), b);
    col += vec3(1.0, 0.78, 0.42) * lamp * 1.2 * lights;
    return col;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 uv = vUv;
    // the view drifts gently as the story scrolls
    // portrait screens step back a little so the bridge still fits
    float zoom = aspect < 1.0 ? 1.55 : 1.0;
    vec2 p = vec2((uv.x - 0.5) * aspect * zoom + uScroll * 0.18, uv.y);
    vec3 col;

    if (p.y >= H) {
      col = view(p, 1.0);
    } else {
      float d = H - p.y;                       // depth below the horizon
      vec2 disp = vec2(0.0);
      float crest = 0.0;
      for (int i = 0; i < ${RIPPLES}; i++) {
        vec4 r = uRipples[i];
        float age = uTime - r.z;
        if (r.w <= 0.0 || age < 0.0 || age > 5.0) continue;
        vec2 q = (uv - r.xy) * vec2(aspect, 1.0);
        float dist = length(q);
        float wave = sin(dist * 110.0 - age * 9.0) * exp(-dist * 7.0) * exp(-age * 1.1) * r.w;
        disp += (dist > 0.0001 ? q / dist : vec2(0.0)) * wave * 0.02;
        crest += max(wave, 0.0) * exp(-dist * 4.0);
      }
      float swell = fbm(vec2(p.x * 2.0, d * 16.0 - uTime * 0.3));
      vec2 wp = p;
      wp.x += (swell - 0.5) * (0.008 + d * 0.06) + disp.x;
      // a soft, dark mirror of the sky, the hillside and the bridge
      float my = H + d * 0.85 + disp.y;
      float wob = (noise(vec2(p.x * 5.0, d * 60.0 - uTime * 0.8)) - 0.5) * 0.02;
      vec3 mirror = (view(vec2(wp.x - 0.022, my + wob), 0.0) + view(vec2(wp.x, my - wob), 0.0) + view(vec2(wp.x + 0.022, my + wob), 0.0)) / 3.0;
      vec3 water = mix(vec3(0.012, 0.022, 0.055), vec3(0.05, 0.055, 0.12), smoothstep(0.0, H, p.y));
      float fres = mix(0.1, 0.42, smoothstep(0.0, 0.3, 1.0 - d / H));
      col = water + mirror * fres;
      // long, warm, broken reflections of the windows and the bridge lamps
      float breakup = smoothstep(0.38, 0.72, noise(vec2(wp.x * 5.0, d * 210.0 - uTime * 1.7)));
      float breakup2 = smoothstep(0.4, 0.9, noise(vec2(wp.x * 3.0 + 7.0, d * 90.0 - uTime * 0.9)));
      float c = (column(wp.x) + column(wp.x - 0.0025) * 0.6 + column(wp.x + 0.0025) * 0.6) / 2.2;
      float lc = fract((wp.x + 0.06) * 9.0) - 0.5;
      float lampCol = exp(-lc * lc * 500.0) * step(abs(wp.x + 0.06), 0.78);
      float fade = exp(-d * 2.4);
      vec3 warm = vec3(1.0, 0.68, 0.32);
      col += warm * (c * 1.35 + lampCol * 0.8) * fade * mix(breakup, 1.0, 0.08) * (0.65 + 0.35 * breakup2);
      // the sunset's glitter path
      col += vec3(1.0, 0.55, 0.25) * exp(-abs(wp.x - 0.42) * 9.0) * breakup * exp(-d * 4.0) * 0.45;
      col += vec3(1.0, 0.8, 0.5) * crest * 0.2;
      col += vec3(1.0, 0.6, 0.3) * exp(-d * 240.0) * 0.2;
    }

    // vignette and a whisper of grain
    vec2 v = uv - 0.5;
    col *= 1.0 - dot(v, v) * 0.55;
    col += (hash(uv * uRes + uTime) - 0.5) * 0.025;
    col *= mix(0.92, 1.0, uFocus);
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

export type Douro = {
  resize: (w: number, h: number) => void;
  ripple: (x: number, y: number, strength?: number) => void;
  setScroll: (p: number) => void;
  setRunning: (on: boolean) => void;
  /** Draws one frame at a given time (used for the still image). */
  renderAt: (t: number) => void;
  dispose: () => void;
};

export function createDouro(canvas: HTMLCanvasElement): Douro {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uScroll: { value: 0 },
    uFocus: { value: 1 },
    uRipples: { value: Array.from({ length: RIPPLES }, () => new THREE.Vector4(0, 0, -10, 0)) },
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthTest: false, depthWrite: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const timer = new THREE.Timer();
  timer.connect(document);
  let next = 0;
  let running = false;
  let scroll = 0;

  const frame = () => {
    timer.update();
    uniforms.uTime.value = timer.getElapsed() + 40;
    uniforms.uScroll.value += (scroll - uniforms.uScroll.value) * 0.08;
    renderer.render(scene, camera);
  };

  return {
    resize(w, h) {
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
      if (!running) renderer.render(scene, camera);
    },
    ripple(x, y, strength = 1) {
      const r = uniforms.uRipples.value[next];
      r.set(x, y, uniforms.uTime.value, strength);
      next = (next + 1) % RIPPLES;
    },
    setScroll(p) {
      scroll = p;
    },
    setRunning(on) {
      if (on === running) return;
      running = on;
      renderer.setAnimationLoop(on ? frame : null);
    },
    renderAt(t) {
      uniforms.uTime.value = t;
      renderer.render(scene, camera);
    },
    dispose() {
      renderer.setAnimationLoop(null);
      timer.dispose();
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    },
  };
}
