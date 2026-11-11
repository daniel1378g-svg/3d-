// The modules the world renderer builds on. Other people own them. ./fallbacks.js holds plain
// stand-ins with the same APIs; all real modules are in use now, the stand-ins stay only as a
// safety net (facade atlas) and for testing (swap the line marked FALLBACK).
import { fallbackFacadeAtlas } from './fallbacks.js';
import { createSurfaceTextures, createFacadeAtlas as realFacadeAtlas } from '../assets/textures.js';

export { SIGNS, createSignAtlas } from '../assets/signs.js';
export { createSurfaceTextures };
// The real atlas when textures.js provides one, otherwise a plain stand-in.
export const createFacadeAtlas = () => realFacadeAtlas() || fallbackFacadeAtlas();

export * as models from '../assets/models.js';
export { createStreets } from '../streets.js';
// export { createFallbackStreets as createStreets } from './fallbacks.js';   // FALLBACK: plain grey ribbons
