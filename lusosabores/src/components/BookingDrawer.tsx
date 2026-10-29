// Every "Réserver" button opens this panel from the right. No booking form: the restaurant books by phone.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useReturnFocus } from "@/lib/useReturnFocus";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { Marquee } from "./Marquee";
import { Star } from "./Illustrations";
import { PartySize } from "./PartySize";
import { TodayHours } from "./Hours";
import { IconArrow, IconClose, IconPhone } from "./icons";

const BAND = ["RÉSERVER", "RESERVAR", "BOOK A TABLE", "PRENOTARE", "RESERVIEREN"];

export function BookingDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, go } = useSite();
  const reduce = useReducedMotion();
  const returnFocus = useReturnFocus(open);
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div className="fixed inset-0 z-[450] bg-marca-escura/60 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            </Dialog.Overlay>
            <Dialog.Content forceMount onCloseAutoFocus={returnFocus} asChild aria-describedby="booking-desc">
              <motion.div
                style={{ top: "var(--label-h)" }}
                className="fixed bottom-0 right-0 z-[460] flex w-full max-w-[560px] flex-col overflow-hidden bg-marca text-branco shadow-[-30px_0_60px_-30px_rgba(49,11,10,0.7)] sm:rounded-l-[28px]"
                initial={reduce ? { opacity: 0 } : { x: "100%" }}
                animate={reduce ? { opacity: 1 } : { x: "0%" }}
                exit={reduce ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: reduce ? 0.15 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Marquee className="shrink-0 bg-destaque py-3 text-marca-escura" speed={70} scrollLinked={false} pauseClassName="h-8 w-8 bg-marca-escura text-destaque">
                  {BAND.map((w) => (
                    <span key={w} className="flex items-center gap-5 pr-5 font-display text-[28px] font-extrabold uppercase leading-none tracking-[0.02em]">
                      {w}
                      <Star className="h-5 w-5" />
                    </span>
                  ))}
                </Marquee>
                <div className="flex-1 overflow-y-auto px-6 pb-10 pt-8 sm:px-10">
                  <div className="flex items-start justify-between gap-4">
                    <Dialog.Title className="fs-xl text-destaque">{UI.reserve[lang]}</Dialog.Title>
                    <Dialog.Close asChild>
                      <button type="button" aria-label={UI.close[lang]} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-branco text-marca-escura transition active:scale-95">
                        <IconClose size={22} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <p id="booking-desc" className="mt-5 text-[clamp(18px,1.4vw,21px)] leading-snug">
                    {TEXT.toBook[lang]}
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    {BUSINESS.phones.map((p, i) => (
                      <a key={p.tel} href={`tel:${p.tel}`} className={`btn btn--lg justify-between ${i === 1 ? "btn--cream" : ""}`}>
                        <span className="btn-roll">
                          <span>{p.label}</span>
                          <span aria-hidden="true">{p.label}</span>
                        </span>
                        <IconPhone size={22} />
                      </a>
                    ))}
                  </div>
                  <TodayHours className="mt-6" />
                  <PartySize tone="dark" className="mt-8" />
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setTimeout(() => go("home", "specialites"), 120);
                    }}
                    className="link mt-8 inline-flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-[0.08em] text-destaque"
                  >
                    {UI.planLink[lang]} <IconArrow size={18} />
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
