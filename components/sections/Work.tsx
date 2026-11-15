"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { useCursor } from "@/lib/cursor-provider";

export function Work() {
  return (
    <section id="work" className="relative px-6 py-16 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-6 md:mb-20 md:gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)] md:text-xs md:tracking-[0.25em]">
            (04) - Projects
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)] md:text-xs md:tracking-[0.25em]">
            {projects.length} projects · 2024 → 2026
          </span>
        </div>

        <div className="flex flex-col">
          {featured.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-20 md:mt-32">
            <div className="mb-4 flex items-baseline justify-between gap-4 md:mb-6">
              <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">Other projects</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)] md:text-xs md:tracking-[0.25em]">
                {others.length} more
              </span>
            </div>
            <div className="flex flex-col">
              {others.map((p, i) => (
                <OtherProjectRow key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

function OtherProjectRow({ project, index }: { project: Project; index: number }) {
  const { setVariant, reset } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        onPointerEnter={() => setVariant("view", "View")}
        onPointerLeave={reset}
        className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-t border-[var(--line)] py-5 transition-colors hover:border-[var(--accent)] md:py-6"
      >
        <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)] md:col-span-1 md:text-xs">
          {project.index}
        </span>
        <div className="col-span-8 md:col-span-4">
          <h4 className="font-display text-xl font-medium leading-tight tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-2xl">
            {project.title}
          </h4>
        </div>
        <p className="col-span-12 col-start-3 text-sm text-[var(--fg-muted)] md:col-span-5 md:col-start-auto">
          {project.tagline}
        </p>
        <div className="col-span-2 col-start-11 row-start-1 flex items-center justify-end gap-3 md:col-span-2 md:col-start-auto md:row-start-auto">
          <span className="hidden whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)] md:inline">
            {project.year}
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45 group-hover:text-[var(--accent)]" />
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { setVariant, reset } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        onPointerEnter={() => setVariant("view", "View")}
        onPointerLeave={reset}
        className="group relative grid grid-cols-12 items-center gap-x-4 gap-y-3 border-t border-[var(--line)] py-8 transition-colors hover:border-[var(--accent)] md:gap-4 md:py-12"
      >
        {/* Mobile: three rows (index, title, tags) instead of 12-column grid. */}
        <span className="col-span-6 row-start-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)] md:col-span-1">
          {project.index}
        </span>

        <div className="col-span-12 row-start-2 md:col-span-6 md:row-start-1">
          <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1] tracking-tight transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-sm text-[var(--fg-muted)] md:text-base">
            {project.tagline}
          </p>
        </div>

        <div className="col-span-12 row-start-3 md:col-span-3 md:row-start-1 md:text-right">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-6 row-start-1 flex items-center justify-end md:col-span-2 md:row-start-1">
          <span className="mr-3 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)] md:mr-4">
            {project.year}
          </span>
          <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45 group-hover:text-[var(--accent)]" />
        </div>

      </Link>
    </motion.div>
  );
}
