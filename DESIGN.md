# NSH Micro Interactions

This project ports the public Amicro component examples into NSH 0.6 TSX. GitHub Pages serves the packaged Web target. The gallery uses a midnight and lilac palette, paired with a cool light theme, and leaves the controls' focus, keyboard and accessibility semantics in `nsh/base`.

## Boundaries

- `catalog.ts` exposes the pinned upstream inventory and provenance by sample ID. Its generated input combines the upstream site sitemap, registry and category data. An entry names a real source or preview, and remains pending until it has a runnable NSH implementation. Multiple variants using the same engine keep separate IDs where Amicro does.
- `ports/` owns reusable native components by family. Component props carry variation, label and palette. Each preview instance owns its state, releases timers on unmount, and respects reduced motion. The port imports only NSH and local modules. The UI accepts user actions without needing to know the pressure, timeline, or easing state.
- `ports/Controls.tsx` owns shared action, link, menu, and search presentation and behavior. Callers supply labels, palette, selected state, and callbacks. The module provides focus feedback, reduced-motion behavior, and semantic hosts. Both the gallery and the component demos import these controls.
- `Gallery.tsx` owns language, theme, browsing, and selection. The English and Chinese Web entrypoints (`App.tsx`, `App.zh.tsx`) share it. The gallery composes controls from `ports/` and selects a preview from the current result page, or shows an empty state. Attribution and the license ship with each Web distribution. The gallery operates with static files and local state.

## Acceptance

GitHub Pages must serve the project base path and the relative runtime assets. Check both languages, mobile overflow, switching categories, clearing search, keyboard activation, and reduced motion in the actual compiled Web target. Check representative shared controls in the gallery and in their original demos. Use `nsh check`, `nsh test --target web`, and a browser smoke test on the deployed Pages URL.

## Reusable micro-interactions: first delivery

1. Publish a source entry at `index.ts` for three components and the shared palette. Keep the 380 upstream variants in the gallery. Projects use their base library (such as hero-nsh) for forms, dialogs, notifications and tables. This project owns the motion and presentation for its reusable controls.
2. Connect the exported components to existing gallery previews. Add bilingual examples with a copy action, a source bundle script, a usage guide and a changelog. Verify the bundle in an NSH project outside the gallery.
3. Verify type checking and Web behavior, including keyboard selection, disabled actions, empty/replaced chart data, focus, narrow layouts and reduced motion. Build both localized Web entries for local smoke testing.

| Owner | Public contract and behavior |
| --- | --- |
| `ports/ButtonMotion.tsx` | `AnimatedButton` accepts label, palette, effect and icon options, disabled, and an action callback. The caller supplies business state. The port owns the transient visual state and clears its timer on unmount. Existing `MotionButton` adapts catalog metadata at the gallery boundary. |
| `ports/MotionSelect.tsx` | `MotionSelect` accepts a label, placeholder, readonly value/label options, a controlled value and a callback. It displays the placeholder for missing selections and disables empty menus. NSH owns keyboard and popup focus behavior. |
| `ports/SeriesChart.tsx` | `SeriesChart` accepts labeled finite samples, a chart label, an empty message and a palette. It renders a responsive line and a text representation of the same values. Empty or fully invalid input shows the empty message. Input replacement redraws without caller coordination. |

Components depend on NSH and the shared local palette and icons. They do not depend on the gallery, inventory, or translations. `components.test.tsx` drives a small consumer via the public entry. `scripts/bundle-components.ps1` packages that entry and its source dependencies with licenses. The gallery owns translations, demo data and clipboard feedback.
