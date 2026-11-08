// The hero car's driving line and arc-length lookups.
import { CatmullRomCurve3, Vector3 } from 'three';
import { LAYOUT } from './layout.js';

function buildCarPath(i) {
  let t = LAYOUT,
    e = [],
    n = (o, a) => e.push(new Vector3(o, 0, a));
  (n(560, 206),
    n(470, 206),
    n(400, 206),
    n(330, 206),
    n(290, 205),
    n(250, 201),
    n(215, 196.5),
    n(170, 194.4),
    n(80, 194.2),
    n(10, 194.2),
    n(-28, 193.2),
    n(-48, 190.4),
    n(-60, 189.2),
    n(-74, 189.4),
    n(-98, 191.6),
    n(-140, 194.2),
    n(-220, 194.4),
    n(-292, 194.6),
    n(-340, 197.4),
    n(-392, 201.2),
    n(-440, 204.6),
    n(-490, 205.8));
  let s = i.length;
  for (let o = 3; o <= 286; o += 3) {
    let a = i[o % s];
    n(a[0], a[1]);
  }
  (n(-64, 61),
    n(-61, 78),
    n(-56, 96),
    n(-44, 112),
    n(-26, 121),
    n(-8, 124.5),
    n(14, 126),
    n(48, 132),
    n(76, 146),
    n(86, 166),
    n(84, 182),
    n(74, 189.8),
    n(56, 192.4),
    n(34, 192.6),
    n(18, 192.6),
    n(4, 192.6));
  let r = new CatmullRomCurve3(e, !1, 'centripetal', 0.5);
  return ((r.arcLengthDivisions = 16e3), r);
}
function arcLengthNear(i, t, e) {
  let s = i.getLength(),
    r = 0,
    o = 1e9,
    a = new Vector3();
  for (let c = 0; c <= 4e3; c++) {
    i.getPointAt(c / 4e3, a);
    let l = (a.x - t) ** 2 + (a.z - e) ** 2;
    l < o && ((o = l), (r = c / 4e3));
  }
  return r * s;
}

export { arcLengthNear, buildCarPath };
