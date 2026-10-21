/**
 * Look and shape of the 3D map. Edit the values here; MindMap3D reads them.
 * Colors take any CSS color string three.js understands, such as "hsl(0, 0%, 55%)" or "#333".
 */
export const MAP_3D = {
  /** "horizontal": roles run left to right, oldest first. "helix": roles spiral up a vertical axis. */
  shape: "horizontal" as "horizontal" | "helix",
  /** Horizontal shape: "even" gives every role the same room; "years" spaces roles by when they started. */
  spacing: "even" as "even" | "years",
  /** Room per role ("even") or per year ("years") along the thread. */
  roleGap: 72,
  yearSpacing: 12,
  /** How far the horizontal thread weaves front to back, for depth. 0 makes it a straight line. */
  wave: 28,
  /** Show the dashed year line (helix shape only). */
  showYearAxis: false,
  /** Slowly spin the map until the visitor drags it. */
  autoRotate: false,

  thread: { color: "hsl(0, 0%, 8%)", thickness: 0.8 },
  roles: { color: "hsl(0, 0%, 8%)", size: 5 },
  stories: { color: "hsl(0, 0%, 62%)", focusedColor: "hsl(0, 0%, 8%)", size: 4.5, focusedSize: 5.5, selectedSize: 7 },
  /** Lines between stories, themes and roles. */
  links: { color: "hsl(0, 0%, 55%)", opacity: 0.9 },
  /** Selected story and the lines of the branch in focus. */
  accent: "hsl(210, 80%, 40%)",

  /** How far stories sit from their role, and themes from the thread. */
  spread: { story: 34, theme: 170 },
  camera: { distance: 720 },
};
