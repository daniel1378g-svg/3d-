import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "motion/react";
import { UI, fill } from "@/i18n";
import { PHOTOS } from "@/content";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";

const mod = (a: number, n: number) => ((a % n) + n) % n;
const hash = (x: number, y: number) => {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
};

/**
 * An endless wall of glazed azulejo tiles. Drag it in any direction (it glides on with inertia); a tile
 * flips on its edge to show one of the 27 photos (hover, focus or tap); a click opens the lightbox.
 * Keyboard: arrows move the wall a tile, Enter opens the tile in the middle. "Als Raster" lists them all.
 */
export function Gallery() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [grid, setGrid] = useState(() => Boolean(reduce));
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section aria-labelledby="gallery-title" className="charcoal on-dark gutter py-24 md:py-32">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="gallery-title" className="display text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-none">{UI.gallery[lang]}</h2>
            {!grid && <p className="mt-3 text-linen/75">{UI.galleryHint[lang]}</p>}
          </div>
          <button type="button" aria-pressed={grid} onClick={() => setGrid((g) => !g)} className="btn btn-ghost">
            {grid ? UI.asWall[lang] : UI.asGrid[lang]}
          </button>
        </Reveal>
        <div className="mt-10">{grid ? <PhotoGrid onOpen={setOpen} /> : <TileWall onOpen={setOpen} />}</div>
      </div>
      <Lightbox index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}

function PhotoGrid({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useSite();
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {PHOTOS.map((p, i) => (
        <li key={p.id}>
          <button type="button" onClick={() => onOpen(i)} className="block w-full overflow-hidden rounded-xl ring-1 ring-linen/10" aria-label={`${UI.open[lang]}: ${p.alt[lang]}`}>
            <Photo id={p.id} className="aspect-square w-full" sizes="(min-width: 1024px) 240px, 45vw" decorative />
          </button>
        </li>
      ))}
    </ul>
  );
}

function TileWall({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useSite();
  const box = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const ox = useMotionValue(0);
  const oy = useMotionValue(0);
  const [dims, setDims] = useState({ cols: 10, rows: 5, size: 170 });
  const [flipped, setFlipped] = useState<string | null>(null);
  const [cells, setCells] = useState<{ key: string; vc: number; vr: number }[]>([]);
  const moved = useRef(0);

  useEffect(() => {
    const measure = () => {
      const r = box.current!.getBoundingClientRect();
      const size = r.width < 640 ? 128 : 172;
      setDims({ cols: Math.ceil(r.width / size) + 2, rows: Math.ceil(r.height / size) + 2, size });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box.current!);
    return () => ro.disconnect();
  }, []);

  // Place every tile from the wall's offset, wrapping round; tiles that wrap take a new photo and pattern.
  const layout = useCallback(() => {
    const { cols, rows, size } = dims;
    const W = cols * size;
    const H = rows * size;
    const x = ox.get();
    const y = oy.get();
    const next: { key: string; vc: number; vr: number }[] = [];
    let changed = false;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const px = mod(c * size + x, W) - size;
        const py = mod(r * size + y, H) - size;
        const vc = Math.round((px - x) / size);
        const vr = Math.round((py - y) / size);
        const el = tiles.current[i];
        if (el) el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
        next.push({ key: `${vc}:${vr}`, vc, vr });
        if (!cells[i] || cells[i].key !== `${vc}:${vr}`) changed = true;
      }
    if (changed) setCells(next);
  }, [dims, ox, oy, cells]);
  useEffect(() => {
    layout();
    const a = ox.on("change", layout);
    const b = oy.on("change", layout);
    return () => {
      a();
      b();
    };
  }, [layout, ox, oy]);

  const photoAt = (vc: number, vr: number) => hash(vc + 1000, vr + 1000) % PHOTOS.length;
  const patternAt = (vc: number, vr: number) => hash(vr + 77, vc + 31) % 16;

  // Drag with inertia.
  const drag = useRef({ on: false, x: 0, y: 0, t: 0, vx: 0, vy: 0 });
  const down = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen" && e.pointerType !== "touch") return;
    drag.current = { on: true, x: e.clientX, y: e.clientY, t: performance.now(), vx: 0, vy: 0 };
    moved.current = 0;
    ox.stop();
    oy.stop();
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    const r = box.current!.getBoundingClientRect();
    box.current!.style.setProperty("--gx", `${e.clientX - r.left}px`);
    box.current!.style.setProperty("--gy", `${e.clientY - r.top}px`);
    if (!d.on) return;
    const now = performance.now();
    const dx = e.clientX - d.x;
    const dy = e.pointerType === "touch" ? 0 : e.clientY - d.y; // on touch, vertical drags scroll the page
    const dt = Math.max(1, now - d.t);
    d.vx = d.vx * 0.5 + (dx / dt) * 1000 * 0.5;
    d.vy = d.vy * 0.5 + (dy / dt) * 1000 * 0.5;
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
    moved.current += Math.abs(dx) + Math.abs(dy);
    if (moved.current > 6) (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    ox.set(ox.get() + dx);
    oy.set(oy.get() + dy);
  };
  const up = () => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    if (moved.current > 6) {
      animate(ox, ox.get(), { type: "inertia", velocity: d.vx, power: 0.35, timeConstant: 420 });
      animate(oy, oy.get(), { type: "inertia", velocity: d.vy, power: 0.35, timeConstant: 420 });
    }
  };
  const key = (e: React.KeyboardEvent) => {
    const s = dims.size;
    const step: Record<string, [number, number]> = { ArrowLeft: [s, 0], ArrowRight: [-s, 0], ArrowUp: [0, s], ArrowDown: [0, -s] };
    if (step[e.key]) {
      e.preventDefault();
      animate(ox, ox.get() + step[e.key][0], { type: "spring", stiffness: 260, damping: 30 });
      animate(oy, oy.get() + step[e.key][1], { type: "spring", stiffness: 260, damping: 30 });
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const r = box.current!.getBoundingClientRect();
      const vc = Math.floor((r.width / 2 - ox.get()) / s);
      const vr = Math.floor((r.height / 2 - oy.get()) / s);
      onOpen(photoAt(vc, vr));
    }
  };

  return (
    <div
      ref={box}
      tabIndex={0}
      role="group"
      aria-label={`${UI.gallery[lang]}. ${UI.galleryHint[lang]}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onKeyDown={key}
      data-cursor="drag"
      className="relative h-[clamp(420px,68vh,700px)] touch-pan-y select-none overflow-hidden rounded-[28px] bg-[#cfd6e0] ring-1 ring-linen/10"
      style={{ perspective: 1200 }}
    >
      {Array.from({ length: dims.cols * dims.rows }, (_, i) => {
        const cell = cells[i];
        const vc = cell?.vc ?? 0;
        const vr = cell?.vr ?? 0;
        const pi = photoAt(vc, vr);
        const id = cell?.key ?? String(i);
        const isFlipped = flipped === id;
        return (
          <div
            key={i}
            ref={(el) => {
              tiles.current[i] = el;
            }}
            className="absolute left-0 top-0 p-[5px]"
            style={{ width: dims.size, height: dims.size }}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label={`${UI.open[lang]}: ${PHOTOS[pi].alt[lang]}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(id)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped((f) => (f === id ? null : f))}
              onClick={(e) => {
                if (moved.current > 6) return e.preventDefault();
                if ((e.nativeEvent as PointerEvent).pointerType === "touch" && !isFlipped) return setFlipped(id);
                onOpen(pi);
              }}
              className="tile block h-full w-full rounded-[6px] shadow-[0_2px_0_rgb(120_130_150),0_8px_14px_-6px_rgb(20_30_50/0.5)] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1.15)]"
              style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              <span className="tile-face" style={{ backgroundImage: `url(${asset(`images/tiles/tile-${patternAt(vc, vr)}.svg`)})`, backgroundSize: "cover" }}>
                <span className="tile-glaze" />
              </span>
              <span className="tile-face back">
                {isFlipped ? <Photo id={PHOTOS[pi].id} className="h-full w-full" sizes="180px" decorative label={false} /> : <span className="block h-full w-full" style={{ backgroundImage: `url(${PHOTOS[pi].lqip})`, backgroundSize: "cover" }} />}
              </span>
            </button>
          </div>
        );
      })}
      {/* The glaze: one soft highlight that follows the pointer across all the tiles. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: "radial-gradient(260px circle at var(--gx, 60%) var(--gy, 30%), rgb(255 255 255 / 0.75), transparent 70%)" }} />
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
