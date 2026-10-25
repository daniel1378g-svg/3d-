import { generateMosaic } from './mosaicGen.js';

self.onmessage = async (e) => {
  const r = await generateMosaic(e.data);
  self.postMessage(r, [r.slot.buffer, r.grout.buffer, r.rnd.buffer, r.shade.buffer, r.normal.buffer]);
};
