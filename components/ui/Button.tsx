import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-[22px] py-3 font-display text-[14.5px] font-semibold tracking-tight transition duration-150 ease-sa";

const variants: Record<Variant, string> = {
  primary: "bg-green text-[#12300F] hover:bg-green-hover hover:-translate-y-px",
  outline:
    "bg-surface text-ink shadow-[inset_0_0_0_1.5px_theme(colors.line)] hover:shadow-[inset_0_0_0_1.5px_theme(colors.green.DEFAULT)] hover:-translate-y-px"
};

type Props = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
);

export default function Button({ variant = "primary", className, children, ...props }: Props) {
  const classes = clsx(base, variants[variant], className);

  if (props.href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} type="button" {...buttonProps}>
      {children}
    </button>
  );
}
