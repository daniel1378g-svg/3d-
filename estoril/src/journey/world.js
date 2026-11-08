// Builds the circuit world: terrain, hills, track surfaces, pits, grandstand, paddock and vegetation.
import {
  BoxGeometry,
  CanvasTexture,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  Euler,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  Quaternion,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { LAYOUT } from './layout.js';
import {
  aoFadeTexture,
  asphaltTexture,
  barrierTexture,
  blobShadowTexture,
  glazingTexture,
  grassTexture,
  grassTuftTexture,
  gravelTexture,
  kerbTexture,
  puffTexture,
  roundedShadowTexture,
  shutterTexture,
} from './textures.js';
import { buildBarrierWall, buildStrip } from './track/strip.js';
import { clamp, lerp } from './util/math.js';
import { fbm2 } from './util/noise.js';
import { createRng } from './util/rng.js';

function buildWorld(i, { quality: t = 'high', renderer: e } = {}) {
  let n = t === 'high' ? 1 : t === 'mid' ? 0.6 : 0.35,
    s = new Group();
  s.name = 'world';
  let r = i.map(([I, R]) => new Vector2(I, R)),
    o = createRng(42),
    a = [],
    c = {
      asphalt: asphaltTexture(),
      grass: grassTexture(),
      gravel: gravelTexture(),
      kerb: kerbTexture(),
      barrier: barrierTexture(),
      blob: blobShadowTexture(),
      ao: aoFadeTexture(),
      shutter: shutterTexture(),
    };
  c.grass.repeat.set(1, 1);
  let l = {
    ground: new MeshStandardMaterial({ map: c.grass, roughness: 1, color: 16777215, vertexColors: !0 }),
    asphalt: new MeshStandardMaterial({ map: c.asphalt, roughness: 0.8, metalness: 0, color: 10133156 }),
    pitAsphalt: new MeshStandardMaterial({ map: c.asphalt, roughness: 0.86, color: 12567496 }),
    rubber: new MeshBasicMaterial({
      color: 723981,
      transparent: !0,
      opacity: 0.16,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    }),
    ao: new MeshBasicMaterial({
      map: c.ao,
      transparent: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    }),
    contact: new MeshBasicMaterial({
      map: roundedShadowTexture(128, 128, { hx: 0.34, hy: 0.34, rr: 0.2, fade: 0.15, alpha: 0.6 }),
      transparent: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    }),
    line: new MeshStandardMaterial({ color: 15921644, roughness: 0.7 }),
    kerb: new MeshStandardMaterial({ map: c.kerb, roughness: 0.6 }),
    runoff: new MeshStandardMaterial({ color: 4165490, roughness: 0.85 }),
    gravel: new MeshStandardMaterial({ map: c.gravel, roughness: 1, color: 15919832 }),
    barrier: new MeshStandardMaterial({ map: c.barrier, roughness: 0.8 }),
    concrete: new MeshStandardMaterial({ color: 14276560, roughness: 0.92 }),
    concreteDark: new MeshStandardMaterial({ color: 10988978, roughness: 0.9 }),
    white: new MeshStandardMaterial({ color: 15131870, roughness: 0.8 }),
    steel: new MeshStandardMaterial({ color: 10200234, roughness: 0.45, metalness: 0.6 }),
    steelDark: new MeshStandardMaterial({ color: 6120555, roughness: 0.5, metalness: 0.55 }),
    glass: new MeshStandardMaterial({
      color: 6256260,
      roughness: 0.12,
      metalness: 0.9,
      envMapIntensity: 1.2,
    }),
    shutter: new MeshStandardMaterial({ map: c.shutter, color: 16777215, roughness: 0.5, metalness: 0.3 }),
    seat: new MeshStandardMaterial({ color: 5144467, roughness: 0.7 }),
    roofW: new MeshStandardMaterial({ color: 15855593, roughness: 0.6, side: DoubleSide }),
    red: new MeshStandardMaterial({ color: 15282981, roughness: 0.55 }),
    trunk: new MeshStandardMaterial({ color: 7034695, roughness: 1 }),
    pine: new MeshStandardMaterial({ color: 16777215, roughness: 1 }),
    oak: new MeshStandardMaterial({ color: 16777215, roughness: 1 }),
    shrub: new MeshStandardMaterial({ color: 16777215, roughness: 1 }),
    hill: new MeshStandardMaterial({ color: 7043676, roughness: 1, flatShading: !1 }),
    interior: new MeshStandardMaterial({ color: 14276561, roughness: 0.8 }),
    floor: new MeshStandardMaterial({ color: 9343640, roughness: 0.55, metalness: 0.1 }),
    blob: new MeshBasicMaterial({ map: c.blob, transparent: !0, depthWrite: !1 }),
  };
  l.asphalt.map.repeat.set(1, 1);
  let h = (I) => {
      let R = glazingTexture();
      return (
        R.repeat.set(I, 1),
        new MeshStandardMaterial({ map: R, roughness: 0.18, metalness: 0.55, envMapIntensity: 1.1 })
      );
    },
    f = (I, R, F, D, k, Y = 1, q = 0.06, rt = s) => {
      let ft = Math.hypot(F - I, D - R),
        z = new PlaneGeometry(ft, k);
      z.rotateX(-Math.PI / 2);
      let $ = new Mesh(z, l.ao),
        it = Math.atan2(D - R, F - I),
        j = -Math.sin(it) * Y,
        yt = Math.cos(it) * Y;
      return (
        $.position.set((I + F) / 2 + (j * k) / 2, q, (R + D) / 2 + (yt * k) / 2),
        ($.rotation.y = -it + (Y > 0 ? 0 : Math.PI)),
        ($.renderOrder = 1),
        rt.add($),
        $
      );
    },
    d = (I, R, F, D, k = 0, Y = s) => {
      let q = new Mesh(new PlaneGeometry(F, D), l.contact);
      return (
        (q.rotation.x = -Math.PI / 2),
        (q.rotation.z = k),
        q.position.set(I, 0.055, R),
        (q.renderOrder = 1),
        Y.add(q),
        q
      );
    };
  {
    let I = new PlaneGeometry(4200, 3e3, 120, 90);
    I.rotateX(-Math.PI / 2);
    let R = I.attributes.position,
      F = I.attributes.uv;
    for (let z = 0; z < R.count; z++) {
      let $ = R.getX(z),
        it = R.getZ(z),
        j = Math.hypot($ / 1.15, it * 1.25),
        yt = clamp((j - 720) / 900, 0, 1);
      (R.setY(z, yt * yt * (40 + fbm2($ / 420, it / 420, 4) * 90) - 0.05), F.setXY(z, $ / 9, it / 9));
    }
    I.computeVertexNormals();
    let D = [],
      k = new Color(8161886),
      Y = new Color(10986611),
      q = new Color(5662282),
      rt = new Color();
    for (let z = 0; z < R.count; z++) {
      let $ = R.getX(z),
        it = R.getZ(z),
        j = fbm2($ / 260, it / 260, 4),
        yt = fbm2($ / 70 + 9, it / 70, 3);
      (rt
        .copy(k)
        .lerp(Y, clamp(j * 1.4 + 0.25, 0, 1) * 0.75)
        .lerp(q, clamp(-yt * 1.6, 0, 1) * 0.6),
        D.push(rt.r, rt.g, rt.b));
    }
    I.setAttribute('color', new Float32BufferAttribute(D, 3));
    let ft = new Mesh(I, l.ground);
    ((ft.receiveShadow = !0), (ft.name = 'ground'), s.add(ft));
  }
  {
    let I = new Group();
    for (let R = 0; R < 3; R++) {
      let F = new CylinderGeometry(2300 + R * 350, 2300 + R * 350, 1, 220, 1, !0),
        D = F.attributes.position;
      for (let q = 0; q < D.count; q++) {
        let rt = D.getX(q),
          ft = D.getZ(q);
        if (D.getY(q) > 0) {
          let $ = Math.atan2(ft, rt),
            it = 70 + fbm2($ * 3 + R * 7, R, 4) * 150 + Math.max(0, fbm2($ * 9, 3 + R, 2)) * 90,
            j = Math.abs(Math.atan2(Math.sin($ - -2.35), Math.cos($ - -2.35)));
          ((it += Math.max(0, 1 - j / 0.22) * (R === 1 ? 260 : 150)), D.setY(q, it));
        } else D.setY(q, -20);
      }
      F.computeVertexNormals();
      let k = new MeshStandardMaterial({
          color: [6254423, 8227708, 10464688][R],
          roughness: 1,
          side: DoubleSide,
          fog: !0,
        }),
        Y = new Mesh(F, k);
      I.add(Y);
    }
    s.add(I);
  }
  let u = r.length,
    g = new Float32Array(u);
  for (let I = 0; I < u; I++) {
    let R = r[(I - 3 + u) % u],
      F = r[I],
      D = r[(I + 3) % u],
      k = Math.atan2(F.y - R.y, F.x - R.x),
      Y = Math.atan2(D.y - F.y, D.x - F.x);
    g[I] = Math.atan2(Math.sin(Y - k), Math.cos(Y - k));
  }
  let _ = new Float32Array(u);
  for (let I = 0; I < u; I++) {
    let R = 0;
    for (let F = -8; F <= 8; F++) R = Math.max(R, Math.abs(g[(I + F + u) % u]));
    _[I] = clamp((R - 0.025) / 0.05, 0, 1);
  }
  let m = (I) => {
      let R = r[I];
      return Math.abs(R.y - LAYOUT.straightZ) < 1.5 && R.x < 470 && R.x > -540;
    },
    p = (I) => (m(I) ? 7 : 6.5),
    w = buildStrip(
      r,
      (I) => p(I),
      (I) => -p(I),
      { y: 0.03, vScale: 1 / 12, uvAcross: [0, 14 / 12] },
    ),
    v = new Mesh(w, l.asphalt);
  ((v.receiveShadow = !0), (v.name = 'track'), s.add(v));
  {
    let I = document.createElement('canvas');
    ((I.width = 64), (I.height = 4));
    let R = I.getContext('2d'),
      F = R.createLinearGradient(0, 0, 64, 0);
    (F.addColorStop(0, 'rgba(0,0,0,0)'),
      F.addColorStop(0.35, 'rgba(0,0,0,1)'),
      F.addColorStop(0.65, 'rgba(0,0,0,1)'),
      F.addColorStop(1, 'rgba(0,0,0,0)'),
      (R.fillStyle = F),
      R.fillRect(0, 0, 64, 4),
      (l.rubber.map = new CanvasTexture(I)),
      (l.rubber.opacity = 0.2));
    let D = (q) => clamp(g[q] * 12, -2.2, 2.2),
      k = buildStrip(
        r,
        (q) => 2.6 + D(q),
        (q) => -3.4 + D(q),
        { y: 0.034 },
      ),
      Y = new Mesh(k, l.rubber);
    ((Y.renderOrder = 1), s.add(Y));
  }
  for (let I of [1, -1]) {
    let R = buildStrip(
        r,
        (D) => I * (p(D) - 0.15),
        (D) => I * (p(D) - 0.45),
        { y: 0.045 },
      ),
      F = new Mesh(R, l.line);
    ((F.receiveShadow = !0), s.add(F));
  }
  let x = [];
  {
    let I = -1;
    for (let R = 0; R <= u; R++) {
      let F = R < u && _[R] > 0.5;
      (F && I < 0 && (I = R), !F && I >= 0 && (R - I > 4 && x.push([I, R]), (I = -1)));
    }
  }
  for (let [I, R] of x) {
    for (let z of [1, -1]) {
      let $ = buildStrip(
          r,
          (yt) => z * p(yt),
          (yt) => z * (p(yt) + 1.6),
          { closed: !1, segRange: [I, R], y: 0.07, vScale: 0.16666666666666666, heightA: 0, heightB: -0.03 },
        ),
        it = new Mesh($, l.kerb);
      ((it.receiveShadow = !0), s.add(it));
      let j = buildStrip(
        r,
        (yt) => z * (p(yt) + 1.6),
        (yt) => z * (p(yt) + 5.5),
        { closed: !1, segRange: [I, R], y: 0.04 },
      );
      s.add(new Mesh(j, l.runoff));
    }
    let F = Math.floor((I + R) / 2),
      k = -(Math.sign(g[F]) || 1),
      Y = buildStrip(
        r,
        (z) => k * (p(z) + 5.5),
        (z) => k * (p(z) + 5.5 + 24 * clamp(_[z], 0.3, 1)),
        { closed: !1, segRange: [Math.max(0, I - 6), Math.min(u - 1, R + 10)], y: 0.035, vScale: 1 / 10 },
      ),
      q = new Mesh(Y, l.gravel);
    ((q.receiveShadow = !0), s.add(q));
    let rt = buildBarrierWall(
        r,
        (z) => k * (p(z) + 31.4),
        [Math.max(0, I - 6), Math.min(u - 1, R + 10)],
        0.95,
        1 / 7,
      ),
      ft = new Mesh(rt, l.barrier);
    ((ft.castShadow = !0), (ft.receiveShadow = !0), s.add(ft));
  }
  let S = LAYOUT,
    T = (I, R, F, D, k, Y, q, rt = s, ft = !0) => {
      let z = new Mesh(new BoxGeometry(I, R, F), D);
      return (z.position.set(k, Y + R / 2, q), (z.castShadow = ft), (z.receiveShadow = !0), rt.add(z), z);
    };
  {
    let I = new Shape(),
      R = S.garageFrontZ,
      F = S.pitWallZ;
    (I.moveTo(S.pitX0 - 140, -F),
      I.lineTo(S.pitX1 + 150, -F),
      I.lineTo(S.pitX1 + 150, -R),
      I.lineTo(S.pitX0 - 140, -R),
      I.closePath());
    let D = new ShapeGeometry(I);
    D.rotateX(-Math.PI / 2);
    let k = new Mesh(D, l.pitAsphalt);
    ((k.position.y = 0.025), (k.receiveShadow = !0), s.add(k));
    let Y = D.attributes.uv,
      q = D.attributes.position;
    for (let rt = 0; rt < q.count; rt++) Y.setXY(rt, q.getX(rt) / 12, q.getZ(rt) / 12);
    (T(
      S.pitX1 - S.pitX0 + 260,
      0.012,
      0.25,
      l.line,
      (S.pitX0 + S.pitX1) / 2,
      0.03,
      S.garageFrontZ + 6,
      s,
      !1,
    ),
      T(S.pitX1 - S.pitX0 + 300, 1.1, 0.7, l.concrete, (S.pitX0 + S.pitX1) / 2, 0, S.pitWallZ + 0.35),
      T(S.pitX1 - S.pitX0 + 300, 0.08, 0.9, l.steel, (S.pitX0 + S.pitX1) / 2, 1.1, S.pitWallZ + 0.35));
    for (let [rt, ft] of [
      [S.pitX1 + 150, S.pitX1 + 260],
      [S.pitX0 - 140, S.pitX0 - 250],
    ]) {
      let z = new Shape();
      (z.moveTo(rt, -(S.garageFrontZ + 0.5)),
        z.lineTo(rt, -S.pitWallZ),
        z.lineTo(ft, -(S.straightZ - 6.8)),
        z.lineTo(ft, -(S.straightZ - 6.8 - 6)),
        z.closePath());
      let $ = new ShapeGeometry(z);
      $.rotateX(-Math.PI / 2);
      let it = new Mesh($, l.pitAsphalt);
      ((it.position.y = 0.028), (it.receiveShadow = !0), s.add(it));
    }
  }
  let C = new Group();
  ((C.name = 'pits'), s.add(C));
  let U = 13;
  {
    let I = S.boxes * S.boxW,
      R = (S.pitX0 + S.pitX1) / 2,
      F = S.garageFrontZ,
      D = F - S.garageDepth;
    (T(I, 4.6, 0.4, l.white, R, 0, D + 0.2, C),
      T(I + 0.6, 0.5, S.garageDepth + 2.2, l.white, R, 4.6, F - S.garageDepth / 2 + 0.9, C),
      T(I, 3.4, S.garageDepth - 2, h(I / 8), R, 5.1, F - S.garageDepth / 2 - 0.4, C));
    for (let ft = 0; ft <= S.boxes; ft++)
      T(ft % 2 ? 0.16 : 0.32, 3.4, ft % 2 ? 0.45 : 0.7, l.white, S.pitX0 + ft * S.boxW, 5.1, F - 1.2, C);
    (T(I, 0.05, 0.14, new MeshBasicMaterial({ color: 16773590 }), R, 4.56, F + 1.4, C, !1),
      f(S.pitX0, F, S.pitX1, F, 3.2, 1, 0.05, C),
      f(S.pitX0 - 150, S.pitWallZ, S.pitX1 + 150, S.pitWallZ, 1.4, -1, 0.05),
      f(S.pitX0 - 150, S.pitWallZ + 0.7, S.pitX1 + 150, S.pitWallZ + 0.7, 1.2, 1, 0.06),
      T(I + 0.6, 0.55, S.garageDepth + 1.6, l.white, R, 8.5, F - S.garageDepth / 2 + 0.4, C),
      T(
        I,
        1,
        0.06,
        new MeshStandardMaterial({ color: 12570840, transparent: !0, opacity: 0.35, roughness: 0.1 }),
        R,
        9.05,
        F + 0.1,
        C,
        !1,
      ),
      T(I, 0.07, 0.12, l.steel, R, 10.05, F + 0.1, C));
    for (let ft = 0; ft < S.boxes; ft++) {
      let z = S.pitX0 + ft * S.boxW,
        $ = z + S.boxW / 2;
      if (
        (T(0.35, 4.6, S.garageDepth, l.white, z, 0, F - S.garageDepth / 2, C),
        T(S.boxW - 0.35, 0.7, 0.3, l.white, $, 3.9, F - 0.15, C),
        ft === U)
      )
        continue;
      let it = ft % 7 === 3 ? 1.2 : ft % 5 === 1 ? 2.2 : 0;
      (T(S.boxW - 0.4, 3.9 - it, 0.12, l.shutter, $, it, F - 0.3, C),
        it > 0 && T(S.boxW - 0.4, it, 0.1, l.interior, $, 0, F - 6, C, !1));
    }
    T(0.35, 4.6, S.garageDepth, l.white, S.pitX1, 0, F - S.garageDepth / 2, C);
    let k = S.pitX0 + U * S.boxW + S.boxW / 2;
    (T(S.boxW - 0.4, 0.02, S.garageDepth - 0.4, l.floor, k, 0.02, F - S.garageDepth / 2, C, !1),
      T(S.boxW - 0.4, 3.9, 0.1, l.interior, k, 0, D + 0.45, C, !1));
    for (let ft of [-1, 1]) {
      T(1.6, 1, 0.6, l.red, k + ft * 2.2, 0, D + 1.3, C);
      for (let z = 0; z < 4; z++) {
        let $ = new Mesh(
          new CylinderGeometry(0.33, 0.33, 0.3, 20),
          new MeshStandardMaterial({ color: 1776670, roughness: 0.95 }),
        );
        ($.position.set(k - ft * 2.3, 0.15 + z * 0.31, D + 3.2), ($.castShadow = !0), C.add($));
      }
    }
    let Y = new PointLight(16767400, 60, 16, 1.6);
    (Y.position.set(k, 3.6, F - 6),
      C.add(Y),
      T(S.boxW - 1.2, 0.06, 0.5, new MeshBasicMaterial({ color: 16774108 }), k, 4.2, F - 5, C, !1),
      T(S.boxW - 1.2, 0.06, 0.5, new MeshBasicMaterial({ color: 16774108 }), k, 4.2, F - 11, C, !1),
      T(3.2, 1.4, 0.06, l.steelDark, k, 1.5, D + 0.52, C, !1));
    for (let ft = 0; ft < 2; ft++) {
      let z = new Mesh(
        new CylinderGeometry(0.34, 0.34, 0.32, 22),
        new MeshStandardMaterial({ color: 1776670, roughness: 0.95 }),
      );
      ((z.rotation.z = Math.PI / 2),
        z.position.set(k + 1.6 + ft * 0.36, 0.36, F - 4.2),
        (z.castShadow = !0),
        C.add(z));
    }
    (T(1.1, 0.08, 0.7, l.steel, k + 1.78, 0.1, F - 4.2, C, !1),
      f(k - S.boxW / 2 + 0.2, D + 0.5, k + S.boxW / 2 - 0.2, D + 0.5, 2.4, 1, 0.045, C),
      f(k - S.boxW / 2 + 0.2, D + 0.5, k - S.boxW / 2 + 0.2, F, 1.4, -1, 0.045, C),
      f(k + S.boxW / 2 - 0.2, D + 0.5, k + S.boxW / 2 - 0.2, F, 1.4, 1, 0.045, C),
      (s.userData.openBox = { x: k, z: F }));
    let q = S.towerX,
      rt = F - 7;
    (T(18, 16, 15, l.white, q, 0, rt, C),
      T(18.6, 4.2, 15.6, h(2.4), q, 16, rt, C),
      T(19.4, 0.6, 16.4, l.white, q, 20.2, rt, C),
      T(20.4, 0.25, 17.4, l.white, q, 15.75, rt, C));
    for (let ft = 0; ft < 3; ft++) T(18.2, 1.3, 0.1, h(2.2), q, 3.4 + ft * 4.2, rt + 7.55, C, !1);
    (f(q - 9, rt + 7.5, q + 9, rt + 7.5, 2.4, 1, 0.05, C),
      f(q + 9, rt - 7.5, q + 9, rt + 7.5, 2.4, -1, 0.05, C),
      (s.userData.tower = new Vector3(q, 18, rt)));
    for (let ft = 0; ft < 6; ft++) G(S.pitX0 + 18 + ft * 34, 9, F + 0.2, ft % 2 ? 16118766 : 15282981, C);
  }
  T(
    S.straightX0 - S.straightX1,
    1.15,
    0.6,
    l.concrete,
    (S.straightX0 + S.straightX1) / 2,
    0,
    S.straightZ + 10.5,
  );
  {
    let I = new InstancedMesh(
        new CylinderGeometry(0.07, 0.07, 4.2, 6),
        l.steelDark,
        Math.ceil((S.straightX0 - S.straightX1) / 6),
      ),
      R = new Matrix4(),
      F = 0;
    for (let k = S.straightX1; k < S.straightX0; k += 6)
      (R.makeTranslation(k, 1.15 + 2.1, S.straightZ + 10.6), I.setMatrixAt(F++, R));
    ((I.count = F), (I.castShadow = !0), s.add(I));
    let D = new Mesh(
      new PlaneGeometry(S.straightX0 - S.straightX1, 3.6),
      new MeshStandardMaterial({
        color: 9213082,
        transparent: !0,
        opacity: 0.18,
        side: DoubleSide,
        depthWrite: !1,
      }),
    );
    (D.position.set((S.straightX0 + S.straightX1) / 2, 3.1, S.straightZ + 10.6), s.add(D));
  }
  {
    let I = new Group();
    ((I.name = 'grandstand'), s.add(I));
    let R = S.grandstandX1 - S.grandstandX0,
      F = (S.grandstandX0 + S.grandstandX1) / 2,
      D = S.grandstandZ;
    for (let Y = 0; Y < 18; Y++)
      (T(R, 0.45, 0.9, l.concreteDark, F, 1.2 + Y * 0.55, D + Y * 0.85, I, Y % 3 === 0),
        T(R - 2, 0.32, 0.35, l.seat, F, 1.65 + Y * 0.55, D + Y * 0.85 - 0.1, I, !1));
    (T(R, 1.2, 16, l.concreteDark, F, 0, D + 7.5, I), T(R, 11, 1, l.white, F, 0, D + 16, I));
    let k = new Mesh(new BoxGeometry(R + 4, 0.45, 22), l.roofW);
    (k.position.set(F, 16.5, D + 7.5),
      (k.rotation.x = -0.08),
      (k.castShadow = !0),
      (k.receiveShadow = !0),
      I.add(k));
    for (let Y = S.grandstandX0; Y <= S.grandstandX1 + 0.1; Y += 20) {
      T(0.5, 16.5, 0.5, l.steel, Y, 0, D + 16.2, I);
      let q = new Mesh(new BoxGeometry(0.35, 1.4, 21), l.steel);
      (q.position.set(Y, 17.3, D + 7.5), (q.rotation.x = -0.08), (q.castShadow = !0), I.add(q));
    }
  }
  {
    let I = new Group();
    ((I.name = 'gantry'), s.add(I));
    let R = S.gantryX,
      F = S.pitWallZ - 0.5,
      D = S.straightZ + 11;
    for (let k of [F, D]) T(0.6, 9, 0.6, l.steel, R, 0, k, I);
    (T(0.5, 0.5, D - F + 1, l.steel, R, 8.2, (F + D) / 2, I),
      T(0.5, 0.5, D - F + 1, l.steel, R, 9.2, (F + D) / 2, I));
    for (let k = F; k < D; k += 1.2) {
      let Y = new Mesh(new BoxGeometry(0.12, 1.3, 0.12), l.steel);
      (Y.position.set(R, 8.7, k), (Y.rotation.x = 0.7), I.add(Y));
    }
    for (let k = 0; k < 4; k++)
      T(
        0.3,
        0.9,
        1.6,
        new MeshStandardMaterial({ color: 1842721, roughness: 0.4 }),
        R - 0.2,
        7.2,
        S.straightZ - 3 + k * 2,
        I,
      );
    T(0.8, 0.01, 14, l.line, R, 0.04, S.straightZ, s, !1);
    for (let k = 0; k < 10; k++) {
      let Y = R + 12 + k * 8,
        q = S.straightZ + (k % 2 ? 3.2 : -3.2);
      (T(0.18, 0.01, 2.6, l.line, Y, 0.04, q, s, !1),
        T(2.2, 0.01, 0.18, l.line, Y + 1.1, 0.04, q + 1.3, s, !1),
        T(2.2, 0.01, 0.18, l.line, Y + 1.1, 0.04, q - 1.3, s, !1));
    }
  }
  {
    let I = S.paddock,
      R = new PlaneGeometry(I.x1 - I.x0, I.z1 - I.z0);
    R.rotateX(-Math.PI / 2);
    let F = R.attributes.uv;
    for (let nt = 0; nt < F.count; nt++)
      F.setXY(nt, (F.getX(nt) * (I.x1 - I.x0)) / 12, (F.getY(nt) * (I.z1 - I.z0)) / 12);
    let D = new Mesh(R, l.pitAsphalt);
    (D.position.set((I.x0 + I.x1) / 2, 0.02, (I.z0 + I.z1) / 2), (D.receiveShadow = !0), s.add(D));
    for (let [nt, vt, It, ut] of [
      [80, 160, 22, 28],
      [84, 180, 18, 16],
      [10, 167.5, 220, 3.5],
    ]) {
      let _t = new Mesh(new PlaneGeometry(It, ut), l.pitAsphalt);
      ((_t.rotation.x = -Math.PI / 2), _t.position.set(nt, 0.022, vt), (_t.receiveShadow = !0), s.add(_t));
    }
    let k = new Mesh(new PlaneGeometry(9, 90), l.pitAsphalt);
    ((k.rotation.x = -Math.PI / 2),
      k.position.set(-60, 0.021, 70),
      (k.receiveShadow = !0),
      s.add(k),
      f(S.pitX0, S.garageFrontZ - S.garageDepth, S.pitX1, S.garageFrontZ - S.garageDepth, 2.6, -1, 0.05));
    let Y = new Matrix4(),
      q = new Quaternion(),
      rt = new Euler(),
      ft = new Vector3(),
      z = new Vector3(),
      $ = new Color(),
      it = (nt, vt, It, ut = !0) => {
        let _t = new InstancedMesh(nt, vt, It.length);
        return (
          It.forEach((Et, Ot) => {
            (rt.set(Et.rx || 0, Et.ry || 0, Et.rz || 0),
              q.setFromEuler(rt),
              Y.compose(z.set(Et.x, Et.y || 0, Et.z), q, ft.set(Et.sx || 1, Et.sy || 1, Et.sz || 1)),
              _t.setMatrixAt(Ot, Y),
              Et.c != null && _t.setColorAt(Ot, $.set(Et.c)));
          }),
          (_t.castShadow = ut),
          (_t.receiveShadow = !0),
          s.add(_t),
          _t
        );
      },
      j = new BoxGeometry(1, 1, 1),
      yt = new MeshStandardMaterial({ color: 16777215, roughness: 0.42, metalness: 0.25 }),
      Ht = new MeshStandardMaterial({ color: 1910316, roughness: 0.08, metalness: 0.85 }),
      Dt = new MeshStandardMaterial({ color: 1579291, roughness: 0.92 }),
      Wt = [],
      tt = [],
      st = [],
      P = [],
      wt = [],
      at = [],
      gt = [],
      lt = [],
      bt = [2830133, 16118766, 10200234, 1842721, 15131612, 3817544, 16118766, 6648666],
      ht = 0;
    for (let nt = -156; nt <= 66; nt += 24, ht++) {
      let It = bt[ht % bt.length];
      (Wt.push({ x: nt, y: 0.95 + 1.95, z: 151, sx: 15.5, sy: 3.9, sz: 2.55, c: It }),
        ht % 3 === 1 &&
          lt.push({ x: nt, y: 1.55, z: 151 - 1.285, sx: 15.3, sy: 0.18, sz: 0.02, c: 15282981 }),
        tt.push({
          x: nt + 9.35,
          y: 0.9 + 1.45,
          z: 151,
          sx: 2.6,
          sy: 2.9,
          sz: 2.5,
          c: ht % 2 ? 16118766 : 10200234,
        }),
        st.push({ x: nt + 10.67, y: 3, z: 151, sx: 0.05, sy: 0.95, sz: 2.2 }));
      for (let ut of [-6.1, -4.8, -3.5, 7.7, 9.9])
        P.push({ x: nt + ut, y: 0.5, z: 151, rx: Math.PI / 2, sy: 2.6 });
      wt.push({ x: nt - 0.5, y: 3.7, z: 151 - 1.28 - 2.35, sx: 13.6, sy: 0.1, sz: 4.7, rx: -0.05 });
      for (let ut of [-6.6, 0, 6.6]) at.push({ x: nt - 0.5 + ut, y: 1.8, z: 151 - 1.28 - 4.55, sy: 3.6 });
      (gt.push({ x: nt + 1.5, y: 0.05, z: 151, rx: -Math.PI / 2, sx: 20, sy: 4.4 }),
        gt.push({ x: nt - 0.5, y: 0.052, z: 151 - 3.6, rx: -Math.PI / 2, sx: 14, sy: 5.2 }));
    }
    (it(j, yt, Wt),
      it(j, yt, tt),
      it(j, Ht, st, !1),
      lt.length && it(j, new MeshStandardMaterial({ color: 16777215, roughness: 0.5 }), lt, !1),
      it(new CylinderGeometry(0.5, 0.5, 1, 16), Dt, P),
      it(j, l.roofW, wt),
      it(new CylinderGeometry(0.05, 0.05, 1, 6), l.steel, at),
      (it(new PlaneGeometry(1, 1), l.contact, gt, !1).renderOrder = 1));
    let A = [],
      E = [],
      X = [],
      K = [];
    for (let nt = 0; nt < 6; nt++) {
      let vt = -28 + nt * 16.5,
        It = 100.5;
      (A.push({ x: vt, y: 1.6, z: It, sx: 14.6, sy: 3.2, sz: 5 }),
        X.push({ x: vt, y: 3.3, z: It + 0.35, sx: 15.4, sy: 0.18, sz: 6.2 }),
        A.push({ x: vt - 2.2, y: 4.85, z: It - 0.6, sx: 8.6, sy: 2.9, sz: 3.6 }),
        X.push({ x: vt - 2.2, y: 6.4, z: It - 0.45, sx: 9.6, sy: 0.16, sz: 4.4 }),
        E.push({ x: vt, y: 1.75, z: It + 2.53, sx: 12.8, sy: 1.9, sz: 0.04 }),
        E.push({ x: vt - 2.2, y: 4.9, z: It + 1.23, sx: 8, sy: 2.1, sz: 0.04 }),
        K.push({ x: vt, y: 0.05, z: It + 2.6, rx: -Math.PI / 2, sx: 16, sy: 4 }));
    }
    (it(j, l.white, A),
      it(j, l.white, X),
      it(j, h(1.5), E, !1),
      (it(new PlaneGeometry(1, 1), l.contact, K, !1).renderOrder = 1));
    for (let [nt, vt] of [
      [-140, 116],
      [-100, 116],
      [72, 117],
    ]) {
      let It = new Mesh(new ConeGeometry(13, 3.2, 4, 1, !0), l.roofW);
      ((It.rotation.y = Math.PI / 4), It.position.set(nt, 5.6, vt), (It.castShadow = !0), s.add(It));
      for (let [ut, _t] of [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ])
        T(0.25, 4.2, 0.25, l.steel, nt + ut * 8.5, 0, vt + _t * 8.5, s);
    }
    let ct = [],
      et = [];
    for (let nt = 0; nt < 18; nt++) {
      let vt = -158 + nt * 13.1 + (nt % 3) * 1.7,
        It = 145.4 - (nt % 2) * 0.8,
        ut = 2 + (nt % 3);
      for (let _t = 0; _t < ut; _t++)
        ct.push({ x: vt, y: 0.16 + _t * 0.31, z: It, sx: 0.66, sy: 0.3, sz: 0.66 });
      et.push({
        x: vt + 2.4,
        y: 0.45,
        z: It + 0.3,
        sx: 1.2,
        sy: 0.9,
        sz: 0.8,
        c: nt % 2 ? 1842721 : 10200234,
      });
    }
    (it(new CylinderGeometry(0.5, 0.5, 1, 18), Dt, ct), it(j, yt, et));
    let Lt = [];
    for (let nt = 0; nt < 7; nt++)
      Lt.push({ x: -7.4, y: 0.03, z: 126.1 - nt * 3.2, sx: 5.8, sy: 0.012, sz: 0.12 });
    (Lt.push({ x: -10.3, y: 0.03, z: 126.1 - 3 * 3.2, sx: 0.12, sy: 0.012, sz: 6 * 3.2 + 0.12 }),
      it(j, l.line, Lt, !1));
    for (let nt = 0; nt < 4; nt++)
      (T(0.4, 22, 0.4, l.steel, I.x0 + 10 + nt * 90, 0, I.z0 - 5, s),
        T(3, 0.6, 1.2, l.steelDark, I.x0 + 10 + nt * 90, 22, I.z0 - 5, s));
  }
  let b = 60,
    M = new Map();
  for (let I = 0; I < u; I++) {
    let R = Math.floor(r[I].x / b) + ',' + Math.floor(r[I].y / b);
    (M.has(R) || M.set(R, []), M.get(R).push(r[I]));
  }
  let N = (I, R) => {
      let F = Math.floor(I / b),
        D = Math.floor(R / b),
        k = 1e12;
      for (let Y = -1; Y <= 1; Y++)
        for (let q = -1; q <= 1; q++) {
          let rt = M.get(F + Y + ',' + (D + q));
          if (rt)
            for (let ft of rt) {
              let z = (ft.x - I) ** 2 + (ft.y - R) ** 2;
              z < k && (k = z);
            }
        }
      return k === 1e12 ? b * 1.5 : Math.sqrt(k);
    },
    Z = (I, R) =>
      (I > S.paddock.x0 - 30 && I < S.paddock.x1 + 30 && R > S.paddock.z0 - 20 && R < S.straightZ + 60) ||
      (I > S.grandstandX0 - 40 && I < S.grandstandX1 + 40 && R > S.straightZ && R < S.grandstandZ + 40);
  {
    let I = Math.round(2600 * n),
      R = Math.round(2200 * n),
      F = Math.round(1800 * n),
      D = (st, P) =>
        mergeGeometries(
          st.map(([wt, at, gt, lt, bt = 1]) => {
            let ht = P();
            return (ht.scale(lt, lt * bt, lt), ht.translate(wt, at, gt), ht);
          }),
        ),
      k = D(
        [
          [0, 0, 0, 1, 0.42],
          [0.62, -0.06, 0.18, 0.62, 0.42],
          [-0.58, -0.04, -0.22, 0.66, 0.42],
          [0.08, 0.04, -0.62, 0.58, 0.42],
          [-0.2, 0.03, 0.6, 0.6, 0.42],
        ],
        () => new SphereGeometry(1, 10, 7),
      ),
      Y = D(
        [
          [0, 0, 0, 1],
          [0.55, -0.15, 0.25, 0.7],
          [-0.5, -0.1, -0.3, 0.72],
          [0.1, 0.38, -0.1, 0.6],
        ],
        () => new IcosahedronGeometry(1, 1),
      ),
      q = new InstancedMesh(k, l.pine, I),
      rt = new InstancedMesh(new CylinderGeometry(0.16, 0.3, 1, 6), l.trunk, I),
      ft = new InstancedMesh(Y, l.oak, R),
      z = new InstancedMesh(new IcosahedronGeometry(1, 1), l.shrub, F),
      $ = new Matrix4(),
      it = new Quaternion(),
      j = new Vector3(),
      yt = new Vector3(),
      Ht = new Euler(),
      Dt = new Color(),
      Wt = (st, P, wt) => {
        for (let at = 0; at < 60; at++) {
          let gt = o() * Math.PI * 2,
            lt = Math.sqrt(o()) * P,
            bt = Math.cos(gt) * lt * 1.3,
            ht = Math.sin(gt) * lt * 0.9,
            A = N(bt, ht);
          if (!(A < st || Z(bt, ht)) && !(fbm2(bt / 160, ht / 160, 3) * 0.9 + 0.2 < wt * o()))
            return [bt, ht, A];
        }
        return null;
      },
      tt = 0;
    for (let st = 0; st < I; st++) {
      let P = Wt(38, 1350, 0.9);
      if (!P) continue;
      let [wt, at] = P,
        gt = 9 + o() * 8,
        lt = 4 + o() * 3.5;
      (Ht.set((o() - 0.5) * 0.12, o() * 6, (o() - 0.5) * 0.12),
        it.setFromEuler(Ht),
        $.compose(yt.set(wt, gt * 0.5, at), it, j.set(1, gt, 1)),
        rt.setMatrixAt(tt, $),
        $.compose(yt.set(wt, gt, at), it, j.set(lt, lt * 0.9, lt)),
        q.setMatrixAt(tt, $),
        q.setColorAt(tt, Dt.setHSL(0.25 + o() * 0.04, 0.22 + o() * 0.1, 0.24 + o() * 0.08)),
        tt++);
    }
    ((q.count = rt.count = tt), (tt = 0));
    for (let st = 0; st < R; st++) {
      let P = Wt(34, 1400, 0.7);
      if (!P) continue;
      let [wt, at] = P,
        gt = 3 + o() * 3.4;
      ($.compose(yt.set(wt, gt * 0.8, at), it.identity(), j.set(gt, gt * 0.85, gt)),
        ft.setMatrixAt(tt, $),
        ft.setColorAt(tt, Dt.setHSL(0.2 + o() * 0.07, 0.2 + o() * 0.12, 0.3 + o() * 0.1)),
        tt++);
    }
    ((ft.count = tt), (tt = 0));
    for (let st = 0; st < F; st++) {
      let P = Wt(20, 1200, 0.4);
      if (!P) continue;
      let [wt, at] = P,
        gt = 0.8 + o() * 1.6;
      ($.compose(yt.set(wt, gt * 0.35, at), it.identity(), j.set(gt * 1.4, gt * 0.7, gt * 1.2)),
        z.setMatrixAt(tt, $),
        z.setColorAt(tt, Dt.setHSL(0.17 + o() * 0.07, 0.16 + o() * 0.12, 0.4 + o() * 0.1)),
        tt++);
    }
    z.count = tt;
    for (let st of [q, rt, ft, z]) ((st.castShadow = t !== 'low'), (st.receiveShadow = !0), s.add(st));
  }
  {
    let I = grassTuftTexture(),
      R = new MeshStandardMaterial({
        map: I,
        alphaTest: 0.45,
        side: DoubleSide,
        roughness: 1,
        color: 14870728,
      });
    R.onBeforeCompile = (z) => {
      ((z.uniforms.uTime = { value: 0 }),
        (R.userData.sh = z),
        (z.vertexShader =
          `uniform float uTime;
` +
          z.vertexShader.replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
        float sway = sin(uTime * 1.7 + instanceMatrix[3].x * .37 + instanceMatrix[3].z * .23) * .12 * uv.y;
        transformed.x += sway; transformed.z += sway * .6;`,
          )));
    };
    let F = new PlaneGeometry(1, 0.62);
    F.translate(0, 0.31, 0);
    let D = Math.round(3e3 * n),
      k = new InstancedMesh(F, R, D),
      Y = new Matrix4(),
      q = new Quaternion(),
      rt = new Euler(),
      ft = 0;
    for (let z = 0; z < D * 3 && ft < D; z++) {
      let $ = o(),
        it,
        j;
      if ($ < 0.5) ((it = lerp(-560, 460, o())), (j = S.straightZ + 12 + o() * 14));
      else {
        let Ht = Math.floor(o() * 160),
          Dt = r[Ht],
          Wt = r[(Ht + 1) % u],
          tt = -(Wt.y - Dt.y),
          st = Wt.x - Dt.x,
          P = Math.hypot(tt, st) || 1,
          wt = (o() > 0.5 ? 1 : -1) * (12 + o() * 22);
        ((it = Dt.x + (tt / P) * wt), (j = Dt.y + (st / P) * wt));
      }
      if ((Z(it, j) && j < S.straightZ + 11) || N(it, j) < 9.5) continue;
      (rt.set(0, o() * Math.PI, 0), q.setFromEuler(rt));
      let yt = 0.55 + o() * 0.6;
      (Y.compose(new Vector3(it, 0, j), q, new Vector3(yt, yt, yt)), k.setMatrixAt(ft++, Y));
    }
    ((k.count = ft),
      s.add(k),
      a.push((z) => {
        R.userData.sh && (R.userData.sh.uniforms.uTime.value = z);
      }));
  }
  function G(I, R, F, D, k) {
    let Y = new Mesh(new CylinderGeometry(0.05, 0.06, 6, 6), l.steel);
    (Y.position.set(I, R + 3, F), k.add(Y));
    let q = new PlaneGeometry(2.4, 1.5, 16, 6);
    q.translate(1.2, 0, 0);
    let rt = new MeshStandardMaterial({ color: D, side: DoubleSide, roughness: 0.8 });
    rt.onBeforeCompile = (z) => {
      ((z.uniforms.uTime = { value: 0 }),
        (rt.userData.sh = z),
        (z.vertexShader =
          `uniform float uTime;
` +
          z.vertexShader.replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
        float k = position.x / 2.4;
        transformed.z += sin(position.x * 2.1 - uTime * 4.2 + ${(I * 0.1).toFixed(2)}) * .22 * k;
        transformed.y += sin(position.x * 1.3 - uTime * 3.1) * .06 * k;`,
          )));
    };
    let ft = new Mesh(q, rt);
    (ft.position.set(I, R + 5.1, F),
      (ft.castShadow = !0),
      k.add(ft),
      a.push((z) => {
        rt.userData.sh && (rt.userData.sh.uniforms.uTime.value = z);
      }));
  }
  (G(S.grandstandX0 + 8, 17, S.grandstandZ + 16, 15282981, s),
    G(S.grandstandX1 - 8, 17, S.grandstandZ + 16, 16118766, s));
  let J = new Group();
  ((J.name = 'clouds'), s.add(J));
  {
    let I = Math.round(22 * Math.max(0.5, n));
    for (let R = 0; R < I; R++) {
      let F = new SpriteMaterial({
          map: puffTexture(R + 3),
          transparent: !0,
          depthWrite: !1,
          fog: !1,
          opacity: 0.85,
        }),
        D = new Sprite(F),
        k = o() * Math.PI * 2,
        Y = 900 + o() * 1300;
      D.position.set(Math.cos(k) * Y, 220 + o() * 260, Math.sin(k) * Y);
      let q = 380 + o() * 420;
      (D.scale.set(q, q * 0.42, 1), (D.userData.v = 0.6 + o() * 1.2), J.add(D));
    }
    a.push((R, F) => {
      for (let D of J.children)
        ((D.position.x += D.userData.v * F * 2.2), D.position.x > 2400 && (D.position.x = -2400));
    });
  }
  return {
    root: s,
    materials: l,
    layout: S,
    track: r,
    update(I, R) {
      for (let F of a) F(I, R);
    },
  };
}

export { buildWorld };
