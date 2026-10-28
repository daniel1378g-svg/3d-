import type { ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/utils";

const COLORS = ["#E0612B", "#C9A44A", "#F08A4B", "#FFD27A"];

/** A short burst of piri-piri sparks from a point on the screen (fixed layer, transform and opacity only). */
export function burst(x: number, y: number, count = 14) {
  if (prefersReducedMotion() || typeof document === "undefined") return;
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:0;height:0;pointer-events:none;z-index:360`;
  document.body.append(layer);
  let left = count;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    const size = 3 + Math.random() * 4;
    s.style.cssText = `position:absolute;left:${-size / 2}px;top:${-size / 2}px;width:${size}px;height:${size}px;border-radius:999px;background:${COLORS[i % COLORS.length]};box-shadow:0 0 6px ${COLORS[i % 2]}`;
    layer.append(s);
    const a = Math.random() * Math.PI * 2;
    const d = 30 + Math.random() * 60;
    const dx = Math.cos(a) * d, dy = Math.sin(a) * d - 20;
    s.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.6)`, opacity: 0.9, offset: 0.6 },
        { transform: `translate(${dx * 1.2}px, ${dy * 1.2 + 26}px) scale(0.2)`, opacity: 0 },
      ],
      { duration: 650 + Math.random() * 350, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    ).onfinish = () => {
      if (--left === 0) layer.remove();
    };
  }
}
const fromEvent = (el: Element) => {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2] as const;
};

/** Wraps something hot (piri piri dishes): sparks on hover, focus or tap. */
export function PiriSparks({ children, className }: { children: ReactNode; className?: string }) {
  let last = 0;
  const fire = (el: Element, x?: number, y?: number) => {
    const now = performance.now();
    if (now - last < 600) return;
    last = now;
    const [cx, cy] = x != null && y != null ? [x, y] : fromEvent(el);
    burst(cx, cy);
  };
  return (
    <span
      className={className}
      onPointerEnter={(e) => e.pointerType === "mouse" && fire(e.currentTarget, e.clientX, e.clientY)}
      onPointerDown={(e) => fire(e.currentTarget, e.clientX, e.clientY)}
      onFocus={(e) => fire(e.currentTarget)}
    >
      {children}
    </span>
  );
}
