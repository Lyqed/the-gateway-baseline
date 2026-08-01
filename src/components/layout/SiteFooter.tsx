import { SITE_CONFIG } from "@/lib/site-config";

/**
 * The polished floor. Dark band with a faint vertical reflection of
 * the content above it, mono small print, sister-site link, and the
 * standing line.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-floor text-atrium">
      <div aria-hidden="true" className="floor-reflection absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <p className="font-mono text-sm text-atrium">
          Verified cells, not marketing pages.
        </p>

        <nav aria-label="Footer" className="mt-10">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-steel">
            <li>
              <a
                href={SITE_CONFIG.sisterUrl}
                className="underline decoration-steel/50 underline-offset-4 transition-colors duration-150 hover:text-skylight"
              >
                opensourcegateway.com ↗
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.repoUrl}
                className="underline decoration-steel/50 underline-offset-4 transition-colors duration-150 hover:text-skylight"
              >
                github.com/Lyqed/thegatewayproject ↗
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="underline decoration-steel/50 underline-offset-4 transition-colors duration-150 hover:text-skylight"
              >
                corrections: {SITE_CONFIG.contactEmail}
              </a>
            </li>
          </ul>
        </nav>

        <p className="mt-10 font-mono text-xs text-steel">
          © {year} {SITE_CONFIG.name} · statuses hand-verified against public
          documentation · &quot;unknown&quot; means exactly that, not
          &quot;no&quot;
        </p>
      </div>
    </footer>
  );
}
