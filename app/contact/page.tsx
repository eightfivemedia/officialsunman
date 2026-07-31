import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { SITE, SOCIALS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about Sun-Man — licensing, press, and general inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description: "Get in touch about Sun-Man — licensing, press, and general inquiries.",
    url: "/contact",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact"
        intro="Licensing, press, partnerships, or just saying hello — reach out to the team behind Sun-Man."
      />
      <section className="bg-bone py-20 md:py-28">
        <div className="mx-auto grid max-w-site gap-10 px-7 md:grid-cols-[1.2fr_0.8fr] md:px-8">
          <ContactForm />

          <aside className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-ink">Direct</h2>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="mt-2 inline-block border-b border-red text-lg font-medium text-ink transition-colors hover:text-red"
              >
                {SITE.contactEmail}
              </a>
              <p className="mt-2 text-sm text-ink-muted">
                Olmec Toys / YlaSun — attn. {SITE.creator}
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink">Follow</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line bg-bone/70 px-4 py-2 text-sm font-medium text-ink transition-all duration-300 hover:border-gold/60 hover:text-red"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
