import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { UI, type PageKey } from "@/i18n";
import { CONTACT, logo } from "@/contact";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { SiteLink } from "./SiteLink";
import { LanguageMenu } from "./LanguageMenu";
import { CloseIcon, PhoneIcon } from "./icons";

const LINKS: { page: PageKey; section?: string; key: keyof typeof UI.nav; tone: string }[] = [
  { page: "pizzeria", key: "pizzeria", tone: "bg-oven" },
  { page: "steakhouse", key: "steakhouse", tone: "bg-ember" },
  { page: "choucalino", key: "choucalino", tone: "bg-sky" },
  { page: "menu", key: "menu", tone: "bg-beak" },
  { page: "anreise", key: "anreise", tone: "bg-sand" },
  { page: "home", section: "bilder", key: "bilder", tone: "bg-snow" },
];
const DESKTOP: { page: PageKey; label: (l: ReturnType<typeof useSite>["lang"]) => string }[] = [
  { page: "pizzeria", label: (l) => UI.navShort.pizzeria[l] },
  { page: "steakhouse", label: (l) => UI.navShort.steakhouse[l] },
  { page: "choucalino", label: (l) => UI.navShort.choucalino[l] },
  { page: "menu", label: (l) => UI.nav.menu[l] },
  { page: "anreise", label: (l) => UI.nav.anreise[l] },
];

/**
 * Desktop: logo · links · language pill · "Tisch reservieren". Phone and tablet: logo · language pill ·
 * "Menü" (full-screen overlay). Tightens once the page scrolls; a thin gold line shows the reading progress.
 */
export function Header() {
  const { lang, page, book } = useSite();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [page, lang]);
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("a, button")?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const f = [...panel.current.querySelectorAll<HTMLElement>("a[href], button")];
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="on-light sticky z-[200]" style={{ top: "calc(var(--label-h) + env(safe-area-inset-top, 0px))" }}>
      <div className={cn("gutter border-b transition-[background-color,border-color] duration-300", compact ? "border-line bg-snow/94 backdrop-blur-md" : "border-transparent bg-snow")}>
        <div className={cn("wrap flex items-center gap-2 transition-[height] duration-300 ease-out-expo sm:gap-3", compact ? "h-14 lg:h-16" : "h-[var(--header-h)]")}>
          <SiteLink page="home" className="flex shrink-0 items-center rounded-lg" aria-label={`The Choucas Connection, ${UI.home[lang]}`}>
            <img
              src={logo()}
              alt=""
              width={468}
              height={122}
              className={cn("h-auto w-[112px] transition-[width] duration-300 ease-out-expo sm:w-[150px] lg:w-[168px]", compact && "w-[104px] sm:w-[136px] lg:w-[148px]")}
            />
          </SiteLink>
          <nav aria-label={UI.mainNav[lang]} className="ml-6 hidden lg:block">
            <ul className="flex items-center gap-1">
              {DESKTOP.map((l) => {
                const active = page === l.page;
                return (
                  <li key={l.page}>
                    <SiteLink
                      page={l.page}
                      aria-current={active ? "page" : undefined}
                      className={cn("relative inline-flex h-10 items-center rounded-full px-3 text-[15px] font-medium transition-colors", active ? "text-ink" : "text-ink/70 hover:text-ink")}
                    >
                      {l.label(lang)}
                      {active && <motion.span layoutId="nav-active" className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-brand" transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.4 }} />}
                    </SiteLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-1.5 text-ink sm:gap-2">
            <LanguageMenu />
            <button type="button" onClick={book} className="hidden h-11 items-center rounded-full bg-beak px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-[#f5c55d] sm:inline-flex">
              {UI.bookTable[lang]}
            </button>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
              className="flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-[15px] font-medium text-white transition-colors hover:bg-ink-2 lg:hidden"
            >
              <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
                <span className="h-[1.5px] w-[18px] rounded bg-white" />
                <span className="h-[1.5px] w-[18px] rounded bg-white" />
                <span className="h-[1.5px] w-3 rounded bg-white" />
              </span>
              {UI.menuButton[lang]}
            </button>
          </div>
        </div>
      </div>
      <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-beak" style={{ scaleX: reduce ? scrollYProgress : progress }} />

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={UI.mainNav[lang]}
            className="on-dark fixed inset-0 z-[260] overflow-y-auto bg-ink text-snow"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="gutter flex min-h-full flex-col" style={{ paddingTop: "calc(var(--label-h) + env(safe-area-inset-top, 0px))", paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))" }}>
              <div className="wrap flex h-[var(--header-h)] items-center justify-between">
                <span className="rounded-xl bg-snow px-3 py-1.5">
                  <img src={logo()} alt="" width={468} height={122} className="h-auto w-[104px] sm:w-[136px]" />
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    menuButton.current?.focus();
                  }}
                  className="flex h-11 items-center gap-2 rounded-full border border-snow/35 px-4 text-[15px] font-medium hover:border-snow"
                >
                  <CloseIcon size={18} />
                  {UI.close[lang]}
                </button>
              </div>
              {/* links sit low on the screen, within reach of a thumb */}
              <nav className="wrap mt-auto pb-6 pt-10">
                <ul className="grid gap-1">
                  {LINKS.map((l, i) => (
                    <motion.li
                      key={l.key}
                      initial={reduce ? false : { opacity: 0, transform: "translateY(18px)" }}
                      animate={{ opacity: 1, transform: "translateY(0px)" }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-snow/10"
                    >
                      <SiteLink
                        page={l.page}
                        section={l.section}
                        aria-current={page === l.page && !l.section ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="group flex min-h-14 items-center gap-4 py-2 font-display text-[clamp(1.9rem,7vw,3.2rem)] font-semibold leading-none tracking-tight"
                      >
                        <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full transition-transform group-hover:scale-150", l.tone)} />
                        <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5">{UI.nav[l.key][lang]}</span>
                      </SiteLink>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 grid gap-3 sm:flex">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      book();
                    }}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-beak px-6 text-[17px] font-semibold text-ink hover:bg-[#f5c55d]"
                  >
                    {UI.bookTable[lang]}
                  </button>
                  <a href={CONTACT.tel} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-snow/35 px-6 text-[17px] font-semibold hover:border-snow">
                    <PhoneIcon />
                    {CONTACT.phone}
                  </a>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
