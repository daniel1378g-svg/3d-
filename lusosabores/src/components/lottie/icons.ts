// The site's animated icons, written as Lottie animations (48 × 48, 30 fps) so they play through lottie-web
// (the dotLottie player needs WebAssembly, which the preview blocks) and take the palette at runtime.
// Drawn for this site; no third-party animation files.
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

export type IconName = "flame" | "chicken" | "fish" | "octopus" | "prawn" | "crab" | "phone" | "clock" | "calendar" | "bag" | "star" | "pin" | "pot";

const builders: Record<IconName, (c: number[], a: number[]) => object> = {
  flame: (c, a) =>
    doc(60, [
      layer([
        group([path("M24 40 C19 40 17 36 18 32 C19 28 22 27 22 22 C26 25 27 29 26 32 C28 30 29 28 29 25 C33 29 33 34 31 37 C30 39 27 40 24 40 Z"), stroke(a, 2)], {
          a: S([24, 40]), p: S([24, 40]), s: K([[0, [100, 100]], [8, [92, 110]], [16, [106, 94]], [24, [96, 106]], [32, [102, 98]], [60, [100, 100]]]),
        }),
        group([path("M24 42 C14 42 10 34 12 27 C14 20 19 18 18 10 C24 14 26 19 25 24 C28 21 29 15 27 6 C35 12 39 21 38 30 C37 37 32 42 24 42 Z"), stroke(c)], {
          a: S([24, 42]), p: S([24, 42]), s: K([[0, [100, 100]], [10, [96, 106]], [20, [104, 96]], [30, [98, 104]], [40, [102, 98]], [60, [100, 100]]]),
        }),
      ], 60),
    ]),
  chicken: (c, a) =>
    doc(60, [
      layer([
        group([el(39, 10, 5), el(43, 16, 5), stroke(a, 2)]),
        group([path("M34 14 C38 11 41 13 40 17 C39 20 36 21 34 20 L27 27 C29 34 23 40 16 38 C9 36 6 29 9 23 C12 17 20 16 24 20 Z"), path("M14 27 L20 25"), path("M15 32 L21 30"), stroke(c)], {
          a: S([18, 30]), p: S([18, 30]), r: K([[0, 0], [8, -10], [16, 8], [24, -4], [32, 0], [60, 0]]),
        }),
      ], 60),
    ]),
  crab: (c, a) =>
    doc(60, [
      layer([
        group([path("M15 32 L9 36"), path("M17 35 L12 40"), path("M33 32 L39 36"), path("M31 35 L36 40"), stroke(c, 2)]),
        group([path("M16 24 C11 21 9 16 11 11"), path("M11 11 L15 9"), path("M11 11 L8 14"), stroke(a, 2.2)], { a: S([16, 24]), p: S([16, 24]), r: K([[0, 0], [6, -14], [12, 4], [18, -10], [24, 0], [60, 0]]) }),
        group([path("M32 24 C37 21 39 16 37 11"), path("M37 11 L33 9"), path("M37 11 L40 14"), stroke(a, 2.2)], { a: S([32, 24]), p: S([32, 24]), r: K([[0, 0], [6, 14], [12, -4], [18, 10], [24, 0], [60, 0]]) }),
        group([el(24, 29, 24, 15), el(20, 24, 2), el(28, 24, 2), stroke(c)]),
      ], 60),
    ]),
  clock: (c, a) =>
    doc(60, [
      layer([
        group([path("M24 24 L24 13"), stroke(a, 2.6)], { a: S([24, 24]), p: S([24, 24]), r: K([[0, 0], [50, 360], [60, 360]]) }),
        group([path("M24 24 L30 27"), stroke(c, 2.6)], { a: S([24, 24]), p: S([24, 24]), r: K([[0, 0], [50, 30], [60, 30]]) }),
        group([el(24, 24, 32), path("M24 9 L24 11"), path("M39 24 L37 24"), path("M24 39 L24 37"), path("M9 24 L11 24"), stroke(c)]),
      ], 60),
    ]),
  star: (c, a) =>
    doc(60, [
      layer([
        group([path("M8 9 L10 11"), path("M40 9 L38 11"), path("M24 3 L24 5"), stroke(a, 2)], { o: K([[0, 0], [10, 100], [30, 100], [40, 0], [60, 0]]) }),
        group([path("M24 9 L28.4 18.6 L39 19.7 L31 26.8 L33.4 37.3 L24 31.8 L14.6 37.3 L17 26.8 L9 19.7 L19.6 18.6 Z"), stroke(c)], {
          a: S([24, 24]), p: S([24, 24]), s: K([[0, [100, 100]], [8, [80, 80]], [18, [114, 114]], [28, [100, 100]], [60, [100, 100]]]), r: K([[0, 0], [8, -10], [18, 8], [28, 0], [60, 0]]),
        }),
      ], 60),
    ]),
  pin: (c, a) =>
    doc(60, [
      layer([
        group([el(24, 43, 12, 3), fill(a, 45)], { s: K([[0, [100, 100]], [8, [70, 70]], [16, [100, 100]], [60, [100, 100]]]), a: S([24, 43]), p: S([24, 43]) }),
        group([path("M24 40 C24 40 13 29 13 20 C13 13.5 18 9 24 9 C30 9 35 13.5 35 20 C35 29 24 40 24 40 Z"), stroke(c)], { p: K([[0, [0, 0]], [8, [0, -6]], [16, [0, 0]], [22, [0, -2]], [28, [0, 0]], [60, [0, 0]]]) }),
        group([el(24, 20, 7), stroke(a, 2.2)], { p: K([[0, [0, 0]], [8, [0, -6]], [16, [0, 0]], [22, [0, -2]], [28, [0, 0]], [60, [0, 0]]]) }),
      ], 60),
    ]),
  fish: (c, a) =>
    doc(60, [
      layer([
        group([el(36, 12, 3), stroke(a, 1.6)], { p: K([[0, [0, 6]], [40, [0, -6]], [60, [0, -6]]]), o: K([[0, 0], [8, 100], [40, 0], [60, 0]]) }),
        group([el(17, 23, 2.6), fill(c)], { p: K([[0, [0, 0]], [30, [2, 0]], [60, [0, 0]]]) }),
        group([path("M9 25 C13 16 24 14 32 21 L32 29 C24 35 13 33 9 25 Z"), stroke(c)], { p: K([[0, [0, 0]], [30, [2, 0]], [60, [0, 0]]]) }),
        group([path("M32 25 L41 18 L41 32 Z"), stroke(a)], { a: S([32, 25]), p: K([[0, [32, 25]], [30, [34, 25]], [60, [32, 25]]]), r: K([[0, -12], [15, 12], [30, -12], [45, 12], [60, -12]]) }),
      ], 60),
    ]),
  octopus: (c, a) =>
    doc(60, [
      layer([
        ...[13, 20, 28, 35].map((x, n) =>
          group([path(`M${x} 26 C${x - 2} 32 ${x + 3} 36 ${x + (n < 2 ? -3 : 3)} 41`), stroke(a, 2.2)], {
            a: S([x, 26]), p: S([x, 26]), r: K([[0, 0], [15 + n * 3, n % 2 ? 14 : -14], [30 + n * 3, 0], [60, 0]]),
          }),
        ),
        group([el(20, 18, 2.4), el(28, 18, 2.4), fill(c)]),
        group([path("M11 27 C10 16 16 8 24 8 C32 8 38 16 37 27 Z"), stroke(c)], { a: S([24, 27]), p: S([24, 27]), s: K([[0, [100, 100]], [15, [104, 96]], [30, [100, 100]], [60, [100, 100]]]) }),
      ], 60),
    ]),
  prawn: (c, a) =>
    doc(60, [
      layer([
        group([path("M30 13 C36 8 41 8 44 5"), path("M30 15 C37 12 42 13 45 11"), stroke(a, 1.6)], { a: S([30, 14]), p: S([30, 14]), r: K([[0, 0], [10, -8], [20, 6], [30, 0], [60, 0]]) }),
        group([el(27, 16, 2.2), fill(c)]),
        group([path("M30 14 C18 12 9 20 10 30 C11 37 17 41 23 39"), path("M15 19 L19 25"), path("M11 26 L17 29"), path("M13 34 L19 33"), stroke(c)], { a: S([20, 26]), p: S([20, 26]), r: K([[0, 0], [12, -5], [24, 3], [36, 0], [60, 0]]) }),
        group([path("M23 39 L19 44 L27 43 Z"), stroke(a, 2)], { a: S([23, 39]), p: S([23, 39]), r: K([[0, 0], [12, 12], [24, -6], [36, 0], [60, 0]]) }),
      ], 60),
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
  calendar: (c, a) =>
    doc(60, [
      layer([
        group([path("M18 28 L22 32 L30 24"), trim(K([[0, 0], [8, 0], [30, 100], [60, 100]])), stroke(a, 2.6)]),
        group([path("M17 9 L17 15"), path("M31 9 L31 15"), stroke(c)], { p: K([[0, [0, 0]], [6, [0, -2]], [12, [0, 0]], [60, [0, 0]]]) }),
        group([rc(24, 26, 28, 26, 3), path("M10 19 L38 19"), stroke(c)]),
      ], 60),
    ]),
  bag: (c, a) =>
    doc(60, [
      layer([
        group([path("M18 18 C18 10 30 10 30 18"), stroke(a, 2)], { a: S([24, 18]), p: S([24, 18]), r: K([[0, 0], [10, -10], [20, 8], [30, 0], [60, 0]]) }),
        group([path("M11 18 L37 18 L34 41 L14 41 Z"), path("M19 28 L29 28"), stroke(c)], { a: S([24, 41]), p: S([24, 41]), s: K([[0, [100, 100]], [8, [104, 94]], [18, [98, 104]], [28, [100, 100]], [60, [100, 100]]]) }),
      ], 60),
    ]),
  pot: (c, a) =>
    doc(60, [
      layer([
        ...[18, 24, 30].map((x, n) =>
          group([path(`M${x} 15 C${x - 2} 12 ${x + 2} 9 ${x} 6`), stroke(a, 2)], {
            p: K([[n * 8, [0, 4]], [n * 8 + 30, [0, -2]], [60, [0, -2]]]), o: K([[n * 8, 0], [n * 8 + 12, 100], [n * 8 + 30, 0], [60, 0]]),
          }),
        ),
        group([path("M10 22 L38 22"), path("M20 18 L28 18"), stroke(c, 2)]),
        group([path("M12 22 L12 36 C12 39 14 41 17 41 L31 41 C34 41 36 39 36 36 L36 22"), path("M12 27 L7 27"), path("M36 27 L41 27"), stroke(c)]),
      ], 60),
    ]),
};

const cache = new Map<string, object>();
export function iconData(name: IconName, color: string, accent: string) {
  const key = `${name}${color}${accent}`;
  if (!cache.has(key)) cache.set(key, builders[name](rgb(color), rgb(accent)));
  return cache.get(key)!;
}
