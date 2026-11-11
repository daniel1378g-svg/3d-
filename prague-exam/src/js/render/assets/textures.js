// Procedural surface textures and the facade atlas. Everything is painted with Canvas 2D at load
// time: no image files. All randomness comes from fixed seeds, so every device gets the same
// streets.
//
//   createSurfaceTextures() -> { asphalt, asphaltWorn, sett, paving, mosaic, concrete, grass, dirt,
//                                ballast, water, roofTile, roofFlat }     (tileable, .userData.metres)
//   createFacadeAtlas()     -> { texture, styles: { name: { ground: [v0, v1], upper: [v0, v1], bay, floor } } }
//
// Uses the DOM and the global THREE only inside the two create functions.

// ---------------------------------------------------------------------------------------------
// Random numbers and periodic noise
// ---------------------------------------------------------------------------------------------

function makeRand(seed) {
  let a = (seed >>> 0) || 0x9e3779b9;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(x, y, seed) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Value noise on a lattice of cx × cy cells that wraps on every edge, so the field tiles.
function valueNoise(w, h, cx, cy, seed) {
  const rand = makeRand(seed);
  const lat = new Float32Array(cx * cy);
  for (let i = 0; i < lat.length; i++) lat[i] = rand();
  const x0 = new Int32Array(w), x1 = new Int32Array(w), tx = new Float32Array(w);
  for (let x = 0; x < w; x++) {
    const f = (x / w) * cx, i = Math.floor(f), t = f - i;
    x0[x] = i % cx;
    x1[x] = (i + 1) % cx;
    tx[x] = t * t * (3 - 2 * t);
  }
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    const f = (y / h) * cy, j = Math.floor(f), t = f - j, ty = t * t * (3 - 2 * t);
    const r0 = (j % cy) * cx, r1 = ((j + 1) % cy) * cx, row = y * w;
    for (let x = 0; x < w; x++) {
      const a = lat[r0 + x0[x]], b = lat[r0 + x1[x]], c = lat[r1 + x0[x]], d = lat[r1 + x1[x]];
      const top = a + (b - a) * tx[x];
      out[row + x] = top + (c + (d - c) * tx[x] - top) * ty;
    }
  }
  return out;
}

// Octaves of value noise, normalised to about 0..1 with mean 0.5.
function fbm(w, h, cx, cy, octaves, seed, gain = 0.5) {
  const out = new Float32Array(w * h);
  let amp = 1, total = 0;
  for (let o = 0; o < octaves; o++) {
    const n = valueNoise(w, h, cx << o, cy << o, seed + o * 7919);
    for (let i = 0; i < out.length; i++) out[i] += n[i] * amp;
    total += amp;
    amp *= gain;
  }
  for (let i = 0; i < out.length; i++) out[i] /= total;
  return out;
}

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
}

function pixels(g, w, h, fn) {
  const img = g.getImageData(0, 0, w, h);
  fn(img.data);
  g.putImageData(img, 0, 0);
}

const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
const rgb = (r, g, b) => `rgb(${r | 0},${g | 0},${b | 0})`;
const rgba = (r, g, b, a) => `rgba(${r | 0},${g | 0},${b | 0},${a})`;
const grey = (v) => rgb(v, v, v);

// Draws a shape and, when it lies within `reach` of a tile edge, its copies across that edge.
function wrapped(g, S, x, y, reach, draw) {
  const xs = x < reach ? [0, S] : x > S - reach ? [0, -S] : [0];
  const ys = y < reach ? [0, S] : y > S - reach ? [0, -S] : [0];
  for (const ox of xs) {
    for (const oy of ys) {
      if (ox === 0 && oy === 0) { draw(); continue; }
      g.save();
      g.translate(ox, oy);
      draw();
      g.restore();
    }
  }
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function surface(canvas, metres) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.userData.metres = metres;
  t.needsUpdate = true;
  return t;
}

// ---------------------------------------------------------------------------------------------
// Surfaces. Large-scale contrast is kept low on purpose: a strong blotch repeating every few
// metres is what gives a tiled road away from the driver's seat.
// ---------------------------------------------------------------------------------------------

function asphalt(worn) {
  const S = 512, [c, g] = makeCanvas(S, S), seed = worn ? 211 : 101;
  const low = fbm(S, S, 4, 4, 3, seed), mid = fbm(S, S, 28, 28, 3, seed + 1), rand = makeRand(seed + 2);
  const base = worn ? 104 : 74, lowAmp = worn ? 16 : 9, midAmp = worn ? 22 : 12, grain = worn ? 20 : 17;
  g.fillStyle = '#000';
  g.fillRect(0, 0, S, S);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      let v = base + (low[i] - 0.5) * lowAmp + (mid[i] - 0.5) * midAmp + (rand() - 0.5) * grain;
      const s = rand();
      if (s < 0.014) v += 20 + rand() * (worn ? 46 : 34);       // pale chippings showing through the binder
      else if (s < 0.04) v -= 13;
      d[p] = clamp255(v + (worn ? 2 : 0));
      d[p + 1] = clamp255(v + (worn ? 1 : 1));
      d[p + 2] = clamp255(v + (worn ? -2 : 3));
    }
  });
  if (worn) {
    // Hairline cracks, some sealed with bitumen. Short and scattered, so no single one stands out.
    const r = makeRand(seed + 3);
    for (let k = 0; k < 26; k++) {
      let x = r() * S, y = r() * S, a = r() * Math.PI * 2;
      const sealed = r() < 0.3, steps = 5 + Math.floor(r() * 9);
      g.strokeStyle = sealed ? 'rgba(28,28,30,0.55)' : 'rgba(30,30,32,0.42)';
      g.lineWidth = sealed ? 2.2 : 1;
      g.lineCap = 'round';
      g.lineJoin = 'round';
      const pts = [[x, y]];
      for (let s = 0; s < steps; s++) {
        a += (r() - 0.5) * 1.1;
        x += Math.cos(a) * (6 + r() * 9);
        y += Math.sin(a) * (6 + r() * 9);
        pts.push([x, y]);
      }
      for (const ox of [-S, 0, S]) {
        for (const oy of [-S, 0, S]) {
          g.beginPath();
          g.moveTo(pts[0][0] + ox, pts[0][1] + oy);
          for (let s = 1; s < pts.length; s++) g.lineTo(pts[s][0] + ox, pts[s][1] + oy);
          g.stroke();
        }
      }
    }
  }
  return surface(c, worn ? 6 : 4);
}

// Prague granite setts: rows of roughly 16 cm cubes with staggered joints. Rows run along u,
// so map v along the street.
function sett() {
  const S = 512, rows = 16, rh = S / rows, [c, g] = makeCanvas(S, S), rand = makeRand(307);
  const palette = [[140, 139, 135], [124, 126, 130], [150, 146, 138], [112, 114, 118], [158, 148, 132], [138, 126, 120], [128, 132, 128]];
  g.fillStyle = rgb(58, 55, 51);
  g.fillRect(0, 0, S, S);
  for (let r = 0; r < rows; r++) {
    const widths = [];
    let total = 0;
    while (total < S - 20) {
      const w = rh * (0.82 + rand() * 0.62);
      widths.push(w);
      total += w;
    }
    const scale = S / total;
    let x = rand() * rh;
    for (const w0 of widths) {
      const w = w0 * scale, base = palette[Math.floor(rand() * palette.length)], k = 0.86 + rand() * 0.26;
      const jx = (rand() - 0.5) * 1.6, jy = (rand() - 0.5) * 1.4, gap = 1.6 + rand() * 1.2, rad = 3.5 + rand() * 3.5;
      const px = x, py = r * rh;
      const draw = (ox) => {
        const sx = ox + px + gap / 2 + jx, sy = py + gap / 2 + 0.4 + jy, sw = w - gap, sh = rh - gap - 0.8;
        roundRect(g, sx, sy, sw, sh, rad);
        g.fillStyle = rgb(base[0] * k, base[1] * k, base[2] * k);
        g.fill();
        // Each stone is slightly domed: light on the upper left, shade on the lower right.
        const grad = g.createLinearGradient(sx, sy, sx + sw, sy + sh);
        grad.addColorStop(0, 'rgba(255,255,255,0.2)');
        grad.addColorStop(0.45, 'rgba(255,255,255,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.3)');
        g.fillStyle = grad;
        g.fill();
      };
      draw(0);
      if (px + w > S) draw(-S);
      x += w;
    }
  }
  const dirt = fbm(S, S, 6, 6, 3, 311), speck = makeRand(313);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const m = (0.9 + dirt[i] * 0.16) * (0.9 + speck() * 0.2);
      d[p] = clamp255(d[p] * m);
      d[p + 1] = clamp255(d[p + 1] * m);
      d[p + 2] = clamp255(d[p + 2] * m);
    }
  });
  return surface(c, 2.56);
}

// Concrete slab pavement: 30 cm slabs in a square grid.
function paving() {
  const S = 512, n = 8, cell = S / n, [c, g] = makeCanvas(S, S), rand = makeRand(401);
  g.fillStyle = rgb(92, 90, 84);
  g.fillRect(0, 0, S, S);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const v = 164 + (rand() - 0.5) * 20, warm = (rand() - 0.5) * 6;
      const x = i * cell + 1 + rand() * 0.6, y = j * cell + 1 + rand() * 0.6, s = cell - 2.2;
      g.fillStyle = rgb(v + warm, v, v - warm - 3);
      g.fillRect(x, y, s, s);
      g.fillStyle = 'rgba(255,255,255,0.16)';       // worn arris catching the light
      g.fillRect(x, y, s, 1.2);
      g.fillRect(x, y, 1.2, s);
      g.fillStyle = 'rgba(0,0,0,0.14)';
      g.fillRect(x, y + s - 1.2, s, 1.2);
      g.fillRect(x + s - 1.2, y, 1.2, s);
      if (rand() < 0.07) {                          // the odd cracked slab
        g.strokeStyle = 'rgba(40,38,34,0.5)';
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(x + rand() * s, y);
        g.lineTo(x + s * (0.3 + rand() * 0.4), y + s * (0.4 + rand() * 0.3));
        g.lineTo(x + rand() * s, y + s);
        g.stroke();
      }
    }
  }
  const stain = fbm(S, S, 5, 5, 4, 409), moss = fbm(S, S, 9, 9, 2, 419), rnd = makeRand(421);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const joint = d[p] < 120;
      const m = (0.88 + stain[i] * 0.2) * (0.94 + rnd() * 0.12);
      let r = d[p] * m, gg = d[p + 1] * m, b = d[p + 2] * m;
      if (joint && moss[i] > 0.56) { r *= 0.86; gg *= 1.04; b *= 0.74; }   // moss in the damp joints
      d[p] = clamp255(r);
      d[p + 1] = clamp255(gg);
      d[p + 2] = clamp255(b);
    }
  });
  return surface(c, 2.4);
}

// Prague pavement mosaic: 6 cm limestone cubes laid on the diagonal, pale and dark cubes forming
// a chequer of four-cube squares.
function mosaic() {
  const S = 512, half = 48, a = S / half, block = 4, [c, g] = makeCanvas(S, S);
  g.fillStyle = rgb(78, 74, 67);
  g.fillRect(0, 0, S, S);
  // Cube (i, j) sits at ((i + j) a, (i - j) a); p = i + j and q = i - j share parity.
  for (let p = -1; p <= half + 1; p++) {
    for (let q = -1; q <= half + 1; q++) {
      if ((p + q) & 1) continue;
      const i = (p + q) / 2, j = (p - q) / 2;
      const key = ((p % half) + half) % half, key2 = ((q % half) + half) % half;
      const h = (n) => hash2(key, key2, 500 + n);
      const dark = ((Math.floor(i / block) + Math.floor(j / block)) & 1) === 1;
      const k = 0.88 + h(1) * 0.2, tint = h(2);
      let col;
      if (dark) col = tint < 0.8 ? [70 * k, 73 * k, 80 * k] : [92 * k, 88 * k, 86 * k];
      else col = tint < 0.72 ? [222 * k, 218 * k, 206 * k] : tint < 0.9 ? [204 * k, 200 * k, 192 * k] : [214 * k, 196 * k, 180 * k];
      const cx = p * a, cy = q * a, r = a - 1.25 - h(3) * 0.7;
      const jit = (n) => (h(n) - 0.5) * 2.2;
      g.beginPath();
      g.moveTo(cx + jit(4), cy - r + jit(5));
      g.lineTo(cx + r + jit(6), cy + jit(7));
      g.lineTo(cx + jit(8), cy + r + jit(9));
      g.lineTo(cx - r + jit(10), cy + jit(11));
      g.closePath();
      g.fillStyle = rgb(col[0], col[1], col[2]);
      g.fill();
    }
  }
  const dirt = fbm(S, S, 7, 7, 3, 541), rnd = makeRand(547);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const m = (0.88 + dirt[i] * 0.18) * (0.93 + rnd() * 0.14);
      d[p] = clamp255(d[p] * m);
      d[p + 1] = clamp255(d[p + 1] * m);
      d[p + 2] = clamp255(d[p + 2] * m);
    }
  });
  return surface(c, 2);
}

function concrete() {
  const S = 256, [c, g] = makeCanvas(S, S);
  const low = fbm(S, S, 3, 3, 4, 601), streak = fbm(S, S, 40, 3, 2, 607), rand = makeRand(613);
  g.fillStyle = '#000';
  g.fillRect(0, 0, S, S);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      let v = 172 + (low[i] - 0.5) * 30 + (streak[i] - 0.5) * 10 + (rand() - 0.5) * 12;
      if (rand() < 0.006) v -= 34;                  // pores
      d[p] = clamp255(v + 1);
      d[p + 1] = clamp255(v);
      d[p + 2] = clamp255(v - 4);
    }
  });
  return surface(c, 3);
}

function grass() {
  const S = 512, [c, g] = makeCanvas(S, S);
  const low = fbm(S, S, 5, 5, 3, 701), mid = fbm(S, S, 30, 30, 2, 709), rand = makeRand(719);
  g.fillStyle = '#000';
  g.fillRect(0, 0, S, S);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const t = low[i] * 0.55 + mid[i] * 0.45, n = (rand() - 0.5) * 22;
      d[p] = clamp255(66 + t * 34 + n * 0.8);
      d[p + 1] = clamp255(92 + t * 36 + n);
      d[p + 2] = clamp255(40 + t * 20 + n * 0.5);
    }
  });
  // Blades: short strokes in mixed greens, lighter ones on top.
  const r = makeRand(727);
  g.lineCap = 'round';
  for (let k = 0; k < 9000; k++) {
    const x = r() * S, y = r() * S, len = 3 + r() * 5, a = -Math.PI / 2 + (r() - 0.5) * 1.5, s = r();
    const col = s < 0.45 ? rgba(52 + r() * 20, 82 + r() * 22, 30 + r() * 12, 0.5)
      : s < 0.9 ? rgba(110 + r() * 30, 140 + r() * 26, 60 + r() * 20, 0.42)
        : rgba(168 + r() * 20, 160 + r() * 16, 92, 0.4);
    wrapped(g, S, x, y, 9, () => {
      g.strokeStyle = col;
      g.lineWidth = 1.1;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
      g.stroke();
    });
  }
  return surface(c, 4);
}

function dirt() {
  const S = 256, [c, g] = makeCanvas(S, S);
  const low = fbm(S, S, 4, 4, 4, 801), mid = fbm(S, S, 24, 24, 2, 809), rand = makeRand(811);
  g.fillStyle = '#000';
  g.fillRect(0, 0, S, S);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const t = (low[i] - 0.5) * 34 + (mid[i] - 0.5) * 26 + (rand() - 0.5) * 20;
      let k = 0;
      const s = rand();
      if (s < 0.012) k = 40; else if (s < 0.03) k = -22;   // pebbles and holes
      d[p] = clamp255(128 + t + k);
      d[p + 1] = clamp255(111 + t * 0.95 + k);
      d[p + 2] = clamp255(88 + t * 0.85 + k);
    }
  });
  return surface(c, 3);
}

// Crushed-stone track ballast.
function ballast() {
  const S = 512, [c, g] = makeCanvas(S, S), rand = makeRand(907);
  g.fillStyle = rgb(46, 43, 40);
  g.fillRect(0, 0, S, S);
  const palette = [[122, 118, 112], [104, 102, 100], [136, 128, 116], [96, 90, 84], [148, 142, 134], [116, 104, 92]];
  for (let k = 0; k < 2600; k++) {
    const x = rand() * S, y = rand() * S, rad = 5 + rand() * 6, n = 5 + Math.floor(rand() * 3);
    const base = palette[Math.floor(rand() * palette.length)], lum = 0.72 + rand() * 0.42, a0 = rand() * 6.28;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = a0 + (i / n) * Math.PI * 2, rr = rad * (0.62 + rand() * 0.5);
      pts.push([Math.cos(a) * rr, Math.sin(a) * rr * 0.86]);
    }
    const path = (dx, dy) => {
      g.beginPath();
      g.moveTo(x + pts[0][0] + dx, y + pts[0][1] + dy);
      for (let i = 1; i < n; i++) g.lineTo(x + pts[i][0] + dx, y + pts[i][1] + dy);
      g.closePath();
    };
    wrapped(g, S, x, y, 14, () => {
      path(1.4, 2);
      g.fillStyle = 'rgba(0,0,0,0.5)';
      g.fill();
      path(0, 0);
      g.fillStyle = rgb(base[0] * lum, base[1] * lum, base[2] * lum);
      g.fill();
      g.save();
      g.clip();
      g.fillStyle = 'rgba(255,255,255,0.13)';       // sky-lit upper facet
      g.fillRect(x - rad, y - rad, rad * 2, rad * 0.9);
      g.restore();
    });
  }
  const rnd = makeRand(911);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const m = 0.9 + rnd() * 0.2;
      d[p] = clamp255(d[p] * m);
      d[p + 1] = clamp255(d[p + 1] * m);
      d[p + 2] = clamp255(d[p + 2] * m);
    }
  });
  return surface(c, 2);
}

// The Vltava: dull green-grey with long, low ripples (stretched along u).
function water() {
  const S = 256, [c, g] = makeCanvas(S, S);
  const low = fbm(S, S, 2, 4, 3, 1009), ripple = fbm(S, S, 6, 28, 3, 1013), fine = fbm(S, S, 16, 64, 2, 1019);
  g.fillStyle = '#000';
  g.fillRect(0, 0, S, S);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const t = (low[i] - 0.5) * 0.5 + (ripple[i] - 0.5) * 0.9 + (fine[i] - 0.5) * 0.5;
      const hi = t > 0.16 ? (t - 0.16) * 150 : 0;   // glints on the ripple crests
      d[p] = clamp255(58 + t * 34 + hi);
      d[p + 1] = clamp255(86 + t * 40 + hi);
      d[p + 2] = clamp255(90 + t * 42 + hi);
    }
  });
  return surface(c, 12);
}

// Clay plain tiles (bobrovky) with rounded tails; v runs up the roof slope.
function roofTile() {
  const S = 256, rows = 12, rh = S / rows, cols = 16, tw = S / cols, [c, g] = makeCanvas(S, S);
  g.fillStyle = rgb(70, 34, 26);
  g.fillRect(0, 0, S, S);
  const tile = (row, y0) => {
    const r = ((row % rows) + rows) % rows, shift = (r & 1) * tw / 2;
    for (let i = -1; i <= cols; i++) {
      const ci = ((i % cols) + cols) % cols, h1 = hash2(ci, r, 1101), h2 = hash2(ci, r, 1103);
      const k = 0.8 + h1 * 0.34, x = i * tw + shift + 0.5, w = tw - 1;
      const col = h2 < 0.82 ? [176 * k, 86 * k, 58 * k] : h2 < 0.93 ? [150 * k, 74 * k, 56 * k] : [196 * k, 112 * k, 72 * k];
      g.beginPath();
      g.moveTo(x, y0 - 3);
      g.lineTo(x + w, y0 - 3);
      g.lineTo(x + w, y0 + rh - 4.5);
      g.quadraticCurveTo(x + w, y0 + rh + 3, x + w / 2, y0 + rh + 3.4);
      g.quadraticCurveTo(x, y0 + rh + 3, x, y0 + rh - 4.5);
      g.closePath();
      g.fillStyle = rgb(col[0], col[1], col[2]);
      g.fill();
      const grad = g.createLinearGradient(0, y0, 0, y0 + rh + 3);
      grad.addColorStop(0, 'rgba(0,0,0,0.34)');     // shadow of the course above
      grad.addColorStop(0.3, 'rgba(0,0,0,0)');
      grad.addColorStop(0.86, 'rgba(255,255,255,0.1)');
      grad.addColorStop(1, 'rgba(0,0,0,0.12)');
      g.fillStyle = grad;
      g.fill();
    }
  };
  // Upper courses overlap lower ones, so paint from the eaves upwards; the extra first and last
  // passes are the wrapped copies.
  for (let r = rows; r >= -1; r--) tile(r, r * rh);
  const stain = fbm(S, S, 5, 5, 3, 1109), rnd = makeRand(1117);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const m = (0.84 + stain[i] * 0.26) * (0.93 + rnd() * 0.14);
      d[p] = clamp255(d[p] * m);
      d[p + 1] = clamp255(d[p + 1] * m);
      d[p + 2] = clamp255(d[p + 2] * m);
    }
  });
  return surface(c, 2.4);
}

// Flat roof: bitumen felt in 1 m strips with grit and ponding stains.
function roofFlat() {
  const S = 256, [c, g] = makeCanvas(S, S);
  const low = fbm(S, S, 3, 3, 4, 1201), rand = makeRand(1213);
  g.fillStyle = '#000';
  g.fillRect(0, 0, S, S);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      const y = (i / S) | 0, seam = y % 64;
      let v = 84 + (low[i] - 0.5) * 30 + (rand() - 0.5) * 18;
      if (seam === 0) v -= 22; else if (seam === 1) v += 9;     // lap between two strips of felt
      d[p] = clamp255(v);
      d[p + 1] = clamp255(v);
      d[p + 2] = clamp255(v + 3);
    }
  });
  return surface(c, 4);
}

export function createSurfaceTextures() {
  return {
    asphalt: asphalt(false),
    asphaltWorn: asphalt(true),
    sett: sett(),
    paving: paving(),
    mosaic: mosaic(),
    concrete: concrete(),
    grass: grass(),
    dirt: dirt(),
    ballast: ballast(),
    water: water(),
    roofTile: roofTile(),
    roofFlat: roofFlat(),
  };
}

export function createFacadeAtlas() { return null; }
