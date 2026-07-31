import Image from "next/image";
import { ASSETS } from "@/lib/data";

// Intrinsic sizes of the exported artwork (see /public/img).
const ART = {
  wordmark: { src: ASSETS.wordmark as string, width: 800, height: 330 },
  full: { src: ASSETS.logo as string, width: 1000, height: 465 },
};

export function Logo({
  variant = "wordmark",
  className = "",
  priority = false,
}: {
  /** `wordmark` is SUN-MAN alone; `full` adds the "Rulers of the Sun" line. */
  variant?: "wordmark" | "full";
  className?: string;
  priority?: boolean;
}) {
  const art = ART[variant];

  return (
    <Image
      src={art.src}
      width={art.width}
      height={art.height}
      priority={priority}
      alt="Sun-Man — Rulers of the Sun"
      className={`w-auto select-none ${className}`}
    />
  );
}
