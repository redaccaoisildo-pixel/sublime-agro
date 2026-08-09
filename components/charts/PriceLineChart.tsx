"use client";

import { useMemo, useState, type PointerEvent } from "react";
import { useLocale } from "@/lib/i18n/useLocale";
import type { Product } from "@/content/products";
import { generatePriceSeries } from "@/lib/priceSeries";
import { formatNumber } from "@/lib/format";

const VB_W = 760;
const VB_H = 280;
const MARGIN = { top: 20, right: 16, bottom: 28, left: 58 };
const GW = VB_W - MARGIN.left - MARGIN.right;
const GH = VB_H - MARGIN.top - MARGIN.bottom;

type Props = { product: Product };

export default function PriceLineChart({ product }: Props) {
  const { locale, t } = useLocale();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const series = useMemo(
    () => (product.priceMzn ? generatePriceSeries(product.id, product.priceMzn) : []),
    [product.id, product.priceMzn]
  );

  if (!product.priceMzn || series.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-sm border border-dashed border-line text-sm text-ink-3">
        {t("priceOnRequest")}
      </div>
    );
  }

  const values = series.map((p) => p.value);
  const min = Math.min(...values) * 0.98;
  const max = Math.max(...values) * 1.02;

  function x(day: number) {
    return MARGIN.left + (day / (series.length - 1)) * GW;
  }
  function y(value: number) {
    return MARGIN.top + GH - ((value - min) / (max - min)) * GH;
  }

  const linePath = series.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${x(series[series.length - 1].day).toFixed(1)},${MARGIN.top + GH} L${x(0).toFixed(1)},${MARGIN.top + GH} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => min + (max - min) * t);

  function handlePointerMove(e: PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const index = Math.round(ratio * (series.length - 1));
    setHoverIndex(index);
  }

  const hovered = hoverIndex !== null ? series[hoverIndex] : null;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="block w-full h-auto"
      role="img"
      aria-label={t("priceChartTitle")}
    >
      {gridLines.map((value, i) => (
        <g key={i}>
          <line
            x1={MARGIN.left}
            x2={VB_W - MARGIN.right}
            y1={y(value)}
            y2={y(value)}
            className="stroke-line"
            strokeWidth={1}
          />
          <text x={MARGIN.left - 10} y={y(value) + 4} textAnchor="end" className="fill-ink-3 font-mono text-[10px] tabular-nums">
            {formatNumber(value, locale)}
          </text>
        </g>
      ))}

      <path d={areaPath} className="fill-green-tint" opacity={0.6} />
      <path d={linePath} className="fill-none stroke-green" strokeWidth={2} />

      {hovered ? (
        <g>
          <line x1={x(hovered.day)} x2={x(hovered.day)} y1={MARGIN.top} y2={MARGIN.top + GH} className="stroke-ink-3" strokeWidth={1} strokeDasharray="3 3" />
          <circle cx={x(hovered.day)} cy={y(hovered.value)} r={4} className="fill-green stroke-surface" strokeWidth={2} />
          <g transform={`translate(${Math.min(x(hovered.day) + 10, VB_W - 110)}, ${Math.max(MARGIN.top + 4, y(hovered.value) - 24)})`}>
            <rect width={100} height={34} rx={2} className="fill-ink" opacity={0.92} />
            <text x={8} y={14} className="fill-bg font-mono text-[10px]">
              {locale === "pt" ? `Dia ${hovered.day + 1}` : `Day ${hovered.day + 1}`}
            </text>
            <text x={8} y={27} className="fill-bg font-mono text-[11px] font-semibold tabular-nums">
              {formatNumber(hovered.value, locale)} MZN
            </text>
          </g>
        </g>
      ) : null}

      <rect
        x={MARGIN.left}
        y={MARGIN.top}
        width={GW}
        height={GH}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
      />
    </svg>
  );
}
