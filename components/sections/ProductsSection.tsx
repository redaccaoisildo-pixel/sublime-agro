"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import { PRODUCTS } from "@/content/products";
import SectionHeading from "../ui/SectionHeading";
import Container from "../layout/Container";
import ProductCard from "./ProductCard";

export default function ProductsSection() {
  const { t } = useLocale();

  return (
    <section id="produtos" className="border-b border-line py-[clamp(56px,8vw,96px)]">
      <Container>
        <SectionHeading eyebrow={t("productsEyebrow")} title={t("productsTitle")} lead={t("productsLead")} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={Math.min(i * 0.06, 0.24)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
