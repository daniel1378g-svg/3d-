// Hero-car wheels: tyre, rim, brake disc and caliper.
import {
  BoxGeometry,
  CanvasTexture,
  CircleGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Path,
  SRGBColorSpace,
  Shape,
  SplineCurve,
  Vector2,
} from 'three';

var ACCENT_RED = 15282981;
function tyreGeometry(i, t, e) {
  let n = [],
    r = (l) => l,
    o = [
      [e + 0.01, -t / 2 + 0.018],
      [e + 0.05, -t / 2 - 0.004],
      [i - 0.09, -t / 2 - 0.012],
      [i - 0.035, -t / 2 - 0.006],
      [i - 0.008, -t / 2 + 0.02],
      [i, -t / 2 + 0.055],
      [i + 0.002, 0],
      [i, t / 2 - 0.055],
      [i - 0.008, t / 2 - 0.02],
      [i - 0.035, t / 2 + 0.006],
      [i - 0.09, t / 2 + 0.012],
      [e + 0.05, t / 2 + 0.004],
      [e + 0.01, t / 2 - 0.018],
    ],
    a = new SplineCurve(o.map(([l, h]) => new Vector2(l, h)));
  for (let l of a.getPoints(60)) n.push(new Vector2(l.x, l.y));
  let c = new LatheGeometry(n, 64);
  return (c.rotateX(Math.PI / 2), c);
}
function rimShape(i, t = 10) {
  let e = new Shape();
  e.absarc(0, 0, i, 0, Math.PI * 2, !1);
  let n = i * 0.86,
    s = i * 0.32,
    r = (Math.PI * 2) / t;
  for (let a = 0; a < t; a++) {
    let c = a * r + r * 0.17,
      l = (a + 1) * r - r * 0.17,
      h = new Path();
    (h.moveTo(Math.cos(c) * s * 1.25, Math.sin(c) * s * 1.25),
      h.absarc(0, 0, n, c + 0.04, l - 0.04, !1),
      h.lineTo(Math.cos(l) * s * 1.25, Math.sin(l) * s * 1.25),
      h.closePath(),
      e.holes.push(h));
  }
  let o = new ExtrudeGeometry(e, {
    depth: 0.035,
    bevelEnabled: !0,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 40,
  });
  return (o.translate(0, 0, -0.035), o);
}
function buildWheel({ r: i = 0.41, w: t = 0.33, front: e = !1, side: n = 1, mats: s }) {
  let r = i * 0.69,
    o = new Group(),
    a = new Group();
  o.add(a);
  let c = n,
    l = new Mesh(tyreGeometry(i, t, r), s.rubber);
  ((l.castShadow = !0), a.add(l));
  let h = new Mesh(rimShape(r * 0.985), s.rim);
  ((h.castShadow = !0), (h.position.z = c * (t / 2 - 0.045)), c < 0 && (h.rotation.y = Math.PI), a.add(h));
  let f = new Mesh(new CylinderGeometry(r * 0.99, r * 0.99, t * 0.9, 40, 1, !0), s.barrel);
  ((f.rotation.x = Math.PI / 2), a.add(f));
  let d = new Mesh(new CylinderGeometry(0.05, 0.058, 0.06, 6), s.nut);
  ((d.rotation.x = Math.PI / 2), (d.position.z = c * (t / 2 - 0.02)), a.add(d));
  let u = new Mesh(new CylinderGeometry(r * 0.82, r * 0.82, 0.032, 48), s.disc);
  ((u.rotation.x = Math.PI / 2), (u.position.z = c * (t / 2 - 0.13)), a.add(u));
  let g = new Mesh(new CircleGeometry(r * 0.985, 48), s.blur);
  ((g.position.z = c * (t / 2 - 0.028)), c < 0 && (g.rotation.y = Math.PI), (g.renderOrder = 3), o.add(g));
  let _ = new Mesh(new CircleGeometry(r * 0.99, 40), s.dark);
  ((_.position.z = c * (t / 2 - 0.2)), c < 0 && (_.rotation.y = Math.PI), a.add(_));
  let m = new Mesh(new BoxGeometry(0.2, 0.11, 0.07, 2, 2, 2), s.caliper),
    p = e ? 0.55 : Math.PI - 0.55;
  return (
    m.position.set(Math.cos(p) * r * 0.66, Math.sin(p) * r * 0.66, c * (t / 2 - 0.105)),
    (m.rotation.z = p - Math.PI / 2),
    o.add(m),
    { steer: o, spin: a, r: i, blur: g }
  );
}
function discTexture() {
  let i = document.createElement('canvas');
  i.width = i.height = 256;
  let t = i.getContext('2d'),
    e = 128,
    n = t.createRadialGradient(e, e, 0, e, e, e);
  (n.addColorStop(0, 'rgba(150,156,162,1)'),
    n.addColorStop(0.18, 'rgba(70,74,79,.95)'),
    n.addColorStop(0.32, 'rgba(48,51,55,.75)'),
    n.addColorStop(0.7, 'rgba(58,61,66,.62)'),
    n.addColorStop(0.86, 'rgba(92,96,101,.8)'),
    n.addColorStop(0.95, 'rgba(36,38,41,.95)'),
    n.addColorStop(1, 'rgba(20,21,23,1)'),
    (t.fillStyle = n),
    t.beginPath(),
    t.arc(e, e, e, 0, Math.PI * 2),
    t.fill());
  let s = new CanvasTexture(i);
  return ((s.colorSpace = SRGBColorSpace), s);
}
function wheelMaterials() {
  return {
    rubber: new MeshStandardMaterial({ color: 1513498, roughness: 0.93, metalness: 0 }),
    rim: new MeshStandardMaterial({ color: 2369066, roughness: 0.32, metalness: 0.85 }),
    barrel: new MeshStandardMaterial({ color: 1052947, roughness: 0.6, metalness: 0.5, side: DoubleSide }),
    nut: new MeshStandardMaterial({ color: 10200234, roughness: 0.3, metalness: 1 }),
    disc: new MeshStandardMaterial({ color: 6053990, roughness: 0.45, metalness: 0.9 }),
    caliper: new MeshStandardMaterial({ color: ACCENT_RED, roughness: 0.45, metalness: 0.15 }),
    dark: new MeshBasicMaterial({ color: 328966 }),
    well: new MeshBasicMaterial({ color: 394759, side: DoubleSide }),
    blur: new MeshStandardMaterial({
      map: discTexture(),
      transparent: !0,
      opacity: 0,
      roughness: 0.35,
      metalness: 0.75,
      depthWrite: !1,
    }),
  };
}

export { buildWheel, wheelMaterials };
