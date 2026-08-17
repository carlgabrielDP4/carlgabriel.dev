"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TextReveal } from "@/components/motion/TextReveal";
import { VISITED_PLACES } from "@/content/visitedCountries";

type TravelClip = {
  place: string;
  caption: string;
  hue: string;
  image?: string;
  focus?: { scale?: number; origin?: string };
};

const travelClips: TravelClip[] = [
  { place: "Oregon, USA", caption: "international athlete?", hue: "#22c55e", image: "/images/travel/carlKiss_untitled.png" },
  { place: "Tokyo, JP", caption: "Temple runs", hue: "#a855f7", image: "/images/travel/tokyo-umbrella-pose.png" },
  { place: "Tokyo, JP", caption: "Mandatory vending flick", hue: "#6366f1", image: "/images/travel/vending-machine.png" },
  { place: "Oregon, USA", caption: "trailblazer", hue: "#84cc16", image: "/images/travel/carlPDXpoint.png" },
  { place: "Osaka, JP", caption: "Glico man", hue: "#ec4899", image: "/images/travel/me-and-glicoman.png" },
  { place: "Osaka, JP", caption: "Night markets", hue: "#f97316", image: "/images/travel/osaka-aurafarm.png" },
  { place: "Top of Indochina", caption: "Peak entertainment", hue: "#22d3ee", image: "/images/travel/fansipan-summit.png" },
  { place: "Sa Pa, VN", caption: "Trail stop", hue: "#0ea5e9", image: "/images/travel/waterfall-picture.png" },
];

type FactTile = {
  k: string;
  v: string;
  image?: string;
};

const factTiles: FactTile[] = [
  { k: "Countries", v: `${VISITED_PLACES.length} visited` },
  { k: "5K pace", v: "4:12/km" },
  { k: "Football", v: "Left wing", image: "/images/football/football-field-action-shot.jpeg" },
  { k: "Highest hike", v: "Fansipan · 3,143m" },
];

export function Interests() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const isMobile = useIsMobile();
  // Percentages resolve against track width (container, not strip). Mobile pans 7 cards; desktop keeps 20% to -40%.
  const carouselX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["180%", "-500%"] : ["20%", "-40%"],
  );

  return (
    <section id="interests" className="relative px-6 pt-16 pb-12 md:px-10 md:pt-48 md:pb-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-6 md:mb-20 md:gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)] md:text-xs md:tracking-[0.25em]">
            (05) - My Interests
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)] md:text-xs md:tracking-[0.25em]">
            Places I&apos;ve touched grass at
          </span>
        </div>

        <TextReveal
          as="h2"
          stagger={0.05}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-tight text-balance"
          text="My Interests"
        />
        <TextReveal
          as="h2"
          delay={0.2}
          stagger={0.05}
          className="font-display italic text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-tight text-[var(--accent)] text-balance"
          text="Where the cursor can't follow."
        />

        <div ref={ref} className="mt-16">
          <div className="flex flex-col gap-6">
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function TravelCard({ place, caption, hue, image, focus }: TravelClip) {
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
          style={
            focus
              ? {
                  transform: `scale(${focus.scale ?? 1})`,
                  transformOrigin: focus.origin ?? "center",
                }
              : undefined
          }
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/15" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
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
