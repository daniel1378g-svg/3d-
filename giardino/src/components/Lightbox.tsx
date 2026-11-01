// Full-screen photo viewer: arrow keys, swipe, Escape; focus is kept inside and returned to the opener on close.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSite } from "@/site";
import { largest, srcSet, useAlt, IMAGE_META } from "./Img";
import { Close, ChevronLeft, Chevron } from "./icons";

export function useLightbox(ids: string[]) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = useCallback((i: number) => {
    opener.current = document.activeElement as HTMLElement;
    setIndex(i);
  }, []);
  const close = useCallback(() => {
    setIndex(null);
    requestAnimationFrame(() => opener.current?.focus());
  }, []);
  const node = index === null ? null : <Lightbox ids={ids} index={index} onIndex={setIndex} onClose={close} />;
  return { open, node };
}

function Lightbox({ ids, index, onIndex, onClose }: { ids: string[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const { t } = useSite();
  const alt = useAlt();
  const box = useRef<HTMLDivElement>(null);
  const n = ids.length;
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);
  useEffect(() => {
    const el = box.current!;
    el.querySelector<HTMLElement>(".lb-close")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const f = [...el.querySelectorAll<HTMLElement>("button")];
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f.at(-1)!.focus();
        } else if (!e.shiftKey && document.activeElement === f.at(-1)) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [go, onClose]);
  // swipe
  const start = useRef<number | null>(null);
  const id = ids[index];
  const meta = IMAGE_META[id];
  return createPortal(
    <div
      className="lightbox"
      ref={box}
      role="dialog"
      aria-modal="true"
      aria-label={alt(id)}
      onPointerDown={(e) => (start.current = e.clientX)}
      onPointerUp={(e) => {
        if (start.current === null) return;
        const dx = e.clientX - start.current;
        start.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="lightbox__top">
        <span className="num">{t.a11y.photo(index + 1, n)}</span>
        <button type="button" className="icon-btn lb-close" style={{ color: "var(--ivory)", background: "transparent", borderColor: "rgb(245 240 230 / .35)" }} onClick={onClose}>
          <Close />
          <span className="sr-only">{t.a11y.close}</span>
        </button>
      </div>
      <div className="lightbox__stage">
        <img key={id} src={largest(id)} srcSet={srcSet(id)} sizes="100vw" width={meta.w} height={meta.h} alt={alt(id)} />
        {n > 1 && (
          <>
            <button type="button" className="round-btn lb-prev" onClick={() => go(-1)}>
              <ChevronLeft />
              <span className="sr-only">{t.a11y.previous}</span>
            </button>
            <button type="button" className="round-btn lb-next" onClick={() => go(1)}>
              <Chevron />
              <span className="sr-only">{t.a11y.next}</span>
            </button>
          </>
        )}
      </div>
      <p className="lightbox__cap" aria-live="polite">{alt(id)}</p>
    </div>,
    document.body,
  );
}
