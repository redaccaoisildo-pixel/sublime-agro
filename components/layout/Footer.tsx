"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import { SITE, NAV_LINKS, FOOTER_INFO_LINKS, FOOTER_CONTACT_LINES } from "@/content/site";
import Container from "./Container";

export default function Footer() {
  const { pick, t } = useLocale();

  return (
    <footer className="border-t border-line pt-14 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-ink-2">{pick(SITE.description)}</p>
          </div>
          <div>
            <h4 className="mb-3 font-display text-[15px] font-semibold text-ink">{t("footerNavHeading")}</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[14px] text-ink-2 transition-colors hover:text-ink">
                    {pick(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-[15px] font-semibold text-ink">{t("footerInfoHeading")}</h4>
            <ul className="space-y-2">
              {FOOTER_INFO_LINKS.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-[14px] text-ink-2 transition-colors hover:text-ink">
                    {pick(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-[15px] font-semibold text-ink">{t("footerContactHeading")}</h4>
            <ul className="space-y-2 text-[14px] text-ink-2">
              {FOOTER_CONTACT_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 font-mono text-[11px] leading-relaxed text-ink-3">
          <p>{t("footerLegalLine")}</p>
          <p>{t("footerAttributionLine")}</p>
        </div>
      </Container>
    </footer>
  );
}
