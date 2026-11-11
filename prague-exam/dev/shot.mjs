// node dev/shot.mjs <out.png> [width] [height] [action]   action: menu | drive
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const [out, w = 844, h = 390, action = 'menu', place = '', wait = 6000] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const pg = await b.newPage({ viewport: { width: Number(w), height: Number(h) }, deviceScaleFactor: 1, hasTouch: true, isMobile: Number(w) < 900 });
const logs = [];
pg.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`${m.type()}: ${m.text().slice(0, 300)}`); });
pg.on('pageerror', (e) => logs.push(`pageerror: ${String(e.stack || e).slice(0, 600)}`));
await pg.goto('http://127.0.0.1:4180/', { waitUntil: 'load' });
await pg.waitForFunction(() => window.__game && window.__game.state === 'menu', null, { timeout: 90000 }).catch((e) => logs.push('menu never appeared: ' + e.message.slice(0, 100)));
if (action === 'drive') {
  await pg.evaluate((p) => window.__game.start({ placeId: p || null }, 3), place);
  await pg.waitForFunction(() => window.__game.state === 'driving', null, { timeout: 120000 }).catch((e) => logs.push('drive never started: ' + e.message.slice(0, 100)));
  await pg.waitForTimeout(Number(wait));
  const info = await pg.evaluate(() => ({ state: window.__game.state, stats: window.__game.world.stats && window.__game.world.stats(), car: window.__game.run && { x: window.__game.run.car.x, z: window.__game.run.car.z, h: window.__game.run.car.heading } }));
  console.log(JSON.stringify(info));
}
await pg.screenshot({ path: out });
console.log(logs.slice(0, 12).join('\n') || 'console clean');
await b.close();
