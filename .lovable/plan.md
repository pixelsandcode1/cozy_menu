Fix CSS @import ordering error in src/styles.css by moving the Google Fonts import out of the stylesheet and into the HTML head via <link> tags.

**Root cause:** `src/styles.css` contains a Google Fonts `@import` in the middle of the file (after `:root` and before `@layer base`). LightningCSS requires all `@import` rules to precede every other rule except `@charset` and `@layer`.

**Changes:**
1. **Remove** the following block from `src/styles.css`:
   ```css
   /* pixel-art font + readable body font */
   @import url("https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Nunito:wght@500;600;700;800&display=swap");
   ```

2. **Add** Google Fonts `<link>` tags to the `head` object in `src/routes/__root.tsx`, before the existing `appCss` link:
   ```tsx
   { rel: "preconnect", href: "https://fonts.googleapis.com" },
   { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
   { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Nunito:wght@500;600;700;800&display=swap" },
   ```

No other files touched. Font tokens (`--font-pixel`, `--font-body`) remain in `@theme` and will resolve correctly once the fonts load via `<link>`.