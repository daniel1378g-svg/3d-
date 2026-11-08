// Loads the hero car mesh and builds its materials, wheels and contact shadow.
import {
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  CylinderGeometry,
  Float32BufferAttribute,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
} from 'three';
import { buildWheel, wheelMaterials } from './wheel.js';
import { blobShadowTexture, roundedShadowTexture } from '../textures.js';

async function loadCarMesh(i, t) {
  let e = i.slice(0, i.lastIndexOf('/') + 1),
    n = await (await fetch(i)).json();
  t && t({ loaded: 1, total: 2 });
  let s = new BufferGeometry();
  (s.setAttribute('position', new Float32BufferAttribute(n.position, 3)),
    s.setAttribute('uv', new Float32BufferAttribute(n.uv, 2)),
    s.setIndex(n.index));
  let r = new TextureLoader(),
    o = async (g, _) => {
      let m = await r.loadAsync(e + g);
      return ((m.flipY = !1), (m.wrapS = m.wrapT = RepeatWrapping), _ && (m.colorSpace = SRGBColorSpace), m);
    },
    a = n.material,
    [c, l, h] = await Promise.all([o(a.map, !0), o(a.normalMap), o(a.metalRoughMap)]);
  t && t({ loaded: 2, total: 2 });
  let f = new MeshStandardMaterial({
    map: c,
    normalMap: l,
    roughnessMap: h,
    metalnessMap: h,
    metalness: a.metalness,
    roughness: a.roughness,
    flatShading: !0,
  });
  f.normalScale.set(1, -1);
  let d = new Mesh(s, f);
  d.name = n.name;
  let u = new Group();
  return (u.add(d), u);
}
function creasedNormals(i, t) {
  let e = i.index ? i.toNonIndexed() : i,
    n = e.attributes.position.array,
    s = n.length / 9,
    r = Math.cos(t),
    o = new Float32Array(s * 3),
    a = new Float32Array(s * 3),
    c = new Array(s * 3),
    l = new Map(),
    h = (d) => Math.round(n[d] * 1e4) + ',' + Math.round(n[d + 1] * 1e4) + ',' + Math.round(n[d + 2] * 1e4);
  for (let d = 0; d < s; d++) {
    let u = d * 9,
      g = n[u + 3] - n[u],
      _ = n[u + 4] - n[u + 1],
      m = n[u + 5] - n[u + 2],
      p = n[u + 6] - n[u],
      w = n[u + 7] - n[u + 1],
      v = n[u + 8] - n[u + 2],
      x = _ * v - m * w,
      S = m * p - g * v,
      T = g * w - _ * p,
      C = Math.hypot(x, S, T) || 1;
    ((o[d * 3] = x),
      (o[d * 3 + 1] = S),
      (o[d * 3 + 2] = T),
      (a[d * 3] = x / C),
      (a[d * 3 + 1] = S / C),
      (a[d * 3 + 2] = T / C));
    for (let U = 0; U < 3; U++) {
      let b = h(u + U * 3);
      c[d * 3 + U] = b;
      let M = l.get(b);
      (M || l.set(b, (M = [])), M.push(d));
    }
  }
  let f = new Float32Array(n.length);
  for (let d = 0; d < s; d++)
    for (let u = 0; u < 3; u++) {
      let g = 0,
        _ = 0,
        m = 0;
      for (let v of l.get(c[d * 3 + u]))
        a[d * 3] * a[v * 3] + a[d * 3 + 1] * a[v * 3 + 1] + a[d * 3 + 2] * a[v * 3 + 2] >= r &&
          ((g += o[v * 3]), (_ += o[v * 3 + 1]), (m += o[v * 3 + 2]));
      let p = Math.hypot(g, _, m) || 1,
        w = (d * 3 + u) * 3;
      ((f[w] = g / p), (f[w + 1] = _ / p), (f[w + 2] = m / p));
    }
  return (e.setAttribute('normal', new BufferAttribute(f, 3)), e);
}
async function buildHeroCar(i, t, { onProgress: e, quality: n = 'high' } = {}) {
  let s = /\.json$/.test(i) ? await loadCarMesh(i, e) : null,
    r = new Group();
  r.name = 'hero-car';
  let o = new Group();
  (r.add(o),
    s.traverse((u) => {
      if (u.isMesh) {
        ((u.castShadow = !0), (u.receiveShadow = !0));
        let g = u.material;
        (u.geometry.attributes.normal ||
          ((u.geometry = creasedNormals(u.geometry, MathUtils.degToRad(50))), (g.flatShading = !1)),
          n !== 'low' &&
            !g.isMeshPhysicalMaterial &&
            (g = u.material =
              new MeshPhysicalMaterial({
                map: g.map,
                normalMap: g.normalMap,
                normalScale: g.normalScale.clone(),
                roughnessMap: g.roughnessMap,
                metalnessMap: g.metalnessMap,
                metalness: g.metalness,
                roughness: g.roughness,
                color: g.color,
                clearcoat: 0.32,
                clearcoatRoughness: 0.14,
              })),
          (g.envMapIntensity = 1),
          g.normalScale && g.normalScale.set(0.6, g.normalScale.y < 0 ? -0.6 : 0.6),
          (g.needsUpdate = !0));
      }
    }),
    o.add(s));
  let a = wheelMaterials(),
    c = {};
  for (let u of ['FL', 'FR', 'RL', 'RR']) {
    let g = t[u],
      _ = u[0] === 'F',
      m = u[1] === 'R' ? 1 : -1,
      p = buildWheel({ r: g.r, w: 0.34, front: _, side: m, mats: a }),
      w = m * 0.86;
    (p.steer.position.set(g.x, g.r, w), r.add(p.steer));
    let v = new Mesh(
      new CylinderGeometry(g.r * 1.07, g.r * 1.07, 0.5, 40, 1, !0, Math.PI * 0.42, Math.PI * 1.16),
      a.well,
    );
    ((v.rotation.x = Math.PI / 2), (v.rotation.y = 0), v.position.set(g.x, g.y, m * 0.78), o.add(v));
    let x = new Mesh(new CircleGeometry(g.r * 1.07, 40, -Math.PI * 0.08, Math.PI * 1.16), a.well);
    (x.position.set(g.x, g.y, m * 0.53), o.add(x), (c[u] = p));
  }
  let l = new MeshBasicMaterial({
      map: roundedShadowTexture(256, 128, { alpha: 0.8 }),
      transparent: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
    h = new Mesh(new PlaneGeometry(5.5, 2.75), l);
  ((h.rotation.x = -Math.PI / 2),
    h.position.set(0, 0.055, 0),
    (h.renderOrder = 1),
    (h.userData.noMask = !0),
    r.add(h));
  let f = new MeshBasicMaterial({
    map: blobShadowTexture(),
    transparent: !0,
    depthWrite: !1,
    opacity: 0.9,
    polygonOffset: !0,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
  });
  for (let u in c) {
    let g = new Mesh(new PlaneGeometry(0.95, 0.62), f);
    ((g.rotation.x = -Math.PI / 2),
      g.position.set(c[u].steer.position.x, 0.06, c[u].steer.position.z),
      (g.renderOrder = 2),
      (g.userData.noMask = !0),
      r.add(g));
  }
  return {
    root: r,
    chassis: o,
    body: s,
    wheels: c,
    pose({ dist: u = 0, steer: g = 0, pitch: _ = 0, roll: m = 0, heave: p = 0, speed: w = 0 } = {}) {
      ((a.blur.opacity = Math.min(0.94, Math.max(0, (w - 5) / 16))),
        (a.blur.visible = a.blur.opacity > 0.01));
      for (let v in c) {
        let x = c[v];
        ((x.spin.rotation.z = -u / x.r), v[0] === 'F' && (x.steer.rotation.y = g));
      }
      (o.rotation.set(m, 0, _), (o.position.y = p));
    },
  };
}

export { buildHeroCar };
