import type { Metadata } from "next";
import Image from "next/image";
import { PlayLink } from "@/components/PlayLink";
import { OG_IMAGE } from "@/lib/seo";
import { GAMES } from "@/lib/games";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Sunman } from "@/components/Sunman";

const description =
  "Play the free Sun-Man demo games in your browser — Pig-Head Assault and Sky Patrol.";

export const metadata: Metadata = {
  title: "Demo Games",
  description,
  alternates: { canonical: "/games" },
  openGraph: {
    title: "Demo Games",
    description,
    url: "/games",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function GamesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Play"
        title="Demo Games"
        intro={<>Take <Sunman /> into battle yourself. Both demos run right in your browser — on a computer or a phone, no download.</>}
      />

      <section className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-site px-7 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {GAMES.map((game, i) => (
              <Reveal key={game.slug} delay={0.05 * i} className="h-full">
                <PlayLink
                  pageHref={`/games/${game.slug}`}
                  playHref={`/games/${game.slug}/play`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line/70 bg-bone/60 shadow-cinematic-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-cinematic"
                >
                  <div className="relative aspect-video overflow-hidden bg-cream">
                    <Image
                      src={game.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                    />

                    {/* The key art runs bright and busy edge to edge, so the
                        type sits at the foot of it over a scrim that's heavy
                        where the words are and clears by the top third — a flat
                        overlay strong enough to carry text would have dulled
                        the whole illustration. */}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/10" />

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                        Demo
                      </span>
                      <span className="mt-1.5 block font-display text-4xl text-bone md:text-5xl">
                        {game.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h2 className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-red md:text-3xl">
                      <Sunman />: {game.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {game.description}
                    </p>

                    <span className="mt-auto inline-flex w-fit items-center gap-2 pt-7">
                      <span className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-semibold text-bone transition-all duration-300 group-hover:bg-red-bright group-hover:shadow-red-glow">
                        Play
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
                      </span>
                    </span>
                  </div>
                </PlayLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
