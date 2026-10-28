import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { photo, photoAlt, photoSize } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** A photo that drifts slowly against the scroll inside its frame; still with reduced motion. */
export function ParallaxPhoto({ id, className, small = false, eager = false, amount = 60 }: { id: string; className?: string; small?: boolean; eager?: boolean; amount?: number }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: box, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const [w, h] = photoSize(id);
  return (
    <div ref={box} className={cn("relative overflow-hidden bg-ink-2", className)}>
      <motion.img
        src={photo(id, small)}
        alt={photoAlt(id, lang)}
        width={w}
        height={h}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-x-0 top-1/2 h-[calc(100%+140px)] w-full -translate-y-1/2 object-cover"
        style={reduce ? undefined : { y }}
      />
    </div>
  );
}
