import { useMemo } from "react";
import { Mascot } from "@/components/Mascot";
import { getMascot, type MascotId } from "@/data/mascots";
import { moods, times, weathers, type MoodId, type TimeId, type WeatherId } from "@/data/options";

import type { Activity } from "@/data/activities";

interface PixelNotepadProps {
  menu: Activity[];
  mascotId: MascotId;
  mood: MoodId;
  time: TimeId;
  weather: WeatherId;
}

const TAPE_COLORS = [
  "oklch(0.88 0.08 55 / 75%)",   // peach
  "oklch(0.84 0.08 145 / 70%)",  // sage
  "oklch(0.78 0.09 300 / 65%)",  // lavender
  "oklch(0.86 0.08 230 / 70%)",  // powder blue
];
const TILTS = ["-1.5deg", "1deg", "-0.5deg", "1.5deg"];

export function PixelNotepad({
  menu,
  mascotId,
  mood,
  time,
  weather,
}: PixelNotepadProps) {
  const mascot = getMascot(mascotId);
  const moodLabel = useMemo(() => moods.find((m) => m.id === mood)?.label, [mood]);
  const timeLabel = useMemo(() => times.find((t) => t.id === time)?.label, [time]);
  const weatherLabel = useMemo(() => weathers.find((w) => w.id === weather)?.label, [weather]);
  

  return (
    <div
      role="region"
      aria-label="Your cozy menu notepad"
      className="relative w-full max-w-xl mt-2 animate-pop-in notepad-tilt"
    >
      {/* Notepad paper */}
      <div className="relative bg-[oklch(0.985_0.015_85)] pixel-border pixel-shadow rounded-[6px] pt-10 pb-8 px-5 sm:px-7 notepad-paper">
        {/* Top binding */}
        <div className="absolute left-0 right-0 top-0 h-8 bg-[oklch(0.82_0.08_15)] rounded-t-[6px] border-b-[3px] border-[oklch(0.28_0.06_305/30%)]" aria-hidden="true">
          <div className="flex justify-around items-center h-full px-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-[oklch(0.28_0.06_305/55%)]"
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-5">
          <h2 className="font-pixel text-xs text-foreground/85 tracking-wider">
            ⋆ today's dopamine menu ⋆
          </h2>
          <p className="text-sm text-foreground/85 mt-1">
            {moodLabel} · {timeLabel} · {weatherLabel}
          </p>
        </div>

        <ul className="space-y-4">
          {menu.map((a, i) => (
            <li
              key={a.id}
              className="relative bg-[oklch(0.96_0.02_75)] rounded-[4px] pixel-border p-4 pt-5 flex items-start gap-3 animate-pop-in sticky-note"
              style={{
                animationDelay: `${i * 90}ms`,
                transform: `rotate(${TILTS[i % TILTS.length]})`,
              }}
            >
              {/* Pixel tape strips */}
              <span
                aria-hidden="true"
                className="absolute -top-2 left-4 w-12 h-4 -rotate-6"
                style={{
                  background: TAPE_COLORS[i % TAPE_COLORS.length],
                  border: "2px solid oklch(0.28 0.06 305 / 22%)",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute -top-2 right-4 w-10 h-4 rotate-[8deg]"
                style={{
                  background: TAPE_COLORS[(i + 2) % TAPE_COLORS.length],
                  border: "2px solid oklch(0.28 0.06 305 / 22%)",
                }}
              />

              <span className="text-3xl shrink-0" aria-hidden="true">
                {a.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-pixel text-base sm:text-lg text-foreground">
                    {a.name}
                  </h3>
                  <span className="text-xs text-foreground/80 whitespace-nowrap">
                    ~{a.maxMinutes >= 60 ? "1hr" : `${a.maxMinutes}m`}
                  </span>
                </div>
                <p className="text-sm text-foreground/85 mt-0.5">{a.blurb}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-center text-xs text-foreground/80 mt-6 pr-16 font-pixel">
          ✿ picked with care by {mascot.name}
        </p>
      </div>

      {/* Mascot peeking from the corner */}
      <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4">
        <Mascot id={mascotId} size={88} animated />
      </div>
    </div>
  );
}
