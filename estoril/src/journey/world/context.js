// The shared state every world builder receives (what used to be the buildWorld closure).
//
// Coordinates: metres, world XZ is the ground plane, +Y is up. Track points are Vector2(x, z), so a
// point's `.y` is its world Z.
import { BoxGeometry, Group, Mesh, PlaneGeometry, Vector2 } from 'three';
import { LAYOUT } from '../layout.js';
import { createRng } from '../util/rng.js';
import { createGlazingMaterial, createWorldMaterials, createWorldTextures } from './materials.js';

/** Instance budget multiplier per quality level (vegetation, grass tufts, clouds). */
function densityFor(quality) {
  return quality === 'high' ? 1 : quality === 'mid' ? 0.6 : 0.35;
}

/**
 * Creates the world root group, the track as Vector2s, the seeded random stream, the per-frame
 * updater list, the shared textures/materials and the small mesh helpers below.
 *
 * `rng` is one stream (seed 42) shared, in this order, by vegetation, grass tufts and clouds: any
 * extra or missing call shifts every placement after it.
 */
function createWorldContext(trackPoints, quality) {
  const density = densityFor(quality);
  const root = new Group();
  root.name = 'world';
  const track = trackPoints.map(([x, z]) => new Vector2(x, z));
  const rng = createRng(42);
  /** Per-frame callbacks `(time, dt)` run by world.update(), in registration order. */
  const updaters = [];
  const textures = createWorldTextures(quality);
  const materials = createWorldMaterials(textures);

  /**
   * Adds a flat ambient-occlusion fade strip next to the segment (x0, z0)–(x1, z1), e.g. at the
   * foot of a wall. The strip is `width` metres wide and lies on side `side` of the segment:
   * +1 is the segment's normal (-dz, dx) (for a segment running towards +X that is +Z), -1 the
   * other side. The texture fades from dark at the segment to clear at the outer edge.
   * Transparent decal at height `y` with polygon offset, renderOrder 1 (after renderOrder-0 transparents).
   */
  function addAoStrip(x0, z0, x1, z1, width, side = 1, y = 0.06, parent = root) {
    const length = Math.hypot(x1 - x0, z1 - z0);
    const geometry = new PlaneGeometry(length, width);
    geometry.rotateX(-Math.PI / 2);
    const strip = new Mesh(geometry, materials.ao);
    const angle = Math.atan2(z1 - z0, x1 - x0);
    const normalX = -Math.sin(angle) * side;
    const normalZ = Math.cos(angle) * side;
    strip.position.set((x0 + x1) / 2 + (normalX * width) / 2, y, (z0 + z1) / 2 + (normalZ * width) / 2);
    // Turn the plane along the segment; flip it for side -1 so the dark edge stays on the segment.
    strip.rotation.y = -angle + (side > 0 ? 0 : Math.PI);
    strip.renderOrder = 1;
    parent.add(strip);
    return strip;
  }

  /**
   * Adds a rounded contact shadow (width × depth metres, turned `angle` radians about Y) on the
   * ground at (x, z). Currently unused by the world builders; kept for parity with the original.
   */
  function addContactShadow(x, z, width, depth, angle = 0, parent = root) {
    const shadow = new Mesh(new PlaneGeometry(width, depth), materials.contact);
    shadow.rotation.x = -Math.PI / 2;
    shadow.rotation.z = angle;
    shadow.position.set(x, 0.055, z);
    shadow.renderOrder = 1;
    parent.add(shadow);
    return shadow;
  }

  /**
   * Adds an axis-aligned box of size width (X) × height (Y) × depth (Z) whose BOTTOM sits at
   * `baseY` and whose footprint is centred on (x, z). Always receives shadows.
   */
  function addBox(width, height, depth, material, x, baseY, z, parent = root, castShadow = true) {
    const box = new Mesh(new BoxGeometry(width, height, depth), material);
    box.position.set(x, baseY + height / 2, z);
    box.castShadow = castShadow;
    box.receiveShadow = true;
    parent.add(box);
    return box;
  }

  return {
    quality,
    density,
    root,
    track,
    rng,
    updaters,
    textures,
    materials,
    layout: LAYOUT,
    glazingMaterial: createGlazingMaterial,
    addAoStrip,
    addContactShadow,
    addBox,
  };
}

export { createWorldContext };
