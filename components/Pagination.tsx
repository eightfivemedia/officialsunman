"use client";

// Numbered pager shared by the press and video grids. Collapses the middle of
// long ranges so the control never wraps: 1 … 4 5 6 … 12
export function Pagination({
  page,
  pageCount,
  onChange,
  label,
}: {
  page: number;
  pageCount: number;
  onChange: (next: number) => void;
  label: string;
}) {
  if (pageCount <= 1) return null;

  const pages: (number | "gap")[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "gap") pages.push("gap");
  }

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-line/70 text-ink transition-all duration-300 hover:border-red/50 hover:text-red disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line/70 disabled:hover:text-ink";

  return (
    <nav
      aria-label={label}
      className="mt-14 flex items-center justify-center gap-2"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={arrow}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {pages.map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-ink-muted" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={`h-10 min-w-10 rounded-full px-3.5 text-sm font-semibold tabular-nums transition-all duration-300 ${
              p === page
                ? "bg-red text-bone shadow-red-glow"
                : "border border-line/70 text-ink hover:border-red/50 hover:text-red"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
        className={arrow}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}
