/**
 * Single source of truth for site-wide constants.
 * The Gateway Baseline — a statement of cost-attribution requirements.
 */
export const SITE_CONFIG = {
  name: "The Gateway Baseline",
  tagline: "Cost attribution for AI traffic, stated as requirements",
  description:
    "Cost attribution for AI traffic is not a dashboard. It is a set of requirements a gateway either meets or does not, and the sharpest is that the operator-owned tag reaches the cloud provider's own invoice as an authoritative dollar figure.",
  url: "https://thegatewaybaseline.com",
  locale: "en",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Anchored single-page navigation: the requirements. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Requirements", href: "#requirements" },
  { label: "The invoice", href: "#the-invoice" },
] as const;
