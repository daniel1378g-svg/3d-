// Deterministic captures of the 3D journey through the page's capture hook (?capture=1).
// node scripts/capture.mjs --base http://127.0.0.1:8080/ --t 0.1,0.37 --size 1440x900 --out dir [--prefix x] [--path index.html] [--q high]
//   [--cam "bend=228,60,-156/228,0,-156/40;low=210,2,-140/228,0,-156/50"]  fixed cameras (pos/target/fov) per t;
//   files are then named <prefix><cam>-t<t>-<w>x<h>.png. Needs a build that exposes window.__journey.
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
const cams = arg('cam', '')
  .split(';')
  .filter(Boolean)
  .map((c) => {
    const [name, spec] = c.split('=');
    const [pos, tgt, fov] = spec.split('/');
    return { name, cam: { pos: pos.split(',').map(Number), tgt: tgt.split(',').map(Number), fov: +(fov || 40) } };
  });
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
await page.goto(`${base}${page_}?capture=1&3d=force&q=${q}${extra ? '&' + extra : ''}`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__cap === 'function', null, { timeout: 180000 });
// let the canvas finish fading in (CSS transition on .is-3d) and render one throwaway frame
await page.waitForFunction(() => document.querySelector('[data-journey]')?.classList.contains('is-3d'), null, { timeout: 60000 }).catch(() => {});
await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
await page.evaluate(() => window.__cap(0.5, 0));
await page.waitForTimeout(300);
if (hideUi) await page.addStyleTag({ content: '.jr__panels,.jr__ui,.jr__ticker,.hdr,.preview-strip{visibility:hidden!important}.jr__posters{display:none!important}' });
if (cams.length && !(await page.evaluate(() => !!window.__journey))) throw new Error('--cam needs a build that exposes window.__journey');
for (const t of ts) {
  for (const { name, cam } of cams.length ? cams : [{ name: '', cam: null }]) {
    await page.evaluate(([t, cam]) => {
      if (window.__journey) window.__journey.debugCam = cam;
      return window.__cap(t, 0);
    }, [t, cam]);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const file = `${out}/${prefix}${name ? name + '-' : ''}t${t.toFixed(3)}-${w}x${h}.png`;
    await page.screenshot({ path: file });
    console.log(file);
  }
}
if (errors.length) console.log('PAGE MESSAGES:\n' + [...new Set(errors)].join('\n'));
await browser.close();
