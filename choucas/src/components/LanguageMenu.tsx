// Header, right side, just left of the "Menü" button: the current two-letter code in a rounded pill;
// the card below lists the five languages. Picking one goes through the welcome slide.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HTML_LANG, LANGS as CODES, NATIVE, UI, type Lang } from "@/i18n";
import { useSite } from "@/site";

export const LANGS: { code: Lang; label: string; htmlLang: string }[] = CODES.map((code) => ({ code, label: NATIVE[code], htmlLang: HTML_LANG[code] }));

export function LanguageMenu() {
  const { lang: current, requestLanguage: onPick, switching } = useSite();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLButtonElement>(null);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);

  const close = (refocus = false) => {
    setOpen(false);
    if (refocus) pill.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    rows.current[LANGS.findIndex((l) => l.code === current)]?.focus();
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, current]);

  const move = (i: number, step: number) => rows.current[(i + step + LANGS.length) % LANGS.length]?.focus();

  return (
    <div ref={root} className="relative">
      <button
        ref={pill}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${current.toUpperCase()} · ${NATIVE[current]} · ${UI.languagePill}`}
        disabled={switching}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 items-center gap-1.5 rounded-full border border-current/25 px-3.5 text-[15px] font-semibold uppercase tracking-wide transition-colors hover:border-current/60 sm:px-4"
      >
        {current}
        <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-4 transition-transform ${open ? "" : "rotate-180"} motion-reduce:transition-none`}>
          <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            aria-label={UI.languagePill}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="on-light absolute right-0 top-[calc(100%+10px)] z-50 w-56 rounded-3xl sm:w-64 bg-snow p-3 text-ink shadow-xl ring-1 ring-ink/5"
          >
            {LANGS.map(({ code, label, htmlLang }, i) => {
              const active = code === current;
              return (
                <li key={code} role="none">
                  <button
                    ref={(el) => {
                      rows.current[i] = el;
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    lang={htmlLang}
                    onClick={() => {
                      close(true);
                      onPick(code);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        move(i, 1);
                      }
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        move(i, -1);
                      }
                      if (e.key === "Home") {
                        e.preventDefault();
                        rows.current[0]?.focus();
                      }
                      if (e.key === "End") {
                        e.preventDefault();
                        rows.current[LANGS.length - 1]?.focus();
                      }
                      if (e.key === "Tab") close();
                    }}
                    className={`flex w-full items-center gap-5 rounded-2xl px-4 py-3 text-left text-lg hover:bg-black/5 focus-visible:bg-black/5 ${active ? "font-semibold text-brand-ink" : ""}`}
                  >
                    <span className="w-8 text-xs font-semibold uppercase tracking-[0.2em] text-black/55">{code}</span>
                    <span className="flex-1">{label}</span>
                    {active && <span aria-hidden="true" className="size-2.5 rounded-full bg-brand" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** The same list as a simple row of native names (footer). */
export function LanguageRow() {
  const { lang, requestLanguage, switching } = useSite();
  return (
    <ul className="flex flex-wrap gap-x-1 gap-y-1" aria-label={UI.language[lang]}>
      {LANGS.map(({ code, label, htmlLang }) => (
        <li key={code}>
          <button
            type="button"
            lang={htmlLang}
            aria-current={code === lang ? "true" : undefined}
            disabled={switching}
            onClick={() => requestLanguage(code)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[15px] transition-colors ${code === lang ? "font-semibold text-beak" : "text-snow/80 hover:text-snow"}`}
          >
            {label}
            {code === lang && <span aria-hidden="true" className="size-2 rounded-full bg-beak" />}
          </button>
        </li>
      ))}
    </ul>
  );
}
