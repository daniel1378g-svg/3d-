"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { pt, type Content } from "./site";
import { en } from "./site.en";

export type Lang = "pt" | "en";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "pt", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      if (localStorage.getItem("mrd:lang") === "en") setLangState("en");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-PT";
    // Text lengths change, so scroll positions do too.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("mrd:lang", l);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export function useContent(): Content {
  return useLang().lang === "en" ? en : pt;
}
