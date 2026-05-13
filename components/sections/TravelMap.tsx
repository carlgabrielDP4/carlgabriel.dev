"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, GeoJsonProperties } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import { motion } from "motion/react";
import { isVisitedCountry, VISITED_PLACES } from "@/content/visitedCountries";

const TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountriesTopo = Topology<{ countries: GeometryCollection }>;

const MAP_W = 960;
const MAP_H = 500;

export function TravelMap() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(TOPO_URL);
        if (!res.ok) throw new Error(String(res.status));
        const topo = (await res.json()) as CountriesTopo;
        const fc = feature(topo, topo.objects.countries) as FeatureCollection;
        if (!cancelled) setGeojson(fc);
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
      const iso = (f.properties as GeoJsonProperties)?.ISO_A3 as string | undefined;
      const visited = isVisitedCountry(iso);
      const d = path(f);
      return {
        d: d ?? "",
        visited,
        key: iso && iso !== "-99" ? iso : `geo-${i}`,
      };
    });
  }, [geojson]);

  return (
    <section id="travel-map" className="relative border-t border-[var(--line)] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-baseline md:justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            (01) - Places
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            countries &amp; territories so far
          </span>
        </div>

        <p className="max-w-xl text-pretty text-[var(--fg-muted)]">
          A simple atlas view. Add rows in{" "}
          <code className="rounded border border-[var(--line)] bg-[var(--bg-soft)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--fg)]">
            content/visitedCountries.ts
          </code>{" "}
          when you tick a new place off the list.
        </p>

        <div className="mt-10 overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-soft)]/40">
          {loadError ? (
            <div className="flex aspect-[960/500] items-center justify-center p-8 text-sm text-[var(--fg-muted)]">
              {loadError}
            </div>
          ) : !geojson ? (
            <div
              className="aspect-[960/500] w-full animate-pulse bg-[var(--bg)]"
              aria-hidden
            />
          ) : (
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="h-auto w-full text-[var(--line)]"
              role="img"
              aria-label="World map highlighting countries and territories visited"
            >
              <title>Visited countries and territories</title>
              {paths.map(({ d, visited, key }) => (
                <path
                  key={key}
                  d={d}
                  vectorEffect="non-scaling-stroke"
                  stroke="currentColor"
                  strokeWidth={0.35}
                  fill={visited ? "var(--accent)" : "var(--bg-soft)"}
                  fillOpacity={visited ? 0.55 : 1}
                  className="transition-[fill,fill-opacity] duration-300 hover:fill-opacity-100"
                />
              ))}
            </motion.svg>
          )}
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {VISITED_PLACES.map(({ iso, label }) => (
            <li
              key={iso}
              className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-muted)]"
            >
              <span className="text-[var(--accent)]">{iso}</span>
              <span className="mx-2 text-[var(--line)]">·</span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
