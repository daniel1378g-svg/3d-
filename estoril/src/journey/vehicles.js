// Procedural paddock cars (classic, GT, prototype).
import {
  BoxGeometry,
  BufferGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
} from 'three';
import { contactShadowMaterial } from './people.js';
import { monotoneCurve } from './util/math.js';

function loftBody(i, t, e, n = 56, s = 36) {
  let r = [],
    o = [];
  for (let c = 0; c <= n; c++) {
    let l = i + ((t - i) * c) / n,
      h = e(l),
      f = (h.top + h.bot) / 2,
      d = Math.max(0.001, (h.top - h.bot) / 2);
    for (let u = 0; u <= s; u++) {
      let g = -Math.PI / 2 + (Math.PI * 2 * u) / s,
        _ = Math.cos(g),
        m = Math.sin(g),
        p = m >= 0,
        w = p ? f + d * Math.pow(Math.abs(m), 2 / h.nUp) : f - d * Math.pow(Math.abs(m), 2 / h.nLo),
        v =
          h.hw *
          Math.sign(_) *
          Math.pow(Math.abs(_), 2 / (p ? h.nUp : h.nLo)) *
          (p ? 1 - (h.tumble || 0) * m * m : 1);
      r.push(l, w, v);
    }
  }
  for (let c = 0; c < n; c++)
    for (let l = 0; l < s; l++) {
      let h = c * (s + 1) + l,
        f = h + s + 1;
      o.push(h, f, h + 1, h + 1, f, f + 1);
    }
  let a = new BufferGeometry();
  return (
    a.setAttribute('position', new Float32BufferAttribute(r, 3)),
    a.setIndex(o),
    a.computeVertexNormals(),
    a
  );
}
var VEHICLE_SPECS = {
    classic: {
      L: 4.25,
      wb: 2.4,
      R: 0.31,
      track: 1.34,
      tyreW: 0.19,
      chrome: !0,
      top: [
        [-2.13, 0.56],
        [-2.05, 0.7],
        [-1.7, 0.8],
        [-1, 0.84],
        [-0.3, 0.86],
        [0.2, 0.84],
        [0.9, 0.8],
        [1.6, 0.74],
        [2, 0.63],
        [2.13, 0.5],
      ],
      sill: [
        [-2.13, 0.44],
        [-2, 0.3],
        [-1.6, 0.22],
        [1.6, 0.22],
        [2, 0.3],
        [2.13, 0.42],
      ],
      hw: [
        [-2.13, 0.5],
        [-2, 0.74],
        [-1.6, 0.81],
        [-1.2, 0.83],
        [0, 0.79],
        [1.2, 0.83],
        [1.7, 0.8],
        [2.05, 0.66],
        [2.13, 0.44],
      ],
      nUp: 2.4,
      nLo: 5,
      tumble: 0.1,
      cabin: {
        x0: -1.05,
        x1: 0.6,
        roof: [
          [-1.05, 0.84],
          [-0.62, 1.1],
          [-0.15, 1.19],
          [0.2, 1.17],
          [0.6, 0.86],
        ],
        belt: 0.8,
        hw: [
          [-1.05, 0.6],
          [-0.3, 0.67],
          [0.3, 0.67],
          [0.6, 0.62],
        ],
      },
    },
    gt: {
      L: 4.6,
      wb: 2.7,
      R: 0.34,
      track: 1.62,
      tyreW: 0.3,
      wing: [-2.02, 1.3, 1.8],
      top: [
        [-2.3, 0.78],
        [-2.1, 0.88],
        [-1.5, 0.93],
        [-0.8, 0.9],
        [0, 0.86],
        [0.8, 0.8],
        [1.5, 0.7],
        [2, 0.57],
        [2.3, 0.38],
      ],
      sill: [
        [-2.3, 0.5],
        [-2.15, 0.3],
        [-1.8, 0.13],
        [1.8, 0.13],
        [2.2, 0.15],
        [2.3, 0.2],
      ],
      hw: [
        [-2.3, 0.8],
        [-2, 0.97],
        [-1.35, 1],
        [-0.5, 0.9],
        [0.5, 0.88],
        [1.35, 0.99],
        [2, 0.93],
        [2.3, 0.7],
      ],
      nUp: 3,
      nLo: 6,
      tumble: 0.16,
      cabin: {
        x0: -1.25,
        x1: 0.78,
        roof: [
          [-1.25, 0.9],
          [-0.7, 1.19],
          [-0.1, 1.24],
          [0.28, 1.2],
          [0.78, 0.84],
        ],
        belt: 0.84,
        hw: [
          [-1.25, 0.6],
          [-0.4, 0.68],
          [0.3, 0.66],
          [0.78, 0.58],
        ],
      },
    },
    proto: {
      L: 4.75,
      wb: 2.9,
      R: 0.35,
      track: 1.64,
      tyreW: 0.32,
      wing: [-2.2, 1.02, 1.9],
      fin: !0,
      top: [
        [-2.37, 0.8],
        [-2.2, 0.92],
        [-1.7, 0.95],
        [-1.2, 0.9],
        [-0.6, 0.82],
        [0, 0.74],
        [0.8, 0.7],
        [1.6, 0.64],
        [2.1, 0.5],
        [2.37, 0.3],
      ],
      sill: [
        [-2.37, 0.5],
        [-2.2, 0.25],
        [-1.8, 0.1],
        [1.9, 0.1],
        [2.37, 0.15],
      ],
      hw: [
        [-2.37, 0.9],
        [-2.1, 1],
        [-1.45, 1],
        [-0.8, 0.9],
        [0, 0.93],
        [0.8, 0.93],
        [1.45, 1],
        [2.1, 0.95],
        [2.37, 0.74],
      ],
      nUp: 3.2,
      nLo: 6,
      tumble: 0.2,
      cabin: {
        x0: -1.05,
        x1: 0.8,
        roof: [
          [-1.05, 0.8],
          [-0.5, 1.08],
          [0, 1.13],
          [0.4, 1.07],
          [0.8, 0.72],
        ],
        belt: 0.74,
        hw: [
          [-1.05, 0.38],
          [-0.3, 0.5],
          [0.3, 0.5],
          [0.8, 0.36],
        ],
      },
    },
  },
  geometryCache = {},
  cachedGeometry = (i, t) => geometryCache[i] || (geometryCache[i] = t());
function buildVehicle(i, t) {
  let e = VEHICLE_SPECS[i],
    n = new Group(),
    s = new MeshPhysicalMaterial({
      color: t,
      roughness: 0.32,
      metalness: e.chrome ? 0.2 : 0.35,
      clearcoat: 0.8,
      clearcoatRoughness: 0.14,
    }),
    r = cachedGeometry(
      'glass',
      () =>
        new MeshStandardMaterial({ color: 2766400, roughness: 0.05, metalness: 0.85, envMapIntensity: 1.6 }),
    ),
    o = cachedGeometry(
      'dark',
      () => new MeshStandardMaterial({ color: 789775, roughness: 0.8, side: DoubleSide }),
    ),
    a = cachedGeometry(
      'carbon',
      () => new MeshStandardMaterial({ color: 1711135, roughness: 0.45, metalness: 0.4 }),
    ),
    c = cachedGeometry(
      'chrome',
      () => new MeshStandardMaterial({ color: 14804456, roughness: 0.14, metalness: 1 }),
    ),
    l = cachedGeometry(
      'lamp',
      () =>
        new MeshStandardMaterial({
          color: 16184038,
          roughness: 0.15,
          metalness: 0.2,
          emissive: 6972501,
          emissiveIntensity: 0.3,
        }),
    ),
    h = cachedGeometry('tyre', () => new MeshStandardMaterial({ color: 1513498, roughness: 0.92 })),
    f = e.chrome
      ? c
      : cachedGeometry(
          'rim',
          () => new MeshStandardMaterial({ color: 2764081, roughness: 0.32, metalness: 0.85 }),
        ),
    d = [e.wb / 2, -e.wb / 2],
    u = e.R + 0.07,
    g = monotoneCurve(e.top),
    _ = monotoneCurve(e.sill),
    m = monotoneCurve(e.hw),
    p = (R) => {
      let F = -1;
      for (let D of d) {
        let k = Math.abs(R - D);
        k < u && (F = Math.max(F, e.R + Math.sqrt(u * u - k * k) * 0.97));
      }
      return F;
    },
    w = loftBody(
      e.top[0][0],
      e.top[e.top.length - 1][0],
      (R) => ({
        top: g(R),
        bot: Math.min(g(R) - 0.08, Math.max(_(R), p(R))),
        hw: m(R),
        nUp: e.nUp,
        nLo: e.nLo,
        tumble: e.tumble,
      }),
      90,
      40,
    ),
    v = new Mesh(w, s);
  ((v.castShadow = !0), (v.receiveShadow = !0), n.add(v));
  let x = e.cabin,
    S = monotoneCurve(x.roof),
    T = monotoneCurve(x.hw),
    C = loftBody(
      x.x0,
      x.x1,
      (R) => ({ top: S(R), bot: x.belt - 0.03, hw: T(R), nUp: 2.3, nLo: 8, tumble: 0.1 }),
      40,
      32,
    ),
    U = new Mesh(C, r);
  ((U.castShadow = !0), n.add(U));
  let b = x.x0 + (x.x1 - x.x0) * 0.17,
    M = x.x0 + (x.x1 - x.x0) * 0.76,
    N = loftBody(
      b,
      M,
      (R) => {
        let F = Math.min(1, Math.min(R - b, M - R) / 0.12);
        return {
          top: S(R) + 0.012,
          bot: S(R) - 0.03 - 0.05 * F,
          hw: T(R) * (0.84 + 0.14 * F),
          nUp: 2.6,
          nLo: 3,
          tumble: 0.1,
        };
      },
      24,
      24,
    ),
    Z = new Mesh(N, s);
  ((Z.castShadow = !0), n.add(Z));
  for (let R of d) {
    let F = new Mesh(
      new CylinderGeometry(u * 0.98, u * 0.98, e.track + e.tyreW - 0.05, 24, 1, !0, Math.PI * 0.5, Math.PI),
      o,
    );
    ((F.rotation.x = Math.PI / 2), F.position.set(R, e.R, 0), n.add(F));
    for (let D of [-1, 1]) {
      let k = new Group();
      (k.position.set(R, e.R, (D * e.track) / 2), n.add(k));
      let Y = new Mesh(new CylinderGeometry(e.R, e.R, e.tyreW, 28), h);
      ((Y.rotation.x = Math.PI / 2), (Y.castShadow = !0), k.add(Y));
      let q = new Mesh(new CylinderGeometry(e.R * 0.68, e.R * 0.68, e.tyreW + 0.012, 24), f);
      ((q.rotation.x = Math.PI / 2), k.add(q));
      let rt = new Mesh(new CylinderGeometry(e.R * 0.22, e.R * 0.26, e.tyreW + 0.03, 16), e.chrome ? o : c);
      ((rt.rotation.x = Math.PI / 2), k.add(rt));
    }
  }
  let G = e.top[e.top.length - 1][0],
    J = e.top[0][0];
  if (e.chrome) {
    for (let [F, D, k] of [
      [G - 0.02, 0.4, 1.36],
      [J + 0.02, 0.44, 1.3],
    ]) {
      let Y = new Mesh(new CapsuleGeometry(0.045, k, 4, 10), c);
      ((Y.rotation.x = Math.PI / 2), Y.position.set(F, D, 0), (Y.castShadow = !0), n.add(Y));
    }
    for (let F of [-1, 1]) {
      let D = new Mesh(new SphereGeometry(0.085, 18, 12, 0, Math.PI), l);
      ((D.rotation.y = Math.PI / 2), D.position.set(G - 0.14, 0.6, F * 0.52), n.add(D));
      let k = new Mesh(new TorusGeometry(0.088, 0.012, 6, 22), c);
      ((k.rotation.y = Math.PI / 2), k.position.set(G - 0.13, 0.6, F * 0.52), n.add(k));
    }
    let R = new Mesh(new CapsuleGeometry(0.07, 0.36, 4, 10), o);
    ((R.rotation.x = Math.PI / 2), R.position.set(G - 0.03, 0.5, 0), n.add(R));
  } else {
    let R = new Mesh(new BoxGeometry(0.5, 0.025, 1.9), a);
    (R.position.set(G - 0.22, 0.1, 0), n.add(R));
    for (let q of [-1, 1]) {
      let rt = new Mesh(new BoxGeometry(0.18, 0.035, 0.36), l);
      (rt.position.set(G - 0.32, g(G - 0.32) - 0.04, q * 0.62), (rt.rotation.z = -0.35), n.add(rt));
    }
    let [F, D, k] = e.wing,
      Y = new Mesh(new BoxGeometry(0.36, 0.03, k), a);
    (Y.position.set(F, D, 0), (Y.rotation.z = 0.08), (Y.castShadow = !0), n.add(Y));
    for (let q of [-1, 1]) {
      let rt = new Mesh(new BoxGeometry(0.44, 0.22, 0.015), a);
      (rt.position.set(F, D - 0.05, (q * k) / 2), n.add(rt));
      let ft = new Mesh(new BoxGeometry(0.05, D - g(F) + 0.05, 0.02), a);
      (ft.position.set(F + 0.06, (D + g(F)) / 2, q * 0.38), n.add(ft));
    }
    if (e.fin) {
      let q = new Mesh(new BoxGeometry(1.1, 0.26, 0.018), s);
      (q.position.set(-1.55, g(-1.55) + 0.11, 0), n.add(q));
    }
  }
  let I = new Mesh(new PlaneGeometry(e.L * 1.2, (e.track + 0.7) * 1.25), contactShadowMaterial());
  return ((I.rotation.x = -Math.PI / 2), (I.position.y = 0.055), (I.renderOrder = 1), n.add(I), n);
}
function buildPaddockCar(i = 'gt', t = 16118766) {
  return buildVehicle(VEHICLE_SPECS[i] ? i : 'gt', t);
}

export { buildPaddockCar };
