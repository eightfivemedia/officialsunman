"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PRESS } from "@/lib/press";
import { Reveal } from "./Reveal";
import { Pagination } from "./Pagination";

const PER_PAGE = 9;

// Full press archive as a paginated card grid: image, title, publication.
// Every card is the same height — the image is a fixed ratio and the title is
// clamped, so rows stay aligned regardless of headline length.
export function PressGrid() {
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.ceil(PRESS.length / PER_PAGE);
  const items = PRESS.slice((page - 1) * PER_PAGE, page * PER_PAGE);


  // Warm the next page's images so paging forward doesn't show empty tiles.
  useEffect(() => {
    const next = PRESS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
    if (!next.length) return;
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 300);
    idle(() => {
      next.forEach((i) => {
        const img = new window.Image();
        img.src = i.image;
      });
    });
  }, [page]);

  function go(next: number) {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="bg-bone py-16 md:py-24">
      <div ref={topRef} className="mx-auto max-w-site scroll-mt-28 px-7 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.href} delay={0.03 * i} className="h-full">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line/70 bg-bone/60 shadow-cinematic-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-cinematic"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-cream">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={page === 1 && i < 3}
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red">
                      {p.publication}
                    </span>
                    {p.year && (
                      <span className="text-[11px] font-medium text-ink-muted">
                        {p.year}
                      </span>
                    )}
                  </div>

                  <h2 className="line-clamp-3 text-lg font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-red">
                    {p.title}
                  </h2>

                  <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-ink-muted transition-colors duration-300 group-hover:text-red">
                    Read the article
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
                      <path
                        d="M4 12L12 4M6 4h6v6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={go}
          label="Press articles"
        />
      </div>
    </section>
  );
}
