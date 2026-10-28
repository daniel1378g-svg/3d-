// The hero's custard: the top of a pastel de nata, warm and glossy, with caramelised blisters and slow bubbles.
// One full-screen quad and one fragment shader. The pointer (or a finger) paints into a small trail canvas that
// the shader reads as extra heat: the custard darkens and bubbles where it passed, then slowly recovers.
// Device pixel ratio is capped at 1.5, the loop stops off-screen and in a hidden tab.
import { CanvasTexture, LinearFilter, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer } from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uRes;
  uniform sampler2D uTrail;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  vec2 hash2(vec2 p) { return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }
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

  // Bubbles: one per cell, each slowly swelling into a dome, then sinking back.
  float bubbles(vec2 p, float t, float heat) {
    vec2 c = floor(p), f = fract(p);
    float h = 0.0;
    for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash2(c + g);
      float phase = hash(c + g + 4.7) * 6.2831;
      float speed = 0.35 + 0.4 * hash(c + g + 9.1);
      float life = max(0.0, sin(t * speed + phase));
      float r = (0.18 + 0.22 * hash(c + g + 2.3)) * life * (0.55 + 0.9 * heat);
      vec2 d = g + 0.5 + 0.35 * (o - 0.5) - f;
      float dist = length(d);
      h = max(h, r > 0.0 ? r * r - dist * dist : 0.0);
    }
    return sqrt(max(h, 0.0));
  }

  float trailAt(vec2 uv) {
    float t = texture(uTrail, uv).r;
    return smoothstep(0.1, 0.9, t); // the canvas fade leaves a faint floor; clip it
  }

  float heightAt(vec2 p, vec2 uv, float t, out float caramel, out float heat) {
    heat = trailAt(uv);
    float base = fbm(p * 1.6 + vec2(t * 0.02, -t * 0.015)) * 0.35;
    // Caramel blisters, like the spots of a nata fresh from a hot oven; heat grows them.
    float spots = fbm(p * 3.4 + 11.0);
    float speck = noise(p * 11.0 + 3.0);
    caramel = smoothstep(0.64 - 0.24 * heat, 0.8 - 0.2 * heat, spots + 0.14 * speck);
    caramel = max(caramel, heat * smoothstep(0.3, 0.72, spots + 0.35 * speck));
    float b = bubbles(p * 2.2, t, heat) * 0.9;
    return base + b + caramel * 0.12;
  }

  void main() {
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2(vUv.x * aspect, vUv.y) * 2.2;
    float t = uTime;

    float car, heat, car2, heat2;
    float h = heightAt(p, vUv, t, car, heat);
    vec2 e = vec2(0.012, 0.0);
    float hx = heightAt(p + e.xy, vUv + vec2(e.x / (2.2 * aspect), 0.0), t, car2, heat2);
    float hy = heightAt(p + e.yx, vUv + vec2(0.0, e.x / 2.2), t, car2, heat2);
    vec3 n = normalize(vec3((h - hx) / e.x, (h - hy) / e.x, 2.4));

    // Custard (sRGB values, linearised below): pale gold where it swells, deeper in the hollows. Caramel goes
    // from an amber halo at the edge of each blister to a burnt, almost black centre, like a nata from a hot oven.
    vec3 custardLight = vec3(0.98, 0.83, 0.42);
    vec3 custardDeep = vec3(0.93, 0.66, 0.2);
    vec3 col = mix(custardDeep, custardLight, smoothstep(0.0, 0.55, h + 0.1));
    float roast = smoothstep(0.0, 1.0, car);
    vec3 amber = vec3(0.78, 0.42, 0.1);
    vec3 brown = vec3(0.42, 0.18, 0.05);
    vec3 burnt = vec3(0.16, 0.06, 0.02);
    vec3 caramelCol = mix(amber, brown, smoothstep(0.25, 0.65, roast + 0.2 * heat));
    caramelCol = mix(caramelCol, burnt, smoothstep(0.82, 1.0, roast + 0.25 * heat) * 0.85);
    col = mix(col, caramelCol, smoothstep(0.0, 0.35, roast) * 0.96);

    // Light from the morning window, top left: soft diffuse, a sharp glossy highlight, a little rim.
    vec3 L = normalize(vec3(-0.45, 0.55, 0.7));
    vec3 V = vec3(0.0, 0.0, 1.0);
    vec3 H = normalize(L + V);
    float diff = 0.72 + 0.38 * max(dot(n, L), 0.0);
    float gloss = mix(160.0, 40.0, roast);
    float spec = pow(max(dot(n, H), 0.0), gloss) * mix(0.55, 0.18, roast);
    float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0) * 0.25;
    col = col * diff + vec3(1.0, 0.96, 0.86) * (spec + fres);

    // A warm vignette, lighter where the words sit (left), so the text keeps its contrast.
    float vign = smoothstep(1.25, 0.25, length((vUv - vec2(0.55, 0.5)) * vec2(aspect, 1.0) * 0.8));
    col *= 0.86 + 0.14 * vign;

    gl_FragColor = vec4(pow(col, vec3(2.2)), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export type CustardHandle = { stop: () => void; poke: (x: number, y: number) => void };

/**
 * Starts the custard on `canvas`, sized to `host`, which also receives the pointer. Calls `onFirstFrame`
 * once the first frame is on screen, so the poster can fade out underneath.
 */
export function mountCustard(host: HTMLElement, canvas: HTMLCanvasElement, onFirstFrame: () => void): CustardHandle {
  const coarse = matchMedia("(pointer: coarse)").matches;
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * (coarse ? 0.75 : 0.9);
  renderer.setPixelRatio(dpr);

  // The trail: a small grey canvas, painted by the pointer and faded a little every frame.
  const trail = document.createElement("canvas");
  trail.width = 192;
  trail.height = 128;
  const ctx = trail.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, trail.width, trail.height);
  const trailTex = new CanvasTexture(trail);
  trailTex.minFilter = LinearFilter;
  trailTex.magFilter = LinearFilter;

  const uniforms = { uTime: { value: 0 }, uRes: { value: new Vector2(1, 1) }, uTrail: { value: trailTex } };
  const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false, depthWrite: false });
  const scene = new Scene();
  scene.add(new Mesh(new PlaneGeometry(2, 2), material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w, h);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  let last: { x: number; y: number } | null = null;
  let warm = 0; // seconds of fading left before the trail is blank again
  const dab = (u: number, v: number, strength: number) => {
    const x = u * trail.width, y = (1 - v) * trail.height;
    const aspect = host.clientWidth / Math.max(host.clientHeight, 1);
    const r = 15;
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, `rgba(255,255,255,${0.5 * strength})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(trail.width / trail.height / aspect, 1); // round on screen whatever the hero's shape
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    warm = 9;
  };
  const toUv = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height };
  };
  const move = (e: PointerEvent) => {
    const p = toUv(e);
    if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) return;
    if (last) {
      const d = Math.hypot(p.x - last.x, p.y - last.y);
      const steps = Math.min(12, Math.ceil(d / 0.012));
      for (let i = 1; i <= steps; i++) dab(last.x + ((p.x - last.x) * i) / steps, last.y + ((p.y - last.y) * i) / steps, 0.55);
    } else dab(p.x, p.y, 0.6);
    last = p;
  };
  const down = (e: PointerEvent) => {
    const p = toUv(e);
    for (let i = 0; i < 3; i++) dab(p.x, p.y, 1);
    last = p;
  };
  const leave = () => (last = null);
  host.addEventListener("pointermove", move, { passive: true });
  host.addEventListener("pointerdown", down, { passive: true });
  host.addEventListener("pointerleave", leave);

  let visible = true;
  let raf = 0;
  let first = true;
  let prev = performance.now();
  let t = Number(new URLSearchParams(location.search).get("t")) || 8 + Math.random() * 20;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !raf) loop();
  });
  io.observe(host);
  const onVis = () => {
    if (!document.hidden && visible && !raf) loop();
  };
  document.addEventListener("visibilitychange", onVis);

  function loop() {
    raf = 0;
    if (!visible || document.hidden) return;
    const now = performance.now();
    const dt = Math.min((now - prev) / 1000, 0.05);
    prev = now;
    t += dt;
    if (warm > 0) {
      ctx.fillStyle = "rgba(0,0,0,0.022)";
      ctx.fillRect(0, 0, trail.width, trail.height);
      trailTex.needsUpdate = true;
      warm -= dt;
    }
    uniforms.uTime.value = t;
    renderer.render(scene, camera);
    if (first) {
      first = false;
      requestAnimationFrame(onFirstFrame);
    }
    raf = requestAnimationFrame(loop);
  }
  loop();

  return {
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointerleave", leave);
      material.dispose();
      trailTex.dispose();
      renderer.dispose();
    },
    poke(x, y) {
      for (let i = 0; i < 3; i++) dab(x, y, 1);
    },
  };
}
