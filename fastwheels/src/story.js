// Hero and detailing story: one full-screen picture that changes with the scroll position.
// Five stills (dusty → foam → clean → ceramic close-up → motorcycle), each with a small depth map for parallax.
// Plain WebGL, no library, so it starts before the 3D bundle is needed. Draws only when something changes.

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main() { vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tA, tB, dA, dB;
uniform vec2 uRes, uFocusA, uFocusB, uPar;
uniform float uAspect, uSeed, uMix, uMode, uDim, uZoomA, uZoomB;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * noise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; } return s; }

// Screen position -> position in a 16:9 still that covers the canvas, cropped around the shot's subject.
vec2 cover(vec2 uv, vec2 focus) {
  float sa = uRes.x / uRes.y;
  vec2 s = sa < uAspect ? vec2(sa / uAspect, 1.0) : vec2(1.0, uAspect / sa);
  vec2 c = vec2(clamp(focus.x, s.x * 0.5, 1.0 - s.x * 0.5), clamp(focus.y, s.y * 0.5, 1.0 - s.y * 0.5));
  return c + (uv - 0.5) * s;
}
vec3 shot(sampler2D t, sampler2D d, vec2 uv, vec2 focus, float zoom, float blur) {
  vec2 iuv = cover(uv, focus);
  float dep = texture2D(d, iuv).r;
  vec2 q = focus + (iuv - focus) / (1.0 + zoom * (0.6 + 0.8 * dep));     // dolly: near things grow faster
  dep = texture2D(d, q).r;
  q += uPar * (dep - 0.4);                                               // sideways parallax
  vec3 c = texture2D(t, q).rgb;
  if (blur > 0.001) { for (int i = 1; i < 6; i++) c += texture2D(t, mix(q, focus, float(i) / 6.0 * blur)).rgb; c /= 6.0; }
  return c;
}
void main() {
  vec2 uv = vUv;
  float m = uMix, k = m;
  vec3 a, b, rim = vec3(0.0);
  if (uMode > 2.5) {                                                     // cross-zoom: fly into one shot, arrive in the next
    a = shot(tA, dA, uv, uFocusA, uZoomA + m * m * 1.3, m * 0.3);
    b = shot(tB, dB, uv, uFocusB, uZoomB + (1.0 - m) * (1.0 - m) * 0.4, (1.0 - m) * 0.16);
    k = smoothstep(0.36, 0.66, m);
  } else {
    a = shot(tA, dA, uv, uFocusA, uZoomA, 0.0);
    b = shot(tB, dB, uv, uFocusB, uZoomB, 0.0);
    if (uMode > 0.5 && uMode < 1.5) {                                    // snow foam rolls in from the top right
      float g = (uv.x * 0.55 + uv.y * 0.85) / 1.4 + (fbm(uv * vec2(6.0, 4.0) + vec2(0.0, uSeed)) - 0.5) * 0.42;
      float edge = 1.22 - m * 1.5;
      k = smoothstep(edge - 0.05, edge + 0.05, g);
      float rd = (g - edge) / 0.06;
      rim = vec3(0.92, 0.9, 1.0) * exp(-rd * rd) * 0.5 * smoothstep(0.0, 0.08, m) * smoothstep(1.0, 0.9, m);
    } else if (uMode > 1.5) {                                            // rinse: a sheet of water running down
      float g = uv.y + fbm(vec2(uv.x * 9.0, 3.0)) * 0.3 + (fbm(uv * vec2(7.0, 1.6)) - 0.5) * 0.16;
      float edge = 1.3 - m * 1.65;
      k = smoothstep(edge - 0.035, edge + 0.035, g);
      float rd = (g - edge) / 0.03;
      rim = vec3(0.7, 0.82, 1.0) * exp(-rd * rd) * 0.35 * smoothstep(0.0, 0.08, m) * smoothstep(1.0, 0.9, m);
    }
  }
  rim *= clamp(length(a - b) * 2.5, 0.0, 1.0);
  vec3 col = mix(a, b, k) + rim;
  col *= 1.0 - uDim * smoothstep(0.8, 0.0, uv.x) * 0.5;                  // darker side for the text
  vec2 v = uv - 0.5;
  col *= 1.0 - dot(v, v) * 0.55;                                         // vignette
  col += (hash(uv * uRes + 3.7) - 0.5) * 0.024;                          // film grain
  gl_FragColor = vec4(col, 1.0);
}`;

export const SHOTS = ['a_dirty', 'b_foam', 'c_clean', 'e_macro', 'd_bike'];
const MODES = [1, 2, 3, 3];                              // transition into shot 1, 2, 3, 4
const FOCUS = { a_dirty: [0.62, 0.5], b_foam: [0.62, 0.5], c_clean: [0.62, 0.5], e_macro: [0.66, 0.42], d_bike: [0.6, 0.52] };
const FOCUS_TALL_X = { a_dirty: 0.56, b_foam: 0.55, c_clean: 0.56, e_macro: 0.72, d_bike: 0.66 };

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const ease = (v) => v * v * (3 - 2 * v);

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ small: boolean, onReady: () => void }} options  small = load the 1152 px stills
 * @returns {{ setProgress(u: number): void, resize(): void, setVisible(on: boolean): void } | null}  null without WebGL
 */
export function createStory(canvas, { small, onReady }) {
  let gl;
  try { gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false }); } catch { gl = null; }
  if (!gl) return null;

  const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {};
  for (const name of ['tA', 'tB', 'dA', 'dB', 'uRes', 'uFocusA', 'uFocusB', 'uPar', 'uAspect', 'uSeed', 'uMix', 'uMode', 'uDim', 'uZoomA', 'uZoomB']) U[name] = gl.getUniformLocation(program, name);
  gl.uniform1i(U.tA, 0); gl.uniform1i(U.tB, 1); gl.uniform1i(U.dA, 2); gl.uniform1i(U.dB, 3);
  gl.uniform1f(U.uAspect, 2048 / 1158);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  const textures = new Map();
  const loadTexture = (key, url) => new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      textures.set(key, tex);
      resolve(true);
    };
    img.onerror = () => resolve(false);
    img.src = url;
  });
  const loadShot = (name) => Promise.all([loadTexture(name, `img/${name}${small ? '_m' : ''}.webp`), loadTexture(name + ':d', `img/${name}_d.webp`)]);
  const has = (name) => textures.has(name) && textures.has(name + ':d');

  let target = 0, current = 0, raf = 0, visible = true, started = false, lost = false;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const fine = window.matchMedia('(pointer: fine)').matches;

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    const W = Math.round(w * dpr), H = Math.round(h * dpr);
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; gl.viewport(0, 0, W, H); }
    invalidate();
  }
  function bind(unit, key) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, textures.get(key)); }
  function focusOf(name) { const f = FOCUS[name]; return canvas.width / canvas.height < 1 ? [FOCUS_TALL_X[name], f[1]] : f; }

  function draw() {
    const i = Math.min(SHOTS.length - 2, Math.floor(current));
    const a = SHOTS[i], b = has(SHOTS[i + 1]) ? SHOTS[i + 1] : a;
    if (!has(a)) return;
    const local = current - i;
    const m = b === a ? 0 : clamp01((local - 0.22) / 0.56);
    const mode = MODES[i];
    bind(0, a); bind(1, b); bind(2, a + ':d'); bind(3, b + ':d');
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform2f(U.uFocusA, ...focusOf(a));
    gl.uniform2f(U.uFocusB, ...focusOf(b));
    gl.uniform2f(U.uPar, -mouse.x * 0.012, mouse.y * 0.007);
    gl.uniform1f(U.uSeed, i * 1.7);
    gl.uniform1f(U.uMode, mode);
    gl.uniform1f(U.uMix, mode === 3 ? ease(m) : m);
    gl.uniform1f(U.uZoomA, 0.03 + 0.07 * clamp01(local / 0.8));
    gl.uniform1f(U.uZoomB, 0.03);
    gl.uniform1f(U.uDim, canvas.width / canvas.height > 1.1 ? 0.5 : 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!started) { started = true; onReady(); }
  }
  function frame() {
    raf = 0;
    if (!visible || lost) return;
    current += (target - current) * 0.14;
    mouse.x += (mouse.tx - mouse.x) * 0.08; mouse.y += (mouse.ty - mouse.y) * 0.08;
    const moving = Math.abs(target - current) > 0.0008 || Math.abs(mouse.tx - mouse.x) + Math.abs(mouse.ty - mouse.y) > 0.002;
    if (!moving) current = target;
    draw();
    if (moving) raf = requestAnimationFrame(frame);
  }
  function invalidate() { if (!raf && visible && !lost) raf = requestAnimationFrame(frame); }

  if (fine) window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || !visible) return;
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1; mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    invalidate();
  }, { passive: true });
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; canvas.style.display = 'none'; });

  // The first still shows at once; the others load in order while the visitor reads.
  loadShot(SHOTS[0]).then(async () => {
    resize();
    for (const name of SHOTS.slice(1)) { await loadShot(name); invalidate(); }
  });

  return {
    setProgress(u) { target = Math.max(0, Math.min(SHOTS.length - 1, u)); invalidate(); },
    resize,
    setVisible(on) { visible = on; if (on) invalidate(); },
  };
}
