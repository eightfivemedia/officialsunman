/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All imagery is local under /public/img — no remote hosts are allowed.
    // The Webflow CDN blocks hotlinking (403), so nothing is fetched remotely.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  // Dev only. Webpack's filesystem cache writes .next/cache/webpack/*.pack.gz
  // and then fails to stat the packs back; the ENOENT surfaces as an
  // unhandledRejection, and the dev server survives it in name only — it keeps
  // accepting connections while serving 500 for every route, with no overlay
  // and no stack to go on. A cold compile here is under three seconds, so the
  // persistent cache is buying very little. Drop this once a Next release
  // fixes the cache; it has no effect on `next build`.
  webpack(config, { dev }) {
    if (dev) config.cache = false;
    return config;
  },

  // "Play fullscreen" serves each game's own document at a clean URL. The builds
  // in public/games are already complete standalone pages, so there is nothing
  // to wrap them in — no Next page and no iframe. That matters for more than
  // tidiness: a framed document never receives safe-area insets and its own
  // viewport meta is ignored, so only at the top level does the controller
  // clear the home bar and the game's user-scalable=no actually take effect.
  //
  // Listed per game rather than as /games/:slug/play, so an unknown slug 404s
  // instead of rewriting to a file that isn't there.
  async rewrites() {
    return [
      {
        source: "/games/pighead-assault/play",
        destination: "/games/pighead-assault.html",
      },
      { source: "/games/sky-patrol/play", destination: "/games/sky-patrol.html" },
    ];
  },

  // The page moved from /series to /legend; keep old links and any indexed
  // URLs working rather than 404ing them.
  async redirects() {
    return [{ source: "/series", destination: "/legend", permanent: true }];
  },
};

export default nextConfig;
