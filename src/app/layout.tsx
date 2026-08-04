import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * HOLDING LAYOUT. The full layout (SkipLink + SiteHeader + SiteFooter,
 * the third mural typeface, and the full metadata block) is preserved
 * verbatim at `layout.full.tsx.bak`; restoring the site is a copy of that
 * file back over this one, plus `page.full.tsx.bak` over `page.tsx`.
 *
 * Deliberately minimal while the standard is offline: no chrome, no nav,
 * no OpenGraph card, and indexing turned off so search engines do not
 * cache a placeholder in place of the standard.
 */

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.tagline,
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={SITE_CONFIG.locale}
      className={`${spaceGrotesk.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
