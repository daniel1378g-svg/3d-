// The hero: a living açaí surface (acaiField.ts) under huge MANNA AÇAÍ type, with Manna's own product photos
// floating over it as rounded cards and bowls. Mouse: the surface swirls after the pointer and the photos drift in
// depth. Tap or click: a soft ripple. Nobody pointing: the swirl wanders by itself. Scrolling calms and darkens the
// surface. Reduced motion: one still frame, nothing floats. Without WebGL 2: a painted gradient. The title and the
// buttons are plain HTML and never wait for the graphics.
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isCoarse } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Img } from "../Img";
import { IconArrow, IconArrowDown, IconPause, IconPin, IconPlay } from "../icons";
import { startAcaiField, type AcaiField } from "./acaiField";

/** the floating photos: position (% of the hero), width, shape, depth (parallax), resting tilt */
const FLOATERS = [
  { id: "acai-becher-layers", x: 80, y: 40, w: "clamp(150px,17vw,250px)", shape: "rounded-[44px] aspect-[3/4]", depth: 1, rot: 6, cls: "max-sm:hidden" },
  { id: "acai-bowl-blueberries", x: 63, y: 21, w: "clamp(110px,12vw,190px)", shape: "rounded-full aspect-square", depth: 0.6, rot: -8, cls: "max-md:hidden" },
  { id: "mango-bowl", x: 93, y: 74, w: "clamp(100px,11vw,170px)", shape: "rounded-full aspect-square", depth: 0.8, rot: 10, cls: "max-md:hidden" },
  { id: "caldo-de-cana", x: 65, y: 70, w: "clamp(90px,9vw,150px)", shape: "rounded-[30px] aspect-[3/4]", depth: 0.45, rot: -5, cls: "max-lg:hidden" },
] as const;
/** on phones the cup sits beside the title instead, so it never covers the text whatever the screen height */
const PHONE_CUP = { id: "acai-becher-layers", shape: "rounded-[36px] aspect-[3/4]", depth: 0.3, rot: 7 } as const;

export function Hero() {
  const { t, introDone, reduce, go, href } = useSite();
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const field = useRef<AcaiField | null>(null);
  const floaters = useRef<(HTMLButtonElement | null)[]>([]);
  const [webgl, setWebgl] = useState(true);
  const [paused, setPaused] = useState(false);
  const [touch] = useState(() => isCoarse());

  useEffect(() => {
    if (!canvas.current) return;
    const f = startAcaiField(canvas.current, { lowPower: isCoarse() || (navigator.hardwareConcurrency ?? 8) <= 4 });
    if (!f) { setWebgl(false); return; }
    field.current = f;
    if (reduce) { f.setPaused(true); f.pointer(0.7, 0.5, 0.6); f.still(21.7); }
    const io = new IntersectionObserver(([e]) => f.setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(root.current!);
    const onVis = () => f.setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); f.stop(); field.current = null; };
  }, [reduce]);

  useEffect(() => { field.current?.setPaused(paused || reduce); }, [paused, reduce]);

  // pointer, idle wander and the floating photos: one rAF loop writing transforms directly (no React state per frame)
  useEffect(() => {
    const el = root.current!;
    let px = 0.7, py = 0.45, sx = 0.7, sy = 0.45, lastMove = -1e9, raf = 0, active = true;
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
      field.current?.ripple(px, 1 - py);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!active) return;
      const idle = now - lastMove > 2500;
      const tx = idle ? 0.62 + Math.sin(now / 4200) * 0.25 : px;
      const ty = idle ? 0.5 + Math.sin(now / 3100) * 0.2 : py;
      sx += (tx - sx) * 0.05;
      sy += (ty - sy) * 0.05;
      field.current?.pointer(sx, 1 - sy, idle ? 0.45 : 1);
      if (reduce) return;
      const ox = (sx - 0.5) * 2, oy = (sy - 0.5) * 2;
      floaters.current.forEach((n, i) => {
        if (!n) return;
        const f = FLOATERS[i] ?? PHONE_CUP;
        const bob = Math.sin((now / 1000) * (0.6 + i * 0.12) + i * 1.9) * 9;
        n.style.transform = `translate3d(${-ox * 26 * f.depth}px, ${-oy * 18 * f.depth + bob}px, 0) rotate(${f.rot + ox * 5 * f.depth}deg)`;
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
        gsap.fromTo(q("[data-word] > span > span"), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.04, ease: "expo.out", delay: 0.05 });
        gsap.fromTo(q("[data-rise]"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "expo.out", delay: 0.35 });
        gsap.fromTo(q("[data-float-wrap]"), { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.08, ease: "expo.out", delay: 0.3 });
      }
      ScrollTrigger.create({
        trigger: el, start: "top top", end: "bottom top", scrub: true,
        onUpdate: (s) => {
          field.current?.setFade(1 - s.progress * 0.6);
          if (!reduce) gsap.set(q("[data-hero-copy]"), { y: s.progress * -100, opacity: 1 - s.progress * 1.3 });
        },
      });
    }, el);
    return () => ctx.revert();
  }, [introDone, reduce]);

  // a tapped photo does a small, springy hop (WAAPI, transform only) and sends a ripple from where it sits
  const hop = (i: number) => {
    const wrap = floaters.current[i];
    const n = wrap?.firstElementChild as HTMLElement | null;
    if (!n || !wrap || reduce) return;
    n.animate(
      [{ transform: "translateY(0) scale(1)" }, { transform: "translateY(-22px) scale(1.04)", offset: 0.4 }, { transform: "translateY(0) scale(1)" }],
      { duration: 600, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );
    const b = wrap.getBoundingClientRect();
    const r = root.current!.getBoundingClientRect();
    field.current?.ripple((b.left + b.width / 2 - r.left) / r.width, 1 - (b.top + b.height / 2 - r.top) / r.height);
  };

  const word = (w: string, cls: string) => (
    <span data-word className={cn("block overflow-hidden pb-[0.04em]", cls)} aria-hidden="true">
      <span className="flex">{w.split("").map((c, i) => <span key={i} className="inline-block">{c}</span>)}</span>
    </span>
  );

  return (
    <section
      ref={root}
      id="start"
      data-anchor="start"
      className="relative isolate flex items-end overflow-hidden bg-acai text-cream [touch-action:pan-y]"
      style={{ minHeight: "max(640px, calc(100svh - var(--label-h)))" }}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_75%_40%,#84458b_0%,#63195c_35%,#3d1d43_62%,#241028_100%)]" aria-hidden="true" />
      {webgl && <canvas ref={canvas} className="absolute inset-0 -z-10 h-full w-full" role="img" aria-label={t.hero.bgLabel} />}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(85%_95%_at_16%_62%,rgba(36,16,40,0.8),transparent_72%)]" aria-hidden="true" />

      {FLOATERS.map((f, i) => (
        <div key={f.id} data-float-wrap className={cn("absolute z-0", f.cls)} style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.w, translate: "-50% -50%" }}>
          <button
            ref={(n) => { floaters.current[i] = n; }}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => hop(i)}
            className="block w-full will-change-transform"
            style={{ transform: `rotate(${f.rot}deg)` }}
          >
            <span className={cn("block overflow-hidden shadow-[0_30px_60px_-20px_rgba(10,0,12,0.75)] ring-4 ring-cream/90", f.shape)}>
              <Img id={f.id} alt="" sizes="260px" priority={i === 0} className="h-full w-full" />
            </span>
          </button>
        </div>
      ))}

      <div data-hero-copy className="gutter relative z-10 w-full pb-[clamp(28px,6vh,72px)] pt-[calc(var(--header-h)+28px)]">
        <div className="wrap">
          <p className="kicker text-lilac" data-rise data-lang-stagger>{t.hero.kicker}</p>
          <div className="relative">
            <h1 id="hero-title" aria-label={t.hero.h1} className="mt-3">
              {word("MANNA", "display text-[clamp(4.4rem,min(16vw,21vh),16rem)] text-cream")}
              {word("AÇAÍ", "display -mt-[0.06em] text-[clamp(4.4rem,min(16vw,21vh),16rem)] text-lime")}
            </h1>
            <div data-float-wrap className="absolute right-[2%] top-1/2 w-[clamp(88px,25vw,128px)] sm:hidden" style={{ translate: "0 -50%" }}>
              <button
                ref={(n) => { floaters.current[FLOATERS.length] = n; }}
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => hop(FLOATERS.length)}
                className="block w-full will-change-transform"
                style={{ transform: `rotate(${PHONE_CUP.rot}deg)` }}
              >
                <span className={cn("block overflow-hidden shadow-[0_24px_50px_-18px_rgba(10,0,12,0.75)] ring-4 ring-cream/90", PHONE_CUP.shape)}>
                  <Img id={PHONE_CUP.id} alt="" sizes="128px" className="h-full w-full" />
                </span>
              </button>
            </div>
          </div>
          <p className="serif-i mt-4 text-[clamp(1.8rem,3.6vw,3.2rem)] leading-none text-lilac" data-rise>{t.hero.claim}</p>
          <p className="lead mt-4 max-w-[38rem] text-cream/90" data-rise>{t.hero.lead}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3" data-rise>
            <a className="pill pill-lime" href={href("angebot")} onClick={(e) => { e.preventDefault(); go("angebot"); }}>{t.cta.explore}<IconArrow size={17} className="arrow" /></a>
            <a className="pill pill-cream" href={`${href("home")}#besuch`} onClick={(e) => { e.preventDefault(); go("home", { anchor: "besuch" }); }}><IconPin size={17} />{t.cta.findUs}</a>
            <a className="link-u px-2 py-3 font-semibold text-cream" href={`${href("home")}#becher`} onClick={(e) => { e.preventDefault(); go("home", { anchor: "becher" }); }}>{t.cta.discoverCup}</a>
          </div>
          <div className="mt-6 flex items-center gap-2" data-rise>
            {!reduce && webgl && (
              <button type="button" className="icon-btn h-11 w-11" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? t.a11y.play : t.a11y.pause}>
                {paused ? <IconPlay size={18} /> : <IconPause size={18} />}
              </button>
            )}
            {!reduce && webgl && <span className="glass rounded-full px-3 py-2 text-sm text-cream/90">{touch ? t.hero.interactTouch : t.hero.interact}</span>}
            <a href="#entdecken" onClick={(e) => { e.preventDefault(); go("home", { anchor: "entdecken" }); }} className="kicker ml-auto hidden items-center gap-2 text-cream/80 md:inline-flex">
              <IconArrowDown size={16} className="motion-safe:animate-bounce" />{t.hero.scroll}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
