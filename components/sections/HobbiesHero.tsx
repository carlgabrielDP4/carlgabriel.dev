"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

type Beat = {
  src: string;
  alt: string;
  caption: string;
  sub: string;
  focus?: { scale?: number; origin?: string };
};

const BEATS: Beat[] = [
  {
    src: "/images/travel/tokyo-pose-lookaway.png",
    alt: "Carl in Tokyo",
    caption: "Carl, somewhere far.",
    sub: "tokyo, 2024",
  },
  {
    src: "/images/travel/fansipan-summit.png",
    alt: "Carl at Fansipan summit",
    caption: "Carl, above the clouds.",
    sub: "fansipan summit · 3,143m",
    focus: { scale: 1.05, origin: "50% 40%" },
  },
];

export function HobbiesHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, BEATS.length - 1]);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${BEATS.length * 110}vh` }}
      aria-label="Carl, in two frames"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <div className="relative h-full w-full">
          {BEATS.map((beat, i) => (
            <BeatLayer key={beat.src} beat={beat} index={i} progress={progress} />
          ))}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--bg)]/30 via-transparent to-[var(--bg)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--bg)]/55 via-transparent to-transparent md:from-[var(--bg)]/40" />

          <div className="absolute inset-0 mx-auto flex max-w-[1400px] flex-col justify-between px-6 pb-12 pt-28 md:px-10 md:pb-20 md:pt-32">
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                (00) · More
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                two frames of one guy
              </span>
            </div>

            <div className="flex flex-col gap-6 md:max-w-[60%]">
              <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.02em]">
                Off the clock,
                <br />
                <span className="italic text-[var(--fg-muted)]">on the record.</span>
              </h1>

              <CaptionStack progress={progress} />

              <div className="mt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                <BeatDots progress={progress} />
                <span>scroll to flip</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeatLayer({
  beat,
  index,
  progress,
}: {
  beat: Beat;
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [index - 0.55, index, index + 0.55], [0, 1, 0]);
  const scale = useTransform(progress, [index - 1, index, index + 1], [1.08, 1, 1.06]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="relative h-full w-full">
        <Image
          src={beat.src}
          alt={beat.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
          style={
            beat.focus
              ? {
                  transform: `scale(${beat.focus.scale ?? 1})`,
                  transformOrigin: beat.focus.origin ?? "center",
                }
              : undefined
          }
        />
      </motion.div>
    </motion.div>
  );
}

function CaptionStack({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative h-[5.5rem] md:h-[6.5rem]">
      {BEATS.map((beat, i) => {
        return <CaptionLine key={beat.caption} beat={beat} index={i} progress={progress} />;
      })}
    </div>
  );
}

function CaptionLine({
  beat,
  index,
  progress,
}: {
  beat: Beat;
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [index - 0.55, index, index + 0.55], [0, 1, 0]);
  const y = useTransform(progress, [index - 0.7, index, index + 0.7], [16, 0, -16]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col gap-2">
      <p className="font-display text-2xl font-medium md:text-4xl">{beat.caption}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
        {beat.sub}
      </p>
    </motion.div>
  );
}

function BeatDots({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="flex items-center gap-1.5">
      {BEATS.map((_, i) => (
        <Dot key={i} index={i} progress={progress} />
      ))}
    </div>
  );
}

function Dot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index - 0.5, index, index + 0.5], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [index - 0.5, index, index + 0.5], [0.75, 1.1, 0.75]);
  return (
    <motion.span
      style={{ opacity, scale }}
      className="block h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
    />
  );
}
