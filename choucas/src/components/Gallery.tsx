import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI, fill } from "@/i18n";
import { GALLERIES } from "@/copy";
import { photo, photoAlt, photoSize } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Heading } from "./Reveal";
import { ArrowLeft, ArrowRight, CloseIcon, GridIcon } from "./icons";

const TOTAL = GALLERIES.reduce((n, g) => n + g.photos.length, 0);

/** The nine live galleries: tabs, a swipeable carousel per gallery (or a plain grid) and a lightbox. */
export function Gallery({ initial = "pizzeria", tone = "dark" }: { initial?: string; tone?: "dark" | "light" }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [cat, setCat] = useState(initial);
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
                  <Thumb id={id} onOpen={() => setOpen(i)} className="aspect-[4/3] w-full" />
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

function Thumb({ id, onOpen, className }: { id: string; onOpen: () => void; className?: string }) {
  const { lang } = useSite();
  const [w, h] = photoSize(id);
  return (
    <button type="button" onClick={onOpen} className="group block w-full overflow-hidden rounded-2xl bg-ink-2 text-left">
      <img src={photo(id, true)} width={w} height={h} alt={photoAlt(id, lang)} loading="lazy" decoding="async" draggable={false} className={cn("object-cover transition-transform duration-500 group-hover:scale-105", className)} />
    </button>
  );
}

/** Native horizontal scrolling (swipe on touch), drag with a mouse, arrow buttons and arrow keys. */
function Carousel({ ids, onOpen, dark }: { ids: string[]; onOpen: (i: number) => void; dark: boolean }) {
  const { lang } = useSite();
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const reduce = useReducedMotion();

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(update, [ids]);
  const by = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={track}
        onScroll={update}
        aria-roledescription="carousel"
        style={{ scrollPaddingInline: "max(16px, calc((100vw - 1280px) / 2))" }}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(16px,calc((100vw-1280px)/2))] pb-2 md:px-[max(32px,calc((100vw-1280px)/2))]"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !track.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) d.moved = true;
          track.current.style.scrollSnapType = "none";
          track.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          if (track.current) track.current.style.scrollSnapType = "";
          setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => {
          if (track.current) track.current.style.scrollSnapType = "";
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
          return (
            <motion.li
              key={id}
              className="shrink-0 snap-start"
              initial={reduce ? false : { opacity: 0, transform: "translateX(40px)" }}
              whileInView={{ opacity: 1, transform: "translateX(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <figure>
                <Thumb id={id} onOpen={() => onOpen(i)} className="h-[260px] w-auto max-w-[80vw] md:h-[360px]" />
                <figcaption className={cn("mt-2 max-w-[min(80vw,420px)] text-sm", dark ? "text-snow/75" : "text-muted")} style={{ width: `min(80vw, ${Math.round((w / h) * 360)}px)` }}>
                  {photoAlt(id, lang)}
                </figcaption>
              </figure>
            </motion.li>
          );
        })}
      </ul>
      <div className="gutter mt-4">
        <div className="wrap flex gap-2">
          <button type="button" onClick={() => by(-1)} disabled={edge.start} aria-label={UI.prevPhoto[lang]} className={cn("grid size-12 place-items-center rounded-full border-2 transition-opacity disabled:opacity-30", dark ? "border-snow/40 hover:border-snow" : "border-ink/30 hover:border-ink")}>
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => by(1)} disabled={edge.end} aria-label={UI.nextPhoto[lang]} className={cn("grid size-12 place-items-center rounded-full border-2 transition-opacity disabled:opacity-30", dark ? "border-snow/40 hover:border-snow" : "border-ink/30 hover:border-ink")}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ ids, index, onChange }: { ids: string[]; index: number | null; onChange: (i: number | null) => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const swipe = useRef<number | null>(null);
  const total = ids.length;
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
                <img src={photo(id)} alt={photoAlt(id, lang)} className="max-h-[calc(100svh-200px)] w-auto max-w-full rounded-xl object-contain" />
                <figcaption className="mt-3 max-w-[60ch] text-center text-[15px] text-snow/90">{photoAlt(id, lang)}</figcaption>
              </motion.figure>
            </AnimatePresence>
            {total > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/70 ring-1 ring-snow/30 hover:ring-snow md:left-6" aria-label={UI.prevPhoto[lang]}>
                  <ArrowLeft />
                </button>
                <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/70 ring-1 ring-snow/30 hover:ring-snow md:right-6" aria-label={UI.nextPhoto[lang]}>
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
