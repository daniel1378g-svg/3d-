// Cut-out dishes (from the restaurant's own photos) and drawings that drift across a section as it scrolls:
// three depths (speed 0.2 / 0.4 / 0.6), a slight rotation, the far ones a little blurred. Off with reduced motion.
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cutoutSize, cutoutSrc, type Cutout } from "@/content/photos";
import { gsap } from "@/lib/gsap";
import { useNear } from "@/lib/useNear";
import { cn } from "@/lib/utils";

export type Flyer = {
  cutout?: Cutout;
  node?: ReactNode;
  left: string;
  top: string;
  width: string;
  depth: 0.2 | 0.4 | 0.6;
  rotate: [number, number];
  /** hidden on phones (three per section at most, fewer on small screens) */
  desktopOnly?: boolean;
};

export function Flyers({ items, className }: { items: Flyer[]; className?: string }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const near = useNear(box); // the cut-outs download only when their section comes near

  useLayoutEffect(() => {
    if (reduce || !box.current) return;
    const host = box.current.parentElement!;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-flyer]").forEach((el) => {
        const depth = Number(el.dataset.depth);
        const [r0, r1] = (el.dataset.rotate ?? "0,0").split(",").map(Number);
        gsap.fromTo(
          el,
          { yPercent: depth * 160, rotate: r0 },
          { yPercent: -depth * 160, rotate: r1, ease: "none", scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    }, box);
    return () => ctx.revert();
  }, [reduce]);

  if (reduce) return null;
  return (
    <div ref={box} className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {items.map((f, i) => {
        const size = f.cutout ? cutoutSize(f.cutout) : null;
        return (
          <div
            key={i}
            data-flyer
            data-depth={f.depth}
            data-rotate={f.rotate.join(",")}
            className={cn("absolute will-change-transform", f.desktopOnly && "max-md:hidden")}
            style={{ left: f.left, top: f.top, width: f.width, filter: f.depth === 0.2 ? "blur(2px)" : undefined, opacity: f.depth === 0.2 ? 0.85 : 1 }}
          >
            {f.cutout ? (
              near && <img src={cutoutSrc(f.cutout)} alt="" width={size![0]} height={size![1]} loading="lazy" decoding="async" className="h-auto w-full drop-shadow-[0_30px_40px_rgba(11,13,16,0.45)]" />
            ) : (
              f.node
            )}
          </div>
        );
      })}
    </div>
  );
}
