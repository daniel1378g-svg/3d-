// Writes public/images/azulejos.svg: the page background, a 4 × 4 panel of hand-painted-looking
// Portuguese tiles (cobalt #1E4FA3 and light blue #8FA9D9 on white) that repeats as a mosaic.
// Every tile is different; each stroke and fill is nudged off true and varies a little in intensity,
// and a light displacement filter wobbles the edges like a brush. Seeded, so the output is stable.
import { writeFileSync } from "node:fs";

const C = "#1E4FA3", L = "#8FA9D9", T = 140; // tile size in SVG units
let seed = 1988;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const jit = (a = 0.9) => (rnd() * 2 - 1) * a;
const f = (n) => Math.round(n * 10) / 10;
const op = (lo = 0.8) => f(lo + rnd() * (1 - lo));

// Rotate a point k quarter-turns about the tile centre, then wobble it.
const R = (k, a = 0.9) => ([x, y]) => {
  let dx = x - 70, dy = y - 70;
  for (let i = 0; i < k; i++) [dx, dy] = [-dy, dx];
  return `${f(70 + dx + jit(a))} ${f(70 + dy + jit(a))}`;
};
// Path data written with "x,y" pairs; every pair goes through the rotation.
const tf = (d, r) => d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, x, y) => r([+x, +y]));
const fillA = (c, lo) => `fill="${c}" fill-opacity="${op(lo)}"`;
const strokeA = (c, w, lo) => `fill="none" stroke="${c}" stroke-width="${f(w + jit(0.35))}" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="${op(lo)}"`;
const four = (d, attrs) => [0, 1, 2, 3].map((k) => `<path d="${tf(d, R(k))}" ${attrs()}/>`).join("");
const one = (d, attrs) => `<path d="${tf(d, R(0))}" ${attrs()}/>`;
const dot = (x, y, r, c, lo) => `<circle cx="${f(x + jit(0.6))}" cy="${f(y + jit(0.6))}" r="${f(r + jit(0.3))}" ${fillA(c, lo)}/>`;
const dot4 = (x, y, r, c, lo) => [0, 1, 2, 3].map((k) => { const [px, py] = R(k, 0.6)([x, y]).split(" ").map(Number); return dot(px, py, r, c, lo); }).join("");
const ring = (r, c, w, lo) => `<circle cx="${f(70 + jit(0.5))}" cy="${f(70 + jit(0.5))}" r="${f(r + jit(0.5))}" ${strokeA(c, w, lo)}/>`;
const polar = (r, deg) => [70 + r * Math.cos((deg * Math.PI) / 180), 70 + r * Math.sin((deg * Math.PI) / 180)];
const petal = (r0, r1, deg, spread, c, lo) => {
  const [a, b] = [polar(r0, deg), polar(r1, deg)];
  const [c1, c2] = [polar((r0 + r1) / 2, deg - spread), polar((r0 + r1) / 2, deg + spread)];
  const p = (q) => `${f(q[0] + jit())},${f(q[1] + jit())}`;
  return `<path d="M${p(a)}Q${p(c1)} ${p(b)}Q${p(c2)} ${p(a)}Z" ${fillA(c, lo)}/>`.replace(/(\d),(\d)/g, "$1 $2");
};
const star = (n, ro, ri, rot, attrs) => {
  const pts = Array.from({ length: n * 2 }, (_, i) => polar(i % 2 ? ri : ro, rot + (i * 180) / n)).map(([x, y]) => `${f(x + jit())} ${f(y + jit())}`);
  return `<path d="M${pts.join("L")}Z" ${attrs()}/>`;
};

const motifs = {
  rosette: () => [ring(34, L, 5, 0.7), ...Array.from({ length: 8 }, (_, i) => petal(9, 31, i * 45 + jit(2), 24, C)), ...Array.from({ length: 8 }, (_, i) => { const [x, y] = polar(46, i * 45 + 22.5); return dot(x, y, 4, C); }), dot(70, 70, 7, C), dot(70, 70, 2.6, "#FFFFFF", 0.95), four("M0,0 Q22,4 26,26 Q4,22 0,0Z", () => fillA(L, 0.7))].join(""),
  flower: () => [four("M70,62 C58,44 56,22 70,8 C84,22 82,44 70,62Z", () => fillA(C)), ...[45, 135, 225, 315].map((d) => petal(16, 44, d, 22, L, 0.7)), `<circle cx="70" cy="70" r="9" fill="#FFFFFF" ${strokeA(C, 4).replace('fill="none" ', "")}/>`, dot4(14, 14, 5, C)].join(""),
  star: () => [star(8, 54, 26, -90, () => `${fillA(L, 0.65)} stroke="${C}" stroke-width="${f(3 + jit(0.3))}" stroke-linejoin="round"`), star(4, 30, 10, -90, () => fillA(C)), dot(70, 70, 4, "#FFFFFF", 0.95), four("M0,0 L14,4 L18,18 L4,14Z", () => fillA(C))].join(""),
  diamond: () => [one("M70,14 L126,70 L70,126 L14,70Z", () => strokeA(C, 3)), one("M70,34 L106,70 L70,106 L34,70Z", () => fillA(C)), one("M70,48 L92,70 L70,92 L48,70Z", () => 'fill="#FFFFFF" fill-opacity="0.95"'), one("M70,61 L79,70 L70,79 L61,70Z", () => fillA(C)), four("M0,0 L34,0 L0,34Z", () => fillA(L, 0.65)), dot4(70, 6, 3.5, C)].join(""),
  arabesque: () => [four("M70,70 C70,52 90,50 92,34 C94,20 80,14 74,24 C70,31 78,36 82,30", () => strokeA(C, 5)), four("M70,70 C88,70 92,88 106,92 C120,96 128,82 118,76", () => strokeA(L, 4, 0.7)), dot(70, 70, 8, C), dot4(122, 18, 4.5, L, 0.7)].join(""),
  foliage: () => [four("M70,70 C80,60 92,48 112,28", () => strokeA(C, 3.5)), four("M84,56 C84,44 92,40 100,38 C96,48 92,54 84,56Z", () => fillA(C)), four("M96,44 C104,46 110,52 112,60 C104,58 98,52 96,44Z", () => fillA(L, 0.7)), dot4(116, 24, 5, C), four("M70,66 C64,58 64,50 70,44 C76,50 76,58 70,66Z", () => fillA(C)), dot(70, 70, 5, L)].join(""),
  volute: () => [four("M0,46 C26,46 46,26 46,0", () => strokeA(C, 5)), four("M0,30 C16,30 30,16 30,0", () => strokeA(L, 4, 0.7)), four("M46,0 C46,12 58,16 62,8 C64,3 58,0 55,4", () => strokeA(C, 3.4)), four("M0,46 C12,46 16,58 8,62 C3,64 0,58 4,55", () => strokeA(C, 3.4)), four("M70,70 C66,62 66,54 70,48 C74,54 74,62 70,70Z", () => fillA(C)), dot(70, 70, 4, C)].join(""),
  fleur: () => [four("M70,58 C64,48 62,36 70,20 C78,36 76,48 70,58Z", () => fillA(C)), four("M70,48 C60,46 50,38 52,26 C58,30 64,38 70,48Z", () => fillA(C)), four("M70,48 C80,46 90,38 88,26 C82,30 76,38 70,48Z", () => fillA(C)), four("M61,53 L79,53", () => strokeA(C, 4)), ring(13, L, 5, 0.7), dot(70, 70, 5, C), four("M0,0 Q20,2 22,22 Q2,20 0,0Z", () => fillA(L, 0.65))].join(""),
  lattice: () => [...[0, 1, 2, 3].flatMap((k) => Array.from({ length: 9 }, (_, i) => { const [x, y] = R(k, 0.5)([70 + i * 7.8, 0 + i * 7.8]).split(" ").map(Number); return dot(x, y, 1.9, C); })), four("M70,64 C65,58 65,52 70,46 C75,52 75,58 70,64Z", () => fillA(C)), dot(70, 70, 4, L), four("M0,0 C10,2 16,8 18,18 C8,16 2,10 0,0Z", () => fillA(C))].join(""),
  sparse: () => [four("M0,0 Q14,2 18,18 Q2,14 0,0Z", () => fillA(L, 0.55)), dot4(26, 26, 2.6, L, 0.6), dot4(70, 58, 3.4, C), dot(70, 70, 4, C)].join(""),
  quatrefoil: () => [...[[50, 70], [90, 70], [70, 50], [70, 90]].map(([x, y]) => `<circle cx="${f(x + jit())}" cy="${f(y + jit())}" r="${f(24 + jit(0.6))}" fill="${L}" fill-opacity="${op(0.35)}" stroke="${C}" stroke-width="${f(3 + jit(0.3))}" stroke-opacity="${op()}"/>`), one("M70,58 L82,70 L70,82 L58,70Z", () => fillA(C)), four("M0,0 L26,0 C26,14 14,26 0,26Z", () => fillA(C))].join(""),
  medallion: () => [ring(50, C, 7), ring(40, L, 3, 0.7), four("M70,66 C60,54 58,42 70,30 C82,42 80,54 70,66Z", () => fillA(C)), dot4(98, 42, 4, L, 0.7), four("M0,0 L20,0 C20,11 11,20 0,20Z", () => fillA(L, 0.7))].join(""),
};
const grid = [
  ["rosette", "lattice", "diamond", "foliage"],
  ["volute", "star", "sparse", "quatrefoil"],
  ["fleur", "medallion", "arabesque", "flower"],
  ["sparse", "rosette", "volute", "lattice"],
];
const glaze = ["#FFFFFF", "#FCFDFF", "#F8FAFE", "#FDFDFB"];
const tiles = grid.flatMap((row, y) =>
  row.map((name, x) => {
    const g = glaze[Math.floor(rnd() * glaze.length)];
    const wash = rnd() < 0.5 ? `<circle cx="${f(30 + rnd() * 80)}" cy="${f(30 + rnd() * 80)}" r="${f(40 + rnd() * 30)}" fill="${L}" fill-opacity="${f(0.04 + rnd() * 0.05)}"/>` : "";
    return `<g transform="translate(${x * T} ${y * T})"><rect x="1" y="1" width="${T - 2}" height="${T - 2}" rx="1.5" fill="${g}"/>${wash}<g filter="url(#brush)" opacity="${op(0.86)}">${motifs[name]()}</g></g>`;
  }),
);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${T * 4}" height="${T * 4}" viewBox="0 0 ${T * 4} ${T * 4}"><defs><filter id="brush" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter></defs><rect width="${T * 4}" height="${T * 4}" fill="#D9DEE6"/>${tiles.join("")}</svg>`;
writeFileSync(new URL("../public/images/azulejos.svg", import.meta.url), svg);
console.log(`azulejos.svg ${(svg.length / 1024).toFixed(1)} KB`);
