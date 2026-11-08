// 2D gradient noise and fractal Brownian motion, seeded once.
import { createRng } from './rng.js';

var PERM = new Uint8Array(512);
{
  let i = createRng(7),
    t = [...Array(256).keys()];
  for (let e = 255; e > 0; e--) {
    let n = Math.floor(i() * (e + 1));
    [t[e], t[n]] = [t[n], t[e]];
  }
  for (let e = 0; e < 512; e++) PERM[e] = t[e & 255];
}
var fade = (i) => i * i * i * (i * (i * 6 - 15) + 10),
  grad = (i, t, e) => (i & 1 ? -t : t) + (i & 2 ? -e : e);
function perlin2(i, t) {
  let e = Math.floor(i) & 255,
    n = Math.floor(t) & 255;
  ((i -= Math.floor(i)), (t -= Math.floor(t)));
  let s = fade(i),
    r = fade(t),
    o = PERM[e] + n,
    a = PERM[e + 1] + n,
    c = (l, h, f) => l + (h - l) * f;
  return c(
    c(grad(PERM[o], i, t), grad(PERM[a], i - 1, t), s),
    c(grad(PERM[o + 1], i, t - 1), grad(PERM[a + 1], i - 1, t - 1), s),
    r,
  );
}
function fbm2(i, t, e = 4) {
  let n = 0.5,
    s = 1,
    r = 0;
  for (let o = 0; o < e; o++) ((r += n * perlin2(i * s, t * s)), (n *= 0.5), (s *= 2.03));
  return r;
}

export { fbm2 };
