// Language switch: (1) the page dims, (2) the bull leaves the header and crosses to the centre, (3) its silhouette
// swells into a full-screen wine-red curtain, (4) the old page disappears beneath it, (5) the language changes
// behind it (the Shell swaps dictionary and address and restores the scroll position), (6) "Willkommen" /
// "Bem-vindos" / … appears and the bull slides on across the screen, (7) the curtain wipes away after it and the
// visible content rises back in a short stagger, (8) rest. Reduced motion: a quick crossfade.
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { WELCOME, type Lang } from "@/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { BULL_OUTLINE, BULL_VIEWBOX } from "@/brand/bull";
import { bullMaskUrl } from "./Intro";

export type LanguageTransitionHandle = { cover: (next: Lang) => Promise<void>; reveal: () => Promise<void> };

const play = (tl: gsap.core.Timeline) => new Promise<void>((res) => { tl.eventCallback("onComplete", () => res()); tl.play(); });

export const LanguageTransition = forwardRef<LanguageTransitionHandle>(function LanguageTransition(_, ref) {
  const root = useRef<HTMLDivElement>(null);
  const dim = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const bull = useRef<SVGSVGElement>(null);
  const word = useRef<HTMLParagraphElement>(null);
  const [next, setNext] = useState<Lang>("de");

  useImperativeHandle(ref, () => ({
    async cover(lang) {
      setNext(lang);
      const el = root.current!;
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";
      const reduce = prefersReducedMotion();
      gsap.set(word.current, { opacity: 0 });
      if (reduce) {
        gsap.set(curtain.current, { "--cs": `${Math.max(window.innerWidth, window.innerHeight) * 7}px`, clipPath: "inset(0 0 0 0)", opacity: 0 });
        gsap.set(bull.current, { opacity: 0 });
        await play(gsap.timeline({ paused: true }).to(curtain.current, { opacity: 1, duration: 0.22, ease: "power1.out" }));
        return;
      }
      // where the header's bull is (the left fifth of the logo image)
      // the header shows the full logo, or the bull alone on narrow phones: start from whichever is visible
      const logo = Array.from(document.querySelectorAll<Element>("[data-header-logo] img, [data-header-logo] svg")).find((e) => e.getBoundingClientRect().width > 0);
      const r = logo?.getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      const startW = r ? r.height * 0.95 : 48;
      const sx = r ? r.left + startW * 0.5 : 60;
      const sy = r ? r.top + r.height / 2 : 60;
      const size = Math.min(vw, vh) * 0.24;
      gsap.set(curtain.current, { opacity: 1, clipPath: "inset(0 0 0 0)", "--cs": `${startW}px`, "--cx": `${sx}px`, "--cy": `${sy}px` });
      gsap.set(bull.current, { opacity: 1, x: sx - size / 2, y: sy - size / 2, width: size, height: size, scale: startW / size, rotate: -8, transformOrigin: "50% 50%" });
      const cx = vw / 2 - size / 2, cy = vh * 0.42 - size / 2;
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(dim.current, { opacity: 0 }, { opacity: 0.45, duration: 0.3, ease: "power1.out" }, 0)
        .to(bull.current, { x: cx, duration: 0.75, ease: "power3.inOut" }, 0.05)
        .to(bull.current, { y: cy - vh * 0.06, duration: 0.42, ease: "power2.out" }, 0.05)
        .to(bull.current, { y: cy, duration: 0.33, ease: "power2.in" }, 0.47)
        .to(bull.current, { scale: 1, rotate: 0, duration: 0.75, ease: "power3.inOut" }, 0.05)
        .to(curtain.current, { "--cx": `${vw / 2}px`, "--cy": `${vh * 0.42}px`, duration: 0.75, ease: "power3.inOut" }, 0.05)
        .to(curtain.current, { "--cs": `${size * 0.9}px`, duration: 0.6, ease: "power2.inOut" }, 0.1)
        .to(curtain.current, { "--cs": `${Math.max(vw, vh) * 7}px`, duration: 0.55, ease: "power3.in" }, 0.68);
      await play(tl);
      gsap.set(dim.current, { opacity: 0 });
    },
    async reveal() {
      const el = root.current!;
      const reduce = prefersReducedMotion();
      const done = () => {
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
        gsap.set([curtain.current, bull.current, word.current, dim.current], { clearProps: "opacity,clipPath" });
      };
      if (reduce) {
        await play(gsap.timeline({ paused: true }).to(curtain.current, { opacity: 0, duration: 0.25, ease: "power1.out" }));
        done();
        return;
      }
      const vw = window.innerWidth;
      const letters = word.current?.querySelectorAll("[data-l]") ?? [];
      const tl = gsap.timeline({ paused: true });
      tl.set(word.current, { opacity: 1 })
        .fromTo(letters, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.025, ease: "expo.out" }, 0)
        .to(bull.current, { x: `+=${vw * 0.75}`, rotate: 10, duration: 0.85, ease: "power3.in" }, 0.35)
        .to(letters, { yPercent: -100, opacity: 0, duration: 0.35, stagger: 0.015, ease: "power3.in" }, 0.55)
        .fromTo(curtain.current, { clipPath: "inset(0 0% 0 0%)" }, { clipPath: "inset(0 0% 0 100%)", duration: 0.7, ease: "power3.inOut" }, 0.62);
      // the content that is on screen rises back in, a little stagger
      const visible = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main [data-lang-stagger]"))
        .filter((n) => { const b = n.getBoundingClientRect(); return b.bottom > 0 && b.top < window.innerHeight; })
        .slice(0, 8);
      tl.fromTo(visible, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "expo.out", clearProps: "transform,opacity" }, 0.78);
      await play(tl);
      done();
    },
  }));

  const text = WELCOME[next];
  return (
    <div ref={root} className="lang-tx pointer-events-none fixed inset-0 z-[940]" style={{ visibility: "hidden", top: "var(--label-h)" }} aria-hidden="true">
      <div ref={dim} className="absolute inset-0 bg-black opacity-0" />
      <div ref={curtain} className="lang-curtain absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,#7a1a2c_0%,#4d0f1b_45%,#230609_100%)]" />
        <p ref={word} className="display absolute inset-x-0 top-[58%] flex justify-center overflow-hidden text-[clamp(3rem,11vw,9rem)] text-creme opacity-0" lang={next}>
          {text.split("").map((ch, i) => (
            <span key={`${next}-${i}`} data-l className="inline-block">{ch === " " ? " " : ch}</span>
          ))}
        </p>
      </div>
      <svg ref={bull} viewBox={BULL_VIEWBOX} className="absolute left-0 top-0 text-boi opacity-0" style={{ filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.45))" }}>
        <path d={BULL_OUTLINE} fill="currentColor" />
      </svg>
      <style>{`
        .lang-curtain {
          -webkit-mask-image: ${bullMaskUrl};
          mask-image: ${bullMaskUrl};
          -webkit-mask-size: var(--cs, 0px) auto;
          mask-size: var(--cs, 0px) auto;
          -webkit-mask-position: calc(var(--cx, 50vw) - var(--cs, 0px) / 2) calc(var(--cy, 42vh) - var(--cs, 0px) * 0.514);
          mask-position: calc(var(--cx, 50vw) - var(--cs, 0px) / 2) calc(var(--cy, 42vh) - var(--cs, 0px) * 0.514);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
});
