// The restaurant's photos as a loose, overlapping stack that straightens on hover; any photo opens full screen
// (arrow keys, Escape, focus kept inside, focus returned). Only photos published by the restaurant.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { alt } from "@/content/alts";
import { useFocusTrap } from "@/lib/focusTrap";
import { resumeScroll, stopScroll } from "@/lib/scroll";
import { EASE_OUT } from "@/lib/motion";
import { Img } from "../Img";
import { Reveal } from "../Reveal";
import { IconChevronLeft, IconChevronRight, IconClose } from "../icons";

const PHOTOS = [
  { id: "fachada", ratio: "aspect-[680/516]", rot: -3 },
  { id: "prato-picanha", ratio: "aspect-[16/9]", rot: 2 },
  { id: "grupo", ratio: "aspect-[760/1351]", rot: -2 },
  { id: "feijoada", ratio: "aspect-[760/956]", rot: 3 },
  { id: "banner-brasilianisch", ratio: "aspect-[3/2]", rot: -1.5 },
];

export function Gallery() {
  const { t, lang, reduce } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useFocusTrap(panel, open !== null);
  useEffect(() => {
    if (open === null) return;
    stopScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % PHOTOS.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length));
    };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("[data-close]")?.focus());
    return () => { window.removeEventListener("keydown", onKey); resumeScroll(); opener.current?.focus({ preventScroll: true }); };
  }, [open]);

  return (
    <section id="galerie" data-anchor="galerie" className="skin-creme2 overflow-hidden py-24 md:py-32" aria-labelledby="gallery-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker text-vinho-2" data-lang-stagger>{t.gallery.kicker}</p>
          <h2 id="gallery-title" className="display mt-3 text-[clamp(3.2rem,9vw,9rem)] text-vinho">{t.gallery.title}</h2>
          <p className="lead mt-4 text-tinta/80">{t.gallery.lead}</p>
          <ul className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {PHOTOS.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 60} className="mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }}
                  className="group block w-full rounded-[24px] bg-creme p-2.5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)] transition-transform duration-500 [transition-timing-function:var(--ease-out)] hover:rotate-0 hover:scale-[1.02]"
                  style={{ rotate: reduce ? "0deg" : `${p.rot}deg` }}
                  aria-label={fill(t.gallery.open, { name: alt(p.id, lang) })}
                >
                  <Img id={p.id} alt="" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className={`${p.ratio} w-full rounded-[18px]`} />
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.dialog}
            className="fixed inset-0 z-[880] flex flex-col bg-black/92 p-4 text-creme"
            style={{ top: "var(--label-h)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-creme/75 tabular" aria-live="polite">{fill(t.gallery.count, { n: open + 1, total: PHOTOS.length })}</p>
              <button type="button" data-close className="icon-btn" onClick={() => setOpen(null)} aria-label={t.a11y.close}><IconClose /></button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.figure key={open} initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE_OUT }} className="flex max-h-full flex-col items-center">
                  <Img id={PHOTOS[open].id} sizes="100vw" fit="contain" className="max-h-[78dvh] w-[min(1100px,92vw)]" imgClassName="max-h-[78dvh]" />
                  <figcaption className="mt-3 max-w-[60ch] text-center text-sm text-creme/80">{alt(PHOTOS[open].id, lang)}</figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 pb-[env(safe-area-inset-bottom)]">
              <button type="button" className="icon-btn" onClick={() => setOpen((open - 1 + PHOTOS.length) % PHOTOS.length)} aria-label={t.a11y.prev}><IconChevronLeft /></button>
              <button type="button" className="icon-btn" onClick={() => setOpen((open + 1) % PHOTOS.length)} aria-label={t.a11y.next}><IconChevronRight /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
