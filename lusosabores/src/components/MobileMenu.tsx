// The mobile menu: wipes down from the top; giant links rise one by one, then "Réserver", the five languages
// as pills with a sliding apricot pill, both phones, Facebook and Instagram. Loaded on the first tap.
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/site";
import { cn } from "@/lib/utils";
import { useReturnFocus } from "@/lib/useReturnFocus";
import { LogoChip } from "./Header";
import { LanguagePills } from "./LanguageMenu";
import { PillButton } from "./ui/Pill";
import { IconClose, IconFacebook, IconInstagram, IconPhone } from "./icons";

const MENU_LINKS: { page: PageKey; label: "home" | "menu" | "specialites48" | "ouverts77" | "services" | "galerie" | "avis" | "contact"; section?: string }[] = [
  { page: "home", label: "home" },
  { page: "menu", label: "menu" },
  { page: "home", label: "specialites48", section: "specialites" },
  { page: "home", label: "ouverts77", section: "horaires" },
  { page: "services", label: "services" },
  { page: "galerie", label: "galerie" },
  { page: "home", label: "avis", section: "avis" },
  { page: "contact", label: "contact" },
];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, page, href, go, book } = useSite();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useReturnFocus(open);
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content
              forceMount
              asChild
              aria-describedby={undefined}
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                closeRef.current?.focus();
              }}
              onCloseAutoFocus={returnFocus}
            >
              <motion.div
                className="tex-grill pointer-events-auto fixed inset-0 z-[400] overflow-y-auto bg-marca text-branco"
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
                exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: reduce ? 0.15 : 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                <Dialog.Title className="sr-only">{UI.burger[lang]}</Dialog.Title>
                <div className="flex min-h-full flex-col px-[var(--gutter)] pb-10" style={{ paddingTop: "calc(var(--label-h) + 16px)" }}>
                  <div className="flex items-center justify-between">
                    <LogoChip />
                    <Dialog.Close asChild>
                      <button ref={closeRef} type="button" aria-label={UI.close[lang]} className="grid h-12 w-12 place-items-center rounded-full bg-branco text-marca-escura">
                        <IconClose size={22} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <nav aria-label={UI.mainNav[lang]} className="mt-8">
                    <ul className="list-none space-y-1">
                      {MENU_LINKS.map((m, i) => {
                        const on = m.page === page && !m.section;
                        return (
                          <li key={m.label} className="overflow-hidden">
                            <motion.a
                              href={href(m.page, m.section)}
                              aria-current={on ? "page" : undefined}
                              onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                setTimeout(() => go(m.page, m.section), 80);
                              }}
                              initial={reduce ? false : { y: "110%" }}
                              animate={{ y: "0%" }}
                              transition={{ duration: 0.6, delay: reduce ? 0 : 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                              className={cn("block font-display text-[clamp(40px,11vw,64px)] font-bold uppercase leading-[0.98] tracking-[-0.01em]", on ? "text-destaque" : "text-branco")}
                            >
                              {UI[m.label][lang]}
                            </motion.a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <motion.div
                    className="mt-8 space-y-6"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: reduce ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <PillButton
                      onClick={() => {
                        onClose();
                        setTimeout(book, 120);
                      }}
                    >
                      {UI.reserve[lang]}
                    </PillButton>
                    <LanguagePills layoutId="menu-lang-pill" />
                    <ul className="list-none space-y-2 font-display text-lg tracking-[0.06em]">
                      {BUSINESS.phones.map((p) => (
                        <li key={p.tel}>
                          <a className="link inline-flex items-center gap-2" href={`tel:${p.tel}`}>
                            <IconPhone size={18} /> {p.label}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a className="link inline-flex items-center gap-2" href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
                          <IconFacebook size={18} /> Facebook <span className="sr-only">{UI.externalNew[lang]}</span>
                        </a>
                      </li>
                      <li>
                        <a className="link inline-flex items-center gap-2" href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
                          <IconInstagram size={18} /> Instagram <span className="sr-only">{UI.externalNew[lang]}</span>
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
