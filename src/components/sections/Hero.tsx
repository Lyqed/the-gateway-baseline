import {
  CRITERIA,
  GATEWAYS,
  SPEC_HISTORY,
  tallyMatrix,
  topScore,
} from "@/lib/gateways";
import { Reveal } from "@/components/reveal/Reveal";
import { Ring } from "@/components/marks/Ring";
import { HandCircle } from "@/components/marks/HandStrokes";

/**
 * Hero — the ring motif behind, display caps, one hand annotation
 * (violet stroke circling "verified", Shantell "not vendor claims"),
 * and GB-1..GB-9 as a mono chip row.
 */
export function Hero() {
  const tally = tallyMatrix();
  const top = topScore();
  const lastChange = SPEC_HISTORY[0].date;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-steel"
    >
      <div aria-hidden="true" className="skylight-band absolute inset-0" />
      <Ring className="absolute -right-[16rem] -top-[14rem] w-[46rem] opacity-70 sm:-right-[12rem] lg:-right-[6rem]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <p className="mono-label text-steel-dark">
          Spec · GB-1 — GB-9 · last change {lastChange}
        </p>

        <h1
          id="hero-heading"
          className="text-hero mt-8 max-w-4xl font-medium uppercase"
        >
          The Gateway Baseline
        </h1>

        <div className="relative mt-10 max-w-2xl">
          <Reveal mode="draw">
            <p className="text-lg leading-relaxed text-steel-dark sm:text-xl">
              Nine checks a platform team can hold any LLM gateway to,{" "}
              <HandCircle>
                <span className="text-ink">verified</span>
              </HandCircle>{" "}
              against public documentation.
            </p>
          </Reveal>
          <p className="mt-4 -rotate-2 font-hand text-lg text-violet">
            *not vendor claims
          </p>
        </div>

        <Reveal>
          <ul className="mt-12 flex flex-wrap gap-2">
            {CRITERIA.map((criterion) => (
              <li key={criterion.id}>
                <a
                  href={`#${criterion.code.toLowerCase()}`}
                  title={criterion.title}
                  className="lift inline-flex items-baseline gap-2 border border-steel bg-panel px-3 py-1.5 font-mono text-xs text-ink"
                >
                  <span className="font-semibold">{criterion.code}</span>
                  <span className="hidden text-steel-dark sm:inline">
                    {criterion.short}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-12 font-mono text-xs text-steel-dark">
          {GATEWAYS.length} gateways · {tally.total} cells · {tally.green}{" "}
          conform · {tally.partial} partial · {tally.missing} missing ·{" "}
          {tally.unknown} not verified
          {top < CRITERIA.length && (
            <span className="text-ink">
              {" "}
              · top score {top}/{CRITERIA.length}
            </span>
          )}
        </p>
      </div>
    </section>
  );
}
