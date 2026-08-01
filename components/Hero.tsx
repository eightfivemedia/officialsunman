import Link from "next/link";
import { HERO_PROOF } from "@/lib/data";
import { HeroTurn, HeroBackdrop } from "./HeroFigure";
import { Sunman } from "./Sunman";

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

      {/* Figure behind the copy, bottom-anchored so he stands on the fold.
          Sized in svh to match the section's own unit. Safari's vh is the
          LARGE viewport height (toolbars hidden) while svh is the small one,
          so mixing the two made him taller than his container and cropped his
          head on a real phone. His wings end 31.6% down the artwork, which is
          what the copy has to clear. */}
      {/* `opacity-60` is the mute dial — it fades him toward the page colour.
          One control here replaces the separate wash overlay, which was doing
          the same job. Raise toward 100 for a stronger figure, lower to fade. */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-60">
        <HeroTurn className="h-[100svh] sm:h-[104svh] lg:h-[112vh]" />
      </div>

      {/* Legibility: a veil in the page's own colour across only the rows the
          copy occupies, so his head and boots stay at full strength. */}
      <div className="hero-veil pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-site px-7 py-14 md:px-8 md:py-32">
        {/* Credibility row */}
        {/* Short viewports get a smaller type scale so the centred block still
            clears his wings — the copy shrinks rather than moving. */}
        <div className="rise mx-auto flex max-w-3xl flex-col items-center gap-2 text-center [@media(max-height:760px)]:gap-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
          {HERO_PROOF.map((p) => (
            <span key={p.value} className="flex items-baseline gap-2">
              <span className="font-display text-base tracking-wide text-red [@media(max-height:760px)]:text-sm sm:text-lg">
                {p.value}
              </span>
              <span className="text-xs text-ink-muted [@media(max-height:760px)]:text-[11px] sm:text-sm">
                {p.label}
              </span>
            </span>
          ))}
        </div>

        {/* Oversized display headline. Scales with the viewport but clamped at
            both ends so the two lines hold their proportion on any screen. */}
        <h1
          style={{ "--d": "0.08s" } as React.CSSProperties}
          className="rise mx-auto mt-4 max-w-5xl text-center font-display text-[clamp(1.95rem,7.4vw,9rem)] leading-[1.02] text-ink [@media(max-height:760px)]:mt-2 [@media(max-height:760px)]:text-[1.6rem] md:mt-8 md:leading-[0.9]"
        >
          The Original
          <br />
          Black Superhero
        </h1>

        <p
          style={{ "--d": "0.18s" } as React.CSSProperties}
          className="rise mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-ink-muted [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:text-sm sm:mt-7 sm:text-lg"
        >
          The first Black action figure with his own storyline — created in 1985
          because a child deserved to see himself as the hero.
        </p>

        <div
          style={{ "--d": "0.26s" } as React.CSSProperties}
          className="rise mt-6 flex justify-center [@media(max-height:760px)]:mt-4 sm:mt-9"
        >
          <Link
            href="/get"
            className="inline-flex items-center rounded-full bg-red px-9 py-4 text-base font-semibold text-bone [@media(max-height:760px)]:py-3 [@media(max-height:760px)]:text-sm transition-all duration-300 ease-smooth hover:bg-red-bright hover:shadow-red-glow active:scale-[0.98]"
          >
            <span>
              Get <Sunman />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
