import { TIMELINE } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Timeline() {
  const last = TIMELINE.length - 1;

  return (
    <section id="timeline" className="relative overflow-hidden bg-bone py-24 md:py-32">
      <div className="glow-bl pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-site px-7 md:px-8">
        <div className="mb-14 max-w-wide">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="rule-brand h-px w-10" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red">
                The Timeline
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl text-ink md:text-6xl">
              Over 40 years of a hero
            </h2>
          </Reveal>
        </div>

        {/* Year gutter | rail | milestone. The rail is drawn per-row as a left
            border so it joins continuously between nodes, and stops short on
            the final entry rather than trailing into empty space. */}
        <ol className="mx-auto max-w-4xl">
          {TIMELINE.map((m, i) => {
            const isLast = i === last;
            return (
              <li
                key={i}
                className="grid grid-cols-[3.5rem_1fr] gap-x-5 md:grid-cols-[9rem_1fr] md:gap-x-10"
              >
                {/* Year — right-aligned into the rail */}
                <Reveal delay={0.04 * i}>
                  <span
                    className={`block pt-0.5 text-left font-display text-2xl leading-none md:pt-1 md:text-right md:text-4xl ${
                      isLast ? "text-red" : "text-gold-deep"
                    }`}
                  >
                    {m.year}
                  </span>
                </Reveal>

                {/* Rail + node + copy */}
                <div
                  className={`relative border-l pl-7 md:pl-10 ${
                    isLast ? "border-transparent pb-0" : "border-line pb-12 md:pb-14"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute -left-[7px] top-1 block h-3.5 w-3.5 rounded-full ring-4 ring-bone ${
                      isLast ? "bg-red" : "bg-gold-deep"
                    }`}
                  />
                  {/* The last node has no border to hang from — draw its stub. */}
                  {isLast && (
                    <span
                      aria-hidden
                      className="absolute -left-px -top-14 block h-14 w-px bg-gradient-to-b from-line to-red/60"
                    />
                  )}

                  <Reveal delay={0.04 * i + 0.05}>
                    <h3 className="text-xl font-semibold text-ink">{m.title}</h3>
                    <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-muted">
                      {m.body}
                    </p>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
