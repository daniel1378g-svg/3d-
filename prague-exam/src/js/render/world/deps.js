// The modules the world renderer builds on. Other people own them; while one is missing its
// line points at the stand-in in ./fallbacks.js instead. To switch to the real module, change
// the one line marked FALLBACK.
import { fallbackFacadeAtlas } from './fallbacks.js';
import { createSurfaceTextures, createFacadeAtlas as realFacadeAtlas } from '../assets/textures.js';

export { SIGNS, createSignAtlas } from '../assets/signs.js';
export { createSurfaceTextures };
// The real atlas when textures.js provides one, otherwise a plain stand-in.
export const createFacadeAtlas = () => realFacadeAtlas() || fallbackFacadeAtlas();

export * as models from '../assets/models.js';
export { createFallbackStreets as createStreets } from './fallbacks.js';      // FALLBACK for ../streets.js
