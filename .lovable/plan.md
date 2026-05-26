## Problem

`CozyRoom` is rendered as a `fixed inset-0 -z-10` element, but `body` has a solid cream `background-color` painted on top of it (because negative z-index sits behind the body's background layer). Result: the room never shows.

## Fix

1. **`src/components/CozyRoom.tsx`** — change wrapper from `fixed inset-0 -z-10` to `fixed inset-0 z-0` so it paints above the body background but still behind page content.

2. **`src/routes/generator.tsx`** — ensure the `<main>` is `relative z-10` (already `relative`, just add `z-10`) and that its children render above the backdrop. Also remove any solid `bg-background` on `main` if present so the room shows through.

3. **`src/routes/index.tsx`** — same: wrap landing content in a `relative z-10` container so it sits above the new `z-0` backdrop.

4. **`src/styles.css`** — leave the cream body background as the global fallback (good for routes without a room like `/about`). The room simply covers it on `/` and `/generator`.

No other behavior changes. Accessibility attributes (`aria-hidden`, `pointer-events-none`) on the room are preserved so it remains decorative and non-interactive.

## Verification

After the change, use the browser tool to load `/generator`, step through to pick a weather, and confirm the window scene + rug + plant render behind the question card. Also confirm landing page shows the sunny default room.
