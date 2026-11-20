/**
 * Custom Google Analytics (GA4) events. gtag is loaded in index.html; when it's missing (blocked by an ad
 * blocker, or not loaded yet) every call here quietly does nothing.
 */
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  // Local dev clicks show up in GA4's DebugView.
  const payload = import.meta.env.DEV ? { ...params, debug_mode: true } : params;
  try {
    window.gtag("event", event, payload);
  } catch {
    // Analytics must never break the page.
  }
}

const clean = (text: string | null | undefined) => (text ?? "").replace(/\s+/g, " ").trim().slice(0, 100);

/** Where a click happened: a data-track-section, the nearest section's id, or the nav or footer. */
function sectionOf(el: Element) {
  const marked = el.closest<HTMLElement>("[data-track-section]");
  if (marked) return marked.dataset.trackSection!;
  const section = el.closest("section[id]");
  if (section) return section.id;
  if (el.closest("nav")) return "nav";
  if (el.closest("footer")) return "footer";
  return "other";
}

/** A link's destination without addresses or numbers: mailto and tel links only say which kind they are. */
function targetOf(el: Element) {
  const href = el.getAttribute("href");
  if (!href) return "";
  if (/^(mailto|tel):/i.test(href)) return href.split(":")[0].toLowerCase();
  try {
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin ? url.pathname + url.search + url.hash : url.href;
  } catch {
    return href;
  }
}

const CLICKABLE = "a[href], button, [role='menuitem'], [data-track-label]";

/**
 * Sends one event for every link or button clicked anywhere on the site, except inside [data-track-ignore]
 * (the career map sends its own events). The label is the element's data-track-label, else its visible text,
 * else its aria-label. Returns a cleanup function.
 */
export function trackClicks(event: string) {
  // Read the page before the click's own handlers run, since a link may change the URL first.
  let page = "";
  const before = () => (page = window.location.pathname);
  // Sent while bubbling, so a click a component cancels with stopPropagation (like the end of a carousel drag) isn't counted.
  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest?.(CLICKABLE);
    if (!el || el.closest("[data-track-ignore]")) return;
    const label = clean((el as HTMLElement).dataset.trackLabel) || clean((el as HTMLElement).innerText) || clean(el.getAttribute("aria-label")) || clean(el.getAttribute("title"));
    track(event, {
      click_label: label || "(no label)",
      click_section: sectionOf(el),
      click_target: targetOf(el),
      click_type: el.tagName === "A" ? "link" : "button",
      click_page: page || window.location.pathname,
    });
  };
  window.addEventListener("click", before, { capture: true });
  document.addEventListener("click", onClick);
  return () => {
    window.removeEventListener("click", before, { capture: true });
    document.removeEventListener("click", onClick);
  };
}
