import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI, type Localized, type PageKey } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { SiteLink } from "./SiteLink";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV: { label: Localized; page: PageKey; section?: string }[] = [
  { label: UI.navPlats, page: "plats" },
  { label: UI.navVins, page: "vins" },
  { label: UI.navDesserts, page: "desserts" },
  { label: UI.navHours, page: "home", section: "horaires" },
  { label: UI.navContact, page: "home", section: "contact" },
];

/** Sticky header that tightens once the page scrolls: the bar moves up a little and the logo scales down. */
export function Header() {
  const { lang, page } = useSite();
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

  return (
    <header className="sticky z-[200] h-[var(--header-h)]" style={{ top: "calc(var(--label-h) + env(safe-area-inset-top, 0px))" }}>
      <div
        className={cn(
          "gutter absolute inset-0 border-b transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out-expo",
          compact ? "-translate-y-2 border-ink/10 bg-tile/95 shadow-[0_10px_30px_-24px_rgba(15,27,45,0.7)] backdrop-blur-md" : "border-transparent bg-tile",
        )}
      >
        <div className="wrap flex h-full items-center gap-4">
          <SiteLink page="home" className="shrink-0 rounded-2xl" aria-label={`Restaurant Don Duarte, ${UI.home[lang]}`}>
            <span className={cn("block origin-left transition-transform duration-300 ease-out-expo", compact ? "translate-y-1 scale-[0.84]" : "")}>
              <Logo alt="" className="w-[124px] px-1 py-1 lg:w-[150px]" />
            </span>
          </SiteLink>
          <nav aria-label={UI.mainNav[lang]} className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.label.fr}>
                  <SiteLink
                    page={n.page}
                    section={n.section}
                    aria-current={!n.section && n.page === page ? "page" : undefined}
                    className="relative rounded-full px-3.5 py-2 text-[15px] font-semibold text-ink transition-colors hover:text-azulejo aria-[current=page]:text-azulejo"
                  >
                    {n.label[lang]}
                    {!n.section && n.page === page && <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-red" />}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <a href={CONTACT.tel} className="inline-flex h-10 items-center gap-2 rounded-full bg-red px-4 text-sm font-bold text-tile transition-colors hover:bg-red-deep">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
              </svg>
              {UI.call[lang]}
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? UI.closeMenu[lang] : UI.openMenu[lang]}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-0.5 w-5 rounded bg-ink transition-transform duration-200", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-0.5 w-5 rounded bg-ink transition-transform duration-200", open && "-translate-y-[5px] -rotate-45")} />
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
            className="gutter absolute inset-x-0 top-full border-b border-ink/10 bg-tile pb-6 pt-2 shadow-[0_24px_40px_-30px_rgba(15,27,45,0.8)] lg:hidden"
          >
            <nav aria-label={UI.mainNav[lang]} className="wrap">
              <ul className="grid gap-1">
                {NAV.map((n) => (
                  <li key={n.label.fr}>
                    <SiteLink page={n.page} section={n.section} onClick={() => setOpen(false)} className="block rounded-xl px-2 py-3 font-display text-2xl font-medium text-ink">
                      {n.label[lang]}
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-ink/10 px-2 pt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">{UI.language[lang]}</p>
                <LanguageSwitcher inline />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
