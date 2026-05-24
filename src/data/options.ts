export type MoodId = "tired" | "anxious" | "restless" | "sad" | "content" | "energized";
export type TimeId = "5" | "15" | "30" | "60";
export type WeatherId = "sunny" | "cloudy" | "rainy" | "snowy" | "hot";
export type Category = "dopamine" | "creative" | "low-movement" | "high-movement" | "social";

export const moods: { id: MoodId; label: string; emoji: string }[] = [
  { id: "tired", label: "Tired", emoji: "🥱" },
  { id: "anxious", label: "Anxious", emoji: "🌧️" },
  { id: "restless", label: "Restless", emoji: "🌀" },
  { id: "sad", label: "Sad", emoji: "💧" },
  { id: "content", label: "Content", emoji: "🌼" },
  { id: "energized", label: "Energized", emoji: "✨" },
];

export const times: { id: TimeId; label: string; minutes: number }[] = [
  { id: "5", label: "5 minutes", minutes: 5 },
  { id: "15", label: "15 minutes", minutes: 15 },
  { id: "30", label: "30 minutes", minutes: 30 },
  { id: "60", label: "An hour+", minutes: 60 },
];

export const weathers: { id: WeatherId; label: string; emoji: string }[] = [
  { id: "sunny", label: "Sunny", emoji: "☀️" },
  { id: "cloudy", label: "Cloudy", emoji: "☁️" },
  { id: "rainy", label: "Rainy & gloomy", emoji: "🌧️" },
  { id: "snowy", label: "Snowy", emoji: "❄️" },
  { id: "hot", label: "Hot", emoji: "🌡️" },
];
