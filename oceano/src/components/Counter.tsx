import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { useInView } from "@/lib/useInView";
import { prefersReducedMotion } from "@/lib/utils";

/** A number that rolls up from `from` when it comes into view (at most 1.2 s). */
export function Counter({ to, from = 0, className, duration = 1.1 }: { to: number; from?: number; className?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || done.current) return;
    done.current = true;
    if (prefersReducedMotion()) return;
    const c = animate(from, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = String(Math.round(v))) });
    return () => c.stop();
  }, [inView, from, to, duration, ref]);
  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}
