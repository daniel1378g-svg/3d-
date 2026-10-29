import { useEffect, useState } from "react";

/** Live result of a media query. */
export function useMedia(query: string, initial = false) {
  const [match, setMatch] = useState(() => (typeof matchMedia === "undefined" ? initial : matchMedia(query).matches));
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}
export const useIsDesktop = () => useMedia("(min-width: 1024px)", true);
export const useReduced = () => useMedia("(prefers-reduced-motion: reduce)");
