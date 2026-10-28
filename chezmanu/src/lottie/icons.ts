// The site's animated icons, written as Lottie animations (48 × 48, 30 fps) so they play through lottie-web and
// take the palette at runtime. Drawn by hand for this site (clock, phone, calendar, pin and mail adapted from
// ../oliveira); no third-party animation files.
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

const steamStrands = (a: number[], xs: number[], top: number) =>
  xs.map((x, n) =>
    group([path(`M${x} ${top + 9} C${x - 2.5} ${top + 6} ${x + 2.5} ${top + 3} ${x} ${top}`), stroke(a, 2)], {
      p: K([[n * 8, [0, 4]], [n * 8 + 32, [0, -3]], [60, [0, -3]]]), o: K([[n * 8, 0], [n * 8 + 12, 100], [n * 8 + 32, 0], [60, 0]]),
    }),
  );

export type IconName = "cup" | "croissant" | "bread" | "cake" | "clock" | "phone" | "sun" | "calendar" | "pin" | "mail";

const builders: Record<IconName, (c: number[], a: number[]) => object> = {
  cup: (c, a) =>
    doc(60, [
      layer([
        ...steamStrands(a, [18, 24, 30], 6),
        group([path("M11 21 L35 21 L33 35 C32.5 38.5 30 40 26.5 40 L19.5 40 C16 40 13.5 38.5 13 35 Z"), path("M35 24 C40 24 41 31 34.5 32.5"), stroke(c)]),
        group([path("M8 43 L38 43"), stroke(c, 2.2)]),
      ], 60),
    ]),
  croissant: (c, a) =>
    doc(60, [
      layer([
        group([el(37, 11, 3), el(11, 14, 2), fill(a)], { o: K([[0, 0], [10, 100], [24, 0], [60, 0]]), s: K([[0, [40, 40]], [12, [120, 120]], [24, [60, 60]], [60, [60, 60]]]) }),
        group(
          [
            path("M6 32 C8 20 17 14 24 14 C31 14 40 20 42 32 C38 30 34 29 31.5 30.5 C29.5 25.5 18.5 25.5 16.5 30.5 C14 29 10 30 6 32 Z"),
            path("M17 29 L19.5 17.5"),
            path("M24 25.5 L24 14"),
            path("M31 29 L28.5 17.5"),
            stroke(c),
          ],
          { a: S([24, 30]), p: S([24, 30]), r: K([[0, 0], [10, -9], [20, 7], [30, -3], [40, 0], [60, 0]]), s: K([[0, [100, 100]], [10, [108, 108]], [30, [100, 100]], [60, [100, 100]]]) },
        ),
      ], 60),
    ]),
  bread: (c, a) =>
    doc(60, [
      layer([
        group([path("M16 25 L20 19"), path("M22.5 25 L26.5 19"), path("M29 25 L33 19"), trim(K([[0, 0], [24, 100], [60, 100]])), stroke(a, 2.4)]),
        group([path("M7 31 C7 21 15 15 24 15 C33 15 41 21 41 31 L41 34 C41 36.5 39 38.5 36.5 38.5 L11.5 38.5 C9 38.5 7 36.5 7 34 Z"), stroke(c)], {
          a: S([24, 38]), p: S([24, 38]), s: K([[0, [100, 100]], [14, [104, 110]], [30, [100, 100]], [60, [100, 100]]]),
        }),
      ], 60),
    ]),
  cake: (c, a) =>
    doc(60, [
      layer([
        group([el(24, 8, 3.4, 5.6), fill(a)], { a: S([24, 10]), p: S([24, 10]), s: K([[0, [70, 70]], [8, [110, 125]], [16, [85, 95]], [24, [115, 120]], [32, [90, 100]], [44, [105, 115]], [60, [70, 70]]]) }),
        group([path("M24 13 L24 19"), stroke(c, 2.2)]),
        group([rc(24, 23.5, 18, 9, 2), rc(24, 33.5, 28, 11, 2.5), path("M7 41.5 L41 41.5"), stroke(c)]),
        group([path("M10 31 C13 33.5 16 33.5 19 31 C22 33.5 26 33.5 29 31 C32 33.5 35 33.5 38 31"), stroke(a, 2)]),
      ], 60),
    ]),
  sun: (c, a) =>
    doc(90, [
      layer([
        group(
          [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const r = (deg * Math.PI) / 180;
            const p = (d: number) => `${(24 + Math.cos(r) * d).toFixed(2)} ${(24 + Math.sin(r) * d).toFixed(2)}`;
            return group([path(`M${p(13)} L${p(19)}`), stroke(a, 2.4)]);
          }),
          { a: S([24, 24]), p: S([24, 24]), r: { a: 1, k: [{ t: 0, s: [0] }, { t: 90, s: [45] }] }, s: K([[0, [100, 100]], [45, [112, 112]], [90, [100, 100]]]) },
        ),
        group([el(24, 24, 16), stroke(c)]),
      ], 90),
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
};

const cache = new Map<string, object>();
export function iconData(name: IconName, color: string, accent: string) {
  const key = `${name}${color}${accent}`;
  if (!cache.has(key)) cache.set(key, builders[name](rgb(color), rgb(accent)));
  return cache.get(key)!;
}
