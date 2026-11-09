// Loads the packed hero-car body ("ce-mesh/2", written offline by tools/car/bake_body.py).
//
// hero-car-body.json describes one binary buffer (hero-car-body.bin, in the same folder):
//   position int16 × 3 normalised: metres = positionTransform.offset + positionTransform.scale × value
//            (+x forward, +y up, +z right; one scale for all axes, so the normals need no correction),
//   uv uint16 × 2 normalised, normal int8 × 3 normalised (creased normals, computed offline), index uint16,
// plus `groups` (index ranges sorted by material), the texture file names (base colour, normal map and
// an ORM map: baked ambient occlusion in R, per-texel roughness in G and clearcoat in B), `footprint`,
// the car's baked ground occlusion (a grayscale image over `size` metres of road), and `lowPoints`.
// The page only wraps the buffer in typed-array views (the position transform goes on the mesh): no
// per-vertex work at load time.
//
// `bufferEncoding: "base64"` means the buffer file is the same bytes as base64 text. The Artifact
// preview uses it (scripts/build-artifact.mjs), because its host does not serve binary files.
import {
  BufferAttribute,
  BufferGeometry,
  ClampToEdgeWrapping,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
} from 'three';

const ARRAY_TYPES = { float32: Float32Array, uint16: Uint16Array, int16: Int16Array, int8: Int8Array };

/** A typed-array view of `count` elements of `spec.type` at `spec.offset` in `buffer`. */
function view(buffer, spec, count) {
  const Type = ARRAY_TYPES[spec.type];
  if (!Type) throw new Error('ce-mesh/2: unsupported type ' + spec.type);
  return new Type(buffer, spec.offset, count);
}

/** The bytes of base64 `text` as a fresh ArrayBuffer (offset 0, so typed-array views stay aligned). */
function decodeBase64(text) {
  const binary = atob(text.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/**
 * @param {string} url hero-car-body.json
 * @param {(progress: {loaded: number, total: number}) => void} [onProgress] after the buffer (1/2)
 *   and after the textures (2/2)
 * @returns {Promise<{ geometry: BufferGeometry, groups: Array<{name: string, start: number, count: number}>,
 *   textures: Record<string, import('three').Texture>, desc: object }>} textures: map, normalMap, ormMap
 *   and footprint; desc.positionTransform ({ offset: [x, y, z], scale }) maps the geometry to metres
 */
async function loadBodyAsset(url, onProgress) {
  const baseUrl = url.slice(0, url.lastIndexOf('/') + 1);
  const desc = await (await fetch(url)).json();
  if (desc.format !== 'ce-mesh/2') throw new Error(`${url}: expected ce-mesh/2, got ${desc.format}`);
  const response = await fetch(baseUrl + desc.buffer);
  const buffer =
    desc.bufferEncoding === 'base64' ? decodeBase64(await response.text()) : await response.arrayBuffer();
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
  const files = { ...desc.textures };
  if (desc.footprint) files.footprint = desc.footprint.map;
  const names = Object.keys(files);
  const loaded = await Promise.all(names.map((key) => loadTexture(files[key], key === 'map')));
  const textures = Object.fromEntries(names.map((key, i) => [key, loaded[i]]));
  if (textures.footprint) {
    // a plain image on a PlaneGeometry
    textures.footprint.flipY = true;
    textures.footprint.wrapS = textures.footprint.wrapT = ClampToEdgeWrapping;
  }
  onProgress && onProgress({ loaded: 2, total: 2 });
  return { geometry, groups: desc.groups, textures, desc };
}

export { loadBodyAsset };
