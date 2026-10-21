export type MapNode = {
  id: string;
  title: string;
  type: string;
  companies: string[];
  years: number[];
  themes: string[];
  related: string[];
};

export type PublicNode = MapNode & {
  role: string;
  summary: string;
  result: string;
  answers: string[];
};

export type PublicData = {
  themes: string[];
  nodes: PublicNode[];
};

export type PrivateNode = MapNode & {
  role: string;
  tags: string[];
  competencies: string[];
  answers: string[];
  outcomes: string[];
  metrics: string[];
  summary: string;
  lesson: string;
  status: string;
  confidence: string;
  gaps: string[];
  sources: string[];
  publish: "draft" | "approved" | "private";
  publishable: boolean;
  publicSummary: string;
  publicResult: string;
};

export const TYPE_LABELS: Record<string, string> = {
  story: "Story",
  practice: "Practice",
  project: "Project",
  leadership: "Leadership note",
  career: "Career note",
  timeline: "Timeline",
  theme: "Theme note",
};

export const formatYears = (years: number[]) => {
  if (!years.length) return "";
  const first = years[0];
  const last = years[years.length - 1];
  return first === last ? String(first) : `${first}–${last}`;
};

export const nodeMeta = (node: MapNode) =>
  [TYPE_LABELS[node.type] ?? node.type, node.companies.join(", "), formatYears(node.years)].filter(Boolean).join(" · ");
