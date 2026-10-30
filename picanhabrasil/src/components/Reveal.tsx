// Scroll reveal: children rise in when they enter the viewport (once). Uses one shared IntersectionObserver and the
// CSS in index.css ([data-reveal] / .is-in), so no animation library runs per element.
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

let io: IntersectionObserver | null = null;
function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add("is-in");
        io!.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  return io;
}
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observer().observe(el);
    return () => observer().unobserve(el);
  }, []);
  return ref;
}

export function Reveal({ as: Tag = "div", delay = 0, className, children, ...rest }: { as?: ElementType; delay?: number; className?: string; children: ReactNode } & Record<string, unknown>) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} data-reveal className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
