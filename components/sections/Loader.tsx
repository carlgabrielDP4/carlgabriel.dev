"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Module state survives client-side navigation but resets on a full page load,
// so the countdown plays once per document load / refresh.
let introPlayed = false;

/** True when this mount came from in-app navigation rather than a fresh document load. */
function shouldSkipIntro(pathname: string) {
  if (introPlayed) return true;
  try {
    // The navigation entry is the URL the document was loaded with; client-side
    // route changes don't add new ones. Landing elsewhere (e.g. a case study)
    // and then navigating home should not replay the countdown.
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav && new URL(nav.name).pathname !== pathname) return true;
  } catch {}
  return false;
}

export function Loader({ onComplete }: { onComplete?: () => void }) {
  // window.location still holds the previous URL while a client navigation renders,
  // so compare against the route being rendered instead.
  const pathname = usePathname();
  // On hydration of a fresh load this is false on both server and client, so no mismatch.
  const [skip] = useState(() => typeof window !== "undefined" && shouldSkipIntro(pathname));
  const [count, setCount] = useState(skip ? 100 : 0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const complete = () => onComplete?.();

    // In-app return: no countdown, the overlay swipes up straight away
    // (after one painted frame so the swipe is visible).
    if (skip) {
      introPlayed = true;
      const raf = requestAnimationFrame(() => {
        setDone(true);
        complete();
      });
      return () => cancelAnimationFrame(raf);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      introPlayed = true;
      const raf = requestAnimationFrame(() => {
        setCount(100);
        setDone(true);
      });
      const t = setTimeout(complete, 200);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t);
      };
    }

    const start = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        introPlayed = true;
        timers.push(setTimeout(() => setDone(true), 120));
        timers.push(setTimeout(complete, 250));
      }
    };
    const timers: ReturnType<typeof setTimeout>[] = [];
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [skip, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col justify-between p-8 md:p-14"
          style={{ background: "var(--bg)" }}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="font-display text-[14vw] leading-[0.85] tracking-tighter text-[var(--fg)] select-none">
              <Digits value={count} />
            </div>
            <div className="hidden md:flex flex-col items-end gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              <span>Carl Dela Pena</span>
              <span>Portfolio v.01</span>
              <span className="text-[var(--accent)]">Loading {count}%</span>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,9vw,8.5rem)] leading-[0.95] tracking-tight text-[var(--fg)] max-w-[22ch]"
          >
            Greatness takes time,
            <span className="block italic text-[var(--accent)]">please wait</span>
          </motion.h2>
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
