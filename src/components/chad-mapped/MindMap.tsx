import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Maximize2, Minus, Plus, X } from "lucide-react";
import { nodeMeta, type MapNode } from "./types";
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
  intro: ReactNode;
  empty?: ReactNode;
  /** Show eras with nothing in them yet (useful privately, not on the public page). */
  showEmptyEras?: boolean;
  renderDetail: (node: T, related: T[], select: (id: string) => void) => ReactNode;
};

type Sector = { key: string; label: string; sub: string; items: MapNode[] };

const R_HUB = 200;
const R_LEAF = 370;
const MAP_W = 1420;
const MAP_H = 1360;
const VIEW_LABELS: Record<View, string> = { theme: "Themes", career: "Career", "3d": "3D" };

const truncate = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
const polar = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)];
const byYear = (a: MapNode, b: MapNode) => (a.years[0] ?? 0) - (b.years[0] ?? 0);

function buildSectors(nodes: MapNode[], view: View, themes: string[], showEmptyEras: boolean): Sector[] {
  if (view === "career") {
    const eras = ERAS.map((e) => ({ key: e.key, label: e.label, sub: e.years, items: nodes.filter((n) => eraOf(n) === e.key).sort(byYear) }));
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

const labelTransform = (angle: number) => {
  const flip = Math.cos(angle) < 0;
  return { flip, deg: (angle * 180) / Math.PI + (flip ? 180 : 0) };
};

export function MindMap<T extends MapNode>({ nodes, themes, title, subtitle, controls, note, intro, empty, showEmptyEras = false, renderDetail }: MindMapProps<T>) {
  const [view, setView] = useState<View>("theme");
  const [layout, setLayout] = useState<Layout>(() => (typeof window !== "undefined" && window.innerWidth < 600 ? "list" : "map"));
  const [selected, setSelected] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const sectors = useMemo(() => buildSectors(nodes, view, themes, showEmptyEras), [nodes, view, themes, showEmptyEras]);
  const { hubs, leaves, placeholders } = useRadialLayout(sectors);
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

  const select = useCallback(
    (id: string | null) => {
      setSelected(id);
      const node = id ? byId.get(id) : undefined;
      if (node && group && !inGroup(groupView, group, node)) setGroup(null);
    },
    [byId, group, groupView],
  );
  const toggleGroup = useCallback((key: string) => {
    setGroup((current) => (current === key ? null : key));
    setSelected(null);
  }, []);
  const close = useCallback(() => {
    setSelected(null);
    setGroup(null);
  }, []);
  const changeView = (next: View) => {
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
    const free = w - (w > 1100 ? 400 : 0);
    const s = Math.max(MAP_W / Math.max(free, 720), MAP_H / h);
    return { x: (-free * s) / 2, y: (-h * s) / 2 - 50, w: w * s, h: h * s };
  }, []);
  const [vb, setVb] = useState<ViewBox>(() => (typeof window === "undefined" ? { x: -710, y: -680, w: MAP_W, h: MAP_H } : fit()));
  useEffect(() => {
    const onResize = () => setVb(fit());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fit]);
  const drag = useRef<{ x: number; y: number; vb: ViewBox; moved: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const zoom = (factor: number, cx?: number, cy?: number) =>
    setVb((v) => {
      const nx = cx ?? v.x + v.w / 2;
      const ny = cy ?? v.y + v.h / 2;
      const w = Math.min(Math.max(v.w * factor, 300), 2800);
      const k = w / v.w;
      return { x: nx - (nx - v.x) * k, y: ny - (ny - v.y) * k, w, h: v.h * k };
    });

  const showSvg = view !== "3d" && layout === "map";
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const point = svg.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
      const p = point.matrixTransform(svg.getScreenCTM()?.inverse());
      zoom(Math.exp(e.deltaY * 0.0015), p.x, p.y);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [showSvg]);

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
  const chords = selected && !group ? [...relatedOf(selected)].map((id) => [leafPos.get(selected), leafPos.get(id)] as const).filter(([a, b]) => a && b) : [];
  const selectedNode = selected ? byId.get(selected) : undefined;
  const active = Boolean(selectedNode || group);
  const nodeDim = (id: string) => (focus && !focus.has(id) ? " is-dim" : "");

  const itemButton = (node: T) => (
    <button key={node.id} type="button" className="cm-item" aria-current={node.id === selected || undefined} onClick={() => select(node.id)}>
      {node.title}
      <small>{nodeMeta(node)}</small>
    </button>
  );

  return (
    <div className="chad-mapped" ref={rootRef}>
      {view === "3d" ? (
        <Suspense fallback={<p className="cm-loading">Loading the 3D view…</p>}>
          <MindMap3D ref={threeRef} nodes={nodes} themes={themes} selected={selected} group={group} focus={focus} onSelect={select} onGroup={toggleGroup} onClear={close} />
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
                  aria-label={`${view === "career" ? "Era" : "Theme"}: ${h.label}`}
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
        </svg>
      ) : (
        <div className={`cm-list${active ? " has-panel" : ""}`}>
          {sectors.map((s) => (
            <section key={s.key}>
              <h2>
                {s.label}
                <span>{view === "career" ? s.sub : s.items.length}</span>
              </h2>
              {s.items.length ? (s.items as T[]).map(itemButton) : <p className="cm-muted cm-small">No stories yet</p>}
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
        <div className="cm-zoom">
          <button type="button" aria-label="Zoom in" onClick={() => (view === "3d" ? threeRef.current?.zoom(0.8) : zoom(0.8))}><Plus size={16} /></button>
          <button type="button" aria-label="Zoom out" onClick={() => (view === "3d" ? threeRef.current?.zoom(1.25) : zoom(1.25))}><Minus size={16} /></button>
          <button type="button" aria-label="Fit map to screen" onClick={() => (view === "3d" ? threeRef.current?.reset() : setVb(fit()))}><Maximize2 size={15} /></button>
        </div>
      )}

      {!nodes.length && empty ? (
        <div className="cm-card cm-detail cm-intro">{empty}</div>
      ) : active ? (
        <aside className="cm-card cm-detail" aria-live="polite">
          <button type="button" className="cm-close" aria-label="Close details" onClick={close}><X size={16} /></button>
          {selectedNode ? (
            renderDetail(selectedNode, [...relatedOf(selectedNode.id)].map((id) => byId.get(id)!).filter(Boolean), select)
          ) : (
            <>
              <p className="cm-eyebrow">{groupView === "career" ? `Era${ERAS.find((e) => e.key === group) ? ` · ${ERAS.find((e) => e.key === group)!.years}` : ""}` : "Theme"}</p>
              <h2>{groupLabel(groupView, group!)}</h2>
              <p className="cm-muted">
                {groupNodes.length} {groupNodes.length === 1 ? "entry" : "entries"}
                {groupView === "theme" ? ` across ${new Set(groupNodes.flatMap((n) => n.companies)).size} companies.` : "."}
              </p>
              <div>{(groupNodes as T[]).map(itemButton)}</div>
            </>
          )}
        </aside>
      ) : (
        <div className="cm-card cm-detail cm-intro">{intro}</div>
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
