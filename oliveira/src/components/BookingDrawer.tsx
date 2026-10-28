import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { UI } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { scroller } from "@/lib/scroll";

/**
 * The MyLocalina booking form in a drawer: from the right on wide screens, a bottom sheet on phones that
 * can be dragged down to close. The form is only requested when the drawer opens (privacy).
 */
export function BookingDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const [narrow, setNarrow] = useState(() => typeof matchMedia !== "undefined" && matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    const mq = matchMedia("(max-width: 767px)");
    const on = () => setNarrow(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    setLoaded(false);
    setSlow(false);
    scroller()?.stop();
    const t = window.setTimeout(() => setSlow(true), 8000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>("a, button, iframe")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("button")?.focus());
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      scroller()?.start();
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  };
  const hidden = narrow ? { transform: "translateY(100%)" } : { transform: "translateX(100%)" };
  const shown = narrow ? { transform: "translateY(0%)" } : { transform: "translateX(0%)" };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[380]" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <motion.div
            className="absolute inset-0 bg-charcoal/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            className="linen absolute bottom-0 right-0 flex h-[92svh] w-full flex-col overflow-hidden rounded-t-[28px] shadow-lift md:top-0 md:h-full md:max-w-[520px] md:rounded-l-[28px] md:rounded-tr-none"
            initial={reduce ? { opacity: 0 } : hidden}
            animate={reduce ? { opacity: 1 } : shown}
            exit={reduce ? { opacity: 0 } : hidden}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
            drag={narrow && !reduce ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={onDragEnd}
          >
            {narrow && <span aria-hidden="true" className="mx-auto mt-3 block h-1.5 w-12 rounded-full bg-charcoal/25" />}
            <div className="flex items-start justify-between gap-4 px-6 pb-3 pt-5">
              <div>
                <p className="kicker text-leaf">{UI.reservations[lang]}</p>
                <h2 id="booking-title" className="display text-3xl font-semibold text-charcoal">{UI.navReservation[lang]}</h2>
              </div>
              <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-charcoal text-linen" aria-label={UI.close[lang]}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            {__ARTIFACT__ ? (
              // The preview viewer can't embed other sites: the booking opens on MyLocalina itself.
              <div className="mx-4 flex flex-1 flex-col items-start justify-center gap-5 rounded-2xl bg-white p-8 shadow-set">
                <p className="text-lg text-charcoal/85">{UI.drawerNote[lang]}</p>
                <a href={CONTACT.localinaUrl} target="_blank" rel="noopener" className="btn btn-olive">{UI.navReservation[lang]} · MyLocalina ↗</a>
                <p className="text-[15px] text-charcoal/75">{UI.phone[lang]}: <span className="select-all font-semibold">{CONTACT.phone}</span></p>
              </div>
            ) : (
            <div className="relative mx-4 flex-1 overflow-hidden rounded-2xl bg-white shadow-set">
              {!loaded && (
                <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-charcoal/70">
                  <span className="inline-flex items-center gap-3">
                    <span className="h-2.5 w-2.5 animate-ping rounded-full bg-olive" aria-hidden="true" />
                    {UI.drawerLoading[lang]}
                  </span>
                </p>
              )}
              <iframe title={UI.navReservation[lang]} src={CONTACT.localinaUrl} className="relative h-full w-full border-0" onLoad={() => {
                  setLoaded(true);
                  // Keep focus in the page (on the close button) so Esc still works until the visitor picks the form.
                  panel.current?.querySelector<HTMLElement>("button")?.focus();
                }} style={{ opacity: loaded ? 1 : 0, transition: "opacity .3s" }} />
            </div>
            )}
            <div className="flex flex-col gap-2 px-6 py-4 text-sm text-charcoal/75 sm:flex-row sm:items-center sm:justify-between">
              <span>{UI.drawerNote[lang]}</span>
              <a href={CONTACT.localinaUrl} target="_blank" rel="noopener" className={slow && !loaded ? "btn btn-olive" : "font-semibold text-leaf underline underline-offset-4"}>
                {UI.newTab[lang]} ↗
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
