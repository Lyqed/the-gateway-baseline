import { Hero } from "@/components/sections/Hero";
import { WhyAuthoritative } from "@/components/sections/WhyAuthoritative";
import { TrustChoice } from "@/components/sections/TrustChoice";
import { Requirements } from "@/components/sections/Requirements";
import { PerforatedRail } from "@/components/marks/PerforatedRail";

/**
 * The Gateway Baseline — a single page, statically prerendered. One
 * scope: cost attribution. Two centers carry the page.
 *
 * The thesis up front (Hero), then the sharp point: why an authoritative
 * figure, not an estimate, is the thing that matters (WhyAuthoritative).
 * Then the trust choice a team makes, hedged toward trusting developers
 * (TrustChoice), which now carries the operator-owned-tag line that once
 * stood alone on a monolith band. The six requirements follow, in
 * service of those two arguments rather than as the headline.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyAuthoritative />
      <PerforatedRail />
      <TrustChoice />
      <Requirements />
    </>
  );
}
