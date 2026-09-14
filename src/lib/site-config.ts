/**
 * Single source of truth for site-wide constants.
 * The Gateway Baseline: an open baseline for attribution in AI.
 */
export const SITE_CONFIG = {
  name: "The Gateway Baseline",
  tagline: "An open conformance standard for LLM gateways",
  description:
    "An open baseline for attribution in AI: connect requests to applications, teams and people across identity, controls, usage records and provider billing. Nine falsifiable checks, three evidence classes, every gateway scored against public evidence.",
  url: "https://thegatewaybaseline.com",
  locale: "en",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Shown at every width; the rest appear from the sm breakpoint up. */
  primary?: boolean;
};

/** The reading order: the argument, the bar, the measurement, the record. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Why", href: "/#why-it-matters" },
  { label: "The checks", href: "/#checks" },
  { label: "Scoreboard", href: "/#tracker", primary: true },
  { label: "Signals", href: "/#signals" },
  { label: "Spec", href: "/spec", primary: true },
  { label: "Record", href: "/record", primary: true },
] as const;
