// One shader program per material, for every frame: materials are not shared between meshes that
// need different program variants.
//
// Why. three.js keeps one current program per material and, before each draw, checks whether the
// object still fits it (WebGLRenderer setProgram: instanced or not, with or without instance colours,
// vertex alphas, tangents, morph targets). When a material is shared by an InstancedMesh and a plain
// Mesh, every switch between the two in the draw order makes three.js rebuild the material's program
// parameters and cache key (getParameters + getProgramCacheKey: ~50 properties and a string join of
// ~60 values) to find the other, already compiled program, and the switch comes back on the next
// frame. The same happens in the shadow pass, where three.js draws every caster with ONE shared
// depth material unless the caster has a customDepthMaterial: instanced casters (posts, space frame,
// pit equipment, near trees, the wheels) alternated with plain ones all along the scene graph. With
// the two other causes (motion-blur.js addLightsToMask, the fence's forceSinglePass) that was 31
// lookups per frame at the arrival and 114 on the lap, about 140-230 KB of garbage per frame, and the
// shared depth material picked up whichever caster's texture it last saw at each lookup, so the
// variants it compiled depended on what was in view: a shadow program was compiled on the lap
// (t = 0.445), a synchronous compile long after warmup().
//
// separateProgramVariants(scene) runs once, after the scene is built:
//   - a material used by meshes of different variants keeps the most common variant, and each other
//     variant gets its own copy (same parameters, textures, uniforms and shader patch: the copy draws
//     exactly the same pixels);
//   - instanced shadow casters get a shared customDepthMaterial per variant (with / without instance
//     colours), equal to three.js's own depth material, unless their material needs a per-material
//     depth variant (alpha test on a map, displacement, clipping), which three.js then caches itself.
// drawOrder (renderer.setOpaqueSort) is three.js's own opaque order (WebGLRenderList
// painterSortStable: group order, render order, material id, depth, object id) with each copy sorted
// under its original's id, so the frame is drawn in exactly the order it was before (the copies are
// newer materials: by their own ids the instanced draws would move, and where two surfaces tie in
// depth a few pixels would change). Build time only, apart from the sort, which allocates nothing.
import { MeshDepthMaterial, RGBADepthPacking } from 'three';

/** The program-relevant facts of a mesh that three.js checks per draw (setProgram). */
function variantOf(mesh) {
  const geometry = mesh.geometry;
  const color = geometry.attributes.color;
  return [
    mesh.isInstancedMesh ? 'instanced' : 'single',
    mesh.isInstancedMesh && mesh.instanceColor ? 'instance-colour' : '',
    color && color.itemSize === 4 ? 'vertex-alpha' : '',
    geometry.attributes.tangent ? 'tangents' : '',
    geometry.morphAttributes.position || geometry.morphAttributes.normal ? 'morph' : '',
    mesh.isSkinnedMesh ? 'skinned' : '',
  ].join('|');
}

/**
 * A copy of `material` that compiles to the same shader: the shader patch (onBeforeCompile and its
 * cache key) and userData (a patch's shared uniforms) are shared, not rebuilt or deep-copied.
 */
function copyMaterial(material) {
  const userData = material.userData;
  material.userData = {}; // Material.copy would deep-copy it through JSON
  const copy = material.clone();
  material.userData = copy.userData = userData;
  if (Object.prototype.hasOwnProperty.call(material, 'onBeforeCompile'))
    copy.onBeforeCompile = material.onBeforeCompile;
  if (Object.prototype.hasOwnProperty.call(material, 'customProgramCacheKey'))
    copy.customProgramCacheKey = material.customProgramCacheKey;
  copy.drawOrderId = material.drawOrderId ?? material.id;
  return copy;
}

/** True when three.js would make a per-material copy of its depth material for this material. */
function needsOwnDepthVariant(material) {
  return (
    (material.alphaTest > 0 && (material.map || material.alphaMap)) ||
    (material.displacementMap && material.displacementScale !== 0) ||
    (material.clipShadows && material.clippingPlanes && material.clippingPlanes.length > 0)
  );
}

/**
 * @param {import('three').Object3D} root the whole scene
 * @returns {{ copies: number, depthMaterials: number }} materials added (for the record)
 */
function separateProgramVariants(root) {
  const users = new Map(); // material -> Map(variant -> meshes)
  const instancedCasters = [];
  root.traverse((node) => {
    if (!node.isMesh || Array.isArray(node.material)) return;
    const variant = variantOf(node);
    let byVariant = users.get(node.material);
    if (!byVariant) users.set(node.material, (byVariant = new Map()));
    if (!byVariant.has(variant)) byVariant.set(variant, []);
    byVariant.get(variant).push(node);
    if (node.isInstancedMesh && node.castShadow && !node.customDepthMaterial) instancedCasters.push(node);
  });

  let copies = 0;
  for (const [material, byVariant] of users) {
    if (byVariant.size < 2) continue;
    const ordered = [...byVariant.values()].sort((a, b) => b.length - a.length);
    for (const meshes of ordered.slice(1)) {
      const copy = copyMaterial(material);
      copies++;
      for (const mesh of meshes) mesh.material = copy;
    }
  }

  const depth = new Map(); // instance colours or not -> MeshDepthMaterial
  for (const mesh of instancedCasters) {
    if (needsOwnDepthVariant(mesh.material)) continue;
    const key = mesh.instanceColor ? 'colour' : 'plain';
    if (!depth.has(key)) depth.set(key, new MeshDepthMaterial({ depthPacking: RGBADepthPacking }));
    mesh.customDepthMaterial = depth.get(key);
  }
  return { copies, depthMaterials: depth.size };
}

/**
 * three.js's opaque draw order, a copy taking its original's place (see the header). It returns signs
 * only: the sort reads nothing else, and a fractional depth difference returned to the sort is a new
 * heap number on every comparison (~7 KB per frame).
 */
function drawOrder(a, b) {
  if (a.groupOrder !== b.groupOrder) return a.groupOrder < b.groupOrder ? -1 : 1;
  if (a.renderOrder !== b.renderOrder) return a.renderOrder < b.renderOrder ? -1 : 1;
  const ma = a.material.drawOrderId ?? a.material.id;
  const mb = b.material.drawOrderId ?? b.material.id;
  if (ma !== mb) return ma < mb ? -1 : 1;
  if (a.z !== b.z) return a.z < b.z ? -1 : 1;
  return a.id - b.id;
}

export { drawOrder, separateProgramVariants };
