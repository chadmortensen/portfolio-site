/** Keep keyboard navigation at the section reached by an in-page control. */
export const navigateToSection = (hash: string) => {
  const section = document.getElementById(hash.replace(/^#/, ""));
  if (!section) return;

  const heading = section.querySelector<HTMLElement>("h1, h2") ?? section;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
  section.scrollIntoView({ behavior: "smooth" });
};
