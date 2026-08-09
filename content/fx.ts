import type { Bilingual } from "./types";

export type FxPair = "USD/MZN" | "EUR/MZN" | "ZAR/MZN";

export type FxRate = {
  pair: FxPair;
  value: number;
};

/**
 * Static, manually maintained rates (recommended for now — no backend/live
 * feed wired up). Update `asOf` and the values together when refreshed.
 */
export const FX_RATES: FxRate[] = [
  { pair: "USD/MZN", value: 63.44 },
  { pair: "EUR/MZN", value: 72.19 },
  { pair: "ZAR/MZN", value: 3.79 }
];

export const FX_SOURCE = {
  asOf: "2026-08-04",
  label: { pt: "Banco de Moçambique", en: "Bank of Mozambique" } satisfies Bilingual
};
