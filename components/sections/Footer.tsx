"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-NZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Pacific/Auckland",
      });
      setTime(formatter.format(now));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-[var(--line)] px-6 pb-10 pt-12 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-muted)] md:grid-cols-4">
          <div>
            <div className="mb-1 text-[var(--fg)]">Local time</div>
            <div className="tabular-nums">{time || "--"} NZST</div>
          </div>
          <div>
            <div className="mb-1 text-[var(--fg)]">Built with</div>
            <div>Next · Motion · GLSL</div>
          </div>
          <div>
            <div className="mb-1 text-[var(--fg)]">Currently</div>
            <div className="text-[var(--accent)]">Open to graduate roles, 2027</div>
          </div>
          <div className="text-right md:text-left">
            <div className="mb-1 text-[var(--fg)]">© 2026</div>
            <div>Carl Dela Pena, all rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
