// The header: the logo chip (the real logo on cream), a glass pill with the six live sections, the language
// menu, the cart button with its live count and "Reservieren". On phones: Reservieren, cart, language, burger.
import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "motion/react";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { useCart } from "@/lib/cart";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { asset, cn } from "@/lib/utils";
import { LanguageMenu } from "./LanguageMenu";
import { PillButton, Roll } from "./ui/Pill";
import { IconBag } from "./icons";

const MobileMenu = lazy(() => import("./MobileMenu"));

export const NAV: { page: PageKey; key: "speisekarte" | "takeaway" | "services" | "galerie" | "ueber" | "kontakt"; anchor: string }[] = [
  { page: "speisekarte", key: "speisekarte", anchor: "speisekarte" },
  { page: "takeaway", key: "takeaway", anchor: "tagesgerichte" },
  { page: "services", key: "services", anchor: "services" },
  { page: "galerie", key: "galerie", anchor: "galerie" },
  { page: "ueber", key: "ueber", anchor: "ueber-uns" },
  { page: "kontakt", key: "kontakt", anchor: "reservieren" },
];

/** The logo chip: the drawn suckling pig and "Casa Dão Lafões"; the pig wobbles on hover or tap. */
export function LogoChip({ small = false, id, tone = "light" }: { small?: boolean; id?: string; tone?: "light" | "dark" }) {
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
        "bounce-host group pointer-events-auto flex items-center rounded-full shadow-[0_10px_30px_-14px_rgba(43,26,18,0.6)] transition-[padding,gap] duration-500 ease-[var(--ease-out)]",
        tone === "light" ? "bg-branco text-marca" : "bg-marca-escura text-fundo",
        small ? "gap-2 p-1.5 min-[480px]:pr-4" : "gap-3 p-2 min-[480px]:pr-5",
        bouncing && "is-bouncing",
      )}
    >
      <span data-logo-chip className={cn("wobble grid place-items-center overflow-hidden rounded-full bg-destaque transition-[width,height] duration-500 ease-[var(--ease-out)]", small ? "h-9 w-9" : "h-12 w-12")}>
        <img src={asset("brand/mark.webp")} alt="" width={240} height={114} className={cn("w-auto transition-[height] duration-500", small ? "h-4" : "h-5")} />
      </span>
      <span aria-hidden="true" className={cn("hidden whitespace-nowrap font-display font-semibold leading-none tracking-[-0.01em] transition-[font-size] duration-500 min-[480px]:inline", small ? "text-[18px]" : "text-[22px]")}>
        {"Casa Dão Lafões".split("").map((ch, i) => (
          <span key={i} className="bounce-letter inline-block" style={{ "--i": i } as React.CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </a>
  );
}

export function CartButton({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { lang, openCart } = useSite();
  const lines = useCart();
  const n = lines.reduce((a, l) => a + l.qty, 0);
  return (
    <button type="button" onClick={openCart} aria-label={`${UI.cart[lang]} · ${n} ${n === 1 ? UI.item[lang] : UI.items[lang]}`} className={cn("relative grid h-11 place-items-center rounded-full bg-marca text-fundo transition active:scale-95", compact ? "w-11" : "w-11", className)}>
      <IconBag size={20} />
      <motion.span key={n} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }} className={cn("absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 font-body text-[11px] font-bold", n ? "bg-destaque text-branco" : "bg-regra text-marca")}>
        {n}
      </motion.span>
    </button>
  );
}

export function Header() {
  const { lang, page, href, go, book } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const section = useScrollSpy(NAV.map((n) => n.anchor), page === "home");
  const current = page === "home" ? NAV.find((n) => n.anchor === section)?.page ?? null : page;

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
                      className="roll-host relative flex h-11 items-center rounded-full px-3.5 font-body text-[14px] font-semibold uppercase tracking-[0.1em] text-marca"
                    >
                      {on && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-marca" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
                      <span className={cn("relative transition-colors", on && "text-fundo")}>
                        <Roll>{UI[n.key][lang]}</Roll>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-marca/15" />
          <LanguageMenu />
          <CartButton />
          <PillButton size="sm" onClick={book} className="ml-1">
            {UI.reserveShort[lang]}
          </PillButton>
        </div>
        <div className="glass pointer-events-auto flex items-center gap-1.5 rounded-full p-1.5 lg:hidden">
          <PillButton size="sm" onClick={book} className="px-4">
            {UI.reserveShort[lang]}
          </PillButton>
          <CartButton compact />
          <LanguageMenu compact />
          <button
            type="button"
            onClick={() => {
              setMenuLoaded(true);
              setMenu(true);
            }}
            aria-label={UI.menu[lang]}
            aria-expanded={menu}
            className="grid h-11 w-11 place-items-center rounded-full bg-marca text-fundo"
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
