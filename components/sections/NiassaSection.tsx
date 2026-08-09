"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/lib/i18n/useLocale";
import { COLLECTION_POINTS } from "@/content/geo";
import { PRODUCTS } from "@/content/products";
import SectionHeading from "../ui/SectionHeading";
import Container from "../layout/Container";
import Reveal from "../ui/Reveal";
import NiassaMap from "../map/NiassaMap";
import LocatorInset from "../map/LocatorInset";
import RegionPanel from "../map/RegionPanel";

export default function NiassaSection() {
  const { t } = useLocale();
  const [selectedId, setSelectedId] = useState(COLLECTION_POINTS[0].id);

  const selectedPoint = COLLECTION_POINTS.find((p) => p.id === selectedId) ?? COLLECTION_POINTS[0];
  const products = useMemo(
    () => PRODUCTS.filter((product) => product.collectionPointIds.includes(selectedId)),
    [selectedId]
  );

  return (
    <section id="mapa" className="border-b border-line py-[clamp(56px,8vw,96px)]">
      <Container>
        <SectionHeading eyebrow={t("mapEyebrow")} title={t("mapTitle")} lead={t("mapLead")} />

        <Reveal className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(240px,320px)_1fr] lg:gap-12">
          <div>
            <div className="relative rounded-sm border border-line bg-surface p-4">
              <LocatorInset />
              <NiassaMap points={COLLECTION_POINTS} selectedId={selectedId} onSelect={setSelectedId} />
            </div>
            <div className="mt-3.5 flex flex-wrap gap-3.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-2.5 w-2.5 rounded-sm bg-green" />
                {t("legendSelected")}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-2.5 w-2.5 rounded-sm border border-[#CADEC6] bg-green-tint" />
                {t("legendPoint")}
              </span>
            </div>
          </div>

          <RegionPanel pointName={selectedPoint.name} products={products} />
        </Reveal>
      </Container>
    </section>
  );
}
