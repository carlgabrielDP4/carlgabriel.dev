"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
        <RouteCurtain key={`curtain-${pathname}`} />
      </motion.div>
    </AnimatePresence>
  );
}

function RouteCurtain() {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
      style={{ transformOrigin: "top" }}
      className="pointer-events-none fixed inset-0 z-[150] bg-[var(--accent)]"
    />
  );
}
