import type { MetadataRoute } from "next";
import { SPEC_HISTORY } from "@/lib/gateways";
import { SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(SPEC_HISTORY[0].date),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
