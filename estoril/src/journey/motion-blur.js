// Camera motion blur for the fast on-track stretch (high quality only).
//
// The scene is rendered into a multisampled HDR target with a depth texture. A full-screen pass
// reconstructs each pixel's world position from depth (inverse of this frame's view-projection),
// reprojects it with the previous frame's view-projection and smears the colour along the screen
// space difference. The car is rendered separately into a mask (layer CAR_MASK_LAYER, white on
// black) so it stays sharp and is never smeared into the background. Tone mapping and the output
// colour space are applied in the pass (except for the sky, which is display-referred already).
import {
  DepthTexture,
  HalfFloatType,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget,
} from 'three';
import { clamp, smoothstep } from './util/math.js';

/** Object layer of the meshes that go into the car mask. */
const CAR_MASK_LAYER = 1;

/** Puts every mesh of the car (except those flagged userData.noMask, e.g. contact shadows) on the mask layer. */
function tagCarForMask(root) {
  root.traverse((node) => {
    if (node.isMesh && !node.userData.noMask) node.layers.enable(CAR_MASK_LAYER);
  });
}

/**
 * Creates the render targets and the blur pass, or returns null when quality is not 'high' or the
 * setup throws. Targets start at 4×4 and follow the drawing buffer size on use.
 */
function createMotionBlur(quality) {
  if (quality !== 'high') return null;
  try {
    // scene colour (HDR, 4× MSAA) with a depth texture; the car mask
    const sceneTarget = new WebGLRenderTarget(4, 4, { type: HalfFloatType, samples: 4 });
    sceneTarget.depthTexture = new DepthTexture(4, 4);
    const maskTarget = new WebGLRenderTarget(4, 4);
    const material = new ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tColor: { value: sceneTarget.texture },
        tDepth: { value: sceneTarget.depthTexture },
        tMask: { value: maskTarget.texture },
        uInvVP: { value: new Matrix4() },
        uPrevVP: { value: new Matrix4() },
        uAmt: { value: 0 },
      },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      // velocity = (uv - previous uv) * uAmt, zeroed on the car, capped at 1.6% of the screen;
      // 8 taps centred on the pixel, mask-weighted
      fragmentShader: `uniform sampler2D tColor, tDepth, tMask; uniform mat4 uInvVP, uPrevVP; uniform float uAmt; varying vec2 vUv;
          vec3 toDisplay(vec3 c, float d) {
            if (d > .99999) return c;                       // the sky is authored for display already
            #ifdef TONE_MAPPING
            c = toneMapping(c);
            #endif
            return linearToOutputTexel(vec4(c, 1.)).rgb;
          }
          void main() {
            float d = texture2D(tDepth, vUv).x;
            vec4 wp = uInvVP * vec4(vUv * 2. - 1., d * 2. - 1., 1.); wp /= wp.w;
            vec4 pp = uPrevVP * wp; vec2 prevUv = pp.xy / pp.w * .5 + .5;
            vec2 vel = (vUv - prevUv) * uAmt * (1. - texture2D(tMask, vUv).r);
            float len = length(vel), maxLen = .016;
            if (len > maxLen) vel *= maxLen / len;
            vec3 acc = toDisplay(texture2D(tColor, vUv).rgb, d); float wsum = 1.;
            for (int i = 0; i < 8; i++) {
              vec2 uv = vUv + vel * (float(i) / 7. - .5);
              float w = 1. - texture2D(tMask, uv).r;           // never smear the car into the background
              acc += toDisplay(texture2D(tColor, uv).rgb, texture2D(tDepth, uv).x) * w; wsum += w;
            }
            gl_FragColor = vec4(acc / wsum + (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
          }`,
    });
    const quad = new Mesh(new PlaneGeometry(2, 2), material); // full-screen, positions are clip space
    quad.frustumCulled = false;
    const passScene = new Scene();
    passScene.add(quad);
    return {
      rt: sceneTarget,
      maskRT: maskTarget,
      mat: material,
      pScene: passScene,
      pCam: new OrthographicCamera(-1, 1, 1, -1, 0, 1),
      maskMat: new MeshBasicMaterial({ color: 16777215, fog: false }),
      vp: new Matrix4(), // this frame's view-projection
      prev: new Matrix4(), // last rendered frame's view-projection
      size: new Vector2(),
      ok: true, // false after a failure: plain rendering from then on
    };
  } catch {
    return null;
  }
}

/** Blur strength 0..1: fades in over progress 0.39–0.425 and out over 0.565–0.6 (the lap). */
function motionBlurAmount(blur, progress) {
  return blur
    ? smoothstep(clamp((progress - 0.39) / 0.035, 0, 1)) *
        (1 - smoothstep(clamp((progress - 0.565) / 0.035, 0, 1)))
    : 0;
}

/**
 * Renders the frame to the canvas: through the blur pass when `amount` is noticeable, otherwise
 * directly. Always records this frame's view-projection as the next frame's "previous", so the
 * blur of a frame depends on the frame rendered before it.
 */
function renderWithMotionBlur(renderer, scene, camera, blur, amount) {
  camera.updateMatrixWorld();
  if (blur) blur.vp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  if (amount > 0.002 && blur && blur.ok) {
    try {
      // 1. the scene into the HDR target (colour + depth)
      renderer.getDrawingBufferSize(blur.size);
      const width = blur.size.x;
      const height = blur.size.y;
      if (blur.rt.width !== width || blur.rt.height !== height) {
        blur.rt.setSize(width, height);
        blur.maskRT.setSize(width, height);
      }
      renderer.setRenderTarget(blur.rt);
      renderer.render(scene, camera);
      // 2. the car mask: same camera, car layer only, flat white, shadow maps not re-rendered
      const shadowAutoUpdate = renderer.shadowMap.autoUpdate;
      renderer.shadowMap.autoUpdate = false;
      const overrideMaterial = scene.overrideMaterial;
      const background = scene.background;
      scene.overrideMaterial = blur.maskMat;
      camera.layers.set(CAR_MASK_LAYER);
      renderer.setRenderTarget(blur.maskRT);
      renderer.setClearColor(0, 1);
      renderer.clear();
      renderer.render(scene, camera);
      camera.layers.set(0);
      scene.overrideMaterial = overrideMaterial;
      scene.background = background;
      renderer.shadowMap.autoUpdate = shadowAutoUpdate;
      // 3. the blur pass to the canvas
      blur.mat.uniforms.uInvVP.value.copy(blur.vp).invert();
      blur.mat.uniforms.uPrevVP.value.copy(blur.prev);
      blur.mat.uniforms.uAmt.value = amount * 0.35;
      renderer.setRenderTarget(null);
      renderer.render(blur.pScene, blur.pCam);
    } catch {
      blur.ok = false;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    }
  } else renderer.render(scene, camera);
  if (blur) blur.prev.copy(blur.vp);
}

export { CAR_MASK_LAYER, createMotionBlur, motionBlurAmount, renderWithMotionBlur, tagCarForMask };
