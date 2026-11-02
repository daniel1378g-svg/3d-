// Decorative pieces (aria-hidden): the drawn olive sprig, the circular text stamp that turns with the scroll, and
// dishes cut out of the restaurant's own photographs.
import { useEffect, useId, useRef } from "react";
import { useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";

type P = { className?: string };

export function OliveSprig({ className }: P) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden focusable={false}>
      <path d="M6 108C60 84 118 52 194 12" stroke="#4d5a2c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {[
        [40, 92, -40],
        [62, 80, 30],
        [90, 66, -38],
        [112, 52, 32],
        [140, 38, -36],
        [164, 26, 30],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="24" ry="7.5" fill={i % 2 ? "#a9ad81" : "#7d8a4f"} transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <ellipse cx="76" cy="96" rx="9" ry="11" fill="#29381b" />
      <ellipse cx="128" cy="70" rx="9" ry="11" fill="#3e4f22" />
    </svg>
  );
}

/** A round sticker with text running around it; it turns only while the page scrolls. */
export function Stamp({ text, className, children, tone = "gold" }: { text: string; className?: string; children?: React.ReactNode; tone?: "gold" | "cream" | "green" }) {
  const ring = useRef<SVGSVGElement>(null);
  const reduce = useReduced();
  const id = useId().replace(/:/g, "");
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ring.current && (ring.current.style.transform = `rotate(${window.scrollY * 0.12}deg)`));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);
  // about 42 characters fit around the ring at this size: repeat short texts, stretch the spacing to close the circle
  const label = text.toUpperCase().repeat(Math.max(1, Math.round(42 / text.length)));
  return (
    <div className={cn("relative grid aspect-square place-items-center rounded-full", tone === "gold" ? "bg-gold text-ink" : tone === "cream" ? "bg-cream text-ink" : "bg-green text-cream", className)}>
      <svg ref={ring} aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <path id={`ring-${id}`} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <text fontFamily="Barlow Condensed" fontWeight="800" fontSize="17" letterSpacing="2.2" fill="currentColor">
          <textPath href={`#ring-${id}`} textLength="486" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>
      {children}
      <span className="sr-only">{text}</span>
    </div>
  );
}

/** Real ingredients and dishes cut out of the restaurant's own photographs (scripts/cutouts.py). Decorative. */
const CUTOUTS = { pesto: [800, 411], pizza: [900, 504], "panna-cotta": [700, 318] } as const;
export function Cutout({ name, className }: { name: keyof typeof CUTOUTS; className?: string }) {
  const [w, h] = CUTOUTS[name];
  return <img src={`${import.meta.env.BASE_URL}cutouts/${name}.webp`} alt="" aria-hidden="true" width={w} height={h} loading="lazy" decoding="async" className={className} />;
}
