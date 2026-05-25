# Cozy Room Redesign Plan

Authoring polish pass to make the prototype feel hand-made and portfolio-worthy. No backend, no new dependencies.

## 1. Pixel cozy room backdrop (weather-reactive)

New component `src/components/CozyRoom.tsx` — a CSS/SVG pixel scene rendered behind all content on `/` and `/generator`:

- Floor (rug), back wall, baseboard, a framed window, a desk-lamp, a potted plant, a small wall sticker.
- Window contents swap with the current `weather` selection (read from state on `/generator`, default `sunny` on `/`):
  - sunny → blue sky + pixel sun + 2 clouds (slow drift)
  - cloudy → grey-blue sky + layered clouds
  - rainy → dim sky + animated pixel raindrops (CSS `steps()` falling loop)
  - snowy → pale sky + drifting snowflakes
  - hot → orange/peach sky + heat shimmer (subtle vertical wobble)
- Pure CSS + inline SVG with `image-rendering: pixelated`; no new assets needed.
- Accessibility: backdrop is `aria-hidden="true"`, marked `pointer-events-none`, sits behind a `z-10` content layer. Respects `prefers-reduced-motion` — particles freeze, no shimmer.

Wire-up: render `<CozyRoom weather={weather ?? 'sunny'} />` from `__root.tsx` via a tiny context, OR (simpler, chosen) render it inside each route and pass weather as a prop. Landing uses `'sunny'`; generator passes the selected weather, updating live as the user clicks the weather chips on step 3.

## 2. Diegetic pixel notepad menu

Replace the current rounded-card `MenuReveal` with a pixel notepad:

- Notepad shell: cream paper, pink top binding with pixel spiral holes, faint horizontal rule lines (repeating-linear-gradient), slight 1° tilt.
- Each activity becomes a small "sticky" rectangle "taped" onto the page:
  - Two short pixel-tape strips (semi-transparent washi colors: peach, sage, lavender, powder blue — rotated ±6°) across the top corners of each sticky.
  - Stickies alternate a tiny rotation (-1.5°, +1°, -0.5°, +1.5°) for a hand-placed feel.
- Mascot peeks from the bottom-right corner of the notepad holding a pencil (existing mascot image, just positioned).
- Handwritten-feel signature line: "✿ picked with care by {mascot.name}".
- Save-as-image continues to work — html-to-image captures the notepad node, tape and tilts included.
- Accessibility: notepad keeps `role="region"` + `aria-label`; rotations are decorative; tape is `aria-hidden`. Contrast verified against cream paper using existing `--foreground` token.

## 3. Mood-aware mascot lines

New file `src/data/mascot-lines.ts` — a `lines[mascotId][moodId]` map of short first-person quips, e.g.:

- Pip (cat) × tired → "mm. let's start small today."
- Pip × restless → "okay okay — let's burn some zoomies."
- Sprig (frog) × sad → "tiny rainy joys count. promise."
- Tuft (bunny) × anxious → "soft socks first. then we plan."
- Boo (ghost) × content → "lovely. let's keep this feeling."
- Plus a neutral fallback per mascot when mood not yet picked.

Used in three spots:
- Generator step 1 subhead (after mood chosen): swap "no wrong answer ✿" for the matching line.
- Generating interlude: the mascot line under the sparkles.
- Menu reveal: a small speech-bubble-style line near the notepad mascot ("mm. let's start small today.").

## 4. Landing footer strip

Add a slim strip at the very bottom of `/`:

```
✿ designed & built by Rachael using Lovable <3
```

Pixel font, muted foreground color, centered, sits above (or replaces) the current `about this prototype` footer link — keep the about link on the same line, separated by a `·`.

## 5. Audit: no gradient buttons

Sweep `src/routes/*` and `src/components/*` for any `bg-gradient-*` / `from-` / `to-` utility usage on buttons or interactive surfaces and confirm none exist. Current buttons already use solid pastel tokens (`bg-primary`, `bg-secondary`, `bg-accent`, `bg-card`) — they stay. No changes to `button.tsx` variants. Confirm `--gradient-*` CSS tokens (if any in `src/styles.css`) are not applied to buttons.

## 6. Accessibility pass

- Backdrop and decorative tape: `aria-hidden="true"`, `pointer-events-none`.
- `prefers-reduced-motion`: disables rain/snow/shimmer/cloud-drift and the notepad tilt animation; mascot bob already respects it via existing classes (verify).
- All interactive controls keep visible `focus-visible:ring` (already present on chips and buttons).
- Color contrast: mood line text on cream paper uses `text-foreground` (passes AA); tape colors are decorative only.
- Single `<main>` per route preserved.
- New mascot speech bubble uses `aria-live="polite"` so the line is announced when mood changes.

## Files touched

```text
new   src/components/CozyRoom.tsx
new   src/components/PixelNotepad.tsx     (extracted from MenuReveal)
new   src/data/mascot-lines.ts
edit  src/routes/index.tsx                (backdrop + footer strip + mood-line on landing? no — landing has no mood)
edit  src/routes/generator.tsx            (backdrop with live weather, mascot lines, swap MenuReveal → PixelNotepad)
edit  src/styles.css                      (pixel-tape utility, notepad paper bg, rain/snow keyframes w/ steps(), reduced-motion guards)
```

No dependencies added. No data model changes. Activity pool, rate limit, and save-as-image flow are untouched.

## Open question

Should the landing page also show the cozy room (with a default sunny window), or stay on the current clean cream background so the room is a "reveal" once the user enters the generator? Default in this plan: **show on both**, sunny on landing — it sets the tone immediately. Tell me if you'd prefer to keep landing minimal.
