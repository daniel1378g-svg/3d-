import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";

const WORDS = { drag: UI.cursorDrag, view: UI.cursorView, book: UI.cursorBook, call: UI.cursorCall } as const;

/**
 * Desktop only: a small olive-green ring trails the pointer on a spring and names what a click does over
 * elements marked `data-cursor`. Decoration only; the system cursor stays visible.
 */
export function CursorFollower() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [enabled] = useState(() => typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches);
  const [word, setWord] = useState<keyof typeof WORDS | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (!enabled || reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-cursor], a, button, [role=slider]");
      setWord((t?.dataset.cursor as keyof typeof WORDS) ?? null);
      setActive(Boolean(t));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;
  const label = word ? WORDS[word]?.[lang] : null;
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[450]" style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}>
      <motion.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-olive text-[11px] font-bold uppercase tracking-wider text-charcoal"
        animate={{ width: label ? 76 : active ? 44 : 22, height: label ? 76 : active ? 44 : 22, backgroundColor: label ? "rgba(132,192,84,0.92)" : "rgba(132,192,84,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </motion.div>
  );
}
