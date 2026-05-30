import type { MascotId } from "./mascots";
import type { MoodId } from "./options";

type Lines = Record<MascotId, Record<MoodId | "neutral", string>>;

export const mascotLines: Lines = {
  cat: {
    neutral: "purrrr. tell me how you are.",
    tired: "mm. let's start small today.",
    anxious: "deep breath in and out. I'm here.",
    restless: "let's wiggle that energy out.",
    sad: "soft blanket first, then we try something small.",
    content: "purrrr. it's a nice day for tiny joys.",
    energized: "yes! pick a fun one with me.",
  },
  frog: {
    neutral: "hop hop. what's the vibe?",
    tired: "let's puddle a little and rest.",
    anxious: "tiny ripples. tiny steps. okay?",
    restless: "*splish splash* time to move!",
    sad: "tiny joys count. I promise.",
    content: "lily-pad mood. lovely.",
    energized: "leaps ahead! I'm ready.",
  },
  bunny: {
    neutral: "*tail wiggle* tell me more.",
    tired: "snack & snooze approved.",
    anxious: "soft socks first, then we can plan.",
    restless: "bouncy time! let's burn it off.",
    sad: "*thump thump* I'm right here with you.",
    content: "warm and toasty. lovely choice.",
    energized: "zoomies engaged ✿",
  },
  ghost: {
    neutral: "boo. (a gentle one.)",
    tired: "let's float, not run.",
    anxious: "i'll haunt the worry for you this time.",
    restless: "swooshing in circles, are we?",
    sad: "I'll sit in the quiet with you.",
    content: "lovely. let's keep this feeling.",
    energized: "spooky in the best way!",
  },
};

export function getMascotLine(mascot: MascotId, mood: MoodId | null | undefined): string {
  return mascotLines[mascot][mood ?? "neutral"];
}
