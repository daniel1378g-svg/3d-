// Renders the still images the page uses while 3D loads, and as the before/after alternative when it cannot run.
// Needs the dev server:  node tools/serve.mjs 5173 &   then   node tools/render-posters.mjs [base] [--brand overlay]
// A brand's pictures go to public/brands/<key>/img/ and replace the shared ones in that brand's build.
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }
import { mkdirSync } from 'node:fs';
const args = process.argv.slice(2);
const brand = args.includes('--brand') ? args[args.indexOf('--brand') + 1] : null;
const base = args.find((a) => a.startsWith('http')) || 'http://127.0.0.1:5173';
const out = new URL(brand ? `../public/brands/${brand}/img/` : '../public/img/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });
let shots;
if (!brand) {
  const P = { exterior: 0.02, door: 0.3, 'cabin-off': 0.5, 'cabin-on': 0.72, 'roof-off': 0.865, 'roof-on': 1 };
  shots = [
    ['poster-car', 'mode=config&vehicle=car&az=-41.25&paint=14246e', 1280, 800],
    ['poster-bike', 'mode=config&vehicle=bike&az=-41.25&paint=14246e', 1280, 800],
    ...Object.entries(P).map(([name, p]) => [`still-${name}`, `mode=interior&p=${p}&ambient=3d6bff&bright=0.85&paint=14246e`, 1280, 720]),
  ];
} else {
  // The brand's own starting colour, room lighting and interior sequence.
  process.env.FW_BRAND = brand;
  const { CONFIG } = await import('../src/config.js');
  const { COLORS, DEFAULT_SELECTION } = await import('../src/colors.js');
  const { SEQUENCES } = await import('../src/three/experience.js');
  const pick = CONFIG.defaultSelection || DEFAULT_SELECTION;
  const paint = `paint=${COLORS.find((c) => c.id === pick.color).hex.slice(1)}&finish=${pick.finish}&effect=${pick.effect}&brand=${brand}`;
  const P = CONFIG.interior === 'tint'
    ? { 'tint-off': [0.0, 'medium'], 'tint-on': [0.26, 'medium'], door: [0.6, 'medium'], inside: [1, 'medium'] }
    : { exterior: [0.02], door: [0.3], 'cabin-off': [0.5], 'cabin-on': [0.72], 'roof-off': [0.865], 'roof-on': [1] };
  for (const name of new Set([SEQUENCES[CONFIG.interior].poster, ...Object.values(SEQUENCES[CONFIG.interior].still)])) if (!P[name]) throw new Error(`no camera position for still "${name}"`);
  // The configurator posters are only rendered again when the brand changes how the vehicles look.
  const ownLook = CONFIG.defaultSelection || CONFIG.scene.accent;
  shots = [
    ...(ownLook ? [['poster-car', `mode=config&vehicle=car&az=-41.25&${paint}`, 1280, 800], ['poster-bike', `mode=config&vehicle=bike&az=-41.25&${paint}`, 1280, 800]] : []),
    ...Object.entries(P).map(([name, [p, tint]]) => [`still-${name}`, `mode=interior&p=${p}${tint ? `&tint=${tint}` : ''}&${paint}`, 1280, 720]),
  ];
}
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
