// The hero background: a bed of glowing charcoal drawn by one fragment shader on one full-screen triangle (plain
// WebGL 2, no library). Coals are Voronoi cells whose cracks glow and breathe; heat shimmers up into smoke and
// sparks rise. The pointer is a second fire: the coals under it flare, sparks lean towards it, and a tap or click
// sends a pulse of heat through the bed. Rendered at a fraction of the screen resolution (it is soft anyway) and
// scaled down further if frames take too long; it stops when off screen or paused.

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;     // 0..1, y up
uniform float uHeat;       // 0..1 how much the pointer heats
uniform vec4 uPulse[3];    // xy position, z start time, w strength
uniform float uFade;       // scroll: 1 = full, 0 = dark

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}
float hash1(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash1(i), hash1(i + vec2(1, 0)), u.x), mix(hash1(i + vec2(0, 1)), hash1(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 7.1; a *= 0.5; }
  return v;
}
// distance to the nearest cell edge and the cell id
vec3 voronoi(vec2 x) {
  vec2 n = floor(x), f = fract(x);
  vec2 mg, mr; float md = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(i, j);
    vec2 o = hash2(n + g);
    vec2 r = g + o - f;
    float d = dot(r, r);
    if (d < md) { md = d; mr = r; mg = g; }
  }
  md = 8.0;
  for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) {
    vec2 g = mg + vec2(i, j);
    vec2 o = hash2(n + g);
    vec2 r = g + o - f;
    if (dot(mr - r, mr - r) > 0.00001) md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
  }
  return vec3(md, n + mg);
}
vec3 fire(float t) {
  // black → deep red → ember orange → gold
  t = clamp(t, 0.0, 1.4);
  vec3 c = mix(vec3(0.02, 0.012, 0.01), vec3(0.42, 0.04, 0.02), smoothstep(0.0, 0.35, t));
  c = mix(c, vec3(0.95, 0.30, 0.06), smoothstep(0.3, 0.75, t));
  c = mix(c, vec3(1.0, 0.72, 0.30), smoothstep(0.7, 1.15, t));
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 q = vec2(uv.x * aspect, uv.y);
  vec2 pp = vec2(uPointer.x * aspect, uPointer.y);
  float t = uTime;

  // heat from the pointer and the pulses
  float dp = length(q - pp);
  float heat = uHeat * exp(-dp * dp * 9.0);
  for (int k = 0; k < 3; k++) {
    vec4 pu = uPulse[k];
    float age = t - pu.z;
    if (pu.w > 0.0 && age > 0.0 && age < 2.4) {
      float r = length(q - vec2(pu.x * aspect, pu.y));
      float ring = exp(-pow((r - age * 0.55) * 7.0, 2.0)) * (1.0 - age / 2.4);
      heat += ring * pu.w * 0.9 + exp(-r * r * 30.0) * max(0.0, 1.0 - age * 1.6) * pu.w;
    }
  }

  // the coal bed: lower part of the screen, perspective-squashed rows
  float bed = smoothstep(0.62, 0.0, uv.y);
  vec2 cq = vec2(q.x * 8.5, (q.y * 13.0) / (0.5 + uv.y * 1.4));
  cq += (vec2(fbm(cq * 0.7), fbm(cq * 0.7 + 4.3)) - 0.5) * 1.6;   // warp the cells into irregular lumps
  vec3 v = voronoi(cq + vec2(0.0, t * 0.015));
  float id = hash1(v.yz);
  float breathe = 0.55 + 0.45 * sin(t * (0.6 + id * 1.3) + id * 40.0);
  float edgeNoise = fbm(cq * 3.1 + id * 7.0);
  float gap = 0.05 + 0.09 * edgeNoise;                           // cracks vary in width along their length
  float crack = smoothstep(gap, 0.0, v.x) * (0.45 + 0.55 * smoothstep(0.25, 0.7, edgeNoise));
  float hot = step(0.62, id);                                    // some lumps glow through, most are dark
  float body = smoothstep(0.0, 0.45, v.x) * (0.15 + 0.85 * fbm(cq * 2.6 + id * 13.0)) * (0.35 + hot * 1.1); // coal surface
  float glow = fbm(q * 3.0 + vec2(0.0, -t * 0.25)) * 0.9;
  float temp = bed * (crack * (0.55 + 0.5 * breathe) + body * 0.18 * breathe + glow * 0.25);
  temp += heat * (bed * 0.9 + 0.25) * (0.6 + crack);

  vec3 col = fire(temp);
  // ash on the coal tops
  col = mix(col, vec3(0.13, 0.11, 0.1), bed * smoothstep(0.25, 0.5, v.x) * 0.35 * (1.0 - heat));

  // heat haze and smoke above the bed
  float smoke = fbm(vec2(q.x * 1.6, q.y * 1.3 - t * 0.12) + fbm(q * 2.0 + t * 0.05));
  col += vec3(0.32, 0.12, 0.05) * smoke * smoothstep(0.95, 0.15, uv.y) * 0.22;
  col += vec3(0.9, 0.35, 0.08) * exp(-uv.y * 5.0) * 0.18;     // glow on the air just above the coals
  col += vec3(1.0, 0.45, 0.12) * heat * 0.25;                  // the pointer's light on the smoke

  // sparks: one per cell of a rising grid, swaying, leaning to the pointer
  for (int layer = 0; layer < 2; layer++) {
    float sc = layer == 0 ? 14.0 : 24.0;
    float sp = layer == 0 ? 0.09 : 0.06;
    vec2 g = vec2(q.x * sc, (q.y - t * sp) * sc);
    vec2 gi = floor(g);
    float h = hash1(gi + float(layer) * 31.0);
    if (h > 0.82) {
      vec2 c = vec2(0.5 + 0.35 * sin(t * 1.3 + h * 50.0), fract(h * 91.0));
      vec2 lean = (pp - q) * heat * 2.5 * sc;
      vec2 d = fract(g) - c - lean * 0.02;
      float s = exp(-dot(d, d) * (layer == 0 ? 90.0 : 160.0));
      float life = smoothstep(1.0, 0.25, uv.y) * (0.5 + 0.5 * sin(t * 6.0 + h * 80.0));
      col += vec3(1.0, 0.55, 0.18) * s * life * (layer == 0 ? 1.4 : 0.9);
    }
  }

  // vignette, scroll fade, a little grain against banding
  vec2 vc = uv - vec2(0.5, 0.45);
  col *= 1.0 - dot(vc, vc) * 0.9;
  col *= uFade;
  col += (hash1(gl_FragCoord.xy + t) - 0.5) / 255.0 * 2.0;
  o = vec4(pow(max(col, 0.0), vec3(1.0 / 1.1)), 1.0);
}`;

export type EmberField = {
  stop: () => void;
  setPaused: (p: boolean) => void;
  setVisible: (v: boolean) => void;
  setFade: (f: number) => void;
  pointer: (x: number, y: number, heat: number) => void;
  pulse: (x: number, y: number) => void;
  /** render exactly one frame at time t (reduced motion / still) */
  still: (t: number) => void;
};

export function startEmberField(canvas: HTMLCanvasElement, opts: { lowPower: boolean }): EmberField | null {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, powerPreference: "low-power", preserveDrawingBuffer: false });
  if (!gl) return null;
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  };
  const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, "p");
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const U = (n: string) => gl.getUniformLocation(prog, n);
  const uRes = U("uRes"), uTime = U("uTime"), uPointer = U("uPointer"), uHeat = U("uHeat"), uPulse = U("uPulse"), uFade = U("uFade");

  // resolution: a fraction of CSS pixels, lowered when frames are slow
  let scale = opts.lowPower ? 0.38 : 0.6;
  const resize = () => {
    const w = Math.max(1, Math.round(canvas.clientWidth * scale));
    const h = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // pointer: target and smoothed value (critically damped follow)
  const target = { x: 0.5, y: 0.25, heat: 0 };
  const cur = { x: 0.5, y: 0.25, heat: 0 };
  const pulses = new Float32Array(12);
  let pulseIdx = 0;
  let fade = 1;
  let paused = false, visible = true, raf = 0, last = 0, time = 0;
  const slow: number[] = [];

  const draw = () => {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, time);
    gl.uniform2f(uPointer, cur.x, cur.y);
    gl.uniform1f(uHeat, cur.heat);
    gl.uniform4fv(uPulse, pulses);
    gl.uniform1f(uFade, fade);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    time += dt;
    const k = 1 - Math.exp(-dt * 6);
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    cur.heat += (target.heat - cur.heat) * (1 - Math.exp(-dt * 3));
    // adaptive resolution: if most of the last 30 frames took over 26 ms, render smaller
    slow.push(dt > 0.026 ? 1 : 0);
    if (slow.length > 30) slow.shift();
    if (slow.length === 30 && slow.reduce((a, b) => a + b, 0) > 20 && scale > 0.26) { scale *= 0.8; slow.length = 0; resize(); }
    draw();
  };
  const run = () => {
    cancelAnimationFrame(raf);
    if (!paused && visible) { last = 0; raf = requestAnimationFrame(frame); }
  };
  run();

  return {
    stop() { cancelAnimationFrame(raf); ro.disconnect(); gl.getExtension("WEBGL_lose_context")?.loseContext(); },
    setPaused(p) { paused = p; run(); },
    setVisible(v) { visible = v; run(); },
    setFade(f) { fade = f; if (paused || !visible) draw(); },
    pointer(x, y, heat) { target.x = x; target.y = y; target.heat = heat; },
    pulse(x, y) {
      pulses.set([x, y, time, 1], (pulseIdx % 3) * 4);
      pulseIdx++;
      if (paused) draw();
    },
    still(t) { time = t; cur.x = target.x; cur.y = target.y; draw(); },
  };
}
