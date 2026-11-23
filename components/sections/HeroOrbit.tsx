"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useCursor } from "@/lib/cursor-provider";
import { ORBIT, memoryById } from "@/content/memories";
import { memoryStore, useMemoryState } from "@/lib/memory-store";

const PHOTOS = ORBIT.map(({ id, tilt }) => ({ ...memoryById(id)!, tilt }));

/**
 * Polaroids orbiting a tilted 3D ring. All motion is CSS keyframes on
 * transform/opacity (compositor-only); JS only toggles a pause flag when the
 * ring scrolls out of view. Styles live in globals.css under "Hero orbit".
 */
export function HeroOrbit() {
  const { setVariant, reset } = useCursor();
  const { activeId, origin } = useMemoryState();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.removeAttribute("data-paused");
      else el.setAttribute("data-paused", "");
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = PHOTOS.length;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="orbit-root flex h-full w-full flex-col items-center justify-center gap-6"
    >
      <div
        className="orbit-stage"
        onPointerEnter={() => setVariant("hover")}
        onPointerLeave={reset}
      >
        <div className="orbit-tilt">
          <div className="orbit-path" />
          <div className="orbit-core" />

          <div className="orbit-spin orbit-anim">
            {PHOTOS.map((p, i) => (
              <div
                key={p.id}
                className="orbit-card"
                style={{ "--a": `${(360 / n) * i}deg` } as React.CSSProperties}
              >
                <div className="orbit-face orbit-anim">
                  <div
                    className="orbit-polaroid"
                    style={
                      {
                        "--rot": `${p.tilt}deg`,
                        // The flying copy stands in for this card until it lands.
                        opacity: origin && activeId === p.id ? 0 : undefined,
                      } as React.CSSProperties
                    }
                    onPointerEnter={() => setVariant("view", "Open")}
                    onPointerLeave={() => setVariant("hover")}
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      reset();
                      memoryStore.open(p.id, { x: r.left, y: r.top, w: r.width, h: r.height, rot: p.tilt });
                    }}
                  >
                    <div className="orbit-inner group">
                      <div className="rounded-[3px] border border-[var(--line)] bg-[var(--bg-soft)] p-[5%] pb-[18%] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
                        <div className="relative aspect-square w-full overflow-hidden rounded-[2px]">
                          <Image
                            src={p.src}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div
                        className="orbit-shade orbit-anim"
                        style={{ "--i": i, "--n": n } as React.CSSProperties}
                      />

                      <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--bg-soft)]/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--fg)] opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                        {p.place} · <span className="text-[var(--fg-muted)]">{p.caption}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="orbit-label font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-muted)]">
        off the clock · hover
      </p>
    </div>
  );
}
