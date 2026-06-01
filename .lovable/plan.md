Remove the save-as-image button and all related logic from the prototype.

## Files touched

### 1. `src/routes/generator.tsx`
- Remove `html2canvas-pro` import.
- Remove `toast` import from `sonner` (only used in `handleSave`).
- Remove `useRef` from React imports (no longer needed).
- Remove `saving` state variable and `menuRef` ref.
- Remove `handleSave` function entirely.
- Remove the "⬇ save as image" button from the step === 4 actions block.
- Remove `innerRef={menuRef}` prop from the `<PixelNotepad>` JSX.

### 2. `src/components/PixelNotepad.tsx`
- Remove `innerRef: React.RefObject<HTMLDivElement | null>` from the `PixelNotepadProps` interface.
- Remove `innerRef` from the destructured props.
- Remove `ref={innerRef}` from the root `<div>`.

### 3. `package.json`
- Remove the `html2canvas-pro` dependency entry.

## Out of scope
- The `<Toaster />` in `src/routes/__root.tsx` is left in place (harmless and reusable for future toasts).
- No other UI or feature changes.