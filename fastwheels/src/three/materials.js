// The wrap film and the glass. Every wrappable panel of a vehicle shares that vehicle's single paint material,
// which the configurator recolours with applyPaint().
import * as THREE from 'three';

export const FINISHES = ['gloss', 'satin', 'matte'];
export const EFFECTS = ['solid', 'metallic', 'pearl'];

const FINISH = {
  gloss: { roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.03, env: 1.0 },
  satin: { roughness: 0.42, clearcoat: 0.55, clearcoatRoughness: 0.34, env: 0.95 },
  matte: { roughness: 0.78, clearcoat: 0.08, clearcoatRoughness: 0.7, env: 0.8 },
};
const EFFECT = {
  solid: { metalness: 0, iridescence: 0, flake: 0, roughnessScale: 1 },
  metallic: { metalness: 0.72, iridescence: 0, flake: 0.5, roughnessScale: 1.5 },
  pearl: { metalness: 0.3, iridescence: 0.6, flake: 0.26, roughnessScale: 1.25 },
};

export function createPaint() {
  const m = new THREE.MeshPhysicalMaterial({ color: 0x14246e, roughness: 0.22, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03 });
  m.iridescenceIOR = 1.45;
  m.iridescenceThicknessRange = [180, 520];
  m.name = 'paint';
  m.userData.isPaint = true;
  const flake = { value: 0 };
  m.userData.flake = flake;
  // Metallic flake: tiny facets under the clear coat, each tilted a little. The clear coat itself stays smooth.
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uFlake = flake;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vFlakePos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvFlakePos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vFlakePos;
uniform float uFlake;
vec3 flakeHash(vec3 p) { p = fract(p * vec3(0.1031, 0.1030, 0.0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx); }`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
if (uFlake > 0.0) {
  vec3 fp = vFlakePos * 1500.0;
  float fw = max(fwidth(fp.x), max(fwidth(fp.y), fwidth(fp.z)));
  float keep = clamp(1.5 - fw * 0.9, 0.0, 1.0);                 // fade the flakes out when they get smaller than a pixel
  normal = normalize(normal + (flakeHash(floor(fp)) - 0.5) * uFlake * keep);
}`);
  };
  return m;
}

/** Recolour a paint material. `hex` is a CSS hex string or a number. */
export function applyPaint(material, { hex, finish = 'gloss', effect = 'solid' }) {
  const f = FINISH[finish] || FINISH.gloss;
  const e = EFFECT[effect] || EFFECT.solid;
  const matte = finish === 'matte';
  if (hex !== undefined) material.color.set(hex);
  material.roughness = Math.min(1, f.roughness * e.roughnessScale);
  material.metalness = e.metalness * (matte ? 0.8 : 1);
  material.clearcoat = f.clearcoat;
  material.clearcoatRoughness = f.clearcoatRoughness;
  material.iridescence = e.iridescence * (matte ? 0.6 : 1);
  material.envMapIntensity = f.env;
  material.userData.flake.value = e.flake * (matte ? 0.6 : 1);
}

/**
 * Glass: mirrors the workshop, more strongly at grazing angles, and darkens what is behind it.
 * It ignores the small cabin lights on purpose (no stray point highlights on the windows).
 */
export function createGlass(hex, opacity, reflectivity, environment) {
  const m = new THREE.MeshBasicMaterial({ color: hex, envMap: environment, reflectivity, combine: THREE.MixOperation, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide });
  m.name = 'glass';
  m.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vFresnel;')
      .replace('#include <envmap_vertex>', `#include <envmap_vertex>
#ifdef USE_ENVMAP
  vec3 gN = inverseTransformDirection(transformedNormal, viewMatrix);
  vec3 gV = normalize(worldPosition.xyz - cameraPosition);
  vFresnel = pow(1.0 - abs(dot(normalize(gN), gV)), 3.0);
#endif`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vFresnel;')
      .replace('#include <envmap_fragment>', `specularStrength = min(1.0 / max(reflectivity, 0.001), 0.55 + 2.6 * vFresnel);
#include <envmap_fragment>
diffuseColor.a = mix(diffuseColor.a, 0.96, vFresnel);`);
  };
  return m;
}
