/* Sportovní centrum Semily – shared interactions (no dependencies).
   Progressive enhancement: every link works and every section is visible without this file.
   The inline boot script in <head> adds .js/.js-motion and a minimal menu handler; if this file has
   not finished within 3 s it drops .js-motion (reveals become visible) – the layout never swaps.
   window.__scReady is set only after every feature below has been set up. */
(() => {
  "use strict";
  const doc = document.documentElement;
  const mq = (q) => window.matchMedia(q);
  const reduceMotion = mq("(prefers-reduced-motion: reduce)");
  const desktop = mq("(min-width: 67.5em)"); // same em breakpoint as the CSS (1080 px at default text size)
  const onChange = (m, fn) => (m.addEventListener ? m.addEventListener("change", fn) : m.addListener(fn));
  const failed = [];
  const safe = (name, fn) => { try { fn(); } catch (err) { failed.push(name); console.error(`[sc] ${name}:`, err); } };

  doc.classList.remove("no-js");
  doc.classList.add("js");

  /* Sticky header: compact state after scrolling (shadow + slightly smaller logo, no layout shift) */
  safe("header", () => {
    const header = document.querySelector("[data-header]");
    if (!header || !("IntersectionObserver" in window)) return;
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none";
    document.body.prepend(sentinel);
    new IntersectionObserver(([e]) => header.classList.toggle("is-scrolled", !e.isIntersecting)).observe(sentinel);
  });

  /* Navigation ----------------------------------------------------------------------------- */
  safe("navigation", () => {
    const nav = document.querySelector("[data-nav]");
    const navToggle = document.querySelector("[data-nav-toggle]");
    if (!nav) return;
    const items = [...nav.querySelectorAll("[data-sub]")];
    const label = navToggle?.querySelector("[data-nav-label]");
    const outside = () => [document.querySelector("main"), document.querySelector("footer"), document.querySelector(".skip-link"), document.querySelector(".brand")].filter(Boolean);
    let hoverTimer = 0;

    const toggleOf = (item) => item.querySelector(".sub-toggle");
    // Closing never drops focus: if focus is inside the panel being hidden, it moves to the toggle.
    const setItem = (item, open, { viaHover = false } = {}) => {
      const btn = toggleOf(item);
      if (!open && item.querySelector(".subnav").contains(document.activeElement)) btn.focus({ preventScroll: true });
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      if (open && viaHover) item.dataset.hoverOpen = "1"; else delete item.dataset.hoverOpen;
    };
    const closeAll = (except) => items.forEach((it) => it !== except && it.classList.contains("is-open") && setItem(it, false));

    items.forEach((item) => {
      const btn = toggleOf(item);
      btn.addEventListener("click", (e) => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        // A pointer click on a dropdown that hover just opened pins it open instead of closing it.
        if (desktop.matches && isOpen && e.detail > 0 && item.dataset.hoverOpen) { delete item.dataset.hoverOpen; return; }
        if (desktop.matches) closeAll(item);
        setItem(item, !isOpen);
      });
      item.addEventListener("pointerenter", (e) => {
        if (!desktop.matches || e.pointerType === "touch") return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          if (item.classList.contains("is-open")) return;
          closeAll(item);
          setItem(item, true, { viaHover: true });
        }, 60);
      });
      item.addEventListener("pointerleave", (e) => {
        if (!desktop.matches || e.pointerType === "touch") return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          // Stays open while it holds keyboard focus or was pinned by a click.
          if (!item.contains(document.activeElement) && item.dataset.hoverOpen) setItem(item, false);
        }, 180);
      });
      item.addEventListener("focusout", (e) => {
        if (desktop.matches && e.relatedTarget && !item.contains(e.relatedTarget)) setItem(item, false);
      });
    });

    document.addEventListener("click", (e) => {
      if (desktop.matches && !nav.contains(e.target)) closeAll();
    });

    // Mobile / tablet panel
    const isPanelOpen = () => nav.classList.contains("is-open");
    const focusables = () => [navToggle, ...nav.querySelectorAll("a[href], button:not([disabled])")]
      .filter((el) => el && el.getClientRects().length);
    const setPanel = (open, { restoreFocus = true } = {}) => {
      if (!navToggle) return;
      const wasOpen = isPanelOpen();
      nav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? label.dataset.close : label.dataset.open;
      document.body.classList.toggle("nav-open", open);
      outside().forEach((el) => { el.inert = open; }); // the page behind the panel is not reachable
      if (open) {
        const current = nav.querySelector(".nav-item.is-active[data-sub]");
        if (current) setItem(current, true);
        nav.querySelector("a[href]")?.focus();
      } else if (wasOpen && (restoreFocus || nav.contains(document.activeElement))) {
        navToggle.focus();
      }
    };
    if (navToggle) {
      navToggle.addEventListener("click", () => setPanel(!isPanelOpen()));
      nav.addEventListener("click", (e) => {
        const link = e.target.closest("a[href]");
        // Links that open a new window (the reservation system) leave the panel as it is.
        if (!desktop.matches && link && link.target !== "_blank") setPanel(false, { restoreFocus: false });
      });
    }
    document.addEventListener("keydown", (e) => {
      if (desktop.matches) {
        if (e.key !== "Escape") return;
        const open = items.find((it) => it.classList.contains("is-open"));
        if (!open) return;
        const hadFocus = open.contains(document.activeElement);
        setItem(open, false);
        if (hadFocus) toggleOf(open).focus();
        return;
      }
      if (!isPanelOpen()) return;
      if (e.key === "Escape") { e.preventDefault(); setPanel(false); return; }
      if (e.key === "Tab") { // keep focus inside the open panel (toggle button + menu)
        const f = focusables();
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // Crossing the breakpoint (window resize, tablet rotation): close menus without losing focus.
    onChange(desktop, () => {
      const focusedItem = items.find((it) => it.contains(document.activeElement));
      const focusInNav = nav.contains(document.activeElement);
      if (isPanelOpen()) setPanel(false, { restoreFocus: false });
      closeAll();
      if (!focusInNav) return;
      if (desktop.matches) (focusedItem?.querySelector(".nav-link") ?? nav.querySelector(".nav-link"))?.focus();
      else navToggle?.focus(); // the menu is collapsed into the panel now
    });
  });

  /* Reveal on scroll (once) and track-line drawing --------------------------------------------- */
  safe("reveal", () => {
    const revealables = document.querySelectorAll("[data-reveal], .draw");
    if ("IntersectionObserver" in window && !reduceMotion.matches && doc.classList.contains("js-motion")) {
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
    // Printing before scrolling must not print hidden sections.
    window.addEventListener("beforeprint", () => revealables.forEach((el) => el.classList.add("is-in")));
  });

  /* In-page anchors: move keyboard focus to the target section (scrolling is CSS-smooth) ---- */
  safe("anchors", () => {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link || link.getAttribute("href") === "#") return;
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      requestAnimationFrame(() => target.focus({ preventScroll: true }));
    });
  });

  /* Lightbox ---------------------------------------------------------------------------------- */
  safe("lightbox", () => {
    const dialog = document.querySelector("[data-lightbox]");
    const triggers = [...document.querySelectorAll("[data-gallery-item]")];
    // Without <dialog> support the gallery links simply open the original photos.
    if (!dialog || !triggers.length || typeof dialog.showModal !== "function") return;
    const img = dialog.querySelector("[data-lb-img]");
    const avif = dialog.querySelector("[data-lb-avif]");
    const webp = dialog.querySelector("[data-lb-webp]");
    const caption = dialog.querySelector("[data-lb-caption]");
    const counter = dialog.querySelector("[data-lb-counter]");
    const closeBtn = dialog.querySelector("[data-lb-close]");
    const counterText = dialog.dataset.counter;
    const slides = triggers.map((t) => ({
      src: t.getAttribute("href"),
      avif: t.dataset.avif || "",
      webp: t.dataset.webp || "",
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
      avif.srcset = s.avif;
      webp.srcset = s.webp;
      img.src = s.src;
      img.alt = s.alt;
      img.width = s.width;
      img.height = s.height;
      caption.textContent = s.caption;
      counter.textContent = counterText.replace("{n}", index + 1).replace("{total}", slides.length);
      if (dir && !reduceMotion.matches) { void img.offsetWidth; img.classList.add("is-swapping"); }
      // Warm the next photo in the direction of travel only (WebP: smaller than the JPEG, universally supported).
      const next = slides[(index + (dir < 0 ? -1 : 1) + slides.length) % slides.length];
      const pre = new Image();
      pre.src = next.webp || next.src;
    };

    triggers.forEach((t, i) => t.addEventListener("click", (e) => {
      e.preventDefault();
      opener = t;
      show(i);
      dialog.showModal();
      document.body.classList.add("lightbox-open");
      closeBtn.focus();
    }));
    dialog.querySelector("[data-lb-prev]").addEventListener("click", () => show(index - 1, -1));
    dialog.querySelector("[data-lb-next]").addEventListener("click", () => show(index + 1, 1));
    closeBtn.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      document.body.classList.remove("lightbox-open");
      opener?.focus();
    });
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1, 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1, -1); }
    });
    let swipedAt = 0;
    // Clicking the dark area around the photo closes (not the photo or the controls).
    dialog.addEventListener("click", (e) => {
      if (performance.now() - swipedAt < 400) return;
      if (e.target === dialog || e.target.matches(".lightbox-stage")) dialog.close();
    });
    // Touch swipe (one finger only – two fingers are a pinch-zoom).
    const stage = dialog.querySelector(".lightbox-stage");
    const pointers = new Set();
    let startX = 0, startY = 0, tracking = false;
    stage.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      pointers.add(e.pointerId);
      tracking = pointers.size === 1;
      startX = e.clientX; startY = e.clientY;
    });
    const end = (e) => {
      pointers.delete(e.pointerId);
      if (!tracking || e.type === "pointercancel") { tracking = false; return; }
      tracking = false;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        swipedAt = performance.now();
        show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      }
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
  });

  if (failed.includes("reveal")) doc.classList.remove("js-motion"); // never leave content hidden
  window.__scReady = true;
})();
