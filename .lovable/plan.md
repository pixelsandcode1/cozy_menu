## Changes to `src/components/CozyRoom.tsx`

**1. Double the window's vertical size**
- Change `aspect-[5/4]` → `aspect-[5/8]` on the window wrapper. Sill follows automatically.

**2. Scale window scene contents proportionally**
- Sun (sunny): 36×36 → 56×56. Sun (hot): 44×44 → 68×68.
- Hills: heights `h-[40%]` / `h-[34%]` → `h-[28%]` / `h-[24%]` (taller window → larger absolute size, more sky).
- Cloud sprite base: 60×18 body, 28×20 + 24×18 puffs → 84×26 body, 40×28 + 34×26 puffs. Per-instance scales preserved.
- Rain drops: `h-[10px]` → `h-[14px]`. Snow flakes: 4×4 → 6×6.

**3. Remove the lamp**
Delete the entire "Lamp (top right)" block.

**4. Bigger, fuller potted plant**
- Wrapper: `w-[80px] h-[110px]` → `w-[130px] h-[180px]`, anchor `bottom-[16vh]` unchanged.
- Pot body: 60×40 → 100×64.
- Pot rim: 44×20 → 76×26.
- Existing 3 leaves: scale up roughly 1.6× (left 26×44 → 42×72, right 24×40 → 40×68, center 22×48 → 36×80) and reposition so they sit on top of the larger rim.
- Add 4 additional leaves for fullness:
  - Far-left low leaf, more rotation (~−28°), slightly darker green.
  - Far-right low leaf, mirrored.
  - Back-left tall leaf behind the center, lighter green.
  - Back-right tall leaf behind the center, lighter green.
- Use existing palette: greens `oklch(0.7 0.12 145)`, `oklch(0.74 0.12 150)`, `oklch(0.78 0.13 148)`, plus one slightly deeper `oklch(0.62 0.13 148)` for back-layer contrast. Plum border `oklch(0.28 0.06 305 / 25%)` kept on all leaves for the pixel outline.

## Out of scope
No changes to `styles.css`, `generator.tsx`, or `index.tsx`. Animation timings unchanged.

## Verification
Load `/` and step through `/generator` weather picks — confirm taller window, larger sun/clouds/rain/snow, no lamp, and a noticeably bigger, leafier plant in the bottom-right.