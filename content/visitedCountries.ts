/**
 * Places shown on the world map. Add a row here when you visit somewhere new.
 *
 * `iso`  - ISO 3166-1 alpha-3 code (for display).
 * `id`   - ISO 3166-1 numeric code as an integer (matches `feature.id` from
 *           world-atlas TopoJSON, which is the actual matching key).
 */
export const VISITED_PLACES = [
  { iso: "AUS", id: 36, label: "Australia" },
  { iso: "CHN", id: 156, label: "China" },
  { iso: "HKG", id: 344, label: "Hong Kong" },
  { iso: "JPN", id: 392, label: "Japan" },
  { iso: "NZL", id: 554, label: "New Zealand" },
  { iso: "PHL", id: 608, label: "Philippines" },
  { iso: "SGP", id: 702, label: "Singapore" },
  { iso: "USA", id: 840, label: "United States" },
  { iso: "VNM", id: 704, label: "Vietnam" },
] as const;

export type VisitedIso = (typeof VISITED_PLACES)[number]["iso"];

const ISO_BY_ID: Record<number, VisitedIso> = Object.fromEntries(
  VISITED_PLACES.map((p) => [p.id, p.iso]),
) as Record<number, VisitedIso>;

function toNumeric(id: string | number | undefined): number | null {
  if (id == null) return null;
  const n = typeof id === "string" ? parseInt(id, 10) : id;
  return Number.isFinite(n) ? n : null;
}

export function getVisitedIsoForFeatureId(
  id: string | number | undefined,
): VisitedIso | null {
  const n = toNumeric(id);
  if (n == null) return null;
  return ISO_BY_ID[n] ?? null;
}

export function isVisitedFeatureId(id: string | number | undefined): boolean {
  return getVisitedIsoForFeatureId(id) !== null;
}
