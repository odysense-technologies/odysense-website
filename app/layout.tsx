import type { Metadata } from "next";
import { Footer } from "@/components/ui";
import { Nav } from "@/components/nav";
import { RouteLoader } from "@/components/loader";
import { Analytics, WhatsAppTracker } from "@/components/analytics";
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
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  verification: { google: "S89j3QhEP8zX5xo8zO5PvKmEqJxT-gpf152W9xmq2GU" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: "Odysense",
  url: site.url,
  email: site.email,
  telephone: site.phone,
  image: `${site.url}/og.png`,
  logo: `${site.url}/logos/odysense-icon.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Innovation Centre, Qatar Science & Technology Park",
    addressLocality: "Doha",
    addressCountry: "QA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.3204, longitude: 51.4353 },
  areaServed: [
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
  ],
  knowsAbout: [
    "Web Design", "Web Development", "E-commerce Development", "Software Development",
    "Mobile App Development", "Branding", "SEO", "Digital Marketing", "WhatsApp Business API",
    "Gamification", "Brand Activations",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      "Website Design", "Website Development", "E-commerce Development",
      "Software Development", "Mobile App Development", "Branding Agency",
      "Digital Marketing", "SEO Services", "WhatsApp Business API",
      "Gamification & Brand Activations",
    ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
  },
  sameAs: [
    "https://www.facebook.com/odysense.qa/",
    "https://qstp.qa/directory/odysense/",
  ],
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
        <WhatsAppTracker />
        <RouteLoader />
        <Nav />
        {children}
        <ConsultPopup />
        <Footer />
      </body>
    </html>
  );
}
