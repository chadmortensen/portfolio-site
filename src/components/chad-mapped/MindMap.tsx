import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { ArrowLeft, X, ZoomIn, ZoomOut } from "lucide-react";
import { formatYears, nodeMeta, type MapNode } from "./types";
import { ACROSS_ROLES, ERAS, eraOf, groupLabel, inGroup, type View } from "./groups";
import type { MindMap3DHandle } from "./MindMap3D";
import "./chad-mapped.css";

// three.js only loads when someone opens the 3D view.
const MindMap3D = lazy(() => import("./MindMap3D"));

type Layout = "map" | "list";
type ViewBox = { x: number; y: number; w: number; h: number };

type MindMapProps<T extends MapNode> = {
  nodes: T[];
  themes: string[];
  title: string;
  subtitle: string;
  controls?: ReactNode;
  note?: ReactNode;
  intro: ReactNode | ((view: View) => ReactNode);
  empty?: ReactNode;
  /** Show eras with nothing in them yet (useful privately, not on the public page). */
  showEmptyEras?: boolean;
  renderDetail: (node: T, related: T[], select: (id: string) => void) => ReactNode;
  /** Open on a view with a role or theme already picked, e.g. from a home page link. */
  initialView?: View;
  initialGroup?: string | null;
};

type Sector = { key: string; label: string; sub: string; items: MapNode[] };

const VIEW_LABELS: Record<View, string> = { career: "Career", theme: "Themes", "3d": "3D" };

type Dot = { x: number; y: number; d: number };
const MORPH_MS = 750;
const ENTER_MS = 2800;
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/** Entrance delay for one element, read by the CSS animations. */
const delay = (seconds: number) => ({ "--d": `${seconds.toFixed(2)}s` }) as CSSProperties;

const truncate = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
const byYear = (a: MapNode, b: MapNode) => (a.years[0] ?? 0) - (b.years[0] ?? 0);
const byYearDesc = (a: MapNode, b: MapNode) => byYear(b, a);

function buildSectors(nodes: MapNode[], view: View, themes: string[], showEmptyEras: boolean): Sector[] {
  if (view === "career") {
    // Most recent role first, working back in time; stories within a role run newest to oldest too.
    const eras = [...ERAS].reverse().map((e) => ({ key: e.key, label: e.label, sub: e.years, items: nodes.filter((n) => eraOf(n) === e.key).sort(byYearDesc) }));
    const across = { key: ACROSS_ROLES, label: ACROSS_ROLES, sub: "practices & themes", items: nodes.filter((n) => eraOf(n) === ACROSS_ROLES) };
    return [...eras, across].filter((s) => s.items.length || (showEmptyEras && s.key !== ACROSS_ROLES));
  }
  return themes
    .map((theme) => {
      const items = nodes.filter((n) => n.themes[0] === theme).sort(byYear);
      return { key: theme, label: theme, sub: String(items.length), items };
    })
    .filter((s) => s.items.length);
}

/* Themes view: themes branch left and right of the centre, and their stories stack in columns with level labels. */
const BR_HUB_OUT = 290; // outer edge of the theme boxes, either side of the centre
const BR_LEAF_X = 330; // story dots
const BR_CHARS = 38;
const BR_CHAR_W = 7.2; // average width of a 14px label character
const BR_LINE = 17;
const BR_HUB_H = 44; // a theme needs at least this much height for its box

type BranchHub = Sector & { x: number; y: number; w: number; dir: 1 | -1 };
type BranchLeaf = { node: MapNode; x: number; y: number; dir: 1 | -1; lines: string[]; hub: BranchHub; open: boolean };
const BR_DOT_STEP = 17; // between the dots of a closed theme

/** How much the Themes view shows at once. TEMP: switchable from the URL while options are compared. */
type ThemeMode = "full" | "quiet" | "demand" | "short" | "roomy";
/* TEMP: draft short labels for the "short" option; these would move into the story data. */
const SHORT: Record<string, string> = {
  "actionable-north-star-vision": "Actionable north-star vision",
  "career-framework-and-growth-plans": "Career frameworks",
  "elevating-design-quality": "Elevating design quality",
  "experimentation-and-testing": "Experimentation and testing",
  "prioritization-frameworks": "Prioritization frameworks",
  "research-backed-design-principles": "Research-backed principles",
  "brightside-analytics-assistant-gpt": "Self-serve analytics assistant",
  "brightside-coaching-designer-strategic-vision": "Coaching toward a long-term vision",
  "brightside-deferred-medical-history-experiment": "Shorter signup experiment",
  "brightside-intake-terminology": "In-the-moment signup help",
  "brightside-intake-trust-reframe": "Intake built around trust",
  "brightside-redefining-velocity-with-engineering": "Redefining velocity",
  "brightside-research-waiver-legal": "Privacy-safe research framework",
  "etsy-adaptive-search-buy-in": "Buy-in for adaptive search",
  "etsy-coaching-manager-critique-conflict": "Coaching through a critique conflict",
  "etsy-delivery-estimate-ranges": "Honest delivery estimates",
  "etsy-expanded-scope-strategic-partnership": "From support to strategic partner",
  "etsy-fulfillment-vision-workshop": "Etsy fulfillment vision",
  "etsy-outcome-roadmap-infra-vs-features": "Aligning on shared outcomes",
  "succeed-ibuilder-guided-shop-setup": "Guided shop setup",
  "vegas-com-white-label-booking-sites": "White-label booking sites",
  "visitalk-click-to-call-directory": "Find a name, click call",
  "walmart-baby-registry-redesign": "Baby registry in one quarter",
  "walmart-unified-cart-fulfillment": "Untangling shipping and pickup",
};
const THEME_MODE: ThemeMode = ((typeof window !== "undefined" && new URLSearchParams(window.location.search).get("t")) || "full") as ThemeMode;

const hubWidth = (label: string, sub: string) => Math.max(label.length * 7.7, sub.length * 6.6) + 28;

function useBranchLayout(sectors: Sector[], openKey: string | null) {
  return useMemo(() => {
    const chars = THEME_MODE === "quiet" ? 44 : THEME_MODE === "short" ? 34 : BR_CHARS;
    const BR_ROW_GAP = THEME_MODE === "short" ? 19 : THEME_MODE === "roomy" ? 24 : 10;
    const BR_GROUP_GAP = THEME_MODE === "short" ? 44 : THEME_MODE === "roomy" ? 56 : 30;
    const groups = sectors.map((sector) => {
      const open = THEME_MODE !== "demand" || sector.key === openKey;
      const lines = sector.items.map((n) => (THEME_MODE === "short" ? [SHORT[n.id] ?? truncate(n.title, chars)] : wrapTitle(n.title, chars, THEME_MODE === "quiet" ? 1 : 3)));
      const raw = lines.reduce((sum, l) => sum + l.length * BR_LINE + BR_ROW_GAP, 0) - BR_ROW_GAP;
      return { sector, lines, raw, open, full: Math.max(raw, BR_HUB_H), h: open ? Math.max(raw, BR_HUB_H) : BR_HUB_H };
    });
    // Balance the two columns: the tallest themes are placed first, each on the shorter side, then each column
    // keeps the usual theme order from top to bottom.
    const sides: (typeof groups)[] = [[], []];
    const heights = [0, 0];
    // Balanced on the themes' full heights, so a theme never changes sides when it opens.
    const weights = [0, 0];
    [...groups].sort((a, b) => b.full - a.full).forEach((g) => {
      const side = weights[0] <= weights[1] ? 0 : 1;
      sides[side].push(g);
      weights[side] += g.full + BR_GROUP_GAP;
      heights[side] += g.h + BR_GROUP_GAP;
    });
    sides.forEach((column) => column.sort((a, b) => groups.indexOf(a) - groups.indexOf(b)));
    const hubs: BranchHub[] = [];
    const leaves: BranchLeaf[] = [];
    sides.forEach((column, si) => {
      const dir = si ? -1 : 1;
      let y = -(heights[si] - BR_GROUP_GAP) / 2;
      column.forEach(({ sector, lines, raw, h, open }) => {
        const w = hubWidth(sector.label, sector.sub);
        const hub: BranchHub = { ...sector, x: dir * (BR_HUB_OUT - w / 2), y: y + h / 2, w, dir };
        hubs.push(hub);
        let row = y + (h - raw) / 2;
        sector.items.forEach((node, j) => {
          if (!open) {
            // A closed theme keeps its stories as a short row of dots beside it.
            leaves.push({ node, x: dir * (BR_HUB_OUT + 20 + j * BR_DOT_STEP), y: hub.y, dir, lines: [truncate(node.title, 48)], hub, open });
            return;
          }
          const height = lines[j].length * BR_LINE;
          leaves.push({ node, x: dir * BR_LEAF_X, y: row + height / 2 - BR_LINE / 2 + 4, dir, lines: lines[j], hub, open });
          row += height + BR_ROW_GAP;
        });
        y += h + BR_GROUP_GAP;
      });
    });
    const reach = BR_LEAF_X + 14 + chars * BR_CHAR_W;
    // Framed for the tallest state (the biggest theme open), so opening a theme never moves the camera.
    const grow = sides.map((column) => Math.max(0, ...column.map((g) => g.full - BR_HUB_H)));
    const closed = sides.map((column) => column.length * (BR_HUB_H + BR_GROUP_GAP));
    const half = THEME_MODE === "demand" ? Math.max(closed[0] + grow[0], closed[1] + grow[1]) / 2 : Math.max(...heights, 0) / 2;
    return { hubs, leaves, chars, bounds: { minX: -reach, maxX: reach, minY: -half - 20, maxY: half + 20 } };
  }, [sectors, openKey]);
}

/** Related stories: an arc that bows in toward the themes within a column, or swings through the middle between columns. */
const chord = (a: { x: number; y: number; dir: number }, b: { x: number; y: number; dir: number }) => {
  const midY = (a.y + b.y) / 2;
  const cx = a.dir === b.dir ? a.x - a.dir * (40 + Math.abs(a.y - b.y) * 0.45) : 0;
  const cy = a.dir === b.dir ? midY : midY * 0.4;
  return `M${a.x} ${a.y}Q${cx} ${cy} ${b.x} ${b.y}`;
};

/** A curve that leaves `from` and arrives at `to` travelling sideways, like a mind-map branch. */
const branch = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
  const mid = (x1 + x2) / 2;
  return `M${x1} ${y1}C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`;
};

/* Career view: roles sit on one horizontal axis, newest on the left, and their stories branch above and below it. */
const TL_STEP = 110; // between neighbouring stems (they alternate sides)
const TL_SAME_SIDE = 225; // room for a label before the next stem on the same side
const TL_STEMS = [96, 178]; // stem lengths, alternated per side so the branches stagger
const TL_CHARS = 27;
const TL_LINE = 15;
const TL_NECK = 72; // where the label box narrows into the line
const TL_BOX = 38; // half the label box height
const TL_LABEL = 210; // room after the last stem for its label
const TL_GAP = 26; // between role segments

type TimelineRole = Sector & { title: string; years: string; x: number; w: number; across: boolean; start: number; end: number };
type TimelineStory = { node: MapNode; x: number; y: number; lines: string[] };
type TimelinePlaceholder = { key: string; x: number; y: number };

function wrapTitle(text: string, max = TL_CHARS, rows = 3) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && (line + " " + word).length > max) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  if (lines.length > rows) {
    lines.length = rows;
    const last = lines[rows - 1];
    lines[rows - 1] = last.length < max ? `${last}…` : truncate(last, max);
  }
  return lines;
}

function useTimelineLayout(sectors: Sector[]) {
  return useMemo(() => {
    const roles: TimelineRole[] = [];
    const stories: TimelineStory[] = [];
    const placeholders: TimelinePlaceholder[] = [];
    const lastOnSide = [-Infinity, -Infinity]; // [above, below]
    const turns = [0, 0];
    let cursor = 0;
    let side = 0;
    const place = (from: number) => {
      const x = Math.max(from, lastOnSide[side] + TL_SAME_SIDE);
      lastOnSide[side] = x;
      const length = TL_STEMS[turns[side]++ % TL_STEMS.length];
      const y = side === 0 ? -length : length;
      side = 1 - side;
      return { x, y };
    };
    sectors.forEach((sector) => {
      const across = sector.key === ACROSS_ROLES;
      if (across) cursor += 50;
      const era = ERAS.find((e) => e.key === sector.key);
      const title = era?.title ?? "";
      const years = era ? `${era.start}–${era.end}` : sector.sub;
      // The label box is sized to its longest line; its right side narrows into the role's line.
      const w = Math.max(sector.label.length * 8.6, title.length * 7, years.length * 6.6) + 32;
      const segStart = cursor;
      roles.push({ ...sector, title, years, x: segStart, w, across, start: segStart + w + TL_NECK, end: segStart });
      // Each role is as long as its stories need.
      const first = segStart + w + TL_NECK + 36;
      let last = first;
      if (!sector.items.length) {
        const at = place(first);
        placeholders.push({ key: sector.key, ...at });
        last = at.x;
      }
      sector.items.forEach((node, i) => {
        const at = place(i ? last + TL_STEP : first);
        stories.push({ node, ...at, lines: wrapTitle(node.title) });
        last = at.x;
      });
      const segEnd = last + TL_LABEL;
      roles[roles.length - 1].end = segEnd;
      cursor = segEnd + TL_GAP;
    });
    const maxX = cursor - TL_GAP;
    const reach = TL_STEMS[TL_STEMS.length - 1];
    return { roles, stories, placeholders, bounds: { minX: -40, maxX: maxX + 40, minY: -reach - 30, maxY: reach + 3 * TL_LINE + 40 } };
  }, [sectors]);
}

export function MindMap<T extends MapNode>({ nodes, themes, title, subtitle, controls, note, intro, empty, showEmptyEras = false, renderDetail, initialView = "career", initialGroup = null }: MindMapProps<T>) {
  const [view, setView] = useState<View>(initialView);
  const [layout, setLayout] = useState<Layout>(() => (typeof window !== "undefined" && window.innerWidth < 600 ? "list" : "map"));
  const [selected, setSelected] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(initialGroup);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  // Both 2D layouts are always worked out, so a view switch can frame the next view and morph into it.
  const careerSectors = useMemo(() => buildSectors(nodes, "career", themes, showEmptyEras), [nodes, themes, showEmptyEras]);
  const themeSectors = useMemo(() => buildSectors(nodes, "theme", themes, showEmptyEras), [nodes, themes, showEmptyEras]);
  const sectors = view === "career" ? careerSectors : themeSectors;
  const timeline = useTimelineLayout(careerSectors);
  const openTheme = group && themes.includes(group) ? group : (selected && byId.get(selected)?.themes[0]) || null;
  const branches = useBranchLayout(themeSectors, openTheme);
  const { hubs, leaves } = branches;
  // The 3D view groups by theme pills or by a role picked on its timeline.
  const groupView: View = view === "3d" ? (ERAS.some((e) => e.key === group) ? "career" : "theme") : view;

  useEffect(() => {
    if (selected && !byId.has(selected)) setSelected(null);
  }, [byId, selected]);

  const relatedOf = useCallback(
    (id: string) => {
      const out = new Set((byId.get(id)?.related ?? []).filter((r) => byId.has(r)));
      nodes.forEach((n) => n.related.includes(id) && out.add(n.id));
      return out;
    },
    [byId, nodes],
  );

  const groupNodes = useMemo(() => (group ? nodes.filter((n) => inGroup(groupView, group, n)) : []), [group, groupView, nodes]);
  const focus = useMemo(() => {
    // In 3D a selected story always shows its own branch, even when picked from a theme or role.
    if (selected && (view === "3d" || !group)) return new Set([selected, ...relatedOf(selected)]);
    if (group) return new Set(groupNodes.map((n) => n.id));
    return null;
  }, [group, groupNodes, selected, relatedOf, view]);

  // Steps taken inside the detail panel (a list item or a related link), so its back button can retrace them.
  const [history, setHistory] = useState<{ selected: string | null; group: string | null }[]>([]);
  const show = useCallback(
    (id: string | null) => {
      setSelected(id);
      const node = id ? byId.get(id) : undefined;
      if (node && group && !inGroup(groupView, group, node)) setGroup(null);
    },
    [byId, group, groupView],
  );
  /** Picking something on the map (or the list layout) starts a fresh panel history. */
  const select = useCallback(
    (id: string | null) => {
      setHistory([]);
      show(id);
    },
    [show],
  );
  /** Following a link inside the panel remembers where it came from. */
  const panelSelect = useCallback(
    (id: string) => {
      if (id === selected) return;
      setHistory((h) => [...h, { selected, group }]);
      show(id);
    },
    [show, selected, group],
  );
  const back = useCallback(() => {
    const prev = history[history.length - 1];
    if (prev) {
      setHistory(history.slice(0, -1));
      setSelected(prev.selected);
      setGroup(prev.group);
    } else setSelected(null); // a story picked on the map while its role or theme was open
  }, [history]);
  const toggleGroup = useCallback((key: string) => {
    setHistory([]);
    setGroup((current) => (current === key ? null : key));
    setSelected(null);
  }, []);
  const close = useCallback(() => {
    setHistory([]);
    setSelected(null);
    setGroup(null);
  }, []);
  const changeView = (next: View) => {
    if (next === view) return;
    const morphing = layout === "map" && view !== "3d" && next !== "3d" && !prefersReducedMotion();
    if (morphing) morphFrom.current = measureDots();
    else if (next !== "3d") enter();
    setHistory([]);
    setView(next);
    setGroup(null);
    if (next !== "3d" && typeof window !== "undefined") {
      setVb(fitFor(next));
      setZoomed2d(false);
    }
  };

  /* keep the list clear of the floating title card on narrow screens */
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const top = topRef.current;
    if (!top) return;
    const observer = new ResizeObserver(() => rootRef.current?.style.setProperty("--cm-top-h", `${top.offsetHeight}px`));
    observer.observe(top);
    return () => observer.disconnect();
  }, []);

  /* pan and zoom */
  const svgRef = useRef<SVGSVGElement>(null);
  const threeRef = useRef<MindMap3DHandle>(null);
  const fitFor = useCallback((v: View): ViewBox => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (v === "career") {
      // Fit the timeline's height, start it beside the title card, and let people pan along it.
      const { minX, minY, maxY } = timeline.bounds;
      const nav = 72;
      // Opens one zoom-out step (1.25×) wider than a snug fit, so more of the timeline shows at once.
      const s = 1.25 * Math.max(0.8, (maxY - minY) / Math.max(h - nav - 120, 320));
      const left = w > 760 ? 420 : 16;
      return { x: minX - left * s, y: -(nav + (h - nav) / 2) * s + ((maxY + minY) / 2), w: w * s, h: h * s };
    }
    // Themes: centre the branches in the space beside the title card, below the navigation.
    const { minX, maxX, minY, maxY } = branches.bounds;
    const nav = 72;
    const left = w > 760 ? 432 : 0;
    const top = w > 760 ? nav : nav + 56;
    const freeW = Math.max(w - left - 16, 320);
    const freeH = Math.max(h - top - 40, 320);
    const s = THEME_MODE === "roomy" ? Math.max((maxX - minX + 60) / freeW, 0.9) : Math.max((maxX - minX + 60) / freeW, (maxY - minY + 60) / freeH, 0.6);
    const cx = left + freeW / 2;
    const cy = top + freeH / 2;
    // Roomy: taller than the window, so it opens at the top and scrolls down.
    if (THEME_MODE === "roomy" && (maxY - minY + 60) / s > freeH) return { x: (minX + maxX) / 2 - cx * s, y: minY - 30 - top * s, w: w * s, h: h * s };
    return { x: (minX + maxX) / 2 - cx * s, y: (minY + maxY) / 2 - cy * s, w: w * s, h: h * s };
  }, [timeline.bounds, branches.bounds]);
  const fit = useCallback(() => fitFor(view), [fitFor, view]);
  const [vb, setVb] = useState<ViewBox>(() => (typeof window === "undefined" ? { x: -800, y: -450, w: 1600, h: 900 } : fit()));
  useEffect(() => {
    const onResize = () => {
      setVb(fit());
      setZoomed2d(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fit]);
  const drag = useRef<{ x: number; y: number; vb: ViewBox; moved: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  // Reset stays dimmed until the visitor zooms; each view tracks its own.
  const [zoomed2d, setZoomed2d] = useState(false);
  const [zoomed3d, setZoomed3d] = useState(false);
  const zoom = (factor: number, cx?: number, cy?: number) => {
    setZoomed2d(true);
    setVb((v) => {
      const nx = cx ?? v.x + v.w / 2;
      const ny = cy ?? v.y + v.h / 2;
      const w = Math.min(Math.max(v.w * factor, 300), view === "career" ? Math.max(2800, timeline.bounds.maxX * 1.2) : 2800);
      const k = w / v.w;
      return { x: nx - (nx - v.x) * k, y: ny - (ny - v.y) * k, w, h: v.h * k };
    });
  };

  const showSvg = view !== "3d" && layout === "map";
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (view === "theme" && THEME_MODE === "roomy" && !e.ctrlKey) {
        const rect = svg.getBoundingClientRect();
        setVb((v) => ({ ...v, y: v.y + e.deltaY * Math.max(v.w / rect.width, v.h / rect.height) }));
        return;
      }
      if (view === "career" && !e.ctrlKey) {
        // The timeline reads left to right, so scrolling moves along it; pinch (or ctrl + scroll) zooms.
        const rect = svg.getBoundingClientRect();
        setVb((v) => {
          const s = Math.max(v.w / rect.width, v.h / rect.height);
          const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
          return { ...v, x: v.x + delta * s };
        });
        return;
      }
      const point = svg.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
      const p = point.matrixTransform(svg.getScreenCTM()?.inverse());
      zoom(Math.exp(e.deltaY * 0.0015), p.x, p.y);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- zoom only reads state setters
  }, [showSvg, view, timeline.bounds]);

  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    drag.current = { x: e.clientX, y: e.clientY, vb, moved: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const s = Math.max(d.vb.w / rect.width, d.vb.h / rect.height);
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    d.moved = Math.max(d.moved, Math.abs(dx) + Math.abs(dy));
    if (d.moved > 4) setDragging(true);
    setVb({ ...d.vb, x: d.vb.x - dx * s, y: d.vb.y - dy * s });
  };
  const onPointerUp = (e: PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (!d || d.moved >= 5) return;
    const hit = document.elementsFromPoint(e.clientX, e.clientY);
    const leaf = hit.map((el) => el.closest?.("[data-leaf]")).find(Boolean) as HTMLElement | undefined;
    const hub = hit.map((el) => el.closest?.("[data-hub]")).find(Boolean) as HTMLElement | undefined;
    if (leaf) select(leaf.dataset.leaf === selected ? null : leaf.dataset.leaf!);
    else if (hub) toggleGroup(hub.dataset.hub!);
    else close();
  };
  const onKey = (e: KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const leafPos = useMemo(() => new Map(leaves.map((l) => [l.node.id, l])), [leaves]);
  const chords = selected && !group && view !== "career" ? [...relatedOf(selected)].map((id) => [leafPos.get(selected), leafPos.get(id)] as const).filter(([a, b]) => a && b) : [];
  const selectedNode = selected ? byId.get(selected) : undefined;
  const active = Boolean(selectedNode || group);
  const canGoBack = history.length > 0 || Boolean(selectedNode && group);
  const backTo = history.length ? history[history.length - 1] : { selected: null, group };
  const backLabel = `Back to ${backTo.selected ? (byId.get(backTo.selected)?.title ?? "previous") : backTo.group ? groupLabel(ERAS.some((e) => e.key === backTo.group) ? "career" : "theme", backTo.group) : "previous"}`;
  const nodeDim = (id: string) => (focus && !focus.has(id) ? " is-dim" : "");
  const hubDim = (key: string) => Boolean(focus && !nodes.some((n) => focus.has(n.id) && inGroup("theme", key, n)));

  /* Morph: switching between Career and Themes slides each story dot from its old spot to its new one. */
  const morphFrom = useRef<Map<string, Dot> | null>(null);
  const [morph, setMorph] = useState<{ id: string; from: Dot; to: Dot }[] | null>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  function measureDots() {
    const out = new Map<string, Dot>();
    svgRef.current?.querySelectorAll<SVGGElement>("[data-leaf]").forEach((g) => {
      const circle = g.querySelector("circle");
      if (!circle) return;
      const r = circle.getBoundingClientRect();
      out.set(g.dataset.leaf!, { x: r.left + r.width / 2, y: r.top + r.height / 2, d: r.width });
    });
    return out;
  }
  useLayoutEffect(() => {
    const from = morphFrom.current;
    morphFrom.current = null;
    if (!from) return;
    const list = [...measureDots()].flatMap(([id, to]) => {
      const start = from.get(id);
      return start ? [{ id, from: start, to }] : [];
    });
    setMorph(list.length ? list : null);
  }, [view]);
  useLayoutEffect(() => {
    if (!morph) return;
    const dots = [...(morphRef.current?.children ?? [])] as HTMLElement[];
    const animations = dots.map((el, i) => {
      const { from, to } = morph[i];
      return el.animate(
        [{ transform: `translate(${from.x}px, ${from.y}px) scale(${from.d / to.d})` }, { transform: `translate(${to.x}px, ${to.y}px) scale(1)` }],
        { duration: MORPH_MS, delay: i * 12, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "both" },
      );
    });
    let cancelled = false;
    Promise.all(animations.map((a) => a.finished))
      .then(() => !cancelled && setMorph(null))
      .catch(() => {});
    return () => {
      cancelled = true;
      animations.forEach((a) => a.cancel());
    };
  }, [morph]);

  /* Entrance: the map draws itself in when the page opens, or when a view appears without a morph. */
  const [entering, setEntering] = useState(() => (prefersReducedMotion() ? 0 : 1)); // a count, so each entrance restarts the timer
  function enter() {
    if (!prefersReducedMotion()) setEntering((n) => n + 1);
  }
  useEffect(() => {
    if (!entering) return;
    const t = window.setTimeout(() => setEntering(0), ENTER_MS);
    return () => window.clearTimeout(t);
  }, [entering]);

  const itemButton = (node: T, inPanel = false) => (
    <button key={node.id} type="button" className="cm-item" aria-current={node.id === selected || undefined} onClick={() => (inPanel ? panelSelect(node.id) : select(node.id))}>
      {node.title}
      <small>{nodeMeta(node)}</small>
    </button>
  );

  return (
    <div className={`chad-mapped${active && nodes.length ? " has-details" : ""}${entering ? " is-entering" : ""}${morph ? " is-morphing" : ""}`} ref={rootRef}>
      {morph && (
        <div className="cm-morph" ref={morphRef} aria-hidden="true">
          {morph.map((m) => (
            <span key={m.id} className={`${m.id === selected ? "is-selected" : ""}${nodeDim(m.id)}`} style={{ width: m.to.d, height: m.to.d, marginLeft: -m.to.d / 2, marginTop: -m.to.d / 2 }} />
          ))}
        </div>
      )}
      {view === "3d" ? (
        <Suspense fallback={<p className="cm-loading">Loading the 3D view…</p>}>
          <MindMap3D ref={threeRef} nodes={nodes} themes={themes} selected={selected} group={group} focus={focus} onSelect={select} onGroup={toggleGroup} onClear={close} onUserZoom={() => setZoomed3d(true)} />
        </Suspense>
      ) : layout === "map" ? (
        <svg
          ref={svgRef}
          className={`cm-svg${dragging ? " is-dragging" : ""}`}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          role="group"
          aria-label={view === "career" ? "Mind map of career eras and stories" : "Mind map of themes and stories"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {view === "career" ? (
            <TimelineMap layout={timeline} nodes={nodes} focus={focus} selected={selected} group={group} onKey={onKey} select={select} toggleGroup={toggleGroup} />
          ) : (
          <g className={`cm-br is-${THEME_MODE}`}>
          <g>
            {hubs.map((h, i) => (
              <path key={h.key} className={`cm-edge cm-trunk${hubDim(h.key) ? " is-dim" : ""}`} pathLength={1} style={delay(0.15 + i * 0.07)} d={branch([h.dir * 36, 0], [h.x - (h.dir * h.w) / 2, h.y])} />
            ))}
            {leaves.filter((l) => l.open).map((l, i) => (
              <path key={l.node.id} className={`cm-edge cm-twig${nodeDim(l.node.id)}`} pathLength={1} style={delay(0.55 + i * 0.035)} d={branch([l.hub.x + (l.dir * l.hub.w) / 2, l.hub.y], [l.x, l.y])} />
            ))}
          </g>
          <g>
            {chords.map(([a, b]) => (
              <path key={b!.node.id} className="cm-chord" d={chord(a!, b!)} />
            ))}
          </g>
          <g>
            {leaves.map((l, i) => {
              const isSel = l.node.id === selected;
              const tx = l.open ? l.x + l.dir * 14 : l.x - l.dir * 6;
              const ty = l.open ? l.y + 4 - ((l.lines.length - 1) * BR_LINE) / 2 : l.y - 16;
              const labelW = branches.chars * BR_CHAR_W;
              return (
                <g
                  key={l.node.id}
                  className={`cm-leaf cm-br-leaf${l.open ? "" : " is-closed"}${nodeDim(l.node.id)}${isSel ? " is-selected" : ""}`}
                  data-leaf={l.node.id}
                  style={delay(0.8 + i * 0.035)}
                  tabIndex={0}
                  role="button"
                  aria-label={l.node.title}
                  onKeyDown={(e) => onKey(e, () => select(l.node.id))}
                >
                  <circle cx={l.x} cy={l.y} r={isSel ? 8 : 6} />
                  <text x={tx} y={ty} textAnchor={l.dir > 0 ? "start" : "end"}>
                    {l.lines.map((line, j) => (
                      <tspan key={j} x={tx} dy={j ? BR_LINE : 0}>{line}</tspan>
                    ))}
                  </text>
                  {/* a wider, invisible target so the whole label is easy to click */}
                  {l.open ? (
                    <rect className="cm-tl-hit" x={l.dir > 0 ? l.x - 10 : l.x - 14 - labelW} y={ty - 14} width={labelW + 24} height={l.lines.length * BR_LINE + 12} />
                  ) : (
                    <rect className="cm-tl-hit" x={l.x - BR_DOT_STEP / 2} y={l.y - 14} width={BR_DOT_STEP} height={28} />
                  )}
                </g>
              );
            })}
          </g>
          <g>
            {hubs.map((h, i) => (
              <g
                key={h.key}
                className={`cm-hub cm-br-hub is-${THEME_MODE}${group === h.key ? " is-on" : ""}${hubDim(h.key) ? " is-dim" : ""}`}
                data-hub={h.key}
                style={delay(0.3 + i * 0.07)}
                transform={`translate(${h.x} ${h.y})`}
                tabIndex={0}
                role="button"
                aria-label={`Theme: ${h.label}`}
                onKeyDown={(e) => onKey(e, () => toggleGroup(h.key))}
              >
                <rect x={-h.w / 2} y={-22} width={h.w} height={44} rx={11} />
                <text textAnchor="middle" y={THEME_MODE === "full" ? -1 : 5}>{h.label}</text>
                {THEME_MODE === "full" && <text className="cm-count" textAnchor="middle" y={14}>{h.sub}</text>}
              </g>
            ))}
          </g>
          <g className="cm-me">
            <circle r={36} />
            <text textAnchor="middle" y={6}>Chad</text>
          </g>
          </g>
          )}
        </svg>
      ) : (
        <div className={`cm-list${active ? " has-panel" : ""}`}>
          {sectors.map((s) => (
            <section key={s.key}>
              <h2>
                {s.label}
                <span>{view === "career" ? s.sub : s.items.length}</span>
              </h2>
              {s.items.length ? (s.items as T[]).map((n) => itemButton(n)) : <p className="cm-muted cm-small">No stories yet</p>}
            </section>
          ))}
        </div>
      )}

      <div className="cm-card cm-top" ref={topRef}>
        <div className="cm-heading">
          <h1>{title}</h1>
          <p className="cm-sub">{subtitle}</p>
        </div>
        <div className="cm-controls">
          {controls}
          <div className="cm-seg" role="group" aria-label="View">
            {(Object.keys(VIEW_LABELS) as View[]).map((v) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => changeView(v)}>{VIEW_LABELS[v]}</button>
            ))}
          </div>
          {view !== "3d" && (
            <div className="cm-seg" role="group" aria-label="Layout">
              <button type="button" aria-pressed={layout === "map"} onClick={() => { if (layout !== "map") enter(); setLayout("map"); }}>Map</button>
              <button type="button" aria-pressed={layout === "list"} onClick={() => setLayout("list")}>List</button>
            </div>
          )}
        </div>
        {note && <div className="cm-top-note">{note}</div>}
      </div>

      {view === "3d" && nodes.length > 0 && (
        <nav className={`cm-card cm-timeline${active ? " has-panel" : ""}`} aria-label="Career timeline">
          {ERAS.map((era) => {
            const count = nodes.filter((n) => inGroup("career", era.key, n)).length;
            const lit = group === era.key || Boolean(selectedNode?.companies.includes(era.key));
            return (
              <button
                key={era.key}
                type="button"
                style={{ flexGrow: era.end - era.start }}
                className={lit ? "is-lit" : undefined}
                aria-pressed={group === era.key}
                disabled={!count}
                title={count ? `${count} ${count === 1 ? "entry" : "entries"}` : "No stories yet"}
                onClick={() => toggleGroup(era.key)}
              >
                <span className="cm-timeline-bar" />
                {era.key}
                <small>{era.years}</small>
              </button>
            );
          })}
        </nav>
      )}

      {(showSvg || view === "3d") && (
        <div className="cm-zoom" role="group" aria-label="Zoom">
          <button type="button" aria-label="Zoom out" title="Zoom out" onClick={() => (view === "3d" ? (threeRef.current?.zoom(1.25), setZoomed3d(true)) : zoom(1.25))}><ZoomOut size={20} strokeWidth={2.25} /></button>
          <button
            type="button"
            aria-label="Reset zoom"
            title="Reset zoom"
            disabled={view === "3d" ? !zoomed3d : !zoomed2d}
            onClick={() => {
              if (view === "3d") {
                threeRef.current?.reset();
                setZoomed3d(false);
              } else {
                setVb(fit());
                setZoomed2d(false);
              }
            }}
          ><ZoomReset /></button>
          <button type="button" aria-label="Zoom in" title="Zoom in" onClick={() => (view === "3d" ? (threeRef.current?.zoom(0.8), setZoomed3d(true)) : zoom(0.8))}><ZoomIn size={20} strokeWidth={2.25} /></button>
        </div>
      )}

      {!nodes.length && empty ? (
        <div className="cm-card cm-detail cm-intro">{empty}</div>
      ) : active ? (
        <aside className={`cm-card cm-detail${canGoBack ? " has-back" : ""}${selectedNode ? "" : " is-group"}`} aria-live="polite" aria-label="Details">
          <div className="cm-panel-nav">
            {canGoBack && (
              <button type="button" className="cm-back" aria-label={backLabel} title={backLabel} onClick={back}><ArrowLeft size={16} /></button>
            )}
            <button type="button" className="cm-close" aria-label="Close details" onClick={close}><X size={16} /></button>
          </div>
          {selectedNode ? (
            renderDetail(selectedNode, [...relatedOf(selectedNode.id)].map((id) => byId.get(id)!).filter(Boolean), panelSelect)
          ) : (
            <>
              <p className="cm-eyebrow">{groupView === "career" ? eraEyebrow(view, ERAS.find((e) => e.key === group)) : "Theme"}</p>
              <h2>{groupLabel(groupView, group!)}</h2>
              <p className="cm-muted">
                {groupNodes.length} {groupNodes.length === 1 ? "entry" : "entries"}
                {groupView === "theme" ? ` across ${new Set(groupNodes.flatMap((n) => n.companies)).size} companies.` : "."}
              </p>
              <div>{(groupNodes as T[]).map((n) => itemButton(n, true))}</div>
            </>
          )}
        </aside>
      ) : (
        <div className="cm-card cm-detail cm-intro">{typeof intro === "function" ? intro(view) : intro}</div>
      )}
    </div>
  );
}

export function RelatedList<T extends MapNode>({ related, select }: { related: T[]; select: (id: string) => void }) {
  if (!related.length) return null;
  return (
    <div>
      <h3>Related</h3>
      {related.map((node) => (
        <button key={node.id} type="button" className="cm-item" onClick={() => select(node.id)}>
          {node.title}
          <small>{nodeMeta(node)}</small>
        </button>
      ))}
    </div>
  );
}

/* Magnifier with a "1", drawn on lucide's 24px grid to match ZoomIn and ZoomOut. */
function ZoomReset() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M9.6 8.6 11.4 7.4V14.6" />
    </svg>
  );
}

type TimelineMapProps = {
  layout: ReturnType<typeof useTimelineLayout>;
  nodes: MapNode[];
  focus: Set<string> | null;
  selected: string | null;
  group: string | null;
  onKey: (e: KeyboardEvent, action: () => void) => void;
  select: (id: string) => void;
  toggleGroup: (key: string) => void;
};

const eraEyebrow = (view: View, era?: (typeof ERAS)[number]) => {
  if (!era) return view === "3d" ? "Era" : "Role";
  return view === "3d" ? `Era · ${era.years}` : `${era.title ?? "Role"} · ${era.start}–${era.end}`;
};

/** A rounded box whose top and bottom edges curve in and meet the timeline at the right. */
function roleShape(w: number) {
  const h = TL_BOX;
  const r = 12;
  const n = TL_NECK;
  return [
    `M${w} ${-h}H${r}Q0 ${-h} 0 ${-h + r}V${h - r}Q0 ${h} ${r} ${h}H${w}`,
    `C${w + n * 0.6} ${h} ${w + n * 0.35} 0 ${w + n} 0`,
    `C${w + n * 0.35} 0 ${w + n * 0.6} ${-h} ${w} ${-h}Z`,
  ].join("");
}

function TimelineMap({ layout, nodes, focus, selected, group, onKey, select, toggleGroup }: TimelineMapProps) {
  const { roles, stories, placeholders } = layout;
  const dim = (id: string) => (focus && !focus.has(id) ? " is-dim" : "");
  const roleDim = (key: string) => Boolean(focus && !nodes.some((n) => focus.has(n.id) && inGroup("career", key, n)));
  // The entrance runs left to right: things further along the line start a little later.
  const at = (x: number) => delay(0.1 + (Math.min(Math.max(x, 0), 2600) / 2600) * 1.3);
  return (
    <g className="cm-tl">
      {roles.map((r) => (
        <path
          key={r.key}
          className={`cm-tl-seg${group === r.key ? " is-on" : ""}${r.across ? " is-across" : ""}${roleDim(r.key) ? " is-dim" : ""}`}
          data-hub={r.key}
          d={`M${r.start} 0H${r.end}`}
          pathLength={r.across ? undefined : 1}
          style={at(r.start)}
        />
      ))}
      {placeholders.map((p) => (
        <g key={p.key} className={`cm-placeholder${focus ? " is-dim" : ""}`}>
          <path className="cm-edge is-empty" d={`M${p.x} 0V${p.y}`} />
          <circle cx={p.x} cy={p.y} r={5} />
          <text x={p.x + 12} y={p.y + 4}>No stories yet</text>
        </g>
      ))}
      {stories.map((s) => {
        const isSel = s.node.id === selected;
        const up = s.y < 0;
        const textY = s.y + 4;
        return (
          <g key={s.node.id} className={`cm-leaf${up ? " is-up" : ""}${dim(s.node.id)}${isSel ? " is-selected" : ""}`} style={at(s.x - 60)} data-leaf={s.node.id} tabIndex={0} role="button" aria-label={s.node.title} onKeyDown={(e) => onKey(e, () => select(s.node.id))}>
            <path className="cm-edge" d={`M${s.x} ${up ? -4 : 4}V${s.y}`} />
            <circle cx={s.x} cy={s.y} r={isSel ? 8 : 6} />
            <text x={s.x + 13} y={textY}>
              {s.lines.map((line, i) => (
                <tspan key={i} x={s.x + 13} dy={i ? TL_LINE : 0}>{line}</tspan>
              ))}
              <tspan className="cm-tl-year" x={s.x + 13} dy={TL_LINE}>{formatYears(s.node.years) || "Across roles"}</tspan>
            </text>
            {/* a wider, invisible target so the whole label is easy to click */}
            <rect className="cm-tl-hit" x={s.x - 10} y={s.y - 12} width={210} height={(s.lines.length + 1) * TL_LINE + 14} />
          </g>
        );
      })}
      {roles.map((r) => {
        const isDim = roleDim(r.key);
        return (
          <g
            key={r.key}
            className={`cm-hub${group === r.key ? " is-on" : ""}${isDim ? " is-dim" : ""}${r.across ? " is-across" : ""}`}
            data-hub={r.key}
            style={at(r.x - 40)}
            transform={`translate(${r.x} 0)`}
            tabIndex={0}
            role="button"
            aria-label={`${r.across ? "Group" : "Role"}: ${[r.label, r.title, r.years].filter(Boolean).join(", ")}`}
            onKeyDown={(e) => onKey(e, () => toggleGroup(r.key))}
          >
            <path d={roleShape(r.w)} />
            <text className="cm-tl-company" x={18} y={r.title ? -9 : -1}>{r.label}</text>
            {r.title && <text className="cm-tl-title" x={18} y={9}>{r.title}</text>}
            <text className="cm-tl-years" x={18} y={r.title ? 25 : 16}>{r.years}</text>
          </g>
        );
      })}
    </g>
  );
}
