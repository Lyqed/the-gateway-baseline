import { SITE_CONFIG } from "@/lib/site-config";

/**
 * A quiet footer on the page ground: the standing line, the licence
 * (a standard nobody may cite is not a standard), the year.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-steel bg-floor text-steel-dark">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 text-[0.8125rem] leading-relaxed">
        <p className="max-w-xl">
          An open baseline for attribution in AI. Identity and ownership
          carried through requests, controls, usage records and provider billing.
        </p>
        <p className="mt-4">
          {SITE_CONFIG.name}, {year}. Published under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            className="text-skylight-deep hover:underline"
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
