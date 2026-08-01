import { SITE_CONFIG } from "@/lib/site-config";
import { SNAPSHOTS } from "@/lib/gateway-snapshots";
import { Reveal } from "@/components/reveal/Reveal";

/**
 * Method — how cells get verified. Short and exact: public docs
 * only, dated snapshots, corrections via email.
 */
export function Method() {
  const snapshot = SNAPSHOTS[0];

  return (
    <section
      id="method"
      aria-labelledby="method-heading"
      className="relative overflow-hidden"
    >
      <div aria-hidden="true" className="skylight-band absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-[var(--space-section)]">
        <p className="mono-label text-steel-dark">03 — Method</p>
        <h2 id="method-heading" className="text-section mt-4 font-medium">
          How a cell gets its color
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <Reveal>
            <div className="border-t-2 border-ink pt-5">
              <h3 className="font-mono text-sm font-semibold">
                Public documentation only
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-dark">
                Every status is hand-verified against the vendor&apos;s public
                documentation, on the date recorded per gateway row. No sales
                calls, no private builds, no vendor claims taken on trust.
                &quot;Unknown&quot; means exactly that, not &quot;no&quot;.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="border-t-2 border-ink pt-5">
              <h3 className="font-mono text-sm font-semibold">
                Dated snapshots
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-dark">
                When the matrix has been verified end to end, its statuses are
                frozen as a dated snapshot, so future movement is measured
                against a trusted state rather than memory.
              </p>
              <p className="mt-4 border border-steel bg-panel p-3 font-mono text-xs leading-relaxed text-steel-dark">
                <span className="font-semibold text-ink">
                  SNAPSHOT {snapshot.date}
                </span>{" "}
                — {snapshot.note}
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="border-t-2 border-ink pt-5">
              <h3 className="font-mono text-sm font-semibold">Corrections</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-dark">
                If a cell is wrong, say so and it will be re-verified against
                the docs you cite. One address, read by the person who scored
                the cell:
              </p>
              <p className="mt-4">
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="font-mono text-sm text-skylight-text underline decoration-steel underline-offset-4 hover:decoration-skylight-text"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
