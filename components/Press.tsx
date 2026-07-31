import Link from "next/link";
import { PRESS } from "@/lib/press";
import { Reveal } from "./Reveal";

export function Press({
  limit,
  showAllLink = false,
}: {
  limit?: number;
  showAllLink?: boolean;
}) {
  const items = limit ? PRESS.slice(0, limit) : PRESS;

  return (
    <section id="press" className="relative bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-site px-7 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="rule-brand h-px w-10" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red">
                  In The Press
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl text-ink md:text-6xl">
                The world took notice
              </h2>
            </Reveal>
          </div>
          {showAllLink && (
            <Reveal delay={0.1}>
              <Link
                href="/press"
                className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ink/5"
              >
                All Press
              </Link>
            </Reveal>
          )}
        </div>

        {/* Divide-y list — refined, no card overuse */}
        <div className="divide-y divide-line/50 border-y border-line/50">
          {items.map((p, i) => (
            <Reveal key={p.href} delay={0.03 * i}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 transition-colors duration-300 hover:bg-ink/[0.03] md:grid-cols-[240px_1fr_auto] md:gap-10"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors duration-300 group-hover:text-gold-deep">
                  {p.publication}
                </span>
                <span className="hidden text-lg text-ink md:block">
                  {p.title}
                </span>
                <span className="col-start-2 row-span-2 self-center text-ink-muted md:col-start-3 md:row-span-1">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
                    <path
                      d="M4 12L12 4M6 4h6v6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </svg>
                </span>
                <span className="col-start-1 -mt-3 text-base text-ink md:hidden">
                  {p.title}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
