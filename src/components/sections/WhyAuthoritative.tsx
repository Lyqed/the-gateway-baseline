import { Reveal } from "@/components/reveal/Reveal";

/**
 * Why the authoritative figure is the point. One large card; the
 * argument in two paragraphs, the deeper reason under it.
 */
export function WhyAuthoritative() {
  return (
    <section
      id="why-it-matters"
      aria-labelledby="why-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-8 sm:py-12"
    >
      <Reveal>
        <div className="card-xl px-7 py-12 sm:px-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="mono-label text-steel-dark">Why it matters</p>
            <h2 id="why-heading" className="text-section mt-3 text-ink">
              An estimate loses the argument the moment someone doubts it.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-[1.125rem] leading-relaxed text-ink sm:text-[1.25rem]">
            <p>
              Count tokens, multiply by a price list, and you have a number. It
              is a useful number, and it is a guess. Close, often. Still a
              guess.
            </p>
            <p>
              Then a team looks at what it owes and pushes back. A guess has no
              answer to that. It is one side&apos;s math against the other
              side&apos;s doubt, and neither can win. The figure the provider
              actually charged has no such weakness. It is not a case to argue.
              It is the bill, and the bill is where the disagreement stops.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl border-t border-steel pt-8">
            <p className="mono-label text-steel-dark">The deeper reason</p>
            <div className="mt-3 space-y-5 text-[1.0625rem] leading-relaxed text-ink">
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
        </div>
      </Reveal>
    </section>
  );
}
