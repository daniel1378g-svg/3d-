// Frame-time measurement while wheel-scrolling, for a few scenarios (headless Chromium).
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:3000/";
async function measure(p, startY) {
  await p.evaluate((y) => window.scrollTo(0, y), startY);
  await p.waitForTimeout(800);
  await p.mouse.move(700, 450);
  await p.evaluate(() => {
    window.__ft = [];
    let last = performance.now();
    const f = (t) => { window.__ft.push(t - last); last = t; if (window.__ft.length < 3000) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  });
  for (let i = 0; i < 50; i++) { await p.mouse.wheel(0, 70); await p.waitForTimeout(16); }
  for (let i = 0; i < 50; i++) { await p.mouse.wheel(0, -70); await p.waitForTimeout(16); }
  const ft = (await p.evaluate(() => window.__ft.slice(5))).sort((a, b) => a - b);
  const mean = ft.reduce((a, c) => a + c, 0) / ft.length;
  return { fps: +(1000 / mean).toFixed(1), meanMs: +mean.toFixed(1), p95Ms: +ft[Math.floor(ft.length * 0.95)].toFixed(1) };
}
(async () => {
  const b = await chromium.launch({ args: process.argv.includes("--gpu") ? ["--enable-gpu-rasterization", "--ignore-gpu-blocklist"] : [] });
  for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 });
    await ctx.addInitScript(() => sessionStorage.setItem("mrd:intro", "1"));
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(5000);
    const lojasY = await p.evaluate(() => document.getElementById("Lojas").offsetTop);
    const res = {};
    res.staticSection = await measure(p, lojasY);
    res.film = await measure(p, 200);
    await p.addStyleTag({ content: ".film__plate{filter:none!important}" });
    res.filmNoPlateBlur = await measure(p, 200);
    await p.addStyleTag({ content: ".film__plate{display:none!important}" });
    res.filmNoPlate = await measure(p, 200);
    console.log(`${w}x${h}`, JSON.stringify(res));
    await ctx.close();
  }
  await b.close();
})();
