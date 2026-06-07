import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { mascots, type MascotId } from "@/data/mascots";
import { Mascot } from "@/components/Mascot";
import { CozyRoom } from "@/components/CozyRoom";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cozy Dopamine Menu — tiny missions for soft days" },
      {
        name: "description",
        content:
          "A cozy pixel-art dopamine menu generator. Pick a mascot, share your mood, and get gentle activity ideas.",
      },
      { property: "og:title", content: "Cozy Dopamine Menu" },
      {
        property: "og:description",
        content: "Pick a mascot, share your mood, get a tiny menu of cozy things to do.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<MascotId | null>(null);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dm:mascot") as MascotId | null;
    if (saved && mascots.some((m) => m.id === saved)) setPicked(saved);
  }, []);

  const begin = () => {
    if (!picked) return;
    localStorage.setItem("dm:mascot", picked);
    navigate({ to: "/generator" });
  };

  return (
    <>
      <CozyRoom weather="sunny" />
      <main className="min-h-full flex flex-col items-center px-5 py-10 @min-[640px]:py-14 relative z-10">
      <header className="text-center max-w-xl">
        <p className="font-pixel text-sm @min-[640px]:text-base text-primary mb-3">
          ⋆ ˚｡⋆୨୧ a simple prototype ୨୧⋆ ˚｡⋆
        </p>
<<<<<<< HEAD
        <h1 className="font-pixel text-3xl sm:text-5xl leading-tight text-foreground">
          Your Personal <br className="sm:hidden" /> Dopamine Menu
=======
        <h1 className="font-pixel text-3xl @min-[640px]:text-5xl leading-tight text-foreground">
          Your Personal Cozy <br className="@min-[640px]:hidden" /> Dopamine Menu
>>>>>>> de2463a888a049b19c697cf2c4176f81fcee47d1
        </h1>
        <p className="mt-4 text-base @min-[640px]:text-lg text-foreground/80">
          Tiny missions for soft days. Pick a little buddy to keep you company.
        </p>
      </header>

      <section
        aria-label="Choose your mascot"
        className="mt-10 grid grid-cols-2 @min-[640px]:grid-cols-4 gap-4 @min-[640px]:gap-6 w-full max-w-3xl"
      >
        {mascots.map((m) => {
          const active = picked === m.id;
          const showActive = hasSelected && active;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => { setPicked(m.id); setHasSelected(true); }}
              aria-pressed={active}
              className={`group flex flex-col items-center gap-2 rounded-2xl p-4 pixel-border bg-card transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 ${
                showActive ? "pixel-shadow -translate-y-1 bg-accent" : "pixel-shadow-sm hover:-translate-y-0.5"
              }`}
            >
              <Mascot id={m.id} size={112} animated={showActive} />
              <div className="text-center">
                <div className="font-pixel text-lg text-foreground">
                  {m.name}
                </div>
                <p className="text-sm text-foreground/85 mt-0.5">{m.blurb}</p>
              </div>
            </button>
          );
        })}
      </section>

      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={begin}
          disabled={!picked}
          className="font-pixel text-lg px-8 py-4 rounded-2xl bg-primary text-primary-foreground pixel-shadow pixel-border disabled:opacity-50 disabled:cursor-not-allowed transition-transform enabled:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
        >
          Begin →
        </button>
        <p className="text-sm text-foreground/85">
          {hasSelected ? "lovely choice ✿" : "tap a friend to begin"}
        </p>
      </div>

      <footer className="mt-auto pt-12 w-full flex flex-col items-center gap-2 text-xs text-foreground/85">
        <div className="font-pixel text-sm text-foreground/85 bg-card/80 pixel-border rounded-full px-4 py-2 pixel-shadow-sm">
          ✿ designed &amp; built by Rachael using Lovable &lt;3
        </div>
        <Link to="/about" className="underline-offset-4 hover:underline text-foreground/85 rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/50">
          about this prototype
        </Link>
      </footer>
    </main>
    </>
  );
}
