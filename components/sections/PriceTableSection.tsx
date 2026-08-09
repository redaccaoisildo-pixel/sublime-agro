"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import { PRODUCTS } from "@/content/products";
import { COLLECTION_POINTS } from "@/content/geo";
import { formatDate, formatMzn, formatNumber } from "@/lib/format";
import SectionHeading from "../ui/SectionHeading";
import Container from "../layout/Container";
import Reveal from "../ui/Reveal";

export default function PriceTableSection() {
  const { locale, pick, t } = useLocale();

  function collectionLabel(pointIds: string[]) {
    return pointIds
      .map((id) => COLLECTION_POINTS.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  }

  return (
    <section id="precos" className="border-b border-line py-[clamp(56px,8vw,96px)]">
      <Container>
        <SectionHeading eyebrow={t("pricesEyebrow")} title={t("pricesTitle")} lead={t("pricesLead")} />

        <Reveal className="overflow-x-auto rounded-sm border border-line bg-surface">
          <table className="w-full min-w-[800px] border-collapse text-[14.5px]">
            <thead>
              <tr>
                {[t("thProduct"), t("thCollection"), t("thGrade"), t("thDelivery"), t("thMin"), t("thPrice"), t("thValidUntil")].map(
                  (label) => (
                    <th
                      key={label}
                      className="whitespace-nowrap border-b border-line bg-surface px-4 py-[15px] text-left font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink-3"
                    >
                      {label}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="transition-colors duration-150 ease-sa hover:bg-bg">
                  <td className="border-b border-line px-4 py-4 font-medium text-ink">{pick(product.name)}</td>
                  <td className="border-b border-line px-4 py-4 text-ink-2">{collectionLabel(product.collectionPointIds)}</td>
                  <td className="border-b border-line px-4 py-4 text-ink-2">{pick(product.grade)}</td>
                  <td className="border-b border-line px-4 py-4 text-ink-2">{pick(product.deliveryTerms)}</td>
                  <td className="whitespace-nowrap border-b border-line px-4 py-4 font-mono text-ink">
                    {formatNumber(product.minVolumeTonnes, locale)} t
                  </td>
                  <td className="whitespace-nowrap border-b border-line px-4 py-4 font-mono font-medium tabular-nums text-ink">
                    {product.priceMzn === null ? t("priceOnRequest") : formatMzn(product.priceMzn, locale)}
                  </td>
                  <td className="whitespace-nowrap border-b border-line px-4 py-4 font-mono text-[12.5px] text-ink-3">
                    {formatDate(product.priceValidUntil)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="mt-4 rounded-sm border border-line bg-bg p-4 text-[13px] leading-relaxed text-ink-2">
          <b className="mr-1.5 text-ink">{t("disclaimerLabel")}</b>
          {t("disclaimerText")}
        </Reveal>
      </Container>
    </section>
  );
}
