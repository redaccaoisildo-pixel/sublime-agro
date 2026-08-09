"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import type { Product } from "@/content/products";
import { MONTH_INITIALS } from "@/content/dictionary";

const VB_W = 760;
const VB_H = 300;
const MARGIN = { top: 24, right: 16, bottom: 30, left: 150 };
const GW = VB_W - MARGIN.left - MARGIN.right;

type Props = { products: Product[] };

export default function HarvestCalendarChart({ products }: Props) {
  const { locale, pick, t } = useLocale();
  const rowH = (VB_H - MARGIN.top - MARGIN.bottom) / products.length;
  const monthW = GW / 12;
  const currentMonth = new Date().getMonth() + 1;

  function monthX(month: number) {
    return MARGIN.left + (month - 1) * monthW;
  }

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="block w-full h-auto"
      role="img"
      aria-label={t("calendarChartTitle")}
    >
      {MONTH_INITIALS.map((label, i) => (
        <text key={i} x={monthX(i + 1) + monthW / 2} y={16} textAnchor="middle" className="fill-ink-3 font-mono text-[10px] uppercase tracking-[0.08em]">
          {pick(label)}
        </text>
      ))}

      {Array.from({ length: 13 }).map((_, i) => (
        <line key={i} x1={monthX(i + 1)} x2={monthX(i + 1)} y1={MARGIN.top} y2={VB_H - MARGIN.bottom} className="stroke-line" strokeWidth={1} />
      ))}

      <rect x={monthX(currentMonth)} y={MARGIN.top} width={monthW} height={VB_H - MARGIN.top - MARGIN.bottom} className="fill-brown-tint" opacity={0.6} />

      {products.map((product, i) => {
        const [start, end] = product.harvestMonths;
        const barY = MARGIN.top + i * rowH + rowH * 0.22;
        const barH = rowH * 0.56;
        const barX = monthX(start);
        const barW = (end - start + 1) * monthW;

        return (
          <g key={product.id}>
            <text x={0} y={MARGIN.top + i * rowH + rowH / 2 + 4} className="fill-ink text-[13.5px]">
              {pick(product.name)}
            </text>
            <rect x={barX} y={barY} width={barW} height={barH} rx={2} className="fill-green-tint stroke-green" strokeWidth={1}>
              <title>{pick(product.seasonLabel)}</title>
            </rect>
          </g>
        );
      })}
    </svg>
  );
}
