import type { MapNode } from "./types";

export type View = "theme" | "career" | "3d";

export type Era = { key: string; title?: string; label: string; years: string; start: number; end: number; undated?: boolean };

/**
 * Every role, oldest first. Roles marked `undated` show without their years anywhere on the site
 * (`years` is blanked below; `start`/`end` still set their order and length on the map), so the site
 * doesn't add up to a total career length. Their stories lose their years too (see publicNodes).
 */
const ALL_ERAS: Era[] = [
  { key: "SoftBank", label: "SoftBank", years: "1995–97", start: 1995, end: 1997, undated: true },
  { key: "iTravel", label: "iTravel Partners", years: "1997–99", start: 1997, end: 1999, undated: true },
  { key: "Visitalk", title: "Designer", label: "Visitalk", years: "1999–2001", start: 1999, end: 2001, undated: true },
  { key: "Succeed", title: "Sr. Designer", label: "Succeed Corp.", years: "2002–03", start: 2002, end: 2003, undated: true },
  { key: "Vegas.com", title: "Manager", label: "Vegas.com", years: "2004–12", start: 2004, end: 2012, undated: true },
  { key: "Walmart", title: "Group Design Manager", label: "Walmart", years: "2012–21", start: 2012, end: 2021 },
  { key: "Etsy", title: "Director", label: "Etsy", years: "2021–23", start: 2021, end: 2023 },
  { key: "Brightside", title: "Director / Head of Design", label: "Brightside Health", years: "2023–25", start: 2023, end: 2025 },
];

/** Years before this are never shown, on roles or stories. */
export const FIRST_DATED_YEAR = 2012;

export const ERAS: Era[] = ALL_ERAS.map((e) => (e.undated ? { ...e, years: "" } : e));

/** "2012–2021", or "" for an undated role. */
export const eraYears = (era: Era) => (era.undated ? "" : `${era.start}–${era.end}`);

/** The stories as the site shows them: years before FIRST_DATED_YEAR are dropped. */
export const publicNodes = <T extends MapNode>(nodes: T[]): T[] =>
  nodes.map((n) => ({ ...n, years: n.years.filter((y) => y >= FIRST_DATED_YEAR) }));

export const ACROSS_ROLES = "Across roles";

const SPANS_ROLES = new Set(["practice", "theme", "timeline"]);

/** The one era a node sits under in the career view. */
export const eraOf = (node: MapNode) => {
  if (SPANS_ROLES.has(node.type) || !node.companies.length) return ACROSS_ROLES;
  return ERAS.some((e) => e.key === node.companies[0]) ? node.companies[0] : ACROSS_ROLES;
};

export const groupLabel = (view: View, key: string) =>
  view === "career" ? (ERAS.find((e) => e.key === key)?.label ?? key) : key;

/** Whether a node belongs to a theme (any of its themes) or an era. Practices stay under "Across roles", not each company they touched. */
export const inGroup = (view: View, key: string, node: MapNode) =>
  view === "career" ? eraOf(node) === key : node.themes.includes(key);
