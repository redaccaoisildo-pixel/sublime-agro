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
 * Product/district/price data below is real, sourced from the client's own
 * document ("Dados SublimeAgro, Lda..docx"), applying two rules the client
 * gave explicitly:
 *  1. Where a price is given as a range, use the lowest value.
 *  2. Where a district row lists more varieties than prices (or the mapping
 *     between them is ambiguous), apply the same price — the lowest one
 *     listed for that district — to every variety in that row.
 *
 * Fields with NO source in that document — grade/quality spec, delivery
 * terms, harvest season, minimum volume, price validity date — are marked
 * with the shared placeholders below and still need real input from the
 * client before launch. Scientific names are inferred from the common bean
 * species each variety belongs to (Phaseolus vulgaris / Vigna unguiculata /
 * Arachis hypogaea), matched against the species lists the client's
 * document itself gives per district.
 */
const PENDING_GRADE: Bilingual = { pt: "Especificação a confirmar", en: "Specification to be confirmed" };
const PENDING_DELIVERY: Bilingual = { pt: "Condição de entrega a confirmar", en: "Delivery terms to be confirmed" };
const YEAR_ROUND_SEASON: Bilingual = { pt: "Todo o ano (a confirmar)", en: "Year-round (to be confirmed)" };
const TONNE: Bilingual = { pt: "tonelada", en: "tonne" };
const PENDING_VALID_UNTIL = "2026-12-31"; // placeholder — confirm real validity cadence with the client
const PENDING_MIN_VOLUME = 1; // placeholder — no minimum was specified per variety

function product(
  id: string,
  pt: string,
  en: string,
  scientificName: string,
  collectionPointIds: string[],
  priceMzn: number
): Product {
  return {
    id,
    name: { pt, en },
    scientificName,
    collectionPointIds,
    harvestMonths: [1, 12],
    grade: PENDING_GRADE,
    deliveryTerms: PENDING_DELIVERY,
    seasonLabel: YEAR_ROUND_SEASON,
    unit: TONNE,
    statusKey: "inSeason",
    minVolumeTonnes: PENDING_MIN_VOLUME,
    priceMzn,
    priceValidUntil: PENDING_VALID_UNTIL
  };
}

const VULGARIS = "Phaseolus vulgaris";
const UNGUICULATA = "Vigna unguiculata";
const HYPOGAEA = "Arachis hypogaea";

export const PRODUCTS: Product[] = [
  // Lichinga — 5 varieties listed against 2 prices (110.000–1.350.000 MZN, 160.000) → lowest (110.000) applied to all
  product("lichinga-vulgar", "Feijão vulgar", "Common bean", VULGARIS, ["lichinga"], 110000),
  product("lichinga-branco", "Feijão branco", "White bean", VULGARIS, ["lichinga"], 110000),
  product("lichinga-manteiga", "Feijão manteiga", "Butter bean", VULGARIS, ["lichinga"], 110000),
  product("lichinga-vermelho-comum", "Feijão vermelho comum", "Red bean", VULGARIS, ["lichinga"], 110000),
  product("lichinga-militar-novo", "Feijão militar novo", "New cowpea (militar)", UNGUICULATA, ["lichinga"], 110000),

  // Cuamba — 6 varieties listed against 4 prices (85.000, 98.000, 135.000–155.000, 120.000) → lowest (85.000) applied to all
  product("cuamba-boer-nhemba", "Feijão bóer / feijão nhemba", "Pigeon pea / cowpea", UNGUICULATA, ["cuamba"], 85000),
  product("cuamba-amarelo", "Feijão amarelo", "Yellow bean", UNGUICULATA, ["cuamba"], 85000),
  product("cuamba-militar-graudo", "Feijão militar graúdo", "Large cowpea (militar)", UNGUICULATA, ["cuamba"], 85000),
  product("cuamba-militar-comum", "Feijão militar comum", "Common cowpea (militar)", UNGUICULATA, ["cuamba"], 85000),
  product("cuamba-maconde", "Feijão maconde", "Cowpea maconde", UNGUICULATA, ["cuamba"], 85000),
  product("cuamba-matooba-exportacao", "Matooba exportação", "Export matooba bean", VULGARIS, ["cuamba"], 85000),

  // Marrupa — 5 varieties listed against 2 prices (100.000, 135.000) → lowest (100.000) applied to all
  product("marrupa-catarino", "Feijão catarino", "Pinto bean", VULGARIS, ["marrupa"], 100000),
  product("marrupa-branco-miudo", "Feijão branco miúdo", "Small white bean", VULGARIS, ["marrupa"], 100000),
  product("marrupa-vermelho", "Feijão vermelho", "Red bean", VULGARIS, ["marrupa"], 100000),
  product("marrupa-amendoim", "Feijão amendoim", "Peanut bean", HYPOGAEA, ["marrupa"], 100000),
  product("marrupa-militar-exportacao", "Feijão militar exportação", "Export cowpea (militar)", UNGUICULATA, ["marrupa"], 100000),

  // Ngauma — 3 varieties listed against 2 prices (120.000, 130.000) → lowest (120.000) applied to all
  product("ngauma-holly", "Feijão holly", "Common holly bean", VULGARIS, ["ngauma"], 120000),
  product("ngauma-preto", "Feijão preto", "Black bean", VULGARIS, ["ngauma"], 120000),
  product("ngauma-roxo", "Feijão roxo", "Speckled bean", VULGARIS, ["ngauma"], 120000),

  // Majune — 2 varieties, 2 prices, counts matched: kept as listed
  product("majune-nhemba-caupi", "Feijão nhemba / caupi", "Cowpea", UNGUICULATA, ["majune"], 70000),
  product("majune-catarino", "Feijão catarino", "Pinto bean", VULGARIS, ["majune"], 85000),

  // Mandimba — 2 varieties, 2 prices, counts matched: kept as listed (range 80.000–95.000 → lowest 80.000)
  product("mandimba-boer", "Feijão bóer", "Pigeon pea", UNGUICULATA, ["mandimba"], 80000),
  product("mandimba-amendoim", "Feijão amendoim", "Peanut bean", HYPOGAEA, ["mandimba"], 100000),

  // Sanga (*Bandezi) — 5 varieties listed against 4 prices (75.000–85.000, 120.000, 100.000, 90.000) → lowest (75.000) applied to all
  product("sanga-manteiga", "Feijão manteiga", "Butter bean", VULGARIS, ["sanga"], 75000),
  product("sanga-catarina", "Feijão catarina", "Pinto bean", VULGARIS, ["sanga"], 75000),
  product("sanga-preto", "Feijão preto", "Black bean", VULGARIS, ["sanga"], 75000),
  product("sanga-vermelho-mancha", "Feijão vermelho com mancha", "Red speckled bean", VULGARIS, ["sanga"], 75000),
  product("sanga-matooba-branco", "Matooba branco", "White matooba bean", VULGARIS, ["sanga"], 75000),

  // Lago — 4 varieties, 4 prices, counts matched: kept as listed
  product("lago-vulgar", "Feijão vulgar", "Common bean", VULGARIS, ["lago"], 75000),
  product("lago-branco-comum", "Feijão branco comum", "Common white bean", VULGARIS, ["lago"], 110000),
  product("lago-manteiga", "Feijão manteiga", "Butter bean", VULGARIS, ["lago"], 75000),
  product("lago-matooba-creme", "Matooba creme", "Cream matooba bean", VULGARIS, ["lago"], 90000),

  // Muembe — 5 varieties, 5 prices, counts matched: kept as listed
  product("muembe-branco-graudo", "Feijão branco graúdo", "Large white bean", VULGARIS, ["muembe"], 110000),
  product("muembe-preto", "Feijão preto", "Black bean", VULGARIS, ["muembe"], 120000),
  product("muembe-catarina", "Feijão catarina", "Pinto bean", VULGARIS, ["muembe"], 75000),
  product("muembe-militar", "Feijão militar", "Cowpea (militar)", UNGUICULATA, ["muembe"], 135000),
  product("muembe-matooba-branco", "Matooba branco", "White matooba bean", VULGARIS, ["muembe"], 90000),

  // Chimbonila — 3 varieties, 3 prices, counts matched: kept as listed
  product("chimbonila-catarina-comum", "Feijão catarina comum", "Common pinto bean", VULGARIS, ["chimbonila"], 85000),
  product("chimbonila-vermelha", "Feijão vermelha", "Common red bean", VULGARIS, ["chimbonila"], 88000),
  product("chimbonila-manteiga", "Feijão manteiga", "Butter bean", VULGARIS, ["chimbonila"], 75000),

  // Mecanhelas — 5 varieties, 5 prices, counts matched: kept as listed
  product("mecanhelas-manteiga", "Feijão manteiga", "Butter bean", VULGARIS, ["mecanhelas"], 75000),
  product("mecanhelas-catarina-misto", "Feijão catarina misto", "Mixed pinto bean", VULGARIS, ["mecanhelas"], 88000),
  product("mecanhelas-creme", "Feijão creme", "Cream bean", VULGARIS, ["mecanhelas"], 85000),
  product("mecanhelas-mangno", "Feijão mangno", "Maguno bean", VULGARIS, ["mecanhelas"], 88000),
  product("mecanhelas-matooba-manteiga", "Matooba manteiga", "Butter matooba bean", VULGARIS, ["mecanhelas"], 90000)
];
