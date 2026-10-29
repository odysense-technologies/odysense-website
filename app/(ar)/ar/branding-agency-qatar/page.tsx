import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { ServicePageView } from "@/components/service-page";
import { getServicePageL } from "@/lib/localized";

const def = getServicePageL("branding-agency-qatar", "ar")!;

export const metadata: Metadata = seoMeta({
  title: def.metaTitle,
  description: def.metaDescription,
  path: "/ar/branding-agency-qatar/",
});

export default function Page() {
  return <ServicePageView def={def} locale="ar" />;
}
