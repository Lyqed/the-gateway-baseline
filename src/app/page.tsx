import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyAuthoritative } from "@/components/sections/WhyAuthoritative";
import { TrustChoice } from "@/components/sections/TrustChoice";
import { Checks } from "@/components/sections/Checks";
import { Tracker } from "@/components/sections/Tracker";
import { UpstreamSignals } from "@/components/sections/UpstreamSignals";

/**
 * The Gateway Baseline — a single page, statically prerendered.
 *
 * Reading order is the argument's order: what the standard is (Hero),
 * how it works mechanically (HowItWorks), why the authoritative figure
 * is the point (WhyAuthoritative), the one trust decision a team makes
 * (TrustChoice), the bar itself rendered from the spec (Checks, with
 * the provisional candidates visibly unscored), and the measurement
 * (Tracker). The spec pages carry the normative text; this page makes
 * it legible in one pass.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyAuthoritative />
      <TrustChoice />
      <Checks />
      <Tracker />
      <UpstreamSignals />
    </>
  );
}
