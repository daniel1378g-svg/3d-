// The hero background: a glossy açaí surface drawn by one fragment shader on one full-screen triangle (plain
// WebGL 2, no library). A height field of slowly flowing, domain-warped noise is lit like a creamy sorbet (diffuse +
// soft specular), coloured from deep açaí through plum and berry, with thin lilac "cream" streaks folded through it.
// The pointer stirs a gentle swirl into the surface; a tap or click sends out a soft ripple ring. Rendered at a
// fraction of the screen resolution and scaled down further if frames run long; it stops off screen or when paused.

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;   // 0..1, y up
uniform float uStir;     // 0..1 how strongly the pointer stirs
uniform vec4 uRipple[3]; // xy position, z start time, w strength
uniform float uFade;     // scroll: 1 = full, lower = calmer and darker

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = r * p * 2.02 + 3.1; a *= 0.5; }
  return v;
}
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// the surface: returns height and the "cream" marbling coordinate
vec2 surface(vec2 q, float t, vec2 pp, out float ripple) {
  // the pointer stirs: rotate the coordinates around it, strongest close by
  vec2 d = q - pp;
  float r2 = dot(d, d);
  q = pp + rot(uStir * 2.1 * exp(-r2 * 6.0)) * d;
  // slow flow
  vec2 w = vec2(fbm(q * 1.3 + vec2(0.0, t * 0.05)), fbm(q * 1.3 + vec2(5.2, -t * 0.04)));
  vec2 w2 = vec2(fbm(q * 1.7 + 4.0 * w + vec2(1.7, 9.2) + t * 0.03), fbm(q * 1.7 + 4.0 * w + vec2(8.3, 2.8) - t * 0.02));
  float h = fbm(q * 1.35 + 2.8 * w2);
  // ripples
  ripple = 0.0;
  for (int k = 0; k < 3; k++) {
    vec4 rp = uRipple[k];
    float age = t - rp.z;
    if (rp.w > 0.0 && age > 0.0 && age < 3.0) {
      float dist = length(q - rp.xy);
      float front = age * 0.42;
      float env = exp(-pow((dist - front) * 9.0, 2.0)) * (1.0 - age / 3.0);
      ripple += sin((dist - front) * 46.0) * env * rp.w;
    }
  }
  h += ripple * 0.06;
  float cream = w2.x * 2.2 + h * 1.4;
  return vec2(h, cream);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 q = vec2(uv.x * aspect, uv.y) * 1.15;
  vec2 pp = vec2(uPointer.x * aspect, uPointer.y) * 1.15;
  float t = uTime;

  float rip;
  vec2 s0 = surface(q, t, pp, rip);
  float e = 0.004;
  float r1, r2;
  float hx = surface(q + vec2(e, 0.0), t, pp, r1).x;
  float hy = surface(q + vec2(0.0, e), t, pp, r2).x;
  vec3 n = normalize(vec3((s0.x - hx) / e * 0.065, (s0.x - hy) / e * 0.065, 1.0));

  // colour: deep açaí in the valleys, plum and berry on the swells, thin lilac/cream streaks folded through
  vec3 deep = vec3(0.141, 0.063, 0.157);   // #241028
  vec3 plum = vec3(0.388, 0.098, 0.361);   // #63195C
  vec3 berry = vec3(0.518, 0.271, 0.545);  // #84458B
  vec3 lilac = vec3(0.749, 0.545, 0.745);  // #BF8BBE
  vec3 cream = vec3(1.0, 0.969, 0.929);    // #FFF7ED
  float h = s0.x;
  vec3 col = mix(deep, plum, smoothstep(0.25, 0.55, h));
  col = mix(col, berry, smoothstep(0.55, 0.78, h) * 0.85);
  float streak = abs(sin(s0.y * 6.2831));
  float marble = smoothstep(0.93, 0.995, streak) * smoothstep(0.35, 0.65, h);
  col = mix(col, mix(lilac, cream, 0.35), marble * 0.55);

  // light: soft key from the top left, a creamy specular sheen, a little rim from below
  vec3 L = normalize(vec3(-0.45, 0.55, 0.7));
  vec3 V = vec3(0.0, 0.0, 1.0);
  float diff = clamp(dot(n, L), 0.0, 1.0);
  float spec = pow(clamp(dot(reflect(-L, n), V), 0.0, 1.0), 26.0);
  col *= 0.62 + 0.55 * diff;
  col += vec3(1.0, 0.92, 0.98) * spec * 0.34;
  col += lilac * abs(rip) * 0.18;

  // near the pointer the surface catches a bit more light
  float near = exp(-dot(q - pp, q - pp) * 6.0) * uStir;
  col += berry * near * 0.12;

  // vignette, scroll calm, dither against banding
  vec2 vc = uv - vec2(0.5, 0.5);
  col *= 1.0 - dot(vc, vc) * 0.65;
  col = mix(deep * 0.85, col, uFade);
  col += (hash(gl_FragCoord.xy + t) - 0.5) / 255.0 * 2.0;
  o = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

export type AcaiField = {
  stop: () => void;
  setPaused: (p: boolean) => void;
  setVisible: (v: boolean) => void;
  setFade: (f: number) => void;
  pointer: (x: number, y: number, stir: number) => void;
  ripple: (x: number, y: number) => void;
  /** render exactly one frame at time t (reduced motion / still) */
  still: (t: number) => void;
};

export function startAcaiField(canvas: HTMLCanvasElement, opts: { lowPower: boolean }): AcaiField | null {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, powerPreference: "low-power" });
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
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const U = (n: string) => gl.getUniformLocation(prog, n);
  const uRes = U("uRes"), uTime = U("uTime"), uPointer = U("uPointer"), uStir = U("uStir"), uRipple = U("uRipple"), uFade = U("uFade");

  // resolution: a fraction of CSS pixels (the surface is soft), lowered when frames run long
  let scale = opts.lowPower ? 0.4 : 0.55;
  const resize = () => {
    const w = Math.max(1, Math.round(canvas.clientWidth * scale));
    const h = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const target = { x: 0.68, y: 0.55, stir: 0 };
  const cur = { x: 0.68, y: 0.55, stir: 0 };
  const ripples = new Float32Array(12);
  let rippleIdx = 0, fade = 1, paused = false, visible = true, raf = 0, last = 0, time = 0;
  const slow: number[] = [];

  const draw = () => {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, time);
    gl.uniform2f(uPointer, cur.x, cur.y);
    gl.uniform1f(uStir, cur.stir);
    gl.uniform4fv(uRipple, ripples);
    gl.uniform1f(uFade, fade);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    time += dt;
    // critically damped follow, so the stir trails the pointer like a spoon through something thick
    const k = 1 - Math.exp(-dt * 4);
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    cur.stir += (target.stir - cur.stir) * (1 - Math.exp(-dt * 2.5));
    slow.push(dt > 0.026 ? 1 : 0);
    if (slow.length > 30) slow.shift();
    if (slow.length === 30 && slow.reduce((a, b) => a + b, 0) > 20 && scale > 0.22) { scale *= 0.8; slow.length = 0; resize(); }
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
    pointer(x, y, stir) { target.x = x; target.y = y; target.stir = stir; },
    ripple(x, y) {
      const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
      ripples.set([x * aspect * 1.15, y * 1.15, time, 1], (rippleIdx % 3) * 4);
      rippleIdx++;
      if (paused) draw();
    },
    still(t) { time = t; cur.x = target.x; cur.y = target.y; cur.stir = target.stir; draw(); },
  };
}
