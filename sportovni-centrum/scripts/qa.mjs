// Automated QA for dist/ (run `npm run build` first; starts its own preview server).
//   node scripts/qa.mjs [--shots <dir>]
// Checks: horizontal overflow at 6 widths, console errors, headings, images, links/anchors,
// axe-core WCAG 2.x A/AA rules, keyboard: skip link, desktop dropdowns, mobile menu, focus not
// hidden under the sticky header, lightbox (keyboard, focus return, swipe, short viewports), mixed
// mouse + keyboard use, breakpoint changes, print, reduced motion, no-JS, JS blocked and JS late.
//   QA_PORT=<n> overrides the preview port (default: any free port).
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const shotsDir = process.argv.includes("--shots") ? process.argv[process.argv.indexOf("--shots") + 1] : null;

const server = spawn(process.execPath, [fileURLToPath(new URL("./serve.mjs", import.meta.url))], { env: { ...process.env, PORT: process.env.QA_PORT ?? "0" }, stdio: ["ignore", "pipe", "pipe"] });
server.stderr.on("data", (d) => process.stderr.write(`[serve] ${d}`));
const URL_ = await new Promise((resolve, reject) => {
  server.stdout.once("data", (d) => resolve(String(d).trim()));
  server.once("exit", (code) => reject(new Error(`preview server exited (${code}) – is dist/ built and the port free?`)));
});
const PORT = new URL(URL_).port;

const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok, detail }); console.log(`${ok ? "✔" : "✘"} ${name}${detail ? ` — ${detail}` : ""}`); };
const browser = await chromium.launch();

async function open(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, ...opts });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("requestfailed", (r) => { if (r.url().startsWith(`http://localhost:${PORT}`)) errors.push(`failed: ${r.url()}`); });
  page.on("response", (r) => { if (r.url().startsWith(`http://localhost:${PORT}`) && r.status() >= 400) errors.push(`${r.status()}: ${r.url()}`); });
  await page.goto(URL_, { waitUntil: "networkidle" });
  return { ctx, page, errors };
}
const revealAll = (page) => page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 250) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 40)); }
  window.scrollTo({ top: 0, behavior: "instant" });
});

try {
  /* 1. Layout at many widths ------------------------------------------------------------------ */
  for (const width of [320, 375, 414, 768, 1024, 1280, 1920]) {
    const { ctx, page, errors } = await open({ viewport: { width, height: 900 } });
    await revealAll(page);
    await page.waitForTimeout(700);
    const m = await page.evaluate(() => {
      const over = [...document.querySelectorAll("body *")].filter((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width || el.closest("svg") || el.closest("dialog")) return false;
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" || el.closest(".hero-lanes, .footer-lanes, .cta-lanes, .discipline-lanes")) return false;
        let p = el.parentElement, clipped = false;
        while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o === "hidden" || o === "clip" || o === "auto") { clipped = true; break; } p = p.parentElement; }
        return !clipped && (r.right > innerWidth + 1 || r.left < -1);
      }).slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}`);
      // Text clipped inside its own box (e.g. long Czech words in narrow cards)
      const clippedText = [...document.querySelectorAll("h1,h2,h3,p,a,span,dd,dt,button")].filter((el) => el.clientWidth > 1 && el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX !== "visible" && !el.classList.contains("sr-only")).slice(0, 5).map((el) => el.textContent.trim().slice(0, 40));
      const small = [...document.querySelectorAll("a[href], button")].filter((el) => {
        if (el.closest(".sr-only") || el.offsetParent === null) return false;
        const r = el.getBoundingClientRect();
        if (el.closest("p, dd, li.news-inline") && getComputedStyle(el).display === "inline") return false; // inline text links are exempt (WCAG 2.5.8)
        return r.width < 24 || r.height < 24;
      }).map((el) => `${el.textContent.trim().slice(0, 30)} ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
      const bodyFont = parseFloat(getComputedStyle(document.querySelector(".source-text")).fontSize);
      const vlnaOk = !/\s[aikosuvzAIKOSUVZ] /.test(document.querySelector("main").innerText.replace(/\n/g, " ").replace(/\u00a0/g, "_"));
      return { scroll: document.documentElement.scrollWidth, inner: innerWidth, over, clippedText, small, bodyFont, vlnaOk };
    });
    check(`no horizontal overflow @${width}px`, m.scroll <= m.inner && !m.over.length, m.over.join(", "));
    check(`no clipped text @${width}px`, !m.clippedText.length, m.clippedText.join(" | "));
    check(`targets ≥ 24×24 px @${width}px`, !m.small.length, m.small.join(" | "));
    check(`body text 17–18 px @${width}px`, m.bodyFont >= 17 && m.bodyFont <= 18.01, `${m.bodyFont}px`);
    check(`no console/network errors @${width}px`, !errors.length, errors.join(" | "));
    if (width === 1280) check("Czech no-break spaces after one-letter words (main content)", m.vlnaOk);
    if (shotsDir) await page.screenshot({ path: `${shotsDir}/w${width}.png`, fullPage: true });
    await ctx.close();
  }

  /* 2. Document structure ---------------------------------------------------------------------- */
  {
    const { ctx, page } = await open();
    const s = await page.evaluate(() => {
      const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]);
      const skips = hs.filter((l, i) => i && l > hs[i - 1] + 1);
      const imgs = [...document.images].filter((i) => !i.closest("dialog"));
      return {
        lang: document.documentElement.lang,
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
        skips,
        noAlt: imgs.filter((i) => !i.hasAttribute("alt")).map((i) => i.src),
        noDims: imgs.filter((i) => !i.getAttribute("width") || !i.getAttribute("height")).map((i) => i.src),
        lazyAboveFold: imgs.filter((i) => i.getBoundingClientRect().top < innerHeight && i.loading === "lazy").map((i) => i.src),
        belowNotLazy: imgs.filter((i) => i.getBoundingClientRect().top > innerHeight * 1.5 && i.loading !== "lazy").map((i) => i.src),
        landmarks: ["header", "nav", "main", "footer"].every((t) => document.querySelector(t)),
        emptyLinks: [...document.querySelectorAll("a")].filter((a) => !a.getAttribute("href") || a.getAttribute("href") === "#").length,
        badAnchors: [...document.querySelectorAll('a[href^="#"]')].filter((a) => !document.getElementById(a.getAttribute("href").slice(1))).map((a) => a.getAttribute("href")),
        nameless: [...document.querySelectorAll("a, button")].filter((el) => !(el.textContent.trim() || el.getAttribute("aria-label") || el.querySelector("img[alt]:not([alt=''])"))).length,
        blankTargets: [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !a.textContent.replace(/\u00a0/g, " ").includes("otevře se v novém okně")).map((a) => a.href),
        mailto: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href")),
        tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
        jsWarning: document.body.textContent.includes("chráněna před spamboty"),
      };
    });
    check("html lang=cs", s.lang === "cs", s.lang);
    check("page title preserved", s.title === "Atletická přípravka - Sportovní centrum SEMILY", s.title);
    check("canonical URL", s.canonical === "https://www.sportovni-centrum.cz/krouzky/atleticka-pripravka", s.canonical);
    check("exactly one H1 'Atletická přípravka'", s.h1.length === 1 && s.h1[0] === "Atletická přípravka", s.h1.join("|"));
    check("no skipped heading levels", !s.skips.length, s.skips.join(","));
    check("every image has alt", !s.noAlt.length, s.noAlt.join(", "));
    check("every image has width/height", !s.noDims.length, s.noDims.join(", "));
    check("above-the-fold images not lazy", !s.lazyAboveFold.length, s.lazyAboveFold.join(", "));
    check("below-the-fold images lazy", !s.belowNotLazy.length, s.belowNotLazy.join(", "));
    check("landmarks header/nav/main/footer", s.landmarks);
    check("no empty or '#' links", s.emptyLinks === 0, String(s.emptyLinks));
    check("in-page anchors resolve", !s.badAnchors.length, s.badAnchors.join(","));
    check("all links/buttons have a name", s.nameless === 0, String(s.nameless));
    check("new-window links announce it", !s.blankTargets.length, s.blankTargets.join(", "));
    check("e-mail is a real mailto link", s.mailto.includes("mailto:recepce@sportovni-centrum.cz") && !s.jsWarning, s.mailto.join(","));
    check("both reception phones are tel: links", s.tel.includes("tel:+420481622996") && s.tel.includes("tel:+420736752563"), s.tel.join(","));

    // axe-core
    await revealAll(page);
    await page.waitForTimeout(800);
    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () => {
      const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } });
      return r.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" ; ")}`);
    });
    check("axe-core: no WCAG 2.2 A/AA or best-practice violations (desktop)", !axe.length, axe.join("\n   "));
    await ctx.close();
  }

  /* 3. Desktop keyboard: skip link, dropdowns, focus not obscured ----------------------------- */
  {
    const { ctx, page } = await open();
    await page.keyboard.press("Tab");
    await page.waitForTimeout(350);
    const skip = await page.evaluate(() => ({ text: document.activeElement.textContent.trim(), top: document.activeElement.getBoundingClientRect().top }));
    check("first Tab focuses visible skip link", skip.text === "Přeskočit na obsah" && skip.top >= 0, JSON.stringify(skip));
    await page.keyboard.press("Enter");
    check("skip link moves focus to main", await page.evaluate(() => document.activeElement.id === "obsah"));

    await page.goto(URL_);
    const toggle = page.locator(".sub-toggle").first();
    await toggle.focus();
    await page.keyboard.press("Enter");
    const opened = await page.evaluate(() => {
      const b = document.querySelector(".sub-toggle");
      const panel = document.getElementById(b.getAttribute("aria-controls"));
      return { expanded: b.getAttribute("aria-expanded"), visible: getComputedStyle(panel).visibility };
    });
    check("desktop dropdown opens with keyboard", opened.expanded === "true" && opened.visible === "visible", JSON.stringify(opened));
    await page.keyboard.press("Tab");
    const inSub = await page.evaluate(() => document.activeElement.closest(".subnav") !== null);
    check("Tab moves into the open dropdown", inSub);
    await page.keyboard.press("Escape");
    const esc = await page.evaluate(() => ({ expanded: document.querySelector(".sub-toggle").getAttribute("aria-expanded"), focus: document.activeElement.classList.contains("sub-toggle") }));
    check("Escape closes dropdown and returns focus to its button", esc.expanded === "false" && esc.focus, JSON.stringify(esc));

    // Pointer hover opens, leaving closes
    const kr = page.locator(".nav-item.has-sub").nth(1);
    await kr.hover();
    await page.waitForTimeout(350);
    check("desktop dropdown opens on hover", await kr.evaluate((el) => el.classList.contains("is-open")));
    await page.mouse.move(640, 600);
    await page.waitForTimeout(500);
    check("desktop dropdown closes when pointer leaves", !(await kr.evaluate((el) => el.classList.contains("is-open"))));
    // Click outside closes
    await page.locator(".sub-toggle").nth(2).click();
    await page.mouse.click(640, 700);
    check("click outside closes dropdown", await page.evaluate(() => !document.querySelector(".nav-item.is-open")));

    // Every focusable element: visible focus and not hidden under the sticky header
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.locator("body").click({ position: { x: 5, y: 300 } });
    const problems = [];
    for (let i = 0; i < 120; i++) {
      await page.keyboard.press("Tab");
      const measure = () => page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const r = el.getBoundingClientRect();
        const header = document.querySelector("[data-header]").getBoundingClientRect();
        const cs = getComputedStyle(el);
        const inHeader = el.closest("[data-header]") !== null;
        return {
          label: (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 40),
          obscured: !inHeader && r.top < header.bottom - 2,
          offscreen: r.bottom < 0 || r.top > innerHeight,
          ring: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2,
          end: el.classList.contains("to-top"),
        };
      });
      let f = await measure();
      if (f && (f.offscreen || f.obscured)) { await page.waitForTimeout(700); f = await measure(); } // smooth focus scrolling still in progress
      if (!f) continue;
      if (f.obscured || f.offscreen || !f.ring) problems.push(`${f.label} ${JSON.stringify(f)}`);
      if (f.end) break;
    }
    check("keyboard focus visible and never under the sticky header", !problems.length, problems.slice(0, 5).join("\n   "));
    await ctx.close();
  }

  /* 4. Mobile menu --------------------------------------------------------------------------- */
  {
    const { ctx, page } = await open({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    const btn = page.locator("[data-nav-toggle]");
    check("mobile: menu hidden initially", !(await page.locator("#hlavni-navigace").isVisible()));
    await btn.tap();
    const st = await page.evaluate(() => ({
      expanded: document.querySelector("[data-nav-toggle]").getAttribute("aria-expanded"),
      visible: getComputedStyle(document.getElementById("hlavni-navigace")).display !== "none" && document.getElementById("hlavni-navigace").getBoundingClientRect().height > 300,
      focusIn: document.getElementById("hlavni-navigace").contains(document.activeElement),
      label: document.querySelector("[data-nav-label]").textContent,
      currentGroupOpen: document.querySelector(".nav-item.is-active .sub-toggle").getAttribute("aria-expanded"),
    }));
    check("mobile: menu opens, focus moves in, label 'Zavřít'", st.expanded === "true" && st.visible && st.focusIn && st.label === "Zavřít", JSON.stringify(st));
    check("mobile: current group (Kroužky) pre-expanded", st.currentGroupOpen === "true");
    const sp = page.locator(".sub-toggle").first();
    await sp.tap();
    check("mobile: group expands on tap", (await sp.getAttribute("aria-expanded")) === "true" && (await page.locator("#podnabidka-1").isVisible()));
    const items = await page.locator("#hlavni-navigace a").evaluateAll((as) => as.length);
    check("mobile: all 30 navigation links present", items === 30, String(items));
    // focus trap
    for (let i = 0; i < 40; i++) await page.keyboard.press("Tab");
    check("mobile: focus stays inside menu while open", await page.evaluate(() => document.getElementById("hlavni-navigace").contains(document.activeElement) || document.activeElement.matches("[data-nav-toggle]")));
    await page.keyboard.press("Escape");
    const closed = await page.evaluate(() => ({ expanded: document.querySelector("[data-nav-toggle]").getAttribute("aria-expanded"), focus: document.activeElement.matches("[data-nav-toggle]"), scrollLock: document.body.classList.contains("nav-open") }));
    check("mobile: Escape closes menu, focus returns to toggle, scroll unlocked", closed.expanded === "false" && closed.focus && !closed.scrollLock, JSON.stringify(closed));
    if (shotsDir) { await btn.tap(); await page.waitForTimeout(700); await page.screenshot({ path: `${shotsDir}/mobile-menu.png` }); await btn.tap(); }

    // Anchor offset: secondary CTA lands below the sticky header
    await page.locator('a[href="#treninky"]').tap();
    await page.waitForTimeout(1200);
    const off = await page.evaluate(() => ({ top: document.getElementById("treninky").getBoundingClientRect().top, header: document.querySelector("[data-header]").getBoundingClientRect().bottom }));
    check("anchor #treninky lands below sticky header", off.top >= off.header - 1 && off.top < off.header + 60, JSON.stringify(off));

    // Lightbox with touch
    await page.locator("[data-gallery-item]").nth(1).scrollIntoViewIfNeeded();
    await page.locator("[data-gallery-item]").nth(1).tap();
    await page.waitForTimeout(300);
    const lb = await page.evaluate(() => ({ open: document.querySelector("[data-lightbox]").open, counter: document.querySelector("[data-lb-counter]").textContent, focus: document.activeElement.matches("[data-lb-close]") }));
    check("mobile: lightbox opens on tap with focus on close", lb.open && lb.counter === "Fotografie 2 z 5" && lb.focus, JSON.stringify(lb));
    const box = await page.locator(".lightbox-stage").boundingBox();
    const y = box.y + box.height / 2;
    await page.evaluate(({ y, x1, x2 }) => {
      const stage = document.querySelector(".lightbox-stage");
      const ev = (type, x) => stage.dispatchEvent(new PointerEvent(type, { pointerType: "touch", clientX: x, clientY: y, bubbles: true }));
      ev("pointerdown", x1); ev("pointerup", x2);
    }, { y, x1: box.x + box.width * 0.8, x2: box.x + box.width * 0.2 });
    await page.waitForTimeout(200);
    check("mobile: swipe left shows next photo", (await page.locator("[data-lb-counter]").textContent()) === "Fotografie 3 z 5");
    if (shotsDir) await page.screenshot({ path: `${shotsDir}/mobile-lightbox.png` });
    await page.locator("[data-lb-close]").tap();
    check("mobile: lightbox closes and focus returns to the photo", await page.evaluate(() => !document.querySelector("[data-lightbox]").open && document.activeElement.matches("[data-gallery-item]")));
    await ctx.close();
  }

  /* 5. Lightbox keyboard (desktop) ---------------------------------------------------------------- */
  {
    const { ctx, page } = await open();
    const first = page.locator("[data-gallery-item]").first();
    await first.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    const a = await page.evaluate(() => ({ open: document.querySelector("[data-lightbox]").open, caption: document.querySelector("[data-lb-caption]").textContent, alt: document.querySelector("[data-lb-img]").alt }));
    check("lightbox opens with Enter, shows caption + alt", a.open && a.caption.length > 10 && a.alt.length > 10, JSON.stringify(a));
    await page.keyboard.press("ArrowLeft");
    check("ArrowLeft wraps to last photo", (await page.locator("[data-lb-counter]").textContent()) === "Fotografie 5 z 5");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    check("ArrowRight advances", (await page.locator("[data-lb-counter]").textContent()) === "Fotografie 2 z 5");
    for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
    check("focus stays inside the open lightbox", await page.evaluate(() => document.querySelector("[data-lightbox]").contains(document.activeElement)));
    await page.keyboard.press("Escape");
    check("Escape closes lightbox, focus back on trigger", await page.evaluate(() => !document.querySelector("[data-lightbox]").open && document.activeElement === document.querySelector("[data-gallery-item]")));
    await ctx.close();
  }

  /* 5b. Lightbox on short viewports (landscape phone, 400 % zoom): controls never covered ---------- */
  for (const [w, h] of [[844, 390], [320, 215], [1280, 600]]) {
    const { ctx, page } = await open({ viewport: { width: w, height: h } });
    await page.locator("[data-gallery-item]").first().evaluate((el) => el.click());
    await page.waitForTimeout(300);
    const hit = await page.evaluate(() => {
      const top = (sel) => { const el = document.querySelector(sel); const r = el.getBoundingClientRect(); const t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return el.contains(t); };
      const img = document.querySelector("[data-lb-img]").getBoundingClientRect();
      const stage = document.querySelector(".lightbox-stage").getBoundingClientRect();
      return { next: top("[data-lb-next]"), prev: top("[data-lb-prev]"), close: top("[data-lb-close]"), caption: top("[data-lb-caption]"), inStage: img.bottom <= stage.bottom + 1 && img.top >= stage.top - 1 };
    });
    check(`lightbox controls + caption uncovered @${w}×${h}`, hit.next && hit.prev && hit.close && hit.caption && hit.inStage, JSON.stringify(hit));
    await ctx.close();
  }

  /* 5c. Desktop: mixed mouse + keyboard, hover then click ------------------------------------------ */
  {
    const { ctx, page } = await open();
    const items = page.locator(".nav-item.has-sub");
    await items.nth(0).hover();
    await page.waitForTimeout(250);
    await page.locator(".sub-toggle").nth(0).click();
    await page.waitForTimeout(250);
    check("hover then click on the chevron keeps the dropdown open", await items.nth(0).evaluate((el) => el.classList.contains("is-open")));
    await page.mouse.click(640, 700);
    // keyboard focus inside dropdown A, pointer moves onto item B
    await page.locator(".sub-toggle").nth(0).focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await items.nth(1).hover();
    await page.waitForTimeout(400);
    const f1 = await page.evaluate(() => ({ tag: document.activeElement.tagName, body: document.activeElement === document.body, inNav: !!document.activeElement.closest("[data-nav]") }));
    check("hovering another item never drops keyboard focus to <body>", !f1.body && f1.inNav, JSON.stringify(f1));
    // hover-opened dropdown + Escape while focus is elsewhere: focus stays where it was
    await page.mouse.click(640, 700);
    await page.locator(".skip-link").focus();
    await items.nth(2).hover();
    await page.waitForTimeout(250);
    await page.keyboard.press("Escape");
    const f2 = await page.evaluate(() => ({ skip: document.activeElement.classList.contains("skip-link"), open: !!document.querySelector(".nav-item.is-open") }));
    check("Escape closes a hover-opened dropdown without moving focus", f2.skip && !f2.open, JSON.stringify(f2));
    await ctx.close();
  }

  /* 5d. Breakpoint change with focus in the open mobile panel; inert page behind the panel ---------- */
  {
    const { ctx, page } = await open({ viewport: { width: 900, height: 800 } });
    await page.locator("[data-nav-toggle]").click();
    const inert = await page.evaluate(() => ({ main: document.querySelector("main").inert, footer: document.querySelector("footer").inert }));
    check("page behind the open mobile menu is inert", inert.main && inert.footer, JSON.stringify(inert));
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);
    const f = await page.evaluate(() => ({ body: document.activeElement === document.body, label: document.activeElement.textContent.trim().slice(0, 20), inert: document.querySelector("main").inert, lock: document.body.classList.contains("nav-open") }));
    check("rotating to desktop with the menu open keeps focus, unlocks the page", !f.body && !f.inert && !f.lock, JSON.stringify(f));
    await ctx.close();
  }

  /* 5e. Print before scrolling: nothing hidden -------------------------------------------------------- */
  {
    const { ctx, page } = await open();
    await page.emulateMedia({ media: "print" });
    const hidden = await page.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((el) => el.getClientRects().length && getComputedStyle(el).opacity !== "1").length);
    check("print media shows every section without scrolling first", hidden === 0, `${hidden} hidden`);
    await ctx.close();
  }

  /* 5f. site.js blocked, and site.js late ---------------------------------------------------------- */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await page.route(/\/assets\/js\//, (r) => r.abort());
    await page.goto(URL_);
    await page.locator("[data-nav-toggle]").tap();
    const early = await page.evaluate(() => ({ open: document.getElementById("hlavni-navigace").classList.contains("is-open"), visible: getComputedStyle(document.getElementById("hlavni-navigace")).display !== "none" }));
    await page.locator("[data-nav-toggle]").tap();
    await page.waitForTimeout(3300);
    const late = await page.evaluate(() => ({ js: document.documentElement.classList.contains("js"), motion: document.documentElement.classList.contains("js-motion"), hidden: [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity !== "1").length }));
    check("site.js blocked: menu works from first paint; after 3 s all content visible, layout unchanged", early.open && early.visible && late.js && !late.motion && late.hidden === 0, JSON.stringify({ early, late }));
    await ctx.close();
  }
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.route(/\/assets\/js\//, async (r) => { await new Promise((res) => setTimeout(res, 4000)); r.continue(); });
    await page.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true }); });
    await page.goto(URL_);
    await page.waitForFunction(() => window.__scReady === true, null, { timeout: 15000 });
    await page.waitForTimeout(300);
    const cls = await page.evaluate(() => window.__cls);
    check("site.js arriving after the 3 s failsafe causes no layout shift", cls < 0.02, `CLS ${cls.toFixed(4)}`);
    await ctx.close();
  }

  /* 6. Reduced motion ---------------------------------------------------------------------------- */
  {
    const { ctx, page } = await open({ reducedMotion: "reduce" });
    const r = await page.evaluate(() => ({
      motionClass: document.documentElement.classList.contains("js-motion"),
      hidden: [...document.querySelectorAll("[data-reveal], [data-enter]")].filter((el) => getComputedStyle(el).opacity !== "1").length,
      smooth: getComputedStyle(document.documentElement).scrollBehavior,
      transform: [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).transform !== "none").length,
    }));
    check("reduced motion: everything visible without scrolling, no transforms, no smooth scroll", !r.motionClass && r.hidden === 0 && r.smooth === "auto" && r.transform === 0, JSON.stringify(r));
    await ctx.close();
  }

  /* 7. JavaScript disabled ---------------------------------------------------------------------- */
  for (const width of [390, 1280]) {
    const { ctx, page } = await open({ javaScriptEnabled: false, viewport: { width, height: 900 } });
    const r = await page.evaluate(() => ({
      hidden: [...document.querySelectorAll("[data-reveal], [data-enter]")].filter((el) => getComputedStyle(el).opacity !== "1").length,
      navVisible: document.getElementById("hlavni-navigace").getBoundingClientRect().height > 0,
      links: [...document.querySelectorAll("#hlavni-navigace a")].filter((a) => a.getBoundingClientRect().height > 0 || getComputedStyle(a.closest(".subnav") || a).visibility !== "hidden").length,
      gallery: [...document.querySelectorAll("[data-gallery-item]")].every((a) => a.getAttribute("href").endsWith(".jpg")),
    }));
    check(`no-JS @${width}: content visible, all 30 navigation links usable, gallery links to photos`, r.hidden === 0 && r.navVisible && r.gallery && r.links === 30, JSON.stringify(r));
    if (width === 1280) {
      await page.locator(".nav-item.has-sub").first().hover();
      await page.waitForTimeout(300);
      check("no-JS desktop: dropdown opens on hover (CSS)", await page.locator("#podnabidka-1").evaluate((el) => getComputedStyle(el).visibility === "visible"));
    }
    if (shotsDir) await page.screenshot({ path: `${shotsDir}/nojs-${width}.png` });
    await ctx.close();
  }
} finally {
  await browser.close();
  server.kill();
}
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
