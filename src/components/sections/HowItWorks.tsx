import { Reveal } from "@/components/reveal/Reveal";

/**
 * How the standard works, in three moves: the ruler, the evidence, the
 * measurement. Three white cards on the ground.
 */

const STEPS = [
  {
    title: "The ruler",
    body: "Nine checks, GB-1 through GB-9, frozen as GB/1.0. Within a major version the meaning of a check cannot change; corrections ship as dated errata that cannot move a published score. New checks queue as candidates in the open.",
    link: { href: "/spec", label: "The specification" },
  },
  {
    title: "The evidence",
    body: "Three classes decide every cell: public documentation, a reproducible conformance-run transcript, or a line from the cloud provider's own billing data. Vendor intent is not evidence, and a roadmap scores nothing.",
    link: { href: "/spec#evidence-heading", label: "Evidence classes" },
  },
  {
    title: "The measurement",
    body: "Every gateway is scored against the text and nothing else, on a dated pass. Each cell carries its sourced reasoning, disputes are adjudicated in public, and every correction lands in the record whichever direction it moves.",
    link: { href: "/record", label: "The record" },
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
        <h2 id="how-heading" className="sr-only">
          How the standard works
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="card flex h-full flex-col p-7 sm:p-8">
                <h3 className="text-[1.375rem] font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-steel-dark">
                  {s.body}
                </p>
                <p className="mt-5">
                  <a href={s.link.href} className="link-more !text-[0.9375rem]">
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
