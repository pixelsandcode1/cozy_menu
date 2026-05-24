import { getMascot, type MascotId } from "@/data/mascots";

interface MascotProps {
  id: MascotId | null | undefined;
  size?: number;
  animated?: boolean;
  className?: string;
}

export function Mascot({ id, size = 96, animated = true, className = "" }: MascotProps) {
  const mascot = getMascot(id);
  return (
    <img
      src={mascot.src}
      alt={`${mascot.name} ${mascot.species}`}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`pixelated select-none ${animated ? "animate-bob" : ""} ${className}`}
      draggable={false}
    />
  );
}
