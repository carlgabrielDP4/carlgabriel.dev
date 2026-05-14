"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { Magnetic } from "@/components/motion/Magnetic";
import { useCursor } from "@/lib/cursor-provider";
import { TextReveal } from "@/components/motion/TextReveal";

const EMAIL = "carldelapena2004@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/carl-dela-pena-92ab6a294";

const socials = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
  { label: "LinkedIn", value: "/in/carl-dela-pena", href: LINKEDIN_URL, Icon: LinkedinIcon },
];

export function Contact() {
  const { setVariant, reset } = useCursor();

  return (
    <section id="contact" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (06) - Get in touch
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
            currently: available
          </span>
        </div>

        <TextReveal
          as="h2"
          stagger={0.06}
          className="font-display text-[clamp(2.5rem,10vw,10rem)] font-medium leading-[0.9] tracking-tight"
          text="Let me make you"
        />
        <TextReveal
          as="h2"
          delay={0.2}
          stagger={0.06}
          className="font-display italic text-[clamp(2.5rem,10vw,10rem)] font-medium leading-[0.9] tracking-tight text-[var(--accent)]"
          text="something cool!"
        />

        <div className="mt-16 flex flex-col items-start gap-12 md:flex-row md:items-end md:justify-between">
          <Magnetic
            as="a"
            href={`mailto:${EMAIL}`}
            strength={0.5}
            onPointerEnter={() => setVariant("send", "Send")}
            onPointerLeave={reset}
            className="group relative inline-flex items-center gap-4 rounded-full border border-[var(--line)] bg-[var(--bg-soft)]/60 px-8 py-6 text-base font-medium backdrop-blur transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black md:text-lg"
          >
            <Mail className="h-5 w-5 transition-transform group-hover:-rotate-12" />
            {EMAIL}
          </Magnetic>

          <div className="grid grid-cols-2 gap-4 md:flex md:gap-6">
            {socials.slice(1).map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={() => setVariant("hover")}
                onPointerLeave={reset}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-3 border-t border-[var(--line)] pt-3 transition-colors hover:border-[var(--accent)]"
              >
                <s.Icon className="h-4 w-4 text-[var(--fg-muted)] group-hover:text-[var(--accent)]" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                    {s.label}
                  </div>
                  <div className="text-sm">{s.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
