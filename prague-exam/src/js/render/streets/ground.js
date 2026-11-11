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
  // Colour and noise amplitude per class, then one integer pass over the pixels.
  const nc = meta.cover.length, cr = new Int32Array(nc), cg = new Int32Array(nc), cb = new Int32Array(nc), cn = new Int32Array(nc);
  meta.cover.forEach((name, i) => { const t = COVER_COLOURS[name] || COVER_COLOURS.urban; cr[i] = t[0]; cg[i] = t[1]; cb[i] = t[2]; cn[i] = t[3]; });
  const data = new Uint8Array(SIZE * SIZE * 4), k = N / SIZE;
  for (let j = 0, o = 0; j < SIZE; j++) {
    for (let i = 0; i < SIZE; i++, o += 4) {
      const h = hash(i, j);
      // Jitter the lookup by up to half a cell so class borders are ragged instead of stair-stepped.
      let c = ((i + 0.5) * k + ((h & 255) - 128) * 0.0047) | 0, r = ((j + 0.5) * k + (((h >>> 8) & 255) - 128) * 0.0047) | 0;
      if (c >= N) c = N - 1;
      if (r >= N) r = N - 1;
      let cls = cover[r * N + c];
      if (cls >= nc) cls = 0;
      const n = ((((h >>> 16) & 255) - 128) * cn[cls]) >> 7;
      data[o] = cr[cls] + n; data[o + 1] = cg[cls] + n; data[o + 2] = cb[cls] + n; data[o + 3] = 255;
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
      .replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.rgb *= ( texture2D( groundDetail, vGroundXZ * 0.31 ).g * 1.3 + 0.35 ) * ( texture2D( groundDetail, vGroundXZ * 0.043 ).g * 0.6 + 0.7 );');
  };
  material.customProgramCacheKey = () => 'streets-ground';

  // A grid, not one big quad: depth interpolated across a 9 km triangle is too coarse to keep the
  // ground 6 cm under the roads right in front of the camera.
  const R = HALF + MARGIN, CELLS = 56, step = (2 * R) / CELLS, V = CELLS + 1;
  const pos = new Float32Array(V * V * 3), nrm = new Float32Array(V * V * 3), uv = new Float32Array(V * V * 2), idx = new Uint16Array(CELLS * CELLS * 6);
  for (let j = 0, v = 0; j < V; j++) for (let i = 0; i < V; i++, v++) {
    const x = -R + i * step, z = -R + j * step;
    pos[v * 3] = x; pos[v * 3 + 1] = Y; pos[v * 3 + 2] = z; nrm[v * 3 + 1] = 1;
    uv[v * 2] = (x + HALF) / (2 * HALF); uv[v * 2 + 1] = (z + HALF) / (2 * HALF);
  }
  for (let j = 0, o = 0; j < CELLS; j++) for (let i = 0; i < CELLS; i++, o += 6) {
    const a = j * V + i, b = a + 1, c = a + V, d = c + 1;
    idx[o] = a; idx[o + 1] = d; idx[o + 2] = b; idx[o + 3] = a; idx[o + 4] = c; idx[o + 5] = d;
  }
  const geometry = new T.BufferGeometry();
  geometry.setAttribute('position', new T.BufferAttribute(pos, 3));
  geometry.setAttribute('normal', new T.BufferAttribute(nrm, 3));
  geometry.setAttribute('uv', new T.BufferAttribute(uv, 2));
  geometry.setIndex(new T.BufferAttribute(idx, 1));
  const mesh = new T.Mesh(geometry, material);
  mesh.name = 'ground';
  mesh.frustumCulled = false;
  mesh.matrixAutoUpdate = false;
  return mesh;
}
