import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { UI, fill } from "@/i18n";
import { type PhotoMeta } from "@/content";
import { useSite } from "@/site";
import { lockScroll } from "@/lib/scroll";
import { Photo } from "../Photo";
import { ArrowGlyph } from "../Glyphs";

/** Full-screen photo viewer: swipe or drag, ← →, Esc closes and gives focus back to what opened it. */
export function Lightbox({ photos, index, onIndex, onClose }: { photos: PhotoMeta[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    const unlock = lockScroll();
    closeBtn.current?.focus();
    return () => {
      unlock();
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex(((index ?? 0) + 1) % photos.length);
      else if (e.key === "ArrowLeft") onIndex(((index ?? 0) - 1 + photos.length) % photos.length);
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        const f = Array.from(document.querySelectorAll<HTMLElement>("#lightbox button"));
        const i = f.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, photos.length, onClose, onIndex]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (index === null) return;
    if (info.offset.x < -70 || info.velocity.x < -500) onIndex((index + 1) % photos.length);
    else if (info.offset.x > 70 || info.velocity.x > 500) onIndex((index - 1 + photos.length) % photos.length);
    else if (info.offset.y > 120) onClose();
  };
  const p = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={UI.lightbox[lang]}
          className="fixed inset-0 z-[480] flex flex-col bg-espresso/95 text-flour on-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="gutter flex items-center justify-between gap-4 pt-[calc(var(--label-h)+12px)]">
            <p className="text-sm font-semibold" aria-live="polite">
              {fill(UI.photoOf[lang], { n: (index ?? 0) + 1, total: photos.length })}
            </p>
            <button ref={closeBtn} type="button" onClick={onClose} className="grid h-12 w-12 place-items-center rounded-full bg-flour/10 ring-1 ring-flour/30 hover:bg-flour/20">
              <span aria-hidden="true" className="text-2xl leading-none">×</span>
              <span className="sr-only">{UI.close[lang]}</span>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.figure
                key={p.id}
                drag={reduce ? false : true}
                dragSnapToOrigin
                dragElastic={0.25}
                onDragEnd={onDragEnd}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex max-h-full cursor-grab flex-col items-center active:cursor-grabbing"
              >
                <Photo id={p.id} sizes="(min-width: 1024px) 70vw, 100vw" priority className="max-h-[72svh] w-auto overflow-hidden rounded-2xl [&_img]:max-h-[72svh] [&_img]:w-auto" style={{ aspectRatio: `${p.w} / ${p.h}` }} />
                <figcaption className="mt-4 max-w-[60ch] text-center text-[15px] text-flour/90">{p.alt[lang]}</figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="gutter flex items-center justify-center gap-4 pb-8">
            <button type="button" onClick={() => onIndex(((index ?? 0) - 1 + photos.length) % photos.length)} className="grid h-12 w-12 place-items-center rounded-full bg-flour text-espresso">
              <ArrowGlyph className="rotate-180" />
              <span className="sr-only">{UI.prevPhoto[lang]}</span>
            </button>
            <button type="button" onClick={() => onIndex(((index ?? 0) + 1) % photos.length)} className="grid h-12 w-12 place-items-center rounded-full bg-flour text-espresso">
              <ArrowGlyph />
              <span className="sr-only">{UI.nextPhoto[lang]}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
