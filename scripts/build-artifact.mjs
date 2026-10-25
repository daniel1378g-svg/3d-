// Turns dist/index.html into a shareable Claude artifact page (dist/artifact.html):
// the viewer supplies <html>/<head>/<body>, so only the page content is kept, the CSS is
// inlined, and every other file is listed for publishing alongside it (dist/artifact-files.json).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const html = readFileSync(join(dist, 'index.html'), 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];

const title = head.match(/<title>[\s\S]*?<\/title>/)[0];
const metas = [...head.matchAll(/<meta (?:name="(?:claude:viewport-fit-sides|description|theme-color)")[^>]*>/g)].map((m) => m[0]);
const links = [...head.matchAll(/<link [^>]*>/g)].map((m) => m[0]);
const fontLinks = links.filter((l) => /fonts\.(googleapis|gstatic)\.com|rel="preload"/.test(l));
const cssHref = links.find((l) => /rel="stylesheet"/.test(l) && /assets\//.test(l))?.match(/href="([^"]+)"/)[1];
const css = cssHref ? readFileSync(join(dist, cssHref.replace(/^\.\//, '')), 'utf8') : '';
const scripts = [...head.matchAll(/<script [^>]*><\/script>/g)].map((m) => m[0]);

// The artifact host serves JSON but not .glb: repackage the GLB as glTF JSON with its binary
// chunk embedded as a data URI (Meshopt-compressed bytes are kept as they are).
const glb = readFileSync(join(dist, 'models/chandelier.glb'));
const jsonLen = glb.readUInt32LE(12);
const gltf = JSON.parse(glb.subarray(20, 20 + jsonLen).toString('utf8'));
const binStart = 20 + jsonLen;
const binLen = glb.readUInt32LE(binStart);
const bin = glb.subarray(binStart + 8, binStart + 8 + binLen);
const glbBuffer = gltf.buffers.find((b) => !b.uri && !b.extensions?.EXT_meshopt_compression?.fallback);
glbBuffer.uri = `data:application/octet-stream;base64,${bin.toString('base64')}`;
writeFileSync(join(dist, 'models/chandelier.json'), JSON.stringify(gltf));

const page = [
  title,
  '<meta name="nur:model" content="models/chandelier.json" />',
  ...metas,
  ...fontLinks,
  `<style>${css}</style>`,
  body.trim(),
  ...scripts,
].join('\n');
writeFileSync(join(dist, 'artifact.html'), page);

// everything the page loads at runtime
const files = {};
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else {
      const rel = relative(dist, full);
      if (rel === 'index.html' || rel === 'artifact.html' || rel === 'artifact-files.json' || rel.endsWith('.css') || rel.endsWith('.glb')) continue;
      files[rel] = `dist/${rel}`;
    }
  }
};
walk(dist);
writeFileSync(join(dist, 'artifact-files.json'), JSON.stringify(files, null, 2));
console.log(`artifact.html ${Math.round(page.length / 1024)} KB, ${Object.keys(files).length} supporting files`);
