import type { Category, MoodId, TimeId, WeatherId } from "./options";

export interface Activity {
  id: string;
  name: string;
  blurb: string;
  emoji: string;
  category: Category;
  maxMinutes: number; // fits in time slots <= this
  moods: MoodId[]; // empty = any
  weathers: WeatherId[] | "any";
  outdoor?: boolean;
}

const A = (a: Activity) => a;

export const activities: Activity[] = [
  // Low-effort dopamine boosts
  A({ id: "cozy-drink", name: "Make a cozy drink", blurb: "Tea, cocoa, or a fizzy something.", emoji: "🍵", category: "dopamine", maxMinutes: 15, moods: ["tired", "anxious", "sad", "content"], weathers: "any" }),
  A({ id: "snack-plate", name: "Build a tiny snack plate", blurb: "Three little things on a pretty dish.", emoji: "🍓", category: "dopamine", maxMinutes: 15, moods: ["tired", "content", "sad"], weathers: "any" }),
  A({ id: "warm-shower", name: "Take a warm shower", blurb: "Let the water do the thinking.", emoji: "🚿", category: "dopamine", maxMinutes: 15, moods: ["anxious", "tired", "sad"], weathers: "any" }),
  A({ id: "fav-song", name: "Play your favorite song", blurb: "The one that always works.", emoji: "🎧", category: "dopamine", maxMinutes: 5, moods: ["tired", "sad", "restless", "energized"], weathers: "any" }),
  A({ id: "pet-cuddle", name: "Cuddle a pet or pillow", blurb: "Soft thing, slow breaths.", emoji: "🧸", category: "dopamine", maxMinutes: 5, moods: ["tired", "anxious", "sad"], weathers: "any" }),
  A({ id: "open-window", name: "Open a window for a minute", blurb: "A little fresh air counts.", emoji: "🪟", category: "dopamine", maxMinutes: 5, moods: ["tired", "anxious", "restless"], weathers: ["sunny", "cloudy", "snowy"] }),
  A({ id: "sun-patch", name: "Sit in a sun patch", blurb: "Like a cat. Five quiet minutes.", emoji: "🌤️", category: "dopamine", maxMinutes: 15, moods: ["tired", "sad", "content"], weathers: ["sunny"] }),

  // Creative
  A({ id: "doodle", name: "Doodle something silly", blurb: "No skill required, promise.", emoji: "✏️", category: "creative", maxMinutes: 30, moods: ["anxious", "restless", "content", "sad"], weathers: "any" }),
  A({ id: "coloring", name: "Color in a coloring book", blurb: "Stay inside the lines, or don't.", emoji: "🎨", category: "creative", maxMinutes: 30, moods: ["tired", "anxious", "sad", "content"], weathers: "any" }),
  A({ id: "journal", name: "Scribble a few thoughts", blurb: "One page, no rules.", emoji: "📓", category: "creative", maxMinutes: 15, moods: ["anxious", "sad", "content"], weathers: "any" }),
  A({ id: "photo-walk", name: "Take 5 little photos at home", blurb: "Find tiny pretty things.", emoji: "📷", category: "creative", maxMinutes: 15, moods: ["restless", "content", "energized"], weathers: "any" }),
  A({ id: "playlist", name: "Make a 5-song playlist", blurb: "For exactly this mood.", emoji: "🎶", category: "creative", maxMinutes: 30, moods: ["restless", "content", "sad", "energized"], weathers: "any" }),
  A({ id: "craft", name: "Try a tiny craft", blurb: "Origami, beads, anything.", emoji: "🪡", category: "creative", maxMinutes: 60, moods: ["content", "restless", "energized"], weathers: "any" }),
  A({ id: "bake", name: "Bake something simple", blurb: "Cookies don't have to be fancy.", emoji: "🍪", category: "creative", maxMinutes: 60, moods: ["content", "energized", "sad"], weathers: "any" }),

  // Low movement
  A({ id: "stretch-lofi", name: "Stretch with lofi music", blurb: "Slow, gentle, no goals.", emoji: "🧘", category: "low-movement", maxMinutes: 30, moods: ["tired", "anxious", "sad", "content"], weathers: "any" }),
  A({ id: "tidy-corner", name: "Tidy one little corner", blurb: "Just one. Not the whole room.", emoji: "🧺", category: "low-movement", maxMinutes: 15, moods: ["restless", "anxious", "content"], weathers: "any" }),
  A({ id: "read-chapter", name: "Read one chapter", blurb: "Or a comic. Or a poem.", emoji: "📖", category: "low-movement", maxMinutes: 30, moods: ["tired", "content", "sad"], weathers: "any" }),
  A({ id: "puzzle", name: "Do a small puzzle", blurb: "Crossword, sudoku, jigsaw.", emoji: "🧩", category: "low-movement", maxMinutes: 30, moods: ["content", "tired", "restless"], weathers: "any" }),
  A({ id: "rearrange", name: "Rearrange a shelf", blurb: "Make a tiny gallery.", emoji: "🪴", category: "low-movement", maxMinutes: 30, moods: ["restless", "content", "energized"], weathers: "any" }),
  A({ id: "breath", name: "Try 10 slow breaths", blurb: "In for 4, out for 6.", emoji: "🫧", category: "low-movement", maxMinutes: 5, moods: ["anxious", "tired", "sad", "restless"], weathers: "any" }),

  // High movement
  A({ id: "walk-out", name: "Take a slow walk outside", blurb: "Notice three small things.", emoji: "🚶", category: "high-movement", maxMinutes: 30, moods: ["restless", "anxious", "content", "energized"], weathers: ["sunny", "cloudy"], outdoor: true }),
  A({ id: "puddle-walk", name: "Splash through a puddle walk", blurb: "Boots on, mood up.", emoji: "🌂", category: "high-movement", maxMinutes: 30, moods: ["restless", "content", "energized"], weathers: ["rainy"], outdoor: true }),
  A({ id: "snow-stomp", name: "Stomp around in the snow", blurb: "Crunchy footsteps, bundle up.", emoji: "🥾", category: "high-movement", maxMinutes: 30, moods: ["restless", "content", "energized"], weathers: ["snowy"], outdoor: true }),
  A({ id: "indoor-dance", name: "Dance to one full song", blurb: "Curtains closed, no judges.", emoji: "💃", category: "high-movement", maxMinutes: 5, moods: ["restless", "sad", "energized"], weathers: "any" }),
  A({ id: "yoga", name: "Do a short yoga flow", blurb: "Ten minutes, soft socks.", emoji: "🌿", category: "high-movement", maxMinutes: 30, moods: ["anxious", "restless", "content", "energized"], weathers: "any" }),
  A({ id: "bike-roam", name: "Go for a little bike roam", blurb: "No destination needed.", emoji: "🚲", category: "high-movement", maxMinutes: 60, moods: ["restless", "energized", "content"], weathers: ["sunny", "cloudy"], outdoor: true }),
  A({ id: "shade-walk", name: "Walk in the shade", blurb: "Keep it cool and breezy.", emoji: "🌳", category: "high-movement", maxMinutes: 30, moods: ["restless", "content"], weathers: ["hot"], outdoor: true }),

  // Social
  A({ id: "text-friend", name: "Text a friend a tiny hello", blurb: "Just \"thinking of you\".", emoji: "💌", category: "social", maxMinutes: 5, moods: ["sad", "anxious", "content", "tired"], weathers: "any" }),
  A({ id: "voice-note", name: "Send a voice note", blurb: "Ramble about your day.", emoji: "🎙️", category: "social", maxMinutes: 5, moods: ["content", "sad", "energized"], weathers: "any" }),
  A({ id: "share-song", name: "Share a song with someone", blurb: "The one you can't stop replaying.", emoji: "📻", category: "social", maxMinutes: 5, moods: ["content", "sad", "energized"], weathers: "any" }),
  A({ id: "call-loved", name: "Call someone you love", blurb: "Even if it's short.", emoji: "📞", category: "social", maxMinutes: 30, moods: ["sad", "content", "tired"], weathers: "any" }),
  A({ id: "compliment", name: "Send a sincere compliment", blurb: "Make someone glow.", emoji: "💝", category: "social", maxMinutes: 5, moods: ["content", "energized", "sad"], weathers: "any" }),
  A({ id: "coffee-invite", name: "Invite someone for a walk", blurb: "Low-key, low-pressure.", emoji: "☕", category: "social", maxMinutes: 60, moods: ["content", "energized"], weathers: ["sunny", "cloudy"] }),

  // More dopamine
  A({ id: "candle", name: "Light a candle or incense", blurb: "Tiny ritual, big mood shift.", emoji: "🕯️", category: "dopamine", maxMinutes: 5, moods: ["tired", "anxious", "content"], weathers: "any" }),
  A({ id: "softest-blanket", name: "Wrap up in your softest blanket", blurb: "Burrito mode: activated.", emoji: "🛌", category: "dopamine", maxMinutes: 5, moods: ["tired", "sad", "anxious"], weathers: "any" }),
  A({ id: "comfort-clip", name: "Watch a comfort show clip", blurb: "Just one. You know the one.", emoji: "📺", category: "dopamine", maxMinutes: 15, moods: ["tired", "sad"], weathers: "any" }),
  A({ id: "sun-minute", name: "Step outside for 60 seconds of sun", blurb: "Vitamin D, tiny dose.", emoji: "🌞", category: "dopamine", maxMinutes: 5, moods: ["tired", "content"], weathers: ["sunny", "cloudy", "hot"], outdoor: true }),
  A({ id: "slow-fruit", name: "Eat a piece of fruit slowly", blurb: "Notice the colors and smell.", emoji: "🍊", category: "dopamine", maxMinutes: 5, moods: ["tired", "content", "anxious"], weathers: "any" }),

  // More creative
  A({ id: "haiku", name: "Write a haiku about your day", blurb: "Five-seven-five, that's it.", emoji: "🖋️", category: "creative", maxMinutes: 15, moods: ["content", "sad", "anxious"], weathers: "any" }),
  A({ id: "home-screen", name: "Rearrange your phone home screen", blurb: "Fresh layout, fresh vibes.", emoji: "📱", category: "creative", maxMinutes: 15, moods: ["restless", "content"], weathers: "any" }),
  A({ id: "window-sketch", name: "Sketch the view from your window", blurb: "Quick lines, no erasing.", emoji: "🖼️", category: "creative", maxMinutes: 30, moods: ["content", "sad"], weathers: "any" }),
  A({ id: "lyric-rewrite", name: "Try a 1-song lyric rewrite", blurb: "Make it about your cat.", emoji: "🎤", category: "creative", maxMinutes: 15, moods: ["restless", "energized", "content"], weathers: "any" }),
  A({ id: "journal-decor", name: "Decorate a page in your journal", blurb: "Stickers, washi, doodles.", emoji: "🌸", category: "creative", maxMinutes: 30, moods: ["content", "anxious", "sad"], weathers: "any" }),

  // More low movement
  A({ id: "mat-pilates", name: "Do a 10-minute mat pilates flow", blurb: "Core wake-up, gently.", emoji: "🧘‍♀️", category: "low-movement", maxMinutes: 30, moods: ["content", "restless", "energized"], weathers: "any" }),
  A({ id: "mobility", name: "Gentle mobility for hips & shoulders", blurb: "Loosen up the stiff bits.", emoji: "🦴", category: "low-movement", maxMinutes: 15, moods: ["tired", "anxious", "restless", "content"], weathers: "any" }),
  A({ id: "foam-roll", name: "Foam roll or self-massage", blurb: "Hurts so good.", emoji: "💆", category: "low-movement", maxMinutes: 15, moods: ["tired", "restless", "content"], weathers: "any" }),
  A({ id: "body-scan", name: "Do a guided body scan meditation", blurb: "Head to toes, slowly.", emoji: "🌙", category: "low-movement", maxMinutes: 15, moods: ["anxious", "tired", "sad"], weathers: "any" }),
  A({ id: "neck-rolls", name: "Slow neck & shoulder rolls", blurb: "Right at your desk.", emoji: "🪷", category: "low-movement", maxMinutes: 5, moods: ["tired", "anxious", "restless"], weathers: "any" }),

  // More high movement
  A({ id: "home-yoga", name: "Home yoga session", blurb: "A few sun salutations.", emoji: "🧘", category: "high-movement", maxMinutes: 30, moods: ["content", "restless", "energized", "anxious"], weathers: "any" }),
  A({ id: "ball-outside", name: "Shoot hoops or kick a ball outside", blurb: "Backyard or driveway.", emoji: "⚽", category: "high-movement", maxMinutes: 30, moods: ["restless", "energized", "content"], weathers: ["sunny", "cloudy"], outdoor: true }),
  A({ id: "strength-circuit", name: "Quick bodyweight strength circuit", blurb: "Squats, push-ups, planks.", emoji: "💪", category: "high-movement", maxMinutes: 15, moods: ["restless", "energized"], weathers: "any" }),
  A({ id: "jump-rope", name: "Jump rope for one song", blurb: "Pretend you're a kid again.", emoji: "🪢", category: "high-movement", maxMinutes: 5, moods: ["restless", "energized"], weathers: "any" }),
  A({ id: "short-jog", name: "Short jog around the block", blurb: "Slow pace counts.", emoji: "🏃", category: "high-movement", maxMinutes: 30, moods: ["restless", "energized"], weathers: ["sunny", "cloudy"], outdoor: true }),

  // More social
  A({ id: "send-meme", name: "Send a friend a meme", blurb: "The one that made you laugh.", emoji: "😂", category: "social", maxMinutes: 5, moods: ["content", "tired", "sad"], weathers: "any" }),
  A({ id: "plan-hangout", name: "Plan a tiny hangout for next week", blurb: "Pick a day, send the text.", emoji: "🗓️", category: "social", maxMinutes: 15, moods: ["content", "energized"], weathers: "any" }),
  A({ id: "thank-you", name: "Write a short thank-you note", blurb: "Someone deserves it.", emoji: "✉️", category: "social", maxMinutes: 15, moods: ["content", "sad"], weathers: "any" }),
  A({ id: "reply-message", name: "Reply to a message you've put off", blurb: "Just one. You'll feel lighter.", emoji: "💬", category: "social", maxMinutes: 5, moods: ["anxious", "content"], weathers: "any" }),
  A({ id: "would-you-rather", name: "Ask a friend a 'would you rather'", blurb: "Silly questions, fun replies.", emoji: "🤔", category: "social", maxMinutes: 5, moods: ["content", "restless", "energized"], weathers: "any" }),
];

export function pickMenu(
  mood: MoodId,
  time: TimeId,
  weather: WeatherId,
  excludeIds: string[] = [],
): Activity[] {
  const userMin = Number(time);
  const pool = activities.filter((a) => {
    if (excludeIds.includes(a.id)) return false;
    // skip activities that are substantially longer than the user's window
    if (a.maxMinutes > userMin && a.maxMinutes >= 30 && userMin < 30) return false;
    if (a.maxMinutes > userMin && userMin <= 15) return false;
    if (!a.moods.includes(mood)) return false;
    if (a.weathers !== "any" && !a.weathers.includes(weather)) return false;
    return true;
  });

  const order: Activity["category"][] = ["dopamine", "creative", "low-movement", "high-movement", "social"];
  // shuffle order so featured categories vary
  const shuffled = [...order].sort(() => Math.random() - 0.5);

  const picked: Activity[] = [];
  const usedIds = new Set<string>();
  for (const cat of shuffled) {
    if (picked.length >= 4) break;
    const candidates = pool.filter((a) => a.category === cat && !usedIds.has(a.id));
    if (candidates.length === 0) continue;
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    picked.push(chosen);
    usedIds.add(chosen.id);
  }

  // top up if we don't have 4
  if (picked.length < 4) {
    const rest = pool.filter((a) => !usedIds.has(a.id)).sort(() => Math.random() - 0.5);
    while (picked.length < 4 && rest.length) {
      const next = rest.pop()!;
      picked.push(next);
      usedIds.add(next.id);
    }
  }

  // fallback: relax mood filter
  if (picked.length < 4) {
    const relaxed = activities.filter(
      (a) =>
        !usedIds.has(a.id) &&
        (a.weathers === "any" || a.weathers.includes(weather)),
    ).sort(() => Math.random() - 0.5);
    while (picked.length < 4 && relaxed.length) {
      picked.push(relaxed.pop()!);
    }
  }

  return picked.slice(0, 4);
}
