"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GALLERY } from "@/lib/gallery";
import { Reveal } from "./Reveal";
import { Pagination } from "./Pagination";

const PER_PAGE = 12;

// Masonry gallery. Each tile takes its image's own aspect ratio — the real
// pixel dimensions come through from the import — so nothing is letterboxed or
// cropped and there's no dead space inside a tile. Columns stay even because
// masonry packs by height rather than aligning rows.
export function GalleryGrid() {
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.ceil(GALLERY.length / PER_PAGE);
  const items = GALLERY.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Warm the next page's images while this one is being viewed, so paging
  // forward doesn't show empty tiles.
  useEffect(() => {
    const next = GALLERY.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
    if (!next.length) return;
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 300);
    idle(() => {
      next.forEach((i) => {
        const img = new window.Image();
        img.src = i.src;
      });
    });
  }, [page]);

  function go(next: number) {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* One reveal for the whole grid rather than one per tile: a masonry
          layout re-packs as images decode, and per-tile observers could miss
          that and strand a tile at opacity 0. */}
      <Reveal>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {items.map((item, i) => (
            <figure
              key={item.src} className="group break-inside-avoid overflow-hidden rounded-2xl border border-line/70 bg-cream shadow-cinematic-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                /* The first tiles are above the fold on most screens — preload
                   them rather than lazy-loading, so the grid paints complete. */
                priority={page === 1 && i < 3}
                loading={page === 1 && i < 6 ? "eager" : "lazy"}
                className="block h-auto w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </Reveal>

      <Pagination
        page={page}
        pageCount={pageCount}
        onChange={go}
        label="Gallery images"
      />
    </div>
  );
}
