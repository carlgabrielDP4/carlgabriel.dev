/**
 * Places shown on the world map. Add a row here when you visit somewhere new,
 * then ensure `iso` matches Natural Earth / world-atlas ISO_A3 (e.g. "FRA", "ITA").
 */
export const VISITED_PLACES = [
  { iso: "AUS", label: "Australia" },
  { iso: "CHN", label: "China" },
  { iso: "HKG", label: "Hong Kong" },
  { iso: "JPN", label: "Japan" },
  { iso: "NZL", label: "New Zealand" },
  { iso: "PHL", label: "Philippines" },
  { iso: "SGP", label: "Singapore" },
  { iso: "USA", label: "United States" },
  { iso: "VNM", label: "Vietnam" },
] as const;

export type VisitedIso = (typeof VISITED_PLACES)[number]["iso"];

const ISO_SET = new Set<string>(VISITED_PLACES.map((p) => p.iso));

export function isVisitedCountry(isoA3: string | undefined): boolean {
  if (!isoA3 || isoA3 === "-99" || isoA3.length !== 3) return false;
  return ISO_SET.has(isoA3);
}
