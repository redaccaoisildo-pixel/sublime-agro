import type { Bilingual } from "./types";

export type StatusKey = "inSeason" | "nextHarvest";

export type Product = {
  id: string;
  name: Bilingual;
  scientificName: string;
  /** References CollectionPoint.id from content/geo.ts */
  collectionPointIds: string[];
  /** [startMonth, endMonth], 1–12 */
  harvestMonths: [number, number];
  grade: Bilingual;
  deliveryTerms: Bilingual;
  seasonLabel: Bilingual;
  unit: Bilingual;
  statusKey: StatusKey;
  minVolumeTonnes: number;
  /** null → price is quote-only ("sob cotação" / "on request") */
  priceMzn: number | null;
  priceValidUntil: string;
};

/**
 * PLACEHOLDER DATA. The client's real business is primarily bean varieties
 * sourced in Niassa; these five entries are common Mozambican bean types
 * used to stand up the site's structure. Confirm real varieties, grades,
 * delivery terms, harvest windows, minimum volumes and prices with the
 * client before launch — see plan doc, "Lacunas de conteúdo".
 */
export const PRODUCTS: Product[] = [
  {
    id: "feijao-manteiga",
    name: { pt: "Feijão manteiga", en: "Butter bean" },
    scientificName: "Phaseolus lunatus",
    collectionPointIds: ["lichinga", "mandimba"],
    harvestMonths: [5, 8],
    grade: { pt: "Grão limpo, humidade ≤ 13%", en: "Clean grain, moisture ≤ 13%" },
    deliveryTerms: { pt: "Posto no armazém, Lichinga", en: "Ex-warehouse, Lichinga" },
    seasonLabel: { pt: "Mai–Ago", en: "May–Aug" },
    unit: { pt: "tonelada", en: "tonne" },
    statusKey: "inSeason",
    minVolumeTonnes: 15,
    priceMzn: 58000,
    priceValidUntil: "2026-09-30"
  },
  {
    id: "feijao-nhemba",
    name: { pt: "Feijão nhemba", en: "Cowpea" },
    scientificName: "Vigna unguiculata",
    collectionPointIds: ["cuamba", "mandimba", "lichinga"],
    harvestMonths: [4, 7],
    grade: { pt: "Grão inteiro, impurezas ≤ 2%", en: "Whole grain, impurities ≤ 2%" },
    deliveryTerms: { pt: "Posto no armazém, Lichinga", en: "Ex-warehouse, Lichinga" },
    seasonLabel: { pt: "Abr–Jul", en: "Apr–Jul" },
    unit: { pt: "tonelada", en: "tonne" },
    statusKey: "inSeason",
    minVolumeTonnes: 20,
    priceMzn: 39000,
    priceValidUntil: "2026-09-30"
  },
  {
    id: "feijao-boer",
    name: { pt: "Feijão bóer", en: "Pigeon pea" },
    scientificName: "Cajanus cajan",
    collectionPointIds: ["cuamba", "marrupa"],
    harvestMonths: [6, 9],
    grade: { pt: "Calibre uniforme, impurezas ≤ 2%", en: "Uniform size, impurities ≤ 2%" },
    deliveryTerms: { pt: "Entregue em Nacala, via Cuamba", en: "Delivered Nacala, via Cuamba" },
    seasonLabel: { pt: "Jun–Set", en: "Jun–Sep" },
    unit: { pt: "tonelada", en: "tonne" },
    statusKey: "inSeason",
    minVolumeTonnes: 25,
    priceMzn: 64000,
    priceValidUntil: "2026-09-30"
  },
  {
    id: "feijao-vulgar",
    name: { pt: "Feijão vulgar", en: "Common bean" },
    scientificName: "Phaseolus vulgaris",
    collectionPointIds: ["marrupa", "metangula"],
    harvestMonths: [7, 10],
    grade: { pt: "Grão seleccionado, humidade ≤ 14%", en: "Sorted grain, moisture ≤ 14%" },
    deliveryTerms: { pt: "Entregue em Nacala, via Cuamba", en: "Delivered Nacala, via Cuamba" },
    seasonLabel: { pt: "Jul–Out", en: "Jul–Oct" },
    unit: { pt: "tonelada", en: "tonne" },
    statusKey: "nextHarvest",
    minVolumeTonnes: 10,
    priceMzn: null,
    priceValidUntil: "2026-10-31"
  },
  {
    id: "feijao-jugo",
    name: { pt: "Feijão jugo", en: "Bambara groundnut" },
    scientificName: "Vigna subterranea",
    collectionPointIds: ["lichinga", "metangula"],
    harvestMonths: [6, 9],
    grade: { pt: "Descascado, seleccionado", en: "Shelled, sorted" },
    deliveryTerms: { pt: "Posto no armazém, Lichinga", en: "Ex-warehouse, Lichinga" },
    seasonLabel: { pt: "Jun–Set", en: "Jun–Sep" },
    unit: { pt: "tonelada", en: "tonne" },
    statusKey: "nextHarvest",
    minVolumeTonnes: 10,
    priceMzn: 71000,
    priceValidUntil: "2026-09-30"
  }
];
