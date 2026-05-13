"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { useCursor } from "@/lib/cursor-provider";

const ShaderGradient = dynamic(
  () => import("@/components/three/ShaderGradient").then((m) => m.ShaderGradient),
  { ssr: false }
);

export function Hero() {
  const { setVariant, reset } = useCursor();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <ShaderGradient className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y, opacity }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute right-[2vw] top-1/2 z-[1] hidden h-[clamp(360px,40vw,560px)] w-[clamp(360px,40vw,560px)] -translate-y-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          <div
            className="absolute inset-[-6%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.45) 0%, rgba(124,58,237,0.25) 35%, rgba(236,72,153,0.15) 60%, transparent 78%)",
              opacity: 0.9,
            }}
          />

          <motion.div
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.025, 1] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[14%] rounded-full"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(168,85,247,0.55), 0 0 70px rgba(168,85,247,0.28)",
            }}
          />

          <motion.svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
          >
            <defs>
              <path
                id="hero-portrait-arc"
                d="M 100,100 m -94,0 a 94,94 0 1,1 188,0 a 94,94 0 1,1 -188,0"
                fill="none"
              />
            </defs>
            <text
              style={{
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: "5.2px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                fill: "var(--fg-muted)",
              }}
            >
              <textPath href="#hero-portrait-arc" startOffset="0%">
                Graduate · Computer Science + Information Technology Management · University of Auckland · Aspiring Technical Design Engineer · Product Designer · 
              </textPath>
            </text>
          </motion.svg>

          <motion.div
            animate={{ scale: [1, 1.035, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[15%] overflow-hidden rounded-full"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at center, #000 58%, rgba(0,0,0,0.85) 74%, rgba(0,0,0,0.35) 90%, transparent 100%)",
              maskImage:
                "radial-gradient(circle at center, #000 58%, rgba(0,0,0,0.85) 74%, rgba(0,0,0,0.35) 90%, transparent 100%)",
            }}
          >
            <Image
              src="/images/portrait/carl-suited-up.png"
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 40vw, 0vw"
              className="object-cover object-[center_22%] opacity-90"
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.28), transparent 45%, rgba(236,72,153,0.22))",
              }}
            />
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[6%]"
          >
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_22px_var(--accent)]" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[10%]"
          >
            <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/85 shadow-[0_0_14px_rgba(255,255,255,0.6)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-[clamp(4.5rem,15vw,15rem)] font-medium leading-[0.85] tracking-[-0.03em] md:max-w-[68%] lg:max-w-[64%]">
            <SplitLine delay={0.1}>Carl</SplitLine>
            <SplitLine delay={0.2} className="italic text-[var(--fg-muted)]">
              Dela <span className="text-[var(--accent)] not-italic">Pena</span>
            </SplitLine>
          </h1>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md text-balance text-base text-[var(--fg-muted)] md:text-lg"
          >
            Studying Computer Science and Information Technology Management at the University of Auckland. I build interfaces that read clearly, move with intent, and translate well to every teammate I ship them with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <Magnetic
              as="a"
              href="#work"
              strength={0.4}
              onPointerEnter={() => setVariant("hover")}
              onPointerLeave={reset}
              className="group relative inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--bg-soft)]/60 px-7 py-4 text-sm font-medium backdrop-blur transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
            >
              See the work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Magnetic>

            <Magnetic
              as="a"
              href="#contact"
              strength={0.4}
              onPointerEnter={() => setVariant("hover")}
              onPointerLeave={reset}
              className="inline-flex items-center gap-3 rounded-full px-5 py-4 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
            >
              Get in touch
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)]"
        >
          <span>scroll</span>
          <ArrowDown className="h-3 w-3" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SplitLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
