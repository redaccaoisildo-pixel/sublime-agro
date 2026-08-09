import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export default function Chip({ active, onClick, children, className }: Props) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={clsx(
        "rounded-sm border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.06em] transition-colors duration-150 ease-sa",
        active ? "border-green bg-green text-[#12300F]" : "border-line bg-surface text-ink-2 hover:border-ink-3",
        className
      )}
    >
      {children}
    </button>
  );
}
