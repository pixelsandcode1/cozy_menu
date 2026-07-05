This project was a first look into vibe coded tools and prototypes. The personal dopamine menu generator is a lightweight browser-based experience. Created in Lovable and edited/reviewed in VS Code. View live project at this link: [dopamine-menu-pixels.lovable.app](https://dopamine-menu-pixels.lovable.app)

---

## File Overview

### Routes

- **src/routes/index.tsx** — Landing page where users pick a pixel-art mascot companion before beginning.
- **src/routes/generator.tsx** — The main generator flow: three step-by-step questions (mood, time, weather) that produce a curated menu of cozy activities.
- **src/routes/about.tsx** — A simple "about this prototype" page explaining the project's purpose.
- **src/routes/__root.tsx** — Root layout providing the HTML shell, shared metadata, and global providers.

### Components

- **src/components/CozyRoom.tsx** — Decorative pixel-art room backdrop with a window scene that reacts to the selected weather (sun, clouds, rain, snow, heat shimmer).
- **src/components/PixelNotepad.tsx** — The final results view: a stitched notepad UI displaying the generated activity menu with washi-tape sticky notes and a mascot peeking from the corner.
- **src/components/Mascot.tsx** — Reusable pixel-art mascot image component with optional idle bob animation.

### Data

- **src/data/activities.ts** — Curated activity database (~60 items) tagged by mood, time budget, weather, and category (dopamine, creative, low-movement, high-movement, social). Includes the `pickMenu` algorithm that selects and shuffles 4 balanced recommendations.
- **src/data/mascots.ts** — Mascot definitions (Pip the cat, Kiwi the frog, Luna the bunny, Boo the ghost) with names, blurbs, and image sources.
- **src/data/options.ts** — Typed option lists for moods, time windows, weathers, and activity categories used across the generator.
- **src/data/mascot-lines.ts** — Personality-driven dialogue lines for each mascot based on the user's selected mood.

### Utilities

- **src/lib/rate-limit.ts** — Client-side rate limiting for menu regenerations: 3 fresh menus per 5-minute window, stored in localStorage with a countdown timer.
- **src/lib/utils.ts** — Shared utility helpers (e.g., `cn` for conditional class merging).

### Styling & Config

- **src/styles.css** — Global styles including the cozy pastel OKLCH color palette, custom pixel-border/pixel-shadow utilities, and Tailwind v4 theme configuration.
- **src/router.tsx** — TanStack Router setup with the generated route tree.
- **src/routeTree.gen.ts** — Auto-generated TanStack Router route tree (do not edit manually).
- **package.json** — Project dependencies including React 19, TanStack Start, TanStack Query, Tailwind CSS v4, and shadcn/ui primitives.
