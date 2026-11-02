import { useEffect, useRef, useState } from "react";

/** Becomes true once the element is at least `amount` in view (20 % by default), and stays true. */
export function useInView<T extends Element>(amount = 0.2, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, rootMargin, inView]);
  return [ref, inView] as const;
}

/** True while the element is on screen (for pausing loops and WebGL). */
export function useOnScreen<T extends Element>(rootMargin = "100px") {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, on] as const;
}
