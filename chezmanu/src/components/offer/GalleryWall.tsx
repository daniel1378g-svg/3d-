import { useCallback, useEffect, useRef, useState } from "react";
import { TEXT, UI, fill } from "@/i18n";
import { CONTACT, WALL } from "@/content";
import { useSite } from "@/site";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";
import { FacebookGlyph, InstagramGlyph } from "../Glyphs";
import { Lightbox } from "./Lightbox";

const COLS = 6;
const ROWS = Math.ceil(WALL.length / COLS); // 18 photos: one 6 × 3 block, repeated in every direction
const GAP = 16;
const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * Every shop photo on an endless wall you can drag in any direction, with inertia. Arrow keys move from photo to
 * photo (the wall follows), Enter opens the lightbox. «Show as grid» (and reduced motion) gives a plain grid.
 */
export function GalleryWall() {
  const { lang } = useSite();
  const [grid, setGrid] = useState(prefersReducedMotion);
  const [open, setOpen] = useState<number | null>(null);
  const [cur, setCur] = useState(0);
  const [size, setSize] = useState({ w: 1200, h: 640, t: 280 });
  const view = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: null as number | null, ty: null as number | null });
  const drag = useRef<{ id: number; x: number; y: number; t: number; moved: boolean } | null>(null);
  const raf = useRef(0);

  const cell = size.t + GAP;
  const BW = COLS * cell, BH = ROWS * cell;
  const nx = Math.ceil(size.w / BW) + 1, ny = Math.ceil(size.h / BH) + 1;
  const colShift = (c: number) => (c % 2) * size.t * 0.45;

  const apply = useCallback(() => {
    const p = pos.current;
    if (layer.current) layer.current.style.transform = `translate3d(${(mod(p.x, BW) - BW).toFixed(1)}px, ${(mod(p.y, BH) - BH).toFixed(1)}px, 0)`;
  }, [BW, BH]);

  const tick = useCallback(() => {
    raf.current = 0;
    const p = pos.current;
    let moving = false;
    if (p.tx !== null && p.ty !== null) {
      p.x += (p.tx - p.x) * 0.16;
      p.y += (p.ty - p.y) * 0.16;
      if (Math.abs(p.tx - p.x) < 0.5 && Math.abs(p.ty - p.y) < 0.5) {
        p.x = p.tx;
        p.y = p.ty;
        p.tx = p.ty = null;
      } else moving = true;
    } else if (!drag.current && (Math.abs(p.vx) > 0.02 || Math.abs(p.vy) > 0.02)) {
      p.x += p.vx * 16;
      p.y += p.vy * 16;
      p.vx *= 0.94;
      p.vy *= 0.94;
      moving = true;
    }
    apply();
    if (moving) raf.current = requestAnimationFrame(tick);
  }, [apply]);
  const kick = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    if (grid || !view.current) return;
    const el = view.current;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight;
      setSize({ w, h, t: w < 640 ? 170 : w < 1024 ? 230 : 290 });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [grid]);
  useEffect(apply, [apply, size]);

  /** Glide so photo `i` sits in the middle, by the shortest way round the endless wall. */
  const focusCell = (i: number) => {
    const c = i % COLS, r = Math.floor(i / COLS);
    const cx = c * cell + size.t / 2, cy = r * cell + colShift(c) + size.t / 2;
    let tx = size.w / 2 - cx, ty = size.h / 2 - cy;
    const p = pos.current;
    tx += Math.round((p.x - tx) / BW) * BW;
    ty += Math.round((p.y - ty) / BH) * BH;
    p.tx = tx;
    p.ty = ty;
    p.vx = p.vy = 0;
    kick();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const c = cur % COLS, r = Math.floor(cur / COLS);
    let next = -1;
    if (e.key === "ArrowRight") next = r * COLS + mod(c + 1, COLS);
    else if (e.key === "ArrowLeft") next = r * COLS + mod(c - 1, COLS);
    else if (e.key === "ArrowDown") next = mod(r + 1, ROWS) * COLS + c;
    else if (e.key === "ArrowUp") next = mod(r - 1, ROWS) * COLS + c;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(cur);
      return;
    }
    if (next < 0) return;
    e.preventDefault();
    next = Math.min(next, WALL.length - 1);
    setCur(next);
    focusCell(next);
  };

  const down = (e: React.PointerEvent) => {
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
    pos.current.vx = pos.current.vy = 0;
    pos.current.tx = pos.current.ty = null;
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) > 6) {
      d.moved = true;
      view.current!.setPointerCapture(d.id);
    }
    if (!d.moved) return;
    const now = performance.now();
    const dt = Math.max(now - d.t, 1);
    const p = pos.current;
    p.x += dx;
    p.y += dy;
    p.vx = p.vx * 0.5 + (dx / dt) * 0.5;
    p.vy = p.vy * 0.5 + (dy / dt) * 0.5;
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
    apply();
  };
  const up = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-i]");
      if (tile) {
        const i = Number(tile.dataset.i);
        setCur(i);
        setOpen(i);
      }
      return;
    }
    if (performance.now() - d.t > 80) pos.current.vx = pos.current.vy = 0; // held still before letting go
    kick();
  };

  return (
    <section id="galerie" aria-labelledby="gallery-title" className="gutter bg-flour py-20 md:py-28">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">{TEXT.galleryKicker[lang]}</p>
            <h2 id="gallery-title" className="display mt-3 text-[clamp(2.1rem,4.4vw,3.6rem)] leading-tight text-cocoa">
              {TEXT.galleryTitle[lang]}
            </h2>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              {TEXT.galleryLead[lang]}
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-wheat decoration-2 underline-offset-4">
                <FacebookGlyph /> Facebook <span className="sr-only">{UI.newTab[lang]}</span>
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-wheat decoration-2 underline-offset-4">
                <InstagramGlyph /> Instagram <span className="sr-only">{UI.newTab[lang]}</span>
              </a>
            </p>
          </div>
          <button type="button" aria-pressed={grid} onClick={() => setGrid((g) => !g)} className="btn btn-ghost">
            {grid ? UI.asWall[lang] : UI.asGrid[lang]}
          </button>
        </Reveal>
      </div>

      {grid ? (
        <ul className="wrap mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {WALL.map((p, i) => (
            <li key={p.id}>
              <button type="button" onClick={() => setOpen(i)} className="block w-full overflow-hidden rounded-2xl" data-cursor="view">
                <Photo id={p.id} sizes="(min-width: 1024px) 300px, 45vw" className="aspect-square w-full transition-transform duration-500 hover:scale-[1.04]" />
                <span className="sr-only">{fill(UI.enlarge[lang], { alt: p.alt[lang] })}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10">
          <div
            ref={view}
            tabIndex={0}
            role="application"
            aria-roledescription={UI.galleryWall[lang]}
            aria-label={`${UI.galleryWall[lang]}. ${UI.galleryHint[lang]}`}
            onKeyDown={onKey}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={() => (drag.current = null)}
            data-cursor="drag"
            className="relative h-[min(78svh,760px)] min-h-[460px] cursor-grab touch-none select-none overflow-hidden bg-flour-deep active:cursor-grabbing focus-visible:outline-offset-[-6px]"
          >
            <div ref={layer} className="absolute left-0 top-0 will-change-transform">
              {Array.from({ length: ny }, (_, by) =>
                Array.from({ length: nx }, (_, bx) =>
                  WALL.map((p, i) => {
                    const c = i % COLS, r = Math.floor(i / COLS);
                    return (
                      <div
                        key={`${bx}-${by}-${p.id}`}
                        data-i={i}
                        aria-hidden="true"
                        className={cn("absolute overflow-hidden rounded-[22px] shadow-set transition-[box-shadow] duration-300", i === cur && "ring-4 ring-azulejo ring-offset-4 ring-offset-flour-deep")}
                        style={{ width: size.t, height: size.t, left: bx * BW + c * cell, top: by * BH + r * cell + colShift(c) }}
                      >
                        <Photo id={p.id} sizes={`${size.t}px`} decorative className="h-full w-full" />
                      </div>
                    );
                  }),
                ),
              )}
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_30px_var(--color-flour)]" />
          </div>
          <p className="wrap mt-3 text-sm text-espresso/75">{UI.galleryHint[lang]}</p>
          <p className="sr-only" aria-live="polite">
            {fill(UI.photoOf[lang], { n: cur + 1, total: WALL.length })}: {WALL[cur].alt[lang]}
          </p>
        </div>
      )}
      <Lightbox photos={WALL} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
