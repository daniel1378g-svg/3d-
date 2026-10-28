import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { CONTACT, logo } from "@/contact";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { SiteLink } from "./SiteLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ExternalIcon, PhoneIcon } from "./icons";

const link = "relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-[15px] font-semibold text-linen transition-colors hover:bg-linen/12";

/** Infos · Menu · Réservation · Livraison, the language, and Appeler. Tightens once the page scrolls. */
export function Header() {
  const { lang, page, book } = useSite();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [page, lang]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const items = (mobile: boolean) => {
    const cls = mobile ? "flex min-h-12 w-full items-center gap-2 rounded-xl px-2 font-display text-2xl font-semibold text-bordeaux hover:text-ember-deep" : link;
    return (
      <>
        <li>
          <SiteLink page="home" section="a-propos" className={cls} onClick={() => setOpen(false)}>
            {UI.infos[lang]}
          </SiteLink>
        </li>
        <li>
          <SiteLink page="menu" aria-current={page === "menu" ? "page" : undefined} className={cls} onClick={() => setOpen(false)}>
            {UI.menu[lang]}
            {!mobile && page === "menu" && <span aria-hidden="true" className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-gold" />}
          </SiteLink>
        </li>
        <li>
          <button
            type="button"
            className={cls}
            onClick={() => {
              setOpen(false);
              book();
            }}
          >
            {UI.booking[lang]}
          </button>
        </li>
        <li>
          <a href={CONTACT.delivery} target="_blank" rel="noopener" className={cls}>
            {UI.delivery[lang]}
            <ExternalIcon className="opacity-70" />
            <span className="sr-only"> ({UI.newTab[lang]})</span>
          </a>
        </li>
        {mobile && (
          <li>
            <SiteLink page="home" section="contact" className={cls} onClick={() => setOpen(false)}>
              {UI.writeUs[lang]}
            </SiteLink>
          </li>
        )}
      </>
    );
  };

  return (
    <header className="on-dark sticky z-[200] h-[var(--header-h)]" style={{ top: "calc(var(--label-h) + env(safe-area-inset-top, 0px))" }}>
      <div
        className={cn(
          "gutter absolute inset-0 border-b transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out-expo",
          compact ? "-translate-y-2 border-bordeaux-deep bg-bordeaux/95 shadow-[0_10px_30px_-22px_rgba(27,20,20,0.9)] backdrop-blur-md" : "border-transparent bg-bordeaux",
        )}
      >
        <div className="wrap flex h-full items-center gap-3">
          <SiteLink page="home" className="flex shrink-0 items-center gap-3 rounded-full" aria-label={`Zé-do-Pipo, ${UI.home[lang]}`}>
            <span className={cn("block origin-left transition-transform duration-300 ease-out-expo", compact ? "translate-y-1 scale-[0.84]" : "")}>
              <img src={logo()} alt="" width={56} height={56} className="h-12 w-12 rounded-full lg:h-14 lg:w-14" />
            </span>
            <span aria-hidden="true" className="hidden font-display text-lg font-bold tracking-tight text-linen sm:block">
              Zé-do-Pipo
            </span>
          </SiteLink>
          <nav aria-label={UI.mainNav[lang]} className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-0.5">{items(false)}</ul>
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <a href={CONTACT.tel} className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-4 text-sm font-bold text-charcoal transition-colors hover:bg-gold">
              <PhoneIcon />
              {UI.call[lang]}
              <span className="sr-only"> {CONTACT.phone}</span>
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-linen/40 text-linen lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? UI.closeMenu[lang] : UI.openMenu[lang]}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-0.5 w-5 rounded bg-linen transition-transform duration-200", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-0.5 w-5 rounded bg-linen transition-transform duration-200", open && "-translate-y-[5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="on-light gutter absolute inset-x-0 top-full max-h-[calc(100svh-var(--header-h)-var(--label-h))] overflow-y-auto border-b border-charcoal/10 bg-linen pb-6 pt-2 shadow-[0_24px_40px_-30px_rgba(27,20,20,0.8)] lg:hidden"
          >
            <nav aria-label={UI.mainNav[lang]} className="wrap">
              <ul className="grid gap-1">{items(true)}</ul>
              <div className="mt-4 border-t border-charcoal/10 px-2 pt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">{UI.language[lang]}</p>
                <LanguageSwitcher inline tone="light" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
