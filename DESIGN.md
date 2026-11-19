# NSH Micro Interactions

This project ports the public Amicro component examples into NSH 0.6 TSX. GitHub Pages serves the packaged Web target. The gallery uses a midnight and lilac palette, paired with a cool light theme, and leaves the controls' focus, keyboard and accessibility semantics in `nsh/base`.

## Boundaries

- `catalog.ts` exposes the pinned upstream inventory and provenance by sample ID. Its generated input combines the upstream site sitemap, registry and category data. An entry names a real source or preview, and remains pending until it has a runnable NSH implementation. Multiple variants using the same engine keep separate IDs where Amicro does.
- `ports/` owns reusable native components by family. Component props carry variation, label and palette. Each preview instance owns its state, releases timers on unmount, and respects reduced motion. The port imports only NSH and local modules. The UI accepts user actions without needing to know the pressure, timeline, or easing state.
- `Gallery.tsx` owns language, theme, browsing, and selection. The English and Chinese Web entrypoints (`App.tsx`, `App.zh.tsx`) share it. Both expose the same sample set and show a pending message if an indexed component has no local renderer. Attribution and the license ship with each Web distribution. The gallery operates with static files and local state.

## Acceptance

GitHub Pages must serve the project base path and the relative runtime assets. Check both languages, mobile overflow, switching categories, provenance links, deferred entries, keyboard activation, and reduced motion in the actual compiled Web target. Compare each completed sample to the defining interaction in its upstream source before counting it; keep any unported compiler, shader, chart, or simulation variants visible in the inventory. Use `nsh check`, `nsh test --target web`, and a browser smoke test on the deployed Pages URL.
