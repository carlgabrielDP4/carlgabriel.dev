import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { ThemeProvider } from "@/lib/theme-provider";
import { CursorProvider } from "@/lib/cursor-provider";
import { Cursor } from "@/components/ui/Cursor";
import { NoiseGrain } from "@/components/ui/NoiseGrain";
import { Nav } from "@/components/ui/Nav";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carl Dela Pena - Designer who codes",
  description:
    "UI/UX designer and frontend engineer. CS + IT student at the University of Auckland, graduating end of 2026. Motion-led product design, design systems, and front-end work. Based in Auckland, NZ.",
  metadataBase: new URL("https://carl-final-portfolio.vercel.app"),
  openGraph: {
    title: "Carl Dela Pena - Designer who codes",
    description: "Motion-led product design and front-end engineering from Auckland.",
    type: "website",
    images: [
      {
        url: "/images/portrait/carl-suited-up.png",
        alt: "Carl Dela Pena",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>
          <CursorProvider>
            <LenisProvider>
              <Cursor />
              <Nav />
              {children}
              <NoiseGrain />
            </LenisProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
