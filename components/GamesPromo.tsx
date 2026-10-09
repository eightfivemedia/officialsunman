"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GAMES } from "@/lib/games";
import { Sunman } from "./Sunman";

// Holds the timestamp this was last shown. Versioned, so a later campaign can
// start fresh without having to clear anything people have stored.
const LAST_SHOWN_KEY = "sunman-games-promo-v1";

// At most one appearance a day. Anyone who visits the homepage three times in
// an afternoon sees it once.
const SHOW_EVERY_MS = 24 * 60 * 60 * 1000;

// Long enough for the hero to land and be read first. A dialog that arrives
// with the page reads as an ad; one that arrives after a beat reads as an offer.
const DELAY_MS = 2600;

export function GamesPromo() {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusTo = useRef<Element | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let lastShown = 0;
    try {
      lastShown = Number(window.localStorage.getItem(LAST_SHOWN_KEY)) || 0;
    } catch {
      // Private browsing throws on access. Nothing can be remembered, so the
      // honest fallback is to treat this as a first visit.
    }
    if (Date.now() - lastShown < SHOW_EVERY_MS) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      // Stamped when it opens rather than when it's closed. Someone who reads
      // it and wanders off without touching anything has still seen it, and
      // shouldn't be met with it again on their next visit.
      try {
        window.localStorage.setItem(LAST_SHOWN_KEY, String(Date.now()));
      } catch {
        // Can't remember it; it'll show again next visit. Better than crashing.
      }
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => setOpen(false), []);

  // Everything a modal owes the keyboard: focus moves in, Escape closes, Tab
  // can't wander off behind the backdrop, and focus goes back where it was.
  useEffect(() => {
    if (!open) return;

    returnFocusTo.current = document.activeElement;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !cardRef.current) return;

      const focusable = cardRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      (returnFocusTo.current as HTMLElement | null)?.focus?.();
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          // Above the film grain (z-60) and the fixed header (z-50).
          className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={dismiss}
            className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
          />

          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="games-promo-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-bone p-7 shadow-cinematic sm:p-8"
          >
            <div className="edge-fade pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-24 -top-24 h-[22rem] w-[22rem]">
                <div className="sunburst animate-spin-slow h-full w-full rounded-full opacity-60" />
              </div>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-cream hover:text-red"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="rule-brand h-px w-10" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red">
                  New
                </span>
              </div>

              <h2
                id="games-promo-title"
                className="max-w-[16ch] font-display text-3xl text-ink sm:text-4xl"
              >
                Play the <Sunman /> demo games
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                Two free demos, right in your browser — on a computer or a phone,
                no download.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {GAMES.map((game) => (
                  <Link
                    key={game.slug}
                    href={`/games/${game.slug}`}
                    onClick={dismiss}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-bone/70 p-2.5 pr-4 transition-all duration-300 hover:border-gold/60 hover:shadow-cinematic-sm"
                  >
                    {/* Small on purpose — enough of the key art to say what
                        kind of game it is, not so much that the dialog turns
                        into a second games page. */}
                    <span className="relative h-12 w-[5.25rem] shrink-0 overflow-hidden rounded-lg bg-cream">
                      <Image
                        src={game.image}
                        alt=""
                        fill
                        sizes="84px"
                        className="object-cover"
                      />
                    </span>

                    <span className="flex-1 font-display text-lg text-ink transition-colors duration-300 group-hover:text-red">
                      {game.title}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red text-bone transition-transform duration-300 group-hover:translate-x-0.5">
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
                ))}
              </div>

              <button
                type="button"
                onClick={dismiss}
                className="mt-5 text-sm font-medium text-ink-muted underline-offset-4 transition-colors duration-300 hover:text-red hover:underline"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
