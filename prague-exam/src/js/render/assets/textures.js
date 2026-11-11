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
  const palette = [[136, 136, 134], [126, 128, 131], [144, 142, 138], [118, 120, 123], [148, 143, 134], [136, 130, 126], [130, 132, 130]];
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
      const w = w0 * scale, base = palette[Math.floor(rand() * palette.length)], k = 0.9 + rand() * 0.18;
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
      const v = 164 + (rand() - 0.5) * 13, warm = (rand() - 0.5) * 5;
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
      const m = (0.94 + stain[i] * 0.1) * (0.94 + rnd() * 0.12);
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
  const low = fbm(S, S, 4, 4, 4, 601), rand = makeRand(613);
  g.fillStyle = '#000';
  g.fillRect(0, 0, S, S);
  pixels(g, S, S, (d) => {
    for (let i = 0, p = 0; i < S * S; i++, p += 4) {
      let v = 172 + (low[i] - 0.5) * 24 + (rand() - 0.5) * 12;
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
      const hi = t > 0.2 ? (t - 0.2) * 60 : 0;      // faint glints on the ripple crests
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


// ---------------------------------------------------------------------------------------------
// Facade atlas. One canvas; every style owns a ground-floor strip and an upper-floor strip that
// span the full width. The width is four window bays and wraps in u. Wall areas are near white
// because the renderer multiplies by the building's colour; glass, joinery and doors are dark
// enough to survive that.
// ---------------------------------------------------------------------------------------------

const FACADE_W = 1024;
const STRIP_PAD = 4;              // edge rows repeated above and below each strip, against mip bleed

// A strip painter working in metres: x along the wall, y above the floor line.
function makeStrip(H, bay, floor, seed, tone) {
  const W = FACADE_W, [c, g] = makeCanvas(W, H), sx = W / (4 * bay), sy = H / floor;
  const X = (m) => Math.round(m * sx), Y = (m) => H - Math.round(m * sy);
  const S = { c, g, H, bay, floor, width: 4 * bay, rand: makeRand(seed), X, Y };

  // Plaster: light, slightly uneven, with faint rain streaks. Noise wraps in u.
  const blot = fbm(W, H, 8, 2, 3, seed + 1), streak = valueNoise(W, H, 128, 1, seed + 2), grain = makeRand(seed + 3);
  g.fillStyle = '#000';
  g.fillRect(0, 0, W, H);
  pixels(g, W, H, (d) => {
    for (let i = 0, p = 0; i < W * H; i++, p += 4) {
      const v = tone + (blot[i] - 0.5) * 20 + (streak[i] - 0.5) * 7 + (grain() - 0.5) * 7;
      d[p] = clamp255(v + 1);
      d[p + 1] = clamp255(v);
      d[p + 2] = clamp255(v - 2);
    }
  });

  S.rect = (x, y, w, h, fill) => {
    const x0 = X(x), y0 = Y(y + h);
    g.fillStyle = fill;
    g.fillRect(x0, y0, Math.max(1, X(x + w) - x0), Math.max(1, Y(y) - y0));
  };
  S.grad = (x, y, w, h, bottom, top) => {
    const gr = g.createLinearGradient(0, Y(y + h), 0, Y(y));
    gr.addColorStop(0, top);
    gr.addColorStop(1, bottom);
    S.rect(x, y, w, h, gr);
  };
  // Projecting band (sill, cornice): lit top edge, dark underside, soft shadow on the wall below.
  S.ledge = (x, y, w, h, tone2 = 250) => {
    S.grad(x, y - 0.16, w, 0.16, 'rgba(0,0,0,0)', 'rgba(0,0,0,0.32)');
    S.rect(x, y, w, h, grey(tone2));
    S.rect(x, y, w, Math.min(h * 0.3, 0.05), grey(tone2 - 70));
    g.fillStyle = '#fff';
    g.fillRect(X(x), Y(y + h), X(x + w) - X(x), 1);
  };
  // Horizontal joint or groove across the strip (or part of it).
  S.groove = (y, x = 0, w = S.width, a = 0.3) => {
    const py = Y(y), x0 = X(x), pw = X(x + w) - x0;
    g.fillStyle = rgba(0, 0, 0, a);
    g.fillRect(x0, py, pw, 1);
    g.fillStyle = rgba(255, 255, 255, a * 1.3);
    g.fillRect(x0, py + 1, pw, 1);
  };
  // Vertical joint; drawn on both sides of the seam when it sits on the strip edge.
  S.joint = (x, y = 0, h = floor, a = 0.3) => {
    const y0 = Y(y + h), ph = Y(y) - y0;
    for (const px of [X(x), X(x) - W, X(x) + W]) {
      g.fillStyle = rgba(0, 0, 0, a);
      g.fillRect(px - 1, y0, 2, ph);
      g.fillStyle = rgba(255, 255, 255, a);
      g.fillRect(px + 1, y0, 1, ph);
    }
  };
  // Window: reveal shadow, frame, glass with a sky gradient, optional curtains, glazing bars.
  S.window = (x, y, w, h, o = {}) => {
    const fr = o.frame || rgb(232, 232, 228), t = o.t || 0.06, k = 0.78 + S.rand() * 0.4;
    S.rect(x - 0.025, y - 0.03, w + 0.05, h + 0.06, 'rgba(0,0,0,0.4)');
    S.rect(x, y, w, h, fr);
    const gx = x + t, gy = y + t, gw = w - 2 * t, gh = h - 2 * t;
    S.grad(gx, gy, gw, gh, rgb(30 * k, 38 * k, 50 * k), rgb(88 * k, 108 * k, 128 * k));
    const r = S.rand();
    if (!o.bare) {
      if (r < 0.3) {
        S.rect(gx, gy, gw * 0.22, gh, 'rgba(236,230,214,0.55)');
        S.rect(gx + gw * 0.78, gy, gw * 0.22, gh, 'rgba(236,230,214,0.55)');
      } else if (r < 0.5) {
        const d = 0.25 + S.rand() * 0.45;
        S.rect(gx, gy + gh * (1 - d), gw, gh * d, 'rgba(222,218,204,0.7)');
      } else if (r < 0.66) {
        S.rect(gx, gy, gw, gh * 0.55, 'rgba(240,238,228,0.3)');
      }
    }
    S.rect(gx, gy + gh - 0.09, gw, 0.09, 'rgba(0,0,0,0.32)');
    const cols = o.cols || 1, rows = o.rows || 1, top = o.transom ? y + h * o.transom : y + h;
    for (let i = 1; i < cols; i++) S.rect(x + (w * i) / cols - t * 0.45, y, t * 0.9, (o.transomSplit ? h : top - y), fr);
    for (let j = 1; j < rows; j++) S.rect(x, y + (h * j) / rows - t * 0.4, w, t * 0.8, fr);
    if (o.transom) S.rect(x, top - t * 0.45, w, t * 0.9, fr);
  };
  // Door leaf with sunk panels; o.glass = fraction of the height glazed from the top.
  S.door = (x, y, w, h, color, o = {}) => {
    S.rect(x - 0.04, y, w + 0.08, h + 0.05, 'rgba(0,0,0,0.45)');
    S.rect(x, y, w, h, color);
    const leaves = o.leaves || 1, lw = w / leaves;
    for (let i = 0; i < leaves; i++) {
      const lx = x + i * lw;
      if (o.glass) {
        S.grad(lx + 0.1, y + h * (1 - o.glass), lw - 0.2, h * o.glass - 0.12, rgb(28, 34, 44), rgb(70, 86, 102));
        S.rect(lx + 0.1, y + 0.15, lw - 0.2, h * (1 - o.glass) - 0.3, 'rgba(0,0,0,0.22)');
      } else {
        S.rect(lx + 0.1, y + h * 0.5, lw - 0.2, h * 0.4, 'rgba(0,0,0,0.22)');
        S.rect(lx + 0.1, y + 0.14, lw - 0.2, h * 0.3, 'rgba(0,0,0,0.22)');
      }
      if (i > 0) S.rect(lx - 0.012, y, 0.024, h, 'rgba(0,0,0,0.5)');
    }
    S.rect(x + (leaves > 1 ? lw - 0.1 : w - 0.16), y + h * 0.46, 0.05, 0.14, rgb(190, 170, 110));
  };
  // Dirt: darker towards the pavement.
  S.grime = (h = 0.7, a = 0.2) => S.grad(0, 0, S.width, h, rgba(60, 54, 46, a), 'rgba(60,54,46,0)');
  S.topShadow = (h = 0.14, a = 0.3) => S.grad(0, floor - h, S.width, h, 'rgba(0,0,0,0)', rgba(0, 0, 0, a));
  return S;
}

const BROWN = rgb(92, 62, 42), ANTHRACITE = rgb(52, 56, 62), PVC = rgb(226, 228, 228), ALU = rgb(112, 118, 124);

// Shop front: stall riser, big pane with a dim interior, fascia board with a blurred name.
function shopFront(S, x, w, top, fascia, doorSide) {
  S.rect(x - 0.05, 0.05, w + 0.1, top - 0.05 + 0.05, 'rgba(0,0,0,0.45)');
  S.rect(x, 0.08, w, top - 0.08, rgb(44, 50, 46));
  const dw = doorSide ? 0.95 : 0, gx = x + 0.08 + (doorSide < 0 ? dw : 0), gw = w - 0.16 - dw;
  S.grad(gx, 0.55, gw, top - 0.75, rgb(36, 40, 44), rgb(84, 98, 108));
  for (let i = 0; i < 5; i++) {                       // goods on display
    const k = S.rand();
    S.rect(gx + 0.1 + S.rand() * (gw - 0.5), 0.6 + S.rand() * 0.5, 0.2 + S.rand() * 0.3, 0.2 + S.rand() * 0.5,
      rgba(150 + k * 80, 130 + S.rand() * 70, 90 + S.rand() * 60, 0.45));
  }
  S.rect(gx, top - 0.5, gw, 0.3, 'rgba(0,0,0,0.25)');
  if (doorSide) {
    const dx = doorSide < 0 ? x + 0.08 : x + w - 0.08 - 0.87;
    S.grad(dx, 0.12, 0.87, top - 0.32, rgb(30, 34, 40), rgb(74, 88, 100));
    S.rect(dx, 0.12, 0.87, 0.2, rgb(44, 50, 46));
    S.rect(dx + (doorSide < 0 ? 0.74 : 0.08), 1.0, 0.04, 0.3, rgb(196, 190, 170));
  }
  S.rect(x - 0.1, top + 0.04, w + 0.2, 0.52, fascia);
  S.rect(x - 0.1, top + 0.04, w + 0.2, 0.05, 'rgba(0,0,0,0.35)');
  let lx = x + 0.3;
  while (lx < x + w - 0.5) {                          // lettering, too far away to read
    const lw = 0.1 + S.rand() * 0.16;
    S.rect(lx, top + 0.2, lw, 0.22, 'rgba(238,230,205,0.85)');
    lx += lw + 0.06 + (S.rand() < 0.2 ? 0.2 : 0);
  }
}

const FACADES = [
  // 19th-century Prague apartment house.
  { name: 'tenement', bay: 2.8, floor: 3.8, hg: 176, hu: 176, tone: 228,
    ground(S) {
      for (let y = 0.95; y < 3.3; y += 0.42) S.groove(y, 0, S.width, 0.34);         // banded rustication
      S.rect(0, 0, S.width, 0.5, grey(182));
      S.groove(0.5, 0, S.width, 0.4);
      S.ledge(0, 3.44, S.width, 0.36, 248);
      S.groove(3.62, 0, S.width, 0.18);
      shopFront(S, 0.3, 2.2, 2.7, rgb(40, 74, 58), 0);
      shopFront(S, 5.9, 2.2, 2.7, rgb(112, 36, 34), 1);
      // House door under a round arch with a fanlight.
      const g = S.g, x0 = S.X(3.45), x1 = S.X(4.95), yb = S.Y(0.05), ys = S.Y(2.35), rx = (x1 - x0) / 2, ry = S.Y(2.35) - S.Y(3.1);
      const arch = (grow) => {
        g.beginPath();
        g.moveTo(x0 - grow, yb);
        g.lineTo(x0 - grow, ys);
        g.ellipse(x0 + rx, ys, rx + grow, ry + grow * 0.5, 0, Math.PI, 0);
        g.lineTo(x1 + grow, yb);
        g.closePath();
      };
      arch(14);
      g.fillStyle = grey(248);
      g.fill();
      g.strokeStyle = 'rgba(0,0,0,0.3)';
      g.lineWidth = 1;
      g.stroke();
      arch(0);
      g.fillStyle = rgb(26, 30, 36);
      g.fill();
      g.save();
      g.clip();
      S.grad(3.45, 2.35, 1.5, 0.8, rgb(40, 50, 62), rgb(80, 96, 112));
      for (let i = 1; i < 4; i++) {                    // fanlight bars
        g.strokeStyle = BROWN;
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(x0 + rx, ys);
        g.lineTo(x0 + rx - Math.cos((i * Math.PI) / 4) * rx * 1.2, ys - Math.sin((i * Math.PI) / 4) * ry * 1.2);
        g.stroke();
      }
      g.restore();
      S.door(3.45, 0.05, 1.5, 2.3, BROWN, { leaves: 2 });
      S.rect(3.45, 2.32, 1.5, 0.07, rgb(70, 46, 30));
      // Ground-floor flat window with a cellar light below.
      S.rect(9.0, 1.1, 1.6, 1.95, grey(248));
      S.ledge(8.9, 1.05, 1.8, 0.09);
      S.window(9.22, 1.2, 1.16, 1.75, { frame: BROWN, cols: 2, transom: 0.7, t: 0.07 });
      S.rect(9.4, 0.14, 0.8, 0.26, rgb(30, 30, 32));
      S.grime(0.9, 0.22);
      S.topShadow(0.05, 0.2);
    },
    upper(S) {
      for (let b = 0; b < 4; b++) {
        const wx = b * 2.8 + 0.825, ww = 1.15;
        S.rect(wx - 0.3, 0.26, ww + 0.6, 0.62, grey(240));                           // apron panel
        S.rect(wx - 0.16, 0.36, ww + 0.32, 0.42, grey(216));
        S.rect(wx - 0.2, 0.98, ww + 0.4, 2.28, 'rgba(0,0,0,0.18)');
        S.rect(wx - 0.17, 0.98, ww + 0.34, 2.28, grey(250));                         // surround
        S.ledge(wx - 0.32, 0.9, ww + 0.64, 0.1);
        S.window(wx, 1.04, ww, 2.1, { frame: BROWN, cols: 2, transom: 0.68, t: 0.07 });
        S.ledge(wx - 0.34, 3.26, ww + 0.68, 0.11);
        if (b % 2 === 0) {                              // every other window carries a pediment
          const g = S.g;
          g.beginPath();
          g.moveTo(S.X(wx - 0.34), S.Y(3.37));
          g.lineTo(S.X(wx + ww / 2), S.Y(3.66));
          g.lineTo(S.X(wx + ww + 0.34), S.Y(3.37));
          g.closePath();
          g.fillStyle = grey(246);
          g.fill();
          g.strokeStyle = 'rgba(0,0,0,0.35)';
          g.lineWidth = 1;
          g.stroke();
        }
      }
      S.ledge(0, 0, S.width, 0.15, 248);
      S.topShadow(0.16, 0.3);
    } },

  // Panelák: prefabricated concrete panels, loggias in two bays out of four.
  { name: 'panel', bay: 3.6, floor: 2.8, hg: 128, hu: 144, tone: 234,
    ground(S) {
      S.rect(0, 0, S.width, 0.45, grey(176));
      S.groove(0.45, 0, S.width, 0.35);
      for (let b = 0; b < 4; b++) S.joint(b * 3.6);
      S.groove(2.78, 0, S.width, 0.35);
      for (const b of [0, 2, 3]) {                      // cellar and store-room windows
        S.window(b * 3.6 + 1.0, 1.55, 1.6, 0.6, { frame: PVC, cols: 2, bare: true });
        S.grad(b * 3.6 + 1.0, 1.0, 1.6, 0.5, 'rgba(70,60,50,0)', 'rgba(70,60,50,0.16)');
      }
      // Entrance with a concrete canopy.
      S.rect(4.3, 0.1, 2.2, 2.2, grey(196));
      S.door(4.6, 0.1, 1.6, 2.1, ALU, { leaves: 2, glass: 0.72 });
      S.rect(6.25, 1.2, 0.18, 0.42, rgb(60, 64, 70));  // bells
      S.ledge(4.0, 2.32, 2.8, 0.14, 214);
      S.rect(8.1, 0.1, 0.9, 2.0, rgb(98, 104, 110));   // service door
      S.rect(8.1, 0.1, 0.9, 2.0, 'rgba(0,0,0,0.12)');
      S.grime(0.8, 0.24);
    },
    upper(S) {
      for (let b = 0; b < 4; b++) S.joint(b * 3.6);
      S.groove(0.02, 0, S.width, 0.38);
      for (const b of [0, 3]) S.window(b * 3.6 + 0.75, 0.9, 2.1, 1.45, { frame: PVC, cols: 3, t: 0.07 });
      for (const b of [1, 2]) {
        const x = b * 3.6 + 0.3;
        S.grad(x, 0.08, 3.0, 2.6, rgb(120, 122, 124), rgb(64, 66, 70));              // loggia recess
        S.window(x + 0.3, 0.2, 0.85, 2.15, { frame: PVC, t: 0.07 });                 // balcony door
        S.window(x + 1.3, 0.95, 1.4, 1.4, { frame: PVC, cols: 2, t: 0.07 });
        S.rect(x, 2.5, 3.0, 0.18, 'rgba(0,0,0,0.35)');
        S.rect(x, 0.08, 3.0, 1.02, grey(222));                                        // parapet panel
        for (let i = 1; i < 12; i++) S.rect(x + i * 0.25, 0.12, 0.02, 0.92, 'rgba(0,0,0,0.12)');
        S.rect(x, 1.06, 3.0, 0.06, rgb(70, 74, 78));
        S.rect(x, 0.08, 3.0, 0.05, 'rgba(0,0,0,0.3)');
      }
    } },

  // Modern office: ribbon glazing between light spandrel bands.
  { name: 'modern', bay: 3.0, floor: 3.6, hg: 112, hu: 96, tone: 240,
    ground(S) {
      S.grad(0, 0.12, S.width, 3.0, rgb(26, 32, 38), rgb(70, 90, 102));
      for (let i = 0; i < 8; i++) S.rect(i * 1.5 + 0.72, 0.12, 0.06, 3.0, ANTHRACITE);
      S.rect(0, 2.3, S.width, 0.06, ANTHRACITE);
      for (let i = 0; i < 14; i++) S.rect(S.rand() * 11.5, 0.4 + S.rand() * 1.2, 0.3 + S.rand() * 0.5, 0.3 + S.rand() * 0.6, rgba(190, 180, 150, 0.12));
      for (let b = 0; b < 4; b++) {                     // columns on the bay lines, wrapped at the seam
        for (const x of [b * 3.0 - 0.22, b * 3.0 - 0.22 + 12]) S.rect(x, 0, 0.44, 3.12, grey(238));
        S.joint(b * 3.0 + 0.22, 0, 3.12, 0.25);
      }
      S.rect(3.5, 0.12, 2.0, 2.2, rgb(20, 24, 28));    // entrance
      S.door(3.6, 0.12, 1.8, 2.15, ANTHRACITE, { leaves: 2, glass: 0.86 });
      S.ledge(3.3, 2.36, 2.4, 0.1, 200);
      S.rect(0, 0, S.width, 0.12, grey(120));
      S.ledge(0, 3.12, S.width, 0.48, 244);
    },
    upper(S) {
      S.grad(0, 1.0, S.width, 2.0, rgb(30, 44, 54), rgb(96, 124, 140));
      for (let i = 0; i < 8; i++) {
        const k = S.rand();
        if (k < 0.3) S.rect(i * 1.5, 1.0 + 2.0 * (1 - k * 2), 1.5, 2.0 * k * 2, 'rgba(206,208,204,0.6)');   // blinds part down
        else S.rect(i * 1.5, 1.0, 1.5, 2.0, rgba(255, 255, 255, 0.05 * S.rand()));
        S.rect(i * 1.5 - 0.035, 1.0, 0.07, 2.0, ANTHRACITE);
        S.joint(i * 1.5, 0, 1.0, 0.16);
        S.joint(i * 1.5, 3.0, 0.6, 0.16);
      }
      S.rect(11.965, 1.0, 0.035, 2.0, ANTHRACITE);
      S.rect(0, 2.94, S.width, 0.06, ANTHRACITE);
      S.rect(0, 1.0, S.width, 0.07, ANTHRACITE);
      S.rect(0, 2.84, S.width, 0.1, 'rgba(0,0,0,0.3)');
      S.grad(0, 0.8, S.width, 0.2, 'rgba(0,0,0,0)', 'rgba(0,0,0,0.12)');
    } },

  // Plain 20th-century office block: punched windows over a darker spandrel band.
  { name: 'office', bay: 3.0, floor: 3.3, hg: 112, hu: 112, tone: 236,
    ground(S) {
      for (let y = 0.6; y < 3.2; y += 0.6) S.groove(y, 0, S.width, 0.16);            // stone cladding
      for (let x = 0; x < 12; x += 0.9) S.joint(x, 0, 3.3, 0.1);
      S.rect(0, 0, S.width, 0.4, grey(170));
      for (const b of [0, 1, 3]) S.window(b * 3.0 + 0.55, 1.0, 1.9, 1.55, { frame: ALU, cols: 3, t: 0.06 });
      S.rect(6.3, 0.1, 2.4, 2.5, rgb(40, 44, 48));     // recessed entrance
      S.door(6.55, 0.1, 1.9, 2.2, ALU, { leaves: 2, glass: 0.8 });
      S.ledge(6.0, 2.62, 3.0, 0.16, 214);
      S.rect(8.82, 1.4, 0.3, 0.4, rgb(120, 96, 50));   // brass plate
      S.grime(0.7, 0.2);
      S.topShadow(0.08, 0.2);
    },
    upper(S) {
      S.rect(0, 0.2, S.width, 0.72, grey(214));
      S.groove(0.92, 0, S.width, 0.2);
      S.groove(0.2, 0, S.width, 0.2);
      for (let b = 0; b < 4; b++) {
        S.window(b * 3.0 + 0.55, 0.95, 1.9, 1.6, { frame: ALU, cols: 3, t: 0.06 });
        S.ledge(b * 3.0 + 0.5, 0.9, 2.0, 0.06, 240);
        S.grad(b * 3.0 + 0.6, 0.3, 1.8, 0.56, 'rgba(70,62,52,0)', 'rgba(70,62,52,0.14)');
      }
    } },

  // Industrial hall: profiled sheet, loading doors, a strip of high windows.
  { name: 'industrial', bay: 5.0, floor: 4.5, hg: 112, hu: 64, tone: 236,
    ground(S) {
      FACADES.ribs(S);
      S.rect(0, 0, S.width, 0.7, grey(190));
      S.groove(0.7, 0, S.width, 0.4);
      const shutter = (x, y, w, h, c) => {
        S.rect(x - 0.12, y, w + 0.24, h + 0.14, rgb(58, 62, 66));
        S.rect(x, y, w, h, c);
        for (let yy = y + 0.18; yy < y + h; yy += 0.18) S.groove(yy, x, w, 0.26);
        S.rect(x, y + h - 0.18, w, 0.18, 'rgba(0,0,0,0.3)');
      };
      shutter(0.7, 0.05, 3.6, 3.9, rgb(74, 96, 118));
      for (const x of [0.5, 4.38]) for (let i = 0; i < 4; i++) S.rect(x, 0.05 + i * 0.3, 0.12, 0.15, i % 2 ? rgb(24, 24, 24) : rgb(226, 178, 30));
      S.door(6.2, 0.05, 0.95, 2.1, rgb(70, 86, 104));
      S.window(7.6, 1.3, 1.2, 0.9, { frame: ALU, cols: 2, bare: true });
      S.rect(11.0, 0.7, 0.14, 3.8, rgb(96, 100, 104));  // downpipe
      S.rect(12.2, 1.6, 1.4, 0.9, rgb(104, 110, 114));  // louvre
      for (let i = 1; i < 6; i++) S.groove(1.6 + i * 0.15, 12.2, 1.4, 0.3);
      shutter(15.6, 1.1, 3.0, 2.9, rgb(150, 154, 156)); // raised dock door
      S.rect(15.4, 0.75, 3.4, 0.35, rgb(40, 40, 42));
      S.grime(1.0, 0.22);
    },
    upper(S) {
      FACADES.ribs(S);
      S.groove(2.2, 0, S.width, 0.22);
      for (const x of [5.6, 10.6]) {                    // translucent rooflight strip
        S.rect(x - 0.06, 1.34, 3.92, 1.32, rgb(70, 74, 78));
        S.grad(x, 1.4, 3.8, 1.2, rgb(92, 108, 118), rgb(150, 166, 174));
        for (let i = 1; i < 4; i++) S.rect(x + i * 0.95 - 0.03, 1.4, 0.06, 1.2, rgb(70, 74, 78));
      }
      S.rect(0, 4.3, S.width, 0.2, grey(150));
      S.rect(0, 4.26, S.width, 0.04, 'rgba(0,0,0,0.3)');
    } },

  // Family house.
  { name: 'house', bay: 3.5, floor: 2.9, hg: 128, hu: 128, tone: 238,
    ground(S) {
      S.rect(0, 0, S.width, 0.45, grey(168));
      S.groove(0.45, 0, S.width, 0.38);
      S.rect(0.9, 0, 1.5, 0.16, grey(200));            // step
      S.door(1.15, 0.16, 1.0, 2.05, BROWN, { glass: 0.35 });
      S.ledge(0.9, 2.3, 1.5, 0.1, 226);
      S.window(2.55, 1.3, 0.55, 0.8, { frame: BROWN, bare: true });
      for (const b of [1, 3]) {
        S.window(b * 3.5 + 0.95, 0.95, 1.6, 1.4, { frame: BROWN, cols: 2, t: 0.07 });
        S.ledge(b * 3.5 + 0.85, 0.87, 1.8, 0.08, 244);
      }
      S.rect(7.4, 0, 2.7, 2.25, 'rgba(0,0,0,0.4)');    // garage
      S.rect(7.5, 0, 2.5, 2.15, rgb(120, 92, 66));
      for (let y = 0.43; y < 2.1; y += 0.43) S.groove(y, 7.5, 2.5, 0.3);
      S.grime(0.7, 0.2);
    },
    upper(S) {
      for (const b of [0, 1, 3]) {
        S.window(b * 3.5 + 1.05, 0.95, 1.4, 1.35, { frame: BROWN, cols: 2, t: 0.07 });
        S.ledge(b * 3.5 + 0.95, 0.87, 1.6, 0.08, 244);
      }
      S.window(7.9, 0.2, 1.7, 2.15, { frame: BROWN, cols: 2, t: 0.07 });             // balcony door
      for (let i = 0; i <= 10; i++) S.rect(7.7 + i * 0.21, 0.1, 0.03, 0.95, rgb(52, 54, 58));
      S.rect(7.7, 1.02, 2.13, 0.05, rgb(52, 54, 58));
      S.ledge(7.6, 0.02, 2.3, 0.1, 216);
      S.topShadow(0.22, 0.3);
    } },

  // Row garages: one door per bay, each owner's own colour.
  { name: 'garage', bay: 3.0, floor: 2.6, hg: 112, hu: 24, tone: 226,
    ground(S) {
      const paint = [rgb(58, 92, 70), rgb(104, 72, 50), rgb(76, 92, 110), rgb(122, 60, 44)];
      for (let b = 0; b < 4; b++) {
        const x = b * 3.0 + 0.3;
        S.joint(b * 3.0, 0, 2.6, 0.22);
        S.rect(x - 0.06, 0, 2.52, 2.12, rgb(40, 40, 42));
        S.rect(x, 0.03, 2.4, 2.03, paint[b]);
        for (let i = 1; i < 10; i++) S.rect(x + i * 0.24, 0.03, 0.025, 2.03, 'rgba(0,0,0,0.2)');
        S.rect(x + 1.2 - 0.012, 0.03, 0.024, 2.03, 'rgba(0,0,0,0.5)');
        S.rect(x + 1.28, 1.0, 0.1, 0.06, rgb(30, 30, 30));
        S.rect(x + 0.9, 1.72, 0.3, 0.16, rgb(226, 226, 220));                        // number plate
        S.grad(x, 0.03, 2.4, 0.5, rgba(90, 50, 24, 0.35), 'rgba(90,50,24,0)');       // rust creeping up
      }
      S.ledge(0, 2.12, S.width, 0.2, 204);
      S.rect(0, 2.42, S.width, 0.18, rgb(64, 64, 66));
      S.grad(0, 2.2, S.width, 0.22, 'rgba(40,40,40,0)', 'rgba(40,40,40,0.25)');
    },
    upper(S) {
      S.grime(S.floor, 0.1);
    } },

  // School or other public building: tall regular windows between pilaster strips.
  { name: 'civic', bay: 3.2, floor: 3.8, hg: 128, hu: 128, tone: 230,
    ground(S) {
      for (let y = 1.25; y < 3.4; y += 0.5) S.groove(y, 0, S.width, 0.22);
      S.rect(0, 0, S.width, 0.8, grey(178));
      S.groove(0.8, 0, S.width, 0.4);
      S.groove(0.4, 0, S.width, 0.2);
      for (const b of [0, 2, 3]) {
        const x = b * 3.2 + 0.55;
        S.rect(x - 0.14, 1.12, 2.38, 2.2, grey(248));
        S.ledge(x - 0.2, 1.08, 2.5, 0.09);
        S.window(x, 1.2, 2.1, 2.0, { frame: PVC, cols: 3, rows: 2, t: 0.06 });
      }
      // Main entrance up two steps, with a plaque beside it.
      S.rect(3.6, 0, 2.4, 0.3, grey(206));
      S.groove(0.15, 3.6, 2.4, 0.3);
      S.rect(3.72, 0.3, 2.16, 3.0, grey(250));
      S.door(3.9, 0.3, 1.8, 2.2, rgb(74, 52, 38), { leaves: 2, glass: 0.4 });
      S.window(3.9, 2.56, 1.8, 0.6, { frame: rgb(74, 52, 38), cols: 3, bare: true });
      S.ledge(3.6, 3.3, 2.4, 0.12);
      S.rect(6.02, 1.5, 0.3, 0.42, rgb(126, 26, 30));
      S.ledge(0, 3.5, S.width, 0.3, 246);
      S.grime(0.9, 0.2);
    },
    upper(S) {
      for (let b = 0; b < 4; b++) {
        const x = b * 3.2 + 0.55;
        for (const px of [b * 3.2 - 0.24, b * 3.2 - 0.24 + 12.8]) {                   // pilaster strip on the bay line
          S.rect(px, 0, 0.48, 3.8, grey(246));
          S.rect(px + 0.48, 0, 0.03, 3.8, 'rgba(0,0,0,0.2)');
        }
        S.rect(x - 0.14, 0.86, 2.38, 2.66, grey(248));
        S.ledge(x - 0.2, 0.82, 2.5, 0.09);
        S.window(x, 0.94, 2.1, 2.4, { frame: PVC, cols: 3, rows: 3, t: 0.06 });
        S.ledge(x - 0.2, 3.5, 2.5, 0.1);
      }
      S.ledge(0, 0, S.width, 0.14, 246);
      S.topShadow(0.14, 0.26);
    } },
];

// Profiled steel sheet: one rib every eight pixels, so the pattern closes at the seam.
FACADES.ribs = (S) => {
  const g = S.g;
  for (let x = 0; x < FACADE_W; x += 8) {
    g.fillStyle = 'rgba(0,0,0,0.13)';
    g.fillRect(x, 0, 2, S.H);
    g.fillStyle = 'rgba(255,255,255,0.35)';
    g.fillRect(x + 3, 0, 2, S.H);
  }
};

export function createFacadeAtlas() {
  let total = STRIP_PAD;
  for (const f of FACADES) total += f.hg + f.hu + 4 * STRIP_PAD;
  let height = 256;
  while (height < total) height *= 2;
  const [canvas, g] = makeCanvas(FACADE_W, height);
  g.fillStyle = '#e6e6e6';
  g.fillRect(0, 0, FACADE_W, height);
  const styles = {};
  let y = STRIP_PAD, seed = 2000;
  const place = (f, h, paint) => {
    const S = makeStrip(h, f.bay, f.floor, seed += 17, f.tone);
    paint.call(f, S);
    g.drawImage(S.c, 0, y);
    g.drawImage(S.c, 0, 0, FACADE_W, 1, 0, y - STRIP_PAD, FACADE_W, STRIP_PAD);
    g.drawImage(S.c, 0, h - 1, FACADE_W, 1, 0, y + h, FACADE_W, STRIP_PAD);
    const v = [1 - (y + h) / height, 1 - y / height];
    y += h + 2 * STRIP_PAD;
    return v;
  };
  for (const f of FACADES) {
    const ground = place(f, f.hg, f.ground), upper = place(f, f.hu, f.upper);
    styles[f.name] = { ground, upper, bay: f.bay, floor: f.floor };
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return { texture, styles };
}
