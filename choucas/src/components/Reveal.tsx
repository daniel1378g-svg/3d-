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
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(24px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </M>
  );
}

/** A title whose words rise one after another the first time it scrolls into view. */
export function WordRise({ text, className, as: H = "h2", id }: { text: string; className?: string; as?: "h1" | "h2" | "h3"; id?: string }) {
  const reduce = useReducedMotion();
  const MH = motion[H];
  return (
    <MH id={id} className={className} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "0px 0px -8% 0px" }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              variants={reduce ? { hidden: { opacity: 0 }, shown: { opacity: 1 } } : { hidden: { transform: "translateY(105%)" }, shown: { transform: "translateY(0%)" } }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.05, 0.4) }}
            >
              {w}
            </motion.span>
            {" "}
          </span>
        ))}
      </span>
    </MH>
  );
}

/** Section heading: a small eyebrow with a coloured dot and a title that rises word by word. */
export function Heading({ id, eyebrow, title, tone = "light", dot = "bg-brand", as = "h2", className, size = "lg" }: { id?: string; eyebrow?: string; title: string; tone?: "light" | "dark"; dot?: string; as?: "h1" | "h2" | "h3"; className?: string; size?: "lg" | "md" }) {
  return (
    <div className={className}>
      {eyebrow && (
        <Reveal>
          <p className={cn("mb-3 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.18em]", tone === "dark" ? "text-beak" : "text-brand-ink")}>
            <span aria-hidden="true" className={cn("size-2 rounded-full", dot)} />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <WordRise
        id={id}
        as={as}
        text={title}
        className={cn(
          "hyphens-auto font-display font-semibold leading-[0.98] tracking-[-0.03em]",
          size === "lg" ? "text-[clamp(2.1rem,5vw,4rem)]" : "text-[clamp(1.8rem,3.6vw,2.8rem)]",
          tone === "dark" ? "text-snow" : "text-ink",
        )}
      />
    </div>
  );
}

/** A coloured band whose background wipes in once (0.6 s) the first time it comes into view. */
export function Band({ children, bg, className, id, labelledBy }: { children: ReactNode; bg: string; className?: string; id?: string; labelledBy?: string }) {
  const reduce = useReducedMotion();
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative isolate overflow-hidden", className)}>
      <motion.div
        aria-hidden="true"
        className={cn("absolute inset-0 -z-10", bg)}
        initial={reduce ? false : { clipPath: "inset(0 0 0 100%)" }}
        whileInView={{ clipPath: "inset(0 0 0 0%)" }}
        viewport={{ once: true, margin: "0px 0px -25% 0px" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </section>
  );
}
