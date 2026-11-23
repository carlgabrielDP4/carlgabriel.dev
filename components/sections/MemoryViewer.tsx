"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, X } from "lucide-react";
import { MEMORIES, memoryById, type Memory } from "@/content/memories";
import { memoryStore, useMemoryState, type FlightOrigin } from "@/lib/memory-store";
import { useLenis } from "@/lib/lenis-provider";
import { useCursor } from "@/lib/cursor-provider";

/** Space left above the panel for the fixed nav when scrolling to it. */
const NAV_OFFSET = 88;
/** Base size of the flying polaroid; its transforms are relative to this. */
const FLIGHT_W = 240;
const FLIGHT_H = FLIGHT_W * 1.22;
const FLIGHT_SECONDS = 1.5;
const SLICES = 7;
/** Resting misalignment of each strip (px) - it snaps flush on hover. */
const OFFSETS = [-14, 10, -6, 16, -10, 6, -16];
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Strips animate from the centre outward. */
const fromCentre = (i: number) => Math.abs(i - (SLICES - 1) / 2) * 0.07;

const sliceVariants: Variants = {
  hidden: (i: number) => ({ y: i % 2 ? "-102%" : "102%" }),
  shown: (i: number) => ({
    y: "0%",
    transition: { duration: 0.95, ease: EASE_OUT, delay: fromCentre(i) },
  }),
  gone: (i: number) => ({
    y: i % 2 ? "102%" : "-102%",
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0], delay: fromCentre(i) * 0.5 },
  }),
};

/** Top-left translate that centres a FLIGHT_W box on (cx, cy). */
const centredAt = (cx: number, cy: number) => ({ x: cx - FLIGHT_W / 2, y: cy - FLIGHT_H / 2 });

type FlightPose = { x: number; y: number; scale: number; rotate: number; flip?: number };

function flightStart(o: FlightOrigin): FlightPose {
  return { ...centredAt(o.x + o.w / 2, o.y + o.h / 2), scale: o.w / FLIGHT_W, rotate: o.rot };
}

/** Same function list in every keyframe so the browser interpolates each part. */
const poseToTransform = ({ x, y, scale, rotate, flip = 0 }: FlightPose) =>
  `perspective(900px) translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg) rotateY(${flip}deg)`;

const pad = (n: number) => String(n).padStart(2, "0");

export function MemoryViewer() {
  const { activeId, origin, openSeq } = useMemoryState();
  const memory = activeId ? memoryById(activeId) : undefined;
  const index = memory ? MEMORIES.indexOf(memory) : -1;
  const flying = origin !== null;

  const reduce = useReducedMotion();
  const lenisRef = useLenis();
  const { setVariant, reset } = useCursor();
  const panelRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const handledSeq = useRef(0);
  const flightRef = useRef<HTMLDivElement>(null);

  // Each open scrolls the viewer into view. From the hero orbit, a polaroid
  // also flies down with the scroll and lands in the photo slot.
  useEffect(() => {
    if (!openSeq || openSeq === handledSeq.current) return;
    const panel = panelRef.current;
    const slot = slotRef.current;
    if (!panel || !slot) return;
    handledSeq.current = openSeq;

    const panelTop = panel.getBoundingClientRect().top;
    const target = panelTop + window.scrollY - NAV_OFFSET;
    const scrollTo = (immediate: boolean) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          duration: FLIGHT_SECONDS - 0.1,
          easing: easeInOutCubic,
          lock: true,
          immediate,
        });
      } else {
        window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
      }
    };

    if (!origin) {
      scrollTo(!!reduce);
      return;
    }
    const flight = flightRef.current;
    if (reduce || !flight) {
      scrollTo(true);
      memoryStore.landed();
      return;
    }

    // Where the slot will sit once the scroll finishes (its offset inside the
    // panel doesn't change while the panel's height animates open).
    const slotRect = slot.getBoundingClientRect();
    const landing = centredAt(
      slotRect.left + slotRect.width / 2,
      NAV_OFFSET + (slotRect.top - panelTop) + slotRect.height / 2,
    );
    const start = flightStart(origin);
    const mid = centredAt(window.innerWidth / 2, window.innerHeight / 2);

    const landScale = (slotRect.width * 0.6) / FLIGHT_W;

    scrollTo(false);
    // Native Web Animations: transform-only, so it stays on the compositor
    // while Lenis scrolls the page underneath. Ends with an edge-on flip, then
    // the strips take over.
    const anim = flight.animate(
      [
        { transform: poseToTransform(start), opacity: 1, offset: 0 },
        { transform: poseToTransform({ ...mid, scale: 1.2, rotate: -12 }), opacity: 1, offset: 0.42, easing: "cubic-bezier(0.45, 0, 0.25, 1)" },
        { transform: poseToTransform({ ...landing, scale: landScale, rotate: 0 }), opacity: 1, offset: 0.84, easing: "ease-in" },
        { transform: poseToTransform({ ...landing, scale: landScale * 0.92, rotate: 0, flip: 90 }), opacity: 0, offset: 1 },
      ],
      { duration: (FLIGHT_SECONDS + 0.3) * 1000, easing: "cubic-bezier(0.45, 0, 0.55, 1)", fill: "forwards" },
    );
    anim.onfinish = () => memoryStore.landed();
    return () => {
      anim.onfinish = null;
      anim.cancel();
    };
  }, [openSeq, origin, reduce, lenisRef]);

  // Keyboard: arrows flip, Escape closes.
  useEffect(() => {
    if (!memory) return;
    const onKey = (e: KeyboardEvent) => {
      if (flying) return;
      if (e.key === "ArrowRight") memoryStore.step(1);
      else if (e.key === "ArrowLeft") memoryStore.step(-1);
      else if (e.key === "Escape") {
        reset();
        memoryStore.close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [memory, flying, reset]);

  const close = () => {
    reset();
    memoryStore.close();
  };

  const backToOrbit = () => {
    reset();
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, easing: easeInOutCubic, onComplete: memoryStore.close });
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      memoryStore.close();
    }
  };

  const hoverable = {
    onPointerEnter: () => setVariant("hover"),
    onPointerLeave: reset,
  };

  return (
    <>
      {/* The courier: a polaroid that flies from the hero orbit to the slot. */}
      {origin && memory && (
        <div
          ref={flightRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[90] will-change-transform"
          style={{ width: FLIGHT_W, height: FLIGHT_H, transform: poseToTransform(flightStart(origin)) }}
        >
          <div className="h-full w-full rounded-[4px] border border-[var(--line)] bg-[var(--bg-soft)] p-[5%] pb-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="relative aspect-square w-full overflow-hidden rounded-[2px]">
              <Image src={memory.src} alt="" fill sizes="400px" className="object-cover" />
            </div>
            <div className="pt-[6%] text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              {memory.place}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {memory && (
          <motion.div
            key="memory-panel"
            ref={panelRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 pb-16 pt-12 md:h-[min(calc(100svh-110px),780px)] md:grid-cols-12 md:gap-6 md:pb-10">
              {/* Meta + controls */}
              <div className="order-2 flex flex-col justify-between gap-8 md:order-1 md:col-span-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] md:text-xs">
                    Memory {pad(index + 1)} / {pad(MEMORIES.length)}
                  </div>
                  <div className="mt-4 overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.h3
                        key={memory.id}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="font-display text-[clamp(2.5rem,4.6vw,4.75rem)] italic leading-[1] tracking-tight"
                      >
                        {memory.place}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    {memory.caption}
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <IconButton label="Previous memory" onClick={() => memoryStore.step(-1)} {...hoverable}>
                      <ArrowLeft className="h-4 w-4" />
                    </IconButton>
                    <IconButton label="Next memory" onClick={() => memoryStore.step(1)} {...hoverable}>
                      <ArrowRight className="h-4 w-4" />
                    </IconButton>
                    <IconButton label="Close memory" onClick={close} {...hoverable}>
                      <X className="h-4 w-4" />
                    </IconButton>
                  </div>
                  <button
                    type="button"
                    onClick={backToOrbit}
                    {...hoverable}
                    className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                  >
                    <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
                    Back to the orbit
                  </button>
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-muted)]/70 md:block">
                    ← → flip · esc close
                  </span>
                </div>
              </div>

              {/* The sliced photo */}
              <div
                ref={slotRef}
                onPointerEnter={() => setVariant("gone")}
                onPointerLeave={reset}
                className="mv-slot group relative order-1 mx-auto aspect-[4/5] max-h-[70svh] w-full overflow-hidden rounded-md border border-[var(--line)] bg-[var(--bg-soft)] md:order-2 md:col-span-6 md:h-full md:max-h-none md:w-auto md:max-w-full md:justify-self-center"
              >
                <AnimatePresence>
                  <SlicedPhoto key={memory.id} memory={memory} hidden={flying} />
                </AnimatePresence>
                <span className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/45 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/85 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  the cursor can&apos;t follow here
                </span>
              </div>

              {/* Contact sheet */}
              <div className="order-3 flex flex-col gap-3 md:col-span-3 md:min-h-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] md:text-right md:text-xs">
                  Contact sheet
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:content-start md:overflow-visible">
                  {MEMORIES.map((m) => {
                    const active = m.id === memory.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        aria-label={`${m.place} - ${m.caption}`}
                        aria-pressed={active}
                        onClick={() => memoryStore.show(m.id)}
                        {...hoverable}
                        className={`relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-[3px] border transition-all duration-300 md:w-auto ${
                          active
                            ? "border-[var(--accent)] opacity-100"
                            : "border-[var(--line)] opacity-45 hover:opacity-90"
                        }`}
                      >
                        <Image src={m.src} alt="" fill sizes="96px" className="object-cover" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SlicedPhoto({ memory, hidden }: { memory: Memory; hidden: boolean }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial="hidden"
      animate={hidden ? "hidden" : "shown"}
      exit="gone"
    >
      {Array.from({ length: SLICES }, (_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={sliceVariants}
          className="mv-slice absolute inset-y-0 overflow-hidden"
          style={
            {
              left: `${(i * 100) / SLICES}%`,
              width: `${100 / SLICES}%`,
              "--off": `${OFFSETS[i % OFFSETS.length]}px`,
            } as React.CSSProperties
          }
        >
          <motion.div
            className="absolute inset-y-0"
            style={{ width: `${SLICES * 100}%`, left: `${-i * 100}%` }}
            initial={{ scale: 1.18 }}
            animate={{ scale: hidden ? 1.18 : 1 }}
            transition={{ duration: 1.6, ease: EASE_OUT }}
          >
            <Image
              src={memory.src}
              alt={i === 0 ? `${memory.place} - ${memory.caption}` : ""}
              fill
              loading="eager"
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
              style={
                memory.focus
                  ? { transform: `scale(${memory.focus.scale ?? 1})`, transformOrigin: memory.focus.origin ?? "center" }
                  : undefined
              }
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function IconButton({
  label,
  children,
  ...rest
}: { label: string; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
      {...rest}
    >
      {children}
    </button>
  );
}
