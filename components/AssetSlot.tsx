// Placeholder for artwork that hasn't landed yet. Holds the layout at the
// right aspect ratio and stays on-brand (sunburst + cream) instead of showing
// a broken image. Drop the file in /public/img and set its path in
// lib/data.ts ASSETS — the placeholder disappears on its own.
export function AssetSlot({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — artwork coming soon`}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-cream ${className}`}
    >
      <div className="sunburst animate-spin-slow absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <SunGlyph />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

function SunGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.5" className="fill-red/25" />
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-red/40">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={12 + Math.cos(a) * 7}
              y1={12 + Math.sin(a) * 7}
              x2={12 + Math.cos(a) * 9.5}
              y2={12 + Math.sin(a) * 9.5}
            />
          );
        })}
      </g>
    </svg>
  );
}
