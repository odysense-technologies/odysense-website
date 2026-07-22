import type { Metadata } from "next";
import { Nav, Footer } from "@/components/ui";
import { Analytics } from "@/components/analytics";
import { ConsultPopup } from "@/components/lead-forms";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Odysense — Web Design, E-commerce & Digital Growth in Qatar",
    template: "%s | Odysense",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Odysense",
    title: "Odysense — Web Design, E-commerce & Digital Growth in Qatar",
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Odysense",
  url: site.url,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Innovation Centre, Qatar Science & Technology Park",
    addressLocality: "Doha",
    addressCountry: "QA",
  },
  sameAs: ["https://www.facebook.com/odysense.qa/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* TODO before launch: switch to next/font/local with self-hosted files
            for zero-request font loading. <link> used during development. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Analytics />
        <Nav />
        {children}
        <ConsultPopup />
        <Footer />
      </body>
    </html>
  );
}
