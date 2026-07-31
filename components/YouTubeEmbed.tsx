"use client";

import Image from "next/image";
import { useState } from "react";

// Click-to-play facade. The YouTube iframe (and its ~1MB of scripts) only
// loads once the viewer actually hits play; until then this is a local poster
// image, so the section costs one webp instead of a third-party embed.
export function YouTubeEmbed({
  youtubeId,
  title,
  poster,
  className = "",
}: {
  youtubeId: string;
  title: string;
  poster: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-ink ${className}`}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          onClick={() => setActive(true)}
          aria-label={`Play: ${title}`}
          className="group/play absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 ease-smooth group-hover/play:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-ink/15 transition-colors duration-300 group-hover/play:bg-ink/25" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/40 bg-bone/90 shadow-cinematic backdrop-blur-md transition-transform duration-300 group-hover/play:scale-110">
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden className="translate-x-[2px]">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" className="fill-red" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
