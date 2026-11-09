// Procedural Mediterranean tree and scrub models (docs/references.md §4.2), each in two levels of
// detail that share one vertex layout: position, normal, color (linear RGB, sRGB references
// converted), aLeaf (1 on foliage, 0 on bark). Both levels are indexed and merged into ONE geometry
// per species and level, so a species costs one draw per level.
//
//   species        size (before the ±20 % instance scale)           look
//   stonePine      trunk 10 m (forks into 3 limbs), umbrella crown   bark #6B4A35, crown #2F3A1C/#4E5A2C
//                  12 m wide and 3.4 m thick, flat underside
//   maritimePine   trunk 17 m, irregular crown in the top 8 m        crown #2E3A22
//   eucalyptus     pale trunk 26 m, nine limbs from 12–23 m, each   bark #C9C3B3 / #7A5E45, crown #4F5E48
//                  carrying two clumps: a narrow, open crown
//   holmOak        short trunk, dense round crown 8 m across          crown #2B3320
//   cypress        dark column 12 m tall, 2.6 m wide                  crown #263222
//   scrub          kermes oak / mastic mound 2.2 m across, 1 m high   #4A491F … #5A5A2A
//   pampas         grass clump with cream plumes (~3 m)               #6B6E35, plumes #E8DFCB
//
// Foliage is built from clumps (icosahedra, detail 1 near / 0 far, vertices jittered) whose normals
// are blended towards the direction from the crown centre ("crown normals"), so a crown shades as one
// soft volume and not as a pile of balls; vertex colours darken the underside and inside of the crown
// (baked ambient occlusion). Every clump hangs on bark: it contains a point of the trunk or of a
// branch, or overlaps a clump that does (attachedClumps(), checked by scripts/test-environment.mjs).
// The far level is a few coarse blobs (and a 3-sided trunk) with the same overall size and average
// colour (the eucalyptus: the near model's limb-end clumps, coarser), so the level switch
// (instanced-lod.js) does not change the tone. Model origin: the foot of the trunk on the ground; +y
// up. Deterministic (seeded rng).
import { BufferGeometry, Color, Float32BufferAttribute, IcosahedronGeometry, Vector3 } from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createRng } from '../util/rng.js';

const tmp = new Vector3();
const tmpColor = new Color();

/**
 * The parts of the model being built ({ clumps: [{ centre, radii, jitter }], tubes: [{ points,
 * radii }] }), recorded by clump() and tube() for the attachment check (no foliage clump may float:
 * scripts/test-environment.mjs, attachedClumps() below).
 */
let recording = null;

/** A unit icosahedron as an indexed geometry (positions only), cached per detail level. */
const unitBlobs = {};
function unitBlob(detail) {
  if (!unitBlobs[detail]) {
    const geometry = new IcosahedronGeometry(1, detail);
    geometry.deleteAttribute('uv');
    geometry.deleteAttribute('normal');
    unitBlobs[detail] = mergeVertices(geometry);
  }
  return unitBlobs[detail];
}

/** Writes the shared attribute layout onto a geometry: normals, colours, leaf flags (all arrays). */
function finish(positions, normals, colors, leaf, indices) {
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.setAttribute('aLeaf', new Float32BufferAttribute(leaf, 1));
  geometry.setIndex(indices);
  return geometry;
}

/**
 * A foliage clump: icosahedron of `detail` scaled by (rx, ry, rz) at `centre`, vertices jittered by
 * `jitter` × radius; normals blended (crownWeight) towards the direction from `crown` (the crown
 * centre, scaled by `crownScale` so flat crowns get flatter normals); colour `colour` darkened
 * towards the crown's underside (`aoBottom`, y below the crown centre) and its inside.
 */
function clump(
  rng,
  { centre, radii, detail, jitter = 0.18, colour, crown, crownScale, crownSize, aoBottom = 0.45 },
) {
  recording?.clumps.push({ centre, radii, jitter });
  const base = unitBlob(detail);
  const source = base.attributes.position;
  const positions = [];
  const normals = [];
  const colors = [];
  const leaf = [];
  const tint = 0.9 + rng() * 0.2;
  for (let i = 0; i < source.count; i++) {
    const ux = source.getX(i);
    const uy = source.getY(i);
    const uz = source.getZ(i);
    const j = 1 + (rng() - 0.5) * 2 * jitter;
    const x = centre[0] + ux * radii[0] * j;
    const y = centre[1] + uy * radii[1] * j;
    const z = centre[2] + uz * radii[2] * j;
    positions.push(x, y, z);
    // crown normal: from the crown centre, in the crown's own proportions
    tmp.set((x - crown[0]) / crownScale[0], (y - crown[1]) / crownScale[1], (z - crown[2]) / crownScale[2]);
    tmp.normalize();
    const own = [ux / radii[0], uy / radii[1], uz / radii[2]];
    const ol = Math.hypot(own[0], own[1], own[2]) || 1;
    const w = 0.65;
    tmp.set(
      tmp.x * w + (own[0] / ol) * (1 - w),
      tmp.y * w + (own[1] / ol) * (1 - w),
      tmp.z * w + (own[2] / ol) * (1 - w),
    );
    tmp.normalize();
    normals.push(tmp.x, tmp.y, tmp.z);
    // occlusion: underside of the crown and its inside are darker
    const below = Math.max(0, Math.min(1, (crown[1] - y) / crownSize[1] + 0.35));
    const inner = 1 - Math.min(1, Math.hypot((x - crown[0]) / crownSize[0], (z - crown[2]) / crownSize[2]));
    const ao = (1 - aoBottom * below) * (1 - 0.3 * inner) * tint;
    tmpColor.set(colour);
    colors.push(tmpColor.r * ao, tmpColor.g * ao, tmpColor.b * ao);
    leaf.push(1);
  }
  return finish(positions, normals, colors, leaf, Array.from(base.index.array));
}

/**
 * A tapered tube along a polyline of [x, y, z] points with radii per point, `sides` around, no
 * caps; bark colour darkening towards the foot (mossy, dusty) and an optional second colour in
 * vertical streaks (eucalyptus bark).
 */
function tube(points, radii, sides, colour, streakColour = null, rng = null) {
  recording?.tubes.push({ points, radii });
  const positions = [];
  const normals = [];
  const colors = [];
  const leaf = [];
  const indices = [];
  const a = new Color(colour);
  const b = streakColour != null ? new Color(streakColour) : a;
  const streaks = [];
  for (let s = 0; s <= sides; s++) streaks.push(streakColour != null && rng && rng() < 0.4 ? 1 : 0);
  for (let p = 0; p < points.length; p++) {
    const [x, y, z] = points[p];
    const next = points[Math.min(points.length - 1, p + 1)];
    const prev = points[Math.max(0, p - 1)];
    const dir = tmp.set(next[0] - prev[0], next[1] - prev[1], next[2] - prev[2]).normalize();
    // a frame perpendicular to the tube direction
    const ux = Math.abs(dir.y) < 0.99 ? new Vector3(0, 1, 0).cross(dir).normalize() : new Vector3(1, 0, 0);
    const vx = new Vector3().crossVectors(dir, ux).normalize();
    const shade = 0.75 + 0.25 * Math.min(1, y / 3);
    for (let s = 0; s <= sides; s++) {
      const angle = (s / sides) * Math.PI * 2;
      const nx = ux.x * Math.cos(angle) + vx.x * Math.sin(angle);
      const ny = ux.y * Math.cos(angle) + vx.y * Math.sin(angle);
      const nz = ux.z * Math.cos(angle) + vx.z * Math.sin(angle);
      positions.push(x + nx * radii[p], y + ny * radii[p], z + nz * radii[p]);
      normals.push(nx, ny, nz);
      const c = streaks[s] ? b : a;
      colors.push(c.r * shade, c.g * shade, c.b * shade);
      leaf.push(0);
    }
  }
  for (let p = 0; p < points.length - 1; p++)
    for (let s = 0; s < sides; s++) {
      const i = p * (sides + 1) + s;
      const j = i + sides + 1;
      indices.push(i, j, i + 1, i + 1, j, j + 1);
    }
  return finish(positions, normals, colors, leaf, indices);
}

/** Crown parameters shared by its clumps. */
const crownOf = (centre, size) => ({ crown: centre, crownScale: size, crownSize: size });

/** Clumps scattered in an ellipsoid shell / disc: n clumps at relative radius `ring` with jitter. */
function ringClumps(
  rng,
  n,
  { centre, ring, y, radius, flatten, colour, detail, crown, phase = 0, ySpread = 0 },
) {
  const parts = [];
  for (let k = 0; k < n; k++) {
    const angle = phase + (k / n) * Math.PI * 2 + (rng() - 0.5) * 0.5;
    const r = ring * (0.85 + rng() * 0.3);
    const size = radius * (0.85 + rng() * 0.3);
    parts.push(
      clump(rng, {
        centre: [
          centre[0] + Math.cos(angle) * r,
          y + (rng() - 0.5) * 2 * ySpread,
          centre[2] + Math.sin(angle) * r,
        ],
        radii: [size, size * flatten, size],
        detail,
        colour,
        ...crown,
      }),
    );
  }
  return parts;
}

/** Stone (umbrella) pine: the signature tree of the circuit's skyline. */
function stonePine(detail) {
  const rng = createRng(11);
  const near = detail > 0;
  const crownY = 11.4;
  const crown = crownOf([0.6, crownY, 0.2], [6.2, 1.7, 6.2]);
  const foliage = 0x3d4a24;
  const parts = [];
  if (near) {
    // gently curved, leaning trunk forking into three limbs under the crown
    parts.push(
      tube(
        [
          [0, 0, 0],
          [0.15, 3, 0.05],
          [0.35, 6, 0.1],
          [0.5, 8.6, 0.15],
        ],
        [0.34, 0.27, 0.23, 0.2],
        7,
        0x6b4a35,
      ),
    );
    for (const [lx, lz] of [
      [-2.6, 1.4],
      [2.9, -0.4],
      [0.6, -2.8],
    ])
      parts.push(
        tube(
          [
            [0.5, 8.4, 0.15],
            [0.5 + lx * 0.5, 9.6, 0.15 + lz * 0.5],
            [0.5 + lx, crownY - 0.6, 0.15 + lz],
          ],
          [0.17, 0.12, 0.08],
          5,
          0x6b4a35,
        ),
      );
    parts.push(
      clump(rng, {
        centre: [0.6, crownY + 0.3, 0.2],
        radii: [3.2, 1.25, 3.2],
        detail: 1,
        colour: foliage,
        ...crown,
      }),
    );
    parts.push(
      ...ringClumps(rng, 8, {
        centre: [0.6, 0, 0.2],
        ring: 3.9,
        y: crownY,
        radius: 2.4,
        flatten: 0.52,
        colour: foliage,
        detail: 1,
        crown,
        ySpread: 0.35,
      }),
    );
    parts.push(
      ...ringClumps(rng, 4, {
        centre: [0.6, 0, 0.2],
        ring: 1.8,
        y: crownY + 0.9,
        radius: 2.1,
        flatten: 0.5,
        colour: 0x45532a,
        detail: 1,
        crown,
        phase: 0.4,
      }),
    );
  } else {
    parts.push(
      tube(
        [
          [0, 0, 0],
          [0.5, 10.2, 0.15],
        ],
        [0.3, 0.2],
        3,
        0x6b4a35,
      ),
    );
    parts.push(
      clump(rng, {
        centre: [0.6, crownY + 0.35, 0.2],
        radii: [3.6, 1.4, 3.6],
        detail: 0,
        jitter: 0.1,
        colour: 0x3a4621,
        ...crown,
      }),
    );
    parts.push(
      ...ringClumps(rng, 5, {
        centre: [0.6, 0, 0.2],
        ring: 3.6,
        y: crownY,
        radius: 2.7,
        flatten: 0.5,
        colour: 0x37431f,
        detail: 0,
        crown,
        ySpread: 0.25,
      }),
    );
  }
  return mergeGeometries(parts);
}

/** Maritime pine: tall, slightly crooked trunk, irregular crown in its top part. */
function maritimePine(detail) {
  const rng = createRng(23);
  const near = detail > 0;
  const crown = crownOf([0, 15.5, 0], [3.4, 3.6, 3.4]);
  const parts = [];
  if (near) {
    parts.push(
      tube(
        [
          [0, 0, 0],
          [0.3, 5, 0.1],
          [0.1, 10, 0.3],
          [0.4, 17, 0.2],
        ],
        [0.32, 0.26, 0.2, 0.1],
        6,
        0x5e4433,
      ),
    );
    for (let k = 0; k < 7; k++) {
      const y = 12 + k * 1.05 + (rng() - 0.5) * 0.6;
      const angle = k * 2.4 + rng();
      const r = (1 - (y - 12) / 9) * 2.2 + 0.6;
      const centre = [Math.cos(angle) * r * 0.8, y, Math.sin(angle) * r * 0.8];
      // a branch from the trunk (about 0.2, 0.25 at this height) out to the clump it carries
      parts.push(tube([[0.2, y - 0.7, 0.25], centre], [0.09, 0.05], 4, 0x5e4433));
      parts.push(
        clump(rng, {
          centre,
          radii: [1.9 + rng() * 0.6, 1.0, 1.9 + rng() * 0.6],
          detail: 1,
          colour: 0x2e3a22,
          ...crown,
        }),
      );
    }
    parts.push(
      clump(rng, { centre: [0.4, 18.4, 0.2], radii: [1.4, 1.1, 1.4], detail: 1, colour: 0x34402a, ...crown }),
    );
  } else {
    parts.push(
      tube(
        [
          [0, 0, 0],
          [0.4, 14, 0.2],
        ],
        [0.28, 0.14],
        3,
        0x5e4433,
      ),
    );
    for (const [cx, cy, cz, r] of [
      [0.9, 13.4, 0.5, 2.6],
      [-0.8, 15.6, -0.4, 2.3],
      [0.4, 17.8, 0.2, 1.7],
    ])
      parts.push(
        clump(rng, {
          centre: [cx, cy, cz],
          radii: [r, r * 0.55, r],
          detail: 0,
          jitter: 0.15,
          colour: 0x2b3720,
          ...crown,
        }),
      );
  }
  return mergeGeometries(parts);
}

/**
 * Eucalyptus: tall pale trunk with brown peeling streaks, a narrow open crown of grey-green clumps.
 * Near: nine limbs leave the leader between 12 and 23 m (golden-angle spiral), rising outwards, each
 * ending in a clump with a smaller one along it, so every clump hangs on bark; gaps between the
 * limbs keep the crown open. Far: the same limb-end clumps (coarser, a little larger, absorbing the
 * small ones) on a 3-sided trunk, so the silhouette does not change at the LOD switch.
 */
function eucalyptus(detail) {
  const rng = createRng(37);
  const near = detail > 0;
  const crown = crownOf([0, 20, 0], [4, 6.5, 4]);
  const leader = [
    [0, 0, 0],
    [-0.2, 6, 0.1],
    [0.1, 13, -0.1],
    [0.3, 20, 0.2],
    [0.2, 25.5, 0.1],
  ];
  /** Point on the leader at height y (linear between its points). */
  const onLeader = (y) => {
    for (let k = 1; k < leader.length; k++)
      if (y <= leader[k][1]) {
        const [x0, y0, z0] = leader[k - 1];
        const [x1, y1, z1] = leader[k];
        const t = (y - y0) / (y1 - y0);
        return [x0 + (x1 - x0) * t, y, z0 + (z1 - z0) * t];
      }
    return leader[leader.length - 1];
  };
  // limbs: start on the leader, rise outwards with a slight upward curve
  const limbs = [];
  for (let k = 0; k < 9; k++) {
    const y = 12 + k * 1.35 + (rng() - 0.5) * 0.5;
    const angle = k * 2.4 + (rng() - 0.5) * 0.6;
    const reach = (3.4 - k * 0.2) * (0.85 + rng() * 0.3);
    const rise = reach * (0.75 + rng() * 0.35);
    const start = onLeader(y);
    const mid = [
      start[0] + Math.cos(angle) * reach * 0.5,
      y + rise * 0.42,
      start[2] + Math.sin(angle) * reach * 0.5,
    ];
    const end = [start[0] + Math.cos(angle) * reach, y + rise, start[2] + Math.sin(angle) * reach];
    limbs.push({ start, mid, end, size: 1.25 + rng() * 0.35, side: 0.85 + rng() * 0.25 });
  }
  const parts = [];
  const foliage = 0x4f5e48;
  if (near) {
    parts.push(tube(leader, [0.42, 0.34, 0.27, 0.18, 0.08], 7, 0xc9c3b3, 0x7a5e45, rng));
    for (const { start, mid, end, size, side } of limbs) {
      parts.push(tube([start, mid, end], [0.13, 0.09, 0.05], 4, 0xbdb6a6));
      parts.push(
        clump(rng, {
          centre: end,
          radii: [size, size * 0.85, size],
          detail: 1,
          jitter: 0.22,
          colour: foliage,
          ...crown,
        }),
      );
      // a smaller clump hanging on the limb's middle
      parts.push(
        clump(rng, {
          centre: [mid[0], mid[1] + 0.2, mid[2]],
          radii: [side, side * 0.8, side],
          detail: 1,
          jitter: 0.22,
          colour: 0x56654e,
          ...crown,
        }),
      );
    }
    parts.push(
      clump(rng, {
        centre: [0.2, 25.2, 0.1],
        radii: [1.2, 1.4, 1.2],
        detail: 1,
        jitter: 0.2,
        colour: foliage,
        ...crown,
      }),
    );
  } else {
    parts.push(tube([leader[0], leader[3]], [0.38, 0.16], 3, 0xc9c3b3));
    for (const { end, size } of limbs) {
      const r = size * 1.12;
      parts.push(
        clump(rng, {
          centre: end,
          radii: [r, r * 0.85, r],
          detail: 0,
          jitter: 0.15,
          colour: 0x47543f,
          ...crown,
        }),
      );
    }
    parts.push(
      clump(rng, {
        centre: [0.2, 25.2, 0.1],
        radii: [1.3, 1.5, 1.3],
        detail: 0,
        jitter: 0.12,
        colour: 0x47543f,
        ...crown,
      }),
    );
  }
  return mergeGeometries(parts);
}

/** Holm / cork oak (and wild olive): short trunk, dense rounded crown. */
function holmOak(detail) {
  const rng = createRng(41);
  const near = detail > 0;
  const crown = crownOf([0, 5.4, 0], [4.1, 3.0, 4.1]);
  const parts = [];
  if (near) {
    // the trunk runs on into the crown, so the crown sits on it
    parts.push(
      tube(
        [
          [0, 0, 0],
          [0.2, 1.6, 0.1],
          [0.1, 3.4, -0.1],
          [0, 4.6, 0],
        ],
        [0.36, 0.3, 0.22, 0.15],
        6,
        0x5a4a3c,
      ),
    );
    parts.push(
      clump(rng, { centre: [0, 5.6, 0], radii: [2.8, 2.3, 2.8], detail: 1, colour: 0x2b3320, ...crown }),
    );
    parts.push(
      ...ringClumps(rng, 6, {
        centre: [0, 0, 0],
        ring: 2.5,
        y: 5.0,
        radius: 2.0,
        flatten: 0.85,
        colour: 0x2f3824,
        detail: 1,
        crown,
        ySpread: 0.7,
      }),
    );
    parts.push(
      clump(rng, { centre: [0.4, 7.2, -0.3], radii: [1.8, 1.4, 1.8], detail: 1, colour: 0x343e27, ...crown }),
    );
  } else {
    parts.push(
      tube(
        [
          [0, 0, 0],
          [0.1, 3.4, -0.1],
        ],
        [0.32, 0.2],
        3,
        0x5a4a3c,
      ),
    );
    for (const [cx, cy, cz, r] of [
      [0, 5.9, 0, 2.9],
      [1.9, 5.0, 0.9, 2.2],
      [-1.7, 5.1, -1.1, 2.2],
    ])
      parts.push(
        clump(rng, {
          centre: [cx, cy, cz],
          radii: [r, r * 0.8, r],
          detail: 0,
          jitter: 0.12,
          colour: 0x2a321f,
          ...crown,
        }),
      );
  }
  return mergeGeometries(parts);
}

/** Italian cypress: dark narrow column. */
function cypress(detail) {
  const rng = createRng(53);
  const near = detail > 0;
  const crown = crownOf([0, 6.5, 0], [1.4, 6, 1.4]);
  const parts = [];
  if (near) {
    parts.push(
      tube(
        [
          [0, 0, 0],
          [0, 1.4, 0],
        ],
        [0.2, 0.18],
        5,
        0x4e3c30,
      ),
    );
    for (let k = 0; k < 6; k++) {
      const y = 2.0 + k * 1.75;
      const r = 1.35 * (1 - k / 7.5);
      parts.push(
        clump(rng, {
          centre: [(rng() - 0.5) * 0.2, y, (rng() - 0.5) * 0.2],
          radii: [r, 1.25, r],
          detail: 1,
          jitter: 0.2,
          colour: 0x263222,
          ...crown,
        }),
      );
    }
  } else {
    parts.push(
      clump(rng, {
        centre: [0, 4.6, 0],
        radii: [1.3, 3.6, 1.3],
        detail: 0,
        jitter: 0.08,
        colour: 0x232e20,
        ...crown,
      }),
    );
    parts.push(
      clump(rng, {
        centre: [0, 9.2, 0],
        radii: [0.9, 2.6, 0.9],
        detail: 0,
        jitter: 0.08,
        colour: 0x253021,
        ...crown,
      }),
    );
  }
  return mergeGeometries(parts);
}

/** Kermes oak / mastic scrub mound. */
function scrub(detail) {
  const rng = createRng(67);
  const near = detail > 0;
  const crown = crownOf([0, 0.45, 0], [1.2, 0.6, 1.2]);
  const parts = [];
  if (near) {
    parts.push(
      clump(rng, {
        centre: [0, 0.42, 0],
        radii: [0.85, 0.55, 0.85],
        detail: 1,
        jitter: 0.28,
        colour: 0x52521f,
        aoBottom: 0.6,
        ...crown,
      }),
    );
    parts.push(
      ...ringClumps(rng, 6, {
        centre: [0, 0, 0],
        ring: 0.8,
        y: 0.32,
        radius: 0.5,
        flatten: 0.85,
        colour: 0x5a5a2a,
        detail: 0,
        crown,
        ySpread: 0.12,
      }),
    );
  } else {
    parts.push(
      clump(rng, {
        centre: [0, 0.4, 0],
        radii: [1.25, 0.62, 1.25],
        detail: 0,
        jitter: 0.1,
        colour: 0x4d4d1f,
        aoBottom: 0.6,
        ...crown,
      }),
    );
  }
  return mergeGeometries(parts);
}

/** Pampas grass: a narrow grass clump with tall cream plumes (a few, on disturbed banks). */
function pampas(detail) {
  const rng = createRng(79);
  const near = detail > 0;
  const crown = crownOf([0, 0.9, 0], [0.9, 1.0, 0.9]);
  const parts = [];
  parts.push(
    clump(rng, {
      centre: [0, 0.8, 0],
      radii: [0.85, 0.95, 0.85],
      detail,
      jitter: 0.25,
      colour: 0x6b6e35,
      aoBottom: 0.5,
      ...crown,
    }),
  );
  const plumes = near ? 7 : 3;
  for (let k = 0; k < plumes; k++) {
    const angle = (k / plumes) * Math.PI * 2 + rng();
    const lean = 0.25 + rng() * 0.35;
    const top = [Math.cos(angle) * lean, 2.6 + rng() * 0.6, Math.sin(angle) * lean];
    if (near) parts.push(tube([[0, 1.2, 0], top], [0.02, 0.015], 3, 0xa59c74));
    parts.push(
      clump(rng, {
        centre: top,
        radii: [0.12, 0.42, 0.12],
        detail: 0,
        jitter: 0.1,
        colour: 0xe8dfcb,
        aoBottom: 0.1,
        ...crownOf(top, [0.3, 0.5, 0.3]),
      }),
    );
  }
  return mergeGeometries(parts);
}

const BUILDERS = { stonePine, maritimePine, eucalyptus, holmOak, cypress, scrub, pampas };

/**
 * Both levels of a species: { near, far } geometries. The far geometry's bounding box is the union
 * of both levels (depth-range.js indexes the far instances; the near ones change every few metres
 * of camera travel), and `radius` is the plan radius of the near model's crown.
 */
function buildSpeciesGeometry(name) {
  recording = { clumps: [], tubes: [] };
  const near = BUILDERS[name](1);
  const parts = recording;
  recording = null;
  const far = BUILDERS[name](0);
  near.computeBoundingBox();
  far.computeBoundingBox();
  far.boundingBox.union(near.boundingBox);
  near.computeBoundingSphere();
  far.computeBoundingSphere();
  const box = far.boundingBox;
  const radius = Math.max(-box.min.x, box.max.x, -box.min.z, box.max.z);
  return { near, far, radius, height: box.max.y, parts };
}

/**
 * Attachment check of a model's parts (buildSpeciesGeometry().parts): a clump is attached when it
 * rests on the ground, contains a point of a tube's centre line (sampled every 0.1 m), or overlaps an
 * attached clump, all judged on the clump shrunk by its vertex jitter (clump–clump: the centres are
 * closer than the sum of the two ellipsoids' radii along the line between them). Returns
 * { attached, total, floating: [clump index] }.
 */
function attachedClumps({ clumps, tubes }) {
  const inner = clumps.map(({ radii, jitter = 0.18 }) => radii.map((r) => r * (1 - jitter)));
  const contains = (k, p) =>
    ((p[0] - clumps[k].centre[0]) / inner[k][0]) ** 2 +
      ((p[1] - clumps[k].centre[1]) / inner[k][1]) ** 2 +
      ((p[2] - clumps[k].centre[2]) / inner[k][2]) ** 2 <=
    1;
  /** Radius of clump k's shrunk ellipsoid along the unit direction u. */
  const radiusAlong = (k, u) => 1 / Math.hypot(u[0] / inner[k][0], u[1] / inner[k][1], u[2] / inner[k][2]);
  const attached = clumps.map(({ centre }, k) => (centre[1] - inner[k][1] <= 0.05 ? 1 : 0));
  for (const { points } of tubes)
    for (let i = 0; i + 1 < points.length; i++) {
      const [a, b] = [points[i], points[i + 1]];
      const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) / 0.1));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
        for (let k = 0; k < clumps.length; k++) if (!attached[k] && contains(k, p)) attached[k] = 1;
      }
    }
  for (let grew = true; grew;) {
    grew = false;
    for (let k = 0; k < clumps.length; k++) {
      if (attached[k]) continue;
      for (let j = 0; j < clumps.length && !attached[k]; j++) {
        if (!attached[j]) continue;
        const [a, b] = [clumps[k].centre, clumps[j].centre];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        const u = [(b[0] - a[0]) / d, (b[1] - a[1]) / d, (b[2] - a[2]) / d];
        if (d < radiusAlong(k, u) + radiusAlong(j, u)) attached[k] = grew = 1;
      }
    }
  }
  const floating = [];
  attached.forEach((v, k) => v || floating.push(k));
  return { attached: clumps.length - floating.length, total: clumps.length, floating };
}

/** Triangle count of an indexed geometry. */
const triangles = (geometry) => geometry.index.count / 3;

export { BUILDERS, attachedClumps, buildSpeciesGeometry, triangles };
