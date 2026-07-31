import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Legacy } from "@/components/Legacy";
import { Timeline } from "@/components/Timeline";
import { Series } from "@/components/Series";
import { GetSunMan } from "@/components/GetSunMan";
import { Press } from "@/components/Press";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Legacy />
      <Timeline />
      <Series />
      <GetSunMan />
      <Press limit={4} showAllLink />
      <Newsletter />
    </main>
  );
}
