"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { useCursor } from "@/lib/cursor-provider";

const links = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
  { label: "More", href: "/hobbies" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const { setVariant, reset } = useCursor();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <motion.div
        style={{
          backgroundColor: `color-mix(in oklab, var(--bg) calc(var(--nav-op, 0) * 100%), transparent)`,
          ["--nav-op" as never]: bgOpacity,
        }}
        className="absolute inset-0 backdrop-blur-md"
      />
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-[var(--line)]"
      />

      <nav className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          onPointerEnter={() => setVariant("hover")}
          onPointerLeave={reset}
          className="font-display text-2xl font-medium tracking-tight md:text-3xl"
        >
          carl<span className="text-[var(--accent)]">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onPointerEnter={() => setVariant("hover")}
              onPointerLeave={reset}
              className="rounded-full px-4 py-2 text-sm text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--fg)]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={toggle}
          onPointerEnter={() => setVariant("hover")}
          onPointerLeave={reset}
          aria-label="Toggle theme"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
        >
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.span>
        </button>
      </nav>
    </motion.header>
  );
}
