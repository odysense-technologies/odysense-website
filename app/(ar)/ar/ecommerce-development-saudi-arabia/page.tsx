import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { GuidePageView } from "@/components/guide-page";
import { getGccPageL } from "@/lib/localized";

const page = getGccPageL("ecommerce-development-saudi-arabia", "ar")!;

export const metadata: Metadata = seoMeta({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/ar/ecommerce-development-saudi-arabia/",
});

export default function Page() {
  return <GuidePageView page={page} locale="ar" />;
}
