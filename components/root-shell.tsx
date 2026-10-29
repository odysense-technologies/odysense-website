import { Footer } from "@/components/ui";
import { Nav } from "@/components/nav";
import { RouteLoader } from "@/components/loader";
import { Analytics, WhatsAppTracker } from "@/components/analytics";
import { ConsultPopup } from "@/components/lead-forms";
import { SiteChrome } from "@/components/site-chrome";
import { site } from "@/lib/site";
import { ORG_ID, WEBSITE_ID } from "@/lib/schema";
import { type Locale } from "@/lib/i18n";
import { navData } from "@/lib/content";

/**
 * The <html> document shared by the English and Arabic root layouts (app/(en)/layout.tsx and
 * app/(ar)/layout.tsx): fonts, sitewide JSON-LD, analytics and the nav/footer chrome in the page's language.
 */

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "Odysense",
  url: site.url,
  email: site.email,
  telephone: site.phone,
  image: `${site.url}/og.png`,
  logo: { "@type": "ImageObject", url: `${site.url}/logos/odysense-icon.png` },
  description: site.description,
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
    "Web Design", "Web Development", "E-commerce Development", "WooCommerce", "Shopify",
    "Headless Commerce", "Payment Gateway Integration", "Arabic RTL E-commerce", "E-commerce Migration",
    "Software Development", "Mobile App Development", "Branding", "SEO", "Digital Marketing",
    "WhatsApp Business API", "Gamification", "Brand Activations",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: site.phone,
    email: site.email,
    areaServed: ["QA", "SA", "AE", "KW", "BH", "OM"],
  },
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
  // Profiles found by web search on 2026-10-10. Add the LinkedIn company page and the Google Business
  // Profile once the owner confirms their URLs.
  sameAs: [
    "https://www.facebook.com/odysense.qa/",
    "https://www.instagram.com/odysense.qa/",
    "https://qstp.qa/directory/odysense/",
    "https://clutch.co/profile/odysense",
    "https://www.designrush.com/agency/profile/odysense",
    "https://www.crunchbase.com/organization/odysense",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  inLanguage: ["en", "ar"],
  publisher: { "@id": ORG_ID },
};


const FONTS: Record<Locale, string> = {
  en: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500&display=swap",
  ar: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Amiri:wght@400;700&family=Instrument+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap",
};

export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const nav = navData(locale);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        {/* TODO: switch to next/font/local with self-hosted files for zero-request font loading. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={FONTS[locale]} rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        <Analytics />
        <WhatsAppTracker />
        <RouteLoader />
        <SiteChrome>
          <Nav locale={locale} data={nav} />
        </SiteChrome>
        {children}
        <SiteChrome>
          <ConsultPopup locale={locale} />
          <Footer locale={locale} data={nav} />
        </SiteChrome>
      </body>
    </html>
  );
}
