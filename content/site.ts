import type { Bilingual } from "./types";

// Domain/email are TBD — client has not purchased a domain or inbox yet.
// Placeholder values below are used only for local metadata construction
// (they never send anything anywhere) and must be replaced before launch.
export const SITE = {
  name: "Sublime Agro",
  domain: "sublimeagro.co.mz",
  url: "https://sublimeagro.co.mz",
  email: "geral@sublimeagro.co.mz",
  locale: { pt: "pt_MZ", en: "en_MZ" },
  tagline: {
    pt: "Fornecimento de mercadorias agrícolas — província do Niassa, Moçambique.",
    en: "Agricultural commodities supply — Niassa province, Mozambique."
  } satisfies Bilingual,
  description: {
    pt: "Agregação e fornecimento de feijões e outras mercadorias agrícolas na província do Niassa, com escoamento pelo corredor de Nacala.",
    en: "Aggregation and supply of beans and other agricultural commodities in Niassa province, shipped via the Nacala corridor."
  } satisfies Bilingual
};

export const NAV_LINKS: { href: string; label: Bilingual }[] = [
  { href: "#produtos", label: { pt: "Produtos", en: "Products" } },
  { href: "#precos", label: { pt: "Preços", en: "Prices" } },
  { href: "#mapa", label: { pt: "Niassa", en: "Niassa" } },
  { href: "#dados", label: { pt: "Dados", en: "Data" } },
  { href: "#blog", label: { pt: "Notas", en: "Notes" } }
];

export const FOOTER_INFO_LINKS: { href: string; label: Bilingual }[] = [
  { href: "#", label: { pt: "Como operamos", en: "How we operate" } },
  { href: "#", label: { pt: "Condições de entrega", en: "Delivery terms" } },
  { href: "#", label: { pt: "Termos e ressalvas", en: "Terms and disclaimers" } },
  { href: "#", label: { pt: "Política de privacidade", en: "Privacy policy" } }
];

// PLACEHOLDER — confirm real office/collection locations for the footer contact list.
export const FOOTER_CONTACT_LINES: string[] = ["Lichinga, Niassa", "Cuamba, Niassa", SITE.email];
