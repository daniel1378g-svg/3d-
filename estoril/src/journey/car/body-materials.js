// PBR materials for the body's material groups (see tools/car/bake_body.py).
//
// Both groups share the body atlas: base colour (sRGB), a glTF tangent-space normal map and the ORM map
// baked by tools/car/bake_body.py: ambient occlusion in R, roughness in G and clearcoat in B, all per
// texel. The occlusion darkens only indirect light (sky, environment), as three's aoMap does. The normal
// map is +Y-up (OpenGL) and is read with flipY = false and no vertex tangents, so its green channel is
// negated (as three's GLTFLoader does); 0.6 softens the generated panel-line detail.
//
//   body    paint, trim and glass in one material: what differs between them is in the ORM texture, so
//           their borders follow the atlas texels, never triangle edges. Paint: roughness 0.19–0.32 with a
//           restrained clearcoat (0.45); trim (dark plastics, carbon, interior): roughness 0.25–0.5, no
//           clearcoat; glass (side windows, engine-cover window, the windscreen added by the bake):
//           opaque dark tint from the atlas, roughness 0.035 and a full mirror-smooth clearcoat, so the
//           sky and the surroundings reflect with the Fresnel falloff of two glass interfaces (F0 0.04
//           each). Nothing is transparent, so nothing needs sorting. Mid/high: MeshPhysicalMaterial with
//           the clearcoat amount read from the ORM's B channel (three reads clearcoatMap's R, which here
//           holds the occlusion) and the clearcoat roughness from G × CLEARCOAT_ROUGHNESS. Low:
//           MeshStandardMaterial, the same per-texel roughness without the clearcoat.
//   lights  head- and tail-light clusters: the map's colour, glossy, and a subtle emission of the same
//           colour (red lenses glow red, LED strips white)
import { Color, MeshPhysicalMaterial, MeshStandardMaterial, ShaderChunk } from 'three';

const NORMAL_SCALE = 0.6;
/** Clearcoat roughness = this × the ORM roughness: 0.06–0.1 on paint, 0.01 on glass. */
const CLEARCOAT_ROUGHNESS = 0.3;
const LIGHT_EMISSIVE_INTENSITY = 0.45;
const AO_INTENSITY = 1;

/** lights_physical_fragment with the clearcoat amount read from the clearcoat map's blue channel. */
const CLEARCOAT_FROM_BLUE = ShaderChunk.lights_physical_fragment.replace(
  'texture2D( clearcoatMap, vClearcoatMapUv ).x',
  'texture2D( clearcoatMap, vClearcoatMapUv ).z',
);
if (CLEARCOAT_FROM_BLUE === ShaderChunk.lights_physical_fragment)
  throw new Error('hero car: three.js clearcoat chunk changed; update body-materials.js');

function withNormalMap(material, textures) {
  material.normalMap = textures.normalMap;
  material.normalScale.set(NORMAL_SCALE, -NORMAL_SCALE);
  return material;
}

const FACTORIES = {
  body(textures, quality) {
    const params = {
      name: 'car-body',
      map: textures.map,
      roughnessMap: textures.ormMap,
      roughness: 1,
      metalness: 0,
    };
    if (quality === 'low') return withNormalMap(new MeshStandardMaterial(params), textures);
    const material = new MeshPhysicalMaterial({
      ...params,
      clearcoat: 1,
      clearcoatMap: textures.ormMap,
      clearcoatRoughness: CLEARCOAT_ROUGHNESS,
      clearcoatRoughnessMap: textures.ormMap,
    });
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_physical_fragment>',
        CLEARCOAT_FROM_BLUE,
      );
    };
    material.customProgramCacheKey = () => 'car-body-clearcoat-b';
    return withNormalMap(material, textures);
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
 * @param {Record<string, import('three').Texture>} textures map, normalMap, ormMap
 * @param {'low'|'mid'|'high'} quality
 */
function bodyMaterials(groups, textures, quality) {
  return groups.map((group) => {
    const factory = FACTORIES[group.name];
    if (!factory) throw new Error('hero car: no material for body group ' + group.name);
    const material = factory(textures, quality);
    material.aoMap = textures.ormMap;
    material.aoMapIntensity = AO_INTENSITY;
    return material;
  });
}

export { bodyMaterials };
