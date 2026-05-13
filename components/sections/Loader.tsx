"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(100);
      setDone(true);
      const t = setTimeout(() => onComplete?.(), 200);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    const duration = 500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 120);
        setTimeout(() => onComplete?.(), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex items-end justify-between p-8 md:p-14"
          style={{ background: "var(--bg)" }}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="font-display text-[24vw] leading-[0.85] tracking-tighter text-[var(--fg)] select-none">
            <Digits value={count} />
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]">
            <span>Carl Dela Pena</span>
            <span>Portfolio v.01</span>
            <span className="text-[var(--accent)]">Loading {count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Digits({ value }: { value: number }) {
  const str = String(value).padStart(3, "0");
  return (
    <span className="inline-flex tabular-nums">
      {str.split("").map((d, i) => (
        <span key={i} className="inline-block w-[0.55em] text-center">
          {d}
        </span>
      ))}
    </span>
  );
}
