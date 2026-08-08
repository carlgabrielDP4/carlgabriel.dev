"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import { motion } from "motion/react";
import {
  getPendingIsoForFeatureId,
  getVisitedIsoForFeatureId,
  PENDING_PLACES,
  VISITED_PLACES,
} from "@/content/visitedCountries";

const CONQUERED_COLOR = "#22c55e";
const PENDING_COLOR = "#eab308";

const TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const ANTARCTICA_ID = 10;

type CountriesTopo = Topology<{ countries: GeometryCollection }>;

const MAP_W = 960;
const MAP_H = 460;

type Hover = { name: string; clientX: number; clientY: number } | null;

export function TravelMap() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hover, setHover] = useState<Hover>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(TOPO_URL);
        if (!res.ok) throw new Error(String(res.status));
        const topo = (await res.json()) as CountriesTopo;
        const fc = feature(topo, topo.objects.countries) as FeatureCollection;
        const filtered: FeatureCollection = {
          type: "FeatureCollection",
          features: fc.features.filter((f) => {
            const id = typeof f.id === "string" ? parseInt(f.id, 10) : f.id;
            return id !== ANTARCTICA_ID;
          }),
        };
        if (!cancelled) setGeojson(filtered);
      } catch {
        if (!cancelled) setLoadError("Could not load map data.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const paths = useMemo(() => {
    if (!geojson) return [];
    const projection = geoMercator().fitExtent(
      [[10, 10], [MAP_W - 10, MAP_H - 10]],
      geojson,
    );
    const path = geoPath(projection);
    return geojson.features.map((f, i) => {
      const iso = getVisitedIsoForFeatureId(f.id);
      const pendingIso = getPendingIsoForFeatureId(f.id);
      const name = (f.properties as { name?: string } | null)?.name ?? "";
      return {
        d: path(f) ?? "",
        visited: iso !== null,
        pending: pendingIso !== null,
        name,
        key: `${f.id ?? "geo"}-${i}`,
      };
    });
  }, [geojson]);

  return (
    <section
      id="travel-map"
      className="relative border-t border-[var(--line)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-baseline md:justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (03) · Places
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            {VISITED_PLACES.length} countries · hover for the name
          </span>
        </div>

        <p className="max-w-xl text-pretty text-[var(--fg-muted)]">
          SIDEQUEST OR MAIN QUEST ???
        </p>

        <div className="mt-4 flex flex-wrap gap-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: CONQUERED_COLOR }}
              aria-hidden
            />
            Conquered
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: PENDING_COLOR }}
              aria-hidden
            />
            Pending
          </div>
        </div>

        <div
          className="relative mt-10 overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-soft)]/40"
          onMouseLeave={() => setHover(null)}
        >
          {loadError ? (
            <div className="flex aspect-[960/460] items-center justify-center p-8 text-sm text-[var(--fg-muted)]">
              {loadError}
            </div>
          ) : !geojson ? (
            <div className="aspect-[960/460] w-full animate-pulse bg-[var(--bg)]" aria-hidden />
          ) : (
            <>
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                className="h-auto w-full text-[var(--line)]"
                role="img"
                aria-label="World map highlighting countries visited"
              >
                <title>Visited countries</title>
                {paths.map(({ d, visited, pending, name, key }) => {
                  const highlighted = visited || pending;
                  const fill = visited
                    ? CONQUERED_COLOR
                    : pending
                      ? PENDING_COLOR
                      : "var(--bg-soft)";
                  return (
                    <path
                      key={key}
                      d={d}
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeWidth={0.35}
                      fill={fill}
                      fillOpacity={highlighted ? 0.6 : 1}
                      onMouseEnter={(e) =>
                        setHover({ name, clientX: e.clientX, clientY: e.clientY })
                      }
                      onMouseMove={(e) =>
                        setHover((prev) =>
                          prev && prev.name === name
                            ? { name, clientX: e.clientX, clientY: e.clientY }
                            : { name, clientX: e.clientX, clientY: e.clientY },
                        )
                      }
                      className={`transition-[fill-opacity] duration-200 ${
                        highlighted ? "hover:fill-opacity-90" : ""
                      } cursor-default`}
                      style={
                        hover?.name === name
                          ? {
                              fillOpacity: highlighted ? 0.9 : 1,
                              filter: highlighted ? "brightness(1.15)" : undefined,
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </motion.svg>

              <Tooltip hover={hover} />
            </>
          )}
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {VISITED_PLACES.map(({ iso, label }) => (
            <li
              key={iso}
              className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)]"
            >
              <span style={{ color: CONQUERED_COLOR }}>{iso}</span>
              <span className="mx-2 text-[var(--line)]">·</span>
              {label}
            </li>
          ))}
        </ul>

        <ul className="mt-3 flex flex-wrap gap-2">
          {PENDING_PLACES.map(({ iso, label }) => (
            <li
              key={iso}
              className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)]"
            >
              <span style={{ color: PENDING_COLOR }}>{iso}</span>
              <span className="mx-2 text-[var(--line)]">·</span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tooltip({ hover }: { hover: Hover }) {
  if (!hover) return null;
  return (
    <div
      className="pointer-events-none fixed z-20 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-md border border-[var(--line)] bg-[var(--bg)]/95 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg)] shadow-xl backdrop-blur"
      style={{ left: hover.clientX, top: hover.clientY }}
    >
      {hover.name || "·"}
    </div>
  );
}
