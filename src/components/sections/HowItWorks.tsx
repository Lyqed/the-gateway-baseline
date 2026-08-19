import { Reveal } from "@/components/reveal/Reveal";

/**
 * How the standard works, in three moves: the ruler, the evidence,
 * the measurement. This is the section that makes the rest of the
 * page legible in ten seconds — the mechanism, not the argument.
 */

const STEPS = [
  {
    n: "01",
    title: "The ruler",
    body: "Nine checks, GB-1 through GB-9, frozen as GB/1.0. Within a major version the meaning of a check cannot change; corrections ship as dated errata that cannot move a published score. New checks queue as candidates and cannot score for a full verification cycle.",
    link: { href: "/spec", label: "The specification" },
  },
  {
    n: "02",
    title: "The evidence",
    body: "Three classes decide every cell: public documentation, a reproducible conformance-run transcript, or a line from the cloud provider's own billing data. Vendor intent is not evidence, and a roadmap scores nothing.",
    link: { href: "/spec#evidence-heading", label: "Evidence classes" },
  },
  {
    n: "03",
    title: "The measurement",
    body: "Every gateway is scored against the text and nothing else, on a dated pass. Each cell carries its sourced reasoning, disputes are adjudicated in public, and every correction lands in the ledger whichever direction it moves.",
    link: { href: "/ledger", label: "The ledger" },
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="border-b border-steel bg-panel"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <h2 id="how-heading" className="sr-only">
          How the standard works
        </h2>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="flex h-full flex-col border-t-2 border-ink pt-5">
                <p className="font-mono text-sm text-steel-dark">{s.n}</p>
                <h3 className="mt-2 text-xl font-medium text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-dark">
                  {s.body}
                </p>
                <p className="mt-4">
                  <a
                    href={s.link.href}
                    className="mono-label text-skylight-deep hover:text-ink"
                  >
                    {s.link.label} <span aria-hidden="true">&rsaquo;</span>
                  </a>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
