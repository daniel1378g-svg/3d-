// The whole picture is one full-screen quad. Two stills (each with a depth map) are shown through
// a virtual camera: the depth map pushes near pixels further than far ones, so a dolly or a mouse
// move reads as real parallax. Transitions between the two stills, the smoke, the whiteout and
// the grade all happen here.

export const vertex = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tA, tB, dA, dB;
uniform vec2 uRes, uFocusA, uFocusB, uPar;
uniform float uAspect, uTime, uMix, uMode, uWhite, uSmoke, uDim, uZoomA, uZoomB, uFade, uWideA, uWideB;
uniform vec3 uTint;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * noise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; } return s; }

// Screen position -> position in a 16:9 still that covers the screen. On screens narrower than
// the still, the crop is centred on the shot's subject instead of the middle of the picture.
// 'wide' (0..1) is the least share of the still's width that must stay visible. On a tall phone
// screen a wide shot would otherwise be cropped to a sliver, so the still is shown smaller and
// the space above and below is filled with its own mirror image, fading to black.
vec2 cover(vec2 uv, vec2 focus, float wide) {
  float sa = uRes.x / uRes.y;
  vec2 s = sa < uAspect ? vec2(sa / uAspect, 1.0) : vec2(1.0, uAspect / sa);
  if (s.x < wide) s = vec2(wide, wide * uAspect / sa);
  vec2 c = vec2(clamp(focus.x, min(0.5, s.x * 0.5), max(0.5, 1.0 - s.x * 0.5)), s.y > 1.0 ? 0.5 : clamp(focus.y, s.y * 0.5, 1.0 - s.y * 0.5));
  return c + (uv - 0.5) * s;
}

vec3 shot(sampler2D t, sampler2D d, vec2 uv, vec2 focus, float zoom, float blur, float wide) {
  vec2 iuv = cover(uv, focus, wide);
  float over = max(max(-iuv.y, iuv.y - 1.0), 0.0);                      // how far outside the still, vertically
  iuv.y = iuv.y < 0.0 ? -iuv.y : (iuv.y > 1.0 ? 2.0 - iuv.y : iuv.y);
  float shade = 1.0 - smoothstep(0.0, 0.3, over) * 0.97;
  float dep = texture2D(d, iuv).r;
  vec2 p = focus + (iuv - focus) / (1.0 + zoom * (0.6 + 0.8 * dep));   // dolly: near things grow faster
  dep = texture2D(d, p).r;
  p += uPar * (dep - 0.4);                                             // sideways parallax
  vec3 c = texture2D(t, p).rgb;
  if (blur > 0.001) {                                                  // streak toward the subject while the camera flies in
    for (int i = 1; i < 6; i++) c += texture2D(t, mix(p, focus, float(i) / 6.0 * blur)).rgb;
    c /= 6.0;
  }
  return c * shade;
}

void main() {
  vec2 uv = vUv;
  float m = uMix, k = m;
  vec3 a, b, rim = vec3(0.0);
  if (uMode > 2.5 && uMode < 3.5) {
    // Cross-zoom: fly into the first shot and arrive in the second.
    a = shot(tA, dA, uv, uFocusA, uZoomA + m * m * 1.3, m * 0.3, uWideA);
    b = shot(tB, dB, uv, uFocusB, uZoomB + (1.0 - m) * (1.0 - m) * 0.4, (1.0 - m) * 0.16, uWideB);
    k = smoothstep(0.36, 0.66, m);
  } else {
    a = shot(tA, dA, uv, uFocusA, uZoomA, 0.0, uWideA);
    b = shot(tB, dB, uv, uFocusB, uZoomB, 0.0, uWideB);
    if (uMode > 0.5 && uMode < 1.5) {
      // Snow foam: rolls in from the top right with a blobby edge.
      float g = (uv.x * 0.55 + uv.y * 0.85) / 1.4 + (fbm(uv * vec2(6.0, 4.0) + vec2(0.0, uTime * 0.04)) - 0.5) * 0.42;
      float edge = 1.22 - m * 1.5;
      k = smoothstep(edge - 0.05, edge + 0.05, g);
      rim = vec3(0.92, 0.9, 1.0) * exp(-pow((g - edge) / 0.06, 2.0)) * 0.5 * smoothstep(0.0, 0.08, m) * smoothstep(1.0, 0.9, m);
    } else if (uMode > 1.5 && uMode < 2.5) {
      // Rinse: a sheet of water running down, in streaks.
      float g = uv.y + fbm(vec2(uv.x * 9.0, 3.0)) * 0.3 + (fbm(uv * vec2(7.0, 1.6)) - 0.5) * 0.16;
      float edge = 1.3 - m * 1.65;
      k = smoothstep(edge - 0.035, edge + 0.035, g);
      rim = vec3(0.7, 0.82, 1.0) * exp(-pow((g - edge) / 0.03, 2.0)) * 0.35 * smoothstep(0.0, 0.08, m) * smoothstep(1.0, 0.9, m);
    } else if (uMode > 4.5) {
      // Wrap going on: a soft band sweeps across from the left.
      float g = uv.x + (fbm(uv * 3.0) - 0.5) * 0.18;
      float edge = -0.2 + m * 1.4;
      k = 1.0 - smoothstep(edge - 0.07, edge + 0.07, g);
      rim = vec3(0.8, 0.85, 1.0) * exp(-pow((g - edge) / 0.05, 2.0)) * 0.22 * smoothstep(0.0, 0.1, m) * smoothstep(1.0, 0.9, m);
    }
  }
  rim *= clamp(length(a - b) * 2.5, 0.0, 1.0);                         // the edge only shows where the two shots differ
  vec3 col = mix(a, b, k) + rim;

  // Smoke drifting through the room, lit by the LED strips.
  if (uSmoke > 0.001) {
    vec2 q = uv * vec2(uRes.x / uRes.y, 1.0) * 1.5;
    float t = uTime * 0.035;
    float s1 = fbm(q + vec2(t, -t * 0.5));
    float s2 = fbm(q * 1.9 + vec2(-t * 1.3, t * 0.35) + s1);
    float sm = smoothstep(0.38, 0.9, s1 * 0.62 + s2 * 0.62);
    float band = smoothstep(0.02, 0.4, uv.y) * smoothstep(1.02, 0.5, uv.y);
    col += uTint * sm * band * uSmoke;
  }

  col *= 1.0 - uDim * smoothstep(0.8, 0.0, uv.x) * 0.6;                // darker side for the text
  vec2 v = uv - 0.5;
  col *= 1.0 - dot(v, v) * 0.6;                                        // vignette
  col += (hash(uv * uRes + fract(uTime) * 91.7) - 0.5) * 0.028;        // film grain
  col = mix(col, vec3(0.955, 0.965, 0.985), uWhite);
  gl_FragColor = vec4(col * uFade, 1.0);
}
`;
