/**
 * Single source of truth for site-wide constants.
 * The Gateway Baseline: the standard for cost attribution in AI.
 */
export const SITE_CONFIG = {
  name: "The Gateway Baseline",
  tagline: "An open conformance standard for LLM gateways",
  description:
    "The standard for cost attribution in AI: spend named on the cloud provider's own bill, not estimated in a dashboard. Nine falsifiable checks, three evidence classes, every gateway scored against the text and nothing else.",
  url: "https://thegatewaybaseline.com",
  locale: "en",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** The reading order: the argument, the bar, the measurement, the record. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Why", href: "/#why-it-matters" },
  { label: "The checks", href: "/#checks" },
  { label: "Scoreboard", href: "/#tracker" },
  { label: "Spec", href: "/spec" },
  { label: "Ledger", href: "/ledger" },
] as const;
