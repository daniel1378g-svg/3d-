// Prints, for journey positions t, the camera position and target, the car position and the scene
// cost (renderer.info: draw calls and triangles summed over every render call of the frame, shadow
// passes included) through the page's capture hook. Used to design fixed --cam views and to measure
// the environment's cost per quality.
//
// node tools/env/probe.mjs --base http://127.0.0.1:8080/ --t 0.05,0.375 [--q high] [--size 1440x900]
//   [--textures 1]   also estimate the GPU memory of every texture in the scene (MB, mipmaps included)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const base = arg('base', 'http://127.0.0.1:8080/');
const ts = arg('t', '0.05,0.375,0.5,0.7,0.95').split(',').map(Number);
const q = arg('q', 'high');
const [w, h] = arg('size', '1440x900').split('x').map(Number);
const textures = arg('textures', '0') === '1';

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: w, height: h } });
const messages = [];
page.on('pageerror', (e) => messages.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') messages.push(m.type() + ': ' + m.text());
});
await page.goto(`${base}index.html?capture=1&3d=force&q=${q}`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__cap === 'function' && window.__journey, null, {
  timeout: 300000,
});
const rows = await page.evaluate(
  ([ts, textures]) => {
    const J = window.__journey;
    const { renderer, camera, scene } = J;
    renderer.info.autoReset = false;
    const out = [];
    for (const t of ts) {
      window.__cap(t, 0);
      renderer.info.reset();
      window.__cap(t, 0);
      const p = camera.position;
      const d = camera.getWorldDirection(new p.constructor());
      const c = J.car.root.position;
      out.push({
        t,
        cam: [p.x, p.y, p.z].map((v) => +v.toFixed(2)),
        dir: [d.x, d.y, d.z].map((v) => +v.toFixed(3)),
        fov: camera.fov,
        car: [c.x, c.y, c.z].map((v) => +v.toFixed(2)),
        calls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
      });
    }
    renderer.info.autoReset = true;
    let textureMB = null;
    if (textures) {
      const seen = new Set();
      let bytes = 0;
      // bytes per texel from the format (RedFormat 1028: 1 channel) and type (half 1016 / float 1015)
      const size = (value) => {
        if (!value || !value.isTexture || seen.has(value)) return;
        seen.add(value);
        const image = value.image || {};
        const channels = value.format === 1028 ? 1 : 4;
        const bytesPerChannel = value.type === 1016 ? 2 : value.type === 1015 ? 4 : 1;
        const mipmapped = [1004, 1005, 1007, 1008].includes(value.minFilter); // the *Mipmap* filters
        const mips = value.generateMipmaps !== false && mipmapped ? 4 / 3 : 1;
        bytes += (image.width || 0) * (image.height || 0) * channels * bytesPerChannel * mips;
      };
      scene.traverse((o) => {
        const materials = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
        for (const m of materials) {
          for (const value of Object.values(m)) size(value);
          for (const u of Object.values(m.userData?.uniforms || {})) size(u && u.value);
        }
      });
      textureMB = { count: seen.size, MB: +(bytes / 1048576).toFixed(2) };
    }
    return {
      out,
      textureMB,
      info: { geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures },
    };
  },
  [ts, textures],
);
for (const r of rows.out) console.log(JSON.stringify(r));
console.log('memory', JSON.stringify(rows.info), 'textures', JSON.stringify(rows.textureMB));
if (messages.length) console.log('PAGE MESSAGES:\n' + [...new Set(messages)].join('\n'));
await browser.close();
