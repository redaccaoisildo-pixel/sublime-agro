import type { Locale } from "@/content/types";

const NUMBER_LOCALE: Record<Locale, string> = { pt: "pt-MZ", en: "en-US" };

export function formatNumber(value: number, locale: Locale, fractionDigits = 0): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
}

export function formatMzn(value: number, locale: Locale): string {
  return `${formatNumber(value, locale)} MZN`;
}

/** dd.mm.yyyy — kept locale-agnostic to match the site's mono/tabular "market data" style. */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

export function monthDiffSpan(start: number, end: number): number {
  return end >= start ? end - start + 1 : 12 - start + end + 1;
}
