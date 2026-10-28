import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { UI, fill } from "@/i18n";
import { HOME } from "@/copy";
import { CONTACT, mark, photo } from "@/content";
import { useSite } from "@/site";
import { cn, prefersReducedMotion, storage } from "@/lib/utils";
import { gpuWebGL } from "@/lib/webgl";
import { SiteLink } from "../SiteLink";
import { Magnetic } from "../Magnetic";
import { ArrowLeft, ArrowRight, PauseIcon, PhoneIcon, PlayIcon } from "../icons";

const MIN = 0.05;
const MAX = 0.95;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Dishes float on their own side and fade when the seam passes over them. x, y: centre, in % of the hero.
const DISHES: { id: string; side: "pizza" | "grill"; x: number; y: number; size: number; r: number; mobile?: boolean }[] = [
  { id: "a3x7699", side: "pizza", x: 0.13, y: 0.22, size: 160, r: -6, mobile: true },
  { id: "pizza-ansicht", side: "pizza", x: 0.34, y: 0.14, size: 116, r: 5 },
  { id: "pizzageissupuer", side: "pizza", x: 0.38, y: 0.42, size: 120, r: -3 },
  { id: "tbone2", side: "grill", x: 0.63, y: 0.2, size: 136, r: 4 },
  { id: "parilladaweb", side: "grill", x: 0.86, y: 0.26, size: 168, r: -5, mobile: true },
  { id: "steakhouse", side: "grill", x: 0.7, y: 0.5, size: 128, r: 6 },
];

/** The signature: a draggable divider shares the screen between the pizza oven and the Oasis grill. */
export function Hero() {
  const { lang, book } = useSite();
  const reduce = useReducedMotion();
  const host = useRef<HTMLElement>(null);
  const split = useMotionValue(0.5);
  const width = useMotionValue(1200);
  const [paused, setPaused] = useState(() => prefersReducedMotion());
  const firstVisit = useRef(storage("session").get("cc-welcomed") !== "1");

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => width.set(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const title = HOME.heroTitle;
  return (
    <section
      ref={host}
      id="start"
      aria-labelledby="hero-title"
      className="on-dark relative isolate overflow-hidden bg-ink text-snow"
      style={{ height: "max(640px, min(940px, calc(100svh - var(--header-h) - var(--label-h))))" }}
    >
      <Backdrop host={host} split={split} paused={paused} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink via-ink/75 to-transparent" />
      <SideLinks split={split} />
      {DISHES.map((d, i) => (
        <FloatingDish key={d.id} dish={d} split={split} order={i} delay={firstVisit.current ? 1.1 : 0.15} paused={paused} />
      ))}
      <Divider split={split} width={width} />

      <div className="gutter pointer-events-none absolute inset-x-0 bottom-0 pb-8 md:pb-12">
        <div className="wrap pointer-events-auto">
          <p className="mb-3 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-beak">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-brand" />
            {UI.heroEyebrow[lang]}
          </p>
          <h1 id="hero-title" className="font-display text-[clamp(3.2rem,11vw,8.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-snow">
            <span className="sr-only">Pizza · Parrilla · The Choucas Connection</span>
            <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.06em]">
              {[...title].map((ch, i) => (
                <motion.span
                  key={i}
                  className={cn("inline-block", ch === "|" && "px-[0.12em] font-light text-beak")}
                  initial={reduce ? false : { transform: "translateY(105%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: (firstVisit.current ? 1.05 : 0.1) + i * 0.04 }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </span>
          </h1>
          <motion.p
            className="mt-4 max-w-[46ch] text-lg leading-relaxed text-snow/90 md:text-xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6, delay: firstVisit.current ? 1.5 : 0.5 }}
          >
            {UI.heroLead[lang]}
          </motion.p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 text-lg font-bold text-ink transition-colors hover:bg-white">
                {UI.book[lang]}
              </button>
            </Magnetic>
            <Magnetic>
              <SiteLink page="menu" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-snow px-6 text-lg font-bold text-ink transition-colors hover:bg-white">
                {UI.nav.menu[lang]}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </SiteLink>
            </Magnetic>
            <Magnetic>
              <a href={CONTACT.tel} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-snow/45 px-6 text-lg font-bold text-snow transition-colors hover:border-snow hover:bg-snow/10">
                <PhoneIcon />
                {UI.call[lang]}
                <span className="sr-only"> {CONTACT.phone}</span>
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="ml-auto grid size-11 place-items-center rounded-full border border-snow/30 hover:border-snow max-sm:ml-0"
              aria-label={paused ? UI.play[lang] : UI.pause[lang]}
              aria-pressed={paused}
            >
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** CSS fire paints at once; the WebGL scene loads after first paint and fades in over it. */
function Backdrop({ host, split, paused }: { host: React.RefObject<HTMLElement | null>; split: MotionValue<number>; paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{ setSplit: (v: number) => void; setPaused: (v: boolean) => void; dispose: () => void } | null>(null);
  const [ready, setReady] = useState(false);
  const outer = useTransform(split, (s) => `translateX(${(s - 1) * 100}%)`);
  const inner = useTransform(split, (s) => `translateX(${(1 - s) * 100}%)`);
  useMotionValueEvent(split, "change", (v) => engine.current?.setSplit(v));
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => engine.current?.setPaused(paused), [paused]);

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
        if (pausedRef.current) engine.current.setPaused(true);
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
      {/* grill side */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_70%_100%,rgba(181,84,30,0.7),transparent_60%),radial-gradient(40%_30%_at_85%_80%,rgba(242,194,48,0.3),transparent_70%)] bg-ink" />
      {/* oven side */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ transform: outer }}>
        <motion.div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_25%_100%,rgba(242,140,40,0.85),rgba(200,55,45,0.55)_45%,transparent_75%)] bg-[#1d0c09]" style={{ transform: inner }} />
      </motion.div>
      <canvas ref={canvas} className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")} />
    </div>
  );
}

/** "Pizzeria Choucas" and "Oasis Steakhouse" at the top of each side; each links to its page. */
function SideLinks({ split }: { split: MotionValue<number> }) {
  const { lang } = useSite();
  const left = useTransform(split, (s) => clamp((s - 0.2) / 0.12));
  const right = useTransform(split, (s) => clamp((0.8 - s) / 0.12));
  const leftEvents = useTransform(left, (o) => (o < 0.2 ? "none" : "auto"));
  const rightEvents = useTransform(right, (o) => (o < 0.2 ? "none" : "auto"));
  return (
    <div className="gutter pointer-events-none absolute inset-x-0 top-6 md:top-16">
      <div className="wrap flex justify-between gap-4">
        <motion.div style={{ opacity: left, pointerEvents: leftEvents }}>
          <SiteLink page="pizzeria" className="group block rounded-xl">
            <span className="block font-display text-[22px] font-bold leading-tight tracking-tight text-snow sm:text-3xl md:text-5xl">Pizzeria Choucas</span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ffb08a] max-sm:hidden">
              {UI.pizzaSide[lang]}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </SiteLink>
        </motion.div>
        <motion.div className="text-right" style={{ opacity: right, pointerEvents: rightEvents }}>
          <SiteLink page="steakhouse" className="group block rounded-xl">
            <span className="block font-display text-[22px] font-bold leading-tight tracking-tight text-snow sm:text-3xl md:text-5xl">Oasis Steakhouse</span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-sand max-sm:hidden">
              {UI.grillSide[lang]}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </SiteLink>
        </motion.div>
      </div>
    </div>
  );
}

function FloatingDish({ dish, split, order, delay, paused }: { dish: (typeof DISHES)[number]; split: MotionValue<number>; order: number; delay: number; paused: boolean }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(split, (s) => (dish.side === "pizza" ? clamp((s - dish.x - 0.03) / 0.07) : clamp((dish.x - s - 0.03) / 0.07)));
  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", !dish.mobile && "max-md:hidden")}
      style={{ left: `${dish.x * 100}%`, top: `max(${dish.y * 100}%, 150px)`, width: `clamp(${Math.round(dish.size * 0.58)}px, ${(dish.size / 14).toFixed(2)}vw, ${dish.size}px)` }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translate(-50%, 60px)" }}
      animate={{ opacity: 1, transform: "translate(-50%, 0px)" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + order * 0.09 }}
    >
      <motion.div style={{ opacity }}>
        <img
          src={photo(dish.id, true)}
          alt=""
          className="aspect-square w-full rounded-full border-[5px] border-snow object-cover shadow-[0_24px_40px_-18px_rgba(0,0,0,0.8)]"
          style={{ ["--r" as string]: `${dish.r}deg`, animation: `rise ${6 + order * 0.7}s ease-in-out ${order * -1.3}s infinite`, animationPlayState: paused ? "paused" : "running" }}
          decoding="async"
        />
      </motion.div>
    </motion.div>
  );
}

/** The seam: a thin line with the logo's hexagon on a snow disc as its handle. A slider for keyboards and screen readers. */
function Divider({ split, width }: { split: MotionValue<number>; width: MotionValue<number> }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);
  const [dragging, setDragging] = useState(false);
  const x = useTransform(() => split.get() * width.get());
  const spin = useTransform(split, [MIN, MAX], [-90, 90]);
  useMotionValueEvent(split, "change", (v) => setValue(Math.round(v * 100)));

  const set = (v: number, smooth = false) => {
    setTouched(true);
    const target = clamp(v, MIN, MAX);
    split.stop();
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
  return (
    <motion.div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0" style={{ x }}>
      <div aria-hidden="true" className="absolute inset-y-0 -left-px w-0.5 bg-snow/75 shadow-[0_0_18px_rgba(247,244,238,0.5)]" />
      <div
        role="slider"
        tabIndex={0}
        aria-label={UI.dividerLabel[lang]}
        aria-orientation="horizontal"
        aria-valuemin={Math.round(MIN * 100)}
        aria-valuemax={Math.round(MAX * 100)}
        aria-valuenow={value}
        aria-valuetext={fill(UI.dividerValue[lang], { a: value, b: 100 - value })}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          fromPointer(e);
        }}
        onPointerMove={(e) => dragging && fromPointer(e)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="pointer-events-auto absolute top-[36%] grid size-[88px] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none place-items-center rounded-full bg-snow shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)] outline-offset-4 active:cursor-grabbing md:top-[40%] md:size-[104px]"
      >
        <motion.img src={mark()} alt="" draggable={false} className="size-[64px] object-contain md:size-[76px]" animate={{ scale: dragging ? 0.9 : 1 }} style={{ rotate: spin }} />
        <span aria-hidden="true" className="absolute -left-7 top-1/2 -translate-y-1/2 text-snow/90">
          <ArrowLeft size={16} />
        </span>
        <span aria-hidden="true" className="absolute -right-7 top-1/2 -translate-y-1/2 text-snow/90">
          <ArrowRight size={16} />
        </span>
      </div>
      <motion.p
        aria-hidden="true"
        className="absolute top-[calc(36%+56px)] w-40 -translate-x-1/2 text-center text-xs font-bold uppercase tracking-[0.16em] text-snow md:top-[calc(40%+64px)]"
        animate={{ opacity: touched ? 0 : 0.9 }}
      >
        {UI.dragHint[lang]}
      </motion.p>
    </motion.div>
  );
}
