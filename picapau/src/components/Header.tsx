// HOY!'s header for Pica Pau: the logo chip top left (shrinks after 24 px; the bird knocks and the letters
// bounce on hover or tap), and on the right a floating glass pill with the nav links (labels roll up, the
// current one gets a sliding blue pill), the language menu and the gold "Réserver" pill. On phones the pill
// holds "Réserver", the round language button and the burger, which opens the full-screen menu.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, stagger, useAnimate, useReducedMotion } from "motion/react";
import { copy } from "@/copy";
import { CONTACT } from "@/contact";
import { LOGO } from "@/content/photos";
import { useSite } from "@/site";
import type { PageKey } from "@/i18n";
import { cn, EASE_IN_OUT, EASE_OUT } from "@/lib/utils";
import { LanguageMenu, LanguagePills } from "./LanguageMenu";
import { PhoneGlyph, Roll } from "./ui";

type NavItem = { key: string; page: PageKey; section?: string; label: string };

function useNav(): NavItem[] {
  const { lang } = useSite();
  const n = copy(lang).nav;
  return [
    { key: "carte", page: "carte", label: n.carte },
    { key: "galerie", page: "home", section: "galerie", label: n.gallery },
    { key: "infos", page: "home", section: "infos", label: n.info },
    { key: "facebook-latest", page: "home", section: "facebook-latest", label: n.daily },
  ];
}

/** Which nav item is current: the carte page, or the home section under the middle of the screen. */
function useCurrent(): string | null {
  const { page } = useSite();
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (page !== "home") {
      setCurrent(page === "carte" ? "carte" : null);
      return;
    }
    // looked up on every check, since the lower sections mount after the first paint
    const ids = ["carte", "galerie", "facebook-latest", "infos"];
    let raf = 0;
    const check = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      const hit = ids.find((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect();
        return r && r.top <= mid && r.bottom > mid;
      });
      setCurrent(hit ?? null);
    };
    const on = () => (raf ||= requestAnimationFrame(check));
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    check();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [page]);
  return current;
}

/** The bird and "PICA PAU": the bird knocks three times and the letters bounce one after another. */
export function LogoChip() {
  const { lang, href, go } = useSite();
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const busy = useRef(false);
  const knock = async () => {
    if (reduce || busy.current) return;
    busy.current = true;
    await Promise.all([
      animate("img", { rotate: [0, -16, 4, -16, 4, -16, 4, 0] }, { duration: 0.9, ease: "easeInOut" }),
      animate(".hd-word span", { y: [0, -7, 0] }, { duration: 0.42, delay: stagger(0.05), ease: EASE_OUT }),
    ]);
    busy.current = false;
  };
  return (
    <a
      ref={scope}
      href={href("home")}
      className="hd-logo"
      aria-label={`Pica Pau – ${copy(lang).nav.home}`}
      data-header-logo
      onPointerEnter={knock}
      onFocus={knock}
      onClick={(e) => {
        e.preventDefault();
        knock();
        go("home", "accueil");
      }}
    >
      <img src={LOGO.src(160)} alt="" width="46" height="46" />
      <span className="hd-word" aria-hidden="true">
        {"PICA PAU".split("").map((ch, i) => (
          <span key={i}>{ch === " " ? " " : ch}</span>
        ))}
      </span>
    </a>
  );
}

export function Header() {
  const { lang, href, go, book } = useSite();
  const t = copy(lang);
  const nav = useNav();
  const current = useCurrent();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const reserve = (
    <button type="button" className="btn hd-reserve" aria-haspopup="dialog" onClick={(e) => book(e.currentTarget)}>
      <Roll>{t.nav.book}</Roll>
    </button>
  );

  return (
    <header className={cn("hd", scrolled && "is-scrolled")} data-site-header>
      <LogoChip />
      <nav className="hd-pill" aria-label={t.ui.mainNav}>
        <ul className="hd-links hd-desktop">
          {nav.map((item) => (
            <li key={item.key}>
              <a
                href={href(item.page, item.section)}
                className="hd-link roll-host"
                aria-current={current === item.key ? (item.page === "carte" ? "page" : "true") : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.page, item.section);
                }}
              >
                {current === item.key && (
                  <motion.span layoutId="hd-pill" className="hd-link-pill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />
                )}
                <Roll>{item.label}</Roll>
              </a>
            </li>
          ))}
        </ul>
        <div className="hd-desktop">
          <LanguageMenu />
        </div>
        {reserve}
        <div className="hd-mobile items-center gap-1">
          <LanguageMenu round />
          <button
            ref={burger}
            type="button"
            className="hd-round hd-burger"
            aria-haspopup="dialog"
            aria-expanded={menu}
            aria-label={t.ui.menuButton}
            onClick={() => setMenu(true)}
          >
            <span aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </nav>
      <MobileMenu
        open={menu}
        onClose={() => {
          setMenu(false);
          setTimeout(() => burger.current?.focus(), 30);
        }}
        nav={nav}
      />
    </header>
  );
}

function MobileMenu({ open, onClose, nav }: { open: boolean; onClose: () => void; nav: NavItem[] }) {
  const { lang, go, href, book } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const items: NavItem[] = [{ key: "accueil", page: "home", section: "accueil", label: t.nav.home }, ...nav];

  useEffect(() => {
    const d = dialog.current;
    if (open && d && !d.open) {
      d.showModal();
      document.documentElement.classList.add("has-dialog");
    }
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0"
      aria-label={t.ui.menuButton}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <AnimatePresence
        onExitComplete={() => {
          dialog.current?.close();
          document.documentElement.classList.remove("has-dialog");
        }}
      >
        {open && (
          <motion.div
            key="panel"
            className="tone-azulejo tex-cork absolute inset-0 flex flex-col gap-6 overflow-y-auto px-[var(--gutter)] pb-8"
            style={{ paddingTop: "calc(var(--label-h) + 14px)" }}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE_IN_OUT }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-[0.04em]">
                <img src={LOGO.src(160)} alt="" width="44" height="44" />
                PICA PAU
              </span>
              <button type="button" onClick={onClose} aria-label={t.map.close} className="grid h-[52px] w-[52px] cursor-pointer place-items-center rounded-full bg-branco text-tinta">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="m-0 mt-auto grid list-none gap-0.5 p-0">
              {items.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={reduce ? false : { y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + 0.06 * i, duration: 0.6, ease: EASE_OUT }}
                >
                  <a
                    href={href(item.page, item.section)}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      setTimeout(() => go(item.page, item.section), 380);
                    }}
                    className="block py-1 font-display text-[clamp(44px,12.5vw,84px)] font-bold uppercase leading-[0.95] text-branco no-underline hover:text-dourado focus-visible:text-dourado"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="grid justify-items-start gap-5"
              initial={reduce ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="btn"
                  aria-haspopup="dialog"
                  onClick={() => {
                    onClose();
                    setTimeout(() => book(), 450);
                  }}
                >
                  <Roll>{t.nav.book}</Roll>
                </button>
                <LanguagePills onPicked={onClose} />
              </div>
              <ul className="m-0 grid list-none gap-1.5 p-0 text-base">
                <li>
                  <a href={CONTACT.phoneHref} className="inline-flex min-h-11 items-center gap-2 font-bold text-branco">
                    <span className="h-5 w-5">
                      <PhoneGlyph />
                    </span>
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-5">
                  <a href={CONTACT.instagram} target="_blank" rel="noopener" className="link-line">
                    Instagram<span className="sr-only"> {t.ui.newWindow}</span>
                  </a>
                  <a href={CONTACT.facebook} target="_blank" rel="noopener" className="link-line">
                    Facebook<span className="sr-only"> {t.ui.newWindow}</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
