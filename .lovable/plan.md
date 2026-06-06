## Goal
Replace the pixel display font (Silkscreen) with the body font (Nunito) everywhere, so all text matches the style of the "Tiny missions for soft days" line.

## Approach
One small CSS change in `src/styles.css` — repoint the `--font-pixel` token to the same stack as `--font-body`. Every `.font-pixel` class and `font-pixel` utility across the app (landing, generator, notepad, buttons, chips, footer, etc.) will then render in Nunito automatically. No component edits needed.

### Change
In `src/styles.css` `@theme inline` block:
```css
--font-pixel: "Nunito", ui-sans-serif, system-ui, sans-serif;
--font-body:  "Nunito", ui-sans-serif, system-ui, sans-serif;
```

Also drop the `letter-spacing: 0.02em` from the `.font-pixel` rule in `@layer base` so headings/buttons read naturally in Nunito.

### Optional cleanup (kept minimal)
- Leave the Silkscreen `<link>` in `__root.tsx` in place for now (harmless). I can remove it in a follow-up if you'd like to trim the network request.

### Out of scope
- No component refactors, no class renames, no layout/spacing changes.
