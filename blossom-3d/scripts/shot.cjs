// Headless screenshots of the built viewer:  node scripts/shot.cjs <out-prefix> "<query>" [width height] ...
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', process.env.SHOT_ROOT || 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.glb': 'model/gltf-binary', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream', 'content-length': fs.statSync(f).size });
  fs.createReadStream(f).pipe(res);
});
(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const jobs = JSON.parse(process.argv[2]);
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const j of jobs) {
    const ctx = await browser.newContext({ viewport: { width: j.w || 1280, height: j.h || 720 }, deviceScaleFactor: 1, hasTouch: !!j.touch, isMobile: !!j.touch, colorScheme: j.dark ? 'dark' : 'light', locale: j.locale || 'pt-PT' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text().slice(0, 300)); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    const t0 = Date.now();
    await page.goto(`http://127.0.0.1:${port}/${process.env.SHOT_PAGE || 'index.html'}?${j.q || ''}`);
    try {
      await page.waitForFunction(() => document.getElementById('app').dataset.state !== 'loading', null, { timeout: 180000 });
    } catch (e) { errors.push('timeout waiting for load'); }
    await page.waitForTimeout(j.wait || 1500);
    if (j.eval) await page.evaluate(j.eval);
    if (j.after) await page.waitForTimeout(j.after);
    await page.screenshot({ path: j.out });
    const info = await page.evaluate(() => { const v = window.__viewer; if (!v) return null; const i = v.renderer.info; return { calls: i.render.calls, tris: i.render.triangles, geos: i.memory.geometries, tex: i.memory.textures, programs: i.programs.length }; });
    console.log(j.out, Math.round((Date.now() - t0) / 100) / 10 + 's', JSON.stringify(info), errors.length ? '\n  ' + errors.slice(0, 6).join('\n  ') : '');
    await ctx.close();
  }
  await browser.close(); server.close();
})();
