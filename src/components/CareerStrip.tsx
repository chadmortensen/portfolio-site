import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ERAS } from "@/components/chad-mapped/groups";
import type { PublicData } from "@/components/chad-mapped/types";
import "./career-strip.css";

/** How long each theme stays up in the heading. */
const THEME_MS = 3600;
/** Each role takes this long to draw before the next one starts (keep in step with --cs-step in career-strip.css). */
const ROLE_STEP_MS = 650;
/** Themes need at least this many stories to be worth a turn in the heading. */
const MIN_THEME_SIZE = 3;
const SKIP_THEMES = new Set(["Other notes"]);

/** The roles on the timeline: the ones with a title on the map, Visitalk onward. */
const ROLES = ERAS.filter((e) => e.title).map((e) => ({
  key: e.key,
  title: e.title!,
  years: e.years.replace(/^(\d{4})–(\d{2})(\d{2})$/, "$1–$3"),
}));

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
export const mapLink = (key: "theme" | "role", value: string) => `/chad-mapped?${key}=${encodeURIComponent(value)}`;

function useThemes() {
  const [data, setData] = useState<PublicData | null>(null);
  useEffect(() => {
    let live = true;
    // Loaded on demand so the map's data stays out of the home page's first download.
    import("../../data/chad-mapped.json").then((m) => live && setData(m.default as PublicData));
    return () => {
      live = false;
    };
  }, []);
  return useMemo(() => {
    if (!data) return [];
    return data.themes.filter((t) => !SKIP_THEMES.has(t) && data.nodes.filter((n) => n.themes.includes(t)).length >= MIN_THEME_SIZE);
  }, [data]);
}

/** The right-hand neck of a role box: its top and bottom edges curve into the timeline, like the map's Career view. */
const Neck = () => (
  <svg className="cs-neck" viewBox="0 0 18 44" preserveAspectRatio="none" aria-hidden="true">
    <path className="cs-neck-fill" d="M0 0.75C10.8 0.75 6.3 22 18 22C6.3 22 10.8 43.25 0 43.25Z" />
    <path className="cs-neck-line" pathLength={1} d="M0 0.75C10.8 0.75 6.3 22 18 22M0 43.25C10.8 43.25 6.3 22 18 22" />
  </svg>
);

/** The home page career timeline, drawn in role by role, plus the theme the heading is showing. */
export function useCareerStrip() {
  const themes = useThemes();
  const rootRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [cycling, setCycling] = useState(false);
  const [paused, setPaused] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = themes.length ? themes[themeIndex % themes.length] : null;

  // Draw the timeline when it scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
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
  }, []);

  // Start rotating the heading once the whole path is drawn.
  useEffect(() => {
    if (!drawn || reducedMotion()) return;
    const t = window.setTimeout(() => setCycling(true), ROLES.length * ROLE_STEP_MS + 400);
    return () => window.clearTimeout(t);
  }, [drawn]);

  useEffect(() => {
    if (!cycling || paused || themes.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setThemeIndex((i) => (i + 1) % themes.length);
    }, THEME_MS);
    return () => window.clearInterval(id);
  }, [cycling, paused, themes.length]);

  return {
    theme,
    strip: (
      <div
        ref={rootRef}
        className={`cs${drawn ? " is-drawn" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ol className="cs-roles" aria-label="Career timeline">
          {ROLES.map((r, i) => (
            <li key={r.key} className="cs-role" style={{ "--cs-i": i } as CSSProperties}>
              <Link to={mapLink("role", r.key)} className="cs-link" aria-label={`${r.key}, ${r.title}, ${r.years}: see the stories from this role`}>
                <span className="cs-box">
                  <span className="cs-box-body">
                    <span className="cs-company">{r.key}</span>
                    <span className="cs-years">{r.years}</span>
                  </span>
                  <Neck />
                </span>
                <span className="cs-run" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    ),
  };
}
