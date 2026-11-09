// Static mesh merging: the meshes under a parent that never move after the build and draw alike are
// merged into one mesh per kind, so a paddock car's 25–27 meshes become 9–11 and the world's 33
// painted lines one mesh (fewer draws in the scene and the shadow pass alike).
//
// Meshes draw alike when they share the material, the shadow flags, the render order, the layers,
// frustum culling, the custom depth materials and the vertex attributes. A mesh is left as it is when
// it is transparent (blended meshes are sorted back to front one by one), instanced, skinned, named
// (named meshes are looked up: 'armco', 'ground', 'hills', the tests' checks), flagged
// userData.noMerge, has children or a geometry with morphs or a draw range, or is mirrored (a
// negative determinant flips its winding, which three.js turns per object). Geometry groups (the
// faces of a BoxGeometry, the caps of a cylinder) only matter with an array of materials, which is
// never merged, so the merged geometry has none.
//
// What does not change:
//   the frame   each part keeps its own vertices, transformed by its matrix relative to the parent
//               (BufferGeometry.applyMatrix4: positions affine, normals by the normal matrix and
//               renormalised); a part already in the parent's frame is copied as it is. The frame
//               differs from the separate meshes only by the float32 rounding of the pre-transformed
//               vertices. The merged mesh keeps the material, so three.js's opaque order (render
//               order, material, then depth: program-variants.js drawOrder) draws it where its parts
//               were drawn, and the shadow flags, so the same parts cast and receive shadows.
//   clearance   the depth range (depth-range.js) indexes every part as it indexed the separate mesh:
//               userData.indexParts lists, per part, its geometry's own bounding box, the chain of its
//               local matrices below the parent (the index multiplies them onto the merged mesh's world
//               matrix in three.js's order, so the part's world matrix is bit-identical), whether it is
//               an axis-aligned box, and its vertex and index ranges in the merged geometry. A part
//               wider than LARGE_MESH is indexed by its triangles, read from those ranges, so such a
//               part is merged only when it is already in the parent's frame (its vertices are copied
//               unchanged). The near plane and the camera's clearance solve therefore stay the same.
// Build time only.
import { BufferAttribute, BufferGeometry, Matrix4, Mesh, Object3D } from 'three';
import { LARGE_MESH, isAxisAlignedBox } from '../depth-range.js';

const IDENTITY = new Matrix4().elements;

/** True when every element of the matrix is exactly the identity's. */
const isIdentity = (matrix) => matrix.elements.every((value, i) => value === IDENTITY[i]);

/** The vertex attributes as a key: name, size, normalisation and array type of each. */
function attributeKey(geometry) {
  return Object.keys(geometry.attributes)
    .sort()
    .map((name) => {
      const a = geometry.attributes[name];
      return `${name}:${a.itemSize}:${a.normalized}:${a.array.constructor.name}`;
    })
    .join(',');
}

/** Why a mesh cannot be merged, or '' when it can. */
function blocker(node) {
  const geometry = node.geometry;
  const material = node.material;
  if (node.isInstancedMesh || node.isSkinnedMesh || node.isBatchedMesh) return 'kind';
  if (Array.isArray(material) || material.transparent) return 'material';
  if (node.name || node.userData.noMerge || node.children.length || !node.visible) return 'flagged';
  if (node.onBeforeRender !== Object3D.prototype.onBeforeRender) return 'hook';
  if (Object.keys(geometry.morphAttributes).length) return 'geometry';
  if (geometry.drawRange.start !== 0 || geometry.drawRange.count !== Infinity) return 'geometry';
  if (geometry.attributes.tangent || geometry.attributes.position.isInterleavedBufferAttribute)
    return 'geometry';
  return '';
}

/** The key of the meshes a mesh may be merged with. */
function mergeKey(node) {
  return [
    node.material.id,
    node.castShadow,
    node.receiveShadow,
    node.renderOrder,
    node.layers.mask,
    node.frustumCulled,
    node.customDepthMaterial ? node.customDepthMaterial.id : '',
    node.customDistanceMaterial ? node.customDistanceMaterial.id : '',
    node.geometry.index ? 'indexed' : 'plain',
    attributeKey(node.geometry),
  ].join('|');
}

/**
 * Merges the static meshes under `parent` (its whole subtree but `skip`) that draw alike, one merged
 * mesh per kind, added to `parent`; the parts are removed, and so are the unnamed groups they leave
 * empty. Call when the subtree is complete and before anything indexes or renders it.
 * @param {Object3D} parent
 * @param {{ skip?: Object3D }} [options] a subtree left alone (e.g. moving parts)
 * @returns {{ merged: number, parts: number }} meshes made, parts merged into them
 */
function mergeStaticMeshes(parent, { skip = null } = {}) {
  parent.updateMatrixWorld(true);
  const kinds = new Map(); // key -> [{ node, chain }]
  const walk = (node, chain) => {
    for (const child of node.children) {
      if (child === skip) continue;
      const links = [...chain, child.matrix];
      if (child.isMesh && !blocker(child)) {
        const relative = new Matrix4();
        for (const link of links) relative.multiply(link);
        const geometry = child.geometry;
        if (!geometry.boundingBox) geometry.computeBoundingBox();
        const box = geometry.boundingBox.clone().applyMatrix4(child.matrixWorld);
        const large = box.max.x - box.min.x > LARGE_MESH || box.max.z - box.min.z > LARGE_MESH;
        const identity = isIdentity(relative);
        if (relative.determinant() > 0 && (identity || !large)) {
          const key = mergeKey(child);
          if (!kinds.has(key)) kinds.set(key, []);
          kinds.get(key).push({ node: child, chain: links, relative, identity });
        }
      }
      walk(child, links);
    }
  };
  walk(parent, []);

  let merged = 0;
  let mergedParts = 0;
  for (const parts of kinds.values()) {
    if (parts.length < 2) continue;
    const first = parts[0].node;
    const sources = parts.map(({ node, relative, identity }) =>
      identity ? node.geometry : node.geometry.clone().applyMatrix4(relative),
    );
    const geometry = concatenate(sources);
    const mesh = new Mesh(geometry, first.material);
    mesh.castShadow = first.castShadow;
    mesh.receiveShadow = first.receiveShadow;
    mesh.renderOrder = first.renderOrder;
    mesh.layers.mask = first.layers.mask;
    mesh.frustumCulled = first.frustumCulled;
    mesh.customDepthMaterial = first.customDepthMaterial;
    mesh.customDistanceMaterial = first.customDistanceMaterial;
    const ranges = geometry.userData.ranges;
    mesh.userData.indexParts = parts.map(({ node, chain }, i) => ({
      box: node.geometry.boundingBox.clone(),
      chain: chain.map((link) => link.clone()),
      axisBox: isAxisAlignedBox(node.geometry),
      ...ranges[i],
    }));
    delete geometry.userData.ranges;
    for (const { node } of parts) {
      let up = node.parent;
      node.removeFromParent();
      while (up !== parent && !up.children.length && !up.name && !up.isMesh) {
        const next = up.parent;
        up.removeFromParent();
        up = next;
      }
    }
    sources.forEach((source, i) => source !== parts[i].node.geometry && source.dispose());
    parent.add(mesh);
    mesh.updateMatrixWorld(true);
    merged++;
    mergedParts += parts.length;
  }
  return { merged, parts: mergedParts };
}

/**
 * One geometry from geometries with the same attributes (all indexed or none); userData.ranges gives
 * each source's { vertexStart, vertexCount, indexStart, indexCount } (index ranges are vertex ranges
 * for unindexed geometries).
 */
function concatenate(sources) {
  const result = new BufferGeometry();
  const vertices = sources.reduce((n, g) => n + g.attributes.position.count, 0);
  for (const name of Object.keys(sources[0].attributes)) {
    const model = sources[0].attributes[name];
    const array = new model.array.constructor(vertices * model.itemSize);
    let at = 0;
    for (const source of sources) {
      const a = source.attributes[name];
      array.set(a.array.subarray(0, a.count * a.itemSize), at);
      at += a.count * a.itemSize;
    }
    result.setAttribute(name, new BufferAttribute(array, model.itemSize, model.normalized));
  }
  const ranges = [];
  let vertexStart = 0;
  if (sources[0].index) {
    const corners = sources.reduce((n, g) => n + g.index.count, 0);
    const index = vertices > 65535 ? new Uint32Array(corners) : new Uint16Array(corners);
    let at = 0;
    for (const source of sources) {
      const own = source.index.array;
      for (let k = 0; k < source.index.count; k++) index[at + k] = own[k] + vertexStart;
      ranges.push({
        vertexStart,
        vertexCount: source.attributes.position.count,
        indexStart: at,
        indexCount: source.index.count,
      });
      at += source.index.count;
      vertexStart += source.attributes.position.count;
    }
    result.setIndex(new BufferAttribute(index, 1));
  } else
    for (const source of sources) {
      const count = source.attributes.position.count;
      ranges.push({ vertexStart, vertexCount: count, indexStart: vertexStart, indexCount: count });
      vertexStart += count;
    }
  result.userData.ranges = ranges;
  return result;
}

/**
 * Freezes the matrices of `root` and its subtree as they are now: three.js's per-frame
 * updateMatrixWorld then skips the subtree. For objects that never move after they are placed.
 */
function freezeMatrices(root) {
  root.updateMatrixWorld(true);
  root.traverse((node) => (node.matrixAutoUpdate = false));
  root.matrixWorldAutoUpdate = false;
}

export { freezeMatrices, mergeStaticMeshes };
