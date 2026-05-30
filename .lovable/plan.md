# Reset fresh-menu counter to 3 after the timer ends

## What's happening

The counter uses a **rolling** 5-minute window (`src/lib/rate-limit.ts`). Three timestamps are stored; each one expires individually 5 minutes after it was made. So when the user hits the limit and waits for the on-screen countdown to finish, only the **oldest** stamp has aged out — the other two are still active. `regensRemaining()` returns `1`, which is why the footer reads "1 fresh menu left in this little window".

The countdown shown to the user (`msUntilReset`) is based on the oldest stamp, which reinforces the expectation that when it hits 0:00 the allowance is fully restored to 3 — but the current logic only restores 1.

## Fix

Make the limit a **fixed window**: once the countdown elapses, all three slots come back at once.

- File: `src/lib/rate-limit.ts`
- In `active()`, change the semantics so that if the most recent batch has fully expired we treat the list as empty. Simplest implementation: when reading stamps, if the oldest stamp is older than `WINDOW_MS`, clear the whole list (write `[]` back) and return `[]`. Otherwise return the stamps as-is.
- `regensRemaining()`, `recordRegen()`, and `msUntilReset()` keep their current shape and will now naturally report `3` once the window closes.

No other files need to change — `generator.tsx` already calls `setRemaining(regensRemaining())` when the countdown ticks to 0, so the footer text will update on its own.

## Note

This also means a user who burns 1 menu, waits 4 minutes, then burns 2 more will get all 3 back 5 minutes after that **third** action, instead of staggered refills. That matches the single visible countdown the UI already shows, so it's the less confusing behavior.
