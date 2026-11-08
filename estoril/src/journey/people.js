// Low-poly pit crew and visitors.
import {
  BoxGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
} from 'three';
import { roundedShadowTexture } from './textures.js';

var contactShadowMat = null,
  contactShadowMaterial = () =>
    contactShadowMat ||
    (contactShadowMat = new MeshBasicMaterial({
      map: roundedShadowTexture(256, 128, { alpha: 0.75 }),
      transparent: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    })),
  capsule = (i, t, e) => {
    let n = new Mesh(new CapsuleGeometry(i, t, 6, 12), e);
    return ((n.castShadow = !0), n);
  };
function buildPerson({
  suit: i = 15282981,
  trim: t = 1842721,
  skin: e = 13081468,
  helmet: n = !1,
  pose: s = 'stand',
} = {}) {
  let r = new Group(),
    o = new MeshStandardMaterial({ color: i, roughness: 0.7 }),
    a = new MeshStandardMaterial({ color: t, roughness: 0.8 }),
    c = new MeshStandardMaterial({ color: e, roughness: 0.8 }),
    l = new Group();
  r.add(l);
  let h = capsule(0.17, 0.42, o);
  ((h.position.y = 0.32), l.add(h));
  let f = new Mesh(new CylinderGeometry(0.175, 0.175, 0.07, 16), a);
  ((f.position.y = 0.06), l.add(f));
  let d = new Group();
  if (((d.position.y = 0.78), l.add(d), n)) {
    let v = new Mesh(
      new SphereGeometry(0.15, 20, 16),
      new MeshStandardMaterial({ color: 16118766, roughness: 0.25, metalness: 0.1 }),
    );
    ((v.castShadow = !0), d.add(v));
    let x = new Mesh(
      new SphereGeometry(0.151, 20, 10, -0.9, 1.8, 1.25, 0.5),
      new MeshStandardMaterial({ color: 1842721, roughness: 0.1, metalness: 0.6 }),
    );
    d.add(x);
    let S = new Mesh(
      new TorusGeometry(0.12, 0.012, 6, 24, Math.PI),
      new MeshStandardMaterial({ color: 15282981, roughness: 0.5 }),
    );
    ((S.rotation.y = Math.PI / 2), (S.position.y = 0.03), d.add(S));
  } else {
    let v = new Mesh(new SphereGeometry(0.12, 18, 14), c);
    ((v.castShadow = !0), d.add(v));
    let x = new Mesh(new SphereGeometry(0.125, 18, 8, 0, Math.PI * 2, 0, 1.3), a);
    ((x.position.y = 0.02), d.add(x));
    let S = new Mesh(new CylinderGeometry(0.08, 0.08, 0.015, 16, 1, !1, -1.2, 2.4), a);
    (S.position.set(0.08, 0.02, 0), d.add(S));
  }
  let u = (v, x, S) => {
      let T = new Group(),
        C = capsule(v, x, S);
      return ((C.position.y = -x / 2 - v), T.add(C), T);
    },
    g = u(0.055, 0.5, o),
    _ = u(0.055, 0.5, o);
  (g.position.set(0, 0.58, 0.22), _.position.set(0, 0.58, -0.22), l.add(g, _));
  for (let v of [g, _]) {
    let x = new Mesh(new SphereGeometry(0.05, 10, 8), c);
    ((x.position.y = -0.68), v.add(x));
  }
  let m = u(0.075, 0.7, o),
    p = u(0.075, 0.7, o);
  (m.position.set(0, 0, 0.1), p.position.set(0, 0, -0.1), l.add(m, p));
  for (let v of [m, p]) {
    let x = new Mesh(new BoxGeometry(0.24, 0.08, 0.1), a);
    (x.position.set(0.05, -0.9, 0), v.add(x));
  }
  if (((l.position.y = 0.97), s === 'kneel'))
    ((l.position.y = 0.55),
      (l.rotation.z = -0.25),
      (m.rotation.z = 1.45),
      (p.rotation.z = 0.2),
      (p.position.x = -0.05),
      (g.rotation.z = 1.1),
      (_.rotation.z = 0.9),
      (_.rotation.x = 0.2));
  else if (s === 'helmet')
    ((g.rotation.z = 2.3), (_.rotation.z = 2.3), (g.rotation.x = -0.35), (_.rotation.x = 0.35));
  else if (s === 'carryHelmet') {
    ((_.rotation.z = 0.55), (_.rotation.x = 0.12), (g.rotation.x = -0.08));
    let v = new Group(),
      x = new Mesh(
        new SphereGeometry(0.15, 20, 16),
        new MeshStandardMaterial({ color: 16118766, roughness: 0.25, metalness: 0.1 }),
      );
    ((x.castShadow = !0), v.add(x));
    let S = new Mesh(
      new SphereGeometry(0.152, 20, 10, -0.9, 1.8, 1.25, 0.5),
      new MeshStandardMaterial({ color: 1842721, roughness: 0.1, metalness: 0.6 }),
    );
    v.add(S);
    let T = new Mesh(
      new TorusGeometry(0.12, 0.012, 6, 24, Math.PI),
      new MeshStandardMaterial({ color: 15282981, roughness: 0.5 }),
    );
    ((T.rotation.y = Math.PI / 2),
      (T.position.y = 0.03),
      v.add(T),
      v.position.set(0.1, -0.78, 0),
      (v.rotation.z = -0.5),
      _.add(v));
  } else ((g.rotation.x = -0.1), (_.rotation.x = 0.1));
  let w = new Mesh(new PlaneGeometry(1.1, 1.1), contactShadowMaterial());
  return (
    (w.rotation.x = -Math.PI / 2),
    (w.position.y = 0.055),
    (w.renderOrder = 1),
    r.add(w),
    (r.userData = { hip: l, armL: g, armR: _, head: d }),
    r
  );
}

export { buildPerson, contactShadowMaterial };
