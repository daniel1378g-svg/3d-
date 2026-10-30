// Frame rate, canvas resolution, LCP and CLS of the home page against a running preview (npm run perf).
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  for (const [w, h, cpu] of [[1440, 900, 1], [390, 844, 4]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 3 : 1, hasTouch: w < 500, isMobile: w < 500 });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
    await p.addInitScript(() => {
      sessionStorage.setItem('mn-intro', '1');
      window.__lcp = 0; window.__cls = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await p.goto((process.env.BASE ?? 'http://127.0.0.1:4250') + '/de/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);
    const fps = await p.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 4000) requestAnimationFrame(f); else res(n / ((performance.now() - t0) / 1000)); }; requestAnimationFrame(f); }));
    const canvas = await p.evaluate(() => { const c = document.querySelector('#start canvas'); return c ? `${c.width}x${c.height} for ${c.clientWidth}x${c.clientHeight} css px` : 'none'; });
    const v0 = await p.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: window.__cls.toFixed(3) }));
    // scroll away: the loop should stop
    await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2)); await p.waitForTimeout(800);
    const fpsAway = await p.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 2000) requestAnimationFrame(f); else res(n / 2); }; requestAnimationFrame(f); }));
    const v = await p.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: window.__cls.toFixed(3) }));
    console.log(`${w}px cpu×${cpu}: page rAF ${fps.toFixed(1)} fps with hero on screen (canvas ${canvas}); ${fpsAway.toFixed(1)} fps scrolled away; LCP ${v0.lcp} ms (before any scroll); CLS ${v0.cls} on load, ${v.cls} after scrolling half the page`);
    await ctx.close();
  }
  await b.close();
})();
