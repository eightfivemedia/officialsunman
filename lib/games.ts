export type Game = {
  slug: string;
  /**
   * Title without the brand prefix. Pages render it after the marked-up
   * "Sun-Man™" rather than storing the mark in the string, and the metadata
   * title template already appends "| Sun-Man".
   */
  title: string;
  description: string;
  /**
   * The finished, self-contained build in /public/games — code, art and
   * start-screen video are all inlined, so it's served as a plain static file
   * and handles its own layout (widescreen on desktop, vertical on phones).
   */
  file: string;
  /**
   * Key art for the card on /games. Note the filename: the file on disk is
   * "sky-partol.png", not "sky-patrol" — keeping the typo contained to this one
   * line rather than renaming the asset underneath you.
   */
  image: string;
  /**
   * The game's own background colour, from its `--deep` custom property. The
   * frame on the game's page is painted with it, so the rounded corners and any
   * letterboxing read as part of the cabinet instead of a gap in the page.
   */
  themeColor: string;
};

export const GAMES: Game[] = [
  {
    slug: "pighead-assault",
    title: "Pig-Head Assault",
    description:
      "Fight through Pig-Head's henchpigs in a Kemet temple and take down Pig-Head himself.",
    file: "/games/pighead-assault.html",
    image: "/img/game-img/pighead-assault.png",
    themeColor: "#140c2e",
  },
  {
    slug: "sky-patrol",
    title: "Sky Patrol",
    description:
      "Fly over ancient Kemet, slash the flying Pig-Heads and collect suns.",
    file: "/games/sky-patrol.html",
    image: "/img/game-img/sky-partol.png",
    themeColor: "#060f38",
  },
];

/** Throws rather than returning undefined: every caller is a static route. */
export function gameBySlug(slug: string): Game {
  const game = GAMES.find((g) => g.slug === slug);
  if (!game) throw new Error(`Unknown game: ${slug}`);
  return game;
}
