// Camera motion blur for the chase on the lap (high quality only), used sparingly.
//
// When it is on, the scene is rendered into a multisampled target with a depth texture. A
// full-screen pass reconstructs each pixel's world position from depth (inverse of this frame's
// view-projection), reprojects it with the previous frame's view-projection and averages the colour
// along a fraction (SHUTTER) of the screen-space difference.
//
// The target holds the frame exactly as the canvas would: three r170 draws into a render target in
// linear light without tone mapping, except into an XR target, which it draws like the canvas (tone
// mapping, the target texture's colour space as the output encoding, the fog and clear colours
// encoded the same way). So the target is flagged as one, with an sRGB texture (half float: three
// stores the encoded values as they are). Every material, the display-colour sky dome, the cloud
// sprites over it and the fog then come out identical on both paths, and at zero velocity the pass
// returns the direct frame: the blur fades in and out by its velocity scale, with no jump where it
// starts or stops (the old HDR path left everything at depth 1 untone-mapped, so the cloud sprites
// over the sky turned from grey to white, +5.4/255 on the whole frame, when it switched on). The
// materials also compile to the same programs on both paths. The average is taken over display
// values, which is a little darker than averaging light on high-contrast edges and invisible over
// the ≤ 11.5 px the blur is allowed to reach.
//
// What keeps it sparing and clean:
//   when   motionBlurAmount(): only while the camera chases the car on the lap (progress 0.43–0.635)
//          and is near the ground; it is zero in the whole aerial (docs/diagnosis O1: it used to
//          switch on at 0.39 while the camera was still ~300 m up and smear the overhead shot)
//   where  the car is rendered into a mask (layer CAR_MASK_LAYER) and is neither smeared nor
//          smeared into its surroundings; the velocity is capped at MAX_BLUR_FRACTION of the image
//          width (11.5 px at 1440 px), so thin lines and kerbs stay readable; taps on a surface more
//          than DEPTH_TOLERANCE nearer or farther than the pixel weigh little, so foreground edges do
//          not bleed into the background and the other way round
//   how    TAPS taps spread over the blur segment with a per-pixel offset (interleaved gradient
//          noise), so a long blur becomes fine grain instead of TAPS distinct ghost copies: those
//          copies of the red line, the mint run-off and the blue kerbs were the cyan/red "fringes"
//          of the blurred aerial frames
//   history  the previous view-projection is reset by resetMotionBlur() (jump, renderAt stills,
//          resize, the page becoming visible, warmup), so the first frame after a cut is sharp
// render allocates nothing.
import {
  Color,
  DepthTexture,
  HalfFloatType,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget,
} from 'three';
import { clamp, smoothstep } from './util/math.js';

/** Object layer of the meshes that go into the car mask. */
const CAR_MASK_LAYER = 1;
/** Fraction of the frame-to-frame motion that is smeared (a 126° shutter). */
const SHUTTER = 0.35;
/** Velocity cap as a fraction of the image width. */
const MAX_BLUR_FRACTION = 0.008;
/** Relative view-depth difference beyond which a tap counts as another surface. */
const DEPTH_TOLERANCE = 0.06;
/** Taps along the blur segment. */
const TAPS = 10;
/** The blur fades in and out over these progress ranges (the lap chase)… */
const BLUR_IN = [0.43, 0.45];
const BLUR_OUT = [0.6, 0.635];
/** …and fades out as the camera climbs between these heights above the car (metres). */
const BLUR_HEIGHT = [6, 14];
/** Amounts below this render directly (no blur pass). */
const MIN_AMOUNT = 0.002;

/** Puts every mesh of the car (except those flagged userData.noMask, e.g. contact shadows) on the mask layer. */
function tagCarForMask(root) {
  root.traverse((node) => {
    if (node.isMesh && !node.userData.noMask) node.layers.enable(CAR_MASK_LAYER);
  });
}

/**
 * Puts every light under `root` (the sun, the sky fill, the garage lamp) on the mask layer too. The
 * mask pass draws only the car (flat white, unlit), but three.js sets up the lights of each render
 * from those the camera's layers see, and the programs of lit materials are keyed to that setup: a
 * mask pass without the lights made every lit material of the scene look its program up again on the
 * next frame (~100 lookups and ~200 KB of garbage per frame during the lap). With the same lights,
 * both passes share one setup. Call once the scene is built.
 */
function addLightsToMask(root) {
  root.traverse((node) => {
    if (node.isLight) node.layers.enable(CAR_MASK_LAYER);
  });
}

/**
 * Creates the render targets and the blur pass, or returns null when quality is not 'high' or the
 * setup throws. Targets start at 4×4 and follow the drawing buffer size on use.
 */
function createMotionBlur(quality) {
  if (quality !== 'high') return null;
  try {
    // the frame as the canvas would show it (4× MSAA, see the header) with a depth texture; the car mask
    const sceneTarget = new WebGLRenderTarget(4, 4, {
      type: HalfFloatType,
      samples: 4,
      colorSpace: SRGBColorSpace,
    });
    sceneTarget.isXRRenderTarget = true; // drawn like the canvas (header)
    sceneTarget.depthTexture = new DepthTexture(4, 4);
    // no depth buffer: the mask is the union of the car's fragments, which no depth test changes
    const maskTarget = new WebGLRenderTarget(4, 4, { depthBuffer: false });
    const material = new ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      toneMapped: false, // the target is already tone-mapped and encoded
      defines: { TAPS },
      uniforms: {
        tColor: { value: sceneTarget.texture },
        tDepth: { value: sceneTarget.depthTexture },
        tMask: { value: maskTarget.texture },
        uInvVP: { value: new Matrix4() },
        uPrevVP: { value: new Matrix4() },
        uAmt: { value: 0 },
        uMaxLen: { value: MAX_BLUR_FRACTION },
        uAspect: { value: 1 },
        uNearFar: { value: new Vector2(0.3, 9000) },
        uDepthTolerance: { value: DEPTH_TOLERANCE },
      },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `uniform sampler2D tColor, tDepth, tMask; uniform mat4 uInvVP, uPrevVP;
          uniform float uAmt, uMaxLen, uAspect, uDepthTolerance; uniform vec2 uNearFar; varying vec2 vUv;
          // view distance of a depth-buffer value (perspective projection)
          float viewDepth(float d) {
            float n = uNearFar.x, f = uNearFar.y;
            return (n * f) / (f - d * (f - n));
          }
          void main() {
            float d = texture2D(tDepth, vUv).x;
            vec3 base = texture2D(tColor, vUv).rgb;
            float mask = texture2D(tMask, vUv).r;
            vec4 wp = uInvVP * vec4(vUv * 2. - 1., d * 2. - 1., 1.); wp /= wp.w;
            vec4 pp = uPrevVP * wp; vec2 prevUv = pp.xy / pp.w * .5 + .5;
            vec2 vel = (vUv - prevUv) * uAmt * (1. - mask);
            // cap the length, measured in image widths
            vec2 inWidths = vec2(vel.x, vel.y / uAspect);
            float len = length(inWidths);
            if (len > uMaxLen) vel *= uMaxLen / len;
            vec3 acc = base; float wsum = 1.;
            if (len > 1e-5 && d < .99999) {
              float z = viewDepth(d);
              float jitter = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
              for (int i = 0; i < TAPS; i++) {
                vec2 uv = vUv + vel * ((float(i) + jitter) / float(TAPS) - .5);
                float tapDepth = texture2D(tDepth, uv).x;
                float dz = abs(viewDepth(tapDepth) - z) / z;
                float w = (1. - texture2D(tMask, uv).r) * mix(1., .1, smoothstep(uDepthTolerance * .5, uDepthTolerance, dz));
                acc += texture2D(tColor, uv).rgb * w; wsum += w;
              }
            }
            // the frame is already dithered; averaging smooths that out, so blurred pixels get it back
            float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5;
            gl_FragColor = vec4(acc / wsum + noise * clamp(len * 400., 0., 1.) / 255., 1.);
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
      hasPrev: false, // false after a cut: the next frame takes its own view-projection as previous
      size: new Vector2(),
      clearColor: new Color(), // scratch: the renderer's clear colour, restored after the mask
      ok: true, // false after a failure: plain rendering from then on
    };
  } catch {
    return null;
  }
}

/** Forgets the previous frame (a cut): the next frame renders without blur. */
function resetMotionBlur(blur) {
  if (blur) blur.hasPrev = false;
}

/**
 * Blur strength 0..1: on during the lap chase (fading in over BLUR_IN and out over BLUR_OUT) while
 * the camera is low (fading out between BLUR_HEIGHT metres above the car), zero otherwise.
 */
function motionBlurAmount(blur, progress, cameraHeight) {
  if (!blur) return 0;
  const lap =
    smoothstep(clamp((progress - BLUR_IN[0]) / (BLUR_IN[1] - BLUR_IN[0]), 0, 1)) *
    (1 - smoothstep(clamp((progress - BLUR_OUT[0]) / (BLUR_OUT[1] - BLUR_OUT[0]), 0, 1)));
  const low =
    1 - smoothstep(clamp((cameraHeight - BLUR_HEIGHT[0]) / (BLUR_HEIGHT[1] - BLUR_HEIGHT[0]), 0, 1));
  return lap * low;
}

/**
 * Renders the frame to the canvas: through the blur pass when `amount` is noticeable, otherwise
 * directly. Records this frame's view-projection as the next frame's "previous" (after a reset the
 * current one stands in, so that frame has no blur).
 */
function renderWithMotionBlur(renderer, scene, camera, blur, amount) {
  camera.updateMatrixWorld();
  if (blur) {
    blur.vp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    if (!blur.hasPrev) blur.prev.copy(blur.vp);
  }
  if (amount > MIN_AMOUNT && blur && blur.ok) {
    try {
      // 1. the frame into the target (colour as the canvas would show it, and depth)
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
      const clearAlpha = renderer.getClearAlpha();
      renderer.getClearColor(blur.clearColor);
      scene.overrideMaterial = blur.maskMat;
      camera.layers.set(CAR_MASK_LAYER);
      renderer.setRenderTarget(blur.maskRT);
      renderer.setClearColor(0, 1);
      renderer.clear();
      renderer.render(scene, camera);
      camera.layers.set(0);
      scene.overrideMaterial = overrideMaterial;
      renderer.setClearColor(blur.clearColor, clearAlpha);
      renderer.shadowMap.autoUpdate = shadowAutoUpdate;
      // 3. the blur pass to the canvas
      const uniforms = blur.mat.uniforms;
      uniforms.uInvVP.value.copy(blur.vp).invert();
      uniforms.uPrevVP.value.copy(blur.prev);
      uniforms.uAmt.value = amount * SHUTTER;
      uniforms.uAspect.value = width / height;
      uniforms.uNearFar.value.set(camera.near, camera.far);
      renderer.setRenderTarget(null);
      renderer.render(blur.pScene, blur.pCam);
    } catch {
      blur.ok = false;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    }
  } else renderer.render(scene, camera);
  if (blur) {
    blur.prev.copy(blur.vp);
    blur.hasPrev = true;
  }
}

export {
  CAR_MASK_LAYER,
  addLightsToMask,
  createMotionBlur,
  motionBlurAmount,
  renderWithMotionBlur,
  resetMotionBlur,
  tagCarForMask,
};
