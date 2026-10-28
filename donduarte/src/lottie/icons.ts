// The site's animated icons, written as Lottie animations (48 × 48, 30 fps) so they play through lottie-web
// and can be recoloured to the palette at runtime. Drawn for this site; no third-party animation files.
type V2 = [number, number];
type Anim<T> = { a: 0; k: T } | { a: 1; k: object[] };
const S = <T,>(k: T): Anim<T> => ({ a: 0, k });
const ease = { i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } };
/** Keyframes: [frame, value][]; scalars and vectors both pass as arrays. */
const K = (frames: [number, number[] | number][]) => ({
  a: 1 as const,
  k: frames.map(([t, s], n) => (n === frames.length - 1 ? { t, s: Array.isArray(s) ? s : [s] } : { t, s: Array.isArray(s) ? s : [s], ...ease })),
});

// "M x y L x y C x1 y1 x2 y2 x y Z", absolute coordinates only.
function path(d: string) {
  const tokens = d.match(/[MLCZ]|-?\d*\.?\d+/g) ?? [];
  const v: V2[] = [], i: V2[] = [], o: V2[] = [];
  let closed = false;
  for (let n = 0; n < tokens.length; ) {
    const cmd = tokens[n++];
    const num = () => Number(tokens[n++]);
    if (cmd === "M" || cmd === "L") {
      v.push([num(), num()]); i.push([0, 0]); o.push([0, 0]);
    } else if (cmd === "C") {
      const c1: V2 = [num(), num()], c2: V2 = [num(), num()], p: V2 = [num(), num()];
      const last = v.length - 1;
      o[last] = [c1[0] - v[last][0], c1[1] - v[last][1]];
      v.push(p); i.push([c2[0] - p[0], c2[1] - p[1]]); o.push([0, 0]);
    } else if (cmd === "Z") closed = true;
  }
  // A closing curve that lands on the first point merges into it.
  const end = v.length - 1;
  if (closed && end > 0 && Math.hypot(v[end][0] - v[0][0], v[end][1] - v[0][1]) < 0.01) {
    i[0] = i[end];
    v.pop(); i.pop(); o.pop();
  }
  return { ty: "sh", ks: S({ i, o, v, c: closed }) };
}
const el = (x: number, y: number, w: number, h = w) => ({ ty: "el", p: S([x, y]), s: S([w, h]) });
const rc = (x: number, y: number, w: number, h: number, r = 2) => ({ ty: "rc", p: S([x, y]), s: S([w, h]), r: S(r) });
const stroke = (c: number[], w = 2.4) => ({ ty: "st", c: S([...c, 1]), o: S(100), w: S(w), lc: 2, lj: 2 });
const fill = (c: number[], op = 100) => ({ ty: "fl", c: S([...c, 1]), o: S(op), r: 1 });
const trim = (e: Anim<number> | ReturnType<typeof K>, s: Anim<number> | ReturnType<typeof K> = S(0)) => ({ ty: "tm", s, e, o: S(0), m: 1 });
type Tr = { p?: object; a?: object; s?: object; r?: object; o?: object };
const tr = (t: Tr = {}) => ({ ty: "tr", p: t.p ?? S([0, 0]), a: t.a ?? S([0, 0]), s: t.s ?? S([100, 100]), r: t.r ?? S(0), o: t.o ?? S(100), sk: S(0), sa: S(0) });
const group = (items: object[], t: Tr = {}) => ({ ty: "gr", it: [...items, tr(t)] });
const layer = (shapes: object[], op: number, ind = 1) => ({
  ddd: 0, ind, ty: 4, nm: `l${ind}`, sr: 1, ao: 0, ip: 0, op, st: 0, bm: 0,
  ks: { o: S(100), r: S(0), p: S([24, 24, 0]), a: S([24, 24, 0]), s: S([100, 100, 100]) },
  shapes,
});
const doc = (op: number, layers: object[]) => ({ v: "5.7.4", fr: 30, ip: 0, op, w: 48, h: 48, nm: "icon", ddd: 0, assets: [], layers });

const rgb = (hex: string) => [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16) / 255);

export type IconName = "flame" | "stack" | "pizza" | "fork" | "fish" | "grill" | "wine" | "icecream" | "clock" | "phone" | "pin" | "download";

const builders: Record<IconName, (c: number[], a: number[]) => object> = {
  flame: (c, a) =>
    doc(48, [
      layer([
        group([path("M24 26 C27 29 29 31 29 34 C29 37 26.8 39 24 39 C21.2 39 19 37 19 34 C19 31 22 29 24 26 Z"), fill(a)], {
          a: S([24, 39]), p: S([24, 39]), s: K([[0, [100, 100]], [12, [92, 112]], [24, [104, 94]], [36, [96, 108]], [48, [100, 100]]]),
        }),
        group([path("M24 6 C30 14 36 20 36 29 C36 36 30.6 42 24 42 C17.4 42 12 36 12 29 C12 23 16 19 18 15 C19 20 21 22 23 22 C22 16 23 10 24 6 Z"), stroke(c)], {
          a: S([24, 42]), p: S([24, 42]), s: K([[0, [100, 100]], [16, [97, 106]], [32, [102, 97]], [48, [100, 100]]]), r: K([[0, 0], [16, -2], [32, 2], [48, 0]]),
        }),
      ], 48),
    ]),
  stack: (c, a) =>
    doc(72, [
      layer([
        group([rc(24, 14, 28, 7, 3.5), stroke(c)], { p: K([[0, [0, -10]], [10, [0, 0]], [60, [0, 0]], [72, [0, -10]]]), o: K([[0, 0], [8, 100], [62, 100], [72, 0]]) }),
        group([path("M12 24 L36 24"), stroke(a, 3)], { p: K([[6, [0, -10]], [16, [0, 0]], [60, [0, 0]], [72, [0, -10]]]), o: K([[6, 0], [14, 100], [62, 100], [72, 0]]) }),
        group([path("M14 29 L34 29 C33 33 31 35 28 35 L20 35 C17 35 15 33 14 29 Z"), stroke(c)], { p: K([[12, [0, -8]], [22, [0, 0]], [60, [0, 0]], [72, [0, -8]]]), o: K([[12, 0], [20, 100], [62, 100], [72, 0]]) }),
        group([rc(24, 39, 30, 6, 3), stroke(c)]),
      ], 72),
    ]),
  pizza: (c, a) =>
    doc(90, [
      layer([
        group([el(20, 26, 3), el(29, 20, 3), el(27, 32, 3), fill(a)], { a: S([24, 24]), p: S([24, 24]), r: K([[0, 0], [30, 60], [90, 60]]) }),
        group([el(24, 24, 30), stroke(c)]),
        group([path("M24 9 L24 39"), path("M11 16.5 L37 31.5"), path("M11 31.5 L37 16.5"), stroke(c, 1.6)], { a: S([24, 24]), p: S([24, 24]), r: K([[0, 0], [30, 60], [90, 60]]) }),
      ], 90),
    ]),
  fork: (c, a) =>
    doc(60, [
      layer([
        group([path("M30 26 C34 22 34 16 30 14 C26 12 22 16 24 20 C26 24 31 22 30 18"), trim(K([[0, 0], [36, 100], [60, 100]])), stroke(a, 2.2)]),
        group([path("M18 8 L18 18 C18 21 20 23 22 23 L22 40"), path("M22 8 L22 16"), path("M26 8 L26 18 C26 21 24 23 22 23"), stroke(c)], {
          a: S([22, 40]), p: S([22, 40]), r: K([[0, 0], [20, -8], [40, 4], [60, 0]]),
        }),
      ], 60),
    ]),
  fish: (c, a) =>
    doc(60, [
      layer([
        group([el(17, 22, 2.6), fill(c)], { p: K([[0, [0, 0]], [30, [2, 0]], [60, [0, 0]]]) }),
        group([path("M10 24 C14 16 24 14 32 20 L32 28 C24 34 14 32 10 24 Z"), stroke(c)], { p: K([[0, [0, 0]], [30, [2, 0]], [60, [0, 0]]]) }),
        group([path("M32 24 L40 17 L40 31 Z"), stroke(a)], { a: S([32, 24]), p: K([[0, [32, 24]], [30, [34, 24]], [60, [32, 24]]]), r: K([[0, -10], [15, 10], [30, -10], [45, 10], [60, -10]]) }),
      ], 60),
    ]),
  grill: (c, a) =>
    doc(60, [
      layer([
        ...[17, 24, 31].map((x, n) =>
          group([path(`M${x} 16 C${x - 2} 13 ${x + 2} 10 ${x} 7`), stroke(a, 2)], {
            p: K([[n * 8, [0, 4]], [n * 8 + 30, [0, -2]], [60, [0, -2]]]), o: K([[n * 8, 0], [n * 8 + 12, 100], [n * 8 + 30, 0], [60, 0]]),
          }),
        ),
        group([path("M10 22 L38 22"), path("M12 26 L36 26"), stroke(c, 2)]),
        group([path("M10 22 C10 32 16 36 24 36 C32 36 38 32 38 22"), path("M18 36 L15 42"), path("M30 36 L33 42"), stroke(c)]),
      ], 60),
    ]),
  wine: (c, a) =>
    doc(90, [
      layer([
        group([path("M24 4 L24 18"), trim(K([[0, 0], [14, 100], [60, 100], [70, 100]]), K([[0, 0], [50, 0], [64, 100], [90, 100]])), stroke(a, 2)]),
        group([path("M15 20 L33 20 C33 26 29 29 24 29 C19 29 15 26 15 20 Z"), fill(a)], { a: S([24, 29]), p: S([24, 29]), s: K([[0, [100, 0]], [14, [100, 0]], [50, [100, 100]], [80, [100, 100]], [90, [100, 0]]]) }),
        group([path("M14 12 L34 12 C34 24 30 30 24 30 C18 30 14 24 14 12 Z"), path("M24 30 L24 40"), path("M17 40 L31 40"), stroke(c)]),
      ], 90),
    ]),
  icecream: (c, a) =>
    doc(60, [
      layer([
        group([el(24, 8, 4), fill(a)], { p: K([[0, [0, 0]], [12, [0, -4]], [24, [0, 0]], [60, [0, 0]]]) }),
        group([path("M15 20 C15 14 19 11 24 11 C29 11 33 14 33 20 Z"), stroke(c)]),
        group([path("M14 22 L34 22 L24 42 Z"), path("M19 27 L27 35"), path("M29 27 L22 37"), stroke(c, 2)]),
      ], 60),
    ]),
  clock: (c, a) =>
    doc(120, [
      layer([
        group([path("M24 24 L24 12"), stroke(a, 2.4)], { a: S([24, 24]), p: S([24, 24]), r: { a: 1, k: [{ t: 0, s: [0] }, { t: 120, s: [360] }] } }),
        group([path("M24 24 L31 24"), stroke(c, 2.4)], { a: S([24, 24]), p: S([24, 24]), r: { a: 1, k: [{ t: 0, s: [0] }, { t: 120, s: [30] }] } }),
        group([el(24, 24, 32), stroke(c)]),
        group([el(24, 24, 3), fill(c)]),
      ], 120),
    ]),
  phone: (c, a) =>
    doc(60, [
      layer([
        group([path("M29 11 C33 12 36 15 37 19"), path("M29 6 C36 7 41 12 42 19"), stroke(a, 2)], { o: K([[0, 0], [10, 100], [30, 100], [40, 0], [60, 0]]) }),
        group([path("M14 8 L19 8 L22 16 L18 19 C20 24 24 28 29 30 L32 26 L40 29 L40 34 C40 37 38 40 34 40 C21 39 9 27 8 14 C8 10 11 8 14 8 Z"), stroke(c)], {
          a: S([24, 24]), p: S([24, 24]), r: K([[0, 0], [5, -8], [10, 8], [15, -8], [20, 8], [25, 0], [60, 0]]),
        }),
      ], 60),
    ]),
  pin: (c, a) =>
    doc(60, [
      layer([
        group([el(24, 42, 14, 4), fill(c, 30)], { a: S([24, 42]), p: S([24, 42]), s: K([[0, [100, 100]], [15, [60, 60]], [30, [100, 100]], [60, [100, 100]]]) }),
        group([group([el(24, 18, 8), stroke(a)]), group([path("M24 40 C24 40 12 28 12 18 C12 11 17.4 6 24 6 C30.6 6 36 11 36 18 C36 28 24 40 24 40 Z"), stroke(c)])], {
          p: K([[0, [0, 0]], [15, [0, -6]], [30, [0, 0]], [60, [0, 0]]]),
        }),
      ], 60),
    ]),
  download: (c, a) =>
    doc(45, [
      layer([
        group([path("M24 8 L24 28"), path("M16 21 L24 29 L32 21"), stroke(a)], { p: K([[0, [0, -4]], [20, [0, 3]], [30, [0, 3]], [45, [0, -4]]]), o: K([[0, 100], [30, 100], [38, 0], [45, 100]]) }),
        group([path("M10 30 L10 38 L38 38 L38 30"), stroke(c)]),
      ], 45),
    ]),
};

const cache = new Map<string, object>();
export function iconData(name: IconName, color: string, accent: string) {
  const key = `${name}${color}${accent}`;
  if (!cache.has(key)) cache.set(key, builders[name](rgb(color), rgb(accent)));
  return cache.get(key)!;
}
