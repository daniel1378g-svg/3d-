import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { UI, fill } from "@/i18n";
import { PHOTO_IDS } from "@/copy";
import { photo, photoAlt, photoSize } from "@/content";
import { useSite } from "@/site";
import { prefersReducedMotion } from "@/lib/utils";
import { Heading } from "../Reveal";
import { ArrowLeft, ArrowRight, CloseIcon, GridIcon } from "../icons";

const COLS = 8;
const ROWS = 5;
const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Every photo of the restaurant on an endless wall you can throw around, or as a plain grid. */
export function Gallery() {
  const { lang } = useSite();
  const [grid, setGrid] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="galerie" aria-labelledby="gallery-title" className="on-light bg-linen-2 py-20 md:py-28">
      <div className="gutter">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <Heading id="gallery-title" eyebrow={fill(UI.photosCount[lang], { n: PHOTO_IDS.length })} title={UI.galleryTitle[lang]} />
          <button
            type="button"
            onClick={() => setGrid((g) => !g)}
            aria-pressed={grid}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-bordeaux px-5 text-sm font-bold text-bordeaux transition-colors hover:bg-bordeaux hover:text-linen"
          >
            <GridIcon />
            {grid ? UI.showWall[lang] : UI.showGrid[lang]}
          </button>
        </div>
      </div>
      <div className="mt-10">
        {grid ? (
          <div className="gutter">
            <PhotoGrid onOpen={setOpen} />
          </div>
        ) : (
          <Wall onOpen={setOpen} />
        )}
      </div>
      <Lightbox index={open} onChange={setOpen} />
    </section>
  );
}

function PhotoGrid({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useSite();
  return (
    <ul className="wrap grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {PHOTO_IDS.map((id, i) => {
        const [w, h] = photoSize(id);
        return (
          <li key={id}>
            <button type="button" onClick={() => onOpen(i)} data-cursor="view" className="group block w-full overflow-hidden rounded-2xl bg-linen">
              <img src={photo(id, true)} width={w} height={h} alt={photoAlt(id, lang)} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Wall({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const ox = useMotionValue(0);
  const oy = useMotionValue(0);
  const [cell, setCell] = useState({ w: 300, h: 236 });
  const drag = useRef<{ x: number; y: number; t: number; moved: number; vx: number; vy: number } | null>(null);
  const vel = useRef({ x: 0, y: 0 });
  const lastTouch = useRef(0);
  const suppressClick = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setCell(e.contentRect.width < 640 ? { w: 200, h: 164 } : { w: 300, h: 236 }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Inertia after a throw, and a slow drift while nobody touches the wall (on screen only).
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else cancelAnimationFrame(raf);
    });
    function tick(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!drag.current) {
        const v = vel.current;
        v.x *= Math.exp(-dt / 0.32);
        v.y *= Math.exp(-dt / 0.32);
        const idle = !prefersReducedMotion() && now - lastTouch.current > 2500;
        ox.set(ox.get() + v.x * dt - (idle ? 14 * dt : 0));
        oy.set(oy.get() + v.y * dt - (idle ? 5 * dt : 0));
      }
      if (visible) raf = requestAnimationFrame(tick);
    }
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ox, oy]);

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0, vx: 0, vy: 0 };
    vel.current = { x: 0, y: 0 };
    lastTouch.current = performance.now();
    suppressClick.current = false;
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    d.moved += Math.abs(dx) + Math.abs(dy);
    if (d.moved > 6 && !e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.setPointerCapture(e.pointerId);
    const dt = Math.max(0.008, (now - d.t) / 1000);
    d.vx = d.vx * 0.6 + (dx / dt) * 0.4;
    d.vy = d.vy * 0.6 + (dy / dt) * 0.4;
    ox.set(ox.get() + dx);
    oy.set(oy.get() + dy);
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
    lastTouch.current = now;
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.moved > 6) suppressClick.current = true;
    if (!reduce) vel.current = { x: Math.max(-2500, Math.min(2500, d.vx)), y: Math.max(-2500, Math.min(2500, d.vy)) };
  };
  const pan = (dx: number, dy: number) => {
    lastTouch.current = performance.now();
    vel.current = reduce ? { x: 0, y: 0 } : { x: dx * 3.2, y: dy * 3.2 };
    if (reduce) {
      ox.set(ox.get() + dx);
      oy.set(oy.get() + dy);
    }
  };
  /** Brings a focused tile to the middle of the wall. */
  const centre = (tile: HTMLElement) => {
    const wall = box.current!.getBoundingClientRect();
    const r = tile.getBoundingClientRect();
    lastTouch.current = performance.now();
    vel.current = { x: 0, y: 0 };
    ox.set(ox.get() + (wall.left + wall.width / 2 - (r.left + r.width / 2)));
    oy.set(oy.get() + (wall.top + wall.height / 2 - (r.top + r.height / 2)));
  };

  const hintId = "wall-hint";
  return (
    <div>
      <div className="gutter">
        <p id={hintId} className="wrap mb-4 text-sm font-semibold text-ink-soft">
          {UI.galleryHint[lang]}
        </p>
      </div>
      <div
        ref={box}
        role="region"
        aria-label={UI.wallLabel[lang]}
        aria-describedby={hintId}
        tabIndex={0}
        data-cursor="drag"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={(e) => {
          const k: Record<string, [number, number]> = { ArrowLeft: [160, 0], ArrowRight: [-160, 0], ArrowUp: [0, 140], ArrowDown: [0, -140] };
          if (e.target === e.currentTarget && k[e.key]) {
            e.preventDefault();
            pan(...k[e.key]);
          }
        }}
        className="relative h-[clamp(420px,68svh,700px)] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <Tile
            key={i}
            i={i}
            cell={cell}
            ox={ox}
            oy={oy}
            onOpen={(n) => !suppressClick.current && onOpen(n)}
            onFocusTile={centre}
          />
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-linen-2 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-linen-2 to-transparent" />
      </div>
    </div>
  );
}

function Tile({ i, cell, ox, oy, onOpen, onFocusTile }: { i: number; cell: { w: number; h: number }; ox: MotionValue<number>; oy: MotionValue<number>; onOpen: (n: number) => void; onFocusTile: (el: HTMLElement) => void }) {
  const { lang } = useSite();
  const n = i % PHOTO_IDS.length;
  const id = PHOTO_IDS[n];
  const copy = i >= PHOTO_IDS.length; // repeats fill the wall; only the first of each is focusable
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const W = COLS * cell.w;
  const H = ROWS * cell.h;
  const stagger = col % 2 ? cell.h * 0.45 : 0;
  const x = useTransform(ox, (v) => wrap(-cell.w, W - cell.w, col * cell.w + v));
  const y = useTransform(oy, (v) => wrap(-cell.h, H - cell.h, row * cell.h + stagger + v));
  const [w, h] = photoSize(id);
  return (
    <motion.button
      type="button"
      tabIndex={copy ? -1 : 0}
      aria-hidden={copy || undefined}
      data-cursor="view"
      onClick={() => onOpen(n)}
      onFocus={(e) => onFocusTile(e.currentTarget)}
      className="group absolute left-0 top-0 overflow-hidden rounded-2xl bg-linen shadow-[0_20px_40px_-28px_rgba(27,20,20,0.7)]"
      style={{ x, y, width: cell.w - 16, height: cell.h - 16 }}
    >
      <img
        src={photo(id, true)}
        width={w}
        height={h}
        alt={copy ? "" : photoAlt(id, lang)}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="pointer-events-none h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.07]"
      />
    </motion.button>
  );
}

function Lightbox({ index, onChange }: { index: number | null; onChange: (i: number | null) => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const swipe = useRef<number | null>(null);
  const total = PHOTO_IDS.length;
  const isOpen = index !== null;
  const step = (d: number) => index !== null && onChange((index + d + total) % total);

  useEffect(() => {
    if (!isOpen) return;
    opener.current = document.activeElement;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus());
    return () => {
      html.style.overflow = prev;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && panel.current) {
        const f = [...panel.current.querySelectorAll<HTMLElement>("button")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const id = index !== null ? PHOTO_IDS[index] : null;
  return (
    <AnimatePresence>
      {id && index !== null && (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={UI.galleryTitle[lang]}
          className="on-dark fixed inset-0 z-[320] flex flex-col bg-charcoal/95 text-linen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="flex items-center gap-3 px-4 py-3 md:px-6">
            <p className="text-sm font-semibold tabular-nums text-linen/85" aria-live="polite">
              {fill(UI.photoOf[lang], { n: index + 1, total })}
            </p>
            <button type="button" data-autofocus onClick={() => onChange(null)} className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-linen/30 hover:border-linen">
              <CloseIcon />
              <span className="sr-only">{UI.close[lang]}</span>
            </button>
          </div>
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20"
            onPointerDown={(e) => (swipe.current = e.clientX)}
            onPointerUp={(e) => {
              if (swipe.current === null) return;
              const dx = e.clientX - swipe.current;
              swipe.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
            onClick={(e) => e.target === e.currentTarget && onChange(null)}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.figure
                key={id}
                className="flex max-h-full flex-col items-center"
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.96)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={photo(id)} alt={photoAlt(id, lang)} className="max-h-[calc(100svh-180px)] w-auto max-w-full rounded-xl object-contain" />
                <figcaption className="mt-3 max-w-[60ch] text-center text-[15px] text-linen/90">{photoAlt(id, lang)}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-charcoal/70 ring-1 ring-linen/30 hover:ring-linen md:left-6" aria-label={UI.prevPhoto[lang]}>
              <ArrowLeft />
            </button>
            <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-charcoal/70 ring-1 ring-linen/30 hover:ring-linen md:right-6" aria-label={UI.nextPhoto[lang]}>
              <ArrowRight />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

