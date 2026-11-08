// PBR materials for the body's material groups (see tools/car/bake_body.py for the classification).
//
// All groups share the body atlas: base colour (sRGB), a glTF tangent-space normal map and a glTF
// metal-roughness map (roughness in G, metalness in B). The normal map is +Y-up (OpenGL) and is read
// with flipY = false and no vertex tangents, so its green channel is negated (as three's GLTFLoader
// does); 0.6 softens the generated panel-line detail.
//
//   paint   white/red livery: dielectric base coat with the map's roughness × PAINT_ROUGHNESS, plus a
//           restrained clearcoat (mid/high only; 'low' keeps MeshStandardMaterial)
//   trim    dark plastics, carbon, underbody, interior: rougher, never metallic (the map's metalness
//           there is baked brake/hub residue in the wheel arches)
//   glass   side windows and the engine-cover window: opaque, near-black tint, mirror-smooth, so the
//           sky reflects with the Fresnel falloff of glass (F0 0.04); no transparency, hence no sorting
//   lights  head- and tail-light clusters: the map's colour, glossy, and a subtle emission of the
//           same colour (red lenses glow red, LED strips white)
import { Color, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

const NORMAL_SCALE = 0.6;
const PAINT_ROUGHNESS = 3.2; // × the map's 0.06–0.10 on paint → 0.19–0.32 base coat
const PAINT_CLEARCOAT = 0.45;
const PAINT_CLEARCOAT_ROUGHNESS = 0.07;
const TRIM_ROUGHNESS = 1.25; // × the map's 0.2–0.4 → 0.25–0.5
const GLASS_TINT = 0x08090b;
const LIGHT_EMISSIVE_INTENSITY = 0.45;

function withNormalMap(material, textures) {
  material.normalMap = textures.normalMap;
  material.normalScale.set(NORMAL_SCALE, -NORMAL_SCALE);
  return material;
}

const FACTORIES = {
  paint(textures, quality) {
    const params = {
      name: 'car-paint',
      map: textures.map,
      roughnessMap: textures.metalRoughMap,
      roughness: PAINT_ROUGHNESS,
      metalness: 0,
    };
    const material =
      quality === 'low'
        ? new MeshStandardMaterial(params)
        : new MeshPhysicalMaterial({
            ...params,
            clearcoat: PAINT_CLEARCOAT,
            clearcoatRoughness: PAINT_CLEARCOAT_ROUGHNESS,
          });
    return withNormalMap(material, textures);
  },
  trim(textures) {
    return withNormalMap(
      new MeshStandardMaterial({
        name: 'car-trim',
        map: textures.map,
        roughnessMap: textures.metalRoughMap,
        roughness: TRIM_ROUGHNESS,
        metalness: 0,
      }),
      textures,
    );
  },
  glass() {
    return new MeshStandardMaterial({ name: 'car-glass', color: GLASS_TINT, roughness: 0.04, metalness: 0 });
  },
  lights(textures) {
    return new MeshStandardMaterial({
      name: 'car-lights',
      map: textures.map,
      roughness: 0.18,
      metalness: 0,
      emissive: new Color(0xffffff),
      emissiveMap: textures.map,
      emissiveIntensity: LIGHT_EMISSIVE_INTENSITY,
    });
  },
};

/**
 * One material per group of the body geometry, in group order.
 * @param {Array<{name: string}>} groups the body asset's groups
 * @param {Record<string, import('three').Texture>} textures map, normalMap, metalRoughMap
 * @param {'low'|'mid'|'high'} quality
 */
function bodyMaterials(groups, textures, quality) {
  return groups.map((group) => {
    const factory = FACTORIES[group.name];
    if (!factory) throw new Error('hero car: no material for body group ' + group.name);
    return factory(textures, quality);
  });
}

export { bodyMaterials };
