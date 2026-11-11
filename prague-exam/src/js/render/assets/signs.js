// Czech road signs (vyhláška č. 294/2015 Sb.) and road-marking symbols, drawn in code into one
// texture atlas. No image files: every sign is a small Canvas 2D drawing in a design space that is
// 100 units wide, so the same code works at any atlas resolution.
//
//   SIGNS[code]        -> { w, h, shape }   real size in metres (basic size from TP 65)
//   createSignAtlas()  -> { texture, uv(code) -> [u0, v0, u1, v1] }
//
// Uses the DOM and the global THREE only inside createSignAtlas(), so SIGNS can be imported anywhere.

const RED = '#c8102e';
const BLUE = '#0b4da2';
const YELLOW = '#f7c600';
const WHITE = '#ffffff';
const BLACK = '#15171a';
const GREY = '#8b8e91';
const PAINT = '#f1f1ec';            // road-marking white
const FONT = 'bold 100px Arial, "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif';

// ---------------------------------------------------------------------------------------------
// Path helpers. All coordinates are design units (sign width = 100, y down).
// ---------------------------------------------------------------------------------------------

function roundedPoly(g, pts, r) {
  const n = pts.length;
  g.beginPath();
  if (!(r > 0)) {
    g.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < n; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.closePath();
    return;
  }
  const last = pts[n - 1];
  g.moveTo((last[0] + pts[0][0]) / 2, (last[1] + pts[0][1]) / 2);
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    g.arcTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, r);
  }
  g.closePath();
}

function fillPoly(g, pts, color, r = 0) {
  roundedPoly(g, pts, r);
  g.fillStyle = color;
  g.fill();
}

// Convex polygon moved inwards by d on every edge.
function inset(pts, d) {
  const n = pts.length;
  let area = 0;
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    area += p[0] * q[1] - q[0] * p[1];
  }
  const s = area > 0 ? 1 : -1;
  const lines = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy);
    lines.push([p[0] - (dy / l) * s * d, p[1] + (dx / l) * s * d, dx, dy]);
  }
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = lines[(i + n - 1) % n], b = lines[i];
    const t = ((b[0] - a[0]) * b[3] - (b[1] - a[1]) * b[2]) / (a[2] * b[3] - a[3] * b[2]);
    out.push([a[0] + a[2] * t, a[1] + a[3] * t]);
  }
  return out;
}

function disc(g, cx, cy, r, color) {
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fillStyle = color;
  g.fill();
}

function rrect(g, x, y, w, h, r, color) {
  fillPoly(g, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], color, r);
}

function line(g, x0, y0, x1, y1, width, color, cap = 'butt') {
  g.beginPath();
  g.moveTo(x0, y0);
  g.lineTo(x1, y1);
  g.strokeStyle = color;
  g.lineWidth = width;
  g.lineCap = cap;
  g.stroke();
}

function polyline(g, pts, width, color, cap = 'round') {
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
  g.strokeStyle = color;
  g.lineWidth = width;
  g.lineCap = cap;
  g.lineJoin = 'round';
  g.stroke();
}

// Straight arrow from the tail (x0, y0) to the tip (x1, y1).
function arrow(g, x0, y0, x1, y1, stem, headW, headL, color) {
  const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy);
  const ux = dx / l, uy = dy / l, px = -uy, py = ux;
  const bx = x1 - ux * headL, by = y1 - uy * headL;
  fillPoly(g, [
    [x0 + px * stem / 2, y0 + py * stem / 2], [bx + px * stem / 2, by + py * stem / 2],
    [bx + px * headW / 2, by + py * headW / 2], [x1, y1], [bx - px * headW / 2, by - py * headW / 2],
    [bx - px * stem / 2, by - py * stem / 2], [x0 - px * stem / 2, y0 - py * stem / 2],
  ], color);
}

// Arrow along a polyline with rounded corners; the last point is the tip.
function bent(g, pts, stem, headW, headL, color, radius = 0) {
  const n = pts.length, tip = pts[n - 1], prev = pts[n - 2];
  const dx = tip[0] - prev[0], dy = tip[1] - prev[1], l = Math.hypot(dx, dy);
  const ux = dx / l, uy = dy / l;
  const bx = tip[0] - ux * headL, by = tip[1] - uy * headL;
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < n - 1; i++) {
    const nx = i === n - 2 ? [bx, by] : pts[i + 1];
    if (radius > 0) g.arcTo(pts[i][0], pts[i][1], nx[0], nx[1], radius);
    else g.lineTo(pts[i][0], pts[i][1]);
  }
  g.lineTo(bx + ux * 0.6, by + uy * 0.6);
  g.strokeStyle = color;
  g.lineWidth = stem;
  g.lineCap = 'butt';
  g.lineJoin = 'miter';
  g.stroke();
  fillPoly(g, [[bx - uy * headW / 2, by + ux * headW / 2], tip, [bx + uy * headW / 2, by - ux * headW / 2]], color);
}

// Text scaled to a box. Fonts differ between phones, so the glyph box is measured and fitted
// instead of trusting a point size. `stretch` fills the box in both directions (road lettering);
// otherwise the height is fitted and the width only squeezed when needed.
function text(g, str, cx, cy, boxW, boxH, color, { stretch = false, squeeze = 1, ref = null } = {}) {
  g.save();
  g.font = FONT;
  g.textAlign = 'left';
  g.textBaseline = 'alphabetic';
  const m = g.measureText(str);
  const v = ref ? g.measureText(ref) : m;       // vertical box from a reference word, so accents stand above it
  const bw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  const bh = v.actualBoundingBoxAscent + v.actualBoundingBoxDescent;
  const sy = boxH / bh;
  const sx = stretch ? boxW / bw : Math.min(sy * squeeze, boxW / bw);
  g.translate(cx - sx * (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2,
    cy + sy * (v.actualBoundingBoxAscent - v.actualBoundingBoxDescent) / 2);
  g.scale(sx, sy);
  g.fillStyle = color;
  g.fillText(str, 0, 0);
  g.restore();
}

function mirrored(g, fn) {
  g.save();
  g.translate(100, 0);
  g.scale(-1, 1);
  fn();
  g.restore();
}

// ---------------------------------------------------------------------------------------------
// Sign blanks
// ---------------------------------------------------------------------------------------------

function triangleBlank(g, H, down = false) {
  const tri = down ? [[0, 0], [100, 0], [50, H]] : [[50, 0], [100, H], [0, H]];
  fillPoly(g, tri, WHITE, 5);
  fillPoly(g, inset(tri, 1.4), RED, 4);
  fillPoly(g, inset(tri, down ? 14.5 : 10.4), WHITE, 1.2);
}

function ringBlank(g, inner = WHITE) {
  disc(g, 50, 50, 50, WHITE);
  disc(g, 50, 50, 48.6, RED);
  disc(g, 50, 50, 39.2, inner);
}

function blueDisc(g) {
  disc(g, 50, 50, 50, WHITE);
  disc(g, 50, 50, 48.2, BLUE);
}

function bluePlate(g, H) {
  rrect(g, 0, 0, 100, H, 6, WHITE);
  rrect(g, 1.8, 1.8, 96.4, H - 3.6, 4.4, BLUE);
}

// Red bar of a prohibition sign: always from the top left to the bottom right (Vienna Convention).
function slash(g, width = 7) {
  line(g, 50 - 30, 50 - 30, 50 + 30, 50 + 30, width, RED);
}

function diamond(g, band) {
  const d = [[50, 0], [100, 50], [50, 100], [0, 50]];
  fillPoly(g, d, WHITE, 5);
  roundedPoly(g, inset(d, 1.5), 4);
  g.strokeStyle = BLACK;
  g.lineWidth = 0.9;
  g.stroke();
  fillPoly(g, inset(d, 9.2), YELLOW, 1.5);
  if (band) {
    g.save();
    roundedPoly(g, inset(d, 2.2), 3.5);
    g.clip();
    line(g, 20, 80, 80, 20, 8, BLACK);
    g.restore();
  }
}

// ---------------------------------------------------------------------------------------------
// Pictograms
// ---------------------------------------------------------------------------------------------

// People are thick round-capped strokes on a small skeleton: [x, y] in units of the body height,
// origin between the feet, facing left (-x), which is how Czech signs show them.
const WALK = {
  head: [-0.02, -0.9, 0.088],
  torso: [[-0.015, -0.76], [0.02, -0.47]], torsoW: 0.165,
  legs: [[[0.02, -0.47], [-0.09, -0.25], [-0.21, -0.03]], [[0.02, -0.47], [0.12, -0.26], [0.25, -0.035]]], legW: 0.105,
  arms: [[[-0.015, -0.74], [-0.12, -0.6], [-0.2, -0.47]], [[-0.015, -0.74], [0.1, -0.6], [0.17, -0.47]]], armW: 0.072,
};
const RUN = {
  head: [-0.1, -0.88, 0.095],
  torso: [[-0.07, -0.74], [0.03, -0.46]], torsoW: 0.165,
  legs: [[[0.03, -0.46], [-0.17, -0.34], [-0.15, -0.06]], [[0.03, -0.46], [0.17, -0.27], [0.36, -0.3]]], legW: 0.1,
  arms: [[[-0.07, -0.72], [-0.2, -0.58], [-0.32, -0.66]], [[-0.07, -0.72], [0.1, -0.64], [0.2, -0.5]]], armW: 0.072,
};
const STAND = {
  head: [0, -0.9, 0.088],
  torso: [[0, -0.76], [0, -0.47]], torsoW: 0.18,
  legs: [[[-0.01, -0.47], [-0.06, -0.25], [-0.1, -0.03]], [[0.01, -0.47], [0.06, -0.25], [0.1, -0.03]]], legW: 0.105,
  arms: [[[0, -0.74], [-0.14, -0.62], [-0.22, -0.5]], [[0, -0.74], [0.13, -0.6], [0.17, -0.45]]], armW: 0.072,
};

function person(g, x, footY, height, pose, color, skirt = false) {
  const P = (p) => [x + p[0] * height, footY + p[1] * height];
  const [hx, hy] = P(pose.head);
  disc(g, hx, hy, pose.head[2] * height, color);
  polyline(g, pose.torso.map(P), pose.torsoW * height, color);
  for (const leg of pose.legs) polyline(g, leg.map(P), pose.legW * height, color);
  for (const arm of pose.arms) polyline(g, arm.map(P), pose.armW * height, color);
  if (skirt) {
    const hip = pose.torso[1];
    fillPoly(g, [P([hip[0] - 0.05, hip[1] - 0.14]), P([hip[0] + 0.07, hip[1] - 0.14]),
      P([hip[0] + 0.2, hip[1] + 0.13]), P([hip[0] - 0.19, hip[1] + 0.1])], color, 0.6);
  }
}

function zebra(g, x0, x1, y0, y1, color) {
  const n = 5, pitch = (x1 - x0) / n, lean = (y1 - y0) * 0.42;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * pitch + pitch * 0.2;
    fillPoly(g, [[x + lean, y0], [x + lean + pitch * 0.56, y0], [x + pitch * 0.56, y1], [x, y1]], color);
  }
}

// Arrows chasing each other anticlockwise round a circle (roundabout).
function ringArrows(g, cx, cy, R, width, color, headL, headW, startDeg = 80) {
  for (let k = 0; k < 3; k++) {
    const a0 = (startDeg + k * 120) * Math.PI / 180;
    const a1 = a0 - (120 * Math.PI / 180 - (headL + width * 0.42) / R);
    g.beginPath();
    g.arc(cx, cy, R, a0, a1 - 0.02, true);
    g.strokeStyle = color;
    g.lineWidth = width;
    g.lineCap = 'butt';
    g.stroke();
    const at = a1 - headL / R;
    const c = Math.cos(a1), s = Math.sin(a1);
    // The tip sits a little inside the circle so the head reads as tangent to it.
    fillPoly(g, [[cx + (R + headW / 2) * c, cy + (R + headW / 2) * s],
      [cx + (R - headW * 0.06) * Math.cos(at), cy + (R - headW * 0.06) * Math.sin(at)],
      [cx + (R - headW / 2) * c, cy + (R - headW / 2) * s]], color);
  }
}

function tramSide(g, x0, x1, yTop, yBottom, color, windowColor) {
  const w = x1 - x0, h = yBottom - yTop;
  rrect(g, x0, yTop, w, h * 0.74, h * 0.12, color);
  const n = 5, gap = w * 0.035, ww = (w - gap * (n + 1) - w * 0.04) / n;
  for (let i = 0; i < n; i++) rrect(g, x0 + w * 0.02 + gap + i * (ww + gap), yTop + h * 0.13, ww, h * 0.27, 0, windowColor);
  for (const f of [0.2, 0.8]) disc(g, x0 + w * f, yTop + h * 0.8, h * 0.14, color);
  rrect(g, x0 - w * 0.06, yBottom - h * 0.05, w * 1.12, h * 0.05, 0, color);
  // Pantograph.
  const cx = (x0 + x1) / 2, py = yTop - h * 0.42, lw = h * 0.065;
  polyline(g, [[cx - w * 0.13, yTop], [cx, py], [cx + w * 0.13, yTop]], lw, color, 'butt');
  line(g, cx - w * 0.17, py, cx + w * 0.17, py, lw * 1.2, color);
}

function busSide(g, x0, x1, yTop, yBottom, color, windowColor) {
  const w = x1 - x0, h = yBottom - yTop;
  rrect(g, x0, yTop, w, h * 0.84, h * 0.1, color);
  const n = 5, gap = w * 0.03, ww = (w * 0.94 - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) rrect(g, x0 + w * 0.03 + i * (ww + gap), yTop + h * 0.12, ww, h * 0.3, 0, windowColor);
  for (const f of [0.2, 0.78]) {
    disc(g, x0 + w * f, yTop + h * 0.84, h * 0.2, windowColor);
    disc(g, x0 + w * f, yTop + h * 0.84, h * 0.155, color);
    disc(g, x0 + w * f, yTop + h * 0.84, h * 0.055, windowColor);
  }
}

function carSide(g, x0, x1, yBottom, color, windowColor) {
  const w = x1 - x0, u = w / 100;
  fillPoly(g, [[x0, yBottom - 12 * u], [x0 + 2 * u, yBottom - 24 * u], [x0 + 22 * u, yBottom - 27 * u], [x0 + 34 * u, yBottom - 42 * u],
    [x0 + 70 * u, yBottom - 42 * u], [x0 + 84 * u, yBottom - 27 * u], [x0 + 98 * u, yBottom - 24 * u], [x1, yBottom - 12 * u],
    [x1, yBottom - 6 * u], [x0, yBottom - 6 * u]], color, 2.5 * u);
  fillPoly(g, [[x0 + 28 * u, yBottom - 28 * u], [x0 + 37 * u, yBottom - 38 * u], [x0 + 50 * u, yBottom - 38 * u], [x0 + 50 * u, yBottom - 28 * u]], windowColor);
  fillPoly(g, [[x0 + 54 * u, yBottom - 28 * u], [x0 + 54 * u, yBottom - 38 * u], [x0 + 68 * u, yBottom - 38 * u], [x0 + 77 * u, yBottom - 28 * u]], windowColor);
  for (const f of [22, 78]) {
    disc(g, x0 + f * u, yBottom - 7 * u, 11 * u, windowColor);
    disc(g, x0 + f * u, yBottom - 7 * u, 8.5 * u, color);
  }
}

function homeZone(g, H) {
  bluePlate(g, H);
  // Adult and child with a ball on the left, house and car on the right.
  person(g, 20, 63, 41, STAND, WHITE);
  person(g, 40, 63, 25, WALK, WHITE);
  disc(g, 31, 58.5, 3.1, WHITE);
  fillPoly(g, [[57, 27], [75.5, 11], [94, 27], [89.5, 27], [89.5, 43], [61.5, 43], [61.5, 27]], WHITE, 0.8);
  rrect(g, 66, 30.5, 7, 7, 0, BLUE);
  rrect(g, 78, 30.5, 6.5, 12.5, 0, BLUE);
  carSide(g, 54, 93, 66, WHITE, BLUE);
}

function zonePlate(g, H, ended) {
  const ink = ended ? GREY : BLACK;
  rrect(g, 0, 0, 100, H, 6, WHITE);
  roundedPoly(g, [[2.6, 2.6], [97.4, 2.6], [97.4, H - 2.6], [2.6, H - 2.6]], 4);
  g.strokeStyle = BLACK;
  g.lineWidth = 1.7;
  g.stroke();
  disc(g, 50, 49, 39, ended ? GREY : RED);
  disc(g, 50, 49, 30.5, WHITE);
  text(g, '30', 50, 49, 44, 28, ink, { squeeze: 0.9 });
  text(g, 'ZÓNA', 50, H - 22.5, 70, 15.5, ink, { ref: 'ZONA', squeeze: 0.95 });
  if (ended) {
    g.save();
    roundedPoly(g, [[4, 4], [96, 4], [96, H - 4], [4, H - 4]], 3);
    g.clip();
    for (let i = -2; i <= 2; i++) line(g, 4 + i * 3.1, H - 8 + i * 2.2, 96 + i * 3.1, 8 + i * 2.2, 1.35, BLACK);
    g.restore();
  }
}

function stopPlate(g, H, drawSymbol) {
  bluePlate(g, H);
  rrect(g, 9, 9, 82, 82, 2.5, WHITE);
  drawSymbol();
}

function speedLimit(g, n) {
  ringBlank(g);
  text(g, String(n), 50, 50.5, 57, 36, BLACK, { squeeze: 0.88 });
}

function turnBan(g, mirror) {
  ringBlank(g);
  const draw = () => bent(g, [[41, 73], [41, 43], [73, 43]], 7.5, 19, 15, BLACK, 6);
  if (mirror) mirrored(g, draw); else draw();
  slash(g);
}

// Road arrows are stretched along the direction of travel, as painted (5 m long).
function roadTurn(g, H, u) {              // u = design units per metre; the arrow turns left
  rrect(g, 100 - 0.25 * u, 0.88 * u, 0.2 * u, H - 0.88 * u, 0, PAINT);
  rrect(g, 0.52 * u, 0.88 * u, 100 - 0.57 * u, 0.6 * u, 0, PAINT);
  fillPoly(g, [[0.02 * u, 1.18 * u], [0.6 * u, 0], [0.6 * u, 2.36 * u]], PAINT);
}

function roadStraightAnd(g, H, u) {       // straight ahead plus a branch to the left
  const cx = 100 - 0.375 * u;
  arrow(g, cx, H, cx, 0, 0.2 * u, 0.74 * u, 2 * u, PAINT);
  rrect(g, 0.46 * u, 3.0 * u, cx - 0.46 * u, 0.6 * u, 0, PAINT);
  fillPoly(g, [[0.02 * u, 3.3 * u], [0.5 * u, 2.25 * u], [0.5 * u, 4.35 * u]], PAINT);
}

// ---------------------------------------------------------------------------------------------
// The signs. Each entry: [w, h, shape, draw(g, H), options]. H is the design height (100 * h / w).
// ---------------------------------------------------------------------------------------------

const TRI = [0.9, 0.78, 'triangle'];
const DISC = [0.7, 0.7, 'circle'];
const SQ = [0.5, 0.5, 'square'];

const warning = (draw) => [...TRI, (g, H) => { triangleBlank(g, H); draw(g, H); }];
const speed = (n) => [...DISC, (g) => speedLimit(g, n)];
const mandatory = (draw) => [...DISC, (g) => { blueDisc(g); draw(g); }];

const DEFS = {
  // --- Priority ---
  P1: warning((g) => {
    arrow(g, 50, 76, 50, 24.5, 9, 21, 17, BLACK);
    rrect(g, 30.5, 55.5, 39, 4.6, 0, BLACK);
  }),
  P2: [0.71, 0.71, 'diamond', (g) => diamond(g, false)],
  P3: [0.71, 0.71, 'diamond', (g) => diamond(g, true)],
  P4: [0.9, 0.78, 'triangleDown', (g, H) => triangleBlank(g, H, true)],
  P6: [0.7, 0.7, 'octagon', (g) => {
    const k = 100 * (1 - Math.SQRT1_2), o = [[k, 0], [100 - k, 0], [100, k], [100, 100 - k], [100 - k, 100], [k, 100], [0, 100 - k], [0, k]];
    fillPoly(g, o, WHITE, 2);
    fillPoly(g, inset(o, 3.3), RED, 1);
    text(g, 'STOP', 50, 50, 78, 29, WHITE, { squeeze: 0.95 });
  }],
  P7: [...DISC, (g) => {
    ringBlank(g);
    arrow(g, 37.5, 26, 37.5, 74, 7.5, 18, 16, BLACK);     // oncoming traffic: has priority
    arrow(g, 62.5, 74, 62.5, 26, 5.5, 14.5, 14, RED);     // our direction: gives way
  }],
  P8: [...SQ, (g, H) => {
    bluePlate(g, H);
    arrow(g, 63, 86, 63, 14, 10, 25, 22, WHITE);          // our direction: has priority
    arrow(g, 33, 22, 33, 80, 6.5, 17, 16, RED);
  }],

  // --- Prohibitions ---
  B1: [...DISC, (g) => ringBlank(g)],
  B2: [...DISC, (g) => {
    disc(g, 50, 50, 50, WHITE);
    disc(g, 50, 50, 48.6, RED);
    rrect(g, 14, 42, 72, 16, 0.8, WHITE);
  }],
  B20a_20: speed(20), B20a_30: speed(30), B20a_40: speed(40), B20a_50: speed(50),
  B20a_60: speed(60), B20a_70: speed(70), B20a_80: speed(80),
  B24a: [...DISC, (g) => turnBan(g, false)],
  B24b: [...DISC, (g) => turnBan(g, true)],
  B25: [...DISC, (g) => {
    ringBlank(g);
    // Up on the right, round the top, back down on the left.
    g.beginPath();
    g.moveTo(61, 74);
    g.lineTo(61, 44);
    g.arc(50.5, 44, 10.5, 0, Math.PI, true);
    g.lineTo(40, 58);
    g.strokeStyle = BLACK;
    g.lineWidth = 7.5;
    g.lineCap = 'butt';
    g.stroke();
    fillPoly(g, [[30.5, 57.5], [49.5, 57.5], [40, 73]], BLACK);
    slash(g);
  }],
  B28: [...DISC, (g) => {
    ringBlank(g, BLUE);
    line(g, 21, 21, 79, 79, 8.6, RED);
    line(g, 79, 21, 21, 79, 8.6, RED);
  }],
  B29: [...DISC, (g) => {
    ringBlank(g, BLUE);
    line(g, 21, 21, 79, 79, 8.6, RED);
  }],

  // --- Mandatory ---
  C1: mandatory((g) => ringArrows(g, 50, 50, 23, 9.5, WHITE, 15, 23)),
  C2a: mandatory((g) => arrow(g, 50, 87, 50, 13, 11, 31, 25, WHITE)),
  C2b: mandatory((g) => bent(g, [[37, 85], [37, 43], [89, 43]], 11, 31, 25, WHITE, 8)),
  C2c: mandatory((g) => mirrored(g, () => bent(g, [[37, 85], [37, 43], [89, 43]], 11, 31, 25, WHITE, 8))),
  C2d: mandatory((g) => {
    arrow(g, 37, 87, 37, 12, 10, 27, 22, WHITE);
    bent(g, [[37, 84], [37, 58], [89, 58]], 10, 27, 22, WHITE, 9);
  }),
  C2e: mandatory((g) => mirrored(g, () => {
    arrow(g, 37, 87, 37, 12, 10, 27, 22, WHITE);
    bent(g, [[37, 84], [37, 58], [89, 58]], 10, 27, 22, WHITE, 9);
  })),
  C2f: mandatory((g) => {
    const half = () => bent(g, [[50, 87], [50, 47], [90, 47]], 10.5, 28, 22, WHITE, 8);
    half();
    mirrored(g, half);
  }),
  C4a: mandatory((g) => arrow(g, 26, 26, 76, 76, 11, 31, 25, WHITE)),
  C4b: mandatory((g) => mirrored(g, () => arrow(g, 26, 26, 76, 76, 11, 31, 25, WHITE))),

  // --- Information ---
  IP4b: [...SQ, (g, H) => {
    bluePlate(g, H);
    arrow(g, 50, 88, 50, 12, 14, 38, 30, WHITE);
  }],
  IP6: [...SQ, (g, H) => {
    bluePlate(g, H);
    fillPoly(g, [[50, 14], [89, 81.5], [11, 81.5]], WHITE, 2);
    person(g, 51, 68, 36, WALK, BLACK);
    zebra(g, 28, 72, 68.5, 77.5, BLACK);
  }],
  IP10a: [...SQ, (g, H) => {
    bluePlate(g, H);
    rrect(g, 42.5, 30, 15, 59, 0, WHITE);
    rrect(g, 23, 13, 54, 23, 1.2, WHITE);
    rrect(g, 25.6, 15.6, 48.8, 17.8, 0.6, RED);
  }],
  IP11a: [...SQ, (g, H) => {
    bluePlate(g, H);
    text(g, 'P', 51, 50.5, 60, 62, WHITE);
  }],
  IZ5a: [1.0, 0.75, 'rect', (g, H) => homeZone(g, H)],
  IZ5b: [1.0, 0.75, 'rect', (g, H) => {
    homeZone(g, H);
    g.save();
    roundedPoly(g, [[1.8, 1.8], [98.2, 1.8], [98.2, H - 1.8], [1.8, H - 1.8]], 4.4);
    g.clip();
    line(g, 0, H, 100, 0, 7, RED);
    g.restore();
  }],
  IZ8a_30: [0.75, 1.0, 'rect', (g, H) => zonePlate(g, H, false)],
  IZ8b_30: [0.75, 1.0, 'rect', (g, H) => zonePlate(g, H, true)],
  // Bus stop. The brief calls this key IJ4b; in the decree the bus stop is IJ 4c.
  IJ4b: [0.5, 0.7, 'rect', (g, H) => stopPlate(g, H, () => busSide(g, 17, 83, 33, 67, BLACK, WHITE))],
  // Tram stop. The brief calls this key IJ4c; in the decree the tram stop is IJ 4d.
  IJ4c: [0.5, 0.7, 'rect', (g, H) => stopPlate(g, H, () => tramSide(g, 18, 82, 41, 71, BLACK, WHITE))],

  // --- Warnings ---
  A4: warning((g) => ringArrows(g, 50, 57.5, 12.2, 5.4, BLACK, 8.5, 13)),
  A7a: warning((g) => {
    // Uneven road: two bumps.
    g.beginPath();
    g.moveTo(26.5, 70.5);
    g.lineTo(26.5, 66);
    g.lineTo(30.5, 66);
    g.bezierCurveTo(34, 66, 34.5, 55, 40, 55);
    g.bezierCurveTo(45.5, 55, 46, 66, 50, 66);
    g.bezierCurveTo(54, 66, 54.5, 55, 60, 55);
    g.bezierCurveTo(65.5, 55, 66, 66, 69.5, 66);
    g.lineTo(73.5, 66);
    g.lineTo(73.5, 70.5);
    g.closePath();
    g.fillStyle = BLACK;
    g.fill();
  }),
  A7b: warning((g) => {
    // Speed hump: one long bump.
    g.beginPath();
    g.moveTo(25.5, 70.5);
    g.lineTo(25.5, 66);
    g.lineTo(31, 66);
    g.bezierCurveTo(37, 66, 38, 55.5, 45, 55.5);
    g.lineTo(55, 55.5);
    g.bezierCurveTo(62, 55.5, 63, 66, 69, 66);
    g.lineTo(74.5, 66);
    g.lineTo(74.5, 70.5);
    g.closePath();
    g.fillStyle = BLACK;
    g.fill();
  }),
  A11: warning((g) => {
    person(g, 51, 66.5, 35, WALK, BLACK);
    zebra(g, 27.5, 72.5, 67, 75.5, BLACK);
  }),
  A12b: warning((g) => {
    person(g, 58.5, 74.5, 33, RUN, BLACK, true);
    person(g, 41.5, 74.5, 24.5, RUN, BLACK);
  }),
  A25: warning((g) => tramSide(g, 32.5, 67.5, 52, 74.5, BLACK, WHITE)),
  A29: warning((g) => {
    // Gate: pointed pickets on two rails.
    for (let i = -2; i <= 2; i++) {
      const x = 50 + i * 7.4;
      fillPoly(g, [[x - 2.1, 75], [x - 2.1, 50], [x, 46.2], [x + 2.1, 50], [x + 2.1, 75]], BLACK);
    }
    rrect(g, 30.5, 54.5, 39, 3.6, 0, BLACK);
    rrect(g, 28.5, 66, 43, 3.6, 0, BLACK);
  }),
  A30: warning((g) => {
    // Steam locomotive heading left.
    rrect(g, 33.5, 54.5, 24, 12, 1.5, BLACK);             // boiler
    rrect(g, 55, 49, 11.5, 18, 1, BLACK);                 // cab
    rrect(g, 53.5, 47.6, 14.5, 2.4, 0.6, BLACK);          // cab roof
    rrect(g, 36, 47.5, 4.2, 8, 0, BLACK);                 // chimney
    rrect(g, 34.8, 46.6, 6.6, 2, 0, BLACK);
    rrect(g, 45, 51.6, 4.6, 4, 1.4, BLACK);               // dome
    rrect(g, 31, 65, 37, 3.4, 0, BLACK);                  // frame
    fillPoly(g, [[31, 62.5], [26.5, 69.6], [31, 69.6]], BLACK);
    for (const x of [37.5, 47, 60.5]) {
      disc(g, x, 70.6, 4.3, BLACK);
      disc(g, x, 70.6, 1.3, WHITE);
    }
    rrect(g, 58, 52.4, 5, 5, 0, WHITE);                   // cab window
    disc(g, 41.6, 43.4, 2.5, BLACK);                      // smoke
    disc(g, 46.6, 39.6, 3.1, BLACK);
    disc(g, 52.4, 36.2, 3.5, BLACK);
  }),
  A32a: [1.1, 0.7, 'cross', (g, H) => {
    // White cross with a red edge, arms 30° either side of level.
    const bar = (a, len, wid, color, r) => {
      g.save();
      g.translate(50, H / 2);
      g.rotate(a);
      rrect(g, -len / 2, -wid / 2, len, wid, r, color);
      g.restore();
    };
    const a = Math.PI / 6;
    bar(a, 108.5, 11.6, RED, 1.2);
    bar(-a, 108.5, 11.6, RED, 1.2);
    bar(a, 104.5, 7.6, WHITE, 0.4);
    bar(-a, 104.5, 7.6, WHITE, 0.4);
  }, { halo: RED }],

  // --- Road markings: seen from above, "up" is the direction of travel ---
  M_ARROW_S: [0.75, 5, 'marking', (g, H) => arrow(g, 50, H, 50, 0, 100 * 0.2 / 0.75, 100, 100 * 2 / 0.75, PAINT), { px: 256 }],
  M_ARROW_L: [1.25, 5, 'marking', (g, H) => roadTurn(g, H, 80), { px: 256 }],
  M_ARROW_R: [1.25, 5, 'marking', (g, H) => mirrored(g, () => roadTurn(g, H, 80)), { px: 256 }],
  M_ARROW_SL: [1.5, 5, 'marking', (g, H) => roadStraightAnd(g, H, 100 / 1.5), { px: 256 }],
  M_ARROW_SR: [1.5, 5, 'marking', (g, H) => mirrored(g, () => roadStraightAnd(g, H, 100 / 1.5)), { px: 256 }],
  M_ARROW_LR: [2, 5, 'marking', (g, H) => {
    const half = () => {
      rrect(g, 45, 0.9 * 50, 10, H - 0.9 * 50, 0, PAINT);
      rrect(g, 0.5 * 50, 0.9 * 50, 50 - 0.5 * 50, 0.6 * 50, 0, PAINT);
      fillPoly(g, [[1, 1.2 * 50], [0.56 * 50, 0], [0.56 * 50, 2.4 * 50]], PAINT);
    };
    half();
    mirrored(g, half);
  }, { px: 256 }],
  // Give-way line: four triangles pointing at the approaching driver, 0.5 m wide every 0.75 m.
  M_GIVEWAY: [3, 0.6, 'marking', (g, H) => {
    for (let i = 0; i < 4; i++) fillPoly(g, [[25 * i + 4.2, 0], [25 * i + 20.8, 0], [25 * i + 12.5, H]], PAINT);
  }, { px: 256 }],
  M_BUS: [1.8, 2.5, 'marking', (g, H) => text(g, 'BUS', 50, H / 2, 97, H - 3, PAINT, { stretch: true })],
  // The B 20a roundel as painted on the road: stretched lengthways, in the sign's own colours.
  M_30: [1.6, 3.2, 'marking', (g, H) => {
    g.save();
    g.scale(1, H / 100);
    disc(g, 50, 50, 50, PAINT);
    disc(g, 50, 50, 47.5, RED);
    disc(g, 50, 50, 36.5, PAINT);
    text(g, '30', 50, 50.5, 54, 36, BLACK, { squeeze: 0.88 });
    g.restore();
  }, { px: 192 }],
};

// Official codes for signs the brief filed under a neighbouring letter: same cell in the atlas.
const ALIASES = { IJ4d: 'IJ4c' };

export const SIGNS = {};
for (const [code, d] of Object.entries(DEFS)) SIGNS[code] = { w: d[0], h: d[1], shape: d[2] };
for (const [alias, code] of Object.entries(ALIASES)) SIGNS[alias] = SIGNS[code];

// ---------------------------------------------------------------------------------------------
// Atlas
// ---------------------------------------------------------------------------------------------

const ATLAS_WIDTH = 2048;
const GUTTER = 2;                 // transparent pixels on every side of a cell
const DEFAULT_PX = 176;           // long side of a sign in the atlas

// Shelf packing, tallest first. Pure arithmetic, so it also runs in Node.
export function signAtlasLayout() {
  const cells = Object.entries(DEFS).map(([code, d]) => {
    const long = (d[4] && d[4].px) || DEFAULT_PX, m = Math.max(d[0], d[1]);
    return { code, w: Math.max(8, Math.round(long * d[0] / m)), h: Math.max(8, Math.round(long * d[1] / m)) };
  });
  cells.sort((a, b) => b.h - a.h);
  let x = GUTTER, y = GUTTER, shelf = 0;
  const rects = {};
  for (const c of cells) {
    if (x + c.w + GUTTER > ATLAS_WIDTH) {
      x = GUTTER;
      y += shelf + 2 * GUTTER;
      shelf = 0;
    }
    rects[c.code] = { x, y, w: c.w, h: c.h };
    x += c.w + 2 * GUTTER;
    shelf = Math.max(shelf, c.h);
  }
  let height = 256;
  while (height < y + shelf + GUTTER) height *= 2;
  for (const [alias, code] of Object.entries(ALIASES)) rects[alias] = rects[code];
  return { width: ATLAS_WIDTH, height, rects };
}

export function createSignAtlas() {
  const { width, height, rects } = signAtlasLayout();
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d');

  for (const [code, d] of Object.entries(DEFS)) {
    const r = rects[code];
    g.save();
    g.translate(r.x, r.y);
    g.beginPath();
    g.rect(-1, -1, r.w + 2, r.h + 2);
    g.clip();
    // An almost invisible wash (alpha 2/255) in the sign's edge colour. Without it the texels
    // next to the sign are transparent black, and filtering pulls a dark fringe round every sign.
    g.globalAlpha = 2 / 255;
    g.fillStyle = (d[4] && d[4].halo) || (d[2] === 'marking' ? PAINT : WHITE);
    g.fillRect(-1, -1, r.w + 2, r.h + 2);
    g.globalAlpha = 1;
    g.scale(r.w / 100, r.w / 100);
    d[3](g, 100 * r.h / r.w);
    g.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;

  // v runs up, as three.js samples a canvas (flipY).
  const uv = (code) => {
    const r = rects[code];
    if (!r) return null;
    return [r.x / width, 1 - (r.y + r.h) / height, (r.x + r.w) / width, 1 - r.y / height];
  };
  return { texture, uv };
}
