// Screenshot of the running game with the car placed on a given edge:  node dev/shot-at.mjs out.png x z heading [w h] [simSeconds]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const [out, x, z, h, w = 1280, hh = 720, secs = 3] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const pg = await b.newPage({ viewport: { width: Number(w), height: Number(hh) }, deviceScaleFactor: 1 });
const logs = [];
pg.on('console', (m) => { if (m.type() === 'error') logs.push(m.text().slice(0, 200)); });
pg.on('pageerror', (e) => logs.push(String(e.stack || e).slice(0, 400)));
await pg.goto('http://127.0.0.1:4180/', { waitUntil: 'load' });
await pg.waitForFunction(() => window.__game && window.__game.state === 'menu', null, { timeout: 90000 });
await pg.evaluate(() => window.__game.start({ mode: 'free', traffic: 'busy' }, 5));
await pg.waitForFunction(() => window.__game.state === 'driving', null, { timeout: 120000 });
await pg.evaluate(async ([x, z, h]) => { const g = window.__game, c = g.run.car; c.belt = true; c.engineOn = true; c.lights = 'dipped'; await g.teleport(x, z, h); }, [Number(x), Number(z), Number(h)]);
await pg.waitForTimeout(Number(secs) * 1000);
await pg.screenshot({ path: out });
console.log(JSON.stringify(await pg.evaluate(() => ({ stats: window.__game.world.stats(), cars: window.__game.run.traffic.cars.length, trams: window.__game.run.traffic.trams.length, peds: window.__game.run.traffic.peds.length }))), logs.join(' | ') || 'console clean');
await b.close();
