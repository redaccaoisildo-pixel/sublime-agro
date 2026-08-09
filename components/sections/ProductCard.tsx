"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import type { Product } from "@/content/products";
import { formatMzn } from "@/lib/format";
import Badge from "../ui/Badge";
import Reveal from "../ui/Reveal";

export default function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const { locale, pick, t } = useLocale();

  return (
    <Reveal delay={delay} className="flex">
      <div className="flex w-full flex-col rounded-sm border border-line bg-surface p-[22px] pb-6 transition duration-300 ease-sa hover:-translate-y-[3px] hover:border-green hover:shadow-[0_14px_32px_-22px_rgba(32,34,31,0.4)]">
        <div className="mb-3.5 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{pick(product.name)}</h3>
            <span className="font-mono text-[11px] italic text-ink-3">{product.scientificName}</span>
          </div>
          <Badge>{t(product.statusKey === "inSeason" ? "statusInSeason" : "statusNextHarvest")}</Badge>
        </div>

        <dl className="mb-[18px] grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13.5px]">
          <dt className="whitespace-nowrap pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">{t("dtGrade")}</dt>
          <dd className="m-0 text-ink-2">{pick(product.grade)}</dd>
          <dt className="whitespace-nowrap pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">{t("dtDelivery")}</dt>
          <dd className="m-0 text-ink-2">{pick(product.deliveryTerms)}</dd>
          <dt className="whitespace-nowrap pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">{t("dtSeason")}</dt>
          <dd className="m-0 text-ink-2">{pick(product.seasonLabel)}</dd>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          {product.priceMzn === null ? (
            <span className="font-display text-base font-semibold text-ink">{t("priceOnRequest")}</span>
          ) : (
            <span className="block leading-tight">
              <span className="block font-mono text-[22px] font-semibold tracking-tight tabular-nums text-ink">
                {formatMzn(product.priceMzn, locale)}
              </span>
              <span className="font-mono text-[11px] tracking-[0.05em] text-ink-3">/ {pick(product.unit)}</span>
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
