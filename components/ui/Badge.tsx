import type { ReactNode } from "react";
import clsx from "clsx";

type Tone = "green" | "neutral";

const tones: Record<Tone, string> = {
  green: "bg-green-tint text-[#1F5C19]",
  neutral: "bg-line text-ink-2"
};

export default function Badge({ children, tone = "green" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={clsx(
        "whitespace-nowrap rounded-sm px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.09em]",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}
