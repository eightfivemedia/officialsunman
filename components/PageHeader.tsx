export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="page-header relative overflow-hidden bg-bone">
      {/* Sunburst peeking from a corner */}
      <div className="edge-fade pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[44rem] w-[44rem]">
          <div className="sunburst animate-spin-slow h-full w-full rounded-full opacity-50" />
        </div>
      </div>
      <div className="glow-r pointer-events-none absolute inset-0 opacity-80" />

      <div className="relative mx-auto max-w-site px-7 pb-8 pt-28 md:px-8 md:pb-9 md:pt-32">
        <div className="mb-6 flex items-center gap-3">
          <span className="rule-brand h-px w-10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red">
            {eyebrow}
          </span>
        </div>
        <h1 className="max-w-wide font-display text-6xl text-ink md:text-8xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
