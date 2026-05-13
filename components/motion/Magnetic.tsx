"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: "div" | "button" | "a";
  href?: string;
  onClick?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
};

export function Magnetic({
  children,
  strength = 0.35,
  className,
  as = "div",
  href,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 200, mass: 0.4 });
  const sy = useSpring(y, { damping: 18, stiffness: 200, mass: 0.4 });

  const handleMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    onPointerLeave?.();
  };

  const commonProps = {
    ref: ref as never,
    onPointerMove: handleMove,
    onPointerEnter,
    onPointerLeave: handleLeave,
    onClick,
    className,
    style: { x: sx, y: sy },
  };

  if (as === "a" && href) {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    );
  }
  if (as === "button") {
    return <motion.button {...commonProps}>{children}</motion.button>;
  }
  return <motion.div {...commonProps}>{children}</motion.div>;
}
