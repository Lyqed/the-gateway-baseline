/**
 * Single source of truth for site-wide constants.
 * The Gateway Baseline — the neutral yardstick site.
 */
export const SITE_CONFIG = {
  name: "The Gateway Baseline",
  tagline: "Nine checks a platform team can hold any LLM gateway to",
  description:
    "Nine checks a platform team can hold any LLM gateway to, verified against public documentation. Verified cells, not marketing pages.",
  url: "https://thegatewaybaseline.com",
  /** Correction / contact address for the tracker. */
  contactEmail: "antonbraverman1@gmail.com",
  /** Sister site: the community gateway built against this bar. */
  sisterUrl: "https://theopensourcegateway.com",
  /** The project repo behind the reference implementation. */
  repoUrl: "https://github.com/Lyqed/thegatewayproject",
  locale: "en",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Anchored single-page navigation. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Checks", href: "#checks" },
  { label: "Matrix", href: "#matrix" },
  { label: "Method", href: "#method" },
  { label: "History", href: "#history" },
] as const;
