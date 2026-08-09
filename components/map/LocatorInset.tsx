import { MOZAMBIQUE_VIEWBOX, MOZAMBIQUE_OUTLINE_PATH, NIASSA_HIGHLIGHT_PATH } from "@/content/geo";

export default function LocatorInset() {
  return (
    <svg
      viewBox={`0 0 ${MOZAMBIQUE_VIEWBOX.w} ${MOZAMBIQUE_VIEWBOX.h}`}
      aria-hidden="true"
      className="absolute right-3.5 top-3.5 w-[54px] h-auto"
    >
      <path d={MOZAMBIQUE_OUTLINE_PATH} className="fill-bg stroke-line" strokeWidth={1} />
      <path d={NIASSA_HIGHLIGHT_PATH} className="fill-green" />
    </svg>
  );
}
