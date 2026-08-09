"use client";

import type { KeyboardEvent } from "react";
import { NIASSA_VIEWBOX, NIASSA_PROVINCE_PATH, type CollectionPoint } from "@/content/geo";

type Props = {
  points: CollectionPoint[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function NiassaMap({ points, selectedId, onSelect }: Props) {
  function handleKeyDown(e: KeyboardEvent<SVGGElement>, id: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  }

  return (
    <svg
      viewBox={`0 0 ${NIASSA_VIEWBOX.w} ${NIASSA_VIEWBOX.h}`}
      role="group"
      aria-label="Pontos de recolha na província do Niassa"
      className="block w-full h-auto"
    >
      <path d={NIASSA_PROVINCE_PATH} className="fill-green-tint stroke-[#CADEC6]" strokeWidth={2} />

      {points.map((point) => {
        const selected = point.id === selectedId;
        const labelAnchor = point.x > NIASSA_VIEWBOX.w * 0.66 ? "end" : "start";
        const labelOffset = labelAnchor === "end" ? -14 : 14;

        return (
          <g
            key={point.id}
            role="button"
            tabIndex={0}
            aria-label={point.name}
            aria-pressed={selected}
            onClick={() => onSelect(point.id)}
            onKeyDown={(e) => handleKeyDown(e, point.id)}
            className="cursor-pointer outline-none"
          >
            {selected ? (
              <circle
                cx={point.x}
                cy={point.y}
                r={9}
                className="fill-none stroke-green animate-halo"
                strokeWidth={2}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            ) : null}
            <circle
              cx={point.x}
              cy={point.y}
              r={9}
              className={
                selected
                  ? "fill-green stroke-green transition-colors duration-300 ease-sa"
                  : "fill-green-tint stroke-[#7FC578] transition-colors duration-300 ease-sa hover:fill-[#D5EDD1]"
              }
              strokeWidth={2}
            />
            <text
              x={point.x + labelOffset}
              y={point.y + 5}
              textAnchor={labelAnchor}
              className={clsxText(selected)}
            >
              {point.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function clsxText(selected: boolean) {
  return selected
    ? "font-mono text-[15px] tracking-[0.03em] fill-ink font-semibold"
    : "font-mono text-[15px] tracking-[0.03em] fill-ink-2";
}
