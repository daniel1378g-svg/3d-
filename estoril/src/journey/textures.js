// Procedural canvas textures for the circuit.
import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three';
import { fbm2 } from './util/noise.js';
import { createRng } from './util/rng.js';

function canvasTexture(i, t, e, { repeat: n = !0, srgb: s = !0, aniso: r = 8 } = {}) {
  let o = document.createElement('canvas');
  ((o.width = i), (o.height = t));
  let a = o.getContext('2d');
  e(a, i, t);
  let c = new CanvasTexture(o);
  return (
    n && (c.wrapS = c.wrapT = RepeatWrapping),
    s && (c.colorSpace = SRGBColorSpace),
    (c.anisotropy = r),
    c
  );
}
function asphaltTexture() {
  return canvasTexture(512, 512, (i, t, e) => {
    ((i.fillStyle = '#55585e'), i.fillRect(0, 0, t, e));
    let n = i.getImageData(0, 0, t, e),
      s = n.data,
      r = createRng(3);
    for (let o = 0; o < s.length; o += 4) {
      let a = (o / 4) % t,
        c = Math.floor(o / 4 / t),
        l = fbm2(a / 60, c / 60, 3) * 14 + (r() - 0.5) * 30;
      ((s[o] += l), (s[o + 1] += l), (s[o + 2] += l + 1));
    }
    i.putImageData(n, 0, 0);
  });
}
function grassTexture() {
  return canvasTexture(512, 512, (i, t, e) => {
    let n = i.createImageData(t, e),
      s = n.data,
      r = createRng(11);
    for (let o = 0; o < e; o++)
      for (let a = 0; a < t; a++) {
        let c = (o * t + a) * 4,
          l = fbm2(a / 90, o / 90, 4),
          h = (r() - 0.5) * 14;
        ((s[c] = 196 + l * 40 + h),
          (s[c + 1] = 210 + l * 40 + h),
          (s[c + 2] = 186 + l * 30 + h * 0.6),
          (s[c + 3] = 255));
      }
    i.putImageData(n, 0, 0);
  });
}
function gravelTexture() {
  return canvasTexture(256, 256, (i, t, e) => {
    ((i.fillStyle = '#d6c6a2'), i.fillRect(0, 0, t, e));
    let n = createRng(5);
    for (let s = 0; s < 2600; s++) {
      let r = n() * 2.4 + 0.6,
        o = 160 + n() * 80;
      ((i.fillStyle = `rgb(${o},${o * 0.93},${o * 0.8})`),
        i.beginPath(),
        i.arc(n() * t, n() * e, r, 0, Math.PI * 2),
        i.fill());
    }
  });
}
function kerbTexture() {
  return canvasTexture(128, 512, (i, t, e) => {
    for (let n = 0; n < 4; n++)
      ((i.fillStyle = n % 2 ? '#f2f2ee' : '#2a63c9'), i.fillRect(0, (n * e) / 4, t, e / 4));
    ((i.fillStyle = 'rgba(0,0,0,.08)'), i.fillRect(0, 0, 12, e));
  });
}
function barrierTexture() {
  return canvasTexture(512, 128, (i, t, e) => {
    for (let n = 0; n < 8; n++)
      ((i.fillStyle = n % 2 ? '#f3efe8' : '#e8742a'), i.fillRect((n * t) / 8, 0, t / 8, e));
    ((i.fillStyle = 'rgba(0,0,0,.18)'), i.fillRect(0, e - 16, t, 16));
  });
}
function puffTexture(i = 1) {
  return canvasTexture(
    256,
    128,
    (t, e, n) => {
      let s = createRng(i);
      for (let r = 0; r < 26; r++) {
        let o = e * (0.18 + s() * 0.64),
          a = n * (0.45 + (s() - 0.5) * 0.35),
          c = 18 + s() * 34,
          l = t.createRadialGradient(o, a, 0, o, a, c);
        (l.addColorStop(0, 'rgba(255,255,255,.55)'),
          l.addColorStop(1, 'rgba(255,255,255,0)'),
          (t.fillStyle = l),
          t.beginPath(),
          t.arc(o, a, c, 0, Math.PI * 2),
          t.fill());
      }
    },
    { repeat: !1 },
  );
}
function blobShadowTexture() {
  return canvasTexture(
    128,
    128,
    (i, t, e) => {
      let n = i.createRadialGradient(t / 2, e / 2, 4, t / 2, e / 2, t / 2);
      (n.addColorStop(0, 'rgba(0,0,0,.55)'),
        n.addColorStop(0.6, 'rgba(0,0,0,.22)'),
        n.addColorStop(1, 'rgba(0,0,0,0)'),
        (i.fillStyle = n),
        i.fillRect(0, 0, t, e));
    },
    { repeat: !1, srgb: !1 },
  );
}
function roundedShadowTexture(
  i = 256,
  t = 128,
  { hx: e = 0.36, hy: n = 0.27, rr: s = 0.12, fade: r = 0.13, core: o = 0.45, alpha: a = 0.8 } = {},
) {
  return canvasTexture(
    i,
    t,
    (c) => {
      let l = c.createImageData(i, t),
        h = l.data;
      for (let f = 0; f < t; f++)
        for (let d = 0; d < i; d++) {
          let u = Math.abs(d / (i - 1) - 0.5),
            g = Math.abs(f / (t - 1) - 0.5),
            _ = u - (e - s),
            m = g - (n - s),
            p = Math.hypot(Math.max(_, 0), Math.max(m, 0)) + Math.min(Math.max(_, m), 0) - s,
            w = Math.min(1, Math.max(0, 1 - (p + r * 0.3) / r));
          w = w * w * (3 - 2 * w);
          let v = 1 - o * Math.min(1, Math.hypot(u / (e + r), g / (n + r))),
            x = (f * i + d) * 4;
          ((h[x] = h[x + 1] = h[x + 2] = 0), (h[x + 3] = Math.round(255 * a * w * v)));
        }
      c.putImageData(l, 0, 0);
    },
    { repeat: !1, srgb: !1 },
  );
}
function aoFadeTexture() {
  return canvasTexture(
    4,
    128,
    (i, t, e) => {
      let n = i.createLinearGradient(0, 0, 0, e);
      (n.addColorStop(0, 'rgba(0,0,0,.5)'),
        n.addColorStop(0.35, 'rgba(0,0,0,.2)'),
        n.addColorStop(1, 'rgba(0,0,0,0)'),
        (i.fillStyle = n),
        i.fillRect(0, 0, t, e));
    },
    { repeat: !1, srgb: !1, aniso: 1 },
  );
}
function shutterTexture() {
  return canvasTexture(64, 256, (i, t, e) => {
    ((i.fillStyle = '#cfd3d6'), i.fillRect(0, 0, t, e));
    for (let n = 0; n < e; n += 8) {
      let s = i.createLinearGradient(0, n, 0, n + 8);
      (s.addColorStop(0, 'rgba(255,255,255,.55)'),
        s.addColorStop(0.45, 'rgba(255,255,255,0)'),
        s.addColorStop(0.8, 'rgba(0,0,0,.10)'),
        s.addColorStop(1, 'rgba(0,0,0,.28)'),
        (i.fillStyle = s),
        i.fillRect(0, n, t, 8));
    }
  });
}
function glazingTexture() {
  return canvasTexture(256, 128, (i, t, e) => {
    let n = i.createLinearGradient(0, 0, 0, e);
    (n.addColorStop(0, '#9fb3bf'),
      n.addColorStop(0.55, '#6e8592'),
      n.addColorStop(1, '#4b5d68'),
      (i.fillStyle = n),
      i.fillRect(0, 0, t, e),
      (i.fillStyle = 'rgba(245,243,238,.85)'));
    for (let s = 0; s < t; s += 32) i.fillRect(s, 0, 3, e);
    (i.fillRect(0, e * 0.62, t, 2), (i.fillStyle = 'rgba(255,255,255,.08)'));
    for (let s = 0; s < t; s += 32)
      (i.beginPath(),
        i.moveTo(s + 6, e),
        i.lineTo(s + 18, 0),
        i.lineTo(s + 26, 0),
        i.lineTo(s + 14, e),
        i.fill());
  });
}
function grassTuftTexture() {
  return canvasTexture(
    128,
    128,
    (i, t, e) => {
      let n = createRng(21);
      for (let s = 0; s < 70; s++) {
        let r = t * (0.1 + n() * 0.8),
          o = e * (0.35 + n() * 0.6),
          a = (n() - 0.5) * 26,
          c = 70 + n() * 60;
        ((i.strokeStyle = `rgba(${c * 0.8},${c},${c * 0.55},1)`),
          (i.lineWidth = 1.4 + n() * 1.6),
          i.beginPath(),
          i.moveTo(r, e),
          i.quadraticCurveTo(r + a * 0.3, e - o * 0.6, r + a, e - o),
          i.stroke());
      }
    },
    { repeat: !1 },
  );
}

export {
  aoFadeTexture,
  asphaltTexture,
  barrierTexture,
  blobShadowTexture,
  glazingTexture,
  grassTexture,
  grassTuftTexture,
  gravelTexture,
  kerbTexture,
  puffTexture,
  roundedShadowTexture,
  shutterTexture,
};
