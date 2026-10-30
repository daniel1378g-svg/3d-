// The reservation as a sheet over any page: from the right on wide screens, from the bottom on phones. A band
// says "book a table" in all five languages. Escape, the close button or the backdrop close it.
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/site";
import { EASE_DRAWER } from "@/lib/motion";
import { resumeScroll, stopScroll } from "@/lib/scroll";
import { useFocusTrap } from "@/lib/focusTrap";
import { Reservation } from "./reservation/Reservation";
import { IconClose } from "./icons";

const BAND = "RESERVIEREN ✱ BOOK A TABLE ✱ RESERVAR ✱ RÉSERVER ✱ PRENOTARE ✱ ";

export function BookingSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, reduce } = useSite();
  const panel = useRef<HTMLDivElement>(null);
  useFocusTrap(panel, open);
  const wide = typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches;

  useEffect(() => {
    if (!open) return;
    const last = document.activeElement as HTMLElement | null;
    stopScroll();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("[data-close]")?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      resumeScroll();
      last?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  const hidden = wide ? "translateX(100%)" : "translateY(100%)";
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[870]" style={{ top: "var(--label-h)" }}>
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            className="skin-carvao2 absolute bottom-0 right-0 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[30px] shadow-2xl min-[900px]:top-0 min-[900px]:max-h-none min-[900px]:w-[min(620px,100vw)] min-[900px]:rounded-l-[30px] min-[900px]:rounded-tr-none"
            initial={reduce ? { opacity: 0 } : { transform: hidden }}
            animate={reduce ? { opacity: 1 } : { transform: "translate(0px, 0px)" }}
            exit={reduce ? { opacity: 0 } : { transform: hidden, transition: { duration: 0.3, ease: EASE_DRAWER } }}
            transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE_DRAWER }}
          >
            <div className="overflow-hidden bg-brasa py-2 text-carvao" aria-hidden="true">
              <div className="marquee-track animate-[marquee_22s_linear_infinite] whitespace-nowrap font-display text-[0.8rem] font-extrabold tracking-[0.18em] motion-reduce:animate-none">
                <span>{BAND.repeat(4)}</span>
                <span>{BAND.repeat(4)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 px-6 pb-2 pt-5">
              <h2 id="sheet-title" className="display text-[2.6rem] text-creme">{t.reservation.sheetTitle}</h2>
              <button type="button" data-close className="icon-btn" onClick={onClose} aria-label={t.a11y.close}><IconClose /></button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-6 pb-[max(28px,env(safe-area-inset-bottom))]" data-lenis-prevent>
              <p className="mb-6 text-creme/75">{t.reservation.lead}</p>
              <Reservation variant="sheet" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
