// Node-side reading and writing of data/<name>.pack (see src/js/data/pack.js for the format).
import { gzipSync, gunzipSync } from 'node:zlib';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { encodePack, decodePack } from '../../src/js/data/pack.js';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const DATA_DIR = join(ROOT, 'data');
export const CACHE_DIR = join(ROOT, '.cache');

export function writeSection(name, meta, buffers = {}) {
  mkdirSync(DATA_DIR, { recursive: true });
  const raw = encodePack(meta, buffers);
  const gz = gzipSync(raw, { level: 9 });
  writeFileSync(join(DATA_DIR, `${name}.pack`), gz);
  const kb = (n) => `${(n / 1024).toFixed(0)} kB`;
  console.log(`  wrote data/${name}.pack  ${kb(gz.length)} (raw ${kb(raw.length)})`);
  return gz.length;
}

export function hasSection(name) {
  return existsSync(join(DATA_DIR, `${name}.pack`));
}

export function readSection(name) {
  const gz = readFileSync(join(DATA_DIR, `${name}.pack`));
  return decodePack(new Uint8Array(gunzipSync(gz)));
}

let rawCache = null;
// The OSM extract for the game area: { bbox, nodes: { id: [lon, lat, tags|null] }, ways, rels }.
export function readRaw() {
  if (!rawCache) rawCache = JSON.parse(readFileSync(join(CACHE_DIR, 'raw.json'), 'utf8'));
  return rawCache;
}
