export const knowledgeGraphRoot: string;
export const publicDataPath: string;
export const THEME_GROUPS: Record<string, string[]>;
export const OTHER_THEME: string;
export function loadKnowledgeGraph(): Promise<Record<string, unknown>[]>;
export function buildPublicData(nodes: Record<string, unknown>[]): { themes: string[]; nodes: Record<string, unknown>[] };
export function writePublicData(nodes?: Record<string, unknown>[]): Promise<{ themes: string[]; nodes: Record<string, unknown>[] }>;
export function updateKnowledgeGraphFile(
  id: string,
  update: { publish?: string; publicSummary?: string; publicResult?: string },
): Promise<{ nodes: Record<string, unknown>[]; publicData: { themes: string[]; nodes: Record<string, unknown>[] } }>;
