import cat from "@/assets/mascot-cat.png";
import frog from "@/assets/mascot-frog.png";
import bunny from "@/assets/mascot-bunny.png";
import ghost from "@/assets/mascot-ghost.png";

export type MascotId = "cat" | "frog" | "bunny" | "ghost";

export interface Mascot {
  id: MascotId;
  name: string;
  species: string;
  blurb: string;
  src: string;
}

export const mascots: Mascot[] = [
  { id: "cat", name: "Pip", species: "cat", blurb: "loves naps & slow mornings", src: cat },
  { id: "frog", name: "Kiwi", species: "frog", blurb: "finds joy in every rainfall", src: frog },
  { id: "bunny", name: "Luna", species: "bunny", blurb: "fan of soft socks & snacks", src: bunny },
  { id: "ghost", name: "Boo", species: "ghost", blurb: "no haunting, just vibing", src: ghost },
];

export function getMascot(id: MascotId | null | undefined): Mascot {
  return mascots.find((m) => m.id === id) ?? mascots[0];
}
