// WebGL renderer setup, quality tiers and drawing-buffer sizing.
//
// Quality tiers ('high' | 'mid' | 'low', chosen by home.js):
//   high  antialias, soft shadows (4096² map if the GPU allows 8192² textures), pixel ratio ≤ 2,
//         16× anisotropy, 256² environment cube, motion blur
//   mid   antialias, soft shadows (2048²), pixel ratio ≤ 1.75, 8× anisotropy, 128² cube
//   low   no antialias, no shadows, pixel ratio 1, 2× anisotropy, 128² cube
// The renderer's own pixel ratio stays 1: sizes are computed here in device pixels.
import { AgXToneMapping, PCFSoftShadowMap, SRGBColorSpace, WebGLRenderer } from 'three';

function maxPixelRatioFor(quality) {
  return quality === 'high' ? 2 : quality === 'mid' ? 1.75 : 1;
}

function createRenderer(canvas, quality) {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: quality !== 'low',
    powerPreference: 'high-performance',
    alpha: false,
  });
  renderer.setPixelRatio(1);
  renderer.toneMapping = AgXToneMapping;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = quality !== 'low';
  renderer.shadowMap.type = PCFSoftShadowMap;
  return renderer;
}

/**
 * Keeps the drawing buffer at CSS size × min(devicePixelRatio, maxPixelRatio) × resScale and the
 * camera aspect in sync. Uses a ResizeObserver (device-pixel-content-box when supported, so a full
 * resolution buffer matches the screen's pixels exactly) and falls back to getBoundingClientRect.
 * update() is called at the start of every rendered frame; it only resizes when the size changed.
 */
function createViewport(canvas, renderer, camera, maxPixelRatio) {
  let cssWidth = 0;
  let cssHeight = 0;
  let deviceWidth = 0; // device-pixel-content-box size, 0 when unknown
  let deviceHeight = 0;
  let width = 0; // current drawing buffer size (device pixels)
  let height = 0;
  let resScale = 1; // dynamic resolution factor set by home.js (0.2..1)
  const observer =
    typeof ResizeObserver == 'function'
      ? new ResizeObserver((entries) => {
          for (const entry of entries) {
            cssWidth = entry.contentRect.width;
            cssHeight = entry.contentRect.height;
            const box = entry.devicePixelContentBoxSize && entry.devicePixelContentBoxSize[0];
            deviceWidth = box ? box.inlineSize : 0;
            deviceHeight = box ? box.blockSize : 0;
          }
        })
      : null;
  if (observer) {
    try {
      observer.observe(canvas, { box: 'device-pixel-content-box' });
    } catch {
      observer.observe(canvas);
    }
  }
  function update() {
    if (!observer || !cssWidth) {
      const rect = canvas.getBoundingClientRect();
      cssWidth = rect.width;
      cssHeight = rect.height;
    }
    const dpr = window.devicePixelRatio || 1;
    const ratio = Math.min(dpr, maxPixelRatio) * resScale;
    let w, h;
    // at full device resolution, take the exact device-pixel box when it agrees with CSS × dpr
    if (
      deviceWidth &&
      ratio >= dpr - 0.001 &&
      Math.abs(deviceWidth - cssWidth * dpr) <= 2 &&
      Math.abs(deviceHeight - cssHeight * dpr) <= 2
    ) {
      w = deviceWidth;
      h = deviceHeight;
    } else {
      w = Math.max(1, Math.round(cssWidth * ratio));
      h = Math.max(1, Math.round(cssHeight * ratio));
    }
    if (w !== width || h !== height) {
      width = w;
      height = h;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }
  return {
    update,
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get resScale() {
      return resScale;
    },
    set resScale(value) {
      resScale = value;
    },
  };
}

const TEXTURE_SLOTS = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'bumpMap', 'alphaMap'];

/** Raises texture anisotropy on every material map in `scene` (render-target textures excluded). */
function applyAnisotropy(scene, renderer, quality) {
  const anisotropy = Math.min(
    quality === 'high' ? 16 : quality === 'mid' ? 8 : 2,
    renderer.capabilities.getMaxAnisotropy(),
  );
  if (!(anisotropy > 1)) return;
  scene.traverse((node) => {
    if (!node.material) return;
    for (const material of [].concat(node.material))
      for (const slot of TEXTURE_SLOTS) {
        const texture = material[slot];
        if (
          texture &&
          texture.isTexture &&
          !texture.isRenderTargetTexture &&
          texture.anisotropy < anisotropy
        ) {
          texture.anisotropy = anisotropy;
          texture.needsUpdate = true;
        }
      }
  });
}

/** Turns on dithering for every standard/basic/lambert/phong material in `scene` (avoids banding). */
function enableDithering(scene) {
  scene.traverse((node) => {
    if (!node.material) return;
    for (const material of [].concat(node.material))
      if (
        material.isMeshStandardMaterial ||
        material.isMeshBasicMaterial ||
        material.isMeshLambertMaterial ||
        material.isMeshPhongMaterial
      )
        material.dithering = true;
  });
}

export { applyAnisotropy, createRenderer, createViewport, enableDithering, maxPixelRatioFor };
