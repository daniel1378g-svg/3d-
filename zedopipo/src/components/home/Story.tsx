import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { HTML_LANG, UI } from "@/i18n";
import { SIGNATURE, STORY } from "@/copy";
import { logo } from "@/content";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { gpuWebGL } from "@/lib/webgl";

/**
 * Notre histoire (#a-propos, the old "Infos" anchor). The words light up as the text scrolls by,
 * the year counts up to 1989, Maria & José sign, and the logo coin can be spun.
 */
export function Story() {
  const { lang } = useSite();
  const text = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = text.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll(".sw"),
        { opacity: 0.18 },
        { opacity: 1, ease: "none", stagger: 0.04, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: 0.5 } },
      );
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <section id="a-propos" aria-labelledby="story-title" className="on-dark tex-grill gutter relative overflow-hidden bg-charcoal py-24 text-linen md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+var(--label-h)+32px)] lg:self-start">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Zé-do-Pipo
          </p>
          <h2 id="story-title" className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.95]">
            {UI.storyTitle[lang]}
          </h2>
          <YearCounter />
          <Coin />
        </div>
        <div ref={text} lang={HTML_LANG[lang]}>
          {STORY[lang].map((p, i) => (
            <p key={`${lang}-${i}`} className={cn("text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.55] text-linen", i > 0 && "mt-7", i === 0 && "font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-[1.35]")}>
              {p.split(/(\s+)/).map((w, k) => (/\s/.test(w) ? w : <span key={k} className="sw">{w}</span>))}
            </p>
          ))}
          <Signature />
        </div>
      </div>
    </section>
  );
}

function YearCounter() {
  const { lang } = useSite();
  const ref = useRef<HTMLParagraphElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  useEffect(() => {
    if (!inView || !num.current) return;
    if (prefersReducedMotion()) return;
    const c = animate(1900, 1989, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => num.current && (num.current.textContent = String(Math.round(v))) });
    return () => c.stop();
  }, [inView]);
  return (
    <p ref={ref} className="mt-8 flex items-end gap-4">
      <span className="pb-3 text-sm font-bold uppercase tracking-[0.2em] text-gold">{UI.since[lang]}</span>
      <span className="sr-only">1989</span>
      <span ref={num} aria-hidden="true" className="font-display text-[clamp(4.5rem,12vw,9rem)] font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums text-ember">
        1989
      </span>
    </p>
  );
}

function Signature() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <p ref={ref} className="mt-12 font-hand text-[clamp(2.8rem,6vw,4.5rem)] font-semibold leading-none text-gold">
      <span className="sr-only">{SIGNATURE}</span>
      <span aria-hidden="true" className="relative inline-block">
        {[...SIGNATURE].map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            initial={reduce ? false : { opacity: 0, transform: "translateY(0.25em) rotate(-8deg)" }}
            animate={inView || reduce ? { opacity: 1, transform: "translateY(0em) rotate(0deg)" } : undefined}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.075, ease: [0.16, 1, 0.3, 1] }}
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-gold/70"
          initial={reduce ? false : { transform: "scaleX(0)" }}
          animate={inView || reduce ? { transform: "scaleX(1)" } : undefined}
          transition={{ duration: 0.6, delay: 0.25 + SIGNATURE.length * 0.075, ease: [0.65, 0, 0.35, 1] }}
        />
      </span>
    </p>
  );
}

/** The 3D logo coin (three.js, loaded when it nears the screen). Without WebGL: the flat logo. */
function Coin() {
  const { lang } = useSite();
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{ nudge: (d: number) => void; dispose: () => void } | null>(null);
  const near = useInView(box, { once: true, margin: "300px 0px" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!near || !canvas.current) return;
    let cancelled = false;
    (async () => {
      if (!gpuWebGL()) return;
      const { createCoin } = await import("../coin/engine");
      if (cancelled || !canvas.current) return;
      try {
        engine.current = createCoin(canvas.current, { still: prefersReducedMotion(), texture: logo(), onFirstFrame: () => setReady(true) });
      } catch {
        /* keep the flat logo */
      }
    })();
    return () => {
      cancelled = true;
      engine.current?.dispose();
      engine.current = null;
    };
  }, [near]);

  return (
    <div className="mt-10 flex flex-col items-start gap-4">
      <div
        ref={box}
        role="group"
        tabIndex={0}
        aria-label={UI.coinLabel[lang]}
        data-cursor="drag"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            engine.current?.nudge(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
        className="relative aspect-square w-[min(78vw,340px)] cursor-grab touch-none rounded-full active:cursor-grabbing"
      >
        <img src={logo()} alt="" loading="lazy" className={cn("absolute inset-[9%] rounded-full shadow-[0_30px_60px_-30px_rgba(224,97,43,0.6)] transition-opacity duration-500", ready && "opacity-0")} />
        <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")} />
      </div>
      <button
        type="button"
        onClick={() => engine.current?.nudge(1)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-linen/30 px-4 text-sm font-bold text-linen hover:border-gold hover:text-gold"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4" />
        </svg>
        {UI.spin[lang]}
      </button>
    </div>
  );
}
