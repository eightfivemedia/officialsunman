import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { PressGrid } from "@/components/PressGrid";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Sun-Man in the press — from The New York Times and IGN to Complex, Gizmodo, and more.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press",
    description: "Sun-Man in the press — from The New York Times and IGN to Complex, Gizmodo, and more.",
    url: "/press",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function PressPage() {
  return (
    <main>
      <PageHeader
        eyebrow="In The Press"
        title="The world took notice"
        intro="From The New York Times to IGN, Complex, and Gizmodo — Sun-Man's return made headlines around the world."
      />
      <PressGrid />
    </main>
  );
}
