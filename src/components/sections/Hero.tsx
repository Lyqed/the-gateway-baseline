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
        <h1
          id="hero-heading"
          className="text-hero max-w-4xl font-medium uppercase"
        >
          The Gateway Baseline
        </h1>

        <div className="relative mt-10 max-w-2xl">
          <Reveal mode="draw">
            <p className="text-lg leading-relaxed text-steel-dark sm:text-xl">
              The standard for cost attribution in AI. Not a dashboard,
              and not a feature list. A set of{" "}
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

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            {/* the enter button: one pill, Cupertino manners */}
            <a
              href="#tracker"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[0.95rem] font-medium tracking-tight text-atrium shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              Enter
            </a>
            <a
              href="/spec"
              className="text-[0.95rem] font-medium text-violet transition-opacity hover:opacity-75"
            >
              Read the spec <span aria-hidden="true">&rsaquo;</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
