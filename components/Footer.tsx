import Link from "next/link";
import { SOCIALS, SITE, NAV_LINKS } from "@/lib/data";
import { Logo } from "./Logo";

// Original three-column layout: brand on the left, Explore and Connect as
// vertical lists beside it. On mobile the brand spans the full width and the
// two lists sit side by side beneath it, still vertical.
export function Footer() {
  const label =
    "mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-red";
  const link = "text-ink/80 transition-colors duration-300 hover:text-red";

  return (
    <footer className="relative overflow-hidden bg-bone pb-10 pt-20">
      <div className="glow-br pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-site px-7 md:px-8">
        <div className="grid grid-cols-2 gap-10 pb-12 text-center md:grid-cols-[1.5fr_1fr_1fr] md:gap-12 md:pb-14 md:text-left">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Sun-Man — home" className="inline-block">
              <Logo variant="full" className="h-16 md:h-20" />
            </Link>
            <p className="mx-auto mt-5 max-w-xs text-base leading-relaxed text-ink-muted md:mx-0">
              {SITE.tagline}
            </p>
          </div>

          <nav className="flex flex-col items-center gap-3 md:items-start">
            <span className={label}>Explore</span>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={link}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-3 md:items-start">
            <span className={label}>Connect</span>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="rule-soft" />

        <div className="flex flex-col items-center gap-1.5 pt-6 text-center text-xs text-ink-muted md:flex-row md:justify-between md:text-left md:text-sm">
          {/* Range collapses to a single year if the current year is 2021. */}
          <p>
            &copy; 2021
            {new Date().getFullYear() > 2021 && `–${new Date().getFullYear()}`}.
            Official Sunman. All Rights Reserved.
          </p>
          {/* Three separate lines on mobile; one row with a middot on desktop. */}
          <p className="flex flex-col items-center gap-1 md:flex-row md:flex-wrap md:gap-x-2 md:gap-y-1">
            <span>Created by Yla Eason, 1985.</span>
            <span aria-hidden className="hidden text-line md:inline">
              &middot;
            </span>
            <span>
              Site designed by{" "}
              <a
                href="https://eightfivemedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline-offset-4 transition-colors duration-300 hover:text-red hover:underline"
              >
                EightFive Media
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
