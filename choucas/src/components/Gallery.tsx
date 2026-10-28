import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI, fill } from "@/i18n";
import { GALLERIES } from "@/copy";
import { photoAlt, photoSize } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Heading } from "./Reveal";
import { SmartImage, type Reveal } from "./SmartImage";
import { ArrowLeft, ArrowRight, CloseIcon, GridIcon } from "./icons";

const TOTAL = GALLERIES.reduce((n, g) => n + g.photos.length, 0);

/** A link elsewhere can ask the home gallery to open on one of its tabs (e.g. "Bilder vom Oasis Steakhouse"). */
let requested: string | null = null;
export const openGalleryOn = (id: string) => (requested = id);

/** The nine live galleries: tabs, a swipeable carousel per gallery (or a plain grid) and a lightbox. */
export function Gallery({ initial = "pizzeria", tone = "dark" }: { initial?: string; tone?: "dark" | "light" }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [cat, setCat] = useState(() => {
    const r = requested;
    requested = null;
    return r ?? initial;
  });
  const [grid, setGrid] = useState(() => !!reduce);
  const [open, setOpen] = useState<number | null>(null);
  const gallery = GALLERIES.find((g) => g.id === cat) ?? GALLERIES[0];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const dark = tone === "dark";

  const onTabKey = (e: ReactKeyboardEvent, i: number) => {
    const n = GALLERIES.length;
    const to = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    setCat(GALLERIES[to].id);
    tabs.current[to]?.focus();
  };

  return (
    <section id="bilder" aria-labelledby="gallery-title" className={cn("py-20 md:py-28", dark ? "on-dark tex-hex bg-ink text-snow" : "on-light bg-snow-2")}>
      <div className="gutter">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[60ch]">
            <Heading id="gallery-title" eyebrow={fill(UI.photos[lang], { n: TOTAL })} title={UI.galleryTitle[lang]} tone={tone} dot="bg-beak" />
            <p className={cn("mt-4", dark ? "text-snow/80" : "text-muted")}>{UI.galleryLead[lang]}</p>
          </div>
          <button
            type="button"
            onClick={() => setGrid((g) => !g)}
            aria-pressed={grid}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-5 text-sm font-bold transition-colors",
              dark ? "border-snow/40 hover:border-snow" : "border-ink/30 hover:border-ink",
            )}
          >
            <GridIcon />
            {grid ? UI.showCarousel[lang] : UI.showGrid[lang]}
          </button>
        </div>
        <div className="wrap mt-8">
          <div role="tablist" aria-label={UI.galleryCategories[lang]} className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 pb-1">
            {GALLERIES.map((g, i) => {
              const active = g.id === cat;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`gtab-${g.id}`}
                  aria-selected={active}
                  aria-controls="gallery-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setCat(g.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cn("relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-colors", active ? (dark ? "text-ink" : "text-snow") : dark ? "text-snow/80 hover:text-snow" : "text-ink/75 hover:text-ink")}
                >
                  {active && <motion.span layoutId="gallery-tab" className={cn("absolute inset-0 rounded-full", dark ? "bg-beak" : "bg-ink")} transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.45 }} />}
                  <span className="relative">{g.title[lang]}</span>
                  <span className={cn("relative text-xs tabular-nums", active ? "opacity-70" : "opacity-55")}>{g.photos.length}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div id="gallery-panel" role="tabpanel" aria-labelledby={`gtab-${gallery.id}`} className="mt-8">
        {gallery.photos.length === 0 ? (
          <div className="gutter">
            <p className={cn("wrap rounded-3xl p-8 text-lg", dark ? "bg-snow/8" : "bg-white")}>{gallery.note?.[lang]}</p>
          </div>
        ) : grid ? (
          <div className="gutter">
            <ul className="wrap grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.photos.map((id, i) => (
                <li key={id}>
                  <Thumb id={id} onOpen={() => setOpen(i)} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 25vw, 50vw" reveal={i % 2 ? "right" : "left"} delay={Math.min(i * 0.05, 0.4)} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Carousel key={gallery.id} ids={gallery.photos} onOpen={setOpen} dark={dark} />
        )}
      </div>
      <Lightbox ids={gallery.photos} index={open} onChange={setOpen} />
    </section>
  );
}

function Thumb({ id, onOpen, className, sizes, reveal = "left", delay = 0, style, index }: { id: string; onOpen: () => void; className?: string; sizes: string; reveal?: Reveal; delay?: number; style?: React.CSSProperties; index?: number }) {
  return (
    <button type="button" data-index={index} onClick={onOpen} className={cn("group relative block overflow-hidden rounded-2xl bg-ink-2 text-left", className)} style={style}>
      <SmartImage id={id} fill sizes={sizes} reveal={reveal} delay={delay} imgClassName="transition-[scale] duration-700 ease-out-expo group-hover:scale-[1.04]" />
    </button>
  );
}

/**
 * Native horizontal scrolling (swipe on touch); with a mouse, drag with inertia and a rubber band at the
 * ends. The photo nearest the middle is the active one; the others dim a little. ← → move between photos.
 */
function Carousel({ ids, onOpen, dark }: { ids: string[]; onOpen: (i: number) => void; dark: boolean }) {
  const { lang } = useSite();
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean; v: number; lastX: number; lastT: number } | null>(null);
  const glide = useRef(0);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0,
      dist = Infinity;
    el.querySelectorAll<HTMLElement>("li").forEach((li, i) => {
      const r = li.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < dist) ((dist = d), (best = i));
    });
    setActive(best);
  };
  useEffect(update, [ids]);
  useEffect(() => () => cancelAnimationFrame(glide.current), []);
  const go = (i: number) => {
    const el = track.current;
    const li = el?.querySelectorAll<HTMLElement>("li")[i];
    if (!el || !li) return;
    li.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
    el.scrollTo({ left: li.offsetLeft - (el.clientWidth - li.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  };
  const max = () => (track.current ? track.current.scrollWidth - track.current.clientWidth : 0);
  const band = (px: number) => {
    if (track.current) track.current.style.transform = px ? `translateX(${px}px)` : "";
  };

  return (
    <div className="relative">
      <ul
        ref={track}
        onScroll={update}
        aria-roledescription="carousel"
        aria-label={UI.galleryTitle[lang]}
        style={{ scrollPaddingInline: "max(16px, calc((100vw - 1280px) / 2))" }}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(16px,calc((100vw-1280px)/2))] pb-2 transition-transform duration-500 ease-out-expo md:px-[max(32px,calc((100vw-1280px)/2))]"
        onKeyDown={(e) => {
          const n = ids.length;
          const focused = Number((document.activeElement as HTMLElement | null)?.dataset.index ?? active);
          const from = Number.isFinite(focused) ? focused : active;
          const to = e.key === "ArrowRight" ? Math.min(n - 1, from + 1) : e.key === "ArrowLeft" ? Math.max(0, from - 1) : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
          if (to < 0) return;
          e.preventDefault();
          setActive(to);
          go(to);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          cancelAnimationFrame(glide.current);
          track.current.style.transitionDuration = "0ms";
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false, v: 0, lastX: e.clientX, lastT: performance.now() };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          const el = track.current;
          if (!d || !el) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) d.moved = true;
          if (!d.moved) return;
          el.style.scrollSnapType = "none";
          const now = performance.now();
          d.v = ((d.lastX - e.clientX) / Math.max(1, now - d.lastT)) * 16;
          d.lastX = e.clientX;
          d.lastT = now;
          const want = d.left - dx;
          el.scrollLeft = want;
          // rubber band past either end
          band(want < 0 ? -want * 0.35 : want > max() ? -(want - max()) * 0.35 : 0);
        }}
        onPointerUp={() => {
          const d = drag.current;
          const el = track.current;
          if (!d || !el) return;
          el.style.transitionDuration = "";
          band(0);
          let v = reduce ? 0 : d.v;
          const step = () => {
            if (Math.abs(v) < 0.5) {
              el.style.scrollSnapType = "";
              return;
            }
            el.scrollLeft += v;
            v *= 0.94;
            glide.current = requestAnimationFrame(step);
          };
          step();
          setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => {
          if (!drag.current || !track.current) return;
          track.current.style.transitionDuration = "";
          track.current.style.scrollSnapType = "";
          band(0);
          drag.current = null;
        }}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {ids.map((id, i) => {
          const [w, h] = photoSize(id);
          const on = i === active;
          return (
            <li key={id} className={cn("shrink-0 snap-start transition-[opacity,scale] duration-500 ease-out-expo", on ? "opacity-100" : "scale-[0.95] opacity-60")}>
              <figure>
                <Thumb id={id} index={i} onOpen={() => onOpen(i)} sizes="(min-width: 768px) 560px, 82vw" reveal="left" delay={Math.min(i, 5) * 0.07} className="h-[260px] max-w-[82vw] md:h-[380px]" style={{ aspectRatio: `${w} / ${h}` }} />
                <figcaption className={cn("mt-2 max-w-[min(82vw,440px)] text-sm", dark ? "text-snow/75" : "text-muted")}>{photoAlt(id, lang)}</figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
      <div className="gutter mt-4">
        <div className="wrap flex gap-2">
          <button type="button" onClick={() => go(Math.max(0, active - 1))} disabled={edge.start} aria-label={UI.prevPhoto[lang]} className={cn("grid size-12 place-items-center rounded-full border transition-opacity disabled:opacity-30", dark ? "border-snow/35 hover:border-snow" : "border-ink/25 hover:border-ink")}>
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => go(Math.min(ids.length - 1, active + 1))} disabled={edge.end} aria-label={UI.nextPhoto[lang]} className={cn("grid size-12 place-items-center rounded-full border transition-opacity disabled:opacity-30", dark ? "border-snow/35 hover:border-snow" : "border-ink/25 hover:border-ink")}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Full-screen photo: slides in the direction of travel, follows a swipe and springs back if it is too short. */
function Lightbox({ ids, index, onChange }: { ids: string[]; index: number | null; onChange: (i: number | null) => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const [dir, setDir] = useState(1);
  const total = ids.length;
  const isOpen = index !== null;
  const step = (d: number) => {
    if (index === null) return;
    setDir(d);
    onChange((index + d + total) % total);
  };

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
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const id = index !== null ? ids[index] : null;
  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: `${d * 18}%` }),
    center: { opacity: 1, x: "0%" },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: `${d * -18}%` }),
  };
  return (
    <AnimatePresence>
      {id && index !== null && (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={UI.galleryTitle[lang]}
          className="on-dark fixed inset-0 z-[320] flex flex-col bg-ink/95 text-snow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ paddingTop: "calc(var(--label-h) + env(safe-area-inset-top, 0px))", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="flex items-center gap-3 px-4 py-3 md:px-6">
            <p className="text-sm font-semibold tabular-nums text-snow/85" aria-live="polite">
              {fill(UI.photoOf[lang], { n: index + 1, total })}
            </p>
            <button type="button" data-autofocus onClick={() => onChange(null)} className="ml-auto grid size-11 place-items-center rounded-full border border-snow/30 hover:border-snow">
              <CloseIcon />
              <span className="sr-only">{UI.close[lang]}</span>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 md:px-20" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.figure
                key={id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -450) step(1);
                  else if (info.offset.x > 70 || info.velocity.x > 450) step(-1);
                }}
                className="flex max-h-full cursor-grab touch-pan-y flex-col items-center active:cursor-grabbing"
              >
                <SmartImage
                  id={id}
                  sizes="100vw"
                  reveal="none"
                  eager
                  imgClassName="object-contain"
                  className="w-auto max-w-full rounded-xl"
                  style={{ height: `min(calc(100svh - 210px), calc((100vw - 32px) * ${(photoSize(id)[1] / photoSize(id)[0]).toFixed(4)}))` }}
                />
                <figcaption className="mt-3 max-w-[60ch] text-center text-[15px] text-snow/90">{photoAlt(id, lang)}</figcaption>
              </motion.figure>
            </AnimatePresence>
            {total > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/70 ring-1 ring-snow/30 hover:ring-snow md:left-6" aria-label={UI.prevPhoto[lang]}>
                  <ArrowLeft />
                </button>
                <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/70 ring-1 ring-snow/30 hover:ring-snow md:right-6" aria-label={UI.nextPhoto[lang]}>
                  <ArrowRight />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
