"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LANGS,
  tFor,
  txFor,
  type Language,
} from "@/lib/data";

const STORAGE_KEY = "cw-lang";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string, vars?: Record<string, string>) => string;
  tx: (path: string) => any;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.includes(saved as Language)) {
        setLangState(saved as Language);
      }
    } catch {
      /* localStorage can be unavailable in private modes */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "hi";
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (path, vars) => tFor(lang, path, vars),
      tx: (path) => txFor(lang, path),
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used inside <LanguageProvider>");
  }
  return context;
}
