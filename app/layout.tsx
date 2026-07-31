import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  // Required for Next to resolve relative OG/canonical URLs to absolute ones —
  // social scrapers reject relative image paths.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sun-Man | The Original Black Superhero — Over 40 Years",
    template: "%s | Sun-Man",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Yla Eason" }],
  creator: "Yla Eason",
  publisher: "Olmec Toys",
  keywords: [
    "Sun-Man",
    "Yla Eason",
    "Olmec Toys",
    "Black superhero",
    "Black action figure",
    "Rulers of the Sun",
    "Masters of the Universe",
    "Mattel",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: "Sun-Man | The Original Black Superhero",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sun-Man | The Original Black Superhero",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false },
  // Next injects these into <head>; the CRA-style %PUBLIC_URL% markup in the
  // generator's instructions doesn't apply to the App Router.
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // suppressHydrationWarning: browser extensions (screen recorders, password
  // managers) stamp attributes like data-scribe-recorder-ready onto <html>
  // before React hydrates, which React reports as a mismatch. This covers only
  // this element's own attributes, not any children.
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="grain antialiased">
        {/* Marks that scripting is live, before the body is parsed. Reveal's
            hidden state is scoped to this class, so without JS every section
            renders visible instead of stuck at opacity 0. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
