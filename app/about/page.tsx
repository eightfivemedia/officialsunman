import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Legacy } from "@/components/Legacy";
import { Timeline } from "@/components/Timeline";
import { GetSunMan } from "@/components/GetSunMan";
import { Sunman } from "@/components/Sunman";

export const metadata: Metadata = {
  title: "About — The Story Behind the Original Black Superhero",
  description:
    "The story of Sun-Man: created in 1985 by Yla Eason so her son could finally see himself as the hero.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description: "The story of Sun-Man: created in 1985 by Yla Eason so her son could finally see himself as the hero.",
    url: "/about",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="The Story"
        title="A hero, 40 years in the making"
        intro={<>Before the movies, before the mainstream — <Sunman /> was already here. This is how a mother&apos;s promise to her son became a cultural landmark.</>}
      />
      <Legacy />
      <Timeline />
      <GetSunMan />
    </main>
  );
}
