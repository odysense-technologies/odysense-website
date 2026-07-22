import type { Metadata } from "next";
import { ServicePageView } from "@/components/service-page";
import { getServicePage } from "@/lib/service-pages";

const def = getServicePage("digital-marketing-agency-qatar")!;

export const metadata: Metadata = {
  title: def.metaTitle,
  description: def.metaDescription,
  alternates: { canonical: "/digital-marketing-agency-qatar/" },
};

export default function Page() {
  return <ServicePageView def={def} />;
}
