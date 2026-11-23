"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader } from "@/components/sections/Loader";

export function PageGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  // Stable so the Loader's effect doesn't restart when `ready` flips.
  const handleLoaded = useCallback(() => setReady(true), []);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaded} />
      <main
        className={ready ? "opacity-100" : "opacity-0"}
        style={{ transition: "opacity 400ms 60ms" }}
      >
        {children}
      </main>
    </>
  );
}
