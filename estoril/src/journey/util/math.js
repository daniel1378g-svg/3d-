// Scalar helpers and monotone cubic (Fritsch-Carlson) interpolation.

var lerp = (i, t, e) => i + (t - i) * e,
  clamp = (i, t, e) => Math.min(e, Math.max(t, i)),
  smoothstep = (i) => i * i * (3 - 2 * i),
  easeInOutCubic = (i) => (i < 0.5 ? 4 * i * i * i : 1 - Math.pow(-2 * i + 2, 3) / 2);
function monotoneCurve(i) {
  let t = i.map((r) => r[0]),
    e = i.map((r) => r[1]),
    n = i.length,
    s = e.map((r, o) =>
      o === 0
        ? (e[1] - e[0]) / (t[1] - t[0])
        : o === n - 1
          ? (e[n - 1] - e[n - 2]) / (t[n - 1] - t[n - 2])
          : (e[o + 1] - e[o - 1]) / (t[o + 1] - t[o - 1]),
    );
  return (r) => {
    if (r <= t[0]) return e[0];
    if (r >= t[n - 1]) return e[n - 1];
    let o = 0;
    for (; r > t[o + 1];) o++;
    let a = t[o + 1] - t[o],
      c = (r - t[o]) / a,
      l = c * c,
      h = l * c;
    return (
      (2 * h - 3 * l + 1) * e[o] +
      (h - 2 * l + c) * a * s[o] +
      (-2 * h + 3 * l) * e[o + 1] +
      (h - l) * a * s[o + 1]
    );
  };
}
function monotoneSlope(i, t, e) {
  let n = i.length;
  if (e <= 0) return (t[1] - t[0]) / (i[1] - i[0]);
  if (e >= n - 1) return (t[n - 1] - t[n - 2]) / (i[n - 1] - i[n - 2]);
  let s = (t[e] - t[e - 1]) / (i[e] - i[e - 1]),
    r = (t[e + 1] - t[e]) / (i[e + 1] - i[e]);
  if (s * r <= 0) return 0;
  let o = i[e] - i[e - 1],
    a = i[e + 1] - i[e],
    c = 2 * a + o,
    l = a + 2 * o;
  return (c + l) / (c / s + l / r);
}
function hermite(i, t, e, n, s, r, o) {
  let a = t - i,
    c = (o - i) / a,
    l = c * c,
    h = l * c;
  return (2 * h - 3 * l + 1) * e + (h - 2 * l + c) * a * s + (3 * l - 2 * h) * n + (h - l) * a * r;
}

export { clamp, easeInOutCubic, hermite, lerp, monotoneCurve, monotoneSlope, smoothstep };
