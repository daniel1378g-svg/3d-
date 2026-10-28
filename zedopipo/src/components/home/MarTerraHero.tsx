import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HTML_LANG, UI, fill } from "@/i18n";
import { HERO_TITLE, OUR_MENU, SLIDES } from "@/copy";
import { logo, photo } from "@/content";
import { useSite } from "@/site";
import { cn, prefersReducedMotion, storage } from "@/lib/utils";
import { gpuWebGL } from "@/lib/webgl";
import { SiteLink } from "../SiteLink";
import { ArrowLeft, ArrowRight, PauseIcon, PlayIcon } from "../icons";

const MIN = 0.05;
const MAX = 0.95;
const SLIDE_MS = 6000;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Dishes float on their own side and fade when the seam passes over them. x, y: centre, in % of the hero.
const DISHES: { id: string; side: "mar" | "terra"; x: number; y: number; size: number; r: number; mobile?: boolean }[] = [
  { id: "bacalhau-lagareiro-500", side: "mar", x: 0.12, y: 0.2, size: 150, r: -6, mobile: true },
  { id: "camarao-piri-piri-500", side: "mar", x: 0.33, y: 0.12, size: 112, r: 5 },
  { id: "pouple-grille-500w", side: "mar", x: 0.4, y: 0.4, size: 128, r: -3 },
  { id: "poulet", side: "terra", x: 0.64, y: 0.16, size: 136, r: 4, mobile: true },
  { id: "entrecote", side: "terra", x: 0.86, y: 0.3, size: 168, r: -5, mobile: true },
  { id: "secretos-500", side: "terra", x: 0.68, y: 0.54, size: 140, r: 6 },
];

export function MarTerraHero() {
  const { lang, book } = useSite();
  const reduce = useReducedMotion();
  const host = useRef<HTMLElement>(null);
  const split = useMotionValue(0.5);
  const width = useMotionValue(1200);
  const userMoved = useRef(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => prefersReducedMotion());
  const [hold, setHold] = useState(false); // pointer over or focus inside the slides
  const [onScreen, setOnScreen] = useState(true);
  const firstVisit = useRef(storage("session").get("zp-welcomed") !== "1");
  const bar = useRef<HTMLSpanElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const count = SLIDES.length;

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => width.set(e.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [width]);

  const goTo = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  // Auto-advance every 6 s; pauses on hover, focus, off screen, or with the pause button.
  const playing = !paused && !hold && onScreen;
  const elapsed = useRef(0);
  useEffect(() => {
    elapsed.current = 0;
    if (bar.current) bar.current.style.transform = "scaleX(0)";
  }, [index]);
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      elapsed.current += now - last;
      last = now;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, elapsed.current / SLIDE_MS)})`;
      if (elapsed.current >= SLIDE_MS) {
        elapsed.current = 0;
        setIndex((i) => (i + 1) % count);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, count]);

  // Each slide leans the seam towards its side until the visitor takes the divider.
  useEffect(() => {
    if (userMoved.current) return;
    const target = SLIDES[index].side === "terra" ? 0.38 : 0.62;
    if (reduce) split.set(target);
    else animate(split, target, { type: "spring", stiffness: 60, damping: 16 });
  }, [index, reduce, split]);

  const slide = SLIDES[index];

  return (
    <section
      ref={host}
      id="accueil"
      aria-labelledby="hero-title"
      className="on-dark relative isolate overflow-hidden bg-charcoal text-linen"
      style={{ height: "max(620px, min(940px, calc(100svh - var(--header-h) - var(--label-h))))" }}
    >
      <Backdrop host={host} split={split} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
      <SideLabels split={split} />
      {DISHES.map((d, i) => (
        <FloatingDish key={d.id} dish={d} split={split} order={i} delay={firstVisit.current ? 1 : 0.15} />
      ))}
      <Divider split={split} width={width} onUser={() => (userMoved.current = true)} />

      <div className="gutter pointer-events-none absolute inset-x-0 bottom-0 pb-8 md:pb-12">
        <div
          className="wrap pointer-events-auto"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
          onPointerLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHold(false)}
        >
          <div
            className="max-w-[640px] touch-pan-y select-none"
            onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
            onPointerUp={(e) => {
              const s = swipe.current;
              swipe.current = null;
              if (!s) return;
              const dx = e.clientX - s.x;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) goTo(index + (dx < 0 ? 1 : -1));
            }}
          >
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              {UI.since1989[lang]} · Genève
            </p>
            <h1 id="hero-title" className="font-display text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-linen">
              <span className="sr-only">{HERO_TITLE}</span>
              <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.06em]">
                {[...HERO_TITLE].map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={reduce ? false : { transform: "translateY(105%)" }}
                    animate={{ transform: "translateY(0%)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.035 }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </h1>
            <div aria-roledescription="carousel" aria-label={UI.slideshow[lang]} className="mt-4 min-h-[8.5rem] md:min-h-[9rem]">
              <div aria-live={playing ? "off" : "polite"}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${index}-${lang}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={fill(UI.slideOf[lang], { n: index + 1, total: count })}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.18 } }}
                  >
                    <LetterTitle text={slide.title[lang]} lang={HTML_LANG[lang]} />
                    <motion.p
                      className="mt-3 max-w-[52ch] text-lg leading-relaxed text-linen/90 md:text-xl"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(10px)" }}
                      animate={{ opacity: 1, transform: "translateY(0px)" }}
                      transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                    >
                      {slide.text[lang]}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <SiteLink page="menu" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-linen px-6 font-bold text-bordeaux transition-colors hover:bg-gold hover:text-charcoal">
              {OUR_MENU[lang]}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </SiteLink>
            <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full border border-linen/45 px-6 font-bold text-linen transition-colors hover:border-linen hover:bg-linen/10">
              {UI.book[lang]}
            </button>
            <div className="ml-auto flex items-center gap-1.5 max-sm:ml-0 max-sm:w-full">
              <button type="button" onClick={() => goTo(index - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-linen/30 hover:border-linen" aria-label={UI.prevSlide[lang]}>
                <ArrowLeft />
              </button>
              <button type="button" onClick={() => setPaused((p) => !p)} className="grid h-11 w-11 place-items-center rounded-full border border-linen/30 hover:border-linen" aria-label={paused ? UI.play[lang] : UI.pause[lang]}>
                {paused ? <PlayIcon /> : <PauseIcon />}
              </button>
              <button type="button" onClick={() => goTo(index + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-linen/30 hover:border-linen" aria-label={UI.nextSlide[lang]}>
                <ArrowRight />
              </button>
              <span className="ml-2 font-display text-sm font-semibold tabular-nums text-linen/85" aria-hidden="true">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="relative ml-2 block h-0.5 w-16 overflow-hidden rounded-full bg-linen/20">
                <span ref={bar} className="absolute inset-0 origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The slide title, letter by letter, each word kept whole so lines break between words. */
function LetterTitle({ text, lang }: { text: string; lang: string }) {
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <h2 lang={lang} className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold leading-tight tracking-tight text-linen">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, w) => (
          <span key={w} className="inline-block overflow-hidden whitespace-nowrap pb-[0.08em] align-bottom">
            {[...word].map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? { opacity: 0 } : { transform: "translateY(100%)" }}
                animate={reduce ? { opacity: 1 } : { transform: "translateY(0%)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.02 * n++ }}
              >
                {ch}
              </motion.span>
            ))}
            {" "}
          </span>
        ))}
      </span>
    </h2>
  );
}

/** CSS sea and embers paint at once; the WebGL scene loads after first paint and fades in over them. */
function Backdrop({ host, split }: { host: React.RefObject<HTMLElement | null>; split: MotionValue<number> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{ setSplit: (v: number) => void; dispose: () => void } | null>(null);
  const [ready, setReady] = useState(false);
  const outer = useTransform(split, (s) => `translateX(${(s - 1) * 100}%)`);
  const inner = useTransform(split, (s) => `translateX(${(1 - s) * 100}%)`);
  useMotionValueEvent(split, "change", (v) => engine.current?.setSplit(v));

  useEffect(() => {
    let cancelled = false;
    const start = async () => {
      if (!canvas.current || !host.current) return;
      if (!gpuWebGL()) return;
      const { createHero } = await import("../hero/engine");
      if (cancelled || !canvas.current || !host.current) return;
      try {
        engine.current = createHero(canvas.current, host.current, { still: prefersReducedMotion(), onFirstFrame: () => setReady(true) });
        engine.current.setSplit(split.get());
      } catch {
        /* keep the CSS backdrop */
      }
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number }).requestIdleCallback;
    const handle = idle ? idle(start, { timeout: 1500 }) : window.setTimeout(start, 400);
    return () => {
      cancelled = true;
      if (!idle) window.clearTimeout(handle);
      engine.current?.dispose();
      engine.current = null;
    };
  }, [host, split]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_70%_100%,rgba(224,97,43,0.55),transparent_60%),radial-gradient(40%_30%_at_85%_80%,rgba(201,164,74,0.35),transparent_70%)] bg-charcoal" />
      <motion.div className="absolute inset-0 overflow-hidden" style={{ transform: outer }}>
        <motion.div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_30%_0%,#1d5470,transparent_70%)] bg-atlantic-deep" style={{ transform: inner }} />
      </motion.div>
      <canvas ref={canvas} className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")} />
    </div>
  );
}

function SideLabels({ split }: { split: MotionValue<number> }) {
  const { lang } = useSite();
  const sea = useTransform(split, (s) => clamp((s - 0.18) / 0.12));
  const land = useTransform(split, (s) => clamp((0.82 - s) / 0.12));
  return (
    <div aria-hidden="true" className="gutter pointer-events-none absolute inset-x-0 top-5 md:top-8">
      <div className="wrap flex justify-between">
        <motion.p style={{ opacity: sea }}>
          <span className="block font-display text-4xl font-bold italic tracking-tight text-linen md:text-6xl">{UI.mar[lang]}</span>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9fd0dc]">{UI.seaDishes[lang]}</span>
        </motion.p>
        <motion.p className="text-right" style={{ opacity: land }}>
          <span className="block font-display text-4xl font-bold italic tracking-tight text-linen md:text-6xl">{UI.terra[lang]}</span>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{UI.landDishes[lang]}</span>
        </motion.p>
      </div>
    </div>
  );
}

function FloatingDish({ dish, split, order, delay }: { dish: (typeof DISHES)[number]; split: MotionValue<number>; order: number; delay: number }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(split, (s) => (dish.side === "mar" ? clamp((s - dish.x - 0.03) / 0.07) : clamp((dish.x - s - 0.03) / 0.07)));
  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", !dish.mobile && "max-md:hidden")}
      style={{ left: `${dish.x * 100}%`, top: `${dish.y * 100}%`, width: `clamp(${Math.round(dish.size * 0.58)}px, ${(dish.size / 14).toFixed(2)}vw, ${dish.size}px)` }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translate(-50%, 60px)" }}
      animate={{ opacity: 1, transform: "translate(-50%, 0px)" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + order * 0.09 }}
    >
      <motion.div style={{ opacity }}>
        <img
          src={photo(dish.id, true)}
          alt=""
          className="aspect-square w-full rounded-full border-[5px] border-linen object-cover shadow-[0_24px_40px_-18px_rgba(0,0,0,0.75)]"
          style={{ ["--r" as string]: `${dish.r}deg`, animation: `rise ${6 + order * 0.7}s ease-in-out ${order * -1.3}s infinite` }}
          decoding="async"
        />
      </motion.div>
    </motion.div>
  );
}

/** The seam: a thin line with the logo on a linen disc as its handle. A slider for keyboards and screen readers. */
function Divider({ split, width, onUser }: { split: MotionValue<number>; width: MotionValue<number>; onUser: () => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);
  const [dragging, setDragging] = useState(false);
  const x = useTransform(() => split.get() * width.get());
  const spin = useTransform(split, [MIN, MAX], [-120, 120]);
  useMotionValueEvent(split, "change", (v) => setValue(Math.round(v * 100)));

  const set = (v: number, smooth = false) => {
    onUser();
    setTouched(true);
    const target = clamp(v, MIN, MAX);
    split.stop(); // the visitor's move wins over a slide's lean still in flight
    if (smooth && !reduce) animate(split, target, { type: "spring", stiffness: 260, damping: 30 });
    else split.set(target);
  };
  const fromPointer = (e: ReactPointerEvent<HTMLElement>) => {
    const parent = e.currentTarget.closest("section")!.getBoundingClientRect();
    set((e.clientX - parent.left) / parent.width);
  };
  const onKey = (e: ReactKeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.05;
    const now = split.get();
    const keys: Record<string, number> = { ArrowLeft: now - step, ArrowDown: now - step, ArrowRight: now + step, ArrowUp: now + step, Home: MIN, End: MAX, PageDown: now - 0.2, PageUp: now + 0.2 };
    if (e.key in keys) {
      e.preventDefault();
      set(keys[e.key], true);
    }
  };
  const sea = value;
  return (
    <motion.div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0" style={{ x }}>
      <div aria-hidden="true" className="absolute inset-y-0 -left-px w-0.5 bg-linen/70 shadow-[0_0_18px_rgba(245,238,228,0.45)]" />
      <div
        role="slider"
        tabIndex={0}
        aria-label={UI.dividerLabel[lang]}
        aria-orientation="horizontal"
        aria-valuemin={Math.round(MIN * 100)}
        aria-valuemax={Math.round(MAX * 100)}
        aria-valuenow={sea}
        aria-valuetext={fill(UI.dividerValue[lang], { sea, land: 100 - sea })}
        data-cursor="drag"
        onKeyDown={onKey}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          fromPointer(e);
        }}
        onPointerMove={(e) => dragging && fromPointer(e)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="pointer-events-auto absolute top-[30%] grid h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none place-items-center rounded-full bg-linen shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] outline-offset-4 active:cursor-grabbing md:top-[34%] md:h-[104px] md:w-[104px]"
      >
        <motion.img
          src={logo()}
          alt=""
          draggable={false}
          className="h-[76px] w-[76px] rounded-full md:h-[90px] md:w-[90px]"
          animate={{ scale: dragging ? 0.92 : 1 }}
          style={{ rotate: spin }}
        />
        <span aria-hidden="true" className="absolute -left-7 top-1/2 -translate-y-1/2 text-linen/90">
          <ArrowLeft size={16} />
        </span>
        <span aria-hidden="true" className="absolute -right-7 top-1/2 -translate-y-1/2 text-linen/90">
          <ArrowRight size={16} />
        </span>
      </div>
      <motion.p
        aria-hidden="true"
        className="absolute top-[calc(30%+56px)] w-40 -translate-x-1/2 text-center text-xs font-bold uppercase tracking-[0.16em] text-linen md:top-[calc(34%+64px)]"
        animate={{ opacity: touched ? 0 : 0.9 }}
      >
        {UI.dragHint[lang]}
      </motion.p>
    </motion.div>
  );
}
