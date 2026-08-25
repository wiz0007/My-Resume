# Frontend Performance Standard

This portfolio is built as a motion-heavy frontend, so every new feature should follow these rules.

## Routing And Code

- Put major experiences on real routes.
- Use `React.lazy` for route pages and expensive below-fold features.
- Keep shared layout components free of GSAP and Three imports.
- Prefetch route chunks only on intent: hover, focus, or idle.

## Runtime Lifecycle

- Use `useNearViewport` for expensive scenes, videos, canvases, and deferred sections.
- Use `usePageVisibility` to pause work when the browser tab is hidden.
- Respect `prefers-reduced-motion` before starting video, canvas, GSAP, or continuous motion.
- Clean up all listeners, observers, timers, RAF loops, and GSAP contexts on unmount.

## Animation Responsibility

- CSS: simple hover states and compositor-friendly loops.
- Framer Motion: component entrance/exit/state transitions.
- GSAP/ScrollTrigger: pinned or scrubbed scroll choreography only.
- Three.js: isolated to lazy route chunks or lazy feature chunks.

## Media

- Hero/LCP media may load eagerly, but below-fold media must be lazy or deferred.
- Looping video must pause offscreen and when the page is hidden.
- Large public assets must be referenced by code or removed.
- Prefer compressed, versioned media assets for long-lived caching.

## Data And Rendering

- Keep route data small by default.
- Lazy-load large details, galleries, PDFs, or modal payloads on interaction.
- Memoize only repeated/heavy components after profiling.
- Avoid per-frame layout reads such as repeated `getBoundingClientRect`.

## Validation

Run before a handoff:

```bash
npm run validate
```

This runs lint, production build, performance budget, and dependency audit.

Current production chunk budgets are intentionally conservative:

- entry JS: 80 KB
- individual route JS: 170 KB
- animation vendor chunk: 220 KB
- Three vendor chunk: 1150 KB
- individual CSS chunk: 70 KB

If a budget fails, split the feature or justify the increase before raising the budget.
