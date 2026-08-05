import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { SPEC_CHECKS, SPEC_FROZEN } from "@/lib/spec";

export default function sitemap(): MetadataRoute.Sitemap {
  const frozen = new Date(SPEC_FROZEN);
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/spec`,
      lastModified: frozen,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SPEC_CHECKS.map((check) => ({
      url: `${SITE_CONFIG.url}/spec/${check.slug}`,
      lastModified: frozen,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_CONFIG.url}/spec/candidates`,
      lastModified: frozen,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
