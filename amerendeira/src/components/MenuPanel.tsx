"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { contact, nav, stores } from "@/content/site";
import { Facebook, Instagram } from "./Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  open: boolean;
  close: (hash?: string) => void;
  onExitComplete: () => void;
};

// The yellow navigation panel (the colour of the original menu). Loaded on demand: Motion is
// only fetched when the visitor is about to open it.
export default function MenuPanel({ open, close, onExitComplete }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll, trap focus and close on Escape while the panel is open.
  useEffect(() => {
    const root = document.documentElement;
    if (!open) return;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    root.style.paddingRight = `${scrollbar}px`;
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      root.style.paddingRight = "";
    };
  }, [open, close]);

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
        {open && (
          <div className="menu-layer" key="menu">
            <motion.div
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => close()}
              aria-hidden="true"
            />
            <motion.div
              id="menu-panel"
              ref={panelRef}
              className="menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <div className="menu-panel__top">
                <button type="button" className="menu-close" onClick={() => close()}>
                  Fechar <span className="menu-close__x" aria-hidden="true" />
                </button>
              </div>
              <nav className="menu-panel__nav" aria-label="Menu">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      close(item.href);
                    }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.18 + i * 0.06 }}
                  >
                    <span aria-hidden="true">0{i + 1}</span>
                    <span className="menu-word">{item.label}</span>
                  </motion.a>
                ))}
              </nav>
              <motion.div
                className="menu-panel__meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <div>
                  <p className="caps">Contactos</p>
                  <p>
                    <a className="text-link" href={contact.email.href}>
                      {contact.email.label}
                    </a>
                  </p>
                  <p>
                    <a className="text-link" href={contact.phone.href}>
                      {contact.phone.label}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="caps">Lojas</p>
                  {stores.map((s) => (
                    <p key={s.id}>
                      <a className="text-link" href={s.map} target="_blank" rel="noopener noreferrer">
                        {s.city}
                        <span className="sr-only"> — ver no mapa (abre num novo separador)</span>
                      </a>
                    </p>
                  ))}
                </div>
                <div className="menu-panel__social">
                  <a className="icon-btn" href={contact.instagram.href} target="_blank" rel="noopener noreferrer" aria-label="Instagram (abre num novo separador)">
                    <Instagram />
                  </a>
                  <a className="icon-btn" href={contact.facebook.href} target="_blank" rel="noopener noreferrer" aria-label="Facebook (abre num novo separador)">
                    <Facebook />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
    </AnimatePresence>
  );
}
