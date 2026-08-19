import { GATEWAYS } from "@/lib/gateways";
import { SPEC_CHECKS, SPEC_FROZEN, SPEC_VERSION } from "@/lib/spec";
import { CANDIDATES } from "@/lib/spec";
import { Reveal } from "@/components/reveal/Reveal";

/**
 * Hero — the standard stated the way a standard states itself.
 * A definition, not a pitch: what is measured, how, and the four
 * facts (version, checks, candidates, gateways) as a record strip.
 * No decoration carries meaning; the sentence does the work.
 */
export function Hero() {
  const facts: readonly { k: string; v: string }[] = [
    { k: "Version", v: `${SPEC_VERSION} · frozen ${SPEC_FROZEN}` },
    { k: "Normative checks", v: `${SPEC_CHECKS.length}` },
    { k: "Candidates", v: `${CANDIDATES.length} · provisional, unscored` },
    { k: "Gateways tracked", v: `${GATEWAYS.length}` },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="border-b border-steel"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <p className="mono-label text-steel-dark">
          An open conformance standard for LLM gateways
        </p>
        <h1
          id="hero-heading"
          className="text-hero mt-6 max-w-4xl font-medium uppercase"
        >
          The Gateway Baseline
        </h1>

        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink sm:text-xl">
          Nine falsifiable checks that decide one thing: whether the money
          moving through an LLM gateway is controlled. Every request named to
          a spender. Every spender capped by default. Every dollar landing,
          named, on the cloud provider&rsquo;s own bill.
        </p>
        <p className="mt-5 max-w-3xl leading-relaxed text-steel-dark">
          A gateway passes a check as written, scores partial, or fails,
          against named public evidence. There is no credit for roadmap,
          intent, or vendor assurance.
        </p>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#tracker"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[0.95rem] font-medium tracking-tight text-atrium shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              See the scoreboard
            </a>
            <a
              href="/spec"
              className="text-[0.95rem] font-medium text-skylight-deep transition-opacity hover:opacity-75"
            >
              Read the spec <span aria-hidden="true">&rsaquo;</span>
            </a>
          </div>
        </Reveal>

        {/* The record strip: four facts, set like a datasheet. */}
        <dl className="mt-16 grid grid-cols-2 gap-px border border-steel bg-steel sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="bg-atrium px-5 py-4">
              <dt className="mono-label text-steel-dark">{f.k}</dt>
              <dd className="mt-1.5 font-mono text-sm font-medium text-ink">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
