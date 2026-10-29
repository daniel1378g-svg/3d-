// Every "Reservieren" button opens this panel from the right: the table widget, the two phones, the e-mail,
// today's hours and the link to the reservation form on the Kontakt page.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useReturnFocus } from "@/lib/useReturnFocus";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { HoursList, OpenNow } from "./Contact";
import { Marquee } from "./Marquee";
import { Tile } from "./Illustrations";
import { PartySize } from "./PartySize";
import { IconClose, IconPhone } from "./icons";

const BAND = ["RESERVIEREN", "RESERVAR", "RÉSERVER", "PRENOTARE", "BOOK A TABLE"];

export function BookingDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, go, href } = useSite();
  const reduce = useReducedMotion();
  const returnFocus = useReturnFocus(open);
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div className="fixed inset-0 z-[450] bg-marca-escura/55 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            </Dialog.Overlay>
            <Dialog.Content forceMount onCloseAutoFocus={returnFocus} asChild aria-describedby="booking-desc">
              <motion.div
                style={{ top: "var(--label-h)" }}
                className="on-dark tex-azulejo fixed bottom-0 right-0 z-[460] flex w-full max-w-[560px] flex-col overflow-hidden bg-marca text-fundo shadow-[-30px_0_60px_-30px_rgba(43,26,18,0.7)] sm:rounded-l-[28px]"
                initial={reduce ? { opacity: 0 } : { x: "100%" }}
                animate={reduce ? { opacity: 1 } : { x: "0%" }}
                exit={reduce ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: reduce ? 0.15 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Marquee className="shrink-0 bg-destaque py-3 text-branco" speed={70} scrollLinked={false} pauseClassName="h-8 w-8 bg-marca-escura text-fundo">
                  {BAND.map((w) => (
                    <span key={w} className="flex items-center gap-5 pr-5 font-display text-[26px] font-semibold leading-none">
                      {w}
                      <Tile className="h-5 w-5" />
                    </span>
                  ))}
                </Marquee>
                <div className="flex-1 overflow-y-auto px-6 pb-10 pt-8 sm:px-10">
                  <div className="flex items-start justify-between gap-4">
                    <Dialog.Title className="fs-xl font-display font-semibold leading-none text-fundo">{UI.reserve[lang]}</Dialog.Title>
                    <Dialog.Close asChild>
                      <button type="button" aria-label={UI.close[lang]} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-fundo text-marca transition active:scale-95">
                        <IconClose size={22} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <p id="booking-desc" className="mt-4 text-[15px] text-fundo/80">
                    {TX.n_svcResLine[lang]}
                  </p>
                  <PartySize compact className="mt-6" />
                  <div className="mt-6 grid gap-3">
                    {BUSINESS.phones.map((p) => (
                      <a key={p.tel} href={`tel:${p.tel}`} className="btn btn--lg btn--orange justify-between">
                        <span className="btn-roll">
                          <span>{p.show}</span>
                          <span aria-hidden="true">{p.show}</span>
                        </span>
                        <IconPhone size={22} />
                      </a>
                    ))}
                    <a
                      href={href("kontakt", "formular")}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        setTimeout(() => go("kontakt", "formular"), 120);
                      }}
                      className="btn btn--cream"
                    >
                      <span className="btn-roll">
                        <span>{TX.n_formTitle[lang]}</span>
                        <span aria-hidden="true">{TX.n_formTitle[lang]}</span>
                      </span>
                    </a>
                  </div>
                  <OpenNow className="mt-7" />
                  <HoursList className="mt-3 text-[15px] text-fundo/85" />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
