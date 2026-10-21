import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Maximize2, Minus, Plus, X } from "lucide-react";
import { nodeMeta, type MapNode } from "./types";
import "./chad-mapped.css";

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
  renderDetail: (node: T, related: T[], select: (id: string) => void) => ReactNode;
};

const R_HUB = 200;
const R_LEAF = 370;
const MAP_W = 1420;
const MAP_H = 1360;

const truncate = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
const polar = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)];

function useRadialLayout(nodes: MapNode[], themes: string[]) {
  return useMemo(() => {
    const sectors = themes
      .map((theme) => ({
        theme,
        items: nodes.filter((n) => n.themes[0] === theme).sort((a, b) => (a.years[0] ?? 0) - (b.years[0] ?? 0)),
      }))
      .filter((s) => s.items.length);
    const weights = sectors.map((s) => Math.max(s.items.length, 2) + 0.7);
    const unit = (2 * Math.PI) / (weights.reduce((a, b) => a + b, 0) || 1);
    let start = -Math.PI / 2;
    const hubs: { theme: string; x: number; y: number; count: number }[] = [];
    const leaves: { node: MapNode; x: number; y: number; angle: number; hub: [number, number]; ctrl: [number, number] }[] = [];
    sectors.forEach((sector, i) => {
      const span = weights[i] * unit;
      const mid = start + span / 2;
      const hub = polar(i % 2 ? R_HUB + 62 : R_HUB - 10, mid);
      hubs.push({ theme: sector.theme, x: hub[0], y: hub[1], count: sector.items.length });
      const inner = span - 0.7 * unit;
      sector.items.forEach((node, j) => {
        const angle = start + 0.35 * unit + ((j + 0.5) * inner) / sector.items.length;
        const [x, y] = polar(R_LEAF, angle);
        leaves.push({ node, x, y, angle, hub, ctrl: polar((R_HUB + R_LEAF) / 2 - 10, mid) });
      });
      start += span;
    });
    return { hubs, leaves, sectors };
  }, [nodes, themes]);
}

export function MindMap<T extends MapNode>({ nodes, themes, title, subtitle, controls, note, intro, empty, renderDetail }: MindMapProps<T>) {
  const [layout, setLayout] = useState<Layout>(() => (typeof window !== "undefined" && window.innerWidth < 600 ? "list" : "map"));
  const [selected, setSelected] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const { hubs, leaves, sectors } = useRadialLayout(nodes, themes);

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

  const focus = useMemo(() => {
    if (theme) return new Set(nodes.filter((n) => n.themes.includes(theme)).map((n) => n.id));
    if (selected) return new Set([selected, ...relatedOf(selected)]);
    return null;
  }, [theme, selected, nodes, relatedOf]);

  const select = useCallback(
    (id: string | null) => {
      setSelected(id);
      if (id && theme && !byId.get(id)?.themes.includes(theme)) setTheme(null);
    },
    [byId, theme],
  );
  const toggleTheme = (t: string) => {
    setTheme((current) => (current === t ? null : t));
    setSelected(null);
  };
  const close = () => {
    setSelected(null);
    setTheme(null);
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
  }, [layout]);

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
    else if (hub) toggleTheme(hub.dataset.hub!);
    else close();
  };
  const onKey = (e: KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const leafPos = useMemo(() => new Map(leaves.map((l) => [l.node.id, l])), [leaves]);
  const chords = selected && !theme ? [...relatedOf(selected)].map((id) => [leafPos.get(selected), leafPos.get(id)] as const).filter(([a, b]) => a && b) : [];
  const selectedNode = selected ? byId.get(selected) : undefined;
  const themeNodes = theme ? nodes.filter((n) => n.themes.includes(theme)) : [];
  const active = Boolean(selectedNode || theme);

  const itemButton = (node: T) => (
    <button key={node.id} type="button" className="cm-item" aria-current={node.id === selected || undefined} onClick={() => select(node.id)}>
      {node.title}
      <small>{nodeMeta(node)}</small>
    </button>
  );

  return (
    <div className="chad-mapped" ref={rootRef}>
      {layout === "map" ? (
        <svg
          ref={svgRef}
          className={`cm-svg${dragging ? " is-dragging" : ""}`}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          role="group"
          aria-label="Mind map of themes and stories"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <g>
            {hubs.map((h) => (
              <path key={h.theme} className="cm-edge" d={`M0 0L${h.x} ${h.y}`} />
            ))}
            {leaves.map((l) => (
              <path
                key={l.node.id}
                className={`cm-edge${focus && !focus.has(l.node.id) ? " is-dim" : ""}`}
                d={`M${l.hub[0]} ${l.hub[1]}Q${l.ctrl[0]} ${l.ctrl[1]} ${l.x} ${l.y}`}
              />
            ))}
          </g>
          <g>
            {chords.map(([a, b]) => (
              <path key={b!.node.id} className="cm-chord" d={`M${a!.x} ${a!.y}Q${(a!.x + b!.x) * 0.18} ${(a!.y + b!.y) * 0.18} ${b!.x} ${b!.y}`} />
            ))}
          </g>
          <g>
            {leaves.map((l) => {
              const flip = Math.cos(l.angle) < 0;
              const deg = (l.angle * 180) / Math.PI + (flip ? 180 : 0);
              const cls = ["cm-leaf", focus && !focus.has(l.node.id) ? "is-dim" : "", l.node.id === selected ? "is-selected" : ""].join(" ");
              return (
                <g
                  key={l.node.id}
                  className={cls}
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
              const width = h.theme.length * 7.8 + 30;
              const dim = focus && !nodes.some((n) => focus.has(n.id) && n.themes.includes(h.theme));
              return (
                <g
                  key={h.theme}
                  className={`cm-hub${theme === h.theme ? " is-on" : ""}${dim ? " is-dim" : ""}`}
                  data-hub={h.theme}
                  transform={`translate(${h.x} ${h.y})`}
                  tabIndex={0}
                  role="button"
                  aria-label={`Theme: ${h.theme}`}
                  onKeyDown={(e) => onKey(e, () => toggleTheme(h.theme))}
                >
                  <rect x={-width / 2} y={-20} width={width} height={40} rx={10} />
                  <text textAnchor="middle" y={-1}>{h.theme}</text>
                  <text className="cm-count" textAnchor="middle" y={13}>{h.count}</text>
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
            <section key={s.theme}>
              <h2>
                {s.theme}
                <span>{s.items.length}</span>
              </h2>
              {(s.items as T[]).map(itemButton)}
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
          <div className="cm-seg" role="group" aria-label="Layout">
            <button type="button" aria-pressed={layout === "map"} onClick={() => setLayout("map")}>Map</button>
            <button type="button" aria-pressed={layout === "list"} onClick={() => setLayout("list")}>List</button>
          </div>
        </div>
        {note}
      </div>

      {layout === "map" && (
        <div className="cm-zoom">
          <button type="button" aria-label="Zoom in" onClick={() => zoom(0.8)}><Plus size={16} /></button>
          <button type="button" aria-label="Zoom out" onClick={() => zoom(1.25)}><Minus size={16} /></button>
          <button type="button" aria-label="Fit map to screen" onClick={() => setVb(fit())}><Maximize2 size={15} /></button>
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
              <p className="cm-eyebrow">Theme</p>
              <h2>{theme}</h2>
              <p className="cm-muted">
                {themeNodes.length} {themeNodes.length === 1 ? "entry" : "entries"} across {new Set(themeNodes.flatMap((n) => n.companies)).size} companies.
              </p>
              <div>{themeNodes.map(itemButton)}</div>
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
