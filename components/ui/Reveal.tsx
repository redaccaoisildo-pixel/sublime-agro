"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "p" | "li" | "article" | "ul";
  className?: string;
};

export default function Reveal({ children, delay = 0, y = 18, as = "div", className }: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.62, ease: [0.22, 0.61, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
