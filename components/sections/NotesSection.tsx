"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/lib/i18n/useLocale";
import { ARTICLES } from "@/content/articles";
import { formatDate } from "@/lib/format";
import SectionHeading from "../ui/SectionHeading";
import Container from "../layout/Container";
import Reveal from "../ui/Reveal";
import Chip from "../ui/Chip";
import Eyebrow from "../ui/Eyebrow";

export default function NotesSection() {
  const { locale, pick, t } = useLocale();
  const [showOther, setShowOther] = useState(false);

  const articles = useMemo(
    () => ARTICLES.filter((article) => article.lang === locale || showOther),
    [locale, showOther]
  );

  return (
    <section id="blog" className="border-b border-line py-[clamp(56px,8vw,96px)]">
      <Container>
        <SectionHeading eyebrow={t("notesEyebrow")} title={t("notesTitle")} />

        <div className="mb-6 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
            {articles.length} {locale === "pt" ? "artigos" : "articles"}
          </span>
          <Chip active={showOther} onClick={() => setShowOther((v) => !v)}>
            {t("notesToggleOther")}
          </Chip>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, i) => (
            <Reveal key={article.id} delay={Math.min(i * 0.06, 0.24)}>
              <article className="flex h-full flex-col rounded-sm border border-line bg-surface p-5 transition duration-300 ease-sa hover:-translate-y-[3px] hover:border-green">
                <Eyebrow className="mb-2">{pick(article.category)}</Eyebrow>
                <h3 className="mb-1.5 font-display text-[17px] font-semibold leading-snug tracking-tight text-ink">
                  {pick(article.title)}
                </h3>
                <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-ink-2">{pick(article.excerpt)}</p>
                <span className="font-mono text-[11px] text-ink-3">{formatDate(article.date)}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
