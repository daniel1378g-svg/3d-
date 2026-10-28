// The "Pizza | Parrilla" scene: one WebGL context, a few passes.
//
//   1. A small 2D fluid simulation (velocity, curl, vorticity confinement, pressure projection) that the
//      pointer stirs, plus an "offset" field: the air's accumulated displacement, advected by the flow and
//      relaxing back to rest. Everything in the scene is pushed by it, so stirring feels like moving air.
//   2. The scene, in linear HDR at reduced resolution. Left of the seam: a wood-fired oven, a brick dome
//      with flames that lick along its ceiling, smoke above the mouth. Right: the Oasis parrilla, rounded
//      coals with a glow that pulses under grey ash, round grate bars in perspective, a velvet wall and the
//      chasing Kino Rex marquee bulbs. Sparks and flour dust are GPU particles drawn on top.
//   3. Bloom (bright pass + separable blur), then a composite with heat-haze refraction above both fires
//      and along the seam, vignette, film grain, ACES tone mapping and sRGB output.
//
// The scene is laid out on the whole panel and the seam only reveals one side or the other, like a
// before/after slider: dragging it to the right shows the whole oven.
import * as THREE from "three";

const NOISE = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 15731.743); }
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
    return v;
  }
`;

const QUAD_VS = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// ---- fluid ------------------------------------------------------------------------------------------
const SPLAT_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform vec2 uPoint;
  uniform vec2 uForce;    // texels per second
  uniform float uRadial;  // > 0: a burst outwards from the point
  uniform float uRadius;
  uniform float uAspect;
  void main() {
    vec2 p = vUv - uPoint;
    p.x *= uAspect;
    float g = exp(-dot(p, p) / uRadius);
    vec2 f = uForce * g;
    if (uRadial > 0.0) f += normalize(p + 1e-5) * uRadial * g;
    gl_FragColor = vec4(texture2D(uTarget, vUv).xy + f, 0.0, 1.0);
  }
`;
const CURL_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uVel;
  uniform vec2 uTexel;
  void main() {
    float L = texture2D(uVel, vUv - vec2(uTexel.x, 0.0)).y;
    float R = texture2D(uVel, vUv + vec2(uTexel.x, 0.0)).y;
    float T = texture2D(uVel, vUv + vec2(0.0, uTexel.y)).x;
    float B = texture2D(uVel, vUv - vec2(0.0, uTexel.y)).x;
    gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
  }
`;
const VORTICITY_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uVel;
  uniform sampler2D uCurl;
  uniform vec2 uTexel;
  uniform float uStrength;
  uniform float uDt;
  void main() {
    float L = texture2D(uCurl, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uCurl, vUv + vec2(uTexel.x, 0.0)).x;
    float T = texture2D(uCurl, vUv + vec2(0.0, uTexel.y)).x;
    float B = texture2D(uCurl, vUv - vec2(0.0, uTexel.y)).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 1e-4;
    force *= uStrength * C;
    force.y *= -1.0;
    vec2 vel = texture2D(uVel, vUv).xy + force * uDt;
    gl_FragColor = vec4(clamp(vel, -1500.0, 1500.0), 0.0, 1.0);
  }
`;
const DIVERGENCE_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uVel;
  uniform vec2 uTexel;
  void main() {
    float L = texture2D(uVel, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uVel, vUv + vec2(uTexel.x, 0.0)).x;
    float T = texture2D(uVel, vUv + vec2(0.0, uTexel.y)).y;
    float B = texture2D(uVel, vUv - vec2(0.0, uTexel.y)).y;
    vec2 C = texture2D(uVel, vUv).xy;
    if (vUv.x - uTexel.x < 0.0) L = -C.x;
    if (vUv.x + uTexel.x > 1.0) R = -C.x;
    if (vUv.y + uTexel.y > 1.0) T = -C.y;
    if (vUv.y - uTexel.y < 0.0) B = -C.y;
    gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
  }
`;
const PRESSURE_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 uTexel;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    float div = texture2D(uDivergence, vUv).x;
    gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
  }
`;
const GRADIENT_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uVel;
  uniform vec2 uTexel;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    vec2 vel = texture2D(uVel, vUv).xy - vec2(R - L, T - B);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;
const ADVECT_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uVel;
  uniform sampler2D uSource;
  uniform vec2 uTexel;
  uniform float uDt;
  uniform float uDissipation;
  void main() {
    vec2 coord = vUv - uDt * texture2D(uVel, vUv).xy * uTexel;
    gl_FragColor = vec4(texture2D(uSource, coord).xy / (1.0 + uDissipation * uDt), 0.0, 1.0);
  }
`;
// The air's displacement (uv units): carried by the flow, fed by it, and relaxing back to rest.
const OFFSET_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uVel;
  uniform sampler2D uOff;
  uniform vec2 uTexel;
  uniform float uDt;
  uniform float uRelax;
  void main() {
    vec2 vel = texture2D(uVel, vUv).xy;
    vec2 off = texture2D(uOff, vUv - uDt * vel * uTexel).xy;
    off = off * exp(-uRelax * uDt) + vel * uTexel * uDt;
    gl_FragColor = vec4(clamp(off, -0.25, 0.25), 0.0, 1.0);
  }
`;

// ---- scene ------------------------------------------------------------------------------------------
const SCENE_FS = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uSplit;
  uniform float uAspect;
  uniform sampler2D uOff;
  uniform sampler2D uVel;
  uniform vec2 uSimTexel;
  ${NOISE}

  // Blackbody-like ramp in linear HDR: deep red, orange, yellow, and white only in the hottest cores.
  vec3 fireRamp(float T) {
    T = max(T, 0.0);
    vec3 c = vec3(0.42, 0.035, 0.008) * smoothstep(0.02, 0.32, T);
    c += vec3(0.9, 0.3, 0.035) * smoothstep(0.22, 0.68, T);
    c += vec3(0.55, 0.5, 0.15) * smoothstep(0.62, 1.02, T);
    c += vec3(0.5, 0.55, 0.6) * smoothstep(1.08, 1.45, T);
    return c * (0.55 + 2.4 * T * T);
  }

  // x, y: nearest and second-nearest feature distance; z: a value per cell.
  vec3 cells(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float d1 = 8.0, d2 = 8.0, id = 0.0;
    for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = 0.5 + 0.38 * (hash2(i + g) - 0.5) * 2.0;
      float d = length(g + o - f);
      if (d < d1) { d2 = d1; d1 = d; id = hash(i + g); } else if (d < d2) { d2 = d; }
    }
    return vec3(d1, d2, id);
  }

  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  vec3 oven(vec2 uv, float t, vec2 off, float speed) {
    // the oven keeps its proportions in narrow frames: it shrinks around its base instead of being cropped
    float sc = clamp(uAspect / 1.5, 0.5, 1.0);
    vec2 P = vec2((uv.x - 0.27) * uAspect, uv.y - 0.08) / sc + vec2(0.0, 0.08);
    float flick = 0.84 + 0.1 * noise(vec2(t * 5.3, 1.7)) + 0.06 * sin(t * 13.0 + 1.3 * sin(t * 3.1));
    float W = 0.33, floorY = 0.2, archH = 0.36;
    vec2 m = vec2(P.x / W, (P.y - floorY) / archH);
    float e = length(vec2(m.x, max(m.y, 0.0)));
    float inside = smoothstep(1.0, 0.975, e) * smoothstep(floorY - 0.003, floorY + 0.003, P.y);
    vec2 L = vec2(-0.07, floorY + 0.07);
    vec2 dl = P - L;
    float light = flick * (0.05 + exp(-dot(dl, dl) / 0.075) * 1.1 + speed * 0.25);

    // facade: brick courses with bevelled tops, mortar, soot above the mouth
    vec2 b = P * vec2(8.5, 21.0);
    b.x += step(1.0, mod(floor(b.y), 2.0)) * 0.5;
    vec2 bf = fract(b), bi = floor(b);
    float mortar = 1.0 - smoothstep(0.0, 0.08, min(min(bf.x, 1.0 - bf.x) * 2.3, min(bf.y, 1.0 - bf.y)));
    vec3 brick = vec3(0.3, 0.1, 0.055) * (0.65 + 0.35 * hash(bi)) * (0.82 + 0.3 * smoothstep(0.15, 0.9, bf.y));
    brick *= 0.9 + 0.2 * noise(P * 60.0);
    brick = mix(brick, vec3(0.05, 0.04, 0.035), mortar * 0.85);
    // the arch: radial voussoir bricks around the mouth
    float ring = smoothstep(0.995, 1.01, e) * smoothstep(1.24, 1.225, e) * step(-0.02, m.y);
    float ang = atan(max(m.y, 0.0), m.x);
    float seg = fract(ang / 3.14159 * 11.0);
    float ringMortar = 1.0 - smoothstep(0.0, 0.06, min(seg, 1.0 - seg)) * smoothstep(0.0, 0.012, abs(e - 1.115));
    vec3 vouss = vec3(0.34, 0.12, 0.065) * (0.75 + 0.25 * hash(vec2(floor(ang / 3.14159 * 11.0), floor(e * 9.0))));
    vouss = mix(vouss, vec3(0.05, 0.04, 0.035), ringMortar * 0.8);
    vec3 facade = mix(brick, vouss, ring);
    float soot = exp(-pow(P.x / 0.24, 2.0)) * smoothstep(floorY + archH * 0.7, floorY + archH + 0.3, P.y);
    facade *= 1.0 - 0.55 * soot;
    vec3 warm = vec3(1.0, 0.5, 0.24);
    vec3 col = facade * (0.07 + light * 1.7) * warm;

    // hearth slab in front of the mouth
    float hearth = smoothstep(floorY - 0.065, floorY - 0.058, P.y) * (1.0 - smoothstep(floorY - 0.002, floorY + 0.002, P.y)) * smoothstep(W * 1.32, W * 1.28, abs(P.x));
    vec3 stone = vec3(0.2, 0.165, 0.145) * (0.75 + 0.25 * noise(P * vec2(60.0, 25.0))) * (0.08 + light * 1.3) * warm;
    float top = smoothstep(floorY - 0.014, floorY - 0.004, P.y);
    stone *= mix(0.45 + 0.25 * smoothstep(floorY - 0.065, floorY - 0.015, P.y), 1.25, top);
    col = mix(col, stone, hearth);

    // interior: sooty dome lit by the fire
    float depth = smoothstep(0.0, 1.0, 1.0 - e);
    vec3 inner = vec3(0.1, 0.035, 0.018) * (0.25 + light * 2.4) * (0.7 + 0.3 * depth);
    // logs at the base, bark with ember cracks
    float log1 = sdSegment(P, vec2(-0.2, floorY + 0.02), vec2(0.03, floorY + 0.03)) - 0.017;
    float log2 = sdSegment(P, vec2(-0.12, floorY + 0.012), vec2(0.07, floorY + 0.045)) - 0.014;
    float logs = smoothstep(0.003, 0.0, min(log1, log2));
    float crackN = noise(P * vec2(90.0, 140.0) + vec2(0.0, t * 0.2));
    vec3 bark = vec3(0.03, 0.018, 0.012) + fireRamp(smoothstep(0.55, 0.85, crackN) * (0.7 + 0.3 * flick)) * 0.9;
    inner = mix(inner, bark, logs);

    // flames: domain-warped fbm rising from the logs, rolling along the dome, pushed by the air
    vec2 fp = P - L + off * vec2(uAspect, 1.0) * 1.3;
    float h = max(fp.y + 0.03, 0.0);
    vec2 q = vec2(fp.x - h * h * 1.6, fp.y);
    vec2 nq = vec2(q.x * 5.2, q.y * 3.0 - t * 2.0);
    vec2 warp = vec2(fbm(nq * 0.85 + vec2(0.0, t * 0.4)), fbm(nq * 0.85 + vec2(5.2, -t * 0.3)));
    float n = fbm(nq + warp * 1.7);
    float width = 0.1 + h * 0.6;
    float column = exp(-pow(q.x / width, 2.0) * 1.5);
    float T = column * (1.18 - h * 3.3) + (n - 0.48) * 1.25;
    T += speed * 0.7 * column;
    T *= flick;
    // the dome ceiling caps the flames; they lick along it
    T *= smoothstep(1.0, 0.86, e);
    float fire = clamp(T, 0.0, 1.6) * inside;
    inner += fireRamp(fire) * (1.0 - logs * 0.5);
    col = mix(col, inner, inside);

    // thin smoke rising above the mouth
    vec2 sp = vec2(P.x * 2.6, P.y * 1.8 - t * 0.32) + off * vec2(uAspect, 1.0) * 2.5;
    float s = fbm(sp + vec2(fbm(sp * 1.3 + t * 0.08), 0.0));
    float smoke = smoothstep(floorY + archH * 0.8, floorY + archH + 0.3, P.y) * exp(-pow((P.x - 0.04 - (P.y - 0.6) * 0.15) / 0.2, 2.0)) * smoothstep(0.42, 0.78, s);
    col = mix(col, vec3(0.13, 0.1, 0.085) * (0.35 + light * 0.8), smoke * 0.45);
    return col;
  }

  vec3 grill(vec2 uv, float t, vec2 off, float speed) {
    vec2 P = vec2((uv.x - 0.72) * uAspect, uv.y);
    float horizon = 0.58;
    float k = horizon + 0.26;
    float z = 1.0 / (1.0 - min(uv.y, horizon) / k);       // 1 at the front, ~3 at the back
    vec2 w = vec2(P.x * z, z) + off * vec2(uAspect, 1.0) * 0.12; // coals are solid: the air barely moves them

    // coals: rounded lumps (cells with wobbly edges) over a bed of heat that glows through the gaps.
    // Each lump has its own heat, pulsing slowly; cool lumps are charcoal dusted with grey ash.
    vec2 cw = w * 5.0;
    cw += 0.28 * vec2(noise(cw * 1.7), noise(cw * 1.7 + 4.0));
    vec3 c = cells(cw);
    float lump = 1.0 - smoothstep(0.0, 0.62, c.x);
    float dome = pow(lump, 0.6);
    float gap = 1.0 - smoothstep(0.02, 0.16, c.y - c.x);
    float centreHot = exp(-pow(P.x / 0.45, 2.0)) * 0.25;
    float bedHeat = smoothstep(0.3, 0.85, noise(w * 1.4 + vec2(0.0, t * 0.04)) + centreHot + speed * 0.5);
    float heat = clamp(bedHeat * 0.75 + c.z * 0.55 - 0.32 + speed * 0.4, 0.0, 1.2);
    float pulse = 0.8 + 0.2 * sin(t * 1.2 + c.z * 21.0);
    vec3 charcoal = vec3(0.022, 0.019, 0.018) * (0.35 + 0.9 * dome) + vec3(0.05, 0.04, 0.035) * pow(lump, 5.0);
    vec3 ash = vec3(0.3, 0.285, 0.27) * (0.4 + 0.6 * dome) * (0.6 + 0.4 * noise(cw * 18.0));
    float ashAmt = smoothstep(0.45, 0.05, heat) * smoothstep(0.4, 0.8, noise(cw * 4.0 + c.z * 9.0)) * 0.8;
    vec3 coal = mix(charcoal, ash * 0.5, ashAmt);
    // the lump glows from inside, brightest in its middle and in the cracks of its surface
    float surface = smoothstep(0.35, 0.75, noise(cw * 7.0 + c.z * 13.0));
    coal += fireRamp(heat * (0.35 + 0.65 * lump) * pulse) * smoothstep(0.25, 0.8, heat) * (0.35 + 0.45 * surface);
    coal *= 1.0 - gap * 0.85;
    // heat glowing up through the gaps
    coal += fireRamp(0.85 * pulse) * gap * bedHeat * 0.55;
    coal *= mix(1.0, 0.3, smoothstep(1.0, 3.2, z));

    // grate: round bars across the bed, in perspective, ember light from below and warm glints from above
    float spacing = 0.2;
    float bz = z / spacing;
    float fw = (z * z / k) / spacing / uRes.y * 1.5;
    float f = fract(bz) - 0.5;
    float halfW = 0.13;
    float bar = smoothstep(halfW + fw, halfW - fw, abs(f)) * step(uv.y, horizon - 0.006);
    float nz = clamp(f / halfW, -1.0, 1.0);
    float curv = sqrt(max(0.0, 1.0 - nz * nz));
    vec3 steel = vec3(0.05, 0.045, 0.045) * (0.3 + 0.7 * curv);
    steel += vec3(1.0, 0.36, 0.08) * smoothstep(0.1, -0.9, nz) * (0.15 + heat * 0.7) * 0.5;
    float spec = pow(max(0.0, 1.0 - abs(nz - 0.42) * 2.6), 8.0) * (0.45 + 0.55 * noise(vec2(P.x * z * 4.0 - t * 0.35, floor(bz))));
    steel += vec3(1.0, 0.85, 0.6) * spec * 0.55;
    steel *= mix(1.0, 0.45, smoothstep(1.0, 3.2, z));
    vec3 bed = mix(coal, steel, bar);

    // back wall: dark velvet folds (the old Kino Rex), lit from below by the coals
    float fold = 0.5 + 0.5 * cos(P.x * 34.0 + noise(vec2(P.x * 3.0, uv.y * 1.5)) * 2.5);
    vec3 velvet = vec3(0.17, 0.028, 0.035) * (0.3 + 0.7 * fold);
    velvet *= 0.12 + exp(-(uv.y - horizon) * 5.0) * 0.9;
    // the rim of the grill box at the horizon
    float rim = smoothstep(0.014, 0.0, abs(uv.y - horizon));
    vec3 col = uv.y < horizon ? bed : velvet;
    col = mix(col, vec3(0.06, 0.05, 0.05) + vec3(0.7, 0.25, 0.06) * 0.25, rim);

    // the marquee: a plate with a row of warm bulbs that chase to the right
    float rowY = 0.9;
    float plate = smoothstep(0.042, 0.038, abs(uv.y - rowY));
    float trim = smoothstep(0.004, 0.0, abs(abs(uv.y - rowY) - 0.04));
    col = mix(col, vec3(0.035, 0.026, 0.02) * (0.8 + 0.2 * noise(vec2(uv.x * 160.0, uv.y * 40.0))), plate);
    col += vec3(0.5, 0.33, 0.14) * trim * 0.35;
    float gapUv = 0.075;
    float bx = uv.x * uAspect / gapUv;
    float idx = floor(bx);
    vec2 d = vec2((fract(bx) - 0.5) * gapUv, uv.y - rowY) * 600.0;
    float dd = dot(d, d);
    float on = 0.4 + 0.6 * smoothstep(0.3, 0.7, fract(t * 1.1 - idx * 0.25));
    col += vec3(1.0, 0.8, 0.5) * (exp(-dd / 16.0) * 3.0 + exp(-dd / 500.0) * 0.22) * on;
    return col;
  }

  void main() {
    vec2 uv = vUv;
    vec2 off = texture2D(uOff, uv).xy;
    vec2 vel = texture2D(uVel, uv).xy * uSimTexel;
    float speed = clamp(length(vel) * 0.6, 0.0, 1.4);
    vec3 col = uv.x < uSplit ? oven(uv, uTime, off, speed) : grill(uv, uTime, off, speed);
    gl_FragColor = vec4(col, 1.0);
  }
`;

// ---- particles: sparks over the grill, flour dust in the oven light ---------------------------------
const PARTICLE_VS = /* glsl */ `
  attribute vec4 aSeed;
  uniform float uTime;
  uniform float uAspect;
  uniform float uKind;   // 0 sparks, 1 flour
  uniform float uPx;     // one css pixel in buffer pixels
  uniform sampler2D uOff;
  varying float vAlpha;
  varying vec2 vDir;
  varying float vStreak;
  varying float vHeat;
  ${NOISE}
  void main() {
    vec2 p;
    float size;
    if (uKind < 0.5) {
      float life = mix(1.6, 3.4, aSeed.x);
      float ph = fract(uTime / life + aSeed.y);
      float age = ph * life;
      vec2 start = vec2(mix(0.5, 1.0, aSeed.z), mix(0.06, 0.45, aSeed.w));
      float vy = mix(0.1, 0.3, fract(aSeed.x * 7.13));
      float drift = (noise(vec2(aSeed.y * 31.0, age * 0.9)) - 0.5) * 0.14;
      p = start + vec2(drift * age + sin(age * 3.0 + aSeed.z * 40.0) * 0.006, vy * age);
      vec2 off = texture2D(uOff, clamp(p, 0.0, 1.0)).xy;
      p += off * 1.8;
      vec2 v = vec2(drift + cos(age * 3.0 + aSeed.z * 40.0) * 0.018 + off.x * 7.0, vy + off.y * 7.0);
      vDir = normalize(v * vec2(uAspect, 1.0));
      vStreak = clamp(length(v) * 1.3, 0.12, 0.9);
      vHeat = 1.0 - ph;
      vAlpha = smoothstep(0.0, 0.06, ph) * (1.0 - smoothstep(0.5, 1.0, ph)) * step(0.35, fract(aSeed.w * 13.7));
      size = mix(2.0, 3.6, aSeed.z) * uPx;
      gl_PointSize = size * 5.0;
    } else {
      float life = mix(7.0, 12.0, aSeed.x);
      float ph = fract(uTime / life + aSeed.y);
      float age = ph * life;
      vec2 start = vec2(mix(0.0, 0.52, aSeed.z), mix(0.08, 0.95, aSeed.w));
      p = start + vec2(0.005 * age + sin(age * 0.6 + aSeed.x * 20.0) * 0.012, (aSeed.x - 0.45) * 0.008 * age + sin(age * 0.9 + aSeed.z * 30.0) * 0.008);
      p += texture2D(uOff, clamp(p, 0.0, 1.0)).xy * 2.4;
      float sc = clamp(uAspect / 1.5, 0.5, 1.0);
      vec2 fire = vec2(0.27 - 0.07 * sc / uAspect, 0.08 + 0.19 * sc);
      vec2 d = (p - fire) * vec2(uAspect, 1.0);
      vHeat = exp(-dot(d, d) / 0.09);
      vAlpha = smoothstep(0.0, 0.15, ph) * (1.0 - smoothstep(0.75, 1.0, ph)) * (0.05 + vHeat * 0.9);
      vDir = vec2(0.0, 1.0);
      vStreak = 0.0;
      size = mix(1.4, 2.8, aSeed.z) * uPx;
      gl_PointSize = size * 3.0;
    }
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
  }
`;
const PARTICLE_FS = /* glsl */ `
  uniform float uKind;
  uniform float uSplit;
  uniform vec2 uRes;
  varying float vAlpha;
  varying vec2 vDir;
  varying float vStreak;
  varying float vHeat;
  void main() {
    float x = gl_FragCoord.x / uRes.x;
    if (uKind < 0.5 ? x < uSplit : x > uSplit) discard;
    vec2 c = gl_PointCoord - 0.5;
    c.y = -c.y;
    vec3 color;
    float a;
    if (uKind < 0.5) {
      // a short streak behind the spark, along its motion
      vec2 tail = -vDir * vStreak * 0.45;
      float h = clamp(dot(c, tail) / max(dot(tail, tail), 1e-5), 0.0, 1.0);
      float dist = length(c - tail * h);
      a = exp(-dist * dist / 0.004) * (1.0 - h * 0.6);
      color = mix(vec3(1.0, 0.3, 0.04), vec3(1.0, 0.82, 0.45), vHeat) * 3.2;
    } else {
      float dist = length(c);
      a = exp(-dist * dist / 0.03);
      color = mix(vec3(0.75, 0.68, 0.6), vec3(1.0, 0.82, 0.6), vHeat) * 1.1;
    }
    gl_FragColor = vec4(color * a * vAlpha, 1.0);
  }
`;

// ---- bloom and composite ------------------------------------------------------------------------------
const BRIGHT_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTex;
  void main() {
    vec3 c = texture2D(uTex, vUv).rgb;
    float l = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c * smoothstep(0.85, 1.6, l), 1.0);
  }
`;
const BLUR_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform vec2 uDir;
  void main() {
    vec3 c = texture2D(uTex, vUv).rgb * 0.2270270270;
    c += texture2D(uTex, vUv + uDir * 1.3846153846).rgb * 0.3162162162;
    c += texture2D(uTex, vUv - uDir * 1.3846153846).rgb * 0.3162162162;
    c += texture2D(uTex, vUv + uDir * 3.2307692308).rgb * 0.0702702703;
    c += texture2D(uTex, vUv - uDir * 3.2307692308).rgb * 0.0702702703;
    gl_FragColor = vec4(c, 1.0);
  }
`;
const COMPOSITE_FS = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uScene;
  uniform sampler2D uBloom;
  uniform float uBloomOn;
  uniform float uTime;
  uniform float uSplit;
  uniform float uAspect;
  uniform vec2 uRes;
  ${NOISE}
  void main() {
    vec2 uv = vUv;
    // heat haze: above the oven mouth, above the coals, and along the seam where the two airs meet
    float sc = clamp(uAspect / 1.5, 0.5, 1.0);
    float ovenHaze = exp(-pow((uv.x - 0.26) * uAspect / (0.22 * sc), 2.0)) * smoothstep(0.08 + 0.12 * sc, 0.08 + 0.34 * sc, uv.y) * (1.0 - smoothstep(0.08 + 0.54 * sc, 0.95, uv.y)) * step(uv.x, uSplit);
    float grillHaze = smoothstep(0.35, 0.6, uv.y) * (1.0 - smoothstep(0.66, 0.86, uv.y)) * step(uSplit, uv.x);
    float seam = exp(-pow((uv.x - uSplit) * uAspect / 0.025, 2.0));
    float haze = ovenHaze + grillHaze * 0.8 + seam * 0.9;
    vec2 n = vec2(noise(uv * vec2(22.0, 11.0) - vec2(0.0, uTime * 2.0)), noise(uv * vec2(17.0, 9.0) + 3.7 - vec2(0.0, uTime * 1.6))) - 0.5;
    vec2 suv = uv + n * 0.0065 * haze;
    vec3 col = texture2D(uScene, suv).rgb;
    col += texture2D(uBloom, uv).rgb * 0.4 * uBloomOn;
    // a soft shadow on both sides of the seam
    col *= 1.0 - 0.3 * exp(-abs(uv.x - uSplit) * uAspect / 0.018);
    // vignette
    vec2 v = (uv - 0.5) * vec2(1.0, 1.15);
    col *= mix(0.62, 1.0, smoothstep(0.85, 0.25, length(v)));
    // ACES (Narkowicz), then sRGB
    col = clamp((col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14), 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    col += (hash(uv * uRes + fract(uTime * 7.0) * 113.0) - 0.5) * 0.03;
    gl_FragColor = vec4(col, 1.0);
  }
`;

type Options = { still: boolean; onFirstFrame: () => void; /** dev page only: run on software GL too */ force?: boolean };

/** Software GL (no GPU) would block the main thread on every frame, so it gets the still frame. */
function softwareGl(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  return /swiftshader|llvmpipe|software|basic render/i.test(name);
}

type RT = THREE.WebGLRenderTarget;
const makeRT = (w: number, h: number) =>
  new THREE.WebGLRenderTarget(Math.max(1, w), Math.max(1, h), {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    depthBuffer: false,
  });
class Double {
  a: RT;
  b: RT;
  constructor(w: number, h: number) {
    this.a = makeRT(w, h);
    this.b = makeRT(w, h);
  }
  get read() {
    return this.a;
  }
  get write() {
    return this.b;
  }
  swap() {
    [this.a, this.b] = [this.b, this.a];
  }
  dispose() {
    this.a.dispose();
    this.b.dispose();
  }
}

export function createHero(canvas: HTMLCanvasElement, host: HTMLElement, options: Options) {
  const { onFirstFrame } = options;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
  if (!renderer.capabilities.isWebGL2) throw new Error("WebGL 2 needed");
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // the composite writes sRGB itself
  renderer.autoClear = false;
  const gl = renderer.getContext();
  let forced = options.still || (!options.force && softwareGl(gl));
  let still = forced;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);

  // quality levels: scene resolution, bloom
  const LEVELS = [
    { scene: 0.6, bloom: true },
    { scene: 0.45, bloom: true },
    { scene: 0.4, bloom: false },
  ];
  let level = 0;

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quadScene = new THREE.Scene();
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  quad.frustumCulled = false;
  quadScene.add(quad);
  const mat = (fragmentShader: string, uniforms: Record<string, THREE.IUniform>) =>
    new THREE.ShaderMaterial({ vertexShader: QUAD_VS, fragmentShader, uniforms, depthTest: false, depthWrite: false });

  const u = (value: unknown) => ({ value });
  const splatM = mat(SPLAT_FS, { uTarget: u(null), uPoint: u(new THREE.Vector2()), uForce: u(new THREE.Vector2()), uRadial: u(0), uRadius: u(0.003), uAspect: u(1) });
  const curlM = mat(CURL_FS, { uVel: u(null), uTexel: u(new THREE.Vector2()) });
  const vortM = mat(VORTICITY_FS, { uVel: u(null), uCurl: u(null), uTexel: u(new THREE.Vector2()), uStrength: u(22), uDt: u(0.016) });
  const divM = mat(DIVERGENCE_FS, { uVel: u(null), uTexel: u(new THREE.Vector2()) });
  const presM = mat(PRESSURE_FS, { uPressure: u(null), uDivergence: u(null), uTexel: u(new THREE.Vector2()) });
  const gradM = mat(GRADIENT_FS, { uPressure: u(null), uVel: u(null), uTexel: u(new THREE.Vector2()) });
  const advM = mat(ADVECT_FS, { uVel: u(null), uSource: u(null), uTexel: u(new THREE.Vector2()), uDt: u(0.016), uDissipation: u(0.9) });
  const offM = mat(OFFSET_FS, { uVel: u(null), uOff: u(null), uTexel: u(new THREE.Vector2()), uDt: u(0.016), uRelax: u(1.3) });
  const sceneM = mat(SCENE_FS, {
    uTime: u(14),
    uRes: u(new THREE.Vector2()),
    uSplit: u(0.5),
    uAspect: u(1),
    uOff: u(null),
    uVel: u(null),
    uSimTexel: u(new THREE.Vector2()),
  });
  const brightM = mat(BRIGHT_FS, { uTex: u(null) });
  const blurM = mat(BLUR_FS, { uTex: u(null), uDir: u(new THREE.Vector2()) });
  const compM = mat(COMPOSITE_FS, {
    uScene: u(null),
    uBloom: u(null),
    uBloomOn: u(1),
    uTime: u(14),
    uSplit: u(0.5),
    uAspect: u(1),
    uRes: u(new THREE.Vector2()),
  });

  // particles
  const particleScene = new THREE.Scene();
  const makeParticles = (count: number, kind: number) => {
    const geo = new THREE.BufferGeometry();
    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < seeds.length; i++) seeds[i] = Math.random();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
    const m = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VS,
      fragmentShader: PARTICLE_FS,
      uniforms: { uTime: u(14), uAspect: u(1), uKind: u(kind), uPx: u(1), uOff: u(null), uSplit: u(0.5), uRes: u(new THREE.Vector2()) },
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const pts = new THREE.Points(geo, m);
    pts.frustumCulled = false;
    particleScene.add(pts);
    return pts;
  };
  const sparks = makeParticles(280, 0);
  const flour = makeParticles(220, 1);
  const particleMats = [sparks.material as THREE.ShaderMaterial, flour.material as THREE.ShaderMaterial];

  // targets
  let simW = 1,
    simH = 1,
    width = 1,
    height = 1;
  let vel: Double, pres: Double, off: Double, curlRT: RT, divRT: RT, sceneRT: RT, bloomA: RT, bloomB: RT;
  let made = false;
  const disposeTargets = () => {
    if (!made) return;
    [vel, pres, off].forEach((d) => d.dispose());
    [curlRT, divRT, sceneRT, bloomA, bloomB].forEach((r) => r.dispose());
  };
  const makeTargets = () => {
    disposeTargets();
    const aspect = width / height;
    simW = Math.round(aspect >= 1 ? 192 : 192 * aspect);
    simH = Math.round(aspect >= 1 ? 192 / aspect : 192);
    vel = new Double(simW, simH);
    pres = new Double(simW, simH);
    off = new Double(simW, simH);
    curlRT = makeRT(simW, simH);
    divRT = makeRT(simW, simH);
    const s = LEVELS[level].scene;
    sceneRT = makeRT(Math.round(width * dpr * s), Math.round(height * dpr * s));
    bloomA = makeRT(Math.round(width * dpr * 0.25), Math.round(height * dpr * 0.25));
    bloomB = makeRT(Math.round(width * dpr * 0.25), Math.round(height * dpr * 0.25));
    // start from still air
    renderer.setClearColor(0x000000, 1);
    for (const t of [vel.a, vel.b, pres.a, pres.b, off.a, off.b]) {
      renderer.setRenderTarget(t);
      renderer.clear();
    }
    renderer.setRenderTarget(null);
    made = true;
  };

  const pass = (m: THREE.ShaderMaterial, target: RT | null) => {
    quad.material = m;
    renderer.setRenderTarget(target);
    renderer.render(quadScene, camera);
  };

  // pointer input → splats
  type Splat = { x: number; y: number; fx: number; fy: number; radial: number; r: number };
  const splats: Splat[] = [];
  let last: { x: number; y: number; t: number } | null = null;
  const toUv = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / rect.width, y: 1 - (e.clientY - rect.top) / rect.height };
  };
  const onMove = (e: PointerEvent) => {
    if (still) return;
    const p = toUv(e);
    const now = performance.now();
    if (last) {
      const dt = Math.max(8, now - last.t) / 1000;
      let fx = ((p.x - last.x) * simW) / dt;
      let fy = ((p.y - last.y) * simH) / dt;
      const len = Math.hypot(fx, fy);
      const max = 900;
      if (len > max) {
        fx *= max / len;
        fy *= max / len;
      }
      if (len > 1) splats.push({ x: p.x, y: p.y, fx: fx * 0.9, fy: fy * 0.9, radial: 0, r: 0.0035 });
    }
    last = { ...p, t: now };
  };
  const onLeave = () => (last = null);
  const onDown = (e: PointerEvent) => {
    if (still || (e.target as Element).closest("a, button, [role='slider']")) return;
    const p = toUv(e);
    splats.push({ x: p.x, y: p.y, fx: 0, fy: 160, radial: 520, r: 0.006 });
    last = { ...p, t: performance.now() };
  };

  // idle drafts keep the air alive: small upward puffs from the fires
  let nextDraft = 0;
  const draft = (now: number) => {
    if (now < nextDraft) return;
    nextDraft = now + 0.9 + Math.random() * 1.4;
    const ovenSide = Math.random() < 0.5;
    splats.push({
      x: ovenSide ? 0.2 + Math.random() * 0.12 : 0.58 + Math.random() * 0.3,
      y: ovenSide ? 0.3 : 0.35 + Math.random() * 0.1,
      fx: (Math.random() - 0.5) * 140,
      fy: 120 + Math.random() * 120,
      radial: 0,
      r: 0.004,
    });
  };

  let time = 14;
  const texel = new THREE.Vector2();
  const simulate = (dt: number) => {
    texel.set(1 / simW, 1 / simH);
    const aspect = width / height;
    for (const s of splats.splice(0, 12)) {
      splatM.uniforms.uTarget.value = vel.read.texture;
      splatM.uniforms.uPoint.value.set(s.x, s.y);
      splatM.uniforms.uForce.value.set(s.fx, s.fy);
      splatM.uniforms.uRadial.value = s.radial;
      splatM.uniforms.uRadius.value = s.r;
      splatM.uniforms.uAspect.value = aspect;
      pass(splatM, vel.write);
      vel.swap();
    }
    splats.length = 0;
    curlM.uniforms.uVel.value = vel.read.texture;
    curlM.uniforms.uTexel.value = texel;
    pass(curlM, curlRT);
    vortM.uniforms.uVel.value = vel.read.texture;
    vortM.uniforms.uCurl.value = curlRT.texture;
    vortM.uniforms.uTexel.value = texel;
    vortM.uniforms.uDt.value = dt;
    pass(vortM, vel.write);
    vel.swap();
    divM.uniforms.uVel.value = vel.read.texture;
    divM.uniforms.uTexel.value = texel;
    pass(divM, divRT);
    presM.uniforms.uDivergence.value = divRT.texture;
    presM.uniforms.uTexel.value = texel;
    for (let i = 0; i < 14; i++) {
      presM.uniforms.uPressure.value = pres.read.texture;
      pass(presM, pres.write);
      pres.swap();
    }
    gradM.uniforms.uPressure.value = pres.read.texture;
    gradM.uniforms.uVel.value = vel.read.texture;
    gradM.uniforms.uTexel.value = texel;
    pass(gradM, vel.write);
    vel.swap();
    advM.uniforms.uVel.value = vel.read.texture;
    advM.uniforms.uSource.value = vel.read.texture;
    advM.uniforms.uTexel.value = texel;
    advM.uniforms.uDt.value = dt;
    pass(advM, vel.write);
    vel.swap();
    offM.uniforms.uVel.value = vel.read.texture;
    offM.uniforms.uOff.value = off.read.texture;
    offM.uniforms.uTexel.value = texel;
    offM.uniforms.uDt.value = dt;
    pass(offM, off.write);
    off.swap();
  };

  let split = 0.5;
  let splitTarget = 0.5;
  const draw = () => {
    const aspect = width / height;
    sceneM.uniforms.uTime.value = time;
    sceneM.uniforms.uRes.value.set(sceneRT.width, sceneRT.height);
    sceneM.uniforms.uSplit.value = split;
    sceneM.uniforms.uAspect.value = aspect;
    sceneM.uniforms.uOff.value = off.read.texture;
    sceneM.uniforms.uVel.value = vel.read.texture;
    sceneM.uniforms.uSimTexel.value.set(1 / simW, 1 / simH);
    pass(sceneM, sceneRT);
    for (const m of particleMats) {
      m.uniforms.uTime.value = time;
      m.uniforms.uAspect.value = aspect;
      m.uniforms.uPx.value = dpr * LEVELS[level].scene;
      m.uniforms.uOff.value = off.read.texture;
      m.uniforms.uSplit.value = split;
      m.uniforms.uRes.value.set(sceneRT.width, sceneRT.height);
    }
    renderer.setRenderTarget(sceneRT);
    renderer.render(particleScene, camera);
    const bloom = LEVELS[level].bloom;
    if (bloom) {
      brightM.uniforms.uTex.value = sceneRT.texture;
      pass(brightM, bloomA);
      for (const spread of [1, 2.2]) {
        blurM.uniforms.uTex.value = bloomA.texture;
        blurM.uniforms.uDir.value.set(spread / bloomA.width, 0);
        pass(blurM, bloomB);
        blurM.uniforms.uTex.value = bloomB.texture;
        blurM.uniforms.uDir.value.set(0, spread / bloomA.height);
        pass(blurM, bloomA);
      }
    }
    compM.uniforms.uScene.value = sceneRT.texture;
    compM.uniforms.uBloom.value = bloomA.texture;
    compM.uniforms.uBloomOn.value = bloom ? 1 : 0;
    compM.uniforms.uTime.value = time;
    compM.uniforms.uSplit.value = split;
    compM.uniforms.uAspect.value = aspect;
    compM.uniforms.uRes.value.set(width * dpr, height * dpr);
    pass(compM, null);
  };

  const timer = new THREE.Timer();
  timer.connect(document);
  let first = true;
  let frames = 0;
  let slowSum = 0;
  let running = false;
  let onScreen = true;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const changed = Math.abs(rect.width - width) > 1 || Math.abs(rect.height - height) > 1;
    width = rect.width;
    height = rect.height;
    renderer.setSize(width, height, false);
    if (changed || !made) makeTargets();
    if (!running) frame();
  };

  function frame() {
    timer.update();
    const raw = Math.min(timer.getDelta(), 0.1);
    // quality: after a warm-up, if frames run late, lower the scene resolution, then drop bloom, then stop
    if (running) {
      frames++;
      if (frames > 30) slowSum += raw;
      if (frames === 120) {
        if (slowSum / 90 > 0.024) {
          if (level < LEVELS.length - 1) {
            level++;
            makeTargets();
          } else {
            still = forced = true;
            sync();
          }
        }
        frames = 0;
        slowSum = 0;
      }
    }
    const dt = Math.min(raw, 0.033);
    if (!still && made) {
      time += dt;
      draft(time);
      simulate(dt);
    }
    split = running ? split + (splitTarget - split) * Math.min(1, dt * 18) : splitTarget;
    if (made) draw();
    if (first && made) {
      first = false;
      onFirstFrame();
    }
  }

  // runs only while the hero is on screen and the tab is visible
  function sync() {
    const should = !still && onScreen && document.visibilityState === "visible";
    if (should !== running) {
      running = should;
      renderer.setAnimationLoop(should ? frame : null);
    }
  }
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  document.addEventListener("visibilitychange", sync);
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointerdown", onDown);
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
      disposeTargets();
      quad.geometry.dispose();
      [splatM, curlM, vortM, divM, presM, gradM, advM, offM, sceneM, brightM, blurM, compM, ...particleMats].forEach((m) => m.dispose());
      sparks.geometry.dispose();
      flour.geometry.dispose();
      renderer.dispose();
    },
  };
}
