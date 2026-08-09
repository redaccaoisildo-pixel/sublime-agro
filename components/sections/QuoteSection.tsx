"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Container from "../layout/Container";
import QuoteForm from "../QuoteForm";

export default function QuoteSection() {
  const { t } = useLocale();

  return (
    <section id="cotacao" className="py-[clamp(56px,8vw,96px)]">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{t("quoteEyebrow")}</Eyebrow>
            <h2 className="mt-2.5 mb-3 font-display text-tit-lg font-bold text-ink">{t("quoteTitle")}</h2>
            <p className="mb-0 max-w-[58ch] text-[clamp(16px,0.4vw+15px,17.5px)] text-ink-2">{t("quoteLead")}</p>
            <div className="mt-6 rounded-sm border border-line bg-bg p-4 text-[13px] leading-relaxed text-ink-2">
              <b className="mr-1.5 text-ink">{t("quoteNoteLabel")}</b>
              {t("quoteNoteText")}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
