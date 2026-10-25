import * as THREE from 'three';
import { FINISHES } from '../config.js';

// Colour temperature (Kelvin) → linear RGB, Tanner Helland approximation.
export function kelvinToColor(k, target = new THREE.Color()) {
  const t = k / 100;
  let r, g, b;
  if (t <= 66) { r = 255; g = 99.4708025861 * Math.log(t) - 161.1195681661; }
  else { r = 329.698727446 * Math.pow(t - 60, -0.1332047592); g = 288.1221695283 * Math.pow(t - 60, -0.0755148492); }
  if (t >= 66) b = 255; else if (t <= 19) b = 0; else b = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  const c = (v) => Math.min(255, Math.max(0, v)) / 255;
  return target.setRGB(c(r), c(g), c(b), THREE.SRGBColorSpace);
}

// Mosaic glass. Light from the bulb is modelled as emission filtered by each glass piece:
// brighter where the view is perpendicular to the surface (shorter path through the glass),
// softly diffused inside the glass thickness, blocked by the grout. The clear coat carries
// per-piece tilts, so reflections break up into the sparkle of hand-set glass.
export function createGlassMaterial(tex) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.62, 0.62, 0.62),
    map: tex.color,
    normalMap: tex.normal,
    normalScale: new THREE.Vector2(0.9, 0.9),
    roughness: 0.16,
    metalness: 0,
    ior: 1.52,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    clearcoatNormalMap: tex.normal,
    clearcoatNormalScale: new THREE.Vector2(0.7, 0.7),
    specularIntensity: 1,
    emissive: new THREE.Color(1, 1, 1),
  });
  const uniforms = {
    uMapPrev: { value: tex.color },
    uMix: { value: 1 },
    uAux: { value: tex.aux },
    uGlow: { value: 0 },
    uBulb: { value: new THREE.Color(1, 0.62, 0.32) },
    uHover: { value: 0 },
  };
  mat.userData.uniforms = uniforms;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform sampler2D uMapPrev;
        uniform sampler2D uAux;
        uniform float uMix;
        uniform float uGlow;
        uniform vec3 uBulb;
        uniform float uHover;`)
      .replace('#include <map_fragment>', `
        vec4 mosaicNew = texture2D( map, vMapUv );
        vec4 mosaicOld = texture2D( uMapPrev, vMapUv );
        // each glass piece switches colour at its own moment (alpha holds a per-piece random)
        float mosaicSwitch = step( mosaicNew.a, uMix );
        vec3 mosaicCol = mix( mosaicOld.rgb, mosaicNew.rgb, mosaicSwitch );
        diffuseColor.rgb *= mosaicCol;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        vec4 mosaicAux = texture2D( uAux, vMapUv );
        float mGrout = mosaicAux.r;
        roughnessFactor = mix( roughnessFactor, 0.88, mGrout );`)
      .replace('#include <emissivemap_fragment>', `
        {
          vec3 vdir = normalize( vViewPosition );
          float ndv = clamp( dot( normal, vdir ), 0.0, 1.0 );
          vec3 softCol = mix( texture2D( uMapPrev, vMapUv, 3.5 ).rgb, texture2D( map, vMapUv, 3.5 ).rgb, mosaicSwitch );
          vec3 glass = mix( mosaicCol, softCol, 0.38 );
          float lum = dot( glass, vec3( 0.2126, 0.7152, 0.0722 ) );
          float through = mix( 0.28, 1.3, pow( ndv, 1.35 ) ) * ( 0.78 + 0.44 * mosaicAux.g );
          // coloured glass filters the light: squaring in linear space keeps the jewel tones deep
          vec3 filtered = pow( glass, vec3( 1.45 ) ) * 1.55;
          vec3 transmitted = filtered * mix( 0.8, 1.2, lum ) * through;
          float glow = uGlow * ( 1.0 + 0.22 * uHover );
          // the cut edges at the openings leak no light
          float rim = smoothstep( 0.226, 0.25, vMapUv.y ) * ( 1.0 - smoothstep( 0.735, 0.758, vMapUv.y ) );
          totalEmissiveRadiance = transmitted * uBulb * glow * ( 1.0 - mGrout * 0.96 ) * rim;
          // a faint rim when hovered in the dark, so the globe still answers the pointer
          totalEmissiveRadiance += mosaicCol * uHover * 0.06 * ( 1.0 - ndv );
        }`);
  };
  mat.customProgramCacheKey = () => 'nur-mosaic-glass';
  return mat;
}

export function createBrassMaterial(maps) {
  const f = FINISHES.antique;
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(f.color),
    metalness: 1,
    roughness: f.rough,
    map: maps.detail,
    roughnessMap: maps.rough,
    clearcoat: 0,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.1,
  });
  return mat;
}

// The bulb inside each globe: hidden by the glass but seen through the openings.
export function createBulbMaterial() {
  return new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.7, 0.4), toneMapped: true });
}
