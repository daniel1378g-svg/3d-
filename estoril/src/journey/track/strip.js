// Ribbon geometry that follows the track centre line at signed lateral offsets.
import { BufferGeometry, Float32BufferAttribute } from 'three';

function buildStrip(
  i,
  t,
  e,
  {
    closed: n = !0,
    y: s = 0,
    vScale: r = 1,
    uvAcross: o = [0, 1],
    heightA: a = 0,
    heightB: c = 0,
    segRange: l = null,
  } = {},
) {
  let h = i.length,
    f = [],
    d = [],
    u = [],
    g = l ? l[0] : 0,
    _ = l ? l[1] : n ? h : h - 1,
    m = 0;
  for (let v = g; v <= _; v++) {
    let x = ((v % h) + h) % h,
      S = i[x],
      T = i[(x + 1) % h],
      C = i[(x - 1 + h) % h],
      U = T.x - C.x,
      b = T.y - C.y,
      M = Math.hypot(U, b) || 1;
    ((U /= M), (b /= M));
    let N = -b,
      Z = U,
      G = typeof t == 'function' ? t(x) : t,
      J = typeof e == 'function' ? e(x) : e;
    (f.push(S.x + N * G, s + a, S.y + Z * G, S.x + N * J, s + c, S.y + Z * J),
      v > g && (m += Math.hypot(S.x - i[(((v - 1) % h) + h) % h].x, S.y - i[(((v - 1) % h) + h) % h].y)),
      d.push(o[0], m * r, o[1], m * r));
  }
  let p = _ - g;
  for (let v = 0; v < p; v++) {
    let x = v * 2;
    u.push(x, x + 2, x + 1, x + 1, x + 2, x + 3);
  }
  let w = new BufferGeometry();
  return (
    w.setAttribute('position', new Float32BufferAttribute(f, 3)),
    w.setAttribute('uv', new Float32BufferAttribute(d, 2)),
    w.setIndex(u),
    w.computeVertexNormals(),
    w
  );
}
function buildBarrierWall(i, t, [e, n], s, r) {
  let o = i.length,
    a = [],
    c = [],
    l = [],
    h = 0;
  for (let d = e; d <= n; d++) {
    let u = ((d % o) + o) % o,
      g = i[u],
      _ = i[(u + 1) % o],
      m = i[(u - 1 + o) % o],
      p = _.x - m.x,
      w = _.y - m.y,
      v = Math.hypot(p, w) || 1;
    ((p /= v), (w /= v));
    let x = -w,
      S = p,
      T = t(u);
    (d > e && (h += Math.hypot(g.x - i[(((d - 1) % o) + o) % o].x, g.y - i[(((d - 1) % o) + o) % o].y)),
      a.push(g.x + x * T, 0, g.y + S * T, g.x + x * T, s, g.y + S * T),
      c.push(h * r, 0, h * r, 1));
  }
  for (let d = 0; d < n - e; d++) {
    let u = d * 2;
    l.push(u, u + 2, u + 1, u + 1, u + 2, u + 3);
  }
  let f = new BufferGeometry();
  return (
    f.setAttribute('position', new Float32BufferAttribute(a, 3)),
    f.setAttribute('uv', new Float32BufferAttribute(c, 2)),
    f.setIndex(l),
    f.computeVertexNormals(),
    f
  );
}

export { buildBarrierWall, buildStrip };
