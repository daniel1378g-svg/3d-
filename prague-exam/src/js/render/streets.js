// Street surfaces: the ground, carriageways, junction areas, kerbs and pavements, road markings,
// tram tracks and railway beds. Uses the global THREE.
//
//   createStreets({ net, ground, surfaces, signAtlas, anisotropy })
//     -> { ground, buildChunk(cx, cz), disposeChunk(group) }
//
// A chunk is at most four draw calls:
//   surface   everything lit that lies on the ground: asphalt, cobbles, pavements, kerbs, track beds
//   overlay   lit pieces laid on top of a road: edge strips, embedded track beds, rails, speed humps
//   markings  white and yellow paint, unlit
//   decals    lane arrows from the sign atlas
// The first two share one shader: a Lambert material that reads its texture from an array texture
// with one layer per surface kind, so cobbles, mosaic and asphalt cost one draw call together.
// The geometry itself comes from streets/builder.js, which has no three.js in it.
import { createStreetBuilder, LAYERS, DEFAULT_METRES } from './streets/builder.js';
import { createGround } from './streets/ground.js';

const TILE = 512;

// One layer per name in LAYERS, copied from the surface canvases.
function buildSurfaceArray(surfaces, anisotropy) {
  const T = THREE, n = LAYERS.length;
  const data = new Uint8Array(TILE * TILE * 4 * n), metres = DEFAULT_METRES.slice();
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = TILE;
  const g = canvas.getContext('2d', { willReadFrequently: true });
  const draw = (name) => {
    const tex = surfaces[name] || surfaces.asphalt;
    g.setTransform(1, 0, 0, -1, 0, TILE);                        // row 0 of the data is v = 0
    g.drawImage(tex.image, 0, 0, TILE, TILE);
    g.setTransform(1, 0, 0, 1, 0, 0);
    return (tex.userData && tex.userData.metres) || 2;
  };
  LAYERS.forEach((name, i) => {
    if (name === 'flat') { g.fillStyle = '#fff'; g.fillRect(0, 0, TILE, TILE); metres[i] = 1; }
    else if (name === 'sleepers') {
      // Railway bed seen from above: ballast with two sleepers per tile and darker shoulders.
      // u runs across the 3.4 m bed, v along the track (1.2 m per tile).
      draw('ballast');
      g.fillStyle = 'rgba(60, 50, 42, 0.92)';
      for (const y of [0.14, 0.64]) g.fillRect(TILE * 0.12, TILE * y, TILE * 0.76, TILE * 0.21);
      metres[i] = 1.2;
    } else metres[i] = draw(name);
    data.set(g.getImageData(0, 0, TILE, TILE).data, i * TILE * TILE * 4);
  });
  const texture = new T.DataArrayTexture(data, TILE, TILE, n);
  texture.format = T.RGBAFormat; texture.type = T.UnsignedByteType;
  texture.colorSpace = T.SRGBColorSpace;
  texture.wrapS = texture.wrapT = T.RepeatWrapping;
  texture.generateMipmaps = true; texture.minFilter = T.LinearMipmapLinearFilter; texture.magFilter = T.LinearFilter;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return { texture, metres };
}

function surfaceMaterial(texture, overlay) {
  const m = new THREE.MeshLambertMaterial({ vertexColors: true });
  if (overlay) { m.polygonOffset = true; m.polygonOffsetFactor = -1; m.polygonOffsetUnits = -1; }
  m.onBeforeCompile = (sh) => {
    sh.uniforms.surfMap = { value: texture };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute vec3 suv;\nvarying vec3 vSuv;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvSuv = suv;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform highp sampler2DArray surfMap;\nvarying vec3 vSuv;')
      .replace('#include <map_fragment>', 'diffuseColor *= texture( surfMap, vec3( vSuv.xy, floor( vSuv.z + 0.5 ) ) );');
  };
  m.customProgramCacheKey = () => 'streets-surface';
  return m;
}

// Slightly uneven white, so paint does not look like a vector overlay.
function wearTexture() {
  const T = THREE, S = 128, d = new Uint8Array(S * S * 4);
  let seed = 12345;
  for (let i = 0; i < S * S; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    const r = (seed >>> 8) & 255, v = r < 10 ? 150 + r * 4 : 222 + (r & 31);
    d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = v; d[i * 4 + 3] = 255;
  }
  const t = new T.DataTexture(d, S, S, T.RGBAFormat, T.UnsignedByteType);
  t.wrapS = t.wrapT = T.RepeatWrapping;
  t.generateMipmaps = true; t.minFilter = T.LinearMipmapLinearFilter; t.magFilter = T.LinearFilter;
  t.needsUpdate = true;
  return t;
}

export function createStreets({ net, ground, surfaces, signAtlas, anisotropy = 4 }) {
  const T = THREE;
  const arr = buildSurfaceArray(surfaces, anisotropy);
  const builder = createStreetBuilder(net, { ground, uvOf: signAtlas ? (code) => signAtlas.uv(code) : null, metres: arr.metres });

  const matSurface = surfaceMaterial(arr.texture, false), matOverlay = surfaceMaterial(arr.texture, true);
  const matMarks = new T.MeshBasicMaterial({ vertexColors: true, map: wearTexture(), polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -3 });
  let matDecal = null;
  if (signAtlas) {
    if (signAtlas.texture.anisotropy < anisotropy) { signAtlas.texture.anisotropy = anisotropy; signAtlas.texture.needsUpdate = true; }
    matDecal = new T.MeshBasicMaterial({ map: signAtlas.texture, color: 0xe4e4dc, alphaTest: 0.5, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -5 });
  }

  function mesh(B, material, kind, order) {
    if (!B.ni || !material) return null;
    const g = new T.BufferGeometry(), nv = B.nv;
    g.setAttribute('position', new T.BufferAttribute(B.pos.slice(0, nv * 3), 3));
    if (kind === 0) {
      g.setAttribute('normal', new T.BufferAttribute(B.nrm.slice(0, nv * 3), 3, true));
      g.setAttribute('suv', new T.BufferAttribute(B.uv.slice(0, nv * 3), 3));
      g.setAttribute('color', new T.BufferAttribute(B.col.slice(0, nv * 3), 3, true));
    } else {
      const uv = new Float32Array(nv * 2);
      for (let i = 0; i < nv; i++) { uv[i * 2] = B.uv[i * 3]; uv[i * 2 + 1] = B.uv[i * 3 + 1]; }
      g.setAttribute('uv', new T.BufferAttribute(uv, 2));
      if (kind === 1) g.setAttribute('color', new T.BufferAttribute(B.col.slice(0, nv * 3), 3, true));
    }
    g.setIndex(new T.BufferAttribute(nv > 65535 ? B.idx.slice(0, B.ni) : Uint16Array.from(B.idx.subarray(0, B.ni)), 1));
    g.computeBoundingSphere();
    const m = new T.Mesh(g, material);
    m.renderOrder = order;
    m.matrixAutoUpdate = false;
    return m;
  }

  function buildChunk(cx, cz) {
    const d = builder.build(cx, cz), group = new T.Group();
    group.name = `streets ${cx},${cz}`;
    group.position.set(d.ox, 0, d.oz);
    for (const m of [mesh(d.surf, matSurface, 0, 0), mesh(d.over, matOverlay, 0, 1), mesh(d.mark, matMarks, 1, 2), mesh(d.decal, matDecal, 2, 3)]) if (m) group.add(m);
    group.updateMatrix();
    return group;
  }
  function disposeChunk(group) {
    for (const m of group.children) if (m.geometry) m.geometry.dispose();
  }
  return { ground: createGround(ground, anisotropy), buildChunk, disposeChunk };
}
