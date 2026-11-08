// Static box batches: many axis-aligned (or yawed) boxes that share a material merged into one mesh,
// so a building made of a few hundred boxes costs one draw per material instead of one per box.
//
// Each box keeps BoxGeometry's own normals and per-face UVs (0..1 on every face), so textured boxes
// (doors, glazing) look as they did as separate meshes. A batch whose footprint is wider than 60 m
// is indexed triangle by triangle by depth-range.js (exact), so merge whole buildings rather than
// small clusters; a camera path that may enter a small building keeps it as its own BoxGeometry mesh.
//
// Build time only.
import {
  BoxGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  Matrix3,
  Matrix4,
  Mesh,
  Quaternion,
  Vector3,
} from 'three';

const UNIT = new BoxGeometry(1, 1, 1);
const matrix = new Matrix4();
const normalMatrix = new Matrix3();
const quaternion = new Quaternion();
const scale = new Vector3();
const offset = new Vector3();
const v = new Vector3();
const AXIS_Y = new Vector3(0, 1, 0);

/**
 * @returns {{ add: Function, build: Function, count: number }}
 *   add(width, height, depth, material, x, baseY, z, { castShadow = true, yaw = 0, pitch = 0 })
 *     adds a box width (X) × height (Y) × depth (Z) whose bottom centre is (x, baseY, z) before the
 *     yaw (about Y) / pitch (about X, through its centre) rotations;
 *   build(parent, name) creates one Mesh per (material, castShadow) pair and adds them to parent.
 */
function createBoxBatch() {
  const groups = new Map(); // material → { cast: [], still: [] } of Float32 matrix arrays
  let count = 0;
  return {
    get count() {
      return count;
    },
    add(width, height, depth, material, x, baseY, z, { castShadow = true, yaw = 0, pitch = 0 } = {}) {
      if (!groups.has(material)) groups.set(material, { cast: [], still: [] });
      quaternion.setFromAxisAngle(AXIS_Y, yaw);
      if (pitch) quaternion.multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), pitch));
      matrix.compose(offset.set(x, baseY + height / 2, z), quaternion, scale.set(width, height, depth));
      groups.get(material)[castShadow ? 'cast' : 'still'].push(matrix.clone());
      count++;
    },
    build(parent, name = 'batch') {
      const meshes = [];
      const source = UNIT.attributes;
      const index = UNIT.index.array;
      for (const [material, lists] of groups)
        for (const [kind, list] of Object.entries(lists)) {
          if (!list.length) continue;
          const vertices = source.position.count;
          const positions = new Float32Array(list.length * vertices * 3);
          const normals = new Float32Array(list.length * vertices * 3);
          const uvs = new Float32Array(list.length * vertices * 2);
          const indices = new Uint32Array(list.length * index.length);
          list.forEach((m, b) => {
            normalMatrix.getNormalMatrix(m);
            for (let i = 0; i < vertices; i++) {
              v.fromBufferAttribute(source.position, i).applyMatrix4(m);
              positions.set([v.x, v.y, v.z], (b * vertices + i) * 3);
              v.fromBufferAttribute(source.normal, i).applyMatrix3(normalMatrix).normalize();
              normals.set([v.x, v.y, v.z], (b * vertices + i) * 3);
              uvs[(b * vertices + i) * 2] = source.uv.getX(i);
              uvs[(b * vertices + i) * 2 + 1] = source.uv.getY(i);
            }
            for (let k = 0; k < index.length; k++) indices[b * index.length + k] = index[k] + b * vertices;
          });
          const geometry = new BufferGeometry();
          geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
          geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
          geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
          geometry.setIndex([...indices]);
          const mesh = new Mesh(geometry, material);
          mesh.name = name;
          mesh.castShadow = kind === 'cast';
          mesh.receiveShadow = true;
          parent.add(mesh);
          meshes.push(mesh);
        }
      return meshes;
    },
  };
}

export { createBoxBatch };
