// Takes a series of screenshots of the built page at chosen scroll targets.
//   node tools/pageshots.mjs <url> <outDir> <prefix> <width> <height> [--mobile] [--lang xx] [--reduced]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw; try { pw = require('playwright'); } catch { pw = require('/opt/node-tools/node_modules/playwright'); }
const [url, outDir, prefix, w, h, ...rest] = process.argv.slice(2);
const mobile = rest.includes('--mobile'), reduced = rest.includes('--reduced');
const langAt = rest.indexOf('--lang'); const lang = langAt >= 0 ? rest[langAt + 1] : null;
const only = rest.includes('--only') ? rest[rest.indexOf('--only') + 1].split(',') : null;
const browser = await pw.chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const dprAt = rest.indexOf('--dpr');
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: dprAt >= 0 ? +rest[dprAt + 1] : 1, isMobile: mobile, hasTouch: mobile, reducedMotion: reduced ? 'reduce' : 'no-preference' });
const page = await ctx.newPage();
const tierAt = rest.indexOf('--tier');
await page.addInitScript((tier) => { window.FW_CONFIG = { tier, instant: true }; }, tierAt >= 0 ? rest[tierAt + 1] : 'mid');
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
page.on('requestfailed', (r) => errors.push('failed: ' + r.url()));
await page.goto(url, { waitUntil: 'load' });
if (lang) await page.selectOption('#lang-select', lang);
await page.waitForTimeout(1200);
const stops = [
  ['01-hero', 'window.scrollTo(0, 0)', 900],
  ['02-foam', "document.querySelector('#detailing').scrollIntoView()", 1400],
  ['03-step3', "document.querySelectorAll('.story-steps .step')[3].scrollIntoView()", 1400],
  ['04-config', "window.scrollTo(0, document.querySelector('#wrap').getBoundingClientRect().top + scrollY - 60)", 25000],
  ['05-config-panel', "window.scrollBy(0, innerHeight * 0.8)", 1500],
  ['06-booking', "window.scrollTo(0, document.querySelector('#booking').getBoundingClientRect().top + scrollY - 60)", 1200],
  ['07-booking-form', "window.scrollBy(0, innerHeight * 0.9)", 800],
  ['08-interior-head', "window.scrollTo(0, document.querySelector('#interior').getBoundingClientRect().top + scrollY - 60)", 1500],
  ...[0.02, 0.22, 0.47, 0.72, 0.8, 0.99].map((p, i) => [`09-cine-${i}-p${p}`, `(() => { const c = document.querySelector('#cine'); window.scrollTo(0, c.getBoundingClientRect().top + scrollY + (c.offsetHeight - innerHeight) * ${p}); })()`, i === 0 ? 6000 : 1500]),
  ['09z-services', "(() => { const el = document.querySelector('#services'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 60); })()", 1200],
  ['09z-services-2', "(() => { const el = document.querySelector('.extras-row'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 120); })()", 800],
  ['09z-work', "(() => { const el = document.querySelector('#work'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 60); })()", 2500],
  ['09z-work-2', "(() => { const el = document.querySelector('#gal-grid'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 140); })()", 2500],
  ['09z-reviews', "(() => { const el = document.querySelector('#reviews'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 60); })()", 1500],
  ['10-finale', "window.scrollTo(0, document.querySelector('#finale').getBoundingClientRect().top + scrollY - 60)", 1200],
  ['11-footer', 'window.scrollTo(0, document.documentElement.scrollHeight)', 900],
];
for (const [name, js, wait] of stops) {
  if (only && !only.some((o) => name.includes(o))) continue;
  await page.evaluate(js);
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${outDir}/${prefix}-${name}.png`, timeout: 120000 });
}
const overflow = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
console.log(prefix, 'scrollWidth', overflow.sw, 'clientWidth', overflow.cw, errors.length ? '\n' + [...new Set(errors)].slice(0, 10).join('\n') : 'no errors');
await browser.close();
