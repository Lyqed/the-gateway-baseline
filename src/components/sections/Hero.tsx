import { Reveal } from "@/components/reveal/Reveal";
import { Ring } from "@/components/marks/Ring";
import { HandCircle } from "@/components/marks/HandStrokes";

/**
 * Hero — the ring motif behind, display caps, and the thesis stated
 * plainly: cost attribution for AI traffic is not a dashboard. One
 * restrained hand annotation circles "requirements" (violet stroke,
 * Shantell note "not a dashboard").
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-steel"
    >
      <div aria-hidden="true" className="skylight-band absolute inset-0" />
      <Ring className="absolute -right-[16rem] -top-[14rem] w-[46rem] opacity-70 sm:-right-[12rem] lg:-right-[6rem]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <p className="mono-label text-steel-dark">
          Cost attribution · AI traffic
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
              Cost attribution for AI traffic is not a dashboard. It is a set of{" "}
              <HandCircle>
                <span className="text-ink">requirements</span>
              </HandCircle>{" "}
              a gateway either meets or does not.
            </p>
          </Reveal>
          <p className="mt-4 -rotate-2 font-hand text-lg text-violet">
            *not a dashboard
          </p>
        </div>

        <Reveal>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink">
            Two things decide whether the numbers hold. Whether the figure is
            authoritative, the dollars the provider actually billed, not an
            estimate. And who you trust to name the request. Everything else
            follows from those.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
