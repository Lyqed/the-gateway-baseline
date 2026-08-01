import { SITE_CONFIG } from "@/lib/site-config";

/**
 * The polished floor. Dark band with a faint vertical reflection of
 * the content above it. Quiet: no links, no email, no cross-references.
 * The site name, the standing line, and the year.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-floor text-atrium">
      <div aria-hidden="true" className="floor-reflection absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <p className="max-w-xl font-mono text-sm leading-relaxed text-atrium">
          A common standard for cost attribution in AI. The spend named on
          the provider&apos;s bill, not estimated in a dashboard.
        </p>
        <p className="mt-10 font-mono text-xs text-steel">
          © {year} {SITE_CONFIG.name}
        </p>
      </div>
    </footer>
  );
}
