"use client";

import { createContext, useCallback, useContext, useState } from "react";

export type CursorVariant = "default" | "hover" | "text" | "drag" | "view" | "send";

type Ctx = {
  variant: CursorVariant;
  label: string;
  setVariant: (v: CursorVariant, label?: string) => void;
  reset: () => void;
};

const CursorCtx = createContext<Ctx>({
  variant: "default",
  label: "",
  setVariant: () => {},
  reset: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setV] = useState<CursorVariant>("default");
  const [label, setLabel] = useState("");

  const setVariant = useCallback((v: CursorVariant, l = "") => {
    setV(v);
    setLabel(l);
  }, []);

  const reset = useCallback(() => {
    setV("default");
    setLabel("");
  }, []);

  return (
    <CursorCtx.Provider value={{ variant, label, setVariant, reset }}>
      {children}
    </CursorCtx.Provider>
  );
}

export const useCursor = () => useContext(CursorCtx);
