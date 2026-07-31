import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { GetSunMan } from "@/components/GetSunMan";
import { Newsletter } from "@/components/Newsletter";
import { RETAILERS } from "@/lib/data";
import { Sunman } from "@/components/Sunman";

// Built from the live retailer list so the description can't advertise a
// stockist we've since delisted.
const stockists = new Intl.ListFormat("en", { style: "long", type: "conjunction" })
  .format(RETAILERS.map((r) => r.name));

export const metadata: Metadata = {
  title: "Get Sun-Man",
  description: `Buy Sun-Man now — available at ${stockists} as part of Masters of the Universe.`,
  alternates: { canonical: "/get" },
  openGraph: {
    title: "Get Sun-Man",
    description: `Buy Sun-Man now — available at ${stockists} as part of Masters of the Universe.`,
    url: "/get",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function GetPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Buy Now"
        title={<>Get <Sunman /></>}
        intro="Available now as part of Mattel's Masters of the Universe Origins line. Choose your retailer below."
      />
      <GetSunMan />
      <Newsletter />
    </main>
  );
}
