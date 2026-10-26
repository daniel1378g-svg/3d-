// Behaviour checks of the exported site. Prints a JSON report.
// node scripts/qa/behaviour.cjs <outDir>   (server on http://localhost:3000 and :3001 --slow)
const { chromium } = require("playwright");
const fs = require("fs");
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const BASE = "http://localhost:3000/";
const report = {};
const noIntro = (ctx) => ctx.addInitScript(() => sessionStorage.setItem("mrd:intro", "1"));

async function scrollThrough(p, step = 500) {
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += step) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(120);
  }
}

(async () => {
  const b = await chromium.launch();

  // 1–5: structure, links, images (desktop)
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await noIntro(ctx);
    const p = await ctx.newPage();
    const bad = [];
    p.on("response", (r) => { if (r.url().startsWith(BASE) && r.status() >= 400) bad.push(`${r.status()} ${r.url()}`); });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(BASE, { waitUntil: "networkidle" });
    report.ids = await p.evaluate(() => ["hero", "Top", "Lojas", "menus", "Media", "contact", "tradicao", "ambiente", "galeria", "menu-bebida", "menu-duo", "menu-merendeira", "menu-sopa"].map((id) => [id, !!document.getElementById(id)]));
    report.hashLinks = await p.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map((a) => [a.getAttribute("href"), !!document.querySelector(a.getAttribute("href"))]).filter(([, ok]) => !ok));
    report.external = await p.evaluate(() => [...document.querySelectorAll('a[href^="http"]')].map((a) => ({ href: a.href, target: a.target, rel: a.rel, text: a.textContent.trim().replace(/\s+/g, " ").slice(0, 60) })));
    report.telMail = await p.evaluate(() => [...document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]')].map((a) => `${a.getAttribute("href")} | ${a.textContent.trim()}`));
    await scrollThrough(p, 400);
    await p.waitForTimeout(1500);
    report.images = await p.evaluate(() => {
      const imgs = [...document.querySelectorAll("img")];
      // images inside display:none containers (the phone-only menu photos on desktop) never load
      const shown = imgs.filter((i) => i.offsetParent !== null || getComputedStyle(i).position === "fixed");
      return { total: imgs.length, shown: shown.length, broken: shown.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src), noAlt: imgs.filter((i) => !i.hasAttribute("alt")).length };
    });
    report.httpErrors = bad;
    report.pageErrors = errors;
    report.text = await p.evaluate(() => document.body.innerText);
    // CTAs usable on the first screen (nothing on top of them)
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(600);
    report.ctaHit = await p.evaluate(() => [...document.querySelectorAll(".film__ctas a, .menu-toggle, .site-nav a")].map((a) => {
      const r = a.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return [a.textContent.trim().replace(/\s+/g, " "), !!hit && (hit === a || a.contains(hit))];
    }));
    await ctx.close();
  }

  // 6: scrub down and up gives the same frames at the same positions
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await noIntro(ctx);
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(6000); // let every frame arrive
    const range = await p.evaluate(() => document.querySelector(".film__track").offsetHeight - innerHeight);
    const points = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    const read = async (pr) => {
      await p.evaluate((y) => window.scrollTo(0, y), Math.round(pr * range));
      await p.waitForTimeout(900);
      return p.evaluate(() => Number(document.getElementById("Top").dataset.frame));
    };
    const down = [];
    for (const pr of points) down.push(await read(pr));
    const up = [];
    for (const pr of [...points].reverse()) up.push(await read(pr));
    up.reverse();
    report.scrub = { points, down, up, same: down.every((f, i) => f === up[i]), monotonic: down.every((f, i) => i === 0 || f >= down[i - 1]) };
    // frame rate of the page while scrolling through the film with the wheel
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(500);
    await p.mouse.move(700, 450);
    await p.evaluate(() => {
      window.__ft = [];
      let last = performance.now();
      const f = (t) => { window.__ft.push(t - last); last = t; if (window.__ft.length < 2000) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
    for (let i = 0; i < 60; i++) { await p.mouse.wheel(0, 60); await p.waitForTimeout(16); }
    for (let i = 0; i < 60; i++) { await p.mouse.wheel(0, -60); await p.waitForTimeout(16); }
    const ft = await p.evaluate(() => window.__ft.slice(5));
    ft.sort((a, b) => a - b);
    const mean = ft.reduce((a, c) => a + c, 0) / ft.length;
    report.frameTimes = { samples: ft.length, meanMs: +mean.toFixed(1), p95Ms: +ft[Math.floor(ft.length * 0.95)].toFixed(1), fps: +(1000 / mean).toFixed(1) };
    await ctx.close();
  }

  // 7–9: menu panel, keyboard, lightbox
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await noIntro(ctx);
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    const order = [];
    for (let i = 0; i < 8; i++) {
      await p.keyboard.press("Tab");
      order.push(await p.evaluate(() => {
        const a = document.activeElement;
        const cs = getComputedStyle(a);
        return `${a.tagName.toLowerCase()}:${(a.textContent || a.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 30)} [outline ${cs.outlineStyle} ${cs.outlineWidth}]`;
      }));
    }
    report.tabOrder = order;
    await p.click(".menu-toggle");
    await p.waitForTimeout(900);
    const menu = {};
    menu.open = await p.isVisible("#menu-panel");
    menu.focusInside = await p.evaluate(() => !!document.activeElement.closest("#menu-panel"));
    for (let i = 0; i < 12; i++) await p.keyboard.press("Tab");
    menu.focusStillInside = await p.evaluate(() => !!document.activeElement.closest("#menu-panel"));
    await p.screenshot({ path: `${out}/menu-open-1440.png` });
    await p.keyboard.press("Escape");
    await p.waitForTimeout(900);
    menu.closed = !(await p.isVisible("#menu-panel"));
    menu.focusBack = await p.evaluate(() => document.activeElement.classList.contains("menu-toggle"));
    await p.click(".menu-toggle");
    await p.waitForTimeout(900);
    await p.click('#menu-panel a[href="#menus"]');
    await p.waitForTimeout(2500);
    menu.navigated = await p.evaluate(() => Math.abs(document.getElementById("menus").getBoundingClientRect().top) < 120);
    menu.hash = await p.evaluate(() => location.hash);
    report.menu = menu;
    // lightbox
    await p.evaluate(() => document.getElementById("galeria").scrollIntoView());
    await p.waitForTimeout(800);
    const lb = {};
    await p.click(".gallery__cell--1 .gallery__item");
    await p.waitForTimeout(600);
    lb.open = await p.evaluate(() => document.querySelector(".lightbox").open);
    lb.first = await p.textContent(".lightbox__caption p");
    await p.keyboard.press("ArrowRight");
    await p.waitForTimeout(300);
    lb.next = await p.textContent(".lightbox__caption p");
    await p.screenshot({ path: `${out}/lightbox-1440.png` });
    await p.keyboard.press("Escape");
    await p.waitForTimeout(400);
    lb.closed = await p.evaluate(() => !document.querySelector(".lightbox").open);
    lb.focusBack = await p.evaluate(() => document.activeElement.classList.contains("gallery__item"));
    report.lightbox = lb;
    await ctx.close();
  }

  // 10: reduced motion
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(800);
    const r = {};
    r.introShown = await p.evaluate(() => document.documentElement.classList.contains("has-intro"));
    r.trackHeight = await p.evaluate(() => document.querySelector(".film__track").offsetHeight);
    r.chapters = await p.evaluate(() => document.querySelectorAll(".chapter").length);
    r.cover = await p.evaluate(() => document.querySelector(".film__cover").currentSrc);
    await p.screenshot({ path: `${out}/reduced-1440-top.png` });
    await p.click(".film__still-actions");
    await p.waitForTimeout(800);
    r.video = await p.evaluate(() => { const v = document.querySelector(".film__player"); return v ? { controls: v.controls, muted: v.muted, autoplayAfterClick: v.autoplay, src: v.currentSrc } : null; });
    await p.screenshot({ path: `${out}/reduced-1440-video.png` });
    await p.evaluate(() => document.getElementById("Lojas").scrollIntoView());
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${out}/reduced-1440-lojas.png` });
    r.hiddenLines = await p.evaluate(() => [...document.querySelectorAll(".line > span")].filter((s) => s.getBoundingClientRect().height && getComputedStyle(s).transform !== "none").length);
    report.reduced = r;
    await ctx.close();
  }

  // 11: slow images (server :3001 adds 1.5 s to every image/video request)
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await noIntro(ctx);
    const p = await ctx.newPage();
    const t0 = Date.now();
    await p.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(800);
    const s = {};
    s.at800ms = await p.evaluate(() => ({ ctaVisible: !!document.querySelector(".film__ctas a").getBoundingClientRect().width, live: document.getElementById("Top").classList.contains("is-live") }));
    await p.screenshot({ path: `${out}/slow-800ms.png` });
    await p.waitForFunction(() => document.getElementById("Top").classList.contains("is-live"), null, { timeout: 30000 }).catch(() => {});
    s.liveAfterMs = Date.now() - t0;
    report.slow = s;
    await ctx.close();
  }

  // 12: frames fail to load
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await noIntro(ctx);
    const p = await ctx.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.route("**/videos/sequence/**", (r) => r.abort());
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(1500);
    const range = await p.evaluate(() => document.querySelector(".film__track").offsetHeight - innerHeight);
    await p.evaluate((y) => window.scrollTo(0, y), Math.round(range * 0.5));
    await p.waitForTimeout(1200);
    report.videoFail = {
      errors,
      live: await p.evaluate(() => document.getElementById("Top").classList.contains("is-live")),
      coverVisible: await p.evaluate(() => getComputedStyle(document.querySelector(".film__cover")).opacity),
      chapterShown: await p.evaluate(() => [...document.querySelectorAll(".chapter")].some((c) => getComputedStyle(c).visibility === "visible")),
    };
    await p.screenshot({ path: `${out}/video-fail-mid.png` });
    await ctx.close();
  }

  // 14–15: overflow and product framing on each width
  report.layout = [];
  for (const [w, h, mobile] of [[390, 844, true], [768, 1024, true], [1440, 900, false]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 });
    await noIntro(ctx);
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(3000);
    const range = await p.evaluate(() => document.querySelector(".film__track").offsetHeight - innerHeight);
    const frames = [];
    for (const pr of [0, 0.5, 1]) {
      await p.evaluate((y) => window.scrollTo(0, y), Math.round(pr * range));
      await p.waitForTimeout(900);
      frames.push(await p.evaluate(() => {
        const m = document.querySelector(".film__media").getBoundingClientRect();
        // product box at the end of the clip: x 2.5–96.5 %
        return { mediaLeft: Math.round(m.left), mediaRight: Math.round(m.right), vw: innerWidth, productLeft: Math.round(m.left + m.width * 0.025), productRight: Math.round(m.left + m.width * 0.965) };
      }));
    }
    await scrollThrough(p, 700);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    report.layout.push({ w, h, overflow, frames });
    await ctx.close();
  }

  // 16: without JavaScript the content is all there
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "load" });
    await p.screenshot({ path: `${out}/nojs-1440-top.png` });
    report.noJs = await p.evaluate(() => ({
      htmlClass: document.documentElement.className,
      trackHeight: document.querySelector(".film__track").offsetHeight,
      ctaVisible: getComputedStyle(document.querySelector(".film__ctas")).opacity,
      menusText: document.getElementById("menus").innerText.includes("Menu Merendeira"),
      storesText: document.getElementById("Lojas").textContent.includes("R. dos Pescadores 20,"),
    }));
    await ctx.close();
  }

  // 17: the opening can be skipped at once
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send("Animation.enable");
    await cdp.send("Animation.setPlaybackRate", { playbackRate: 0.1 }); // keep the intro on screen
    await p.goto(BASE, { waitUntil: "domcontentloaded" });
    const before = await p.evaluate(() => document.documentElement.className);
    await p.click(".intro__skip", { force: true });
    await p.waitForTimeout(300);
    report.skipIntro = {
      before,
      after: await p.evaluate(() => document.documentElement.className),
      stageClip: await p.evaluate(() => getComputedStyle(document.querySelector(".film__stage")).clipPath),
      remembered: await p.evaluate(() => sessionStorage.getItem("mrd:intro")),
    };
    await p.reload({ waitUntil: "domcontentloaded" });
    report.skipIntro.secondVisit = await p.evaluate(() => document.documentElement.className);
    await ctx.close();
  }

  // 18: axe-core (WCAG 2.1 AA) on desktop and phone, after scrolling so every image is in
  if (process.env.AXE) {
    report.axe = [];
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } });
      await noIntro(ctx);
      const p = await ctx.newPage();
      await p.goto(BASE, { waitUntil: "networkidle" });
      await scrollThrough(p, 600);
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForTimeout(500);
      await p.addScriptTag({ path: process.env.AXE });
      const res = await p.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
        return r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(" ") + " :: " + (n.failureSummary || "").split("\n")[1]) }));
      });
      report.axe.push({ w, violations: res });
      await ctx.close();
    }
  }

  await b.close();
  fs.writeFileSync(`${out}/behaviour.json`, JSON.stringify(report, null, 1));
  const { text, ...short } = report;
  console.log(JSON.stringify(short, null, 1));
})();
