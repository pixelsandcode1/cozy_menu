## Problem

In `src/components/CozyRoom.tsx`, the window is positioned at `top-[8vh]` with `aspect-[5/8]` and width `clamp(180px, 28vw, 320px)`. On wide-and-short viewports (full-screen desktop), the aspect-driven height pushes the window's bottom (plus its sill, which sits `-bottom-3` at `14px` tall) below the floor line at `bottom-[28vh]`, so it visibly extends onto the rug.

## Fix

Constrain the window so its bottom (including the sill) always stays above the floor.

**File: `src/components/CozyRoom.tsx`**

On the window wrapper element (currently `absolute left-[6vw] top-[8vh] w-[clamp(180px,28vw,320px)] aspect-[5/8]`):

- Keep width and `aspect-[5/8]` so the 5:8 proportion holds on tall viewports.
- Add an inline `maxHeight` that reserves the floor band + sill clearance:
  `style={{ maxHeight: 'calc(100vh - 8vh - 28vh - 26px)' }}`
  - `8vh` = the window's `top` offset
  - `28vh` = floor + baseboard band height
  - `26px` ≈ sill height (`14px`) + its `-bottom-3` (`12px`) offset, with a small buffer

When `maxHeight` kicks in, the wrapper becomes shorter than `aspect-[5/8]` would dictate; that's fine — `aspect-*` only applies when no explicit height wins. The window simply gets a bit less tall on short viewports, and never touches the rug.

No other changes. Sill, frame, and `WindowScene` already fill the wrapper via `absolute inset-0`, so they scale down with it automatically.

## Out of scope

No edits to the plant, rug, floor, mascots, `styles.css`, or any route file. Animation timings and scene sprites unchanged.

## Verification

Open `/` full-screen on a wide desktop viewport and a short laptop viewport — the window's sill should always sit above the wood floor line, with the rug fully clear below it. On narrow/tall viewports the window should look identical to today.
