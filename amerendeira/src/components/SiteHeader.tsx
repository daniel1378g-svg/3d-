"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

const MenuPanel = dynamic(() => import("./MenuPanel"), { ssr: false });
const preloadPanel = () => import("./MenuPanel");

export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  history.pushState(null, "", hash);
  // Move focus for keyboard and screen-reader users without a second jump.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [panelWanted, setPanelWanted] = useState(false);
  const pendingHash = useRef<string | null>(null);

  // Fetch the panel code when the browser is idle, so the first open is instant.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const run = () => preloadPanel().then(() => setPanelWanted(true));
    if (w.requestIdleCallback) w.requestIdleCallback(run, { timeout: 4000 });
    else window.setTimeout(run, 2500);
  }, []);

  // Solid background once the film has scrolled away.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const film = document.getElementById("Top");
      const limit = film ? film.offsetTop + film.offsetHeight - window.innerHeight * 0.6 : 200;
      setSolid(window.scrollY > limit);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback((hash?: string) => {
    pendingHash.current = hash ?? null;
    setOpen(false);
  }, []);

  const onExitComplete = () => {
    const hash = pendingHash.current;
    pendingHash.current = null;
    if (hash) scrollToHash(hash);
    else toggleRef.current?.focus();
  };

  return (
    <>
      <header id="hero" className={`site-header${solid ? " is-solid" : ""}`} data-intro="header">
        <div className="site-header__inner">
          <a href="#Top" className="logo-link" aria-label="A Merendeira — voltar ao início" data-intro="nav-logo">
            <Logo decorative />
          </a>
          <nav className="site-nav" aria-label="Principal">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu-panel"
            onPointerEnter={() => preloadPanel()}
            onFocus={() => preloadPanel()}
            onClick={() => {
              setPanelWanted(true);
              setOpen(true);
            }}
          >
            Menu <span className="menu-toggle__lines" aria-hidden="true" />
          </button>
        </div>
      </header>

      {panelWanted && <MenuPanel open={open} close={close} onExitComplete={onExitComplete} />}
    </>
  );
}
