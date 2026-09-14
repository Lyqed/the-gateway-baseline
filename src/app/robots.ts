import type { MetadataRoute } from "next";

/**
 * OFFLINE POSTURE. While the site serves a holding page, crawling is
 * disallowed and no sitemap is advertised, so no engine caches a
 * placeholder in place of the standard. Restore alongside the layout and
 * page backups: `allow: "/"` plus the sitemap line below.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
