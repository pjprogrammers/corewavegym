"use client";

import { LANG_LABELS, LANGS, txFor } from "@/lib/data";
import { useLang } from "./LanguageProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Website language"
      className={`glass flex items-center gap-0.5 rounded-full p-0.5 ${className}`}
    >
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={code === lang}
          title={String(txFor(code, "langName"))}
          className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors ${
            code === lang
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {LANG_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
