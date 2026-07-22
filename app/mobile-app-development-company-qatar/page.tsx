import type { Metadata } from "next";
import { ServicePageView } from "@/components/service-page";
import { getServicePage } from "@/lib/service-pages";

const def = getServicePage("mobile-app-development-company-qatar")!;

export const metadata: Metadata = {
  title: def.metaTitle,
  description: def.metaDescription,
  alternates: { canonical: "/mobile-app-development-company-qatar/" },
};

export default function Page() {
  return <ServicePageView def={def} />;
}
