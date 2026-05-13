"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const experience = [
  {
    year: "2026 - Now",
    role: "Lead product UI",
    org: "WDCC · Linux User Group app",
    note: "Best work right now: still shipping. Lead product UI across ~10 cross-functional people: I set visual direction in Figma, stay in constant sync with our clients (committee + members), and keep screens honest to what we mean to ship.",
  },
  {
    year: "2024 - Now",
    role: "Retail Associate · Nike WHQ alum",
    org: "Nike · Auckland, NZ → Beaverton, OR",
    note: "Running Certified in Auckland, turning shoe tech into language people actually hear. Nike also flew me NZ → WHQ in Beaverton, Oregon (Portland metro) as one of seven worldwide. They weren't buying highlight-reel goals; they bought how I tell a story on camera and how five countries in three months shows up in an edit. Football got me in the room, communication closed it.",
  },
  {
    year: "2025",
    role: "Frontend Developer",
    org: "WDCC · Formula SAE47",
    note: "Public site for a 10k+ follower club with a layout refresh, MFA clarity, and an RBAC bug fix so the right people see the right screens.",
  },
  {
    year: "2025",
    role: "Full-Stack Developer",
    org: "PodBay · UoA",
    note: "Flask + SQLAlchemy podcast library, team of three, design, frontend, and PyTest where it mattered.",
  },
  {
    year: "2024",
    role: "UI/UX Designer",
    org: "SAP × PwC selection event",
    note: "1 of 30 for a public transport concept on SAP Fiori, presented to directors. Fast critique, faster iteration.",
  },
  {
    year: "2023",
    role: "Design clicked",
    org: "University of Auckland",
    note: "Supposed to be Java. Was sketching Auckland Transport instead. Tech is the tool; humans are the focus.",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 40%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (02) - Experience
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            highlights first
          </span>
        </div>

        <div ref={ref} className="relative grid grid-cols-12 gap-4">
          <div className="col-span-1 relative">
            <div className="sticky top-0 h-screen">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--line)]" />
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] to-transparent"
              />
            </div>
          </div>

          <div className="col-span-11 flex flex-col gap-24 md:gap-32">
            {experience.map((e, i) => (
              <motion.div
                key={`${e.year}-${e.role}-${i}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                  {e.year}
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
                    {e.role}
                  </h3>
                  <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                    {e.org}
                  </div>
                  <p className="mt-4 max-w-lg text-[var(--fg-muted)]">{e.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
