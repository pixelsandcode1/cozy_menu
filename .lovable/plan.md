# Fix menu screen overlap + Start Over counter

Two small changes on the generator output screen.

## 1. Remove the mascot speech bubble on the menu

On the notepad output, the mascot's encouragement bubble overlaps the "✿ picked with care by {mascot}" footer. Remove the bubble entirely and keep just the mascot peeking from the corner.

- File: `src/components/PixelNotepad.tsx`
- Delete the speech-bubble `<div>` (the one containing `{line}` and the little arrow span) inside the bottom-right `flex` container.
- Keep the `<Mascot id={mascotId} size={88} animated />` so the mascot still appears.
- Remove the now-unused `line` variable and the `getMascotLine` import.

The encouragement line still shows during the generating interlude, so the mascot's voice isn't lost — it just doesn't cover the menu.

## 2. Start Over should consume a regeneration

Right now, "start over" resets the questions and lets the user produce a brand-new menu without touching the counter, so the rate limit can be bypassed. Make Start Over count the same as "try a different menu".

- File: `src/routes/generator.tsx`
- In `handleStartOver`, before resetting state:
  - If `remaining <= 0`, do nothing (same guard as regenerate).
  - Otherwise call `recordRegen()` and `setRemaining(regensRemaining())`, then proceed with the existing reset.
- The Start Over button should be disabled (and visually muted) when `remaining <= 0`, matching the regenerate behavior, so the rate-limit message remains the only path forward.

No other files need to change.
