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
  const words = useMemo(() => text.split(" "), [text]);

  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);

  const renderChar = (part: string, key: number, trailingSpace: boolean) =>
    createElement(
      "span",
      {
        key,
        className: "relative inline-block overflow-hidden align-bottom",
        style: {
          paddingBottom: "0.12em",
          marginRight: trailingSpace ? "0.25em" : 0,
        },
      },
      <motion.span
        className="inline-block"
        variants={childVariants}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {part === " " ? "\u00A0" : part}
      </motion.span>
    );

  return (
    <MotionTag
      className={cn("inline-block leading-[1.05]", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {splitBy === "char"
        ? words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap" style={{ marginRight: "0.25em" }}>
              {word.split("").map((char, ci) => renderChar(char, ci, false))}
            </span>
          ))
        : words.map((word, wi) => renderChar(word, wi, true))}
    </MotionTag>
  );
}
