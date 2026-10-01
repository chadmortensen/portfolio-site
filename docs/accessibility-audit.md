# Accessibility audit — October 1, 2026

Audited the local working tree, including the existing carousel and stylesheet changes. Most fixes below preserve visible page copy, layout, and existing product interactions. The owner approved mobile menu scrolling and Escape behavior, contrast colors, limited arrow bouncing, section-navigation focus, meaningful image alt text, and Shift+Arrow hero shortcuts. Additional reduced-motion changes remain pending approval.

## Applied fixes

| Issue | Fix |
| --- | --- |
| Mobile menu button had no accessible name or expanded state | Added open/close names, `aria-expanded`, and an association with the open menu. Named the main navigation landmark. |
| Mobile navigation was clipped on short screens | With owner approval, constrained the open menu to the viewport and enabled internal scrolling. Escape closes the menu and returns focus to its button. |
| Case studies rendered a second skip link | Kept the shared link in `index.html`; removed the duplicate. |
| Skip destinations were missing or not explicitly focusable | Added `main-content` and `tabIndex={-1}` to applicable main landmarks, including utility pages. |
| Shared skip link could be covered by fixed navigation, and Tailwind did not scan its HTML source | Raised the focused link above navigation and included `index.html` in Tailwind's content paths. Verified it is visible when focused. |
| Enlarged image dialogs had no accessible title | Used the existing image description as a screen-reader-only dialog title. Removed the dangling description association. |
| Hero and experience accessible names did not include their visible button wording | Made accessible labels include the visible words, supporting voice control. |
| New UX tips were not announced | Added a polite status region that announces the final tip rather than every animation frame. |
| Carousel cards overrode the native article role with an invalid group role | Retained native article semantics and the slide descriptions. |
| Experience achievements skipped from heading level 3 to 5 | Used level 4 without changing text or classes. |
| Quote callouts created nested complementary landmarks | Used note semantics with the same styling and content. |
| Case-study table headers lacked explicit column scope | Added `scope="col"`. |
| Design-system switches had no accessible names | Associated each switch with its existing visible label. |
| Case studies and utility pages reused the homepage browser title | Added descriptive document titles and restored the homepage title on return. |
| Text and UI examples failed contrast checks | With approval, darkened blue, orange, muted, and destructive colors; used dark labels on teal/aqua swatches; darkened the 404 link; and made the open mobile menu background opaque. |
| Hero arrow bounced indefinitely | With approval, limited its one-second bounce animation to three cycles. |
| Section navigation scrolled without moving keyboard focus | With approval, navigation and hero controls now focus the destination heading and scroll its section below the fixed header, including navigation back from a case study. |
| Generic image descriptions hid useful context | With approval, visually reviewed and updated 28 case-study image descriptions, including research boards, registry wireframes, vision concepts, and workshop illustrations. |
| Hero arrow shortcuts also ran while using the carousel | With approval, the hidden hero preview uses Shift+Left/Right; the carousel uses unmodified arrows. Hero shortcuts ignore handled events and editable fields. |

## Changes awaiting approval

| Finding | Evidence | Proposed change and impact |
| --- | --- | --- |
| Reduced-motion support is incomplete | Smooth scrolling is explicitly requested in JavaScript; the tip slot animation does not respect the setting. Existing CSS only covers some animations. | Use immediate scrolling and tip selection, and disable nonessential transitions. Changes behavior for that preference. |

The original audit incorrectly treated dormant hero video support as an active video background. On rechecking `data/hero-weather-backgrounds.json`, every configured background is an image. A video pause control is not needed for the current configuration; no control was added. The limited arrow animation addressed the active automatic-motion finding under [WCAG 2.2.2, Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide/). Contrast and naming were checked against [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Verification

- Used local Chrome with Playwright and axe-core 4.10.3, checking WCAG A/AA rules through 2.2 and axe best practices.
- Scanned `/`, all four case studies, `/ds`, and a nonexistent route at desktop (1440px) and mobile (390px) widths. Also scanned the expanded experience section, open mobile menu, and the first image dialog in each applicable case study: 23 page/state scans.
- All 23 final page/state scans have zero axe violations. The manually identified motion-preference issue remains as documented above.
- Verified both plain arrow directions move the focused carousel without changing the hero, and both Shift+Arrow directions change the hero without moving the carousel. Confirmed Shift+Arrow remains available for editing in inputs, textareas, and contenteditable fields. Build and edited-file lint pass after this change.
- Confirmed the shared skip link focuses the main landmark on all seven audited routes. Confirmed its corrected styles render above fixed navigation.
- Confirmed image dialogs open from the keyboard, keep focus inside, close with Escape, and restore focus to the image trigger.
- Confirmed navigation focuses the destination heading on desktop and mobile, including About navigation from a case study back to the homepage. Section tops finish approximately 80px below the viewport top. Confirmed the arrow animation is configured for three one-second cycles.
- Confirmed the approved mobile menu changes at 320 × 568, 390 × 568, and 568 × 320: Contact becomes visible when focused, the menu scrolls internally, and Escape closes it with focus returned to the toggle.
- Checked page-level horizontal overflow at 320px, 390px, 768px, and 1440px across the homepage, four case studies, and design-system page. None was detected in the initial states. The gallery and tables retain their own scrolling.
- Production build passes. ESLint passes for all changed TypeScript/TSX files and Tailwind configuration. `git diff --check` passes.
- Full-project lint still reports pre-existing empty-interface errors in `ui/command.tsx` and `ui/textarea.tsx`, plus existing Fast Refresh warnings. Type checking still reports pre-existing weather JSON typing and editor `replaceAll` library-target errors. These were outside the accessibility changes.

This is an implementation audit, not a complete conformance certification. Automated checks cannot certify whether descriptions fully communicate every complex diagram or verify contrast over every weather-dependent photograph/video frame. The revised descriptions summarize the images; detailed transcripts of all text within complex research boards were not added. Weather was fixed to a sunny response for repeatable browser checks. Full screen-reader testing, every image dialog, all design-system interaction states, and the development-only MDX editor were not exhaustively tested. The editor received the shared skip-target metadata fix.
