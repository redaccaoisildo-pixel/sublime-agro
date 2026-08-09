"use client";

import { useContext } from "react";
import { LocaleContext } from "./LocaleProvider";
import { dictionary, type DictionaryKey } from "@/content/dictionary";
import type { Bilingual } from "@/content/types";

export function useLocale() {
  const { locale, setLocale } = useContext(LocaleContext);

  function pick<T extends Bilingual>(field: T): string {
    return field[locale];
  }

  function t(key: DictionaryKey): string {
    return dictionary[key][locale];
  }

  return { locale, setLocale, pick, t };
}
