// Loads a vehicle pack: { meta, data } where data = base64(gzip(GLB)). See tools/prepare-models.mjs.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const canInflate = typeof DecompressionStream === 'function';

function base64ToBytes(b64) {
  if (typeof Uint8Array.fromBase64 === 'function') return Uint8Array.fromBase64(b64);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function gunzip(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).arrayBuffer();
}

/**
 * @param {string} url  e.g. 'models/m4.json'
 * @param {(fraction: number) => void} [onProgress]  download progress 0..1 (when the size is known)
 * @returns {Promise<{ scene: import('three').Group, meta: object }>}
 */
export async function loadPack(url, onProgress) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  let text;
  const total = Number(res.headers.get('content-length')) || 0;
  if (res.body && total && onProgress) {
    const reader = res.body.getReader();
    const chunks = [];
    let got = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      got += value.length;
      onProgress(Math.min(1, got / total));
    }
    text = await new Blob(chunks).text();
  } else {
    text = await res.text();
  }
  const pack = JSON.parse(text);
  text = null;
  const glb = await gunzip(base64ToBytes(pack.data));
  pack.data = null;
  // GLTFLoader would decode the embedded textures with fetch(blob:) + createImageBitmap. A strict content
  // security policy (the hosted preview has one) can refuse that fetch, while <img src="blob:…"> is allowed,
  // so hide createImageBitmap while the parser is set up: it then falls back to plain image elements.
  const scope = typeof self !== 'undefined' ? self : window;
  const bitmap = scope.createImageBitmap;
  let parsing;
  try { scope.createImageBitmap = undefined; parsing = new GLTFLoader().parseAsync(glb, ''); } finally { scope.createImageBitmap = bitmap; }
  const gltf = await parsing;
  onProgress?.(1);
  return { scene: gltf.scene, meta: pack.meta };
}
