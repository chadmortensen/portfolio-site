import type { MapNode } from "./types";

export type View = "theme" | "career" | "3d";

export type Era = { key: string; label: string; years: string; start: number; end: number };

export const ERAS: Era[] = [
  { key: "SoftBank", label: "SoftBank", years: "1995–97", start: 1995, end: 1997 },
  { key: "iTravel", label: "iTravel Partners", years: "1997–99", start: 1997, end: 1999 },
  { key: "Visitalk", label: "Visitalk", years: "1999–2001", start: 1999, end: 2001 },
  { key: "Succeed", label: "Succeed Corp.", years: "2002–03", start: 2002, end: 2003 },
  { key: "Vegas.com", label: "Vegas.com", years: "2004–12", start: 2004, end: 2012 },
  { key: "Walmart", label: "Walmart", years: "2012–21", start: 2012, end: 2021 },
  { key: "Etsy", label: "Etsy", years: "2021–23", start: 2021, end: 2023 },
  { key: "Brightside", label: "Brightside Health", years: "2023–25", start: 2023, end: 2025 },
];
export const ACROSS_ROLES = "Across roles";

const SPANS_ROLES = new Set(["practice", "theme", "timeline"]);

/** The one era a node sits under in the career view. */
export const eraOf = (node: MapNode) => {
  if (SPANS_ROLES.has(node.type) || !node.companies.length) return ACROSS_ROLES;
  return ERAS.some((e) => e.key === node.companies[0]) ? node.companies[0] : ACROSS_ROLES;
};

export const groupLabel = (view: View, key: string) =>
  view === "career" ? (ERAS.find((e) => e.key === key)?.label ?? key) : key;

/** Whether a node belongs to a theme (any of its themes) or an era. */
export const inGroup = (view: View, key: string, node: MapNode) =>
  view === "career" ? eraOf(node) === key || node.companies.includes(key) : node.themes.includes(key);
