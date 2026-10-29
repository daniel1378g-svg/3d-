// A swipeable lightbox for the photos: ← → or swipe, Esc closes and focus returns where it was.
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useReturnFocus } from "@/lib/useReturnFocus";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import type { Photo } from "@/content/photos";
import { IconArrow, IconArrowLeft, IconClose } from "./icons";

export function Lightbox({ photos, index, onIndex, onClose }: { photos: Photo[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const start = useRef<number | null>(null);
  const dir = useRef(1);
  const open = index !== null;
  const returnFocus = useReturnFocus(open);
  const go = (d: number) => {
    if (index === null) return;
    dir.current = d;
    onIndex((index + d + photos.length) % photos.length);
  };
  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });
  const p = index !== null ? photos[index] : null;
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && p && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div className="fixed inset-0 z-[600] bg-marca-escura/95" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            </Dialog.Overlay>
            <Dialog.Content forceMount onCloseAutoFocus={returnFocus} aria-describedby={undefined} className="fixed inset-0 z-[610] flex flex-col text-branco outline-none">
              <Dialog.Title className="sr-only">{UI.galerie[lang]}</Dialog.Title>
              <div className="flex items-center justify-between px-[var(--gutter)] py-4" style={{ paddingTop: "calc(var(--label-h) + 14px)" }}>
                <p className="font-display text-sm font-semibold tracking-[0.2em] text-suave">
                  {String(index! + 1).padStart(2, "0")} / {photos.length}
                </p>
                <Dialog.Close asChild>
                  <button type="button" aria-label={UI.close[lang]} className="grid h-12 w-12 place-items-center rounded-full bg-branco text-tinta">
                    <IconClose size={22} />
                  </button>
                </Dialog.Close>
              </div>
              <div
                className="relative flex flex-1 touch-pan-y items-center justify-center overflow-hidden px-[var(--gutter)]"
                onPointerDown={(e) => (start.current = e.clientX)}
                onPointerUp={(e) => {
                  if (start.current === null) return;
                  const dx = e.clientX - start.current;
                  start.current = null;
                  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                }}
              >
                <AnimatePresence mode="popLayout" initial={false} custom={dir.current}>
                  <motion.figure
                    key={p.id}
                    custom={dir.current}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir.current * 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir.current * -80 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex max-h-full flex-col items-center"
                  >
                    <img src={p.src} alt={p.alt[lang]} width={p.w} height={p.h} className="max-h-[72svh] w-auto max-w-full rounded-[18px] object-contain" draggable={false} />
                    <figcaption className="mt-4 max-w-[720px] text-center text-[15px] text-suave">{p.alt[lang]}</figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-3 pb-8 pt-2">
                <button type="button" onClick={() => go(-1)} aria-label={UI.prev[lang]} className="grid h-14 w-14 place-items-center rounded-full bg-branco/10 hover:bg-branco/20">
                  <IconArrowLeft size={22} />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={UI.next[lang]} className="grid h-14 w-14 place-items-center rounded-full bg-destaque text-tinta">
                  <IconArrow size={22} />
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
