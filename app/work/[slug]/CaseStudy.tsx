"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight, ImagePlus } from "lucide-react";
import type { Project } from "@/content/projects";
import { TextReveal } from "@/components/motion/TextReveal";
import { useCursor } from "@/lib/cursor-provider";
import { Footer } from "@/components/sections/Footer";
import { cn } from "@/lib/cn";

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
            <div className={cn(project.heroImage && "grid items-end gap-8 md:grid-cols-12 md:gap-10")}>
              <div className={cn(project.heroImage && "md:col-span-7")}>
                <TextReveal
                  as="h1"
                  splitBy="char"
                  stagger={0.025}
                  className={cn(
                    "font-display text-[clamp(4rem,18vw,18rem)] font-medium leading-[0.85] tracking-tight text-white",
                    // Leading goes last: tailwind-merge drops an earlier leading-* when a text size follows it.
                    project.heroImage &&
                      "text-[clamp(3rem,13vw,18rem)] md:text-[clamp(4rem,10.5vw,11rem)] leading-[0.85]"
                  )}
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
              </div>

              {project.heroImage && <HeroShot {...project.heroImage} />}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-6 md:grid-cols-4"
            >
              <Meta k="Role" v={project.role} />
              <Meta k="Year" v={project.year} />
              <Meta k="Tags" v={project.tags.slice(0, 2).join(", ")} />
              <Meta k="Status" v={project.status} />
            </motion.div>

            {project.links && project.links.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerEnter={() => setVariant("hover")}
                    onPointerLeave={reset}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur transition-colors hover:border-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-[1100px]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            01 - Problem
          </span>
          <div className="mt-6 max-w-3xl space-y-5">
            {project.problem
              .split(/(?<=[.!?])\s+/)
              .filter(Boolean)
              .map((sentence, i) => (
                <TextReveal
                  key={i}
                  as="p"
                  stagger={0.02}
                  className="font-sans text-[clamp(1.15rem,2.2vw,1.6rem)] font-normal leading-[1.4] tracking-tight text-[var(--fg)]"
                  text={sentence}
                />
              ))}
          </div>
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
            {FIGURE_SLOTS.map((slot, i) => {
              const shot = project.gallery?.[i];
              return shot ? (
                <Figure key={slot.label} {...shot} sizes={slot.sizes} aspect={slot.aspect} className={slot.span} />
              ) : (
                <AssetPlaceholder key={slot.label} label={slot.label} className={cn(slot.aspect, slot.span)} />
              );
            })}
            {/* Anything past the three main slots flows on as 16:9 pairs. */}
            {project.gallery?.slice(FIGURE_SLOTS.length).map((shot) => (
              <Figure
                key={shot.src}
                {...shot}
                sizes="(min-width: 768px) 50vw, 100vw"
                aspect="aspect-[16/9]"
                className="md:col-span-6"
              />
            ))}
          </div>
        </div>
      </section>

      {project.poster && (
        <section className="relative px-6 pb-32 md:px-10 md:pb-48">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                Project poster
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                Click to open full size
              </span>
            </div>
            <motion.a
              href={project.poster.src}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={() => setVariant("view", "View")}
              onPointerLeave={reset}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 block overflow-hidden rounded-md border border-[var(--line)] bg-[var(--bg-soft)]"
            >
              <Image
                src={project.poster.src}
                alt={project.poster.alt}
                width={project.poster.width}
                height={project.poster.height}
                sizes="(min-width: 1480px) 1400px, 100vw"
                className="h-auto w-full"
              />
            </motion.a>
          </div>
        </section>
      )}

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

const FIGURE_SLOTS = [
  { label: "fig 01 — final UI", aspect: "aspect-[4/3]", span: "md:col-span-7", sizes: "(min-width: 768px) 58vw, 100vw" },
  { label: "fig 02 — wireframe set", aspect: "aspect-[4/3]", span: "md:col-span-5", sizes: "(min-width: 768px) 42vw, 100vw" },
  { label: "fig 03 — system overview", aspect: "aspect-[16/9]", span: "md:col-span-12", sizes: "100vw" },
];

function HeroShot({ src, alt, url }: { src: string; alt: string; url?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      // On phones the hero is a fixed 100svh, so only show the shot when there is room for it.
      className="hidden md:col-span-5 md:block [@media(min-height:830px)]:block"
    >
      <div className="overflow-hidden rounded-lg border border-white/20 bg-black/20 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-white/15 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/35" />
          <span className="h-2 w-2 rounded-full bg-white/35" />
          <span className="h-2 w-2 rounded-full bg-white/35" />
          {url && (
            <span className="ml-2 truncate font-mono text-[10px] tracking-[0.15em] text-white/70">{url}</span>
          )}
        </div>
        <div className="relative aspect-[16/9]">
          <Image src={src} alt={alt} fill preload sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
        </div>
      </div>
    </motion.div>
  );
}

function Figure({
  src,
  alt,
  caption,
  sizes,
  aspect,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  sizes: string;
  aspect: string;
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md border border-[var(--line)] bg-[var(--bg-soft)]",
          aspect
        )}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-left-top" />
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)]">{caption}</figcaption>
      )}
    </figure>
  );
}

function AssetPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-md border border-dashed border-[var(--line)] bg-[var(--bg-soft)] p-8 text-center",
        className
      )}
    >
      <ImagePlus className="h-5 w-5 text-[var(--fg-muted)]" strokeWidth={1.5} />
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">{label}</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]/60">
        Design asset coming soon
      </div>
    </div>
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
