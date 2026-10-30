// Full-screen menu: opens as a circle growing out of the menu button (clip-path), links rise in a short stagger.
// Escape closes it, focus moves in and returns to the menu button, the page behind does not scroll.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LANGS, NATIVE, type Anchor, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { resumeScroll, stopScroll } from "@/lib/scroll";
import { useFocusTrap } from "@/lib/focusTrap";
import { EMAIL, PHONE, SHOP } from "@/content/facts";
import { IconClose } from "./icons";

type Item = { label: string; page: PageKey; anchor?: Anchor };

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, go, href, requestLanguage, reduce } = useSite();
  const panel = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState("calc(100% - 48px) 48px");
  useFocusTrap(panel, open);

  useEffect(() => {
    if (!open) return;
    const btn = document.querySelector<HTMLElement>("[data-menu-button]");
    if (btn) {
      const r = btn.getBoundingClientRect();
      setOrigin(`${r.left + r.width / 2}px ${r.top + r.height / 2}px`);
    }
    stopScroll();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const id = requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("[data-first]")?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(id);
      document.documentElement.style.overflow = "";
      resumeScroll();
      document.querySelector<HTMLElement>("[data-menu-button]")?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  const items: Item[] = [
    { label: t.nav.discover, page: "home", anchor: "entdecken" },
    { label: t.nav.range, page: "angebot" },
    { label: t.nav.yourAcai, page: "home", anchor: "becher" },
    { label: t.nav.waffles, page: "home", anchor: "waffeln" },
    { label: t.nav.about, page: "home", anchor: "ueber" },
    { label: t.nav.gallery, page: "home", anchor: "galerie" },
    { label: t.nav.visit, page: "home", anchor: "besuch" },
    { label: t.nav.faq, page: "home", anchor: "faq" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={t.a11y.mainNav}
          className="skin-plum fixed inset-0 z-[880] overflow-y-auto overscroll-contain"
          style={{ top: "var(--label-h)" }}
          initial={reduce ? { opacity: 0 } : { clipPath: `circle(0px at ${origin})` }}
          animate={reduce ? { opacity: 1 } : { clipPath: `circle(150vmax at ${origin})` }}
          exit={reduce ? { opacity: 0 } : { clipPath: `circle(0px at ${origin})`, transition: { duration: 0.38, ease: EASE_IN_OUT } }}
          transition={{ duration: reduce ? 0.2 : 0.62, ease: EASE_IN_OUT }}
        >
          <div className="gutter flex min-h-full flex-col pb-10" style={{ paddingTop: "calc(12px)" }}>
            <div className="wrap flex justify-end">
              <button type="button" className="icon-btn mt-1.5" onClick={onClose} aria-label={t.a11y.menuClose}>
                <IconClose />
              </button>
            </div>
            <div className="wrap mt-4 grid flex-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <ul className="flex flex-col">
                {items.map((it, i) => (
                  <motion.li
                    key={it.label}
                    initial={reduce ? false : { opacity: 0, transform: "translateY(36px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ delay: reduce ? 0 : 0.18 + i * 0.04, duration: 0.6, ease: EASE_OUT }}
                  >
                    <a
                      href={href(it.page, { anchor: it.anchor })}
                      data-first={i === 0 ? "" : undefined}
                      onClick={(e) => { e.preventDefault(); go(it.page, { anchor: it.anchor }); onClose(); }}
                      className="display group inline-flex items-baseline gap-4 py-1 text-[clamp(2.2rem,6vw,5.2rem)] text-cream transition-colors hover:text-lilac"
                    >
                      <span className="kicker translate-y-[-0.4em] text-[0.72rem] text-lilac/70">{String(i + 1).padStart(2, "0")}</span>
                      {it.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="flex flex-col gap-8 lg:pb-4"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.45, duration: 0.5 }}
              >
                <a className="pill pill-lime self-start" href={`${href("home")}#besuch`} onClick={(e) => { e.preventDefault(); go("home", { anchor: "besuch" }); onClose(); }}>
                  {t.cta.findUs}
                </a>
                <div>
                  <p className="kicker mb-3 text-lilac">{t.a11y.languageChoose}</p>
                  <div className="flex flex-wrap gap-2">
                    {LANGS.map((l) => (
                      <button key={l} type="button" lang={l} className="chip" aria-pressed={l === lang} onClick={() => requestLanguage(l)}>
                        {NATIVE[l]}
                      </button>
                    ))}
                  </div>
                </div>
                <address className="not-italic leading-relaxed text-cream/85">
                  {SHOP.mall}, {SHOP.street}, {SHOP.zip} {SHOP.city}
                  <br />
                  <a className="link-u" href={PHONE.href}>{PHONE.display}</a> · <a className="link-u" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </address>
                <p className="text-sm text-cream/70">{t.proposal}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
