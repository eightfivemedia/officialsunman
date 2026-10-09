import Link from "next/link";
import { GAMES, type Game } from "@/lib/games";
import { Sunman } from "./Sunman";

// A game on a normal site page: nav and footer above and below from the root
// layout, the site's own header treatment, and the game framed in the middle.
export function GameScreen({ game }: { game: Game }) {
  const other = GAMES.find((g) => g.slug !== game.slug);

  return (
    <main>
      <section className="relative overflow-hidden bg-bone pb-16 md:pb-24">
        {/* The same sunburst and warm wash a PageHeader carries. It isn't a
            PageHeader: that sets display type at text-8xl, and a two-line title
            at that size would push the game below the fold on a laptop. */}
        <div className="edge-fade pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[44rem] w-[44rem]">
            <div className="sunburst animate-spin-slow h-full w-full rounded-full opacity-50" />
          </div>
        </div>
        <div className="glow-r pointer-events-none absolute inset-0 opacity-80" />

        <div className="relative mx-auto max-w-site px-7 pt-28 md:px-8 md:pt-32">
          <div className="mb-5 flex items-center gap-3">
            <span className="rule-brand h-px w-10" />
            <Link
              href="/games"
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red transition-colors duration-300 hover:text-ink"
            >
              Games
            </Link>
          </div>

          <h1 className="font-display text-4xl text-ink md:text-6xl">
            <Sunman />: {game.title}
          </h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">
            {game.description}
          </p>

          <div
            className="mt-8 overflow-hidden rounded-2xl border border-line/70 shadow-cinematic md:mt-10"
            // The game's own background, so the rounded corners and any
            // letterboxing read as part of the cabinet rather than a gap.
            style={{ backgroundColor: game.themeColor }}
          >
            {/* Framed rather than inlined: each build in /public/games is a
                complete document with its own head, fonts and scripts, and its
                cabinet lays itself out from whatever box it's handed.

                It needs real height to do that — a 16:9 box would crush the
                phone layout, which stacks the controller under the screen. svh
                rather than vh so a mobile toolbar sliding in and out doesn't
                resize the game mid-play. */}
            <iframe
              src={game.file}
              title={`Sun-Man: ${game.title}`}
              allow="autoplay; fullscreen"
              style={{ height: "clamp(460px, 78svh, 780px)" }}
              className="block w-full border-0"
            />
          </div>

          {/* Phones get far more out of this than the frame above: the cabinet
              keeps its fixed-size controller and hands every pixel it gains
              straight to the canvas. A plain <a>, not a Link — the target is
              the game's own document, not a route in this app. */}
          <a
            href={`/games/${game.slug}/play`}
            className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-ink px-6 py-4 font-display text-xl tracking-wide text-bone transition-all duration-300 hover:bg-red active:scale-[0.99] sm:inline-flex sm:w-auto"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden className="translate-x-[1px]">
              <path d="M4 3v10l9-5-9-5Z" fill="currentColor" />
            </svg>
            Play fullscreen
          </a>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/games"
              className="font-semibold text-ink-muted transition-colors duration-300 hover:text-red"
            >
              &larr; All games
            </Link>

            {other && (
              <Link
                href={`/games/${other.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-semibold text-bone transition-all duration-300 hover:bg-red-bright hover:shadow-red-glow active:scale-[0.98]"
              >
                Play <Sunman />: {other.title}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bone/20 transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden>
                    <path
                      d="M3 8h9M8 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
