"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/i18n/useLocale";
import { PRODUCTS } from "@/content/products";
import { formatDate, formatMzn } from "@/lib/format";
import Eyebrow from "../ui/Eyebrow";
import Stamp from "../ui/Stamp";
import Button from "../ui/Button";

const TODAY_ISO = new Date().toISOString().slice(0, 10);
const BOARD_ITEMS = PRODUCTS.slice(0, 4);

export default function Hero() {
  const { locale, pick, t } = useLocale();
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const, delay }
  });

  return (
    <section className="border-b border-line py-[clamp(48px,7vw,80px)]">
      <div className="mx-auto grid max-w-editorial grid-cols-1 gap-9 px-5 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-[62px] lg:px-[42px]">
        <div>
          <motion.div {...fadeUp(0)}>
            <Eyebrow>{t("heroEyebrow")}</Eyebrow>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="my-4 max-w-[14ch] font-display text-hero-lg font-bold italic uppercase text-brown"
          >
            {t("heroTitle")}
          </motion.h1>

          <motion.p {...fadeUp(0.18)} className="mb-[30px] max-w-[44ch] text-[clamp(16px,0.5vw+15px,17.5px)] text-ink-2">
            {t("heroLead")}
          </motion.p>

          <motion.div {...fadeUp(0.26)} className="flex flex-wrap gap-3">
            <Button href="#produtos" variant="primary">
              {t("heroCtaPrimary")}
            </Button>
            <Button href="#mapa" variant="outline">
              {t("heroCtaSecondary")}
            </Button>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.16)}
          className="overflow-hidden rounded-sm border border-line bg-surface shadow-[0_1px_2px_rgba(32,34,31,0.03),0_8px_28px_-18px_rgba(32,34,31,0.18)]"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <h3 className="font-display text-[15px] font-semibold tracking-tight text-ink">{t("heroBoardTitle")}</h3>
            <Stamp>{formatDate(TODAY_ISO)}</Stamp>
          </div>
          <ul className="list-none">
            {BOARD_ITEMS.map((product) => (
              <li key={product.id} className="flex items-baseline gap-3.5 border-b border-line px-5 py-[15px] last:border-b-0">
                <span className="flex-1 text-[15px] font-medium text-ink">{pick(product.name)}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">{pick(product.unit)}</span>
                <span className="whitespace-nowrap font-mono text-[15px] font-semibold tabular-nums text-ink">
                  {product.priceMzn === null ? t("priceOnRequest") : formatMzn(product.priceMzn, locale)}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
