import { Fragment, useEffect, useRef, useState } from "react";
import { MOTTO, STORY_HEADING, UI } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { asset, prefersReducedMotion } from "@/lib/utils";

const BASE = 46; // px per second at rest

/**
 * Endless strip. It drifts at rest, speeds up with scroll velocity and turns round when the page scrolls
 * back up. Written straight to the track's transform each frame, never through React state.
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

  const words: { text: string; lang?: string; italic?: boolean }[] = [
    { text: `${MOTTO.pt} – ${MOTTO.gsw}`, italic: true },
    { text: "Bacalhau", lang: "pt-PT" },
    { text: "Käseschnitte «Walliser Art»", lang: "de-CH" },
    { text: "Caldo verde", lang: "pt-PT" },
    { text: "Francesinha", lang: "pt-PT" },
    { text: "Pastel de nata", lang: "pt-PT" },
    { text: "Polvo", lang: "pt-PT" },
    { text: "Super Bock" },
    { text: STORY_HEADING, lang: "pt-PT", italic: true },
    { text: CONTACT.district },
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
      {words.map((w, i) => (
        <Fragment key={i}>
          <img src={asset("brand/ring.webp")} alt="" width={30} height={30} className="mx-7 h-[30px] w-[30px] shrink-0" />
          <span lang={w.lang} className={w.italic ? "display whitespace-nowrap text-[clamp(1.7rem,3.8vw,3rem)] italic text-leaf-light" : "display whitespace-nowrap text-[clamp(1.7rem,3.8vw,3rem)] font-medium"}>
            {w.text}
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <section aria-label={UI.stripLabel[lang]} className="charcoal on-dark relative overflow-hidden">
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
          className="absolute bottom-2 right-3 grid h-9 w-9 place-items-center rounded-full bg-linen/10 text-linen ring-1 ring-linen/30 hover:bg-linen/20"
        >
          <span className="sr-only">{paused ? UI.play[lang] : UI.pause[lang]}</span>
          {paused ? (
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="currentColor" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" /></svg>
          )}
        </button>
      )}
    </section>
  );
}
