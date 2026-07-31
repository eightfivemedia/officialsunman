import { SERIES_VIDEO } from "@/lib/data";
import { Reveal } from "./Reveal";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { Sunman } from "./Sunman";

// Home for the flagship "Legend of Sun-Man" animated origin story.
// `showHeading` is off on /series, where the PageHeader already names it.
export function Series({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="series" className="relative bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-site px-7 md:px-8">
        {showHeading && (
          <>
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="rule-brand h-px w-10" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red">
                  Watch Now
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-wide font-display text-4xl text-ink md:text-6xl">
                The Legend of <Sunman />
              </h2>
            </Reveal>
          </>
        )}
        {/* The blurb belongs with the heading. On /series the PageHeader
            already carries an intro, so showing both repeats it almost
            word-for-word. */}
        {showHeading && (
          <Reveal delay={0.1}>
            <p className="max-w-prose text-lg leading-relaxed text-ink-muted">
              An animated origin story in the bold spirit of 90s
              Saturday-morning television — the untold story of Prince Sunni
              Ali, told at last.
            </p>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div className={`overflow-hidden rounded-2xl border border-line shadow-cinematic ${showHeading ? "mt-12" : ""}`}>
            <YouTubeEmbed
              youtubeId={SERIES_VIDEO.youtubeId}
              title={SERIES_VIDEO.title}
              poster={SERIES_VIDEO.poster}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
