"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "motion/react";
import { useCursor } from "@/lib/cursor-provider";

export function Cursor() {
  const { variant, label } = useCursor();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let nextX = -100;
    let nextY = -100;
    const flush = () => {
      x.set(nextX);
      y.set(nextY);
      frame = 0;
    };
    const move = (e: PointerEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (!frame) frame = requestAnimationFrame(flush);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [x, y]);

  if (isTouch) return null;

  const sizeMap: Record<string, number> = {
    default: 12,
    hover: 36,
    text: 4,
    drag: 64,
    view: 80,
    send: 56,
  };

  const size = sizeMap[variant] ?? 12;
  const showLabel = (variant === "view" || variant === "send" || variant === "drag") && !!label;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ translateX: x, translateY: y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      >
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: "spring", damping: 26, stiffness: 380, mass: 0.4 }}
          className="rounded-full bg-white"
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ translateX: x, translateY: y }}
        className="pointer-events-none fixed left-0 top-0 z-[101]"
      >
        <AnimatePresence>
          {showLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-black font-medium"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
