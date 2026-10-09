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

  // The page moved from /series to /legend; keep old links and any indexed
  // URLs working rather than 404ing them.
  async redirects() {
    return [{ source: "/series", destination: "/legend", permanent: true }];
  },
};

export default nextConfig;
