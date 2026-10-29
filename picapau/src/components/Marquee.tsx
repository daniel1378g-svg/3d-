// An endless band: it runs linearly, speeds up while the page (or its own scroller) scrolls and reverses
// with the scroll direction. It moves for more than five seconds, so it always has a visible pause control.
// With reduced motion it starts paused.
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useSite } from "@/site";
import { copy } from "@/copy";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Pixels per second at rest. */
  speed?: number;
  scroller?: RefObject<HTMLElement | null>;
  className?: string;
  trackClassName?: string;
  pauseClassName?: string;
  label?: string;
};

export function Marquee({ children, speed = 60, scroller, className, trackClassName, pauseClassName, label }: Props) {
  const { lang } = useSite();
  const t = copy(lang).ui;
  const track = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(() => prefersReducedMotion());
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const el = track.current;
    const host = box.current;
    if (!el || !host) return;
    let x = 0;
    let dir = -1;
    let boost = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const target: HTMLElement | Window = scroller?.current ?? window;
    const read = () => (target === window ? window.scrollY : (target as HTMLElement).scrollTop);
    let prevScroll = read();
    const onScroll = () => {
      const now = read();
      const delta = now - prevScroll;
      prevScroll = now;
      if (Math.abs(delta) > 0.5) {
        dir = delta > 0 ? -1 : 1;
        boost = Math.min(boost + Math.abs(delta) * 0.6, 900);
      }
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible && !pausedRef.current) {
        const half = el.scrollWidth / 2;
        x += dir * (speed + boost) * dt;
        if (half > 0) {
          if (x <= -half) x += half;
          if (x > 0) x -= half;
        }
        el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      }
      boost *= Math.pow(0.04, dt);
      raf = requestAnimationFrame(frame);
    };
    target.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      target.removeEventListener("scroll", onScroll);
    };
  }, [speed, scroller]);

  return (
    <div ref={box} className={cn("relative flex items-center overflow-hidden", className)} role="region" aria-label={label}>
      <div ref={track} className={cn("marquee-track", trackClassName)} aria-hidden="true">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? t.play : t.pause}
        className={cn(
          "absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-tinta text-branco shadow-md",
          pauseClassName,
        )}
      >
        {paused ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M7 5v14l12-7z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
