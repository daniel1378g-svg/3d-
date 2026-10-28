import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ParallaxPhoto } from "./Parallax";

/** The top of a venue page: eyebrow, a big title rising word by word, the lead, and a parallax photo. */
export function PageHero({ eyebrow, title, lead, photoId, dot, children, accent = "bg-ink" }: { eyebrow: string; title: string; lead?: ReactNode; photoId?: string; dot: string; children?: ReactNode; accent?: string }) {
  const reduce = useReducedMotion();
  return (
    <section className={cn("on-dark tex-hex gutter relative overflow-hidden pb-16 pt-14 text-snow md:pb-24 md:pt-20", accent)}>
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="mb-4 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-beak">
            <span aria-hidden="true" className={cn("size-2.5 rounded-full", dot)} />
            {eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.6rem,7.4vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
            <span className="sr-only">{title}</span>
            <span aria-hidden="true">
              {title.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? { opacity: 0 } : { transform: "translateY(105%)" }}
                    animate={reduce ? { opacity: 1 } : { transform: "translateY(0%)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.06 }}
                  >
                    {w}
                  </motion.span>
                  {" "}
                </span>
              ))}
            </span>
          </h1>
          {lead && (
            <motion.div
              className="mt-6 max-w-[56ch] text-lg leading-relaxed text-snow/90 md:text-xl"
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(14px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {lead}
            </motion.div>
          )}
          {children && <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>}
        </div>
        {photoId && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(40px) rotate(2deg)" }}
            animate={{ opacity: 1, transform: "translateY(0px) rotate(0deg)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <ParallaxPhoto id={photoId} eager className="aspect-[4/3] rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] lg:aspect-[4/5]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
