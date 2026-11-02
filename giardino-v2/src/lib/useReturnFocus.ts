import { useLayoutEffect, useRef } from "react";

/**
 * Remembers what had focus when an overlay opens (before Radix moves focus inside) and gives it back on
 * close: the overlays here are opened from buttons that are not Radix triggers.
 */
export function useReturnFocus(open: boolean) {
  const last = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    if (open) last.current = document.activeElement as HTMLElement | null;
  }, [open]);
  return (e: Event) => {
    e.preventDefault();
    const el = last.current;
    if (el && document.contains(el)) el.focus({ preventScroll: true });
  };
}
