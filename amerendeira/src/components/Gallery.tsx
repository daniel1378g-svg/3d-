"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useContent } from "@/content/i18n";
import { images, type ImageId } from "@/lib/images";
import { Chevron, Close } from "./Icons";
import { Photo } from "./Photo";

export function Gallery() {
  const { gallery, ui, imageAlt } = useContent();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const all = gallery.images as unknown as ImageId[];

  const open = (i: number, el: HTMLButtonElement) => {
    opener.current = el;
    setIndex(i);
  };

  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + all.length) % all.length)), [all.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
  }, [index]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setIndex(null);
      opener.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const currentId = index !== null ? all[index] : null;

  return (
    <section id="galeria" className="gallery section" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="gallery__head" data-lines>
          <div>
            <p className="eyebrow">{gallery.eyebrow}</p>
            <h2 id="gallery-title" className="display">
              {gallery.title.map((l) => (
                <span key={l} className="line">
                  <span>{l}</span>
                </span>
              ))}
            </h2>
          </div>
          <p className="gallery__hint">{gallery.hint}</p>
        </div>
      </div>

      <div className="wrap">
        <ul className="gallery__grid">
          {all.map((id, i) => {
            const info = images[id];
            return (
              <li key={id} className={`gallery__cell gallery__cell--${i + 1}`}>
                <button
                  type="button"
                  className="gallery__item"
                  style={{ aspectRatio: `${info.width} / ${info.height}` }}
                  onClick={(e) => open(i, e.currentTarget)}
                  aria-label={`${ui.galleryOpen}${imageAlt[id]}`}
                >
                  <span className="gallery__inner" data-parallax={i % 2 ? 4 : 2}>
                    <Photo id={id} sizes="(max-width: 699px) 46vw, 40vw" alt="" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog ref={dialog} className="lightbox" aria-label={ui.galleryDialog}>
        {currentId && (
          <div className="lightbox__inner">
            <div className="lightbox__bar">
              <span className="caps">
                {String(index! + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}
              </span>
              <button type="button" className="icon-btn" onClick={close} aria-label={ui.close}>
                <Close />
              </button>
            </div>
            <figure className="lightbox__figure">
              <Photo key={currentId} id={currentId} sizes="92vw" />
            </figure>
            <div className="lightbox__caption">
              <p>{imageAlt[currentId]}</p>
              <div className="lightbox__nav">
                <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label={ui.galleryPrev}>
                  <Chevron dir="left" />
                </button>
                <button type="button" className="icon-btn" onClick={() => step(1)} aria-label={ui.galleryNext}>
                  <Chevron />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
