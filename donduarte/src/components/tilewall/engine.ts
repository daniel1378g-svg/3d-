// The hero's azulejo wall: one full-screen quad and a procedural fragment shader. Blue-and-white tiles
// ripple slowly like water, tilt and catch the light under the pointer, and a tap sends out a ripple.
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uTile;
  uniform vec2 uPointer;
  uniform float uHover;
  uniform vec4 uRipples[4];

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float line(float d, float w) { float aa = fwidth(d) * 1.2; return 1.0 - smoothstep(w - aa, w + aa, abs(d)); }
  float disc(float d) { float aa = fwidth(d) * 1.2; return 1.0 - smoothstep(-aa, aa, d); }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    float t = uTime;

    // Slow water: two layers of waves bend the grid.
    vec2 warp = vec2(
      sin(frag.y * 0.010 + t * 0.55) + 0.5 * sin(frag.y * 0.023 - t * 0.37 + frag.x * 0.004),
      cos(frag.x * 0.009 + t * 0.47) + 0.5 * cos(frag.x * 0.019 + t * 0.29 - frag.y * 0.003)
    ) * (uTile * 0.035);

    float rippleGlow = 0.0;
    for (int i = 0; i < 4; i++) {
      vec4 r = uRipples[i];
      if (r.w < 0.5) continue;
      vec2 d = frag - r.xy;
      float dist = length(d);
      float age = t - r.z;
      float ring = exp(-pow((dist - age * uTile * 3.2) / (uTile * 0.45), 2.0)) * exp(-age * 1.3);
      warp += (d / max(dist, 1.0)) * ring * uTile * 0.12;
      rippleGlow += ring;
    }
    vec2 p = frag + warp;

    vec2 cell = floor(p / uTile);
    vec2 uv = fract(p / uTile) * 2.0 - 1.0;
    float h = hash(cell);
    vec2 q = abs(uv);
    if (q.y > q.x) q = q.yx; // eight-fold symmetry
    float r = length(uv);

    // Motif: corner quarter-circles (they join into rings across tiles), a curved four-point star,
    // a central ring and dot, and leaves on the diagonals.
    float corner = length(abs(uv) - 1.0);
    float star = pow(q.x, 0.62) + pow(q.y, 0.62) - 0.78;
    float leaf = abs(q.x - q.y) - 0.07 * (1.0 - smoothstep(0.35, 0.8, r)) * smoothstep(0.32, 0.45, r);

    // White glaze, cobalt #1E4FA3 drawing, light blue #8FA9D9 washes; the blue varies a little per tile.
    vec3 glaze = mix(vec3(1.0), vec3(0.965, 0.975, 0.995), h);
    vec3 cobalt = mix(vec3(0.118, 0.310, 0.639), vec3(0.16, 0.36, 0.69), fract(h * 7.0));
    vec3 pale = vec3(0.561, 0.663, 0.851);
    vec3 col = glaze;
    col = mix(col, pale, disc(corner - 0.46) * 0.55);
    col = mix(col, cobalt, line(corner - 0.46, 0.03));
    col = mix(col, pale, disc(star) * 0.5);
    col = mix(col, cobalt, line(star, 0.022));
    col = mix(col, cobalt, line(r - 0.3, 0.035));
    col = mix(col, cobalt, disc(r - 0.1));
    col = mix(col, cobalt, disc(leaf) * step(0.4, r) * step(r, 0.82));
    float grout = smoothstep(0.955, 0.985, max(abs(uv.x), abs(uv.y)));
    col = mix(col, vec3(0.851, 0.871, 0.902), grout);

    // Each tile is a slightly pillowed glaze; near the pointer it tilts towards it.
    vec2 centre = (cell + 0.5) * uTile - warp;
    vec2 toP = uPointer - centre;
    float near = uHover * exp(-dot(toP, toP) / (uTile * uTile * 5.0));
    vec3 n = normalize(vec3(uv * 0.22 + (toP / uTile) * 0.35 * near, 1.0));
    vec3 l = normalize(vec3(-0.45, 0.55, 0.75));
    float spec = pow(max(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0), 36.0);
    vec3 lp = normalize(vec3(uPointer - frag, uTile * 2.2));
    float spec2 = pow(max(dot(n, normalize(lp + vec3(0.0, 0.0, 1.0))), 0.0), 70.0) * near;
    // Tilted tiles shade a touch on the side away from the light, and the glaze catches a highlight.
    col *= mix(0.9, 1.02, clamp(dot(n, l) * 1.25, 0.0, 1.0));
    col += (spec * 0.08 + spec2 * 0.3 + rippleGlow * 0.05) * (1.0 - grout) * vec3(0.9, 0.95, 1.0);

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

export function createTileWall(canvas: HTMLCanvasElement, host: HTMLElement, options: Options) {
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
    uTime: { value: 8 },
    uRes: { value: new THREE.Vector2() },
    uTile: { value: 120 },
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

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    uniforms.uRes.value.set(width * dpr, height * dpr);
    uniforms.uTile.value = (width < 640 ? 90 : 140) * dpr; // the page tiles: 90 px on phones, 140 px above
    if (!running) frame();
  };
  // Pointer in drawing-buffer pixels, y up, as gl_FragCoord.
  const toGl = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return [(e.clientX - rect.left) * dpr, (rect.bottom - e.clientY) * dpr] as const;
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const [x, y] = toGl(e);
    uniforms.uPointer.value.set(x, y);
    hoverTarget = 1;
  };
  const onLeave = () => (hoverTarget = 0);
  const onDown = (e: PointerEvent) => {
    const [x, y] = toGl(e);
    uniforms.uRipples.value[nextRipple].set(x, y, uniforms.uTime.value, 1);
    nextRipple = (nextRipple + 1) % 4;
    if (e.pointerType === "touch") uniforms.uPointer.value.set(x, y);
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
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * Math.min(1, dt * 6);
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

  return () => {
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
  };
}
