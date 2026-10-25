// Prepares two web copies of the supplied chandelier:
//   chandelier.glb      Meshopt-compressed (smallest; decoder uses WebAssembly)
//   chandelier-q.glb.gz quantized only, gzip-compressed (decodes with the browser's own
//                       DecompressionStream, for pages whose security policy blocks WebAssembly)
// Chain links are simplified: each tiny ring carried ~1,900 triangles.
import { NodeIO, getBounds } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { weld, simplifyPrimitive, compactPrimitive, quantize, dedup, prune, reorder, meshopt } from '@gltf-transform/functions';
import { MeshoptSimplifier, MeshoptEncoder } from 'meshoptimizer';
import { gzipSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const [,, input, outDir] = process.argv;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;

async function base() {
  const doc = await io.read(input);
  for (const anim of doc.getRoot().listAnimations()) anim.dispose();
  await doc.transform(weld());
  let before = 0, after = 0;
  for (const node of doc.getRoot().listNodes()) {
    const mesh = node.getMesh();
    if (!mesh) continue;
    const b = getBounds(node);
    const small = b.max.every((v, i) => v - b.min[i] < 0.016);
    for (const prim of mesh.listPrimitives()) {
      const n = prim.getIndices().getCount() / 3;
      before += n;
      if (small) {
        simplifyPrimitive(prim, { simplifier: MeshoptSimplifier, ratio: 0.25, error: 0.01 });
        compactPrimitive(prim); // drop the vertices the simplified rings no longer use
      }
      after += prim.getIndices().getCount() / 3;
    }
  }
  console.log('triangles', before, '→', after);
  await doc.transform(dedup(), prune({ keepAttributes: true }));
  return doc;
}

{
  const doc = await base();
  await doc.transform(reorder({ encoder: MeshoptEncoder }), quantize(), meshopt({ encoder: MeshoptEncoder, level: 'high' }));
  const bin = await io.writeBinary(doc);
  writeFileSync(`${outDir}/chandelier.glb`, bin);
  console.log('meshopt glb', bin.byteLength);
}
{
  const doc = await base();
  await doc.transform(reorder({ encoder: MeshoptEncoder }), quantize());
  const bin = await io.writeBinary(doc);
  const gz = gzipSync(bin, { level: 9 });
  writeFileSync(`${outDir}/chandelier-q.glb.gz`, gz);
  console.log('quantized glb', bin.byteLength, 'gzip', gz.byteLength);
}
