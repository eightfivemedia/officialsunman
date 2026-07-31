import { RETAILERS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Logo } from "./Logo";
import { Sunman } from "./Sunman";

export function GetSunMan() {
  return (
    <section id="get" className="relative overflow-hidden bg-bone py-24 md:py-32">
      <div className="edge-fade pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2">
          <div className="sunburst animate-spin-slow h-full w-full rounded-full opacity-50" />
        </div>
      </div>
      <div className="glow-tr pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-wide px-7 text-center md:px-8">
        <Reveal>
          <div className="mb-8 flex justify-center">
            <Logo variant="full" className="h-20 md:h-28" />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl text-ink md:text-6xl">
            Bring the hero home
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
            <Sunman /> is available now as part of Mattel&apos;s Masters of
            the Universe. Pick your retailer.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Flex-wrap rather than a fixed grid, so the row stays centred
              however many retailers are currently listed. */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-4">
            {RETAILERS.map((r) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[9rem] flex-1 rounded-xl border border-line bg-bone/70 px-4 py-6 text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-cinematic-sm active:translate-y-0 sm:max-w-[13rem]"
              >
                {r.name}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
