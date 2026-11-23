"use client";

import { useSyncExternalStore } from "react";
import { MEMORIES } from "@/content/memories";

/** Viewport rect of the thing that was clicked; the flying polaroid starts here. */
export type FlightOrigin = { x: number; y: number; w: number; h: number; rot: number };

type MemoryState = {
  /** Memory shown in the viewer, or null when the viewer is closed. */
  activeId: string | null;
  /** Set while a polaroid is flying from the hero to the viewer. */
  origin: FlightOrigin | null;
  /** Bumps on every open so the viewer knows to scroll itself into view. */
  openSeq: number;
};

const SERVER_STATE: MemoryState = { activeId: null, origin: null, openSeq: 0 };
let state: MemoryState = SERVER_STATE;
const listeners = new Set<() => void>();

function set(patch: Partial<MemoryState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export const memoryStore = {
  /** Open the viewer (scrolling to it). Pass an origin to fly a polaroid there. */
  open(id: string, origin?: FlightOrigin) {
    set({ activeId: id, origin: origin ?? null, openSeq: state.openSeq + 1 });
  },
  /** Swap the photo inside an already-open viewer. */
  show(id: string) {
    set({ activeId: id });
  },
  step(dir: 1 | -1) {
    const i = MEMORIES.findIndex((m) => m.id === state.activeId);
    if (i < 0) return;
    set({ activeId: MEMORIES[(i + dir + MEMORIES.length) % MEMORIES.length].id });
  },
  landed() {
    set({ origin: null });
  },
  close() {
    set({ activeId: null, origin: null });
  },
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useMemoryState() {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}
