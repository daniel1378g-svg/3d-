// Bread film baseline: geometry of the scroll path and the frame shown at each scroll position,
// forward then backward, at several viewports. Usage: node measure.cjs <url> <out.json> <shotDir> <tag>
const { chromium } = require('playwright');
const fs = require('fs');
const [,, url, out, shotDir, tag] = process.argv;
const VIEWPORTS = [['d1440', 1440, 900, false], ['d1280', 1280, 720, false], ['t768', 768, 1024, true], ['m390', 390, 844, true]];
const PATH = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1, 0.75, 0.5, 0.25, 0.1, 0];
(async () => {
  const b = await chromium.launch();
  const res = {};
  for (const [name, w, h, mob] of VIEWPORTS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob, deviceScaleFactor: 1 });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('mrd:intro', '1'); } catch (e) {} });
    const p = await ctx.newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.waitForTimeout(4000); // all frames in
    const geo = await p.evaluate(() => {
      const t = document.querySelector('#Top .film__track'), s = document.querySelector('.film__stage'), wn = document.querySelector('.film__window');
      const r = wn.getBoundingClientRect();
      return { track: t.offsetHeight, stage: s.offsetHeight, scroll: t.offsetHeight - innerHeight, win: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], filmTop: document.querySelector('#Top').offsetTop };
    });
    const frames = [];
    let i = 0;
    for (const f of PATH) {
      await p.evaluate((y) => window.scrollTo(0, y), Math.round(geo.filmTop + geo.scroll * f));
      await p.waitForTimeout(1100);
      const st = await p.evaluate(() => { const r = document.querySelector('#Top'); const c = r.querySelector('.film__frame'); let px = -1; try { px = c.getContext('2d').getImageData(c.width >> 1, Math.round(c.height * 0.62), 1, 1).data[3]; } catch (e) {} return { frame: +r.dataset.frame, live: r.classList.contains('is-live'), px, chapter: r.dataset.chapter }; });
      frames.push({ p: f, ...st });
      if (shotDir && [0, 2, 3, 6, 8].includes(i)) await p.screenshot({ path: `${shotDir}/${tag}-${name}-${i}-${String(f).replace('.', '')}.jpg`, quality: 55 });
      i++;
    }
    res[name] = { geo, frames, errors: errs };
    console.log(name, JSON.stringify(geo), frames.map((x) => `${x.p}:${x.frame}${x.px > 0 ? '' : '!'}`).join(' '), 'errors', errs.length);
    await ctx.close();
  }
  fs.writeFileSync(out, JSON.stringify(res, null, 1));
  await b.close();
})();
