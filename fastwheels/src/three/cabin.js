// Ambient lighting and starlight headliner for the M4 cabin. Geometry comes from measured data
// (src/three/cabin-data.js, produced by tools/bake-cabin.mjs): light lines that follow the real trim and
// star positions on the real headliner. Everything here is off by default: the unlit cabin has no decorative light.
import * as THREE from 'three';

const STRIP_VERT = /* glsl */ `
attribute float aT;
attribute float aSide;
varying float vT;
varying float vSide;
void main() { vT = aT; vSide = aSide; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const STRIP_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uLevel, uReveal, uGlow;
varying float vT;
varying float vSide;
void main() {
  float on = smoothstep(vT - 0.035, vT + 0.015, uReveal * 1.05) * uLevel;
  float across = 1.0 - abs(vSide);
  if (uGlow > 0.5) {
    float a = pow(across, 2.2) * on * 0.3;                       // soft spill on the trim next to the line
    gl_FragColor = vec4(uColor * a, a);
  } else {
    vec3 guide = vec3(0.035, 0.037, 0.042);                      // an unlit light guide: a thin dark-grey line
    vec3 lit = uColor * (1.6 + 2.2 * smoothstep(0.2, 1.0, across));
    gl_FragColor = vec4(mix(guide, lit, on), 1.0);
  }
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
const STAR_VERT = /* glsl */ `
attribute float aSize;
attribute float aBright;
attribute float aPhase;
attribute float aGate;
uniform float uLevel, uTime, uPx, uTwinkle, uMax;
varying float vI;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float on = smoothstep(aGate, aGate + 0.3, uLevel * 1.3);
  float tw = 1.0 + uTwinkle * 0.16 * sin(uTime * (0.5 + aPhase * 1.4) + aPhase * 40.0) * step(0.6, fract(aPhase * 7.31));
  vI = on * aBright * tw;
  gl_PointSize = clamp(aSize * uPx / -mv.z, 1.3, uMax);
}
`;
const STAR_FRAG = /* glsl */ `
uniform vec3 uColor;
varying float vI;
void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  float core = smoothstep(0.55, 0.0, r);
  float halo = smoothstep(1.0, 0.2, r) * 0.22;
  float a = (core + halo) * vI;
  if (a < 0.003) discard;
  gl_FragColor = vec4(mix(uColor, vec3(1.0), core * 0.45) * a, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

function ribbon(pts, order, width, lift) {
  const n = pts.length / 6;
  const pos = new Float32Array(n * 2 * 3), aT = new Float32Array(n * 2), aSide = new Float32Array(n * 2);
  const index = [];
  const P = (i) => new THREE.Vector3(pts[i * 6], pts[i * 6 + 1], pts[i * 6 + 2]);
  const N = (i) => new THREE.Vector3(pts[i * 6 + 3], pts[i * 6 + 4], pts[i * 6 + 5]);
  for (let i = 0; i < n; i++) {
    const p = P(i).addScaledVector(N(i), lift);
    const tangent = P(Math.min(n - 1, i + 1)).sub(P(Math.max(0, i - 1))).normalize();
    const side = tangent.cross(N(i)).normalize().multiplyScalar(width / 2);
    pos.set([p.x + side.x, p.y + side.y, p.z + side.z, p.x - side.x, p.y - side.y, p.z - side.z], i * 6);
    const t = order[0] + (order[1] - order[0]) * (i / (n - 1));
    aT.set([t, t], i * 2);
    aSide.set([1, -1], i * 2);
    if (i < n - 1) index.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aT', new THREE.BufferAttribute(aT, 1));
  g.setAttribute('aSide', new THREE.BufferAttribute(aSide, 1));
  g.setIndex(index);
  return g;
}

/**
 * @param car   the object returned by setupCar()
 * @param data  { strips, stars, anchors } from cabin-data.js
 */
export function createCabin(car, data, { tier = 'high', reducedMotion = false } = {}) {
  const color = new THREE.Color(0x3d6bff);
  const uniforms = { uColor: { value: color }, uLevel: { value: 0 }, uReveal: { value: 0 } };
  const lineMat = new THREE.ShaderMaterial({ vertexShader: STRIP_VERT, fragmentShader: STRIP_FRAG, uniforms: { ...uniforms, uGlow: { value: 0 } }, side: THREE.DoubleSide });
  const glowMat = new THREE.ShaderMaterial({ vertexShader: STRIP_VERT, fragmentShader: STRIP_FRAG, uniforms: { ...uniforms, uGlow: { value: 1 } }, side: THREE.DoubleSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, premultipliedAlpha: true });

  // The data was measured with the doors shut: attach everything in that pose, then restore.
  const doorPose = [car.doorLeft.rotation.y, car.doorRight.rotation.y];
  car.doorLeft.rotation.y = car.doorRight.rotation.y = 0;
  car.group.updateMatrixWorld(true);
  const parents = { body: car.group, door_L: car.doorLeft, door_R: car.doorRight };
  const zones = {};
  for (const s of data.strips) {
    const parent = parents[s.attach] || car.group;
    const holder = new THREE.Group();
    holder.name = 'ambient_' + s.id;
    const line = new THREE.Mesh(ribbon(s.pts, s.order, 0.006, 0.0005), lineMat);
    const glow = new THREE.Mesh(ribbon(s.pts, s.order, 0.085, 0.0002), glowMat);
    line.renderOrder = 3; glow.renderOrder = 2;
    line.frustumCulled = glow.frustumCulled = false;
    holder.add(glow, line);
    car.group.add(holder);
    if (parent !== car.group) parent.attach(holder);          // door lines swing with their door
    (zones[s.zone] ||= []).push(s);
  }

  // Coloured light spilling onto nearby surfaces. A few small point lights, no shadows.
  const A = data.anchors;
  const lights = [];
  const addLight = (at, offset, order, intensity, distance, parent = car.group) => {
    if (!at) return;
    const l = new THREE.PointLight(color, 0, distance, 2);
    l.position.set(at[0] + offset[0], at[1] + offset[1], at[2] + offset[2]);
    car.group.add(l);
    if (parent !== car.group) parent.attach(l);
    lights.push({ l, order, intensity });
  };
  addLight(A.dashFace, [-0.1, -0.02, -0.1], [0.12, 0.34], 0.22, 1.3);
  addLight(A.doorR, [0.0, 0.04, -0.1], [0.4, 0.64], 0.2, 1.3, car.doorRight);
  addLight(A.consoleTop, [0.05, -0.12, 0.3], [0.66, 0.86], 0.14, 1.0);
  if (tier !== 'low') {
    addLight(A.doorL, [0.0, 0.04, 0.1], [0.4, 0.64], 0.2, 1.3, car.doorLeft);
    addLight(A.consoleTop, [0.05, -0.12, -0.3], [0.66, 0.86], 0.14, 1.0);
    addLight(A.footwellR, [-0.05, 0.22, 0], [0.82, 1.0], 0.16, 1.1);
    addLight(A.footwellL, [-0.05, 0.22, 0], [0.82, 1.0], 0.16, 1.1);
  }

  // A dim neutral fill so the unlit cabin is readable (stands in for bounce light from the workshop).
  const fill = new THREE.PointLight(0xcfd6e6, 0, 2.6, 1.4);
  fill.position.set(-0.15, 1.15, -0.1);
  const fillLow = new THREE.PointLight(0xcfd6e6, 0, 1.8, 1.4);
  fillLow.position.set(0.1, 0.75, 0.05);
  car.group.add(fill, fillLow);

  // Starlight headliner.
  const count = data.stars.length / 3;
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(data.stars), 3));
  const aSize = new Float32Array(count), aBright = new Float32Array(count), aPhase = new Float32Array(count), aGate = new Float32Array(count);
  let seed = 977;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < count; i++) {
    const big = rnd();
    aSize[i] = big > 0.93 ? 6.0 : big > 0.7 ? 4.2 : 3.0;                       // three fibre gauges
    aBright[i] = (big > 0.93 ? 1.25 : 0.5 + rnd() * 0.55);
    aPhase[i] = rnd();
    aGate[i] = rnd() * 0.75;
  }
  starGeo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
  starGeo.setAttribute('aBright', new THREE.BufferAttribute(aBright, 1));
  starGeo.setAttribute('aPhase', new THREE.BufferAttribute(aPhase, 1));
  starGeo.setAttribute('aGate', new THREE.BufferAttribute(aGate, 1));
  const starColor = new THREE.Color(0xdfe8ff);
  const starMat = new THREE.ShaderMaterial({
    vertexShader: STAR_VERT, fragmentShader: STAR_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, premultipliedAlpha: true,
    uniforms: { uColor: { value: starColor }, uLevel: { value: 0 }, uTime: { value: 0 }, uPx: { value: 1 }, uMax: { value: 6 }, uTwinkle: { value: reducedMotion ? 0 : 1 } },
  });
  const stars = new THREE.Points(starGeo, starMat);
  stars.frustumCulled = false;
  stars.renderOrder = 4;
  stars.visible = false;
  car.group.add(stars);
  const starGlow = new THREE.PointLight(starColor, 0, 1.6, 2);              // the lit headliner faintly lights the seats
  if (A.headliner) starGlow.position.set(A.headliner[0], A.headliner[1] - 0.25, 0);
  car.group.add(starGlow);

  car.doorLeft.rotation.y = doorPose[0];
  car.doorRight.rotation.y = doorPose[1];
  car.group.updateMatrixWorld(true);

  const state = { level: 0, reveal: 0, brightness: 1, stars: 0 };
  const zoneOn = (order, reveal) => THREE.MathUtils.smoothstep(reveal * 1.05, order[0], order[1]);
  const apply = () => {
    uniforms.uLevel.value = state.level * (0.35 + 0.65 * state.brightness);
    uniforms.uReveal.value = state.reveal;
    for (const { l, order, intensity } of lights) l.intensity = intensity * state.level * state.brightness * zoneOn(order, state.reveal);
    starMat.uniforms.uLevel.value = state.stars;
    stars.visible = state.stars > 0.002;
    starGlow.intensity = 0.05 * state.stars;
  };

  return {
    starCount: count,
    /** color: hex / CSS colour; level 0..1 master; reveal 0..1 progress of the lines lighting up; brightness 0..1 user dimmer. */
    setAmbient({ color: c, level, reveal, brightness } = {}) {
      if (c !== undefined) { color.set(c); starColor.set(c).lerp(new THREE.Color(0xffffff), 0.5); }
      if (level !== undefined) state.level = level;
      if (reveal !== undefined) state.reveal = reveal;
      if (brightness !== undefined) state.brightness = brightness;
      apply();
    },
    setStars(level) { state.stars = level; apply(); },
    setFill(k) { fill.intensity = 0.55 * k; fillLow.intensity = 0.22 * k; },
    /** Per frame: twinkle and point size (pass the drawing-buffer height in pixels). */
    update(time, bufferHeight, fovDeg, pixelRatio = 1) {
      starMat.uniforms.uTime.value = time;
      starMat.uniforms.uPx.value = bufferHeight / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2)) * 0.0011;
      starMat.uniforms.uMax.value = 5.5 * pixelRatio;
    },
    get animating() { return state.stars > 0.002 && !reducedMotion; },
  };
}
