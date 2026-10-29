// "Brasa": a charcoal grill at night. One full-screen quad, one fragment shader: a bed of coal chunks
// (Voronoi cells) whose embers breathe slowly, a heat shimmer above them and sparks drifting up, tinted with
// the site's palette (marca-escura, marca, acento, destaque, branco). The pointer (or a finger) fans the
// embers: they brighten under it and throw sparks.
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uBed;        // top of the ember bed, 0..1 from the bottom
  uniform vec4 uFan[8];      // x, y (buffer px, y up), start time, strength
  uniform vec3 uNight;       // --marca-escura
  uniform vec3 uRed;         // --marca
  uniform vec3 uCoral;       // --acento
  uniform vec3 uGlow;        // --destaque
  uniform vec3 uHot;         // --branco

  float hash1(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  vec2 hash2(vec2 p) { return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash1(i), hash1(i + vec2(1, 0)), u.x), mix(hash1(i + vec2(0, 1)), hash1(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
    return v;
  }

  // the coal: distance to the cell edge (cracks) and the cell's id
  vec3 voronoi(vec2 x) {
    vec2 n = floor(x), f = fract(x);
    vec2 mg, mr;
    float md = 8.0;
    for (int j = -1; j <= 1; j++)
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = hash2(n + g);
        vec2 r = g + o - f;
        float d = dot(r, r);
        if (d < md) { md = d; mr = r; mg = g; }
      }
    md = 8.0;
    for (int j = -1; j <= 1; j++)
      for (int i = -1; i <= 1; i++) {
        vec2 g = mg + vec2(float(i), float(j));
        vec2 o = hash2(n + g);
        vec2 r = g + o - f;
        if (dot(mr - r, mr - r) > 0.00001) md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
      }
    return vec3(md, n + mg);
  }

  // fire colour ramp: 0 cold coal → 1 white-hot
  vec3 fire(float h) {
    vec3 c = mix(uNight * 0.6, uRed, smoothstep(0.05, 0.4, h));
    c = mix(c, uCoral, smoothstep(0.35, 0.62, h));
    c = mix(c, uGlow, smoothstep(0.58, 0.85, h));
    return mix(c, uHot, smoothstep(0.86, 1.05, h));
  }

  void main() {
    vec2 px = gl_FragCoord.xy;
    vec2 uv = px / uRes;
    float aspect = uRes.x / uRes.y;
    float t = uTime;
    vec2 p = vec2(uv.x * aspect, uv.y);

    // the fanning: heat from recent pointer moves and taps
    float fan = 0.0;
    for (int i = 0; i < 8; i++) {
      vec4 f = uFan[i];
      if (f.w <= 0.0) continue;
      float age = t - f.z;
      if (age < 0.0 || age > 3.5) continue;
      vec2 c = vec2(f.x / uRes.x * aspect, f.y / uRes.y);
      // heat spreads down into the bed from where the pointer passed
      vec2 d = p - vec2(c.x, min(c.y, uBed - 0.02));
      fan += f.w * exp(-dot(d, d) / 0.028) * exp(-age * 1.1) * smoothstep(0.0, 0.15, age + 0.1);
    }

    // the top edge of the bed, lumpy
    float edge = uBed + (fbm(vec2(p.x * 3.0, 1.7)) - 0.5) * 0.08;
    float depth = edge - uv.y; // > 0 inside the bed

    // heat shimmer above the bed: the air wobbles
    float above = smoothstep(-0.02, 0.35, -depth);
    vec2 shim = vec2(noise(vec2(p.x * 9.0, p.y * 6.0 - t * 2.2)) - 0.5, 0.0) * 0.012 * (1.0 - above * 0.6) * smoothstep(-0.02, 0.06, -depth);

    // the night above: very dark, warmer near the coals
    vec3 col = mix(uNight * 0.55, uNight * 1.15 + uRed * 0.18, exp(-max(-depth, 0.0) * 4.5));
    col += uRed * 0.22 * exp(-max(-depth, 0.0) * 9.0) * (0.85 + 0.15 * sin(t * 0.7));

    if (depth > -0.01) {
      // the coals: a flat bed seen at an angle (front coals bigger), cells squashed vertically
      float persp = 1.0 / (0.75 + 0.9 * clamp(depth / max(uBed, 0.05), 0.0, 1.0));
      vec2 q = vec2((p.x - 0.5 * aspect) * persp * 13.0 + 40.0, depth * persp * 19.0) + shim * 6.0;
      vec3 v = voronoi(q);
      float crack = v.x;
      vec2 id = v.yz;
      float r = hash1(id);
      float r2 = hash1(id + 7.3);
      // each coal breathes at its own pace; a few are much hotter than the rest
      float breathe = 0.5 + 0.5 * sin(t * (0.3 + r * 0.45) + r * 31.0);
      float slow = 0.5 + 0.5 * sin(t * 0.21 + p.x * 1.7 + depth * 3.0);
      float cellHeat = pow(r2, 1.8) * 0.9 + 0.22 * breathe + 0.14 * slow;
      float hot = clamp(cellHeat + fan * 0.9 + smoothstep(0.0, 0.3, depth) * 0.08, 0.0, 1.35);
      // ash and glowing veins inside the coal
      float n = fbm(q * 2.6 + r * 13.0 + vec2(0.0, t * 0.05));
      float ash = smoothstep(0.45, 0.8, n) * (1.0 - hot * 0.55);
      float veins = smoothstep(0.5, 0.2, abs(n - 0.42) * 3.0);
      vec3 base = mix(vec3(0.055, 0.02, 0.018), mix(uNight * 1.8, vec3(0.36, 0.3, 0.29), 0.5), ash);
      // facets catch a little light from the neighbours
      base *= 0.8 + 0.4 * smoothstep(0.0, 0.25, crack);
      float glowCrack = exp(-crack * (14.0 + r * 10.0)) * (0.35 + 0.65 * hash1(id + floor(q.x * 2.0)));
      float emit = hot * (0.08 + 0.4 * veins) * (1.0 - ash * 0.85) + glowCrack * (0.5 + 0.8 * hot);
      emit *= (0.85 + 0.25 * noise(q * 5.0 + t * 0.8)) * 1.25;
      vec3 coal = mix(base, fire(clamp(emit, 0.0, 0.9)), clamp(emit * 1.35, 0.0, 1.0));
      // the edge of the bed fades into the dark
      float m = smoothstep(-0.01, 0.025, depth);
      col = mix(col, coal, m);
    }

    // sparks: tiny embers drifting up, more where it was fanned
    float sp = 0.0;
    for (int i = 0; i < 26; i++) {
      float fi = float(i);
      float h = hash1(vec2(fi, 3.7));
      float life = 2.6 + h * 3.0;
      float ph = fract((t + h * 17.0) / life);
      float x0 = hash1(vec2(fi, 9.1)) * aspect;
      float y = edge - 0.02 + ph * (1.15 - edge);
      float x = x0 + sin(ph * 6.0 + fi) * 0.05 + (ph * ph) * (h - 0.5) * 0.25;
      vec2 d = (p - vec2(x, y)) * vec2(1.0, 0.38);
      float size = mix(0.006, 0.0022, ph);
      float b = smoothstep(size, 0.0, length(d)) * (1.0 - ph) * smoothstep(0.0, 0.08, ph);
      b *= 0.6 + 0.4 * sin(t * 13.0 + fi * 5.0);
      sp += b;
    }
    // sparks thrown by the fanning
    for (int i = 0; i < 8; i++) {
      vec4 f = uFan[i];
      if (f.w <= 0.0) continue;
      float age = t - f.z;
      if (age < 0.0 || age > 2.4) continue;
      vec2 c = vec2(f.x / uRes.x * aspect, min(f.y / uRes.y, uBed));
      for (int k = 0; k < 6; k++) {
        float fk = float(k);
        float h = hash1(vec2(fk + float(i) * 7.0, f.z));
        vec2 dir = vec2((h - 0.5) * 0.5, 0.35 + h * 0.5);
        vec2 sp0 = c + dir * age + vec2(sin(age * 5.0 + fk) * 0.02, -0.08 * age * age);
        vec2 d = (p - sp0) * vec2(1.0, 0.6);
        float size = 0.0055 * (1.0 - age / 2.4);
        sp += smoothstep(size, 0.0, length(d)) * (1.0 - age / 2.4) * f.w * 1.4;
      }
    }
    col += mix(uGlow, uHot, 0.4) * sp * 1.6;

    // a soft vignette
    vec2 vq = uv - vec2(0.5, 0.35);
    col *= 1.0 - dot(vq, vq) * 0.55;
    gl_FragColor = vec4(col, 1.0);
  }
`;

type Options = { still: boolean; onFirstFrame: () => void };

function softwareGl(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  return /swiftshader|llvmpipe|software|basic render/i.test(name);
}
const rgb = (hex: string) => new THREE.Vector3(...[1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16) / 255));

export function createBrasa(canvas: HTMLCanvasElement, host: HTMLElement, options: Options) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: false });
  const forced = /gl=1/.test(location.search + location.hash);
  const still = options.still || (!forced && softwareGl(renderer.getContext()));
  // embers need no retina pixels: at most 1.5 device pixels per CSS pixel, 1 on wide screens, less on phones
  const cap = Math.min(window.devicePixelRatio || 1, window.innerWidth >= 1600 ? 1 : 1.5);
  let dpr = cap * (window.innerWidth < 700 ? 0.7 : 0.85);
  renderer.setPixelRatio(dpr);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uTime: { value: 12 },
    uRes: { value: new THREE.Vector2() },
    uBed: { value: 0.38 },
    uFan: { value: Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, 0, 0)) },
    uNight: { value: rgb("#310B0A") },
    uRed: { value: rgb("#931A25") },
    uCoral: { value: rgb("#E36C6C") },
    uGlow: { value: rgb("#FFCB8E") },
    uHot: { value: rgb("#FFFBE8") },
  };
  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  const timer = new THREE.Timer();
  timer.connect(document);
  let next = 0;
  let first = true;
  let paused = false;
  let last = { x: -999, y: -999, t: 0 };

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    uniforms.uRes.value.set(width * dpr, height * dpr);
    if (!running) frame();
  };
  const toGl = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return [(e.clientX - rect.left) * dpr, (rect.bottom - e.clientY) * dpr] as const;
  };
  const fan = (x: number, y: number, strength: number) => {
    uniforms.uFan.value[next].set(x, y, uniforms.uTime.value, strength);
    next = (next + 1) % 8;
    if (!running) frame();
  };
  const onMove = (e: PointerEvent) => {
    const [x, y] = toGl(e);
    const now = performance.now();
    if (Math.hypot(x - last.x, y - last.y) > 40 * dpr && now - last.t > 110) {
      fan(x, y, e.pointerType === "mouse" ? 0.55 : 0.8);
      last = { x, y, t: now };
    }
  };
  const onDown = (e: PointerEvent) => {
    if ((e.target as Element).closest("a, button")) return;
    const [x, y] = toGl(e);
    fan(x, y, 1.1);
  };

  // Quality: the average frame time over windows of 45 frames, after a warm-up. Too slow: fewer pixels, down to
  // half; still too slow: a new picture every other frame. Software rendering keeps the still picture.
  let frames = 0;
  let sum = 0;
  let count = 0;
  let stalled = false;
  let every = 1;
  function measure(raw: number) {
    if (++frames < 60) return;
    if (raw > 0.2) stalled = true;
    sum += raw;
    if (++count < 45) return;
    const avg = sum / count;
    if (!stalled && avg > 0.028) {
      if (dpr > 0.5) {
        dpr = Math.max(0.5, dpr * 0.75);
        renderer.setPixelRatio(dpr);
        resize();
      } else every = 2;
    }
    sum = 0;
    count = 0;
    stalled = false;
  }
  function frame() {
    timer.update();
    const raw = timer.getDelta();
    if (!still) {
      uniforms.uTime.value += Math.min(raw, 0.05);
      measure(raw);
      if (every > 1 && frames % every && !first) return;
    }
    renderer.render(scene, camera);
    if (first) {
      first = false;
      options.onFirstFrame();
    }
  }

  let running = false;
  let onScreen = true;
  const sync = () => {
    const should = !still && !paused && onScreen && document.visibilityState === "visible";
    if (should !== running) {
      running = should;
      renderer.setAnimationLoop(should ? frame : null);
    }
  };
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  document.addEventListener("visibilitychange", sync);
  if (!still) {
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onDown);
  }
  resize();
  sync();
  if (still) frame();

  return {
    setPaused(v: boolean) {
      paused = v;
      sync();
      if (!running) frame();
    },
    /** Height of the ember bed (0..1 from the bottom). */
    setBed(v: number) {
      uniforms.uBed.value = v;
      if (!running) frame();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      timer.dispose();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
