"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { VIDEOS } from "@/lib/videos";
import { Reveal } from "./Reveal";
import { Pagination } from "./Pagination";

const PER_PAGE = 12;

// Paginated video grid. Every card is the same size: a fixed 16:9 thumbnail, a
// title clamped to two lines, and the channel pinned to the bottom.
export function VideoGrid() {
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.ceil(VIDEOS.length / PER_PAGE);
  const items = VIDEOS.slice((page - 1) * PER_PAGE, page * PER_PAGE);


  // Warm the next page's images so paging forward doesn't show empty tiles.
  useEffect(() => {
    const next = VIDEOS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
    if (!next.length) return;
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 300);
    idle(() => {
      next.forEach((i) => {
        const img = new window.Image();
        img.src = i.thumb;
      });
    });
  }, [page]);

  function go(next: number) {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v, i) => (
          <Reveal key={v.youtubeId} delay={0.03 * i} className="h-full">
            <a
              href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line/70 bg-bone/60 shadow-cinematic-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-cinematic"
            >
              <div className="relative aspect-video overflow-hidden bg-cream">
                <Image
                  src={v.thumb}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-ink/10 transition-colors duration-300 group-hover:bg-ink/20" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/50 bg-bone/90 shadow-cinematic-sm backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden className="translate-x-[2px]">
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" className="fill-red" />
                  </svg>
                </span>
                {v.duration && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-ink/75 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-bone">
                    {v.duration}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="line-clamp-2 text-base font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-red">
                  {v.title}
                </h2>
                {v.channel && (
                  <span className="mt-auto pt-4 text-sm text-ink-muted">
                    {v.channel}
                  </span>
                )}
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Pagination page={page} pageCount={pageCount} onChange={go} label="Videos" />
    </div>
  );
}
