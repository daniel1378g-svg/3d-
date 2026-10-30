// Atmosphere: embers rising from the grill below, a little smoke and steam, and a dark background with blurred fire
// (bokeh). Everything is computed on the GPU from time and per-particle seeds: no per-frame CPU work.
import * as THREE from "three";
import { NOISE } from "./glsl";

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

/** Embers: points with a hot core; the ones close to the lens are large, soft and dim (out of focus). */
export function createEmbers(count: number, pixelRatio: number) {
  const r = rng(91);
  const seeds = new Float32Array(count * 4);
  const base = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const near = i % 13 === 0; // a few embers drift close to the camera (out of focus)
    base[i * 3] = (r() - 0.5) * (near ? 5 : 8);
    base[i * 3 + 1] = -3.4 - r() * 1.2;
    base[i * 3 + 2] = near ? 2.0 + r() * 3.0 : -3.5 + r() * 5.0;
    seeds[i * 4] = r();
    seeds[i * 4 + 1] = r();
    seeds[i * 4 + 2] = r();
    seeds[i * 4 + 3] = near ? 1 : 0;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(base, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
  const uniforms = {
    uTime: { value: 0 },
    uAmount: { value: 0 },
    uPixel: { value: pixelRatio },
    uScale: { value: 900 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute vec4 aSeed;
      uniform float uTime, uAmount, uPixel, uScale;
      varying float vAlpha;
      varying float vHeat;
      varying float vSoft;
      void main() {
        float speed = mix(0.07, 0.16, aSeed.x);
        float age = fract(uTime * speed + aSeed.y);
        vec3 p = position;
        p.y += age * mix(6.5, 9.0, aSeed.z);
        float sway = sin(uTime * (0.6 + aSeed.x) + aSeed.y * 40.0) * 0.35 + sin(uTime * 1.7 + aSeed.z * 30.0) * 0.12;
        p.x += sway * age * 1.4 + (aSeed.z - 0.5) * age * 1.6;
        p.z += cos(uTime * 0.8 + aSeed.x * 20.0) * 0.25 * age;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float near = aSeed.w;
        float size = mix(1.4, 3.6, aSeed.x * aSeed.x) * mix(1.0, 5.5, near);
        gl_PointSize = size * uPixel * uScale / -mv.z * 0.012;
        float flicker = 0.65 + 0.35 * sin(uTime * (7.0 + aSeed.z * 9.0) + aSeed.x * 50.0);
        vAlpha = smoothstep(0.0, 0.08, age) * (1.0 - smoothstep(0.55, 1.0, age)) * flicker * uAmount * mix(1.0, 0.14, near);
        vHeat = 1.0 - age;
        vSoft = near;
      }`,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      varying float vHeat;
      varying float vSoft;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float r = length(c) * 2.0;
        float disc = vSoft > 0.5 ? smoothstep(1.0, 0.75, r) * (0.75 + 0.25 * smoothstep(0.55, 0.95, r)) : pow(max(0.0, 1.0 - r), 2.2);
        vec3 hot = vec3(1.0, 0.82, 0.48);
        vec3 cool = vec3(1.0, 0.32, 0.06);
        vec3 col = mix(cool, hot, vHeat * vHeat) * mix(3.2, 1.4, vSoft);
        gl_FragColor = vec4(col * disc * vAlpha, 1.0);
      }`,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.renderOrder = 5;
  return { points, uniforms, material: mat };
}

/** Smoke and steam: camera-facing soft noise puffs that rise, widen and fade. */
export function createSmoke(count: number) {
  const r = rng(7);
  const geo = new THREE.InstancedBufferGeometry();
  const quad = new THREE.PlaneGeometry(1, 1);
  geo.index = quad.index;
  geo.setAttribute("position", quad.getAttribute("position"));
  geo.setAttribute("uv", quad.getAttribute("uv"));
  const offs = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    offs[i * 3] = (r() - 0.5) * 1.6;
    offs[i * 3 + 1] = -1.8 + r() * 1.2;
    offs[i * 3 + 2] = (r() - 0.5) * 1.2;
    seeds[i * 2] = r();
    seeds[i * 2 + 1] = r();
  }
  geo.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offs, 3));
  geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 2));
  geo.instanceCount = count;
  const uniforms = { uTime: { value: 0 }, uAmount: { value: 0 }, uWarm: { value: new THREE.Color("#ff9a4d") } };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      attribute vec3 aOffset;
      attribute vec2 aSeed;
      uniform float uTime;
      varying vec2 vUv;
      varying float vAge;
      varying vec2 vSeed;
      void main() {
        float age = fract(uTime * mix(0.045, 0.08, aSeed.x) + aSeed.y);
        vec3 c = aOffset;
        c.y += age * 4.2;
        c.x += sin(age * 4.0 + aSeed.x * 20.0) * 0.35 * age;
        float size = mix(0.9, 2.8, age) * mix(0.8, 1.3, aSeed.y);
        vec4 mv = modelViewMatrix * vec4(c, 1.0);
        float rot = (aSeed.x - 0.5) * 6.0 + age * (aSeed.y - 0.5) * 2.0;
        vec2 q = vec2(cos(rot) * position.x - sin(rot) * position.y, sin(rot) * position.x + cos(rot) * position.y);
        mv.xy += q * size;
        gl_Position = projectionMatrix * mv;
        vUv = uv; vAge = age; vSeed = aSeed;
      }`,
    fragmentShader: /* glsl */ `
      #define OCTAVES 3
      uniform float uTime, uAmount;
      uniform vec3 uWarm;
      varying vec2 vUv;
      varying float vAge;
      varying vec2 vSeed;
      ${NOISE}
      void main() {
        vec2 p = vUv - 0.5;
        float r = length(p) * 2.0;
        float n = fbm3(vec3(p * 2.6 + vSeed * 9.0, uTime * 0.18 + vSeed.x * 5.0));
        float wisps = smoothstep(-0.15, 0.55, n + (1.0 - r) * 0.55);
        float a = wisps * smoothstep(1.0, 0.25, r) * smoothstep(0.0, 0.18, vAge) * (1.0 - smoothstep(0.45, 1.0, vAge));
        vec3 col = mix(vec3(0.32, 0.29, 0.27), uWarm * 0.9, smoothstep(0.1, 0.8, 1.0 - vUv.y) * 0.65);
        gl_FragColor = vec4(col, a * 0.075 * uAmount);
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 4;
  return { mesh, uniforms, material: mat };
}

/** Background: near-black with a warm glow from the grill, blurred flames and coals (bokeh), a soft vignette. */
export function createBackground() {
  const uniforms = { uTime: { value: 0 }, uLight: { value: 0 }, uAspect: { value: 1 }, uShift: { value: new THREE.Vector2() } };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    depthWrite: false,
    depthTest: false,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform float uTime, uLight, uAspect;
      uniform vec2 uShift;
      varying vec2 vUv;
      float h1(float n) { return fract(sin(n * 91.345) * 43758.5453); }
      void main() {
        vec2 uv = vUv + uShift;
        vec2 p = vec2((uv.x - 0.5) * uAspect, uv.y - 0.5);
        vec3 col = vec3(0.011, 0.008, 0.007);
        // grill glow from below right
        float g = exp(-pow(length(p - vec2(0.38 * uAspect, -0.62)) / 0.75, 2.0));
        col += vec3(0.42, 0.12, 0.025) * g * 0.55;
        float g2 = exp(-pow(length(p - vec2(-0.5 * uAspect, -0.7)) / 0.6, 2.0));
        col += vec3(0.25, 0.06, 0.012) * g2 * 0.35;
        // bokeh: blurred flames and coals, flickering
        for (int i = 0; i < 18; i++) {
          float fi = float(i);
          vec2 c = vec2((h1(fi) - 0.25) * 1.3 * uAspect, -0.48 + h1(fi + 7.0) * 0.5 - (fi > 12.0 ? 0.0 : 0.05));
          float rad = mix(0.025, 0.085, h1(fi + 3.0));
          float d = length(p - c);
          float disc = smoothstep(rad, rad * 0.82, d) * (0.7 + 0.3 * smoothstep(rad * 0.55, rad * 0.95, d));
          float fl = 0.65 + 0.35 * sin(uTime * (1.3 + h1(fi + 11.0) * 2.0) + fi * 3.0);
          vec3 bc = mix(vec3(1.0, 0.36, 0.06), vec3(1.0, 0.62, 0.22), h1(fi + 5.0));
          col += bc * disc * fl * 0.11 * smoothstep(0.15, -0.55, c.y);
        }
        float vig = smoothstep(1.25, 0.25, length(p * vec2(0.85, 1.05)));
        col *= mix(0.55, 1.0, vig);
        gl_FragColor = vec4(col * uLight, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return { mesh, uniforms, material: mat };
}
