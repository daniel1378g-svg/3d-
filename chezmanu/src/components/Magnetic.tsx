import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Pulls its child towards the pointer within a short radius and springs back on leave, and drops a ripple
 * where the child is pressed. Touch screens get the ripple only.
 */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const box = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.6 });

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = box.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  const press = (e: React.PointerEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(".btn");
    if (!target || reduce) return;
    const r = target.getBoundingClientRect();
    const dot = document.createElement("span");
    const size = Math.max(r.width, r.height) * 2.2;
    dot.className = "ripple";
    Object.assign(dot.style, { left: `${e.clientX - r.left}px`, top: `${e.clientY - r.top}px`, width: `${size}px`, height: `${size}px` });
    target.appendChild(dot);
    window.setTimeout(() => dot.remove(), 650);
  };

  return (
    <motion.span ref={box} className={className ?? "inline-flex"} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave} onPointerDown={press}>
      {children}
    </motion.span>
  );
}
