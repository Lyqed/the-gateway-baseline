import { Hero } from "@/components/sections/Hero";
import { Requirements } from "@/components/sections/Requirements";
import { MonolithBand } from "@/components/sections/MonolithBand";
import { PerforatedRail } from "@/components/marks/PerforatedRail";

/**
 * The Gateway Baseline — a single page, statically prerendered. One
 * thing: cost attribution. The thesis up front (Hero), the six
 * requirements stated plainly (Requirements), and one still point.
 *
 * Two monolith bands, symmetry discipline observed, exactly one
 * watching dot (spent on the dark band). The requirements state the
 * case; then the room goes quiet and the sharpest one is repeated
 * alone.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <MonolithBand
        surface="atrium"
        sentence="The gateway assigns the tag. It does not take the caller's word."
      />
      <PerforatedRail />
      <Requirements />
      <MonolithBand
        surface="floor"
        watchingDot
        sentence="The exact dollar figure, on the provider's bill."
      />
    </>
  );
}
