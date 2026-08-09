import type { ReactNode } from "react";
import clsx from "clsx";

export default function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("mx-auto max-w-editorial px-5 md:px-8 lg:px-[42px]", className)}>{children}</div>;
}
