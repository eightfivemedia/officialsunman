// Central SEO config. Everything that needs the canonical origin — metadata,
// sitemap, robots, JSON-LD — reads it from here so there's one place to change
// when the domain moves.

import { SOCIALS } from "./data";

// Resolved per-deployment. Pointing this at the custom domain before that
// domain serves the build breaks link previews: og:image resolves to a host
// that isn't running this site, the scraper can't fetch it, and the platform
// falls back to whatever image it can find.
//
// Order: an explicit override, then Vercel's production domain, then the
// current deployment, then the intended final domain.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://www.officialsunman.com";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Sun-Man";

export const SITE_DESCRIPTION =
  "The first Black action figure with his own storyline, created in 1985 by Yla Eason. Over 40 years later, Sun-Man is back — from Olmec Toys to Mattel's Masters of the Universe.";

/** Every indexable route, with its relative priority for the sitemap. */
export const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/legend", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/get", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/videos", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/games", priority: 0.7, changeFrequency: "monthly" as const },
  // The game pages themselves: thin around a framed game, but they're the URLs
  // anyone sharing a game would link to, so they belong here.
  { path: "/games/pighead-assault", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/games/sky-patrol", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/press", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
];

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Sun-Man — the original Black superhero, created 1985",
};

/** Organization + WebSite graph, emitted once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Olmec Toys",
        alternateName: "Sun-Man",
        url: SITE_URL,
        logo: `${SITE_URL}/img/sunman-logo.webp`,
        description: SITE_DESCRIPTION,
        foundingDate: "1985",
        founder: {
          "@type": "Person",
          name: "Yla Eason",
          jobTitle: "Creator of Sun-Man, founder of Olmec Toys",
        },
        sameAs: SOCIALS.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}
