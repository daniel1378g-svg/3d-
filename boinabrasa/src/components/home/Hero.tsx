// The hero: the picanha scene (src/three/engine.ts) on a sticky full-screen stage. First visit of the session: it
// plays after the intro (≈18 s, skippable, pausable); afterwards it rests on the final shot, where "Noch eine Scheibe"
// carves again. Off screen it stops rendering. Reduced motion: one still frame of the final shot, no camera motion.
// No WebGL: a still rendered from the same scene. Scrolling through the stage dollies the camera back.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { storage, asset, cn } from "@/lib/utils";
import { EASE_OUT, isCoarse } from "@/lib/motion";
import type { PicanhaEngine } from "@/three/engine";
import { IconArrowDown, IconPause, IconPlay, IconReplay } from "../icons";

type Mode = "loading" | "playing" | "final" | "still" | "fallback";

function lowPower() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return isCoarse() || window.innerWidth < 760 || (nav.deviceMemory ?? 8) < 4 || (navigator.hardwareConcurrency ?? 8) <= 4;
}
function webglOk() {
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}

export function Hero() {
  const { t, introDone, reduce, openBooking, go, href } = useSite();
  const stage = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PicanhaEngine | null>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<Mode>("loading");
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const played = useRef(storage("session").get("bb-hero") === "1");

  // engine
  useEffect(() => {
    if (!canvas.current) return;
    if (!webglOk() || (import.meta.env.DEV && location.search.includes("no3d"))) { setMode("fallback"); return; }
    let disposed = false;
    let engine: PicanhaEngine | null = null;
    const still = reduce;
    import("@/three/engine").then(({ PicanhaEngine }) => {
      if (disposed || !canvas.current) return;
      try {
        engine = new PicanhaEngine({
          canvas: canvas.current,
          quality: lowPower() ? "low" : "high",
          startAtEnd: played.current || still,
          still,
          onPhase: (p) => setPhase(p),
          onProgress: (p) => { if (bar.current) bar.current.style.transform = `scaleX(${p})`; },
          onFirstFrame: () => setReady(true),
          onSequenceEnd: () => {
            storage("session").set("bb-hero", "1");
            setMode((m) => (m === "playing" ? "final" : m));
          },
        });
      } catch {
        setMode("fallback");
        return;
      }
      engineRef.current = engine;
      const size = () => {
        const r = stage.current!.getBoundingClientRect();
        engine!.resize(r.width, r.height);
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(stage.current!);
      const io = new IntersectionObserver(([e]) => engine?.setVisible(e.isIntersecting), { threshold: 0 });
      io.observe(stage.current!);
      if (still) { engine.renderOnce(); setMode("still"); }
      else if (played.current) { setMode("final"); engine.start(); }
      cleanup.push(() => { ro.disconnect(); io.disconnect(); });
    });
    const cleanup: (() => void)[] = [];
    return () => {
      disposed = true;
      cleanup.forEach((f) => f());
      engine?.dispose();
      engineRef.current = null;
    };
  }, [reduce]);

  // start the sequence once the intro has opened onto the stage
  useEffect(() => {
    const e = engineRef.current;
    if (!introDone || reduce || played.current) return;
    if (e) { e.start(); setMode("playing"); return; }
    const id = window.setInterval(() => {
      if (engineRef.current) { engineRef.current.start(); setMode("playing"); window.clearInterval(id); }
    }, 100);
    return () => window.clearInterval(id);
  }, [introDone, reduce]);

  // pointer: gentle camera and light response (fine pointers only)
  useEffect(() => {
    if (isCoarse() || reduce) return;
    const el = stage.current!;
    const on = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      engineRef.current?.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    const leave = () => engineRef.current?.setPointer(0, 0);
    el.addEventListener("pointermove", on);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", on); el.removeEventListener("pointerleave", leave); };
  }, [reduce]);

  // scroll: the camera pulls back while the stage scrolls away; the headline drifts up
  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (s) => engineRef.current?.setScroll(s.progress),
      });
      gsap.to("[data-hero-copy]", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: section.current, start: "35% top", end: "75% top", scrub: true } });
    }, section);
    return () => ctx.revert();
  }, [reduce]);

  const togglePause = useCallback(() => {
    const e = engineRef.current;
    if (!e) return;
    if (e.paused) { e.start(); setPaused(false); } else { e.pause(); setPaused(true); }
  }, []);
  const skip = useCallback(() => {
    engineRef.current?.skipToEnd();
    storage("session").set("bb-hero", "1");
    setMode("final");
  }, []);
  const replay = useCallback(() => {
    const e = engineRef.current;
    if (!e) return;
    setMode("playing");
    setPaused(false);
    e.replay();
  }, []);

  const final = mode === "final" || mode === "still" || mode === "fallback" || phase >= 5;
  const lines = t.hero.lines;

  return (
    <section ref={section} id="start" data-anchor="start" className="relative h-[165svh] min-h-[960px] bg-carvao" aria-labelledby="hero-title">
      <div ref={stage} className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden">
        {mode !== "fallback" && (
          <canvas
            ref={canvas}
            className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}
            role="img"
            aria-label={t.hero.sceneLabel}
            style={{ touchAction: "pan-y" }}
          />
        )}
        {(mode === "fallback" || !ready) && (
          <picture>
            <source media="(max-aspect-ratio: 1/1)" srcSet={asset("/poster/hero-tall-720.webp")} />
            <img
              src={asset("/poster/hero-1600.webp")}
              srcSet={`${asset("/poster/hero-960.webp")} 960w, ${asset("/poster/hero-1600.webp")} 1600w`}
              sizes="100vw"
              alt={mode === "fallback" ? t.hero.stillLabel : ""}
              className={cn("absolute inset-0 h-full w-full object-cover", mode !== "fallback" && "opacity-0")}
            />
          </picture>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,9,8,0.72)_0%,rgba(12,9,8,0.25)_42%,rgba(12,9,8,0)_65%)] max-md:bg-[linear-gradient(180deg,rgba(12,9,8,0.78)_0%,rgba(12,9,8,0.2)_38%,rgba(12,9,8,0)_60%,rgba(12,9,8,0.7)_100%)]" />

        {/* copy */}
        <div className="gutter relative flex h-full flex-col justify-between pb-8 pt-[calc(var(--header-h)+40px)] max-md:pt-[calc(var(--header-h)+24px)]">
          <div className="wrap" data-hero-copy>
            <p className="kicker text-ouro" data-lang-stagger>{t.hero.kicker}</p>
            <h1 id="hero-title" className="mt-2 max-w-[22ch] font-display text-[clamp(1.05rem,1.4vw,1.25rem)] font-semibold text-creme/85">{t.hero.h1}</h1>
            <div className="mt-6 max-w-[min(48rem,100%)]" aria-hidden={!final}>
              <p className="sr-only">{lines.join(" ")}</p>
              <div aria-hidden="true" className="display text-[clamp(3.6rem,9.2vw,9.6rem)] text-creme">
                {lines.map((l, i) => (
                  <span key={`${l}-${i}`} className="line-mask">
                    <motion.span
                      className={cn("block", i === 1 && "text-brasa", i === 2 && "serif-i normal-case text-ouro text-[0.82em]")}
                      initial={false}
                      animate={final ? { transform: "translateY(0%)", opacity: 1 } : { transform: "translateY(105%)", opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 1.0, delay: reduce ? 0 : 0.25 + i * 0.14, ease: EASE_OUT }}
                    >
                      {l}
                    </motion.span>
                  </span>
                ))}
              </div>
              <AnimatePresence>
                {final && (
                  <motion.div
                    className="pointer-events-auto mt-7 flex flex-col gap-6"
                    initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ duration: 0.8, delay: reduce ? 0 : 0.85, ease: EASE_OUT }}
                  >
                    <p className="lead measure max-w-[34rem] text-creme/85">{t.hero.lead}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button type="button" className="pill" onClick={() => openBooking()}>{t.cta.reserveNow}</button>
                      <a href={href("preise")} onClick={(e) => { e.preventDefault(); go("preise"); }} className="pill pill-ghost text-creme">{t.cta.pricesFaq}</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="wrap pointer-events-auto flex flex-wrap items-end justify-between gap-4">
            {/* sequence controls */}
            {mode !== "fallback" && mode !== "still" && (
              <div className="glass flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4">
                {mode === "playing" ? (
                  <>
                    <button type="button" className="icon-btn h-10 w-10" onClick={togglePause} aria-label={paused ? t.a11y.play : t.a11y.pause}>
                      {paused ? <IconPlay size={18} /> : <IconPause size={18} />}
                    </button>
                    <ol className="hidden items-center gap-3 sm:flex" aria-label={t.hero.phasesLabel}>
                      {t.hero.phases.map((p, i) => (
                        <li key={p} aria-current={i === phase ? "step" : undefined} className={cn("kicker text-[0.64rem] transition-colors duration-300", i === phase ? "text-ouro" : i < phase ? "text-creme/70" : "text-creme/30")}>
                          {p}
                        </li>
                      ))}
                    </ol>
                    <span className="relative ml-1 h-[2px] w-16 overflow-hidden rounded bg-creme/15 sm:hidden" aria-hidden="true">
                      <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-ouro" />
                    </span>
                    <button type="button" className="kicker ml-2 text-[0.64rem] text-creme/70 underline-offset-4 hover:text-creme hover:underline" onClick={skip}>
                      {t.hero.skipSequence}
                    </button>
                  </>
                ) : (
                  <button type="button" className="flex items-center gap-2 py-1 pl-1 text-creme" onClick={replay}>
                    <span className="icon-btn h-10 w-10 bg-brasa text-carvao"><IconReplay size={18} /></span>
                    <span className="kicker text-[0.7rem]">{t.hero.replay}</span>
                  </button>
                )}
              </div>
            )}
            <div className="flex items-center gap-4">
              <p className="hidden text-[0.72rem] text-creme/70 md:block">{t.hero.note}</p>
              <a href="#rodizio" onClick={(e) => { e.preventDefault(); go("home", { anchor: "rodizio" }); }} className="kicker flex items-center gap-2 text-[0.68rem] text-creme/70 hover:text-creme">
                {t.hero.scroll}
                <motion.span animate={reduce ? undefined : { transform: ["translateY(0px)", "translateY(5px)", "translateY(0px)"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                  <IconArrowDown size={16} />
                </motion.span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
