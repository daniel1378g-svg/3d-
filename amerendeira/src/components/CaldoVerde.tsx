"use client";

import { useEffect, useRef } from "react";
import { useContent } from "@/content/i18n";
import { ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";
import { SOUP, SheetSequence, frameRect, soupFrame } from "@/lib/soupSequence";
import { ArrowRight } from "./Icons";
import { scrollToHash } from "./SiteHeader";

const SMOOTHING = 0.2; // share of the remaining distance covered per animation frame (as the bread)

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

// The caldo verde, poured by the scroll. When the block settles the clay bowl is empty; scrolling
// down pours the soup and fills it, stopping the scroll freezes it, scrolling up empties it again.
// Same principle as the bread film, with its own track, ScrollTrigger and loader: it neither reads
// nor changes the bread's. The bowl stays on screen (sticky) only for its own path; the scroll is
// the browser's own, nothing is captured or forced. No player, controls or autoplay.
// Sheets are fetched only when the block is near, so they never compete with the bread.
// Reduced motion: the full bowl as a still, no long path. If the sheets cannot be loaded, the empty
// and the full bowl stills crossfade with the scroll.
export function CaldoVerde() {
  const { soup, ui } = useContent();
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const full = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (reduced) return;
    const rootEl = root.current!;
    const stageEl = stage.current!;
    const fullEl = full.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!; // transparent until the first frame: the empty-bowl still shows through
    cv.width = SOUP.width;
    cv.height = SOUP.height;

    let target = 0;
    let current = 0;
    let drawn = -1;
    let raf = 0;
    let visible = false;
    let live = false;
    let disposed = false;

    const seq = new SheetSequence(() => kick(true));

    function render(force = false) {
      const want = soupFrame(current);
      seq.focus(want);
      if (!live && seq.failed >= 3) {
        rootEl.classList.add("is-fallback");
        fullEl.style.opacity = String(smoothstep((current - 0.25) / 0.5));
        return;
      }
      const f = seq.nearest(want);
      if (f < 0 || (f === drawn && !force)) return;
      const { sheet, sx, sy } = frameRect(f);
      ctx.drawImage(seq.sheets[sheet]!, sx, sy, SOUP.width, SOUP.height, 0, 0, SOUP.width, SOUP.height);
      drawn = f;
      rootEl.dataset.frame = String(f); // read by the QA scripts
      if (!live) {
        // The empty-bowl still stays under the canvas until a frame is really on it (see Film.tsx).
        requestAnimationFrame(() => {
          if (disposed || live) return;
          live = true;
          rootEl.classList.add("is-live");
        });
      }
    }

    function tick() {
      raf = 0;
      const delta = target - current;
      current = Math.abs(delta) < 0.0004 ? target : current + delta * SMOOTHING;
      render();
      if (current !== target && visible) raf = requestAnimationFrame(tick);
    }

    function kick(force = false) {
      if (force && visible) render(true);
      if (!raf && visible) raf = requestAnimationFrame(tick);
    }

    // Fetch when the block is about a screen and a half away (the bread is long done by then).
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        seq.start();
        near.disconnect();
      },
      { rootMargin: "150% 0px" },
    );
    near.observe(rootEl);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) kick(true);
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(stageEl);

    const st = ScrollTrigger.create({
      trigger: track.current!,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        target = self.progress;
        kick();
      },
    });
    target = current = st.progress;

    const redraw = () => {
      if (document.visibilityState === "visible") render(true);
    };
    document.addEventListener("visibilitychange", redraw);
    window.addEventListener("pageshow", redraw);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", redraw);
      window.removeEventListener("pageshow", redraw);
      near.disconnect();
      io.disconnect();
      st.kill();
      cancelAnimationFrame(raf);
      seq.dispose();
      rootEl.classList.remove("is-live", "is-fallback");
      fullEl.style.opacity = "";
      delete rootEl.dataset.frame;
    };
  }, [reduced]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    scrollToHash(hash);
  };

  return (
    <article id="caldo-verde" ref={root} className="soup" aria-labelledby="soup-title">
      <div className="soup__intro">
        <div className="soup__text" data-reveal>
          <p className="kicker">{ui.soupEyebrow}</p>
          <h3 id="soup-title" className="h-lg">
            <span>{ui.soupTitle[0]}</span>
            <span className="h-soft">{ui.soupTitle[1]}</span>
          </h3>
          <p className="soup__copy">{soup.text}</p>
          <div className="soup__ctas">
            <a className="btn btn--primary" href="#menu-duo" onClick={(e) => goTo(e, "#menu-duo")}>
              {soup.ctaDuo} <ArrowRight />
            </a>
            <a className="btn btn--ghost" href="#menu-merendeira" onClick={(e) => goTo(e, "#menu-merendeira")}>
              {soup.ctaMerendeira} <ArrowRight />
            </a>
          </div>
          <p className="soup__hint" aria-hidden="true">
            <span className="soup__hint-line" />
            {ui.soupHint}
          </p>
        </div>
      </div>

      <div className="soup__track" ref={track}>
        <div className="soup__stage" ref={stage}>
          <div className="soup__media">
            <picture>
              <source type="image/webp" srcSet={`${SOUP.empty}.webp`} />
              <img className="soup__still soup__still--empty" src={`${SOUP.empty}.jpg`} width={SOUP.width} height={SOUP.height} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            </picture>
            <picture>
              <source type="image/webp" srcSet={`${SOUP.full}.webp`} />
              <img
                ref={full}
                className="soup__still soup__still--full"
                src={`${SOUP.full}.jpg`}
                width={SOUP.width}
                height={SOUP.height}
                alt={reduced ? ui.soupFullAlt : ""}
                aria-hidden={reduced ? undefined : true}
                loading="lazy"
                decoding="async"
              />
            </picture>
            {!reduced && <canvas className="soup__canvas" ref={canvas} role="img" aria-label={ui.soupAnimLabel} />}
          </div>
        </div>
      </div>
    </article>
  );
}
