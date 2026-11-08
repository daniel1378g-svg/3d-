// Deterministic captures of the 3D journey through the page's capture hook (?capture=1).
// node scripts/capture.mjs --base http://127.0.0.1:8080/ --t 0.1,0.37 --size 1440x900 --out dir [--prefix x] [--path index.html] [--q high]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync } from 'node:fs';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://127.0.0.1:8080/');
const ts = arg('t', '0,0.205,0.37,0.43,0.67,0.89,1').split(',').map(Number);
const [w, h] = arg('size', '1440x900').split('x').map(Number);
const out = arg('out', 'captures');
const prefix = arg('prefix', '');
const q = arg('q', 'high');
const page_ = arg('path', 'index.html');
const dpr = +arg('dpr', '1');
const extra = arg('query', '');
const hideUi = arg('hideui', '0') === '1';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
await page.goto(`${base}${page_}?capture=1&3d=force&q=${q}${extra ? '&' + extra : ''}`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__cap === 'function', null, { timeout: 180000 });
if (hideUi) await page.addStyleTag({ content: '.jr__panels,.jr__ui,.jr__ticker,.hdr,.preview-strip{visibility:hidden!important}.jr__posters{display:none!important}' });
for (const t of ts) {
  await page.evaluate((t) => window.__cap(t, 0), t);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const file = `${out}/${prefix}t${t.toFixed(3)}-${w}x${h}.png`;
  await page.screenshot({ path: file });
  console.log(file);
}
if (errors.length) console.log('PAGE MESSAGES:\n' + [...new Set(errors)].join('\n'));
await browser.close();
