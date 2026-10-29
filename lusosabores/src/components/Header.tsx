import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "motion/react";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";
import { LanguageMenu } from "./LanguageMenu";
import { PillButton, Roll } from "./ui/Pill";

const MobileMenu = lazy(() => import("./MobileMenu"));

const NAV: { page: PageKey; key: "menu" | "services" | "galerie" | "contact" }[] = [
  { page: "menu", key: "menu" },
  { page: "services", key: "services" },
  { page: "galerie", key: "galerie" },
  { page: "contact", key: "contact" },
];

/** The logo chip: the logo on a cream badge and "LUSO SABORES", whose letters bounce on hover or tap. */
export function LogoChip({ small = false, id }: { small?: boolean; id?: string }) {
  const { href, go, lang } = useSite();
  const [bouncing, setBouncing] = useState(false);
  return (
    <a
      id={id}
      href={href("home")}
      aria-label={UI.homeLink[lang]}
      onClick={(e) => {
        e.preventDefault();
        setBouncing(true);
        go("home");
      }}
      onAnimationEnd={() => setBouncing(false)}
      className={cn(
        "bounce-host group pointer-events-auto flex items-center rounded-full bg-marca text-branco shadow-[0_10px_30px_-14px_rgba(49,11,10,0.6)] shadow-[inset_0_0_0_1px_rgba(255,251,232,0.18)] transition-[padding,gap] duration-500 ease-[var(--ease-out)]",
        small ? "gap-2 p-1.5 min-[480px]:pr-4" : "gap-3 p-2 min-[480px]:pr-5",
        bouncing && "is-bouncing",
      )}
    >
      <span data-logo-chip className={cn("wobble grid place-items-center overflow-hidden rounded-full bg-branco transition-[width,height] duration-500 ease-[var(--ease-out)]", small ? "h-9 w-[52px]" : "h-12 w-[68px]")}>
        <img src={asset("brand/logo.webp")} alt="" width={600} height={420} className={cn("w-auto transition-[height] duration-500", small ? "h-7" : "h-9")} />
      </span>
      <span aria-hidden="true" className={cn("hidden whitespace-nowrap font-display font-extrabold uppercase leading-none tracking-[0.04em] transition-[font-size] duration-500 min-[480px]:inline", small ? "text-[19px]" : "text-[23px]")}>
        {"LUSO SABORES".split("").map((ch, i) => (
          <span key={i} className="bounce-letter inline-block" style={{ "--i": i } as React.CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </a>
  );
}

/** Which home section is in view, for the sliding pill. */
function useHomeSection(active: boolean) {
  const [section, setSection] = useState<string | null>(null);
  useEffect(() => {
    if (!active) return setSection(null);
    const ids = ["menu", "specialites", "reservation", "services-home", "galerie", "contact"];
    const map: Record<string, string> = { menu: "menu", specialites: "menu", "services-home": "services", galerie: "galerie", contact: "contact" };
    const onScroll = () => {
      let best: string | null = null;
      const line = window.innerHeight * 0.45;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) best = map[id] ?? null;
      }
      setSection(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);
  return section;
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
    <header className="pointer-events-none fixed inset-x-0 z-[300]" style={{ top: "var(--label-h)" }}>
      <div className={cn("mx-auto flex max-w-[var(--max)] items-center justify-between gap-3 px-[var(--gutter)] transition-[padding] duration-500", scrolled ? "py-2.5" : "py-4")}>
        <LogoChip small={scrolled} id="logo-chip" />
        {/* desktop: the glass pill */}
        <div className="glass pointer-events-auto hidden items-center gap-1 rounded-full p-1.5 lg:flex">
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
                      className="roll-host relative flex h-11 items-center rounded-full px-4 font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-tinta"
                    >
                      {on && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-marca" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
                      <span className={cn("relative transition-colors", on && "text-branco")}>
                        <Roll>{UI[n.key][lang]}</Roll>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-tinta/15" />
          <LanguageMenu />
          <PillButton size="sm" onClick={book} className="ml-1">
            {UI.reserve[lang]}
          </PillButton>
        </div>
        {/* phones: Réserver, the round language button and the burger */}
        <div className="glass pointer-events-auto flex items-center gap-1.5 rounded-full p-1.5 lg:hidden">
          <PillButton size="sm" onClick={book} className="px-4">
            {UI.reserve[lang]}
          </PillButton>
          <LanguageMenu compact />
          <button
            type="button"
            onClick={() => {
              setMenuLoaded(true);
              setMenu(true);
            }}
            aria-label={UI.burger[lang]}
            aria-expanded={menu}
            className="grid h-11 w-11 place-items-center rounded-full bg-marca text-branco"
          >
            <svg aria-hidden="true" width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M2 3h16M6 11h12" />
            </svg>
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

