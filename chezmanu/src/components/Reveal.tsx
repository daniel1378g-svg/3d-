import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Fades and rises into place once, when it enters the view. */
export function Reveal({ children, className, delay = 0, as = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "p" | "li" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(28px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.3 : 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Tag>
  );
}
