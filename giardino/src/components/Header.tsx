// Header: logo (never recoloured – on the deep surface it sits on its own ivory plaque), main navigation, reservation
// button and – top right on every screen size – the globe that opens the language selector.
// It shrinks from 88 to 64 px over the first 80 px of scroll with transforms only (`--hs`, set by the shell) and takes
// the deep surface once the hero or page head has scrolled away (`is-deep`).
import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { LANGS, LANG_NAMES, HTML_LANG, preloadDicts, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { loadGsap } from "@/lib/gsap";
import { useLocation } from "@/lib/router";
import { pathFor } from "@/routes";
import { RESTAURANT } from "@/content/restaurant";
import { Link } from "./Link";
import { Globe, Menu as MenuIcon, Close, Phone } from "./icons";
import type { NavKey } from "@/routes";

export const LOGO_1X = (__ARTIFACT__ ? "" : "/") + "brand/logo-350.webp";
export const LOGO_2X = (__ARTIFACT__ ? "" : "/") + "brand/logo-700.webp";
const LOGO_AVIF = `${(__ARTIFACT__ ? "" : "/") + "brand/logo-350.avif"} 350w, ${(__ARTIFACT__ ? "" : "/") + "brand/logo-700.avif"} 700w`;

/** The restaurant's logo as published (colours untouched), AVIF with WebP fallback. */
export function LogoImg({ sizes, alt = "Pizzeria Giardino", lazy = false }: { sizes: string; alt?: string; lazy?: boolean }) {
  return (
    <picture>
      {!__ARTIFACT__ && <source type="image/avif" srcSet={LOGO_AVIF} sizes={sizes} />}
      <img src={LOGO_1X} srcSet={`${LOGO_1X} 350w, ${LOGO_2X} 700w`} sizes={sizes} width={700} height={370} alt={alt} loading={lazy ? "lazy" : undefined} decoding="async" />
    </picture>
  );
}

const NAV: NavKey[] = ["menu", "hosts", "kids", "gallery", "visit"];

export function Logo() {
  const { t, href } = useSite();
  return (
    <Link href={href("home")} className="header__logo" aria-label={t.a11y.home} data-logo>
      <LogoImg sizes="180px" />
    </Link>
  );
}

export function Header({ deep, menuOpen, onToggleMenu, progressRef, clone = false }: { deep: boolean; menuOpen: boolean; onToggleMenu: () => void; progressRef?: React.Ref<HTMLDivElement>; clone?: boolean }) {
  const { t, href, page } = useSite();
  return (
    <header className={`header ${deep && !menuOpen ? "is-deep" : ""} ${menuOpen ? "is-menu" : ""}`} id={clone ? undefined : "site-header"} data-header aria-hidden={clone || undefined}>
      <div className="header__bg" aria-hidden="true" />
      <div className="header__rule" aria-hidden="true" />
      <div className="wrap header__inner">
        <Logo />
        <nav className="header__nav" aria-label={t.a11y.mainNav}>
          {NAV.map((p) => (
            <Link key={p} href={href(p)} aria-current={page === p ? "page" : undefined} tabIndex={clone ? -1 : undefined}>
              {t.nav[p]}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <Link href={href("reserve")} className="btn btn--accent btn--reserve" tabIndex={clone ? -1 : undefined} aria-current={page === "reserve" ? "page" : undefined}>
            {t.cta.reserve}
          </Link>
          <button type="button" className="icon-btn menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={onToggleMenu} tabIndex={clone ? -1 : undefined}>
            {menuOpen ? <Close /> : <MenuIcon />}
            <span className="sr-only">{menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}</span>
          </button>
          <LanguageMenu disabled={clone} />
        </div>
      </div>
      {!clone && <div className="header__progress" ref={progressRef} aria-hidden="true" />}
    </header>
  );
}

/**
 * Globe button + panel with the four languages as real links (`<a hreflang lang>`, BRIEF §9): without JavaScript they
 * simply open the same page in the other language; with JavaScript the click plays the logo transition instead.
 */
export function LanguageMenu({ disabled = false }: { disabled?: boolean }) {
  const { t, lang, page, requestLanguage, switching, hydrated } = useSite();
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    preloadDicts(); // so the switch never waits for a download
    const i = LANGS.indexOf(lang);
    requestAnimationFrame(() => items.current[i]?.focus());
    const away = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open, lang]);

  // the same page, section and query in the other language (query and hash only after hydration: the pre-rendered
  // HTML has none)
  const target = (l: Lang) => (page === "notFound" ? `/${l}` : pathFor(l, page)) + (hydrated ? loc.search + loc.hash : "");
  const choose = (e: MouseEvent<HTMLAnchorElement>, l: Lang) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // new tab or window: let the browser do it
    e.preventDefault();
    setOpen(false);
    btn.current?.focus({ preventScroll: true });
    if (l !== lang) requestLanguage(l);
  };
  const onKey = (e: KeyboardEvent) => {
    const i = items.current.findIndex((el) => el === document.activeElement);
    const move = (n: number) => {
      e.preventDefault();
      items.current[(n + LANGS.length) % LANGS.length]?.focus();
    };
    if (!open) return;
    if (e.key === "ArrowDown") move(i + 1);
    else if (e.key === "ArrowUp") move(i - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(LANGS.length - 1);
    else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btn.current?.focus();
    }
  };

  return (
    <div className="lang" ref={wrap} onKeyDown={onKey} onBlur={(e) => !wrap.current?.contains(e.relatedTarget as Node) && setOpen(false)}>
      <button
        ref={btn}
        type="button"
        className="icon-btn lang__btn"
        aria-expanded={open}
        aria-controls={id}
        disabled={switching}
        tabIndex={disabled ? -1 : undefined}
        onClick={() => setOpen((o) => !o)}
        onPointerEnter={() => (preloadDicts(), loadGsap())}
        onFocus={() => (preloadDicts(), loadGsap())}
        onKeyDown={(e) => {
          if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`${lang.toUpperCase()} – ${t.a11y.chooseLanguage} (${t.a11y.language}: ${LANG_NAMES[lang]})`}
      >
        <Globe />
        <span className="icon-btn__code" aria-hidden="true">{lang.toUpperCase()}</span>
      </button>
      <div className="lang__panel" id={id} hidden={!open}>
        <p className="lang__title" aria-hidden="true">{t.language.title}</p>
        <ul>
          {LANGS.map((l, i) => (
            <li key={l}>
              <a
                ref={(el) => {
                  items.current[i] = el;
                }}
                href={target(l)}
                hrefLang={HTML_LANG[l]}
                lang={HTML_LANG[l]}
                className="lang__item"
                aria-current={l === lang ? "true" : undefined}
                tabIndex={open ? 0 : -1}
                onClick={(e) => choose(e, l)}
              >
                <span>{LANG_NAMES[l]}</span>
                <small aria-hidden="true">{l}</small>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Mobile: the reservation action stays visible at the bottom of the screen (BRIEF §8), with the phone next to it. */
export function ReserveBar() {
  const { t, href, page } = useSite();
  const onReserve = page === "reserve" || page === "status";
  return (
    <div className="resbar" role="region" aria-label={t.cta.reserve}>
      {!onReserve && (
        <Link href={href("reserve")} className="btn btn--accent resbar__main">
          {t.cta.reserve}
        </Link>
      )}
      <a className={`btn ${onReserve ? "btn--accent resbar__main" : "btn--ghost resbar__phone"}`} href={RESTAURANT.phoneHref}>
        <Phone />
        {onReserve ? <span className="num">{RESTAURANT.phoneDisplay}</span> : <span className="sr-only">{t.cta.callNumber}</span>}
      </a>
    </div>
  );
}

/** Mobile navigation: a full-screen sheet that opens from the menu button. */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, href, page } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const el = ref.current!;
    const first = el.querySelector<HTMLElement>("a,button");
    first?.focus({ preventScroll: true });
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const f = [...el.querySelectorAll<HTMLElement>("a,button")].filter((x) => x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f.at(-1)!.focus();
      } else if (!e.shiftKey && document.activeElement === f.at(-1)) {
        e.preventDefault();
        f[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);
  const main: NavKey[] = ["home", "menu", "reserve", "hosts", "kids", "gallery", "visit"];
  const more: NavKey[] = ["contact", "hotels", "tour", "press", "jobs"];
  return (
    <div id="mobile-nav" ref={ref} className={`mnav ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open || undefined}>
      <nav aria-label={t.a11y.mainNav}>
        <ol>
          {main.map((p, i) => (
            <li key={p}>
              <Link href={href(p)} onClick={onClose} aria-current={page === p ? "page" : undefined}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {t.nav[p]}
              </Link>
            </li>
          ))}
        </ol>
        <div className="mnav__more">
          {more.map((p) => (
            <Link key={p} href={href(p)} onClick={onClose} className="link">
              {t.nav[p]}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mnav__foot">
        <a href="tel:+41275300584" className="link">{t.cta.callNumber}</a>
        <a href="mailto:info@pizzeriagiardino.ch" className="link">info@pizzeriagiardino.ch</a>
      </div>
    </div>
  );
}
