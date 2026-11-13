// The active business. Each one lives in src/brands/<key>.js; the build picks it with --brand (default: fastwheels).
// In the browser bundle the key is baked in as __BRAND__; in Node (page rendering, tools) it comes from FW_BRAND.
import { BRANDS } from './brands/index.js';

/* global __BRAND__ */
const key = (typeof __BRAND__ !== 'undefined' ? __BRAND__ : (typeof process !== 'undefined' && process.env && process.env.FW_BRAND)) || 'fastwheels';
if (!BRANDS[key]) throw new Error(`Unknown brand "${key}". Known: ${Object.keys(BRANDS).join(', ')}`);

/** Entries left as null are not shown anywhere on the site: no link, no label, no placeholder. */
export const CONFIG = {
  ...BRANDS[key],
  // 3D model credits (required by the models' Creative Commons licences).
  credits: [
    { title: '2021 BMW M4 Competition', author: 'Ricy', url: 'https://sketchfab.com/3d-models/2021-bmw-m4-competition-d3f07b471d9f4a2c9a2acf79d88a3645', license: 'CC BY-NC 4.0' },
    { title: 'BMW S1000 RR', author: 'VTX', url: 'https://sketchfab.com/3d-models/bmw-s1000-rr-1873aed292d6465694119bd81860a0c2', license: 'CC BY-NC-SA 4.0' },
  ],
};
