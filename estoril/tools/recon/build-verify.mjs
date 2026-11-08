import { build } from 'esbuild';
await build({ entryPoints: ['tools/recon/out/journey.pretty.js'], bundle: true, format: 'esm', minify: true, target: 'es2020',
  outfile: 'tools/recon/verify/journey-rebuilt.js', logLevel: 'warning' });
