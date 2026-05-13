"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { TextReveal } from "@/components/motion/TextReveal";

type TravelClip = {
  place: string;
  caption: string;
  hue: string;
  image?: string;
};

const travelClips: TravelClip[] = [
  { place: "Singapore, SG", caption: "Hawker run", hue: "#84cc16", image: "/images/travel/singapore-pose.png" },
  { place: "Tokyo, JP", caption: "Shibuya rain", hue: "#a855f7", image: "/images/travel/tokyo-umbrella-pose.png" },
  { place: "Tokyo, JP", caption: "Vending lane", hue: "#6366f1", image: "/images/travel/vending-machine.png" },
  { place: "Osaka, JP", caption: "Glico man", hue: "#ec4899", image: "/images/travel/me-and-glicoman.png" },
  { place: "Osaka, JP", caption: "Sunset wander", hue: "#f97316", image: "/images/travel/osaka-aurafarm.png" },
  { place: "Sa Pa, VN", caption: "Top of Indochina · 3,143m", hue: "#22d3ee", image: "/images/travel/fansipan-summit.png" },
  { place: "Vietnam", caption: "Trail stop", hue: "#0ea5e9", image: "/images/travel/waterfall-picture.png" },
  { place: "Auckland, NZ", caption: "Home base", hue: "#a855f7" },
];

type FactTile = {
  k: string;
  v: string;
  image?: string;
};

const factTiles: FactTile[] = [
  { k: "Countries", v: "09 visited" },
  { k: "5K pace", v: "4:12/km" },
  { k: "Football", v: "Left wing", image: "/images/football/football-field-action-shot.jpeg" },
  { k: "Highest hike", v: "Fansipan · 3,143m" },
];

export function Interests() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const carouselX = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]);

  return (
    <section id="interests" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (05) - Off the clock
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            travel &amp; cuts
          </span>
        </div>

        <TextReveal
          as="h2"
          stagger={0.05}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-tight text-balance"
          text="Stuff that stops me from going insane."
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-xl text-[var(--fg-muted)] text-pretty"
        >
          A list of things I&apos;m unreasonably into. Half inform my design taste, the other half just make life better.
        </motion.p>

        <div ref={ref} className="mt-16">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                  Travel cuts
                </span>
                <span className="text-xs text-[var(--fg-muted)]">
                  Scroll-driven carousel · full map lives in Hobbies
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
                ● live
              </span>
            </div>

            <div className="relative overflow-hidden">
              <motion.div style={{ x: carouselX }} className="flex gap-4 will-change-transform">
                {[...travelClips, ...travelClips].map((c, i) => (
                  <TravelCard key={i} {...c} />
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
              {factTiles.map((b) => (
                <motion.div
                  key={b.k}
                  whileHover={{ y: -4, borderColor: "var(--accent)" }}
                  className="relative overflow-hidden rounded-md border border-[var(--line)] p-4 transition-colors"
                >
                  {b.image ? (
                    <>
                      <Image
                        src={b.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover opacity-20"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--bg)]/85 via-[var(--bg)]/60 to-transparent" />
                    </>
                  ) : null}
                  <div className="relative">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                      {b.k}
                    </div>
                    <div className="mt-1 text-sm">{b.v}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TravelCard({ place, caption, hue, image }: TravelClip) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      className="relative aspect-[9/16] w-[180px] shrink-0 overflow-hidden rounded-md md:w-[220px]"
      style={{ background: `linear-gradient(160deg, ${hue}, #000)` }}
    >
      {image ? (
        <Image
          src={image}
          alt={`${place} - ${caption}`}
          fill
          sizes="(min-width: 768px) 220px, 180px"
          className="object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/15" />
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] opacity-90">
          <span>▶ play</span>
          <span>0:42</span>
        </div>
        <div>
          <div className="text-base font-medium drop-shadow">{place}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] opacity-85">
            {caption}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
