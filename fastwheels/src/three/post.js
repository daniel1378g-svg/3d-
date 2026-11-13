// Post-processing: multisampled HDR render, ambient occlusion (high tier), a restrained bloom on the lights,
// then tone mapping. Built only on tiers that can afford it; the scene falls back to a direct render otherwise.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

// The bloom blurs the picture through ever smaller copies, so a single NaN or infinite pixel (an undefined
// shader result on some GPU, or a highlight brighter than a half-float can hold) would spread over the whole
// frame and turn it black. This pass removes such pixels and caps the brightness before the bloom sees them.
const Sanitize = {
  uniforms: { tDiffuse: { value: null } },
  vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    void main() {
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      if (any(isnan(c)) || !(c.r == c.r) || !(c.g == c.g) || !(c.b == c.b)) c = vec3(0.0);
      c = clamp(c, vec3(0.0), vec3(32.0));
      gl_FragColor = vec4(c, 1.0);
    }`,
};

export function createPost(renderer, scene, camera, { tier }) {
  const target = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: tier === 'high' ? 4 : 2 });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  let ao = null;
  if (tier === 'high') {
    ao = new GTAOPass(scene, camera, 4, 4);
    ao.updateGtaoMaterial({ radius: 0.32, distanceExponent: 1.4, thickness: 1.1, scale: 1.15, samples: 12, screenSpaceRadius: false });
    ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
    ao.blendIntensity = 0.85;
    composer.addPass(ao);
  }
  composer.addPass(new ShaderPass(Sanitize));
  const bloom = new UnrealBloomPass(new THREE.Vector2(4, 4), 0.2, 0.5, 1.35);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  return {
    composer, ao, bloom,
    setSize(width, height, pixelRatio) { composer.setPixelRatio(pixelRatio); composer.setSize(width, height); },
    render() { composer.render(); },
    dispose() { composer.dispose(); target.dispose(); },
  };
}
