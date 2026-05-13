"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";
import { useCursor } from "@/lib/cursor-provider";

const cards = [
  { label: "spec sheet", body: "Easing curves I keep stealing from Apple HIG.", hue: "from-violet-500 to-fuchsia-500", x: -260, y: -90, r: -8 },
  { label: "ticket #042", body: "Make the marquee feel inevitable, not annoying.", hue: "from-amber-400 to-rose-500", x: 0, y: -150, r: 4 },
  { label: "moodboard", body: "JDM dashboards. Mid-2000s typography. Trust me.", hue: "from-cyan-400 to-blue-600", x: 240, y: -80, r: 10 },
  { label: "voice memo", body: "0:38: 'what if scroll WAS the page transition?'", hue: "from-lime-300 to-emerald-600", x: -180, y: 100, r: 6 },
  { label: "polaroid", body: "Tongariro Crossing, 6:14am, sky still doing maths.", hue: "from-orange-400 to-pink-500", x: 80, y: 110, r: -6 },
  { label: "footnote", body: "drag me. throw me. I respect that.", hue: "from-pink-500 to-violet-700", x: 280, y: 30, r: -14 },
];

export function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="playground" className="relative overflow-hidden border-y border-[var(--line)] py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (03) - Playground
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            things on my desk
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Drag the desk around.
            </h2>
            <p className="mt-4 max-w-sm text-[var(--fg-muted)]">
              No buttons. No instructions. Pick up a card, throw it across the screen, hold it down. Designed interactions should feel as honest as a real object.
            </p>
            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              ☞ click and drag anywhere below
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative h-[480px] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-soft)]/50 md:col-span-8 md:h-[520px]"
            style={{ touchAction: "none" }}
          >
            {cards.map((c, i) => (
              <DraggableCard key={i} {...c} containerRef={containerRef} />
            ))}
            <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              physics: spring(stiff)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DraggableCard({
  label,
  body,
  hue,
  x,
  y,
  r,
  containerRef,
}: {
  label: string;
  body: string;
  hue: string;
  x: number;
  y: number;
  r: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { setVariant, reset } = useCursor();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateBase = useTransform(mx, [-200, 200], [-12, 12]);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.18}
      dragTransition={{ bounceStiffness: 220, bounceDamping: 14, power: 0.45 }}
      onPointerEnter={() => setVariant("drag", "Drag")}
      onPointerLeave={reset}
      whileTap={{ scale: 1.06, zIndex: 50, cursor: "grabbing" }}
      whileHover={{ scale: 1.04, zIndex: 40 }}
      style={{
        x: mx,
        y: my,
        rotate: rotateBase,
      }}
      initial={{ x, y, rotate: r, opacity: 0 }}
      animate={{ x, y, rotate: r, opacity: 1 }}
      transition={{ type: "spring", damping: 16, stiffness: 140, delay: 0.05 }}
      className={`absolute left-1/2 top-1/2 -ml-[120px] -mt-[80px] flex h-[160px] w-[240px] cursor-grab flex-col justify-between rounded-md bg-gradient-to-br ${hue} p-4 text-white shadow-2xl will-change-transform`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-90">
        {label}
      </span>
      <p className="text-sm leading-snug">{body}</p>
    </motion.div>
  );
}
