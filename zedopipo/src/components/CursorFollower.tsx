import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useSite } from "@/site";
import { UI } from "@/i18n";

/**
 * Desktop only (a fine pointer, motion allowed): a small bordeaux dot trails the pointer and opens into
 * a word over things that can be dragged or opened ([data-cursor="drag" | "view"]). Purely decorative.
 */
export function CursorFollower() {
  const { lang } = useSite();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"" | "drag" | "view">("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const q = matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = (e.target as Element | null)?.closest?.("[data-cursor]");
      setMode(((t?.getAttribute("data-cursor") as "drag" | "view") ?? "") || "");
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const label = mode === "drag" ? UI.cursorDrag[lang] : mode === "view" ? UI.cursorView[lang] : "";
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[350]" style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}>
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-bordeaux text-[12px] font-bold uppercase tracking-[0.08em] text-linen shadow-[0_8px_20px_-8px_rgba(27,20,20,0.6)]"
        animate={{ width: label ? 74 : 10, height: label ? 74 : 10, opacity: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        style={{ mixBlendMode: label ? "normal" : "multiply" }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </motion.div>
  );
}
