import { Fragment, useEffect, useRef, useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { prefersReducedMotion } from "@/lib/utils";
import { Logo } from "../Logo";

const BASE = 42; // px per second at rest

/**
 * Endless strip. It drifts left at rest, speeds up with scroll velocity and turns round when the page
 * scrolls back up. Written straight to the track's transform each frame; never through React state.
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

  const words = [UI.sinceShort[lang], "Pâquis", UI.geneva[lang], UI.terreEtMer[lang], "Francesinha", "Bacalhau", "Vinho Verde"];

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
      <Logo alt={copy === 0 ? "Restaurant Don Duarte" : ""} className="mx-8 w-[150px] px-3 py-1.5" />
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="whitespace-nowrap px-6 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-medium italic">{w}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-gold">
            <path d="M12 1 C14 8 16 10 23 12 C16 14 14 16 12 23 C10 16 8 14 1 12 C8 10 10 8 12 1Z" fill="currentColor" />
          </svg>
        </Fragment>
      ))}
    </div>
  );

  return (
    <section aria-label={UI.stripLabel[lang]} className="gutter py-3 md:py-5">
      <div className="on-dark wrap relative overflow-hidden rounded-[28px] bg-green text-white shadow-[0_22px_44px_-26px_rgba(14,35,80,0.5)]">
      <div
        ref={box}
        className="overflow-hidden py-5"
        onPointerEnter={() => (hover.current = true)}
        onPointerLeave={() => (hover.current = false)}
      >
        <div ref={track} className={reduce ? "flex flex-wrap justify-center gap-y-2" : "marquee-track flex w-max"}>
          {run(0)}
          {!reduce && run(1)}
        </div>
      </div>
      {!reduce && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="absolute bottom-2 right-3 grid h-9 w-9 place-items-center rounded-full bg-green-deep/80 text-white ring-1 ring-white/30 hover:bg-red"
        >
          <span className="sr-only">{paused ? UI.play[lang] : UI.pause[lang]}</span>
          {paused ? (
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="currentColor" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" /></svg>
          )}
        </button>
      )}
      </div>
    </section>
  );
}
