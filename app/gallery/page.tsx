import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Product photography, packaging art, and archival Sun-Man imagery.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery",
    description: "Product photography, packaging art, and archival Sun-Man imagery.",
    url: "/gallery",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function GalleryPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Gallery"
        title="See the hero"
        intro="Archival ads, the animated series, and the figure that started it all."
      />
      <section className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-site px-7 md:px-8">
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}
