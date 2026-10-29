import { useEffect, useState, type RefObject } from "react";

/** True once the element comes within `margin` of the screen (then stays true). */
export function useNear(ref: RefObject<HTMLElement | null>, margin = "100% 0px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}
