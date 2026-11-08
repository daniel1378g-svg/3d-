// 2D gradient (Perlin-style) noise and fractal Brownian motion.
//
// The permutation table is shuffled once at module load from createRng(7), so the noise field is
// identical on every page load. Used by the procedural textures and the terrain/hill shapes.
import { createRng } from './rng.js';

/** 256-entry permutation, duplicated to 512 entries so PERM[i + 1] never needs a wrap. */
var PERM = new Uint8Array(512);
{
  let random = createRng(7),
    table = [...Array(256).keys()];
  // Fisher-Yates shuffle (draw order: one random() per swap, from the top down).
  for (let top = 255; top > 0; top--) {
    let pick = Math.floor(random() * (top + 1));
    [table[top], table[pick]] = [table[pick], table[top]];
  }
  for (let k = 0; k < 512; k++) PERM[k] = table[k & 255];
}

/** Quintic fade curve 6t^5 - 15t^4 + 10t^3. */
var fade = (t) => t * t * t * (t * (t * 6 - 15) + 10),
  /** Dot product with one of four diagonal gradients (±1, ±1) picked by the hash bits. */
  grad = (hash, dx, dy) => (hash & 1 ? -dx : dx) + (hash & 2 ? -dy : dy);

/** Gradient noise at (x, y); roughly in [-1, 1], 0 at integer lattice points. */
function perlin2(x, y) {
  let cellX = Math.floor(x) & 255,
    cellY = Math.floor(y) & 255;
  // Position inside the cell, in [0, 1).
  ((x -= Math.floor(x)), (y -= Math.floor(y)));
  let fadeX = fade(x),
    fadeY = fade(y),
    hashLeft = PERM[cellX] + cellY,
    hashRight = PERM[cellX + 1] + cellY,
    mix = (a, b, amount) => a + (b - a) * amount;
  return mix(
    mix(grad(PERM[hashLeft], x, y), grad(PERM[hashRight], x - 1, y), fadeX),
    mix(grad(PERM[hashLeft + 1], x, y - 1), grad(PERM[hashRight + 1], x - 1, y - 1), fadeX),
    fadeY,
  );
}

/**
 * Fractal Brownian motion: `octaves` layers of perlin2, amplitude halving (starting at 0.5) and
 * frequency growing x2.03 per octave (the odd lacunarity avoids lattice alignment).
 * Result is roughly in [-1, 1] (amplitudes sum to < 1).
 */
function fbm2(x, y, octaves = 4) {
  let amplitude = 0.5,
    frequency = 1,
    sum = 0;
  for (let octave = 0; octave < octaves; octave++)
    ((sum += amplitude * perlin2(x * frequency, y * frequency)), (amplitude *= 0.5), (frequency *= 2.03));
  return sum;
}

export { fbm2 };
