// Language switch (about 0.85 s): (1) the page dims, (2) three berries – plum, berry, lilac – grow out of the language
// button one after the other until the plum one covers the screen, (3) the language changes beneath it (the Shell
// swaps dictionary and address and restores the scroll position), (4) the Manna logo, intact on a cream disc, and
// "Willkommen / Bem-vindo / …" appear, (5) the berry shrinks away into the opposite corner and the visible content
// rises back in. The logo is never used as the mask. Reduced motion: a quick crossfade.
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { WELCOME, type Lang } from "@/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { asset } from "@/lib/utils";

export type LanguageTransitionHandle = { cover: (next: Lang) => Promise<void>; reveal: () => Promise<void> };

const play = (tl: gsap.core.Timeline) => new Promise<void>((res) => { tl.eventCallback("onComplete", () => res()); tl.play(); });
const circle = (r: number, x: number, y: number) => `circle(${r}px at ${x}px ${y}px)`;

export const LanguageTransition = forwardRef<LanguageTransitionHandle>(function LanguageTransition(_, ref) {
  const root = useRef<HTMLDivElement>(null);
  const dim = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const badge = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLParagraphElement>(null);
  const origin = useRef({ x: 0, y: 0 });
  const [next, setNext] = useState<Lang>("de");

  useImperativeHandle(ref, () => ({
    async cover(lang) {
      setNext(lang);
      const el = root.current!;
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";
      const [lilac, berry, plum] = layers.current;
      const vw = window.innerWidth, vh = window.innerHeight;
      const far = Math.hypot(vw, vh);
      gsap.set([badge.current, word.current], { opacity: 0 });
      if (prefersReducedMotion()) {
        gsap.set([lilac, berry], { opacity: 0 });
        gsap.set(plum, { clipPath: "none", opacity: 0 });
        await play(gsap.timeline({ paused: true }).to(plum, { opacity: 1, duration: 0.12 }));
        return;
      }
      // grow from the language button (or the top right corner)
      const btn = document.querySelector<HTMLElement>("[data-lang-button]")?.getBoundingClientRect();
      const x = btn ? btn.left + btn.width / 2 : vw - 60, y = btn ? btn.top + btn.height / 2 : 60;
      origin.current = { x, y };
      gsap.set([lilac, berry, plum], { opacity: 1, clipPath: circle(0, x, y) });
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(dim.current, { opacity: 0 }, { opacity: 0.35, duration: 0.15, ease: "power1.out" }, 0)
        .to(lilac, { clipPath: circle(far, x, y), duration: 0.3, ease: "power3.out" }, 0)
        .to(berry, { clipPath: circle(far, x, y), duration: 0.3, ease: "power3.out" }, 0.04)
        .to(plum, { clipPath: circle(far, x, y), duration: 0.3, ease: "power3.out" }, 0.08);
      await play(tl);
      gsap.set([lilac, berry], { opacity: 0 });
      gsap.set(dim.current, { opacity: 0 });
    },
    async reveal() {
      const el = root.current!;
      const plum = layers.current[2];
      const done = () => {
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
        gsap.set([...layers.current, badge.current, word.current, dim.current], { clearProps: "opacity,clipPath,transform" });
      };
      if (prefersReducedMotion()) {
        await play(gsap.timeline({ paused: true }).to(plum, { opacity: 0, duration: 0.12 }));
        done();
        return;
      }
      const vw = window.innerWidth, vh = window.innerHeight;
      const far = Math.hypot(vw, vh);
      // shrink towards the corner opposite the button, so the berry "rolls" through the page
      const ox = origin.current.x > vw / 2 ? 0 : vw, oy = vh;
      const tl = gsap.timeline({ paused: true });
      tl.fromTo([badge.current, word.current], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.16, stagger: 0.04, ease: "expo.out" }, 0)
        .to([badge.current, word.current], { opacity: 0, duration: 0.1 }, 0.18)
        .fromTo(plum, { clipPath: circle(far, ox, oy) }, { clipPath: circle(0, ox, oy), duration: 0.32, ease: "power3.inOut" }, 0.14);
      const visible = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main [data-lang-stagger]"))
        .filter((n) => { const b = n.getBoundingClientRect(); return b.bottom > 0 && b.top < window.innerHeight; })
        .slice(0, 8);
      gsap.fromTo(visible, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.04, ease: "expo.out", delay: 0.26, clearProps: "transform,opacity" });
      await play(tl);
      done();
    },
  }));

  return (
    <div ref={root} className="lang-tx pointer-events-none fixed inset-0 z-[940]" style={{ visibility: "hidden", top: "var(--label-h)" }} aria-hidden="true">
      <div ref={dim} className="absolute inset-0 bg-acai opacity-0" />
      {["bg-lilac", "bg-berry", "bg-[radial-gradient(120%_90%_at_50%_40%,#84458b_0%,#63195c_45%,#3d1d43_100%)]"].map((c, i) => (
        <div key={i} ref={(n) => { layers.current[i] = n; }} className={`absolute inset-0 ${c}`} style={{ clipPath: "circle(0px at 0 0)" }} />
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-5">
          <div ref={badge} className="grid h-[clamp(120px,22vmin,200px)] w-[clamp(120px,22vmin,200px)] place-items-center rounded-full bg-cream opacity-0 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
            <img src={asset("/brand/logo-320.webp")} alt="" width={320} height={277} className="w-[74%]" />
          </div>
          <p ref={word} className="display text-[clamp(2.6rem,9vw,7rem)] text-cream opacity-0" lang={next}>{WELCOME[next]}</p>
        </div>
      </div>
    </div>
  );
});
