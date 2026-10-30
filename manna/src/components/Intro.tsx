// First-visit intro (once per session, home only, about 1.8 s): deep açaí, a lilac swirl draws itself around the
// Manna logo (the logo itself is never distorted), a few berries settle, then a round window – a berry – opens from
// the logo's centre onto the hero. "Intro überspringen", Escape or a click skip it; reduced motion shows no intro.
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSite } from "@/site";
import { asset } from "@/lib/utils";

export function Intro({ onDone }: { onDone: () => void }) {
  const { t, reduce } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = root.current!;
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    if (reduce) { finish(); return; }
    const q = gsap.utils.selector(el);
    const vmax = Math.max(window.innerWidth, window.innerHeight);
    el.style.setProperty("--r", "0px");
    const tl = gsap.timeline({ onComplete: finish });
    // 0–0.5 logo and swirl, 0.2–0.7 berries, exit 1.0–1.8 through a growing round window
    tl.fromTo(q("[data-logo]"), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" }, 0)
      .fromTo(q("[data-swirl]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.75, ease: "power2.out" }, 0.05)
      .fromTo(q("[data-berry]"), { opacity: 0, y: -18, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "expo.out" }, 0.2)
      .fromTo(q("[data-tag]"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }, 0.4)
      .addLabel("exit", 1.0)
      .to(q("[data-tag], [data-berry]"), { opacity: 0, duration: 0.2, ease: "power1.out" }, "exit")
      .to(q("[data-logo], [data-swirl-wrap]"), { opacity: 0, scale: 1.08, duration: 0.4, ease: "power2.in" }, "exit+=0.05")
      .to(el, { "--r": `${vmax * 0.9}px`, duration: 0.7, ease: "power3.in" }, "exit+=0.1");
    const skip = () => { if (tl.time() < tl.labels.exit) { tl.seek("exit"); tl.timeScale(1.6); } };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") skip(); };
    window.addEventListener("keydown", onKey);
    el.addEventListener("click", skip);
    (el as HTMLDivElement & { skip?: () => void }).skip = skip;
    return () => { window.removeEventListener("keydown", onKey); el.removeEventListener("click", skip); tl.kill(); };
  }, [onDone, reduce]);

  if (reduce) return null;
  return (
    <div ref={root} className="intro fixed inset-0 z-[950] grid place-items-center bg-[radial-gradient(80%_70%_at_50%_45%,#4a1245_0%,#2e1434_55%,#241028_100%)] text-cream" style={{ top: "var(--label-h)" }} data-intro>
      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <div className="relative grid place-items-center">
          <svg data-swirl-wrap viewBox="0 0 300 300" className="absolute h-[clamp(240px,46vmin,420px)] w-[clamp(240px,46vmin,420px)]" aria-hidden="true">
            <path data-swirl pathLength={1} strokeDasharray="1" d="M150 40 C 230 40 270 110 250 170 C 230 235 150 262 96 232 C 46 204 44 132 92 104 C 136 78 196 104 196 150 C 196 186 160 204 134 190" fill="none" stroke="#bf8bbe" strokeWidth="10" strokeLinecap="round" />
          </svg>
          <span className="relative grid h-[clamp(160px,30vmin,280px)] w-[clamp(160px,30vmin,280px)] place-items-center rounded-full bg-cream shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]" data-logo>
            <img src={asset("/brand/logo-320.webp")} alt="Manna Açaí" width={320} height={277} className="w-[74%]" />
          </span>
          {[["-left-6 top-6", "#84458b", 34], ["-right-4 top-14", "#63195c", 24], ["-bottom-2 left-10", "#bf8bbe", 20], ["bottom-4 -right-8", "#9ebc3a", 16]].map(([cls, c, s], i) => (
            <span key={i} data-berry aria-hidden="true" className={`absolute rounded-full ${cls}`} style={{ width: s as number, height: s as number, background: c as string, boxShadow: "inset -4px -4px 0 rgba(0,0,0,0.18)" }} />
          ))}
        </div>
        <p data-tag className="serif-i mt-2 text-[clamp(1.4rem,2.6vw,2rem)] text-lilac">{t.intro.tagline}</p>
        <p data-tag className="kicker text-cream/85">{t.intro.sub}</p>
      </div>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); (root.current as (HTMLDivElement & { skip?: () => void }) | null)?.skip?.(); }}
        className="pill pill-ghost pill-sm absolute bottom-[max(28px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-cream"
      >
        {t.intro.skip}
      </button>
      <style>{`
        .intro {
          -webkit-mask-image: radial-gradient(circle at 50% 46%, transparent var(--r, 0px), #000 calc(var(--r, 0px) + 1px));
          mask-image: radial-gradient(circle at 50% 46%, transparent var(--r, 0px), #000 calc(var(--r, 0px) + 1px));
        }
      `}</style>
    </div>
  );
}
