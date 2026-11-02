// The phone menu: a full-screen olive panel that wipes down from the top (.6 s clip). Big labels rise from behind
// their masks one after another (.06 s apart), then the secondary links, Reserve, the phone and e-mail, and the
// languages. Radix Dialog traps focus, closes on Escape, locks the page behind and gives focus back on close.
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/business";
import { cn } from "@/lib/utils";
import { useReturnFocus } from "@/lib/useReturnFocus";
import { Medallion } from "./Brand";
import { LanguagePills } from "./LanguageMenu";
import { PillButton } from "./ui/Pill";
import { IconClose, IconExternal, IconMail, IconPhone } from "./icons";

const MAIN: { page: PageKey; label: "home" | "menu" | "families" | "story" | "visit" }[] = [
  { page: "home", label: "home" },
  { page: "menu", label: "menu" },
  { page: "families", label: "families" },
  { page: "story", label: "story" },
  { page: "visit", label: "visit" },
];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, page, href, go, book } = useSite();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useReturnFocus(open);
  const nav = (p: PageKey, section?: string) => {
    onClose();
    setTimeout(() => go(p, section), 80);
  };
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Radix locks the page's scrolling from its overlay: invisible here, the panel covers the screen */}
            <Dialog.Overlay forceMount className="fixed inset-0 z-[399]" />
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
                className="tex-leaf fixed inset-0 z-[400] overflow-y-auto bg-olive text-white"
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
                exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: reduce ? 0.15 : 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                <Dialog.Title className="sr-only">{UI.mainNav[lang]}</Dialog.Title>
                <div className="flex min-h-full flex-col px-[var(--gutter)] pb-10" style={{ paddingTop: "calc(var(--top-safe) + 16px)" }}>
                  <div className="flex items-center justify-between">
                    <a
                      href={href("home")}
                      aria-label={UI.homeLink[lang]}
                      onClick={(e) => {
                        e.preventDefault();
                        nav("home");
                      }}
                      className="flex items-center gap-3 rounded-full bg-olive-deep p-2 pr-4"
                    >
                      <Medallion className="h-12 w-12" />
                      <span className="font-display text-lg font-bold uppercase tracking-[0.08em]">Giardino</span>
                    </a>
                    <Dialog.Close asChild>
                      <button ref={closeRef} type="button" aria-label={UI.close[lang]} className="grid h-12 w-12 place-items-center rounded-full bg-cream text-ink">
                        <IconClose size={22} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <nav aria-label={UI.mainNav[lang]} className="mt-8">
                    <ul className="list-none space-y-1">
                      {MAIN.map((m, i) => {
                        const on = m.page === page;
                        return (
                          <li key={m.label} className="overflow-hidden">
                            <motion.a
                              href={href(m.page)}
                              aria-current={on ? "page" : undefined}
                              onClick={(e) => {
                                e.preventDefault();
                                nav(m.page);
                              }}
                              initial={reduce ? false : { y: "110%" }}
                              animate={{ y: "0%" }}
                              transition={{ duration: 0.6, delay: reduce ? 0 : 0.22 + i * 0.06, ease }}
                              className={cn("block py-1 font-display text-[clamp(42px,11.5vw,72px)] font-extrabold uppercase leading-[0.95] tracking-[-0.01em]", on ? "text-gold" : "text-white")}
                            >
                              {UI[m.label][lang]}
                            </motion.a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <motion.div className="mt-8 space-y-7" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: reduce ? 0 : 0.6, ease }}>
                    <ul className="flex list-none flex-wrap gap-x-5 gap-y-1 font-display text-[17px] font-semibold uppercase tracking-[0.1em]">
                      <li>
                        <a className="link inline-flex min-h-11 items-center" href={href("gallery")} onClick={(e) => (e.preventDefault(), nav("gallery"))}>
                          {UI.gallery[lang]}
                        </a>
                      </li>
                      <li>
                        <a className="inline-flex min-h-11 items-center gap-1.5" href={BUSINESS.vouchers(lang)} target="_blank" rel="noopener noreferrer">
                          <span className="link">{UI.vouchers[lang]}</span>
                          <IconExternal size={14} />
                          <span className="sr-only"> ({UI.newTab[lang]})</span>
                        </a>
                      </li>
                      <li>
                        <a className="link inline-flex min-h-11 items-center" href={href("hotels")} onClick={(e) => (e.preventDefault(), nav("hotels"))}>
                          {UI.hotels[lang]}
                        </a>
                      </li>
                      <li>
                        <a className="inline-flex min-h-11 items-center gap-1.5" href={BUSINESS.tour(lang)} target="_blank" rel="noopener noreferrer">
                          <span className="link">{UI.tour[lang]}</span>
                          <IconExternal size={14} />
                          <span className="sr-only"> ({UI.newTab[lang]})</span>
                        </a>
                      </li>
                      <li>
                        <a className="link inline-flex min-h-11 items-center" href={href("visit", "contact")} onClick={(e) => (e.preventDefault(), nav("visit", "contact"))}>
                          {UI.contact[lang]}
                        </a>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      <PillButton
                        onClick={() => {
                          onClose();
                          setTimeout(book, 140);
                        }}
                      >
                        {UI.reserve[lang]}
                      </PillButton>
                      <a href={`tel:${BUSINESS.tel}`} className="btn btn--ghost text-white">
                        <IconPhone size={18} />
                        <span className="btn-roll">
                          <span>{BUSINESS.phone}</span>
                          <span aria-hidden="true">{BUSINESS.phone}</span>
                        </span>
                      </a>
                    </div>
                    <a className="inline-flex min-h-11 items-center gap-2 font-display text-lg tracking-[0.04em]" href={`mailto:${BUSINESS.email}`}>
                      <IconMail size={18} /> <span className="link">{BUSINESS.email}</span>
                    </a>
                    <LanguagePills layoutId="menu-lang-pill" />
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
