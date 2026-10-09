"use client";

import { useEffect, useState } from "react";
import type { Game } from "@/lib/games";

// Desktop only. The same breakpoint gates the frame's visibility in GameScreen;
// keeping one value here and there means the frame can never be visible without
// a src, or hold a src while hidden.
const DESKTOP = "(min-width: 1024px)";

// The game in a frame, for screens big enough to be worth it.
//
// src is withheld until after mount, and then only on a wide screen. A phone
// never requests it at all — the element is display:none there, but a hidden
// iframe with a src still downloads, and these builds are around a megabyte
// each. Phones get the poster and a tap to fullscreen instead.
export function GameFrame({ game }: { game: Game }) {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia(DESKTOP).matches) setSrc(game.file);
  }, [game.file]);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-line/70 shadow-cinematic"
      style={{ backgroundColor: game.themeColor }}
    >
      <iframe
        src={src}
        title={`Sun-Man: ${game.title}`}
        allow="autoplay; fullscreen"
        style={{ height: "clamp(460px, 78svh, 780px)" }}
        className="block w-full border-0"
      />
    </div>
  );
}
