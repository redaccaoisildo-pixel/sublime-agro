"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/useLocale";
import { NAV_LINKS } from "@/content/site";
import Button from "../ui/Button";
import Container from "./Container";

export default function Header() {
  const { locale, setLocale, pick, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-[60] border-b border-transparent bg-bg/[0.86] backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 ease-sa-soft",
        scrolled && "border-line bg-bg/[0.94]"
      )}
    >
      <Container
        className={clsx(
          "flex flex-wrap items-center gap-x-6 gap-y-3 py-4 transition-[padding] duration-300 ease-sa-soft",
          scrolled && "py-2.5"
        )}
      >
        <a href="#" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Sublime Agro"
            width={172}
            height={49}
            className={clsx("h-auto transition-all duration-300 ease-sa-soft", scrolled ? "w-[146px]" : "w-[172px]")}
            priority
          />
        </a>

        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[14.5px] text-ink-2 transition-colors duration-150 ease-sa hover:text-ink"
            >
              {pick(link.label)}
              <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-green transition-transform duration-300 ease-sa group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3.5">
          <div className="flex gap-0.5 font-mono text-[11.5px] tracking-[0.08em]" role="group" aria-label={t("languageLabel")}>
            <button
              type="button"
              aria-pressed={locale === "pt"}
              onClick={() => setLocale("pt")}
              className={clsx(
                "rounded-sm px-2.5 py-[5px] transition-colors duration-150 ease-sa",
                locale === "pt" ? "bg-green-tint text-ink" : "text-ink-3 hover:text-ink"
              )}
            >
              PT
            </button>
            <button
              type="button"
              aria-pressed={locale === "en"}
              onClick={() => setLocale("en")}
              className={clsx(
                "rounded-sm px-2.5 py-[5px] transition-colors duration-150 ease-sa",
                locale === "en" ? "bg-green-tint text-ink" : "text-ink-3 hover:text-ink"
              )}
            >
              EN
            </button>
          </div>
          <Button href="#cotacao" variant="primary" className="!px-4 !py-2 text-[13.5px]">
            {t("requestQuote")}
          </Button>
        </div>
      </Container>
    </header>
  );
}
