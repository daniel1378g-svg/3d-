import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn, finePointer } from "@/lib/utils";

/**
 * A card that tilts towards the pointer in 3D with a soft glare that follows it (mouse only; touch and reduced
 * motion get a plain card). Transform and opacity only.
 */
export function Tilt({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.55), transparent 55%)`;
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !finePointer()) return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
    glareOpacity.set(0.7);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  };
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={reduce ? undefined : { transform }} className={cn("relative will-change-transform", className)}>
      {children}
      {!reduce && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light" style={{ background: glare, opacity: glareOpacity }} />}
    </motion.div>
  );
}
