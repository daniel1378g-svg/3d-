// The three facts from the live site in an ember band that runs left; scrolling speeds it up and scrolling back up
// turns it round. Reduced motion: the facts stand still.
import { useEffect, useRef } from "react";
import { useSite } from "@/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Marquee({ items, className = "skin-lime" }: { items: readonly string[]; className?: string }) {
  const { reduce } = useSite();
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce || !track.current) return;
    const tw = gsap.to(track.current, { xPercent: -50, ease: "none", duration: 28, repeat: -1 });
    let dir = 1;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (s) => {
        const v = s.getVelocity();
        if (Math.abs(v) > 30) dir = v > 0 ? 1 : -1;
        gsap.to(tw, { timeScale: dir * (1 + Math.min(4, Math.abs(v) / 600)), duration: 0.4, overwrite: true });
      },
    });
    return () => { tw.kill(); st.kill(); };
  }, [reduce]);
  const row = items.map((x) => (
    <span key={x} className="flex items-center gap-8 pr-8">
      <span>{x}</span>
      <span aria-hidden="true" className="text-[0.7em]">✱</span>
    </span>
  ));
  return (
    <div className={`${className} overflow-hidden py-4`}>
      <ul className="sr-only">{items.map((x) => <li key={x}>{x}</li>)}</ul>
      <div ref={track} className="marquee-track display-wide whitespace-nowrap text-[clamp(1rem,2.2vw,1.6rem)]" aria-hidden="true">
        {[0, 1, 2, 3].map((k) => <div key={k} className="flex">{row}</div>)}
      </div>
    </div>
  );
}
