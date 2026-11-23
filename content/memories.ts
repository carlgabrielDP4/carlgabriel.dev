/** Personal photos shared by the hero orbit, the Interests carousel and the memory viewer. */
export type Memory = {
  id: string;
  src: string;
  place: string;
  caption: string;
  /** Card tint behind the photo while it loads. */
  hue: string;
  focus?: { scale?: number; origin?: string };
};

export const MEMORIES: Memory[] = [
  { id: "oregon-kiss", src: "/images/travel/carlKiss_untitled.png", place: "Oregon, USA", caption: "international athlete?", hue: "#22c55e" },
  { id: "tokyo-temple", src: "/images/travel/tokyo-umbrella-pose.png", place: "Tokyo, JP", caption: "Temple runs", hue: "#a855f7" },
  { id: "tokyo-vending", src: "/images/travel/vending-machine.png", place: "Tokyo, JP", caption: "Mandatory vending flick", hue: "#6366f1" },
  { id: "oregon-trail", src: "/images/travel/carlPDXpoint.png", place: "Oregon, USA", caption: "trailblazer", hue: "#84cc16" },
  { id: "osaka-glico", src: "/images/travel/me-and-glicoman.png", place: "Osaka, JP", caption: "Glico man", hue: "#ec4899" },
  { id: "osaka-night", src: "/images/travel/osaka-aurafarm.png", place: "Osaka, JP", caption: "Night markets", hue: "#f97316" },
  { id: "fansipan", src: "/images/travel/fansipan-summit.png", place: "Top of Indochina", caption: "Peak entertainment", hue: "#22d3ee" },
  { id: "sapa-falls", src: "/images/travel/waterfall-picture.png", place: "Sa Pa, VN", caption: "Trail stop", hue: "#0ea5e9" },
  { id: "football", src: "/images/football/football-field-action-shot.jpeg", place: "Football", caption: "Winger", hue: "#10b981" },
  { id: "singapore", src: "/images/travel/singapore-pose.png", place: "Singapore", caption: "City stop", hue: "#e11d48" },
];

export const memoryById = (id: string) => MEMORIES.find((m) => m.id === id);

/** Photos in the Interests travel carousel, in order. */
export const TRAVEL_IDS = [
  "oregon-kiss",
  "tokyo-temple",
  "tokyo-vending",
  "oregon-trail",
  "osaka-glico",
  "osaka-night",
  "fansipan",
  "sapa-falls",
];

/** Photos orbiting in the hero, with a hand-placed tilt for each polaroid. */
export const ORBIT: { id: string; tilt: number }[] = [
  { id: "osaka-glico", tilt: -4 },
  { id: "football", tilt: 3 },
  { id: "tokyo-temple", tilt: -2 },
  { id: "fansipan", tilt: 4 },
  { id: "tokyo-vending", tilt: -3 },
  { id: "oregon-trail", tilt: 2 },
  { id: "singapore", tilt: -4 },
  { id: "osaka-night", tilt: 3 },
];
