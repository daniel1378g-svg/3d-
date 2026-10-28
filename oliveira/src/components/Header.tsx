import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteLink } from "./SiteLink";
import { Magnetic } from "./Magnetic";

/** Sticky header that shrinks on scroll; the logo's tree turns into the green "O" ring as it does. */
export function Header() {
  const { lang, page, openBooking, requestLanguage, switching } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    sheet.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => setOpen(false), [page, lang]);

  const links = [
    { key: "about", label: UI.navAbout[lang], el: (cls: string) => <SiteLink page="home" section="ueber-uns" className={cls} onClick={() => setOpen(false)}>{UI.navAbout[lang]}</SiteLink> },
    { key: "kitchen", label: UI.navKitchen[lang], el: (cls: string) => <SiteLink page="kueche" className={cls} aria-current={page === "kueche" ? "page" : undefined} onClick={() => setOpen(false)}>{UI.navKitchen[lang]}</SiteLink> },
    { key: "booking", label: UI.navReservation[lang], el: (cls: string) => <button type="button" className={cls} onClick={() => { setOpen(false); openBooking(); }} data-cursor="book">{UI.navReservation[lang]}</button> },
    { key: "contact", label: UI.navContact[lang], el: (cls: string) => <SiteLink page="home" section="kontakt" className={cls} onClick={() => setOpen(false)}>{UI.navContact[lang]}</SiteLink> },
  ];

  return (
    <header className="fixed inset-x-0 z-[200]" style={{ top: "var(--label-h)" }}>
      <div
        className={cn(
          "gutter transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled ? "bg-linen/88 shadow-[0_1px_0_rgb(31_34_41/0.08),0_12px_30px_-22px_rgb(31_34_41/0.5)] backdrop-blur-md" : "bg-linen/60 backdrop-blur-md",
        )}
      >
        <div className="wrap flex items-center justify-between gap-4 transition-[height] duration-300" style={{ height: scrolled ? 64 : "var(--header-h)" }}>
          <SiteLink page="home" className="group relative flex items-center gap-3">
            <span className="relative block h-11 w-12 shrink-0">
              <img
                src={asset("brand/tree.webp")}
                alt=""
                width={52}
                height={44}
                className="absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]"
                style={{ opacity: scrolled ? 0 : 1, transform: scrolled ? "scale(0.5) rotate(-20deg)" : "none" }}
              />
              <img
                src={asset("brand/ring.webp")}
                alt=""
                width={40}
                height={40}
                className="absolute inset-[3px] h-[38px] w-[38px] object-contain transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]"
                style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "none" : "scale(1.6) rotate(40deg)" }}
              />
            </span>
            <span className="leading-none">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-bark/80">Restaurante</span>
              <span className="display block text-[26px] font-semibold tracking-[0.04em] text-leaf"> OLIVEIRA</span>
              <span className="sr-only"> – {UI.home[lang]}</span>
            </span>
          </SiteLink>

          <nav aria-label={UI.mainNav[lang]} className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <span key={l.key}>{l.el("rounded-full px-4 py-2 text-[15px] font-semibold text-charcoal transition-colors hover:bg-charcoal/[0.06] aria-[current=page]:text-leaf")}</span>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Magnetic>
              <a href={CONTACT.phoneHref} className="btn btn-dark hidden min-h-11 md:inline-flex" data-cursor="call">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" /></svg>
                {UI.call[lang]}
              </a>
            </Magnetic>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-charcoal px-4 text-sm font-semibold text-linen lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span className={cn("absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute left-0 top-[5px] h-0.5 w-4 bg-current transition-opacity", open && "opacity-0")} />
                <span className={cn("absolute left-0 top-[10px] h-0.5 w-4 bg-current transition-transform", open && "-translate-y-[5px] -rotate-45")} />
              </span>
              {open ? UI.closeMenu[lang] : UI.menu[lang]}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={sheet}
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-12px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
            className="linen gutter absolute inset-x-0 top-full border-t border-charcoal/10 pb-8 pt-4 shadow-lift lg:hidden"
          >
            <nav aria-label={UI.mainNav[lang]} className="wrap">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.key} className="border-b border-charcoal/10">
                    {l.el("display block w-full py-4 text-left text-3xl font-medium text-charcoal")}
                  </li>
                ))}
              </ul>
              <a href={CONTACT.phoneHref} className="btn btn-dark mt-6 w-full">{UI.call[lang]} · {CONTACT.phone}</a>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label={UI.language[lang]}>
                {LANGS.map((l) => (
                  <li key={l}>
                    <button type="button" lang={HTML_LANG[l]} disabled={switching} aria-current={l === lang ? "true" : undefined} onClick={() => requestLanguage(l)} className={cn("text-[15px] font-semibold", l === lang ? "text-leaf underline underline-offset-4" : "text-charcoal/80")}>
                      {NATIVE[l]}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
