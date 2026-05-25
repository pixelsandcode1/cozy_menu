import type { WeatherId } from "@/data/options";

interface CozyRoomProps {
  weather: WeatherId;
}

/**
 * Pixel cozy-room backdrop. Decorative only — aria-hidden.
 * Window contents react to the user's weather pick.
 */
export function CozyRoom({ weather }: CozyRoomProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Wall */}
      <div className="absolute inset-0 bg-[oklch(0.94_0.03_75)]" />
      {/* Wallpaper dots */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.28 0.06 305 / 8%) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Baseboard + floor */}
      <div className="absolute left-0 right-0 bottom-0 h-[28vh] bg-[oklch(0.88_0.05_60)]" />
      <div className="absolute left-0 right-0 bottom-[28vh] h-[10px] bg-[oklch(0.78_0.06_50)]" />

      {/* Rug */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[3vh] w-[min(70vw,700px)] h-[14vh] rounded-[24px] opacity-90"
        style={{
          background:
            "repeating-linear-gradient(90deg, oklch(0.82 0.06 145) 0 24px, oklch(0.86 0.06 230) 24px 48px, oklch(0.91 0.06 50) 48px 72px, oklch(0.64 0.11 300 / 0.65) 72px 96px)",
          border: "3px solid oklch(0.28 0.06 305 / 30%)",
          boxShadow: "4px 4px 0 0 oklch(0.28 0.06 305 / 18%)",
        }}
      />

      {/* Window */}
      <div className="absolute left-[6vw] top-[8vh] w-[clamp(180px,28vw,320px)] aspect-[5/4]">
        <div
          className="absolute inset-0 rounded-[8px] overflow-hidden"
          style={{
            border: "8px solid oklch(0.78 0.06 50)",
            boxShadow:
              "0 0 0 3px oklch(0.28 0.06 305 / 28%), 6px 6px 0 0 oklch(0.28 0.06 305 / 18%)",
          }}
        >
          <WindowScene weather={weather} />
          {/* Cross frame */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-[oklch(0.78_0.06_50)]" />
          <div className="absolute top-1/2 left-0 right-0 h-[6px] -translate-y-1/2 bg-[oklch(0.78_0.06_50)]" />
        </div>
        {/* Sill */}
        <div className="absolute -bottom-3 -left-3 -right-3 h-[14px] bg-[oklch(0.72_0.06_50)] rounded-[4px] border-[3px] border-[oklch(0.28_0.06_305/30%)]" />
      </div>

      {/* Potted plant (bottom right) */}
      <div className="absolute right-[5vw] bottom-[16vh] w-[80px] h-[110px]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[40px] bg-[oklch(0.66_0.1_40)] rounded-b-[6px] border-[3px] border-[oklch(0.28_0.06_305/30%)]" />
        <div className="absolute bottom-[34px] left-1/2 -translate-x-1/2 w-[44px] h-[20px] bg-[oklch(0.78_0.08_60)] rounded-[3px] border-[3px] border-[oklch(0.28_0.06_305/25%)]" />
        {/* leaves */}
        <div className="absolute bottom-[48px] left-[10px] w-[26px] h-[44px] bg-[oklch(0.7_0.12_145)] rounded-[50%] -rotate-12 border-[3px] border-[oklch(0.28_0.06_305/25%)]" />
        <div className="absolute bottom-[54px] right-[6px] w-[24px] h-[40px] bg-[oklch(0.74_0.12_150)] rounded-[50%] rotate-12 border-[3px] border-[oklch(0.28_0.06_305/25%)]" />
        <div className="absolute bottom-[62px] left-1/2 -translate-x-1/2 w-[22px] h-[48px] bg-[oklch(0.78_0.13_148)] rounded-[50%] border-[3px] border-[oklch(0.28_0.06_305/25%)]" />
      </div>

      {/* Wall sticker (heart) */}
      <div className="absolute right-[14vw] top-[14vh] font-pixel text-2xl text-[oklch(0.64_0.11_300)] opacity-70 rotate-12 select-none">
        ♥
      </div>
      {/* Lamp (top right) */}
      <div className="absolute right-[8vw] top-[5vh] w-[60px] h-[70px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50px] h-[28px] bg-[oklch(0.86_0.08_60)] rounded-t-[40%_60%] border-[3px] border-[oklch(0.28_0.06_305/30%)]" />
        <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[4px] h-[40px] bg-[oklch(0.28_0.06_305/30%)]" />
      </div>
    </div>
  );
}

function WindowScene({ weather }: { weather: WeatherId }) {
  const sky =
    weather === "sunny"
      ? "oklch(0.88 0.07 230)"
      : weather === "cloudy"
        ? "oklch(0.84 0.03 240)"
        : weather === "rainy"
          ? "oklch(0.68 0.04 260)"
          : weather === "snowy"
            ? "oklch(0.93 0.02 240)"
            : "oklch(0.84 0.1 60)"; // hot

  return (
    <div className="absolute inset-0" style={{ background: sky }}>
      {/* Hills */}
      <div className="absolute left-[-10%] bottom-0 w-[60%] h-[40%] rounded-t-[50%] bg-[oklch(0.74_0.1_148)]" />
      <div className="absolute right-[-10%] bottom-0 w-[55%] h-[34%] rounded-t-[50%] bg-[oklch(0.7_0.11_150)]" />

      {weather === "sunny" && (
        <>
          <div className="absolute top-[14%] right-[18%] w-[36px] h-[36px] rounded-full bg-[oklch(0.92_0.15_85)] border-[3px] border-[oklch(0.28_0.06_305/25%)]" />
          <Cloud className="top-[20%] left-[10%]" delay="0s" />
          <Cloud className="top-[34%] left-[55%]" delay="3s" />
        </>
      )}
      {weather === "cloudy" && (
        <>
          <Cloud className="top-[18%] left-[8%] scale-125" delay="0s" />
          <Cloud className="top-[36%] left-[40%]" delay="2s" />
          <Cloud className="top-[14%] right-[6%] scale-110" delay="4s" />
        </>
      )}
      {weather === "rainy" && (
        <>
          <Cloud className="top-[14%] left-[20%] scale-110" delay="0s" dark />
          <Cloud className="top-[26%] right-[10%]" delay="1.5s" dark />
          <Rain />
        </>
      )}
      {weather === "snowy" && (
        <>
          <Cloud className="top-[18%] left-[15%]" delay="0s" />
          <Snow />
        </>
      )}
      {weather === "hot" && (
        <>
          <div className="absolute top-[16%] right-[16%] w-[44px] h-[44px] rounded-full bg-[oklch(0.86_0.2_55)] border-[3px] border-[oklch(0.28_0.06_305/25%)]" />
          <div className="absolute inset-0 animate-heat-shimmer bg-[oklch(0.95_0.06_55/15%)]" />
        </>
      )}
    </div>
  );
}

function Cloud({
  className = "",
  delay = "0s",
  dark = false,
}: {
  className?: string;
  delay?: string;
  dark?: boolean;
}) {
  const color = dark ? "oklch(0.72 0.03 260)" : "oklch(0.98 0.005 85)";
  return (
    <div
      className={`absolute animate-cloud-drift ${className}`}
      style={{ animationDelay: delay }}
    >
      <div
        className="relative w-[60px] h-[18px] rounded-full"
        style={{ background: color }}
      >
        <div
          className="absolute -top-[10px] left-[10px] w-[28px] h-[20px] rounded-full"
          style={{ background: color }}
        />
        <div
          className="absolute -top-[7px] left-[28px] w-[24px] h-[18px] rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function Rain() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-[-10%] w-[2px] h-[10px] bg-[oklch(0.85_0.06_240/80%)] animate-rain-fall"
          style={{
            left: `${(i * 5.7) % 100}%`,
            animationDelay: `${(i % 6) * 0.18}s`,
            animationDuration: `${0.8 + ((i % 4) * 0.2)}s`,
          }}
        />
      ))}
    </div>
  );
}

function Snow() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-[-6%] w-[4px] h-[4px] rounded-full bg-white animate-snow-fall"
          style={{
            left: `${(i * 7.3) % 100}%`,
            animationDelay: `${(i % 5) * 0.35}s`,
            animationDuration: `${2.5 + ((i % 4) * 0.4)}s`,
          }}
        />
      ))}
    </div>
  );
}
