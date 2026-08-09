import type { ReactNode } from "react";
import clsx from "clsx";

export default function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-brown",
        className
      )}
    >
      {children}
    </span>
  );
}
