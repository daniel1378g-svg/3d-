// The "Pizza | Parrilla" hero: one full-screen quad, one fragment shader, two fires split by a vertical seam.
// Left of the seam, the glow of a wood-fired pizza oven with flickering flames and drifting flour dust;
// right of it, the Oasis parrilla: embers with glowing cracks, a grill grate and rising sparks under a row
// of cinema-marquee bulbs (a nod to the old Kino Rex). The pointer fans the flames and stirs the embers.
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
  uniform vec4 uRipples[4]; // taps: x, y, start time, active

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

  // Left: the mouth of a wood-fired pizza oven. Flames lick up from the floor, brick courses catch the
  // glow, flour dust drifts through the light. The pointer fans the flames.
  vec3 oven(vec2 px, float t) {
    vec2 toP = px - uPointer;
    float fan = uHover * exp(-dot(toP, toP) / pow(190.0 * uScale, 2.0));
    for (int i = 0; i < 4; i++) {
      vec4 r = uRipples[i];
      if (r.w < 0.5) continue;
      float age = t - r.z;
      vec2 d = px - r.xy;
      fan += exp(-dot(d, d) / pow((80.0 + age * 160.0) * uScale, 2.0)) * exp(-age * 1.4) * 1.2;
    }
    float y = px.y / uRes.y;
    float cx = max(uSplit, 0.2) * uRes.x * 0.5; // the fire sits in the middle of its side
    float x = (px.x - cx) / uRes.y;

    // brick courses, warmer near the fire
    vec2 b = px / (vec2(64.0, 26.0) * uScale);
    b.x += step(1.0, mod(floor(b.y), 2.0)) * 0.5;
    vec2 bf = fract(b);
    float mortar = 1.0 - smoothstep(0.0, 0.06, min(min(bf.x, 1.0 - bf.x) * 2.4, min(bf.y, 1.0 - bf.y)));
    float brickTone = 0.75 + 0.25 * hash(floor(b));
    float light = exp(-pow(x * 1.7, 2.0)) * (0.35 + 0.65 * smoothstep(1.0, 0.0, y));
    vec3 brick = vec3(0.26, 0.09, 0.06) * brickTone * (1.0 - mortar * 0.7);
    vec3 col = mix(vec3(0.07, 0.04, 0.035), brick, 0.25 + 0.75 * light);

    // flames: a noise field rising from the floor, taller where the pointer fans them
    float flick = 0.08 * sin(t * 7.0 + x * 9.0) + 0.05 * sin(t * 11.3 - x * 5.0);
    float n = fbm(vec2(x * 7.0, y * 3.0 - t * 2.2)) + 0.5 * fbm(vec2(x * 15.0 + 3.0, y * 6.5 - t * 3.6));
    float height = 0.3 * exp(-pow(x * 2.6, 2.0)) + 0.04 + fan * 0.16 + flick * 0.7;
    float f = clamp((height - y + n * 0.3 - 0.12) * 3.0, 0.0, 1.0);
    f *= smoothstep(0.7, 0.2, abs(x) * 1.4);
    vec3 deep = vec3(0.55, 0.08, 0.05);   // oven red
    vec3 orange = vec3(0.95, 0.42, 0.08);
    vec3 yellow = vec3(1.0, 0.8, 0.32);
    vec3 fire = mix(deep, orange, smoothstep(0.1, 0.5, f));
    fire = mix(fire, yellow, smoothstep(0.6, 0.95, f));
    fire = mix(fire, vec3(1.0, 0.95, 0.8), smoothstep(0.97, 1.0, f) * 0.5);
    col = mix(col, fire, smoothstep(0.0, 0.25, f));
    col += orange * 0.12 * exp(-pow(x * 1.3, 2.0)) * smoothstep(0.9, 0.0, y);

    // flour dust drifting through the light
    vec2 push = normalize(toP + 0.001) * fan * 30.0 * uScale;
    for (int l = 0; l < 2; l++) {
      float fl = float(l);
      float size = (58.0 + fl * 40.0) * uScale;
      vec2 sp = px - push;
      sp.y += t * (9.0 + fl * 6.0) * uScale;
      sp.x += sin(sp.y / (70.0 * uScale) + fl * 3.0 + t * 0.4) * 22.0 * uScale + t * 6.0 * uScale;
      vec2 cell = floor(sp / size);
      vec2 local = fract(sp / size);
      vec2 r = hash2(cell + fl * 31.0);
      if (r.x > 0.45) continue;
      vec2 at = vec2(0.2 + 0.6 * r.y, 0.2 + 0.6 * fract(r.x * 9.1));
      float d = length((local - at) * size) / uScale;
      col += vec3(1.0, 0.93, 0.82) * exp(-d * d / (1.6 + fl)) * (0.25 + 0.75 * light) * 0.55;
    }
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
    float crack = 1.0 - smoothstep(0.015, 0.075 + 0.05 * stir, c.y - c.x);
    float heat = fbm(q * 0.45 + vec2(t * 0.12, -t * 0.18));
    float flicker = 0.65 + 0.35 * noise(q * 2.0 + t * 1.6);
    float base = smoothstep(1.0, 0.0, px.y / uRes.y); // hotter at the bottom
    float hotMask = smoothstep(0.38, 0.72, heat);
    float glow = crack * flicker * (0.12 + 1.25 * hotMask) * (0.35 + 0.9 * base) + stir * 0.45 * crack + stir * 0.08;
    vec3 charcoal = vec3(0.106, 0.078, 0.078); // #1B1414
    vec3 col = charcoal * (0.35 + 0.45 * (1.0 - c.x)) * (0.7 + 0.4 * heat);
    col += vec3(0.5, 0.16, 0.05) * pow(1.0 - c.x, 3.0) * base * heat * 0.35; // lumps glowing from inside
    vec3 ember = vec3(0.86, 0.4, 0.15);
    vec3 hot = vec3(1.0, 0.78, 0.42);
    col += mix(ember, hot, clamp(glow - 0.5, 0.0, 1.0)) * glow * 1.15;
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

    // Kino Rex marquee: a row of warm bulbs along the top, chasing to the right
    float gap = 44.0 * uScale;
    float rowY = uRes.y - 30.0 * uScale;
    float idx = floor(px.x / gap);
    vec2 bc = vec2((idx + 0.5) * gap, rowY);
    float bd = length(px - bc) / uScale;
    float on = 0.35 + 0.65 * step(0.5, fract(t * 1.2 - idx * 0.25));
    vec3 bulb = vec3(1.0, 0.86, 0.55);
    col += bulb * (exp(-bd * bd / 18.0) * 1.4 + exp(-bd * bd / 600.0) * 0.18) * on;
    col = mix(col, vec3(0.09, 0.07, 0.06), (1.0 - smoothstep(0.0, 2.0 * uScale, abs(px.y - rowY + 20.0 * uScale))) * 0.6);
    return col;
  }

  void main() {
    vec2 px = gl_FragCoord.xy;
    float t = uTime;
    float seam = uSplit * uRes.x;
    vec3 col = px.x < seam ? oven(px, t) : land(px, t);
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
  let forced = options.still || softwareGl(renderer.getContext());
  let still = forced;
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
        still = forced = true;
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
    /** The pause button: stops the loop and keeps the current frame. */
    setPaused(v: boolean) {
      still = v || forced;
      sync();
      if (still) frame();
    },
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
