import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Series } from "@/components/Series";
import { Newsletter } from "@/components/Newsletter";
import { Sunman } from "@/components/Sunman";

export const metadata: Metadata = {
  title: "The Legend of Sun-Man",
  description:
    "An animated origin story in the bold spirit of 90s Saturday-morning television. Watch it now.",
  alternates: { canonical: "/legend" },
  openGraph: {
    title: "The Legend of Sun-Man",
    description: "An animated origin story in the bold spirit of 90s Saturday-morning television. Watch it now.",
    url: "/legend",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function SeriesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Animated Series"
        title={<>The Legend of <Sunman /></>}
        intro="The untold story of Prince Sunni Ali of Ancient Kemet — the animated origin story, streaming now."
      />
      <Series showHeading={false} />
      <Newsletter />
    </main>
  );
}
