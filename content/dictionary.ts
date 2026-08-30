import type { Bilingual } from "./types";

/**
 * UI chrome strings — labels, headings, disclaimers, form copy. Bilingual
 * *data* (products, articles, fx source line) lives in its own content
 * files; this file is strictly interface text shared across sections.
 */
export const dictionary = {
  // Header / nav
  requestQuote: { pt: "Pedir cotação", en: "Request a quote" },
  languageLabel: { pt: "Idioma", en: "Language" },

  // Currency ticker
  fxSourceLabel: {
    pt: "Banco de Moçambique · taxas de referência, meramente informativas",
    en: "Bank of Mozambique · reference rates, for information only"
  },

  // Hero
  heroEyebrow: {
    pt: "Mercadorias agrícolas · Província do Niassa, Moçambique",
    en: "Agricultural commodities · Niassa Province, Mozambique"
  },
  heroTitle: { pt: "Consulte, escolha e encomende.", en: "Check, pick & order." },
  heroLead: {
    pt: "Toda a carteira de feijões agregada no Niassa, com unidade, qualidade, condição de entrega e preço datado. Sem telefonema prévio.",
    en: "The full bean portfolio aggregated in Niassa, with unit, grade, delivery terms and a dated price. No phone call required."
  },
  heroCtaPrimary: { pt: "Ver carteira", en: "View portfolio" },
  heroCtaSecondary: { pt: "Ver pontos de recolha", en: "View collection points" },
  heroBoardTitle: { pt: "Quadro de hoje", en: "Today's board" },

  // Products
  productsEyebrow: { pt: "Carteira", en: "Portfolio" },
  productsTitle: { pt: "Produtos", en: "Products" },
  productsLead: {
    pt: "Cada ficha indica origem, classificação e condição de entrega. O preço aplica-se à condição indicada — outras condições alteram o valor.",
    en: "Each listing shows origin, grade and delivery terms. The price applies to the stated terms — other terms change the value."
  },
  statusInSeason: { pt: "Em campanha", en: "In season" },
  statusNextHarvest: { pt: "Próxima colheita", en: "Next harvest" },
  dtGrade: { pt: "Qualidade", en: "Grade" },
  dtDelivery: { pt: "Entrega", en: "Delivery" },
  dtSeason: { pt: "Época", en: "Season" },
  priceOnRequest: { pt: "Sob cotação", en: "On request" },

  // Price table
  pricesEyebrow: { pt: "Mercado", en: "Market" },
  pricesTitle: { pt: "Tabela de preços", en: "Price list" },
  pricesLead: {
    pt: "Preços praticados pela Sublime Agro. Não são médias de mercado nem cotações de bolsa.",
    en: "Prices practised by Sublime Agro. These are not market averages or exchange quotes."
  },
  thProduct: { pt: "Produto", en: "Product" },
  thCollection: { pt: "Recolha", en: "Collection" },
  thGrade: { pt: "Qualidade", en: "Grade" },
  thDelivery: { pt: "Condição de entrega", en: "Delivery terms" },
  thMin: { pt: "Mín.", en: "Min." },
  thPrice: { pt: "Preço", en: "Price" },
  thValidUntil: { pt: "Válido até", en: "Valid until" },
  disclaimerLabel: { pt: "Ressalva", en: "Disclaimer" },
  disclaimerText: {
    pt: "Os preços podem variar e estão sujeitos a confirmação, disponibilidade e volume mínimo. Não constituem proposta vinculativa até confirmação escrita.",
    en: "Prices may vary and are subject to confirmation, availability and minimum volume. They do not constitute a binding offer until confirmed in writing."
  },

  // Niassa map
  mapEyebrow: { pt: "Cobertura", en: "Coverage" },
  mapTitle: { pt: "Província do Niassa", en: "Niassa Province" },
  mapLead: {
    pt: "Toda a operação decorre no Niassa. Selecione um ponto de recolha para ver os produtos agregados nesse local.",
    en: "All operations take place in Niassa. Select a collection point to see the products aggregated there."
  },
  legendSelected: { pt: "Ponto selecionado", en: "Selected point" },
  legendPoint: { pt: "Ponto de recolha", en: "Collection point" },
  regionEmpty: {
    pt: "Nenhum produto agregado neste ponto de momento.",
    en: "No products currently aggregated at this point."
  },

  // Data / charts
  dataEyebrow: { pt: "Dados", en: "Data" },
  dataTitle: { pt: "Preço e calendário", en: "Price and calendar" },
  dataLead: {
    pt: "Duas leituras que condicionam uma compra: como o preço se moveu nos últimos noventa dias, e quando cada variedade está disponível.",
    en: "Two readings that shape a purchase: how the price moved over the last ninety days, and when each variety is available."
  },
  priceChartTitle: { pt: "Evolução do preço · 90 dias", en: "Price movement · 90 days" },
  calendarChartTitle: { pt: "Calendário de colheita", en: "Harvest calendar" },
  calendarChartLead: {
    pt: "Janelas de disponibilidade por variedade ao longo do ano.",
    en: "Availability windows by variety across the year."
  },
  calendarPendingData: {
    pt: "Ainda não temos dados reais de época de colheita por variedade — esta secção fica pendente até o cliente confirmar.",
    en: "We don't yet have real harvest-season data per variety — this section is pending until the client confirms it."
  },

  // Notes / blog
  notesEyebrow: { pt: "Editorial", en: "Editorial" },
  notesTitle: { pt: "Notas e análises", en: "Notes and analysis" },
  notesToggleOther: { pt: "Ver noutro idioma", en: "View other language" },

  // Quote form
  quoteEyebrow: { pt: "Contacto", en: "Contact" },
  quoteTitle: { pt: "Pedir cotação", en: "Request a quote" },
  quoteLead: {
    pt: "Indique produto, volume e destino. A cotação inclui condição de entrega, prazo e a taxa de câmbio aplicável à data de emissão.",
    en: "Tell us the product, volume and destination. The quote states delivery terms, lead time and the exchange rate applicable on the date of issue."
  },
  quoteNoteLabel: { pt: "Nota", en: "Note" },
  quoteNoteText: {
    pt: "Resposta em até dois dias úteis. Volumes abaixo do mínimo indicado na tabela são avaliados caso a caso.",
    en: "Reply within two business days. Volumes below the minimum shown in the table are assessed case by case."
  },
  formName: { pt: "Nome", en: "Name" },
  formCompany: { pt: "Empresa", en: "Company" },
  formEmail: { pt: "Correio eletrónico", en: "Email" },
  formPhone: { pt: "Telefone", en: "Phone" },
  formProduct: { pt: "Produto", en: "Product" },
  formVolume: { pt: "Volume (toneladas)", en: "Volume (tonnes)" },
  formDestination: { pt: "Destino", en: "Destination" },
  formNotes: { pt: "Observações", en: "Notes" },
  formSubmit: { pt: "Enviar pedido", en: "Send request" },
  formSubmitting: { pt: "A enviar…", en: "Sending…" },
  formSuccess: {
    pt: "Pedido enviado. Entraremos em contacto em breve.",
    en: "Request sent. We'll be in touch shortly."
  },
  formError: {
    pt: "Não foi possível enviar o pedido. Tente novamente.",
    en: "Couldn't send the request. Please try again."
  },
  errorRequired: { pt: "Campo obrigatório", en: "Required field" },
  errorEmail: { pt: "Email inválido", en: "Invalid email" },
  errorVolume: { pt: "Volume deve ser maior que zero", en: "Volume must be greater than zero" },

  // Footer
  footerNavHeading: { pt: "Navegação", en: "Navigation" },
  footerInfoHeading: { pt: "Informação", en: "Information" },
  footerContactHeading: { pt: "Contactos", en: "Contact" },
  footerLegalLine: {
    pt: "Sublime Agro, SU, Lda. · Todos os preços apresentados são praticados pela empresa, podem variar e estão sujeitos a confirmação escrita.",
    en: "Sublime Agro, SU, Lda. · All prices shown are practised by the company, may vary and are subject to written confirmation."
  },
  footerAttributionLine: {
    pt: "Fronteira provincial: Natural Earth (domínio público). Taxas de câmbio de referência do Banco de Moçambique, a título informativo.",
    en: "Provincial boundary: Natural Earth (public domain). Bank of Mozambique reference exchange rates, for information only."
  }
} satisfies Record<string, Bilingual>;

export type DictionaryKey = keyof typeof dictionary;

export const MONTH_INITIALS: Bilingual[] = [
  { pt: "J", en: "J" },
  { pt: "F", en: "F" },
  { pt: "M", en: "M" },
  { pt: "A", en: "A" },
  { pt: "M", en: "M" },
  { pt: "J", en: "J" },
  { pt: "J", en: "J" },
  { pt: "A", en: "A" },
  { pt: "S", en: "S" },
  { pt: "O", en: "O" },
  { pt: "N", en: "N" },
  { pt: "D", en: "D" }
];
