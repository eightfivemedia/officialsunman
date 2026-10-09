import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { gameBySlug } from "@/lib/games";
import { GameScreen } from "@/components/GameScreen";

const game = gameBySlug("sky-patrol");

export const metadata: Metadata = {
  title: game.title,
  description: game.description,
  alternates: { canonical: "/games/sky-patrol" },
  openGraph: {
    title: `Sun-Man: ${game.title}`,
    description: game.description,
    url: "/games/sky-patrol",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return <GameScreen game={game} />;
}
