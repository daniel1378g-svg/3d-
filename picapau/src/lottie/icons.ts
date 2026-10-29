// The site's animated icons, written as Lottie animations (48 × 48, 30 fps) so they play through lottie-web
// (SVG renderer, no WebAssembly, so they also run in the claude.ai preview) and take the palette's colours at
// runtime. Drawn for this repo; fish, wine, clock and phone come from the Zé-do-Pipo proposal.
type V2 = [number, number];
type Anim<T> = { a: 0; k: T } | { a: 1; k: object[] };
const S = <T,>(k: T): Anim<T> => ({ a: 0, k });
const ease = { i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } };
/** Keyframes: [frame, value][]; scalars and vectors both pass as arrays. */
const K = (frames: [number, number[] | number][]) => ({
  a: 1 as const,
  k: frames.map(([t, s], n) => (n === frames.length - 1 ? { t, s: Array.isArray(s) ? s : [s] } : { t, s: Array.isArray(s) ? s : [s], ...ease })),
});

/** A constant-speed turn from frame a to b (lottie needs in/out tangents on every keyframe but the last). */
const linear = (a: number, b: number, from: number, to: number) => ({
  a: 1 as const,
  k: [{ t: a, s: [from], i: { x: [1], y: [1] }, o: { x: [0], y: [0] } }, { t: b, s: [to] }],
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


export type IconName = "woodpecker" | "pot" | "fish" | "wine" | "clock" | "phone" | "tram" | "sun";

const builders: Record<IconName, (c: number[], a: number[]) => object> = {
  woodpecker: (c, a) =>
    doc(60, [
      layer([
        group([rc(41, 24, 7, 44, 1.5), fill(c, 35)]),
        group([path("M20 36 L14 44"), stroke(c, 2.4)]),
        group([path("M14 30 C14 22 18 18 23 18 C28 18 31 22 31 28 C31 34 27 38 21 38 C17 38 14 35 14 30 Z"), stroke(c)]),
        group([path("M18 28 L26 28"), path("M17 32 L25 32"), stroke(a, 2)]),
        group(
          [
            group([el(27, 14, 9), stroke(c)]),
            group([path("M23 9 C25 6 30 6 32 9"), stroke(a, 2.6)]),
            group([path("M31 13 L38 14 L31 16"), stroke(a, 2)]),
          ],
          { a: S([25, 19]), p: S([25, 19]), r: K([[0, 0], [5, 16], [9, 0], [14, 16], [18, 0], [23, 16], [27, 0], [60, 0]]) },
        ),
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
        group([path("M10 20 L38 20"), path("M22 17 L26 17"), stroke(c, 2.4)], { p: K([[0, [0, 0]], [6, [0, -1.5]], [12, [0, 0]], [18, [0, -1.5]], [24, [0, 0]], [60, [0, 0]]]) }),
        group([path("M11 23 L37 23 L35 38 C35 40 33 41 31 41 L17 41 C15 41 13 40 13 38 Z"), path("M11 27 L7 27"), path("M37 27 L41 27"), stroke(c)]),
      ], 60),
    ]),
  tram: (c, a) =>
    doc(48, [
      layer([
        ...[20, 27].map((y, n) =>
          group([path(`M2 ${y} L7 ${y}`), stroke(a, 2)], { p: K([[n * 6, [4, 0]], [n * 6 + 18, [-3, 0]], [48, [-3, 0]]]), o: K([[n * 6, 0], [n * 6 + 6, 100], [n * 6 + 18, 0], [48, 0]]) }),
        ),
        group(
          [
            group([path("M18 12 L24 6 L30 12"), stroke(c, 2)]),
            group([rc(26, 23, 30, 20, 4), stroke(c)]),
            group([rc(20, 20, 6, 6, 1), rc(30, 20, 6, 6, 1), stroke(a, 2)]),
            group([el(18, 36, 4), el(34, 36, 4), fill(c)]),
          ],
          { p: K([[0, [0, 0]], [12, [0, -1]], [24, [0, 0]], [36, [0, -1]], [48, [0, 0]]]) },
        ),
      ], 48),
    ]),
  sun: (c, a) =>
    doc(120, [
      layer([
        group([...Array.from({ length: 8 }, (_, i) => {
          const ang = (i * Math.PI) / 4;
          const x1 = 24 + Math.cos(ang) * 14, y1 = 24 + Math.sin(ang) * 14, x2 = 24 + Math.cos(ang) * 19, y2 = 24 + Math.sin(ang) * 19;
          return path(`M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)}`);
        }), stroke(a, 2.4)], { a: S([24, 24]), p: S([24, 24]), r: linear(0, 120, 0, 90) }),
        group([el(24, 24, 16), stroke(c)], { a: S([24, 24]), p: S([24, 24]), s: K([[0, [100, 100]], [30, [108, 108]], [60, [100, 100]], [90, [108, 108]], [120, [100, 100]]]) }),
      ], 120),
    ]),
  fish: (c, a) =>
    doc(60, [
      layer([
        group([el(17, 22, 2.6), fill(c)], { p: K([[0, [0, 0]], [30, [2, 0]], [60, [0, 0]]]) }),
        group([path("M10 24 C14 16 24 14 32 20 L32 28 C24 34 14 32 10 24 Z"), stroke(c)], { p: K([[0, [0, 0]], [30, [2, 0]], [60, [0, 0]]]) }),
        group([path("M32 24 L40 17 L40 31 Z"), stroke(a)], { a: S([32, 24]), p: K([[0, [32, 24]], [30, [34, 24]], [60, [32, 24]]]), r: K([[0, -10], [15, 10], [30, -10], [45, 10], [60, -10]]) }),
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
  clock: (c, a) =>
    doc(120, [
      layer([
        group([path("M24 24 L24 12"), stroke(a, 2.4)], { a: S([24, 24]), p: S([24, 24]), r: linear(0, 120, 0, 360) }),
        group([path("M24 24 L31 24"), stroke(c, 2.4)], { a: S([24, 24]), p: S([24, 24]), r: linear(0, 120, 0, 30) }),
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
};

const cache = new Map<string, object>();
export function iconData(name: IconName, color: string, accent: string) {
  const key = `${name}${color}${accent}`;
  if (!cache.has(key)) cache.set(key, builders[name](rgb(color), rgb(accent)));
  return cache.get(key)!;
}
