// Section 9 (#galerie, night sheet): "Quelques images de la maison". On large screens a pinned horizontal
// track: scrolling down moves the photos sideways (drag works too), mixed sizes, one inside an arch, with a
// counter. On phones a swipe row that snaps to each photo. Tap opens a swipeable lightbox; "Voir en grille"
// shows a plain grid (the default with reduced motion).
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { copy } from "@/copy";
import { PHOTOS, photoSrc, photoSrcSet, type Photo } from "@/content/photos";
import { useSite } from "@/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn, EASE_OUT, pad2 } from "@/lib/utils";
import { SplitText } from "@/components/ui";

const SHAPES = ["h-[64svh] aspect-[3/4]", "h-[50svh] aspect-[3/4] self-end", "h-[42svh] aspect-[2/1] self-start", "h-[66svh] aspect-[3/4] arch", "h-[48svh] aspect-[4/3] self-end", "h-[60svh] aspect-[3/4]", "h-[46svh] aspect-[4/3] self-start"];

function useWide() {
  const [wide, setWide] = useState(() => matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

export function Gallery() {
  const { lang } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const wide = useWide();
  const [grid, setGrid] = useState(() => !!reduce);
  const [open, setOpen] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const pinned = wide && !grid && !reduce;

  return (
    <section id="galerie" className="tone-noite sheet tex-cork relative z-[3] -mt-[12vh] pt-[calc(12vh+clamp(56px,7vw,110px))]" aria-labelledby="gallery-title">
      <div className="container grid gap-6 pb-[clamp(32px,4vw,56px)] md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="grid gap-4">
          <p className="eyebrow text-dourado">{t.gallery.kicker}</p>
          <SplitText as="h2" id="gallery-title" text={t.gallery.title} className="display fs-xxl text-branco" />
          <p className="max-w-[48ch] text-branco/80">{t.gallery.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          {!grid && (
            <span className="eyebrow tnum text-azulejo-claro" aria-live="polite">
              {pad2(current + 1)} / {pad2(PHOTOS.length)}
            </span>
          )}
          <button type="button" className="btn btn--ghost btn--sm text-branco" aria-pressed={grid} onClick={() => setGrid((g) => !g)}>
            {grid ? t.ui.trackView : t.ui.gridView}
          </button>
        </div>
      </div>
      {grid ? <PhotoGrid onOpen={setOpen} /> : pinned ? <PinnedTrack onOpen={setOpen} onCurrent={setCurrent} /> : <SwipeRow onOpen={setOpen} onCurrent={setCurrent} />}
      <Lightbox index={open} onIndex={setOpen} />
      <div className="h-[clamp(64px,8vw,120px)]" />
    </section>
  );
}

function Card({ p, i, onOpen, className, sizes }: { p: Photo; i: number; onOpen: (i: number) => void; className?: string; sizes: string }) {
  const { lang } = useSite();
  const t = copy(lang);
  return (
    <button
      type="button"
      data-card={i}
      onClick={() => onOpen(i)}
      aria-label={`${p.alt[lang]} – ${t.ui.photoCount(i + 1, PHOTOS.length)}`}
      className={cn("group relative block flex-none cursor-zoom-in overflow-hidden rounded-[22px] p-0", className)}
      style={{ backgroundColor: p.tone }}
    >
      <img
        src={photoSrc(p.name)}
        srcSet={photoSrcSet(p)}
        sizes={sizes}
        width={p.w}
        height={p.h}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
      />
      <span className="eyebrow absolute left-4 top-4 rounded-full bg-noite/60 px-3 py-1.5 text-[12px] text-branco tnum">{pad2(i + 1)}</span>
    </button>
  );
}

function PinnedTrack({ onOpen, onCurrent }: { onOpen: (i: number) => void; onCurrent: (i: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  const measure = useCallback(() => {
    const tr = track.current;
    if (!tr) return;
    setTravel(Math.max(0, tr.scrollWidth - window.innerWidth));
  }, []);
  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => ro.disconnect();
  }, [measure]);

  useLayoutEffect(() => {
    if (!travel || !wrap.current) return;
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        x: -travel,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${travel}`,
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => onCurrent(Math.round(self.progress * (PHOTOS.length - 1))),
        },
      });
    }, wrap);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [travel, onCurrent]);

  // Drag sideways = scroll; arrow keys move between photos and bring them into view.
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const scrollToCard = (i: number) => {
    const w = wrap.current, card = track.current?.querySelector<HTMLElement>(`[data-card="${i}"]`);
    if (!w || !card) return;
    const top = w.getBoundingClientRect().top + window.scrollY;
    const x = card.offsetLeft - (window.innerWidth - card.offsetWidth) / 2;
    window.scrollTo({ top: top + Math.max(0, Math.min(travel, x)), behavior: "smooth" });
  };

  return (
    <div ref={wrap} className="relative" style={{ height: `calc(100svh + ${travel}px)` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          ref={track}
          className="flex cursor-grab items-center gap-[clamp(20px,2.6vw,40px)] px-[var(--gutter)] will-change-transform active:cursor-grabbing"
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") return;
            drag.current = { x: e.clientX, y: window.scrollY, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 4) d.moved = true;
            window.scrollTo({ top: d.y - dx * 1.2 });
          }}
          onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
          onPointerLeave={() => (drag.current = null)}
          onClickCapture={(e) => {
            if (drag.current?.moved) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          onKeyDown={(e) => {
            const i = Number((document.activeElement as HTMLElement)?.dataset.card);
            if (Number.isNaN(i)) return;
            const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
            if (next === null || next < 0 || next >= PHOTOS.length) return;
            e.preventDefault();
            track.current?.querySelector<HTMLElement>(`[data-card="${next}"]`)?.focus({ preventScroll: true });
            scrollToCard(next);
          }}
        >
          {PHOTOS.map((p, i) => (
            <div key={p.name} className="flex h-[72svh] flex-none" onFocus={() => scrollToCard(i)}>
              <Card p={p} i={i} onOpen={onOpen} className={SHAPES[i]} sizes="40vw" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SwipeRow({ onOpen, onCurrent }: { onOpen: (i: number) => void; onCurrent: (i: number) => void }) {
  const row = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={row}
      className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[var(--gutter)] pb-2 [scroll-padding-inline:var(--gutter)]"
      onScroll={(e) => {
        const el = e.currentTarget;
        const card = el.querySelector<HTMLElement>("[data-card]");
        if (card) onCurrent(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
      }}
    >
      {PHOTOS.map((p, i) => (
        <Card key={p.name} p={p} i={i} onOpen={onOpen} className={cn("h-[62svh] max-h-[560px] w-[78vw] max-w-[440px] snap-start", i === 3 && "arch")} sizes="80vw" />
      ))}
    </div>
  );
}

function PhotoGrid({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="container grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {PHOTOS.map((p, i) => (
        <Card key={p.name} p={p} i={i} onOpen={onOpen} className="aspect-[4/5] w-full" sizes="(max-width: 767px) 46vw, 24vw" />
      ))}
    </div>
  );
}

/** Full-screen photo: ← → or swipe to move, Esc to close; focus returns to the photo that opened it. */
function Lightbox({ index, onIndex }: { index: number | null; onIndex: (i: number | null) => void }) {
  const { lang } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [dir, setDir] = useState(1);
  const start = useRef<number | null>(null);
  const n = PHOTOS.length;
  const go = (d: number) => {
    if (index === null) return;
    setDir(d);
    onIndex((index + d + n) % n);
  };

  useEffect(() => {
    const d = dialog.current;
    if (index !== null && d && !d.open) {
      opener.current = document.activeElement as HTMLElement;
      d.showModal();
      document.documentElement.classList.add("has-dialog");
    }
    if (index === null && d?.open) {
      d.close();
      document.documentElement.classList.remove("has-dialog");
      opener.current?.focus();
    }
  }, [index]);

  const p = index !== null ? PHOTOS[index] : null;
  return (
    <dialog
      ref={dialog}
      aria-label={t.gallery.kicker}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-noite/95 p-0 text-branco backdrop:bg-noite/80"
      onCancel={(e) => {
        e.preventDefault();
        onIndex(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {p && index !== null && (
        <div
          className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-4 p-[var(--gutter)] pt-[calc(var(--label-h)+16px)]"
          onPointerDown={(e) => (start.current = e.clientX)}
          onPointerUp={(e) => {
            if (start.current === null) return;
            const dx = e.clientX - start.current;
            start.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow tnum text-azulejo-claro">{t.ui.photoCount(index + 1, n)}</span>
            <button type="button" autoFocus onClick={() => onIndex(null)} aria-label={t.map.close} className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-branco text-tinta">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="relative grid min-h-0 place-items-center overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img
                key={p.name}
                custom={dir}
                src={photoSrc(p.name)}
                srcSet={photoSrcSet(p)}
                sizes="92vw"
                alt={p.alt[lang]}
                draggable={false}
                className="max-h-full max-w-full rounded-[18px] object-contain"
                initial={reduce ? { opacity: 0 } : { x: `${dir * 30}%`, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { x: `${dir * -30}%`, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              />
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="max-w-[60ch] text-[15px] text-branco/85">{p.alt[lang]}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label={t.ui.prev} className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-white/10 text-branco hover:bg-white/20">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M15 5 8 12l7 7" />
                </svg>
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t.ui.next} className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-dourado text-tinta">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
