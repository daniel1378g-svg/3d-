import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

/** Logo on the left; on the right the language pill, then the dark "Menü" button. Shrinks once the page scrolls. */
export function Header() {
  const { lang, page, book } = useSite();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

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
      <div
        className={cn(
          "gutter border-b transition-[background-color,border-color,box-shadow] duration-300",
          compact ? "border-ink/10 bg-snow/92 shadow-[0_10px_30px_-24px_rgba(22,20,20,0.7)] backdrop-blur-md" : "border-transparent bg-snow",
        )}
      >
        <div className={cn("wrap flex items-center gap-3 transition-[height] duration-300 ease-out-expo", compact ? "h-16" : "h-[var(--header-h)]")}>
          <SiteLink page="home" className="flex shrink-0 items-center rounded-lg" aria-label={`The Choucas Connection, ${UI.home[lang]}`}>
            <img
              src={logo()}
              alt=""
              width={468}
              height={122}
              className={cn("h-auto w-[116px] transition-[width] duration-300 ease-out-expo sm:w-[190px]", compact && "w-[108px] sm:w-[156px]")}
            />
          </SiteLink>
          <div className="ml-auto flex items-center gap-1.5 text-ink sm:gap-2">
            <LanguageMenu />
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
              className="flex h-12 items-center gap-2 rounded-full bg-ink px-4 text-base font-medium text-white transition-colors hover:bg-[#2b2727] sm:gap-2.5 sm:px-5 sm:text-lg"
            >
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-0.5 w-5 rounded bg-white" />
                <span className="h-0.5 w-5 rounded bg-white" />
                <span className="h-0.5 w-3.5 rounded bg-white" />
              </span>
              {UI.menuButton[lang]}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={UI.mainNav[lang]}
            className="on-dark fixed inset-0 z-[260] overflow-y-auto bg-ink text-snow"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 60px) 50px)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 60px) 50px)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 60px) 50px)", transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="gutter" style={{ paddingTop: "calc(var(--label-h) + env(safe-area-inset-top, 0px))" }}>
              <div className="wrap flex h-[var(--header-h)] items-center justify-between">
                <span className="rounded-2xl bg-snow px-3 py-2">
                  <img src={logo()} alt="" width={468} height={122} className="h-auto w-[130px] sm:w-[160px]" />
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    menuButton.current?.focus();
                  }}
                  className="flex h-12 items-center gap-2 rounded-full border border-snow/40 px-5 text-lg font-medium hover:border-snow"
                >
                  <CloseIcon />
                  {UI.close[lang]}
                </button>
              </div>
              <nav className="wrap pb-12 pt-6 md:pt-10">
                <ul className="grid gap-1 md:gap-2">
                  {LINKS.map((l, i) => (
                    <motion.li
                      key={l.key}
                      initial={reduce ? false : { opacity: 0, transform: "translateY(24px)" }}
                      animate={{ opacity: 1, transform: "translateY(0px)" }}
                      transition={{ duration: 0.45, delay: 0.12 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <SiteLink
                        page={l.page}
                        section={l.section}
                        aria-current={page === l.page && !l.section ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="group flex min-h-14 items-center gap-4 rounded-2xl py-1 font-display text-[clamp(2.2rem,8vw,4.8rem)] font-bold leading-none tracking-tight"
                      >
                        <span aria-hidden="true" className={cn("size-3 shrink-0 rounded-full transition-transform group-hover:scale-150 md:size-4", l.tone)} />
                        <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-2">{UI.nav[l.key][lang]}</span>
                      </SiteLink>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      book();
                    }}
                    className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 text-lg font-bold text-ink hover:bg-white"
                  >
                    {UI.book[lang]}
                  </button>
                  <a href={CONTACT.tel} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-snow/40 px-6 text-lg font-bold hover:border-snow">
                    <PhoneIcon />
                    {UI.call[lang]} <span className="font-normal opacity-80">{CONTACT.phone}</span>
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
