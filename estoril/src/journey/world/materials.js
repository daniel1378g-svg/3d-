// Shared textures and the material table of the circuit world.
//
// Construction order matters: three.js sorts opaque draws by material.id, so the textures and
// materials below must keep being created in exactly this order.
import { DoubleSide, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import {
  aoFadeTexture,
  asphaltTexture,
  barrierTexture,
  blobShadowTexture,
  glazingTexture,
  grassTexture,
  gravelTexture,
  kerbTexture,
  roundedShadowTexture,
  shutterTexture,
} from '../textures.js';

/** Procedural canvas textures shared by several world materials. */
function createWorldTextures() {
  const textures = {
    asphalt: asphaltTexture(),
    grass: grassTexture(),
    gravel: gravelTexture(),
    kerb: kerbTexture(),
    barrier: barrierTexture(),
    blob: blobShadowTexture(),
    ao: aoFadeTexture(),
    shutter: shutterTexture(),
  };
  // Ground UVs are written in metres / 9 (see terrain.js), so the texture itself is not repeated.
  textures.grass.repeat.set(1, 1);
  return textures;
}

/**
 * Settings shared by every flat overlay (AO fades, contact shadows, rubber line) that lies a few
 * millimetres above another surface: blended, no depth write, pulled towards the camera.
 */
const DECAL = {
  transparent: true,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -1,
  polygonOffsetUnits: -1,
};

/**
 * The material table returned as `world.materials`. Keys are part of the public result; several
 * entries (glass, hill, blob) are not used by the world itself.
 */
function createWorldMaterials(textures) {
  const materials = {
    // Terrain: grass texture tinted per vertex (see terrain.js).
    ground: new MeshStandardMaterial({ map: textures.grass, roughness: 1, color: 0xffffff, vertexColors: true }),
    asphalt: new MeshStandardMaterial({ map: textures.asphalt, roughness: 0.8, metalness: 0, color: 0x9a9ea4 }),
    pitAsphalt: new MeshStandardMaterial({ map: textures.asphalt, roughness: 0.86, color: 0xbfc3c8 }),
    // Racing-line rubber; its gradient map and final opacity (0.2) are set in track-surfaces.js.
    rubber: new MeshBasicMaterial({ color: 0x0b0c0d, opacity: 0.16, ...DECAL }),
    // Soft ambient-occlusion fade laid along wall bases (ctx.addAoStrip).
    ao: new MeshBasicMaterial({ map: textures.ao, ...DECAL }),
    // Rounded-rectangle contact shadow under parked objects.
    contact: new MeshBasicMaterial({
      map: roundedShadowTexture(128, 128, { hx: 0.34, hy: 0.34, rr: 0.2, fade: 0.15, alpha: 0.6 }),
      ...DECAL,
    }),
    line: new MeshStandardMaterial({ color: 0xf2f1ec, roughness: 0.7 }),
    kerb: new MeshStandardMaterial({ map: textures.kerb, roughness: 0.6 }),
    runoff: new MeshStandardMaterial({ color: 0x3f8f72, roughness: 0.85 }),
    gravel: new MeshStandardMaterial({ map: textures.gravel, roughness: 1, color: 0xf2ead8 }),
    barrier: new MeshStandardMaterial({ map: textures.barrier, roughness: 0.8 }),
    concrete: new MeshStandardMaterial({ color: 0xd9d7d0, roughness: 0.92 }),
    concreteDark: new MeshStandardMaterial({ color: 0xa7adb2, roughness: 0.9 }),
    white: new MeshStandardMaterial({ color: 0xe6e4de, roughness: 0.8 }),
    steel: new MeshStandardMaterial({ color: 0x9ba4aa, roughness: 0.45, metalness: 0.6 }),
    steelDark: new MeshStandardMaterial({ color: 0x5d646b, roughness: 0.5, metalness: 0.55 }),
    glass: new MeshStandardMaterial({ color: 0x5f7684, roughness: 0.12, metalness: 0.9, envMapIntensity: 1.2 }),
    shutter: new MeshStandardMaterial({ map: textures.shutter, color: 0xffffff, roughness: 0.5, metalness: 0.3 }),
    seat: new MeshStandardMaterial({ color: 0x4e7f93, roughness: 0.7 }),
    roofW: new MeshStandardMaterial({ color: 0xf1efe9, roughness: 0.6, side: DoubleSide }),
    red: new MeshStandardMaterial({ color: 0xe93325, roughness: 0.55 }),
    // Vegetation: white base colours, the per-instance colour carries the tint (vegetation.js).
    trunk: new MeshStandardMaterial({ color: 0x6b5747, roughness: 1 }),
    pine: new MeshStandardMaterial({ color: 0xffffff, roughness: 1 }),
    oak: new MeshStandardMaterial({ color: 0xffffff, roughness: 1 }),
    shrub: new MeshStandardMaterial({ color: 0xffffff, roughness: 1 }),
    hill: new MeshStandardMaterial({ color: 0x6b7a5c, roughness: 1, flatShading: false }),
    interior: new MeshStandardMaterial({ color: 0xd9d7d1, roughness: 0.8 }),
    floor: new MeshStandardMaterial({ color: 0x8e9298, roughness: 0.55, metalness: 0.1 }),
    blob: new MeshBasicMaterial({ map: textures.blob, transparent: true, depthWrite: false }),
  };
  // Track UVs are written in metres / 12 (see track-surfaces.js), so the texture is not repeated.
  materials.asphalt.map.repeat.set(1, 1);
  return materials;
}

/**
 * A new curtain-wall glass material with its own glazing texture, repeated `panesAcross` times
 * horizontally. Every call creates a new texture and material (callers rely on that order).
 */
function createGlazingMaterial(panesAcross) {
  const texture = glazingTexture();
  texture.repeat.set(panesAcross, 1);
  return new MeshStandardMaterial({ map: texture, roughness: 0.18, metalness: 0.55, envMapIntensity: 1.1 });
}

export { createGlazingMaterial, createWorldMaterials, createWorldTextures };
