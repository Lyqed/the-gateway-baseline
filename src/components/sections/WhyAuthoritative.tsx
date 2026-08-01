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
              An estimate loses the argument the moment someone doubts it.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink sm:text-xl">
              <p>
                Count tokens, multiply by a price list, and you have a number.
                It is a useful number, and it is a guess. Close, often. Still a
                guess.
              </p>
              <p>
                Then a team looks at what it owes and pushes back. A guess has
                no answer to that. It is one side&apos;s math against the other
                side&apos;s doubt, and neither can win. The figure the provider
                actually charged has no such weakness. It is not a case to
                argue. It is the bill, and the bill is where the disagreement
                stops.
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
              There is a harder question underneath: is any of this spend
              earning its keep? You cannot answer it while the cost half stays
              a{" "}
              <span className="relative inline-block">
                guess
                <span className="absolute -bottom-1 left-0 w-full">
                  <Reveal mode="draw">
                    <HandUnderline />
                  </Reveal>
                </span>
              </span>
              . What these tools return is real but diffuse and slow to
              measure, which is not the same as worthless. The verdict is out.
              It stays out until one side of the ledger is nailed down.
            </p>
            <p className="text-steel-dark">
              Cost is the side you can nail down. Take it from the source that
              cannot be disputed, the provider&apos;s own bill, and the return
              on the spend becomes a question with a chance of an answer
              instead of a standoff between two dashboards.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
