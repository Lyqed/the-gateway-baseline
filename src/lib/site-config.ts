/**
 * Single source of truth for site-wide constants.
 * The Gateway Baseline — a statement of cost-attribution requirements.
 */
export const SITE_CONFIG = {
  name: "The Gateway Baseline",
  tagline: "Cost attribution for AI traffic, stated as requirements",
  description:
    "Cost attribution for AI traffic is not a dashboard. An estimate is not good enough when the real number exists: the authoritative figure is the dollars the provider actually billed, and that authoritative cost is the precondition for the entire ROI question.",
  url: "https://thegatewaybaseline.com",
  locale: "en",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Anchored single-page navigation: the two centers, then the list. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Why it matters", href: "#why-it-matters" },
  { label: "Trust", href: "#trust" },
  { label: "Requirements", href: "#requirements" },
] as const;
