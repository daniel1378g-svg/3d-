// Loads the packed hero-car body ("ce-mesh/2", written offline by tools/car/bake_body.py).
//
// hero-car-body.json describes one binary buffer (hero-car-body.bin, in the same folder):
//   position float32 × 3 (metres, +x forward, +y up, +z right), uv uint16 × 2 normalised,
//   normal int16 × 3 normalised (creased normals, computed offline), index uint16,
// plus `groups` (index ranges sorted by material) and the texture file names. The page only wraps
// the buffer in typed-array views: no per-vertex work at load time.
import { BufferAttribute, BufferGeometry, RepeatWrapping, SRGBColorSpace, TextureLoader } from 'three';

const ARRAY_TYPES = { float32: Float32Array, uint16: Uint16Array, int16: Int16Array };

/** A typed-array view of `count` elements of `spec.type` at `spec.offset` in `buffer`. */
function view(buffer, spec, count) {
  const Type = ARRAY_TYPES[spec.type];
  if (!Type) throw new Error('ce-mesh/2: unsupported type ' + spec.type);
  return new Type(buffer, spec.offset, count);
}

/**
 * @param {string} url hero-car-body.json
 * @param {(progress: {loaded: number, total: number}) => void} [onProgress] after the buffer (1/2)
 *   and after the textures (2/2)
 * @returns {Promise<{ geometry: BufferGeometry, groups: Array<{name: string, start: number, count: number}>,
 *   textures: Record<string, import('three').Texture>, desc: object }>}
 */
async function loadBodyAsset(url, onProgress) {
  const baseUrl = url.slice(0, url.lastIndexOf('/') + 1);
  const desc = await (await fetch(url)).json();
  if (desc.format !== 'ce-mesh/2') throw new Error(`${url}: expected ce-mesh/2, got ${desc.format}`);
  const buffer = await (await fetch(baseUrl + desc.buffer)).arrayBuffer();
  onProgress && onProgress({ loaded: 1, total: 2 });

  const geometry = new BufferGeometry();
  const vertexCount = desc.vertexCount;
  for (const [name, spec] of Object.entries(desc.attributes)) {
    const array = view(buffer, spec, vertexCount * spec.size);
    geometry.setAttribute(name, new BufferAttribute(array, spec.size, !!spec.normalized));
  }
  geometry.setIndex(new BufferAttribute(view(buffer, desc.index, desc.indexCount), 1));
  desc.groups.forEach((group, materialIndex) => geometry.addGroup(group.start, group.count, materialIndex));
  geometry.computeBoundingSphere();

  // glTF-style uvs (flipY false); only the base colour holds sRGB colour data
  const loader = new TextureLoader();
  const loadTexture = async (file, isColor) => {
    const texture = await loader.loadAsync(baseUrl + file);
    texture.flipY = false;
    texture.wrapS = texture.wrapT = RepeatWrapping;
    if (isColor) texture.colorSpace = SRGBColorSpace;
    return texture;
  };
  const names = Object.keys(desc.textures);
  const loaded = await Promise.all(names.map((key) => loadTexture(desc.textures[key], key === 'map')));
  const textures = Object.fromEntries(names.map((key, i) => [key, loaded[i]]));
  onProgress && onProgress({ loaded: 2, total: 2 });
  return { geometry, groups: desc.groups, textures, desc };
}

export { loadBodyAsset };
