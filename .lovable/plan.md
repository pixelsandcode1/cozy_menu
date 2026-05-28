## Problem
The "lovely choice ✿" text below the Begin button currently appears whenever a mascot is pre-selected from localStorage (e.g., on a return visit), even before the user actively makes a choice in the current session.

## Solution
Track an explicit `hasSelected` flag that only flips to `true` when the user actively clicks a mascot card. The restored localStorage value still pre-selects the mascot visually, but the confirmation text only appears after a fresh click.

## Changes
1. In `src/routes/index.tsx`, add a `hasSelected` state alongside `picked`.
2. Set `hasSelected = true` inside the mascot `onClick` handler.
3. Change the conditional message to use `hasSelected` instead of `picked`:
   - `hasSelected ? "lovely choice ✿" : "tap a friend to begin"`
4. Keep the `useEffect` restoring `picked` from localStorage, but do NOT set `hasSelected` there.

No other files touched.