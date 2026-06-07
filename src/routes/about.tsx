import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cozy Dopamine Menu" },
      {
        name: "description",
        content: "About this cozy pixel-art prototype: how it works and why it exists.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="min-h-screen flex flex-col items-center px-5 py-12">
      <div className="max-w-xl bg-card pixel-border pixel-shadow rounded-2xl p-8">
        <h1 className="font-pixel text-3xl mb-4">about this little thing</h1>
        <p className="text-base text-foreground/85 leading-relaxed">
          A self-contained pixel-art prototype that suggests gentle activities based on your
          mood, available time, and the weather. No accounts, API calls, or productivity
          pressure. This is just a tiny menu of cozy side missions, picked from a curated list.
        </p>
        <p className="mt-4 text-base text-foreground/85 leading-relaxed">
          I built this as a side quest / fun portfolio piece. Everything runs right in your browser.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 font-pixel text-base px-5 py-3 rounded-xl bg-primary text-primary-foreground pixel-shadow-sm pixel-border"
        >
          ← return home
        </Link>
      </div>
    </main>
  );
}
