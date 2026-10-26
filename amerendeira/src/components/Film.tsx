"use client";

import { useEffect, useRef, useState } from "react";
import { brand, filmChapters } from "@/content/site";
import type { DrawnTitle as DrawnTitleData } from "@/lib/drawnTitles";
import { FrameSequence, SEQUENCE, type SequenceSize } from "@/lib/frameSequence";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";
import { CHAPTER_WINDOWS, DURATION, FRAME_COUNT, progressToTime, timeToFrame } from "@/lib/videoTimeline";
import { DrawnTitle } from "./DrawnTitle";
import { ArrowRight } from "./Icons";
import { scrollToHash } from "./SiteHeader";

const PLATE_SCALE = 6; // the background plate canvas is drawn at 1/6 of the stage size
const SMOOTHING = 0.2; // share of the remaining distance covered per animation frame

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

type Rect = { x: number; y: number; w: number; h: number };

export function Film({ headline }: { headline: DrawnTitleData }) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const windowEl = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const plateCanvas = useRef<HTMLCanvasElement>(null);
  const frameCanvas = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);

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
    let raf = 0;
    let visible = true;
    let live = false;
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
      // Far from the frame, the stretched rows would read as streaks on tall screens: fade them
      // into the mean colour of the frame's own top and bottom edges.
      const means = seq.edgeMeans[i];
      if (means) {
        if (y > 1) {
          const g = sctx.createLinearGradient(0, y, 0, Math.max(0, y - Math.max(6, y * 0.85)));
          g.addColorStop(0, `rgba(${means.top}, 0)`);
          g.addColorStop(1, `rgba(${means.top}, 1)`);
          sctx.fillStyle = g;
          sctx.fillRect(0, 0, W, y);
        }
        if (H - b > 1) {
          const g = sctx.createLinearGradient(0, b, 0, b + Math.max(6, (H - b) * 0.85));
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

    function render(force = false) {
      const time = progressToTime(current);
      const want = timeToFrame(time);
      wanted = want;
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
        if (!live) {
          live = true;
          rootEl.classList.add("is-live");
        }
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

    return () => {
      ro.disconnect();
      io.disconnect();
      st.kill();
      cancelAnimationFrame(raf);
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      seq.dispose();
      rootEl.classList.remove("is-live", "has-plate");
      fallback?.remove();
    };
  }, [reduced]);

  // ——— Text choreography tied to the same scroll range ———
  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: track.current, start: "top top", end: "bottom bottom", scrub: 0.5 },
        });
        tl.set({}, {}, 1); // timeline length = 1 = whole scroll range

        // Entrance → the hero copy makes room for the action.
        tl.fromTo(q(".film__headline"), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, duration: 0.09, ease: "power1.in", immediateRender: false }, 0.015);
        tl.fromTo(q(".film__intro > *"), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -26, duration: 0.07, stagger: 0.012, ease: "power1.in", immediateRender: false }, 0.01);
        tl.fromTo(q(".film__cue"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.03, immediateRender: false }, 0);
        tl.fromTo(q(".film__rail"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04, immediateRender: false }, 0.06);
        tl.fromTo(q(".film__rail-fill"), { scaleX: 0 }, { scaleX: 1, duration: 0.88, immediateRender: false }, 0.1);

        // Development and conclusion: one caption per visible phase of the clip.
        q(".chapter").forEach((el, i) => {
          const [a, b] = CHAPTER_WINDOWS[i];
          const text = el.querySelector(".chapter__text > span");
          tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02, immediateRender: false }, a);
          tl.fromTo(text, { yPercent: 105 }, { yPercent: 0, duration: 0.05, ease: "power2.out", immediateRender: false }, a);
          if (b < 1) {
            tl.to(text, { yPercent: -105, duration: 0.04, ease: "power2.in" }, b - 0.04);
            tl.to(el, { autoAlpha: 0, duration: 0.015 }, b - 0.015);
          }
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced] },
  );

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
            <DrawnTitle as="h1" id="film-title" data={headline} className="drawn-title--hero" />
          </div>

          <div className="film__window" ref={windowEl}>
            <div className="film__media" ref={media}>
              <picture>
                <source media="(prefers-reduced-motion: reduce)" type="image/avif" srcSet="/videos/poster/final-960.avif 960w, /videos/poster/final-1280.avif 1280w, /videos/poster/final-1920.avif 1920w" sizes="(max-width: 899px) 100vw, 94vw" />
                <source media="(prefers-reduced-motion: reduce)" type="image/webp" srcSet="/videos/poster/final-960.webp 960w, /videos/poster/final-1280.webp 1280w, /videos/poster/final-1920.webp 1920w" sizes="(max-width: 899px) 100vw, 94vw" />
                <source type="image/avif" srcSet="/videos/poster/cover-960.avif 960w, /videos/poster/cover-1280.avif 1280w, /videos/poster/cover-1920.avif 1920w" sizes="(max-width: 899px) 100vw, 94vw" />
                <source type="image/webp" srcSet="/videos/poster/cover-960.webp 960w, /videos/poster/cover-1280.webp 1280w, /videos/poster/cover-1920.webp 1920w" sizes="(max-width: 899px) 100vw, 94vw" />
                <img
                  className="film__cover"
                  src="/videos/poster/cover-1280.jpg"
                  width={1280}
                  height={720}
                  alt={reduced ? "Pão com chouriço acabado de cozer, dourado, com o chouriço à vista e vapor a subir" : "Massa de pão crua sobre fundo claro, antes de ir ao forno"}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <canvas
                className="film__frame"
                ref={frameCanvas}
                role="img"
                aria-label="Vídeo controlado pelo scroll: a massa cresce, abre-se e mostra o chouriço, a crosta doura e o pão sai a fumegar."
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
                <span className="line" data-intro="line"><span>Pão com chouriço feito à moda antiga.</span></span>
                <span className="line" data-intro="line"><span>Com forno a lenha e alma portuguesa.</span></span>
                <span className="line" data-intro="line"><span>Milhares de clientes felizes.</span></span>
              </p>
              <div className="film__ctas" data-intro="fade">
                <a className="btn btn--solid" href="#menus" onClick={(e) => onAnchor(e, "#menus")}>
                  Ver menus <ArrowRight />
                </a>
                <a className="btn" href="#Lojas" onClick={(e) => onAnchor(e, "#Lojas")}>
                  Encontrar uma loja <ArrowRight />
                </a>
                {reduced && (
                  <button type="button" className="btn film__still-actions" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
                    {playing ? "Fechar o vídeo" : `Ver o vídeo (${Math.round(DURATION)} s, sem som)`}
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
                Desce
                <span className="film__cue-line" aria-hidden="true" />
                <span className="sr-only">para a história da Merendeira</span>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

