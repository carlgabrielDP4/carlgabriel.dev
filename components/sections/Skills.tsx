"use client";

import { motion } from "motion/react";
import { Marquee } from "@/components/motion/Marquee";

const tools = [
  "Figma",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Motion",
  "GSAP",
  "Python",
  "Flask",
  "SQLAlchemy",
  "SAP Fiori",
  "Tableau",
  "Power BI",
  "Cursor",
  "Azure",
];

const services = [
  "UI Engineering",
  "Product Design",
  "Design Systems",
  "Motion Design",
  "Prototyping",
  "Data Viz",
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-y border-[var(--line)] py-24 md:py-32">
      <div className="mb-12 flex items-baseline justify-between gap-6 px-6 md:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
          (03) - Tools / Services
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
          The stack
        </span>
      </div>

      <Marquee speed={45}>
        {tools.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-none tracking-tight"
          >
            <span className="text-[var(--fg)]">{t}</span>
            <span className="mx-8 text-[var(--accent)]">*</span>
          </span>
        ))}
      </Marquee>

      <div className="mt-8 border-t border-[var(--line)] pt-8">
        <Marquee speed={35} reverse>
          {services.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="font-display text-[clamp(2rem,5vw,4rem)] italic leading-none tracking-tight text-[var(--fg-muted)]"
            >
              <span>{s}</span>
              <span className="mx-6 text-[var(--accent)] not-italic">/</span>
            </span>
          ))}
        </Marquee>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 grid grid-cols-2 gap-4 px-6 md:grid-cols-4 md:px-10"
      >
        {[
          { k: "Design", v: "Figma, Framer, Wix" },
          { k: "Frontend", v: "React, Next, TS" },
          { k: "Backend", v: "Python, Flask, SQL" },
          { k: "Data / Cloud", v: "Tableau, Power BI, Azure" },
        ].map((b) => (
          <div key={b.k} className="border-t border-[var(--line)] pt-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              {b.k}
            </div>
            <div className="mt-2 text-sm">{b.v}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
