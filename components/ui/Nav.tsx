"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-provider";
import { useCursor } from "@/lib/cursor-provider";

const links = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
  { label: "More", href: "/hobbies" },
];

const EMAIL = "carldelapena2004@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/carl-dela-pena-92ab6a294";

export function Nav() {
  const { theme, toggle } = useTheme();
  const { setVariant, reset } = useCursor();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Menu is mobile-only. Close on Escape or breakpoint change. Lock scroll while open via lenis-stopped class.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    document.documentElement.classList.add("lenis-stopped");
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      document.documentElement.classList.remove("lenis-stopped");
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

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

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <nav className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          onPointerEnter={() => setVariant("hover")}
          onPointerLeave={reset}
          onClick={() => setMenuOpen(false)}
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

        <div className="flex items-center gap-2">
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

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--fg)] transition-colors md:hidden"
            style={{ borderColor: menuOpen ? "var(--accent)" : undefined }}
          >
            <span className="relative block h-3 w-4">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 h-px w-4 origin-center bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 h-px w-4 origin-center bg-current"
              />
            </span>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 md:hidden"
        >
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[var(--bg)]/95 backdrop-blur-xl"
          />

          <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
            <nav className="flex flex-1 flex-col justify-center">
              {links.map((l, i) => (
                <span key={l.href} className="overflow-hidden border-b border-[var(--line)] py-1">
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "110%", opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.12 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block"
                  >
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <span className="font-display text-[clamp(2.5rem,13vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
                        {l.label}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.span>
                </span>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-muted)]"
            >
              <div className="h-px w-full bg-[var(--line)]" />
              <div className="flex items-center justify-between gap-4">
                <a href={`mailto:${EMAIL}`} onClick={onClose} className="hover:text-[var(--fg)]">
                  Email
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                  className="hover:text-[var(--fg)]"
                >
                  LinkedIn
                </a>
                <span className="text-[var(--accent)]">Auckland, NZ</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
