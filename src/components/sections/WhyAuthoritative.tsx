import { Reveal } from "@/components/reveal/Reveal";

/**
 * Why authoritative attribution matters — the sharp point of the whole
 * page. Two arguments, plainly set: an estimate is one side's arithmetic
 * against the other side's doubt, and the ROI question stays unanswerable
 * while the cost half stays a guess. Document-grade: a ruled panel and a
 * margin-noted follow-through, no decoration.
 */
export function WhyAuthoritative() {
  return (
    <section
      id="why-it-matters"
      aria-labelledby="why-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-[var(--space-section)]"
    >
      <Reveal>
        <div className="border-t-2 border-monarch bg-panel px-6 py-12 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="mono-label text-monarch-deep">Why it matters</p>
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

      <Reveal delay={80}>
        <div className="mt-16 grid gap-x-10 gap-y-6 sm:mt-20 sm:grid-cols-[6rem_1fr]">
          <p className="font-mono text-sm text-steel-dark sm:pt-2">
            The deeper reason
          </p>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink">
            <p>
              There is a harder question underneath: is any of this spend
              earning its keep? You cannot answer it while the cost half stays
              a guess. What these tools return is real but diffuse and slow to
              measure, which is not the same as worthless. The verdict is out.
              It stays out until one side of the equation is nailed down.
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
