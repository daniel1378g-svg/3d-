// Hero-car wheels: four wheels drawn as instanced parts (one draw call per part for all four).
//
// Wheel frame ("right-hand wheel"): metres, the axle along z, the outer face towards +z, the wheel
// centre at the origin. Left-hand wheels use the same geometry turned half a turn about y, so they
// roll the other way round in their own frame (see wheelMatrices). Rear tyres are 1.7 % larger than
// the front ones (hero-car.json): each instance is scaled by its radius / REFERENCE_RADIUS.
//
// Parts (shared geometry and material, 4 instances each):
//   rolling  tyre (rubber, moulded sidewall), rim face (10 spokes, metal), rim barrel with a lip,
//            centre-lock nut, ventilated brake disc with grooves, disc bell, dark backing disc
//   steered  brake caliper (red, ahead of the front axle, behind the rear one), speed-blur disc
import {
  CanvasTexture,
  CircleGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  InstancedMesh,
  LatheGeometry,
  Matrix4,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Path,
  Quaternion,
  RepeatWrapping,
  RingGeometry,
  SRGBColorSpace,
  Shape,
  SplineCurve,
  Vector2,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const ACCENT_RED = 0xe93325;

/** Tyre radius the shared geometry is built for (metres); instances scale from it. */
const REFERENCE_RADIUS = 0.41;
/** Rim radius as a fraction of the tyre radius (18-inch rim in a 660 mm tyre). */
const RIM_RATIO = 0.69;

// --- procedural textures ------------------------------------------------------------------------

/** Canvas texture helper (sRGB colour unless `data`; repeats round the wheel in u unless `clamp`). */
function canvasTexture(width, height, draw, { data = false, clamp = false } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new CanvasTexture(canvas);
  if (!data) texture.colorSpace = SRGBColorSpace;
  if (!clamp) texture.wrapS = RepeatWrapping;
  return texture;
}

/** Deterministic pseudo-random sequence (the wheels look the same on every load). */
function random(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

/**
 * Tyre textures in the lathe's uv space: u runs once round the tyre, v along the profile from the
 * inner bead (v 0) over the tread to the outer bead (v 1). `height` (bump) holds the moulded
 * sidewall: a rim-protector rib, two raised rings and blocks of raised "lettering" on the outer
 * sidewall; `color` holds the faint grey of those mouldings and scuffed rubber on the tread.
 */
function tyreTextures(profileV) {
  const W = 1024;
  const H = 128;
  const { beadIn, sideIn, treadIn, treadOut, sideOut, beadOut } = profileV;
  const y = (v) => (1 - v) * H; // CanvasTexture flipY: v 0 is the bottom row
  const drawSidewall = (ctx, from, to, lettering, rand, rubber) => {
    // protector rib near the rim and two thin rings at 30 % and 85 % of the sidewall
    const at = (f) => y(from + (to - from) * f);
    ctx.fillStyle = rubber(1);
    ctx.fillRect(0, Math.min(at(0.06), at(0.16)), W, Math.abs(at(0.16) - at(0.06)));
    ctx.fillRect(0, Math.min(at(0.3), at(0.33)), W, Math.max(1, Math.abs(at(0.33) - at(0.3))));
    ctx.fillRect(0, Math.min(at(0.85), at(0.88)), W, Math.max(1, Math.abs(at(0.88) - at(0.85))));
    if (!lettering) return;
    // two arcs of raised blocks between the rings (stylised lettering, no real brand)
    const top = Math.min(at(0.42), at(0.72));
    const h = Math.abs(at(0.72) - at(0.42));
    for (const start of [0.06, 0.56]) {
      let u = start * W;
      const end = (start + 0.3) * W;
      while (u < end) {
        const w = 6 + rand() * 14;
        if (rand() > 0.18) ctx.fillRect(u, top + h * 0.1, w, h * (0.6 + rand() * 0.3));
        u += w + 3 + (rand() > 0.8 ? 12 : 0);
      }
    }
  };
  const height = canvasTexture(
    W,
    H,
    (ctx) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      const rand = random(7);
      const raised = () => '#fff';
      drawSidewall(ctx, beadIn, sideIn, false, rand, raised);
      drawSidewall(ctx, beadOut, sideOut, true, rand, raised);
    },
    { data: true },
  );
  const color = canvasTexture(W, H, (ctx) => {
    ctx.fillStyle = '#1c1c1e';
    ctx.fillRect(0, 0, W, H);
    // scuffed tread: faint lighter streaks around the circumference
    const rand = random(11);
    for (let i = 0; i < 160; i++) {
      const v = treadIn + (treadOut - treadIn) * rand();
      ctx.fillStyle = `rgba(70,68,66,${0.05 + rand() * 0.08})`;
      ctx.fillRect(rand() * W, y(v), 40 + rand() * 200, 1);
    }
    const rand2 = random(7);
    const grey = (a) => () => `rgba(128,128,130,${a})`;
    drawSidewall(ctx, beadIn, sideIn, false, rand2, grey(0.25));
    drawSidewall(ctx, beadOut, sideOut, true, rand2, grey(0.6));
  });
  return { color, height };
}

/**
 * Brake disc face, planar-mapped (the ring geometry's uv spans the disc's bounding square): a
 * machined grey annulus with faint wear rings and 36 curved cooling grooves.
 */
function discTexture(innerFraction) {
  return canvasTexture(
    512,
    512,
    (ctx, W) => {
      const c = W / 2;
      ctx.fillStyle = '#b4b4b2';
      ctx.fillRect(0, 0, W, W);
      const rand = random(3);
      for (let i = 0; i < 40; i++) {
        ctx.strokeStyle = `rgba(${rand() > 0.5 ? '255,255,255' : '60,60,60'},${0.05 + rand() * 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(c, c, c * (innerFraction + (1 - innerFraction) * rand()), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(28,28,28,0.9)';
      ctx.lineWidth = 4;
      const r0 = c * (innerFraction + 0.12);
      const r1 = c * 0.95;
      for (let i = 0; i < 36; i++) {
        const a = (i / 36) * Math.PI * 2;
        ctx.beginPath();
        for (let k = 0; k <= 8; k++) {
          const t = k / 8;
          const r = r0 + (r1 - r0) * t;
          const b = a + t * 0.35; // swept groove
          k
            ? ctx.lineTo(c + r * Math.cos(b), c + r * Math.sin(b))
            : ctx.moveTo(c + r * Math.cos(b), c + r * Math.sin(b));
        }
        ctx.stroke();
      }
    },
    { clamp: true },
  );
}

/** Radial grey gradient that reads as a spinning rim when faded in over the wheel. */
function blurTexture() {
  return canvasTexture(
    256,
    256,
    (ctx) => {
      const centre = 128;
      const gradient = ctx.createRadialGradient(centre, centre, 0, centre, centre, centre);
      gradient.addColorStop(0, 'rgba(150,156,162,1)');
      gradient.addColorStop(0.18, 'rgba(70,74,79,.95)');
      gradient.addColorStop(0.32, 'rgba(48,51,55,.75)');
      gradient.addColorStop(0.7, 'rgba(58,61,66,.62)');
      gradient.addColorStop(0.86, 'rgba(92,96,101,.8)');
      gradient.addColorStop(0.95, 'rgba(36,38,41,.95)');
      gradient.addColorStop(1, 'rgba(20,21,23,1)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centre, centre, centre, 0, Math.PI * 2);
      ctx.fill();
    },
    { clamp: true },
  );
}

// --- geometry -------------------------------------------------------------------------------------

/**
 * Tyre carcass: a smooth sidewall/tread profile in (radius, axial) coordinates revolved around the
 * axle, from the inner bead (just outside the rim) over the rounded shoulders and a slightly
 * crowned tread to the outer bead. Returns the geometry and where the profile's parts fall in v.
 */
function tyreGeometry(outerRadius, width, rimRadius) {
  const halfWidth = width / 2;
  const knots = [
    [rimRadius + 0.01, -halfWidth + 0.018],
    [rimRadius + 0.05, -halfWidth - 0.004],
    [outerRadius - 0.09, -halfWidth - 0.012],
    [outerRadius - 0.035, -halfWidth - 0.006],
    [outerRadius - 0.008, -halfWidth + 0.02],
    [outerRadius, -halfWidth + 0.055],
    [outerRadius + 0.002, 0],
    [outerRadius, halfWidth - 0.055],
    [outerRadius - 0.008, halfWidth - 0.02],
    [outerRadius - 0.035, halfWidth + 0.006],
    [outerRadius - 0.09, halfWidth + 0.012],
    [rimRadius + 0.05, halfWidth + 0.004],
    [rimRadius + 0.01, halfWidth - 0.018],
  ];
  const points = new SplineCurve(knots.map(([radius, axial]) => new Vector2(radius, axial))).getPoints(40);
  // v of each profile part: the spline passes knot k at t = k / (knots - 1)
  const at = (k) => k / (knots.length - 1);
  const geometry = new LatheGeometry(points, 56);
  // LatheGeometry revolves around y; rotateX(+90°) turns the axle onto z and puts the +halfWidth end
  // of the profile (v 1, the outer sidewall) at +z
  geometry.rotateX(Math.PI / 2);
  return {
    geometry,
    profileV: {
      beadIn: at(0),
      sideIn: at(3),
      treadIn: at(5),
      treadOut: at(7),
      sideOut: at(9),
      beadOut: at(12),
    },
  };
}

/**
 * Rim face: a disc with `spokeCount` window cut-outs between 0.4 r and 0.86 r, extruded 35 mm with a
 * small bevel; its outer face sits at z = 0 and it extends towards -z.
 */
function rimFaceGeometry(radius, spokeCount = 10) {
  const disc = new Shape();
  disc.absarc(0, 0, radius, 0, Math.PI * 2, false);
  const windowOuter = radius * 0.86;
  const hubRadius = radius * 0.32;
  const pitch = (Math.PI * 2) / spokeCount;
  for (let spoke = 0; spoke < spokeCount; spoke++) {
    const startAngle = spoke * pitch + pitch * 0.17;
    const endAngle = (spoke + 1) * pitch - pitch * 0.17;
    const cutout = new Path();
    cutout.moveTo(Math.cos(startAngle) * hubRadius * 1.25, Math.sin(startAngle) * hubRadius * 1.25);
    cutout.absarc(0, 0, windowOuter, startAngle + 0.04, endAngle - 0.04, false);
    cutout.lineTo(Math.cos(endAngle) * hubRadius * 1.25, Math.sin(endAngle) * hubRadius * 1.25);
    cutout.closePath();
    disc.holes.push(cutout);
  }
  const geometry = new ExtrudeGeometry(disc, {
    depth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 1,
    curveSegments: 20,
  });
  geometry.translate(0, 0, -0.035);
  return geometry;
}

/** Rim barrel: an open tube behind the face with a rolled lip at its outer edge (lathe, both sides drawn). */
function rimBarrelGeometry(rimRadius, width) {
  const inner = -width * 0.45;
  const outer = width / 2 - 0.03;
  const profile = [
    new Vector2(rimRadius * 0.97, inner),
    new Vector2(rimRadius * 0.99, inner + 0.01),
    new Vector2(rimRadius * 0.99, outer - 0.02),
    new Vector2(rimRadius * 1.03, outer - 0.006),
    new Vector2(rimRadius * 1.035, outer),
    new Vector2(rimRadius * 1.0, outer + 0.004),
  ];
  const geometry = new LatheGeometry(profile, 56);
  geometry.rotateX(Math.PI / 2);
  return geometry;
}

/** Brake disc: front and back annulus faces plus the outer edge, centred on z = 0. */
function brakeDiscGeometry(innerRadius, outerRadius, thickness) {
  const h = thickness / 2;
  const front = new RingGeometry(innerRadius, outerRadius, 64).translate(0, 0, h);
  const back = new RingGeometry(innerRadius, outerRadius, 64).rotateY(Math.PI).translate(0, 0, -h);
  const edge = new CylinderGeometry(outerRadius, outerRadius, thickness, 64, 1, true).rotateX(Math.PI / 2);
  const geometry = mergeGeometries([front, back, edge]);
  front.dispose();
  back.dispose();
  edge.dispose();
  return geometry;
}

/** Caliper: a block shaped as a ring sector hugging the disc rim, centred on +x, spanning `span` rad. */
function caliperGeometry(innerRadius, outerRadius, span, depth) {
  const shape = new Shape();
  shape.absarc(0, 0, outerRadius, -span / 2, span / 2, false);
  shape.absarc(0, 0, innerRadius, span / 2, -span / 2, true);
  shape.closePath();
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 16,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

// --- materials -------------------------------------------------------------------------------------

/**
 * Materials shared by the four wheels (and the wheel wells). `blur` starts fully transparent; the
 * car's pose() drives its opacity from speed.
 */
function wheelMaterials(tyreMaps) {
  return {
    rubber: new MeshStandardMaterial({
      name: 'tyre',
      color: 0xffffff,
      map: tyreMaps.color,
      bumpMap: tyreMaps.height,
      bumpScale: 2.5,
      roughness: 0.9,
      metalness: 0,
    }),
    rim: new MeshStandardMaterial({ name: 'rim', color: 0x8e949b, roughness: 0.32, metalness: 1 }),
    barrel: new MeshStandardMaterial({
      name: 'rim-barrel',
      color: 0x55595f,
      roughness: 0.38,
      metalness: 1,
      side: DoubleSide,
    }),
    nut: new MeshStandardMaterial({ name: 'wheel-nut', color: 0xc4c9ce, roughness: 0.22, metalness: 1 }),
    disc: new MeshStandardMaterial({
      name: 'brake-disc',
      color: 0x8b8e92,
      map: discTexture(0.45 / 0.82),
      roughness: 0.42,
      metalness: 1,
    }),
    bell: new MeshStandardMaterial({ name: 'disc-bell', color: 0x2d2e31, roughness: 0.5, metalness: 0.6 }),
    caliper: new MeshStandardMaterial({ name: 'caliper', color: ACCENT_RED, roughness: 0.35, metalness: 0 }),
    dark: new MeshBasicMaterial({ name: 'wheel-backing', color: 0x050506 }),
    well: new MeshStandardMaterial({
      name: 'wheel-well',
      color: 0x0d0d0e,
      roughness: 0.95,
      metalness: 0,
      side: DoubleSide,
    }),
    blur: new MeshStandardMaterial({
      name: 'wheel-blur',
      map: blurTexture(),
      transparent: true,
      opacity: 0,
      roughness: 0.35,
      metalness: 0.75,
      depthWrite: false,
    }),
  };
}

/**
 * Roll angle (radians about the wheel frame's z) of a wheel of `radius` metres after `distance`
 * metres along the path: exactly distance / radius, so the tread never slips or drifts and runs
 * backwards with the car. Forward roll is clockwise seen from +z (negative); left-hand wheel frames
 * face -z, so the same roll is positive in their own frame.
 */
function rollAngle(distance, radius, left) {
  return (left ? 1 : -1) * (distance / radius);
}

// --- the wheel set ------------------------------------------------------------------------------------

const KEYS = ['FL', 'FR', 'RL', 'RR'];

/**
 * Builds the four wheels.
 *
 * @param {object} options
 * @param {Record<'FL'|'FR'|'RL'|'RR', {x: number, r: number}>} options.layout axle x and tyre radius
 * @param {number} options.width tyre width (metres)
 * @param {number} options.centreZ lateral distance of the wheel centres from the centre line (metres)
 * @param {number} options.centreY offset added to each wheel-centre height (= r + centreY), metres
 * @returns {{ group: Group, materials: ReturnType<typeof wheelMaterials>, radius: Record<string, number>,
 *   update: (dist: number, steer: number) => void }}
 *   update(dist, steer): rolls every wheel by dist / its radius (radians) and steers the front pair
 */
function createWheels({ layout, width, centreZ, centreY = 0 }) {
  const rimRadius = REFERENCE_RADIUS * RIM_RATIO;
  const halfWidth = width / 2;
  const { geometry: tyre, profileV } = tyreGeometry(REFERENCE_RADIUS, width, rimRadius);
  const materials = wheelMaterials(tyreTextures(profileV));

  // geometry in the right-hand wheel frame, each part already at its place on the axle
  const rimFace = rimFaceGeometry(rimRadius * 0.985).translate(0, 0, halfWidth - 0.045);
  const barrel = rimBarrelGeometry(rimRadius, width);
  const nut = new CylinderGeometry(0.05, 0.058, 0.06, 6)
    .rotateX(Math.PI / 2)
    .translate(0, 0, halfWidth - 0.02);
  const discZ = halfWidth - 0.13;
  const discOuter = rimRadius * 0.82;
  const disc = brakeDiscGeometry(rimRadius * 0.45, discOuter, 0.032).translate(0, 0, discZ);
  const bell = new CylinderGeometry(rimRadius * 0.45, rimRadius * 0.45, 0.05, 32, 1, false)
    .rotateX(Math.PI / 2)
    .translate(0, 0, discZ + 0.04);
  const backing = new CircleGeometry(rimRadius * 0.99, 40).translate(0, 0, halfWidth - 0.2);
  const caliper = caliperGeometry(discOuter - 0.06, discOuter + 0.022, 0.75, 0.085).translate(0, 0, discZ);
  const blur = new CircleGeometry(rimRadius * 0.985, 48).translate(0, 0, halfWidth - 0.028);

  const group = new Group();
  group.name = 'wheels';
  const part = (
    name,
    geometry,
    material,
    { rolling = true, castShadow = false, receiveShadow = false } = {},
  ) => {
    const mesh = new InstancedMesh(geometry, material, 4);
    mesh.name = 'wheel-' + name;
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    mesh.userData.rolling = rolling;
    group.add(mesh);
    return mesh;
  };
  const rolling = [
    part('tyre', tyre, materials.rubber, { castShadow: true, receiveShadow: true }),
    part('rim', rimFace, materials.rim, { castShadow: true, receiveShadow: true }),
    part('barrel', barrel, materials.barrel),
    part('nut', nut, materials.nut),
    part('disc', disc, materials.disc),
    part('bell', bell, materials.bell),
    part('backing', backing, materials.dark),
  ];
  const caliperMesh = part('caliper', caliper, materials.caliper, { rolling: false });
  const blurMesh = part('blur', blur, materials.blur, { rolling: false });
  blurMesh.renderOrder = 3;

  // per wheel: centre, scale, side; scratch objects for the per-frame matrices
  const wheels = KEYS.map((key) => ({
    key,
    front: key[0] === 'F',
    left: key[1] === 'L',
    r: layout[key].r,
    centre: new Vector3(layout[key].x, layout[key].r + centreY, (key[1] === 'R' ? 1 : -1) * centreZ),
    scale: layout[key].r / REFERENCE_RADIUS,
  }));
  const radius = Object.fromEntries(wheels.map((w) => [w.key, w.r]));
  // caliper angle in the wheel frame: front calipers ahead of the axle (+x), rear ones behind it; the
  // left-hand wheels' frames face backwards, which mirrors the angle
  const CALIPER_ANGLE = 0.55;
  const caliperTurn = wheels.map((w) => {
    const ahead = w.front !== w.left;
    return new Matrix4().makeRotationZ(ahead ? CALIPER_ANGLE : Math.PI - CALIPER_ANGLE);
  });
  const qSteer = new Quaternion();
  const qSpin = new Quaternion();
  const qSide = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI);
  const q = new Quaternion();
  const s = new Vector3();
  const steered = new Matrix4();
  const rolled = new Matrix4();
  const Y = new Vector3(0, 1, 0);
  const Z = new Vector3(0, 0, 1);

  function update(dist, steer) {
    for (let i = 0; i < 4; i++) {
      const w = wheels[i];
      const roll = rollAngle(dist, w.r, w.left);
      qSteer.setFromAxisAngle(Y, w.front ? steer : 0);
      q.copy(qSteer);
      if (w.left) q.multiply(qSide);
      s.setScalar(w.scale);
      steered.compose(w.centre, q, s);
      qSpin.setFromAxisAngle(Z, roll);
      q.multiply(qSpin);
      rolled.compose(w.centre, q, s);
      for (const mesh of rolling) mesh.setMatrixAt(i, rolled);
      blurMesh.setMatrixAt(i, steered);
      caliperMesh.setMatrixAt(i, steered.multiply(caliperTurn[i]));
    }
    for (const mesh of group.children) mesh.instanceMatrix.needsUpdate = true;
  }
  update(0, 0);
  for (const mesh of group.children) mesh.computeBoundingSphere();
  return { group, materials, radius, update };
}

export { createWheels, REFERENCE_RADIUS, rollAngle };
