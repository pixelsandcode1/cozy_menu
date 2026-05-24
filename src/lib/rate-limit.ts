const KEY = "dm:regen-stamps";
const WINDOW_MS = 5 * 60 * 1000;
const MAX = 3;

function read(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

function write(stamps: number[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(stamps));
  } catch {
    // ignore
  }
}

function active(): number[] {
  const now = Date.now();
  return read().filter((t) => now - t < WINDOW_MS);
}

export function regensRemaining(): number {
  return Math.max(0, MAX - active().length);
}

export function recordRegen() {
  const stamps = active();
  stamps.push(Date.now());
  write(stamps);
}

export function msUntilReset(): number {
  const stamps = active();
  if (stamps.length < MAX) return 0;
  const oldest = Math.min(...stamps);
  return Math.max(0, WINDOW_MS - (Date.now() - oldest));
}

export function formatCountdown(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
