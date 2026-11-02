import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { UI, fill } from "@/i18n";
import { HOME } from "@/copy";
import { mark } from "@/content";
import { useSite } from "@/site";
import { cn, prefersReducedMotion, storage } from "@/lib/utils";
import { gpuWebGL } from "@/lib/webgl";
import { SiteLink } from "../SiteLink";
import { Magnetic } from "../Magnetic";
import { ArrowLeft, ArrowRight, PauseIcon, PlayIcon } from "../icons";

const MIN = 0.06;
const MAX = 0.94;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * The hero: the Pizza | Parrilla scene fills the whole section behind the text (oven on the left, grill on
 * the right, the divider between them). The text sits at the bottom on a dark gradient so it stays readable.
 */
export function Hero() {
  const { lang, book, go } = useSite();
  const reduce = useReducedMotion();
  const firstVisit = useRef(storage("session").get("cc-welcomed") !== "1");
  const delay = firstVisit.current ? 1.05 : 0.1;
  const host = useRef<HTMLElement>(null);
  const split = useMotionValue(0.5);
  const width = useMotionValue(1200);
  const [paused, setPaused] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => width.set(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <section
      ref={host}
      id="start"
      aria-labelledby="hero-title"
      className="on-dark relative isolate touch-pan-y overflow-hidden bg-ink text-snow"
      style={{ height: "max(620px, min(920px, calc(100svh - var(--header-h) - var(--label-h))))" }}
    >
      <Backdrop host={host} split={split} paused={paused} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-ink via-ink/75 to-transparent" />
      <SideLabels split={split} />
      <Divider split={split} width={width} />

      <div className="gutter pointer-events-none absolute inset-x-0 bottom-0 pb-7 md:pb-12">
        <div className="wrap pointer-events-auto">
          <motion.p
            className="mb-4 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-beak"
            initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5, delay }}
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
            {UI.location[lang]}
          </motion.p>
          <Title delay={delay} />
          <motion.p
            className="mt-4 max-w-[44ch] text-lg leading-relaxed text-snow/90 md:text-xl"
            initial={reduce ? false : { transform: "translateY(12px)" }}
            animate={{ transform: "translateY(0px)" }}
            transition={{ duration: 0.6, delay: delay + 0.35 }}
          >
            {UI.heroLead[lang]}
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6, delay: delay + 0.45 }}
          >
            <Magnetic>
              <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 text-[17px] font-semibold text-ink transition-colors hover:bg-[#f5c55d]">
                {UI.bookTable[lang]}
              </button>
            </Magnetic>
            <Magnetic>
              <button type="button" onClick={() => go("home", "restaurants")} className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-snow/40 px-6 text-[17px] font-semibold text-snow transition-colors hover:border-snow hover:bg-snow/10">
                {UI.explore[lang]}
                <ArrowRight className="rotate-90 transition-transform group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="ml-auto grid size-11 place-items-center rounded-full border border-snow/30 hover:border-snow"
              aria-label={paused ? UI.play[lang] : UI.pause[lang]}
              aria-pressed={paused}
            >
              {paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** "Pizza | Parrilla", letter by letter; with a mouse, the letters near the pointer lift a little. */
function Title({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLHeadingElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const title = HOME.heroTitle;

  const onMove = (e: ReactPointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    for (const el of letters.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      const lift = Math.max(0, 1 - d / 140);
      el.style.transform = `translateY(${(-lift * lift * 12).toFixed(2)}px)`;
    }
  };
  const onLeave = () => letters.current.forEach((el) => el && (el.style.transform = ""));

  return (
    <h1 ref={box} id="hero-title" onPointerMove={onMove} onPointerLeave={onLeave} className="font-display text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-snow">
      <span className="sr-only">Pizza · Parrilla · The Choucas Connection</span>
      <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em]">
        {[...title].map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={reduce ? false : { transform: "translateY(105%)" }}
            animate={{ transform: "translateY(0%)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.035 }}
          >
            <span
              ref={(el) => {
                letters.current[i] = el;
              }}
              className={cn("inline-block transition-transform duration-300 ease-out-expo", ch === "|" && "px-[0.1em] font-extralight text-beak")}
            >
              {ch === " " ? " " : ch}
            </span>
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

/** CSS fire paints at once; the WebGL scene loads after first paint and fades in over it. */
function Backdrop({ host, split, paused }: { host: React.RefObject<HTMLElement | null>; split: MotionValue<number>; paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{ setSplit: (v: number) => void; setPaused: (v: boolean) => void; dispose: () => void } | null>(null);
  const [ready, setReady] = useState(false);
  const clip = useTransform(split, (s) => `inset(0 ${((1 - s) * 100).toFixed(2)}% 0 0)`);
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
      <div className="absolute inset-0 bg-[radial-gradient(90%_55%_at_70%_100%,rgba(181,84,30,0.75),transparent_65%),linear-gradient(to_bottom,#2a0b0e_0%,#2a0b0e_55%,#120d0a_100%)]" />
      {/* oven side */}
      <motion.div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_27%_68%,rgba(242,140,40,0.9),rgba(200,55,45,0.5)_45%,transparent_75%),linear-gradient(#2b130d,#1d0c09)]" style={{ clipPath: clip }} />
      <canvas ref={canvas} className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")} />
    </div>
  );
}

/** "Pizzeria Choucas" and "Oasis Steakhouse" in the bottom corners, each linking to its page. */
function SideLabels({ split }: { split: MotionValue<number> }) {
  const { lang } = useSite();
  const left = useTransform(split, (s) => clamp((s - 0.28) / 0.1));
  const right = useTransform(split, (s) => clamp((0.72 - s) / 0.1));
  const leftEvents = useTransform(left, (o) => (o < 0.3 ? "none" : "auto"));
  const rightEvents = useTransform(right, (o) => (o < 0.3 ? "none" : "auto"));
  const label = "group inline-flex min-h-11 items-center gap-2 rounded-full bg-ink/55 px-4 text-sm font-semibold text-snow ring-1 ring-snow/20 backdrop-blur-sm transition-colors hover:bg-ink/75";
  return (
    <>
      <motion.div className="absolute left-4 top-4 z-10 md:left-8 md:top-6" style={{ opacity: left, pointerEvents: leftEvents }}>
        <SiteLink page="pizzeria" className={label}>
          <span aria-hidden="true" className="size-2 rounded-full bg-oven" />
          <span>
            Pizzeria Choucas<span className="max-sm:sr-only"> · {UI.pizzaSide[lang]}</span>
          </span>
        </SiteLink>
      </motion.div>
      <motion.div className="absolute right-4 top-4 z-10 md:right-8 md:top-6" style={{ opacity: right, pointerEvents: rightEvents }}>
        <SiteLink page="steakhouse" className={label}>
          <span aria-hidden="true" className="size-2 rounded-full bg-ember" />
          <span>
            Oasis Steakhouse<span className="max-sm:sr-only"> · {UI.grillSide[lang]}</span>
          </span>
        </SiteLink>
      </motion.div>
    </>
  );
}

/**
 * The seam: a thin line with the logo's hexagon on an ivory disc as its handle. The handle leans with the
 * drag and springs back; letting go glides on a little. A slider for keyboards and screen readers.
 */
function Divider({ split, width }: { split: MotionValue<number>; width: MotionValue<number> }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);
  const [dragging, setDragging] = useState(false);
  const x = useTransform(() => split.get() * width.get());
  const lean = useMotionValue(0);
  const leanSpring = useSpring(lean, { stiffness: 260, damping: 14 });
  const track = useRef<{ x: number; t: number; v: number } | null>(null);
  useMotionValueEvent(split, "change", (v) => setValue(Math.round(v * 100)));

  const set = (v: number, smooth = false) => {
    setTouched(true);
    const target = clamp(v, MIN, MAX);
    split.stop();
    if (smooth && !reduce) animate(split, target, { type: "spring", stiffness: 260, damping: 30 });
    else split.set(target);
  };
  const fromPointer = (e: ReactPointerEvent<HTMLElement>) => {
    const box = e.currentTarget.parentElement!.parentElement!.getBoundingClientRect();
    const v = (e.clientX - box.left) / box.width;
    const now = performance.now();
    if (track.current) {
      const dt = Math.max(1, now - track.current.t) / 1000;
      const vel = (v - track.current.x) / dt;
      track.current = { x: v, t: now, v: vel * 0.6 + track.current.v * 0.4 };
      if (!reduce) lean.set(clamp(track.current.v * 22, -20, 20));
    } else track.current = { x: v, t: now, v: 0 };
    set(v);
  };
  const release = () => {
    setDragging(false);
    lean.set(0);
    const v = track.current?.v ?? 0;
    track.current = null;
    if (!reduce && Math.abs(v) > 0.15) animate(split, clamp(split.get() + v * 0.12, MIN, MAX), { type: "spring", velocity: v, stiffness: 90, damping: 20 });
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
      <div aria-hidden="true" className="absolute inset-y-0 -left-px w-0.5 bg-snow/80 shadow-[0_0_14px_rgba(251,247,240,0.5)]" />
      <motion.div
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
          track.current = null;
          fromPointer(e);
        }}
        onPointerMove={(e) => dragging && fromPointer(e)}
        onPointerUp={release}
        onPointerCancel={release}
        style={{ rotate: leanSpring }}
        className="pointer-events-auto absolute top-[30%] grid size-[68px] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none place-items-center rounded-full bg-snow shadow-[0_16px_34px_-12px_rgba(0,0,0,0.75)] outline-offset-4 active:cursor-grabbing md:size-[80px]"
      >
        <motion.img src={mark()} alt="" draggable={false} className="size-[46px] object-contain md:size-[56px]" animate={{ scale: dragging ? 0.9 : 1 }} />
        <span aria-hidden="true" className="absolute -left-6 top-1/2 -translate-y-1/2 text-snow/90">
          <ArrowLeft size={15} />
        </span>
        <span aria-hidden="true" className="absolute -right-6 top-1/2 -translate-y-1/2 text-snow/90">
          <ArrowRight size={15} />
        </span>
      </motion.div>
      <motion.p
        aria-hidden="true"
        className="absolute top-[calc(30%+48px)] w-36 -translate-x-1/2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-snow md:top-[calc(30%+54px)]"
        animate={{ opacity: touched ? 0 : 0.9 }}
      >
        {UI.dragHint[lang]}
      </motion.p>
    </motion.div>
  );
}
