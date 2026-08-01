import {
  CRITERIA,
  GATEWAYS,
  criterionAdoption,
  type Criterion,
} from "@/lib/gateways";
import { Reveal } from "@/components/reveal/Reveal";

const SIDE_LABEL: Record<Criterion["side"], string> = {
  control: "Control · GB-1 to GB-6",
  invoice: "Invoice · GB-7 to GB-8",
  operations: "Operations · GB-9",
};

/** Computed conformance line for a check; zero invention. */
function ConformanceNote({ criterion }: { criterion: Criterion }) {
  const conforms = criterionAdoption(criterion.id);
  const partial = GATEWAYS.filter(
    (g) => g.support[criterion.id]?.status === "partial",
  ).length;
  const unknown = GATEWAYS.filter(
    (g) => g.support[criterion.id]?.status === "unknown",
  ).length;

  if (unknown === GATEWAYS.length) {
    return (
      <p className="mt-5 font-mono text-xs text-steel-dark">
        conformance: all {GATEWAYS.length} cells not verified yet
      </p>
    );
  }

  return (
    <p className="mt-5 font-mono text-xs text-steel-dark">
      conformance:{" "}
      <span className="text-teal-deep">
        {conforms} of {GATEWAYS.length} conform
      </span>{" "}
      · <span className="text-gold-deep">{partial} partial</span> ·{" "}
      <span className="text-blossom-deep">
        {GATEWAYS.length - conforms - partial - unknown} missing
      </span>
    </p>
  );
}

function CheckRow({
  criterion,
  index,
}: {
  criterion: Criterion;
  index: number;
}) {
  const isAspirational = criterion.side === "operations";
  const staggered = index % 2 === 1;

  return (
    <Reveal>
      <article
        id={criterion.code.toLowerCase()}
        className={`grid gap-4 border-t border-steel py-10 md:grid-cols-[9rem_1fr] md:gap-8 ${
          staggered ? "lg:pl-24" : ""
        } ${isAspirational ? "border-l-4 border-l-gold pl-5 md:pl-5" : ""}`}
      >
        <div>
          <p className="font-mono text-base font-semibold text-ink">
            {criterion.code}
          </p>
          <p className="mono-label mt-2 text-steel-dark">{criterion.short}</p>
        </div>
        <div>
          <h3 className="max-w-xl text-2xl font-medium tracking-tight">
            {criterion.title}
          </h3>
          <p className="mt-4 max-w-2xl leading-relaxed text-steel-dark">
            {criterion.detail}
          </p>
          <ConformanceNote criterion={criterion} />
          {isAspirational && (
            <p className="mt-4 inline-block rotate-[1.5deg] font-hand text-lg text-violet">
              *entered 14 July 2026, awaits verification
            </p>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/**
 * The nine checks — the spec itself, ported faithfully. Editorial
 * two-column rhythm with side group dividers; GB-9 carries the gold
 * rule and the hand's caveat.
 */
export function Checks() {
  return (
    <section
      id="checks"
      aria-labelledby="checks-heading"
      className="mx-auto w-full max-w-6xl px-6 py-[var(--space-section)]"
    >
      <p className="mono-label text-steel-dark">01 · The spec</p>
      <h2
        id="checks-heading"
        className="text-section mt-4 max-w-3xl font-medium"
      >
        The nine checks
      </h2>
      <p className="mt-6 max-w-2xl leading-relaxed text-steel-dark">
        Nine checks, coded GB-1 through GB-9 and citable from upstream PRs,
        that make AI spend easy to govern from the layer that already sees
        every request.
      </p>

      <div className="mt-14">
        {CRITERIA.map((criterion, index) => {
          const previous = CRITERIA[index - 1];
          const newSide = !previous || previous.side !== criterion.side;
          return (
            <div key={criterion.id}>
              {newSide && (
                <p
                  className={`mono-label pb-4 text-steel-dark ${
                    index === 0 ? "" : "pt-10"
                  }`}
                >
                  {SIDE_LABEL[criterion.side]}
                </p>
              )}
              <CheckRow criterion={criterion} index={index} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
