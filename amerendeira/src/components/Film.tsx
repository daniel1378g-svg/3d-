"use client";

import { useEffect, useRef } from "react";
import { useContent } from "@/content/i18n";
import { FrameSequence, SEQUENCE, type SequenceSize } from "@/lib/frameSequence";
import { ScrollTrigger } from "@/lib/gsap";
import { IS_ARTIFACT } from "@/lib/artifact";
import { useReducedMotion } from "@/lib/motion";
import { CHAPTER_WINDOWS, FRAME_COUNT, progressToTime, timeToFrame } from "@/lib/videoTimeline";
import { ArrowRight } from "./Icons";
import { scrollToHash } from "./SiteHeader";

const PLATE_SCALE = 6; // the background plate canvas is drawn at 1/6 of the stage size
const SMOOTHING = 0.2; // share of the remaining distance covered per animation frame

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

type Rect = { x: number; y: number; w: number; h: number };

export function Film() {
  const reduced = useReducedMotion();
  const { brand, filmChapters, ui } = useContent();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const windowEl = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const plateCanvas = useRef<HTMLCanvasElement>(null);
  const frameCanvas = useRef<HTMLCanvasElement>(null);

  // ——— Frame renderer (canvas 2D) ———
  useEffect(() => {
    if (reduced) return;
    const rootEl = root.current!;
    const stageEl = stage.current!;
    const windowNode = windowEl.current!;
    const mediaEl = media.current!;
    const pc = plateCanvas.current!;
    const fc = frameCanvas.current!;
    const pctx = pc.getContext("2d", { alpha: false })!;
    // The plate is composed off-screen, then copied with a small blur that hides the steps of
    // the stretched rows (cheap: the canvas is 1/6 of the stage). Without canvas filters
    // (older Safari) it is copied as is.
    const scratch = document.createElement("canvas");
    const sctx = scratch.getContext("2d", { alpha: false })!;
    const canFilter = "filter" in pctx;
    const fctx = fc.getContext("2d")!;

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const size: SequenceSize = window.innerWidth < 900 || conn?.saveData ? "mobile" : "desktop";
    const zoomed = window.innerWidth < 700;
    fc.width = SEQUENCE[size].width;
    fc.height = SEQUENCE[size].height;

    let target = 0;
    let current = 0;
    let drawnFrame = -1;
    let drawnPlate = -1;
    let drawnZoom = -1;
    let wanted = 0;
    // Hero copy, captions and the progress rail follow the same smoothed progress as the frames
    // (one source of truth, so two captions can never be on screen together).
    let shownChapter = -2;
    let playing: boolean | null = null;
    let railShown = -1;
    const railFill = rootEl.querySelector<HTMLElement>(".film__rail-fill");
    let raf = 0;
    let visible = true;
    let live = false;
    let confirming = false;
    let disposed = false;
    let fallback: HTMLImageElement | null = null;
    let base: Rect = { x: 0, y: 0, w: 1, h: 1 };
    let stageW = 1;
    let stageH = 1;

    const seq = new FrameSequence(
      size,
      FRAME_COUNT,
      // Redraw only when the frame that just arrived is closer to the wanted one than what is
      // on screen (frames keep arriving in the background for a few seconds).
      (i) => {
        if (drawnFrame < 0 || Math.abs(i - wanted) < Math.abs(drawnFrame - wanted)) kick(true);
      },
      () => kick(true),
    );

    function measure() {
      const s = stageEl.getBoundingClientRect();
      const w = windowNode.getBoundingClientRect();
      stageW = s.width;
      stageH = s.height;
      base = { x: w.left - s.left, y: w.top - s.top, w: w.width, h: w.height };
      pc.width = scratch.width = Math.max(2, Math.ceil(stageW / PLATE_SCALE));
      pc.height = scratch.height = Math.max(2, Math.ceil(stageH / PLATE_SCALE));
      sctx.imageSmoothingQuality = "high";
      drawnPlate = -1;
    }

    function zoomFor(time: number) {
      // On phones the frame spans the full width; while the dough is still small (first 2.6 s)
      // it is shown slightly larger, settling to 1 before the loaf reaches the edges.
      if (!zoomed) return 1;
      return 1.12 - 0.12 * smoothstep((time - 1) / 1.6);
    }

    function drawPlate(i: number, rect: Rect) {
      const tile = seq.plates[i];
      if (!tile) return;
      const [tw, th] = SEQUENCE.plate.tile;
      const W = pc.width;
      const H = pc.height;
      const k = 1 / PLATE_SCALE;
      const x = rect.x * k;
      const y = rect.y * k;
      const w = rect.w * k;
      const h = rect.h * k;
      const r = x + w;
      const b = y + h;
      // The plate is the real studio background of this frame with the bread removed; its edge
      // rows and columns are stretched outwards so the frame continues into the page.
      sctx.drawImage(tile, 0, 0, tw, th, x, y, w, h);
      sctx.drawImage(tile, 0, 0, 1, th, 0, y, x, h);
      sctx.drawImage(tile, tw - 1, 0, 1, th, r, y, W - r, h);
      sctx.drawImage(tile, 0, 0, tw, 1, x, 0, w, y);
      sctx.drawImage(tile, 0, th - 1, tw, 1, x, b, w, H - b);
      sctx.drawImage(tile, 0, 0, 1, 1, 0, 0, x, y);
      sctx.drawImage(tile, tw - 1, 0, 1, 1, r, 0, W - r, y);
      sctx.drawImage(tile, 0, th - 1, 1, 1, 0, b, x, H - b);
      sctx.drawImage(tile, tw - 1, th - 1, 1, 1, r, b, W - r, H - b);
      // Above and below the frame the stretched rows would read as blurred streaks (steam on the
      // top edge), so they fade within ~30 px into the flat mean colour of that edge.
      const means = seq.edgeMeans[i];
      if (means) {
        if (y > 1) {
          const g = sctx.createLinearGradient(0, y, 0, Math.max(0, y - Math.min(y, 5)));
          g.addColorStop(0, `rgba(${means.top}, 0)`);
          g.addColorStop(1, `rgba(${means.top}, 1)`);
          sctx.fillStyle = g;
          sctx.fillRect(0, 0, W, y);
        }
        if (H - b > 1) {
          const g = sctx.createLinearGradient(0, b, 0, b + Math.min(H - b, 5));
          g.addColorStop(0, `rgba(${means.bottom}, 0)`);
          g.addColorStop(1, `rgba(${means.bottom}, 1)`);
          sctx.fillStyle = g;
          sctx.fillRect(0, b, W, H - b);
        }
      }
      if (!rootEl.classList.contains("has-plate")) rootEl.classList.add("has-plate");
      // Blit with a small blur; draw the scratch once without filter first so the blurred
      // copy never lets transparent edges in.
      pctx.drawImage(scratch, 0, 0);
      if (canFilter) {
        pctx.filter = "blur(1.6px)";
        pctx.drawImage(scratch, 0, 0);
        pctx.filter = "none";
      }
    }

    // The cover (first frame as a plain image) stays under the canvas until the canvas really
    // holds a frame. Safari can paint nothing for a frame drawn before it is decoded, which left
    // the stage empty until the first scroll asked for another frame. So the first frame is
    // decoded, drawn again on the next screen refresh, and one pixel is read back before the
    // cover goes; until then the cover keeps the bread on screen.
    function canvasHoldsFrame() {
      try {
        return fctx.getImageData(fc.width >> 1, fc.height >> 1, 1, 1).data[3] > 0;
      } catch {
        return true; // pixels cannot be read back (cross-origin): trust the draw
      }
    }

    function confirmLive() {
      if (confirming || live) return;
      confirming = true;
      const img = seq.frames[drawnFrame];
      const decoded = img?.decode ? img.decode().catch(() => undefined) : Promise.resolve();
      let tries = 0;
      const check = () => {
        if (disposed || live) return;
        render(true);
        requestAnimationFrame(() => {
          if (disposed || live) return;
          if (canvasHoldsFrame()) {
            live = true;
            rootEl.classList.add("is-live");
          } else if (++tries < 60) {
            check();
          } else {
            confirming = false; // the next frame drawn tries again
          }
        });
      };
      decoded.then(() => requestAnimationFrame(check));
    }

    function render(force = false) {
      const time = progressToTime(current);
      const want = timeToFrame(time);
      wanted = want;
      const chapter = CHAPTER_WINDOWS.findIndex(([a, b]) => current >= a && current < b);
      if (chapter !== shownChapter) {
        shownChapter = chapter;
        rootEl.dataset.chapter = String(chapter);
      }
      const isPlaying = current > 0.06;
      if (isPlaying !== playing) {
        playing = isPlaying;
        rootEl.classList.toggle("is-playing", isPlaying);
      }
      const rail = Math.round(Math.min(1, Math.max(0, (current - 0.1) / 0.88)) * 200) / 200;
      if (rail !== railShown && railFill) {
        railShown = rail;
        railFill.style.transform = `scaleX(${rail})`;
      }
      seq.focus(want);
      const zoom = zoomFor(time);
      if (zoom !== drawnZoom) {
        mediaEl.style.transform = zoom === 1 ? "" : `scale(${zoom})`;
        drawnZoom = zoom;
        force = true;
      }
      // If the frames cannot be loaded, keep telling the story with the two real stills: the
      // cover (dough) gives way to the last frame (baked loaf) as the visitor scrolls.
      if (!live && seq.failed >= 6) {
        if (!fallback) {
          fallback = document.createElement("img");
          fallback.className = "film__final";
          fallback.alt = "";
          fallback.setAttribute("aria-hidden", "true");
          fallback.src = `/videos/poster/final-${size === "desktop" ? 1280 : 960}.webp`;
          mediaEl.insertBefore(fallback, fc);
        }
        fallback.style.opacity = String(smoothstep((current - 0.3) / 0.3));
      }
      const idx = seq.nearest(want);
      if (idx >= 0 && (idx !== drawnFrame || force)) {
        fctx.clearRect(0, 0, fc.width, fc.height);
        fctx.drawImage(seq.source(idx)!, 0, 0, fc.width, fc.height);
        drawnFrame = idx;
        rootEl.dataset.frame = String(idx); // read by the QA scripts
        if (!live) confirmLive();
      }
      if (want !== drawnPlate || force) {
        const ox = 0.5 * base.w;
        const oy = 0.59 * base.h;
        const rect = {
          x: base.x + ox - ox * zoom,
          y: base.y + oy - oy * zoom,
          w: base.w * zoom,
          h: base.h * zoom,
        };
        if (seq.plates[want]) {
          drawPlate(want, rect);
          drawnPlate = want;
        }
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

    measure();
    const ro = new ResizeObserver(() => {
      measure();
      render(true);
    });
    ro.observe(stageEl);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick(true);
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "200px 0px" },
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

    // Start fetching frames once the page's essentials are in (cover, fonts, first images).
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const begin = () => seq.start();
    const idleId = w.requestIdleCallback ? w.requestIdleCallback(begin, { timeout: 1200 }) : window.setTimeout(begin, 300);

    // iOS can drop a canvas's pixels while the page is in the background or in the back/forward
    // cache: draw the current frame again whenever the page is shown.
    const redraw = () => {
      if (document.visibilityState === "visible") render(true);
    };
    document.addEventListener("visibilitychange", redraw);
    window.addEventListener("pageshow", redraw);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", redraw);
      window.removeEventListener("pageshow", redraw);
      ro.disconnect();
      io.disconnect();
      st.kill();
      cancelAnimationFrame(raf);
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      seq.dispose();
      rootEl.classList.remove("is-live", "has-plate", "is-playing");
      delete rootEl.dataset.chapter;
      fallback?.remove();
    };
  }, [reduced]);

  const onAnchor = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    scrollToHash(hash);
  };

  return (
    <section id="Top" ref={root} className={`film${reduced ? " film--still" : ""}`} aria-labelledby="film-title">
      <div className="film__track" ref={track}>
        <div className="film__stage" ref={stage} data-intro="stage">
          <canvas className="film__plate" ref={plateCanvas} aria-hidden="true" />

          <div className="film__headline">
            <h1 id="film-title" className="hero-title">
              {ui.heroTitle.map((l) => (
                <span key={l} className="line" data-intro="line">
                  <span>{l}</span>
                </span>
              ))}
            </h1>
          </div>
          <p className="film__eyebrow" data-intro="fade">
            {ui.heroEyebrow}
          </p>

          <div className="film__window" ref={windowEl}>
            {/* Reduced motion only (CSS): the still's own background, wider and fading into the
                page, so the still has no edge where the plate canvas would otherwise be. */}
            <img className="film__surround" src="/videos/poster/final-surround.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <div className="film__media" ref={media}>
              <picture>
                {!IS_ARTIFACT && (
  <source media="(prefers-reduced-motion: reduce)" type="image/avif" srcSet="/videos/poster/final-960.avif 960w, /videos/poster/final-1280.avif 1280w" sizes="(max-width: 899px) 100vw, 94vw" />
                )}
                <source media="(prefers-reduced-motion: reduce)" type="image/webp" srcSet="/videos/poster/final-960.webp 960w, /videos/poster/final-1280.webp 1280w" sizes="(max-width: 899px) 100vw, 94vw" />
                {!IS_ARTIFACT && (
  <source type="image/avif" srcSet="/videos/poster/cover-960.avif 960w, /videos/poster/cover-1280.avif 1280w" sizes="(max-width: 899px) 100vw, 94vw" />
                )}
                <source type="image/webp" srcSet="/videos/poster/cover-960.webp 960w, /videos/poster/cover-1280.webp 1280w" sizes="(max-width: 899px) 100vw, 94vw" />
                <img
                  className="film__cover"
                  src="/videos/poster/cover-1280.jpg"
                  width={1280}
                  height={720}
                  alt={reduced ? ui.finalAlt : ui.coverAlt}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <canvas
                className="film__frame"
                ref={frameCanvas}
                role="img"
                aria-label={ui.filmAria}
              />
            </div>
          </div>

          <div className="film__band">
            <div className="film__intro">
              <p className="film__lede">
                {brand.tagline.split(/(?<=\.) /).map((sentence) => (
                  <span key={sentence} className="line" data-intro="line">
                    <span>{sentence}</span>
                  </span>
                ))}
              </p>
              <div className="film__ctas" data-intro="fade">
                <a className="btn btn--primary" href="#menus" onClick={(e) => onAnchor(e, "#menus")}>
                  {ui.seeMenus} <ArrowRight />
                </a>
                <a className="btn btn--ghost" href="#Lojas" onClick={(e) => onAnchor(e, "#Lojas")}>
                  {ui.findShop} <ArrowRight />
                </a>
              </div>
              <p className="film__note" data-intro="fade">
                {brand.sideNote.map((l) => (
                  <span key={l} className="line">
                    <span>{l}</span>
                  </span>
                ))}
              </p>
            </div>
            {!reduced && (
              <ol className="film__chapters" aria-hidden="true">
                {filmChapters.map((c, i) => (
                  <li key={c.id} className="chapter">
                    <span className="chapter__num">0{i + 1}</span>
                    <span className="chapter__label">{c.label}</span>
                    <span className="chapter__text line">
                      <span>{c.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {!reduced && (
            <>
              <div className="film__rail" aria-hidden="true">
                <span>01</span>
                <span className="film__rail-bar">
                  <span className="film__rail-fill" />
                </span>
                <span>04</span>
              </div>
              <a className="film__cue" href="#menus" onClick={(e) => onAnchor(e, "#menus")} data-intro="fade">
                {ui.scroll}
                <span className="film__cue-line" aria-hidden="true" />
                <span className="sr-only">{ui.scrollSr}</span>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

