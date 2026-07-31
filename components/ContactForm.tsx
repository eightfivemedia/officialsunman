"use client";

import { useState } from "react";
import { SITE } from "@/lib/data";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Bones only — opens the user's mail client for now.
    // Wire to an API route / form service (Formspree, Brevo) later.
    const subject = encodeURIComponent(`Sun-Man inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-line bg-bone px-4 py-3 text-ink placeholder:text-ink-muted/60 outline-none transition-colors duration-300 focus:border-red";
  const label =
    "mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-bone/70 p-6 shadow-cinematic-sm md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="cemail" className={label}>
            Email
          </label>
          <input
            id="cemail"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            className={field}
          />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Licensing, press, or just saying hello…"
          className={`${field} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="mt-6 rounded-full bg-red px-7 py-3.5 font-semibold text-bone transition-all duration-300 hover:shadow-red-glow active:scale-[0.98]"
      >
        Send Message
      </button>
      {sent && (
        <p className="mt-4 font-medium text-red">
          Opening your email app — thank you for reaching out.
        </p>
      )}
    </form>
  );
}
