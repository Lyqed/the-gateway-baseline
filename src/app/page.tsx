import { Hero } from "@/components/sections/Hero";
import { Checks } from "@/components/sections/Checks";
import { Matrix } from "@/components/sections/Matrix";
import { MonolithBand } from "@/components/sections/MonolithBand";
import { Method } from "@/components/sections/Method";
import { History } from "@/components/sections/History";
import { ReferenceBand } from "@/components/sections/ReferenceBand";
import { PerforatedRail } from "@/components/marks/PerforatedRail";

/**
 * The Gateway Baseline — a single page, anchored nav, statically
 * prerendered. Sections per the binding brief (docs/DESIGN.md §7):
 * the matrix shouts with data, then the room goes quiet (3b); the
 * second still point (5b) is bare atrium, and the dot was already
 * spent on the dark band.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Checks />
      <Matrix />
      <MonolithBand
        surface="floor"
        watchingDot
        sentence="The gateway never just believes a tag."
      />
      <Method />
      <PerforatedRail />
      <History />
      <MonolithBand
        surface="atrium"
        sentence="Someone is told when a cap is hit."
      />
      <ReferenceBand />
    </>
  );
}
