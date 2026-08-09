"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/i18n/useLocale";
import type { Product } from "@/content/products";
import { formatMzn } from "@/lib/format";

type Props = {
  pointName: string;
  products: Product[];
};

export default function RegionPanel({ pointName, products }: Props) {
  const { locale, pick, t } = useLocale();
  const reduce = useReducedMotion();

  const countLabel =
    locale === "pt"
      ? `${products.length} ${products.length === 1 ? "produto agregado" : "produtos agregados"}`
      : `${products.length} ${products.length === 1 ? "product aggregated" : "products aggregated"}`;

  return (
    <div className="min-h-[300px] rounded-sm border border-line bg-surface p-6 md:p-[30px]">
      <h3 className="mb-1.5 font-display text-[clamp(23px,2vw,28px)] font-bold tracking-tight text-ink">{pointName}</h3>
      <div className="mb-[22px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">{countLabel}</div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={pointName}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="list-none"
        >
          {products.length === 0 ? (
            <li className="py-3.5 text-[15px] text-ink-2">{t("regionEmpty")}</li>
          ) : (
            products.map((product, i) => (
              <motion.li
                key={product.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 0.61, 0.36, 1], delay: reduce ? 0 : i * 0.05 }}
                className="flex items-baseline gap-4 border-b border-line py-3.5 last:border-b-0"
              >
                <span className="flex-1 text-[15.5px] font-medium text-ink">{pick(product.name)}</span>
                <span className="whitespace-nowrap font-mono text-sm font-medium tabular-nums text-ink">
                  {product.priceMzn === null ? t("priceOnRequest") : formatMzn(product.priceMzn, locale)}
                </span>
              </motion.li>
            ))
          )}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
