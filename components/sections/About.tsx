"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { TextReveal } from "@/components/motion/TextReveal";

const stats = [
  { k: "Countries visited", v: "09" },
  { k: "5K pace", v: "4:12/km" },
  { k: "Football position", v: "left wing" },
  { k: "Favourite colour", v: "purple" },
  { k: "Highest hike", v: "3,143m" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="relative px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (01) - About
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] text-right leading-relaxed">
            Designed in Philippines,
            <br />
            Developed in New Zealand
          </span>
        </div>

        <div ref={ref} className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <TextReveal
              as="h2"
              splitBy="word"
              stagger={0.04}
              className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-balance"
              text="I design like an engineer and ship like a designer."
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-8 max-w-2xl text-pretty text-[var(--fg-muted)] leading-relaxed"
            >
              I care about clean typography, easing curves, and the quiet moments where a product earns a user&apos;s trust. My favourite work lives between product design and the code that ships it, paired with honest conversation that keeps a team moving in the same direction. Graduating end of 2026 and looking for a team where that overlap matters.
            </motion.p>

            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="border-t border-[var(--line)] pt-4"
                >
                  <div className="font-display text-3xl md:text-4xl">{s.v}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                    {s.k}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <motion.div
              style={{ y: photoY }}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-gradient-to-br from-[var(--accent)]/40 via-[var(--accent-soft)]/30 to-fuchsia-500/30"
            >
              <Image
                src="/images/portrait/sunset-portrait.png"
                alt="Carl Dela Pena, sunset portrait"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="relative flex h-full w-full items-end p-6">
                <div className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
                  <span>carl dela pena</span>
                  <span>Designed in Philippines</span>
                  <span className="text-white">Developed in New Zealand</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
