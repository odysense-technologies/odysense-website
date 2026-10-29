import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { ServicePageView } from "@/components/service-page";
import { getServicePage } from "@/lib/service-pages";

const def = getServicePage("whatsapp-business-api-qatar")!;

export const metadata: Metadata = seoMeta({
  title: def.metaTitle,
  description: def.metaDescription,
  path: "/whatsapp-business-api-qatar/",
});

export default function Page() {
  return <ServicePageView def={def} />;
}
