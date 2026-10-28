// The "Mar | Terra" hero: one full-screen quad, one fragment shader, two worlds split by a vertical seam.
// Left of the seam, Atlantic water with moving caustics that ripples under the pointer; right of it,
// charcoal embers with glowing cracks, a grill grate and sparks drifting up, stirred by the pointer.
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uSplit;    // seam position, 0..1 of the width
  uniform float uScale;    // css px to buffer px
  uniform vec2 uPointer;   // buffer px, y up
  uniform float uHover;
  uniform vec4 uRipples[4]; // x, y, start time, active

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 15731.743); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
    return v;
  }
  // Moving cells: x = distance to the nearest point, y = to the second nearest.
  vec2 cells(vec2 p, float t) {
    vec2 i = floor(p), f = fract(p);
    float d1 = 8.0, d2 = 8.0;
    for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash2(i + g);
      o = 0.5 + 0.42 * sin(t + 6.2831 * o);
      float d = length(g + o - f);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
    return vec2(d1, d2);
  }

  vec3 sea(vec2 px, float t) {
    // ripples from taps and the pointer bend the water
    vec2 warp = vec2(0.0);
    float glow = 0.0;
    for (int i = 0; i < 4; i++) {
      vec4 r = uRipples[i];
      if (r.w < 0.5) continue;
      vec2 d = px - r.xy;
      float dist = length(d);
      float age = t - r.z;
      float ring = exp(-pow((dist - age * 260.0 * uScale) / (34.0 * uScale), 2.0)) * exp(-age * 1.4);
      warp += (d / max(dist, 1.0)) * ring * 22.0 * uScale;
      glow += ring;
    }
    vec2 toP = px - uPointer;
    float near = uHover * exp(-dot(toP, toP) / pow(150.0 * uScale, 2.0));
    warp += normalize(toP + 0.001) * sin(length(toP) / (14.0 * uScale) - t * 6.0) * near * 7.0 * uScale;

    vec2 p = (px + warp) / (150.0 * uScale);
    // bend the cells so the lines curve like light coming through moving waves
    p += 0.35 * vec2(sin(p.y * 1.7 + t * 0.6), cos(p.x * 1.4 - t * 0.5));
    p += vec2(fbm(p * 0.6 + t * 0.05), fbm(p * 0.6 - t * 0.04 + 3.0)) * 0.8;
    vec2 c1 = cells(p, t * 0.5);
    vec2 c2 = cells(p * 1.35 + vec2(3.1, 1.7), t * 0.65);
    float w1 = exp(-(c1.y - c1.x) * 13.0);
    float w2 = exp(-(c2.y - c2.x) * 16.0);
    float web = w1 * 0.55 + w2 * 0.35 + w1 * w2 * 1.1; // brighter where the two layers cross

    float depth = px.y / uRes.y; // lighter towards the surface (top)
    float shafts = smoothstep(0.5, 1.0, noise(vec2(px.x / (240.0 * uScale) + px.y / (1100.0 * uScale), t * 0.12)));
    vec3 deep = vec3(0.039, 0.145, 0.2);      // #0A2533
    vec3 atlantic = vec3(0.071, 0.227, 0.302); // #123A4D
    vec3 col = mix(deep, atlantic, smoothstep(0.0, 1.0, depth) * 0.9 + 0.1 * fbm(p * 0.5 + t * 0.03));
    col += vec3(0.42, 0.7, 0.76) * web * (0.12 + 0.26 * depth);
    col += vec3(0.35, 0.6, 0.66) * shafts * depth * 0.1;
    col += vec3(0.6, 0.82, 0.86) * (glow * 0.18 + near * 0.06);
    return col;
  }

  vec3 land(vec2 px, float t) {
    vec2 toP = px - uPointer;
    float stir = uHover * exp(-dot(toP, toP) / pow(170.0 * uScale, 2.0));
    for (int i = 0; i < 4; i++) {
      vec4 r = uRipples[i];
      if (r.w < 0.5) continue;
      float age = t - r.z;
      vec2 d = px - r.xy;
      stir += exp(-dot(d, d) / pow((60.0 + age * 200.0) * uScale, 2.0)) * exp(-age * 1.6) * 1.4;
    }

    // coals: lumps with glowing cracks between them, flickering
    vec2 q = px / (78.0 * uScale);
    vec2 c = cells(q + vec2(0.0, t * 0.02), 0.0);
    float crack = 1.0 - smoothstep(0.02, 0.14 + 0.06 * stir, c.y - c.x);
    float heat = fbm(q * 0.45 + vec2(t * 0.12, -t * 0.18));
    float flicker = 0.65 + 0.35 * noise(q * 2.0 + t * 1.6);
    float base = smoothstep(1.0, 0.0, px.y / uRes.y); // hotter at the bottom
    float glow = crack * flicker * (0.35 + 0.85 * heat) * (0.3 + 0.9 * base) + stir * 0.35 * crack + stir * 0.08;
    vec3 charcoal = vec3(0.106, 0.078, 0.078); // #1B1414
    vec3 col = charcoal * (0.55 + 0.5 * (1.0 - c.x)) * (0.75 + 0.35 * heat);
    vec3 ember = vec3(0.878, 0.38, 0.169);     // #E0612B
    vec3 hot = vec3(1.0, 0.78, 0.42);
    col += mix(ember, hot, clamp(glow - 0.55, 0.0, 1.0)) * glow * 0.9;
    col += ember * base * heat * 0.12;

    // the grill grate
    float bar = abs(fract(px.y / (92.0 * uScale)) - 0.5) * 92.0 * uScale;
    float barMask = 1.0 - smoothstep(4.0 * uScale, 5.5 * uScale, bar);
    vec3 steel = vec3(0.07, 0.055, 0.055) + ember * glow * 0.12 + vec3(0.25, 0.14, 0.09) * smoothstep(5.5 * uScale, 0.0, bar) * 0.25;
    col = mix(col, steel, barMask * 0.92);

    // sparks rising, pushed aside by the pointer
    vec2 push = normalize(toP + 0.001) * stir * 40.0 * uScale;
    for (int l = 0; l < 3; l++) {
      float fl = float(l);
      float size = (70.0 + fl * 45.0) * uScale;
      vec2 sp = px - push * (1.0 - fl * 0.25);
      sp.y -= t * (60.0 + fl * 25.0) * uScale;
      sp.x += sin(sp.y / (90.0 * uScale) + fl * 2.0 + t * 0.7) * 16.0 * uScale;
      vec2 cell = floor(sp / size);
      vec2 local = fract(sp / size);
      vec2 r = hash2(cell + fl * 13.0);
      if (r.x > 0.36) continue;
      vec2 at = vec2(0.2 + 0.6 * r.y, 0.2 + 0.6 * fract(r.x * 7.3));
      float d = length((local - at) * size) / uScale;
      float life = smoothstep(0.0, 0.25, px.y / uRes.y) * (1.0 - smoothstep(0.55, 1.0, px.y / uRes.y));
      float tw = 0.6 + 0.4 * sin(t * 9.0 + r.y * 40.0);
      col += hot * exp(-d * d / (2.2 - fl * 0.5)) * life * tw * 1.3;
      col += ember * exp(-d * d / 26.0) * life * 0.18;
    }
    return col;
  }

  void main() {
    vec2 px = gl_FragCoord.xy;
    float t = uTime;
    float seam = uSplit * uRes.x;
    vec3 col = px.x < seam ? sea(px, t) : land(px, t);
    // a soft shadow along the seam gives the two sides some depth
    float dx = abs(px.x - seam) / uScale;
    col *= 1.0 - 0.35 * exp(-dx / 26.0);
    gl_FragColor = vec4(col, 1.0); // colours are written as display (sRGB) values
  }
`;

type Options = { still: boolean; onFirstFrame: () => void };

/** Software GL (no GPU) would block the main thread on every frame, so it gets the still frame. */
function softwareGl(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  return /swiftshader|llvmpipe|software|basic render/i.test(name);
}

export function createHero(canvas: HTMLCanvasElement, host: HTMLElement, options: Options) {
  const { onFirstFrame } = options;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
  let still = options.still || softwareGl(renderer.getContext());
  // Device pixel ratio capped at 1.5, then lowered while frames run late.
  const cap = Math.min(window.devicePixelRatio || 1, 1.5);
  let dpr = cap;
  renderer.setPixelRatio(dpr);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uTime: { value: 12 },
    uRes: { value: new THREE.Vector2() },
    uSplit: { value: 0.5 },
    uScale: { value: 1 },
    uPointer: { value: new THREE.Vector2(-9999, -9999) },
    uHover: { value: 0 },
    uRipples: { value: Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, 0, 0)) },
  };
  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  const timer = new THREE.Timer();
  timer.connect(document);
  let hoverTarget = 0;
  let nextRipple = 0;
  let first = true;
  let splitTarget = 0.5;

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    uniforms.uRes.value.set(width * dpr, height * dpr);
    uniforms.uScale.value = dpr * (width < 640 ? 0.8 : 1);
    if (!running) frame();
  };
  // Pointer in drawing-buffer pixels, y up, as gl_FragCoord.
  const toGl = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return [(e.clientX - rect.left) * dpr, (rect.bottom - e.clientY) * dpr] as const;
  };
  const onMove = (e: PointerEvent) => {
    const [x, y] = toGl(e);
    uniforms.uPointer.value.set(x, y);
    hoverTarget = 1;
  };
  const onLeave = () => (hoverTarget = 0);
  const onDown = (e: PointerEvent) => {
    if ((e.target as Element).closest("a, button, [role='slider']")) return;
    const [x, y] = toGl(e);
    uniforms.uRipples.value[nextRipple].set(x, y, uniforms.uTime.value, 1);
    nextRipple = (nextRipple + 1) % 4;
    uniforms.uPointer.value.set(x, y);
    hoverTarget = 1;
  };

  let slow = 0;
  let frames = 0;
  function frame() {
    timer.update();
    const raw = timer.getDelta();
    // 20 late frames in the first 120: draw fewer pixels; still late at the floor, stop and keep the frame.
    if (++frames < 120 && raw > 0.034 && ++slow > 20) {
      slow = 0;
      if (dpr > 0.6) {
        dpr = Math.max(0.5, dpr * 0.7);
        renderer.setPixelRatio(dpr);
        resize();
      } else {
        still = true;
        sync();
      }
    }
    const dt = Math.min(raw, 0.05);
    if (!still) uniforms.uTime.value += dt;
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * Math.min(1, dt * 5);
    uniforms.uSplit.value = running ? uniforms.uSplit.value + (splitTarget - uniforms.uSplit.value) * Math.min(1, dt * 18) : splitTarget;
    renderer.render(scene, camera);
    if (first) {
      first = false;
      onFirstFrame();
    }
  }

  // Runs only while the hero is on screen and the tab is visible.
  let running = false;
  let onScreen = true;
  const sync = () => {
    const should = !still && onScreen && document.visibilityState === "visible";
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
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
  }
  resize();
  sync();
  if (still) frame();

  return {
    /** The seam follows the divider; the still frame redraws at once. */
    setSplit(v: number) {
      splitTarget = v;
      if (!running) frame();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      timer.dispose();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
