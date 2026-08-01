import { Reveal } from "@/components/reveal/Reveal";
import { HandUnderline } from "@/components/marks/HandStrokes";

/**
 * Why authoritative attribution matters (Center 1) — the sharp point of
 * the whole page, given the earliest and heaviest real estate after the
 * thesis. Two arguments, in the author's voice: an estimate is your
 * arithmetic against their disbelief, and you cannot settle whether the
 * spend is worth it until the cost side is a fact.
 *
 * Set as a monarch-ruled panel with the largest body type on the page,
 * skylight band behind it. No paint carries information alone; the
 * violet underline annotates the one word "fact".
 */
export function WhyAuthoritative() {
  return (
    <section
      id="why-it-matters"
      aria-labelledby="why-heading"
      className="mx-auto w-full max-w-6xl px-6 pb-[var(--space-section)] pt-16 sm:pt-20"
    >
      <Reveal>
        <div className="relative border-t-2 border-monarch bg-panel px-6 py-12 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="skylight-band absolute inset-0" />
          <div className="relative max-w-3xl">
            <p className="mono-label text-monarch-deep">
              Why it matters
            </p>
            <h2
              id="why-heading"
              className="text-section mt-5 max-w-2xl font-medium text-ink"
            >
              An estimate is not good enough when the real number exists.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink sm:text-xl">
              <p>
                A token-counting tool tallies tokens against a price table.
                LiteLLM is the common example. That is useful. But everything
                it holds is an estimate.
              </p>
              <p>
                The moment a team disputes its bill, an estimate is just your
                arithmetic against their disbelief. The authoritative figure,
                the dollars the provider actually billed, is the only number
                that ends that conversation. An estimation tool, by
                definition, does not hold it.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* The larger reason. Set apart, past the panel edge, so the ROI
          argument reads as the deeper claim rather than a footnote. */}
      <Reveal delay={80}>
        <div className="mt-16 grid gap-x-10 gap-y-6 sm:mt-20 sm:grid-cols-[6rem_1fr]">
          <p className="font-mono text-sm text-steel-dark sm:pt-2">
            The deeper reason
          </p>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink">
            <p>
              You cannot settle whether the spend is worth it until the cost
              side is a{" "}
              <span className="relative inline-block">
                fact
                <span className="absolute -bottom-1 left-0 w-full">
                  <Reveal mode="draw">
                    <HandUnderline />
                  </Reveal>
                </span>
              </span>
              . The value of AI spend is genuinely hard to measure. That is
              not proof it is absent. But the argument can only be settled if
              cost is known.
            </p>
            <p className="text-steel-dark">
              To measure value you have to know what it cost. Authoritative
              cost is the precondition for the entire ROI question: the
              dollar figure on the provider&apos;s own bill, not an estimate
              reconstructed in a third-party dashboard.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
