/* Sportovní centrum Semily – shared interactions (no dependencies).
   Progressive enhancement: every link works and every section is visible without this file.
   The inline boot script in <head> adds .js and .js-motion; if this file never runs, the boot
   script removes .js-motion after a short timeout so nothing stays hidden. */
(() => {
  "use strict";
  const doc = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 1080px)");
  window.__scReady = true;
  doc.classList.remove("no-js");
  doc.classList.add("js");

  /* Sticky header: compact state after scrolling (shadow + slightly smaller logo, no layout shift) */
  const header = document.querySelector("[data-header]");
  if (header) {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none";
    document.body.prepend(sentinel);
    new IntersectionObserver(([e]) => header.classList.toggle("is-scrolled", !e.isIntersecting)).observe(sentinel);
  }

  /* Navigation ----------------------------------------------------------------------------- */
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const items = nav ? [...nav.querySelectorAll("[data-sub]")] : [];
  let hoverTimer = 0;

  const setItem = (item, open) => {
    const btn = item.querySelector(".sub-toggle");
    item.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
  };
  const closeAll = (except) => items.forEach((it) => it !== except && setItem(it, false));

  items.forEach((item) => {
    const btn = item.querySelector(".sub-toggle");
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      if (desktop.matches) closeAll(item);
      setItem(item, open);
    });
    // Pointer hover opens on desktop (with a short intent delay); never required to reach a link.
    item.addEventListener("pointerenter", (e) => {
      if (!desktop.matches || e.pointerType === "touch") return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => { closeAll(item); setItem(item, true); }, 60);
    });
    item.addEventListener("pointerleave", (e) => {
      if (!desktop.matches || e.pointerType === "touch") return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        if (!item.contains(document.activeElement)) setItem(item, false);
      }, 180);
    });
    // Keyboard: leaving the group with Tab closes it on desktop.
    item.addEventListener("focusout", (e) => {
      if (desktop.matches && !item.contains(e.relatedTarget)) setItem(item, false);
    });
    item.addEventListener("keydown", (e) => {
      // Desktop: Escape closes this dropdown. Mobile: let it bubble so the whole panel closes.
      if (!desktop.matches || e.key !== "Escape" || btn.getAttribute("aria-expanded") !== "true") return;
      e.stopPropagation();
      setItem(item, false);
      btn.focus();
    });
  });

  document.addEventListener("click", (e) => {
    if (desktop.matches && nav && !nav.contains(e.target)) closeAll();
  });

  // Mobile panel
  const focusables = () => [navToggle, ...nav.querySelectorAll("a[href], button:not([disabled])")]
    .filter((el) => el && el.offsetParent !== null);
  const setPanel = (open, { restoreFocus = true } = {}) => {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.querySelector("[data-nav-label]").textContent = open ? "Zavřít" : "Menu";
    document.body.classList.toggle("nav-open", open);
    if (open) {
      const current = nav.querySelector(".nav-item.is-active[data-sub]");
      if (current) setItem(current, true);
      nav.querySelector("a[href]")?.focus();
    } else if (restoreFocus) {
      navToggle.focus();
    }
  };
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => setPanel(navToggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", (e) => {
      if (desktop.matches) {
        if (e.key === "Escape") {
          const open = items.find((it) => it.classList.contains("is-open"));
          if (open) { setItem(open, false); open.querySelector(".sub-toggle").focus(); }
        }
        return;
      }
      if (!nav.classList.contains("is-open")) return;
      if (e.key === "Escape") { e.preventDefault(); setPanel(false); return; }
      if (e.key === "Tab") { // keep focus inside the open panel (toggle button + menu)
        const f = focusables();
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    nav.addEventListener("click", (e) => {
      if (!desktop.matches && e.target.closest("a[href]")) setPanel(false, { restoreFocus: false });
    });
    desktop.addEventListener("change", () => { setPanel(false, { restoreFocus: false }); closeAll(); });
  }

  /* Reveal on scroll (once) and track-line drawing --------------------------------------------- */
  const revealables = document.querySelectorAll("[data-reveal], .draw");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  /* In-page anchors: move keyboard focus to the target section (scrolling is CSS-smooth) ---- */
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || link.getAttribute("href") === "#") return;
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    requestAnimationFrame(() => target.focus({ preventScroll: true }));
  });

  /* Lightbox ---------------------------------------------------------------------------------- */
  const dialog = document.querySelector("[data-lightbox]");
  const triggers = [...document.querySelectorAll("[data-gallery-item]")];
  if (dialog && triggers.length && typeof dialog.showModal === "function") {
    const img = dialog.querySelector("[data-lb-img]");
    const caption = dialog.querySelector("[data-lb-caption]");
    const counter = dialog.querySelector("[data-lb-counter]");
    const closeBtn = dialog.querySelector("[data-lb-close]");
    const slides = triggers.map((t) => ({
      src: t.getAttribute("href"),
      alt: t.querySelector("img").getAttribute("alt"),
      caption: t.dataset.caption,
      width: t.dataset.width,
      height: t.dataset.height,
    }));
    let index = 0;
    let opener = null;

    const show = (i, dir = 0) => {
      index = (i + slides.length) % slides.length;
      const s = slides[index];
      img.classList.remove("is-swapping");
      img.style.setProperty("--dir", String(dir || 1));
      img.src = s.src;
      img.alt = s.alt;
      img.width = s.width;
      img.height = s.height;
      caption.textContent = s.caption;
      counter.textContent = `Fotografie ${index + 1} z ${slides.length}`;
      if (dir) { void img.offsetWidth; img.classList.add("is-swapping"); }
      // Preload neighbours
      [index + 1, index - 1].forEach((n) => { const p = new Image(); p.src = slides[(n + slides.length) % slides.length].src; });
    };

    triggers.forEach((t, i) => t.addEventListener("click", (e) => {
      e.preventDefault();
      opener = t;
      show(i);
      dialog.showModal();
      document.body.classList.add("nav-open");
      closeBtn.focus();
    }));
    dialog.querySelector("[data-lb-prev]").addEventListener("click", () => show(index - 1, -1));
    dialog.querySelector("[data-lb-next]").addEventListener("click", () => show(index + 1, 1));
    closeBtn.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      document.body.classList.remove("nav-open");
      opener?.focus();
    });
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1, 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1, -1); }
    });
    // Clicking the dark backdrop area (not the photo or controls) closes.
    let swipedAt = 0;
    dialog.addEventListener("click", (e) => {
      if (performance.now() - swipedAt < 400) return;
      if (e.target === dialog || e.target.matches(".lightbox-stage")) dialog.close();
    });
    // Touch swipe
    let startX = 0, startY = 0, tracking = false;
    const stage = dialog.querySelector(".lightbox-stage");
    stage.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") { tracking = true; startX = e.clientX; startY = e.clientY; } });
    stage.addEventListener("pointerup", (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        swipedAt = performance.now();
        show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      }
    });
    stage.addEventListener("pointercancel", () => { tracking = false; });
  }
})();
