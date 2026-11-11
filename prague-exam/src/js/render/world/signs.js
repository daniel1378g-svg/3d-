// Traffic signs of one chunk as one merged mesh: atlas quads facing the traffic they address,
// plus their posts. The posts live in the same mesh (uv.x < -0.5 marks untextured vertices) and
// the back of every plate is drawn grey by the patched fragment shader, so signs cost one draw
// call per chunk.
import { CHUNKS, LIN, toByte, chunkCoord, releaseAfterUpload } from './util.js';
import { angDiff } from '../../data/geo.js';

const BASE = 2.1;                        // bottom edge of the lower sign above the ground
const POST = 0.035;                      // half thickness of a post
const SHADES = [0.62, 0.5, 0.42, 0.55];  // fake lighting on the four post faces

export function createSigns({ net, SIGNS, atlas, anisotropy = 1 }) {
  const S = net.signs, n = S.x.length;
  const defs = S.codes.map((code) => {
    const d = SIGNS[code], uv = d && atlas.uv(code);
    return d && uv ? { w: d.w, h: d.h, uv } : null;
  });
  const unknown = S.codes.filter((c, i) => !defs[i]);
  if (unknown.length) console.warn(`world: no artwork for sign codes ${unknown.join(', ')}; they are not drawn`);
  if (anisotropy > 1 && atlas.texture.anisotropy < anisotropy) atlas.texture.anisotropy = anisotropy;

  // Signs by chunk (counting sort).
  const start = new Uint32Array(CHUNKS * CHUNKS + 1), order = new Uint32Array(n);
  const idOf = (i) => chunkCoord(S.z[i]) * CHUNKS + chunkCoord(S.x[i]);
  for (let i = 0; i < n; i++) start[idOf(i) + 1]++;
  for (let c = 0; c < CHUNKS * CHUNKS; c++) start[c + 1] += start[c];
  const fill = start.slice(0, CHUNKS * CHUNKS);
  for (let i = 0; i < n; i++) order[fill[idOf(i)]++] = i;

  const material = new THREE.MeshBasicMaterial({ map: atlas.texture, vertexColors: true, alphaTest: 0.4, side: THREE.DoubleSide });
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `
      #ifdef USE_MAP
        vec4 sampledDiffuseColor = texture2D( map, vMapUv );
        if ( vMapUv.x < -0.5 ) sampledDiffuseColor = vec4( 1.0 );
        else if ( ! gl_FrontFacing ) sampledDiffuseColor.rgb = vec3( 0.17, 0.175, 0.18 );
        diffuseColor *= sampledDiffuseColor;
      #endif`);
  };
  const plate = toByte(LIN[236]);
  const grey = [LIN[0x8a], LIN[0x8e], LIN[0x91]];

  function build(id) {
    const i0 = start[id], i1 = start[id + 1];
    const list = [];
    for (let k = i0; k < i1; k++) { const i = order[k], d = defs[S.code[i]]; if (d) list.push({ i, d, level: S.level[i], bottom: BASE, post: true, top: 0 }); }
    if (!list.length) return null;
    // An upper sign sits on the post of the lower sign placed at the same spot for the same traffic.
    for (const s of list) s.top = s.bottom + s.d.h;
    for (const s of list) {
      if (s.level === 0) continue;
      const below = list.find((o) => o.level === 0 && Math.hypot(S.x[o.i] - S.x[s.i], S.z[o.i] - S.z[s.i]) < 0.8 && Math.abs(angDiff(S.h[o.i], S.h[s.i])) < 0.4);
      if (!below) continue;
      s.bottom = below.bottom + below.d.h + 0.04; s.top = s.bottom + s.d.h; s.post = false;
      below.top = Math.max(below.top, s.top);
    }
    const posts = list.filter((s) => s.post).length;
    const nv = list.length * 4 + posts * 16, ni = list.length * 6 + posts * 24;
    const pos = new Float32Array(nv * 3), uv = new Float32Array(nv * 2), col = new Uint8Array(nv * 3), idx = new Uint16Array(ni);
    let v = 0, q = 0, x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity, yMax = 0;
    const put = (x, y, z, u, w, r, g, b) => { pos[v * 3] = x; pos[v * 3 + 1] = y; pos[v * 3 + 2] = z; uv[v * 2] = u; uv[v * 2 + 1] = w; col[v * 3] = r; col[v * 3 + 1] = g; col[v * 3 + 2] = b; return v++; };
    const quad = (a, b, c, d) => { idx[q++] = a; idx[q++] = b; idx[q++] = c; idx[q++] = a; idx[q++] = c; idx[q++] = d; };
    for (const s of list) {
      const x = S.x[s.i], z = S.z[s.i], h = S.h[s.i];
      const fx = Math.sin(h), fz = -Math.cos(h), rx = Math.cos(h), rz = Math.sin(h);     // traffic's forward and right
      // The plate hangs just in front of the post, on the side the traffic comes from.
      const cx = x - fx * (POST + 0.012), cz = z - fz * (POST + 0.012), hw = s.d.w / 2, [u0, v0, u1, v1] = s.d.uv;
      quad(put(cx - rx * hw, s.bottom, cz - rz * hw, u0, v0, plate, plate, plate), put(cx + rx * hw, s.bottom, cz + rz * hw, u1, v0, plate, plate, plate),
        put(cx + rx * hw, s.bottom + s.d.h, cz + rz * hw, u1, v1, plate, plate, plate), put(cx - rx * hw, s.bottom + s.d.h, cz - rz * hw, u0, v1, plate, plate, plate));
      x0 = Math.min(x0, x - 1); x1 = Math.max(x1, x + 1); z0 = Math.min(z0, z - 1); z1 = Math.max(z1, z + 1); yMax = Math.max(yMax, s.top);
      if (!s.post) continue;
      const top = s.top - 0.08;
      const cxs = [x - rx * POST - fx * POST, x + rx * POST - fx * POST, x + rx * POST + fx * POST, x - rx * POST + fx * POST];
      const czs = [z - rz * POST - fz * POST, z + rz * POST - fz * POST, z + rz * POST + fz * POST, z - rz * POST + fz * POST];
      for (let f = 0; f < 4; f++) {
        const g2 = (f + 1) % 4, k = SHADES[f], r = toByte(grey[0] * k * 1.6), g = toByte(grey[1] * k * 1.6), b = toByte(grey[2] * k * 1.6);
        quad(put(cxs[f], 0, czs[f], -1, -1, r, g, b), put(cxs[g2], 0, czs[g2], -1, -1, r, g, b), put(cxs[g2], top, czs[g2], -1, -1, r, g, b), put(cxs[f], top, czs[f], -1, -1, r, g, b));
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3, true));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    const c = new THREE.Vector3((x0 + x1) / 2, yMax / 2, (z0 + z1) / 2);
    geo.boundingSphere = new THREE.Sphere(c, Math.hypot(x1 - c.x, yMax / 2, z1 - c.z));
    const mesh = new THREE.Mesh(releaseAfterUpload(geo), material);
    mesh.matrixAutoUpdate = false;
    return mesh;
  }
  return { build, dispose: () => material.dispose(), material };
}
