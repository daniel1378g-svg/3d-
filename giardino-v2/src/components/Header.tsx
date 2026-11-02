// The floating header: the olive brand capsule at the top left and, on the right, the cream glass capsule with the
// navigation (a dark-olive pill springs to the current page or home section), "More", the language menu and
// "Reserve a Table". After 24 px of scrolling both capsules tighten (.5 s). Below 1024 px: compact logo, Reserve,
// the language code and the burger that opens the full-screen menu.
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/business";
import { cn } from "@/lib/utils";
import { BrandCapsule } from "./Brand";
import { LanguageMenu } from "./LanguageMenu";
import { PillButton, Roll } from "./ui/Pill";
import { IconChevron, IconExternal, IconMenu } from "./icons";

const MobileMenu = lazy(() => import("./MobileMenu"));

export const NAV: { page: PageKey; key: "menu" | "families" | "story" | "visit" }[] = [
  { page: "menu", key: "menu" },
  { page: "families", key: "families" },
  { page: "story", key: "story" },
  { page: "visit", key: "visit" },
];

/** Home sections → the navigation item they belong to (for the sliding pill on the home page). */
const SECTION_NAV: Record<string, PageKey> = { kitchen: "menu", delights: "menu", menus: "menu", offerings: "families", hosts: "story", hours: "visit", contact: "visit" };

function useHomeSection(active: boolean) {
  const [section, setSection] = useState<PageKey | null>(null);
  useEffect(() => {
    if (!active) return setSection(null);
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let best: PageKey | null = null;
      for (const el of document.querySelectorAll<HTMLElement>("main [data-nav]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) best = (SECTION_NAV[el.dataset.nav ?? ""] as PageKey) ?? null;
      }
      setSection(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);
  return section;
}

/** The secondary links (Gallery, Vouchers, Partner Hotels, Virtual Tour, Contact) in a small glass dropdown. */
function MoreMenu() {
  const { lang, href, go } = useSite();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = [...(list.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
        const i = items.indexOf(document.activeElement as HTMLAnchorElement);
        items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
        e.preventDefault();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => list.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const internal = (page: PageKey, label: string, section?: string) => (
    <a
      href={href(page, section)}
      onClick={(e) => {
        e.preventDefault();
        setOpen(false);
        go(page, section);
      }}
      className="flex min-h-11 items-center rounded-full px-4 font-display text-[15px] font-semibold uppercase tracking-[0.1em] hover:bg-ink/5 focus-visible:bg-ink/5"
    >
      {label}
    </a>
  );
  const external = (url: string, label: string) => (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex min-h-11 items-center justify-between gap-3 rounded-full px-4 font-display text-[15px] font-semibold uppercase tracking-[0.1em] hover:bg-ink/5 focus-visible:bg-ink/5">
      {label}
      <IconExternal size={15} className="opacity-60" />
      <span className="sr-only"> ({UI.newTab[lang]})</span>
    </a>
  );
  return (
    <div ref={root} className="relative">
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="more-list"
        onClick={() => setOpen((o) => !o)}
        className="roll-host flex h-11 items-center gap-1 rounded-full px-3.5 font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-ink/5"
      >
        <Roll>{UI.more[lang]}</Roll>
        <IconChevron size={14} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={list}
            id="more-list"
            aria-label={UI.moreNav[lang]}
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute right-0 top-full z-50 mt-3 w-72 origin-top-right list-none rounded-[28px] p-2 text-ink"
          >
            <li>{internal("gallery", UI.gallery[lang])}</li>
            <li>{external(BUSINESS.vouchers(lang), UI.vouchers[lang])}</li>
            <li>{internal("hotels", UI.hotels[lang])}</li>
            <li>{external(BUSINESS.tour(lang), UI.tour[lang])}</li>
            <li>{internal("visit", UI.contact[lang], "contact")}</li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const { lang, page, href, go, book } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const section = useHomeSection(page === "home");
  const current = page === "home" ? section : page;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 z-[300]" style={{ top: "var(--top-safe)" }}>
      <div className={cn("mx-auto flex max-w-[var(--max)] items-center justify-between gap-3 px-[var(--gutter)] transition-[padding] duration-500 ease-[var(--ease-out)]", scrolled ? "py-2.5" : "py-4")}>
        <BrandCapsule small={scrolled} id="brand" />
        {/* desktop */}
        <div className="glass pointer-events-auto hidden items-center gap-0.5 rounded-full p-1.5 lg:flex">
          <nav aria-label={UI.mainNav[lang]}>
            <ul className="flex list-none items-center">
              {NAV.map((n) => {
                const on = current === n.page;
                return (
                  <li key={n.page}>
                    <a
                      href={href(n.page)}
                      aria-current={page === n.page ? "page" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        go(n.page);
                      }}
                      className="roll-host relative flex h-11 items-center rounded-full px-3.5 font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-ink xl:px-4"
                    >
                      {on && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-olive" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
                      <span className={cn("relative transition-colors duration-300", on && "text-white")}>
                        <Roll>{UI[n.key][lang]}</Roll>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <MoreMenu />
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-ink/15" />
          <LanguageMenu />
          <PillButton size="sm" onClick={book} className="ml-1">
            <span className="xl:hidden">{UI.reserveShort[lang]}</span>
            <span className="hidden xl:inline">{UI.reserve[lang]}</span>
          </PillButton>
        </div>
        {/* phones and tablets */}
        <div className="glass pointer-events-auto flex items-center gap-1.5 rounded-full p-1.5 lg:hidden">
          <PillButton size="sm" onClick={book} className="px-4">
            {UI.reserveShort[lang]}
          </PillButton>
          <LanguageMenu compact />
          <button
            type="button"
            onClick={() => {
              setMenuLoaded(true);
              setMenu(true);
            }}
            aria-label={UI.openMenu[lang]}
            aria-expanded={menu}
            aria-haspopup="dialog"
            className="grid h-11 w-11 place-items-center rounded-full bg-olive text-white"
          >
            <IconMenu size={22} />
          </button>
        </div>
      </div>
      {menuLoaded && (
        <Suspense fallback={null}>
          <MobileMenu open={menu} onClose={() => setMenu(false)} />
        </Suspense>
      )}
    </header>
  );
}
