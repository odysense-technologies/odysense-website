import type { Metadata } from "next";
import { site } from "@/lib/site";
import { RootShell } from "@/components/root-shell";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Odysense — Web Design, E-commerce & Digital Growth in Qatar",
    template: "%s | Odysense",
  },
  description: site.description,
  // No canonical or og:url here: they would be inherited by every page that forgets its own.
  // Pages set canonical + Open Graph through seoMeta() in lib/seo.ts.
  openGraph: {
    type: "website",
    siteName: "Odysense",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
