// Keeps keyboard focus inside an open dialog: Tab and Shift+Tab wrap, and focus that lands outside (a click on the
// backdrop, a programmatic focus) is brought back to the first control.
import { useEffect, type RefObject } from "react";

const SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';
const focusables = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => !el.hasAttribute("inert") && el.getClientRects().length > 0 && el.tabIndex >= 0);

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      const root = ref.current;
      if (e.key !== "Tab" || !root) return;
      const list = focusables(root);
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      const i = list.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (i === -1 || i === list.length - 1)) { e.preventDefault(); first.focus(); }
    };
    const onFocus = (e: FocusEvent) => {
      const root = ref.current;
      if (root && !root.contains(e.target as Node)) focusables(root)[0]?.focus();
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("focusin", onFocus);
    return () => { document.removeEventListener("keydown", onKey, true); document.removeEventListener("focusin", onFocus); };
  }, [ref, active]);
}
