// Photos from the live site and the restaurant's catering: a strip you can drag or scroll (snap), filters, and a
// lightbox with arrow keys, swipe and Escape.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { resumeScroll, stopScroll } from "@/lib/scroll";
import { useFocusTrap } from "@/lib/focusTrap";
import { Img } from "../Img";
import { IconChevronLeft, IconChevronRight, IconClose } from "../icons";

type Cat = "restaurant" | "grill" | "catering";
const PHOTOS: { id: string; cat: Cat; w: 1 | 2 }[] = [
  { id: "restaurant", cat: "restaurant", w: 2 },
  { id: "spiess", cat: "grill", w: 2 },
  { id: "buffet", cat: "restaurant", w: 2 },
  { id: "schnitt_fleisch", cat: "grill", w: 1 },
  { id: "header-tische_2", cat: "restaurant", w: 2 },
  { id: "churrasco_grill", cat: "grill", w: 1 },
  { id: "salatplatte", cat: "restaurant", w: 1 },
  { id: "picanha_am_tisch", cat: "grill", w: 2 },
  { id: "picanha_roh_spiess", cat: "grill", w: 2 },
  { id: "catering-impressionen-9", cat: "catering", w: 1 },
  { id: "catering-impressionen-7", cat: "catering", w: 1 },
  { id: "catering-impressionen-2", cat: "catering", w: 1 },
  { id: "catering", cat: "catering", w: 2 },
  { id: "catering-impressionen-11", cat: "catering", w: 1 },
  { id: "catering-impressionen-5", cat: "catering", w: 1 },
  { id: "gaucho_grill_wissen", cat: "grill", w: 1 },
];

function Lightbox({ list, index, onClose, onIndex }: { list: string[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true);
  useEffect(() => {
    stopScroll();
    document.documentElement.style.overflow = "hidden";
    const last = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % list.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; resumeScroll(); last?.focus({ preventScroll: true }); };
  }, [index, list.length, onClose, onIndex]);
  const start = useRef(0);
  return (
    <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={fill(t.gallery.photo, { n: index + 1, total: list.length })}
      className="fixed inset-0 z-[890] flex flex-col bg-black/92 outline-none" style={{ top: "var(--label-h)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between p-4 text-creme">
        <span className="kicker tabular">{index + 1} / {list.length}</span>
        <button type="button" className="icon-btn" onClick={onClose} aria-label={t.a11y.close}><IconClose /></button>
      </div>
      <div className="relative flex-1" onPointerDown={(e) => (start.current = e.clientX)} onPointerUp={(e) => { const dx = e.clientX - start.current; if (Math.abs(dx) > 50) onIndex((index + (dx < 0 ? 1 : -1) + list.length) % list.length); }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={list[index]} className="absolute inset-0 p-4 md:p-10" initial={{ opacity: 0, transform: "scale(0.97)" }} animate={{ opacity: 1, transform: "scale(1)" }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
            <Img id={list[index]} fit="contain" sizes="100vw" className="h-full w-full" />
          </motion.div>
        </AnimatePresence>
        <button type="button" className="icon-btn absolute left-3 top-1/2 -translate-y-1/2" onClick={() => onIndex((index - 1 + list.length) % list.length)} aria-label={t.a11y.prev}><IconChevronLeft /></button>
        <button type="button" className="icon-btn absolute right-3 top-1/2 -translate-y-1/2" onClick={() => onIndex((index + 1) % list.length)} aria-label={t.a11y.next}><IconChevronRight /></button>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const { t } = useSite();
  const [cat, setCat] = useState<"all" | Cat>("all");
  const [open, setOpen] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const list = PHOTOS.filter((p) => cat === "all" || p.cat === cat);
  // drag to scroll with a mouse; touch keeps native scrolling
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false, sx = 0, sl = 0, moved = false;
    const d = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; el.style.scrollSnapType = "none"; };
    const m = (e: PointerEvent) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = sl - dx; };
    const u = () => { if (!down) return; down = false; el.style.scrollSnapType = ""; };
    const c = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    el.addEventListener("pointerdown", d); window.addEventListener("pointermove", m); window.addEventListener("pointerup", u); el.addEventListener("click", c, true);
    return () => { el.removeEventListener("pointerdown", d); window.removeEventListener("pointermove", m); window.removeEventListener("pointerup", u); el.removeEventListener("click", c, true); };
  }, []);
  return (
    <section id="galerie" data-anchor="galerie" className="skin-carvao overflow-hidden py-24 md:py-32" aria-labelledby="gallery-title">
      <div className="gutter">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker text-ouro" data-lang-stagger>{t.gallery.kicker}</p>
            <h2 id="gallery-title" className="display mt-3 text-[clamp(3rem,8vw,8rem)]">{t.gallery.title}</h2>
            <p className="mt-3 text-creme/75">{t.gallery.lead}</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.gallery.kicker}>
            {(["all", "restaurant", "grill", "catering"] as const).map((c) => (
              <button key={c} type="button" className="chip text-creme" aria-pressed={cat === c} onClick={() => { setCat(c); track.current?.scrollTo({ left: 0 }); }}>{t.gallery.filters[c]}</button>
            ))}
          </div>
        </div>
      </div>
      <div ref={track} className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 no-scrollbar" style={{ cursor: "grab", touchAction: "pan-x pan-y" }} aria-label={fill(t.gallery.count, { n: list.length })}>
        {list.map((p, i) => (
          <button key={p.id} type="button" onClick={() => setOpen(i)} aria-label={`${t.gallery.open}: ${fill(t.gallery.photo, { n: i + 1, total: list.length })}`}
            className={cn("group relative h-[min(60svh,520px)] shrink-0 snap-start overflow-hidden rounded-[28px]", p.w === 2 ? "w-[min(82vw,780px)]" : "w-[min(62vw,390px)]")}>
            <Img id={p.id} sizes="(min-width: 768px) 780px, 82vw" className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" />
          </button>
        ))}
        <span className="w-px shrink-0" aria-hidden="true" />
      </div>
      <p className="gutter mt-3 text-sm text-creme/70">{t.gallery.drag}</p>
      <AnimatePresence>{open !== null && <Lightbox list={list.map((p) => p.id)} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}</AnimatePresence>
    </section>
  );
}
