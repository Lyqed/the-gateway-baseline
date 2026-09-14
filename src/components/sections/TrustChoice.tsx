import { Reveal } from "@/components/reveal/Reveal";

/**
 * Trust is a choice: the operator-owned tag is the floor everyone shares;
 * how far to go on identity is the team's decision, hedged toward
 * trusting developers. Two large cards, the default carrying the weight.
 */
export function TrustChoice() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-8 sm:py-12"
    >
      <div className="max-w-3xl">
        <p className="mono-label text-steel-dark">The trust choice</p>
        <h2 id="trust-heading" className="text-section mt-3 text-ink">
          The gateway assigns the tag. How far you go on identity is your
          decision.
        </h2>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-dark">
          The tag is operator-owned: pinned to the app, the route, or the key
          issued to the caller, never believed from a header the caller sets.
          Everyone starts there.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <article className="card-xl flex h-full flex-col px-8 py-10 sm:px-10 sm:py-12">
            <p className="mono-label text-teal-deep">The sensible default</p>
            <h3 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2rem]">
              Trust your developers
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink">
              Bind the tag to the applications, routes or keys you manage.
              Use that assignment when counting requests, applying limits,
              investigating failures and reconciling charges.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-steel-dark">
              For internal workloads, a stable application or team identity
              may provide the accountability you need. Keep the assignment
              current as applications and their owners change.
            </p>
          </article>
        </Reveal>
        <Reveal delay={60}>
          <article className="card-xl flex h-full flex-col px-8 py-10 sm:px-10 sm:py-12">
            <p className="mono-label text-steel-dark">When your threat model requires it</p>
            <h3 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2rem]">
              Verify identity
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink">
              Derive the caller or group from a verified login when a decision
              needs that level of proof. Connect the identity to the ownership
              and policy context used downstream.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-steel-dark">
              Verification brings configuration and lifecycle work. Choose
              the level of proof that your access, policy and attribution
              decisions require.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
