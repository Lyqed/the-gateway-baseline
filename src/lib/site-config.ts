/**
 * Single source of truth for site-wide constants.
 * The Gateway Baseline: a common standard for cost attribution in AI.
 */
export const SITE_CONFIG = {
  name: "The Gateway Baseline",
  tagline: "A common standard for cost attribution in AI",
  description:
    "A common standard for how AI spend is attributed: named on the cloud provider's own bill, not estimated in a dashboard. An estimate loses the argument the moment someone doubts it, and authoritative cost is the precondition for the whole question of whether the spend is worth it.",
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
