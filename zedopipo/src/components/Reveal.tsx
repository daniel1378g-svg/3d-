import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Rises into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(28px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </M>
  );
}

/** Section heading: a small gold eyebrow and a big title. */
export function Heading({ id, eyebrow, title, tone = "light", className }: { id: string; eyebrow?: string; title: string; tone?: "light" | "dark"; className?: string }) {
  return (
    <Reveal className={className}>
      {eyebrow && (
        <p className={"mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] " + (tone === "dark" ? "text-gold" : "text-bordeaux")}>
          <span aria-hidden="true" className={"h-px w-8 " + (tone === "dark" ? "bg-gold" : "bg-bordeaux")} />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={"hyphens-auto font-display text-[clamp(2rem,5.4vw,4.2rem)] font-bold leading-[0.98] " + (tone === "dark" ? "text-linen" : "text-bordeaux")}>
        {title}
      </h2>
    </Reveal>
  );
}
