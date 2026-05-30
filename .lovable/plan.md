# Fix "save as image" button

## What's broken
`handleSave` in `src/routes/generator.tsx` uses `toPng()` from `html-to-image`, wrapped in a try/catch that only logs to the console. Nothing downloads because the capture throws: `html-to-image` cannot serialize the `oklch(...)` colors that Tailwind v4 / `src/styles.css` use throughout the notepad. The error is swallowed, so the button appears dead.

## Fix

1. Replace `html-to-image` with `html2canvas-pro` — a maintained fork that supports `oklch`, `lab`, and CSS variables. This is the smallest change that makes the button actually produce a PNG.
2. Rewrite `handleSave` to:
   - render `menuRef.current` with `html2canvas-pro` (`scale: 2`, `backgroundColor: "#FBF4E8"`, `useCORS: true`)
   - convert the canvas to a Blob via `canvas.toBlob()`
   - trigger a download of `cozy-menu-{timestamp}.png` via an object URL, then revoke it
   - on failure, show a `sonner` toast (`toast.error("Couldn't save image, please try again")`) instead of silent `console.error`
3. Add a brief "saving…" disabled state on the button while the capture runs so the user gets feedback on the click.

No new buttons, no print, no copy — only the existing "save as image" button is touched.

## Files touched
- `package.json` — remove `html-to-image`, add `html2canvas-pro`
- `src/routes/generator.tsx` — swap import, rewrite `handleSave`, add saving state on the button

## Out of scope
Menu generation, rate limiting, mascot logic, notepad styling.
