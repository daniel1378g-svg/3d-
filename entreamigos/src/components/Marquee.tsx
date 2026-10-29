import { useEffect, useRef, useState, type ReactNode } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { IconPause, IconPlay } from "./icons";

type Props = {
  children: ReactNode;
  className?: string;
  /** pixels per second at rest */
  speed?: number;
  /** speed up with scrolling and reverse with the scroll direction */
  scrollLinked?: boolean;
  pauseButton?: boolean;
  pauseClassName?: string;
  label?: string;
};

/** An endless band. The content is drawn twice and moved with a transform; it pauses off screen. */
export function Marquee({ children, className, speed = 60, scrollLinked = true, pauseButton = true, pauseClassName, label }: Props) {
  const { lang } = useSite();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const el = track.current;
    const host = wrap.current;
    if (!el || !host || paused) return;
    let x = 0;
    let dir = -1;
    let boost = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    let on = false;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (scrollLinked) {
        const y = window.scrollY;
        const v = (y - lastY) / Math.max(dt, 0.001);
        lastY = y;
        if (Math.abs(v) > 20) dir = v > 0 ? -1 : 1;
        boost += (Math.min(Math.abs(v) / 300, 6) - boost) * Math.min(1, dt * 6);
      }
      const half = el.scrollWidth / 2;
      x += dir * speed * (1 + boost) * dt;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) {
        on = true;
        last = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(frame);
      } else if (!e.isIntersecting && on) {
        on = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(host);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [paused, speed, scrollLinked]);

  return (
    <div ref={wrap} className={cn("relative overflow-hidden", className)} role={label ? "region" : undefined} aria-label={label}>
      <div ref={track} className="flex w-max will-change-transform" aria-hidden="true">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
      {pauseButton && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? UI.play[lang] : UI.pause[lang]}
          className={cn("absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-tinta text-branco shadow-lg", pauseClassName)}
        >
          {paused ? <IconPlay size={16} /> : <IconPause size={16} />}
        </button>
      )}
    </div>
  );
}
