import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LightFollow, ParallaxPhoto } from "./Parallax";

/** The top of a page, in the same editorial frame as the home hero: eyebrow, title, lead, actions, photo. */
export function PageHero({ eyebrow, title, lead, photoId, dot, children, position, tint = "bg-snow" }: { eyebrow: string; title: string; lead?: ReactNode; photoId?: string; dot: string; children?: ReactNode; position?: string; tint?: string }) {
  const reduce = useReducedMotion();
  return (
    <section className={cn("on-light gutter relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-14", tint)}>
      <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="min-w-0">
          <motion.p
            className="mb-4 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted"
            initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5 }}
          >
            <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", dot)} />
            {eyebrow}
          </motion.p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-ink">
            <span className="sr-only">{title}</span>
            <span aria-hidden="true">
              {title.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? { opacity: 0 } : { transform: "translateY(105%)" }}
                    animate={reduce ? { opacity: 1 } : { transform: "translateY(0%)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.05 }}
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
              className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink/80"
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(14px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {lead}
            </motion.div>
          )}
          {children && (
            <motion.div className="mt-7 flex flex-wrap items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              {children}
            </motion.div>
          )}
        </div>
        {photoId && (
          <LightFollow className="rounded-[24px]">
            <ParallaxPhoto id={photoId} eager reveal="right" position={position} className="aspect-[4/3] rounded-[24px] shadow-[0_40px_80px_-50px_rgba(28,24,20,0.8)] lg:aspect-[5/6]" />
          </LightFollow>
        )}
      </div>
    </section>
  );
}
