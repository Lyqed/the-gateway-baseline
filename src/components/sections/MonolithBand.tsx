import { Reveal } from "@/components/reveal/Reveal";

type MonolithBandProps = {
  /** The one sentence — always a real axiom from the spec, deadpan. */
  sentence: string;
  /** Flat ground: the polished dark floor, or bare atrium white. */
  surface: "floor" | "atrium";
  /**
   * The watching dot — exactly once per site, monarch on dark. A flat
   * filled circle centered above the sentence; never explained in copy.
   */
  watchingDot?: boolean;
};

/**
 * Monolith band — the stillness register (brief §4). A full-bleed
 * interstitial surface, functionally empty: one sentence of mono type
 * perfectly centered on both axes, vast negative space, strict
 * one-point symmetry. No paint, no links, no CTA. The band fades in
 * slowly (1200ms, linear, Kubrick pacing); the sentence does not
 * translate, only appears.
 */
export function MonolithBand({
  sentence,
  surface,
  watchingDot = false,
}: MonolithBandProps) {
  const dark = surface === "floor";

  return (
    <section
      className={`grid min-h-[70svh] place-items-center px-6 py-24 ${
        dark ? "bg-floor" : "bg-atrium"
      }`}
    >
      <Reveal mode="still" className="text-center">
        {watchingDot && (
          <span
            aria-hidden="true"
            className="watching-dot mx-auto mb-14 block size-2.5 rounded-full bg-monarch"
          />
        )}
        <p
          className={`mx-auto max-w-3xl font-mono text-sm tracking-[0.12em] sm:text-base ${
            dark ? "text-atrium" : "text-ink"
          }`}
        >
          {sentence}
        </p>
      </Reveal>
    </section>
  );
}
