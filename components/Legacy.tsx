import Image from "next/image";
import { ASSETS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { AssetSlot } from "./AssetSlot";

export function Legacy() {
  const ad = ASSETS.ad1985;

  return (
    <section id="legacy" className="relative bg-bone py-24 md:py-32">
      <div className="mx-auto grid max-w-site items-center gap-14 px-7 md:grid-cols-2 md:px-8">
        {/* 1985 ad, framed */}
        <Reveal>
          <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line bg-cream shadow-cinematic">
            <div className="relative aspect-[4/5]">
              {ad ? (
                <Image
                  src={ad}
                  alt="The original 1985 Sun-Man advertisement"
                  fill
                  sizes="(max-width: 768px) 90vw, 480px"
                  className="object-cover"
                />
              ) : (
                <AssetSlot label="1985 Advertisement" />
              )}
            </div>
            <figcaption className="absolute bottom-4 left-4 rounded-full border border-line bg-bone/85 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink backdrop-blur-md">
              The Original — 1985
            </figcaption>
          </figure>
        </Reveal>

        {/* Editorial text */}
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="rule-brand h-px w-10" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red">
                The Legacy
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl md:leading-[0.95] lg:text-6xl">
              Created because a child deserved to be the hero
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                In 1985, Yla Eason&apos;s young son told her he couldn&apos;t be
                a superhero — because he wasn&apos;t white. She refused to let
                that stand.
              </p>
              <p>
                She researched melanin and built a hero whose power comes from
                his own skin, consulting Dr. Kenneth Clark, whose landmark doll
                study helped shape <em>Brown v. Board of Education</em>. The
                result: Afro styling, accurate skin tone, and a storyline rooted
                in Royal African ancestry.
              </p>
              <p className="font-semibold text-ink">
                Not a sidekick. Not a reboot. The original — with his own story.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
