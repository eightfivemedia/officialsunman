import Link from "next/link";
import { HERO_PROOF } from "@/lib/data";
import { HeroTurn, HeroBackdrop } from "./HeroFigure";

// Centered editorial hero: proof row -> oversized display headline -> subcopy
// -> CTA, over a full-height scroll-scrubbed figure.
//
// The entrance is CSS (`.rise`), not framer-motion, on purpose: JS-driven
// entrances ship `opacity: 0` in the SSR HTML, so any hydration hiccup leaves
// the hero copy permanently invisible. CSS animation always resolves.
export function Hero() {
  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden bg-bone md:min-h-[100dvh]">
      <HeroBackdrop />

      {/* Figure behind the copy, bottom-aligned so he stands on the fold.
          Deliberately taller than the viewport: bottom-aligned, so extra
          height lifts his head clear of the copy (and the veil) while the boots
          stay planted. Frames are ~1900px tall, so even here it downscales. */}
      {/* `opacity-60` is the mute dial — it fades him toward the page colour.
          One control here replaces the separate wash overlay, which was doing
          the same job. Raise toward 100 for a stronger figure, lower to fade. */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-60">
        <HeroTurn className="h-[92vh] sm:h-[100vh] lg:h-[108vh]" />
      </div>

      {/* Legibility: a veil in the page's own colour across only the rows the
          copy occupies, so his head and boots stay at full strength. */}
      <div className="hero-veil pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-site px-7 py-14 md:px-8 md:py-32">
        {/* Credibility row */}
        <div className="rise mx-auto flex max-w-3xl flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
          {HERO_PROOF.map((p) => (
            <span key={p.value} className="flex items-baseline gap-2">
              <span className="font-display text-lg tracking-wide text-red">
                {p.value}
              </span>
              <span className="text-sm text-ink-muted">{p.label}</span>
            </span>
          ))}
        </div>

        {/* Oversized display headline. Scales with the viewport but clamped at
            both ends so the two lines hold their proportion on any screen. */}
        <h1
          style={{ "--d": "0.08s" } as React.CSSProperties}
          className="rise mx-auto mt-6 max-w-5xl text-center font-display text-[clamp(2.75rem,7.4vw,9rem)] leading-[1.02] text-ink md:mt-8 md:leading-[0.9]"
        >
          The Original
          <br />
          Black Superhero
        </h1>

        <p
          style={{ "--d": "0.18s" } as React.CSSProperties}
          className="rise mx-auto mt-7 max-w-xl text-center text-lg leading-relaxed text-ink-muted"
        >
          The first Black action figure with his own storyline — created in 1985
          because a child deserved to see himself as the hero.
        </p>

        <div
          style={{ "--d": "0.26s" } as React.CSSProperties}
          className="rise mt-9 flex justify-center"
        >
          <Link
            href="/get"
            className="inline-flex items-center rounded-full bg-red px-9 py-4 text-base font-semibold text-bone transition-all duration-300 ease-smooth hover:bg-red-bright hover:shadow-red-glow active:scale-[0.98]"
          >
            Get Sun-Man
          </Link>
        </div>
      </div>
    </section>
  );
}
