"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/content/types";

const STORAGE_KEY = "sa-locale";

export type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextValue>({
  locale: "pt",
  setLocale: () => {}
});

export default function LocaleProvider({ children }: { children: ReactNode }) {
  // Always starts as "pt" so server and first client render match — the
  // real preference (if any) is applied a frame later from localStorage.
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-MZ" : "en";
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}
