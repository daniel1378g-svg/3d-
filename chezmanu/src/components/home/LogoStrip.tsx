import { Fragment, useEffect, useRef, useState } from "react";
import { HTML_LANG, UI } from "@/i18n";
import { useSite } from "@/site";
import { asset, prefersReducedMotion } from "@/lib/utils";
import { PlayPause } from "../Glyphs";

const BASE = 52; // px per second at rest

/**
 * Endless strip: logo · Pastéis de nata · Bolo Rei · … · 7/7 dès 6:30. It drifts at rest, speeds up with the
 * scroll and turns round when the page scrolls back up. Written straight to the track's transform each frame,
 * never through React state. Pauses on hover and with its button. Adapted from ../oliveira.
 */
export function LogoStrip() {
  const { lang } = useSite();
  const track = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduce] = useState(prefersReducedMotion);
  const pausedRef = useRef(false);
  const hover = useRef(false);
  pausedRef.current = paused;

  const words: { text: string; lang?: string }[] = [
    { text: "Pastéis de nata", lang: "pt-PT" },
    { text: "Bolo Rei", lang: "pt-PT" },
    { text: "Pão de Ló", lang: "pt-PT" },
    { text: "Mille-feuille", lang: "fr" },
    { text: "Café Delta" },
    { text: "Lausanne" },
    { text: UI.stripDaily[lang], lang: HTML_LANG[lang] },
  ];

  useEffect(() => {
    if (reduce) return;
    const el = track.current!;
    let x = 0;
    let dir = -1;
    let speed = BASE;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(box.current!);
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? -1 : 1;
      const target = BASE + Math.min(Math.abs(dy) / Math.max(dt, 0.001), 3000) * 0.35;
      speed += (target - speed) * Math.min(1, dt * 5);
      if (visible && !pausedRef.current && !hover.current) {
        const half = el.scrollWidth / 2;
        x += dir * speed * dt;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduce, lang]);

  const run = (copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0 ? "true" : undefined}>
      <span className="mx-7 inline-flex shrink-0 items-center rounded-full bg-flour px-4 py-1.5">
        <img src={asset("brand/logo-300.webp")} alt={copy > 0 ? "" : "Chez Manu"} width={284} height={145} className="h-9 w-auto md:h-11" />
      </span>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span lang={w.lang} className="display whitespace-nowrap text-[clamp(1.7rem,3.8vw,3rem)] text-flour">
            {w.text}
          </span>
          <img src={asset("brand/heart-32.png")} alt="" width={22} height={22} className="mx-7 h-[22px] w-[22px] shrink-0" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <section aria-label={UI.stripLabel[lang]} className="espresso on-dark relative overflow-hidden">
      <div ref={box} className="overflow-hidden py-6 md:py-8" onPointerEnter={() => (hover.current = true)} onPointerLeave={() => (hover.current = false)}>
        <div ref={track} className={reduce ? "flex flex-wrap justify-center gap-y-3 px-4" : "marquee-track flex w-max"}>
          {run(0)}
          {!reduce && run(1)}
        </div>
      </div>
      {!reduce && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="absolute bottom-1.5 right-3 grid h-10 w-10 place-items-center rounded-full bg-flour/10 text-flour ring-1 ring-flour/30 hover:bg-flour/20"
        >
          <span className="sr-only">{paused ? UI.play[lang] : UI.pause[lang]}</span>
          <PlayPause paused={paused} />
        </button>
      )}
    </section>
  );
}
