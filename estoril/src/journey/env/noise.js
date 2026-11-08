// One tileable noise image shared by the environment: the ground, track and vegetation shaders read
// it as a texture (world position / scale), and the vegetation placement reads the same values on
// the CPU (sampleNoise), so the grass patches, the scrub and the tree clusters line up.
//
// 256 × 256 texels, four channels, every one periodic over the image (no seam when tiled):
//   r  smooth fbm, 4 cells across, 5 octaves      broad patches (dry / green, wear, tone)
//   g  smooth fbm, 16 cells across, 3 octaves     mid-scale breakup
//   b  cellular (1 - nearest feature distance), 8 cells across: rounded clumps and blotches
//   a  white noise per texel                      grain, speckle, per-tile random values
// Values are 0..1 (fbm is remapped from about -0.7..0.7). Generated with typed arrays only, so it
// also works in Node (tests); the texture is a DataTexture (no canvas).
import { DataTexture, LinearFilter, LinearMipmapLinearFilter, RepeatWrapping, RGBAFormat } from 'three';
import { createRng } from '../util/rng.js';

const SIZE = 256;

let data = null;
let texture = null;

/** Periodic gradient noise on a `period`-cell lattice; x, y in cells. */
function periodicNoise(gradients, period, x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const corner = (cx, cy, dx, dy) => {
    const i = (((cx % period) + period) % period) + (((cy % period) + period) % period) * period;
    return gradients[2 * i] * dx + gradients[2 * i + 1] * dy;
  };
  const u = fade(fx);
  const v = fade(fy);
  const a = corner(x0, y0, fx, fy) + (corner(x0 + 1, y0, fx - 1, fy) - corner(x0, y0, fx, fy)) * u;
  const b =
    corner(x0, y0 + 1, fx, fy - 1) +
    (corner(x0 + 1, y0 + 1, fx - 1, fy - 1) - corner(x0, y0 + 1, fx, fy - 1)) * u;
  return a + (b - a) * v;
}

/** Random unit gradients for a period × period lattice. */
function gradientTable(random, period) {
  const table = new Float64Array(period * period * 2);
  for (let i = 0; i < period * period; i++) {
    const angle = random() * Math.PI * 2;
    table[2 * i] = Math.cos(angle);
    table[2 * i + 1] = Math.sin(angle);
  }
  return table;
}

/** Periodic fbm over the image: `cells` lattice cells across at the first octave, doubling. */
function periodicFbm(random, cells, octaves) {
  const out = new Float64Array(SIZE * SIZE);
  let amplitude = 0.5;
  for (let octave = 0; octave < octaves; octave++) {
    const period = cells << octave;
    const gradients = gradientTable(random, period);
    const scale = period / SIZE;
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < SIZE; x++)
        out[y * SIZE + x] += amplitude * periodicNoise(gradients, period, x * scale, y * scale);
    amplitude *= 0.5;
  }
  return out;
}

/** 1 - distance to the nearest of one random feature point per cell (periodic), in cell units. */
function periodicCells(random, cells) {
  const points = new Float64Array(cells * cells * 2);
  for (let i = 0; i < cells * cells; i++) {
    points[2 * i] = random();
    points[2 * i + 1] = random();
  }
  const out = new Float64Array(SIZE * SIZE);
  const scale = cells / SIZE;
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++) {
      const px = (x + 0.5) * scale;
      const py = (y + 0.5) * scale;
      const cx = Math.floor(px);
      const cy = Math.floor(py);
      let best = 9;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const gx = cx + dx;
          const gy = cy + dy;
          const i = (((gx % cells) + cells) % cells) + (((gy % cells) + cells) % cells) * cells;
          const ex = gx + points[2 * i] - px;
          const ey = gy + points[2 * i + 1] - py;
          const d = ex * ex + ey * ey;
          if (d < best) best = d;
        }
      out[y * SIZE + x] = Math.max(0, 1 - Math.sqrt(best));
    }
  return out;
}

/** The RGBA bytes of the noise image (built once). */
function noiseData() {
  if (data) return data;
  const random = createRng(1931);
  const broad = periodicFbm(random, 4, 5);
  const mid = periodicFbm(random, 16, 3);
  const cells = periodicCells(random, 8);
  data = new Uint8Array(SIZE * SIZE * 4);
  const toByte = (v) => Math.max(0, Math.min(255, Math.round(v * 255)));
  for (let i = 0; i < SIZE * SIZE; i++) {
    data[4 * i] = toByte(0.5 + broad[i] * 0.72);
    data[4 * i + 1] = toByte(0.5 + mid[i] * 0.72);
    data[4 * i + 2] = toByte(cells[i]);
    data[4 * i + 3] = toByte(random());
  }
  return data;
}

/** The shared noise DataTexture: RGBA8, linear (not colour), repeat-wrapped, mipmapped. */
function noiseTexture() {
  if (texture) return texture;
  texture = new DataTexture(noiseData(), SIZE, SIZE, RGBAFormat);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  texture.name = 'env-noise';
  texture.needsUpdate = true;
  return texture;
}

/**
 * Bilinear sample of one channel (0 r, 1 g, 2 b, 3 a) at texture coordinates (u, v), wrapped,
 * 0..1 — what texture(envNoise, vec2(u, v)) returns in the shaders (texel centres at (i + 0.5) / 256;
 * with DataTexture's flipY = false, image row 0 is v = 0).
 */
function sampleNoise(channel, u, v) {
  const d = data || noiseData();
  const x = u * SIZE - 0.5;
  const y = v * SIZE - 0.5;
  const fx0 = Math.floor(x);
  const fy0 = Math.floor(y);
  const fx = x - fx0;
  const fy = y - fy0;
  const x0 = fx0 & (SIZE - 1); // SIZE is a power of two: & wraps negatives too
  const y0 = fy0 & (SIZE - 1);
  const x1 = (x0 + 1) & (SIZE - 1);
  const y1 = (y0 + 1) & (SIZE - 1);
  const p00 = d[4 * (y0 * SIZE + x0) + channel];
  const p10 = d[4 * (y0 * SIZE + x1) + channel];
  const p01 = d[4 * (y1 * SIZE + x0) + channel];
  const p11 = d[4 * (y1 * SIZE + x1) + channel];
  const a = p00 + (p10 - p00) * fx;
  const b = p01 + (p11 - p01) * fx;
  return (a + (b - a) * fy) / 255;
}

export { noiseData, noiseTexture, sampleNoise };
