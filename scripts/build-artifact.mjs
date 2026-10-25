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

// The artifact host serves JSON but not .glb/.gz, and its security policy blocks WebAssembly
// (the Meshopt decoder) and fetches of data: URLs. So the page loads the gzipped, quantized
// model from a JSON file as base64; it is inflated in plain JavaScript (fflate).
const gz = readFileSync(join(dist, 'models/chandelier-q.glb.gz'));
writeFileSync(join(dist, 'models/chandelier-q.json'), JSON.stringify({ format: 'glb+gzip', data: gz.toString('base64') }));

const page = [
  title,
  '<meta name="nur:model" content="models/chandelier-q.json" />',
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
      if (rel === 'index.html' || rel === 'artifact.html' || rel === 'artifact-files.json' || rel.endsWith('.css') || rel.endsWith('.glb') || rel.endsWith('.gz')) continue;
      files[rel] = `dist/${rel}`;
    }
  }
};
walk(dist);
writeFileSync(join(dist, 'artifact-files.json'), JSON.stringify(files, null, 2));
console.log(`artifact.html ${Math.round(page.length / 1024)} KB, ${Object.keys(files).length} supporting files`);
