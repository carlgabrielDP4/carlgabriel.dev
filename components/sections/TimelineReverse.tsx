"use client";

import { motion } from "motion/react";

type Entry = {
  year: string;
  title: string;
  body: string;
  tags: string[];
};

const TIMELINE: Entry[] = [
  {
    year: "2026",
    title: "Last year. The pressure year.",
    body:
      "Honestly feeling behind in a final year that won't slow down. The 1-of-7 Nike Oregon sponsorship was the moment I realised value can find you somewhere else (different country, different field), and I started leaning all the way into UI/UX product design, where the technical and the human meet. 6 countries already this year, and the year isn't even over.",
    tags: ["Nike Oregon · 1 of 7", "UI/UX direction", "6 countries this year"],
  },
  {
    year: "2025",
    title: "The hands you shake.",
    body:
      "First real taste of cross-functional Agile: designers, devs, PMs in the same room. Hardest year so far, and the one that flipped a switch: working with other people beats coding everything alone. \"The hands you shake are more important than the grades you make.\"",
    tags: ["Agile", "cross-functional", "FSAE47", "PodBay"],
  },
  {
    year: "2024",
    title: "Year of rooms I didn't expect to be in.",
    body:
      "1-of-30 invitee at the SAP × PwC event. Hackathon on React + WebRTC. Crypto Tableau dashboards. Nike Retail begins · Running Certified. Tafoya door-to-door, sales as a UX classroom in disguise.",
    tags: ["SAP × PwC", "Hackathon", "Nike", "Tafoya"],
  },
  {
    year: "2023",
    title: "First semester, first client.",
    body:
      "Started BSc at UoA. Shipped a Wix portfolio for EdP Consulting that drove +50 LinkedIn business profile clicks, translating engineering credibility for non-technical readers.",
    tags: ["UoA day one", "EdP Consulting"],
  },
  {
    year: "2022",
    title: "Out of grammar with excellence.",
    body:
      "Graduated Auckland Grammar with NCEA Level 3 Excellence Endorsement.",
    tags: ["AGS", "NCEA Excellence"],
  },
  {
    year: "2019",
    title: "Built a PC. Found the path.",
    body:
      "High school, bored, decided to build and assemble a computer from scratch, taught myself on the way. That was the moment I knew computer science was the move at uni.",
    tags: ["PC build", "self-taught", "CS-curious"],
  },
  {
    year: "2012",
    title: "Manila to Auckland.",
    body:
      "Moved from Manila to Auckland, New Zealand. The accent and the wardrobe slowly migrated south.",
    tags: ["Manila → Auckland"],
  },
  {
    year: "2004",
    title: "Designed in the Philippines.",
    body:
      "Born October 6, Manila. Chapter one, and the part of the timeline I never want to design out of the brand.",
    tags: ["Manila, PH", "Oct 6"],
  },
];

export function TimelineReverse() {
  return (
    <section
      id="timeline"
      className="relative border-t border-[var(--line)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-baseline md:justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (02) · Timeline
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            scrolls backwards · starts at now
          </span>
        </div>

        <p className="max-w-xl text-pretty text-[var(--fg-muted)]">
          The timeline runs backwards. Scroll down to walk it from now to Manila, 2005.
        </p>

        <div className="relative mt-16 grid grid-cols-[auto_1fr] gap-8 md:grid-cols-[10rem_1fr] md:gap-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[3.25rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--accent)]/60 via-[var(--line)] to-transparent md:block"
          />

          {TIMELINE.map((entry, i) => (
            <TimelineRow key={entry.year} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ entry, index }: { entry: Entry; index: number }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: index * 0.03 }}
        className="relative flex items-start gap-3 self-start pt-1 md:gap-4"
      >
        <span className="relative mt-2 block h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
        <span className="font-display text-3xl font-medium leading-none md:text-5xl">
          {entry.year}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.04 }}
        className="border-l border-[var(--line)] pb-16 pl-6 md:pb-20 md:pl-10"
      >
        <h3 className="font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
          {entry.title}
        </h3>
        <p className="mt-3 max-w-2xl text-pretty text-[var(--fg-muted)]">{entry.body}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {entry.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)]/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );
}
