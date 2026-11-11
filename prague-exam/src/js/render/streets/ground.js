// The ground of the whole map: one plane, coloured from the 3 m land-cover raster.
// Uses the global THREE.
import { HALF } from '../../data/geo.js';

// sRGB colours per cover class; `n` = how much per-pixel noise the class gets.
const COVER_COLOURS = {
  urban: [150, 148, 143, 9], grass: [98, 128, 62, 14], wood: [52, 82, 44, 16], water: [84, 108, 124, 5],
  industrial: [134, 132, 128, 10], yard: [128, 138, 112, 11], paved: [122, 122, 120, 8], sport: [158, 96, 76, 8],
  plaza: [168, 162, 150, 9], field: [150, 152, 84, 14], garden: [96, 122, 70, 16], dirt: [136, 112, 84, 14],
};
const SIZE = 2048, MARGIN = 900, Y = -0.06;

function hash(a, b) {
  let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}

export function createGround(ground, anisotropy) {
  const T = THREE, { meta, buf } = ground, N = meta.size, cover = buf.cover;
  const table = meta.cover.map((name) => COVER_COLOURS[name] || COVER_COLOURS.urban);
  const data = new Uint8Array(SIZE * SIZE * 4), k = N / SIZE;
  for (let j = 0; j < SIZE; j++) {
    for (let i = 0; i < SIZE; i++) {
      const h = hash(i, j);
      // Jitter the lookup by up to half a cell so class borders are ragged instead of stair-stepped.
      let c = Math.floor((i + 0.5) * k + ((h & 255) / 255 - 0.5) * 1.2), r = Math.floor((j + 0.5) * k + (((h >>> 8) & 255) / 255 - 0.5) * 1.2);
      c = c < 0 ? 0 : c >= N ? N - 1 : c; r = r < 0 ? 0 : r >= N ? N - 1 : r;
      const t = table[cover[r * N + c]] || table[0], n = (((h >>> 16) & 255) / 255 - 0.5) * 2 * t[3], o = (j * SIZE + i) * 4;
      data[o] = t[0] + n; data[o + 1] = t[1] + n; data[o + 2] = t[2] + n * 0.8; data[o + 3] = 255;
    }
  }
  const map = new T.DataTexture(data, SIZE, SIZE, T.RGBAFormat, T.UnsignedByteType);
  map.colorSpace = T.SRGBColorSpace;
  map.generateMipmaps = true; map.minFilter = T.LinearMipmapLinearFilter; map.magFilter = T.LinearFilter;
  map.wrapS = map.wrapT = T.ClampToEdgeWrapping;
  map.anisotropy = anisotropy;
  map.needsUpdate = true;

  // Fine grain: the cover texture has 3.5 m texels, far too soft next to the car. A small tiling
  // noise texture, sampled at two scales in world space, multiplies it.
  const D = 128, dd = new Uint8Array(D * D * 4);
  for (let i = 0; i < D * D; i++) { const v = 96 + (hash(i, 77) & 63); dd[i * 4] = dd[i * 4 + 1] = dd[i * 4 + 2] = v; dd[i * 4 + 3] = 255; }
  const detail = new T.DataTexture(dd, D, D, T.RGBAFormat, T.UnsignedByteType);
  detail.generateMipmaps = true; detail.minFilter = T.LinearMipmapLinearFilter; detail.magFilter = T.LinearFilter;
  detail.wrapS = detail.wrapT = T.RepeatWrapping;
  detail.needsUpdate = true;

  const material = new T.MeshLambertMaterial({ map, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 2 });
  material.onBeforeCompile = (sh) => {
    sh.uniforms.groundDetail = { value: detail };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vGroundXZ;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGroundXZ = position.xz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform sampler2D groundDetail;\nvarying vec2 vGroundXZ;')
      .replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.rgb *= texture2D( groundDetail, vGroundXZ * 0.31 ).g * texture2D( groundDetail, vGroundXZ * 0.043 ).g * 4.0;');
  };
  material.customProgramCacheKey = () => 'streets-ground';

  const R = HALF + MARGIN, u0 = -MARGIN / (2 * HALF), u1 = 1 - u0;
  const geometry = new T.BufferGeometry();
  geometry.setAttribute('position', new T.BufferAttribute(new Float32Array([-R, Y, -R, R, Y, -R, R, Y, R, -R, Y, R]), 3));
  geometry.setAttribute('normal', new T.BufferAttribute(new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]), 3));
  geometry.setAttribute('uv', new T.BufferAttribute(new Float32Array([u0, u0, u1, u0, u1, u1, u0, u1]), 2));
  geometry.setIndex([0, 2, 1, 0, 3, 2]);
  const mesh = new T.Mesh(geometry, material);
  mesh.name = 'ground';
  mesh.frustumCulled = false;
  mesh.matrixAutoUpdate = false;
  return mesh;
}
