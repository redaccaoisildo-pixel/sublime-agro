import type { Bilingual } from "./types";

export type Article = {
  id: string;
  /** The article's native/only language — used by the "view other language" filter */
  lang: "pt" | "en";
  category: Bilingual;
  title: Bilingual;
  excerpt: Bilingual;
  date: string;
};

// PLACEHOLDER — replace with real editorial copy before launch.
export const ARTICLES: Article[] = [
  {
    id: "preco-feijao-niassa",
    lang: "pt",
    category: { pt: "Nota de mercado", en: "Market note" },
    title: {
      pt: "Como se forma o preço do feijão no Niassa",
      en: "How bean prices form in Niassa"
    },
    excerpt: {
      pt: "Os factores que separam o preço à porta da machamba do preço posto em armazém.",
      en: "What separates the farm-gate price from the ex-warehouse price."
    },
    date: "2026-07-28"
  },
  {
    id: "humidade-do-grao",
    lang: "pt",
    category: { pt: "Guia de cultura", en: "Crop guide" },
    title: {
      pt: "Humidade do grão: o que medimos e porquê",
      en: "Grain moisture: what we measure and why"
    },
    excerpt: {
      pt: "Critérios de aceitação aplicados na recepção de feijão.",
      en: "Acceptance criteria applied when receiving beans."
    },
    date: "2026-07-14"
  },
  {
    id: "exporting-nacala-checklist",
    lang: "en",
    category: { pt: "Exportação", en: "Export" },
    title: {
      pt: "Exporting beans from Nacala: documentation checklist",
      en: "Exporting beans from Nacala: documentation checklist"
    },
    excerpt: {
      pt: "Documentos exigidos e prazos típicos no corredor de Nacala.",
      en: "Required paperwork and typical lead times on the Nacala corridor."
    },
    date: "2026-07-02"
  },
  {
    id: "agregacao-pequenos-produtores",
    lang: "pt",
    category: { pt: "Caso de operação", en: "Case study" },
    title: {
      pt: "Agregação de 300 toneladas com 60 pequenos produtores",
      en: "Aggregating 300 tonnes from 60 smallholders"
    },
    excerpt: {
      pt: "Logística, controlo de qualidade e prazos de pagamento na prática.",
      en: "Logistics, quality control and payment terms in practice."
    },
    date: "2026-06-19"
  }
];
