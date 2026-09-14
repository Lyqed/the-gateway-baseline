import { Reveal } from "@/components/reveal/Reveal";

/**
 * Attribution connects operational and financial questions to the work
 * behind them. Billing is one part of that account.
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
              Know whose work you are looking at.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-[1.125rem] leading-relaxed text-ink sm:text-[1.25rem]">
            <p>
              A team sees a spike in requests. An operator investigates a
              rejection. Finance asks about a charge. Each needs a way to
              connect the record back to the application, team or person
              behind it.
            </p>
            <p>
              Attribution gives those questions a shared reference. Establish
              the identity at the boundary, assign ownership deliberately, and
              carry that context into the records and decisions downstream.
              The same request should remain recognisable when a different
              team needs to understand it.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl border-t border-steel pt-8">
            <p className="mono-label text-steel-dark">One identity, several questions</p>
            <div className="mt-3 space-y-5 text-[1.0625rem] leading-relaxed text-ink">
              <p>
                Which application is generating the traffic? Which policy
                applied? Who should hear when a limit is reached? Where are
                errors or delays accumulating? Reliable attribution helps
                people connect these observations and find the owner who can
                act on them.
              </p>
              <p className="text-steel-dark">
                Cost is part of this picture. Provider billing records show
                what was charged; usage records help explain the work behind
                it. Connecting both to the same owner gives teams a basis for
                reconciling charges and assessing what their systems deliver.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
