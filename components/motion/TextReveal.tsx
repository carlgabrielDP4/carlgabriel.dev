"use client";

import { motion, type Variants } from "motion/react";
import { useMemo, createElement, type ElementType } from "react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "char";
  once?: boolean;
};

const childVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function TextReveal({
  text,
  as = "p",
  className,
  delay = 0,
  stagger = 0.04,
  splitBy = "word",
  once = true,
}: Props) {
  const parts = useMemo(() => {
    if (splitBy === "char") return text.split("");
    return text.split(" ");
  }, [text, splitBy]);

  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);

  return (
    <MotionTag
      className={cn("inline-block leading-[1.05]", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {parts.map((part, i) =>
        createElement(
          "span",
          {
            key: i,
            className: "relative inline-block overflow-hidden align-bottom",
            style: {
              paddingBottom: "0.12em",
              marginRight: splitBy === "word" ? "0.25em" : 0,
            },
          },
          <motion.span
            className="inline-block"
            variants={childVariants}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {part === " " ? "\u00A0" : part}
          </motion.span>
        )
      )}
    </MotionTag>
  );
}
