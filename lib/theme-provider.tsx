"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

type Theme = "dark" | "light";

const ThemeCtx = createContext<{
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}>({
  theme: "dark",
  toggle: () => {},
  setTheme: () => {},
});

/**
 * Runs before paint (see <ThemeScript /> in layout) so a saved light theme
 * doesn't flash dark first.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.add("light");document.documentElement.style.colorScheme="light";}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}

const TRANSITION_MS = 500;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync React state with whatever themeInitScript already put on <html>.
  useEffect(() => {
    setThemeState(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  const setTheme = useCallback((t: Theme) => {
    const root = document.documentElement;

    // Ease the swap instead of snapping, then drop the class so it stops
    // overriding component-level hover transitions.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      root.classList.add("theme-transition");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        root.classList.remove("theme-transition");
        timer.current = null;
      }, TRANSITION_MS);
    }

    setThemeState(t);
    root.classList.toggle("light", t === "light");
    try { localStorage.setItem("theme", t); } catch {}
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeCtx.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
