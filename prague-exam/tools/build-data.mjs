// Runs the data steps in tools/steps/ in file-name order. Each step is an ES module that
// default-exports an async function and writes one or more data/<section>.pack files.
//
//   node tools/build-data.mjs            run every step
//   node tools/build-data.mjs 10 20      run only the steps whose file name starts with 10 or 20
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './lib/packio.mjs';

const dir = join(ROOT, 'tools', 'steps');
const only = process.argv.slice(2);
const steps = readdirSync(dir).filter((f) => /^\d+.*\.mjs$/.test(f)).sort();
for (const file of steps) {
  if (only.length && !only.some((p) => file.startsWith(p))) continue;
  const t0 = performance.now();
  console.log(`\n== ${file}`);
  const mod = await import(pathToFileURL(join(dir, file)).href);
  await mod.default();
  console.log(`   ${((performance.now() - t0) / 1000).toFixed(1)} s`);
}
