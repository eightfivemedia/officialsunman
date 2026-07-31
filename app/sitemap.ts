import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/seo";

// Generated at build time from the single ROUTES list in lib/seo.ts, so a new
// page can't be added without also appearing here.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
