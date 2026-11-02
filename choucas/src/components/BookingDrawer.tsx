import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { CONTACT } from "@/contact";
import { RESERVATION } from "@/copy";
import { useSite } from "@/site";
import { CloseIcon, ExternalIcon, PhoneIcon } from "./icons";

/**
 * The resmio booking system (the one embedded on choucas.ch/index.php?page=691) in a side drawer. Nothing from resmio loads before the drawer opens;
 * the new-tab link stays visible in case the widget is blocked or slow.
 */
export function BookingDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    setLoaded(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        // keep focus inside the drawer
        const f = [
          ...panel.current.querySelectorAll<HTMLElement>(
            "a[href], button, iframe, [tabindex]:not([tabindex='-1'])",
          ),
        ];
        if (!f.length) return;
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first)
          (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last)
          (e.preventDefault(), first.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    requestAnimationFrame(() =>
      panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(),
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[300]">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="on-light absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col bg-snow shadow-[-30px_0_60px_-30px_rgba(22,20,20,0.6)]"
            initial={
              reduce ? { opacity: 0 } : { transform: "translateX(100%)" }
            }
            animate={reduce ? { opacity: 1 } : { transform: "translateX(0%)" }}
            exit={
              reduce
                ? { opacity: 0 }
                : {
                    transform: "translateX(100%)",
                    transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
                  }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
              <h2
                id="booking-title"
                className="font-display text-2xl font-bold text-ink"
              >
                {UI.drawerTitle[lang]}
              </h2>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink hover:border-ink"
              >
                <CloseIcon />
                <span className="sr-only">{UI.close[lang]}</span>
              </button>
            </div>
            <p className="border-b border-ink/10 px-5 py-3 text-[15px] leading-relaxed text-muted">{RESERVATION.text[lang]}</p>
            {__ARTIFACT__ ? (
              <div className="grid min-h-0 flex-1 place-items-center bg-white p-8 text-center">
                <p className="max-w-[34ch] text-[17px] font-semibold text-ink">
                  {UI.previewNoEmbed[lang]}
                </p>
              </div>
            ) : (
              <div className="relative min-h-0 flex-1 bg-white">
                {!loaded && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center"
                  >
                    <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-ink/20 border-t-brand" />
                  </div>
                )}
                <iframe
                  title={UI.drawerTitle[lang]}
                  src={CONTACT.booking}
                  onLoad={() => setLoaded(true)}
                  className="relative h-full w-full border-0"
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            )}
            <div
              className="grid gap-3 border-t border-ink/10 px-5 py-4 text-sm"
              style={{
                paddingBottom: "max(16px, env(safe-area-inset-bottom, 0px))",
              }}
            >
              <p className="text-muted">{UI.drawerNote[lang]}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={CONTACT.booking}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 font-bold text-snow hover:bg-ink-2"
                >
                  {UI.drawerFallback[lang]}
                  <ExternalIcon />
                  <span className="sr-only"> ({UI.newTab[lang]})</span>
                </a>
                <a
                  href={CONTACT.tel}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 font-bold text-ink hover:border-ink"
                >
                  <PhoneIcon />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
