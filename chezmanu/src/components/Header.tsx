import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HTML_LANG, LANGS, NATIVE, TEXT, UI, type PageKey } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteLink } from "./SiteLink";
import { Magnetic } from "./Magnetic";
import { PhoneGlyph } from "./Glyphs";

/** Sticky header that shrinks on scroll: logo, the three pages, the language switcher and «Appelez-nous». */
export function Header() {
  const { lang, page, requestLanguage, switching } = useSite();
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

  const links: { key: PageKey; label: string }[] = [
    { key: "home", label: UI.home[lang] },
    { key: "offer", label: UI.offer[lang] },
    { key: "contact", label: UI.contact[lang] },
  ];

  return (
    <header className="fixed inset-x-0 z-[300]" style={{ top: "var(--label-h)" }}>
      <div
        className={cn(
          "gutter transition-[background-color,box-shadow] duration-300",
          scrolled || open ? "bg-flour/92 shadow-[0_1px_0_rgb(42_26_18/0.08),0_12px_30px_-22px_rgb(42_26_18/0.5)] backdrop-blur-md" : "bg-flour/70 backdrop-blur-sm",
        )}
      >
        <div className="wrap flex items-center justify-between gap-3 transition-[height] duration-300" style={{ height: scrolled ? 64 : "var(--header-h)" }}>
          <SiteLink page="home" className="relative flex shrink-0 items-center" aria-current={page === "home" ? "page" : undefined}>
            <img
              src={asset("brand/logo-300.webp")}
              alt="Chez Manu"
              width={284}
              height={145}
              className="h-auto origin-left transition-[width] duration-300 ease-[var(--ease-out-expo)]"
              style={{ width: scrolled ? 96 : 128 }}
            />
            <span className="sr-only"> – {UI.home[lang]}</span>
          </SiteLink>

          <nav aria-label={UI.mainNav[lang]} className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <SiteLink
                key={l.key}
                page={l.key}
                aria-current={page === l.key ? "page" : undefined}
                className="relative rounded-full px-4 py-2 text-[15px] font-semibold text-espresso transition-colors hover:bg-espresso/[0.06] aria-[current=page]:text-cocoa"
              >
                {l.label}
                {page === l.key && <motion.span layoutId="nav-dot" aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-wheat" />}
              </SiteLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher compact />
            <Magnetic>
              <a href={CONTACT.phoneHref} className="btn btn-dark hidden min-h-11 md:inline-flex" data-cursor="call">
                <PhoneGlyph />
                {TEXT.callUs[lang]}
              </a>
            </Magnetic>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-espresso px-3.5 text-sm font-semibold text-flour sm:h-11 sm:px-4 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span className={cn("absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute left-0 top-[5px] h-0.5 w-4 bg-current transition-opacity", open && "opacity-0")} />
                <span className={cn("absolute left-0 top-[10px] h-0.5 w-4 bg-current transition-transform", open && "-translate-y-[5px] -rotate-45")} />
              </span>
              <span className={open ? "sr-only sm:not-sr-only" : undefined}>{open ? UI.closeMenu[lang] : UI.menu[lang]}</span>
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
            className="gutter absolute inset-x-0 top-full border-t border-espresso/10 bg-flour pb-8 pt-4 shadow-lift lg:hidden"
          >
            <nav aria-label={UI.mainNav[lang]} className="wrap">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.key} className="border-b border-espresso/10">
                    <SiteLink page={l.key} aria-current={page === l.key ? "page" : undefined} onClick={() => setOpen(false)} className="display block w-full py-4 text-left text-3xl text-espresso aria-[current=page]:text-cocoa">
                      {l.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <a href={CONTACT.phoneHref} className="btn btn-dark mt-6 w-full">
                <PhoneGlyph />
                {TEXT.callUs[lang]} · {CONTACT.phone}
              </a>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label={UI.language[lang]}>
                {LANGS.map((l) => (
                  <li key={l}>
                    <button type="button" lang={HTML_LANG[l]} disabled={switching} aria-current={l === lang ? "true" : undefined} onClick={() => requestLanguage(l)} className={cn("min-h-11 text-[15px] font-semibold", l === lang ? "text-cocoa underline underline-offset-4" : "text-espresso/80")}>
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
