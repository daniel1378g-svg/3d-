import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Rises into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(28px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </M>
  );
}

/** Section heading: a small eyebrow with a coloured dot and a big title. */
export function Heading({ id, eyebrow, title, tone = "light", dot = "bg-brand", as: H = "h2", className }: { id?: string; eyebrow?: string; title: string; tone?: "light" | "dark"; dot?: string; as?: "h1" | "h2"; className?: string }) {
  return (
    <Reveal className={className}>
      {eyebrow && (
        <p className={cn("mb-3 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em]", tone === "dark" ? "text-beak" : "text-brand-ink")}>
          <span aria-hidden="true" className={cn("size-2.5 rounded-full", dot)} />
          {eyebrow}
        </p>
      )}
      <H id={id} className={cn("hyphens-auto font-display text-[clamp(2.2rem,5.6vw,4.6rem)] font-bold leading-[0.96]", tone === "dark" ? "text-snow" : "text-ink")}>
        {title}
      </H>
    </Reveal>
  );
}
