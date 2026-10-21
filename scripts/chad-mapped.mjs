// Reads the personal-knowledge-graph repo and builds the data behind /chad-mapped.
// The public export only includes stories and practices marked `publish: approved`,
// and only the fields listed in PUBLIC_FIELDS, so draft text and source notes never ship.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const here = path.dirname(fileURLToPath(import.meta.url));
export const siteRoot = path.resolve(here, "..");
export const knowledgeGraphRoot = path.resolve(
  siteRoot,
  process.env.CHAD_MAPPED_KG_PATH ?? "../personal-knowledge-graph",
);
export const publicDataPath = path.resolve(siteRoot, "data/chad-mapped.json");

const SKIP = ["sources/", "personal/", "career/next-role", "README"];
export const PUBLISHABLE_TYPES = new Set(["story", "practice"]);

// Provisional public themes, each grouping the theme tags used in the frontmatter.
export const THEME_GROUPS = {
  "Vision & clarity": ["building-vision", "creating-clarity", "reducing-uncertainty", "clarity-under-ambiguity", "service-design"],
  "Growing designers": ["growing-designers", "mentoring", "giving-feedback", "setting-clear-expectations", "coaching-managers", "hiring-and-onboarding-managers"],
  "Aligning leaders": ["aligning-leadership", "managing-up", "strategic-partnership", "being-proactive", "prioritization"],
  "Cross-functional partnership": ["engineering-partnership", "clinical-partnership", "partnerships", "cross-functional-partnership"],
  "Research & testing": ["research-partnership", "experimentation", "optimization-and-testing"],
  "Design quality & practice": ["elevating-design-quality", "building-a-design-practice", "accessibility", "privacy-by-design"],
  "Honest expectations": ["honest-expectations"],
  "Calm under pressure": ["calm-under-pressure", "motivating-under-pressure", "leading-through-crisis", "conflict-resolution"],
  "AI in practice": ["ai-in-practice", "ai-in-product"],
};
export const OTHER_THEME = "Other notes";
const TAG_TO_THEME = Object.fromEntries(
  Object.entries(THEME_GROUPS).flatMap(([theme, tags]) => tags.map((tag) => [tag, theme])),
);

const COMPANIES = [
  ["softbank", "SoftBank"], ["itravel", "iTravel"], ["visitalk", "Visitalk"], ["succeed", "Succeed"],
  ["vegas.com", "Vegas.com"], ["pcd", "PCD Group"], ["systems technology", "STG"],
  ["walmart", "Walmart"], ["etsy", "Etsy"], ["brightside", "Brightside"],
];
const normalizeCompany = (value) => {
  const lower = String(value ?? "").toLowerCase();
  return COMPANIES.find(([key]) => lower.includes(key))?.[1];
};

const unique = (values) => [...new Set(values.filter(Boolean))];
const asList = (value) => (Array.isArray(value) ? value : value ? [value] : []);

const splitFrontmatter = (text) => {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return match ? { frontmatter: match[1], body: match[2] } : null;
};

const firstSituation = (body) => {
  const situation = body.match(/## Situation\n(.+?)\n/)?.[1];
  if (situation) return situation;
  return body.split("\n\n").map((p) => p.trim()).find((p) => p && !p.startsWith("#")) ?? "";
};

async function listMarkdown(dir, prefix = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const rel = prefix + entry.name;
    if (entry.isDirectory()) files.push(...(await listMarkdown(path.join(dir, entry.name), rel + "/")));
    else if (entry.name.endsWith(".md")) files.push(rel);
  }
  return files.sort();
}

/** Every file, with private fields, for the local editor. */
export async function loadKnowledgeGraph() {
  const files = (await listMarkdown(knowledgeGraphRoot)).filter((f) => !SKIP.some((s) => f.startsWith(s)));
  const nodes = [];
  for (const file of files) {
    const parts = splitFrontmatter(await readFile(path.join(knowledgeGraphRoot, file), "utf8"));
    if (!parts) continue;
    const fm = parse(parts.frontmatter) ?? {};
    const companies = fm.type === "timeline" ? [] : unique([
      ...asList(fm.company), ...asList(fm.companies), ...asList(fm.applied).map((a) => a?.company),
    ].map(normalizeCompany));
    const tags = asList(fm.themes);
    nodes.push({
      id: file,
      title: fm.title ?? file,
      type: fm.type ?? "note",
      companies,
      years: asList(fm.years).filter((y) => Number.isInteger(y)),
      role: fm.role ?? "",
      themes: unique(tags.map((t) => TAG_TO_THEME[t])),
      tags,
      competencies: asList(fm.competencies),
      answers: asList(fm.answers),
      outcomes: asList(fm.outcomes).map(String),
      metrics: asList(fm.metrics).map(String),
      related: unique([...asList(fm.related), ...asList(fm.evidence)]),
      summary: firstSituation(parts.body).replace(/\[GAP:[^\]]*\]/g, "").trim(),
      lesson: parts.body.match(/\*\*Lesson:\*\*\s*(.+)/)?.[1]?.trim() ?? "",
      status: fm.status ?? "",
      confidence: fm.confidence ? String(fm.confidence) : "",
      gaps: asList(fm.gaps).map((g) => (g && typeof g === "object" ? Object.values(g)[0] : g)).map(String),
      sources: asList(fm.sources).map(String),
      publish: fm.publish ?? "draft",
      publishable: PUBLISHABLE_TYPES.has(fm.type),
      publicSummary: fm.public_summary ?? "",
      publicResult: fm.public_result ?? "",
    });
  }
  const ids = new Set(nodes.map((n) => n.id));
  for (const node of nodes) {
    node.related = node.related.filter((r) => ids.has(r) && r !== node.id);
    if (!node.themes.length) node.themes = [OTHER_THEME];
  }
  return nodes;
}

/** Only approved stories and practices, and only public fields. */
export function buildPublicData(nodes) {
  const live = nodes.filter((n) => n.publishable && n.publish === "approved");
  const ids = new Set(live.map((n) => n.id));
  return {
    themes: [...Object.keys(THEME_GROUPS), OTHER_THEME],
    nodes: live.map((n) => ({
      id: n.id.replace(/^.*\//, "").replace(/\.md$/, ""),
      title: n.title,
      type: n.type,
      companies: n.companies,
      years: n.years,
      role: n.role,
      themes: n.themes,
      summary: n.publicSummary,
      result: n.publicResult,
      answers: n.answers.slice(0, 3),
      related: n.related.filter((r) => ids.has(r)).map((r) => r.replace(/^.*\//, "").replace(/\.md$/, "")),
    })),
  };
}

export async function writePublicData(nodes) {
  const data = buildPublicData(nodes ?? (await loadKnowledgeGraph()));
  await writeFile(publicDataPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  return data;
}

const yamlString = (value) => JSON.stringify(String(value).replace(/\s+/g, " ").trim());

// Replaces a top-level key (and any indented continuation lines) or inserts it before `publish:`.
function setFrontmatterKey(frontmatter, key, line) {
  const lines = frontmatter.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`${key}:`));
  if (start >= 0) {
    let end = start + 1;
    while (end < lines.length && /^\s+\S/.test(lines[end])) end++;
    lines.splice(start, end - start, ...(line ? [line] : []));
  } else if (line) {
    const at = lines.findIndex((l) => l.startsWith("publish:"));
    lines.splice(at >= 0 ? at : lines.length, 0, line);
  }
  return lines.join("\n");
}

/** Writes publish state and public text back to one markdown file. */
export async function updateKnowledgeGraphFile(id, { publish, publicSummary, publicResult }) {
  const nodes = await loadKnowledgeGraph();
  const node = nodes.find((n) => n.id === id);
  if (!node) throw new Error("That file isn’t in the knowledge graph.");
  if (publish === "approved" && !node.publishable) throw new Error("Only stories and practices can be published.");
  const filePath = path.join(knowledgeGraphRoot, id);
  const parts = splitFrontmatter(await readFile(filePath, "utf8"));
  let fm = parts.frontmatter;
  if (publicSummary !== undefined) fm = setFrontmatterKey(fm, "public_summary", publicSummary.trim() ? `public_summary: ${yamlString(publicSummary)}` : "");
  if (publicResult !== undefined) fm = setFrontmatterKey(fm, "public_result", publicResult.trim() ? `public_result: ${yamlString(publicResult)}` : "");
  if (publish !== undefined) {
    const summary = publicSummary ?? node.publicSummary;
    if (publish === "approved" && !String(summary).trim()) throw new Error("Add a public summary before publishing.");
    fm = setFrontmatterKey(fm, "publish", `publish: ${publish}`);
  }
  parse(fm); // refuse to write frontmatter that no longer parses
  await writeFile(filePath, `---\n${fm}\n---\n${parts.body}`, "utf8");
  const updated = await loadKnowledgeGraph();
  const publicData = await writePublicData(updated);
  return { nodes: updated, publicData };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const data = await writePublicData();
  console.log(`Wrote ${data.nodes.length} published entries to ${path.relative(siteRoot, publicDataPath)}`);
}
