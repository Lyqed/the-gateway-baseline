import { SITE_CONFIG } from "@/lib/site-config";

/**
 * The polished floor. Dark band with a faint vertical reflection of
 * the content above it. Quiet: no email, no cross-references. The site
 * name, the standing line, and the licence the standard is published
 * under (the one link that belongs here: a standard nobody may cite is
 * not a standard).
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-floor text-atrium">
      <div aria-hidden="true" className="floor-reflection absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <p className="max-w-xl font-mono text-sm leading-relaxed text-atrium">
          The standard for cost attribution in AI. The spend named on
          the provider&apos;s bill, not estimated in a dashboard.
        </p>
        <p className="mt-10 font-mono text-xs leading-relaxed text-steel">
          {SITE_CONFIG.name}, {year}. Published under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            className="underline decoration-1 underline-offset-2 hover:text-atrium"
            rel="license noopener noreferrer"
            target="_blank"
          >
            CC BY 4.0
          </a>
          : cite it, implement it, measure against it.
        </p>
      </div>
    </footer>
  );
}
