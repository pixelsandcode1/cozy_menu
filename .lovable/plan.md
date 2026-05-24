## Overview

A self-contained, frontend-only interactive prototype embedded on your portfolio: a cozy pixel-art **Dopamine Menu Generator**. Users pick a mascot, answer 3 gentle questions (mood, time, weather), and receive a randomized cozy activity menu drawn from local data. No backend, no AI calls, no database.

---

## Sitemap

```text
/                    Landing — mascot picker + intro
/generator           3-step question flow + menu reveal
  (single route, internal state for steps)
/about (optional)    1-paragraph "about this prototype" for portfolio context
```

Single-page feel, but split into 2 routes so the portfolio iframe can deep-link to `/generator` if needed. All state lives client-side (React state + localStorage for chosen mascot).

---

## Interaction Flow

```text
Landing
  │  pick mascot (cat / frog / bunny / ghost)
  ▼
Step 1 — "How are you feeling today?"   (mood chips)
  ▼
Step 2 — "How much time do you have?"   (time chips)
  ▼
Step 3 — "What's it like outside?"      (weather chips)
  ▼
Generating… ("Today's cozy side missions can include…")
  ▼
Menu reveal (4 activities) + mascot idle animation
  │
  ├─ Regenerate  (up to 3× / 5 min, then gentle countdown message)
  ├─ Download as pixel-styled PNG
  └─ Start over  (returns to Step 1, keeps mascot)
```

Back button on every step. Progress dots (●●○) above questions. No required typing — all tap/click chips for minimal cognitive load.

---

## Screen Breakdown

**1. Landing**
- Soft pastel background, title "Your Cozy Dopamine Menu"
- Subtitle: "Tiny missions for soft days"
- 4 mascot tiles (pixel art): Pip the Cat, Sprig the Frog, Tuft the Bunny, Boo the Ghost — each with a one-line personality
- "Begin →" button enabled once mascot picked

**2. Question Steps (×3)**
- Mascot peeks in bottom-left
- Question heading + 4–6 chip options
- Progress dots, Back / Next
- Chips show pixel-style emoji/SVG icon + label

**3. Generating Interlude (~1.2s)**
- "Today's cozy side missions can include…"
- Mascot does a small loop animation (blink / bob)
- Sparkle particles

**4. Menu Reveal**
- 4 activity cards stacked, each with: pixel icon, activity name, gentle one-line description, est. time
- Mascot animates idle in bottom corner
- Buttons: **Regenerate** (shows "2 fresh menus left"), **Save as image**, **Start over**
- When cap hit: mascot speech bubble "let's pause and breathe — back in 4:32" with live countdown

---

## UI Concept

**Vibe:** Cozy pixel art, soft pastel, whimsical, uncluttered. Reference: Pinterest cozy pixel art link provided.

**Palette** (pastel, AA-contrast safe for body text):
- Background: warm cream `#FBF4E8`
- Card surface: soft peach `#FDE6D3`
- Primary (buttons / accents): muted lavender `#9B8AC4`
- Secondary: sage `#A8C6A1`
- Sky accent: powder blue `#B8D8E8`
- Text: deep plum `#3A2E4C` on cream → ~12:1 contrast ✓

**Typography:**
- Headings: **Silkscreen** or **VT323** (pixel-style, used large only)
- Body & chips: **Nunito** (rounded, highly readable) — ensures WCAG AA
- Min body size 16px, chip labels 15px medium

**Pixel feel:**
- Chunky 8–12px border radius
- 2–3px hard "pixel shadow" offsets instead of soft blur
- `image-rendering: pixelated` on all raster mascot/icon assets
- Subtle CSS `steps()` animations for mascot blink/bob (no easing)

**Assets:**
- **AI-generated pixel art mascots** (4 PNGs, transparent bg) via imagegen — chunky cozy pixel art, ~256×256
- **Inline SVG icons** for weather/mood/activity (small, consistent, free)

---

## Interactive Prototype Scope

- Mascot picker (4 options, persist to localStorage)
- 3-step chip-based questionnaire with progress
- Generating interlude with mascot animation
- Menu reveal: 4 activities pulled from local dataset, filtered by mood+time+weather, then randomized
- Regenerate with rate-limit (3 / 5min via localStorage timestamps) + gentle countdown
- Save as PNG (html-to-image library, renders the menu card)
- Start-over flow
- Fully responsive, works inside an iframe on your portfolio

---

## What I need from you before building

I'll need you to provide the **predefined datasets**. Suggested structure — please confirm or edit:

**Moods** (pick ~6): e.g. Tired, Anxious, Restless, Sad, Content, Energized
**Time ranges** (pick 4): e.g. 5 min, 15 min, 30 min, 1 hour+
**Weather** (pick 5): e.g. Sunny, Cloudy, Rainy/Gloomy, Snowy, Hot
**Activity pool** (~40–60 activities), each tagged with:
- moods it fits (array)
- min/max time
- weather it fits (array, or "any")
- category: low-effort dopamine / creative / low-movement / high-movement / social

Once you confirm the plan, I'll ask for these in a structured list (or provide a starter set you can edit).

---

## Technical Details

- **Stack:** Existing TanStack Start template, frontend only, no Lovable Cloud
- **Routes:** `src/routes/index.tsx` (landing), `src/routes/generator.tsx` (flow)
- **State:** React `useState` for flow; `localStorage` for mascot + rate-limit timestamps
- **Data:** `src/data/activities.ts` (typed activity pool), `src/data/options.ts` (moods/times/weather)
- **Filtering:** pure function `pickMenu(mood, time, weather, exclude[])` → returns 4 balanced activities (1 per category where possible), randomized
- **PNG export:** `html-to-image` (~10kb, no deps)
- **Animation:** CSS `@keyframes` with `steps()` for true pixel feel; no Framer Motion needed
- **Accessibility:** semantic chips as `<button>`, focus rings, `aria-live` for menu updates, all text passes WCAG AA on chosen palette
- **SEO:** per-route `head()` metadata
- **Mascot images:** 4 PNGs generated into `src/assets/` via imagegen `premium` tier for crisp pixel quality

---

## Next step

Approve this plan, then I'll request the mood / time / weather / activity dataset from you (or generate a starter set for you to edit) and begin the build.