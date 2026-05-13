import type { Metadata } from "next";
import { TravelMap } from "@/components/sections/TravelMap";
import { Ledger } from "@/components/sections/Ledger";
import { Playground } from "@/components/sections/Playground";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Hobbies - Carl Dela Pena",
  description:
    "Off the clock: a world map of where I've landed, watchlist energy, and the stuff currently on my desk.",
};

export default function HobbiesPage() {
  return (
    <main className="pt-24">
      <header className="mx-auto max-w-[1400px] px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
          Hobbies
        </span>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-tight">
          Off the clock.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-[var(--fg-muted)]">
          A map of where I&apos;ve landed, a watchlist that keeps me curious, and the assorted things currently scattered on my desk.
        </p>
      </header>

      <TravelMap />
      <Ledger />
      <Playground />
      <Footer />
    </main>
  );
}
