import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FaviconOrbit } from "@/components/layout/FaviconOrbit";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name}: ${SITE_CONFIG.tagline}`,
    template: `%s · ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "cost attribution",
    "AI cost attribution",
    "LLM gateway",
    "chargeback",
    "invoice-grade attribution",
    "cloud billing labels",
  ],
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

/**
 * Marks the document as JS-capable before first paint so the reveal
 * styles only ever hide content when the IntersectionObserver that
 * un-hides it is guaranteed to run; and phase-locks the mark's orbit to
 * the favicon's frames. Static one-liner, no user input.
 */
const JS_FLAG =
  "document.documentElement.classList.add('js');" +
  "(function(){var p=matchMedia('(prefers-reduced-motion: reduce)').matches?64:16;" +
  "document.documentElement.style.setProperty('--orbit-delay',(-(Date.now()/1000%p)).toFixed(2)+'s')})()";

/**
 * The type is the system's own: SF on Apple devices, Segoe or Roboto
 * elsewhere, Helvetica and Arial as the floor. No web fonts are loaded.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE_CONFIG.locale} className="h-full">
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <FaviconOrbit />
        <SkipLink />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
