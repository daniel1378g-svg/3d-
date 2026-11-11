// Screenshots of the story at chosen beats:  node dev/shots.mjs <outPrefix> <width> <height> [beats...]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const [out, w, h, ...beats] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const pg = await b.newPage({ viewport: { width: Number(w), height: Number(h) }, deviceScaleFactor: 1 });
const logs = [];
pg.on('console', (m) => { if (m.type() === 'error') logs.push(m.text().slice(0, 300)); });
pg.on('pageerror', (e) => logs.push(String(e.stack || e).slice(0, 500)));
await pg.goto('http://127.0.0.1:4190/', { waitUntil: 'load' });
await pg.waitForSelector('.loader.done', { timeout: 60000, state: 'attached' });
await pg.waitForTimeout(1500);
for (const beat of beats) {
  if (beat === 'pick' || beat.startsWith('wrap')) {
    if (beat === 'pick') await pg.click('text=See the bike wrapped'); else await pg.click(`.chips button:nth-child(${beat.slice(4)})`);
    await pg.waitForTimeout(2600);
  } else {
    await pg.evaluate((bt) => { const el = document.querySelector('.story'); window.scrollTo(0, el.offsetTop + (bt / 8) * (el.offsetHeight - innerHeight)); }, Number(beat));
    await pg.waitForTimeout(1800);
  }
  await pg.screenshot({ path: `${out}-${beat}.png` });
}
console.log(logs.join('\n') || 'console clean');
await b.close();
