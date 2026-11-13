// Screenshot helper for the dev pages (headless Chromium, software WebGL).
//
//   node tools/shot.mjs <url> <out.png> [--w 1440] [--h 900] [--dpr 1] [--wait 1200] [--mobile] [--reduced]
//        [--scroll 0.5]        scroll to this fraction of the page height before the shot
//        [--eval "js"]         run a snippet in the page before the shot
//        [--full]              full-page screenshot
//        [--print "js"]        evaluate an expression in the page and print its JSON result
//
// The page can set `window.__ready = true` when its first frame is rendered; the helper waits for it (up to 20 s).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }

const args = process.argv.slice(2);
const [url, out] = args;
const opt = (name, fallback) => { const i = args.indexOf('--' + name); return i < 0 ? fallback : args[i + 1]; };
const flag = (name) => args.includes('--' + name);
if (!url || !out) { console.error('usage: node tools/shot.mjs <url> <out.png> [options]'); process.exit(1); }

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'] });
const context = await browser.newContext({
  viewport: { width: Number(opt('w', 1440)), height: Number(opt('h', 900)) },
  deviceScaleFactor: Number(opt('dpr', 1)),
  isMobile: flag('mobile'), hasTouch: flag('mobile'),
  reducedMotion: flag('reduced') ? 'reduce' : 'no-preference',
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto(url, { waitUntil: 'load' });
await page.waitForFunction('window.__ready === true', null, { timeout: Number(opt('ready', 60000)) }).catch(() => {});
const scroll = opt('scroll', null);
if (scroll !== null) await page.evaluate((f) => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), Number(scroll));
const snippet = opt('eval', null);
if (snippet) await page.evaluate(snippet);
await page.waitForTimeout(Number(opt('wait', 1200)));
const printExpr = opt('print', null);
if (printExpr) console.log(JSON.stringify(await page.evaluate(printExpr)));
await page.screenshot({ path: out, fullPage: flag('full'), timeout: Number(opt('timeout', 90000)) });
if (errors.length) console.log(errors.slice(0, 12).join('\n'));
console.log('saved', out);
await browser.close();
