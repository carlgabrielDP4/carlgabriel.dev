"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const tickers = [
  { sym: "NVDA", price: "1284.20", chg: "+2.41%" },
  { sym: "AAPL", price: "248.10", chg: "+0.62%" },
  { sym: "TSLA", price: "412.55", chg: "-1.18%" },
  { sym: "AMD", price: "188.31", chg: "+3.04%" },
  { sym: "META", price: "612.74", chg: "+0.91%" },
  { sym: "SPY", price: "642.18", chg: "+0.42%" },
  { sym: "BTC", price: "129,420", chg: "+1.86%" },
  { sym: "PLTR", price: "92.16", chg: "+4.22%" },
];

export function Ledger() {
  return (
    <section id="ledger" className="relative border-t border-[var(--line)] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-baseline md:justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (02) - Ledger
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            watchlist energy · not travel
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The other obsession.
            </p>
            <p className="mt-4 max-w-sm text-pretty text-sm text-[var(--fg-muted)]">
              Fake-live prices, real dopamine. Same discipline as design: pattern recognition, narrative, and knowing when to zoom out.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--bg-soft)]/40 p-6 lg:col-span-8">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                LEDGER - portfolio.live
              </span>
              <LivePulse />
            </div>
            <div className="mt-2 divide-y divide-[var(--line)]">
              {tickers.map((t, i) => (
                <TickerRow key={t.sym} {...t} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TickerRow({
  sym,
  price,
  chg,
  delay,
}: {
  sym: string;
  price: string;
  chg: string;
  delay: number;
}) {
  const [livePrice, setLivePrice] = useState(price);
  const up = chg.startsWith("+");

  useEffect(() => {
    const id = setInterval(() => {
      const drift = (Math.random() - 0.5) * 0.4;
      const n = parseFloat(price.replace(/,/g, ""));
      if (Number.isNaN(n)) return;
      const next = (n + drift).toLocaleString(undefined, { maximumFractionDigits: 2 });
      setLivePrice(next);
    }, 1400 + delay * 1000);
    return () => clearInterval(id);
  }, [price, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center justify-between py-2.5 font-mono text-sm"
    >
      <span className="text-[var(--fg)]">{sym}</span>
      <span className="tabular-nums text-[var(--fg-muted)]">{livePrice}</span>
      <span className={`tabular-nums text-xs ${up ? "text-[var(--accent)]" : "text-rose-400"}`}>
        {chg}
      </span>
    </motion.div>
  );
}

function LivePulse() {
  return (
    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      </span>
      live
    </span>
  );
}
