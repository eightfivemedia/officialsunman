"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Bones only — wire to Brevo/Mailchimp/API route later.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  return (
    <section className="relative overflow-hidden bg-bone py-20 md:py-24">
      <div className="glow-ember pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative mx-auto max-w-wide px-7 text-center md:px-8">
        <h2 className="font-display text-4xl text-ink md:text-5xl">
          Join the legacy
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
          Get first word on the animated series, drops, and the 40-year story.
        </p>

        {status === "done" ? (
          <p className="mt-8 font-display text-2xl tracking-wide text-gold-deep">
            You&apos;re in. Welcome to the Rulers of the Sun.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="flex-1 text-left">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="you@email.com"
                className="w-full rounded-full border border-line bg-bone px-5 py-3.5 text-ink placeholder:text-ink-muted/60 outline-none transition-colors duration-300 focus:border-red"
              />
              {status === "error" && (
                <span className="mt-1.5 block px-2 text-sm text-red-bright">
                  Enter a valid email address.
                </span>
              )}
            </div>
            <button
              type="submit"
              className="rounded-full bg-red px-7 py-3.5 font-semibold text-bone transition-all duration-300 hover:shadow-red-glow active:scale-[0.98]"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
