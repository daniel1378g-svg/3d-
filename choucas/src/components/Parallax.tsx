import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { SmartImage, type Reveal } from "./SmartImage";

type Props = { id: string; className?: string; sizes?: string; eager?: boolean; amount?: number; reveal?: Reveal; position?: string; delay?: number; children?: ReactNode };

/** A photo that drifts slowly against the scroll inside its frame (still with reduced motion) and slides in once loaded. */
export function ParallaxPhoto({ id, className, sizes = "(min-width: 1024px) 50vw, 100vw", eager = false, amount = 44, reveal = "left", position, delay, children }: Props) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: box, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <div ref={box} className={cn("relative isolate overflow-hidden bg-snow-2", className)}>
      <motion.div className="absolute inset-x-0" style={{ top: -amount, bottom: -amount, ...(reduce ? {} : { y }) }}>
        <SmartImage id={id} fill sizes={sizes} eager={eager} reveal={reveal} position={position} delay={delay} />
      </motion.div>
      {children}
    </div>
  );
}

/** With a mouse, a soft light follows the pointer across a photo. */
export function LightFollow({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLSpanElement>(null);
  return (
    <div
      ref={box}
      className={cn("relative", className)}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !box.current || !glow.current) return;
        const r = box.current.getBoundingClientRect();
        glow.current.style.opacity = "1";
        glow.current.style.background = `radial-gradient(420px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(255,236,200,0.28), transparent 60%)`;
      }}
      onPointerLeave={() => glow.current && (glow.current.style.opacity = "0")}
    >
      {children}
      <span ref={glow} aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500" />
    </div>
  );
}
