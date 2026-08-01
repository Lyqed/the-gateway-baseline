import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Reference implementation — one restrained cross-link band to the
 * sister site and the project repo.
 */
export function ReferenceBand() {
  return (
    <section
      aria-labelledby="reference-heading"
      className="border-t border-steel bg-panel"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-8 px-6 py-16">
        <div>
          <p className="mono-label text-steel-dark">Reference implementation</p>
          <h2
            id="reference-heading"
            className="mt-3 max-w-xl text-2xl font-medium tracking-tight"
          >
            A community gateway is being built against this bar.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={SITE_CONFIG.sisterUrl}
            className="lift inline-flex items-center gap-2 bg-monarch px-5 py-2.5 font-medium text-ink"
          >
            The Open Source Gateway →
          </a>
          <a
            href={SITE_CONFIG.repoUrl}
            className="font-mono text-sm text-skylight-text underline decoration-steel underline-offset-4 hover:decoration-skylight-text"
          >
            github.com/Lyqed/thegatewayproject ↗
          </a>
        </div>
      </div>
    </section>
  );
}
