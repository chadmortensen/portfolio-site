import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
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

const R_HUB = 200;
const R_LEAF = 370;
const MAP_W = 1420;
const MAP_H = 1360;
const VIEW_LABELS: Record<View, string> = { career: "Career", theme: "Themes", "3d": "3D" };

const truncate = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
const polar = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)];
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

function useRadialLayout(sectors: Sector[]) {
  return useMemo(() => {
    const weights = sectors.map((s) => Math.max(s.items.length, 2) + 0.7);
    const unit = (2 * Math.PI) / (weights.reduce((a, b) => a + b, 0) || 1);
    let start = -Math.PI / 2;
    const hubs: (Sector & { x: number; y: number })[] = [];
    const leaves: { node: MapNode; x: number; y: number; angle: number; hub: [number, number]; ctrl: [number, number] }[] = [];
    const placeholders: { key: string; x: number; y: number; angle: number; hub: [number, number]; ctrl: [number, number] }[] = [];
    sectors.forEach((sector, i) => {
      const span = weights[i] * unit;
      const mid = start + span / 2;
      const hub = polar(i % 2 ? R_HUB + 62 : R_HUB - 10, mid);
      const ctrl = polar((R_HUB + R_LEAF) / 2 - 10, mid);
      hubs.push({ ...sector, x: hub[0], y: hub[1] });
      const inner = span - 0.7 * unit;
      const count = sector.items.length || 1;
      const angleAt = (j: number) => start + 0.35 * unit + ((j + 0.5) * inner) / count;
      if (!sector.items.length) {
        const angle = angleAt(0);
        const [x, y] = polar(R_LEAF, angle);
        placeholders.push({ key: sector.key, x, y, angle, hub, ctrl });
      }
      sector.items.forEach((node, j) => {
        const angle = angleAt(j);
        const [x, y] = polar(R_LEAF, angle);
        leaves.push({ node, x, y, angle, hub, ctrl });
      });
      start += span;
    });
    return { hubs, leaves, placeholders };
  }, [sectors]);
}

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

const labelTransform = (angle: number) => {
  const flip = Math.cos(angle) < 0;
  return { flip, deg: (angle * 180) / Math.PI + (flip ? 180 : 0) };
};

export function MindMap<T extends MapNode>({ nodes, themes, title, subtitle, controls, note, intro, empty, showEmptyEras = false, renderDetail, initialView = "career", initialGroup = null }: MindMapProps<T>) {
  const [view, setView] = useState<View>(initialView);
  const [layout, setLayout] = useState<Layout>(() => (typeof window !== "undefined" && window.innerWidth < 600 ? "list" : "map"));
  const [selected, setSelected] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(initialGroup);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const sectors = useMemo(() => buildSectors(nodes, view, themes, showEmptyEras), [nodes, view, themes, showEmptyEras]);
  const { hubs, leaves, placeholders } = useRadialLayout(sectors);
  const timeline = useTimelineLayout(sectors);
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
    setHistory([]);
    setView(next);
    setGroup(null);
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
  const fit = useCallback((): ViewBox => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (view === "career") {
      // Fit the timeline's height, start it beside the title card, and let people pan along it.
      const { minX, minY, maxY } = timeline.bounds;
      const nav = 72;
      // Opens one zoom-out step (1.25×) wider than a snug fit, so more of the timeline shows at once.
      const s = 1.25 * Math.max(0.8, (maxY - minY) / Math.max(h - nav - 120, 320));
      const left = w > 760 ? 420 : 16;
      return { x: minX - left * s, y: -(nav + (h - nav) / 2) * s + ((maxY + minY) / 2), w: w * s, h: h * s };
    }
    const free = w - (w > 1100 ? 400 : 0);
    const s = Math.max(MAP_W / Math.max(free, 720), MAP_H / h);
    return { x: (-free * s) / 2, y: (-h * s) / 2 - 50, w: w * s, h: h * s };
  }, [view, timeline.bounds]);
  const [vb, setVb] = useState<ViewBox>(() => (typeof window === "undefined" ? { x: -710, y: -680, w: MAP_W, h: MAP_H } : fit()));
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

  const itemButton = (node: T, inPanel = false) => (
    <button key={node.id} type="button" className="cm-item" aria-current={node.id === selected || undefined} onClick={() => (inPanel ? panelSelect(node.id) : select(node.id))}>
      {node.title}
      <small>{nodeMeta(node)}</small>
    </button>
  );

  return (
    <div className="chad-mapped" ref={rootRef}>
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
          <>
          <g>
            {hubs.map((h) => (
              <path key={h.key} className="cm-edge" d={`M0 0L${h.x} ${h.y}`} />
            ))}
            {leaves.map((l) => (
              <path key={l.node.id} className={`cm-edge${nodeDim(l.node.id)}`} d={`M${l.hub[0]} ${l.hub[1]}Q${l.ctrl[0]} ${l.ctrl[1]} ${l.x} ${l.y}`} />
            ))}
            {placeholders.map((p) => (
              <path key={p.key} className={`cm-edge is-empty${focus ? " is-dim" : ""}`} d={`M${p.hub[0]} ${p.hub[1]}Q${p.ctrl[0]} ${p.ctrl[1]} ${p.x} ${p.y}`} />
            ))}
          </g>
          <g>
            {chords.map(([a, b]) => (
              <path key={b!.node.id} className="cm-chord" d={`M${a!.x} ${a!.y}Q${(a!.x + b!.x) * 0.18} ${(a!.y + b!.y) * 0.18} ${b!.x} ${b!.y}`} />
            ))}
          </g>
          <g>
            {placeholders.map((p) => {
              const { flip, deg } = labelTransform(p.angle);
              return (
                <g key={p.key} className={`cm-placeholder${focus ? " is-dim" : ""}`} transform={`translate(${p.x} ${p.y})`}>
                  <circle r={5} />
                  <text transform={`rotate(${deg})`} x={flip ? -12 : 12} dy={4} textAnchor={flip ? "end" : "start"}>No stories yet</text>
                </g>
              );
            })}
            {leaves.map((l) => {
              const { flip, deg } = labelTransform(l.angle);
              return (
                <g
                  key={l.node.id}
                  className={`cm-leaf${nodeDim(l.node.id)}${l.node.id === selected ? " is-selected" : ""}`}
                  data-leaf={l.node.id}
                  transform={`translate(${l.x} ${l.y})`}
                  tabIndex={0}
                  role="button"
                  aria-label={l.node.title}
                  onKeyDown={(e) => onKey(e, () => select(l.node.id))}
                >
                  <circle r={l.node.id === selected ? 9 : 6.5} />
                  <text transform={`rotate(${deg})`} x={flip ? -14 : 14} dy={4} textAnchor={flip ? "end" : "start"}>
                    {truncate(l.node.title, 46)}
                  </text>
                </g>
              );
            })}
          </g>
          <g>
            {hubs.map((h) => {
              const width = Math.max(h.label.length * 7.8, h.sub.length * 6.2) + 30;
              const dim = focus && !nodes.some((n) => focus.has(n.id) && inGroup(view, h.key, n));
              return (
                <g
                  key={h.key}
                  className={`cm-hub${group === h.key ? " is-on" : ""}${dim ? " is-dim" : ""}`}
                  data-hub={h.key}
                  transform={`translate(${h.x} ${h.y})`}
                  tabIndex={0}
                  role="button"
                  aria-label={`Theme: ${h.label}`}
                  onKeyDown={(e) => onKey(e, () => toggleGroup(h.key))}
                >
                  <rect x={-width / 2} y={-20} width={width} height={40} rx={10} />
                  <text textAnchor="middle" y={-1}>{h.label}</text>
                  <text className="cm-count" textAnchor="middle" y={13}>{h.sub}</text>
                </g>
              );
            })}
          </g>
          <g className="cm-me">
            <circle r={46} />
            <text textAnchor="middle" y={6}>Chad</text>
          </g>
          </>
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
        <div>
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
              <button type="button" aria-pressed={layout === "map"} onClick={() => setLayout("map")}>Map</button>
              <button type="button" aria-pressed={layout === "list"} onClick={() => setLayout("list")}>List</button>
            </div>
          )}
        </div>
        {note}
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
        <aside className={`cm-card cm-detail${canGoBack ? " has-back" : ""}${selectedNode ? "" : " is-group"}`} aria-live="polite">
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
  return (
    <g className="cm-tl">
      {roles.map((r) => (
        <path
          key={r.key}
          className={`cm-tl-seg${group === r.key ? " is-on" : ""}${r.across ? " is-across" : ""}${roleDim(r.key) ? " is-dim" : ""}`}
          data-hub={r.key}
          d={`M${r.start} 0H${r.end}`}
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
          <g key={s.node.id} className={`cm-leaf${dim(s.node.id)}${isSel ? " is-selected" : ""}`} data-leaf={s.node.id} tabIndex={0} role="button" aria-label={s.node.title} onKeyDown={(e) => onKey(e, () => select(s.node.id))}>
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
