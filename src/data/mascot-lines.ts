import type { MascotId } from "./mascots";
import type { MoodId } from "./options";

type Lines = Record<MascotId, Record<MoodId | "neutral", string>>;

export const mascotLines: Lines = {
  cat: {
    neutral: "mrrp. tell me how you are.",
    tired: "mm. let's start small today.",
    anxious: "deep breath in… and out. i'm here.",
    restless: "ok ok — let's wiggle that energy out.",
    sad: "soft blanket first. then we try.",
    content: "purring quietly. nice day for tiny joys.",
    energized: "yes! pick a fun one with me.",
  },
  frog: {
    neutral: "hop hop. what's the vibe?",
    tired: "let's puddle a little and rest.",
    anxious: "tiny ripples. tiny steps. okay?",
    restless: "splish splash — time to move.",
    sad: "tiny rainy joys count. promise.",
    content: "lily-pad mood. lovely.",
    energized: "leaps ahead! i'm ready.",
  },
  bunny: {
    neutral: "ear wiggle! tell me more.",
    tired: "snack & snooze approved.",
    anxious: "soft socks first. then we plan.",
    restless: "binky time! let's burn it off.",
    sad: "thump thump. i'm right here.",
    content: "warm and toasty. lovely choice.",
    energized: "zoomies engaged ✿",
  },
  ghost: {
    neutral: "boo. (a gentle one.)",
    tired: "let's float, not run.",
    anxious: "i'll haunt the worry for you.",
    restless: "swooshing in circles, are we?",
    sad: "i'll sit in the quiet with you.",
    content: "lovely. let's keep this feeling.",
    energized: "spooky in the best way!",
  },
};

export function getMascotLine(mascot: MascotId, mood: MoodId | null | undefined): string {
  return mascotLines[mascot][mood ?? "neutral"];
}
