
## Recommendation: migrate in place, don't fork

The changes are mechanical (swap viewport units/breakpoints for container-relative ones) and don't alter visual design, copy, or logic. A fork would double maintenance for every future tweak (mascots, activities, copy, a11y) with no upside — the container-query version renders identically in a real browser and on iPhone because the root container then equals the viewport. One codebase, embeddable anywhere.

If you'd rather keep the current build untouched as a "known good" snapshot, the cleaner option is to publish the current version, then do the migration on top — not to maintain two source trees.

---

## Plan: make the app responsive to its parent frame

### 1. Establish a container at the root

In `src/routes/__root.tsx`, wrap `<Outlet />` in a single full-size container element that declares itself a size container:

- `<div className="@container w-full min-h-full">` around `<Outlet />` and `<Toaster />`.
- On `<body>` (or the wrapper), use `h-full w-full` and let html/body inherit `100%` so the app fills the parent frame instead of `100vh`.

This makes every descendant able to use `@sm:`, `@md:`, `@lg:` Tailwind v4 container variants that respond to the wrapper's width, not the browser viewport.

### 2. Replace viewport breakpoints with container breakpoints

Sweep these files and rename responsive prefixes:

- `src/routes/index.tsx` — `sm:` → `@sm:`, `md:` → `@md:` on header text sizes, the mascot grid (`grid-cols-2 sm:grid-cols-4`), padding (`py-10 sm:py-14`), gap.
- `src/routes/generator.tsx` — same sweep.
- `src/routes/about.tsx` — same sweep.
- `src/components/PixelNotepad.tsx` — `px-5 sm:px-7`, `text-base sm:text-lg`, `-bottom-4 -right-2 sm:-bottom-6 sm:-right-4`.
- `src/components/Mascot.tsx` and `src/components/CozyRoom.tsx` — audit for any `sm:`/`md:` usage.

Tailwind v4 ships container variants out of the box once an ancestor has `@container`. No config change needed.

### 3. Replace viewport units with container/percent units

- `min-h-screen` → `min-h-full` (or `min-h-[100cqh]` where we want exactly the container height).
- Any `100vh` / `100vw` in `src/styles.css` (rain-fall, snow-fall keyframes use `120vh`) → `120cqh` so weather effects scale to the frame, not the browser window.
- `max-w-xl`, `max-w-3xl` stay — they're already container-friendly.

### 4. Replace `useIsMobile` with a container-aware hook

`src/hooks/use-mobile.tsx` currently reads `window.innerWidth`. Replace with a `useContainerIsMobile(ref)` hook that uses `ResizeObserver` on a passed ref (or on the nearest `@container` ancestor via a context). Update the (few) call sites to pass the ref, or convert those call sites to pure CSS container queries and delete the JS branching entirely where possible.

### 5. Fixed-pixel mascot/notepad sizes

- `Mascot size={112}` on landing and `size={88}` on the notepad: keep defaults but allow a `className` override and use container variants to shrink in narrow frames (e.g. `@max-sm:scale-75`). No prop-shape change required.

### 6. Verify

- Local browser at full width — should look identical to today.
- Resize browser narrow — should behave like the current mobile layout.
- Drop into a Framer tablet frame (~768px) and phone frame (~390px) — layout should now match the iPhone rendering instead of distorting.
- iPhone Safari — unchanged.

### Technical notes

- Tailwind v4 container queries: `@container` on the ancestor, then `@sm:`, `@md:`, `@lg:`, `@xl:` on descendants. Custom sizes via `@min-[640px]:` or by defining `--container-*` tokens in `@theme`.
- `cqh`/`cqw`/`cqi` units resolve against the nearest size container, falling back to viewport if none — safe to use everywhere once the root container exists.
- No route, data, or component-API changes. Pure styling + one hook rewrite.
- Estimated scope: ~6 files edited, no new dependencies, no schema changes.
