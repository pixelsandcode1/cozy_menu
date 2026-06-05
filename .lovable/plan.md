
## Goal
Expand `src/data/activities.ts` with 25 new activities — 5 in each of the 5 categories — so generated menus have more variety. Include the user's requested examples (mat pilates, home yoga, mobility work, outdoor sports) in the appropriate categories.

## File to edit
`src/data/activities.ts` — append new entries to the `activities` array. No other files change; `pickMenu` already handles any new entries via category/mood/weather/time filtering.

## New activities

**Dopamine (low-effort boosts)** — 5
- Light a candle or incense (5m, tired/anxious/content, any)
- Wrap up in your softest blanket (5m, tired/sad/anxious, any)
- Watch a comfort show clip (15m, tired/sad, any)
- Step outside for 60 seconds of sun (5m, tired/content, sunny/cloudy/hot, outdoor)
- Eat a piece of fruit slowly (5m, tired/content/anxious, any)

**Creative** — 5
- Write a haiku about your day (15m, content/sad/anxious, any)
- Rearrange your phone home screen (15m, restless/content, any)
- Sketch the view from your window (30m, content/sad, any)
- Try a 1-song lyric rewrite (15m, restless/energized/content, any)
- Decorate a page in your journal (30m, content/anxious/sad, any)

**Low movement** — 5
- Do a 10-minute mat pilates flow (30m, content/restless/energized, any) ← requested
- Gentle mobility work for hips & shoulders (15m, tired/anxious/restless/content, any) ← requested
- Foam roll or self-massage (15m, tired/restless/content, any)
- Do a guided body scan meditation (15m, anxious/tired/sad, any)
- Slow neck & shoulder rolls at your desk (5m, tired/anxious/restless, any)

**High movement** — 5
- Home yoga session (sun salutations) (30m, content/restless/energized/anxious, any) ← requested
- Shoot hoops or kick a ball outside (30m, restless/energized/content, sunny/cloudy, outdoor) ← outdoor sport
- Quick bodyweight strength circuit (15m, restless/energized, any)
- Jump rope for one song (5m, restless/energized, any)
- Go for a short jog around the block (30m, restless/energized, sunny/cloudy, outdoor) ← outdoor sport

**Social** — 5
- Send a friend a meme that made you laugh (5m, content/tired/sad, any)
- Plan a tiny hangout for next week (15m, content/energized, any)
- Write a short thank-you note (15m, content/sad, any)
- Reply to one message you've been putting off (5m, anxious/content, any)
- Ask a friend a "would you rather" question (5m, content/restless/energized, any)

## Notes
- All entries use existing `Activity` shape, valid `MoodId` / `WeatherId` / `Category` values, and `maxMinutes ∈ {5,15,30,60}` so `pickMenu`'s time filter behaves correctly.
- Outdoor activities mark `outdoor: true` and restrict `weathers` accordingly (matching the existing pattern).
- No changes to `pickMenu`, types, or UI.
