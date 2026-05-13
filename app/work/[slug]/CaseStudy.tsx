"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { TextReveal } from "@/components/motion/TextReveal";
import { useCursor } from "@/lib/cursor-provider";
import { Footer } from "@/components/sections/Footer";

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const { setVariant, reset } = useCursor();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative">
      <Link
        href="/#work"
        onPointerEnter={() => setVariant("hover")}
        onPointerLeave={reset}
        className="fixed left-6 top-24 z-30 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg)]/70 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur transition-colors hover:border-[var(--accent)] md:left-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </Link>

      <section ref={heroRef} className="relative h-[100svh] w-full overflow-hidden">
        <motion.div
          aria-hidden
          style={{
            y: heroY,
            scale: heroScale,
            opacity: heroOpacity,
            background: `linear-gradient(135deg, ${project.cover.from}, ${project.cover.to})`,
          }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pb-12 pt-32 md:px-10 md:pb-16">
          <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.25em] text-white/80">
            <span>{project.index}</span>
            <span>{project.year}</span>
          </div>

          <div>
            <TextReveal
              as="h1"
              splitBy="char"
              stagger={0.025}
              className="font-display text-[clamp(4rem,18vw,18rem)] font-medium leading-[0.85] tracking-tight text-white"
              text={project.title}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 max-w-xl text-balance text-lg text-white/85 md:text-xl"
            >
              {project.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-6 md:grid-cols-4"
            >
              <Meta k="Role" v={project.role} />
              <Meta k="Year" v={project.year} />
              <Meta k="Tags" v={project.tags.slice(0, 2).join(", ")} />
              <Meta k="Status" v="Shipped" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-[1100px]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            01 - Problem
          </span>
          <TextReveal
            as="h2"
            stagger={0.04}
            className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-balance"
            text={project.problem}
          />
        </div>
      </section>

      <section className="relative px-6 pb-32 md:px-10 md:pb-48">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="sticky top-32">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                02 - Process
              </span>
              <h3 className="mt-3 font-display text-3xl font-medium leading-[1] tracking-tight">
                How it
                <br />
                <span className="italic text-[var(--accent)]">came together</span>
              </h3>
            </div>
          </div>
          <div className="md:col-span-9">
            <ol className="flex flex-col">
              {project.process.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-12 gap-4 border-t border-[var(--line)] py-8"
                >
                  <span className="col-span-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    0{i + 1}
                  </span>
                  <p className="col-span-10 text-base text-[var(--fg)] md:text-lg">{step}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-32 md:px-10 md:pb-48">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
            <div
              className="aspect-[4/3] w-full overflow-hidden rounded-md md:col-span-7"
              style={{ background: `linear-gradient(140deg, ${project.cover.from}, ${project.cover.to})` }}
            >
              <div className="flex h-full w-full items-end p-8 text-white">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-90">
                    fig 01 - final UI
                  </div>
                  <div className="mt-2 font-display text-2xl tracking-tight">{project.title}</div>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-[var(--bg-soft)] md:col-span-5">
              <div className="flex h-full w-full flex-col justify-between p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                  fig 02 - wireframe set
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-[3/5] rounded-sm border border-[var(--line)] bg-[var(--bg)]" />
                  ))}
                </div>
              </div>
            </div>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-[var(--bg-soft)] md:col-span-12">
              <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                fig 03 - system overview · replace with real screenshot
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-[var(--line)] px-6 py-32 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            03 - Outcome
          </span>
          <h3 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight">
            What it shipped.
          </h3>

          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {project.outcome.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="border-t border-[var(--line)] pt-4"
              >
                <div className="font-display text-4xl md:text-6xl">{o.value}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                  {o.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-[1400px]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            Next case study
          </span>
          <Link
            href={`/work/${next.slug}`}
            onPointerEnter={() => setVariant("view", "View")}
            onPointerLeave={reset}
            className="group mt-4 block"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(3rem,12vw,12rem)] font-medium leading-[0.88] tracking-tight transition-colors group-hover:text-[var(--accent)]">
                {next.title}
              </h2>
              <ArrowUpRight className="h-12 w-12 shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-[var(--accent)] md:h-20 md:w-20" />
            </div>
            <p className="mt-3 max-w-md text-[var(--fg-muted)]">{next.tagline}</p>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="text-white/90">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{k}</div>
      <div className="mt-1 text-sm">{v}</div>
    </div>
  );
}
