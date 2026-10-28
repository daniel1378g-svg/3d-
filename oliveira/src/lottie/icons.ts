// The site's animated icons, written as Lottie animations (48 × 48, 30 fps) so they play through lottie-web
// and can be recoloured to the palette at runtime. Drawn by hand (some adapted from the Don Duarte build);
// no third-party animation files.
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

export type IconName = "fork" | "fish" | "grill" | "clock" | "phone" | "pin" | "calendar" | "mail" | "branch" | "glass";

const builders: Record<IconName, (c: number[], a: number[]) => object> = {
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
  calendar: (c, a) =>
    doc(60, [
      layer([
        group([path("M17 29 L22 34 L31 24"), trim(K([[0, 0], [22, 100], [60, 100]])), stroke(a, 2.6)]),
        group([rc(24, 26, 28, 24, 3), path("M10 19 L38 19"), stroke(c)]),
        group([path("M17 9 L17 15"), path("M31 9 L31 15"), stroke(c)], { p: K([[0, [0, 0]], [8, [0, -2]], [16, [0, 0]], [60, [0, 0]]]) }),
      ], 60),
    ]),
  mail: (c, a) =>
    doc(60, [
      layer([
        group([path("M11 16 L24 27 L37 16"), stroke(a, 2.4)], { p: K([[0, [0, 0]], [12, [0, -3]], [24, [0, 0]], [60, [0, 0]]]) }),
        group([rc(24, 24, 30, 22, 3), stroke(c)]),
      ], 60),
    ]),
  branch: (c, a) =>
    doc(90, [
      layer([
        group(
          [
            group([el(30, 29, 5, 7), fill(a)], { a: S([30, 25]), p: S([30, 25]), r: K([[0, 0], [30, 12], [60, -8], [90, 0]]) }),
            group([
              path("M15 32 C12 27 14 22 19 20 C20 25 19 29 15 32 Z"),
              path("M21 25 C21 19 25 15 30 15 C28 20 26 23 21 25 Z"),
              path("M27 19 C29 14 33 11 38 12 C35 16 32 18 27 19 Z"),
              path("M19 31 C24 29 29 31 31 35 C26 36 22 35 19 31 Z"),
              fill(c),
            ]),
            group([path("M8 40 C16 33 26 23 40 10"), stroke(c, 2)]),
          ],
          { a: S([8, 40]), p: S([8, 40]), r: K([[0, 0], [30, -7], [60, 5], [90, 0]]) },
        ),
      ], 90),
    ]),
  glass: (c, a) =>
    doc(90, [
      layer([
        group([el(20, 13, 4), el(26, 12, 5), el(31, 14, 4), fill(c, 45)], { o: K([[0, 0], [38, 0], [48, 100], [80, 100], [90, 0]]) }),
        group([path("M16.5 20 L31.5 20 L30.8 38 L17.2 38 Z"), fill(a)], { a: S([24, 38]), p: S([24, 38]), s: K([[0, [100, 0]], [40, [100, 100]], [80, [100, 100]], [90, [100, 0]]]) }),
        group([path("M14 9 L34 9 L32 40 L16 40 Z"), stroke(c)]),
      ], 90),
    ]),
};

const cache = new Map<string, object>();
export function iconData(name: IconName, color: string, accent: string) {
  const key = `${name}${color}${accent}`;
  if (!cache.has(key)) cache.set(key, builders[name](rgb(color), rgb(accent)));
  return cache.get(key)!;
}
