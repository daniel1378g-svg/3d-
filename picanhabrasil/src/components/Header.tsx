// Floating header: the logo in a glass capsule on the left; on the right a capsule with "Tisch reservieren", the
// language button (opens the list of five languages) and the menu button. It compacts once the page scrolls.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LANGS, NATIVE, SHORT, fill, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { IconMenu } from "./icons";
import { BULL_OUTLINE, BULL_VIEWBOX } from "@/brand/bull";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <>
      {/* narrow phones: the bull alone (the wordmark is in the hero, the intro and the footer) */}
      <svg viewBox={BULL_VIEWBOX} aria-hidden="true" className="h-8 w-8 text-boi min-[440px]:hidden"><path d={BULL_OUTLINE} fill="currentColor" /></svg>
      <img
      src={asset("/brand/logo.webp")}
      alt=""
      width={500}
      height={123}
      className={cn("h-auto select-none max-[439px]:hidden", compact ? "w-[124px] sm:w-[150px]" : "w-[132px] sm:w-[178px]", className)}
      draggable={false}
      data-logo
    />
    </>
  );
}

export function LanguageMenu({ align = "right", onPicked }: { align?: "left" | "right"; onPicked?: () => void }) {
  const { lang, t, requestLanguage } = useSite();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("pointerdown", onDown); window.removeEventListener("keydown", onKey); };
  }, [open]);
  const pick = (l: Lang) => {
    setOpen(false);
    onPicked?.();
    requestLanguage(l);
  };
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="icon-btn font-display text-[0.8rem] font-bold tracking-[0.08em]"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t.a11y.languageChoose} – ${fill(t.a11y.languageCurrent, { lang: NATIVE[lang] })}`}
        onClick={() => setOpen((o) => !o)}
        data-lang-button
      >
        {SHORT[lang]}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="list"
            initial={{ opacity: 0, transform: "translateY(-6px) scale(0.97)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: "translateY(-4px) scale(0.98)", transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className={cn("glass absolute top-[calc(100%+10px)] z-10 min-w-[190px] rounded-[22px] p-2", align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left")}
          >
            {LANGS.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  lang={l}
                  onClick={() => pick(l)}
                  aria-current={l === lang ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center justify-between gap-6 rounded-[14px] px-4 py-3 text-left text-[0.98rem] transition-colors",
                    l === lang ? "bg-creme text-tinta" : "text-creme hover:bg-creme/10",
                  )}
                >
                  <span>{NATIVE[l]}</span>
                  <span className="kicker opacity-60">{SHORT[l]}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({ onMenu, menuOpen }: { onMenu: () => void; menuOpen: boolean }) {
  const { t, href, go, openBooking } = useSite();
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const on = () => setCompact(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className="pointer-events-none fixed inset-x-0 z-[800] gutter" style={{ top: "calc(var(--label-h) + 12px)" }}>
      <div className="wrap flex items-center justify-between gap-3">
        <a
          href={href("home")}
          onClick={(e) => { e.preventDefault(); go("home"); }}
          aria-label={t.a11y.homeLink}
          className={cn("glass pointer-events-auto flex shrink-0 items-center rounded-full transition-[padding] duration-300", compact ? "px-3 py-2 sm:px-4 sm:py-2.5" : "px-3 py-2.5 sm:px-5 sm:py-3")}
          data-header-logo
        >
          <Logo compact={compact} />
        </a>
        <nav aria-label={t.a11y.mainNav} className="glass pointer-events-auto flex min-w-0 items-center gap-1 rounded-full p-1.5 sm:gap-1.5">
          <button type="button" className="pill pill-sm max-[520px]:px-3.5" onClick={() => openBooking()} data-reserve-button>
            <span className="max-[520px]:hidden">{t.cta.reserve}</span>
            <span className="hidden max-[520px]:inline">{t.reservation.kicker}</span>
          </button>
          <LanguageMenu />
          <button type="button" className="icon-btn" aria-label={menuOpen ? t.a11y.menuClose : t.a11y.menuOpen} aria-expanded={menuOpen} onClick={onMenu} data-menu-button>
            <IconMenu />
          </button>
        </nav>
      </div>
    </header>
  );
}
