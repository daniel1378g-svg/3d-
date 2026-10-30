// Language switch: (1) the page dims, (2) the badge leaves the header and crosses to the centre, (3) the flag's
// rhombus swells out of it into a full-screen green curtain, (4) the old page disappears beneath it, (5) the language
// changes behind it (the Shell swaps dictionary and address and restores the scroll position), (6) "Willkommen" /
// "Bem-vindos" / … appears and the badge slides on across the screen, (7) the curtain wipes away after it and the
// visible content rises back in a short stagger, (8) rest. Reduced motion: a quick crossfade.
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { WELCOME, type Lang } from "@/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { DIAMOND_RATIO, diamondMaskUrl } from "@/brand/diamond";
import { asset } from "@/lib/utils";

export type LanguageTransitionHandle = { cover: (next: Lang) => Promise<void>; reveal: () => Promise<void> };

const play = (tl: gsap.core.Timeline) => new Promise<void>((res) => { tl.eventCallback("onComplete", () => res()); tl.play(); });

export const LanguageTransition = forwardRef<LanguageTransitionHandle>(function LanguageTransition(_, ref) {
  const root = useRef<HTMLDivElement>(null);
  const dim = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const bull = useRef<HTMLImageElement>(null);
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
        await play(gsap.timeline({ paused: true }).to(curtain.current, { opacity: 1, duration: 0.12, ease: "power1.out" }));
        return;
      }
      // start from the badge in the header
      const logo = document.querySelector<Element>("[data-header-logo] img");
      const r = logo?.getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      const startW = r ? r.width : 48;
      const sx = r ? r.left + r.width / 2 : 60;
      const sy = r ? r.top + r.height / 2 : 60;
      const size = Math.min(vw, vh) * 0.24;
      gsap.set(curtain.current, { opacity: 1, clipPath: "inset(0 0 0 0)", "--cs": `${startW}px`, "--cx": `${sx}px`, "--cy": `${sy}px` });
      gsap.set(bull.current, { opacity: 1, x: sx - size / 2, y: sy - size / 2, width: size, height: size, scale: startW / size, rotate: -8, transformOrigin: "50% 50%" });
      const cx = vw / 2 - size / 2, cy = vh * 0.42 - size / 2;
      const tl = gsap.timeline({ paused: true });
      // cover: 0.5 s
      tl.fromTo(dim.current, { opacity: 0 }, { opacity: 0.4, duration: 0.15, ease: "power1.out" }, 0)
        .to(bull.current, { x: cx, duration: 0.38, ease: "power3.inOut" }, 0)
        .to(bull.current, { y: cy - vh * 0.05, duration: 0.2, ease: "power2.out" }, 0)
        .to(bull.current, { y: cy, duration: 0.18, ease: "power2.in" }, 0.2)
        .to(bull.current, { scale: 1, rotate: 0, duration: 0.38, ease: "power3.inOut" }, 0)
        .to(curtain.current, { "--cx": `${vw / 2}px`, "--cy": `${vh * 0.42}px`, duration: 0.38, ease: "power3.inOut" }, 0)
        .to(curtain.current, { "--cs": `${size * 0.9}px`, duration: 0.3, ease: "power2.inOut" }, 0.02)
        .to(curtain.current, { "--cs": `${Math.max(vw, vh) * 7}px`, duration: 0.2, ease: "power3.in" }, 0.3);
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
        await play(gsap.timeline({ paused: true }).to(curtain.current, { opacity: 0, duration: 0.12, ease: "power1.out" }));
        done();
        return;
      }
      const vw = window.innerWidth;
      const letters = word.current?.querySelectorAll("[data-l]") ?? [];
      const tl = gsap.timeline({ paused: true });
      // reveal: 0.45 s, the content is usable as soon as the curtain has passed
      tl.set(word.current, { opacity: 1 })
        .fromTo(letters, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.2, stagger: 0.01, ease: "expo.out" }, 0)
        .to(bull.current, { x: `+=${vw * 0.75}`, rotate: 10, duration: 0.42, ease: "power3.in" }, 0.05)
        .to(letters, { yPercent: -100, opacity: 0, duration: 0.16, stagger: 0.006, ease: "power3.in" }, 0.16)
        .fromTo(curtain.current, { clipPath: "inset(0 0% 0 0%)" }, { clipPath: "inset(0 0% 0 100%)", duration: 0.32, ease: "power3.inOut" }, 0.13);
      // the content that is on screen rises back in, a little stagger
      const visible = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main [data-lang-stagger]"))
        .filter((n) => { const b = n.getBoundingClientRect(); return b.bottom > 0 && b.top < window.innerHeight; })
        .slice(0, 8);
      gsap.fromTo(visible, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: "expo.out", delay: 0.22, clearProps: "transform,opacity" });
      await play(tl);
      done();
    },
  }));

  const text = WELCOME[next];
  return (
    <div ref={root} className="lang-tx pointer-events-none fixed inset-0 z-[940]" style={{ visibility: "hidden", top: "var(--label-h)" }} aria-hidden="true">
      <div ref={dim} className="absolute inset-0 bg-black opacity-0" />
      <div ref={curtain} className="lang-curtain absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,#1d7a45_0%,#0f4a2b_45%,#06200f_100%)]" />
        <p ref={word} className="display absolute inset-x-0 top-[58%] flex justify-center overflow-hidden text-[clamp(3rem,11vw,9rem)] text-creme opacity-0" lang={next}>
          {text.split("").map((ch, i) => (
            <span key={`${next}-${i}`} data-l className="inline-block">{ch === " " ? " " : ch}</span>
          ))}
        </p>
      </div>
      <img ref={bull} src={asset("/brand/logo.webp")} alt="" width={297} height={270} className="absolute left-0 top-0 object-contain opacity-0" style={{ filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.45))" }} draggable={false} />
      <style>{`
        .lang-curtain {
          -webkit-mask-image: ${diamondMaskUrl};
          mask-image: ${diamondMaskUrl};
          -webkit-mask-size: var(--cs, 0px) auto;
          mask-size: var(--cs, 0px) auto;
          -webkit-mask-position: calc(var(--cx, 50vw) - var(--cs, 0px) / 2) calc(var(--cy, 42vh) - var(--cs, 0px) * ${DIAMOND_RATIO / 2});
          mask-position: calc(var(--cx, 50vw) - var(--cs, 0px) / 2) calc(var(--cy, 42vh) - var(--cs, 0px) * ${DIAMOND_RATIO / 2});
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
});
