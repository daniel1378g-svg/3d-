// createJourney(): renderer, scene assembly, camera direction and the frame loop.
import {
  AgXToneMapping,
  BackSide,
  CatmullRomCurve3,
  CircleGeometry,
  Color,
  CubeCamera,
  DepthTexture,
  DirectionalLight,
  Fog,
  HalfFloatType,
  HemisphereLight,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PCFSoftShadowMap,
  PMREMGenerator,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLCubeRenderTarget,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three';
import { arcLengthNear, buildCarPath } from './car-path.js';
import { buildHeroCar } from './car/hero-car.js';
import { buildPerson } from './people.js';
import { sampleTimeOfDay } from './time-of-day.js';
import { clamp, easeInOutCubic, hermite, lerp, monotoneSlope, smoothstep } from './util/math.js';
import { buildPaddockCar } from './vehicles.js';
import { buildWorld } from './world.js';

async function createJourney({
  canvas: i,
  trackUrl: t,
  carUrl: e,
  carMetaUrl: n,
  quality: s = 'high',
  onProgress: r = () => {},
}) {
  let o = new WebGLRenderer({
      canvas: i,
      antialias: s !== 'low',
      powerPreference: 'high-performance',
      alpha: !1,
    }),
    Rc = s === 'high' ? 2 : s === 'mid' ? 1.75 : 1,
    Rk = 1;
  (o.setPixelRatio(1),
    (o.toneMapping = AgXToneMapping),
    (o.outputColorSpace = SRGBColorSpace),
    (o.shadowMap.enabled = s !== 'low'),
    (o.shadowMap.type = PCFSoftShadowMap));
  let c = new Scene();
  c.fog = new Fog(14279913, 140, 3300);
  let l = new PerspectiveCamera(36, 1, 0.3, 9e3),
    h = new ShaderMaterial({
      side: BackSide,
      depthWrite: !1,
      fog: !1,
      uniforms: {
        zen: { value: new Color() },
        hor: { value: new Color() },
        sunDir: { value: new Vector3() },
        sunCol: { value: new Color() },
        skyGain: { value: 1 },
      },
      vertexShader:
        'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
      fragmentShader: `uniform vec3 zen, hor, sunCol; uniform vec3 sunDir; uniform float skyGain; varying vec3 vP;
      void main(){ float h = clamp(vP.y, -.2, 1.); float k = pow(clamp(h, 0., 1.), .55);
        vec3 c = mix(hor, zen, k);
        float s = max(dot(normalize(vP), normalize(sunDir)), 0.);
        c += sunCol * (pow(s, 380.) * 2.2 + pow(s, 12.) * .22 + pow(s, 3.) * .06 * (1. - k));
        c = mix(c, hor * .92, smoothstep(0., -.2, vP.y));
        gl_FragColor = vec4(c * skyGain + (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
      }`,
    }),
    f = new Mesh(new SphereGeometry(8e3, 32, 16), h);
  c.add(f);
  let d = new HemisphereLight(14279913, 6187602, 1);
  c.add(d);
  let u = new DirectionalLight(16777215, 3);
  ((u.castShadow = o.shadowMap.enabled),
    u.shadow.mapSize.setScalar(s === 'high' && o.capabilities.maxTextureSize >= 8192 ? 4096 : 2048),
    Object.assign(u.shadow.camera, { left: -70, right: 70, top: 70, bottom: -70, near: 10, far: 900 }),
    (u.shadow.bias = -4e-4),
    (u.shadow.normalBias = 0.04),
    (u.shadow.radius = 4),
    c.add(u, u.target));
  let g = new PMREMGenerator(o),
    _ = new Scene(),
    m = new Mesh(new SphereGeometry(100, 32, 16), h);
  _.add(m);
  let p = new Mesh(new CircleGeometry(90, 32), new MeshBasicMaterial({ color: 5595212 }));
  ((p.rotation.x = -Math.PI / 2), (p.position.y = -8), _.add(p));
  let w = new WebGLCubeRenderTarget(s === 'high' ? 256 : 128, { type: HalfFloatType, generateMipmaps: !1 }),
    v = new CubeCamera(0.1, 200, w),
    x = s === 'high' ? 0.025 : 0.04,
    S = null,
    T = -1,
    C = (xt) => {
      let Ut = h.uniforms.skyGain.value;
      ((h.uniforms.skyGain.value = 1),
        v.update(o, _),
        (S = g.fromCubemap(w.texture, S)),
        (c.environment = S.texture),
        (T = xt),
        (h.uniforms.skyGain.value = Ut));
    },
    U = s === 'high',
    b = null;
  if (U)
    try {
      let xt = new WebGLRenderTarget(4, 4, { type: HalfFloatType, samples: 4 });
      xt.depthTexture = new DepthTexture(4, 4);
      let Ut = new WebGLRenderTarget(4, 4),
        y = new ShaderMaterial({
          depthTest: !1,
          depthWrite: !1,
          uniforms: {
            tColor: { value: xt.texture },
            tDepth: { value: xt.depthTexture },
            tMask: { value: Ut.texture },
            uInvVP: { value: new Matrix4() },
            uPrevVP: { value: new Matrix4() },
            uAmt: { value: 0 },
          },
          vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
          fragmentShader: `uniform sampler2D tColor, tDepth, tMask; uniform mat4 uInvVP, uPrevVP; uniform float uAmt; varying vec2 vUv;
          vec3 toDisplay(vec3 c, float d) {
            if (d > .99999) return c;                       // the sky is authored for display already
            #ifdef TONE_MAPPING
            c = toneMapping(c);
            #endif
            return linearToOutputTexel(vec4(c, 1.)).rgb;
          }
          void main() {
            float d = texture2D(tDepth, vUv).x;
            vec4 wp = uInvVP * vec4(vUv * 2. - 1., d * 2. - 1., 1.); wp /= wp.w;
            vec4 pp = uPrevVP * wp; vec2 prevUv = pp.xy / pp.w * .5 + .5;
            vec2 vel = (vUv - prevUv) * uAmt * (1. - texture2D(tMask, vUv).r);
            float len = length(vel), maxLen = .016;
            if (len > maxLen) vel *= maxLen / len;
            vec3 acc = toDisplay(texture2D(tColor, vUv).rgb, d); float wsum = 1.;
            for (int i = 0; i < 8; i++) {
              vec2 uv = vUv + vel * (float(i) / 7. - .5);
              float w = 1. - texture2D(tMask, uv).r;           // never smear the car into the background
              acc += toDisplay(texture2D(tColor, uv).rgb, texture2D(tDepth, uv).x) * w; wsum += w;
            }
            gl_FragColor = vec4(acc / wsum + (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
          }`,
        }),
        O = new Mesh(new PlaneGeometry(2, 2), y);
      O.frustumCulled = !1;
      let V = new Scene();
      (V.add(O),
        (b = {
          rt: xt,
          maskRT: Ut,
          mat: y,
          pScene: V,
          pCam: new OrthographicCamera(-1, 1, 1, -1, 0, 1),
          maskMat: new MeshBasicMaterial({ color: 16777215, fog: !1 }),
          vp: new Matrix4(),
          prev: new Matrix4(),
          size: new Vector2(),
          ok: !0,
        }));
    } catch {
      b = null;
    }
  let [M, N] = await Promise.all([fetch(t).then((xt) => xt.json()), fetch(n).then((xt) => xt.json())]);
  r(0.15);
  let Z = buildWorld(M.pts, { quality: s, renderer: o });
  (c.add(Z.root), r(0.35));
  let G = await buildHeroCar(e, N, {
    quality: s,
    onProgress: (xt) => xt.total && r(0.35 + (0.55 * xt.loaded) / xt.total),
  });
  (c.add(G.root),
    G.root.traverse((xt) => {
      xt.isMesh && !xt.userData.noMask && xt.layers.enable(1);
    }),
    r(0.92));
  let J = M.pts.map(([xt, Ut]) => new Vector3(xt, 0.6, Ut));
  J.push(J[0].clone());
  let I = new TubeGeometry(new CatmullRomCurve3(J, !0), 1200, 1.9, 6, !0),
    R = new MeshBasicMaterial({ color: 15282981, transparent: !0, opacity: 0, depthWrite: !1, fog: !1 }),
    F = new Mesh(I, R);
  ((F.renderOrder = 5), c.add(F));
  let D = I.index.count,
    k = Z.root.userData.openBox,
    Y = buildPerson({ suit: 2830390, trim: 15282981, pose: 'kneel' }),
    q = buildPerson({ suit: 16118766, trim: 15282981, skin: 12159595, pose: 'carryHelmet' }),
    rt = buildPerson({ suit: 2830390, trim: 10200234, pose: 'stand' });
  c.add(Y, q, rt);
  let ft = [
    ['classic', 11740702, -7.3, 121.3, 0.02],
    ['classic', 3038539, -7.5, 118.1, -0.03],
    ['classic', 15788760, -7.2, 114.9, 0.01],
    ['gt', 1842721, -7.4, 111.7, -0.02],
    ['classic', 9414584, -7.3, 108.5, 0.03],
    ['proto', 15282981, -41, 141.5, 0.02],
    ['gt', 10200234, -58, 141, 0],
    ['proto', 2833493, -64, 120, Math.PI],
    ['classic', 9071422, -74, 126, 1.5],
    ['gt', 16118766, 26, 108, Math.PI - 0.05],
  ];
  for (let [xt, Ut, y, O, V] of ft) {
    let W = buildPaddockCar(xt, Ut);
    (W.position.set(y, 0, O), (W.rotation.y = V), c.add(W));
  }
  let z = [
    [buildPerson({ suit: 3817544, trim: 16118766, skin: 13738883 }), -3.7, 119.9, Math.PI + 0.25],
    [buildPerson({ suit: 15131612, trim: 6648666, skin: 10251086 }), -3.3, 118.8, Math.PI - 0.5],
    [buildPerson({ suit: 6648666, trim: 1842721, skin: 13081468 }), -11.8, 113.6, 0.3],
  ];
  for (let [xt, Ut, y, O] of z) (xt.position.set(Ut, 0, y), (xt.rotation.y = O), c.add(xt));
  let $ = buildCarPath(M.pts),
    it = $.getLength(),
    j = {
      intro: 0,
      s1: arcLengthNear($, 330, 206),
      s2: arcLengthNear($, -60, 189.2),
      pitOut: arcLengthNear($, -392, 201.2),
      t1: arcLengthNear($, M.pts[6][0], M.pts[6][1]),
      t2: arcLengthNear($, M.pts[96][0], M.pts[96][1]),
      s4: arcLengthNear($, -8, 124.5),
      s5: arcLengthNear($, 18, 192.6),
    },
    yt = [
      [0, j.s1],
      [0.085, j.s1 + 4],
      [0.2, j.s2],
      [0.315, j.s2 + 0.3],
      [0.34, j.s2 + 40],
      [0.425, j.t1],
      [0.56, j.t2],
      [0.665, j.s4],
      [0.79, j.s4 + 1.5],
      [0.885, j.s5],
      [1, j.s5 + 3],
    ],
    Ht = [0.425, 0.56],
    Dt = yt.map((xt) => xt[0]),
    Wt = yt.map((xt) => xt[1]),
    tt = yt.map((xt, Ut) => monotoneSlope(Dt, Wt, Ut)),
    st = (xt) => {
      let Ut = clamp(xt, 0, 1),
        y = 0;
      for (; y < yt.length - 2 && Ut > Dt[y + 1];) y++;
      return hermite(Dt[y], Dt[y + 1], Wt[y], Wt[y + 1], tt[y], tt[y + 1], Ut);
    },
    P = [0, 0.2, 0.425, 0.665, 0.885],
    wt = (xt) =>
      xt < 0.2
        ? lerp(0, 0.12, xt / 0.2)
        : xt < 0.56
          ? lerp(0.12, 0.45, (xt - 0.2) / 0.36)
          : xt < 0.8
            ? lerp(0.45, 0.78, (xt - 0.56) / 0.24)
            : lerp(0.78, 1, smoothstep(clamp((xt - 0.8) / 0.085, 0, 1))),
    at = new Vector3(),
    gt = new Vector3(0, 1, 0),
    lt = { p: new Vector3(), f: new Vector3(), r: new Vector3() },
    bt = (xt, Ut, y) => ({ rel: [xt, Ut, y] }),
    ht = (xt, Ut, y) => ({ abs: [xt, Ut, y] }),
    A = [
      { u: 0, pos: ht(321.2, 0.7, 211.4), tgt: ht(330, 0.95, 205.7), fov: 34 },
      { u: 0.085, pos: ht(320.2, 0.74, 211.6), tgt: ht(326.2, 0.92, 205.8), fov: 34 },
      { u: 0.115, pos: bt(-1.5, 1.25, -5.5), tgt: bt(0.5, 0.85, 0), fov: 38 },
      { u: 0.15, pos: bt(-9, 2.4, -7), tgt: bt(3, 0.8, 0), fov: 38 },
      { u: 0.18, pos: bt(-5.5, 1.8, -7.2), tgt: bt(1, 0.9, 0), fov: 39 },
      { u: 0.2, pos: ht(-65.3, 1.5, 197.5), tgt: ht(-58.3, 1, 187), fov: 40 },
      { u: 0.315, pos: ht(-64.6, 1.55, 197.3), tgt: ht(-58.4, 1, 187.1), fov: 40 },
      { u: 0.345, pos: ht(-120, 60, 330), tgt: ht(-140, 0, 120), fov: 44 },
      { u: 0.375, pos: ht(40, 620, 560), tgt: ht(-10, 0, 40), fov: 46 },
      { u: 0.4, pos: ht(-380, 220, 420), tgt: ht(-520, 0, 120), fov: 42 },
      { u: 0.425, pos: bt(4, 1.6, -11), tgt: bt(0.3, 0.7, 0), fov: 38 },
      { u: 0.56, pos: bt(1, 1.7, -11.5), tgt: bt(0.6, 0.7, 0), fov: 38 },
      { u: 0.59, pos: bt(-12, 3.2, -4), tgt: bt(6, 1, 0), fov: 40 },
      { u: 0.635, pos: bt(-11, 3, 4), tgt: bt(5, 1, 0), fov: 40 },
      { u: 0.665, pos: ht(-2.6, 1.3, 133.4), tgt: ht(-7.8, 0.75, 124.3), fov: 36 },
      { u: 0.79, pos: ht(-1.6, 1.32, 133), tgt: ht(-6.6, 0.75, 124.3), fov: 36 },
      { u: 0.815, pos: bt(-8, 2, 5), tgt: bt(3, 0.9, 0), fov: 38 },
      { u: 0.84, pos: bt(-4, 2.2, 7), tgt: bt(2, 0.9, 0), fov: 40 },
      { u: 0.865, pos: bt(6.5, 1.25, 4.5), tgt: bt(0, 0.8, 0), fov: 37 },
      { u: 0.885, pos: ht(10.6, 1.12, 188.4), tgt: ht(18, 0.8, 192.4), fov: 36 },
      { u: 1, pos: ht(9.2, 1.1, 188.9), tgt: ht(15.6, 0.8, 192.4), fov: 35 },
    ],
    E = (xt, Ut) => {
      let y = xt[Ut];
      if (y.abs) return at.set(...y.abs).clone();
      let [O, V, W] = y.rel;
      return lt.p
        .clone()
        .addScaledVector(lt.f, O)
        .addScaledVector(lt.r, W)
        .setY(V + lt.p.y);
    },
    X = A.map((xt) => xt.u),
    K = [[], [], [], [], [], [], []];
  function ct(xt, Ut, y) {
    let O = clamp(xt, 0, 1),
      V = 0;
    for (; V < A.length - 2 && O > X[V + 1];) V++;
    for (let B = Math.max(0, V - 1); B <= Math.min(A.length - 1, V + 2); B++) {
      let pt = E(A[B], 'pos'),
        St = E(A[B], 'tgt');
      ((K[0][B] = pt.x),
        (K[1][B] = pt.y),
        (K[2][B] = pt.z),
        (K[3][B] = St.x),
        (K[4][B] = St.y),
        (K[5][B] = St.z),
        (K[6][B] = A[B].fov));
    }
    let W = (B) =>
      hermite(
        X[V],
        X[V + 1],
        K[B][V],
        K[B][V + 1],
        monotoneSlope(X, K[B], V),
        monotoneSlope(X, K[B], V + 1),
        O,
      );
    return (Ut.set(W(0), W(1), W(2)), y.set(W(3), W(4), W(5)), W(6));
  }
  let et = new Vector3(),
    Lt = new Vector3();
  function nt(xt, Ut) {
    let y = (u.shadow.camera.right - u.shadow.camera.left) / u.shadow.mapSize.x;
    (et.crossVectors(gt, Ut),
      et.lengthSq() < 1e-8 && et.set(1, 0, 0),
      et.normalize(),
      Lt.crossVectors(Ut, et).normalize());
    let O = Math.round(xt.dot(et) / y) * y,
      V = Math.round(xt.dot(Lt) / y) * y,
      W = xt.dot(Ut);
    return xt.set(0, 0, 0).addScaledVector(et, O).addScaledVector(Lt, V).addScaledVector(Ut, W);
  }
  let vt = 0.26,
    It = 0;
  function ut(xt, Ut, y) {
    let O = 2 / vt,
      V = O * y,
      W = 1 / (1 + V + 0.48 * V * V + 0.235 * V * V * V),
      B = xt - Ut,
      pt = (It + O * B) * y;
    It = (It - O * pt) * W;
    let St = Ut + (B + pt) * W;
    return (Ut - xt > 0 == St > Ut && ((St = Ut), (It = 0)), St);
  }
  let _t = 0,
    Et = 0,
    Ot = 0,
    Ct = !1,
    $t = performance.now(),
    Vt = 0,
    se = !1,
    H = j.s1,
    Mt = 0,
    Q = 0,
    ot = 0,
    Rt = 0,
    At = 0,
    qt = 0,
    ue = 0,
    Me = new Vector3(),
    ee = new Vector3(),
    He = !1,
    Qe = !0,
    ni = 0,
    fn = 0,
    ke = 0,
    ii = 0,
    Ci = 0,
    Rw = 0,
    Rh = 0,
    Rdw = 0,
    Rdh = 0,
    Ro =
      typeof ResizeObserver == 'function'
        ? new ResizeObserver((xt) => {
            for (let Ut of xt) {
              ((Rw = Ut.contentRect.width), (Rh = Ut.contentRect.height));
              let y = Ut.devicePixelContentBoxSize && Ut.devicePixelContentBoxSize[0];
              ((Rdw = y ? y.inlineSize : 0), (Rdh = y ? y.blockSize : 0));
            }
          })
        : null,
    Rob = (() => {
      if (Ro)
        try {
          Ro.observe(i, { box: 'device-pixel-content-box' });
        } catch {
          Ro.observe(i);
        }
    })(),
    ar = () => {
      if (!Ro || !Rw) {
        let xt = i.getBoundingClientRect();
        ((Rw = xt.width), (Rh = xt.height));
      }
      let xt = window.devicePixelRatio || 1,
        Ut = Math.min(xt, Rc) * Rk,
        y,
        O;
      Rdw && Ut >= xt - 0.001 && Math.abs(Rdw - Rw * xt) <= 2 && Math.abs(Rdh - Rh * xt) <= 2
        ? ((y = Rdw), (O = Rdh))
        : ((y = Math.max(1, Math.round(Rw * Ut))), (O = Math.max(1, Math.round(Rh * Ut))));
      (y !== fn || O !== ke) &&
        ((fn = y), (ke = O), o.setSize(fn, ke, !1), (l.aspect = fn / ke), l.updateProjectionMatrix());
    },
    pn = { p: new Vector3(), t: new Vector3() };
  function si(xt) {
    let Ut = clamp(xt / it, 0, 1);
    return ($.getPointAt(Ut, pn.p), $.getTangentAt(Ut, pn.t), pn);
  }
  function Ii(xt) {
    let y = si(Math.max(0, xt - 2.5)).t.clone(),
      O = si(Math.min(it, xt + 2.5)).t.clone(),
      V = Math.atan2(y.z, y.x),
      W = Math.atan2(O.z, O.x);
    return Math.atan2(Math.sin(W - V), Math.cos(W - V)) / (2 * 2.5);
  }
  function Pi(xt) {
    ni = requestAnimationFrame(Pi);
    let Ut = Math.min(0.05, (xt - $t) / 1e3);
    if ((($t = xt), (Vt += Ut), !Qe)) return;
    (ar(),
      Ct || ((Ot += Ut / 2.6), (Ot >= 1 || _t > 0.01) && ((Ot = 1), (Ct = !0))),
      (Et = ut(Et, _t, Ut)),
      se && ((Et = _t), (It = 0)));
    let y = easeInOutCubic(clamp(Ot, 0, 1)),
      O = st(Et);
    Ot < 1 && (O = lerp(j.s1 - 120, O, 1 - Math.pow(1 - clamp(Ot, 0, 1), 3)));
    let V = O - H;
    ((H = O), (ue += V));
    let W = V / Math.max(Ut, 0.001);
    Mt += (W - Mt) * (1 - Math.exp(-Ut * 5));
    let B = (Mt - Q) / Math.max(Ut, 0.001);
    Q = Mt;
    let pt = si(O).p.clone(),
      St = pn.t.clone(),
      Bt = Math.atan2(-St.z, St.x),
      Nt = Ii(O),
      Xt = clamp(Math.atan(2.56 * Nt) * Math.sign(Mt || 1) * 1.6, -0.5, 0.5);
    ot += (Xt - ot) * (1 - Math.exp(-Ut * 8));
    let Yt = clamp(Mt * Mt * Nt, -14, 14);
    ((Rt += (clamp(-Yt * 0.0045, -0.045, 0.045) - Rt) * (1 - Math.exp(-Ut * 6))),
      (At += (clamp(-B * 0.0016, -0.03, 0.03) - At) * (1 - Math.exp(-Ut * 5))),
      (qt = Math.sin(Vt * 13) * 0.0025 * clamp(Math.abs(Mt) / 30, 0, 1) + Math.sin(Vt * 2.1) * 0.0015),
      G.root.position.copy(pt),
      (G.root.rotation.y = Bt),
      G.pose({ dist: ue, steer: ot, roll: Rt, pitch: At, heave: qt, speed: Math.abs(Mt) }),
      lt.p.copy(pt),
      lt.f.copy(St).setY(0).normalize(),
      lt.r.crossVectors(lt.f, gt).normalize());
    let Ft = 1 - smoothstep(clamp(Math.abs(Et - 0.26) / 0.1 - 0.6, 0, 1));
    for (let ce of [Y, q, rt]) ce.visible = Ft > 0.01;
    if (Ft > 0.01) {
      let ce = si(j.s2).p.clone(),
        Ve = pn.t,
        qe = new Vector3(Ve.x, 0, Ve.z).normalize(),
        on = new Vector3().crossVectors(qe, gt);
      (Y.position.copy(ce).addScaledVector(qe, 1.3).addScaledVector(on, -1.55),
        (Y.rotation.y = Math.atan2(-on.z, on.x)),
        (Y.userData.armR.rotation.z = 0.9 + Math.sin(Vt * 2.4) * 0.12),
        q.position.copy(ce).addScaledVector(qe, -3.6).addScaledVector(on, 1.6),
        (q.rotation.y = Math.atan2(-(-on.z), -on.x) + 0.4),
        (q.userData.head.rotation.y = Math.sin(Vt * 0.7) * 0.15),
        rt.position.set(k.x + 1.85, 0, k.z - 7),
        (rt.rotation.y = Math.atan2(-(ce.z - rt.position.z), ce.x - rt.position.x)));
    }
    let jt = Et > 0.6 && Et < 0.87;
    for (let [ce] of z) ce.visible = jt;
    jt && (z[0][0].userData.head.rotation.y = Math.sin(Vt * 0.5) * 0.2);
    let re = wt(Et),
      Kt = sampleTimeOfDay(re),
      Ce = MathUtils.degToRad(Kt.sunEl),
      ne = MathUtils.degToRad(Kt.sunAz),
      zt = new Vector3(Math.sin(ne) * Math.cos(Ce), Math.sin(Ce), -Math.cos(ne) * Math.cos(Ce)).normalize();
    (u.color.set(Kt.sun),
      (u.intensity = Kt.sunI),
      d.color.set(Kt.sky),
      d.groundColor.set(Kt.gnd),
      (d.intensity = Kt.hemiI),
      h.uniforms.zen.value.set(Kt.zen),
      h.uniforms.hor.value.set(Kt.hor),
      h.uniforms.sunDir.value.copy(zt),
      h.uniforms.sunCol.value.set(Kt.sun),
      c.fog.color.set(Kt.fog),
      (o.toneMappingExposure = Kt.exp),
      Math.abs(re - T) > x && C(re));
    let Le = new Vector3(),
      te = new Vector3(),
      be = ct(Et, Le, te);
    if (
      (Nn.debugCam && (Le.set(...Nn.debugCam.pos), te.set(...Nn.debugCam.tgt), (be = Nn.debugCam.fov || be)),
      y < 1)
    ) {
      let ce = new Vector3(346, 0.5, 214.4);
      (Le.lerpVectors(ce, Le, y), (be = lerp(30, be, y)));
    }
    let Fn = Math.sin(Vt * 0.23) * 0.12;
    ((Le.y += Fn * 0.3), Me.copy(Le), ee.copy(te));
    let De = Math.max(1, Math.sqrt(1.6 / l.aspect));
    (De > 1 && (be = (2 * Math.atan(Math.tan((be * Math.PI) / 360) * Math.min(2.2, De)) * 180) / Math.PI),
      l.position.copy(Me),
      l.lookAt(ee),
      (l.fov = be),
      ii || Ci ? l.setViewOffset(fn, ke, -ii * fn, Ci * ke, fn, ke) : l.clearViewOffset(),
      l.updateProjectionMatrix());
    let mn = ee.clone();
    (Me.y > 40 && mn.copy(lt.p),
      nt(mn, zt),
      u.position.copy(mn).addScaledVector(zt, 400),
      u.target.position.copy(mn));
    let ae = clamp((Et - 0.336) / 0.05, 0, 1),
      je = 1 - clamp((Et - 0.386) / 0.018, 0, 1);
    ((R.opacity = Math.min(1, ae * 4) * je * 0.95),
      (F.visible = R.opacity > 0.01),
      I.setDrawRange(0, Math.floor((D * smoothstep(ae)) / 3) * 3),
      Z.update(Vt, Ut));
    let On = b
      ? smoothstep(clamp((Et - 0.39) / 0.035, 0, 1)) * (1 - smoothstep(clamp((Et - 0.565) / 0.035, 0, 1)))
      : 0;
    if (
      (l.updateMatrixWorld(),
      b && b.vp.multiplyMatrices(l.projectionMatrix, l.matrixWorldInverse),
      On > 0.002 && b && b.ok)
    )
      try {
        o.getDrawingBufferSize(b.size);
        let ce = b.size.x,
          Ve = b.size.y;
        ((b.rt.width !== ce || b.rt.height !== Ve) && (b.rt.setSize(ce, Ve), b.maskRT.setSize(ce, Ve)),
          o.setRenderTarget(b.rt),
          o.render(c, l));
        let qe = o.shadowMap.autoUpdate;
        o.shadowMap.autoUpdate = !1;
        let on = c.overrideMaterial,
          Jh = c.background;
        ((c.overrideMaterial = b.maskMat),
          l.layers.set(1),
          o.setRenderTarget(b.maskRT),
          o.setClearColor(0, 1),
          o.clear(),
          o.render(c, l),
          l.layers.set(0),
          (c.overrideMaterial = on),
          (c.background = Jh),
          (o.shadowMap.autoUpdate = qe),
          b.mat.uniforms.uInvVP.value.copy(b.vp).invert(),
          b.mat.uniforms.uPrevVP.value.copy(b.prev),
          (b.mat.uniforms.uAmt.value = On * 0.35),
          o.setRenderTarget(null),
          o.render(b.pScene, b.pCam));
      } catch {
        ((b.ok = !1), o.setRenderTarget(null), o.render(c, l));
      }
    else o.render(c, l);
    b && b.prev.copy(b.vp);
  }
  C(0);
  let Li = Math.min(s === 'high' ? 16 : s === 'mid' ? 8 : 2, o.capabilities.getMaxAnisotropy());
  (Li > 1 &&
    c.traverse((xt) => {
      if (xt.material)
        for (let Ut of [].concat(xt.material))
          for (let y of [
            'map',
            'normalMap',
            'roughnessMap',
            'metalnessMap',
            'aoMap',
            'bumpMap',
            'alphaMap',
          ]) {
            let O = Ut[y];
            O &&
              O.isTexture &&
              !O.isRenderTargetTexture &&
              O.anisotropy < Li &&
              ((O.anisotropy = Li), (O.needsUpdate = !0));
          }
    }),
    c.traverse((xt) => {
      if (xt.material)
        for (let Ut of [].concat(xt.material))
          (Ut.isMeshStandardMaterial ||
            Ut.isMeshBasicMaterial ||
            Ut.isMeshLambertMaterial ||
            Ut.isMeshPhongMaterial) &&
            (Ut.dithering = !0);
    }),
    r(1));
  let Nn = {
    renderer: o,
    scene: c,
    camera: l,
    car: G,
    world: Z,
    STAGES: P,
    setProgress(xt) {
      _t = clamp(xt, 0, 1);
    },
    get progress() {
      return Et;
    },
    skipIntro() {
      ((Ot = 1), (Ct = !0));
    },
    jump(xt) {
      ((_t = Et = clamp(xt, 0, 1)), (It = 0), (H = st(Et)), (Ot = 1), (Ct = !0));
    },
    async warmup() {
      let xt = [];
      c.traverse((y) => {
        y.visible || (xt.push(y), (y.visible = !0));
      });
      try {
        o.compileAsync && o.extensions.has('KHR_parallel_shader_compile')
          ? await o.compileAsync(c, l)
          : o.compile(c, l);
      } catch {}
      for (let y of xt) y.visible = !1;
      let Ut = [Et, H, ue, Ot, Ct];
      for (let y of [0.26, 0.37, 0.47, 0.7, 0.95])
        (Nn.renderAt(y), await new Promise((O) => requestAnimationFrame(O)));
      (([Et, H, ue, Ot, Ct] = Ut), (_t = Et), (It = 0), (Mt = Q = 0), (se = !1));
    },
    setFraming(xt = 0, Ut = 0) {
      ((ii = xt), (Ci = Ut));
    },
    start() {
      He || ((He = !0), (se = !1), ($t = performance.now()), (ni = requestAnimationFrame(Pi)));
    },
    stop() {
      ((He = !1), cancelAnimationFrame(ni));
    },
    setVisible(xt) {
      Qe = xt;
    },
    renderAt(xt, { intro: Ut = 1, speed: y = null, dt: O = 0 } = {}) {
      ((_t = Et = xt),
        (It = 0),
        (Ot = Ut),
        (Ct = Ut >= 1),
        (se = !0),
        O || (H = st(xt)),
        y != null && (Mt = y),
        ($t = performance.now() - O * 1e3),
        Pi(performance.now()),
        cancelAnimationFrame(ni));
    },
    debugCam: null,
    setResScale(xt) {
      Rk = clamp(xt, 0.2, 1);
    },
    get resScale() {
      return Rk;
    },
    get basePixelRatio() {
      return Math.min(window.devicePixelRatio || 1, Rc);
    },
  };
  return Nn;
}

export { createJourney };
