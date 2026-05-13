import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { PageGate } from "@/components/sections/PageGate";

const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Experience = dynamic(() =>
  import("@/components/sections/Experience").then((m) => m.Experience),
);
const Work = dynamic(() => import("@/components/sections/Work").then((m) => m.Work));
const Skills = dynamic(() => import("@/components/sections/Skills").then((m) => m.Skills));
const Interests = dynamic(() =>
  import("@/components/sections/Interests").then((m) => m.Interests),
);
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact));
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer));

export default function HomePage() {
  return (
    <PageGate>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Work />
      <Interests />
      <Contact />
      <Footer />
    </PageGate>
  );
}
