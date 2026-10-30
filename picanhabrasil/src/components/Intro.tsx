// First-visit intro (once per session, home only): embers in the dark, the badge glows up, PICANHA BRASIL rises
// letter by letter, then a window in the shape of the badge's flag rhombus grows out of the logo and opens onto the
// hero. "Intro überspringen", Escape or a click skip it. Reduced motion: the logo, briefly, then a fade.
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSite } from "@/site";
import { diamondMaskUrl } from "@/brand/diamond";
import { asset } from "@/lib/utils";

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
      // reduced motion: no cinematic sequence at all
      tl.set(el, { opacity: 0 });
    } else {
      // 1.9 s in total: badge 0–0.55, name 0.15–0.75, exit through the diamond 1.05–1.9
      el.style.setProperty("--ms", "0px");
      tl.fromTo(q("[data-badge]"), { opacity: 0, scale: 0.86, rotate: -6, filter: "brightness(0.3) drop-shadow(0 0 22px rgba(255,140,50,0.9))" },
          { opacity: 1, scale: 1, rotate: 0, filter: "brightness(1) drop-shadow(0 0 12px rgba(255,190,80,0.3))", duration: 0.55, ease: "power2.out" }, 0)
        .fromTo(q("[data-letter]"), { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.018, ease: "expo.out" }, 0.15)
        .fromTo(q("[data-tag]"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" }, 0.45)
        .addLabel("exit", 1.05)
        .to(q("[data-letter], [data-tag]"), { yPercent: -60, opacity: 0, duration: 0.3, stagger: 0.008, ease: "power3.in" }, "exit")
        .to(q("[data-badge]"), { scale: 2.6, opacity: 0, duration: 0.6, ease: "power3.in" }, "exit+=0.05")
        .to(el, { "--ms": `${Math.max(window.innerWidth, window.innerHeight) * 5}px`, duration: 0.7, ease: "power3.in" }, "exit+=0.1")
        .to(el, { opacity: 0, duration: 0.15 }, "exit+=0.7");
    }
    const skip = () => {
      if (reduce || tl.time() >= tl.labels.exit) return;
      tl.seek("exit");
      tl.timeScale(1.5);
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

  const words = ["PICANHA", "BRASIL"];
  return (
    <div
      ref={root}
      className="intro fixed inset-0 z-[950] grid place-items-center bg-[radial-gradient(90%_70%_at_50%_45%,#16301f_0%,#0a0f0b_55%,#060504_100%)] text-creme"
      style={{ top: "var(--label-h)" }}
      data-intro
    >
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <img data-badge src={asset("/brand/logo.webp")} alt="" width={297} height={270} className="h-[clamp(110px,24vmin,220px)] w-auto opacity-0" draggable={false} />
        <p className="display flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden text-[clamp(3rem,11vw,8.6rem)] leading-[0.9] text-creme" aria-label="Picanha Brasil">
          {words.map((w, k) => (
            <span key={w} className={k ? "flex text-ouro" : "flex"}>
              {w.split("").map((l, i) => <span key={i} data-letter className="inline-block opacity-0" aria-hidden="true">{l}</span>)}
            </span>
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
          -webkit-mask-image: ${diamondMaskUrl}, linear-gradient(#000, #000);
          mask-image: ${diamondMaskUrl}, linear-gradient(#000, #000);
          -webkit-mask-size: var(--ms, 0px) auto, 100% 100%;
          mask-size: var(--ms, 0px) auto, 100% 100%;
          -webkit-mask-position: 50% 38%, 0 0;
          mask-position: 50% 38%, 0 0;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>
    </div>
  );
}
