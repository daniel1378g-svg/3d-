import { useEffect, useState } from "react";
/** The id of the section crossing a line at 45 % of the viewport (for the header's sliding pill). */
export function useScrollSpy(ids: readonly string[], active = true) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (!active) return setCurrent(null);
    const onScroll = () => {
      let best: string | null = null;
      const line = window.innerHeight * 0.45;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) best = id;
      }
      setCurrent(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active, ids.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  return current;
}
