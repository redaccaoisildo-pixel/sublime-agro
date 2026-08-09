import Hero from "@/components/sections/Hero";
import ProductsSection from "@/components/sections/ProductsSection";
import PriceTableSection from "@/components/sections/PriceTableSection";
import NiassaSection from "@/components/sections/NiassaSection";
import DataSection from "@/components/sections/DataSection";
import NotesSection from "@/components/sections/NotesSection";
import QuoteSection from "@/components/sections/QuoteSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <PriceTableSection />
      <NiassaSection />
      <DataSection />
      <NotesSection />
      <QuoteSection />
    </>
  );
}
