"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useContent } from "@/content/i18n";
import { images, type ImageId } from "@/lib/images";
import { Chevron } from "./Icons";
import { Photo } from "./Photo";

// One slideshow for every food and table photograph (the original's "O sabor em imagens" and
// "Galeria de sabores" showed the same kind of pictures twice). A filmstrip of photos at a common
// height that slides horizontally: arrows, position indicator, swipe on touch screens, arrow keys
// when it has focus. No automatic rotation.
const FLAVOUR: ImageId[] = ["sabor-pao-caldo", "sabor-maos-massa", "sabor-cliente"];

export function Gallery() {
  const { gallery, flavour, ui, imageAlt } = useContent();
  const all = [...(gallery.images as unknown as ImageId[]), ...FLAVOUR];
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; dx: number; id: number; axis: "x" | "y" | null } | null>(null);
  const [dragX, setDragX] = useState(0);

  const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(all.length - 1, i))), [all.length]);

  // Centre the active photo, without leaving empty space at either end.
  const measure = useCallback(() => {
    const vp = viewport.current;
    const slide = track.current?.children[index] as HTMLElement | undefined;
    if (!vp || !slide || !track.current) return;
    const max = Math.max(0, track.current.scrollWidth - vp.clientWidth);
    const centre = slide.offsetLeft - (vp.clientWidth - slide.offsetWidth) / 2;
    setOffset(Math.max(0, Math.min(max, centre)));
  }, [index]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    return () => ro.disconnect();
  }, [measure]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    drag.current = { x: e.clientX, y: e.clientY, dx: 0, id: e.pointerId, axis: null };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.axis && Math.hypot(dx, dy) > 8) d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (d.axis === "x") {
      d.dx = dx;
      setDragX(dx);
    }
  };
  const onPointerEnd = () => {
    const d = drag.current;
    drag.current = null;
    setDragX(0);
    if (d?.axis === "x" && Math.abs(d.dx) > 48) go(index + (d.dx < 0 ? 1 : -1));
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="galeria" className="gallery" aria-labelledby="gallery-title">
      <div className="wrap gallery__head">
        <div>
          <p className="kicker">{ui.galleryEyebrow}</p>
          <h2 id="gallery-title" className="h-xl" data-lines>
            {flavour.title.map((l) => (
              <span key={l} className="line">
                <span>{l}</span>
              </span>
            ))}
          </h2>
        </div>
        <p className="gallery__text">{flavour.text}</p>
      </div>

      <div className="slideshow">
        <div
          className="slideshow__viewport"
          ref={viewport}
          role="region"
          aria-roledescription="carrossel"
          aria-label={ui.galleryLabel}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          <div
            className={`slideshow__track${dragX ? " is-dragging" : ""}`}
            ref={track}
            style={{ transform: `translate3d(${-offset + dragX}px, 0, 0)` }}
          >
            {all.map((id, i) => {
              const info = images[id];
              const active = i === index;
              return (
                <div
                  key={id}
                  className={`slide${active ? " is-active" : ""}`}
                  style={{ aspectRatio: `${info.width} / ${info.height}` }}
                  role="group"
                  aria-roledescription="diapositivo"
                  aria-label={`${i + 1} ${ui.of} ${all.length}`}
                  aria-hidden={!active || undefined}
                  onClick={() => go(i)}
                >
                  <Photo id={id} sizes="(max-width: 699px) 80vw, 46vw" alt={imageAlt[id]} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="slideshow__bar wrap">
          <p className="slideshow__caption" aria-live="polite">
            <span className="slideshow__count">
              <span className="sr-only">{ui.galleryPosition} </span>
              {pad(index + 1)} <span aria-hidden="true">/</span>
              <span className="sr-only"> {ui.of} </span> {pad(all.length)}
            </span>
            <span className="slideshow__alt">{imageAlt[all[index]]}</span>
          </p>
          <div className="slideshow__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(index + 1) / all.length})` }} />
          </div>
          <div className="slideshow__nav">
            <button type="button" className="round-btn" onClick={() => go(index - 1)} disabled={index === 0} aria-label={ui.galleryPrev}>
              <Chevron dir="left" />
            </button>
            <button type="button" className="round-btn" onClick={() => go(index + 1)} disabled={index === all.length - 1} aria-label={ui.galleryNext}>
              <Chevron />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
