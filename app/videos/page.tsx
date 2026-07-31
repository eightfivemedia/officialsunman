import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { VideoGrid } from "@/components/VideoGrid";
import { YOUTUBE_CHANNEL } from "@/lib/data";
import { Sunman } from "@/components/Sunman";

export const metadata: Metadata = {
  title: "Videos",
  description: "Interviews, unboxings, and reviews from the Sun-Man community.",
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "Videos",
    description: "Interviews, unboxings, and reviews from the Sun-Man community.",
    url: "/videos",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function VideosPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Watch"
        title="Videos"
        intro={<>Interviews with creator Yla Eason, unboxings, and reviews from the <Sunman /> community.</>}
      />

      <section className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-site px-7 md:px-8">
          <VideoGrid />

          <div className="mt-14 text-center">
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-red px-7 py-3.5 font-semibold text-bone transition-all duration-300 hover:bg-red-bright hover:shadow-red-glow active:scale-[0.98]"
            >
              Visit the YouTube Channel
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
