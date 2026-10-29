import type { Metadata } from "next";
import { site } from "@/lib/site";
import { arSite } from "@/lib/ar/site";
import { RootShell } from "@/components/root-shell";
import "../globals.css";

/** Arabic root layout: every page under /ar/ renders as <html lang="ar" dir="rtl">. */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Odysense: تصميم المواقع والمتاجر الإلكترونية في قطر",
    template: "%s | Odysense",
  },
  description: arSite.description,
  // Pages set canonical, hreflang and Open Graph through seoMeta() in lib/seo.ts.
  openGraph: {
    type: "website",
    siteName: "Odysense",
    locale: "ar_QA",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="ar">{children}</RootShell>;
}
