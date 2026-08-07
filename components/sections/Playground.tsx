"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useCursor } from "@/lib/cursor-provider";

type Item =
  | {
      type: "polaroid";
      image: string;
      caption: string;
      x: number;
      y: number;
      r: number;
      focus?: { scale: number; origin: string };
    }
  | {
      type: "sticky";
      tone: "yellow" | "pink";
      body: string;
      label?: string;
      x: number;
      y: number;
      r: number;
    }
  | { type: "album"; title: string; artist: string; hue: string; x: number; y: number; r: number }
  | { type: "ticket"; venue: string; row: string; date: string; x: number; y: number; r: number }
  | { type: "quote"; body: string; attrib: string; x: number; y: number; r: number };

const ITEMS: Item[] = [
  {
    type: "polaroid",
    image: "/images/travel/fansipan-summit.png",
    caption: "Fansipan, 3,143m altitude.",
    x: -300,
    y: -110,
    r: -7,
  },
  {
    type: "album",
    title: "Nights",
    artist: "Frank Ocean",
    hue: "from-indigo-500 via-violet-600 to-fuchsia-800",
    x: -40,
    y: -160,
    r: 6,
  },
  {
    type: "ticket",
    venue: "Portland, Oregon",
    row: "from Auckland, NZ",
    date: "AKL · PDX",
    x: 230,
    y: -120,
    r: -5,
  },
  {
    type: "quote",
    body:
      "If you want to look good\nin front of thousands,\nyou have to outwork thousands\nin front of nobody.",
    attrib: "Damian Lillard",
    x: -220,
    y: 100,
    r: 5,
  },
  {
    type: "sticky",
    tone: "yellow",
    body: "Work until my name\nis mentioned in rooms\nyou haven't entered\nyet.",
    label: "life goal",
    x: 80,
    y: 70,
    r: -6,
  },
  {
    type: "sticky",
    tone: "pink",
    body: "Land a technical\ndesigner role.",
    x: 270,
    y: 170,
    r: 9,
  },
  {
    type: "sticky",
    tone: "yellow",
    body: "New York trip.\nKnicks game\nwhile I'm at it.",
    x: -150,
    y: 230,
    r: -4,
  },
];

export function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="playground"
      className="relative overflow-hidden border-y border-[var(--line)] py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (05) · Desk
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            drag · throw · hold
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              My desk.
            </h2>
            <p className="mt-4 max-w-sm text-[var(--fg-muted)]">
              Everything that didn&apos;t fit on the CV. Pick it up. Throw it across the screen.
              Hold it down. Honest objects react to honest hands.
            </p>
            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              ☞ click and drag anywhere on the right
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative h-[520px] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-soft)]/50 md:col-span-8 md:h-[600px]"
            style={{ touchAction: "none" }}
          >
            {ITEMS.map((item, i) => (
              <DraggableItem key={i} item={item} containerRef={containerRef} index={i} />
            ))}
            <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              physics: spring(stiff)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DraggableItem({
  item,
  containerRef,
  index,
}: {
  item: Item;
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
}) {
  const { setVariant, reset } = useCursor();
  const mx = useMotionValue(0);
  const rotateTilt = useTransform(mx, [-200, 200], [-10, 10]);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.18}
      dragTransition={{ bounceStiffness: 220, bounceDamping: 14, power: 0.45 }}
      onPointerEnter={() => setVariant("drag", "Drag")}
      onPointerLeave={reset}
      whileTap={{ scale: 1.06, zIndex: 50, cursor: "grabbing" }}
      whileHover={{ scale: 1.03, zIndex: 40 }}
      style={{ x: mx, rotate: rotateTilt }}
      initial={{ x: item.x, y: item.y, rotate: item.r, opacity: 0 }}
      animate={{ x: item.x, y: item.y, rotate: item.r, opacity: 1 }}
      transition={{ type: "spring", damping: 16, stiffness: 140, delay: 0.04 * index }}
      className="absolute left-1/2 top-1/2 cursor-grab will-change-transform"
    >
      <ItemView item={item} />
    </motion.div>
  );
}

function ItemView({ item }: { item: Item }) {
  switch (item.type) {
    case "polaroid":
      return (
        <div className="-ml-[110px] -mt-[130px] w-[220px] rounded-sm bg-white p-3 pb-12 shadow-2xl">
          <div className="relative aspect-square w-full overflow-hidden bg-black">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="220px"
              className="object-cover"
              style={
                item.focus
                  ? {
                      transform: `scale(${item.focus.scale})`,
                      transformOrigin: item.focus.origin,
                    }
                  : undefined
              }
            />
          </div>
          <div className="mt-3 text-center font-display text-sm italic text-neutral-700">
            {item.caption}
          </div>
        </div>
      );
    case "sticky": {
      const bg =
        item.tone === "yellow"
          ? "bg-[#fde68a] text-neutral-900"
          : "bg-[#fbcfe8] text-neutral-900";
      return (
        <div
          className={`-ml-[100px] -mt-[100px] flex h-[200px] w-[200px] flex-col justify-between p-4 shadow-2xl ${bg}`}
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%)" }}
        >
          <div className="font-display text-base leading-snug">
            {item.body.split("\n").map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">
            {item.label ?? "todo · ongoing"}
          </div>
        </div>
      );
    }
    case "album":
      return (
        <div className="-ml-[100px] -mt-[100px] w-[200px] shadow-2xl">
          <div
            className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${item.hue}`}
          >
            <div className="absolute inset-[12%] rounded-full border border-white/30" />
            <div className="absolute inset-[34%] rounded-full bg-black/70" />
            <div className="absolute inset-[42%] rounded-full bg-[var(--accent)]" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
          </div>
          <div className="bg-black/85 px-3 py-2 text-white">
            <div className="truncate font-display text-sm font-medium">{item.title}</div>
            <div className="truncate font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
              {item.artist} · on repeat
            </div>
          </div>
        </div>
      );
    case "ticket":
      return (
        <div className="-ml-[140px] -mt-[50px] flex w-[280px] items-stretch overflow-hidden rounded-sm bg-[#f5f3ee] text-neutral-900 shadow-2xl">
          <div className="flex flex-1 flex-col justify-between p-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-60">
              admit one
            </div>
            <div className="font-display text-lg font-medium leading-tight">{item.venue}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
              {item.row}
            </div>
          </div>
          <div
            className="flex w-20 flex-col items-center justify-center border-l border-dashed border-neutral-400 bg-[#e9e5da] p-2 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ writingMode: "vertical-rl" }}
          >
            {item.date}
          </div>
        </div>
      );
    case "quote":
      return (
        <div className="-ml-[140px] -mt-[80px] w-[280px] rounded-md bg-gradient-to-br from-[var(--accent)] via-fuchsia-600 to-indigo-800 p-5 text-white shadow-2xl">
          <div className="font-display text-lg italic leading-snug">
            {item.body.split("\n").map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
          <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] opacity-80">
            {item.attrib}
          </div>
        </div>
      );
  }
}
