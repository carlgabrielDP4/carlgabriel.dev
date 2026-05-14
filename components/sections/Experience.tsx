"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type SubRole = {
  label: string;
  date?: string;
  note: string;
};

type ExperienceItem = {
  year: string;
  role: string;
  org: string;
  note: string;
  subRoles?: SubRole[];
};

const experience: ExperienceItem[] = [
  {
    year: "2026 - Now",
    role: "Lead UI/UX Designer",
    org: "WDCC · Linux User Group app",
    note: "Direct UI/UX across a ~10-person cross-functional team, translating technical constraints from engineers into language designers, stakeholders, and clients all read the same way. Open to constructive feedback every review; the design gets sharper that way. Project still in progress.",
  },
  {
    year: "2024 - Now",
    role: "Retail Associate",
    org: "Nike · Auckland, NZ → Oregon, USA",
    note: "Shop-floor work that doubles as stakeholder-empathy training, turning shoe tech into language a first-time runner actually hears, then doing it again at speed for the next customer.",
    subRoles: [
      {
        label: "International Nike Ambassador",
        date: "June 2026",
        note: "1 of 7 picked globally for an all-expenses Nike trip from Auckland, NZ to Oregon, USA (Nike World Headquarters in Beaverton). Selected for storytelling on camera and travel content rather than raw football skill. Football opened the door; communication closed it.",
      },
      {
        label: "Nike Running Certified Athlete",
        date: "March 2026",
        note: "Delivered in-store presentations on technical product lines and trained teammates on Nike running tech so the floor speaks the same language to every customer.",
      },
    ],
  },
  {
    year: "2025",
    role: "Frontend Developer",
    org: "WDCC · Formula SAE47",
    note: "Built and maintained an internal jobs board for a 10k+ follower motorsport club, connecting current students with alumni and university sponsors for networking and recruitment. Shipped the React frontend and an MFA flow that read clearly for students juggling multiple logins; tightened UI specs (states, variants, labels) so peer review stopped looping on clarification.",
  },
  {
    year: "2024",
    role: "UI/UX Designer",
    org: "SAP × PwC selection event",
    note: "Week-long case competition organised and mentored by PwC and SAP directors and associates. 1 of 30 candidates selected to lead UX on a public transport concept built in SAP Fiori, then presented and pitched the final product directly to PwC directors. Fast critique, faster iteration.",
  },
  {
    year: "2023",
    role: "Sales Consultant",
    org: "Tafoya & Associates · Direct marketing",
    note: "Door-to-door direct sales for a marketing firm. Sharpened adaptability across radically different customer types in minutes-long conversations, built objection-handling chops, and pulled live sales data into the next pitch. Measurable lift on the close rate when the deck adapted to who actually answered the door.",
  },
  {
    year: "2020 - 2022",
    role: "Retail Assistant",
    org: "Circle K · Auckland, NZ",
    note: "Worked the floor through high school and the COVID lockdowns, balancing NCEA study with keeping a retail store running under the kind of operational uncertainty no rulebook covered. First job that taught me customer service is mostly listening, even when nobody else is.",
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
          <span className="font-mono text-sm uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (02) - Experience
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.25em] text-[var(--fg-muted)]">
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
                <div className="font-mono text-sm uppercase tracking-[0.25em] text-[var(--accent)] md:text-base">
                  {e.year}
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
                    {e.role}
                  </h3>
                  <div className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                    {e.org}
                  </div>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg-muted)] md:text-lg">
                    {e.note}
                  </p>

                  {e.subRoles && e.subRoles.length > 0 ? (
                    <ul className="mt-7 flex max-w-xl flex-col gap-5 border-l border-[var(--line)] pl-5">
                      {e.subRoles.map((sr, si) => (
                        <li key={si}>
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                              {sr.label}
                            </span>
                            {sr.date ? (
                              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
                                · {sr.date}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-2 text-base leading-relaxed text-[var(--fg-muted)]">
                            {sr.note}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
