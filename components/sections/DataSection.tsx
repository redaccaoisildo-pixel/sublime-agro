"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/useLocale";
import { PRODUCTS } from "@/content/products";
import SectionHeading from "../ui/SectionHeading";
import Container from "../layout/Container";
import Reveal from "../ui/Reveal";
import Chip from "../ui/Chip";
import PriceLineChart from "../charts/PriceLineChart";
import HarvestCalendarChart from "../charts/HarvestCalendarChart";

export default function DataSection() {
  const { pick, t } = useLocale();
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedId) ?? PRODUCTS[0];

  return (
    <section id="dados" className="border-b border-line py-[clamp(56px,8vw,96px)]">
      <Container>
        <SectionHeading eyebrow={t("dataEyebrow")} title={t("dataTitle")} lead={t("dataLead")} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal className="rounded-sm border border-line bg-surface p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-display text-[17px] font-semibold tracking-tight text-ink">{t("priceChartTitle")}</h3>
              <div className="flex flex-wrap gap-1.5">
                {PRODUCTS.map((product) => (
                  <Chip key={product.id} active={product.id === selectedId} onClick={() => setSelectedId(product.id)}>
                    {pick(product.name)}
                  </Chip>
                ))}
              </div>
            </div>
            <PriceLineChart product={selectedProduct} />
          </Reveal>

          <Reveal delay={0.08} className="rounded-sm border border-line bg-surface p-5 md:p-6">
            <div className="mb-4">
              <h3 className="font-display text-[17px] font-semibold tracking-tight text-ink">{t("calendarChartTitle")}</h3>
              <p className="text-[13.5px] text-ink-2">{t("calendarChartLead")}</p>
            </div>
            <HarvestCalendarChart products={PRODUCTS} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
