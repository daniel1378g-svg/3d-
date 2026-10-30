// The hero: a live ember bed (emberField.ts) under huge type, with the food cut-outs of the restaurant's site
// floating over the heat. Mouse: the coals flare under the pointer and the food drifts with it in depth. Touch or
// click: a pulse of heat runs through the coals; tapping a cut-out tosses it. With nobody pointing, the heat wanders
// on its own. Scrolling dims the fire and lifts the words away. Reduced motion: one still frame, nothing floats.
// Without WebGL 2: a painted ember gradient.
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isCoarse } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Img } from "../Img";
import { OpenBadge } from "../OpenBadge";
import { IconArrow, IconArrowDown, IconPause, IconPlay } from "../icons";
import { startEmberField, type EmberField } from "./emberField";
import { URLS } from "@/content/facts";

/** cut-outs: position (% of the hero), size, depth (parallax strength), resting tilt */
const FLOATERS = [
  { id: "cutout-picanha", x: 76, y: 30, w: "clamp(120px,15vw,216px)", depth: 1, rot: -8, cls: "" },
  { id: "cutout-coxinha", x: 9, y: 66, w: "clamp(86px,10vw,166px)", depth: 0.6, rot: 10, cls: "max-sm:top-[74%]" },
  { id: "cutout-pudim", x: 84, y: 72, w: "clamp(96px,11vw,200px)", depth: 0.8, rot: 4, cls: "" },
  { id: "cutout-bier", x: 14, y: 20, w: "clamp(70px,8vw,150px)", depth: 0.35, rot: -12, cls: "max-sm:hidden" },
] as const;

export function Hero() {
  const { t, introDone, reduce, openBooking, go, href } = useSite();
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const field = useRef<EmberField | null>(null);
  const floaters = useRef<(HTMLButtonElement | null)[]>([]);
  const [webgl, setWebgl] = useState(true);
  const [paused, setPaused] = useState(false);
  const [touch] = useState(() => isCoarse());

  // the fire
  useEffect(() => {
    if (!canvas.current) return;
    const f = startEmberField(canvas.current, { lowPower: isCoarse() || (navigator.hardwareConcurrency ?? 8) <= 4 });
    if (!f) { setWebgl(false); return; }
    field.current = f;
    if (reduce) { f.setPaused(true); f.pointer(0.62, 0.22, 0.5); f.still(12.3); }
    const io = new IntersectionObserver(([e]) => f.setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(root.current!);
    const onVis = () => f.setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); f.stop(); field.current = null; };
  }, [reduce]);

  useEffect(() => { field.current?.setPaused(paused || reduce); }, [paused, reduce]);

  // pointer, idle wander and the floating food (one rAF loop writing transforms)
  useEffect(() => {
    const el = root.current!;
    let px = 0.5, py = 0.4, sx = 0.5, sy = 0.4, lastMove = -1e9, raf = 0, active = true;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      lastMove = performance.now();
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      lastMove = performance.now();
      field.current?.pulse(px, 1 - py);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!active) return;
      const idle = now - lastMove > 2500;
      const tx = idle ? 0.5 + Math.sin(now / 3100) * 0.32 : px;
      const ty = idle ? 0.72 + Math.sin(now / 2300) * 0.08 : py;
      sx += (tx - sx) * 0.06;
      sy += (ty - sy) * 0.06;
      field.current?.pointer(sx, 1 - sy, idle ? 0.55 : 1);
      if (reduce) return;
      const ox = (sx - 0.5) * 2, oy = (sy - 0.5) * 2;
      floaters.current.forEach((n, i) => {
        if (!n) return;
        const f = FLOATERS[i];
        const bob = Math.sin(now / 1000 * (0.7 + i * 0.13) + i * 1.7) * 10;
        n.style.transform = `translate3d(${-ox * 28 * f.depth}px, ${-oy * 20 * f.depth + bob}px, 0) rotate(${f.rot + ox * 6 * f.depth}deg)`;
      });
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerdown", onDown); };
  }, [reduce]);

  // entrance after the intro, and the scroll exit
  useEffect(() => {
    if (!introDone) return;
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(q("[data-word] > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.035, ease: "expo.out", delay: 0.05 });
        gsap.fromTo(q("[data-rise]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "expo.out", delay: 0.45 });
        gsap.fromTo(q("[data-float-wrap]"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, stagger: 0.09, ease: "back.out(1.6)", delay: 0.35 });
      }
      ScrollTrigger.create({
        trigger: el, start: "top top", end: "bottom top", scrub: true,
        onUpdate: (s) => {
          field.current?.setFade(1 - s.progress * 0.75);
          if (!reduce) gsap.set(q("[data-hero-copy]"), { y: s.progress * -120, opacity: 1 - s.progress * 1.4 });
        },
      });
    }, el);
    return () => ctx.revert();
  }, [introDone, reduce]);

  const toss = (i: number) => {
    const n = floaters.current[i]?.firstElementChild as HTMLElement | null;
    if (!n || reduce) return;
    n.animate(
      [{ transform: "translateY(0) rotate(0) scale(1)" }, { transform: "translateY(-46px) rotate(200deg) scale(1.08)", offset: 0.45 }, { transform: "translateY(0) rotate(360deg) scale(1)" }],
      { duration: 900, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );
    const b = floaters.current[i]!.getBoundingClientRect();
    const r = root.current!.getBoundingClientRect();
    field.current?.pulse((b.left + b.width / 2 - r.left) / r.width, 1 - (b.bottom - r.top) / r.height);
  };

  const word = (w: string, cls?: string) => (
    <span data-word className={cn("line-mask", cls)} aria-hidden="true">
      <span className="flex">{w.split("").map((c, i) => <span key={i} className="inline-block">{c}</span>)}</span>
    </span>
  );

  return (
    <section
      ref={root}
      id="start"
      data-anchor="start"
      className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-carvao text-creme [touch-action:pan-y]"
      style={{ height: "calc(100svh - var(--label-h))" }}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_50%_100%,#c2410c_0%,#7c1d0a_28%,#2a0d07_55%,#0b0706_80%)]" aria-hidden="true" />
      {webgl && <canvas ref={canvas} className="absolute inset-0 -z-10 h-full w-full" role="img" aria-label={t.hero.bgLabel} />}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[45%] bg-gradient-to-b from-carvao/90 to-transparent" aria-hidden="true" />

      {/* floating food from the restaurant's site */}
      {FLOATERS.map((f, i) => (
        <div key={f.id} data-float-wrap className={cn("absolute z-0", f.cls)} style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.w, translate: "-50% -50%", opacity: reduce ? 1 : 0 }}>
          <button
            ref={(n) => { floaters.current[i] = n; }}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => toss(i)}
            className="block w-full cursor-grab will-change-transform active:cursor-grabbing"
            style={{ transform: `rotate(${f.rot}deg)` }}
          >
            <Img id={f.id} alt="" sizes="220px" fit="contain" className="w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)]" />
          </button>
        </div>
      ))}

      <div data-hero-copy className="gutter relative z-10 w-full pb-[clamp(28px,6vh,72px)]">
        <div className="wrap">
          <p className="kicker text-ouro" data-rise data-lang-stagger>{t.hero.kicker}</p>
          <h1 id="hero-title" aria-label={t.hero.h1} className="mt-3">
            {word("PICANHA", "display text-[clamp(4.2rem,17vw,17rem)] leading-[0.82] text-creme")}
            {word("BRASIL", "display -mt-[0.04em] text-[clamp(4.2rem,17vw,17rem)] leading-[0.82] text-transparent [-webkit-text-stroke:2px_var(--color-ouro)]")}
          </h1>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="display-wide text-[clamp(1rem,2vw,1.5rem)] text-brasa-2" data-rise>{t.hero.lines.join(" ")}</p>
              <p className="lead mt-3 max-w-[40rem] text-creme/85" data-rise>{t.hero.lead}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3" data-rise>
                <button type="button" className="pill" onClick={() => openBooking()}>{t.cta.reserve}<IconArrow size={17} className="arrow" /></button>
                <a className="pill pill-gold" href={URLS.order} target="_blank" rel="noopener">{t.cta.order}<span className="sr-only"> {t.a11y.newTab}</span></a>
                <a className="pill pill-ghost text-creme" href={href("karte")} onClick={(e) => { e.preventDefault(); go("karte"); }}>{t.cta.menu}</a>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end" data-rise>
              <OpenBadge className="glass" />
              <div className="flex items-center gap-2">
                {!reduce && webgl && (
                  <button type="button" className="icon-btn h-11 w-11" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? t.a11y.play : t.a11y.pause}>
                    {paused ? <IconPlay size={18} /> : <IconPause size={18} />}
                  </button>
                )}
                {!reduce && webgl && <span className="text-sm text-creme/70">{touch ? t.hero.interactTouch : t.hero.interact}</span>}
              </div>
            </div>
          </div>
          <a href="#prato" onClick={(e) => { e.preventDefault(); go("home", { anchor: "prato" }); }} className="kicker mt-8 hidden items-center gap-2 text-creme/70 md:inline-flex">
            <IconArrowDown size={16} className="motion-safe:animate-bounce" />{t.hero.scroll}
          </a>
        </div>
      </div>
    </section>
  );
}
