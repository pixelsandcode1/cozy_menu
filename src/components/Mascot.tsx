import { getMascot, type MascotId } from "@/data/mascots";

interface MascotProps {
  id: MascotId | null | undefined;
  size?: number;
  animated?: boolean;
  className?: string;
  decorative?: boolean;
}

export function Mascot({
  id,
  size = 96,
  animated = true,
  className = "",
  decorative = false,
}: MascotProps) {
  const mascot = getMascot(id);
  return (
    <img
      src={mascot.src}
      alt={decorative ? "" : mascot.name}
      aria-hidden={decorative || undefined}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`pixelated select-none ${animated ? "animate-bob" : ""} ${className}`}
      draggable={false}
    />
  );
}
