import type { Metadata } from "next";
import { HobbiesHero } from "@/components/sections/HobbiesHero";
import { IdentityCard } from "@/components/sections/IdentityCard";
import { TimelineReverse } from "@/components/sections/TimelineReverse";
import { TravelMap } from "@/components/sections/TravelMap";
import { Playground } from "@/components/sections/Playground";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "More · Carl Dela Pena",
  description:
    "Two frames of one guy: a reverse timeline, the countries map, and a draggable desk.",
};

export default function HobbiesPage() {
  return (
    <main>
      <HobbiesHero />
      <IdentityCard />
      <TimelineReverse />
      <TravelMap />
      <Playground />
      <Footer />
    </main>
  );
}
