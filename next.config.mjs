/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All imagery is local under /public/img — no remote hosts are allowed.
    // The Webflow CDN blocks hotlinking (403), so nothing is fetched remotely.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  // The page moved from /series to /legend; keep old links and any indexed
  // URLs working rather than 404ing them.
  async redirects() {
    return [{ source: "/series", destination: "/legend", permanent: true }];
  },
};

export default nextConfig;
