import { SPEC_HISTORY } from "@/lib/gateways";
import { Reveal } from "@/components/reveal/Reveal";
import { RingSegment } from "@/components/marks/Ring";

/**
 * Spec history — every change to the bar, dated, newest first, as a
 * mono timeline with ring-segment markers.
 */
export function History() {
  return (
    <section
      id="history"
      aria-labelledby="history-heading"
      className="mx-auto w-full max-w-6xl px-6 py-[var(--space-section)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mono-label text-steel-dark">04 — Spec history</p>
          <h2 id="history-heading" className="text-section mt-4 font-medium">
            Every change to the bar, dated
          </h2>
        </div>
        <p className="rotate-[1.5deg] font-hand text-lg text-violet">
          the bar is a dated artifact too
        </p>
      </div>

      <ol className="mt-12 max-w-3xl border-l border-steel">
        {SPEC_HISTORY.map((change, index) => (
          <li key={`${change.date}-${index}`} className="relative pb-10 pl-10 last:pb-0">
            <RingSegment className="absolute -left-4 top-0 size-8 bg-atrium" />
            <Reveal delay={index * 60}>
              <p className="font-mono text-sm font-semibold text-ink">
                {change.date}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-dark">
                {change.note}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
