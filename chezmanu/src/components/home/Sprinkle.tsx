import { useRef, type ReactNode } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

const COLORS = ["#7a3e12", "#8f4a17", "#a65a1f", "#fffaf0", "#fdf3dd"]; // cinnamon and icing sugar

/**
 * Wraps the pastel de nata card: hovering, focusing or tapping it sprinkles a little cinnamon and sugar.
 * Each grain is a span animated with the Web Animations API (transform and opacity), removed when it lands.
 * Off with reduced motion.
 */
export function Sprinkle({ children, className }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const last = useRef(0);
  const shake = () => {
    if (prefersReducedMotion() || !box.current) return;
    const now = performance.now();
    if (now - last.current < 450) return;
    last.current = now;
    const host = box.current;
    const w = host.clientWidth;
    for (let i = 0; i < 26; i++) {
      const grain = document.createElement("span");
      const size = 2 + Math.random() * 3.5;
      const x = w * (0.25 + Math.random() * 0.5);
      Object.assign(grain.style, {
        position: "absolute", left: `${x}px`, top: "-6px", width: `${size}px`, height: `${size}px`, borderRadius: "999px",
        background: COLORS[Math.floor(Math.random() * COLORS.length)], pointerEvents: "none", zIndex: "3",
        boxShadow: "0 0 0 0.5px rgb(90 40 10 / 0.25)",
      });
      host.appendChild(grain);
      const fall = host.clientHeight * (0.35 + Math.random() * 0.4);
      const drift = (Math.random() - 0.5) * 40;
      grain
        .animate(
          [
            { transform: "translate(0,0)", opacity: 0 },
            { transform: `translate(${drift * 0.3}px, ${fall * 0.2}px)`, opacity: 1, offset: 0.15 },
            { transform: `translate(${drift}px, ${fall}px) rotate(${Math.random() * 180}deg)`, opacity: 0.9, offset: 0.85 },
            { transform: `translate(${drift}px, ${fall + 4}px)`, opacity: 0 },
          ],
          { duration: 900 + Math.random() * 700, delay: Math.random() * 260, easing: "cubic-bezier(0.4, 0, 0.9, 0.6)" },
        )
        .finished.finally(() => grain.remove());
    }
  };
  return (
    <div ref={box} className={cn("relative", className)} onPointerEnter={shake} onPointerDown={shake} onFocus={shake}>
      {children}
    </div>
  );
}
