import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Mascot } from "@/components/Mascot";
import { CozyRoom } from "@/components/CozyRoom";
import { PixelNotepad } from "@/components/PixelNotepad";
import { type MascotId } from "@/data/mascots";
import {
  moods,
  times,
  weathers,
  type MoodId,
  type TimeId,
  type WeatherId,
} from "@/data/options";
import { pickMenu, type Activity } from "@/data/activities";
import { getMascotLine } from "@/data/mascot-lines";
import {
  formatCountdown,
  msUntilReset,
  recordRegen,
  regensRemaining,
} from "@/lib/rate-limit";

export const Route = createFileRoute("/generator")({
  head: () => ({
    meta: [
      { title: "Generator — Cozy Dopamine Menu" },
      {
        name: "description",
        content:
          "Answer three gentle questions and get a tiny menu of cozy side missions to try.",
      },
      { property: "og:title", content: "Cozy Dopamine Menu — Generator" },
      {
        property: "og:description",
        content: "Tell us how you feel, how much time you have, and the weather.",
      },
    ],
  }),
  component: Generator,
});

type Step = 0 | 1 | 2 | 3 | 4; // 0..2 questions, 3 generating, 4 menu

function Generator() {
  const navigate = useNavigate();
  const [mascotId, setMascotId] = useState<MascotId>("cat");
  const [step, setStep] = useState<Step>(0);
  const [mood, setMood] = useState<MoodId | null>(null);
  const [time, setTime] = useState<TimeId | null>(null);
  const [weather, setWeather] = useState<WeatherId | null>(null);
  const [menu, setMenu] = useState<Activity[]>([]);
  const [remaining, setRemaining] = useState(3);
  const [countdown, setCountdown] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("dm:mascot") as MascotId | null) ?? "cat";
    setMascotId(saved);
    setRemaining(regensRemaining());
  }, []);

  // countdown ticker when rate-limited
  useEffect(() => {
    if (remaining > 0) {
      setCountdown("");
      return;
    }
    const tick = () => {
      const ms = msUntilReset();
      if (ms <= 0) {
        setRemaining(regensRemaining());
        setCountdown("");
        return;
      }
      setCountdown(formatCountdown(ms));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const generate = (excludeIds: string[] = []) => {
    if (!mood || !time || !weather) return;
    const picks = pickMenu(mood, time, weather, excludeIds);
    setMenu(picks);
  };

  const handleNext = () => {
    if (step === 2) {
      // generating interlude
      setStep(3);
      setTimeout(() => {
        generate();
        setStep(4);
      }, 1200);
    } else {
      setStep((s) => (s + 1) as Step);
    }
  };

  const canAdvance =
    (step === 0 && mood) || (step === 1 && time) || (step === 2 && weather) || step > 2;

  const handleRegenerate = () => {
    if (remaining <= 0) return;
    recordRegen();
    setRemaining(regensRemaining());
    generate(menu.map((m) => m.id));
  };

  const handleStartOver = () => {
    setMood(null);
    setTime(null);
    setWeather(null);
    setMenu([]);
    setStep(0);
  };

  const handleSave = async () => {
    if (!menuRef.current) return;
    try {
      const dataUrl = await toPng(menuRef.current, {
        pixelRatio: 2,
        backgroundColor: "#FBF4E8",
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `cozy-menu-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-5 py-8 sm:py-12 relative">
      <CozyRoom weather={weather ?? "sunny"} />
      {/* Top bar */}
      <nav className="w-full max-w-2xl flex items-center justify-between mb-6">
        <Link
          to="/"
          className="font-pixel text-sm text-foreground/70 hover:text-foreground underline-offset-4 hover:underline"
        >
          ← home
        </Link>
        <div className="flex items-center gap-2" aria-label={`step ${Math.min(step + 1, 3)} of 3`}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                step >= i ? "bg-primary" : "bg-foreground/15"
              }`}
            />
          ))}
        </div>
      </nav>

      {/* Step content */}
      <section className="w-full max-w-2xl flex-1 flex flex-col items-center">
        {step <= 2 && (
          <QuestionStep
            step={step}
            mood={mood}
            time={time}
            weather={weather}
            mascotId={mascotId}
            onMood={setMood}
            onTime={setTime}
            onWeather={setWeather}
          />
        )}

        {step === 3 && <GeneratingInterlude mascotId={mascotId} />}

        {step === 4 && (
          <PixelNotepad
            innerRef={menuRef}
            menu={menu}
            mascotId={mascotId}
            mood={mood!}
            time={time!}
            weather={weather!}
          />
        )}
      </section>

      {/* Actions */}
      {step <= 2 && (
        <div className="mt-8 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="font-pixel text-base px-5 py-3 rounded-xl bg-card text-foreground pixel-shadow-sm pixel-border"
            >
              ← back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance}
            className="font-pixel text-base px-6 py-3 rounded-xl bg-primary text-primary-foreground pixel-shadow pixel-border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 2 ? "show my menu ✿" : "next →"}
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-2xl">
          {remaining > 0 ? (
            <button
              type="button"
              onClick={handleRegenerate}
              className="font-pixel text-base px-6 py-3 rounded-xl bg-secondary text-secondary-foreground pixel-shadow pixel-border"
            >
              ↻ try a different menu
            </button>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="bg-card pixel-border rounded-2xl px-5 py-4 text-center max-w-md"
            >
              <p className="text-sm text-foreground/85">
                let's pause and breathe — fresh menus return in
              </p>
              <p className="font-pixel text-2xl text-primary mt-1">{countdown || "5:00"}</p>
              <p className="text-xs text-foreground/60 mt-1">
                these ones are waiting for you ✨
              </p>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="font-pixel text-base px-5 py-3 rounded-xl bg-accent text-accent-foreground pixel-shadow-sm pixel-border"
            >
              ⬇ save as image
            </button>
            <button
              type="button"
              onClick={handleStartOver}
              className="font-pixel text-base px-5 py-3 rounded-xl bg-card text-foreground pixel-shadow-sm pixel-border"
            >
              start over
            </button>
          </div>
          {remaining > 0 && (
            <p className="text-xs text-foreground/55">
              {remaining} fresh {remaining === 1 ? "menu" : "menus"} left in this little window
            </p>
          )}
        </div>
      )}

      {/* Mascot corner */}
      {step !== 4 && (
        <div className="pointer-events-none fixed bottom-3 left-3 sm:bottom-6 sm:left-6">
          <Mascot id={mascotId} size={96} animated />
        </div>
      )}
    </main>
  );
}

function QuestionStep(props: {
  step: Step;
  mood: MoodId | null;
  time: TimeId | null;
  weather: WeatherId | null;
  mascotId: MascotId;
  onMood: (m: MoodId) => void;
  onTime: (t: TimeId) => void;
  onWeather: (w: WeatherId) => void;
}) {
  const { step, mood, time, weather, mascotId, onMood, onTime, onWeather } = props;

  const headings = [
    "How are you feeling today?",
    "How much time do you have?",
    "What's it like outside?",
  ];

  const subline =
    step === 0 && mood
      ? getMascotLine(mascotId, mood)
      : "no wrong answer ✿";

  return (
    <div className="w-full text-center animate-pop-in" key={step}>
      <h1 className="font-pixel text-2xl sm:text-3xl mb-2 text-foreground">
        {headings[step]}
      </h1>
      <p className="text-sm text-foreground/75 mb-7" aria-live="polite">{subline}</p>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto"
        role="radiogroup"
        aria-label={headings[step]}
      >
        {step === 0 &&
          moods.map((m) => (
            <Chip
              key={m.id}
              icon={m.emoji}
              label={m.label}
              active={mood === m.id}
              onClick={() => onMood(m.id)}
            />
          ))}
        {step === 1 &&
          times.map((t) => (
            <Chip
              key={t.id}
              icon="⏳"
              label={t.label}
              active={time === t.id}
              onClick={() => onTime(t.id)}
            />
          ))}
        {step === 2 &&
          weathers.map((w) => (
            <Chip
              key={w.id}
              icon={w.emoji}
              label={w.label}
              active={weather === w.id}
              onClick={() => onWeather(w.id)}
            />
          ))}
      </div>
    </div>
  );
}

function Chip({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 py-4 px-3 rounded-2xl pixel-border min-h-20 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 ${
        active
          ? "bg-primary text-primary-foreground pixel-shadow -translate-y-0.5"
          : "bg-card text-foreground pixel-shadow-sm hover:-translate-y-0.5"
      }`}
    >
      <span className="text-2xl" aria-hidden>
        {icon}
      </span>
      <span className="font-pixel text-sm sm:text-base">{label}</span>
    </button>
  );
}

function GeneratingInterlude({ mascotId }: { mascotId: MascotId }) {
  return (
    <div className="flex flex-col items-center text-center mt-6 animate-pop-in" aria-live="polite">
      <div className="relative">
        <Mascot id={mascotId} size={140} animated />
        <span className="absolute -top-1 -right-2 text-2xl animate-sparkle">✨</span>
        <span
          className="absolute -bottom-1 -left-3 text-xl animate-sparkle"
          style={{ animationDelay: "0.4s" }}
        >
          ✿
        </span>
        <span
          className="absolute top-4 -left-4 text-lg animate-sparkle"
          style={{ animationDelay: "0.8s" }}
        >
          ⋆
        </span>
      </div>
      <p className="font-pixel text-xl sm:text-2xl mt-6 max-w-md">
        Today's cozy side missions can include...
      </p>
    </div>
  );
}

