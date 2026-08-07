"use client";

import { motion } from "motion/react";

const TOKENS = [
  "21",
  "Manila → Auckland",
  "INFP",
  "CS + ITM '26",
  "sub-20 5K",
  "left wing",
  "royal blue",
  "INTJ-coded · INFP-confirmed",
  "coffee: black, two sugars",
];

const REPEATS = 3;

export function IdentityCard() {
  return (
    <section
      id="identity"
      className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--bg-soft)]/40"
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-6 md:px-10 md:py-7">
        <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] md:inline">
          (01) · Identity
        </span>
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex w-max items-center gap-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--fg-muted)]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: REPEATS }, (_, r) =>
              TOKENS.map((t, i) => (
                <span key={`${r}-${i}`} className="flex items-center gap-6 whitespace-nowrap">
                  <span
                    className={
                      t.includes("royal blue") || t.includes("INFP-confirmed")
                        ? "text-[var(--accent)]"
                        : "text-[var(--fg)]"
                    }
                  >
                    {t}
                  </span>
                  <span className="text-[var(--line)]">·</span>
                </span>
              )),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
