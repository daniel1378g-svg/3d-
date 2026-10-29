// Every "Réserver" button opens this panel from the right: a marquee band at the top, a big title,
// "Combien êtes-vous ?" with the right way to book, then the phone and the hours. Native <dialog>, so focus
// stays inside and Esc closes it; focus returns to the button that opened it.
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BOOK_MARQUEE, copy } from "@/copy";
import { CONTACT } from "@/contact";
import { useSite } from "@/site";
import { EASE_OUT } from "@/lib/utils";
import { Marquee } from "./Marquee";
import { PartyPicker } from "./PartyPicker";
import { Star } from "./illustrations";
import { PhoneGlyph } from "./ui";

export function BookingDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (open && d && !d.open) {
      d.showModal();
      document.documentElement.classList.add("has-dialog");
      requestAnimationFrame(() => d.querySelector<HTMLElement>("[data-autofocus]")?.focus());
    }
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="booking-title"
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <AnimatePresence
        onExitComplete={() => {
          dialog.current?.close();
          document.documentElement.classList.remove("has-dialog");
        }}
      >
        {open && (
          <motion.div key="backdrop" className="absolute inset-0 bg-noite/55 backdrop-blur-[3px]" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
        )}
        {open && (
          <motion.div
            key="panel"
            ref={panel}
            className="tone-vinho absolute bottom-0 right-0 top-0 flex w-[min(560px,100%)] flex-col overflow-y-auto overscroll-contain"
            style={{ paddingTop: "var(--label-h)" }}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "tween", duration: reduce ? 0.2 : 0.55, ease: EASE_OUT }}
          >
            <Marquee scroller={panel} speed={70} className="flex-none bg-dourado py-3.5 text-vinho" pauseClassName="bg-vinho text-branco" label={BOOK_MARQUEE}>
              {BOOK_MARQUEE.split("✱")
                .filter((s) => s.trim())
                .map((word, i) => (
                  <span key={i} className="inline-flex items-center gap-4 pr-4 font-display text-[34px] font-bold uppercase leading-none whitespace-nowrap">
                    {word.trim()}
                    <Star className="h-7 w-7" />
                  </span>
                ))}
            </Marquee>
            <div className="grid gap-8 p-[clamp(20px,4vw,40px)]">
              <div className="flex items-start justify-between gap-4">
                <h2 id="booking-title" className="text-[clamp(48px,7vw,72px)] text-dourado">
                  {t.ui.reserveDrawer}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  data-autofocus
                  aria-label={t.map.close}
                  className="grid h-12 w-12 flex-none cursor-pointer place-items-center rounded-full bg-branco text-tinta transition-transform duration-300 hover:rotate-90"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <PartyPicker tone="dark" idPrefix="drawer" />
              <div className="grid gap-4 border-t border-branco/25 pt-6">
                <p className="eyebrow text-dourado">{t.ui.orCall}</p>
                <a href={CONTACT.phoneHref} className="inline-flex min-h-11 items-center gap-3 font-display text-3xl font-bold tracking-[0.04em] text-branco no-underline">
                  <span className="h-7 w-7">
                    <PhoneGlyph />
                  </span>
                  {CONTACT.phoneDisplay}
                </a>
                <p className="text-[15px] text-branco/85">{t.info.phoneText}</p>
                <dl className="m-0 grid grid-cols-2 gap-4 text-[15px]">
                  <div>
                    <dt className="eyebrow mb-1 text-dourado">{t.info.days}</dt>
                    <dd className="m-0 whitespace-pre-line">{t.info.openHours}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1 text-dourado">{t.info.closedDays}</dt>
                    <dd className="m-0">{t.info.closed}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="eyebrow mb-1 text-dourado">{t.info.kitchenTitle}</dt>
                    <dd className="m-0">
                      {t.info.kitchenText}. {t.info.last}.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
