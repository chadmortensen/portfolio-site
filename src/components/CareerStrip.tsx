import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ACROSS_ROLES, ERAS, eraOf } from "@/components/chad-mapped/groups";
import type { MapNode, PublicData } from "@/components/chad-mapped/types";
import "./career-strip.css";

/** How long each theme stays up, and the stagger of the draw-in per role. */
const THEME_MS = 3600;
const ROLE_STAGGER_MS = 240;
const DOT_STAGGER_MS = 35;
/** Themes need at least this many stories to be worth a turn in the heading. */
const MIN_THEME_SIZE = 3;
const SKIP_THEMES = new Set(["Other notes"]);

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
export const mapLink = (key: "theme" | "role", value: string) => `/chad-mapped?${key}=${encodeURIComponent(value)}`;

type Role = { key: string; label: string; years: string; title?: string; nodes: MapNode[]; across: boolean };

function useCareerData() {
  const [data, setData] = useState<PublicData | null>(null);
  useEffect(() => {
    let live = true;
    // Loaded on demand so the map's data stays out of the home page's first download.
    import("../../data/chad-mapped.json").then((m) => live && setData(m.default as PublicData));
    return () => {
      live = false;
    };
  }, []);
  return data;
}

/** The right-hand neck of a role box: its top and bottom edges curve into the timeline, like the map's Career view. */
const Neck = () => (
  <svg className="cs-neck" viewBox="0 0 18 44" preserveAspectRatio="none" aria-hidden="true">
    <path className="cs-neck-fill" d="M0 0.75C10.8 0.75 6.3 22 18 22C6.3 22 10.8 43.25 0 43.25Z" />
    <path className="cs-neck-line" d="M0 0.75C10.8 0.75 6.3 22 18 22M0 43.25C10.8 43.25 6.3 22 18 22" />
  </svg>
);

/** The home page career timeline, plus the theme it is currently showing (for the heading). */
export function useCareerStrip() {
  const data = useCareerData();
  const rootRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [cycling, setCycling] = useState(false);
  const [paused, setPaused] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const roles = useMemo<Role[]>(() => {
    if (!data) return [];
    const eras: Role[] = ERAS.map((e) => ({ key: e.key, label: e.key, years: e.years.replace(/^(\d{4})–(\d{2})(\d{2})$/, "$1–$3"), title: e.title, across: false, nodes: data.nodes.filter((n) => eraOf(n) === e.key) }));
    const across: Role = { key: ACROSS_ROLES, label: ACROSS_ROLES, years: "", across: true, nodes: data.nodes.filter((n) => eraOf(n) === ACROSS_ROLES) };
    return [...eras, across].filter((r) => r.nodes.length);
  }, [data]);

  const themes = useMemo(() => {
    if (!data) return [];
    return data.themes.filter((t) => !SKIP_THEMES.has(t) && data.nodes.filter((n) => n.themes.includes(t)).length >= MIN_THEME_SIZE);
  }, [data]);

  const theme = themes.length ? themes[themeIndex % themes.length] : null;
  const total = roles.reduce((sum, r) => sum + r.nodes.length, 0);
  const hits = theme ? roles.reduce((sum, r) => sum + r.nodes.filter((n) => n.themes.includes(theme)).length, 0) : 0;

  // Draw the timeline in when it scrolls into view, then start cycling themes.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !roles.length) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setDrawn(true);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [roles.length]);

  useEffect(() => {
    if (!drawn || reducedMotion()) return;
    const t = window.setTimeout(() => setCycling(true), roles.length * ROLE_STAGGER_MS + total * DOT_STAGGER_MS + 600);
    return () => window.clearTimeout(t);
  }, [drawn, roles.length, total]);

  useEffect(() => {
    if (!cycling || paused || themes.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setThemeIndex((i) => (i + 1) % themes.length);
    }, THEME_MS);
    return () => window.clearInterval(id);
  }, [cycling, paused, themes.length]);

  let dotIndex = 0;
  return {
    theme,
    hits,
    total,
    strip: (
      <div
        ref={rootRef}
        className={`cs${drawn ? " is-drawn" : ""}${cycling ? " is-cycling" : ""}${theme ? " has-theme" : ""}`}
        style={{ "--cs-roles": roles.length } as CSSProperties}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ol className="cs-roles" aria-label="Career timeline">
          {roles.map((r, i) => (
            <li key={r.key} className={`cs-role${r.across ? " is-across" : ""}`} style={{ "--cs-i": i, flexGrow: r.nodes.length } as CSSProperties}>
              <Link
                to={mapLink("role", r.key)}
                className="cs-link"
                aria-label={`${r.across ? "Practices across roles" : `${r.label}${r.title ? `, ${r.title}` : ""}, ${r.years}`}: ${r.nodes.length} ${r.nodes.length === 1 ? "story" : "stories"}${theme ? `, ${r.nodes.filter((n) => n.themes.includes(theme)).length} about ${theme.toLowerCase()}` : ""}`}
              >
                {r.across ? (
                  <span className="cs-across-label">Across roles</span>
                ) : (
                  <span className="cs-box">
                    <span className="cs-box-body">
                      <span className="cs-company">{r.label}</span>
                      <span className="cs-years">{r.years}</span>
                    </span>
                    <Neck />
                  </span>
                )}
                <span className="cs-run">
                  <span className="cs-dots">
                    {r.nodes.map((n) => {
                      const on = Boolean(theme && n.themes.includes(theme));
                      const d = dotIndex++;
                      return <span key={n.id} className={`cs-dot${on ? " is-on" : ""}`} style={{ "--cs-d": d } as CSSProperties} />;
                    })}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    ),
  };
}
