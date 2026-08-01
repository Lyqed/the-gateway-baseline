import { Reveal } from "@/components/reveal/Reveal";

/**
 * Trust is a choice (Center 2) — presented as a team's decision, not a
 * mandate, and hedged toward trusting developers. The floor everyone
 * agrees on is the operator-owned tag: the gateway assigns it rather
 * than believing a header the caller sets. How far to go on identity is
 * the open question, and the site leans toward the trust-the-developers
 * path as the sensible default, with verification available for teams
 * whose threat model needs it.
 *
 * Measured, trust-forward, honest about the tradeoff. Two paths set
 * side by side, the default carrying the visual weight.
 */
export function TrustChoice() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="mx-auto w-full max-w-6xl px-6 py-[var(--space-section)]"
    >
      <div className="max-w-2xl">
        <p className="mono-label text-steel-dark">The trust choice</p>
        <h2 id="trust-heading" className="text-section mt-5 font-medium">
          Attribution needs a tag on every request. How far you go on
          identity is your decision.
        </h2>
      </div>

      {/* The floor everyone agrees on: the operator-owned tag. This
          carries the requirement that used to sit alone on a monolith
          band. */}
      <Reveal>
        <div className="mt-14 border-l-2 border-monarch bg-panel/60 py-2 pl-6 sm:mt-16">
          <p className="max-w-2xl leading-relaxed text-ink">
            The tag is operator-owned. The gateway pins it to the app, the
            route, or the key issued to the caller, rather than believing a
            header the caller sets. Everyone starts here.
          </p>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-monarch-deep">
            The gateway assigns the tag. It does not take the caller&apos;s
            word for it.
          </p>
        </div>
      </Reveal>

      {/* The open question: identity. Two paths, the default weighted. */}
      <div className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2 sm:gap-10">
        <Reveal>
          <article className="flex h-full flex-col border-t-2 border-teal bg-teal-wash px-6 py-8 sm:px-8 sm:py-10">
            <p className="mono-label text-teal-deep">The sensible default</p>
            <h3 className="mt-4 text-xl font-medium leading-snug text-ink sm:text-2xl">
              Trust your developers
            </h3>
            <p className="mt-4 leading-relaxed text-ink">
              Assign the tag and take the honest header at the boundary. A
              disputed invoice line is caught by the team that reads its own
              bill. Identity checked at the source may arrive from the
              platform itself.
            </p>
            <p className="mt-4 leading-relaxed text-steel-dark">
              No latency added on every request. No mapping table to own and
              watch for drift. For most teams this is enough.
            </p>
          </article>
        </Reveal>

        <Reveal delay={60}>
          <article className="flex h-full flex-col border-t border-steel bg-panel px-6 py-8 sm:px-8 sm:py-10">
            <p className="mono-label text-steel-dark">Available when needed</p>
            <h3 className="mt-4 text-xl font-medium leading-snug text-ink sm:text-2xl">
              Verify identity
            </h3>
            <p className="mt-4 leading-relaxed text-ink">
              Prove the caller from a directory or a login before the tag is
              trusted. This is the path for teams whose threat model asks for
              it.
            </p>
            <p className="mt-4 leading-relaxed text-steel-dark">
              It costs latency on every request and an owner for a mapping
              table that drifts. Reach for it when the threat model earns
              that cost, not by default.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
