// Renders the still images the page uses while 3D loads, and as the before/after alternative when it cannot run.
// Needs the dev server:  node tools/serve.mjs 5173 &   then   node tools/render-posters.mjs
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }
const base = process.argv[2] || 'http://127.0.0.1:5173';
const out = new URL('../public/img/', import.meta.url).pathname;
const P = { exterior: 0.02, door: 0.3, 'cabin-off': 0.5, 'cabin-on': 0.72, 'roof-off': 0.865, 'roof-on': 1 };
const shots = [
  ['poster-car', 'mode=config&vehicle=car&az=-41.25&paint=14246e', 1280, 800],
  ['poster-bike', 'mode=config&vehicle=bike&az=-41.25&paint=14246e', 1280, 800],
  ...Object.entries(P).map(([name, p]) => [`still-${name}`, `mode=interior&p=${p}&ambient=3d6bff&bright=0.85&paint=14246e`, 1280, 720]),
];
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const [name, query, w, h] of shots) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.log(name, 'pageerror', e.message));
  await page.goto(`${base}/dev/scene.html?${query}&dpr=1&tier=high`);
  await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
  await page.waitForTimeout(600);
  const png = await page.screenshot({ type: 'png', timeout: 240000 });
  await sharp(png).webp({ quality: 80 }).toFile(join(out, `${name}.webp`));
  await page.close();
  console.log('rendered', name);
}
await browser.close();
