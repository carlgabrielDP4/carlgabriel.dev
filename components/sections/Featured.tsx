"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/motion/TextReveal";
import { useCursor } from "@/lib/cursor-provider";

const POST_URN = "urn:li:ugcPost:7518676893051727873";
const EMBED_URL = `https://www.linkedin.com/embed/feed/update/${POST_URN}?collapsed=1`;
const POST_URL = `https://www.linkedin.com/feed/update/${POST_URN}/`;

const facts = [
  { k: "Selected", v: "1 of 64" },
  { k: "Route", v: "AKL → PDX" },
  { k: "Destination", v: "Nike WHQ" },
];

export function Featured() {
  const { setVariant, reset } = useCursor();

  return (
    <section id="featured" className="relative overflow-hidden px-6 py-16 md:px-10 md:py-40">
      {/* Soft accent wash behind the post so the section reads as a spotlight, not another timeline row. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[70vmax] w-[70vmax] -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-16 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (★) - Featured
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            As posted by Nike
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              International Nike Ambassador · June 2026
            </motion.div>

            <TextReveal
              as="h2"
              splitBy="word"
              stagger={0.05}
              className="font-display text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-balance"
              text="Picked by Nike. Posted by Nike."
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-[var(--fg-muted)] md:text-lg"
            >
              1 of 64 picked globally for an all-expenses trip from Auckland to Nike World Headquarters in
              Beaverton, Oregon. Selected for storytelling on camera rather than raw football skill.
              Football opened the door; communication closed it.
            </motion.p>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-[var(--line)] pt-8">
              {facts.map((f, i) => (
                <motion.div
                  key={f.k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-muted)]">
                    {f.k}
                  </div>
                  <div className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">
                    {f.v}
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href={POST_URL}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={() => setVariant("hover")}
              onPointerLeave={reset}
              className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)]"
            >
              View on LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 lg:col-span-5"
          >
            <div className="mx-auto w-full max-w-[536px] rounded-[28px] border border-[var(--line)] bg-[var(--bg-soft)] p-3 shadow-glow md:p-4">
              <div className="overflow-hidden rounded-[18px] bg-white">
                <iframe
                  src={EMBED_URL}
                  title="Nike's LinkedIn post featuring Carl Dela Pena"
                  loading="lazy"
                  allowFullScreen
                  className="block h-[589px] w-full border-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
