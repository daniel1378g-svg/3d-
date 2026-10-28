import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { UI, fill } from "@/i18n";
import { PHOTOS } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";

const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * A sliding gallery of all 27 photos: swipe on touch, drag with the mouse, or use the arrows. Each photo
 * snaps into place with the next one peeking in; a tap opens it full screen.
 */
export function Gallery() {
  const { lang } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section aria-labelledby="gallery-title" className="charcoal on-dark py-24 md:py-32">
      <div className="gutter">
        <Reveal className="wrap">
          <h2 id="gallery-title" className="display text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-none">{UI.gallery[lang]}</h2>
        </Reveal>
      </div>
      <Slider onOpen={setOpen} />
      <Lightbox index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}

function Slider({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const drag = useRef({ on: false, x: 0, left: 0, moved: 0, id: 0 });

  // Which photo sits at the start of the track (the counter follows swipes, drags and arrows alike).
  useEffect(() => {
    const el = track.current!;
    const onScroll = () => {
      const items = [...el.children] as HTMLElement[];
      const start = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
      let best = 0;
      let bestD = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.getBoundingClientRect().left - start);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = track.current!;
    const item = el.children[Math.max(0, Math.min(PHOTOS.length - 1, i))] as HTMLElement;
    el.scrollTo({ left: item.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: reduce ? "auto" : "smooth" });
  };

  // Mouse drag; touch keeps the browser's own swipe with snapping.
  const down = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = track.current!;
    drag.current = { on: true, x: e.clientX, left: el.scrollLeft, moved: 0, id: e.pointerId };
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = e.clientX - d.x;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 6) track.current!.setPointerCapture?.(d.id);
    track.current!.scrollLeft = d.left - dx;
  };
  const up = () => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    const el = track.current!;
    el.style.scrollSnapType = "";
    el.style.scrollBehavior = "";
    // Settle on the nearest photo, a step further in the drag's direction when it was a flick.
    const dx = el.scrollLeft - d.left;
    goTo(index + (Math.abs(dx) > 40 && Math.abs(dx) < 260 ? Math.sign(dx) : 0));
  };

  const arrow = "grid h-12 w-12 place-items-center rounded-full bg-linen text-charcoal shadow-lift transition-opacity hover:bg-white disabled:opacity-35";
  return (
    <div className="mt-10">
      <ul
        ref={track}
        aria-label={UI.galleryLabel[lang]}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
          }
        }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onPointerLeave={up}
        data-cursor="drag"
        className="gallery-track no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 outline-offset-4 md:gap-6"
      >
        {PHOTOS.map((p, i) => (
          <li key={p.id} className="w-[82%] shrink-0 snap-start sm:w-[58%] lg:w-[40%]">
            <button
              type="button"
              onClick={(e) => {
                if (drag.current.moved > 6) return e.preventDefault();
                onOpen(i);
              }}
              data-cursor="view"
              className="group relative block w-full overflow-hidden rounded-[22px] text-left"
            >
              <span className="sr-only">{UI.galleryOpen[lang]}: </span>
              <Photo id={p.id} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 520px, (min-width: 640px) 58vw, 82vw" />
            </button>
            <p aria-hidden="true" className="mt-3 line-clamp-2 text-[15px] text-linen/75">{p.alt[lang]}</p>
          </li>
        ))}
      </ul>
      <div className="gutter mt-6">
        <div className="wrap flex items-center justify-between gap-4">
          <p className="text-sm font-semibold tabular-nums text-linen/80" aria-live="polite">
            <span className="sr-only">{fill(UI.photoOf[lang], { n: index + 1, total: PHOTOS.length })}</span>
            <span aria-hidden="true">{index + 1} / {PHOTOS.length}</span>
          </p>
          <div className="flex gap-3">
            <button type="button" className={arrow} onClick={() => goTo(index - 1)} disabled={index === 0} aria-label={UI.prevPhoto[lang]}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <button type="button" className={arrow} onClick={() => goTo(index + 1)} disabled={index === PHOTOS.length - 1} aria-label={UI.nextPhoto[lang]}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div className="gutter mt-4" aria-hidden="true">
        <div className="wrap h-1 overflow-hidden rounded-full bg-linen/15">
          <div className={cn("h-full rounded-full bg-leaf-light", !reduce && "transition-[width] duration-500 ease-out")} style={{ width: `${((index + 1) / PHOTOS.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

function Lightbox({ index, onClose, onIndex }: { index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState(0);
  const go = useCallback((d: number) => {
    if (index === null) return;
    setDir(d);
    onIndex(mod(index + d, PHOTOS.length));
  }, [index, onIndex]);
  const isOpen = index !== null;
  // Focus moves into the lightbox when it opens and back to the tile or button when it closes.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("button")?.focus());
    return () => opener?.focus?.();
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, go, onClose]);

  const p = index !== null ? PHOTOS[index] : null;
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
  };
  return (
    <AnimatePresence>
      {p && index !== null && (
        <motion.div ref={panel} role="dialog" aria-modal="true" aria-label={UI.gallery[lang]} className="fixed inset-0 z-[375] flex flex-col bg-charcoal/96 text-linen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="gutter flex items-center justify-between gap-4 py-4" style={{ paddingTop: "calc(var(--label-h) + 16px)" }}>
            <p className="text-sm font-semibold text-linen/80" aria-live="polite">{fill(UI.photoOf[lang], { n: index + 1, total: PHOTOS.length })}</p>
            <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-linen text-charcoal" aria-label={UI.close[lang]}>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.figure
                key={p.id}
                custom={dir}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 pb-6"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -80 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={onDragEnd}
              >
                <Photo id={p.id} className="max-h-[72svh] w-auto max-w-full rounded-2xl" style={{ aspectRatio: `${p.w} / ${p.h}`, height: "min(72svh, 100%)" }} sizes="(min-width: 1024px) 1100px, 100vw" />
                <figcaption className="max-w-[60ch] text-center text-[15px] text-linen/85">{p.alt[lang]}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} aria-label={UI.prevPhoto[lang]} className={cn("absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-linen/15 text-linen ring-1 ring-linen/25 backdrop-blur hover:bg-linen/25")}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <button type="button" onClick={() => go(1)} aria-label={UI.nextPhoto[lang]} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-linen/15 text-linen ring-1 ring-linen/25 backdrop-blur hover:bg-linen/25">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
