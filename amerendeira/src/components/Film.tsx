"use client";

import { useEffect, useRef, useState } from "react";
import { useContent, useLang } from "@/content/i18n";
import type { DrawnTitle as DrawnTitleData } from "@/lib/drawnTitles";
import { FrameSequence, SEQUENCE, type SequenceSize } from "@/lib/frameSequence";
import { ScrollTrigger } from "@/lib/gsap";
import { IS_ARTIFACT } from "@/lib/artifact";
import { useReducedMotion } from "@/lib/motion";
import { CHAPTER_WINDOWS, FRAME_COUNT, progressToTime, timeToFrame } from "@/lib/videoTimeline";
import { DrawnTitle } from "./DrawnTitle";
import { ArrowRight } from "./Icons";
import { scrollToHash } from "./SiteHeader";

// The frames follow the scroll with a short, frame-rate independent ease (time constant in ms):
// quick enough to feel attached to the finger, long enough to hide the steps of a wheel.
const EASE_MS = 55;

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

export function Film({ headline }: { headline: DrawnTitleData }) {
  const reduced = useReducedMotion();
  const { brand, drawnText, filmChapters, ui } = useContent();
  const { lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const windowEl = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const frameCanvas = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);

  // ——— Frame renderer (canvas 2D) ———
  useEffect(() => {
    if (reduced) return;
    const rootEl = root.current!;
    const stageEl = stage.current!;
    const windowNode = windowEl.current!;
    const mediaEl = media.current!;
    const fc = frameCanvas.current!;
    // Frames are opaque (white backdrop), so the canvas needs no alpha channel.
    const fctx = fc.getContext("2d", { alpha: false })!;
    fctx.imageSmoothingQuality = "high";

    // Source-resolution frames when the film is shown wider than ~1500 device pixels (large or
    // dense screens); 1280 px frames otherwise, and always with Save-Data.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const devicePx = windowNode.getBoundingClientRect().width * Math.min(window.devicePixelRatio || 1, 2);
    const size: SequenceSize = devicePx > 1500 && !conn?.saveData ? "desktop" : "mobile";
    const zoomed = window.innerWidth < 700;
    fc.width = SEQUENCE[size].width;
    fc.height = SEQUENCE[size].height;

    let target = 0;
    let current = 0;
    let drawnFrame = -1;
    let drawnZoom = -1;
    let last = 0;
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
    let fallback: HTMLImageElement | null = null;

    const seq = new FrameSequence(
      size,
      FRAME_COUNT,
      // Redraw only when the frame that just arrived is closer to the wanted one than what is
      // on screen (frames keep arriving in the background for a few seconds).
      (i) => {
        if (drawnFrame < 0 || Math.abs(i - wanted) < Math.abs(drawnFrame - wanted)) kick(true);
      },
    );

    function zoomFor(time: number) {
      // On phones the frame spans the full width; while the dough is still small (first 2.6 s)
      // it is shown slightly larger, settling to 1 before the loaf reaches the edges.
      if (!zoomed) return 1;
      return 1.12 - 0.12 * smoothstep((time - 1) / 1.6);
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
      const isPlaying = current > 0.035;
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
          fallback.src = `/videos/poster/final-${size === "desktop" ? 1920 : 1280}.webp`;
          mediaEl.insertBefore(fallback, fc);
        }
        fallback.style.opacity = String(smoothstep((current - 0.3) / 0.3));
      }
      const idx = seq.nearest(want);
      if (idx >= 0 && (idx !== drawnFrame || force)) {
        fctx.drawImage(seq.source(idx)!, 0, 0, fc.width, fc.height);
        drawnFrame = idx;
        rootEl.dataset.frame = String(idx); // read by the QA scripts
        if (!live) {
          live = true;
          rootEl.classList.add("is-live");
        }
      }
    }

    function tick(now: number) {
      raf = 0;
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      const delta = target - current;
      current = Math.abs(delta) < 0.0004 ? target : current + delta * (1 - Math.exp(-dt / EASE_MS));
      render();
      if (current !== target && visible) raf = requestAnimationFrame(tick);
      else last = 0;
    }

    function kick(force = false) {
      if (force && visible) render(true);
      if (!raf && visible) raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => render(true));
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

    return () => {
      ro.disconnect();
      io.disconnect();
      st.kill();
      cancelAnimationFrame(raf);
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      seq.dispose();
      rootEl.classList.remove("is-live", "is-playing");
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
          <div className="film__headline">
            <DrawnTitle as="h1" id="film-title" data={headline} className="drawn-title--hero" text={lang === "en" ? drawnText.hero : undefined} />
          </div>

          <div className="film__window" ref={windowEl}>
            <div className="film__media" ref={media}>
              <picture>
                {!IS_ARTIFACT && (
  <source media="(prefers-reduced-motion: reduce)" type="image/avif" srcSet="/videos/poster/final-960.avif 960w, /videos/poster/final-1280.avif 1280w, /videos/poster/final-1920.avif 1920w" sizes="(max-width: 899px) 100vw, 94vw" />
                )}
                <source media="(prefers-reduced-motion: reduce)" type="image/webp" srcSet="/videos/poster/final-960.webp 960w, /videos/poster/final-1280.webp 1280w, /videos/poster/final-1920.webp 1920w" sizes="(max-width: 899px) 100vw, 94vw" />
                {!IS_ARTIFACT && (
  <source type="image/avif" srcSet="/videos/poster/cover-960.avif 960w, /videos/poster/cover-1280.avif 1280w, /videos/poster/cover-1920.avif 1920w" sizes="(max-width: 899px) 100vw, 94vw" />
                )}
                <source type="image/webp" srcSet="/videos/poster/cover-960.webp 960w, /videos/poster/cover-1280.webp 1280w, /videos/poster/cover-1920.webp 1920w" sizes="(max-width: 899px) 100vw, 94vw" />
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
              {playing && (
                <video
                  className="film__player"
                  src="/videos/pao-com-chourico-720p.mp4"
                  poster="/videos/poster/cover-1280.jpg"
                  controls
                  playsInline
                  muted
                  autoPlay
                  onEnded={() => setPlaying(false)}
                />
              )}
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
                <a className="btn btn--solid" href="#menus" onClick={(e) => onAnchor(e, "#menus")}>
                  {ui.seeMenus} <ArrowRight />
                </a>
                <a className="btn" href="#Lojas" onClick={(e) => onAnchor(e, "#Lojas")}>
                  {ui.findShop} <ArrowRight />
                </a>
                {reduced && (
                  <button type="button" className="btn film__still-actions" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
                    {playing ? ui.closeVideo : ui.watchVideo}
                  </button>
                )}
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
              <a className="film__cue" href="#tradicao" onClick={(e) => onAnchor(e, "#tradicao")} data-intro="fade">
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

