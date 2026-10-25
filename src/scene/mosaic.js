import * as THREE from 'three';
import { generateMosaic } from './mosaicGen.js';
import MosaicWorker from './mosaicWorker.js?worker';
import { PALETTES } from '../config.js';

// Prefer a worker so the intro stays smooth; fall back to time-sliced main-thread work.
function generate(params) {
  return new Promise((resolve) => {
    let worker;
    try {
      worker = new MosaicWorker();
    } catch (err) {
      resolve(generateMosaic(params));
      return;
    }
    worker.onmessage = (e) => { resolve(e.data); worker.terminate(); };
    worker.onerror = () => { worker.terminate(); resolve(generateMosaic(params)); };
    worker.postMessage(params);
  });
}

const hexToRgb = (h) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

function makeTexture(data, size, srgb) {
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 8;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// Holds the tessera structure and produces colour textures per palette.
export class MosaicTextures {
  constructor() {
    this.structure = null;
    this.cache = new Map();
  }

  // Keep GPU memory in check: only the current and previous palettes stay resident.
  trim(keep) {
    for (const [key, tex] of this.cache) {
      if (!keep.includes(key)) { tex.dispose(); this.cache.delete(key); }
    }
  }

  async build(size) {
    this.structure = await generate({ size, tilesU: 4, tilesV: 4, cellsPerTile: 34 });
    const { grout, normal, shade } = this.structure;
    const N = size * size;
    // aux: R = grout mask, G = per-piece brightness variation
    const aux = new Uint8Array(N * 4);
    for (let i = 0; i < N; i++) {
      aux[i * 4] = grout[i];
      aux[i * 4 + 1] = shade[i];
      aux[i * 4 + 3] = 255;
    }
    this.aux = makeTexture(aux, size, false);
    this.normal = makeTexture(normal, size, false);
  }

  // RGB = glass colour, A = per-piece random used for the piece-by-piece palette change
  color(paletteKey) {
    if (this.cache.has(paletteKey)) return this.cache.get(paletteKey);
    const { size, slot, grout, rnd, shade } = this.structure;
    const pal = PALETTES[paletteKey];
    const slots = pal.slots.map(hexToRgb);
    const g = hexToRgb(pal.grout);
    const N = size * size;
    const out = new Uint8Array(N * 4);
    for (let i = 0; i < N; i++) {
      const c = slots[slot[i]];
      const v = (shade[i] - 128) / 128; // hand-made colour variation between pieces
      const k = 1 + v * 0.35;
      const gm = grout[i] / 255;
      for (let ch = 0; ch < 3; ch++) {
        const glass = Math.min(255, c[ch] * k);
        out[i * 4 + ch] = glass * (1 - gm) + g[ch] * gm;
      }
      out[i * 4 + 3] = rnd[i];
    }
    const tex = makeTexture(out, size, true);
    this.cache.set(paletteKey, tex);
    return tex;
  }
}

// Soft, coloured light pattern thrown by the globes onto the walls and ceiling.
export function makeLightPattern(paletteKey, size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  drawLightPattern(canvas, paletteKey);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function drawLightPattern(canvas, paletteKey) {
  const size = canvas.width;
  const ctx = canvas.getContext('2d');
  const pal = PALETTES[paletteKey];
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'lighter';
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const cx = size / 2, cy = size / 2;
  // rings of dapples, like light through rosettes
  for (let ring = 0; ring < 9; ring++) {
    const r = (ring + 0.5) * size * 0.055;
    const count = 8 + ring * 8;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + ring * 0.21 + rand() * 0.05;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      const col = pal.slots[1 + Math.floor(rand() * 4)];
      const rad = size * (0.018 + rand() * 0.022);
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, col);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.55 + rand() * 0.45;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // warm white core and edge falloff
  ctx.globalAlpha = 1;
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.5);
  core.addColorStop(0, 'rgba(255,214,160,0.55)');
  core.addColorStop(0.35, 'rgba(255,190,130,0.12)');
  core.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'destination-in';
  const fall = ctx.createRadialGradient(cx, cy, size * 0.25, cx, cy, size * 0.5);
  fall.addColorStop(0, 'rgba(0,0,0,1)');
  fall.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = fall;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'source-over';
}
