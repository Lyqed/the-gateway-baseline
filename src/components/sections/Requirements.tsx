import { REQUIREMENTS } from "@/lib/requirements";
import { Reveal } from "@/components/reveal/Reveal";
import { Butterfly } from "@/components/marks/Butterfly";

/**
 * The six requirements, stated plainly. Editorial two-column rhythm,
 * not a uniform card grid and not a checklist with pass/fail dots:
 * each requirement is a titled prose block, mono index on the left,
 * statement on the right. The last requirement (the invoice) carries
 * the emphasis and is set apart with weight.
 */
export function Requirements() {
  const invoice = REQUIREMENTS[REQUIREMENTS.length - 1];
  const rest = REQUIREMENTS.slice(0, -1);

  return (
    <section
      id="requirements"
      aria-labelledby="requirements-heading"
      className="mx-auto w-full max-w-6xl px-6 py-[var(--space-section)]"
    >
      <div className="max-w-2xl">
        <p className="mono-label text-steel-dark">The requirements</p>
        <h2
          id="requirements-heading"
          className="text-section mt-5 font-medium"
        >
          What a gateway has to do before its numbers mean anything.
        </h2>
      </div>

      <div className="mt-16 flex flex-col gap-16 sm:gap-20">
        {rest.map((req, i) => (
          <Reveal key={req.id} delay={i * 40}>
            <article
              id={req.id}
              className="grid scroll-mt-24 gap-x-10 gap-y-4 sm:grid-cols-[6rem_1fr]"
            >
              <p className="font-mono text-sm text-steel-dark sm:pt-1.5">
                {req.index}
              </p>
              <div className="max-w-2xl">
                <h3 className="text-xl font-medium leading-snug text-ink sm:text-2xl">
                  {req.title}
                </h3>
                <p className="mt-4 leading-relaxed text-steel-dark">
                  {req.body}
                </p>
                {req.emphasis && (
                  <p className="mt-6 border-l-2 border-monarch pl-4 font-mono text-sm leading-relaxed text-ink">
                    {req.emphasis}
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* The sixth requirement: the sharp point. Given the most weight —
          a panel with a monarch rule, larger type, the emphasis pulled
          out as the closing line. */}
      <Reveal>
        <article
          id={invoice.id}
          className="relative mt-24 scroll-mt-24 border-t-2 border-monarch bg-panel px-6 py-12 sm:mt-28 sm:px-12 sm:py-16"
        >
          <div aria-hidden="true" className="skylight-band absolute inset-0" />
          {/* The monarch — the transformation moment: estimate to
              invoice. Used once, at this section's edge. */}
          <Butterfly className="pointer-events-none absolute -top-9 right-6 w-16 sm:right-12 sm:w-20" />
          <div className="relative max-w-3xl">
            <p className="mono-label text-monarch-deep">
              {invoice.index} · The sharp requirement
            </p>
            <h3 className="text-section mt-5 max-w-2xl font-medium text-ink">
              {invoice.title}
            </h3>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
              {invoice.body}
            </p>
            {invoice.emphasis && (
              <p className="mt-10 font-mono text-base leading-relaxed text-monarch-deep sm:text-lg">
                {invoice.emphasis}
              </p>
            )}
          </div>
        </article>
      </Reveal>
    </section>
  );
}
