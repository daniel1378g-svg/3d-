// "The Atlantic at dusk": one full-screen quad, one fragment shader. A deep blue-green ocean with a slow
// swell under a dusk sky, foam catching the last warm light and a long gold path of reflections below the
// setting sun. The pointer (or a finger) drops ripples that bend the water and break up the gold.
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uHorizon;   // 0..1 from the bottom
  uniform float uSunX;      // 0..1
  uniform vec4 uRipples[8]; // x, y (buffer px, y up), start time, strength

  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 15731.743); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.07 + 13.7; a *= 0.5; }
    return v;
  }
  // fewer octaves where the shader samples per pixel more than once
  float fbm3(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.07 + 13.7; a *= 0.5; }
    return v / 0.875;
  }

  // the sea surface: a long swell, two wind seas and noise chop (world units, z away from the camera)
  float height(vec2 p, float t) {
    float h = 0.0;
    h += sin(p.y * 0.55 - t * 0.9 + sin(p.x * 0.18 + t * 0.1) * 1.6) * 0.42;
    h += sin(dot(p, vec2(0.62, 0.78)) * 1.35 - t * 1.25) * 0.2;
    h += sin(dot(p, vec2(-0.71, 0.7)) * 2.3 - t * 1.7) * 0.1;
    h += (fbm3(p * vec2(0.9, 0.6) + vec2(t * 0.12, -t * 0.28)) - 0.5) * 0.55;
    return h;
  }

  // small wind chop, used for the normals only: it is what scatters the sun into a long gold path
  float chop(vec2 p, float t) {
    float c = noise(p * 3.1 + vec2(t * 0.7, -t * 1.1)) * 0.5;
    c += noise(p * 6.3 + vec2(-t * 1.3, t * 0.9)) * 0.28;
    c += noise(p * 12.7 + vec2(t * 1.9, t * 1.6)) * 0.14;
    return c;
  }

  // the screen point -> sea point (camera 1.2 above the water, looking at the horizon)
  vec2 toSea(vec2 uv, float aspect) {
    float dy = max(uHorizon - uv.y, 0.0006);
    float z = 0.32 / dy;
    return vec2((uv.x - uSunX) * aspect * z * 0.9, z);
  }

  vec3 skyCol(float k) {
    // k: 0 at the horizon, 1 high up
    vec3 gold = vec3(0.98, 0.76, 0.38);
    vec3 coral = vec3(0.86, 0.45, 0.33);
    vec3 dusk = vec3(0.32, 0.30, 0.50);
    vec3 night = vec3(0.07, 0.14, 0.27);
    vec3 c = mix(gold, coral, smoothstep(0.0, 0.14, k));
    c = mix(c, dusk, smoothstep(0.1, 0.45, k));
    return mix(c, night, smoothstep(0.4, 1.0, k));
  }

  void main() {
    vec2 px = gl_FragCoord.xy;
    vec2 uv = px / uRes;
    float aspect = uRes.x / uRes.y;
    float t = uTime;
    vec2 sun = vec2(uSunX, uHorizon + 0.02);
    vec3 col;

    if (uv.y >= uHorizon) {
      float k = (uv.y - uHorizon) / (1.0 - uHorizon);
      col = skyCol(k);
      vec2 d = (uv - sun) * vec2(aspect, 1.0);
      float r = length(d);
      col += vec3(1.0, 0.82, 0.5) * exp(-r * 9.0) * 0.55;            // the glow
      col = mix(col, vec3(1.0, 0.9, 0.66), smoothstep(0.044, 0.038, r)); // the sun, half set
      // a few long clouds
      float cl = fbm(vec2(uv.x * 2.2 + t * 0.01, uv.y * 14.0));
      col = mix(col, mix(vec3(0.95, 0.55, 0.42), vec3(0.2, 0.22, 0.4), smoothstep(0.1, 0.6, k)), smoothstep(0.55, 0.8, cl) * 0.35 * smoothstep(0.02, 0.2, k));
    } else {
      vec2 p = toSea(uv, aspect);
      float dist = p.y;
      // ripples from the pointer and taps, in sea space so they flatten with distance
      vec2 slopeAdd = vec2(0.0);
      float ringGlow = 0.0;
      for (int i = 0; i < 8; i++) {
        vec4 r = uRipples[i];
        if (r.w <= 0.0) continue;
        float age = t - r.z;
        if (age > 4.0 || age < 0.0) continue;
        vec2 c = toSea(r.xy / uRes, aspect);
        vec2 dd = p - c;
        float ds = length(dd);
        float front = age * 1.6 * (0.5 + 0.12 * c.y);
        float env = exp(-pow((ds - front) / (0.35 + 0.08 * c.y), 2.0)) * exp(-age * 0.9) * r.w;
        float wave = cos((ds - front) * 9.0 / (0.6 + 0.1 * c.y));
        slopeAdd += (dd / max(ds, 0.001)) * wave * env * 0.9;
        ringGlow += max(wave, 0.0) * env;
      }
      // normal from the height field (finite differences widen with distance, a cheap filter)
      float e = 0.04 + dist * 0.006;
      float h = height(p, t);
      float hx = height(p + vec2(e, 0.0), t) - h;
      float hz = height(p + vec2(0.0, e), t) - h;
      float fade = smoothstep(60.0, 6.0, dist); // detail fades towards the horizon
      float ec = 0.03 + dist * 0.004;
      float c0 = chop(p, t);
      float cx = (chop(p + vec2(ec, 0.0), t) - c0) / ec;
      float cz = (chop(p + vec2(0.0, ec), t) - c0) / ec;
      float chopAmt = 0.16 * smoothstep(80.0, 2.0, dist);
      vec3 n = normalize(vec3(-hx / e * 0.7 - cx * chopAmt - slopeAdd.x, 1.0, -hz / e * 0.7 - cz * chopAmt - slopeAdd.y));
      n = normalize(mix(vec3(0.0, 1.0, 0.0), n, 0.45 + 0.55 * fade));

      vec3 view = normalize(vec3(p.x, -1.2, p.y));
      vec3 refl = reflect(view, n);
      vec3 sunDir = normalize(vec3(0.0, 0.05, 1.0));
      float s = max(dot(refl, sunDir), 0.0);
      float column = exp(-pow(p.x / (1.2 + p.y * 0.16), 2.0)); // the path narrows under the sun
      float glitter = pow(s, 700.0) * 7.0 * (0.35 + 0.65 * column) + pow(s, 90.0) * 1.1 * column + pow(s, 14.0) * 0.22 * column;
      float fres = 0.04 + 0.96 * pow(1.0 - max(dot(-view, n), 0.0), 5.0);

      vec3 deep = vec3(0.035, 0.14, 0.19);
      vec3 mid = vec3(0.07, 0.31, 0.36);
      float depthMix = smoothstep(0.0, 0.55, uHorizon - uv.y);
      vec3 water = mix(mid, deep, depthMix) * (0.85 + 0.3 * h);
      vec3 skyR = skyCol(clamp(refl.y * 2.4, 0.0, 1.0));
      col = mix(water, skyR, clamp(fres, 0.0, 1.0) * 0.85);
      col += vec3(1.0, 0.78, 0.42) * glitter;
      // foam on the crests, warm where the light reaches it
      float crest = smoothstep(0.42, 0.7, h + (noise(p * 2.3 + t * 0.2) * 0.67 + noise(p * 4.8 - t * 0.3) * 0.33 - 0.5) * 0.5) * fade;
      vec3 foam = mix(vec3(0.82, 0.86, 0.84), vec3(1.0, 0.82, 0.6), 0.5 + 0.5 * exp(-abs(p.x) * 0.25));
      col = mix(col, foam, crest * 0.5);
      col += vec3(1.0, 0.85, 0.6) * ringGlow * 0.06;
      // haze on the horizon
      col = mix(col, vec3(0.93, 0.62, 0.42), exp(-(uHorizon - uv.y) * 26.0) * 0.75);
    }
    // a soft vignette
    vec2 q = uv - 0.5;
    col *= 1.0 - dot(q, q) * 0.45;
    gl_FragColor = vec4(col, 1.0); // colours are written as display (sRGB) values
  }
`;

type Options = { still: boolean; onFirstFrame: () => void };

function softwareGl(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  return /swiftshader|llvmpipe|software|basic render/i.test(name);
}

export function createOcean(canvas: HTMLCanvasElement, host: HTMLElement, options: Options) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: false });
  const forced = /gl=1/.test(location.search + location.hash);
  const still = options.still || (!forced && softwareGl(renderer.getContext()));
  // soft water needs no retina pixels: at most 1.25 device pixels per CSS pixel, 1 on wide screens, less on phones
  const cap = Math.min(window.devicePixelRatio || 1, window.innerWidth >= 1600 ? 1 : 1.25);
  let dpr = cap * (window.innerWidth < 700 ? 0.75 : 1);
  renderer.setPixelRatio(dpr);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uTime: { value: 18 },
    uRes: { value: new THREE.Vector2() },
    uHorizon: { value: 0.58 },
    uSunX: { value: 0.5 },
    uRipples: { value: Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, 0, 0)) },
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
  const drop = (x: number, y: number, strength: number) => {
    if (y > uniforms.uRes.value.y * uniforms.uHorizon.value) return; // only on the water
    uniforms.uRipples.value[next].set(x, y, uniforms.uTime.value, strength);
    next = (next + 1) % 8;
  };
  const onMove = (e: PointerEvent) => {
    const [x, y] = toGl(e);
    const now = performance.now();
    if (Math.hypot(x - last.x, y - last.y) > 36 * dpr && now - last.t > 90) {
      drop(x, y, e.pointerType === "mouse" ? 0.55 : 0.8);
      last = { x, y, t: now };
    }
  };
  const onDown = (e: PointerEvent) => {
    if ((e.target as Element).closest("a, button")) return;
    const [x, y] = toGl(e);
    drop(x, y, 1.2);
  };

  // Quality: the average frame time over windows of 45 frames, after a warm-up (the page is still loading
  // then). Too slow: fewer pixels, down to half; still too slow: a new picture every other frame. The sea
  // never stops by itself; only software rendering (no graphics card) keeps the still picture.
  let frames = 0;
  let sum = 0;
  let count = 0;
  let stalled = false;
  let every = 1;
  function measure(raw: number) {
    if (++frames < 60) return;
    if (raw > 0.2) stalled = true; // a hidden tab or a long task: this window says nothing about the GPU
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
    /** Pause control: the sea stops on a still frame, or moves again. */
    setPaused(v: boolean) {
      paused = v;
      sync();
      if (!running) frame();
    },
    /** Horizon height (0..1 from the bottom), e.g. lower on tall phone arches. */
    setHorizon(v: number) {
      uniforms.uHorizon.value = v;
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
