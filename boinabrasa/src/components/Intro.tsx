// First-visit intro (once per session, home only): embers in the dark, the bull glows from ember orange into the
// logo red, BOINABRASA rises letter by letter, then a bull-shaped window grows out of the logo and opens onto the
// hero. "Intro überspringen", Escape or a click skip it. Reduced motion: the logo, briefly, then a fade.
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSite } from "@/site";
import { BULL_OUTLINE, BULL_SILHOUETTE, BULL_VIEWBOX } from "@/brand/bull";

export const bullMaskUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='${BULL_VIEWBOX}'><path d='${BULL_SILHOUETTE}'/></svg>`)}")`;

function embers(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const resize = () => {
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
  };
  resize();
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 32;
  const s = sprite.getContext("2d")!;
  const g = s.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255,230,170,1)");
  g.addColorStop(0.25, "rgba(255,140,50,0.9)");
  g.addColorStop(1, "rgba(255,80,10,0)");
  s.fillStyle = g;
  s.fillRect(0, 0, 32, 32);
  const N = window.matchMedia("(pointer: coarse)").matches ? 45 : 90;
  const parts = Array.from({ length: N }, () => ({ x: Math.random(), y: 1 + Math.random() * 0.8, v: 0.0012 + Math.random() * 0.0026, s: 0.5 + Math.random() * 1.6, p: Math.random() * 6.28 }));
  let raf = 0;
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    for (const p of parts) {
      p.y -= p.v;
      if (p.y < -0.1) { p.y = 1.05; p.x = Math.random(); }
      const x = (p.x + Math.sin(now * 0.001 + p.p) * 0.012) * w;
      const y = p.y * h;
      const a = Math.min(1, (1 - p.y) * 2) * (0.55 + 0.45 * Math.sin(now * 0.008 + p.p * 5));
      ctx.globalAlpha = Math.max(0, a) * 0.9;
      const size = p.s * 9 * dpr;
      ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
    }
  };
  raf = requestAnimationFrame(tick);
  window.addEventListener("resize", resize);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}

export function Intro({ onDone }: { onDone: () => void }) {
  const { t, reduce } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = root.current!;
    const stopEmbers = reduce || !canvas.current ? () => {} : embers(canvas.current);
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ onComplete: finish });
    tlRef.current = tl;
    if (reduce) {
      tl.set(q("[data-letter], [data-tag], [data-bull]"), { opacity: 1 })
        .to(el, { opacity: 0, duration: 0.35, delay: 0.7, ease: "power1.out" });
    } else {
      el.style.setProperty("--ms", "0px");
      tl.fromTo(q("[data-bull]"), { opacity: 0, scale: 0.9, color: "#ff7a2e", filter: "drop-shadow(0 0 22px rgba(255,120,40,0.9))" },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" }, 0.15)
        .to(q("[data-bull]"), { color: "#df2127", filter: "drop-shadow(0 0 10px rgba(223,33,39,0.45))", duration: 0.9, ease: "sine.inOut" }, 0.85)
        .fromTo(q("[data-letter]"), { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.045, ease: "expo.out" }, 0.8)
        .fromTo(q("[data-tag]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }, 1.45)
        .addLabel("exit", 2.55)
        .to(q("[data-letter]"), { yPercent: -110, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power3.in" }, "exit")
        .to(q("[data-tag]"), { opacity: 0, duration: 0.3 }, "exit")
        .to(q("[data-bull]"), { scale: 3.2, opacity: 0, duration: 1.1, ease: "power3.in" }, "exit+=0.1")
        .to(el, { "--ms": `${Math.max(window.innerWidth, window.innerHeight) * 5}px`, duration: 1.25, ease: "power3.in" }, "exit+=0.18")
        .to(el, { opacity: 0, duration: 0.25 }, "exit+=1.25");
    }
    const skip = () => {
      if (reduce || tl.time() >= tl.labels.exit) return;
      tl.seek("exit");
      tl.timeScale(1.6);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") skip(); };
    window.addEventListener("keydown", onKey);
    el.addEventListener("click", skip);
    (el as HTMLDivElement & { skip?: () => void }).skip = skip;
    return () => {
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("click", skip);
      tl.kill();
      stopEmbers();
    };
  }, [onDone, reduce]);

  const letters = "BOINABRASA".split("");
  return (
    <div
      ref={root}
      className="intro fixed inset-0 z-[950] grid place-items-center bg-[#090605] text-creme"
      style={{ top: "var(--label-h)" }}
      data-intro
    >
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <svg data-bull viewBox={BULL_VIEWBOX} className="h-[clamp(110px,22vmin,210px)] w-auto opacity-0" style={{ color: "#ff7a2e" }} aria-hidden="true">
          <path d={BULL_OUTLINE} fill="currentColor" />
        </svg>
        <p className="display flex overflow-hidden text-[clamp(3.4rem,13vw,10rem)] leading-[0.9] text-creme" aria-label="Boinabrasa">
          {letters.map((l, i) => (
            <span key={i} data-letter className="inline-block opacity-0" aria-hidden="true">{l}</span>
          ))}
        </p>
        <p data-tag className="serif-i text-[clamp(1.3rem,2.4vw,1.9rem)] text-ouro opacity-0">{t.intro.tagline}</p>
        <p data-tag className="kicker text-creme/70 opacity-0">{t.intro.sub}</p>
      </div>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); (root.current as (HTMLDivElement & { skip?: () => void }) | null)?.skip?.(); }}
        className="pill pill-ghost pill-sm absolute bottom-[max(28px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-creme/80"
      >
        {t.intro.skip}
      </button>
      <style>{`
        .intro {
          -webkit-mask-image: ${bullMaskUrl}, linear-gradient(#000, #000);
          mask-image: ${bullMaskUrl}, linear-gradient(#000, #000);
          -webkit-mask-size: var(--ms, 0px) auto, 100% 100%;
          mask-size: var(--ms, 0px) auto, 100% 100%;
          -webkit-mask-position: 50% 42%, 0 0;
          mask-position: 50% 42%, 0 0;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>
    </div>
  );
}
