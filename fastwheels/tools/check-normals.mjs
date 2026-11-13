// Counts vertices whose normal is zero-length or not finite, per material, in the source GLBs (dev/raw/).
// A zero normal becomes NaN in the lighting shader, and one NaN pixel is enough to black out a bloomed frame.
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
for (const file of ['m4', 's1000']) {
  const doc = await io.read(new URL(`../dev/raw/${file}.glb`, import.meta.url).pathname);
  const bad = new Map(); let total = 0, noNormals = 0;
  const v = [0, 0, 0];
  for (const mesh of doc.getRoot().listMeshes()) for (const prim of mesh.listPrimitives()) {
    const n = prim.getAttribute('NORMAL'); const name = prim.getMaterial()?.getName() || '?';
    if (!n) { noNormals++; continue; }
    for (let i = 0; i < n.getCount(); i++) {
      n.getElement(i, v); total++;
      const l = Math.hypot(v[0], v[1], v[2]);
      if (!(l > 0.5) || !Number.isFinite(l)) bad.set(name, (bad.get(name) || 0) + 1);
    }
  }
  console.log(file, 'vertices', total, '· primitives without normals', noNormals, '· bad normals by material', JSON.stringify([...bad]));
}
