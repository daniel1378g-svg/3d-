// World build time in Node (real modules, three.js, a stub 2D canvas): each quality is built in a
// fresh process (`--child`), so every figure is a cold build like the page's single one, and the
// smallest of `--runs` processes is reported (the host is shared); `cpu` is the process CPU time
// (all threads, compiler and GC included) of that run, less sensitive to other load than wall time. With `--phases`, the steps of
// buildWorld() are timed one by one (this tree's world/index.js order) plus the vegetation's own
// timings.
//   node tools/env/build-time.mjs [--src <estoril folder>] [--q high,mid,low] [--runs 5] [--phases]
//     [--warm]   time a second build in the same process (compiled code: the work alone)
// --src points at another checkout of estoril/ (e.g. the base build's source) to compare.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const self = fileURLToPath(import.meta.url);
const src = arg('src', new URL('../..', import.meta.url).pathname).replace(/\/?$/, '/');

if (process.argv.includes('--child')) {
  const context2d = new Proxy(
    {},
    {
      get: (target, key) =>
        key in target ? target[key] : () => ({ addColorStop() {}, data: new Uint8ClampedArray(4) }),
      set: (target, key, value) => ((target[key] = value), true),
    },
  );
  globalThis.document ??= { createElement: () => ({ width: 0, height: 0, getContext: () => context2d }) };
  const quality = arg('q', 'high');
  const pts = JSON.parse(readFileSync(src + 'site/assets/data/track.json', 'utf8')).pts;
  const W = src + 'src/journey/world/';
  const times = {};
  let total;
  if (process.argv.includes('--phases')) {
    const m = {};
    for (const f of [
      'context',
      'track-analysis',
      'terrain',
      'track-surfaces',
      'pits',
      'main-straight',
      'grandstand',
      'paddock',
      'barriers',
      'vegetation',
      'clouds',
      'flags',
    ])
      Object.assign(m, await import(W + f + '.js').catch(() => ({})));
    const shading = await import(src + 'src/journey/env/shading.js').catch(() => ({}));
    let t = performance.now();
    const t0 = t;
    let c = process.cpuUsage();
    const lap = (k) => {
      const n = performance.now();
      const u = process.cpuUsage(c);
      times[k] = Math.round(n - t);
      times[k + '.cpu'] = Math.round((u.user + u.system) / 1000);
      t = n;
      c = process.cpuUsage();
    };
    const ctx = m.createWorldContext(pts, quality);
    lap('context');
    const shape = m.analyseTrack(ctx.track);
    shading.bindTrackModel?.(ctx.materials, ctx.textures.lap, shape.model);
    lap('analyse');
    m.buildGround(ctx);
    m.buildHills(ctx);
    lap('terrain');
    m.buildTrackSurfaces(ctx, shape);
    shading.bindGravelMask?.(ctx.materials, ctx.root);
    lap('surfaces');
    m.buildPitLaneSurface(ctx);
    m.buildPitBuilding(ctx);
    m.buildOuterWallAndFence(ctx);
    m.buildGrandstand(ctx);
    m.buildStartGantry(ctx);
    m.buildPaddock(ctx);
    lap('buildings');
    m.buildArmco?.(ctx, shape);
    m.buildTyreStacks?.(ctx);
    lap('barriers');
    const vegetation = m.buildVegetation
      ? m.buildVegetation(ctx, shape)
      : (m.buildTrees(ctx, shape), m.buildGrassTufts(ctx, shape)); // the base build
    lap('vegetation');
    m.buildClouds(ctx);
    lap('clouds');
    total = Math.round(t - t0);
    Object.assign(
      times,
      Object.fromEntries(Object.entries(vegetation?.timings || {}).map(([k, v]) => ['veg.' + k, v])),
    );
  } else {
    const { buildWorld } = await import(W + 'index.js');
    // --warm: build once untimed first (JIT warmed up), to separate the work from compilation
    if (process.argv.includes('--warm')) buildWorld(pts, { quality });
    const t0 = performance.now();
    const c0 = process.cpuUsage();
    buildWorld(pts, { quality });
    total = Math.round(performance.now() - t0);
    const c = process.cpuUsage(c0);
    times.cpu = Math.round((c.user + c.system) / 1000);
  }
  console.log(JSON.stringify({ total, times }));
} else {
  const runs = +arg('runs', 5);
  for (const quality of arg('q', 'high,mid,low').split(',')) {
    let best = null;
    const all = [];
    for (let r = 0; r < runs; r++) {
      const args = [self, '--child', '--src', src, '--q', quality];
      for (const flag of ['--phases', '--warm']) if (process.argv.includes(flag)) args.push(flag);
      const result = JSON.parse(
        execFileSync(process.execPath, args, { encoding: 'utf8' }).trim().split('\n').pop(),
      );
      all.push(result.total);
      if (!best || result.total < best.total) best = result;
    }
    console.log(`${quality}: min ${best.total} ms of [${all.join(', ')}]`, JSON.stringify(best.times));
  }
}
