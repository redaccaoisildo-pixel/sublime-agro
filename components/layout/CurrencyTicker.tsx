"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import { FX_RATES, FX_SOURCE } from "@/content/fx";
import { formatDate, formatNumber } from "@/lib/format";
import Container from "./Container";

export default function CurrencyTicker() {
  const { locale, pick, t } = useLocale();

  return (
    <div className="border-b border-line bg-surface font-mono text-xs">
      <Container className="flex flex-wrap items-center gap-x-7 gap-y-1.5 py-[9px]">
        {FX_RATES.map((rate) => (
          <span key={rate.pair} className="flex items-baseline gap-2">
            <span className="text-[11px] tracking-[0.06em] text-ink-3">{rate.pair}</span>
            <b className="font-semibold tabular-nums">{formatNumber(rate.value, locale, 2)}</b>
          </span>
        ))}
        <span className="ml-auto text-[11px] text-ink-3">
          {pick(FX_SOURCE.label)} · {formatDate(FX_SOURCE.asOf)} · {t("fxSourceLabel")}
        </span>
      </Container>
    </div>
  );
}
